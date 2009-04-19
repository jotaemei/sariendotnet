window.logic91 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_trace_info(95, 3, 10);
  cmd_set_key(0, 59, c2);
  cmd_set_key(0, 60, c16);
  cmd_set_key(19, 0, c16);
  cmd_set_key(0, 61, c9);
  cmd_set_key(5, 0, c9);
  cmd_set_key(0, 62, c4);
  cmd_set_key(0, 63, c3);
  cmd_set_key(0, 65, c5);
  cmd_set_key(0, 67, c7);
  cmd_set_key(9, 0, c10);
  cmd_set_key(0, 32, c14);
  cmd_set_key(10, 0, c15);
  cmd_set_key(3, 0, c17);
  cmd_set_key(0, 44, c1);
  cmd_set_key(45, 0, c26);
  cmd_set_key(43, 0, c27);
  cmd_set_key(27, 0, c19);
  cmd_set(8);
  cmd_assignn(15, 3);
  cmd_assignn(23, 15);
  cmd_configure_screen(1, 22, 0);
  cmd_set_string(s0, ">");
  cmd_set_cursor_char("_");
  cmd_assignn(7, 250);
  cmd_assignn(10, 2);
}
return;

}}}
MESSAGES[91]=[
"",
">",
"_"];