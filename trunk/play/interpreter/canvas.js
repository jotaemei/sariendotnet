/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="agi.js" />
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

// Canvas represents a virtual screen to draw the control lines to.
// This is all done non-visual, but features the exact mechanism of
// identifying a priority color for a given pixel.
var Canvas =
{
  jsx: "0123456789ABCDEFGHJKLMNOPQRSTUVWXYZabcdghijklmnpqrstuwxyz`~!@#$%^*()-+=_[]{}|:;,.<>/?",

  // the actual non-visual screen that holds data
  virtualScreen: new Array(160),

  // clears all data in the current virtual screen
  clear: function() {
    var screenWidth = this.virtualScreen.length;
    for (var i = 0; i < screenWidth; i++) {
      this.virtualScreen[i] = new Array(168);
    }
  },

  // loads a picture's control lines
  load: function(id) {
    this.clear();

    var map = CONTROLS[id];
    if (!map) return;
    var y = 0;
    var x = 0;
    var color = 4;
    var count = 0;
    for (var i = 0; i < map.length; i++) {
      var c = map.substr(i, 1);
      var pos = Canvas.jsx.indexOf(c);
      switch (pos) {
        case (16 * 5 + 4):
          count += 160;
          break;
        case (16 * 5 + 3):
          count += 128;
          break;
        case (16 * 5 + 2):
          count += 64;
          break;
        case (16 * 5 + 1):
          count += 32;
          break;
        case (16 * 5 + 0):
          count += 16;
          break;
        default:
          var d = pos / 5;
          count += Math.floor(d);
          color = (pos % 5) + 1;
          if (color == 5) color = 0;

          for (var run = x + count; x < run; x++) {
            Canvas.putPixel(x, y, color);
          }
          count = 0;

          if (x == 160) {
            x = 0;
            y += 1;
          }
          break;
      }
    }
  },

  // plot a pixel
  putPixel: function(x, y, color) {
    this.virtualScreen[x][y] = color;
  },

  getPixel: function(x, y) {
    var axis = this.virtualScreen[x];
    if (!axis)
      return 0;
    var color = 0;
    if (axis)
      var color = axis[y];
    return color ? color : 0;
  }
};