window.logic19 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_set_horizon(40);
  cmd_load_view(33);
  cmd_show_pic();
  if (cmd_equaln(101,1)) {
    cmd_load_view(25);
    cmd_animate_obj(2);
    cmd_set_view(2, 25);
    cmd_set_loop(2, 0);
    cmd_set_cel(2, 0);
    cmd_ignore_objs(2);
    cmd_position(2, 61, 98);
    cmd_assignn(100, 2);
    cmd_cycle_time(2, 100);
    cmd_assignn(100, 150);
    cmd_set_loop(0, 2);
    cmd_ignore_objs(0);
    cmd_position(0, 61, 98);
    jumpTo(1);
break;
  }
  cmd_assignn(100, 0);
  cmd_draw(0);
}
case 1:
if ((cmd_said(13) || cmd_said(13, 129) || cmd_said(13, 14))) {
  cmd_print(1);
}
if ((cmd_said(13, 64) || cmd_said(15, 64) || cmd_said(13, 56))) {
  cmd_print(2);
}
if (cmd_said(13, 128)) {
  cmd_print(3);
}
if (cmd_said(31, 128)) {
  cmd_print(4);
}
if (cmd_said(13, 130)) {
  cmd_print(5);
}
if (cmd_greatern(100,0)) {
  cmd_decrement(100);
  if (cmd_equaln(100,100)) {
    cmd_draw(2);
  }
  if (cmd_equaln(100,60)) {
    cmd_draw(0);
    cmd_erase(2);
  }
  if (cmd_equaln(100,45)) {
    cmd_print(6);
    cmd_print(7);
  }
  if (cmd_equaln(100,30)) {
    cmd_print(8);
    cmd_print(9);
  }
  if (cmd_equaln(100,20)) {
    cmd_print(10);
  }
}
if (cmd_equaln(2,1)) {
  cmd_position(0, 56, 50);
  cmd_new_room(18);
if (AGI.break_all_logics) return;
}
if (cmd_isset(3)) {
  cmd_print(11);
  cmd_stop_motion(0);
  cmd_reposition_to_v(0, 102, 103);
  cmd_start_motion(0);
}
cmd_get_posn(0, 102, 103);
if (cmd_isset(0)) {
  cmd_set_view(0, 33);
  jumpTo(2);
break;
}
cmd_set_view(0, 0);
case 2:
return;

}}}
MESSAGES[19]=[
"",
"You find yourself in an enclosed beach. To the north you can make out the entrance to a large forest.",
"The bushes seem to be composed of small leaves and branches. Nothing really interesting about them.",
"Rocks of different shapes and sizes are scattered about the area.",
"The rocks here are far too heavy for you to carry around.",
"To the south the sea stretches out towards the horizon.",
"Taking a quick look around you suddenly realise that this doesn't look like one day in the past!",
"According to your timer you have succeeded in travelling back in time. But all the way back to the Cretaceous Period!",
"The timer also reveals that the next time window won't be available for another 8 hours.",
"With any luck it should then return you back home. But you have no way of knowing if it will work.",
"Until then you may as well enjoy some of the local scenery.",
"You don't feel like going for a swim just yet."];
CONTROLS[19]="?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4?4>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>E5>.+>K5>.^>P5>.!>P5>.!>P5>.!>P5>.!>U5>.x>ZA>.l>l5>.g>rA>.U>!A>.K>+A>.9>,5>.4>.4A>{>.E5>+>.95>{>.45>,>,5>.4>{5>.9>+5>.E4A>rA>.KEV>9A>.UlF<.Um>.gx5<.Z5>.{!5<.U5>.{!5<.U5>.{!5<.U5>.{x5<.Z59A>.!r5<.gAE5E5>.gl5<.+A9LEF>{g5>UAEV>rUA>.4F+Q<.PKA>.UFx5P5<.K4F>.xLZ5U5<.E><95P5Z5<.E><9AEAZ5<.E><KAl5<.E><{5<.9><,5<.4><.45<,><.95<{><.EQ<r><.gA<g><.l5<g><.l5<g><.l5<g><.l5<g><.l5<g><.r5<Z><.x5<U><.!5<P><.^L<4><.,5<4><.,5<4><.{5<94}><,5<9,V><r5<9.UF><Z5<9.g5><g5<4.l5><g5.,.l5><l5.{.r5><g5.{.r5><l5.+.x5><lF.x.x5><!L.Z.x5><^Js^.x5><x;5!.r5><r.3EAr.r5>^<-PAg.r5>Z<.8lAU.r5>9<.T!5P.r5<.,<.Y+5K.r5<.+<.k+5K.l5<.+<.k+FE.g5<.{<.krLU.UA<.,<.kgAr.9L>9<.kUA!,A>U<.dKF+ZAKL>r<.T9A.4KFEF>+<.T5.E4F>.U<.O5.K>.Z.q.)5.K>.U.YN.{5.E>.K.TH<K5.9>.E.DN<EN5.9>^.YC.,cU5.4>Z.~7.!X+5,>E.]7.ZX.P5{>4<37.4X.x5{>4.;7^S<9Qr>4.-C!C<.PgQK5<.4.%7!C<.ZUAUF9A<{.wCxC<.lEF+A<+.k7rH<.x4A.E5<{.OClC<.+.K5<.4.D7lC<.,.9A<.9.3CgC>9,A<.K]CgC>K^F<.U%Cl7>UrF<.lwCr7>ZZF<.!q7x7>gPA<.+w7r7>lK5<.x;7l7>rE5<.Z.J7l7>x95<.Z.O7g7>!45<.g.O7Z7>^<.g.T7U7>+<.K.k7U7>{<.E.q7U7>{<.9.w7P7>,<,.~7P7>.4<^.-7P7>.9<x.-CP7>.E<l.]7U7>.K<Z.;7U7>.P<U.-HU7>.U<P.~Hg7>.Z<P.w7r7>.g<U.k7r7>.l<U.d7r7>.r4A<P.T7r7>.xEL<9qPY7x7>.xZL.{Y!7x7>.!xA.+J+7r7>.^^5.^8{7r7>.++A<r7l7>.{,5<g7l7>.,.45<Z7l7>.,.9A<K7l7><4.K5<E7g7><9.P5<47g7><E";