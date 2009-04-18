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
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

// Sound does not actually play sound, but handles the setting of flags
// when playing a certain sound is completed.
var Sound =
{
  flagsToSet: {},

  soundDurations: {},

  // sets the duration is ms for a sound.
  setDuration: function(sound, ms)
  {
    // a sound ends when its cycleCount reached 0, so calculate required cycles
    var cycles = Math.round(ms / AGI.interval);
    Sound.soundDurations[sound] = cycles;
  },

  // playes a sound and sets a flag
  play: function(n, flag)
  {
    var soundDuration = Sound.soundDurations[n];
    // set the amount of cycles to wait until the sound ends
    this.flagsToSet[flag] = soundDuration ? soundDuration : 1;
  },

  // sets all flags that are scheduled to set by playing sounds
  setFlags: function()
  {
    for (var flag in this.flagsToSet)
    {
      this.flagsToSet[flag]--;
      if (this.flagsToSet[flag] == 0)
      {
        cmd_set(flag);
        delete this.flagsToSet[flag];
      }
    }
  }
};