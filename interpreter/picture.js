/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
/// <reference path="hacks.js" />
/// <reference path="io.js" />
/// <reference path="menu.js" />
/// <reference path="reservedwords.js" />
/// <reference path="sarien.js" />
/// <reference path="sound.js" />
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

// Picture class renders a room with all its layers
function Picture()
{  
};

Picture.prototype =
{
  id: -1,
  staticObjects: [],

  // Upon initialization, first remove any existing room elements,
  // then draw the new elements to the canvas.
  load: function(id)
  {
    this.removeStaticObjects();

    // remove existing priority layers and static objects
    if (this.id > 0)
    {
      var priorities = PICTURES[this.id];
      if (priorities)
      {
        for (var nr in priorities)
        {
          var elementId = "priority" + nr;
          var el = document.getElementById(elementId);
          if (el)
            el.parentNode.removeChild(el);
        }
      }
    }

    this.id = id;
  },
  // show a give picture
  show: function(id)
  {
    // clear var here?
    cmd_reset(flag_ego_touching_signal_line);

    // add new priority layers
    var priorities = PICTURES[this.id];
    if (priorities)
    {
      for (var nr in priorities)
      {
        var id = "priority" + nr;
        var className = ["priority ", "P", this.id, "L", nr].join("");

        var el = document.createElement("img");
        el.setAttribute("id", id);
        el.setAttribute("src", Sarien.path + "/picture" + Utils.PadLeft(this.id, '0', 3) + "-" + Utils.PadLeft(nr, '0', 2) + ".png");
        el.className = className;
        document.getElementById("canvas").appendChild(el);
      }
    }
    Canvas.load(this.id);
  },
  // statically adds a view to the picture
  addStaticObject: function(obj)
  {
    this.staticObjects.push(obj);
  },
  // remove all statically added views
  removeStaticObjects: function()
  {
    for (var i = this.staticObjects.length - 1; i >= 0; i--)
    {
      var obj = this.staticObjects[i];
      obj.remove();
    }
    this.staticObjects = [];
  }
};