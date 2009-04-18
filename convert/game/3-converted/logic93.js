window.logic93 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
cmd_prevent_input();
cmd_status_line_off();
cmd_text_screen();
cmd_assignn(19,0);
cmd_reset(4);
cmd_display(1,1,"           DEBUG MODE HELP             ");
cmd_display(3,0,"trace on    - enables tracing          ");
cmd_display(4,0,"              (SCROLL LOCK to activate)");
cmd_display(5,0,"show mem    - display memory stats     ");
cmd_display(6,0,"tp          - teleport                 ");
cmd_display(7,0,"pos         - change ego's position    ");
cmd_display(8,0,"show var    - display value of a var   ");
cmd_display(9,0,"set var     - change value of a var    ");
cmd_display(10,0,"show flag   - display status of a flag ");
cmd_display(11,0,"set flag    - set a flag               ");
cmd_display(12,0,"reset flag  - reset (clear) a flag     ");
cmd_display(13,0,"object      - display information about");
cmd_display(14,0,"              a screen object          ");
cmd_display(15,0,"show pri    - display priority screen  ");
cmd_display(16,0,"get object  - get any inventory object ");
cmd_display(17,0,"gimme gimme - get all inventory objects");
cmd_display(18,0,"object room - display room number of   ");
cmd_display(19,0,"              an inventory object      ");
cmd_display(20,0,"set pri     - set ego's priority       ");
cmd_display(21,0,"release pri - release ego's priority   ");
cmd_display(22,0,"coords      - ego's coordinates on/off ");
case 1:
if (!cmd_have_key()) {
  jumpTo(1);
break;
}
cmd_accept_input();
cmd_status_line_on();
cmd_graphics();
cmd_set(4);
return;

}}}
MESSAGES[93]=[
"",
"           DEBUG MODE HELP             ",
"trace on    - enables tracing          ",
"              (SCROLL LOCK to activate)",
"show mem    - display memory stats     ",
"tp          - teleport                 ",
"pos         - change ego's position    ",
"show var    - display value of a var   ",
"set var     - change value of a var    ",
"show flag   - display status of a flag ",
"set flag    - set a flag               ",
"reset flag  - reset (clear) a flag     ",
"object      - display information about",
"              a screen object          ",
"show pri    - display priority screen  ",
"get object  - get any inventory object ",
"gimme gimme - get all inventory objects",
"object room - display room number of   ",
"              an inventory object      ",
"set pri     - set ego's priority       ",
"release pri - release ego's priority   ",
"coords      - ego's coordinates on/off "];