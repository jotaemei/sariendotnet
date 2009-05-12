window.logic5 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_load_view(2);
  cmd_set_horizon(50);
  if ((cmd_equaln(1,16) || cmd_equaln(1,0))) {
    cmd_position(0, 39, 106);
    cmd_assignn(16, 2);
    cmd_set_view_v(0, 16);
  }
  cmd_assignn(200, 20);
  cmd_set_loop(0, 3);
  cmd_stop_motion(0);
  cmd_draw(0);
  cmd_show_pic();
  cmd_print(1);
}
if ((cmd_said(13) || cmd_said(13, 33))) {
  cmd_print(2);
}
if ((cmd_said(29, 46) || cmd_said(54, 46) || cmd_said(44, 46))) {
  if (cmd_posn(0,58,94,76,104)) {
    cmd_print(3);
    cmd_addn(3, 1);
    cmd_status_line_on();
    cmd_new_room(4);
if (AGI.break_all_logics) return;
    jumpTo(1);
break;
  }
  cmd_print(4);
}
case 1:
if (cmd_said(30, 46)) {
  cmd_print(5);
}
if (cmd_greatern(200,0)) {
  cmd_decrement(200);
  if (cmd_equaln(200,0)) {
    cmd_print(6);
    cmd_print(7);
    cmd_accept_input();
    cmd_set_loop(0, 0);
    cmd_set_cel(0, 0);
    cmd_start_motion(0);
  }
}
return;

}}}
MESSAGES[5]=[
"",
"Suddenly, you wake up.",
"All you can see is the morning light pouring through a small opening in the curtains.",
"You open the curtains.",
"You'll need to get closer.",
"They already are!",
"What a bizarre dream!",
"Trying to shrug it off, you decide to get out of bed."];
CONTROLS[5]="?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4<gyl.s>^<g5r5l5.l5>^<g5rs.l*>4<Z5<.l5>4<Z5<.r5<.,<Z5<.r.s<Z<Z5>.K5<U<U5>.P5<U<U5>.U5<P<U5>.U5<P<U5>.Z5<K<P5>.l5<E<P.m>45<E<.^5>95<9<.^5>E5<4<.^5>E5<4<.!5>P5.,<.!5>P5.,<.!5>U5.{<.!5>Z5.+<.!5>Z5.+<.!5>g5.^<.x5>l5.^<.x5>r5.!<.x5>x5.x<.x5>x5.x<.x5>!5.r<.x5>!5.r<.r5>+5.l<.r5>{5.g<.r5>{5.g.g<F>,5.Z.g5><.E5.U.Z5><.K5.U.Z5><.P5.P.Z5><.P5.P.Z5><.U5.K.U5><.g5.E.U5><.g5.E.U5><.l5.9.U5><.l5.9.P5><.x5.4^m><.!5,!5/P5,!5/U5{x5/Z5{x5/g5+r5/r5^r5/r5^l5/!5!l5/^5xg5/+5xg5/{5rZ5/,5rZ5/.45lU5/.E5gU5/.E5gP5/.P5ZP5/.P5ZK/.hU?4?4?4?4?4?4?4?4?4?4?4?4";