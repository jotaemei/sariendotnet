window.logic2 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_set_horizon(50);
  cmd_show_pic();
  cmd_status_line_off();
  cmd_prevent_input();
  if (cmd_equaln(101,1)) {
    cmd_load_view(32);
    cmd_animate_obj(3);
    cmd_set_view(3, 32);
    cmd_set_loop(3, 0);
    cmd_position(3, 35, 80);
    cmd_ignore_horizon(3);
    cmd_set_priority(3, 5);
    cmd_stop_cycling(3);
    cmd_assignn(100, 3);
    cmd_cycle_time(3, 100);
  }
  cmd_assignn(100, 0);
}
if (cmd_lessn(100,120)) {
  cmd_increment(100);
}
if (!(cmd_equaln(101,1))) {
  jumpTo(500);
  break;
}
  if (!(cmd_equaln(100,30))) {
  jumpTo(501);
  break;
}
    cmd_draw(3);
    cmd_end_of_loop(3, 255);
  case 501:
  if (!(cmd_equaln(100,60))) {
  jumpTo(502);
  break;
}
    cmd_draw(3);
    cmd_reverse_loop(3, 255);
  case 502:
  if (!(cmd_equaln(100,76))) {
  jumpTo(503);
  break;
}
    cmd_erase(3);
  case 503:
  if (!(cmd_equaln(100,90))) {
  jumpTo(504);
  break;
}
    cmd_print(1);
    if (!(cmd_equaln(3,45))) {
  jumpTo(505);
  break;
}
      cmd_print("You've finished the demo with a maximum 3 of 45 points. Well done!");
      jumpTo(1);
break;
    case 505:
    cmd_assignv(102, 3);
    cmd_print("You've finished the demo with a 3 of %v102 out of a possible 45 points.");
  case 504:
case 1:
  if (!(cmd_equaln(100,119))) {
  jumpTo(506);
  break;
}
    cmd_print(4);
  case 506:
case 500:
if (cmd_equaln(101,0)) {
  if (cmd_equaln(100,30)) {
    cmd_print(5);
  }
  if (cmd_equaln(100,60)) {
    cmd_print(6);
  }
  if (cmd_equaln(100,90)) {
    cmd_print(7);
  }
  if (cmd_equaln(100,120)) {
    cmd_status_line_on();
    cmd_accept_input();
    cmd_position(0, 75, 125);
    cmd_assignn(101, 1);
    cmd_new_room(19);
if (AGI.break_all_logics) return;
  }
}
return;

}}}
MESSAGES[2]=[
"",
"Congratulations! You've completed the Time Quest demo!",
"You've finished the demo with a maximum score of 45 points. Well done!",
"You've finished the demo with a score of %v102 out of a possible 45 points.",
"If you have any queries or comments about this demo feel free to email me at beeepo@hotmail_com",
"And then, nothing.",
"You wait for what seems like an eternity.",
"And are then abruptly sucked back into existence."];