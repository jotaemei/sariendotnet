window.logic3 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (!(cmd_isset(5))) {
  jumpTo(500);
  break;
}
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_set_horizon(50);
  if (!(cmd_equaln(1,4))) {
  jumpTo(501);
  break;
}
    cmd_position(0, 22, 75);
  case 501:
  if (!(cmd_equaln(1,6))) {
  jumpTo(502);
  break;
}
    cmd_position(0, 118, 156);
  case 502:
  if (!((cmd_equaln(1,1) || cmd_equaln(1,0)))) {
  jumpTo(503);
  break;
}
    cmd_position(0, 70, 80);
    cmd_status_line_on();
    cmd_accept_input();
    cmd_load_view(0);
    cmd_assignn(16, 0);
    cmd_set_view_v(0, 16);
  case 503:
  cmd_load_view(15);
  cmd_add_to_pic(15, 2, 1, 60, 55, 5, 0);
  cmd_add_to_pic(15, 2, 0, 92, 55, 5, 0);
  cmd_add_to_pic(15, 2, 2, 115, 120, 5, 0);
  cmd_animate_obj(1);
  cmd_set_view(1, 15);
  cmd_set_loop(1, 3);
  if (!(cmd_isset(203))) {
  jumpTo(504);
  break;
}
    cmd_set_cel(1, 5);
    cmd_ignore_objs(0);
    jumpTo(1);
break;
  case 504:
  cmd_set_cel(1, 0);
  cmd_observe_objs(0);
case 1:
  cmd_position(1, 38, 69);
  cmd_draw(1);
  cmd_stop_cycling(1);
  cmd_stop_update(1);
  cmd_draw(0);
  cmd_show_pic();
  cmd_reset(255);
case 500:
if ((cmd_said(13) || cmd_said(13, 14))) {
  if (cmd_greatern(31,69)) {
    cmd_print(1);
    jumpTo(2);
break;
  }
  cmd_print(2);
}
case 2:
if ((cmd_said(15, 16) || cmd_said(13, 17, 16))) {
  if (cmd_greatern(31,69)) {
    cmd_print(3);
    jumpTo(3);
break;
  }
  cmd_print(2);
}
case 3:
if ((cmd_said(13, 18) || cmd_said(13, 19) || cmd_said(13, 20) || cmd_said(13, 21) || cmd_said(13, 22))) {
  cmd_print(4);
}
if (cmd_said(13, 23)) {
  if (cmd_isset(203)) {
    cmd_print(5);
    jumpTo(4);
break;
  }
  cmd_print(6);
}
case 4:
if (cmd_said(13, 16)) {
  if (cmd_lessn(31,69)) {
    cmd_print(2);
    jumpTo(5);
break;
  }
  if (cmd_isset(203)) {
    cmd_print(5);
    jumpTo(5);
break;
  }
  cmd_print(6);
}
case 5:
if (cmd_said(24, 23)) {
  cmd_print(7);
}
if (cmd_said(13, 25)) {
  cmd_print(8);
}
if (cmd_said(13, 26, 27)) {
  cmd_print(9);
}
if (cmd_said(15, 27)) {
  cmd_print(10);
}
if (cmd_said(13, 27)) {
  if (cmd_posn(0,53,69,81,78)) {
    cmd_print(11);
    jumpTo(6);
break;
  }
  if (cmd_posn(0,86,69,113,78)) {
    cmd_print(12);
    jumpTo(6);
break;
  }
  if (cmd_posn(0,109,141,122,147)) {
    cmd_print(13);
    jumpTo(6);
break;
  }
  cmd_print(14);
}
case 6:
if (cmd_said(13, 28, 19)) {
  cmd_print(15);
  cmd_print(16);
}
if (!((cmd_said(29, 23) || cmd_said(29, 16)))) {
  jumpTo(505);
  break;
}
  if (!(!cmd_isset(203))) {
  jumpTo(506);
  break;
}
    if (!(cmd_posn(0,32,60,47,73))) {
  jumpTo(507);
  break;
}
      cmd_set(203);
      cmd_start_update(1);
      cmd_end_of_loop(1, 255);
      jumpTo(7);
break;
    case 507:
    cmd_print(17);
case 7:
    jumpTo(8);
break;
  case 506:
  cmd_print(18);
case 505:
case 8:
if (!((cmd_said(30, 23) || cmd_said(30, 16)))) {
  jumpTo(508);
  break;
}
  if (!(cmd_isset(203))) {
  jumpTo(509);
  break;
}
    if (!(cmd_posn(0,32,60,47,73))) {
  jumpTo(510);
  break;
}
      if (!(cmd_equaln(31,69))) {
  jumpTo(511);
  break;
}
        cmd_print(19);
        jumpTo(9);
break;
      case 511:
      cmd_reset(203);
      cmd_start_update(1);
      cmd_reverse_loop(1, 255);
      cmd_observe_objs(0);
case 9:
      jumpTo(10);
break;
    case 510:
    cmd_print(17);
case 10:
    jumpTo(11);
break;
  case 509:
  cmd_print(20);
case 508:
case 11:
if (cmd_isset(255) && cmd_isset(203)) {
  cmd_ignore_objs(0);
}
if (cmd_isset(255) && !cmd_isset(203) && cmd_lessn(31,69)) {
  cmd_print(21);
  cmd_reset(255);
}
if (cmd_equaln(2,3)) {
  cmd_new_room(6);
if (AGI.break_all_logics) return;
}
if (cmd_posn(0,135,50,150,150)) {
  cmd_position(0, 24, 120);
  cmd_new_room(12);
if (AGI.break_all_logics) return;
}
if (cmd_posn(0,10,50,19,150)) {
  cmd_new_room(4);
if (AGI.break_all_logics) return;
}
if (cmd_posn(0,31,69,42,69)) {
  cmd_release_priority(0);
}
if (cmd_posn(0,31,68,42,68)) {
  cmd_set_priority(0, 5);
}
return;

}}}
MESSAGES[3]=[
"",
"To the left an open door leads you back into the bedroom. The bathroom is to the right and against the back wall is the closet. A narrow stairway leads down to the ground floor of your house.",
"You use your closet to store things that you don't really need. Unsurprisingly, it contains nothing of interest.",
"But you're not in the closet!",
"Its just as it appears.",
"The closet door is open.",
"The closet door is closed.",
"You don't have the right key.",
"On the walls hang many paintings.",
"Nope. Nothing behind there.",
"Your search reveals nothing.",
"This painting shows a group of cavemen hunting a dinosaur.",
"This haunting picture is of a city in total ruin. For some reason, looking at it always sends a chill down your spine.",
"It's just a picture of some flowers.",
"Move closer to the one that you want to examine.",
"You look under the rug and find.....",
"absolutely nothing.",
"You'll need to get closer.",
"The door is already open.",
"You're in the way of the door!",
"The door is already closed.",
"All of a sudden it gets real dark."];