window.logic99 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_said(131, 9)) {
  cmd_call(93);
if (AGI.break_all_logics) return;
}
if (cmd_said(132, 39)) {
  cmd_set(10);
}
if (cmd_said(133, 134)) {
  show_mem();
}
if (cmd_said(135)) {
  cmd_get_num("new room: ", 255);
  cmd_new_room_v(255);
}
if (cmd_said(136)) {
  cmd_get_num("x: ", 254);
  cmd_get_num("y: ", 255);
  cmd_erase(0);
  cmd_reposition_to_v(0, 254, 255);
  cmd_draw(0);
}
if (cmd_said(133, 137)) {
  cmd_get_num("var number: ", 255);
  cmd_rindirect(254, 255);
  cmd_print(5);
}
if (cmd_said(138, 137)) {
  cmd_get_num("var number: ", 254);
  cmd_get_num("var value: ", 255);
  cmd_lindirectv(254, 255);
}
if (cmd_said(133, 139)) {
  cmd_get_num("flag number: ", 255);
  if (cmd_issetv(255)) {
    cmd_print(8);
    jumpTo(1);
break;
  }
  cmd_print(9);
}
case 1:
if (cmd_said(138, 139)) {
  cmd_get_num("flag number: ", 255);
  cmd_set_v(255);
}
if (cmd_said(140, 139)) {
  cmd_get_num("flag number: ", 255);
  cmd_reset_v(255);
}
if (cmd_said(141)) {
  cmd_get_num("object #: ", 255);
  obj_status_v(255);
}
if (cmd_said(133, 142)) {
  show_pri_screen();
}
if (cmd_said(31, 141)) {
  cmd_get_num("object number: ", 255);
  if (cmd_greatern(255,1)) {
    cmd_print(12);
    jumpTo(2);
break;
  }
  get_v(255);
}
case 2:
if (!(cmd_said(143, 143))) {
  jumpTo(500);
  break;
}
  cmd_print(13);
  cmd_assignn(255, 0);
case 3:
  get_v(255);
  if (!(cmd_lessn(255,1))) {
  jumpTo(501);
  break;
}
    cmd_increment(255);
    jumpTo(3);
break;
  case 501:
case 500:
if (cmd_said(141, 14)) {
  cmd_get_num("Object number: ", 255);
  if (cmd_greatern(255,1)) {
    cmd_print(12);
    jumpTo(4);
break;
  }
  cmd_get_room_v(255, 254);
  if (cmd_equaln(254,255)) {
    cmd_print(15);
    jumpTo(4);
break;
  }
  cmd_print(16);
}
case 4:
if (cmd_said(138, 142)) {
  cmd_get_num("New priority: ", 255);
  cmd_set_priority_v(0, 255);
}
if (cmd_said(144, 142)) {
  cmd_release_priority(0);
}
if (cmd_said(145)) {
  cmd_toggle(35);
  if (!cmd_isset(35)) {
    cmd_clear_lines(24, 24, 0);
  }
}
if (cmd_isset(35)) {
  cmd_get_posn(0, 253, 254);
  cmd_get_priority(0, 255);
  cmd_display(24, 15, "Rm %v0|3 Pri %v255|2 x:%v253|3 y:%v254|3");
}
return;

}}}
MESSAGES[99]=[
"",
"new room: ",
"x: ",
"y: ",
"var number: ",
"var %v255: %v254",
"var value: ",
"flag number: ",
"flag %v255 is set",
"flag %v255 is not set",
"object #: ",
"object number: ",
"Invalid object number!",
"You gottum!",
"Object number: ",
"Object %v255 is in your inventory.",
"Object %v255 is in room %v254.",
"New priority: ",
"Rm %v0|3 Pri %v255|2 x:%v253|3 y:%v254|3"];