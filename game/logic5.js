window.logic5 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_load_view(2);
  cmd_set_horizon(50);
  if ((cmd_equaln(1,16) || cmd_equaln(1,0))) {
    cmd_position(0, 39, 106);
    cmd_assignn(16, 2);
    cmd_set_view_v(0, 16);
  }
  cmd_assignn(200, 20);
  cmd_set_loop(0, 3);
  cmd_stop_motion(0);
  cmd_draw(0);
  cmd_show_pic();
  cmd_print(1);
}
if ((cmd_said(13) || cmd_said(13, 33))) {
  cmd_print(2);
}
if ((cmd_said(29, 46) || cmd_said(54, 46) || cmd_said(44, 46))) {
  if (cmd_posn(0,58,94,76,104)) {
    cmd_print(3);
    cmd_addn(3, 1);
    cmd_status_line_on();
    cmd_new_room(4);
if (AGI.break_all_logics) return;
    jumpTo(1);
break;
  }
  cmd_print(4);
}
case 1:
if (cmd_said(30, 46)) {
  cmd_print(5);
}
if (cmd_greatern(200,0)) {
  cmd_decrement(200);
  if (cmd_equaln(200,0)) {
    cmd_print(6);
    cmd_print(7);
    cmd_accept_input();
    cmd_set_loop(0, 0);
    cmd_set_cel(0, 0);
    cmd_start_motion(0);
  }
}
return;

}}}
MESSAGES[5]=[
"",
"Suddenly, you wake up.",
"All you can see is the morning light pouring through a small opening in the curtains.",
"You open the curtains.",
"You'll need to get closer.",
"They already are!",
"What a bizarre dream!",
"Trying to shrug it off, you decide to get out of bed."];