window.logic17 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_set_key(0, 64, c12);
  cmd_enable_item(c12);
  cmd_assignn(109, 36);
  cmd_assignn(110, 33);
  cmd_assignn(113, 0);
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_load_view(21);
  cmd_load_view(22);
  cmd_animate_obj(2);
  cmd_ignore_horizon(2);
  cmd_ignore_objs(2);
  cmd_set_view(2, 21);
  cmd_set_loop(2, 3);
  cmd_set_cel(2, 0);
  cmd_position(2, 37, 18);
  cmd_stop_cycling(2);
  cmd_draw(2);
  cmd_animate_obj(3);
  cmd_ignore_horizon(3);
  cmd_ignore_objs(3);
  cmd_set_view(3, 21);
  cmd_set_loop(3, 4);
  cmd_set_cel(3, 0);
  cmd_position(3, 75, 39);
  cmd_stop_cycling(3);
  cmd_draw(3);
  cmd_animate_obj(4);
  cmd_ignore_horizon(4);
  cmd_ignore_objs(4);
  cmd_set_view(4, 21);
  cmd_set_loop(4, 3);
  cmd_set_cel(4, 1);
  cmd_position(4, 63, 32);
  cmd_stop_cycling(4);
  cmd_draw(4);
  cmd_set(255);
  cmd_reset(254);
  cmd_assignv(100, 16);
  cmd_get_posn(0, 104, 105);
  cmd_assignn(16, 22);
  cmd_set_view(0, 22);
  cmd_set_priority(0, 15);
  cmd_position(0, 74, 113);
  cmd_ignore_objs(0);
  cmd_stop_motion(0);
  cmd_start_motion(0);
  cmd_assignn(103, 3);
  cmd_step_size(0, 103);
  cmd_status_line_off();
  cmd_prevent_input();
  cmd_animate_obj(5);
  cmd_assignn(103, 8);
  cmd_cycle_time(5, 103);
  cmd_set_view(5, 21);
  cmd_ignore_objs(5);
  cmd_display(23, 7, "Press F6 to select a key");
  cmd_assignn(106, 11);
  cmd_draw(0);
  cmd_show_pic();
}
if (cmd_controller(c12) && cmd_isset(255)) {
  cmd_set_loop(5, 0);
  cmd_set_cel(5, 0);
  cmd_assignn(106, 11);
  if (cmd_posn(0,41,77,58,97)) {
    cmd_assignn(106, 1);
    cmd_position(5, 41, 74);
  }
  if (cmd_posn(0,65,77,82,97)) {
    cmd_assignn(106, 2);
    cmd_position(5, 65, 74);
  }
  if (cmd_posn(0,89,77,106,97)) {
    cmd_assignn(106, 3);
    cmd_position(5, 89, 74);
  }
  if (cmd_posn(0,41,105,58,125)) {
    cmd_assignn(106, 4);
    cmd_position(5, 41, 102);
  }
  if (cmd_posn(0,65,105,82,125)) {
    cmd_assignn(106, 5);
    cmd_position(5, 65, 102);
  }
  if (cmd_posn(0,89,105,106,125)) {
    cmd_assignn(106, 6);
    cmd_position(5, 89, 102);
  }
  if (cmd_posn(0,41,133,58,153)) {
    cmd_assignn(106, 7);
    cmd_position(5, 41, 130);
  }
  if (cmd_posn(0,65,133,82,153)) {
    cmd_assignn(106, 8);
    cmd_position(5, 65, 130);
  }
  if (cmd_posn(0,89,133,106,153)) {
    cmd_assignn(106, 9);
    cmd_position(5, 89, 130);
  }
  if (cmd_posn(0,89,161,106,168)) {
    cmd_assignn(106, 0);
    cmd_position(5, 89, 158);
  }
  if (cmd_posn(0,41,161,82,168)) {
    cmd_assignn(106, 10);
    cmd_set_loop(5, 1);
    cmd_position(5, 41, 158);
  }
  if (cmd_lessn(106,11)) {
    if (cmd_lessn(109,102)) {
      cmd_assignn(107, 21);
      cmd_assignn(108, 2);
      cmd_assignn(111, 5);
      cmd_assignn(112, 0);
      if (cmd_equaln(109,36)) {
        cmd_erase(2);
        cmd_erase(3);
        cmd_erase(4);
      }
      if (cmd_lessn(106,10)) {
        cmd_add_to_pic_v(107, 108, 106, 109, 110, 111, 112);
      }
      if (cmd_equaln(113,3) && cmd_lessn(106,10)) {
        cmd_assignn(113, 0);
      }
      if (cmd_equaln(113,2) && cmd_equaln(106,6) && cmd_equaln(109,62)) {
        cmd_increment(113);
      }
      if (cmd_equaln(113,1) && cmd_equaln(106,5) && cmd_equaln(109,49)) {
        cmd_increment(113);
      }
      if (cmd_equaln(113,0) && cmd_equaln(106,2) && cmd_equaln(109,36)) {
        cmd_increment(113);
      }
      cmd_addn(109, 13);
    }
    cmd_end_of_loop(5, 255);
    cmd_draw(5);
  }
}
if (cmd_isset(255)) {
  cmd_erase(5);
  if (cmd_equaln(106,10)) {
    cmd_add_to_pic(21, 2, 10, 36, 33, 5, 0);
    cmd_set(254);
    cmd_assignn(114, 50);
    cmd_assignn(106, 13);
    if (cmd_equaln(113,3)) {
      cmd_set_priority(4, 10);
      cmd_set_priority(3, 10);
      cmd_ignore_horizon(3);
      cmd_ignore_objs(3);
      cmd_ignore_horizon(4);
      cmd_ignore_objs(4);
      cmd_assignn(107, 5);
      cmd_cycle_time(4, 107);
      cmd_cycle_time(3, 107);
      cmd_set_view(4, 21);
      cmd_set_loop(4, 4);
      cmd_set_cel(4, 0);
      cmd_position(4, 56, 39);
      cmd_start_cycling(4);
      cmd_draw(4);
      cmd_set_view(3, 21);
      cmd_set_loop(3, 5);
      cmd_set_cel(3, 0);
      cmd_position(3, 52, 53);
      cmd_start_cycling(3);
      cmd_draw(3);
      cmd_set(209);
      jumpTo(1);
break;
    }
    cmd_set_priority(4, 10);
    cmd_set_priority(3, 10);
    cmd_ignore_horizon(3);
    cmd_ignore_objs(3);
    cmd_ignore_horizon(4);
    cmd_ignore_objs(4);
    cmd_assignn(107, 5);
    cmd_cycle_time(4, 107);
    cmd_cycle_time(3, 107);
    cmd_set_view(4, 21);
    cmd_set_loop(4, 6);
    cmd_set_cel(4, 0);
    cmd_position(4, 56, 39);
    cmd_start_cycling(4);
    cmd_draw(4);
    cmd_set_view(3, 21);
    cmd_set_loop(3, 7);
    cmd_set_cel(3, 0);
    cmd_position(3, 55, 53);
    cmd_start_cycling(3);
    cmd_draw(3);
  }
}
case 1:
if (!(cmd_isset(254))) {
  jumpTo(500);
  break;
}
  cmd_decrement(114);
  if (!(cmd_equaln(114,0))) {
  jumpTo(501);
  break;
}
    if (!(cmd_equaln(113,3))) {
  jumpTo(502);
  break;
}
      cmd_print(2);
      if (!(cmd_greatern(99,5))) {
  jumpTo(503);
  break;
}
        cmd_addn(3, 4);
        jumpTo(2);
