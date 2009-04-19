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