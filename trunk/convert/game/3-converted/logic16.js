window.logic16 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_status_line_off();
  cmd_prevent_input();
  cmd_program_control();
  cmd_assignn(10, 2);
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_load_view(3);
  cmd_load_view(20);
  cmd_load_view(26);
  cmd_load_view(27);
  cmd_position(0, 87, 114);
  cmd_load_view(0);
  cmd_assignn(16, 0);
  cmd_set_view_v(0, 16);
  cmd_assignn(200, 4);
  cmd_assignn(201, 0);
  cmd_assignn(203, 0);
  cmd_animate_obj(2);
  cmd_animate_obj(3);
  cmd_animate_obj(4);
  cmd_animate_obj(5);
  cmd_set_view(2, 20);
  cmd_set_view(3, 20);
  cmd_set_view(4, 20);
  cmd_set_view(5, 20);
  cmd_set_loop(2, 0);
  cmd_set_loop(3, 0);
  cmd_set_loop(4, 0);
  cmd_set_loop(5, 0);
  cmd_set_cel(2, 1);
  cmd_set_cel(3, 2);
  cmd_set_cel(4, 3);
  cmd_set_cel(5, 3);
  cmd_position(2, 56, 135);
  cmd_position(3, 71, 110);
  cmd_position(4, 93, 85);
  cmd_position(5, 93, 60);
  cmd_set_priority(2, 8);
  cmd_set_priority(3, 8);
  cmd_set_priority(4, 8);
  cmd_set_priority(5, 8);
  cmd_ignore_objs(2);
  cmd_ignore_objs(3);
  cmd_ignore_objs(4);
  cmd_ignore_objs(5);
  cmd_stop_cycling(2);
  cmd_stop_cycling(3);
  cmd_stop_cycling(4);
  cmd_stop_cycling(5);
  cmd_draw(2);
  cmd_draw(3);
  cmd_draw(4);
  cmd_animate_obj(6);
  cmd_set_view(6, 20);
  cmd_set_loop(6, 1);
  cmd_set_cel(6, 0);
  cmd_position(6, 12, 108);
  cmd_set_priority(6, 8);
  cmd_stop_cycling(6);
  cmd_draw(6);
  cmd_animate_obj(7);
  cmd_set_view(7, 20);
  cmd_set_loop(7, 1);
  cmd_set_cel(7, 1);
  cmd_position(7, 136, 74);
  cmd_set_priority(7, 8);
  cmd_stop_cycling(7);
  cmd_draw(7);
  cmd_animate_obj(8);
  cmd_set_view(8, 20);
  cmd_set_loop(8, 2);
  cmd_set_cel(8, 0);
  cmd_ignore_horizon(8);
  cmd_cycle_time(8, 200);
  cmd_position(8, 116, 35);
  cmd_set_priority(8, 6);
  cmd_draw(8);
  cmd_animate_obj(9);
  cmd_set_view(9, 3);
  cmd_set_loop(9, 2);
  cmd_set_cel(9, 0);
  cmd_stop_cycling(9);
  cmd_position(9, 93, 100);
  cmd_set_priority(9, 9);
  cmd_draw(9);
  cmd_animate_obj(10);
  cmd_set_view(10, 0);
  cmd_set_loop(10, 1);
  cmd_set_cel(10, 3);
  cmd_stop_cycling(10);
  cmd_position(10, 104, 110);
  cmd_set_priority(10, 9);
  cmd_draw(10);
  cmd_animate_obj(11);
  cmd_set_view(11, 27);
  cmd_set_loop(11, 0);
  cmd_set_cel(11, 0);
  cmd_ignore_objs(11);
  cmd_stop_cycling(11);
  cmd_position(11, 65, 126);
  cmd_set_priority(11, 9);
  cmd_assignn(207, 2);
  cmd_cycle_time(11, 207);
  cmd_assignn(200, 0);
  cmd_assignn(205, 1);
  cmd_assignn(206, 60);
  cmd_set_priority(0, 9);
  cmd_stop_motion(0);
  cmd_draw(0);
  cmd_show_pic();
}
cmd_increment(201);
if (cmd_equaln(201,3)) {
  cmd_assignn(201, 0);
  cmd_increment(200);
  if (cmd_equaln(200,15)) {
    cmd_assignn(200, 0);
  }
  cmd_assignn(203, 0);
  cmd_assignn(204, 0);
  if (cmd_equaln(200,0)) {
    cmd_assignn(204, 255);
  }
  if (cmd_equaln(200,2)) {
    cmd_assignn(204, 255);
    cmd_reposition(7, 203, 204);
  }
  if (cmd_equaln(200,5)) {
    cmd_assignn(204, 1);
  }
  if (cmd_equaln(200,6)) {
    cmd_assignn(204, 255);
    cmd_reposition(6, 203, 204);
    cmd_assignn(204, 1);
  }
  if (cmd_equaln(200,7)) {
    cmd_assignn(204, 1);
  }
  if (cmd_equaln(200,9)) {
    cmd_assignn(204, 1);
    cmd_reposition(7, 203, 204);
  }
  if (cmd_equaln(200,12)) {
    cmd_assignn(204, 255);
  }
  if (cmd_equaln(200,14)) {
    cmd_assignn(204, 1);
    cmd_reposition(6, 203, 204);
    cmd_assignn(204, 255);
  }
  cmd_reposition(2, 203, 204);
  cmd_reposition(3, 203, 204);
  cmd_reposition(4, 203, 204);
  cmd_reposition(5, 203, 204);
  cmd_reposition(9, 203, 204);
  cmd_reposition(10, 203, 204);
  if ((cmd_equaln(6,2) || cmd_equaln(6,3) || cmd_equaln(6,4))) {
    cmd_assignn(203, 1);
  }
  if ((cmd_equaln(6,6) || cmd_equaln(6,7) || cmd_equaln(6,8))) {
    cmd_assignn(203, 255);
  }
  if ((cmd_equaln(6,8) || cmd_equaln(6,1) || cmd_equaln(6,2))) {
    cmd_subn(204, 1);
  }
  if ((cmd_equaln(6,4) || cmd_equaln(6,5) || cmd_equaln(6,6))) {
    cmd_addn(204, 1);
  }
  cmd_reposition(0, 203, 204);
}
if (cmd_isset(16) && cmd_equaln(205,5)) {
  cmd_stop_motion(0);
  cmd_set_loop(0, 0);
  cmd_set_cel(0, 7);
  cmd_assignn(206, 20);
  cmd_assignn(205, 6);
}
if (cmd_greatern(206,0)) {
  cmd_decrement(206);
  if (cmd_equaln(206,0)) {
    if (cmd_equaln(205,9)) {
      cmd_new_room(5);
if (AGI.break_all_logics) return;
    }
    if (cmd_equaln(205,8)) {
      cmd_draw(11);
      cmd_erase(0);
      cmd_end_of_loop(10, 255);
      cmd_end_of_loop(11, 255);
      cmd_assignn(205, 9);
      cmd_assignn(206, 10);
    }
    if (cmd_equaln(205,7)) {
      cmd_assignn(207, 254);
      cmd_assignn(208, 0);
      cmd_reposition(10, 207, 208);
      cmd_set_view(10, 26);
      cmd_set_cel(10, 0);
      cmd_set_loop(10, 0);
      cmd_assignn(205, 8);
      cmd_assignn(206, 10);
    }
    if (cmd_equaln(205,6)) {
      cmd_print(1);
      cmd_assignn(205, 7);
      cmd_assignn(206, 20);
    }
    if (cmd_equaln(205,4)) {
      cmd_move_obj(0, 76, 127, 1, 16);
      cmd_assignn(205, 5);
      cmd_assignn(206, 10);
    }
    if (cmd_equaln(205,3)) {
      cmd_print(2);
      cmd_assignn(205, 4);
      cmd_assignn(206, 20);
    }
    if (cmd_equaln(205,2)) {
      cmd_print(3);
      cmd_assignn(205, 3);
      cmd_assignn(206, 20);
    }
    if (cmd_equaln(205,1)) {
      cmd_print(4);
      cmd_assignn(205, 2);
      cmd_assignn(206, 20);
    }
  }
}
return;

}}}
MESSAGES[16]=[
"",
"\"Do it.\" you order.",
"\"I'm sorry, but this is the only chance we've got.\"",
"\"But there must be some other way!\" she pleads.",
"\"Amy, we don't have time.\""];