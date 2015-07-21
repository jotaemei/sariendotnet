# Welcome to the Sarien.net code repository #

The Sarien.net interpreter distribution uses the Time Quest demo game for demonstrational purpose, written by Chad Goulding.

The convert folder contains the conversion process and documentation.

The play folder contains the converted template game, playable with the Sarien.net interpreter sourcecode.

# How to convert an AGI game to Sarien.net #

## The process ##

The conversion is done by a utility called AgiConvert, but doesn't use the original game files directly.
Instead, it requires all pictures, views and logics to be exported first by WinAGI, a 3rd party
utility, available at www.winagi.com.

However, a little manual work is required as well, because a few logic files (usually 5 or 6) will come
up empty and are marked red in WinAGI. So, another utility called AGI Studio (http://nailhead.org/agistudio)
is needed to get those remanining logic files.

Why have such a complicated conversion process?

Well, this was done to simplify the process for me, so I could focus on writing the interpreter in
javascript. AGI Studio lacks an "export all" button, and WinAGI has errors, so I had to use both. Still,
the exporting process from original game (step 1) to exported resources (2) is a one-timer. From that
moment on, the conversion to Sarien.net can be repeated without these steps.

## In detail ##

You'll see two folders

AgiConvert : sourcecode of the AgiConvert utility
game : a game, ready to convert

Open up the game folder and you'll see this:

1-original : Put your original game here
2-exported : Put the exported game resources here (**.lgc,**.agp, **.agv)
3-converted : After conversion with AgiConvert, this folder will contain a Sarien.net game**

### Exporting resources using WinAGI ###

First, copy all the game files of your favorite AGI game in the 1-original folder. Then, open up WinAGI.
Press F2 for settings, and open up the decompiler tab. Adjust the settings as follows:

- CHECK Display all messages after code
- CHECK Show all elses as gotos
- UNCHECK Show special syntax (e.g. v30 = 4)
- CHECK Show reserved variables and flags as text

Then, open up the game in the 1-original folder. You'll probably see a dialog saying

"Some errors in resource data were encountered. See errlog.txt in the game directory for details."

That's fine.
Hit CTRL+E to export all resources. Now, a new "src" folder was created inside the 1-original folder.
Copy its contents directly in the 2-exported folder. This folder should now contain several **.agv (view)
files,**.agp (picture) files and **.lgc (logic) files.**

One file remaining: the words database for the text parser. In the resource tree on the left, click on
"Words" and hit CTRL+E again. A dialog opens:

- From the "Save as type" dropdown box, choose: "WinAGI Word List Files (**.agw)"
- Save the WORDS.agw file in the "2-exported" folder that already contains the other exported resources.**

Almost done!

Now there are a few .lgc files with no contents. To quickly see which ones, go back to WinAGI and open
the logics tree. You'll see some entries marked in red. Open up those empty **.lgc files in notepad and
start AGI Studio.**

### Fixing empty logic files using AGI Studio ###

Go to the menu Tools -> Settings -> Logic Editor and adjust the settings as follows:

- CHECK Show all messages at end (not just unused ones)
- CHECK Show all elses as gotos
- UNCHECK Show special syntax (e.g. v30 = 4)

Then, open up the game and doubleclick the logic numbers that were marked red in WinAGI. Copy paste
their contents in the empty .lgc files that you have open in notepad.

### Preparing the objects file ###

In the convert/game directory is a text file named "objects.txt". This file needs to contain a list of
inventory objects by index number, and you need to edit this file manually by opening up AGI Studio and
choosing Tools -> Object editor. Use the syntax that is in the objects.txt file already as demonstration.

You can see a game's OBJECT resources by using WinAGI or AGI Studio. Both have an "Objects" entry in the
tree that you can doubleclick, or a menu item to do the same. Inspect the objects listed there, and
put all entries in the objects.txt file.

## Converting ##

If you're about to start convert all resources to Sarien.net, check to see that your 2-exported folder
contains the **.agv,**.agp and **.lgc files, and WORDS.agw. Also, the objects.txt file in the "game" folder
should list all inventory objects for the game.**

Then, doubleclick "convert.bat".

The conversion process should take about 2 minutes. After that, the "3-converted" folder should contain
several **.js and**.png files. Ready to be interpreted by Sarien.net!