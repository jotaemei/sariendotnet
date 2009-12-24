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
/// <reference path="sarien.js" />
/// <reference path="sound.js" />
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />

var User =
{
  avatarCount: 0,
  avatars: null,
  name: null,
  avatarOverride: 0,
  avatarCurrentDefault: 0,

  init: function() {
    this.name = document.getElementById("name");
    this.avatars = document.getElementById("avatars");
    this.refreshAvatarList();
    this.name.onkeydown = User.onKeyInNameField;
    this.name.onkeypress = User.onKeyInNameField;
  },
  refreshAvatarList: function() {
    var activeCount = Utils.ObjCount(IO.avatars);
    if (activeCount == User.avatarCount)
      return;
    User.avatarCount = activeCount;

    this.avatars.innerHTML = "";
    var groups = {};
    for (var id in IO.avatars) {
      var pair = id.split(".");
      var gameId = pair[0];
      var avatarId = pair[1];
      var group = groups[gameId];
      if (!group) {
        var prettyGroup = gameNames[gameId];
        group = document.createElement("optgroup");
        group.setAttribute("label", prettyGroup);
        groups[gameId] = group;
        this.avatars.appendChild(group);
      }
      var prettyName = AVATARS[gameId][avatarId][0];
      var option = document.createElement("option");
      option.value = id;
      option.innerHTML = prettyName;
      group.appendChild(option);
    }
  },
  getName: function() {
    return document.getElementById("name").value;
  },
  // manually select an avatar
  selectAvatar: function(id) {
    // if manually selected to default avatar, reset override to 0, otherwise, store override
    User.avatarOverride = (id == User.avatarCurrentDefault) ? 0 : id;
    AGI.setAvatar(id);
    this.avatars.blur();
  },
  onKeyInNameField: function(evt) {
    var evt = Agent.IE ? event : evt;
    Agent.cancelBubble(evt);
  },
  // runs when a view is loaded
  unlockAvatar: function(gameId, avatarId) {
    // if no id was given, gameId holds the id, so use that one and set gameId to current
    if (!avatarId) {
      avatarId = gameId;
      gameId = AGI.game_id;
    }
    var id = gameId + "." + avatarId;
    if (AVATARS[gameId][avatarId]) {
      IO.avatars[id] = 1;
      if (User.toh) clearTimeout(User.toh);
      User.toh = setTimeout("User.refreshAvatarList()", 10);
    }
  }
}