window.logic8 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_set_horizon(15);
  cmd_load_view(15);
  cmd_load_view(11);
  cmd_add_to_pic(15, 2, 4, 12, 79, 5, 0);
  cmd_add_to_pic(15, 2, 3, 64, 70, 5, 0);
  cmd_reset(255);
  cmd_animate_obj(1);
  cmd_set_view(1, 11);
  cmd_set_loop(1, 0);
  cmd_set_cel(1, 0);
  cmd_ignore_objs(1);
  cmd_animate_obj(3);
  cmd_position(3, 102, 110);
  cmd_set_view(3, 11);
  cmd_set_loop(3, 3);
  cmd_set_cel(3, 0);
  cmd_ignore_objs(3);
  if (cmd_isset(207) && !cmd_has("Diagram")) {
    cmd_set_cel(3, 16);
    cmd_set_priority(3, 4);
    cmd_stop_cycling(3);
    cmd_draw(3);
  }
  cmd_animate_obj(2);
  cmd_set_view(2, 15);
  cmd_set_loop(2, 0);
  cmd_set_cel(2, 0);
  cmd_position(2, 42, 95);
  cmd_assignn(100, 5);
  cmd_cycle_time(2, 100);
  cmd_draw(2);
  cmd_assignn(200, 0);
  cmd_draw(0);
  cmd_show_pic();
}
if ((cmd_said(13) || cmd_said(13, 14))) {
  cmd_print(1);
}
if (cmd_said(13, 28, 19)) {
  cmd_print(2);
  cmd_print(3);
}
if ((cmd_said(13, 18) || cmd_said(13, 19) || cmd_said(13, 22))) {
  cmd_print(4);
}
if ((cmd_said(13, 43) || cmd_said(13, 39, 43))) {
  if (cmd_isset(207) && !cmd_has("Diagram")) {
    cmd_print(5);
    jumpTo(1);
break;
  }
  cmd_print(4);
}
case 1:
if (!(cmd_said(31, 70))) {
  jumpTo(500);
  break;
}
  if (!(cmd_isset(207) && !cmd_has("Diagram"))) {
  jumpTo(501);
  break;
}
    if (!(cmd_posn(0,93,103,113,115))) {
  jumpTo(502);
  break;
}
      cmd_print(6);
      cmd_print(7);
      cmd_addn(3, 2);
      cmd_get("Diagram");
      cmd_erase(3);
      jumpTo(2);
break;
    case 502:
    cmd_print(8);
case 2:
    jumpTo(3);
break;
  case 501:
  cmd_print(9);
case 500:
case 3:
if (cmd_said(13, 70)) {
  if (cmd_isset(207) && !cmd_has("Diagram")) {
    cmd_print(10);
    jumpTo(4);
break;
  }
  cmd_reset(4);
}
case 4:
if (!((cmd_said(13, 71) || cmd_said(13, 72)))) {
  jumpTo(503);
  break;
}
  cmd_print(11);
case 503:
if (cmd_said(34, 71)) {
  cmd_print(12);
}
if ((cmd_said(13, 26, 71) || cmd_said(13, 26, 73) || cmd_said(13, 26, 74))) {
  cmd_print(13);
}
if (cmd_said(13, 74)) {
  cmd_print(14);
}
if (cmd_said(15, 74)) {
  cmd_print(15);
}
if ((cmd_said(13, 28, 74) || cmd_said(13, 28, 73))) {
  cmd_print(16);
}
if ((cmd_said(61) || cmd_said(61, 73))) {
  cmd_print(17);
}
if (cmd_said(13, 73)) {
  cmd_print(18);
}
if (cmd_said(13, 75)) {
  cmd_print(19);
}
if (cmd_said(29, 73)) {
  cmd_print(20);
}
if ((cmd_said(44, 75) || cmd_said(44, 75) || cmd_said(44, 75) || cmd_said(31, 75))) {
  cmd_print(21);
}
if ((cmd_said(13, 76) || cmd_said(13, 77))) {
  cmd_print(22);
  cmd_print(23);
}
if ((cmd_said(13, 28, 76) || cmd_said(15, 76))) {
  cmd_print(24);
}
if (cmd_said(31, 78)) {
  cmd_print(25);
}
if (cmd_said(13, 78)) {
  cmd_print(26);
}
if (cmd_said(13, 79)) {
  cmd_print(27);
}
if (cmd_said(13, 80)) {
  cmd_print(28);
  cmd_print(29);
}
if (cmd_said(31, 80)) {
  cmd_print(30);
}
if ((cmd_said(36, 77) || cmd_said(81, 77) || cmd_said(36, 77))) {
  cmd_print(31);
}
if (cmd_said(13, 47)) {
  cmd_print(32);
}
if (cmd_said(44, 47)) {
  cmd_print(33);
}
if (cmd_said(13, 27)) {
  if (cmd_posn(0,51,100,95,120)) {
    cmd_print(34);
    jumpTo(5);
break;
  }
  if (cmd_posn(0,10,100,45,140)) {
    cmd_print(35);
    jumpTo(5);
break;
  }
  cmd_print(36);
}
case 5:
if (!((cmd_said(82, 79) || cmd_said(83, 79)))) {
  jumpTo(504);
  break;
}
  if (!(cmd_equaln(200,0))) {
  jumpTo(505);
  break;
}
    if (!(cmd_posn(0,38,109,116,149))) {
  jumpTo(506);
  break;
}
      cmd_assignn(200, 3);
      cmd_move_obj(0, 66, 149, 0, 255);
      jumpTo(6);
