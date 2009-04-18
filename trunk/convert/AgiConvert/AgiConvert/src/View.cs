using System;
using System.IO;
using System.Text;
using System.Xml;
using System.Collections.Generic;

namespace AGI
{

  // internal loop class
  internal class Loop
  {
    internal Loop(int cellCount)
    {
      cels = new Cel[cellCount];
    }
    
    public Cel[]  cels;
    public int    width   = 0;
    public int    height  = 0;

    internal void AddCell(Cel cel, int celNo)
    {
      cels[celNo] = cel;
      width += cel.width;
      height = Math.Max(height, cel.height);
    }
  }
  
  // internal cel class
  internal class Cel
  {
    internal Cel(int iWidth, int iHeight, byte iTransparentColor, bool bIsMirrored)
    {
      width             = iWidth;
      height            = iHeight;
      transparentColor  = iTransparentColor;
      isMirrored        = bIsMirrored;      
      data              = new int[width,height];

      // set background to transparent
      for (int x = 0; x < width; x++)
      {
        for (int y = 0; y < height; y++)
        {
          data[x, y] = 16;
        }
      }
    }

    public int width = 0;
    public int height = 0;
    public byte transparentColor = 0;
    bool isMirrored = false;
    public int[,] data;
    int curX = 0;
    int curY = 0;
    
    internal void AddChunk(int color, int runLength)
    {
      if (color == transparentColor)
        color = 16;
        
      int x;
      for (x = curX; x < curX + runLength; x++)
      {
        int realX = isMirrored? width - x - 1 : x;
        data[realX, curY] = color;
      }
      curX = x;
    }
    
    internal void NextLine()
    {
      curY++;
      curX = 0;
    }
    
    internal bool IsFinished()
    {
      return (curY == height);
    }
  }

  public class View
  {
    public string Description = "";
    
    public View()
    {
    }

    public void SetZoom(int x, int y)
    {
      zoomX = x;
      zoomY = y;
    }

    public View(string fileName, string viewId)
    {
      Load(fileName, viewId);
    }
    
    public void Load(string fileName, string viewId)
    {
      Description = "";
      id = viewId;
      agvFileName = fileName;
      loadFile();
      initValues();
      getDescription();
      parseData();
      renderCanvas();
    }
    
    public XmlDocument GetXml()
    {
      return doc;
    }

    public void SaveAsPng(string fileName)
    {
      canvas.SaveAsPng(fileName);
    }

    private int           loopCount = 0;
    private int           viewWidth = 0;
    private int           viewHeight = 0;
    private Loop[]        loops;
    private string        id;
    private string        agvFileName;
    private byte[]        fileData;
    private Canvas        canvas;
    private XmlDocument   doc;                 
    private byte          color;
    private int           zoomX = 1;
    private int           zoomY = 1;
    
    // add 1 extra color (green: #00FF00) as transparent color for the entire view (all loops, all cells)
    private string[] colorPalette = new string[17]
    {
      "000000", "0000A0", "00A000", "008888",
      "8A0000", "8A0088", "885000", "888888",
      "505050", "5050FF", "50FF50", "50FFFF",
      "FF5050", "FF50FF", "FFFF50", "FFFFFF", "00FF00"
    };
    
    private void loadFile()
    {
      // read data into byte array
      FileStream fs = new FileStream(agvFileName, FileMode.Open, FileAccess.Read);
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
      loopCount   = fileData[2];
      viewWidth   = 0;
      viewHeight  = 0;
      loops       = new Loop[loopCount];
      doc         = new XmlDocument();
    }
    
    private void getDescription()
    {
      int descPos1 = fileData[3];
      int descPos2 = fileData[4];
      if (descPos1 == 0 && descPos2 == 0)
        return;
      int descPos = descPos2 * 256 + descPos1;
      
      string s = "";
      for (int i=descPos; i<fileData.Length; i++)
      {
        byte charNr = fileData[i];
        if (charNr == 0)
          break;
        Char c = Convert.ToChar(charNr);
        s += c;
      }
      Description = s;
    }
    
