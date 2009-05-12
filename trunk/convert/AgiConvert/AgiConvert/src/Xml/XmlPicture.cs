using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace AGI
{
  public class XmlPicture
  {
    // priority band info for proper z-index setting per priority index
    public static readonly int[] PriorityBand = { 0, 0, 0, 0, 0, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 999 };

    private int id;
    private List<XmlLayer> layers = new List<XmlLayer>();
    private List<XmlLine> lines = new List<XmlLine>();
    public string ControlMap = "";

    public XmlPicture(int id)
    {
      this.id = id;
    }

    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    public List<XmlLayer> Layers
    {
      get { return layers; }
    }

    public List<XmlLine> Lines
    {
      get { return lines; }
    }
    
    public string JsVisual
    {
      get
      {
        string js = "";
        js = String.Format("{0}:{{\n", Id);
        foreach (XmlLayer l in layers)
        {
          int zIndex = l.Priority <= 4 ? 0 : PriorityBand[l.Priority] - 1;
          js += String.Format("{0}:[{1},{2},{3}],", l.Priority, l.Left * 2 * XmlGame.Zoom, l.Top * XmlGame.Zoom, zIndex);
        }
        js = js.TrimEnd(',', '\n') + "},\n";
        return js;
      }
    }

    public string JsPriority
    {
      get
      {
        return String.Format("{0}:\"{1}\",\n", Id, ControlMap);
      }
    }
  }

  public class XmlLayer
  {
    private int priority;
    private int width;
    private int height;
    private int left;
    private int top;
    private List<XmlLine> lines = new List<XmlLine>();

    public int Priority
    {
      get { return priority; }
      set { priority = value; }
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
    public int Left
    {
      get { return left; }
      set { left = value; }
    }
    public int Top
    {
      get { return top; }
      set { top = value; }
    }

    public List<XmlLine> Lines
    {
      get { return lines; }
    }
  }

  public class XmlLine
  {
    private bool isFill = false;
    private int priority;
    private List<XmlCoord> coordinates = new List<XmlCoord>();

    public int Priority
    {
      get { return priority; }
      set { priority = value; }
    }

    public List<XmlCoord> Coordinates
    {
      get { return coordinates; }
    }

    public bool IsFill
    {
      get { return isFill; }
      set { isFill = value; }
    }
  }

  public struct XmlCoord
  {
    public int X;
    public int Y;
  }
}