using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Xml;

namespace AGI
{
  public class XmlGame
  {
    public static int Zoom = 2;
    
    private XmlDocument viewsXml;
    private XmlDocument picturesXml;
    private List<XmlView> views = new List<XmlView>();
    private List<XmlPicture> pictures = new List<XmlPicture>();

    public XmlGame(XmlDocument viewsXml, XmlDocument picturesXml)
    {
      this.viewsXml = viewsXml;
      this.picturesXml = picturesXml;
      loadViews();
      loadPictures();
    }

    public List<XmlView> Views
    {
      get { return views; }
    }

    public List<XmlPicture> Pictures
    {
      get { return pictures; }
    }

    private void loadViews()
    {
      XmlNodeList views = viewsXml.SelectNodes("/views/view");
      foreach (XmlElement viewEl in views)
      {
        int id = Convert.ToInt32(viewEl.GetAttribute("id"));
        XmlView view = new XmlView(id);

        XmlElement descriptionEl = (XmlElement)viewEl.SelectSingleNode("description");
        if (descriptionEl != null)
          view.Description = descriptionEl.InnerText;

        Views.Add(view);
        XmlNodeList loops = viewEl.SelectNodes("loop");
        foreach (XmlElement loopEl in loops)
        {
          XmlLoop loop = new XmlLoop();
          view.Loops.Add(loop);
          XmlNodeList cels = loopEl.SelectNodes("cel");
          foreach (XmlElement celEl in cels)
          {
            int width = Convert.ToInt32(celEl.GetAttribute("width"));
            int height = Convert.ToInt32(celEl.GetAttribute("height"));
            XmlCel cel = new XmlCel(width, height);
            loop.Add(cel);
          }
        }
      }
    }

    private void loadPictures()
    {
      XmlNodeList pictureEls = picturesXml.SelectNodes("/pictures/picture");
      foreach (XmlElement pictureEl in pictureEls)
      {
        int id = Convert.ToInt32(pictureEl.GetAttribute("id"));
        XmlPicture p = new XmlPicture(id);
        pictures.Add(p);

        // add layers
        XmlNodeList layerEls = pictureEl.SelectNodes("layers/layer");
        foreach (XmlElement layerEl in layerEls)
        {
          XmlLayer l = new XmlLayer();
          l.Priority = Convert.ToInt32(layerEl.GetAttribute("priority"));
          l.Width = Convert.ToInt32(layerEl.GetAttribute("width"));
          l.Height = Convert.ToInt32(layerEl.GetAttribute("height"));
          l.Left = Convert.ToInt32(layerEl.GetAttribute("left"));
          l.Top = Convert.ToInt32(layerEl.GetAttribute("top"));
          p.Layers.Add(l);
        }

        // add lines
        XmlNodeList lineEls = pictureEl.SelectNodes("control-lines/*");
        foreach (XmlElement lineEl in lineEls)
        {
          XmlLine l = new XmlLine();
          p.Lines.Add(l);
          l.Priority = Convert.ToInt32(lineEl.GetAttribute("priority"));

          if (lineEl.Name == "fill")
            l.IsFill = true;

          // add coordinates to line
          XmlNodeList coordEls = lineEl.SelectNodes("coord");
          foreach (XmlElement coordEl in coordEls)
          {
            XmlCoord c = new XmlCoord();
            c.X = Convert.ToInt32(coordEl.GetAttribute("x"));
            c.Y = Convert.ToInt32(coordEl.GetAttribute("y"));
            l.Coordinates.Add(c);
          }
        }
      }
    }
  }
}