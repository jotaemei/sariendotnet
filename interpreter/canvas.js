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
  // the actual non-visual screen that holds data
  virtualScreen: new Array(160),

  // clears all data in the current virtual screen
  clear: function()
  {
    var screenWidth = this.virtualScreen.length;
    for (var i = 0; i < screenWidth; i++)
    {
      this.virtualScreen[i] = new Array(168);
    }
  },

  // loads a picture's control lines
  load: function(id)
  {
    this.clear();

    var lines = LINES[id];
    if (!lines)
      return;
    
    for (var i = 0; i < lines.length; i++)
    {
      var line = lines[i];
      // the fill priority command was added later, so a "L" flag was used to detect it
      var isFill = line[0] == "L";
      var start = isFill ? 1 : 0;
      var color = line[0 + start] + 1;
      var x1 = y1 = null;

      // draw all lines or fill the area
      for (var j = 1 + start; j < line.length; j += 2)
      {
        if (!x1 && !y1)
        {
          var x1 = line[j];
          var y1 = line[j + 1];
          if (isFill)
          {
            Canvas.fill(x1, y1, color);
            break;
          }
          else
          {
            // for lines with only one coordinate
            Canvas.putPixel(x1, y1, color);
          }
        }
        else
        {
          var x2 = line[j];
          var y2 = line[j + 1];
          this.drawLine(x1, y1, x2, y2, color);
          x1 = x2;
          y1 = y2;
        }
      }
    }
  },

  // plot a pixel
  putPixel: function(x, y, color)
  {
    this.virtualScreen[x][y] = color;
  },

  // get the color of a given pixel
  getPixel: function(x, y)
  {
    var axis = this.virtualScreen[x];
    if (!axis)
      return 0;
    var color = null;
    if (axis)
    {
      var color = axis[y];
    }
    return color ? color : 0;
  },

  // rounding point mechanism as used in the original AGI interpreter
  roundPoint: function(aNumber, dirn)
  {
    if (dirn < 0)
      return ((aNumber - Math.floor(aNumber) <= 0.501) ? Math.floor(aNumber) : Math.ceil(aNumber));
    return ((aNumber - Math.floor(aNumber) < 0.499) ? Math.floor(aNumber) : Math.ceil(aNumber));
  },

  // draw a line between two coordinates
  drawLine: function(x1, y1, x2, y2, color)
  {
    var height, width, x, y, addX, addY;

    height = (y2 - y1);
    width = (x2 - x1);
    addX = (height == 0 ? height : width / Math.abs(height));
    addY = (width == 0 ? width : height / Math.abs(width));

    if (Math.abs(width) > Math.abs(height))
    {
      y = y1;
      addX = (width == 0 ? 0 : (width / Math.abs(width)));
      for (x = x1; x != x2; x += addX)
      {
        this.putPixel(this.roundPoint(x, addX), this.roundPoint(y, addY), color);
        y += addY;
      }
      this.putPixel(x2, y2, color);
    }
    else
    {
      x = x1;
      addY = (height == 0 ? 0 : (height / Math.abs(height)));
      for (y = y1; y != y2; y += addY)
      {
        this.putPixel(this.roundPoint(x, addX), this.roundPoint(y, addY), color);
        x += addX;
      }
      this.putPixel(x2, y2, color);
    }
  },

  // flood fill at a given point. Fills all pixels until a non-0 pixel is found.
  // (used for filling ego_on_water areas)
  fill: function(x, y, color)
  {
    var maxPixels = 320 * 200;
    var pixelsFilled = 0;

    fillStack = new Array();
    fillStack.push([x, y]);

    while (fillStack.length > 0 && pixelsFilled++ < maxPixels)
    {
      var pixel = fillStack.pop();
      var x1 = pixel[0];
      var y1 = pixel[1];

      if (Canvas.okToFill(x1, y1))
      {
        Canvas.putPixel(x1, y1, color);

        if (y1 != 0 && Canvas.okToFill(x1, y1 - 1))
          fillStack.push([x1, y1 - 1]);
        if (x1 != 0 && Canvas.okToFill(x1 - 1, y1))
          fillStack.push([x1 - 1, y1]);
        if (x1 != 159 && Canvas.okToFill(x1 + 1, y1))
          fillStack.push([x1 + 1, y1]);
        if (y1 != 167 && Canvas.okToFill(x1, y1 + 1))
          fillStack.push([x1, y1 + 1]);
      }
    }
  },

  // helper method to identify if a given pixel is ok to fill
  okToFill: function(x, y)
  {
    if (x < 0 || y < 0 || x > 159 || y > 167)
      return false;
    var px = Canvas.getPixel(x, y);
    return (isNaN(px) || px == 0);
  },

  // gets the boundary number for a range of horizontal pixels
  getBoundary: function(x1, x2, y)
  {
    for (var x = x1; x <= x2; x++)
    {
      var color = this.getPixel(x, y);
      if (color > 0)
        return color;
    }
    return 0;
  }
};