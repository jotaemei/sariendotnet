/// <reference path="view.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
/// <reference path="hacks.js" />
/// <reference path="io.js" />
/// <reference path="menu.js" />
/// <reference path="picture.js" />
/// <reference path="reservedwords.js" />
/// <reference path="sarien.js" />
/// <reference path="sound.js" />
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

// Agent, a lightweight crossbrowser user-agent object
var Agent =
{
  // identify Internet Explorer
  IE: (navigator.appName == "Microsoft Internet Explorer"),
  OP: (navigator.appName == "Opera"),
  iPhone: (navigator.userAgent.indexOf("iPhone") != -1),

  // creates an xmlhttp object
  // @returns: an xhr object
  createXmlHttpObject: function() {
    if (Agent.IE)
      return new ActiveXObject("Microsoft.XmlHttp");
    else
      return new XMLHttpRequest();
  },
  // cancels event bubbling and prevents default action
  // @param evt = the event
  cancelEvent: function(evt) {
    if (Agent.IE) {
      evt.cancelBubble = true;
      evt.returnValue = 0;
    }
    else {
      evt.stopPropagation();
      evt.preventDefault();
    }
  },
  // sets the opacity of an element
  // @param el = the element to set the opacity
  // @param opacity = a number between 0 (invisible) and 100 (opaque)
  setOpacity: function(el, opacity) {
    if (Agent.IE)
      el.style.filter = "alpha(opacity:" + opacity + ")";
    else
      el.style.opacity = opacity / 100;
  }
};