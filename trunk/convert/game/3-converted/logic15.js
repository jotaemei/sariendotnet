window.logic15 = function()
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
  cmd_load_view(23);
  cmd_animate_obj(1);
  cmd_set_view(1, 23);
  cmd_set_loop(1, 0);
  cmd_position(1, 131, 106);
  if (!(cmd_isset(210))) {
  jumpTo(501);
  break;
}
    cmd_set_cel(1, 1);
    jumpTo(1);
break;
  case 501:
  cmd_set_cel(1, 0);
case 1:
  cmd_draw(1);
  cmd_stop_cycling(1);
  cmd_stop_update(1);
  cmd_animate_obj(2);
  cmd_set_view(2, 23);
  cmd_set_loop(2, 1);
  cmd_position(2, 140, 102);
  cmd_assignn(103, 10);
  cmd_cycle_time(2, 103);
  if (!(cmd_isset(210))) {
  jumpTo(502);
  break;
}
    cmd_set_cel(2, 4);
    jumpTo(2);
break;
  case 502:
  cmd_set_cel(2, 0);
case 2:
  cmd_draw(2);
  cmd_stop_cycling(2);
  cmd_animate_obj(3);
  cmd_set_view(3, 23);
  cmd_set_loop(3, 2);
  cmd_set_cel(3, 0);
  cmd_position(3, 111, 112);
  cmd_assignn(103, 4);
  cmd_cycle_time(3, 103);
  if (!(cmd_isset(210))) {
  jumpTo(503);
  break;
}
    cmd_draw(3);
  case 503:
  cmd_animate_obj(4);
  cmd_set_view(4, 23);
  cmd_set_loop(4, 3);
  cmd_set_cel(4, 0);
  cmd_position(4, 97, 92);
  cmd_stop_cycling(4);
  if (!(cmd_isset(210))) {
  jumpTo(504);
  break;
}
    cmd_draw(4);
  case 504:
  cmd_animate_obj(5);
  cmd_set_view(5, 23);
  cmd_set_loop(5, 4);
  cmd_set_cel(5, 0);
  cmd_position(5, 146, 146);
  cmd_set_priority(5, 15);
  cmd_assignn(103, 12);
  cmd_cycle_time(5, 103);
  if (!(cmd_isset(210))) {
  jumpTo(505);
  break;
}
    cmd_draw(5);
  case 505:
  cmd_animate_obj(6);
  cmd_set_view(6, 23);
  cmd_set_loop(6, 5);
  cmd_set_cel(6, 0);
  cmd_position(6, 23, 161);
  cmd_set_priority(6, 15);
  cmd_assignn(103, 20);
  cmd_cycle_time(6, 103);
  if (!(cmd_isset(210))) {
  jumpTo(506);
  break;
}
    cmd_draw(6);
  case 506:
  cmd_animate_obj(7);
  cmd_set_view(7, 23);
  cmd_set_loop(7, 6);
  cmd_set_cel(7, 0);
  cmd_position(7, 69, 140);
  cmd_set_priority(7, 13);
  cmd_stop_cycling(7);
  cmd_ignore_objs(7);
  cmd_ignore_blocks(7);
  if (!(cmd_isset(210))) {
  jumpTo(507);
  break;
}
    cmd_draw(7);
  case 507:
  cmd_assignn(108, 0);
  cmd_assignn(107, 0);
  cmd_animate_obj(8);
  cmd_set_view(8, 23);
  cmd_set_loop(8, 7);
  cmd_set_cel(8, 0);
  cmd_ignore_objs(8);
  cmd_position(8, 97, 106);
  cmd_animate_obj(9);
  cmd_set_view(9, 23);
  cmd_set_cel(9, 0);
  cmd_ignore_objs(9);
  cmd_ignore_blocks(9);
  if (!(cmd_isset(211))) {
  jumpTo(508);
  break;
}
    cmd_set_loop(9, 9);
    jumpTo(3);
break;
  case 508:
  cmd_set_loop(9, 8);
