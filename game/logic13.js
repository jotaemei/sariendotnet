window.logic13 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_status_line_off();
  cmd_prevent_input();
  cmd_erase(0);
  cmd_show_pic();
  cmd_assignn(100,0);
}
if (!(cmd_lessn(100,35))) {
  jumpTo(500);
  break;
}
  cmd_increment(100);
  if (!(cmd_equaln(100,5))) {
  jumpTo(501);
  break;
}
    cmd_set_text_attribute(15,0);
    cmd_display(4,6,"Time Machine initialising...");
  case 501:
  if (!(cmd_equaln(100,10))) {
  jumpTo(502);
  break;
}
    cmd_set_text_attribute(2,0);
    cmd_display(6,6,"Time window coords set.");
  case 502:
  if (!(cmd_equaln(100,12))) {
  jumpTo(503);
  break;
}
    cmd_set_text_attribute(1,0);
    cmd_display(7,6,"(F4,HH,88x0)-(D0,JJ,01x1)");
  case 503:
  if (!(cmd_equaln(100,15))) {
  jumpTo(504);
  break;
}
    cmd_set_text_attribute(2,0);
    cmd_display(9,6,"Timer .......");
  case 504:
  if (!(cmd_equaln(100,17))) {
  jumpTo(505);
  break;
}
    if (!(cmd_has("timer"))) {
  jumpTo(506);
  break;
}
      cmd_set_text_attribute(10,0);
      cmd_display(9,20,"Found");
      jumpTo(1);
break;
    case 506:
    cmd_set_text_attribute(4,0);
    cmd_display(9,20,"Not found");
  case 505:
case 1:
  if (!(cmd_equaln(100,20))) {
  jumpTo(507);
  break;
}
    cmd_set_text_attribute(2,0);
    cmd_display(10,6,"T_A. card ...");
  case 507:
  if (!(cmd_equaln(100,22))) {
  jumpTo(508);
  break;
}
    if (!(cmd_isset(211))) {
  jumpTo(509);
  break;
}
      cmd_set_text_attribute(10,0);
      cmd_display(10,20,"Found");
      jumpTo(2);
break;
    case 509:
    cmd_set_text_attribute(4,0);
    cmd_display(10,20,"Not found");
  case 508:
case 2:
  if (!(cmd_equaln(100,25))) {
  jumpTo(510);
  break;
}
    cmd_set_text_attribute(2,0);
    cmd_display(12,6,"Configuration");
  case 510:
  if (!(cmd_equaln(100,27))) {
  jumpTo(511);
  break;
}
    if (!(cmd_isset(213))) {
  jumpTo(512);
  break;
}
      cmd_set_text_attribute(10,0);
      cmd_display(12,20,"Accepted!");
      jumpTo(3);
break;
    case 512:
    cmd_set_text_attribute(4,0);
    cmd_display(12,20,"Invalid");
  case 511:
case 3:
  if (!(cmd_equaln(100,30))) {
  jumpTo(513);
  break;
}
    if (!(cmd_has("timer") && cmd_isset(213) && cmd_isset(211))) {
  jumpTo(514);
  break;
}
      cmd_set_text_attribute(15,0);
      cmd_display(15,10,"   Machine Ready");
      cmd_display(16,10,"Sequence Initiated!");
      cmd_addn(3,4);
      cmd_assignn(101,1);
      jumpTo(4);
break;
    case 514:
    cmd_assignn(101,0);
  case 513:
case 500:
case 4:
if (cmd_have_key() && cmd_equaln(100,35)) {
  if (cmd_equaln(101,1)) {
    cmd_print(13);
  }
  cmd_accept_input();
  cmd_position(0,43,117);
  cmd_status_line_on();
  cmd_set_text_attribute(15,0);
  cmd_new_room(15);
if (AGI.break_all_logics) return;
}
return;

}}}
MESSAGES[13]=[
"",
"Time Machine initialising...",
"Time window coords set.",
"(F4,HH,88x0)-(D0,JJ,01x1)",
"Timer .......",
"Found",
"Not found",
"T_A. card ...",
"Configuration",
"Accepted!",
"Invalid",
"   Machine Ready",
"Sequence Initiated!",
"You make sure that the time machine is set to take you one day into the past."];