break;
      case 503:
      cmd_addn(3, 8);
case 2:
      jumpTo(3);
break;
    case 502:
    cmd_increment(99);
    if (!(cmd_greatern(99,3))) {
  jumpTo(504);
  break;
}
      if (!(cmd_greatern(99,5))) {
  jumpTo(505);
  break;
}
        cmd_print(3);
        cmd_print(4);
        cmd_print(5);
        jumpTo(3);
break;
      case 505:
      cmd_print(6);
    case 504:
case 3:
    cmd_stop_motion(0);
    cmd_start_motion(0);
    cmd_erase(0);
    cmd_reset(255);
    cmd_reset(254);
    cmd_assignv(16, 100);
    cmd_set_view_v(0, 16);
    cmd_status_line_on();
    cmd_accept_input();
    cmd_disable_item(c12);
    cmd_clear_lines(23, 23, 0);
    cmd_new_room(10);
if (AGI.break_all_logics) return;
  case 501:
case 500:
return;

}}}
MESSAGES[17]=[
"",
"Press F6 to select a key",
"Well Done!",
"Ok, it looks like you're having some trouble so I'll help you out.",
"Around the house there are 3 hidden numbers that you must find.",
"Add them together and this will give you the access code.",
"Hmmm, something just doesn't seem to ADD up here."];
CONTROLS[17]="";