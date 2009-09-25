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
/// <reference path="test.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

// Singleton class for displaying text and dialogs
var Text =
{
  cols: 40, // x
  rows: 25, // y
  queue: [],
  foregroundColor: 15, // white
  backgroundColor: 0, // black

  lines: [], // used to store text splitted over multiple lines
  dialog: null, // the dialog element
  messageShown: false, // true when a message is currently visible
  afterHideMessageHandler: null,

  visibleInventoryItem: null, // when shown, this is a view instance

  hideMessageTimer: 0, // used for automatically hiding messages after a timer

  // upon initialization, map the dialog element
  init: function() {
    Text.dialog = document.getElementById("dialog");
  },
  // clear all text
  clear: function() {
    for (var y = 0; y < Text.rows; y++)
      Text.clearLine(y);
    IO.showCommandLine()
  },
  // clear a single line of characters
  clearLine: function(y) {
    for (var x = 0; x < Text.cols; x++)
      Text.clearPos(x, y);
  },
  // clear a character at position x,y 
  clearPos: function(x, y) {
    var el = Text.lines[y * Text.cols + x];
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
      delete el;
    }
  },
  // adds a character c to position x,y with colors fg and bg
  addChar: function(x, y, c, fg, bg) {
    Text.clearPos(x, y);
    var el = document.createElement("div");
    el.innerHTML = c;
    el.style.left = ((x * 8 * AGI.zoom) + AGI.zoom) + "px";
    el.style.top = (((y - 1) * 8 * AGI.zoom) - AGI.zoom + 2) + "px";
    el.className = "char";
    if (!isNaN(fg)) el.className += " char_fg_" + fg;
    if (!isNaN(bg)) el.className += " char_bg_" + bg;
    document.getElementById("canvas").appendChild(el);
    Text.lines[y * Text.cols + x] = el;
  },
  // adds a line of text to position x,y with colors fg,bg
  add: function(x, y, s, fg, bg) {
    var eol = s.indexOf('\n');
    var remainder = 0;
    if (eol > -1) {
      remainder = s.substr(eol + 1).replace(/^\s/, "");
      s = s.substr(0, eol);
    }

    for (var i = 0; i < s.length; i++) {
      var c = s.substr(i, 1);
      Text.addChar(x + i, y, c, fg, bg);
    }

    if (remainder)
      Text.add(x, y + 1, remainder, fg, bg);
  },
  // hides a message
  hideMessage: function() {
    clearTimeout(Text.hideMessageTimer);
    if (Text.visibleInventoryItem) {
      Text.hideInventoryItem();
    }
    Text.clear();
    Text.dialog.style.display = "none";
    Text.messageShown = false;
    if (Text.queue.length > 0)
      Text.nextMessage();
    else {
      // optionally execute the afterHideMessageHandler
      var f = Text.afterHideMessageHandler;
      if (f) f();
      Text.afterHideMessageHandler = null;
    }
  },
  // shows a message
  displayMessage: function(msg) {
    Text.queue.push(msg);
    if (Text.queue.length == 1 && !Text.messageShown)
      Text.nextMessage();
  },
  nextMessage: function() {
    Text.queue.reverse();
    var msg = Text.queue.pop();
    Text.queue.reverse();

    if (Test.playing)
      return Test.displayMessage(msg);
    msg = msg.replace(/^\s+|\s+$/, "");

    msg = Text.parseMessage(msg);

    // break up the message in lines
    var lines = Text.getLines(msg, 30);

    // double check that lines actually do have content to display
    var isEmpty = true;
    for (var i = 0; i < lines.length; i++)
      if (lines[i].replace(/\s/g, "").length != 0)
      isEmpty = false;
    if (isEmpty) return;

    // clear a previous message
    Text.clear();

    // get the width, height, x and y position for the dialog
    var height = lines.length;
    var width = 0;
    for (var i = 0; i < lines.length; i++)
      width = Math.max(width, lines[i].length);
    var y = 11 - (Math.ceil(height / 2));
    var x = 20 - (Math.ceil(width / 2));
    for (var i = 0; i < height; i++) {
      Text.add(x, y + i, lines[i], 0);
    }

    // display the background and message
    Text.dialog.style.display = "block";
    Text.dialog.style.left = ((((x - 1) * 8 * AGI.zoom) + AGI.zoom) - 6) + "px";
    Text.dialog.style.top = ((((y - 2) * 8 * AGI.zoom) - AGI.zoom) + 8) + "px";
    Text.dialog.style.width = ((((width + 2) * 8 * AGI.zoom) + AGI.zoom) + 4) + "px";
    Text.dialog.style.height = ((((height + 2) * 8 * AGI.zoom) - AGI.zoom) - 11) + "px";
    Text.messageShown = true;

    //    if (!cmd_isset(15)) {
    AGI.pause();
    //      var seconds = vars[21];
    //      if (seconds > 0) {
    //        setTimeout(AGI.unpause, seconds * 1000);
    //      }
    //    }
  },
  // breaks up a string in lines
  getLines: function(msg, cols) {
    var lines = [];
    while (msg.length > cols || msg.indexOf('\n') != -1) {
      var lineBreak = Text.getLineBreak(msg, cols);
      var line = msg.substr(0, lineBreak).replace(/^\s|\s$/g, "");
      msg = msg.substr(lineBreak);
      lines.push(line);
    }
    lines.push(msg.replace(/^\s|\s$/g, ""));
    return lines;
  },
  // gets the best linebreak position
  getLineBreak: function(line, cols) {
    line = line.substr(0, cols);
    var max = line.indexOf('\n');
    if (max == -1) {
      var breakChars = [' ', '.', '-', ','];
      for (var i = 0; i < breakChars.length; i++) {
        var chr = breakChars[i];
        max = Math.max(line.lastIndexOf(chr), max);
      }
    }
    return max + 1;
  },
  // prompts for user input
  getInput: function(msg) {
    var result;
    if (Test.playing)
      result = Test.playInput(msg);
    else
      result = prompt(msg);
    if (Test.recording)
      Test.recordInput(result);
    return result;
  },
  // parses a message and replaces certain variable indexes by their values
  parseMessage: function(msg) {
    // if msg was passed by reference, look it up in the MESSAGES table for the current room
    if (!isNaN(msg))
      msg = MESSAGES[AGI.current_logic][msg];
    if (!msg)
      msg = "";
    msg = msg.replace(/\\/g, "");
    msg = msg.replace(/%s(\d+)/g, function(a, b) { return strings[b]; });
    msg = msg.replace(/%v(\d+)/g, function(a, b) { return vars[b]; });
    msg = msg.replace(/%m(\d+)/g, function(a, b) { return MESSAGES[AGI.current_logic][b]; });
    msg = msg.replace(/%g(\d+)/g, function(a, b) { return MESSAGES[0][b]; });
    msg = msg.replace(/%w(\d+)/g, function(a, b) { b--; return IO.lastTokens.length > (b - 1) ? IO.lastTokens[b] : "[word]"; });
    if (window["INVENTORY"])
      msg = msg.replace(/%(\d+)/g, function(a, b) { return window["INVENTORY"][b]; });
    return msg;
  },
  // shows the given inventory object and displays its description message
  showInventoryItem: function(id) {
    var description = VIEWS[id][0];
    if (!description)
      return Text.displayMessage("There's nothing to see.");
    Text.displayMessage(description);
    // load a view with loop 0 and cel 0 and position it center/bottom
    var view = new View();
    view.load(id);
    view.show();
    view.setPriority(15);
    var x = Math.round(80 - (view.width() / 2));
    var y = 168;
    view.position(x, y);
    Text.visibleInventoryItem = view;
  },
  // hides a visible inventory item
  hideInventoryItem: function() {
    Text.visibleInventoryItem.remove();
    Text.visibleInventoryItem = null;
  }
};