using System;
using System.IO;
using System.Xml;
using System.Collections.Specialized;
using System.Text.RegularExpressions;

namespace AGI
{
  public class AgiConvert
  {
    private static DirectoryInfo dir;
    private static string srcPath = @"c:\Inetpub\sarien\trunk\Games\sq2\src";
    private static string dstPath = @"c:\Inetpub\sarien\trunk\Games";
    private static int pictureCount = 0;
    private static int viewCount = 0;
    private static int logicCount = 0;
    public static bool OptimizeJs = false;
    private static bool debug = false;
    private static XmlDocument words = new XmlDocument();
    private static bool hasWordReplacements = false;

    static void Main(string[] args)
    {
      dir = new DirectoryInfo(".");
      string wordsFile = Path.Combine(dir.FullName, "words.xml");
      if (File.Exists(wordsFile))
      {
        words.Load(wordsFile);
        hasWordReplacements = true;
      }
      if (debug)
      {
        Picture picture = new Picture();
        string fileName = Path.Combine(srcPath, "picture13.agp");
        picture.Load(fileName, "13");
        picture.SaveControlAsPng(Path.Combine(dstPath, "13.png"));
        
        string map = picture.GetJsxControlMap();
        Picture jsxPic = new Picture();
        jsxPic.InitValues();
        
        int y = 0;
        int x = 0;
        int color = 4;
        int count = 0;
        for (int i=0; i<map.Length; i++)
        {
          char c = map[i];
          int pos = Picture.JSX.IndexOf(c);
          switch (pos)
          {
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
              double d = pos / 5;
              count += (int)Math.Floor(d);
              color = pos % 5;

              for (int run = x + count; x < run; x++)
                jsxPic.SetPixel(x, y, color);
              count = 0;
              
              if (x == 160)
              {
                x = 0;
                y += 1;
              }
              break;
          }
        }

        jsxPic.SavePictureAsPng(Path.Combine(dstPath, "jsx.png"));
        
        
        //ConvertPictures(true);
        //ConvertViews();
        //OptimizeJs = false;
        //ConvertLogics();
        //WriteJavascriptFile();
        Console.WriteLine("Debug done.");
      }
      else
      {
        Console.WriteLine("AgiConvert - AGI source converter to web usuable format.");
        Console.WriteLine("Usage: agiconvert.exe [srcpath] [destinationpath] [-p] [-v] [-l] [-j]");
        Console.WriteLine("       where -p, -v, -l and -j enable pictures, views, logics and game.js file respectively.");
        Console.WriteLine("       Note that -j operator requires -p and -v operators to have created xml files already.");

        srcPath = dir.FullName;
        dstPath = dir.FullName;
        if (args.Length > 0)
        {
          srcPath = args[0];
          if (!Directory.Exists(srcPath))
            srcPath = Path.Combine(dir.FullName, args[0]);
          if (!Directory.Exists(srcPath))
          {
            Console.WriteLine("Source path does not exist.");
            return;
          }
        }
        if (args.Length > 1)
        {
          dstPath = args[1];
          if (!Directory.Exists(dstPath))
            dstPath = Path.Combine(dir.FullName, args[1]);
          if (!Directory.Exists(dstPath))
          {
            Console.WriteLine("Destination path does not exist.");
            return;
          }
        }

        StringCollection argCol = new StringCollection();
        argCol.AddRange(args);

        bool convertPictures = argCol.Contains("-p");
        bool convertViews = argCol.Contains("-v"); ;
        bool convertLogics = argCol.Contains("-l"); ;
        bool writeJavascript = argCol.Contains("-j"); ;
        bool writeThumbnails = argCol.Contains("-t"); ;
        OptimizeJs = argCol.Contains("-o");

        if (writeThumbnails)
          convertPictures = true;
        if (convertPictures)
          ConvertPictures(writeThumbnails);
        if (convertViews)
          ConvertViews();
        if (convertLogics)
          ConvertLogics();
        if (writeJavascript)
          WriteJavascriptFile();

        if (!convertPictures && !convertViews && !convertLogics && !writeJavascript)
          Console.WriteLine("Nothing to do! No command line actions (-p, -v -l or -j) were given.");
      }

      if (pictureCount > 0 || viewCount > 0 || logicCount > 0)
        Console.WriteLine(String.Format("Done converting {0} pictures, {1} views and {2} logics.", pictureCount, viewCount, logicCount));

      if (debug)
        Console.ReadLine();
    }
    
