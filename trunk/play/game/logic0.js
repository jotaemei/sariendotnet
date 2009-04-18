window.logic0 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_greatern(17,0)) {
  cmd_call(98);
if (AGI.break_all_logics) return;
}
if (cmd_equaln(0,0)) {
  cmd_call(91);
if (AGI.break_all_logics) return;
  if (cmd_isset(6)) {
    cmd_disable_item(c20);
    cmd_set(14);
    cmd_reset(33);
    cmd_new_room(16);
if (AGI.break_all_logics) return;
    jumpTo(1);
break;
  }
  cmd_set_menu("AGI");
  cmd_set_menu_item("About      ", c21);
  cmd_set_menu_item("Help   <F1>", c2);
  cmd_set_menu("File");
  cmd_set_menu_item("Save     <F5>", c3);
  cmd_set_menu_item("Restore  <F7>", c5);
  cmd_set_menu_item("-------------", c20);
  cmd_set_menu_item("Restart  <F9>", c7);
  cmd_set_menu_item("Quit  <Alt-Z>", c1);
  cmd_set_menu("Action");
  cmd_set_menu_item("See Object  <F4>", c22);
  cmd_set_menu_item("Inventory  <Tab>", c10);
  cmd_set_menu("Special");
  cmd_set_menu_item("Sound On/Off      <F2>", c16);
  cmd_set_menu_item("Joystick      <Ctrl J>", c15);
  cmd_set_menu_item("Pause            <Esc>", c18);
  cmd_set_menu("Speed");
  cmd_set_menu_item("Normal ", c24);
  cmd_set_menu_item("Slow   ", c25);
  cmd_set_menu_item("Fast   ", c23);
  cmd_set_menu_item("Fastest", c28);
  cmd_submit_menu();
  cmd_disable_item(c20);
  cmd_set(33);
  cmd_new_room(1);
if (AGI.break_all_logics) return;
}
case 1:
if (cmd_isset(5)) {
  cmd_load_logics(90);
if (AGI.break_all_logics) return;
  cmd_reset(32);
  cmd_clear_lines(24, 24, 0);
  cmd_animate_obj(0);
  cmd_load_view_v(16);
  cmd_set_view_v(0, 16);
  cmd_observe_objs(0);
  cmd_assignn(37, 255);
}
if (cmd_greatern(35,0)) {
  if (!cmd_equaln(35,255)) {
    cmd_disable_item(c21);
    cmd_disable_item(c2);
    cmd_disable_item(c3);
    cmd_disable_item(c18);
    cmd_disable_item(c16);
    cmd_disable_item(c22);
    cmd_disable_item(c15);
    cmd_disable_item(c24);
    cmd_disable_item(c28);
    cmd_disable_item(c23);
    cmd_disable_item(c25);
    cmd_load_logics(94);
if (AGI.break_all_logics) return;
  }
  cmd_call(94);
if (AGI.break_all_logics) return;
  jumpTo(4);
break;
}
if (!cmd_isset(33)) {
  if (cmd_controller(c19)) {
    cmd_menu_input();
  }
}
if (cmd_controller(c21)) {
  cmd_print(22);
}
if ((cmd_controller(c28) || cmd_said(0) || cmd_said(0, 1))) {
  cmd_assignn(10, 0);
}
if ((cmd_controller(c23) || cmd_said(2) || cmd_said(2, 1))) {
  cmd_assignn(10, 1);
}
if ((cmd_controller(c24) || cmd_said(3) || cmd_said(3, 1))) {
  cmd_assignn(10, 2);
}
if ((cmd_controller(c25) || cmd_said(4) || cmd_said(4, 1))) {
  cmd_assignn(10, 4);
}
if (cmd_controller(c26)) {
  cmd_decrement(23);
}
if (cmd_controller(c27) && cmd_lessn(23,15)) {
  cmd_increment(23);
}
if (cmd_controller(c16)) {
  cmd_toggle(9);
}
if (!cmd_isset(33)) {
  if (!cmd_isset(32)) {
    if (cmd_controller(c14)) {
      cmd_set(32);
      cmd_print(23);
      version();
      cmd_load_logics(99);
if (AGI.break_all_logics) return;
    }
  }
  if ((cmd_controller(c3) || cmd_said(5, 6) || cmd_said(5))) {
    cmd_stop_sound();
    cmd_save_game();
  }
  if ((cmd_controller(c5) || cmd_said(7, 6) || cmd_said(7))) {
    cmd_stop_sound();
    cmd_restore_game();
  }
  if ((cmd_controller(c7) || cmd_said(8, 6) || cmd_said(8))) {
    cmd_restart_game();
  }
  if ((cmd_controller(c2) || cmd_said(9))) {
    cmd_call(92);
if (AGI.break_all_logics) return;
  }
  if (cmd_controller(c9)) {
    cmd_echo_line();
  }
  if (cmd_controller(c17)) {
    cmd_cancel_line();
  }
  if (cmd_controller(c15)) {
    init_joy();
  }
  if ((cmd_controller(c18) || cmd_said(10, 6) || cmd_said(10))) {
    pause();
  }
  if ((cmd_controller(c10) || cmd_said(11))) {
    cmd_status();
  }
  if ((cmd_controller(c22) || cmd_controller(c4))) {
    cmd_set(13);
    cmd_status();
    if (cmd_greatern(25,0) && !cmd_equaln(25,255)) {
      if (cmd_equaln(25,2)) {
        cmd_show_obj(200);
      }
      if (cmd_equaln(25,3)) {
        cmd_show_obj(201);
      }
      if (cmd_equaln(25,4)) {
        cmd_show_obj(202);
      }
      if (cmd_equaln(25,5)) {
        cmd_show_obj(203);
      }
      if (cmd_equaln(25,6)) {
        cmd_show_obj(204);
      }
      if (cmd_equaln(25,7)) {
        cmd_show_obj(205);
      }
      if (cmd_equaln(25,9)) {
        cmd_show_obj(207);
      }
      if (cmd_equaln(25,10)) {
        cmd_show_obj(208);
      }
      if (cmd_equaln(25,11)) {
        cmd_show_obj(209);
      }
      if (cmd_equaln(25,12)) {
        cmd_show_obj(210);
      }
      if (cmd_equaln(25,13)) {
        cmd_show_obj(211);
      }
      cmd_reset(13);
    }
  }
  if ((cmd_controller(c1) || cmd_said(12, 6) || cmd_said(12))) {
    cmd_stop_sound();
    cmd_quit(0);
  }
}
cmd_get_posn(0, 30, 31);
if (cmd_equalv(6,34) && cmd_equalv(30,32) && cmd_equalv(31,33)) {
  cmd_stop_cycling(0);
  jumpTo(2);
break;
}
if (!cmd_isset(30)) {
  cmd_start_cycling(0);
}
case 2:
cmd_assignv(32, 30);
cmd_assignv(33, 31);
cmd_assignv(34, 6);
if (cmd_isset(31)) {
  cmd_start_cycling(0);
  jumpTo(3);
break;
}
if ((cmd_equaln(6,0) || cmd_isset(30))) {
  cmd_stop_cycling(0);
}
case 3:
if (cmd_isset(12)) {
  cmd_clear_lines(23, 24, 0);
  cmd_reset(32);
  cmd_disable_item(c20);
}
cmd_call_v(0);
if (AGI.break_all_logics) return;
if (cmd_isset(32)) {
  cmd_call(99);
if (AGI.break_all_logics) return;
}
cmd_call(90);
if (AGI.break_all_logics) return;
if (cmd_isset(2) && cmd_greatern(9,0)) {
  cmd_reset(2);
  if (cmd_equaln(9,1)) {
    cmd_print(24);
  }
  if (cmd_equaln(9,2)) {
    cmd_print(25);
  }
  if (cmd_equaln(9,3)) {
    cmd_print(26);
  }
}
if (cmd_isset(2) && !cmd_isset(4)) {
  cmd_print(27);
  cmd_reset(2);
}
cmd_reset(4);
case 4:
return;

}}}
MESSAGES[0]=[
"",
"AGI",
"About      ",
"Help   <F1>",
"File",
"Save     <F5>",
"Restore  <F7>",
"-------------",
"Restart  <F9>",
"Quit  <Alt-Z>",
"Action",
"See Object  <F4>",
"Inventory  <Tab>",
"Special",
"Sound On/Off      <F2>",
"Joystick      <Ctrl J>",
"Pause            <Esc>",
"Speed",
"Normal ",
"Slow   ",
"Fast   ",
"Fastest",
"\n     Time Quest\n\n    Version D0_1   \n\nDesigned and created\n  by Chad Goulding\n",
"Version D0_1",
"I don't understand \"%w1\"",
"I don't understand \"%w2\"",
"I don't understand \"%w3\"",
"I don't understand your request."];