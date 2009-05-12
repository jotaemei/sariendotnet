window.logic10 = function()
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
  cmd_set_horizon(10);
  cmd_load_view(17);
  cmd_animate_obj(2);
  cmd_set_view(2, 17);
  cmd_set_loop(2, 3);
  cmd_set_cel(2, 2);
  cmd_set_priority(2, 5);
  cmd_ignore_objs(2);
  cmd_ignore_blocks(2);
  cmd_position(2, 57, 142);
  cmd_draw(2);
  cmd_stop_cycling(2);
  cmd_assignn(200, 10);
  if (!(cmd_obj_in_room("Kitchen knife",200))) {
  jumpTo(501);
  break;
}
    cmd_animate_obj(3);
    cmd_load_view(7);
    cmd_set_view(3, 7);
    cmd_set_loop(3, 0);
    cmd_set_cel(3, 2);
    cmd_position(3, 43, 83);
    cmd_draw(3);
    cmd_stop_cycling(3);
  case 501:
  cmd_load_view(18);
  cmd_animate_obj(4);
  cmd_set_view(4, 18);
  cmd_set_loop(4, 0);
  if (!(cmd_isset(208))) {
  jumpTo(502);
  break;
}
    cmd_set_cel(4, 5);
    jumpTo(1);
break;
  case 502:
  cmd_set_cel(4, 0);
case 1:
  cmd_ignore_objs(4);
  cmd_ignore_blocks(4);
  cmd_position(4, 67, 71);
  cmd_draw(4);
  cmd_stop_cycling(4);
  cmd_animate_obj(5);
  cmd_set_view(5, 18);
  cmd_set_loop(5, 1);
  if (!(cmd_isset(208))) {
  jumpTo(503);
  break;
}
    cmd_set_cel(5, 5);
    jumpTo(2);
break;
  case 503:
  cmd_set_cel(5, 0);
case 2:
  cmd_ignore_objs(5);
  cmd_ignore_blocks(5);
  cmd_set_priority(5, 5);
  cmd_position(5, 63, 129);
  cmd_draw(5);
  cmd_stop_cycling(5);
  cmd_animate_obj(6);
  cmd_set_view(6, 18);
  cmd_set_loop(6, 2);
  if (!(cmd_isset(209))) {
  jumpTo(504);
  break;
}
    cmd_ignore_blocks(0);
    cmd_set_cel(6, 9);
    jumpTo(3);
break;
  case 504:
  cmd_observe_blocks(0);
  cmd_set_cel(6, 0);
case 3:
  cmd_ignore_objs(6);
  cmd_ignore_blocks(6);
  cmd_set_priority(6, 7);
  cmd_position(6, 117, 130);
  cmd_draw(6);
  cmd_stop_cycling(6);
  if (!(cmd_equaln(1,17))) {
  jumpTo(505);
  break;
}
    if (!(cmd_isset(209))) {
  jumpTo(506);
  break;
}
      cmd_assignn(106, 3);
      cmd_cycle_time(6, 106);
      cmd_observe_blocks(0);
      cmd_set_cel(6, 0);
      cmd_end_of_loop(6, 254);
    case 506:
    cmd_position_v(0, 104, 105);
  case 505:
  cmd_draw(0);
  cmd_show_pic();
