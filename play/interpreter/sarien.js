/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
/// <reference path="hacks.js" />
/// <reference path="io.js" />
/// <reference path="menu.js" />
/// <reference path="picture.js" />
/// <reference path="reservedwords.js" />
/// <reference path="sound.js" />
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

// Website wrapper for starting the sarien.net AGI intepreter
var Sarien =
{
  // starts the sarient.net AGI interpreter
  // @param path = path of a single game, containing the logic js files, and images
  // @param multiplayerEnabled = enable multiplayer using the q42multiplayer engine
  net: function(path, multiplayerEnabled) {
    // set browser specific classnames on the html element
    if (Agent.IE) document.body.parentNode.className = "ie";
    if (Agent.iPhone) document.body.parentNode.className = "iphone";
    Sarien.path = path;
    if (!window.PICTURES)
      Sarien.loadResource(path + '/game.js');
    Sarien.initViewCss();
    Sarien.initPictureCss();
    Sarien.initHTML();
    MultiplayerClient.enabled = multiplayerEnabled;
    AGI.init();
  },
  // write the canvas, dialog and other elements
  initHTML: function() {
    document.getElementById('sarien').innerHTML = '<div id="canvas"><div id="dialog"><div id="border"></div></div></div>';
  },
  // initialize css for all views that have been loaded by javascript
  initViewCss: function() {
    var cssText = [];
    for (var view in VIEWS) {
      var loops = VIEWS[view];
      for (var l = 1; l < loops.length; l++) {
        var cels = loops[l];
        for (var c = 0; c < cels.length; c++) {
          var cel = cels[c];
          cssText.push(".V", view, (l - 1), c, " { width:", cel[0], "px; height:", cel[1], "px; margin-top:", cel[2], "px; }");
          cssText.push(".V", view, (l - 1), c, " img { left:", cel[3], "px; top:", cel[4], "px; }");
        }
      }
    }
    Sarien.addCss(cssText.join(""));
  },
  // initialize css for all pictures that have been loaded by javascript
  initPictureCss: function() {
    var cssText = [];
    for (var picture in PICTURES) {
      var priorities = PICTURES[picture];
      for (var priority in priorities) {
        var nfo = priorities[priority];
        cssText.push(".P", picture, "L", priority, " { left:", nfo[0], "px; top:", nfo[1], "px; z-index:", nfo[2], "; }");
      }
    }
    Sarien.addCss(cssText.join(""));
  },
  // dynamically add css to the page
  addCss: function(css) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";
    head.appendChild(style);
    if (style.styleSheet)
      style.styleSheet.cssText = css;
    else
      style.appendChild(document.createTextNode(css));
  },
  // if the text after the hash (#) in the url has changed, act upon the change
  checkForHashChange: function(room) {
    if (!room)
      room = document.location.hash;
    if (room.length > 1) {
      room = room.substr(1);
      if (isNaN(room) && !roomNames[room])
        room = State.loadFromUrl(room);
      if (isNaN(room) && roomNames[room])
        room = roomNames[room];
      if (room != AGI.current_room) {
        // prevent ego popping up twice on screen after a # change
        getEgo().hide();
        delete objects[0];
        cmd_new_room(room);
        Sarien.placeAtEntryPoint();
      }
      return true;
    }
    return false;
  },
  // places the user at the entrypoint for the given room, if possible
  placeAtEntryPoint: function() {
    var entryPoint = roomEntryPoints[AGI.current_room];
    var x = 74, y = 112;
    if (entryPoint) {
      x = entryPoint[0];
      y = entryPoint[1];
    }
    var ego = getEgo();
    ego.x = x;
    ego.y = y;
    ego.update();
  },
  // gets the room name
  getRoomName: function(roomNr) {
    var name = roomNr;
    if (roomNames[roomNr])
      name = roomNames[roomNr];
    return name;
  },
  // for every roomchange of ego, reflect it by updating the address bar
  updateAddressBar: function(roomNr) {
    if (Hacks.updateAddressBarAllowed(AGI.game_id, roomNr))
      document.location.hash = Sarien.getRoomName(roomNr);
  },
  // loads a (js) source asynchronously
  loadResource: function(url) {
    var xhr = Agent.createXmlHttpObject();
    xhr.open("GET", url, false);
    xhr.send(null);
    var js = xhr.responseText;
    try {
      eval(js);
    } catch (e) {
      js = "";
    }
    return js;
  }
};