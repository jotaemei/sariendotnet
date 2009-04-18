window.logic90 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (!(cmd_isset(2) && cmd_equaln(9,0) && !cmd_isset(4))) {
  jumpTo(500);
  break;
}
  if (!((cmd_said(121, 50, 17, 113) || cmd_said(86, 50, 88, 113) || cmd_said(86, 113, 88, 50) || cmd_said(86, 50, 39, 113)))) {
  jumpTo(501);
  break;
}
    if (!(cmd_has("Timer"))) {
  jumpTo(502);
  break;
}
      cmd_print(1);
      jumpTo(2);
break;
    case 502:
    if (!(cmd_has("Timer(no batteries)"))) {
  jumpTo(503);
  break;
}
      if (!(cmd_has("Batteries"))) {
  jumpTo(504);
  break;
}
        cmd_drop("Batteries");
        cmd_drop("Timer(no batteries)");
        cmd_get("Timer");
        cmd_addn(3, 2);
        cmd_print(2);
        jumpTo(1);
break;
      case 504:
      cmd_print(3);
case 1:
      jumpTo(2);
break;
    case 503:
    cmd_print(4);
  case 501:
case 2:
  if (!(cmd_said(29, 65))) {
  jumpTo(505);
  break;
}
    if (!(cmd_has("Parcel"))) {
  jumpTo(506);
  break;
}
      cmd_print(5);
      cmd_print(6);
      cmd_get("Aliasing card");
      cmd_drop("Parcel");
      jumpTo(3);
break;
    case 506:
    cmd_print(7);
  case 505:
case 3:
  if (!(cmd_said(13, 59))) {
  jumpTo(507);
  break;
}
    if (!(cmd_has("Front door key"))) {
  jumpTo(508);
  break;
}
      cmd_show_obj(200);
      jumpTo(4);
break;
    case 508:
    cmd_print(8);
  case 507:
case 4:
  if (!(cmd_said(13, 98))) {
  jumpTo(509);
  break;
}
    if (!(cmd_has("Kitchen knife"))) {
  jumpTo(510);
  break;
}
      cmd_show_obj(201);
      jumpTo(5);
break;
    case 510:
    cmd_print(8);
  case 509:
case 5:
  if (!(cmd_said(13, 50))) {
  jumpTo(511);
  break;
}
    if (!(cmd_has("Batteries"))) {
  jumpTo(512);
  break;
}
      cmd_show_obj(202);
      jumpTo(6);
break;
    case 512:
    cmd_print(8);
  case 511:
case 6:
  if (!(cmd_said(13, 117))) {
  jumpTo(513);
  break;
}
    if (!(cmd_has("Diagram"))) {
  jumpTo(514);
  break;
}
      cmd_show_obj(207);
      jumpTo(7);
break;
    case 514:
    cmd_print(8);
  case 513:
case 7:
  if (!(cmd_said(13, 70))) {
  jumpTo(515);
  break;
}
    if (!(cmd_has("Toilet paper"))) {
  jumpTo(516);
  break;
}
      cmd_show_obj(203);
      jumpTo(8);
break;
    case 516:
    if (!(cmd_has("Diagram"))) {
  jumpTo(517);
  break;
}
      cmd_show_obj(207);
      jumpTo(8);
break;
    case 517:
    cmd_print(8);
  case 515:
case 8:
  if (!(cmd_said(13, 56))) {
  jumpTo(518);
  break;
}
    if (!(cmd_has("Flower"))) {
  jumpTo(519);
  break;
}
      cmd_show_obj(204);
      jumpTo(9);
break;
    case 519:
    cmd_print(8);
  case 518:
case 9:
  if (!(cmd_said(13, 65))) {
  jumpTo(520);
  break;
}
    if (!(cmd_has("Parcel"))) {
  jumpTo(521);
  break;
}
      cmd_show_obj(205);
      jumpTo(10);
break;
    case 521:
    cmd_print(8);
  case 520:
case 10:
  if (!(cmd_said(13, 122))) {
  jumpTo(522);
  break;
}
    if (!(cmd_has("Aliasing card"))) {
  jumpTo(523);
  break;
}
      cmd_show_obj(208);
      jumpTo(11);
break;
    case 523:
    cmd_print(8);
  case 522:
case 11:
  if (!(cmd_said(13, 128))) {
  jumpTo(524);
  break;
}
    if (!(cmd_has("Rock"))) {
  jumpTo(525);
  break;
}
      cmd_show_obj(211);
      jumpTo(12);
break;
    case 525:
    cmd_print(8);
  case 524:
case 12:
  if (!(cmd_said(13, 113))) {
  jumpTo(526);
  break;
}
    if (!(cmd_has("Timer"))) {
  jumpTo(527);
  break;
}
      cmd_show_obj(210);
      jumpTo(13);
break;
    case 527:
    if (!(cmd_has("Timer(no batteries)"))) {
  jumpTo(528);
  break;
}
      cmd_show_obj(209);
      jumpTo(13);
break;
    case 528:
    cmd_print(8);
  case 526:
case 13:
  if (!((cmd_said(13, 33) || cmd_said(13, 33, 33)))) {
  jumpTo(529);
  break;
}
    cmd_print(9);
  case 529:
  if (!((cmd_said(31, 33) || cmd_said(31, 33, 33)))) {
  jumpTo(530);
  break;
}
    cmd_print(10);
  case 530:
  if (!((cmd_said(86, 33) || cmd_said(86, 33, 33)))) {
  jumpTo(531);
  break;
}
    cmd_print(11);
  case 531:
case 500:
return;

}}}
MESSAGES[90]=[
"",
"You already have.",
"Done.",
"But you don't have any batteries.",
"But you don't have the timer yet.",
"Inside the envelope you find an electronic card that you ordered.",
"With this you'll finally be able to complete your time machine!",
"But you don't have a parcel.",
"You don't have it.",
"You see nothing specific.",
"You can't get that.",
"What do you want me to do with it?"];