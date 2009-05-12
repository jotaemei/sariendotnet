using System;
using System.Collections;
using System.IO;
using System.Text;
using System.Xml;

namespace AGI
{
  public class Picture
  {
    public Picture()
    {
    }

    public void Load(string fileName, string pictureId)
    {
      id = pictureId;
      agpFileName = fileName;
      loadFile();
      InitValues();
      parseData();
      fixPriorityCanvas();
      buildPriorityCanvases();
      goaDoc.DocumentElement.SetAttribute("control", GetJsxControlMap());
    }
    
    public void SetZoom(int x, int y)
    {
      zoomX = x;
      zoomY = y;
    }

    public XmlDocument GetPictureXml()
    {
      return pictureDoc;
    }

    public XmlDocument GetGoaXml()
    {
      return goaDoc;
    }

    public void SavePictureAsPng(string fileName)
    {
      pictureCanvas.SaveAsPng(fileName);
    }

    public void SaveThumb(string fileName, int width, int height)
    {
      pictureCanvas.SaveThumb(fileName, width, height);
    }

    public void SavePriorityAsPng(string fileName)
    {
      priorityCanvas.SaveAsPng(fileName);
    }

    public void SaveControlAsPng(string fileName)
    {
      controlCanvas.SaveAsPng(fileName);
    }

    public void SavePriorityLayers(string folderPath)
    {
      for (int i=15; i>=4; i--)
      {
        if (prioritiesUsed[i])
        {
          string fileName = folderPath + "\\picture" + id.PadLeft(3, '0') + "-" + ("" + i).PadLeft(2, '0') + ".png";
          Canvas canvas = (Canvas)priorityCanvases.Pop();
          canvas.SaveAsPng(fileName);
        }
      }
    }

    private string        id;
    private string        agpFileName;
    private byte[]        fileData;
    private Canvas        pictureCanvas;
    private Canvas        priorityCanvas;
    private Canvas        controlCanvas;
    private XmlDocument   pictureDoc;                 
    private XmlDocument   goaDoc;                 
    private XmlElement    layersNode;                 
    private bool          pictureDrawingEnabled;   
    private bool          priorityDrawingEnabled;  
    private byte          pictureColor;        
    private byte          priorityColor;       
    private Stack         fillStack;
    private bool[]        prioritiesUsed;
    private bool          isGoaCommand;
    private Stack         priorityCanvases;
    private int           zoomX = 1;
    private int           zoomY = 1;
    
    public string[] ColorPalette = new string[16]
    {
      "000000", "0000A0", "00A000", "008888",
      "8A0000", "8A0088", "885000", "888888",
      "505050", "5050FF", "50FF50", "50FFFF",
      "FF5050", "FF50FF", "FFFF50", "FFFFFF"
    };
    private string[] commands = new string[11]
    {
      "enable-picture-draw",
      "disable-picture-draw",
      "enable-priority-draw",
      "disable-priority-draw",
      "line",
      "line",
      "line",
      "line",
      "fill",
      "change-pen",
      "plot"
    };
    
    private void loadFile()
    {
      // read data into byte array
      FileStream fs = new FileStream(agpFileName, FileMode.Open, FileAccess.Read);
      long fileSize = fs.Length;
      fileData      = new byte[fileSize];
      using (BinaryReader r = new BinaryReader(fs, Encoding.Default))
      {
        for (int i=0; i<fileSize; i++)
        {
          fileData[i] = r.ReadByte();
        }
      }
      fs.Close();
    }
    
    public void InitValues()
    {
      pictureCanvas               = new Canvas(160, 168);
      priorityCanvas              = new Canvas(160, 168);
      controlCanvas               = new Canvas(160, 168);
      pictureDoc                  = new XmlDocument();
      goaDoc                      = new XmlDocument();
      prioritiesUsed              = new bool[16];
      priorityCanvases            = new Stack();
      pictureColor                = 15;
      priorityColor               = 4;
      pictureDrawingEnabled       = false;
      priorityDrawingEnabled      = false;
      isGoaCommand                = false;

      for (int i=0; i<16; i++)
      {
        pictureCanvas.SetColor(ColorPalette[i]);
        priorityCanvas.SetColor(ColorPalette[i]);
        controlCanvas.SetColor(ColorPalette[i]);
        prioritiesUsed[i] = false;
      }

      prioritiesUsed[4] = true;

      pictureCanvas.FillBackground(15);
      priorityCanvas.FillBackground(4);
      controlCanvas.FillBackground(4);
    }
    
