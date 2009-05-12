window.logic12 = function()
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
  cmd_assignn(200, 12);
  cmd_load_view(10);
  if (!(cmd_obj_in_room("Toilet paper",200))) {
  jumpTo(501);
  break;
}
    cmd_load_view(7);
    cmd_animate_obj(1);
    cmd_set_view(1, 7);
    cmd_set_loop(1, 0);
    cmd_set_cel(1, 3);
    cmd_position(1, 98, 92);
    cmd_draw(1);
    cmd_stop_cycling(1);
  case 501:
  cmd_animate_obj(3);
  cmd_set_view(3, 10);
  cmd_set_loop(3, 2);
  if (!(cmd_isset(204))) {
  jumpTo(502);
  break;
}
    cmd_set_cel(3, 6);
    jumpTo(1);
break;
  case 502:
  cmd_set_cel(3, 0);
case 1:
  cmd_position(3, 101, 85);
  cmd_draw(3);
  cmd_stop_cycling(3);
  cmd_animate_obj(2);
  cmd_set_view(2, 10);
  cmd_set_cel(2, 0);
  cmd_ignore_blocks(2);
  cmd_ignore_objs(2);
  cmd_position(2, 102, 115);
  cmd_stop_cycling(2);
  cmd_ignore_objs(0);
  cmd_draw(0);
  cmd_show_pic();
case 500:
if ((cmd_said(13) || cmd_said(13, 14))) {
  cmd_print(1);
}
if (cmd_said(13, 27)) {
  cmd_print(2);
}
if (cmd_said(13, 102)) {
  cmd_print(3);
}
if ((cmd_said(13, 103) || cmd_said(13, 104))) {
  cmd_print(4);
}
if (cmd_said(13, 70)) {
  cmd_assignn(200, 12);
  if (cmd_obj_in_room("Toilet paper",200)) {
    cmd_print(5);
    jumpTo(2);
break;
  }
  cmd_reset(4);
}
case 2:
if (cmd_said(13, 19)) {
  cmd_print(5);
}
if (cmd_said(13, 105)) {
  cmd_print(6);
}
if ((cmd_said(13, 26, 105) || cmd_said(13, 17, 105))) {
  cmd_print(7);
}
if (cmd_said(13, 28, 19)) {
  cmd_print(8);
  cmd_print(9);
}
if ((cmd_said(13, 45) || cmd_said(13, 88, 45))) {
  cmd_print(10);
}
if ((cmd_said(13, 55) || cmd_said(13, 56))) {
  cmd_print(11);
}
if ((cmd_said(13, 92) || cmd_said(13, 106))) {
  cmd_print(12);
}
if (cmd_said(13, 89)) {
  cmd_print(13);
}
if ((cmd_said(13, 107) || cmd_said(13, 17, 107))) {
  cmd_print(14);
}
if (cmd_said(13, 46)) {
  cmd_print(15);
  if (cmd_isset(204)) {
    cmd_print(16);
  }
}
if (cmd_said(100, 101)) {
  if (cmd_posn(0,96,110,108,122)) {
    cmd_print(17);
    jumpTo(3);
break;
  }
  cmd_print(18);
}
case 3:
if (cmd_said(31, 55)) {
  cmd_print(19);
}
if ((cmd_said(44, 89) || cmd_said(86, 89) || cmd_said(44, 89))) {
  if (cmd_posn(0,80,115,102,125)) {
    cmd_set(255);
    cmd_assignn(200, 0);
    jumpTo(4);
break;
  }
  if (cmd_posn(0,80,100,102,115)) {
    cmd_get_posn(0, 202, 201);
    cmd_assignn(201, 115);
    if (cmd_lessn(202,94)) {
      cmd_assignn(202, 94);
    }
    cmd_move_obj_v(0, 202, 201, 4, 255);
    cmd_assignn(200, 0);
    jumpTo(4);
break;
  }
  cmd_print(18);
}
case 4:
if (!(cmd_isset(255))) {
  jumpTo(503);
  break;
}
  if (!(cmd_equaln(200,3))) {
  jumpTo(504);
  break;
}
    cmd_draw(0);
    cmd_erase(2);
    cmd_player_control();
  case 504:
  if (!(cmd_equaln(200,2))) {
  jumpTo(505);
  break;
}
    cmd_reverse_loop(2, 255);
    cmd_assignn(200, 3);
    cmd_toggle(204);
    if (!(cmd_isset(204))) {
  jumpTo(506);
  break;
}
      cmd_end_of_loop(3, 254);
      jumpTo(5);
break;
    case 506:
    cmd_reverse_loop(3, 254);
  case 505:
case 5:
  if (!(cmd_equaln(200,1))) {
  jumpTo(507);
  break;
}
    if (!(cmd_equaln(16,1))) {
  jumpTo(508);
  break;
}
      cmd_set_loop(2, 0);
      jumpTo(6);