case 500:
if (cmd_isset(254)) {
  cmd_reset(254);
  cmd_ignore_blocks(0);
}
if ((cmd_said(13) || cmd_said(13, 14))) {
  cmd_print(1);
}
if (cmd_said(13, 28, 19)) {
  cmd_print(2);
  cmd_print(3);
}
if ((cmd_said(13, 18) || cmd_said(13, 19) || cmd_said(13, 43) || cmd_said(13, 47) || cmd_said(13, 74) || cmd_said(13, 22))) {
  cmd_print(4);
}
if ((cmd_said(13, 45) || cmd_said(13, 88, 45))) {
  cmd_print(5);
}
if (cmd_said(13, 46)) {
  cmd_print(6);
}
if (cmd_said(13, 89)) {
  cmd_print(7);
}
if (cmd_said(31, 89)) {
  cmd_print(8);
}
if (cmd_said(13, 90)) {
  cmd_print(9);
}
if ((cmd_said(13, 17, 90) || cmd_said(15, 90))) {
  cmd_print(10);
}
if (cmd_said(13, 25)) {
  cmd_print(11);
}
if (cmd_said(13, 91)) {
  cmd_print(12);
}
if (cmd_said(13, 92)) {
  cmd_print(13);
}
if (cmd_said(13, 93)) {
  cmd_print(14);
}
if (cmd_said(13, 94)) {
  cmd_print(15);
}
if (cmd_said(29, 45)) {
  cmd_print(16);
}
if ((cmd_said(13, 95) || cmd_said(13, 17, 95) || cmd_said(15, 95) || cmd_said(29, 95))) {
  if (cmd_posn(0,50,103,62,107)) {
    cmd_print(17);
    jumpTo(4);
break;
  }
  cmd_print(18);
}
case 4:
if (cmd_said(13, 23)) {
  cmd_print(19);
if (AGI.break_all_logics) return;
}
if (cmd_said(30, 23)) {
  cmd_print(20);
}
if (cmd_said(29, 23)) {
  cmd_print(21);
if (AGI.break_all_logics) return;
}
if (cmd_said(96, 23)) {
  cmd_print(22);
}
if ((cmd_said(13, 17, 94) || cmd_said(15, 94) || cmd_said(29, 94))) {
  if (cmd_posn(0,85,103,108,107)) {
    cmd_print(23);
    jumpTo(5);
break;
  }
  cmd_print(18);
}
case 5:
if ((cmd_said(13, 47) || cmd_said(13, 17, 47) || cmd_said(13, 17, 16) || cmd_said(15, 16) || cmd_said(15, 47) || cmd_said(13, 16))) {
  cmd_print(24);
}
if (cmd_said(13, 97)) {
  if (cmd_has("Kitchen knife")) {
    cmd_print(25);
    jumpTo(6);
break;
  }
  cmd_print(26);
}
case 6:
if (cmd_said(13, 98)) {
  if (cmd_has("Kitchen knife")) {
    cmd_reset(4);
    jumpTo(7);
break;
  }
  cmd_print(27);
}
case 7:
if (!(cmd_said(44, 89))) {
  jumpTo(507);
  break;
}
  if (!(cmd_posn(0,79,104,89,108))) {
  jumpTo(508);
  break;
}
    cmd_print(28);
    if (!(cmd_isset(208))) {
  jumpTo(509);
  break;
}
      cmd_reset(208);
      cmd_reverse_loop(4, 255);
      cmd_reverse_loop(5, 253);
      jumpTo(8);
break;
    case 509:
    cmd_set(208);
    cmd_end_of_loop(4, 255);
    cmd_end_of_loop(5, 253);
case 8:
    jumpTo(9);
break;
  case 508:
  cmd_print(18);
case 507:
case 9:
if (!((cmd_said(13, 99) || cmd_said(86, 99)))) {
  jumpTo(510);
  break;
}
  if (!(!cmd_isset(209))) {
  jumpTo(511);
  break;
}
    if (!(cmd_posn(0,116,126,130,143))) {
  jumpTo(512);
  break;
}
      cmd_new_room(17);
if (AGI.break_all_logics) return;
      jumpTo(10);
break;
    case 512:
    cmd_print(18);
case 10:
    jumpTo(11);
break;
  case 511:
  cmd_print(29);
case 510:
case 11:
if (cmd_said(100, 101)) {
  if (cmd_posn(0,76,103,88,107)) {
    cmd_print(30);
    jumpTo(12);
break;
  }
  cmd_print(31);
}
case 12:
if ((cmd_said(84) || cmd_said(84, 32))) {
  cmd_print(32);
}
if (!(cmd_said(31, 98))) {
  jumpTo(513);
  break;
}
  cmd_assignn(200, 10);
  if (!(cmd_obj_in_room("Kitchen knife",200))) {
  jumpTo(514);
  break;
}
    if (!(cmd_posn(0,40,104,52,118))) {
  jumpTo(515);
  break;
}
      cmd_print(33);
      cmd_increment(3);
      cmd_get("Kitchen knife");
      cmd_erase(3);
      jumpTo(13);
