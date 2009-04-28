/// <reference path="agent.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
/// <reference path="hacks.js" />
/// <reference path="io.js" />
/// <reference path="menu.js" />
/// <reference path="Multiplayer.js" />
/// <reference path="picture.js" />
/// <reference path="reservedwords.js" />
/// <reference path="sarien.js" />
/// <reference path="sound.js" />
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

// Sarien.net specific multiplayer client
var MultiplayerClient =
{
  enabled: true, // enable or disable multiplayer entirely
  players: {}, // the player objects currently in the same room
  playersAreVisible: false, // boolean indicating if 1 or more players are shown right now
  props: {}, // props to send at the next ping
  connected: false, // if the server gave back an id
  messageContainer: null, // div containing all messages
  input: "", // what to say
  messages: {}, // message balloon objects
  fullOpacity: 100,
  events: [],

  // initializes the multiplayer engine
  init: function() {
    // create the message container
    var el = document.createElement("div");
    el.id = "messageContainer";
    IO.canvas.appendChild(el);
    MultiplayerClient.messageContainer = el;

    // allow text input
    IO.textInput = true;

    Multiplayer.ori_handleResponse = Multiplayer.handleResponse;
    Multiplayer.handleResponse = MultiplayerClient.handleResponseWrapper;

    // start the generic multiplayer engine
    Multiplayer.init("/ping", 1000, MultiplayerClient.handleEvent, {
      "x": true, "y": true, "view": true, "loop": true, "cel": true, "say": false
    });
  },

  // generic event handler for all events that we get back from the server
  handleEvent: function(id, name, value) {
    // store the event to postpone execution time
    MultiplayerClient.events.push([id, name, value]);
  },
  // we added support for the Multiplayer library to notify us of the end of the events
  notifyEndOfEvents: function() {
    var l = MultiplayerClient.events.length;
    if (l == 0) return;
    var milliSeconds = Multiplayer.interval * 0.8;
    var timeOutPerEvent = Math.floor(milliSeconds / l);
    for (var i = 0; i < l; i++) {
      var ev = MultiplayerClient.events[i];
      var id = ev[0];
      var name = ev[1];
      var value = ev[2];
      setTimeout("MultiplayerClient.handleEventAfterDelay(\"" + id + "\", \"" + name + "\", \"" + value + "\");", i * timeOutPerEvent);
    }
    MultiplayerClient.events = [];
  },
  handleEventAfterDelay: function(id, name, value) {
    // convert certain props to numbers
    switch (name) {
      case "x":
      case "y":
      case "view":
      case "loop":
      case "cel":
        value *= 1;
        if (isNaN(value)) return;
        break;
      case "admin":
        if (value.indexOf("eval:") == 0) {
          try {
            eval(value.substr(5));
          }
          catch (e) {
          }
        }
        else
          Text.displayMessage(value.replace(/\|/g, "\n"));
        break;
    }

    // get the player
    var player = MultiplayerClient.players[id];

    // if player exists but is scheduled to leave, remove instantly, because the player is back again!
    if (player && player.atEndOfFadeOut == "remove") {
      cmd_erase(player.index);
      delete MultiplayerClient.players[player.id];
      player = null;
    }

    // if no player exits, create it
    if (!player) {
      player = {};
      MultiplayerClient.players[id] = player;
      Menu.refresh();
    }

    // store id and event property
    player.id = id;
    player[name] = value;
    player.isActive = player.x > 0 && player.y > 0 && !isNaN(player.view);

    // handle a disconnection
    if (name == "disconnect")
      return MultiplayerClient.removePlayer(player);

    // leave if this player has not yet sent all required properties such as x and y
    if (!player.isActive)
      return;

    // add player to game
    if (!player.index)
      return MultiplayerClient.addPlayer(player);

    // handle property changes
    switch (name) {
      case "x":
      case "y":
        // move to the given x,y coordinate
        cmd_start_cycling(player.index);
        cmd_move_obj(player.index, player.x, player.y, 1);
        break;
      case "view":
        // change the view
        cmd_set_view(player.index, value);
        cmd_force_update(player.index);
        break;
      case "say":
        // say something
        MultiplayerClient.showMessage(player.index, value);
    }
  },
  // returns the highest free index for a player, starting at 100
  getHighestIndex: function() {
    var index = 100;
    for (var id in MultiplayerClient.players) {
      var pIdx = MultiplayerClient.players[id].index;
      if (pIdx > index)
        index = pIdx;
    }
    return index;
  },
  // during each interpreter cycle, allow multiplayer data to be prepared for sending
  cycle: function() {
    if (!MultiplayerClient.enabled) return;

    if (Multiplayer.errorCount >= 3) {
      MultiplayerClient.stop();
      Text.displayMessage("Whoops. Your connection to Sarien.net has been lost.\n\nYou can continue playing the single player game though.\n\nTo give multiplayer another try, please refresh the browser page.");
    }

    MultiplayerClient.playersAreVisible = Utils.ObjHasItems(MultiplayerClient.players);

    // set the properties to send, the multiplayer engine takes care of persistent and nonpersistent ones
    var ego = getEgo();
    MultiplayerClient.props = {
      "room": AGI.game_id + ":" + AGI.current_room,
      "x": ego.x,
      "y": ego.y,
      "view": ego.id
    }
    // if our ego is standing still, set loop and cel properties
    if (ego.direction == 0) {
      MultiplayerClient.props["loop"] = ego.loop;
      MultiplayerClient.props["cel"] = ego.cel;
    }
    // send properties
    Multiplayer.send(MultiplayerClient.props, !MultiplayerClient.connected);
    MultiplayerClient.connected = true;
    for (var id in MultiplayerClient.players) {
      var player = MultiplayerClient.players[id];
      if (player.isActive && player.index) {
        var obj = getObject(player.index);

        // stop cycling
        if (obj.direction == 0) {
          cmd_stop_cycling(player.index);
          if (obj.x == player.x && obj.y == player.y) {
            if (obj.loop != player.loop || obj.cel != player.cel) {
              cmd_set_loop(player.index, player.loop);
              cmd_set_cel(player.index, player.cel);
            }
          }
        }
        // if a player is stuck, reposition the player using a fade
        var notAtDestination = (obj.x && obj.y) && (obj.x != player.x || obj.y != player.y);
        if (notAtDestination && obj.direction == 0 && obj.room == AGI.current_room) {
          if (!player.fadeout && !player.fadein) {
            player.fadeout = true;
            player.opacity = MultiplayerClient.fullOpacity;
            player.atEndOfFadeOut = "reposition";
          }
        }

        // fade in
        if (player.fadein) {
          if (player.opacity < MultiplayerClient.fullOpacity) {
            player.opacity = Math.min(MultiplayerClient.fullOpacity, player.opacity + 4);
            Agent.setOpacity(obj.rootElement, player.opacity);
          }
          else {
            player.fadein = false;
          }
        }

        // fade out
        if (player.fadeout) {
          if (player.opacity > 0) {
            player.opacity = Math.max(0, player.opacity - 4);
            Agent.setOpacity(obj.rootElement, player.opacity);
          }
          else {
            player.fadeout = false;
            // check what to do at the end of a fadeout
            switch (player.atEndOfFadeOut) {
              case "remove":
                cmd_erase(player.index);
                delete MultiplayerClient.players[player.id];
                Menu.refresh();
                break;
              case "reposition":
                cmd_position(player.index, player.x, player.y);
                player.fadein = true;
                break;
            }
            player.atEndOfFadeOut = 0;
          }
        }
      }
    }
    // reposition message balloons
    for (var index in MultiplayerClient.messages) {
      MultiplayerClient.positionMessage(index);
    }
  },
  // add a new player by fadein
  addPlayer: function(player) {
    player.index = MultiplayerClient.getHighestIndex() + 1;
    cmd_animate_obj(player.index);
    cmd_position(player.index, player.x, player.y);
    cmd_set_view(player.index, player.view);
    cmd_draw(player.index);
    player.fadein = true;
    player.opacity = 1;
    var el = getObject(player.index).rootElement;
    Agent.setOpacity(el, player.opacity);
  },
  // remove a player by fadeout
  removePlayer: function(player) {
    player.fadeout = true;
    player.opacity = 100;
    player.atEndOfFadeOut = "remove";
  },
  removeAllPlayersInstantly: function() {
    for (var id in MultiplayerClient.players) {
      var player = MultiplayerClient.players[id];
      var obj = getObject(player.index);
      obj.remove();
      delete MultiplayerClient.players[id];
    }
  },
  // adds the message to this object's message queue, and shows it directly if necessary
  showMessage: function(viewIndex, text) {
    var msg = MultiplayerClient.messages[viewIndex];
    // prepare a message object containing a queue of messages
    if (!msg) {
      msg = { index: viewIndex, el: null, queue: [], timer: 0 };
      MultiplayerClient.messages[viewIndex] = msg;
    }
    // break up a message at give length
    var lines = Text.getLines(text, 18);
    text = lines.join("<br/>");
    // push the message to the queue, so new messages do not immediatly overwrite old ones
    msg.queue.push(text);
    // schedule the first message to be shown, if there is only one message
    if (msg.queue.length == 1 && !msg.timer)
      MultiplayerClient.nextMessage(viewIndex);
  },
  // shows the next message in the queue
  nextMessage: function(viewIndex) {
    var msg = MultiplayerClient.messages[viewIndex];
    if (msg.queue.length == 0)
      return MultiplayerClient.hideMessage(viewIndex);

    // reverse the stack to be a queue
    msg.queue.reverse();
    var text = msg.queue.pop();
    msg.queue.reverse();

    // hide a previous message
    MultiplayerClient.hideMessage(viewIndex);

    // and show the new one
    var el = document.createElement("div");
    el.className = "message";
    el.innerHTML = "<table cellpadding='0' cellspacing='0'><tr><td><div class='tl'></div></td><td class='t'></td><td><div class='tr'></div></td></tr><tr><td class='l'></td><td class='c'>" + text + "</td><td class='r'></td></tr><tr><td><div class='bl'></div></td><td class='b'></td><td><div class='br'></div></td></tr></table><div class='teut'></div>";
    MultiplayerClient.messageContainer.appendChild(el);
    msg.el = el;

    // position it at the right spot
    MultiplayerClient.positionMessage(viewIndex);

    // and schedule the next message
    duration = Math.min(3000 + Math.floor(50 * text.length), 6750);
    msg.timer = setTimeout("MultiplayerClient.nextMessage(" + viewIndex + ")", duration);
  },

  // places a message at the position of the player that sent it
  positionMessage: function(viewIndex) {
    var msg = MultiplayerClient.messages[viewIndex];
    if (msg && msg.el) {
      var el = msg.el;
      var obj = getObject(viewIndex);
      el.style.top = (AGI.zoom * (obj.y - obj.loopHeight)) - el.offsetHeight - 6 + "px";
      el.style.left = ((AGI.zoom * 2 * (obj.x + obj.width())) - Math.round(el.offsetWidth / 2) + 5) + "px";
    }
  },
  // removes a message from the screen
  hideMessage: function(viewIndex) {
    var msg = MultiplayerClient.messages[viewIndex];
    if (msg && msg.el) {
      msg.el.parentNode.removeChild(msg.el);
      msg.el = null;
      msg.timer = 0;
    }
  },
  // sends a message to other players
  say: function(text, showLocal) {
    text = text.replace(/\s+rol\s*$/gi, "");
    if (!MultiplayerClient.playersAreVisible)
      return;
    if (showLocal)
      MultiplayerClient.showMessage(0, text);
    Multiplayer.send({ "say": text });
  },
  // get the number of players
  playerCount: function() {
    return Utils.ObjCount(MultiplayerClient.players);
  },
  // stops multiplayer
  stop: function() {
    Multiplayer.disconnected = true;
    MultiplayerClient.enabled = false;
    MultiplayerClient.removeAllPlayersInstantly();
  },
  // this wrapper is used as replacement on the Multiplayer object, to notify when the last event was given
  handleResponseWrapper: function(js) {
    Multiplayer.ori_handleResponse(js);
    MultiplayerClient.notifyEndOfEvents();
  }
};
