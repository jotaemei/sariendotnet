window.logic7 = function()
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
  cmd_load_view(5);
  cmd_load_view(12);
  cmd_load_view(13);
  if (!(!cmd_isset(205))) {
  jumpTo(501);
  break;
}
    cmd_load_view(4);
    cmd_load_view(14);
  case 501:
  cmd_reset(254);
  cmd_reset(253);
  cmd_set_horizon(50);
  cmd_animate_obj(1);
  cmd_set_view(1, 12);
  cmd_ignore_blocks(1);
  cmd_position(1, 146, 130);
  cmd_set_priority(1, 13);
  if (!(cmd_isset(206))) {
  jumpTo(502);
  break;
}
    cmd_set_loop(1, 2);
    jumpTo(1);
break;
  case 502:
  cmd_set_loop(1, 0);
case 1:
  if (!(cmd_isset(202))) {
  jumpTo(503);
  break;
}
    cmd_set_cel(1, 3);
    jumpTo(2);
break;
  case 503:
  cmd_set_cel(1, 0);
case 2:
  cmd_draw(1);
  cmd_stop_cycling(1);
  cmd_stop_update(1);
  cmd_animate_obj(2);
  cmd_set_view(2, 13);
  cmd_ignore_blocks(2);
  cmd_position(2, 94, 80);
  cmd_set_priority(2, 5);
  cmd_set_cel(2, 4);
  cmd_draw(2);
  cmd_stop_cycling(2);
  cmd_start_update(2);
  cmd_reverse_loop(2, 252);
  cmd_assignn(103, 0);
  cmd_assignn(100, 0);
  cmd_observe_objs(0);
  cmd_draw(0);
  cmd_show_pic();
case 500:
if ((cmd_said(13) || cmd_said(13, 14))) {
  cmd_print(1);
}
if ((cmd_said(13, 23) || cmd_said(13, 43) || cmd_said(13, 60) || cmd_said(13, 45) || cmd_said(13, 25) || cmd_said(13, 40))) {
  cmd_print(2);
}
if ((cmd_said(58) || cmd_said(58, 33))) {
  cmd_print(3);
}
if (cmd_said(61)) {
  cmd_print(4);
}
if (cmd_said(13, 62)) {
  cmd_print(5);
}
if (cmd_said(13, 63)) {
  cmd_print(6);
}
if (cmd_said(13, 52)) {
  cmd_print(7);
}
if (cmd_said(13, 56)) {
  cmd_print(8);
}
if (cmd_said(13, 64)) {
  cmd_print(9);
}
if ((cmd_said(15, 64) || cmd_said(15, 63))) {
  cmd_print(10);
}
if (cmd_said(13, 49)) {
  if (cmd_isset(202)) {
    cmd_print(11);
    jumpTo(3);
break;
  }
  cmd_print(12);
}
case 3:
if (!(cmd_said(13, 17, 49))) {
  jumpTo(504);
  break;
}
  if (!(cmd_isset(202))) {
  jumpTo(505);
  break;
}
    if (!(cmd_posn(0,137,145,153,153))) {
  jumpTo(506);
  break;
}
      if (!(cmd_isset(206))) {
  jumpTo(507);
  break;
}
        cmd_print(13);
        jumpTo(4);
break;
      case 507:
      cmd_print(14);
case 4:
      jumpTo(5);
break;
    case 506:
    cmd_print(15);
case 5:
    jumpTo(6);
break;
  case 505:
  cmd_print(16);
case 504:
case 6:
if (cmd_said(13, 65)) {
  if (!cmd_isset(206) && cmd_isset(202)) {
    cmd_print(17);
    jumpTo(7);
break;
  }
  if (cmd_has("Parcel")) {
    cmd_reset(4);
    jumpTo(7);
break;
  }
  cmd_print(18);
}
case 7:
if (!(cmd_said(31, 65))) {
  jumpTo(508);
  break;
}
  if (!(cmd_isset(202))) {
  jumpTo(509);
  break;
}
    if (!(cmd_posn(0,137,145,153,153))) {
  jumpTo(510);
  break;
}
      if (!(cmd_isset(206))) {
  jumpTo(511);
  break;
}
        cmd_print(19);
        jumpTo(8);
break;
      case 511:
      cmd_print(20);
      cmd_set(206);
      cmd_increment(3);
      cmd_get("Parcel");
      cmd_set_loop(1, 2);
case 8:
      jumpTo(9);
break;
    case 510:
    cmd_print(15);
case 9:
    jumpTo(10);
break;
  case 509:
  cmd_print(21);