break;
    case 506:
    cmd_print(8);
case 6:
    jumpTo(7);
break;
  case 505:
  cmd_print(37);
case 504:
case 7:
if (!((cmd_said(84) || cmd_said(84, 32) || cmd_said(84, 39, 74)))) {
  jumpTo(507);
  break;
}
  if (!(cmd_equaln(200,0))) {
  jumpTo(508);
  break;
}
    if (!(cmd_posn(0,38,109,116,140))) {
  jumpTo(509);
  break;
}
      cmd_assignn(200, 1);
      cmd_move_obj(0, 76, 109, 0, 255);
      jumpTo(8);
break;
    case 509:
    cmd_print(38);
case 8:
    jumpTo(9);
break;
  case 508:
  cmd_print(37);
case 507:
case 9:
if ((cmd_said(35) || cmd_said(35, 41) || cmd_said(31, 41))) {
  if (cmd_equaln(200,2)) {
    cmd_set(255);
    jumpTo(10);
break;
  }
  cmd_print(39);
}
case 10:
if (cmd_isset(255)) {
  if (cmd_equaln(200,3)) {
    cmd_reset(255);
    cmd_print(40);
    cmd_print(41);
    cmd_assignn(200, 0);
  }
  if (cmd_equaln(200,2)) {
    cmd_reset(255);
    cmd_draw(0);
    cmd_erase(1);
    cmd_player_control();
    cmd_assignn(200, 0);
  }
  if (cmd_equaln(200,1)) {
    cmd_set_cel_v(1, 16);
    cmd_set_loop(1, 0);
    cmd_stop_cycling(1);
    cmd_position(1, 77, 109);
    cmd_draw(1);
    cmd_erase(0);
    cmd_program_control();
    cmd_reset(255);
    cmd_assignn(200, 2);
  }
  if (cmd_equaln(200,9)) {
    cmd_draw(0);
    cmd_erase(1);
    cmd_player_control();
    cmd_assignn(200, 0);
  }
  if (cmd_equaln(200,8)) {
    cmd_reverse_loop(1, 255);
    cmd_program_control();
    cmd_assignn(200, 9);
  }
  if (cmd_equaln(200,7)) {
    cmd_set_cel(1, 0);
    cmd_set_loop(1, 1);
    cmd_end_of_loop(1, 255);
    cmd_program_control();
    cmd_assignn(200, 8);
  }
  if (cmd_equaln(200,6)) {
    cmd_set_loop(1, 2);
    cmd_set_cel(1, 0);
    cmd_end_of_loop(1, 255);
    cmd_program_control();
    cmd_increment(100);
    if (cmd_equaln(100,3) && !cmd_isset(207)) {
      cmd_random(1, 3, 101);
      if (cmd_equaln(101,1)) {
        cmd_draw(3);
        cmd_stop_cycling(3);
        cmd_end_of_loop(3, 207);
      }
    }
    if (cmd_equaln(100,10)) {
      cmd_print(42);
      cmd_assignn(200, 7);
    }
  }
  if (cmd_equaln(200,5)) {
    cmd_print(43);
    cmd_reverse_loop(1, 255);
    cmd_program_control();
    cmd_assignn(100, 0);
    cmd_assignn(200, 6);
  }
  if (cmd_equaln(200,4)) {
    cmd_set_cel_v(1, 16);
    cmd_set_loop(1, 1);
    cmd_end_of_loop(1, 255);
    cmd_position(1, 96, 105);
    cmd_draw(1);
    cmd_erase(0);
    cmd_program_control();
    cmd_assignn(200, 5);
  }
}
if (!((cmd_said(31, 72) || cmd_said(85, 72) || cmd_said(86, 72)))) {
  jumpTo(510);
  break;
}
  if (!(cmd_equaln(16,0))) {
  jumpTo(511);
  break;
}
    if (!(cmd_equaln(200,0))) {
  jumpTo(512);
  break;
}
      if (!(cmd_posn(0,90,103,114,129))) {
  jumpTo(513);
  break;
}
        cmd_assignn(200, 4);
        cmd_move_obj(0, 96, 105, 0, 255);
        jumpTo(11);
