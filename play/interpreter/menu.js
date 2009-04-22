/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
/// <reference path="hacks.js" />
/// <reference path="io.js" />
/// <reference path="picture.js" />
/// <reference path="reservedwords.js" />
/// <reference path="sarien.js" />
/// <reference path="sound.js" />
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

// Singleton class to show the top menu
var Menu =
{
  el: null,
  score: -1,
  enabled: false,

  // intialize the menu bar
  init: function() {
    var el = document.createElement("div");
    el.onclick = Menu.onClick;
    el.onmouseover = Menu.onMouseOver;
    el.onmouseout = Menu.onMouseOut;
    el.id = "menu";
    document.getElementById("sarien").appendChild(el);
    Menu.el = el;
    Menu.hide();
  },

  // show the menu bar
  show: function() {
    Menu.el.style.display = "block";
    Menu.enabled = true;
  },

  // hide the menu bar
  hide: function() {
    Menu.el.style.display = "none";
    Menu.enabled = false;
  },

  // per cycle, check if the menu should be visible or not, and if score has changed
  cycle: function() {
    if (cmd_isset(flag_menu_enabled) && !Menu.enabled)
      Menu.show();
    else if (!cmd_isset(flag_menu_enabled) && Menu.enabled)
      Menu.hide();

    var curScore = vars[var_score] * 1;
    if (isNaN(curScore))
      curScore = 0;
    if (curScore != Menu.score) {
      Menu.score = curScore;
      Menu.refresh();
    }
  },

  // write the score on the menu bar
  refresh: function() {
    var text = " Score:" + Menu.score + " of " + vars[var_max_score];
    if (MultiplayerClient.enabled) {
      for (var i = text.length; i < 23; i++)
        text += " ";
      text += " Players:" + (MultiplayerClient.playerCount() + 1);
    }
    for (var i = text.length; i < 47; i++)
      text += " ";
    text += "Esc = help";
    Menu.text = text;
    Menu.updateText(text);
  },

  // update the text on the menu
  updateText: function(text) {
    text = text.replace(/\s/g, "&nbsp;");
    Menu.el.innerHTML = text;
  },

  // on hover, click for help
  onMouseOver: function() {
    Menu.updateText(" Click for help");
  },

  // on mouse out, place help text back
  onMouseOut: function() {
    Menu.updateText(Menu.text);
  },

  // clicking on the bar shows the help
  onClick: function(evt) {
    var evt = Agent.IE ? event : evt;
    Agent.cancelEvent(evt);
    Menu.showHelp();
    Menu.el.blur();
  },

  // show the help message
  showHelp: function() {
    var msg = "Click or use the cursors to move. Do not hold cursors. Doubleclick to reposition, in case you are stuck.\n\nRightclick or \"/\" brings up the actions menu. Use mouse or cursors to navigate through these actions.\n\nProbable actions are listed directly. Other actions are available through the \"more\" submenu.";
    Text.displayMessage(msg);
  }
};