window.logic92 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
cmd_prevent_input();
cmd_status_line_off();
cmd_text_screen();
cmd_assignn(19,0);
cmd_reset(4);
cmd_display(3,0,"               AGI Help");
cmd_display(6,0,"      F1 displays this message.");
cmd_display(7,0,"      F2 turns the sound off and on.");
cmd_display(8,0,"      F3 retypes the last line typed.");
cmd_display(9,0,"      F5 saves your current game.");
cmd_display(10,0,"      F7 restores a saved game.");
cmd_display(11,0,"      F9 restarts the game.");
cmd_display(12,0,"   ALT-Z quits the game.");
cmd_display(13,0,"     TAB shows the inventory screen.");
cmd_display(14,0,"     ESC pops up menus.");
cmd_display(15,0,"  Ctrl-J sets up your joystick.");
cmd_display(16,0,"      +  Increases volume.");
cmd_display(17,0,"      -  Decreases volume.");
case 1:
if (!cmd_have_key()) {
  jumpTo(1);
break;
}
cmd_accept_input();
cmd_status_line_on();
cmd_graphics();
cmd_set(4);
return;

}}}
MESSAGES[92]=[
"",
"               AGI Help",
"      F1 displays this message.",
"      F2 turns the sound off and on.",
"      F3 retypes the last line typed.",
"      F5 saves your current game.",
"      F7 restores a saved game.",
"      F9 restarts the game.",
"   ALT-Z quits the game.",
"     TAB shows the inventory screen.",
"     ESC pops up menus.",
"  Ctrl-J sets up your joystick.",
"      +  Increases volume.",
"      -  Decreases volume."];