    private void parseData()
    {
      byte command              = 0;
      int argumentCount         = 0;
      int startX                = 0;
      int startY                = 0;
      int commandCount          = 0;
      XmlElement commandNode    = null;
      XmlElement goaCommandNode = null;
      XmlElement argNode        = null;
      PenType penType = PenType.Solid;
      PenShape penShape = PenShape.Square;
      byte penSize = 0;
      
      XmlElement pictureNode = pictureDoc.CreateElement("picture");
      pictureDoc.AppendChild(pictureNode);
      pictureNode.SetAttribute("id", id);

      XmlElement goaPictureNode = goaDoc.CreateElement("picture");
      goaPictureNode.SetAttribute("id", id);
      layersNode = goaDoc.CreateElement("layers");
      XmlElement controlLinesNode = goaDoc.CreateElement("control-lines");
      goaDoc.AppendChild(goaPictureNode);
      goaPictureNode.AppendChild(layersNode);
      goaPictureNode.AppendChild(controlLinesNode);

      int stop = 11;
      for (int i=0; i<fileData.Length; i++)
      {
        byte c = fileData[i];    

        if (c >= 240 && c <= 250)
        {
          commandCount++;
          argumentCount         = 0;
          command               = c;
          string commandString  = commands[c - 240];
          commandNode           = pictureDoc.CreateElement(commandString);
          pictureNode.AppendChild(commandNode);
          
          //if (commandCount == stop)
            //break;
        }
        if (c == 241)
          pictureDrawingEnabled = false;
        if (c == 243)
          priorityDrawingEnabled = false;
        // build up the goa doc
        if (c >= 244 && c <= 247 && priorityDrawingEnabled && priorityColor <= 4)
        {
          goaCommandNode = goaDoc.CreateElement("line");
          goaCommandNode.SetAttribute("priority", "" + priorityColor);
          controlLinesNode.AppendChild(goaCommandNode);
        }
        if (c == 248 && priorityDrawingEnabled && priorityColor <= 4)
        {
          goaCommandNode = goaDoc.CreateElement("fill");
          goaCommandNode.SetAttribute("priority", "" + priorityColor);
          controlLinesNode.AppendChild(goaCommandNode);
        }
        // add command arguments to command nodes
        if (c < 240)
        {
          bool even = argumentCount % 2 == 0;
          switch(command)
          {
            case 240: // enable picture draw and set picture color
              commandNode.SetAttribute("color", "" + c);
              pictureDrawingEnabled = true;
              pictureColor = c;
              break;
            case 242: // enable priority draw and set priority color
              commandNode.SetAttribute("color", "" + c);
              priorityDrawingEnabled = true;
              priorityColor = c;
              break;
            case 244: // y-corner
            case 245: // x-corner
              if (argumentCount == 0)
              {
                argNode = pictureDoc.CreateElement("coord");
                argNode.SetAttribute("x", "" + c);
                commandNode.AppendChild(argNode);
                startX = c;
              }
              else if (argumentCount == 1)
              {
                argNode.SetAttribute("y", "" + c);
                startY = c;
                if (priorityDrawingEnabled && priorityColor <= 4)
                {
                  XmlElement goaArgNode = (XmlElement)goaDoc.ImportNode(argNode.CloneNode(true), true);
                  goaCommandNode.AppendChild(goaArgNode);
                }
              }
              else 
              {
                bool shiftX = (command == 245 && even) || (command == 244 && !even);
                int x = (shiftX)? c : startX;
                int y = (shiftX)? startY : c;

                argNode = pictureDoc.CreateElement("coord");
                argNode.SetAttribute("x", "" + startX);
                argNode.SetAttribute("y", "" + startY);
                commandNode.AppendChild(argNode);
                if (priorityDrawingEnabled && priorityColor <= 4)
                {
                  XmlElement goaArgNode = (XmlElement)goaDoc.ImportNode(argNode.CloneNode(true), true);
                  goaCommandNode.AppendChild(goaArgNode);
                }

                DrawLine(startX, startY, x, y);

                startX = x;
                startY = y;
              }
              break;
            case 246: // absolute line -> converted to line
              if (even)
              {
                argNode = pictureDoc.CreateElement("coord");
                argNode.SetAttribute("x", "" + c);
                commandNode.AppendChild(argNode);
              }
              else
              {
                argNode.SetAttribute("y", "" + c);
                int x = int.Parse(argNode.GetAttribute("x"));
                int y = int.Parse(argNode.GetAttribute("y"));
                SetPixel(x, y);
                if (priorityDrawingEnabled && priorityColor <= 4)
                {
                  XmlElement goaArgNode = (XmlElement)goaDoc.ImportNode(argNode.CloneNode(true), true);
                  goaCommandNode.AppendChild(goaArgNode);
                }
                if (((XmlElement)argNode.PreviousSibling) != null)
                {
                  int x1 = int.Parse(((XmlElement)argNode.PreviousSibling).GetAttribute("x"));
                  int y1 = int.Parse(((XmlElement)argNode.PreviousSibling).GetAttribute("y"));
                  int x2 = int.Parse(argNode.GetAttribute("x"));
                  int y2 = int.Parse(argNode.GetAttribute("y"));
                  DrawLine(x1, y1, x2, y2);
                }                
              }
              break;
            case 247: // relative line -> converted to line
              if (argumentCount == 0)
              {
                argNode = pictureDoc.CreateElement("coord");
                argNode.SetAttribute("x", "" + c);
                commandNode.AppendChild(argNode);
                startX = c;
              }
              else if (argumentCount == 1)
              {
                argNode.SetAttribute("y", "" + c);
                startY = c;
                if (priorityDrawingEnabled && priorityColor <= 4)
                {
                  XmlElement goaArgNode = (XmlElement)goaDoc.ImportNode(argNode.CloneNode(true), true);
                  goaCommandNode.AppendChild(goaArgNode);
                }
                SetPixel(startX, startY);
              }
              else 
              {
                decimal nibble1 = c / 16;
                int x = (int)Math.Floor(nibble1);
                int y = c - (16 * x);
                if (x >= 8)
                  x = 8 - x;
                if (y >= 8)
                  y = 8 - y;

                startX += x;
                startY += y;

                argNode = pictureDoc.CreateElement("coord");
                argNode.SetAttribute("x", "" + startX);
                argNode.SetAttribute("y", "" + startY);
                commandNode.AppendChild(argNode);
                if (priorityDrawingEnabled && priorityColor <= 4)
                {
                  XmlElement goaArgNode = (XmlElement)goaDoc.ImportNode(argNode.CloneNode(true), true);
                  goaCommandNode.AppendChild(goaArgNode);
                }
                if (((XmlElement)argNode.PreviousSibling) != null)
                {
                  int x1 = int.Parse(((XmlElement)argNode.PreviousSibling).GetAttribute("x"));
                  int y1 = int.Parse(((XmlElement)argNode.PreviousSibling).GetAttribute("y"));
                  int x2 = int.Parse(argNode.GetAttribute("x"));
                  int y2 = int.Parse(argNode.GetAttribute("y"));
                  DrawLine(x1, y1, x2, y2);
                }                
              }
              break;
            case 248: // flood fill
              if (even)
              {
                argNode = pictureDoc.CreateElement("coord");
                argNode.SetAttribute("x", "" + c);
                commandNode.AppendChild(argNode);
              }
              else
              {
                argNode.SetAttribute("y", "" + c);
                int x = int.Parse(argNode.GetAttribute("x"));
                int y = int.Parse(argNode.GetAttribute("y"));

                if (priorityDrawingEnabled && priorityColor <= 4)
                {
                  XmlElement goaArgNode = (XmlElement)goaDoc.ImportNode(argNode.CloneNode(true), true);
                  goaCommandNode.AppendChild(goaArgNode);
                }
                
                Fill(x, y);
              }
              break;
            case 249:
              // set pen type, shape and size
              BitArray bits = new BitArray(new Byte[1]{c});
              penType = bits[5] ? PenType.Splatter : PenType.Solid;
              penShape = bits[4] ? PenShape.Square : PenShape.Circle;
              penSize = 0;
              if (bits[2])
                penSize += 4;
              if (bits[1])
                penSize += 2;
              if (bits[0])
                penSize += 1;
              
              break;
            case 250: // plot
              int plotX = 0;
              int plotY = 0;
              if (penType == PenType.Splatter)
              {
                int texture = c; // not used
                plotX = fileData[++i];
                plotY = fileData[++i];
              }
              else
              {
                plotX = c;
                c = fileData[++i];
                plotY = c;
              }
              argNode = pictureDoc.CreateElement("coord");
              argNode.SetAttribute("x", "" + plotX);
              argNode.SetAttribute("y", "" + plotY);
              Plot(plotX, plotY, penShape, penType, penSize);
              break;
          }
          argumentCount++;
        }
      }
    }
    
