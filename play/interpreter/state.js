/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
/// <reference path="hacks.js" />
/// <reference path="io.js" />
/// <reference path="menu.js" />
/// <reference path="picture.js" />
/// <reference path="reservedwords.js" />
/// <reference path="sarien.js" />
/// <reference path="sound.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />
/// <reference path="base64.js" />

// State object to save and load a game. Uses base64.js for encoding and decoding.
var State =
{
  // when stateToLoad contains info, it will be loaded on the next agi cycle
  stateToLoad: 0,

  // get the state information in a comma separated set of values
  getState: function() {
    var ego = getEgo();
    var state = "|";

    // ego info
    state += ego.x + "," + ego.y + "," + ego.id + "," + ego.loop + "," + ego.cel + "|";

    // vars
    for (var i = 0; i < 256; i++) {
      var value = vars[i];
      if (value > 0)
        state += i + "," + value + ",";
    }
    state = state.replace(/,$/, "");

    // flags
    state += "|";
    for (var i = 0; i < 256; i++) {
      var value = flags[i];
      if (value)
        state += i + ",";
    }
    state = state.replace(/,$/, "");

    // inventory items
    state += "|";
    for (var i in items) {
      state += i + ",";
    }
    state = state.replace(/,$/, "");
    state += "|";
    return state;
  },
  
  // generates the savestate hashed url, changes the title bar and shows the savegame dialog
  save: function() {
    // get the state and encode it
    var stateInfo = State.getState();
    stateInfo = Base64.encode(stateInfo);
    
    // store current hash and title information
    var prevHash = document.location.hash;
    var prevTitle = document.title;
    
    // set savegame title, for easy reference by bookmark titles
    document.title = "Sarien.net Savegame: " + AGI.game_id + " " + Sarien.getRoomName(AGI.current_room) + " score:" + Menu.score;
    document.location.hash = stateInfo;
    
    // show the savegame message
    Text.displayMessage("SAVE GAME\n\nThe url in your browser now contains your current game state. To save, bookmark the page now (CTRL + D). Your bookmark IS your savegame.\n\nWhen you have created your bookmark, press ENTER to continue playing.");
    
    // prevent hashChange actions until the dialog is closed again
    Sarien.prevCheckForHashChange = Sarien.checkForHashChange;
    Sarien.checkForHashChange = function() { };
    
    // when the dialog is closed, revert the hashChange handler and restore title and url hash
    Text.afterHideMessageHandler = function() {
      document.title = prevTitle;
      document.location.hash = prevHash;
      Sarien.checkForHashChange = Sarien.prevCheckForHashChange;
    }
  },
  
  // loads the state from url, when a bookmark is loaded
  loadFromUrl: function(base64String) {
    var stateInfo = Base64.decode(base64String);
    State.stateToLoad = stateInfo;
    return State.getRoomFromState(stateInfo);
  },
  
  // gets the room number from a savegame
  getRoomFromState: function(info) {
    var parts = info.split("|");
    var varInfo = parts[2].split(",");
    var varObj = {};
    for (var i = 0; i < varInfo.length; i += 2)
      varObj[varInfo[i] * 1] = varInfo[i + 1] * 1;
    return (varObj[var_room_no]) * 1;
  },
  
  restore: function() {
    Text.displayMessage("RESTORE GAME\n\nEach savegame in Sarien.net is a browser bookmark to the url that is generated when saving.\n\nTo restore, simply load a bookmark that you have created earlier.");
  },
  
  // loads the state that is set statically in State.stateToLoad
  load: function() {
    var info = State.stateToLoad;
    var parts = info.split("|");

    // ego
    var egoInfo = parts[1].split(",");
    var x = egoInfo[0] * 1;
    var y = egoInfo[1] * 1;
    var id = egoInfo[2] * 1;
    var loop = egoInfo[3] * 1;
    var cel = egoInfo[4] * 1;
    var ego = getEgo();
    cmd_reposition_to(0, x, y);
    cmd_set_view(0, id);
    cmd_set_loop(0, loop);
    cmd_set_cel(0, cel);

    // vars
    var varInfo = parts[2].split(",");
    var varObj = {};
    for (var i = 0; i < varInfo.length; i += 2)
      varObj[varInfo[i] * 1] = varInfo[i + 1] * 1;
    for (var i = 0; i < 256; i++)
      vars[i] = varObj[i] ? varObj[i] : 0;

    // flags
    var flagInfo = parts[3].split(",");
    var flagObj = {};
    for (var i = 0; i < flagInfo.length; i++)
      flagObj[flagInfo[i] * 1] = true;
    for (var i = 0; i < 256; i++)
      flags[i] = flagObj[i] ? true : false;
    
    // inventory
    var invInfo = parts[4].split(",");
    window.items = {};
    for (var i = 0; i < invInfo.length; i++)
      items[invInfo[i] * 1] = true;

    cmd_set(flag_game_restored);
    State.stateToLoad = 0;
  }
};