case 3:
  cmd_position(9, 56, 150);
  cmd_assignn(103, 2);
  cmd_cycle_time(9, 103);
  if (!(cmd_isset(210))) {
  jumpTo(509);
  break;
}
    cmd_draw(9);
  case 509:
  cmd_animate_obj(10);
  cmd_set_view(10, 23);
  cmd_set_cel(10, 0);
  cmd_set_loop(10, 10);
  cmd_ignore_objs(10);
  cmd_ignore_blocks(10);
  cmd_set_priority(10, 13);
  cmd_position(10, 98, 157);
  cmd_stop_update(10);
  if (!(cmd_isset(212) && !cmd_isset(213))) {
  jumpTo(510);
  break;
}
    cmd_draw(10);
  case 510:
  cmd_animate_obj(11);
  cmd_set_view(11, 23);
  cmd_set_cel(11, 0);
  cmd_set_loop(11, 11);
  cmd_ignore_objs(11);
  cmd_ignore_blocks(11);
  cmd_set_priority(11, 4);
  cmd_position(11, 65, 96);
  if (!(!cmd_has("Timer") && !cmd_has("Timer(no batteries)"))) {
  jumpTo(511);
  break;
}
    cmd_draw(11);
  case 511:
  cmd_assignn(109, 0);
  if (!(cmd_equaln(1,13))) {
  jumpTo(512);
  break;
}
    if (!(cmd_equaln(101,1))) {
  jumpTo(513);
  break;
}
      cmd_prevent_input();
      cmd_assignn(109, 1);
      cmd_set(250);
      cmd_load_view(25);
      cmd_animate_obj(12);
      cmd_set_view(12, 25);
      cmd_set_cel(12, 0);
      cmd_set_loop(12, 0);
      cmd_ignore_objs(12);
      cmd_ignore_blocks(12);
      cmd_set_priority(12, 14);
      cmd_position(12, 76, 128);
      cmd_animate_obj(13);
      cmd_set_view(13, 25);
      cmd_set_cel(13, 0);
      cmd_set_loop(13, 1);
      cmd_ignore_objs(13);
      cmd_stop_cycling(13);
      cmd_ignore_blocks(13);
      cmd_set_priority(13, 13);
      cmd_animate_obj(14);
      cmd_set_view(14, 25);
      cmd_set_cel(14, 0);
      cmd_set_loop(14, 1);
      cmd_ignore_objs(14);
      cmd_stop_cycling(14);
      cmd_ignore_blocks(14);
      cmd_set_priority(14, 13);
      cmd_animate_obj(15);
      cmd_set_view(15, 25);
      cmd_set_cel(15, 0);
      cmd_set_loop(15, 1);
      cmd_ignore_objs(15);
      cmd_stop_cycling(15);
      cmd_ignore_blocks(15);
      cmd_set_priority(15, 13);
      cmd_position(13, 78, 67);
      cmd_draw(13);
      cmd_position(14, 78, 99);
      cmd_draw(14);
      cmd_position(15, 78, 128);
      cmd_draw(15);
    case 513:
  case 512:
  cmd_assignn(110, 0);
  cmd_set(16);
  cmd_ignore_objs(0);
  cmd_ignore_blocks(0);
  cmd_release_priority(0);
  cmd_draw(0);
  cmd_show_pic();
case 500:
if (!cmd_isset(214)) {
  cmd_increment(110);
  if (cmd_equaln(110,20)) {
    cmd_print(1);
    cmd_print(2);
    cmd_print(3);
    cmd_set(214);
  }
}
if ((cmd_said(13) || cmd_said(13, 14))) {
  cmd_print(4);
  cmd_print(5);
}
if (cmd_said(13, 81)) {
  if (cmd_isset(210)) {
    cmd_print(6);
    jumpTo(4);
break;
  }
  cmd_print(7);
}
case 4:
if ((cmd_said(13, 49) || cmd_said(13, 17, 49) || cmd_said(15, 49))) {
  cmd_print(8);
}
if (cmd_said(13, 111)) {
  cmd_print(9);
}
if (cmd_said(13, 112)) {
  cmd_print(10);
  if (cmd_isset(210)) {
    cmd_print(11);
    jumpTo(5);
break;
  }
  cmd_print(12);
}
case 5:
if (cmd_said(13, 72)) {
  cmd_print(13);
}
if (!(cmd_said(31, 113))) {
  jumpTo(514);
  break;
}
  if (!(!cmd_has("Timer") && !cmd_has("Timer(no batteries)"))) {
  jumpTo(515);
  break;
}
    if (!(cmd_posn(0,56,117,70,122))) {
  jumpTo(516);
  break;
}
      cmd_print(14);
      cmd_get("Timer(no batteries)");
      cmd_increment(3);
      cmd_erase(11);
      jumpTo(6);