    private void Plot(int x, int y, PenShape penShape, PenType penType, byte penSize)
    {
      if (penType == PenType.Splatter)
      {
        SetPixel(x, y);
        return;
      }
      if (penShape == PenShape.Circle)
      {
        Circle ci = Circle.Circles[penSize];
        int width = penSize + 1;
        int height = penSize * 2 + 1;
        for (int y2 = 0; y2 < height; y2++)
        {
          for (int x2 = 0; x2 < width; x2++)
          {
            byte data = ci.Data[(y2 * width) + x2];
            if (data == 1)
              SetPixel(x + x2 - ci.OffsetX, y + y2 - ci.OffsetY);        
          }
        }
      }
      
      if (penShape == PenShape.Square)
      {
        Square sq = Square.Squares[penSize];
        int width = penSize + 1;
        int height = penSize * 2 + 1;
        for (int y2 = 0; y2 < height; y2++)
          for (int x2 = 0; x2 < width; x2++)
            SetPixel(x + x2 - sq.OffsetX, y + y2 - sq.OffsetY);
      }
      else
        SetPixel(x, y);
    }
    
    public void SetPixel(int x, int y, int prioColor)
    {
      pictureCanvas.SetPixel(x, y, prioColor);
    }
    
    public void SetPixel(int x, int y)
    {
      if (pictureDrawingEnabled)
        pictureCanvas.SetPixel(x, y, pictureColor);
      if (priorityDrawingEnabled)
      {
        if (priorityColor >= 4)
        {
          prioritiesUsed[priorityColor] = true;
          priorityCanvas.SetPixel(x, y, priorityColor);
        }
        else
        {
          controlCanvas.SetPixel(x, y, priorityColor);
          isGoaCommand = true;
        }
      }
    }

