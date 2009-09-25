/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
/// <reference path="hacks.js" />
/// <reference path="menu.js" />
/// <reference path="picture.js" />
/// <reference path="reservedwords.js" />
/// <reference path="sarien.js" />
/// <reference path="sound.js" />
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

var IO =
{
  screen: null,
  actions: null,
  commandLineIsVisible: false,
  accept_input: true,
  key_pressed: false,
  key_code: 0,
  said: [],
  backAction: 0,
  usingKeyboard: false,
  prevSelectedIndex: -1,
  verb: null,
  controllerKey: 0,
  cancelNextKeyPress: false,
  cancelNextKeyClick: false,
  input: "",
  maxInputLength: 255,
  FKeyCommands: [["F1"], ["F2"], ["F3"], ["F4"], ["F5"], ["F6"], ["F7"], ["F8"], ["F9"], ["F10"]],
  locationCommands: [],
  commandsGlobal: [], // contains all logic0 actions, retrieved on startup
  commandsLocal: [],  // contains all current logic actions, retrieved at new_room
  commonCommandsActive: false, // switches between common (logic0) actions, and current room actions
  commands: {}, // actions hashmap, stored per verb such as "check out" or "acquire"
  currentRoomLogics: {},
  prettyVerbs: {},
  speeds: [0, 30, 42, 100],
  avatars: {}, // avatars that I have found
  lastInput: "",

  x: 0,
  y: 0,

  keyMap: {},

  init: function() {
    IO.buildLocationCommands();
    IO.backAction = a_exit,
    IO.screen = document.getElementById("sarien");
    IO.canvas = document.getElementById("canvas");
    IO.actions = document.createElement(Agent.iPhone ? "div" : "select");
    IO.actions.id = "actions";
    IO.canvas.appendChild(IO.actions);

    document.onkeydown = IO.onKeyDown;
    document.onkeypress = IO.onKeyPress;
    IO.canvas.onclick = IO.onClick;
    IO.canvas.oncontextmenu = IO.onRightClick;
    IO.canvas.ondblclick = IO.onDoubleClick;
    IO.actions.onclick = IO.onClickAction;

    if (Agent.iPhone)
      Iphone.init();
  },

  setSpeed: function(speed) {
    AGI.interval = IO.speeds[speed];
  },

  buildLocationCommands: function() {
    var prettyRoomNames = [];
    for (var name in roomNames) {
      if (isNaN(name * 1)) {
        var command = "#" + name;
        IO.locationCommands.push([command]);
        var obj = {};
        obj[command] = name;
        IO.addPrettyVerbs(obj);
      }
    }
  },

  cycle: function() {
  },

  chooseFKey: function(fkey) {
    IO.controllerKey = IO.keyMap[fkey + 58];
  },

  onKeyDown: function(evt) {
    if (Agent.OP)
      IO.cancelNextKeyClick = true;

    var evt = Agent.IE ? event : evt;
    var key = evt.keyCode;

    // always cancel the "/" quick search
    if (key == 191 && !evt.shiftKey)
      Agent.cancelEvent(evt);

    var ego = getEgo();

    // unpause by enter, space or escape
    if (AGI.paused && Text.messageShown) {

      // cancel backspace when a dialog is shown
      if (key == 8) Agent.cancelEvent(evt);

      // close a dialog by enter or esc
      if (key == 13 || key == 32 || key == 27) {
        IO.cancelNextKeyPress = true;
        cmd_reset(flag_input_received);
        cmd_set(flag_input_parsed);
        AGI.unpause();
      }
      return;
    }

    if (IO.actionsVisible()) {
      if (key == 37)
        IO.executeAction(IO.backAction);
      if (key == 13 || key == 32 || key == 39)
        IO.chooseAction();
      if (key == 27)
        IO.hideActions();
      if (key == 37 || key == 13 || key == 32 || key == 39 || key == 27)
        IO.cancelNextKeyPress = true;
      return;
    }

    // map 0 to 9 to F keys
    IO.controllerKey = 0;
    if (evt.ctrlKey && key >= 48 && key <= 57) {
      var scanCode = (key == 48) ? 68 : key + 10;
      IO.controllerKey = IO.keyMap[scanCode];
      return;
    }

    // activate actions by "/"
    if (key == 191 && !evt.shiftKey) {
      IO.x = (ego.x + ego.width()) * 2 * AGI.zoom;
      IO.y = ego.y * AGI.zoom;
      IO.usingKeyboard = true;
      IO.executeAction(a_local_verbs);
      IO.actions.focus();
      return;
    }
    if (evt.altKey && evt.ctrlKey && key == 65)
      IO.addAllAvatars();

    if (evt.altKey || evt.ctrlKey)
      return;

    IO.key_pressed = true;
    IO.key_code = key;

    // check for a directional key and act upon it
    var current_ego_dir = vars[var_ego_dir];
    var new_ego_dir = null;
    switch (evt.keyCode) {
      case 27:
        if (IO.input == "")
          return Menu.showHelp();
        IO.input = "";
        IO.showCommandLine();
        break;
      case 13:
        if (Utils.Trim(IO.input).length == 0)
          return;
        var input = IO.input;
        IO.input = "";
        IO.showCommandLine();
        IO.parseCommandLine(input);
        break;
      case 8:
        if (IO.input.length > 0) {
          IO.input = IO.input.substr(0, IO.input.length - 1);
          IO.showCommandLine();
        }
        Agent.cancelEvent(evt);
        break;
      case 37: // left
        new_ego_dir = left;
        break;
      case 38: // up
        new_ego_dir = up;
        break;
      case 39: // right
        new_ego_dir = right;
        break;
      case 40: // down
        new_ego_dir = down;
        break;
    }
    if (new_ego_dir) {
      Agent.cancelEvent(evt);
      // pressing in same direction is a stop
      if (new_ego_dir == current_ego_dir)
        new_ego_dir = stopped;

      if (Test.recording)
        Test.recordDirection(new_ego_dir);

      getEgo().motion_type = mt_normal_motion;
      getEgo().direction = new_ego_dir;
    }
  },

  // handles the commandline input
  onKeyPress: function(evt) {
    if (IO.cancelNextKeyPress) {
      IO.cancelNextKeyPress = false;
      return;
    }
    IO.cancelNextKeyPress = false;
    if (IO.actionsVisible() || Text.messageShown)
      return;

    var evt = Agent.IE ? event : evt;
    if (evt.altKey || evt.ctrlKey)
      return;

    var chr = (Agent.IE || Agent.OP) ? evt.keyCode : evt.charCode;
    var key = String.fromCharCode(chr) + "";
    if (chr == 13)
      return;
    if (key.match(/[\w\s.,!'"@$*?\-\+\=\_\:\;\(\)]/)) {
      IO.input += key;
      Agent.cancelEvent(evt);
    }
    IO.showCommandLine();
  },

  showCommandLine: function() {
    if (IO.input.length < IO.maxInputLength) {
      IO.hideCommandLine();
      var visualInput = IO.input;
      if (visualInput.length > 38)
        visualInput = visualInput.substr(visualInput.length - 38);
      var cmdPrompt = ">";
      if (strings[0] && strings[0].length == 1)
        cmdPrompt = strings[0];
      var cmdLine = cmdPrompt + visualInput + "_";
      Text.add(0, 22, cmdLine, 15, 0);
      IO.commandLineIsVisible = true;
    }
  },
  hideCommandLine: function() {
    Text.clearLine(22);
    IO.commandLineIsVisible = false;
  },
  onClick: function(evt, dbl) {
    var evt = Agent.IE ? event : evt;
    if (IO.cancelNextKeyClick) {
      IO.cancelNextKeyClick = false;
      return;
    }

    if (AGI.paused) {
      if (Text.messageShown)
        Text.hideMessage();
      if (IO.actionsVisible())
        IO.hideActions();
      cmd_reset(flag_input_received);
      cmd_set(flag_input_parsed);
      Agent.cancelEvent(evt);
      return AGI.unpause();
    }
    IO.usingKeyboard = false;
    IO.hideActions();

    // mouse click == enter;
    IO.key_pressed = true;
    IO.key_code = 13;

    var canvas = Agent.getBoundingClientRect(IO.canvas);
    var x = Math.min(Math.max(evt.clientX, canvas.left), canvas.right) - canvas.left;
    var y = Math.min(Math.max(evt.clientY, canvas.top), canvas.bottom) - canvas.top;
    x = Math.round(x / 4);
    y = Math.round(y / 2);
    var ego = getEgo();
    if (ego && AGI.control == c_player_control) {
      x -= Math.round(ego.width() / 2);
      if (dbl)
        ego.position(x, y);
      else {
        // mouse play for clicking on the left edge
        ego.setDestination(x, y);
      }
    }
  },
  onRightClick: function(evt) {
    var evt = Agent.IE ? event : evt;
    Agent.cancelEvent(evt);
    if (Text.messageShown)
      return;

    var canvas = Agent.getBoundingClientRect(IO.canvas);
    var ox = canvas.left;
    var oy = canvas.top;

    IO.x = evt.clientX - ox;
    IO.y = evt.clientY - oy;
    IO.executeAction(a_local_verbs);
  },
  onDoubleClick: function(evt) {
    IO.onClick(evt, true);
  },
  // clears the actions menu from all current option elements
  clearActions: function() {
    IO.actions.innerHTML = "";
  },
  // shows the actions panel, optionally on the given x,y coordinate
  showActions: function() {
    AGI.pause();
    var size = Math.min(IO.actions.childNodes.length, 15);
    IO.actions.setAttribute("size", size);
    IO.actions.style.display = "block";

    var x = IO.x;
    var y = IO.y;
    var screenWidth = 320 * AGI.zoom;
    var screenHeight = 200 * AGI.zoom;

    if (x + IO.actions.offsetWidth > screenWidth)
      x -= IO.actions.offsetWidth;

    if (y + IO.actions.offsetHeight > screenHeight)
      y -= IO.actions.offsetHeight;

    if (x < 0)
      x = 0;

    if (y < 0)
      y = 0;

    IO.actions.style.left = x + "px";
    IO.actions.style.top = y + "px";
    IO.actions.scrollTop = 0;
  },
  // uses a timeout to highlight a selectbox option
  selectOption: function(i) {
    setTimeout(function() { try { IO.actions.selectedIndex = i; IO.actions.focus(); } catch (e) { } });
  },
  // hides the actions pane
  hideActions: function() {
    AGI.unpause();
    IO.actions.style.display = "none";
    IO.parseRoomCommands(IO.commandsLocal);
  },
  // true if the actions pane is currently visible
  actionsVisible: function() {
    return IO.actions.style.display == "block";
  },
  onClickAction: function(evt) {
    var evt = Agent.IE ? event : evt;
    IO.usingKeyboard = false;
    IO.chooseAction();
    Agent.cancelEvent(evt);
  },
  chooseAction: function(evt) {
    IO.executeAction(IO.actions.value);
  },
  // parses text input from the command line
  parseCommandLine: function(cmd) {
    IO.lastInput = cmd;
    // immediately dispatch the said commands
    cmd = Utils.Trim(cmd);
    MultiplayerClient.say(cmd, true);

    var oriCommand = cmd;
    cmd = Hacks.parse(AGI.game_id, cmd);

    var tokens = [];
    while (cmd.length > 0) {
      // remove unwanted characters
      cmd = Utils.Trim(cmd.toLowerCase().replace(/\s+/g, " ")).replace(/[^\w ]/g, "");

      // ignore specific messages that are common in multiplayer
      if (Utils.matches(cmd, ["^hello\\b", "^hi\\b", "^hey\\b"]))
        return;

      // split into parts
      var parts = cmd.split(" ");

      // find the longest token match
      var longestToken = "";
      var stopwords = TOKENS[0];
      for (var j = parts.length; j >= 0; j--) {
        var token = "";
        for (var i = 0; i < j; i++) {
          token = Utils.Trim(token + " " + parts[i]);
        }
        for (var testToken in TOKENS) {
          if (Utils.ArrayHasItem(TOKENS[testToken], token) && token.length > longestToken.length)
            longestToken = token;
        }
      }

      // if no longest token was found, leave
      if (longestToken == "") {
        return;
      }

      // remove the longest token from the command
      tokens.push(longestToken);
      cmd = cmd.substring(longestToken.length);
    }
    // now rewrite the found tokens, and get their action tokens (the first in the list)
    var commandTokens = [];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      for (var testToken in TOKENS) {
        if (testToken != "0" && Utils.ArrayHasItem(TOKENS[testToken], token))
          commandTokens.push(TOKENS[testToken][0]);
      }
    }
    // now that the system commands are known, run the input through the system parser
    IO.lastTokens = commandTokens;
    IO.parse(commandTokens.join(" "), true);
  },
  // parses input and takes the appropriate action
  parse: function(input, fromCommandLine) {
    if (!input) return;

    // allow for game specific input hacks
    if (!fromCommandLine)
      input = Hacks.parse(AGI.game_id, input);
    if (input == a_separator)
      return;
    if (input.indexOf("#") == 0)
      return Sarien.checkForHashChange(input);
    if (input.indexOf("$") == 0)
      return AGI.setAvatar(input.substr(1) * 1);
    if (input.match(/^F\d+$/))
      return IO.chooseFKey(input.substr(1) * 1);

    AGI.unpause();
    if (!input || input == "") {
      cmd_reset(flag_input_received);
    }
    else {
      if (Test.recording)
        Test.recordAction(input);

      cmd_set(flag_input_received);
      cmd_reset(flag_input_parsed);
      if (!fromCommandLine) {
        MultiplayerClient.say(IO.getPrettyVerb(input), false);
        IO.lastInput = input;
      }
      IO.said = input.replace(/^\s*|\s0*$/, "").toLowerCase().split(" ");
    }
  },
  // true if the user actually said the commands specified in the args
  hasSaid: function(args) {
    var argArr = [];
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      var word = isNaN(arg * 1) ? arg : WORDS[arg];
      argArr.push(word);
    }
    var saidText = IO.said.join(" ").toLowerCase().replace(/\srol$/g, "").split(" ");
    var checkText = argArr.join(" ").toLowerCase().replace(/\srol$/g, "").split(" ");

    if (saidText.length != checkText.length)
      return false;

    for (var i = 0; i < saidText.length; i++) {
      if (saidText[i] != checkText[i] && checkText[i] != "anyword")
        return false;
    }

    if (checkText.join().indexOf("anyword") == -1) {
      cmd_reset(flag_input_received);
      cmd_set(flag_input_parsed);
      //IO.said = [];
    }
    return true;
  },
  // gets all possible said commands for the current room and exposes them in the UI
  parseRoomCommands: function(commands) {
    IO.commands = {};
    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];
      var verb = Utils.Trim(command[0]);

      if (!IO.commands[verb])
        IO.commands[verb] = {};
      if (commands.length > 1) {
        var subject = "";
        for (var j = 1; j < command.length; j++) {
          subject += Utils.Trim(command[j]);
          if (j < command.length - 1)
            subject += " ";
        }
        IO.commands[verb][subject] = 0;
      }
      else {
        // single word verbs are direct entries
        IO.commands[verb] = 0;
      }
    }
    // post process commands that have only 1 subject
    for (var verb in IO.commands) {
      var count = 0;
      for (var subject in IO.commands[verb]) {
        subject = Utils.Trim(subject);
        if (subject != "")
          count++;
      }
      if (count <= 1) {
        var newVerb = verb + ((count == 1) ? " " + subject : "");
        delete IO.commands[verb];
        IO.commands[newVerb] = 0;
      }
    }
  },
  // adds all current IO.commands and makes html option elements for them
  addOptions: function() {
    var arr = [];
    var dict = {};
    for (var verb in IO.commands) {
      var prettyVerb = IO.getPrettyVerb(verb);
      arr.push(prettyVerb);
      dict[prettyVerb] = verb;
    }
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      var prettyVerb = arr[i];
      var verb = dict[prettyVerb];
      var hasSubjects = (IO.commands[verb] != 0);
      IO.addOption(prettyVerb + (hasSubjects ? " &gt;" : ""), verb);
    }
  },
  // adds an option element to the selectbox
  addOption: function(name, value) {
    if (!value)
      value = name;
    if (name == "&lt;")
      IO.backAction = value;
    if (name == "")
      return;
    if (Agent.iPhone) {
      var option = document.createElement("a");
      option.href = "#";
      option.onclick = function(evt) { IO.executeAction(value); Agent.cancelEvent(evt); };
    }
    else {
      var option = document.createElement("option");
      option.value = value;
    }
    option.innerHTML = name.replace(/\brol\b/g, "");
    IO.actions.appendChild(option);
  },
  // executes an action, such as a submenu opening or a parser command
  executeAction: function(verb) {
    var back = IO.backAction == verb;
    if (!back)
      IO.prevSelectedIndex = IO.actions.selectedIndex;
    IO.verb = verb;
    var desiredSelectedIndex = 1;
    switch (verb) {
      case a_options:
        IO.showOptions();
        break;
      case a_avatars:
        IO.showAvatars();
        break;
      case a_locations:
        IO.showLocations();
        break;
      case a_f_keys:
        IO.showFKeys();
        break;
      case a_exit:
        IO.clearActions();
        IO.actions.blur();
        IO.hideActions();
        break;
      case a_local_verbs:
        IO.showLocalActions();
        break;
      case a_disable_multiplayer:
        IO.hideActions();
        Multiplayer.disconnect();
        MultiplayerClient.stop();
        Text.displayMessage("Multiplayer has been disabled. In order to enable it again, just refresh a browser page.");
        break;
      default:
        if (IO.commands[verb]) {
          IO.showSubActions(verb);
        }
        else {
          IO.parse(verb);
          IO.addOptions();
          IO.actions.blur();
          IO.hideActions();
        }
        break;
    }

    // if using keyboard, do selectbox item highlighting
    if (IO.usingKeyboard) {
      // if back key was issued before, prepare the desiredIndex to be 1
      if (back)
        desiredSelectedIndex = IO.prevSelectedIndex;
      // and set it
      IO.selectOption(desiredSelectedIndex);
    }
  },
  // parses a logic script to get all possible parser commands
  // asObj param is set when multiple logics are passed in logicNr (dirty ambiguous argument, I know)
  getCommands: function(logicNr, asObj) {
    var commands = [];
    var s = "";
    if (asObj) {
      for (var i in logicNr) {
        s += window["logic" + i];
      }
    }
    else
      s += window["logic" + logicNr];

    s = s.replace(/\n|\r/g, "");

    // create regex using string of cmd_said, so this keeps working after commandname ofbuscation
    var reg1 = new RegExp("\\b" + "cmd_said" + "[^\{]+?\{", "gi");
    var reg2 = new RegExp("\\b" + "cmd_said" + "\\((.*?)\\)", "g");
    s.replace(reg1, function(a, b) {
      // var a is now each list of alternative commands: if said(a) || said(b) || said(c)
      var bestSaid = [];
      // separate commands and get the longest one
      var saids = a.replace(reg2, function(c, d) {
        var said = d.replace(/\"/g, "").split(",");

        // replace said references to words
        if (WORDS.length > 0) {
          var saidWords = [];
          for (var i = 0; i < said.length; i++)
            saidWords.push(WORDS[said[i] * 1]);
          said = saidWords;
        }
        if (said.join().length > bestSaid.join().length && said.join().indexOf("anyword") == -1)
          bestSaid = said;

      });
      commands.push(bestSaid);
    });
    return commands;
  },
  // system verbs may differ from common sense
  getPrettyVerb: function(verb) {
    var verbs = [];
    while (verb.length > 0 && verb.indexOf(" ") != -1) {
      // remove unwanted characters
      verb = Utils.Trim(verb);

      // split into parts
      var parts = verb.split(" ");

      // find the longest prettyVerb match
      var longestVerb = "";
      for (var j = parts.length; j >= 0; j--) {
        var token = "";
        for (var i = 0; i < j; i++) {
          token = Utils.Trim(token + " " + parts[i]);
        }
        if (IO.prettyVerbs[token]) {
          longestVerb = IO.prettyVerbs[token];
          break;
        }
      }

      // if no prettyVerb was found, leave
      if (longestVerb == "")
        longestVerb = token = parts[0];

      // remove the longest verb from the line
      verbs.push(longestVerb);
      verb = Utils.Trim(verb.substring(token.length));
    }
    if (verb.length > 0) {
      if (IO.prettyVerbs[verb])
        verbs.push(IO.prettyVerbs[verb])
      else
        verbs.push(verb);
    }
    return verbs.join(" ");
  },
  // adds pretty verbs to the prettyverbs hash
  addPrettyVerbs: function(prettyVerbs) {
    for (var p in prettyVerbs)
      IO.prettyVerbs[p] = prettyVerbs[p];
  },
  // gives you instant access to all avatars
  addAllAvatars: function() {
    for (var id = 0; id < 256; id++)
      if (avatarNames[id])
      IO.avatars[id] = true;
    Text.displayMessage("All avatars have been added.");
  },
  // shows the action commands that the current room accepts
  showLocalActions: function() {
    IO.clearActions();
    IO.addOption("&lt;", a_exit);
    IO.addOption("more &gt;", a_options);
    IO.addOption("-------------------", a_separator);
    IO.parseRoomCommands(IO.commandsLocal);
    IO.addOptions();
    IO.showActions();
  },
  // shows all locations for this game to quickly jump to
  showLocations: function() {
    IO.clearActions();
    IO.addOption("&lt;", a_options);
    IO.parseRoomCommands(IO.locationCommands);
    IO.addOptions();
    IO.showActions();
  },
  // show all the F keys
  showFKeys: function() {
    IO.clearActions();
    IO.addOption("&lt;", a_options);
    IO.parseRoomCommands(IO.FKeyCommands);
    IO.addOptions();
    IO.showActions();
  },
  // show a list of all gained avatars to choose
  showAvatars: function() {
    IO.clearActions();
    IO.addOption("&lt;", a_options);
    var avatarCommands = [];
    for (var id in IO.avatars) {
      var command = "$" + id;
      avatarCommands.push([command]);
      var obj = {};
      var prettyName = avatarNames[id];
      if (prettyName) {
        obj[command] = prettyName ? prettyName : ("Avatar " + id);
        IO.addPrettyVerbs(obj);
      }
    }
    IO.parseRoomCommands(avatarCommands);
    IO.addOptions();
    IO.showActions();
  },
  // show the special commands
  showOptions: function() {
    IO.clearActions();
    IO.addOption("&lt;", a_local_verbs);
    IO.addOption("press F key &gt;", a_f_keys);
    IO.addOption("select avatar &gt;", a_avatars);
    if (Utils.ObjHasItems(roomNames))
      IO.addOption("select location &gt;", a_locations);
    if (MultiplayerClient.enabled)
      IO.addOption("disable multiplayer", a_disable_multiplayer);
    IO.addOption("-------------------", a_separator);
    IO.parseRoomCommands(IO.commandsGlobal);
    IO.addOptions();
    IO.showActions();
  },
  // shows sub commands, that started with the given verb (such as "look at >")
  showSubActions: function(verb) {
    IO.clearActions();
    IO.addOption("&lt;", IO.commonCommandsActive ? a_global_verbs : a_local_verbs);
    var arr = [];
    for (var subject in IO.commands[verb])
      arr.push(subject);
    arr.sort();
    for (var i = 0; i < arr.length; i++)
      IO.addOption(IO.getPrettyVerb(arr[i]), verb + " " + arr[i]);
    IO.showActions();
  }
}

var Iphone =
{
  lastTouch: 0,

  init: function() {
    IO.screen.ontouchstart = Iphone.touchStart;
  },
  touchStart: function(evt) {
    var now = new Date().getTime();
    if ((now - Iphone.lastTouch) < 300) {
      var input = prompt("Enter your input:");
      if (input && Utils.Trim(input).length != 0) {
        IO.parseCommandLine(input);
      }
      return;
    }
    Iphone.lastTouch = now;
  }
}
