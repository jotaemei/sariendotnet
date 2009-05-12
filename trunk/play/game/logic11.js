window.logic11 = function()
{
  while(1) {
    switch (jumptoLine)
  {
    case 0:
if (cmd_isset(5)) {
  cmd_assignv(121, 10);
  cmd_assignn(10, 0);
  cmd_get_posn(0, 122, 123);
  cmd_set_key(0, 64, c12);
  cmd_enable_item(c12);
  cmd_load_pic(0);
  cmd_draw_pic(0);
  cmd_discard_pic(0);
  cmd_set_horizon(10);
  cmd_ignore_objs(0);
  cmd_set_priority(0, 4);
  cmd_position(0, 80, 100);
  cmd_draw(0);
  cmd_show_pic();
  cmd_status_line_on();
  cmd_load_view(24);
  cmd_assignn(101, 1);
  cmd_assignn(102, 2);
  cmd_assignn(103, 3);
  cmd_assignn(104, 4);
  cmd_assignn(105, 5);
  cmd_assignn(106, 6);
  cmd_assignn(107, 7);
  cmd_assignn(108, 8);
  cmd_assignn(109, 9);
  cmd_assignn(110, 10);
  cmd_assignn(111, 11);
  cmd_assignn(112, 12);
  cmd_assignn(113, 13);
  cmd_assignn(114, 14);
  cmd_assignn(115, 15);
  cmd_assignn(116, 0);
  cmd_assignn(120, 4);
  cmd_animate_obj(1);
  cmd_ignore_objs(1);
  cmd_set_view(1, 24);
  cmd_set_loop(1, 0);
  cmd_set_cel(1, 0);
  cmd_position(1, 34, 50);
  cmd_draw(1);
  cmd_stop_cycling(1);
  cmd_animate_obj(2);
  cmd_ignore_objs(2);
  cmd_set_view(2, 24);
  cmd_set_loop(2, 0);
  cmd_set_cel(2, 1);
  cmd_position(2, 54, 50);
  cmd_draw(2);
  cmd_stop_cycling(2);
  cmd_animate_obj(3);
  cmd_ignore_objs(3);
  cmd_set_view(3, 24);
  cmd_set_loop(3, 0);
  cmd_set_cel(3, 2);
  cmd_position(3, 74, 50);
  cmd_draw(3);
  cmd_stop_cycling(3);
  cmd_animate_obj(4);
  cmd_ignore_objs(4);
  cmd_set_view(4, 24);
  cmd_set_loop(4, 0);
  cmd_set_cel(4, 3);
  cmd_position(4, 94, 50);
  cmd_draw(4);
  cmd_stop_cycling(4);
  cmd_animate_obj(5);
  cmd_ignore_objs(5);
  cmd_set_view(5, 24);
  cmd_set_loop(5, 0);
  cmd_set_cel(5, 4);
  cmd_position(5, 34, 81);
  cmd_draw(5);
  cmd_stop_cycling(5);
  cmd_animate_obj(6);
  cmd_ignore_objs(6);
  cmd_set_view(6, 24);
  cmd_set_loop(6, 0);
  cmd_set_cel(6, 5);
  cmd_position(6, 54, 81);
  cmd_draw(6);
  cmd_stop_cycling(6);
  cmd_animate_obj(7);
  cmd_ignore_objs(7);
  cmd_set_view(7, 24);
  cmd_set_loop(7, 0);
  cmd_set_cel(7, 6);
  cmd_position(7, 74, 81);
  cmd_draw(7);
  cmd_stop_cycling(7);
  cmd_animate_obj(8);
  cmd_ignore_objs(8);
  cmd_set_view(8, 24);
  cmd_set_loop(8, 0);
  cmd_set_cel(8, 7);
  cmd_position(8, 94, 81);
  cmd_draw(8);
  cmd_stop_cycling(8);
  cmd_animate_obj(9);
  cmd_ignore_objs(9);
  cmd_set_view(9, 24);
  cmd_set_loop(9, 0);
  cmd_set_cel(9, 8);
  cmd_position(9, 34, 112);
  cmd_draw(9);
  cmd_stop_cycling(9);
  cmd_animate_obj(10);
  cmd_ignore_objs(10);
  cmd_set_view(10, 24);
  cmd_set_loop(10, 0);
  cmd_set_cel(10, 9);
  cmd_position(10, 54, 112);
  cmd_draw(10);
  cmd_stop_cycling(10);
  cmd_animate_obj(11);
  cmd_ignore_objs(11);
  cmd_set_view(11, 24);
  cmd_set_loop(11, 0);
  cmd_set_cel(11, 10);
  cmd_position(11, 74, 112);
  cmd_draw(11);
  cmd_stop_cycling(11);
  cmd_animate_obj(12);
  cmd_ignore_objs(12);
  cmd_set_view(12, 24);
  cmd_set_loop(12, 0);
  cmd_set_cel(12, 11);
  cmd_position(12, 94, 112);
  cmd_draw(12);
  cmd_stop_cycling(12);
  cmd_animate_obj(13);
  cmd_ignore_objs(13);
  cmd_set_view(13, 24);
  cmd_set_loop(13, 0);
  cmd_set_cel(13, 12);
  cmd_position(13, 34, 143);
  cmd_draw(13);
  cmd_stop_cycling(13);
  cmd_animate_obj(14);
  cmd_ignore_objs(14);
  cmd_set_view(14, 24);
  cmd_set_loop(14, 0);
  cmd_set_cel(14, 13);
  cmd_position(14, 54, 143);
  cmd_draw(14);
  cmd_stop_cycling(14);
  cmd_animate_obj(15);
  cmd_ignore_objs(15);
  cmd_set_view(15, 24);
  cmd_set_loop(15, 0);
  cmd_set_cel(15, 14);
  cmd_position(15, 74, 143);
  cmd_draw(15);
  cmd_stop_cycling(15);
  cmd_stop_update(1);
  cmd_stop_update(2);
  cmd_stop_update(3);
  cmd_stop_update(4);
  cmd_stop_update(5);
  cmd_stop_update(6);
  cmd_stop_update(7);
  cmd_stop_update(8);
  cmd_stop_update(9);
  cmd_stop_update(10);
  cmd_stop_update(11);
  cmd_stop_update(12);
  cmd_stop_update(13);
  cmd_stop_update(14);
  cmd_stop_update(15);
  cmd_set_priority(0, 4);
  cmd_set_priority(1, 10);
  cmd_set_priority(2, 10);
  cmd_set_priority(3, 10);
  cmd_set_priority(4, 10);
  cmd_set_priority(5, 10);
  cmd_set_priority(6, 10);
  cmd_set_priority(7, 10);
  cmd_set_priority(8, 10);
  cmd_set_priority(9, 10);
  cmd_set_priority(10, 10);
  cmd_set_priority(11, 10);
  cmd_set_priority(12, 10);
  cmd_set_priority(13, 10);
  cmd_set_priority(14, 10);
  cmd_set_priority(15, 10);
  cmd_assignn(100, 0);
  if (cmd_has("Diagram")) {
    cmd_load_view(207);
    cmd_add_to_pic(207, 0, 0, 10, 10, 6, 0);
  }
  cmd_prevent_input();
  cmd_display(23, 11, "Press F6 to quit");
}
if (!(cmd_equaln(100,0))) {
  jumpTo(500);
  break;
}
  if (!(cmd_posn(0,78,90,79,110))) {
  jumpTo(501);
  break;
}
    cmd_assignn(120, 1);
    cmd_assignn(117, 100);
    if (!(cmd_equaln(103,0))) {
  jumpTo(502);
  break;
}
      cmd_assignv(103, 104);
      cmd_assignn(104, 0);
      cmd_assignv(117, 103);
    case 502:
    if (!(cmd_equaln(102,0))) {
  jumpTo(503);
  break;
}
      cmd_assignv(102, 103);
      cmd_assignn(103, 0);
      cmd_assignv(117, 102);
    case 503:
    if (!(cmd_equaln(101,0))) {
  jumpTo(504);
  break;
}
      cmd_assignv(101, 102);
      cmd_assignn(102, 0);
      cmd_assignv(117, 101);
    case 504:
    if (!(cmd_equaln(107,0))) {
  jumpTo(505);
  break;
}
      cmd_assignv(107, 108);
      cmd_assignn(108, 0);
      cmd_assignv(117, 107);
    case 505:
    if (!(cmd_equaln(106,0))) {
  jumpTo(506);
  break;
}
      cmd_assignv(106, 107);
      cmd_assignn(107, 0);
      cmd_assignv(117, 106);
    case 506:
    if (!(cmd_equaln(105,0))) {
  jumpTo(507);
  break;
}
      cmd_assignv(105, 106);
      cmd_assignn(106, 0);
      cmd_assignv(117, 105);
    case 507:
    if (!(cmd_equaln(111,0))) {
  jumpTo(508);
  break;
}
      cmd_assignv(111, 112);
      cmd_assignn(112, 0);
      cmd_assignv(117, 111);
    case 508:
    if (!(cmd_equaln(110,0))) {
  jumpTo(509);
  break;
}
      cmd_assignv(110, 111);
      cmd_assignn(111, 0);
      cmd_assignv(117, 110);
    case 509:
    if (!(cmd_equaln(109,0))) {
  jumpTo(510);
  break;
}
      cmd_assignv(109, 110);
      cmd_assignn(110, 0);
      cmd_assignv(117, 109);
    case 510:
    if (!(cmd_equaln(115,0))) {
  jumpTo(511);
  break;
}
      cmd_assignv(115, 116);
      cmd_assignn(116, 0);
      cmd_assignv(117, 115);
    case 511:
    if (!(cmd_equaln(114,0))) {
  jumpTo(512);
  break;
}
      cmd_assignv(114, 115);
      cmd_assignn(115, 0);
      cmd_assignv(117, 114);
    case 512:
    if (!(cmd_equaln(113,0))) {
  jumpTo(513);
  break;
}
      cmd_assignv(113, 114);
      cmd_assignn(114, 0);
      cmd_assignv(117, 113);
    case 513:
    jumpTo(1);
break;
  case 501:
  if (!(cmd_posn(0,81,90,83,110))) {
  jumpTo(514);
  break;
}
    cmd_assignn(120, 2);
    cmd_assignn(117, 100);
    if (!(cmd_equaln(102,0))) {
  jumpTo(515);
  break;
}
      cmd_assignv(102, 101);
      cmd_assignn(101, 0);
      cmd_assignv(117, 102);
    case 515:
    if (!(cmd_equaln(103,0))) {
  jumpTo(516);
  break;
}
      cmd_assignv(103, 102);
      cmd_assignn(102, 0);
      cmd_assignv(117, 103);
    case 516:
    if (!(cmd_equaln(104,0))) {
  jumpTo(517);
  break;
}
      cmd_assignv(104, 103);
      cmd_assignn(103, 0);
      cmd_assignv(117, 104);
    case 517:
    if (!(cmd_equaln(106,0))) {
  jumpTo(518);
  break;
}
      cmd_assignv(106, 105);
      cmd_assignn(105, 0);
      cmd_assignv(117, 106);
    case 518:
    if (!(cmd_equaln(107,0))) {
  jumpTo(519);
  break;
}
      cmd_assignv(107, 106);
      cmd_assignn(106, 0);
      cmd_assignv(117, 107);
    case 519:
    if (!(cmd_equaln(108,0))) {
  jumpTo(520);
  break;
}
      cmd_assignv(108, 107);
      cmd_assignn(107, 0);
      cmd_assignv(117, 108);
    case 520:
    if (!(cmd_equaln(110,0))) {
  jumpTo(521);
  break;
}
      cmd_assignv(110, 109);
      cmd_assignn(109, 0);
      cmd_assignv(117, 110);
    case 521:
    if (!(cmd_equaln(111,0))) {
  jumpTo(522);
  break;
}
      cmd_assignv(111, 110);
      cmd_assignn(110, 0);
      cmd_assignv(117, 111);
    case 522:
    if (!(cmd_equaln(112,0))) {
  jumpTo(523);
  break;
}
      cmd_assignv(112, 111);
      cmd_assignn(111, 0);
      cmd_assignv(117, 112);
    case 523:
    if (!(cmd_equaln(114,0))) {
  jumpTo(524);
  break;
}
      cmd_assignv(114, 113);
      cmd_assignn(113, 0);
      cmd_assignv(117, 114);
    case 524:
    if (!(cmd_equaln(115,0))) {
  jumpTo(525);
  break;
}
      cmd_assignv(115, 114);
      cmd_assignn(114, 0);
      cmd_assignv(117, 115);
    case 525:
    if (!(cmd_equaln(116,0))) {
  jumpTo(526);
  break;
}
      cmd_assignv(116, 115);
      cmd_assignn(115, 0);
      cmd_assignv(117, 116);
    case 526:
    jumpTo(1);
break;
  case 514:
  if (!(cmd_posn(0,79,90,83,99))) {
  jumpTo(527);
  break;
}
    cmd_assignn(120, 3);
    cmd_assignn(117, 100);
    if (!(cmd_equaln(109,0))) {
  jumpTo(528);
  break;
}
      cmd_assignv(109, 113);
      cmd_assignn(113, 0);
      cmd_assignv(117, 109);
    case 528:
    if (!(cmd_equaln(105,0))) {
  jumpTo(529);
  break;
}
      cmd_assignv(105, 109);
      cmd_assignn(109, 0);
      cmd_assignv(117, 105);
    case 529:
    if (!(cmd_equaln(101,0))) {
  jumpTo(530);
  break;
}
      cmd_assignv(101, 105);
      cmd_assignn(105, 0);
      cmd_assignv(117, 101);
    case 530:
    if (!(cmd_equaln(110,0))) {
  jumpTo(531);
  break;
}
      cmd_assignv(110, 114);
      cmd_assignn(114, 0);
      cmd_assignv(117, 110);
    case 531:
    if (!(cmd_equaln(106,0))) {
  jumpTo(532);
  break;
}
      cmd_assignv(106, 110);
      cmd_assignn(110, 0);
      cmd_assignv(117, 106);
    case 532:
    if (!(cmd_equaln(102,0))) {
  jumpTo(533);
  break;
}
      cmd_assignv(102, 106);
      cmd_assignn(106, 0);
      cmd_assignv(117, 102);
    case 533:
    if (!(cmd_equaln(111,0))) {
  jumpTo(534);
  break;
}
      cmd_assignv(111, 115);
      cmd_assignn(115, 0);
      cmd_assignv(117, 111);
    case 534:
    if (!(cmd_equaln(107,0))) {
  jumpTo(535);
  break;
}
      cmd_assignv(107, 111);
      cmd_assignn(111, 0);
      cmd_assignv(117, 107);
    case 535:
    if (!(cmd_equaln(103,0))) {
  jumpTo(536);
  break;
}
      cmd_assignv(103, 107);
      cmd_assignn(107, 0);
      cmd_assignv(117, 103);
    case 536:
    if (!(cmd_equaln(112,0))) {
  jumpTo(537);
  break;
}
      cmd_assignv(112, 116);
      cmd_assignn(116, 0);
      cmd_assignv(117, 112);
    case 537:
    if (!(cmd_equaln(108,0))) {
  jumpTo(538);
  break;
}
      cmd_assignv(108, 112);
      cmd_assignn(112, 0);
      cmd_assignv(117, 108);
    case 538:
    if (!(cmd_equaln(104,0))) {
  jumpTo(539);
  break;
}
      cmd_assignv(104, 108);
      cmd_assignn(108, 0);
      cmd_assignv(117, 104);
    case 539:
    jumpTo(1);
break;
  case 527:
  if (!(cmd_posn(0,79,101,83,110))) {
  jumpTo(540);
  break;
}
    cmd_assignn(120, 4);
    cmd_assignn(117, 100);
    if (!(cmd_equaln(105,0))) {
  jumpTo(541);
  break;
}
      cmd_assignv(105, 101);
      cmd_assignn(101, 0);
      cmd_assignv(117, 105);
    case 541:
    if (!(cmd_equaln(109,0))) {
  jumpTo(542);
  break;
}
      cmd_assignv(109, 105);
      cmd_assignn(105, 0);
      cmd_assignv(117, 109);
    case 542:
    if (!(cmd_equaln(113,0))) {
  jumpTo(543);
  break;
}
      cmd_assignv(113, 109);
      cmd_assignn(109, 0);
      cmd_assignv(117, 113);
    case 543:
    if (!(cmd_equaln(106,0))) {
  jumpTo(544);
  break;
}
      cmd_assignv(106, 102);
      cmd_assignn(102, 0);
      cmd_assignv(117, 106);
    case 544:
    if (!(cmd_equaln(110,0))) {
  jumpTo(545);
  break;
}
      cmd_assignv(110, 106);
      cmd_assignn(106, 0);
      cmd_assignv(117, 110);
    case 545:
    if (!(cmd_equaln(114,0))) {
  jumpTo(546);
  break;
}
      cmd_assignv(114, 110);
      cmd_assignn(110, 0);
      cmd_assignv(117, 114);
    case 546:
    if (!(cmd_equaln(107,0))) {
  jumpTo(547);
  break;
}
      cmd_assignv(107, 103);
      cmd_assignn(103, 0);
      cmd_assignv(117, 107);
    case 547:
    if (!(cmd_equaln(111,0))) {
  jumpTo(548);
  break;
}
      cmd_assignv(111, 107);
      cmd_assignn(107, 0);
      cmd_assignv(117, 111);
    case 548:
    if (!(cmd_equaln(115,0))) {
  jumpTo(549);
  break;
}
      cmd_assignv(115, 111);
      cmd_assignn(111, 0);
      cmd_assignv(117, 115);
    case 549:
    if (!(cmd_equaln(108,0))) {
  jumpTo(550);
  break;
}
      cmd_assignv(108, 104);
      cmd_assignn(104, 0);
      cmd_assignv(117, 108);
    case 550:
    if (!(cmd_equaln(112,0))) {
  jumpTo(551);
  break;
}
      cmd_assignv(112, 108);
      cmd_assignn(108, 0);
      cmd_assignv(117, 112);
    case 551:
    if (!(cmd_equaln(116,0))) {
  jumpTo(552);
  break;
}
      cmd_assignv(116, 112);
      cmd_assignn(112, 0);
      cmd_assignv(117, 116);
    case 552:
    jumpTo(1);
break;
  case 540:
  jumpTo(2);
break;
case 1:
  cmd_stop_motion(0);
  cmd_reposition_to(0, 80, 100);
  if (!(cmd_equaln(117,100))) {
  jumpTo(553);
  break;
}
    cmd_start_motion(0);
    cmd_assignn(100, 0);
    jumpTo(2);
break;
  case 553:
  if (!(cmd_equaln(117,1))) {
  jumpTo(554);
  break;
}
    cmd_get_posn(1, 118, 119);
  case 554:
  if (!(cmd_equaln(117,2))) {
  jumpTo(555);
  break;
}
    cmd_get_posn(2, 118, 119);
  case 555:
  if (!(cmd_equaln(117,3))) {
  jumpTo(556);
  break;
}
    cmd_get_posn(3, 118, 119);
  case 556:
  if (!(cmd_equaln(117,4))) {
  jumpTo(557);
  break;
}
    cmd_get_posn(4, 118, 119);
  case 557:
  if (!(cmd_equaln(117,5))) {
  jumpTo(558);
  break;
}
    cmd_get_posn(5, 118, 119);
  case 558:
  if (!(cmd_equaln(117,6))) {
  jumpTo(559);
  break;
}
    cmd_get_posn(6, 118, 119);
  case 559:
  if (!(cmd_equaln(117,7))) {
  jumpTo(560);
  break;
}
    cmd_get_posn(7, 118, 119);
  case 560:
  if (!(cmd_equaln(117,8))) {
  jumpTo(561);
  break;
}
    cmd_get_posn(8, 118, 119);
  case 561:
  if (!(cmd_equaln(117,9))) {
  jumpTo(562);
  break;
}
    cmd_get_posn(9, 118, 119);
  case 562:
  if (!(cmd_equaln(117,10))) {
  jumpTo(563);
  break;
}
    cmd_get_posn(10, 118, 119);
  case 563:
  if (!(cmd_equaln(117,11))) {
  jumpTo(564);
  break;
}
    cmd_get_posn(11, 118, 119);
  case 564:
  if (!(cmd_equaln(117,12))) {
  jumpTo(565);
  break;
}
    cmd_get_posn(12, 118, 119);
  case 565:
  if (!(cmd_equaln(117,13))) {
  jumpTo(566);
  break;
}
    cmd_get_posn(13, 118, 119);
  case 566:
  if (!(cmd_equaln(117,14))) {
  jumpTo(567);
  break;
}
    cmd_get_posn(14, 118, 119);
  case 567:
  if (!(cmd_equaln(117,15))) {
  jumpTo(568);
  break;
}
    cmd_get_posn(15, 118, 119);
  case 568:
  if (!(cmd_equaln(120,3))) {
  jumpTo(569);
  break;
}
    cmd_subn(119, 31);
  case 569:
  if (!(cmd_equaln(120,4))) {
  jumpTo(570);
  break;
}
    cmd_addn(119, 31);
  case 570:
  if (!(cmd_equaln(120,1))) {
  jumpTo(571);
  break;
}
    cmd_subn(118, 20);
  case 571:
  if (!(cmd_equaln(120,2))) {
  jumpTo(572);
  break;
}
    cmd_addn(118, 20);
  case 572:
  if (!(cmd_equaln(117,1))) {
  jumpTo(573);
  break;
}
    cmd_start_update(1);
    cmd_move_obj_v(1, 118, 119, 5, 100);
  case 573:
  if (!(cmd_equaln(117,2))) {
  jumpTo(574);
  break;
}
    cmd_start_update(2);
    cmd_move_obj_v(2, 118, 119, 5, 100);
  case 574:
  if (!(cmd_equaln(117,3))) {
  jumpTo(575);
  break;
}
    cmd_start_update(3);
    cmd_move_obj_v(3, 118, 119, 5, 100);
  case 575:
  if (!(cmd_equaln(117,4))) {
  jumpTo(576);
  break;
}
    cmd_start_update(4);
    cmd_move_obj_v(4, 118, 119, 5, 100);
  case 576:
  if (!(cmd_equaln(117,5))) {
  jumpTo(577);
  break;
}
    cmd_start_update(5);
    cmd_move_obj_v(5, 118, 119, 5, 100);
  case 577:
  if (!(cmd_equaln(117,6))) {
  jumpTo(578);
  break;
}
    cmd_start_update(6);
    cmd_move_obj_v(6, 118, 119, 5, 100);
  case 578:
  if (!(cmd_equaln(117,7))) {
  jumpTo(579);
  break;
}
    cmd_start_update(7);
    cmd_move_obj_v(7, 118, 119, 5, 100);
  case 579:
  if (!(cmd_equaln(117,8))) {
  jumpTo(580);
  break;
}
    cmd_start_update(8);
    cmd_move_obj_v(8, 118, 119, 5, 100);
  case 580:
  if (!(cmd_equaln(117,9))) {
  jumpTo(581);
  break;
}
    cmd_start_update(9);
    cmd_move_obj_v(9, 118, 119, 5, 100);
  case 581:
  if (!(cmd_equaln(117,10))) {
  jumpTo(582);
  break;
}
    cmd_start_update(10);
    cmd_move_obj_v(10, 118, 119, 5, 100);
  case 582:
  if (!(cmd_equaln(117,11))) {
  jumpTo(583);
  break;
}
    cmd_start_update(11);
    cmd_move_obj_v(11, 118, 119, 5, 100);
  case 583:
  if (!(cmd_equaln(117,12))) {
  jumpTo(584);
  break;
}
    cmd_start_update(12);
    cmd_move_obj_v(12, 118, 119, 5, 100);
  case 584:
  if (!(cmd_equaln(117,13))) {
  jumpTo(585);
  break;
}
    cmd_start_update(13);
    cmd_move_obj_v(13, 118, 119, 5, 100);
  case 585:
  if (!(cmd_equaln(117,14))) {
  jumpTo(586);
  break;
}
    cmd_start_update(14);
    cmd_move_obj_v(14, 118, 119, 5, 100);
  case 586:
  if (!(cmd_equaln(117,15))) {
  jumpTo(587);
  break;
}
    cmd_start_update(15);
    cmd_move_obj_v(15, 118, 119, 5, 100);
  case 587:
  cmd_assignn(100, 1);
case 500:
case 2:
if (cmd_controller(c12)) {
  cmd_accept_input();
  cmd_disable_item(c12);
  cmd_position_v(0, 122, 123);
  cmd_assignv(10, 121);
  cmd_clear_lines(23, 23, 0);
  cmd_new_room(15);
if (AGI.break_all_logics) return;
}
if (cmd_equaln(100,1)) {
  if (cmd_isset(100)) {
    if (cmd_equaln(117,1)) {
      cmd_stop_update(1);
    }
    if (cmd_equaln(117,2)) {
      cmd_stop_update(2);
    }
    if (cmd_equaln(117,3)) {
      cmd_stop_update(3);
    }
    if (cmd_equaln(117,4)) {
      cmd_stop_update(4);
    }
    if (cmd_equaln(117,5)) {
      cmd_stop_update(5);
    }
    if (cmd_equaln(117,6)) {
      cmd_stop_update(6);
    }
    if (cmd_equaln(117,7)) {
      cmd_stop_update(7);
    }
    if (cmd_equaln(117,8)) {
      cmd_stop_update(8);
    }
    if (cmd_equaln(117,9)) {
      cmd_stop_update(9);
    }
    if (cmd_equaln(117,10)) {
      cmd_stop_update(10);
    }
    if (cmd_equaln(117,11)) {
      cmd_stop_update(11);
    }
    if (cmd_equaln(117,12)) {
      cmd_stop_update(12);
    }
    if (cmd_equaln(117,13)) {
      cmd_stop_update(13);
    }
    if (cmd_equaln(117,14)) {
      cmd_stop_update(14);
    }
    if (cmd_equaln(117,15)) {
      cmd_stop_update(15);
    }
    cmd_start_motion(0);
    cmd_assignn(100, 0);
    if (cmd_equaln(101,15) && cmd_equaln(102,8) && cmd_equaln(103,7) && cmd_equaln(104,6)) {
      if (cmd_equaln(105,4) && cmd_equaln(106,13) && cmd_equaln(107,10) && cmd_equaln(108,3)) {
        if (cmd_equaln(109,14) && cmd_equaln(110,2) && cmd_equaln(111,12) && cmd_equaln(112,1)) {
          if (cmd_equaln(113,5) && cmd_equaln(114,11) && cmd_equaln(115,9) && cmd_equaln(116,0)) {
            cmd_print(2);
            cmd_set(213);
            cmd_accept_input();
            cmd_disable_item(c12);
            cmd_position_v(0, 122, 123);
            cmd_assignv(10, 121);
            cmd_clear_lines(23, 23, 0);
            cmd_addn(3, 10);
            cmd_new_room(15);
if (AGI.break_all_logics) return;
          }
        }
      }
    }
  }
}
return;

}}}
MESSAGES[11]=[
"",
"Press F6 to quit",
"\"This looks about right\" you say to yourself. And with that in mind you replace the panel."];
CONTROLS[11]="";