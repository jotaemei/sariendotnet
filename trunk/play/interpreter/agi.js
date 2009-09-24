/// <reference path="MultiplayerClient.js" />
/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
/// <reference path="hacks.js" />
/// <reference path="io.js" />
/// <reference path="menu.js" />
/// <reference path="picture.js" />
/// <reference path="reservedwords.js" />
/// <reference path="sarien.js" />
/// <reference path="sound.js" />
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

// global variable storage
var MESSAGES = []; // holds game messages per logic
var CONTROLS = {};
var WORDS = []; // holds words referenced by said command, said(42) -> said("bla")
var roomNames = {}; // optionally contains pretty room names for use in the addressbar after the hash
var avatarNames = {}; // optionally contains pretty avatar names for use in the avatar picker
var multiplayerRooms = {}; // contains a list of rooms that allow multiplayer
var vars = []; // stores variables used by the interpreter
var flags = []; // stores flags used by the interpreter
var objects = []; // stores objects used by the interpreter
var c = []; // stores control keys used by the interpreter
var items = {}; // stores inventory items found by the player
var controllers = []; // stores controllers, not used
var strings = []; // stores string values such
var jumptoLine = 0; // the javascript equivalent of goto, used inside a huge switch/case clause within each logic file
var roomEntryPoints = {}; // used for initially positioning ego when entering a room by url

