using System;
using System.Collections.Generic;
using System.Web;
using System.Text;
using System.Text.RegularExpressions;

namespace AGI
{
  public class XmlView
  {
    private int id;
    private string description;
    private List<XmlLoop> loops = new List<XmlLoop>();

    public XmlView(int id)
    {
      this.id = id;
      this.description = "";
    }

    public int Id
    {
      get { return id; }
      set { id = value; }
    }
    
    public string Description
    {
      get { return description; }
      set { description = value; }
    }

    public List<XmlLoop> Loops
    {
      get { return loops; }
    }

    public int Width
    {
      get
      {
        int result = 0;
        foreach (XmlLoop l in loops)
        {
          result = Math.Max(l.Width, result);
        }
        return result;
      }
    }

    public int Height
    {
      get
      {
        int result = 0;
        foreach (XmlLoop l in loops)
        {
          result += l.Height;
        }
        return result;
      }
    }

    public string Js
    {
      get
      {
        string quote = "\"";
        string description = Description.Replace(quote, @"\" + quote);
        description = description.Replace(@"\\" + quote, @"\" + quote);
        description = description.Replace("\n", "\\n");

        string js = String.Format("{0}:[{1},\n", Id, (String.IsNullOrEmpty(Description) ? "0" : quote + description + quote));
        int loopNr = 0;
        int loopOffset = 0;

        foreach (XmlLoop l in Loops)
        {
          js += "[\n";
          int celNr = 0;
          int celOffsetX = 0;
          foreach (XmlCel c in l)
          {
            // cellOffsetY is the difference between the max height for this loop, and the height of the current cel of that loop
            int celOffsetY = (l.Height - c.Height + 1) * XmlGame.Zoom;

            // each cel box has the exact width and height of that cel, including zoom of course
            // the image inside the cel box is positioned according to the x and y offsets of the cel inside the total image
            js += String.Format("[{0},{1},{2},{3},{4}],\n", c.Width * 2 * XmlGame.Zoom, c.Height * XmlGame.Zoom, (-c.Height + 1) * XmlGame.Zoom, -celOffsetX, -loopOffset);

            celNr++;
            celOffsetX += c.Width * 2 * XmlGame.Zoom;
          }
          loopNr++;
          loopOffset += l.Height * XmlGame.Zoom;
          js = js.TrimEnd(',','\n') + "],\n";
        }
        js = js.TrimEnd(',','\n') + "],\n";

        return js;
      }
    }
  }

  public class XmlLoop : List<XmlCel>
  {
    public int Width
    {
      get
      {
        int result = 0;
        foreach (XmlCel c in this)
        {
          result += c.Width;
        }
        return result;
      }
    }

    public int Height
    {
      get
      {
        int result = 0;
        foreach (XmlCel c in this)
        {
          result = Math.Max(c.Height, result);
        }
        return result;
      }
    }
  }

  public class XmlCel
  {
    private int width;
    private int height;

    public XmlCel(int width, int height)
    {
      this.width = width;
      this.height = height;
    }

    public int Width
    {
      get { return width; }
      set { width = value; }
    }

    public int Height
    {
      get { return height; }
      set { height = value; }
    }
  }
}