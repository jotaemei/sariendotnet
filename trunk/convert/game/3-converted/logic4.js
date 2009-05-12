window.logic4 = function()
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
  cmd_load_view(1);
  cmd_load_view(0);
  cmd_load_view(6);
  cmd_load_view(7);
  cmd_load_view(8);
  cmd_load_view(16);
  cmd_add_to_pic(8, 0, 0, 12, 79, 5, 0);
  cmd_add_to_pic(8, 2, 0, 13, 120, 11, 0);
  if (!(!cmd_isset(201))) {
  jumpTo(501);
  break;
}
    cmd_add_to_pic(8, 1, 0, 31, 116, 10, 0);
  case 501:
  cmd_set_horizon(50);
  if (!(cmd_equaln(1,3))) {
  jumpTo(502);
  break;
}
    cmd_position(0, 144, 122);
  case 502:
  if (!(cmd_equaln(1,5))) {
  jumpTo(503);
  break;
}
    cmd_assignn(16, 1);
    cmd_set_view_v(0, 16);
  case 503:
  cmd_reset(16);
  cmd_animate_obj(3);
  cmd_set_view(3, 16);
  cmd_set_loop(3, 3);
  cmd_set_cel(3, 2);
  cmd_set_priority(3, 4);
  cmd_ignore_objs(3);
  cmd_ignore_blocks(3);
  cmd_position(3, 85, 142);
  cmd_draw(3);
  cmd_stop_cycling(3);
  cmd_animate_obj(1);
  cmd_set_view(1, 6);
  cmd_set_cel(1, 0);
  if (!(cmd_isset(200))) {
  jumpTo(504);
  break;
}
    cmd_set_loop(1, 1);
    jumpTo(1);
break;
  case 504:
  cmd_set_loop(1, 0);
case 1:
  cmd_position(1, 100, 99);
  cmd_set_priority(1, 5);
  cmd_draw(1);
  if (!(cmd_equaln(16,1))) {
  jumpTo(505);
  break;
}
    cmd_animate_obj(2);
    cmd_set_view(2, 7);
    cmd_set_cel(2, 0);
    cmd_set_loop(2, 0);
    cmd_position(2, 103, 129);
    cmd_set_priority(2, 5);
    cmd_draw(2);
    cmd_stop_update(2);
  case 505:
  cmd_ignore_objs(0);
  cmd_draw(0);
  cmd_show_pic();
case 500:
if ((cmd_said(31, 32, 33) || cmd_said(34, 32) || cmd_said(34, 32) || cmd_said(34, 32, 33) || cmd_said(34, 32, 33) || cmd_said(35, 32))) {
  if (!cmd_isset(16)) {
    cmd_print(1);
    jumpTo(2);
break;
  }
  cmd_print(2);
  cmd_erase(0);
  cmd_position(0, 108, 105);
  cmd_draw(0);
  cmd_start_motion(0);
  cmd_reset(16);
}
case 2:
if (!(cmd_said(36, 37))) {
  jumpTo(506);
  break;
}
  if (!(cmd_posn(0,38,102,46,108))) {
  jumpTo(507);
  break;
}
    if (!(!cmd_isset(201))) {
  jumpTo(508);
  break;
}
      cmd_set(201);
      cmd_add_to_pic(8, 1, 1, 31, 116, 10, 0);
      cmd_addn(3, 1);
      jumpTo(3);
break;
    case 508:
    cmd_print(3);
case 3:
    jumpTo(4);
break;
  case 507:
  cmd_print(4);
case 506:
case 4:
if (cmd_said(31, 38)) {
  cmd_print(5);
}
if (cmd_said(13, 38)) {
  if (cmd_posn(0,10,127,32,145)) {
    cmd_new_room(14);
if (AGI.break_all_logics) return;
    jumpTo(5);
break;
  }
  cmd_print(4);
}
case 5:
if (!((cmd_said(31, 39, 40) || cmd_said(34, 39, 40) || cmd_said(35, 39, 40) || cmd_said(34, 41)))) {
  jumpTo(509);
  break;
}
  if (!(cmd_posn(0,96,99,125,107))) {
  jumpTo(510);
  break;
}
    if (!(cmd_isset(200))) {
  jumpTo(511);
  break;
}
      cmd_print(6);
      cmd_erase(0);
      cmd_position(0, 108, 93);
      cmd_draw(0);
      cmd_stop_motion(0);
      cmd_set(16);
      jumpTo(6);
break;
    case 511:
    cmd_print(7);
case 6:
    jumpTo(7);
break;
  case 510:
  cmd_print(4);