// AGI, the interpreter
var AGI =
{
  block: false, // either false or an object {x1, y1, x2, y2}, used for creating a barrier in a room
  break_all_logics: true, // flag to break out of all logics after cmd_new_room is given
  current_logic: 0, // the current logic being executed by the interpreter
  current_room: 0, // the current room
  control: 0, // control scheme, either player control or program control
  game_id: "", // the id of the current game, stored by the initial logic run
  highestObjIndex: 0, // highest object index ever stored in the objects array
  horizon: 0, // the game horizon
  interval: 42, // interpreter interval used for each cycle, not set to mimic original AGI
  new_room: 0, // when cmd_new_room is called, this is set to the room number
  picture: null, // will contain a Picture instance
  paused: false, // when enabled, this will not do any object manipulation per cycle
  priorityTable: [], // contains standard priority layer information numbers
  screen: 0, // either graphics or text, used to switch between the two
  screen_width: 160, // initial width of an AGI picture resource
  screen_height: 168,
  startMilliseconds: 0, // timestamp of startup
  zoom: 2, // zoom can be used in the future for showing a larger or smaller game
  stopped: false,
  cycle: 0,

  // initializes the interpreter and sets variable values
  init: function() {
    // set global varnames (v1, v2, ...), flagnames and others to their initial value
    for (var i = 0; i < 256; i++) {
      window["o" + i] = i; // oN will be value N, so values can be addressed by pointers
      window["f" + i] = i; // fN will be value N, so values can be addressed by pointers
      window["v" + i] = i; // vN will be value N, so values can be addressed by pointers
      window["c" + i] = i; // cN will be value N, so values can be addressed by pointers
      window["i" + i] = i; // iN will be value N, so values can be addressed by pointers
      window["s" + i] = i; // sN will be value N, so values can be addressed by pointers
      window["m" + i] = i; // mN will be value N, so values can be addressed by pointers
      vars[i] = 0;
      flags[i] = 0;
      objects[i] = 0;
      controllers[i] = 0;
      strings[i] = "";
    };

    // if any pretty room names are given, add the inverse name lookup too
    for (var i in roomNames)
      roomNames[roomNames[i]] = i;

    AGI.control = c_program_control;
    AGI.screen = s_graphics_screen;
    AGI.picture = new Picture();
    this.startMilliseconds = new Date().getTime();
    this.initPriorityTable();

    // allow initialization of other singletons
    IO.init();
    Text.init();
    Menu.init();

    // if test recording or playing is enabled, delay AGI start
    if (Test.recording || Test.playing)
      Test.init();
    else
      AGI.start();
  },

  // starts the game
  start: function() {
    // set logic 0 to load
    cmd_set(flag_new_room)
    cmd_call(0);

    // now that game_id is set, enable game hacks
    Hacks.init(AGI.game_id);
    MultiplayerClient.init();

    // parse all available "said" commands for logic 0 and store them in commandsGlobal
    IO.commandsGlobal = IO.getCommands(0);

    // if the addressbar contains a hash, start there
    if (Sarien.checkForHashChange()) {
      cmd_set(flag_game_restarted);
      AGI.control = c_player_control;
      cmd_set(flag_menu_enabled);
      Hacks.afterInitialRoomChange(AGI.game_id);
    }

    // focus the game area
    document.getElementById("canvas").focus();

    // and start cycling
    AGI.interpretCycle();
  },

  // stores all horizontal priority boundaries
  initPriorityTable: function() {
    var y = 0;
    for (var p = 1; p < 15; p++)
      for (var i = 0; i < 12; i++)
      AGI.priorityTable[y++] = p < 4 ? 4 : p;
  },

  // The main interpreter cycle, called every interval.
  // Basically this cycle checks direction of movement, updates all objects
  // and calls logic 0 (which subsequently can call other logic files).
  // A logic number is usually connected to its room number, but room logics might
  // call subsequent non-bound "common" logic files.
  interpretCycle: function() {
    AGI.cycle++;
    // count time consumption per cycle and subtract it from the next interval number
    var cycleStarted = new Date().getTime();

    // allow cycling by other singletons
    IO.setSpeed(vars[var_cycle_delay]);
    Test.cycle();
    Hacks.cycle(AGI.game_id);
    IO.cycle();
    Menu.cycle();
    MultiplayerClient.cycle();

    // update the internal clock variables
    AGI.updateClock();

    // main code, only execute when not paused
    if (!AGI.paused) {
      var ego = getEgo();
      //if (!ego.x && !ego.y)
      //Sarien.placeAtEntryPoint();
      // for player control, store the current direction
      if (AGI.control == c_player_control)
        vars[var_ego_dir] = ego.direction;
      // for program control, set its value to the value stored in a var by logic
      else
        ego.direction = vars[var_ego_dir];

      // calculate new direction and motion types for all objects
      AGI.checkAllMotions();

      // call logic 0
      AGI.break_all_logics = false;
      jumpTo(0);
      logic0();
      ego.direction = vars[var_ego_dir];

      // when cmd_new_room is issued, delay the consequences 1 cycle (this is really important).
      if (AGI.new_room > 0)
        AGI.new_room = 0;
      else {

        // load a saved state
        if (State.stateToLoad)
          State.load();

        // when a new room was issued
        if (cmd_isset(flag_new_room)) {

          // reset the flag
          cmd_reset(flag_new_room);

          // all logics files for the current room are set, so parse their said actions for the gui
          IO.commandsLocal = IO.getCommands(IO.currentRoomLogics, true);
          IO.parseRoomCommands(IO.commandsLocal);
        }
        // otherwise process the cycle as usual
        else {
          cmd_assignn(var_unknown_word_no, 0);
          cmd_assignn(var_object_touching_edge, 0);
          cmd_assignn(var_object_edge_code, 0);
          cmd_reset(flag_game_restarted);
          cmd_reset(flag_game_restored);

          // check if sounds have ended and should set their flags
          Sound.setFlags();

          // update loops, views, cells and positions when graphics screen is set
          if (AGI.screen == s_graphics_screen)
            AGI.updateAllViews();

          // see if the user manually changed the hash in the addressbar
          Sarien.checkForHashChange();
        }
      }
    }

    // doublecheck priority screen to potentially reset a previously set trigger (fixes sq2 swamp bug)
    var ego = getEgo();
    if (ego.x || ego.y)
      ego.checkPriority();

    // for test recording and playing, process their commands
    Test.processCycleCommands();

    IO.said = [];
    // calculate interval ms and schedule next cycle
    var cycleEnded = new Date().getTime();
    var interval = Math.max(0, AGI.interval - (cycleEnded - cycleStarted));
    if (!AGI.stopped)
      setTimeout(AGI.interpretCycle, interval);
  },

  // for all objects under interpreter control, calculates directions and movement type
  checkAllMotions: function() {
    for (var i = 0; i <= AGI.highestObjIndex; i++) {
      var obj = objects[i];
      if (obj && obj.id > -1 && obj.ANIMATED && obj.UPDATE && obj.DRAWN)
        obj.checkMotion();
    }
  },

  // for all objects under interpreter control, updates loop, cell, view, direction and position
  updateAllViews: function() {
    for (var i = 0; i <= AGI.highestObjIndex; i++) {
      var obj = objects[i];
      if (obj && obj.id > -1 && obj.ANIMATED && obj.UPDATE && obj.DRAWN) {
        obj.updateViewTableEntry();
        obj.updatePosition();
        obj.update();
      }
    }
    // reset ego land/water
    var ego = getEgo();
    ego.ON_WATER = false;
    ego.ON_LAND = false;
  },

  // updates the internal clock variables. Lots of logic depends on this
  updateClock: function() {
    var ms = new Date().getTime() - AGI.startMilliseconds;
    var hours = Math.floor(ms / (1000 * 60 * 60));
    ms -= hours * (1000 * 60 * 60);
    var minutes = Math.floor(ms / (1000 * 60));
    ms -= minutes * (1000 * 60);
    var seconds = Math.floor(ms / 1000);

    // store values
    vars[var_clock_hours] = hours;
    vars[var_clock_minutes] = minutes;
    vars[var_clock_seconds] = seconds;
  },

  // pause the game and do not process any further movement or cycle updates
  pause: function() {
    AGI.paused = true;
  },

  // continue the game
  unpause: function() {
    if (Text.messageShown)
      Text.hideMessage();
    if (!Text.messageShown)
      AGI.paused = false;
  },

  // changes the avatar of ego to the specified view
  // @param id = the view number to set
  setAvatar: function(id) {
    cmd_set_view(0, id);
  },

  // stops the agi cycling
  stop: function() {
    this.stopped = true;
    Multiplayer.disconnect();
  },

  // returns the priority number from the virtual screen, in combination with
  // all static objects that have margins (which add priority blocks)
  getPriority: function(x, y) {
    var color = Canvas.getPixel(x, y);
    if (!color) {
      var checkStaticObjects = AGI.picture.staticObjects.length > 0;
      if (checkStaticObjects)
        color = AGI.picture.getBoundaryFromStaticObjects(x, y);
    }
    return color;
  }
};

// jumpTo sets the line number, to allow a goto mechanism in logics
function jumpTo(lineNr) {
  if (AGI.current_logic == jumpTo.lastLogic) {
    jumpTo.count = isNaN(jumpTo.count) ? 0 : jumpTo.count + 1;
    if (jumpTo.count > 500) {
      alert("Press any key to continue.");
      IO.key_pressed = true;
      jumpTo.count = 0;
    }
  }
  else
    jumpTo.count = 0;
    
  jumptoLine = lineNr;
  jumpTo.lastLogic = AGI.current_logic;
};