break;
    case 516:
    cmd_print(15);
case 6:
    jumpTo(7);
break;
  case 515:
  cmd_print(16);
case 514:
case 7:
if (cmd_said(13, 113)) {
  if (!cmd_has("Timer") && !cmd_has("Timer(no batteries)")) {
    cmd_print(17);
    jumpTo(8);
break;
  }
  cmd_reset(4);
}
case 8:
if ((cmd_said(13, 47) || cmd_said(13, 39, 47))) {
  cmd_print(18);
  if (!cmd_has("Timer") && !cmd_has("Timer(no batteries)")) {
    cmd_print(19);
  }
}
if (!(cmd_said(114, 99))) {
  jumpTo(517);
  break;
}
  if (!(cmd_isset(212))) {
  jumpTo(518);
  break;
}
    if (!(cmd_isset(213))) {
  jumpTo(519);
  break;
}
      cmd_print(20);
      jumpTo(9);
break;
    case 519:
    cmd_print(21);
case 9:
    jumpTo(10);
break;
  case 518:
  cmd_print(20);
case 517:
case 10:
if (cmd_said(115, 99)) {
  cmd_print(22);
}
if (!(cmd_said(29, 99))) {
  jumpTo(520);
  break;
}
  if (!(cmd_isset(212))) {
  jumpTo(521);
  break;
}
    if (!(cmd_isset(213))) {
  jumpTo(522);
  break;
}
      cmd_print(23);
      jumpTo(11);
break;
    case 522:
    cmd_print(24);
case 11:
    jumpTo(12);
break;
  case 521:
  cmd_print(25);
case 520:
case 12:
if ((cmd_said(13, 99) || cmd_said(13, 17, 99) || cmd_said(13, 17, 116))) {
  if (cmd_isset(212) && !cmd_isset(213)) {
    cmd_print(26);
    cmd_print(27);
    jumpTo(13);
break;
  }
  cmd_print(28);
}
case 13:
if (cmd_said(13, 28, 20)) {
  cmd_print(29);
}
if ((cmd_said(13, 25) || cmd_said(13, 70) || cmd_said(13, 117))) {
  cmd_print(30);
}
if (cmd_said(13, 118)) {
  cmd_print(31);
}
if (cmd_said(13, 116)) {
  cmd_print(32);
  if (cmd_isset(210)) {
    cmd_print(33);
    jumpTo(14);
break;
  }
  cmd_print(34);
}
case 14:
if (cmd_said(13, 119)) {
  cmd_print(35);
  if (cmd_isset(210) && !cmd_isset(211)) {
    cmd_print(36);
  }
}
if ((cmd_said(13, 18) || cmd_said(13, 20) || cmd_said(13, 43))) {
  cmd_print(37);
}
if (cmd_said(96, 99)) {
  cmd_print(38);
}
if (!((cmd_said(44, 111) || cmd_said(44, 111) || cmd_said(120, 112, 39) || cmd_said(83, 112) || cmd_said(120, 111)))) {
  jumpTo(523);
  break;
}
  if (!(cmd_isset(210))) {
  jumpTo(524);
  break;
}
    if (!(cmd_posn(0,125,122,136,127))) {
  jumpTo(525);
  break;
}
      cmd_print(39);
      cmd_set_cel(1, 0);
      cmd_force_update(1);
      cmd_reverse_loop(2, 255);
      cmd_erase(3);
      cmd_erase(4);
      cmd_erase(5);
      cmd_erase(6);
      cmd_erase(7);
      cmd_erase(9);
      cmd_draw(8);
      cmd_erase(8);
      cmd_reset(210);
      jumpTo(15);
break;
    case 525:
    cmd_print(15);