case 509:
case 7:
if ((cmd_said(13) || cmd_said(13, 42) || cmd_said(13, 14))) {
  cmd_print(8);
  if (cmd_equaln(16,1)) {
    cmd_print(9);
  }
}
if ((cmd_said(15) || cmd_said(15, 42) || cmd_said(15, 14))) {
  cmd_print(10);
}
if ((cmd_said(13, 43) || cmd_said(13, 39, 43))) {
  if (cmd_equaln(16,1)) {
    cmd_print(11);
    jumpTo(8);
break;
  }
  cmd_print(12);
}
case 8:
if ((cmd_said(13, 18) || cmd_said(13, 19) || cmd_said(13, 25) || cmd_said(13, 22))) {
  cmd_print(12);
}
if ((cmd_said(44, 19) || cmd_said(29, 45) || cmd_said(44, 37) || cmd_said(44, 16))) {
  cmd_print(13);
}
if ((cmd_said(31, 19) || cmd_said(31, 37) || cmd_said(31, 16))) {
  cmd_print(14);
}
if ((cmd_said(30, 46) || cmd_said(31, 46) || cmd_said(44, 46))) {
  cmd_print(15);
}
if (cmd_said(29, 40)) {
  if (cmd_isset(200)) {
    cmd_print(16);
    jumpTo(9);
break;
  }
  if (cmd_posn(0,96,99,125,107)) {
    cmd_print(17);
    cmd_set_loop(1, 1);
    cmd_set(200);
    jumpTo(9);
break;
  }
  cmd_print(4);
}
case 9:
if (cmd_said(30, 40)) {
  if (cmd_isset(16)) {
    cmd_print(18);
    jumpTo(10);
break;
  }
  if (!cmd_isset(200)) {
    cmd_print(19);
    jumpTo(10);
break;
  }
  if (cmd_posn(0,96,99,125,107)) {
    cmd_print(20);
    cmd_set_loop(1, 0);
    cmd_reset(200);
    jumpTo(10);
break;
  }
  cmd_print(4);
}
case 10:
if (cmd_said(13, 40)) {
  if (cmd_isset(200)) {
    cmd_print(21);
    jumpTo(11);
break;
  }
  cmd_print(22);
}
case 11:
if ((cmd_said(13, 17, 40) || cmd_said(15, 40))) {
  if (cmd_isset(200)) {
    cmd_print(23);
    jumpTo(12);
break;
  }
  cmd_print(7);
}
case 12:
if ((cmd_said(29, 46) || cmd_said(30, 47))) {
  cmd_print(24);
}
if ((cmd_said(30, 45) || cmd_said(30, 16))) {
  cmd_print(25);
}
if ((cmd_said(15, 47) || cmd_said(13, 17, 47) || cmd_said(29, 47))) {
  cmd_print(26);
}
if (cmd_said(13, 28, 19)) {
  cmd_print(27);
  cmd_print(28);
}
if (cmd_said(13, 45)) {
  cmd_print(29);
  cmd_print(30);
}
if (cmd_said(13, 27)) {
  cmd_print(31);
}
if ((cmd_said(13, 47) || cmd_said(13, 39, 47))) {
  cmd_print(32);
}
if (cmd_said(13, 46)) {
  cmd_print(33);
}
if (cmd_said(13, 26, 46)) {
  cmd_print(34);
}
if ((cmd_said(13, 37) || cmd_said(13, 39, 37))) {
  cmd_print(35);
}
if ((cmd_said(13, 17, 37) || cmd_said(15, 37))) {
  cmd_print(36);
}
if (cmd_said(13, 16)) {
  cmd_print(37);
}
if ((cmd_said(31, 48) || cmd_said(13, 48))) {
  cmd_print(38);
}
if (!((cmd_said(13, 17, 49) || cmd_said(15, 49) || cmd_said(29, 49)))) {
  jumpTo(512);
  break;
}
  if (!(cmd_isset(16))) {
  jumpTo(513);
  break;
}
    cmd_assignn(200, 4);
    if (!(cmd_obj_in_room("Batteries",200))) {
  jumpTo(514);
  break;
}
      cmd_print(39);
      jumpTo(13);
break;
    case 514:
    cmd_print(40);
case 13:
    jumpTo(14);
break;
  case 513:
  cmd_print(41);
case 512:
case 14:
if (cmd_said(31, 49)) {
  if (cmd_isset(16)) {
    cmd_print(42);
    jumpTo(15);
break;
  }
  cmd_print(43);
}
case 15:
if (!(cmd_said(31, 50))) {
  jumpTo(515);
  break;
}
  cmd_assignn(200, 4);
  if (!(cmd_obj_in_room("Batteries",200))) {
  jumpTo(516);
  break;
}
    if (!(cmd_isset(16))) {
  jumpTo(517);
  break;
}
      cmd_print(44);
      cmd_addn(3, 4);
      cmd_get("Batteries");
      jumpTo(16);
break;
    case 517:
    cmd_print(45);
case 16:
    jumpTo(17);
break;
  case 516:
  cmd_print(46);
