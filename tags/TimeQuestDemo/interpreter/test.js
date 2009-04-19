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

// used for recording and playing testruns, used for personal unittesting, and future funny stuff like recording all possible deaths in a game
var Test =
{
  testdata: null,
  log: null,

  recording: false,
  playing: false,

  current_cycle: 0,
  data: {},

  commands: null,
  current_cycle_commands: null,

  playIndex: 0,

  init: function()
  {
    var el = document.createElement("textarea");
    document.body.appendChild(el);
    el.id = "testdata";
    Test.testdata = el;

    var el = document.createElement("textarea");
    document.body.appendChild(el);
    el.id = "log";
    Test.log = el;

    var el = document.createElement("button");
    el.id = "play";
    el.innerHTML = "play";
    el.onclick = Test.play;
    document.body.appendChild(el);

    var el = document.createElement("button");
    el.id = "record";
    el.innerHTML = "record";
    el.onclick = Test.record;
    document.body.appendChild(el);

    if (Test.recording)
      AGI.start();
  },

  // called each interpreter cycle
  cycle: function()
  {
    Test.current_cycle++;
    Test.current_cycle_commands = null;

    // if we're playing, prepare the current action object for this cycle, if any
    if (Test.playing)
    {
      var currentAction = Test.commands[Test.playIndex];
      if (!currentAction)
        return;

      var actionCycle = currentAction.replace(/^(\d+)\,.*$/g, "$1") * 1;
      while (!isNaN(actionCycle) && actionCycle == Test.current_cycle)
      {
        if (!Test.current_cycle_commands)
          Test.current_cycle_commands = {};

        var type = currentAction.replace(/^\d+\,(\w+)\,.*$/g, "$1");
        var action = currentAction.replace(/^\d+\,\w+\,(.*)$/g, "$1");
        Test.current_cycle_commands[type] = action;

        // store values of this cycle
        Test.playIndex++;
        currentAction = Test.commands[Test.playIndex];
        actionCycle = currentAction.replace(/^(\d+)\,.*$/g, "$1") * 1;
      }
    }
  },
  // called after every interpreter cycle, to execute any recorded io-based events
  processCycleCommands: function()
  {
    // if commands are available for this cycle, execute those that we can right now
    var c = Test.current_cycle_commands;
    if (c)
    {
      if (c.k)
        Test.playKeyPress(c.k);
      if (c.d)
        Test.playDirection(c.d);
      if (c.a)
        Test.playAction(c.a);
    }
  },
  displayMessage: function(msg)
  {
    Test.log.value += msg + "\n";
    Test.log.scrollTop = Test.log.scrollHeight;
  },

  // record methods
  recordDirection: function(n)
  {
    Test.testdata.value += Test.current_cycle + ",d," + n + ";\n";
    Test.testdata.scrollTop = Test.testdata.scrollHeight;
  },
  recordKeyPress: function(n)
  {
    Test.testdata.value += Test.current_cycle + ",k," + n + ";\n";
    Test.testdata.scrollTop = Test.testdata.scrollHeight;
  },
  recordInput: function(n)
  {
    Test.testdata.value += Test.current_cycle + ",i," + n + ";\n";
    Test.testdata.scrollTop = Test.testdata.scrollHeight;
  },
  recordAction: function(n)
  {
    Test.testdata.value += Test.current_cycle + ",a," + n + ";\n";
    Test.testdata.scrollTop = Test.testdata.scrollHeight;
  },
  recordRandom: function(n)
  {
    Test.testdata.value += Test.current_cycle + ",r," + n + ";\n";
    Test.testdata.scrollTop = Test.testdata.scrollHeight;
  },

  // play methods
  playInput: function(msg)
  {
    var c = Test.current_cycle_commands;
    if (c)
    {
      if (c.i)
      {
        Test.log.value += msg + " " + c.i + "\n";
        return c.i;
      }
    }
  },
  playDirection: function(n)
  {
    getEgo().direction = n * 1;
    IO.key_pressed = true;
  },
  playKeyPress: function(n)
  {
    IO.key_code = n;
    IO.key_pressed = true;
  },
  playAction: function(n)
  {
    Test.log.value += "said:" + n + "\n";
    IO.parse(n);
  },
  playRandom: function()
  {
    var c = Test.current_cycle_commands;
    if (c)
    {
      if (c.r)
      {
        Test.log.value += "random:" + c.r + "\n";
        return c.r * 1;
      }
    }
  },

  play: function()
  {
    var s = Utils.Trim(Test.testdata.value).replace(/\n|\r/g, "");
    Test.commands = s.split(';');
    AGI.start();
  },

  record: function()
  {
    var recordStartCycle = prompt("Start cycle:", Test.current_cycle);
    if (!recordStartCycle)
      return;

    Test.current_cycle = recordStartCycle;
    Test.playing = false;
    Test.recording = true;
    Test.log.value += "Recording.\n";
    var sofar = "";
    for (var i = 0; i < Test.playIndex; i++)
    {
      sofar += Test.commands[i] + ";\n";
    }
    Test.testdata.value = sofar;
    Test.testdata.scrollTop = Test.testdata.scrollHeight;
  }
};