case 15:
    jumpTo(16);
break;
  case 524:
  if (!(cmd_posn(0,125,122,136,127))) {
  jumpTo(526);
  break;
}
    cmd_print(40);
    cmd_set_cel(1, 1);
    cmd_force_update(1);
    cmd_end_of_loop(2, 255);
    cmd_draw(3);
    cmd_draw(4);
    cmd_draw(5);
    cmd_draw(6);
    cmd_draw(7);
    cmd_draw(9);
    cmd_set(210);
    jumpTo(16);
break;
  case 526:
  cmd_print(15);
case 523:
case 16:
if ((cmd_said(121, 98, 17, 119) || cmd_said(121, 98) || cmd_said(86, 98, 39, 119))) {
  cmd_print(41);
}
if (!((cmd_said(121, 122, 17, 119) || cmd_said(121, 122) || cmd_said(86, 122, 39, 119)))) {
  jumpTo(527);
  break;
}
  if (!(cmd_has("Aliasing card"))) {
  jumpTo(528);
  break;
}
    if (!(cmd_posn(0,46,148,61,160))) {
  jumpTo(529);
  break;
}
      cmd_print(42);
      cmd_addn(3, 2);
      cmd_drop("Aliasing card");
      cmd_set_loop(9, 9);
      cmd_set(211);
      jumpTo(17);
break;
    case 529:
    cmd_print(43);
case 17:
    jumpTo(18);
break;
  case 528:
  cmd_print(44);
case 527:
case 18:
if ((cmd_said(29, 99, 59) || cmd_said(86, 59, 39, 99) || cmd_said(115, 99, 59))) {
  if (cmd_has("Front door key")) {
    cmd_print(45);
    jumpTo(19);
break;
  }
  cmd_print(46);
}
case 19:
if ((cmd_said(29, 99, 122) || cmd_said(86, 122, 39, 99) || cmd_said(115, 99, 122))) {
  if (cmd_has("Aliasing card")) {
    cmd_print(47);
    jumpTo(20);
break;
  }
  cmd_print(48);
}
case 20:
if (!((cmd_said(29, 99, 98) || cmd_said(86, 98, 39, 99) || cmd_said(115, 99, 98)))) {
  jumpTo(530);
  break;
}
  if (!(cmd_has("Kitchen knife"))) {
  jumpTo(531);
  break;
}
    if (!(cmd_isset(212) && !cmd_isset(213))) {
  jumpTo(532);
  break;
}
      cmd_print(49);
      jumpTo(21);
break;
    case 532:
    if (!(cmd_isset(213))) {
  jumpTo(533);
  break;
}
      cmd_print(23);
      jumpTo(21);
break;
    case 533:
    if (!(cmd_posn(0,90,145,107,160))) {
  jumpTo(534);
  break;
}
      cmd_print(50);
      cmd_addn(3, 3);
      cmd_draw(10);
      cmd_set(212);
      jumpTo(21);
break;
    case 534:
    cmd_print(51);
case 21:
    jumpTo(22);
break;
  case 531:
  cmd_print(52);
case 530:
case 22:
if (!((cmd_said(13, 123) || cmd_said(124, 123)))) {
  jumpTo(535);
  break;
}
  if (!(cmd_isset(212) && !cmd_isset(213))) {
  jumpTo(536);
  break;
}
    if (!(cmd_posn(0,90,145,107,160))) {
  jumpTo(537);
  break;
}
      cmd_new_room(11);
if (AGI.break_all_logics) return;
      jumpTo(23);
break;
    case 537:
    cmd_print(51);
case 23:
    jumpTo(24);
break;
  case 536:
  cmd_print(53);
case 535:
case 24:
if (!((cmd_said(13, 125) || cmd_said(13, 126) || cmd_said(86, 125)))) {
  jumpTo(538);
  break;
}
  if (!(cmd_isset(210))) {
  jumpTo(539);
  break;
}
    if (!(cmd_posn(0,37,117,55,122))) {
  jumpTo(540);
  break;
}
      cmd_new_room(13);
if (AGI.break_all_logics) return;
      jumpTo(25);
break;
    case 540:
    cmd_print(51);