case 515:
case 17:
if ((cmd_said(13, 17, 16) || cmd_said(29, 16) || cmd_said(15, 16))) {
  if (cmd_posn(0,96,79,125,107)) {
    cmd_print(47);
    jumpTo(18);
break;
  }
  cmd_print(4);
}
case 18:
if ((cmd_said(13, 39, 16) || cmd_said(13, 49))) {
  cmd_print(48);
}
if ((cmd_said(13, 28, 16) || cmd_said(13, 28, 37))) {
  cmd_print(49);
}
if (cmd_said(13, 51)) {
  if (cmd_equaln(16,1)) {
    cmd_print(11);
    jumpTo(19);
break;
  }
  cmd_print(50);
}
case 19:
if (cmd_said(52)) {
  cmd_print(51);
}
if (!((cmd_said(53, 51) || cmd_said(31, 51)))) {
  jumpTo(518);
  break;
}
  if (!(cmd_equaln(16,1))) {
  jumpTo(519);
  break;
}
    if (!(!cmd_posn(0,97,118,120,132))) {
  jumpTo(520);
  break;
}
      cmd_print(4);
      jumpTo(20);
break;
    case 520:
    cmd_print(52);
    cmd_assignn(16, 0);
    cmd_load_view_v(16);
    cmd_set_view_v(0, 16);
    cmd_erase(2);
    cmd_addn(3, 1);
case 20:
    jumpTo(21);
break;
  case 519:
  cmd_print(53);
case 518:
case 21:
if (cmd_posn(0,145,50,150,150)) {
  cmd_new_room(3);
if (AGI.break_all_logics) return;
}
if (cmd_posn(0,51,80,88,135)) {
  cmd_current_loop(0, 103);
  cmd_current_cel(0, 102);
  cmd_get_posn(0, 100, 101);
  cmd_addn(101, 31);
  cmd_set_loop_v(3, 103);
  cmd_set_cel_v(3, 102);
  cmd_reposition_to_v(3, 100, 101);
}
return;

}}}
MESSAGES[4]=[
"",
"You aren't on it.",
"You step down.",
"You already have.",
"You'll need to get closer.",
"It's just fine where it is.",
"You step up onto the drawer.",
"You can't. It's closed.",
"This is your spacious bedroom. The main feature of the room is your double bed. At the back is a closet and on the floor lies a rug.",
"You notice your clothes on the floor.",
"You'll have to be more specific about what you want to search.",
"Your clothes lie motionless on the floor.",
"Its just as it appears.",
"You do not need to.",
"Its much too cumbersome to carry around.",
"They look fine just the way they are.",
"It's already open.",
"The drawer slides open.",
"You can't do that while standing on the drawer!",
"It's already closed.",
"You firmly push the drawer shut.",
"It is currently open.",
"It is currently closed.",
"The drawer contains nothing you need.",
"They already are!",
"It already is!",
"They are both empty.",
"You look under the rug and find.....",
"absolutely nothing.",
"Light pours through the window on this beautiful morning.",
"However, the days haven't seemed so bright since Amy died.",
"The picture depicts a snow-capped mountain range.",
"On one of the tables lies a framed photograph.",
"The curtains delicately complement the mood of the room.",
"Nope. Nothing behind them.",
"It's a kingsize bed with tables on either side.",
"The bed contains nothing.",
"A large closet graces the far wall. At the bottom there appears to be a drawer.",
"It's of no use to you.",
"You look inside the box and find...some batteries.",
"You look inside the box and find it completely empty.",
"You can't look in the box from here.",
"You don't really want the box. But you could try looking inside it.",
"You can't get the box from here.",
"Taken.",
"You can't see any batteries here.",
"But, you've already got the them!",
"You take a peek inside your closet and find an array of clothes, none of which you need.",
"Peering up you see a small blue box on the closet.",
"It's pretty dark, but you can just make out some dust.",
"You are currently wearing them.",
"You've only just go up!",
"You pick up your clothes and put them on.",
"But you're already wearing your clothes."];
CONTROLS[4]="?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4<g<@>+<ZA<x5>+<ZA<!*>4<ZA<.l5<.,<Z5<.r5<.,<Z5<.x.h<g<Z5>.E5<Z<Z5>.E5<Z<UA>.K5<U<UA>.K5<U<UA>.P5<P<P595>.U5<K<P.m<.,5<K<.^5>45<E<.^5>45<E<.!A>95l.LU<.!A>95l5.l<.!A>E5g5.l<.!A>K5Z5.l<.!5>P5Z5.l<.!5>U5U5.l<.!5>U5U5.l<.!5>ZV.l<.xA><P<.x5><U<.x5><U<.x5><U<.rA><U<.rA><U<.r5><Z<.r5><Z.g<F><Z.g5/l.Z5/r.Z5/r.Z5><.U@l.Z5><.U.5K.U5><.Z5.K.U5><.g5.E.U5><.g5.E.U5><.l5.9.P5><.x5.4^m><.x5.4^5/K5,!5/U5{!5/U5{x5/g5+x5/g5+r5/r5^r5/x5!l5/!5!l6/^5xg6/{5rg6/{5rZ6/.45lZ6/.95gU6/.E5gP6/.P5ZP6/.U5UK/.tK/.!5P/.!5P/.^5K/.+5E/.+5E/.{59?4?4?4?4?4?4";