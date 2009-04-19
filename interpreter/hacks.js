/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
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


// Add game specific hacks, such as skipping name entering for sq1 and 2,
// age verification for lsl, or making up for unimplemented or wrong interpreter handling.
var Hacks =
{
  init: function(game) {
    IO.addPrettyVerbs({
      "acquire": "take",
      "add": "give",
      "administer": "give",
      "aid": "help",
      "aim": "throw",
      "al sent me": "ken sent me",
      "ale": "beer",
      "ankle": "leg",
      "answer": "talk to",
      "ascent": "climb down",
      "ask": "talk to",
      "ass": "xxx",
      "asshole": "xxx",
      "attire": "suit",
      "bar tender": "bartender",
      "being": "man",
      "bite": "drink",
      "bodies": "body",
      "boob": "xxx",
      "bouncer": "man",
      "breast": "xxx",
      "broad": "girl",
      "bull shit": "xxx",
      "c": "close",
      "cab": "taxi",
      "call call": "radio",
      "cart": "cartridge",
      "cast": "throw",
      "catch": "take",
      "check out": "look at",
      "clit": "xxx",
      "cock": "xxx",
      "computer console": "computer",
      "conceal": "hide",
      "consume": "eat",
      "copulate": "xxx",
      "credit card": "card",
      "cunnilingus": "xxx",
      "cunt": "xxx",
      "d": "door",
      "disembark": "get out",
      "dont move": "stop",
      "examine": "look at",
      "explore": "search",
      "fill": "insert",
      "fst": "test",
      "get": "take",
      "get down": "take off",
      "hh": "HH",
      "i'm": "go to",
      "i_d.": "id",
      "increase": "open",
      "inv": "inventory",
      "jack off": "xxx",
      "key board": "keyboard",
      "let": "jump",
      "move": "push",
      "n": "no",
      "o": "open",
      "rest": "sit",
      "speak": "talk to",
      "shsr": "SHSR",
      "sp": "object",
      "tp": "teleport",
      "y": "yes"
    });

    switch (game) {
      case "SQ":
        strings[1] = "Roger Wilco";
        window.logic69 = function() {
          cmd_new_room(2);
        };
        window.cmd_new_room_ori = window.cmd_new_room;
        window.cmd_new_room = function(roomNo) {
          if (roomNo != 77) window.cmd_new_room_ori(roomNo);
        }
        break;
      case "SQ2":
        strings[1] = "Roger Wilco";
        window.logic98 = function() {
          cmd_new_room(2);
        };
        // floodfill doesn't work due to fillboundaries drawn on visual screen
        Canvas.fill = function() { };
        break;
      case "LLLLL":
        cmd_reset(f85); // fix larry not walking
        cmd_reset(f38); // make sure first keypress does not trigger logic6
        window.cmd_new_room_ori = window.cmd_new_room;
        window.cmd_new_room = function(roomNo) {
          if (roomNo != 6)
            window.cmd_new_room_ori(roomNo);
          else {
            cmd_erase(0);
            objects[0] = null;
            cmd_new_room(11);
          }
        }
        Sound.setDuration(21, 20000);
        break;
      case "PQ":
        break;
      case "BC":
        // floodfill doesn't work due to fillboundaries drawn on visual screen
        Canvas.fill = function() { };
        //IO.addPrettyVerbs({ "6": "do", "8": "look" });
        // set title tune to last 10 seconds
        Sound.setDuration(21, 10000);
        break;
      case "KQ1":
        // floodfill doesn't work due to fillboundaries drawn on visual screen
        Canvas.fill = function() { };
        break;
      default:
        break;
    }
  },
  cycle: function(game) {
  }
};