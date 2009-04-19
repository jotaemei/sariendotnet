window.logic94 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (!cmd_equaln(35,255)) {
  cmd_accept_input();
  cmd_cancel_line();
  cmd_program_control();
  cmd_clear_lines(23, 24, 0);
  cmd_assignn(36, 12);
  cmd_assignn(35, 255);
}
cmd_decrement(36);
if (cmd_equaln(36,1)) {
  cmd_print(1);
}
if (cmd_controller(c19)) {
  cmd_menu_input();
}
if ((cmd_controller(c2) || cmd_said(9))) {
  cmd_call(92);
if (AGI.break_all_logics) return;
}
if ((cmd_controller(c5) || cmd_said(7, 6) || cmd_said(7))) {
  cmd_restore_game();
}
if ((cmd_controller(c7) || cmd_said(8, 6) || cmd_said(8))) {
  cmd_restart_game();
}
if ((cmd_controller(c10) || cmd_said(11))) {
  cmd_status();
}
if ((cmd_controller(c1) || cmd_said(12))) {
  cmd_stop_sound();
  cmd_quit(0);
}
if (cmd_isset(2) && !cmd_isset(4)) {
  cmd_print(2);
}
return;

}}}
MESSAGES[94]=[
"",
"Thanks for playing Time Quest. Better luck next time!",
"You are dead! You can only restore, restart, quit the game or view your inventory."];