case 508:
case 10:
if ((cmd_said(66, 45) || cmd_said(29, 45))) {
  cmd_print(22);
}
if ((cmd_said(35, 39, 23) || cmd_said(35, 23))) {
  if (cmd_posn(0,91,80,103,82)) {
    cmd_print(23);
    jumpTo(11);
break;
  }
  cmd_print(15);
}
case 11:
if (!((cmd_said(29, 23) || cmd_said(24, 23)))) {
  jumpTo(512);
  break;
}
  if (!(cmd_posn(0,91,80,103,82))) {
  jumpTo(513);
  break;
}
    cmd_assignn(200, 255);
    if (!(cmd_obj_in_room("Front door key",200))) {
  jumpTo(514);
  break;
}
      cmd_start_update(2);
      cmd_end_of_loop(2, 253);
      jumpTo(12);
break;
    case 514:
    cmd_print(24);
case 12:
    jumpTo(13);
break;
  case 513:
  cmd_print(15);
case 512:
case 13:
if (cmd_isset(253)) {
  cmd_position(0, 60, 152);
  cmd_new_room(6);
if (AGI.break_all_logics) return;
}
if (!(cmd_said(29, 49))) {
  jumpTo(515);
  break;
}
  if (!(!cmd_isset(202))) {
  jumpTo(516);
  break;
}
    if (!(cmd_posn(0,137,145,153,153))) {
  jumpTo(517);
  break;
}
      cmd_set(202);
      cmd_start_update(1);
      cmd_end_of_loop(1, 255);
      jumpTo(14);
break;
    case 517:
    cmd_print(15);
case 14:
    jumpTo(15);
break;
  case 516:
  cmd_print(25);
case 515:
case 15:
if (!(cmd_said(30, 49))) {
  jumpTo(518);
  break;
}
  if (!(cmd_isset(202))) {
  jumpTo(519);
  break;
}
    if (!(cmd_posn(0,137,145,153,153))) {
  jumpTo(520);
  break;
}
      cmd_reset(202);
      cmd_start_update(1);
      cmd_reverse_loop(1, 252);
      jumpTo(16);
break;
    case 520:
    cmd_print(15);
case 16:
    jumpTo(17);
break;
  case 519:
  cmd_print(26);
case 518:
case 17:
if (!cmd_isset(254) && (cmd_equaln(2,2) || cmd_equaln(2,4))) {
  cmd_print(27);
  cmd_set(254);
}
if (!cmd_greatern(2,0) && cmd_isset(254)) {
  cmd_reset(254);
}
if (cmd_said(34, 52)) {
  cmd_print(28);
}
if (cmd_said(34, 25)) {
  cmd_print(29);
}
if (!(cmd_said(31, 56))) {
  jumpTo(521);
  break;
}
  cmd_assignn(200, 255);
  if (!(!cmd_obj_in_room("Flower",200))) {
  jumpTo(522);
  break;
}
    if (!((cmd_posn(0,128,87,152,99) || cmd_posn(0,24,92,56,99)))) {
  jumpTo(523);
  break;
}
      cmd_print(30);
      cmd_increment(3);
      cmd_get("Flower");
      jumpTo(18);
break;
    case 523:
    cmd_print(15);
case 18:
    jumpTo(19);
break;
  case 522:
  cmd_print(31);
