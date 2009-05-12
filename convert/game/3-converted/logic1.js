window.logic1 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_status_line_off();
  cmd_prevent_input();
  cmd_program_control();
  cmd_load_view(9);
  cmd_load_view(28);
  cmd_animate_obj(2);
  cmd_set_view(2,9);
  cmd_set_loop(2,0);
  cmd_ignore_horizon(2);
  cmd_set_priority(2,5);
  cmd_set(16);
  cmd_animate_obj(3);
  cmd_set_view(3,9);
  cmd_set_loop(3,1);
  cmd_ignore_horizon(3);
  cmd_set_priority(3,5);
  cmd_set(17);
  cmd_animate_obj(4);
  cmd_set_view(4,28);
  cmd_set_loop(4,0);
  cmd_position(4,45,155);
  cmd_ignore_horizon(4);
  cmd_set_priority(4,5);
  cmd_stop_cycling(4);
  cmd_assignn(100,3);
  cmd_cycle_time(4,100);
  cmd_show_pic();
  cmd_assignn(100,0);
}
if (cmd_lessn(100,100)) {
  cmd_increment(100);
  if (cmd_equaln(100,20)) {
    cmd_assignn(101,81);
    cmd_load_pic(101);
    cmd_draw_pic(101);
    cmd_show_pic();
  }
  if (cmd_equaln(100,22)) {
    cmd_assignn(101,82);
    cmd_load_pic(101);
    cmd_draw_pic(101);
    cmd_show_pic();
  }
  if (cmd_equaln(100,24)) {
    cmd_assignn(101,83);
    cmd_load_pic(101);
    cmd_draw_pic(101);
    cmd_show_pic();
  }
  if (cmd_equaln(100,26)) {
    cmd_assignn(101,84);
    cmd_load_pic(101);
    cmd_draw_pic(101);
    cmd_show_pic();
  }
  if (cmd_equaln(100,28)) {
    cmd_assignn(101,84);
    cmd_load_pic(101);
    cmd_draw_pic(101);
    cmd_show_pic();
  }
  if (cmd_equaln(100,30)) {
    cmd_assignn(101,85);
    cmd_load_pic(101);
    cmd_draw_pic(101);
    cmd_show_pic();
  }
  if (cmd_equaln(100,34)) {
    cmd_set_text_attribute(15,0);
    cmd_display(23,4,"Created by Chad Goulding (C)1998");
    cmd_draw(4);
    cmd_end_of_loop(4,255);
    cmd_assignn(100,100);
  }
  jumpTo(1);
break;
}
if (cmd_isset(16)) {
  cmd_set_cel(2,0);
  cmd_random(0,7,103);
  if (cmd_equaln(103,0)) {
    cmd_assignn(101,41);
    cmd_assignn(102,11);
  }
  if (cmd_equaln(103,1)) {
    cmd_assignn(101,68);
    cmd_assignn(102,11);
  }
  if (cmd_equaln(103,2)) {
    cmd_assignn(101,68);
    cmd_assignn(102,51);
  }
  if (cmd_equaln(103,3)) {
    cmd_assignn(101,139);
    cmd_assignn(102,57);
  }
  if (cmd_equaln(103,4)) {
    cmd_assignn(101,19);
    cmd_assignn(102,57);
  }
  if (cmd_equaln(103,5)) {
    cmd_assignn(101,19);
    cmd_assignn(102,97);
  }
  if (cmd_equaln(103,6)) {
    cmd_assignn(101,47);
    cmd_assignn(102,97);
  }
  if (cmd_equaln(103,7)) {
    cmd_assignn(101,103);
    cmd_assignn(102,84);
  }
  cmd_position_v(2,101,102);
  cmd_end_of_loop(2,16);
  cmd_draw(2);
}
if (cmd_lessn(100,105)) {
  cmd_increment(100);
  jumpTo(1);
break;
}
if (cmd_isset(17)) {
  cmd_set_cel(3,0);
  cmd_random(0,7,103);
  if (cmd_equaln(103,0)) {
    cmd_assignn(101,115);
    cmd_assignn(102,11);
  }
  if (cmd_equaln(103,1)) {
    cmd_assignn(101,115);
    cmd_assignn(102,38);
  }
  if (cmd_equaln(103,2)) {
    cmd_assignn(101,115);
    cmd_assignn(102,51);
  }
  if (cmd_equaln(103,3)) {
    cmd_assignn(101,102);
    cmd_assignn(102,57);
  }
  if (cmd_equaln(103,4)) {
    cmd_assignn(101,74);
    cmd_assignn(102,57);
  }
  if (cmd_equaln(103,5)) {
    cmd_assignn(101,74);
    cmd_assignn(102,84);
  }
  if (cmd_equaln(103,6)) {
    cmd_assignn(101,74);
    cmd_assignn(102,97);
  }
  if (cmd_equaln(103,7)) {
    cmd_assignn(101,95);
    cmd_assignn(102,97);
  }
  cmd_position_v(3,101,102);
  cmd_end_of_loop(3,17);
  cmd_draw(3);
}
case 1:
if (cmd_have_key()) {
  cmd_set(14);
  cmd_clear_lines(22,24,0);
  cmd_stop_motion(0);
  cmd_reset(33);
  cmd_accept_input();
  cmd_new_room(16);
if (AGI.break_all_logics) return;
}
return;

}}}
MESSAGES[1]=[
"",
"Created by Chad Goulding (C)1998"];
CONTROLS[1]="";