    public void DrawLine(int x1, int y1, int x2, int y2)
    {
      if (pictureDrawingEnabled)
        pictureCanvas.DrawLine(x1, y1, x2, y2, pictureColor);
      if (priorityDrawingEnabled)
      {
        if (priorityColor >= 4)
        {
          prioritiesUsed[priorityColor] = true;
          priorityCanvas.DrawLine(x1, y1, x2, y2, priorityColor);
        }
        else
        {
          controlCanvas.DrawLine(x1, y1, x2, y2, priorityColor);
          isGoaCommand = true;
        }
      }
    }

    public void Fill(int x, int y)
    {
      int maxPixels = 320 * 200;
      int pixelsFilled = 0;
      
      fillStack = new Stack();
      fillStack.Push(new int[2]{x, y});

      while(fillStack.Count > 0 && pixelsFilled++ < maxPixels)
      {
        int[] pixel = (int[])fillStack.Pop();
        int x1 = pixel[0];
        int y1 = pixel[1];
        
        if (okToFill(x1, y1))
        {
          SetPixel(x1, y1);

          if (y1 != 0 && okToFill(x1, y1 - 1))
            fillStack.Push(new int[2]{x1, y1 - 1});
          if (x1 != 0 && okToFill(x1 - 1, y1))
            fillStack.Push(new int[2]{x1 - 1, y1});
          if (x1 != 159 && okToFill(x1 + 1, y1))
            fillStack.Push(new int[2]{x1 + 1, y1});
          if (y1 != 167 && okToFill(x1, y1 + 1))
            fillStack.Push(new int[2]{x1, y1 + 1});
        }
      }
    }
    
    private bool okToFill(int x, int y)
    {
      if (x < 0 || y < 0 || x > 159 || y > 167)
        return false;
      if (!pictureDrawingEnabled && !priorityDrawingEnabled) 
        return false;
      if (!priorityDrawingEnabled) 
        return (pictureCanvas.GetPixel(x, y) == 15);
      if (priorityDrawingEnabled && !pictureDrawingEnabled) 
        return ((priorityCanvas.GetPixel(x, y) == 4) && (controlCanvas.GetPixel(x, y) == 4));
      return (pictureCanvas.GetPixel(x, y) == 15);
    }

    // this method removes remaining control line spaces
    private void fixPriorityCanvas()
    {
      int colorAbovePixel;
      int colorAtPixel;

      for (int y=1; y<168; y++)
      {
        for (int x=0; x<160; x++)
        {
          colorAbovePixel = priorityCanvas.GetPixel(x, y - 1);
          colorAtPixel = controlCanvas.GetPixel(x, y);
          if (colorAbovePixel > 4 && colorAtPixel < 4)
            priorityCanvas.SetPixel(x, y, colorAbovePixel);
        }
      }
    }