case 521:
case 19:
if ((cmd_said(67) || cmd_said(67, 68))) {
  if (cmd_equaln(100,40)) {
    cmd_print(32);
    jumpTo(20);
break;
  }
  cmd_print(33);
}
case 20:
if (cmd_said(13, 68)) {
  if (cmd_equaln(100,40)) {
    cmd_print(34);
    jumpTo(21);
break;
  }
  cmd_print(33);
}
case 21:
if (cmd_said(13, 69)) {
  if (cmd_equaln(100,40)) {
    cmd_print(35);
    jumpTo(22);
break;
  }
  cmd_print(36);
}
case 22:
if ((cmd_isset(0) || cmd_posn(0,1,99,35,119))) {
  cmd_set_view(0, 5);
  jumpTo(23);
break;
}
cmd_set_view_v(0, 16);
case 23:
if (!cmd_isset(205)) {
  if (cmd_lessn(100,40)) {
    cmd_increment(100);
    if (cmd_equaln(100,40)) {
      cmd_animate_obj(3);
      cmd_set_view(3, 4);
      cmd_ignore_objs(3);
      cmd_position(3, 1, 157);
      cmd_set_loop(3, 0);
      cmd_draw(3);
      cmd_animate_obj(4);
      cmd_set_view(4, 14);
      cmd_ignore_objs(4);
      cmd_position(4, 8, 157);
      cmd_set_loop(4, 0);
      cmd_draw(4);
      cmd_assignn(101, 3);
      cmd_set_dir(3, 101);
      cmd_set_dir(4, 101);
    }
    jumpTo(24);
break;
  }
  cmd_get_posn(4, 101, 102);
  if (cmd_greatern(101,143)) {
    cmd_increment(100);
    cmd_set(205);
    cmd_erase(4);
    cmd_stop_update(4);
    cmd_erase(3);
    cmd_stop_update(3);
    if (cmd_equaln(103,1)) {
      cmd_assignn(35, 1);
    }
  }
}
case 24:
if (cmd_equaln(16,1)) {
  cmd_get_posn(3, 101, 102);
  if (cmd_equaln(101,20)) {
    cmd_print(37);
    cmd_print(38);
    cmd_print(39);
    cmd_animate_obj(5);
    cmd_set_view(5, 12);
    cmd_ignore_objs(5);
    cmd_get_posn(0, 101, 102);
    cmd_position_v(5, 101, 102);
    cmd_set_loop(5, 1);
    cmd_assignn(101, 2);
    cmd_cycle_time(5, 101);
    cmd_draw(5);
    cmd_program_control();
    cmd_stop_motion(0);
    cmd_erase(0);
    cmd_assignn(103, 1);
  }
}
return;

}}}
MESSAGES[7]=[
"",
"This is the front of your house. The bright and colorful garden is ever so nice this time of year. A mailbox stands next to the path.",
"Its just as it appears.",
"The flowers offer a pleasing armoa.",
"You hear the leaves rustle amongst the soft morning breeze.",
"You have lived here, with Amy, for the past 5 years. You notice a number just above the front door.",
"Flowers poke up through several bushes whilst a large tree looms above the lush green lawn.",
"A large oak tree looms above the garden providing a natural canopy.",
"Many differently colored flowers are dotted about the garden.",
"Several bushes lean against the front of the house.",
"A quick search reveals nothing.",
"The mailbox is currently open.",
"The mailbox is currently closed.",
"Peering inside the mailbox you find nothing.",
"It looks like there's a parcel in there.",
"You'll need to get closer.",
"You can't, the mailbox is closed.",
"There's a parcel inside the mailbox.",
"You can't see that here.",
"But the mailbox is empty.",
"Taken.",
"You can't get that at the moment.",
"You won't get into the house that way.",
"There's no answer.",
"But you don't have the key. It looks like you've locked yourself out of the house!",
"The mailbox is already open.",
"The mailbox is already closed.",
"You don't feel like going for a walk just yet.",
"You can't find a good place to climb up.",
"There's nothing over there of interest to you.",
"You take a single flower from the garden.",
"But, you've already got a flower!",
"\"Good morning\" she replies.",
"You don't see anybody here!",
"She's just a neighbor walking her dog.",
"It's your neighbors dog enjoying his morning walk.",
"You don't see a dog here!",
"\"My Goodness!\" your neighbor blurts.",
"\"Did you forget to put your clothes on this morning?\" she asks.",
"With a little giggle your neighbor carries on her way, while you die of embarassment."];
CONTROLS[7]="?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4>.g.@<+>.g5.x5<+>.g5.x5<+>.g5.x5<+>.g5.x5<+>.g5.x5<+>.g5.x5<+>.g5.x5<+>.g5.x5<Pm>.g5.x5<K5r>.g5.x5<E5x>.g5.x5.r5l5x>.g5.x5.l595Z5!>.g5.x5.ZAK5U5!.,F<.KA.!V,AZQ^.laJA+A.,F<K5!F.r4F.4Q%5lLE5.^A<gAgA.^45EQx5.DAELZ5.rF<!a.{45gVK5.TA!5{LPA>.K45+F.d^}P59A>.U45{.w.,5>.g45,.w><.Z45,.~><.U45,.~><.U45.4.w><.U45.4.w><.U45.4.w><.U45.9.q><.U45.E.k><.U45.P.Y><.U45.U.T><.U45.U.T><.U45.g.J><.U45.l.D><.U45.r.8><.U45.x.3><.U4.Ll]><.Z+TELZ%><.Z.EJKLK~><.Z.POPLw><.ZP8ryDUFd><.ZK898l5wyY><.ZK8958l5.O5O><.gE8A858g5.T5J><.g9AO58Z5.YA8><.g45d58Z5.dA><.Z4k598U5.dEA><.P4q59DP5.TU5><.K4w598P5.TZ5><.E4~598K5.Ol5><.94%58P5.Jr5><.44-5P5.D><.!4-58K5.D><.!4]58K5.8><.!4;589A.3><.^4.3A.D><.^4<J><.+4<J><.+4<D><.{4<8><.,4<3/44.w/Z4.T><.xhr4.J><.^5Z5r4.8><.{5Z5r4O/!5Z5r/,hr?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4";