    private void parseData()
    {
      for (int i = 0; i < loopCount; i++)
      {
        int loopPosition = fileData[i * 2 + 6] * 256 + fileData[i * 2 + 5];
        addLoop(loopPosition, i);
      }
    }

    private byte getLeftSide(byte i)
    {      
      return (byte)Math.Floor((double)(i / 16));
    }
    
    private byte getRightSide(byte i)
    {
      return (byte)(i % 16);
    }
    
    private void addLoop(int pos, int loopNo)
    {
      byte celCount = fileData[pos];

      Loop loop = new Loop(celCount);
      loops[loopNo] = loop;

      for (int i = 0; i < celCount; i++)
      {
        int celPosition = fileData[pos + (i * 2) + 2] * 256 + fileData[pos + (i * 2) + 1];
        addCell(loop, pos + celPosition, loopNo, i);
      }
      viewWidth = Math.Max(viewWidth, loop.width);
      viewHeight += loop.height;
    }

    private void addCell(Loop loop, int pos, int loopNo, int celNo)
    {     
      byte width = fileData[pos];
      byte height = fileData[pos + 1];
      byte mirror = getLeftSide(fileData[pos + 2]);
      byte transparentColor = getRightSide(fileData[pos + 2]);

      bool isMirrored = mirror >> 3 == 1;    
      if (isMirrored)
        isMirrored = (mirror - 8) != loopNo;      

      Cel cel = new Cel(width, height, transparentColor, isMirrored);

      int i = 3;
      while (!cel.IsFinished())
      {
        byte c = fileData[pos + i++];
        if (c == 0)
        {
          cel.NextLine();
        }
        else
        {
          byte color = getLeftSide(c);
          byte runLength = getRightSide(c);
          cel.AddChunk(color, runLength);
        }
      }
      loop.AddCell(cel, celNo);
    }
  
    private void renderCanvas()
    {
      XmlElement viewNode = doc.CreateElement("view");
      viewNode.SetAttribute("id", "" + id);
      doc.AppendChild(viewNode);
      
      if (Description != "")
      {
        XmlElement descEl = doc.CreateElement("description");
        viewNode.AppendChild(descEl);
        descEl.AppendChild(doc.CreateTextNode(Description));
      }
      
      canvas = new Canvas(viewWidth * zoomX, viewHeight * zoomY);
      for (int i = 0; i < colorPalette.Length; i++)
      {
        canvas.SetColor(colorPalette[i]);
      }
      
      int celY = 0;  
      Loop loop;
      
      for (int loopNr = 0; loopNr < loopCount; loopNr++)
      {
        int celX = 0;
        
        loop = loops[loopNr];
        int celCount = loop.cels.Length;
        
        XmlElement loopNode = doc.CreateElement("loop");
        viewNode.AppendChild(loopNode);
        
        for (int celNr = 0; celNr < celCount; celNr++)
        {
          Cel cel = loop.cels[celNr];

          XmlElement celNode = doc.CreateElement("cel");
          loopNode.AppendChild(celNode);
          celNode.SetAttribute("width", "" + cel.width);
          celNode.SetAttribute("height", "" + cel.height);

          for (int y = 0; y < cel.height; y++)
          {
            for (int x = 0; x < cel.width; x++)
            {
              int colorIndex = cel.data[x, y];
              
              //canvas.SetPixel(celX + x, celY + y, colorIndex);
              int vX = celX + x;
              int vY = celY + y;
              
              // draw pixels in zoomed fashion
              for (int zY = vY * zoomY; zY < (vY + 1) * zoomY; zY++)
              {
                for (int zX = vX * zoomX; zX < (vX + 1) * zoomX; zX++)
                {
                  canvas.SetPixel(zX, zY, colorIndex);
                }
              }
            }
          }
          celX += cel.width;
        }
        celY += loop.height;
      }

      canvas.SetTransparentColor(16);
    }
  }
}