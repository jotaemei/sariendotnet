window.logic18 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_set_horizon(50);
  cmd_load_view(30);
  cmd_load_view(31);
  cmd_animate_obj(4);
  cmd_ignore_objs(4);
  cmd_ignore_blocks(4);
  cmd_ignore_horizon(4);
  cmd_set_priority(4, 8);
  cmd_set_view(4, 30);
  cmd_set_loop(4, 0);
  cmd_set_cel(4, 0);
  cmd_position(4, 0, 107);
  cmd_stop_cycling(4);
  cmd_animate_obj(2);
  cmd_ignore_objs(2);
  cmd_ignore_blocks(2);
  cmd_set_view(2, 31);
  cmd_set_loop(2, 0);
  cmd_set_cel(2, 0);
  cmd_position(2, 57, 104);
  cmd_assignn(101, 2);
  cmd_cycle_time(2, 101);
  cmd_stop_cycling(2);
  cmd_animate_obj(3);
  cmd_ignore_objs(3);
  cmd_ignore_blocks(3);
  cmd_ignore_horizon(3);
  cmd_set_priority(3, 8);
  cmd_set_view(3, 30);
  cmd_set_loop(3, 0);
  cmd_set_cel(3, 1);
  cmd_position(3, 29, 81);
  cmd_stop_cycling(3);
  if (!cmd_has("Rock")) {
    cmd_load_view(29);
    cmd_animate_obj(1);
    cmd_set_view(1, 29);
    cmd_set_loop(1, 0);
    cmd_set_cel(1, 0);
    cmd_position(1, 27, 154);
    cmd_draw(1);
    cmd_stop_cycling(1);
    cmd_stop_update(1);
  }
  cmd_show_pic();
  cmd_ignore_objs(0);
  cmd_draw(0);
  cmd_assignn(101, 0);
}
if ((cmd_said(13) || cmd_said(13, 127) || cmd_said(13, 14))) {
  cmd_print(1);
}
if ((cmd_said(13, 64) || cmd_said(15, 64) || cmd_said(13, 56))) {
  cmd_print(2);
}
if ((cmd_said(13, 128) || cmd_said(13, 43))) {
  if (cmd_has("Rock")) {
    cmd_reset(4);
    jumpTo(1);
break;
  }
  cmd_print(3);
}
case 1:
if (cmd_said(31, 128)) {
  if (cmd_has("Rock")) {
    cmd_print(4);
    jumpTo(2);
break;
  }
  if (cmd_posn(0,19,149,33,158)) {
    cmd_print(5);
    cmd_get("Rock");
    cmd_erase(1);
    cmd_increment(3);
    jumpTo(2);
break;
  }
  cmd_print(6);
}
case 2:
if (cmd_greatern(101,0)) {
  if (cmd_greatern(100,0)) {
    cmd_decrement(100);
  }
  if (cmd_equaln(101,1) && cmd_isset(255)) {
    cmd_print(7);
    cmd_move_obj(0, 57, 104, 0, 255);
    cmd_increment(101);
    cmd_assignn(100, 35);
  }
  if (cmd_equaln(101,2)) {
    if (cmd_equaln(100,1)) {
      cmd_draw(4);
      cmd_move_obj(4, 24, 93, 0, 254);
      cmd_draw(3);
      cmd_move_obj(3, 53, 66, 1, 255);
    }
    if (cmd_isset(255)) {
      cmd_assignn(100, 18);
      cmd_set_loop(2, 0);
      cmd_draw(2);
      cmd_erase(0);
      cmd_end_of_loop(2, 254);
      cmd_reset(255);
      cmd_move_obj(2, 68, 104, 0, 255);
      cmd_increment(101);
    }
  }
  if (cmd_equaln(101,3)) {
    if (cmd_equaln(100,1)) {
      cmd_reposition_to(2, 62, 104);
      cmd_increment(101);
      cmd_assignn(100, 10);
    }
  }
  if (cmd_equaln(101,4) && cmd_equaln(100,1)) {
    cmd_set_loop(3, 1);
    cmd_set_cel(3, 0);
    cmd_reset(255);
    cmd_assignn(102, 6);
    cmd_cycle_time(3, 100);
    cmd_end_of_loop(3, 255);
    cmd_increment(101);
    cmd_assignn(100, 80);
  }
  if (cmd_equaln(101,5) && cmd_equaln(100,1)) {
    cmd_assignn(101, 1);
    cmd_new_room(2);
if (AGI.break_all_logics) return;
  }
  jumpTo(3);
break;
}
if (cmd_isset(0)) {
  cmd_print(8);
  cmd_prevent_input();
  cmd_ignore_objs(0);
  cmd_move_obj(0, 10, 104, 0, 255);
  cmd_assignn(101, 1);
}
case 3:
if (cmd_equaln(2,3)) {
  cmd_position(0, 36, 41);
  cmd_assignn(101, 0);
  cmd_new_room(19);
if (AGI.break_all_logics) return;
}
return;

}}}
MESSAGES[18]=[
"",
"You find yourself at the entrance to a deep and murky forest.",
"The bushes seem to be composed of small leaves and branches. Nothing really interesting about them.",
"You see a rock lying on the ground.",
"Don't be greedy, one rock is enough.",
"Ok.",
"You'll need to get closer.",
"Uh-oh.",
"You hear some rustling in a nearby bush and decide to investigate."];
CONTROLS[18]="?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4/.!Q/.KhU/^a+/ZV.P/9Q.x><.rh.,><.PQ<g><.K5<^><.9A<+><.45<,><,5<.4ZB>.gagA<.9UW>.9FgLE5<.KP6ZM<l<3KA{A<.PEB!M<4M<4F>Z96.9M.gR<EA>r4G.PR,G<g5>xKG.ZRPW<rV>ZZB.rR<.K*<lA.4l6>.PAgQ<9A95.4rB,BKG>rL.!AK5.4!6+6EGKB>!L.UAU5.4^6!6!6>{Lrhg5.4+Bl6+6>.9m,5.4,i{6><r5.4<U6><r5.4<KB><x5.4.{R><r.L.+6><ga.P46.xB><PL.!96.ZG><PA.,EB,R><UA<9PMUW><lA<KlR><^A<U><.gA<g><.UA<r><.EF<!><,F<{>.9Q+@<.9>{FUFlA<.+>+5x5ZA<.,^W<.!5!5P5>9UbZB<.rAEV9AP5>9KB,B<.lLPFZA<.,9B.KB>r5KQ<.Z46.gB>lFU5<.U4i.ER>^5^h<4lM.K6>!5rFl5.,^G.96>!FKF^5.{,tl6>+F.45.+.rz>.{5.+.U6Kn9G>.^5.+.KB9G><r5.+,M><,5.+rW><.K5.+ZG><.l5.{PB><.!5.{K6><.+5.{E6><.{5.{96><.,5.{46/45.{/95.{/95.{/95.{/95.{/95.{/95.{/95.{/95.{/95.{/95.{/95.{/95.{/95.{><+.Q.{";