using System;
using System.Collections;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.Drawing.Drawing2D;

namespace AGI
{
  internal class Canvas
  {
    public Canvas(int canvasWidth, int canvasHeight)
    {
      bmp = new Bitmap(canvasWidth, canvasHeight);
      g = Graphics.FromImage(bmp);
      colorPalette = new ArrayList();
      brush = new SolidBrush(Color.Lime);
      width = canvasWidth;
      height = canvasHeight;
    }    

    private Bitmap bmp;
    private Graphics g;
    private SolidBrush brush;
    private ArrayList colorPalette;
    private int width;
    private int height;

    public int SetColor(string hexCode)
    {
      Color color;
      int r, g, b = 0;
      if (hexCode.StartsWith("#"))
        hexCode = hexCode.Substring(1);
      if (hexCode.Length == 6)
      {
        r = hexToInt(hexCode.Substring(0,2));
        g = hexToInt(hexCode.Substring(2,2));
        b = hexToInt(hexCode.Substring(4,2));
        color = Color.FromArgb(r, g, b);
      }
      else
      {
        color = Color.White;
      }
      return colorPalette.Add(color);
    }

    public void SetPixel(int x, int y, int colorIndex)
    {
      bmp.SetPixel(x, y, (Color)colorPalette[colorIndex]);
    }

    public int GetPixel(int x, int y)
    {
      Color color = bmp.GetPixel(x, y);
      for (int i=0; i<colorPalette.Count; i++)
      {
        if (color == (Color)colorPalette[i])
          return i;
      }
      return -1;
    }

    public void DrawLine(int x1, int y1, int x2, int y2, int colorIndex)
    {
       int height, width;
       float x, y, addX, addY;

       height = (y2 - y1);
       width = (x2 - x1);
       addX = (height==0? height:(float)width/Math.Abs(height));
       addY = (width==0? width:(float)height/Math.Abs(width));

       if (Math.Abs(width) > Math.Abs(height)) 
       {
          y = y1;
          addX = (width == 0? 0 : (width/Math.Abs(width)));
          for (x=x1; x!=x2; x+=addX) 
          {
             SetPixel(round(x, addX), round(y, addY), colorIndex);
             y+=addY;
          }
          SetPixel(x2, y2, colorIndex);
       }
       else 
       {
          x = x1;
          addY = (height == 0? 0 : (height/Math.Abs(height)));
          for (y=y1; y!=y2; y+=addY) 
          {
             SetPixel(round(x, addX), round(y, addY), colorIndex);
             x+=addX;
          }
          SetPixel(x2, y2, colorIndex);
       }
    }

    public void SetTransparentColor(int colorIndex)
    {
      bmp.MakeTransparent((Color)colorPalette[colorIndex]);
    }

    public void FillBackground(int colorIndex)
    {
      FillRectangle(colorIndex, 0, 0, width, height);
    }

    public void FillRectangle(int colorIndex, int x, int y, int width, int height)
    {
      brush.Color = (Color)colorPalette[colorIndex];
      g.FillRectangle(brush, x, y, width, height);
    }

    public void SaveAsPng(string filepath)
    {
      g.DrawImage(bmp, 0, 0);
      g.Dispose();

      bmp = new OctreeQuantizer(16, 4).Quantize(bmp);
      bmp.Save(filepath, ImageFormat.Png);
    }

    public void SaveThumb(string filepath, int width, int height)
    {
      g.DrawImage(bmp, 0, 0);
      g.Dispose();

      bmp = new OctreeQuantizer(16, 4).Quantize(bmp);
      bmp = ResizeImage(bmp, width, height);
      bmp.Save(filepath, ImageFormat.Jpeg);
    }

    public Bitmap GetBitmap()
    {
      g.DrawImage(bmp, 0, 0);
      g.Dispose();
      return bmp;
    }

    private int hexToInt(string hexCode)
    {
      return int.Parse(hexCode, NumberStyles.HexNumber, null);
    }

    private int round(float aNumber, float dirn)
    {
      if (dirn < 0)
        return ((aNumber - Math.Floor(aNumber) <= 0.501) ? (int)Math.Floor(aNumber) : (int)Math.Ceiling(aNumber));
      return ((aNumber - Math.Floor(aNumber) < 0.499) ? (int)Math.Floor(aNumber) : (int)Math.Ceiling(aNumber));
    }

    public static Bitmap ResizeImage(Bitmap bmp, int width, int height)
    {
      // Transform image.
      Bitmap bmpNew = new Bitmap(width, height);
      Graphics g = Graphics.FromImage(bmpNew);

      g.InterpolationMode = InterpolationMode.HighQualityBicubic;
      g.SmoothingMode = SmoothingMode.HighQuality;
      g.PixelOffsetMode = PixelOffsetMode.HighQuality;
      g.CompositingQuality = CompositingQuality.HighQuality;

      g.DrawImage(bmp, 0, 0, width, height);
      g.Save();

      // Clean up.
      bmp.Dispose();
      g.Dispose();

      return bmpNew;
    }
  }
}