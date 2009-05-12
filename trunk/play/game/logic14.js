window.logic14 = function()
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
  cmd_show_pic();
  cmd_prevent_input();
  cmd_assignn(101, 0);
  cmd_assignn(100, 30);
}
if (cmd_equaln(100,0)) {
  cmd_increment(101);
  if (cmd_equaln(101,1)) {
    cmd_print_at("This was your wife, Amy.", 2, 23, 16);
  }
  if (cmd_equaln(101,2)) {
    cmd_print_at("Four months ago her car was found wrecked and burnt out at the base of a cliff.", 2, 23, 16);
  }
  if (cmd_equaln(101,3)) {
    cmd_print_at("Her body was never found. But no one could have survived that fall.", 2, 23, 16);
  }
  if (cmd_equaln(101,4)) {
    cmd_print_at("Your life has been very difficult since the accident.", 2, 23, 16);
  }
  if (cmd_equaln(101,5)) {
    cmd_print_at("But somehow you manage to keep on going.", 2, 23, 16);
  }
  if (cmd_equaln(101,6)) {
    cmd_accept_input();
    cmd_status_line_on();
    cmd_new_room(4);
if (AGI.break_all_logics) return;
  }
  cmd_assignn(100, 30);
}
cmd_decrement(100);
return;

}}}
MESSAGES[14]=[
"",
"This was your wife, Amy.",
"Four months ago her car was found wrecked and burnt out at the base of a cliff.",
"Her body was never found. But no one could have survived that fall.",
"Your life has been very difficult since the accident.",
"But somehow you manage to keep on going."];
CONTROLS[14]="";