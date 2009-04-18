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
      initValues();
      parseData();
      fixPriorityCanvas();
      buildPriorityCanvases();
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
    
    private string[] colorPalette = new string[16]
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
    
    private void initValues()
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
        pictureCanvas.SetColor(colorPalette[i]);
        priorityCanvas.SetColor(colorPalette[i]);
        controlCanvas.SetColor(colorPalette[i]);
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

                drawLine(startX, startY, x, y);

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
                setPixel(x, y);
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
                  drawLine(x1, y1, x2, y2);
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
                setPixel(startX, startY);
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
                  drawLine(x1, y1, x2, y2);
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
            case 250: // plot
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

                try
                {
                  setPixel(x, y);
                } 
                catch(Exception e)
                {
                  // this happens when pen is set to splatter????
                };
              }
              break;
          }
          argumentCount++;
        }
      }
    }
    
    private void setPixel(int x, int y)
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

    private void drawLine(int x1, int y1, int x2, int y2)
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
          setPixel(x1, y1);

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
        canvas.SetColor(colorPalette[i]);
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