    // writes the game javascript file based on xml contents
    private static void WriteJavascriptFile()
    {
      string picturesXmlFile = Path.Combine(dstPath, "pictures.xml");
      string viewsXmlFile = Path.Combine(dstPath, "views.xml");
      if (!File.Exists(picturesXmlFile))
      {
        Console.WriteLine(String.Format("Could not write javascript file. Source xml file {0} was not found. Use -p and -v operator to generate the xml files.", picturesXmlFile));
        return;
      }
      if (!File.Exists(viewsXmlFile))
      {
        Console.WriteLine(String.Format("Could not write javascript file. Source xml file {0} was not found. Use -p and -v operator to generate the xml files.", viewsXmlFile));
        return;
      }
      XmlDocument picturesXml = new XmlDocument();
      XmlDocument viewsXml = new XmlDocument();
      picturesXml.Load(picturesXmlFile);
      viewsXml.Load(viewsXmlFile);

      XmlGame game = new XmlGame(viewsXml, picturesXml);
      string js = "window.PICTURES={\n";
      foreach (XmlPicture pic in game.Pictures)
      {
        js += pic.JsVisual;
      }
      js = js.TrimEnd(',', '\n') + "};";


      // add controls to logic files
      foreach (XmlPicture pic in game.Pictures)
      {
        string logicFile = Path.Combine(dstPath, "logic" + pic.Id + ".js");
        if (File.Exists(logicFile))
        {
          File.AppendAllText(logicFile, String.Format("\nCONTROLS[{0}]=\"{1}\";", pic.Id, pic.ControlMap));
        }
        else
          Console.WriteLine("Logic file {0} missing!", logicFile);
        //int pic.Id;
        
      }

      /*
      js += "\nwindow.CONTROLS={\n";

      foreach (XmlPicture pic in game.Pictures)
      {
        js += pic.JsPriority;
      }
      js = js.TrimEnd(',', '\n') + "};";
      */
      
      js += "\nwindow.VIEWS={\n";
      foreach (XmlView view in game.Views)
      {
        js += view.Js;
      }
      js = js.TrimEnd(',', '\n') + "};";

      js += "\nwindow.WORDS=[\n";
      foreach (string word in Logic.words)
      {
        string wordToUse = word;
        if (hasWordReplacements)
        {
          XmlElement wordEl = (XmlElement)words.SelectSingleNode("/words/word[@from=\"" + word + "\"]");
          if (wordEl != null)
            wordToUse = wordEl.GetAttribute("to");
        }
        js += "\"" + wordToUse + "\",";
      }
      js = js.TrimEnd(',', '\n') + "];";

      // inventory objects      
      string objectsFile = Path.Combine(srcPath, "objects.txt");
      if (File.Exists(objectsFile))
      {
        js += "\nwindow.INVENTORY=[\n";
        string[] lines = File.ReadAllLines(objectsFile);
        foreach (string line in lines)
        {
          string[] parts = line.Split(':');
          string objectId = parts[0];
          string objectName = parts[1];
          string quote = "\"";
          if (objectName.Contains(quote))
            quote = "'";
          js += quote + objectName + quote + ",\n";
        }
        js = js.TrimEnd(',', '\n') + "];\n";
      }

      // word tokens
      string tokFile = Path.Combine(srcPath, "WORDS.agw");
      if (File.Exists(tokFile))
      {
        js += "\nwindow.TOKENS={\n";
        string[] lines = File.ReadAllLines(tokFile);
        foreach (string line in lines)
        {
          if (!Regex.Match(line, @"^\d+").Success) continue;
          string[] parts = line.Split(Convert.ToChar(9));
          string tokId = parts[0];
          js += tokId + ":[";
          for (int i=0; i<parts.Length; i++)
          {
            if (i == 0) continue;
            js += "\"" + parts[i] + "\",";
          }
          js = js.TrimEnd(',', '\n') + "],\n";
        }
        js = js.TrimEnd(',', '\n') + "};\n";
      }

      // finalize the js file
      if (OptimizeJs)
        js = js.Replace("\n", "");

      File.WriteAllText(Path.Combine(dstPath, "game.js"), js);
    }

    private static void ConvertPictures(bool writeThumbnails)
    {
      Picture picture = new Picture();
      picture.SetZoom(4, 2);

      XmlDocument doc = new XmlDocument();
      XmlElement picturesNode = doc.CreateElement("pictures");
      doc.AppendChild(picturesNode);

      for (int i = 0; i < 256; i++)
      {
        string id = "" + i;
        string fileName = Path.Combine(srcPath, "picture" + id + ".agp");
        if (File.Exists(fileName))
        {
          Console.WriteLine("Converting " + fileName);
          picture.Load(fileName, id);
          if (writeThumbnails)
            picture.SaveThumb(Path.Combine(dstPath, "thumb" + id + ".jpg"), 64, 34);
          picture.SavePriorityLayers(dstPath);
          XmlElement pictureNode = picture.GetGoaXml().DocumentElement;
          picturesNode.AppendChild(doc.ImportNode(pictureNode, true));
          pictureCount++;
        }
      }
      if (pictureCount > 0)
      {
        Console.WriteLine("Saving pictures.xml file");
        doc.Save(Path.Combine(dstPath, "pictures.xml"));
      }
    }

    private static void ConvertViews()
    {
      View view = new View();
      view.SetZoom(4, 2);

      XmlDocument doc = new XmlDocument();
      XmlElement viewsNode = doc.CreateElement("views");
      doc.AppendChild(viewsNode);

      for (int i = 0; i < 256; i++)
      {
        string id = "" + i;
        string fileName = Path.Combine(srcPath, "view" + id + ".agv");
        if (File.Exists(fileName))
        {
          Console.WriteLine("Converting " + fileName);
          view.Load(fileName, id);
          view.SaveAsPng(Path.Combine(dstPath, "view" + id.PadLeft(3, '0') + ".png"));
          XmlElement viewNode = view.GetXml().DocumentElement;
          viewsNode.AppendChild(doc.ImportNode(viewNode, true));
          viewCount++;
        }
      }
      if (viewCount > 0)
      {
        Console.WriteLine("Saving views.xml file");
        doc.Save(Path.Combine(dstPath, "views.xml"));
      }
    }

    private static void ConvertLogics()
    {
      for (int i = 0; i < 256; i++)
      {
        string fileName = Path.Combine(srcPath, "Logic" + i + ".lgc");
        if (File.Exists(fileName))
        {
          Logic l = new Logic(fileName, "" + i);
          string js = l.Js;
          File.WriteAllText(Path.Combine(dstPath, "logic" + i + ".js"), js);
          logicCount++;
        }
      }
      return;
    }
  }
}