break;
    case 508:
    cmd_set_loop(2, 1);
case 6:
    cmd_draw(2);
    cmd_erase(0);
    cmd_program_control();
    cmd_end_of_loop(2, 255);
    cmd_assignn(200, 2);
  case 507:
  if (!(cmd_equaln(200,0))) {
  jumpTo(509);
  break;
}
    cmd_assignn(200, 1);
    cmd_move_obj(0, 102, 115, 1, 255);
  case 509:
case 503:
if (cmd_said(29, 45)) {
  cmd_print(20);
}
if (cmd_said(30, 45)) {
  cmd_print(21);
}
if ((cmd_said(108, 105) || cmd_said(108))) {
  if (cmd_posn(0,81,80,97,103)) {
    cmd_print(22);
    cmd_print(23);
    jumpTo(7);
break;
  }
  cmd_print(18);
}
case 7:
if ((cmd_said(31, 109) || cmd_said(84, 105) || cmd_said(84, 39, 105) || cmd_said(86, 105) || cmd_said(84) || cmd_said(109))) {
  cmd_print(24);
}
if ((cmd_said(31, 102) || cmd_said(86, 102) || cmd_said(110, 102) || cmd_said(100) || cmd_said(31, 17, 102))) {
  cmd_print(25);
}
if ((cmd_said(31, 103) || cmd_said(31, 104))) {
  cmd_print(26);
}
if (!(cmd_said(31, 70))) {
  jumpTo(510);
  break;
}
  cmd_assignn(200, 12);
  if (!(cmd_obj_in_room("Toilet paper",200))) {
  jumpTo(511);
  break;
}
    if (!(cmd_posn(0,88,97,100,106))) {
  jumpTo(512);
  break;
}
      cmd_print(27);
      cmd_increment(3);
      cmd_get("Toilet paper");
      cmd_erase(1);
      jumpTo(8);
break;
    case 512:
    cmd_print(28);
case 8:
    jumpTo(9);
break;
  case 511:
  cmd_print(29);
case 510:
case 9:
if (cmd_posn(0,20,110,22,132)) {
  cmd_position(0, 134, 76);
  cmd_new_room(3);
if (AGI.break_all_logics) return;
}
return;

}}}
MESSAGES[12]=[
"",
"The bathroom comes complete with all basic features. Bath, toilet and sink.",
"It's of a beautiful tropical beach.",
"You look at the large white (and clean) bath. Some shampoo bottles are resting on the side.",
"Some shampoo bottles are resting on the side of the bath.",
"It's just as it appears.",
"Next to the toilet you notice a roll of toilet paper.",
"You find nothing of interest.",
"You look under the rug and find.....",
"absolutely nothing.",
"From this window you can see all the way down your street. Next to the window you notice a cord.",
"You spot a potted cactus in the corner of the room.",
"Its just as it appears.",
"Its a cord for pulling down the blind.",
"Looking in the mirror you see the face of a middle aged man.",
"There's a cord attached to it.",
"On the blind you notice the number 71 clearly written. How odd.",
"Ok, you wash your hands. Big deal.",
"You're not close enough.",
"No, its far too prickly. And anyway, it's just meant to decorate the room.",
"You can't, its stuck.",
"It already is.",
"Fwhoooosh!",
"Gurgle!",
"But you don't need to go.",
"Why? You last had a bath only two months ago.",
"You don't really need any shampoo at the moment.",
"You grab a few sheets of toilet paper.",
"You'll need to get closer.",
"You've already got some toilet paper."];
CONTROLS[12]="?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4>.4bgR<.+>.46U6g6P6<.^>.46UBUBP6<.^>.46gRg6<.!>.46.P6<.x>.46.P6<.x>.46.U6<.r>.46.U6<.r>.46.Z6<.l>.46.g6<.g>.46.g6<.g<.4<6.l6<.Z<.46<.r6<.U<,6<.x6<.U<,6<.!6<.P.g.1g6<.+6<.K<Z6g6<.+6<.K<Z6Z6<.{B<.E<Z6Z6<.{B<.E<Z6U6>4B<.9<Z6U6>4696<.4<Z6P6>EB<.4<ZW>KB<,><.4B<{><.4B<{><.9B<+><.K6<^><.K6<^><.P6<!><.U6<x><.U6<x><.Z6<r><.ZB<l><.g6<l><.l6<g><.l6<g^.W>.g6<Z<96>.l6<U<96>.l6<U<46>.x6<P<46>.!6<K.,6>.^6<K.,6>.+6<E.{6>.{6<E.{6>.,6<9.+6><96<4.+6><96<4.^6>.U|.,.!6>.Z6<+.!6>.Z6<+.x6>.g6<+.x6>.g6<+.r6>.l6<+.r6>.l6<+.l>.z<+?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4";