    private void buildPriorityCanvases()
    {
      for (int i=4; i<16; i++)
      {
        if (prioritiesUsed[i])
        {
          buildPriorityCanvas(i);
        }
      }
    }

    /// <summary>
    /// Javascript characters for use in a string, used to encode room control data
    /// </summary>
    public static string JSX = "0123456789ABCDEFGHJKLMNOPQRSTUVWXYZabcdghijklmnpqrstuwxyz`~!@#$%^*()-+=_[]{}|:;,.<>/?";

    /// <summary>
    /// Gets a color-run in jsx format
    /// </summary>
    /// <param name="count"></param>
    /// <param name="color"></param>
    /// <returns></returns>
    private string toJsx(int count, int color)
    {
      string s = "";
      while (count >= 160)
      {
        count -= 160;
        s += JSX[16 * 5 + 4];
      }
      if (count >= 128)
      {
        count -= 128;
        s += JSX[16 * 5 + 3];
      }
      if (count >= 64)
      {
        count -= 64;
        s += JSX[16 * 5 + 2];
      }
      if (count >= 32)
      {
        count -= 32;
        s += JSX[16 * 5 + 1];
      }
      if (count >= 16)
      {
        count -= 16;
        s += JSX[16 * 5 + 0];
      }
      if (count >= 0)
      {
        s += JSX[count * 5 + color];
      }
      
      return s;
    }

    /// <summary>
    /// Gets the control map in jsx format
    /// </summary>
    /// <returns></returns>
    public string GetJsxControlMap()
    {
      string map = "";
      bool noMap = true;

      for (int y = 0; y < 168; y++)
      {
        int count = 0;
        int drawColor = 4;
        for (int x = 0; x < 160; x++)
        {
          int color = controlCanvas.GetPixel(x, y);
          if (color != 4)
            noMap = false;
          if (color == drawColor)
            count++;
          else
          {  
            map += toJsx(count, drawColor);
            drawColor = color;
            count = 1;
          }
        }
        if (count > 0)
          map += toJsx(count, drawColor);
      }
      return noMap? "" : map;
    }
    
    private void buildPriorityCanvas(int priorityNr)
    {
      int minX = 160;
      int maxX = 0;
      int minY = 168;
      int maxY = 0;
      int width = 0;
      int height = 0;
      bool colorUsed = false;
      
      // first pass, detect width and height
      for (int y=0; y<168; y++)
      {
        for (int x=0; x<160; x++)
        {
          bool drawPixel = (priorityCanvas.GetPixel(x, y) == priorityNr);
          if (drawPixel)
          {
            colorUsed = true;
            minX = Math.Min(minX, x);
            maxX = Math.Max(maxX, x);
            minY = Math.Min(minY, y);
            maxY = Math.Max(maxY, y);
          }
        }
      }
      
      // break if the color is actually not used (could happen for color 4)
      if (!colorUsed)
      {
        prioritiesUsed[priorityNr] = false;
        return;
      }
      width = maxX - minX + 1;
      height = maxY - minY + 1;
      
      Canvas canvas = new Canvas(width * zoomX, height * zoomY);
      for (int i=0; i<16; i++)
      {
        canvas.SetColor(ColorPalette[i]);
      }
      canvas.FillBackground(4);
      canvas.SetTransparentColor(4);
      for (int y=0; y<height; y++)
      {
        for (int x=0; x<width; x++)
        {
          bool drawPixel = (priorityCanvas.GetPixel(x + minX, y + minY) == priorityNr);
          if (drawPixel)
          {
            int color = pictureCanvas.GetPixel(x + minX, y + minY);
            
            // draw pixels in zoomed fashion
            for (int zY = y * zoomY; zY < (y + 1) * zoomY; zY++)
            {
              for (int zX = x * zoomX; zX < (x + 1) * zoomX; zX++)
              {
                canvas.SetPixel(zX, zY, color);
              }
            }
          }
        }
      }
      priorityCanvases.Push(canvas);

      // add layers information to goaDoc
      XmlElement layerNode = goaDoc.CreateElement("layer");
      layerNode.SetAttribute("priority", "" + priorityNr);
      layerNode.SetAttribute("width", "" + width);
      layerNode.SetAttribute("height", "" + height);
      layerNode.SetAttribute("left", "" + minX);
      layerNode.SetAttribute("top", "" + minY);
      layersNode.AppendChild(layerNode);
    }
  }
}