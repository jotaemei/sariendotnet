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
/// <reference path="text.js" />
/// <reference path="view.js" />

// Utils, a simple utility class for thing such as string manipulation.
var Utils =
{
  // adds characters to the left of string s to a length of count
  PadLeft: function(s, character, count) {
    s += "";
    while (s.length < count)
      s = character + s;
    return s;
  },
  // adds characters to the right of string s to a length of count
  PadRight: function(s, character, count) {
    s += "";
    while (s.length < count)
      s = s + character;
    return s;
  },
  // trims a string from its leading and trailing spaces
  Trim: function(s) {
    return !s ? "" : s.replace(/^\s*|\s*$/gi, "");
  },
  // returns a random number between min and max
  Random: function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  },
  // returns true if a javascript object contains items
  ObjHasItems: function(obj) {
    for (var o in obj)
      return true;
    return false;
  },
  // returns the number of items in obj
  ObjCount: function(obj) {
    var count = 0;
    for (var o in obj)
      count++;
    return count;
  },
  // returns true if arr contains item
  ArrayHasItem: function(arr, item) {
    for (var i = 0; i < arr.length; i++)
      if (arr[i] == item)
      return true;
    return false;
  },
  // returns the index number for an inventory item name
  inventoryNameToIndex: function(name) {
    var inv = window["INVENTORY"];
    if (!inv) inv = [];
    for (var i = 0; i < inv.length; i++) {
      if (inv[i].toLowerCase() == name.toLowerCase()) {
        return i;
      }
    }
    return -1;
  },
  // returns true if s matches any regular expression pattern
  matches: function(s, patterns) {
    for (var i = 0; i < patterns.length; i++) {
      var reg = new RegExp(patterns[i], "gi");
      if (s.match(reg))
        return true;
    }
    return false;
  }
};