case 25:
    jumpTo(26);
break;
  case 539:
  cmd_print(54);
case 538:
case 26:
if (cmd_posn(0,6,55,7,57)) {
  cmd_reposition_to(0, 128, 121);
  cmd_new_room(10);
if (AGI.break_all_logics) return;
}
if (cmd_isset(210)) {
  cmd_random(0, 5, 104);
  cmd_set_cel_v(4, 104);
  cmd_random(0, 5, 105);
  cmd_random(0, 7, 106);
  cmd_muln(105, 2);
  cmd_muln(106, 2);
  cmd_addn(105, 97);
  cmd_addn(106, 92);
  cmd_position_v(4, 105, 106);
  cmd_increment(108);
  if (cmd_equaln(108,2)) {
    if (cmd_equaln(107,0)) {
      cmd_set_cel(7, 0);
      cmd_reposition_to(7, 69, 140);
    }
    if (cmd_equaln(107,1)) {
      cmd_set_cel(7, 0);
      cmd_reposition_to(7, 61, 136);
    }
    if (cmd_equaln(107,2)) {
      cmd_set_cel(7, 0);
      cmd_reposition_to(7, 56, 131);
    }
    if (cmd_equaln(107,3)) {
      cmd_set_cel(7, 1);
      cmd_reposition_to(7, 61, 125);
    }
    if (cmd_equaln(107,4)) {
      cmd_set_cel(7, 1);
      cmd_reposition_to(7, 69, 122);
    }
    if (cmd_equaln(107,5)) {
      cmd_set_cel(7, 1);
      cmd_reposition_to(7, 79, 121);
    }
    if (cmd_equaln(107,6)) {
      cmd_set_cel(7, 1);
      cmd_reposition_to(7, 88, 122);
    }
    if (cmd_equaln(107,7)) {
      cmd_set_cel(7, 1);
      cmd_reposition_to(7, 96, 125);
    }
    if (cmd_equaln(107,8)) {
      cmd_set_cel(7, 0);
      cmd_reposition_to(7, 101, 131);
    }
    if (cmd_equaln(107,9)) {
      cmd_set_cel(7, 0);
      cmd_reposition_to(7, 96, 136);
    }
    if (cmd_equaln(107,10)) {
      cmd_set_cel(7, 0);
      cmd_reposition_to(7, 88, 140);
    }
    cmd_increment(107);
    if (cmd_equaln(107,11)) {
      cmd_assignn(107, 0);
    }
    cmd_assignn(108, 0);
  }
}
if (cmd_posn(0,69,146,82,147)) {
  cmd_observe_blocks(0);
  cmd_set_priority(0, 14);
  cmd_reset(16);
}
if (cmd_posn(0,69,149,82,150)) {
  cmd_ignore_blocks(0);
  cmd_release_priority(0);
  cmd_set(16);
}
if (cmd_isset(16)) {
  if (cmd_isset(3)) {
    cmd_stop_motion(0);
    cmd_reposition_to_v(0, 101, 102);
    cmd_start_motion(0);
  }
  cmd_get_posn(0, 101, 102);
}
if (cmd_isset(0)) {
  cmd_get_dir(0, 100);
  if (cmd_equaln(100,5)) {
    cmd_assignn(101, 255);
    cmd_assignn(102, 1);
    cmd_reposition(0, 101, 102);
  }
  if (cmd_equaln(100,1)) {
    cmd_assignn(101, 1);
    cmd_assignn(102, 255);
    cmd_reposition(0, 101, 102);
  }
}
if (cmd_greatern(109,0) && cmd_isset(250)) {
  cmd_reset(250);
  if (cmd_equaln(109,140)) {
    cmd_assignn(101, 0);
    cmd_new_room(2);
if (AGI.break_all_logics) return;
  }
  if (cmd_greatern(109,110) && cmd_lessn(109,140)) {
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_equaln(109,110)) {
    cmd_erase(13);
    cmd_erase(14);
    cmd_erase(15);
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_greatern(109,105) && cmd_lessn(109,110)) {
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_equaln(109,105)) {
    cmd_set_cel(13, 0);
    cmd_set_cel(14, 0);
    cmd_set_cel(15, 0);
    cmd_reposition_to(13, 78, 67);
    cmd_reposition_to(14, 78, 99);
    cmd_reposition_to(15, 78, 128);
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_greatern(109,100) && cmd_lessn(109,105)) {
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_equaln(109,100)) {
    cmd_set_cel(13, 1);
    cmd_set_cel(14, 1);
    cmd_set_cel(15, 1);
    cmd_reposition_to(13, 76, 67);
    cmd_reposition_to(14, 76, 99);
    cmd_reposition_to(15, 76, 128);
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_greatern(109,60) && cmd_lessn(109,100)) {
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_equaln(109,60)) {
    cmd_erase(12);
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_greatern(109,17) && cmd_lessn(109,60)) {
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_equaln(109,17)) {
    cmd_erase(0);
    cmd_draw(12);
    cmd_set_cel(13, 2);
    cmd_set_cel(14, 2);
    cmd_set_cel(15, 2);
    cmd_position(13, 75, 66);
    cmd_position(14, 75, 98);
    cmd_position(15, 75, 128);
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_greatern(109,10) && cmd_lessn(109,17)) {
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_equaln(109,10)) {
    cmd_set_cel(13, 1);
    cmd_set_cel(14, 1);
    cmd_set_cel(15, 1);
    cmd_position(13, 76, 67);
    cmd_position(14, 76, 99);
    cmd_position(15, 76, 128);
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_greatern(109,5) && cmd_lessn(109,10)) {
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_equaln(109,5)) {
    cmd_increment(109);
    cmd_set(250);
  }
  if (cmd_equaln(109,4)) {
    cmd_increment(109);
    cmd_move_obj(0, 76, 128, 0, 250);
  }
  if (cmd_equaln(109,3)) {
    cmd_increment(109);
    cmd_move_obj(0, 76, 161, 0, 250);
  }
  if (cmd_equaln(109,2)) {
    cmd_increment(109);
    cmd_move_obj(0, 55, 161, 0, 250);
  }
  if (cmd_equaln(109,1)) {
    cmd_increment(109);
    cmd_move_obj(0, 43, 149, 0, 250);
  }
}
return;

}}}
MESSAGES[15]=[
"",
"For as long as you can remember you've been fascinated by time.",
"About 3 years ago you devised a way of controlling time. Ever since then you've been trying to make the theory a reality.",
"This basement contains the results of all your work. Its a very exciting time for you since the time machine is nearly finished.",
"Your basement has slowly turned into a laboratory over the years. It contains a complex network of cables, wires and machines.",
"In the centre of the room is the time machine itself. Other things of interest include a power generator in the corner and a desktop computer.",
"Hundreds of lights flicker on and off as the machines follow out their tasks.",
"It's just as it appears.",
"The boxes are just empty packaging.",
"Its used to turn the power on or off.",
"The generator in the corner supplies power to the time machine. A big lever on its front offers the only way of interacting with it.",
"At the moment the generator is switched on.",
"At the moment the generator is switched off.",
"Dotted about the room are many books. Most (if not all) are reference books related to your research.",
"You pick up the timer and notice that you haven't put any batteries in it yet.",
"You're not close enough.",
"You already have the timer.",
"The timing device is used to transport you back home if you are in another time period. It does this by locating the appropriate time window.",
"Among other things, on the desk is a computer.",
"You also spot your timer lying on the desk.",
"It is.",
"But you haven't configured the machine correctly yet.",
"What do you want to unscrew the panel with?",
"You don't need to, the machine is already configured correctly.",
"But the panel is already open!",
"Since it's screwed into place you can't open it with your bare hands.",
"Inside the machine you can see a configuration board. This is used to set the time machine correctly.",
"You have yet to find out what the correct configuration is and without it you have no way of knowing if the machine will work correctly.",
"The panel is currently screwed into place.",
"There's nothing of interest under there.",
"On the back wall there are papers, diagrams and notes. At one time they would have been invaluable to your project, but at the moment they don't appear to be of any interest.",
"A complex network of cables run along the walls, floor and ceiling.",
"It's taken you almost 3 years to build this thing, and even longer to design it.",
"The time machine hums with activity. On its right is a panel. On the left hand side are 4 slots.",
"Since the power is off, the time machine lies dormant. On its right is a panel.",
"On the left hand side of the machine are four slots. These are used to add certain components to the machine.",
"You notice that one of them has a red flashing light on it. This indicates that the slot is empty.",
"Its just as it appears.",
"You give the panel a swift kick but it still fails to open.",
"You turn the power off.",
"You pull the lever down and the room comes to life.",
"That's just plain dangerous.",
"The card slots into place with a satisfying click.",
"You need to get closer.",
"But you don't have a card.",
"You can't seem to get enough leverage with the key.",
"You don't have a key!",
"The card could easily break if you did that.",
"You don't have a card!",
"But the panel has already been removed!",
"Using the knife you unscrew the panel and remove it.",
"You'll need to get closer.",
"But you don't have a knife.",
"But you can't see the configuration board at the moment.",
"The screen is blank. Try turning the power on."];
CONTROLS[15]="?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4K<F><.x<U5><.xgh.9V><.x{5.95><.,{5.95><.,{5.95><.,{5.95><.,{5.95><.,{5.95><.,^F.45/4^5.E5/4^59.395/4^5.E5/4^5.E5/4^5.E5/4^5.E5/4^5.E5/4^5.E5/4^5.E5/4!A.95/9!5.E5/9!59.395/9!5.E5/9!5.E5/9!5.E5/9!5.E5/9!5.E5/9!5.E5/9!5.E5/9xA.95/Ex5.E5/Ex59.395/Ex5.E5/Ex5.E5/Ex5.E5/Ex5.E5/Ex5.E5/Ex5.E5/Ex5.E5/ErA.95/Kr5.E5/Kr59.85/Kr5.E5/Kr5.E5/Kr5.E5/Kr5.E5/Kr5.E5/Kr5.E5/Kr5.E5/KlA.95/Pl5.E5/Pl59.85/Pl5.E5/Pl5.E5/Pl5.E5/Pl5.E5/Pl5.E5/Pl5.E5<.+Q>El5.E5<.+5K5>EgA.95<.{5P5>9g5.E5<.9=P5>9g59.85r<h.K.=<Kg5.E5r5>.l5<Eg5.E5l5<P_<l5<9g5.E5l5<4M{M<U5<4g5.E5g5.{G.ZG<K5.,g5.E5g5.^B.^B<E.0,g5.E5Z5.xG<4G<{5,g5.E5Z5.lB<ZB<^5,ZA.E5U5.l6<x6<!5,Z5.K5U5.g6{:,6<x5,Z59.D5U5.Z6^H,H+6<x5{Z5.K5P5.Z6xH.UC^6<r5{Z5.K5P5.U6lH.xC!6<r5+UA.K5K5.Z6ZC.,Cr6<x5^U5.P5K5.U6Z7<KCl6<x5!U5.P5E5.Z6PC<Z7g6<x5!U5.P5E5.Z6K7<r7Z6<!5xU5.P595.g6E7<!CP6<^5rU5.PF.l67<{7E6<{5lU5<,76<,76<,5lP5<.476<,67<.45gK5<.47E5<{59C<,5ZK5<{57P5<^5P7<,5UE5<,5Z5<x5Z7<{5UE5<,5gA<ZAg5<,5P95<.45rA<EAr5<,5P95<.45!A.{A!5<,5P45<.95+F.lF+5<{5U45<.E5,F.EF,5<,5U<.K5.95.E5.95<,5U<.K5.95.E5.45<.45U<.P5.45.E5,A<,5Z<.U5,5.E5{A<.45Z<.Z5{5.E5+A<.95Z<.g5+5.E5^A<.95g<.l5!5.P5!5<.95l<.rAr5.P5rA<.95r<.!Ag5.P5gA<.E5x<.+AU5.P5UA<.K5!<.,L95.P5EF<.P5^>EF.PF<.Z5+>P5.P5<.g5{45>K5.P5<.g5{9A/+5,K5/!5.4PA/l5.9Z5/Z5.Eg5/P5.KlA/95.Px5><.,5.U!A><.^5.Z+5><.x5.g";