break;
    case 515:
    cmd_print(34);
case 13:
    jumpTo(14);
break;
  case 514:
  cmd_print(35);
case 513:
case 14:
if (cmd_posn(0,5,165,135,168)) {
  cmd_position(0, 65, 76);
  cmd_new_room(6);
if (AGI.break_all_logics) return;
}
if (cmd_posn(0,130,114,131,133)) {
  cmd_position(0, 8, 56);
  cmd_new_room(15);
if (AGI.break_all_logics) return;
}
if (cmd_posn(0,57,100,92,132)) {
  cmd_current_loop(0, 103);
  cmd_current_cel(0, 102);
  cmd_get_posn(0, 100, 101);
  cmd_addn(101, 31);
  cmd_set_loop_v(2, 103);
  cmd_set_cel_v(2, 102);
  cmd_reposition_to_v(2, 100, 101);
}
return;

}}}
MESSAGES[10]=[
"",
"Your kitchen is kitted out with the usual appliances. To the right is a strange looking door.",
"You look under the rug and find.....",
"absolutely nothing.",
"Its just as it appears.",
"Through the window you see your tiny garden.",
"It's a pink blind with a cord attached to it.",
"It's a cord for the blind.",
"You can't! It's attached to the blind. Try pulling it instead.",
"Its a wastebin for putting trash into.",
"You put the trash out last night, so it's empty at the moment.",
"On the western wall you spot a knife rack.",
"There a big fridge, a sink, an oven, a knife rack on the wall and a toaster in the corner .",
"Its just your average looking sink",
"The toaster sits happily in the corner",
"A big, bulky, white fridge graces the room.",
"Nah, it's fine just the way it is.",
"The oven is empty and probably not worth messing around with.",
"You're not close enough.",
"This is the door to the basement. It's made of pure steel and is electronically sealed for security reasons. Next to the door is a panel.",
"Why?",
"You can't. It's electronically locked. Try using the panel next to it.",
"You give the door a swift kick and injure your foot.",
"You open the fridge door and suddenly realise that you need to get some more food in.",
"Your cupboards are full of the usual kitchen stuff. None of which interests you at the moment.",
"There's a knife rack on the western wall with a knife on it.",
"There's a knife rack on the western wall with two knives on it.",
"There's two of them on the rack.",
"You give the cord a quick tug.",
"You don't need to, the door is already open.",
"Ok, you wash your hands. Big deal.",
"You're not close enough to the sink.",
"You'd prefer to stand at the moment.",
"Taken.",
"You'll need to get closer.",
"But, you've already got one!"];
CONTROLS[10]="?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4<.K<.s<.K<.K5<.r5<.E<.E5<.x5<.E<.E5<.!5<.9<.95<.+5<.4<.95<.{5<,<.95<.{5<,<.45>45<{<.45>95<+<.45>E5<^<,5>K5<^<,5>P<VZ<{5>Z6<x<+A>g6<r<^5>r6<r<^5>x6<l<!5>!6<l<!5>^6<g<x5>{6<Z<x5>{6<Z<r5>.46<U<9h>.96<U<95>.r6<P<45>.!6<K<45>.!6<K.,5>.+6<E.,5>.+6<E.{5>.,6<9.{5>.,.=P.+5><95<4.+5><95<4.^5><K5.,.^5><K5.,.!5><U5.{.!5><U5.{.x5><g5.+.x5><l5.^.r5><r5.^.r5><x5.!.l5><!5.!.l5><^5.x.g5><{5.r.g5><{5.r.Z5><,65.l.Z5><,65.l.gA><+695.g.rA><!695.g.!A><r6E5.Z.+A><g6K5.U.,A><U6K5.U<9a>.{6P5.P<la>.g6P5.P<{5>.g6U5.K<{5>.g6Z5.E<{56>.Z6Z5.E<{59.6.g<.W5.9<,5.46.g<.W5.9<.45,6.g6<.Z5.4<.9}6.g6<.Z5.4<.,56.g6<.h,<.,56.g65>Z<.,56.g65>Z<.,56.g65>Z>4.n5>Z?4";