break;
      case 513:
      cmd_print(44);
case 11:
      jumpTo(12);
break;
    case 512:
    cmd_print(37);
case 12:
    jumpTo(13);
break;
  case 511:
  cmd_print(45);
case 510:
case 13:
if (cmd_isset(207)) {
  cmd_set_priority(3, 4);
}
if ((cmd_said(13, 87) || cmd_said(85, 87) || cmd_said(85, 80))) {
  if (cmd_posn(0,15,102,37,136)) {
    cmd_show_obj(206);
    jumpTo(14);
break;
  }
  cmd_print(46);
}
case 14:
if (cmd_posn(0,141,30,142,137)) {
  cmd_position(0, 21, 109);
  cmd_new_room(6);
if (AGI.break_all_logics) return;
}
return;

}}}
MESSAGES[8]=[
"",
"You use your lounge mainly for relaxational purposes. You sometimes read a book, sit by the fireplace or just watch some TV.",
"You look under the rug and find.....",
"absolutely nothing.",
"Its just as it appears.",
"You notice a piece of paper on the floor.",
"As you pick up the paper you see that a diagram has been drawn on it.",
"Upon studying it you notice that you've never seen it before. Which is strange considering that you've read these books hundreds of times.",
"You'll need to get closer.",
"You don't see that here!",
"A piece of paper is lying on the floor.",
"The bookcase contains a large number of books which vary greatly in topic.",
"Why exactly?",
"There's nothing of interest back there.",
"There's a nice big comfy sofa here.",
"You rummage around in your sofa, but surprisingly find nothing. No pens or loose money, and not even a remote control.",
"Nope, nothing under there.",
"You hear the clock ticking.",
"A grandfather clock sits in the corner. It's been in your family for many generations.",
"It sways back and forth keeping in perfect time.",
"Better not. You could easily break it.",
"No, you'll upset the timing mechanism.",
"The fireplace brings back fond memories of sitting next to a warm fire with Amy on cold winter nights.",
"On the mantlepiece you notice a couple of statues.",
"You see nothing but a few ashes.",
"But you'd get your hands all dirty!",
"They're just ashes, plain and simple.",
"It just a standard TV.",
"You've had these for about two years now and still can't decide whether they're statues or very ornate candleholders.",
"On one of them you notice some faint markings.",
"You consider taking the statues but soon remember that they weigh far too much.",
"In the middle of summer! Are you mad!?!",
"There's a table in one corner of the room.",
"You don't need to.",
"This painting depicts some roman architecture.",
"This picture seems to be of a futuristic city.",
"Move closer to the one that you want to examine.",
"Not now, you're busy.",
"You'll need to get closer to the sofa.",
"But you aren't sat down!",
"You turn on the TV and flick through the channels.",
"Nothing of apparent interest seems to be on, so you turn it off.",
"Finding nothing of interest, you put the book back.",
"You grab a book at random.",
"You'll need to get closer to the bookcase.",
"Wouldn't you rather get dressed first?",
"You'll need to get closer to the statues."];
CONTROLS[8]="?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4<.Kh.{5>Z<.K5Z5.{5>Z<.K5Z5.{5>Z<.K5Z5.{5>Z<.K5Z5.{5>Z<E.AZ5.{5>Z<E5.g5.{<0<g<E5.g5.{5.,5<Z<E5.g5.{5.,5<Z<E5.g5.{5<45<U<E5.g5.{5<95<P<E5.g5.{5<95<P<E5.g<0<E5<K<E5>.r5<K<E5>.x5<E<95>.^5<9<95>.^5<9<45>.{5<4<45>.,5.,.,5><45.,.,5><95.{.{5><E5.{.{5><K.Lx.+5><.g5x.+5><.g5x.^5><.l5x.^5><.l5x.!5><.r5x.!5><.r5x.x5><.x5x.x5><.x5x.r5><.!5x.r5><.!5x.l5><.^5x.l5><.^5x.g5><.+5x.4h><.Psx,5><.^5.K,5><.+5.E{5><.{5.E{5><.,5.9+5/45.9+5/95.4^5/K5,!5/P5,!5/U5{x5/Z5{x5/g5+r5/r5^r5/r5^l5/!5!l5/^5xg5/+5xZ5/,5rZ5<.g=>x5rU5<.l5^5<g.h^5lU5<.l5^5<g5.Z5+5gP5<.r5^5<g5.Z5+5gP5<.r5^5<g5.Z5{5ZK<.@^<m.Z5{5Z/x.5U?4?4?4?4?4?4?4?4?4?4?4";