/// <reference path="MultiplayerClient.js" />
/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="hacks.js" />
/// <reference path="io.js" />
/// <reference path="menu.js" />
/// <reference path="picture.js" />
/// <reference path="reservedwords.js" />
/// <reference path="sarien.js" />
/// <reference path="sound.js" />
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

// new room function cmd_on top for easy reference during development
function cmd_new_room(roomNr) {
  getEgo().hide();
  for (var i = 0; i < objects.length; i++) {
    var obj = objects[i];
    if (obj) {
      obj.ANIMATED = false;
      obj.DRAWN = false;
      obj.UPDATE = true;
      obj.step_time = 1;
      obj.step_time_count = 1;
      obj.cycle_time = 1;
      obj.cycle_time_count = 1;
      obj.step_size = 1;
      obj.observe_blocks = true;
    }
  }
  cmd_unanimate_all();
  cmd_player_control();
  // fix for sq1 arcada control room priority
  cmd_release_priority(0);
  cmd_unblock();
  AGI.horizon = 36;
  cmd_assignv(var_prev_room_no, var_room_no);
  cmd_assignn(var_room_no, roomNr);
  cmd_assignn(var_object_touching_edge, 0);
  cmd_assignn(var_object_edge_code, 0);
  cmd_assignn(var_ego_view_no, getEgo().id);
  cmd_reset(flag_input_received);
  cmd_load_logics(roomNr);
  IO.currentRoomLogics = {};

  // Reposition ego in the new room
  var ego = getEgo();
  switch (vars[var_ego_edge_code]) {
    case 1:
      ego.y = AGI.screen_height - 1;
      break;
    case 2:
      ego.x = 0;
      break;
    case 3:
      ego.y = AGI.horizon + 1;
      break;
    case 4:
      ego.x = AGI.screen_width - ego.width();
      break;
  }
  cmd_assignn(var_ego_edge_code, 0);
  cmd_set(flag_new_room);
  // used for msg displaying
  AGI.current_room = roomNr;
  AGI.new_room = roomNr;
  AGI.break_all_logics = true;
  Sarien.updateAddressBar(roomNr);
  cmd_graphics();
  AGI.highestObjIndex = 1;
};
// operational commands
function cmd_equaln(vn, value) {
  return vars[vn] == value;
}
function cmd_equalv(vn, vn2) {
  return vars[vn] == vars[vn2];
}
function cmd_assignn(vn, value) {
  vars[vn] = value;
}
function cmd_assignv(vn, vn2) {
  vars[vn] = vars[vn2];
}
function cmd_greatern(vn, value) {
  return vars[vn] > value;
}
function cmd_greaterv(vn, vn2) {
  return vars[vn] > vars[vn2];
}
function cmd_lessn(vn, value) {
  return vars[vn] < value;
}
function cmd_lessv(vn, vn2) {
  return vars[vn] < vars[vn2];
}
function cmd_set(fn) {
  flags[fn] = 1;
}
function cmd_set_v(n) {
  flags[vars[n]] = 1;
}
function cmd_isset(n) {
  return flags[n];
}
function cmd_issetv(n) {
  return flags[vars[n]];
}
function cmd_reset(fn) {
  flags[fn] = 0;
};
function cmd_reset_v(vn) {
  flags[vars[vn]] = 0;
};
function cmd_decrement(vn) {
  if (vars[vn] > 0)
    vars[vn]--;
}
function cmd_increment(vn) {
  if (vars[vn] < 255)
    vars[vn]++;
}
function cmd_addn(vn, value) {
  vars[vn] += value;
  vars[vn] = vars[vn] % 256;
}
function cmd_addv(vn, vn2) {
  vars[vn] += vars[vn2];
  vars[vn] = vars[vn] % 256;
}
function cmd_subn(vn, value) {
  vars[vn] -= value;
  if (vars[vn] < 0)
    vars[vn] += 256;
}
function cmd_subv(vn, vn2) {
  vars[vn] -= vars[vn2];
  if (vars[vn] < 0)
    vars[vn] += 256;
}
function cmd_muln(vn, value) {
  vars[vn] *= value;
}
function cmd_mulv(vn, vn2) {
  vars[vn] *= vars[vn2];
}
function cmd_divn(vn, value) {
  vars[vn] /= value;
}
function cmd_divv(vn, vn2) {
  vars[vn] /= vars[vn2];
}
function cmd_lindirectn(n, m) {
  vars[vars[n]] = m;
}
function cmd_lindirectv(n, m) {
  vars[vars[n]] = vars[m];
}
function cmd_rindirect(n, m) {
  vars[n] = vars[vars[m]];
}
function cmd_toggle(n) {
  var is0 = flags[n] == 0;
  flags[n] = is0 ? 1 : 0;
}
function cmd_toggle_v(vn) {
  var is0 = flags[vars[vn]] == 0;
  flags[vars[vn]] = is0 ? 1 : 0;
}
function cmd_random(min, max, vn) {
  var rnd;
  if (Test.playing)
    rnd = Test.playRandom();
  else
    rnd = Utils.Random(min, max);
  if (Test.recording)
    Test.recordRandom(rnd);
  vars[vn] = rnd;
}
// Object control commands
function cmd_animate_obj(i) {
  var obj = getObject(i);
  obj.ANIMATED = true;
  obj.CYCLING = true;
  obj.UPDATE = true;
  // commented for sq1#9 elevator-entrance walk fix
  //obj.motion_type = mt_normal_motion;
  obj.cycle_type = ct_normal_cycle;
  obj.room = AGI.picture.id;
}
function cmd_unanimate_all() {
  for (var i = objects.length - 1; i > 0; i--) {
    var obj = objects[i];
    if (obj) {
      obj.remove();
      obj.ANIMATED = false;
      obj.DRAWN = false;
      delete objects[i];
    }
  }
}
function cmd_set_view(i, view) {
  if (avatarNames[view])
    IO.avatars[view] = 1;
  var obj = getObject(i);
  obj.load(view);
  if (obj.loop >= obj.loopCount())
    obj.loop = 0;
  if (obj.cel >= obj.celCount())
    obj.cel = 0;
  obj.update();
};
function cmd_set_view_v(i, vn) {
  var view = vars[vn];
  cmd_set_view(i, view);
};
function cmd_set_loop(i, loop) {
  var obj = getObject(i);
  obj.loop = loop;
  if (obj.loop >= obj.loopCount())
    obj.loop = 0;
  if (obj.cel >= obj.celCount())
    obj.cel = 0;
  obj.update();
};
function cmd_set_loop_v(n, m) {
  var loop = vars[m];
  cmd_set_loop(n, loop);
};
function cmd_fix_loop(n) {
  var obj = getObject(n);
  obj.FIX_LOOP = true;
}
function cmd_release_loop(n) {
  var obj = getObject(n);
  obj.FIX_LOOP = false;
}
function cmd_set_cel(i, cel) {
  var obj = getObject(i);
  obj.cel = cel;
  obj.update();
};
function cmd_set_cel_v(i, vn) {
  var obj = getObject(i);
  obj.cel = vars[vn];
  obj.update();
};
function cmd_last_cel(i, vn) {
  var obj = getObject(i);
  vars[vn] = obj.celCount() - 1;
}
function cmd_current_cel(i, vn) {
  var obj = getObject(i);
  vars[vn] = obj.cel;
}
function cmd_current_loop(i, vn) {
  var obj = getObject(i);
  vars[vn] = obj.loop;
}
function cmd_current_view(i, vn) {
  var obj = getObject(i);
  vars[vn] = obj.id;
}
function cmd_set_priority(i, v) {
  var obj = getObject(i);
  obj.setPriority(v);
  obj.FIXED_PRIORITY = true;
}
function cmd_set_priority_v(i, vn) {
  var v = vars[vn];
  cmd_set_priority(i, v);
}
function cmd_release_priority(n) {
  var obj = getObject(n);
  obj.FIXED_PRIORITY = false;
}
function cmd_get_priority(i, vn) {
  var obj = getObject(i);
  vars[vn] = obj.priority;
}
function cmd_position(i, x, y) {
  var obj = getObject(i);
  // fixes room bounce
  if (i == 0 && y < AGI.horizon)
    y = AGI.horizon + 1;
  obj.position(x, y);
  obj.oldX = x;
  obj.oldY = y;
  obj.destX = x;
  obj.destY = y;
  obj.DIDNT_MOVE = false;
  obj.UPDATE_POS = false;
}
function cmd_position_v(i, vx, vy) {
  cmd_position(i, vars[vx], vars[vy]);
};
function cmd_draw(i) {
  var obj = getObject(i);
  if (obj.DRAWN)
    return;
  obj.ANIMATED = true;
  obj.DRAWN = true;
  obj.UPDATE = true;
  obj.show();
};
function cmd_erase(n) {
  var obj = getObject(n);
  obj.hide();
  obj.DRAWN = false;
}
function cmd_get_posn(n, vx, vy) {
  var obj = getObject(n);
  vars[vx] = obj.x;
  vars[vy] = obj.y;
};
function cmd_start_cycling(n) {
  var obj = getObject(n);
  obj.CYCLING = true;
}
function cmd_stop_cycling(n) {
  var obj = getObject(n);
  obj.CYCLING = false;
}
function cmd_normal_cycle(n) {
  var obj = getObject(n);
  obj.cycle_type = ct_normal_cycle;
}
function cmd_reverse_cycle(n) {
  var obj = getObject(n);
  obj.cycle_type = ct_reverse_cycle;
}
function cmd_end_of_loop(i, flag) {
  cmd_reset(flag);
  var obj = getObject(i);
  obj.ANIMATED = true;
  obj.UPDATE = true;
  obj.CYCLING = true;
  obj.flag_to_set = flag;
  obj.cycle_type = ct_end_of_loop;
};
function cmd_reverse_loop(i, flag) {
  cmd_reset(flag);
  var obj = getObject(i);
  obj.ANIMATED = true;
  obj.UPDATE = true;
  obj.CYCLING = true;
  obj.flag_to_set = flag;
  obj.cycle_type = ct_reverse_loop;
};
function cmd_cycle_time(n, m) {
  var obj = getObject(n);
  var value = vars[m];
  if (value == 0)
    value = 1;
  obj.cycle_time = value;
  obj.cycle_time_count = value;
}
function cmd_set_horizon(n) {
  AGI.horizon = n;
  var ego = getEgo();
  ego.fixPosition();
  ego.update();
}
function cmd_ignore_horizon(n) {
  var obj = getObject(n);
  obj.observe_horizon = false;
}
function cmd_observe_horizon(n) {
  var obj = getObject(n);
  obj.observe_horizon = true;
}
function cmd_block(x1, y1, x2, y2) {
  AGI.block = { "x1": x1, "y1": y1, "x2": x2, "y2": y2 };
};
function cmd_unblock() {
  AGI.block = false;
};
function cmd_ignore_blocks(n) {
  var obj = getObject(n);
  obj.observe_blocks = false;
};
function cmd_observe_blocks(n) {
  var obj = getObject(n);
  obj.observe_blocks = true;
};
function cmd_ignore_objs(n) {
  var obj = getObject(n);
  obj.observe_objects = false;
};
function cmd_observe_objs(n) {
  var obj = getObject(n);
  obj.observe_objects = true;
};
function cmd_player_control() {
  AGI.control = c_player_control;
};
function cmd_program_control() {
  AGI.control = c_program_control;
};
function cmd_stop_motion(n) {
  var obj = getObject(n);
  obj.direction = 0;
  obj.motion_type = mt_normal_motion;
  if (n == 0) {
    vars[var_ego_dir] = 0;
    cmd_program_control();
  }
};
function cmd_start_motion(n) {
  var obj = getObject(n);
  obj.motion = true;
  if (n == 0) {
    vars[var_ego_dir] = 0;
    cmd_player_control();
  }
};
function cmd_step_size(n, m) {
  var obj = getObject(n);
  var s = vars[m];
  if (s != 0)
    obj.step_size = s;
};
function cmd_step_time(n, m) {
  var obj = getObject(n);
  obj.step_time = vars[m];
  obj.step_time_count = vars[m];
};
function cmd_move_obj(n, x, y, step_size, flag) {
  cmd_reset(flag);
  var obj = getObject(n);
  obj.UPDATE = true;
  obj.parm3 = obj.step_size;
  if (step_size > 0)
    obj.step_size = step_size;
  obj.setDestination(x, y);
  obj.flag_to_set = flag;
  if (n == 0)
    cmd_program_control();
}
function cmd_move_obj_v(n, vx, vy, vstep, flag) {
  var x = vars[vx];
  var y = vars[vy];
  var step_size = vars[vstep];
  cmd_move_obj(n, x, y, step_size, flag);
};
function cmd_follow_ego(n, s, flag) {
  cmd_reset(flag);
  var obj = getObject(n);
  obj.motion_type = mt_follow_ego;
  obj.parm1 = s > obj.step_size ? s : obj.step_size;
  obj.parm3 = 255;
  obj.flag_to_set = flag;
}
function cmd_wander(n) {
  var obj = getObject(n);
  obj.motion_type = mt_wander;
};
function cmd_normal_motion(n) {
  var obj = getObject(n);
  if (obj.motion_type == mt_wander)
    obj.stop();
  obj.motion_type = mt_normal_motion;
};
function cmd_set_dir(n, m) {
  var obj = getObject(n);
  obj.direction = vars[m];
}
function cmd_get_dir(n, m) {
  var obj = getObject(n);
  vars[m] = obj.direction;
}
function cmd_object_on_water(n) {
  var obj = getObject(n);
  obj.ON_WATER = true;
}
function cmd_object_on_land(n) {
  var obj = getObject(n);
  obj.ON_LAND = true;
}
function cmd_object_on_anything(n) {
  var obj = getObject(n);
  obj.ON_LAND = false;
  obj.ON_WATER = false;
}
function cmd_reposition(n, vx, vy) {
  var dx = vars[vx];
  var dy = vars[vy];
  var obj = getObject(n);
  // 255 -> -1
  var x = (obj.x + dx) % 256;
  var y = (obj.y + dy) % 256;
  obj.position(x, y);
  obj.UPDATE_POS = true;
  obj.fixPosition();
};
function cmd_reposition_to(n, x, y) {
  var obj = getObject(n);
  obj.position(x, y);
  obj.UPDATE_POS = true;
  obj.fixPosition();
};
function cmd_reposition_to_v(n, vx, vy) {
  var obj = getObject(n);
  obj.position(vars[vx], vars[vy]);
  obj.UPDATE_POS = true;
  obj.fixPosition();
};
function cmd_stop_update(n) {
  var obj = getObject(n);
  obj.UPDATE = false;
};
function cmd_start_update(n) {
  var obj = getObject(n);
  obj.UPDATE = true;
};
function cmd_force_update(n) {
  var obj = getObject(n);
  obj.update();
};
function cmd_distance(n, m, d) {
  var obj1 = objects[n];
  var obj2 = objects[m];
  if (obj1 && obj2 && obj1.DRAWN && obj2.DRAWN)
    vars[d] = Math.abs(obj1.x - obj2.x) + Math.abs(obj1.y - obj2.y);
  else
    vars[d] = 255;
}
function cmd_add_to_pic(view, loop, cel, x, y, prio, margin) {
  var obj = new View();
  obj.FIXED_PRIORITY = true;
  obj.load(view);
  obj.loop = loop;
  obj.cel = cel;
  obj.position(x, y);
  obj.setPriority(prio);
  obj.show();
  obj.update();
  obj.margin = margin;
  AGI.picture.addStaticObject(obj);
  // always place static objects at the beginning of the canvas. Fixes sq1 barman z-index issue with same prio as static objects
  var parent = obj.rootElement.parentNode;
  parent.insertBefore(obj.rootElement, parent.firstChild);
};
function cmd_add_to_pic_v(view, loop, cel, x, y, prio) {
  cmd_add_to_pic(vars[view], vars[loop], vars[cel], vars[x], vars[y], vars[prio]);
};
function cmd_call(i) {
  // if a new room is loaded, do not execute any deeper logics (they could act upon the new_room flag -> pq1 newspaper bug)
  if (AGI.new_room > 0)
    return;
  cmd_load_logics(i);
  var prevLogic = AGI.current_logic;
  AGI.current_logic = i;
  jumpTo(0);
  window["logic" + i]();
  AGI.current_logic = prevLogic;
}
function cmd_call_v(vn) {
  cmd_call(vars[vn]);
}
function cmd_clear_lines(y1, y2, color) {
  for (var y = y1; y <= y2; y++)
    Text.clearLine(y);
};
function cmd_draw_pic(vn) {
  AGI.picture.load(vars[vn]);
};
function cmd_new_room_v(v) {
  cmd_new_room(vars[v]);
};
// checks for F key press
function cmd_controller(cn) {
  if (IO.controllerKey == cn) {
    IO.controllerKey = 0;
    return true;
  }
  return false;
};
function cmd_said() {
  return IO.hasSaid(arguments);
};
function cmd_show_pic() {
  AGI.picture.show();
};
// play a sound and set flag at end
function cmd_sound(n, flag) {
  // do not play sound but set flag directly
  Sound.play(n, flag);
};
// check if the left pixel of the bottom row is within the box
function cmd_posn(n, x1, y1, x2, y2) {
  var obj = getObject(n);
  var x = obj.x;
  var y = obj.y;
  return (x >= x1 && x <= x2 && y >= y1 && y <= y2);
}
// check if entire bottom-row of pixels is inside the box
function cmd_obj_in_box(n, x1, y1, x2, y2) {
  var obj = getObject(n);
  var x = obj.x;
  var y = obj.y;
  return (x >= x1 && x + obj.width() <= x2 && y >= y1 && y <= y2);
}
// checks if the right pixel of the bottom row is inside the box
function cmd_right_posn(n, x1, y1, x2, y2) {
  var obj = getObject(n);
  var x = obj.x + obj.width();
  var y = obj.y;
  return (x >= x1 && x <= x2 && y >= y1 && y <= y2);
}
// checks if the center pixel of the bottom row is inside the box
function cmd_center_posn(n, x1, y1, x2, y2) {
  var obj = getObject(n);
  var x = obj.x + Math.round(obj.width() / 2);
  var y = obj.y;
  return (x >= x1 && x <= x2 && y >= y1 && y <= y2);
}
// gets object by int or name [n]
function cmd_get(n) {
  if (isNaN(n))
    n = Utils.inventoryNameToIndex(n);
  if (n >= 0)
    items[n] = true;
}
// returns true if ego has inventory object n
function cmd_has(n) {
  // check of the object was referenced by name ("Cartridge") instead of index (1)
  if (isNaN(n))
    n = Utils.inventoryNameToIndex(n);
  return (n >= 0 && items[n])? true : false;
}
// drops an item by removing it from the inventory list
function cmd_drop(n) {
  // check of the object was referenced by name ("Cartridge") instead of index (1)
  if (isNaN(n))
    n = Utils.inventoryNameToIndex(n);
  if (!isNaN(n))
    delete items[n];
}
// only replaces cmd_drop and cmd_has, does not implement other values of m for now
function cmd_put(n, m) {
  if (m == 0)
    cmd_drop(n);
  if (m == 255)
    cmd_get(n);
}
// only replaces cmd_drop and cmd_has, does not implement other values of m for now
function cmd_put_v(n, m) {
  m = vars[m];
  cmd_put(n, m);
}
function cmd_have_key() {
  if (IO.key_pressed) {
    IO.key_pressed = false;
    return true;
  }
  return false;
}
function cmd_prevent_input() {
  IO.accept_input = false;
}
function cmd_accept_input() {
  IO.accept_input = true;
}
function cmd_load_logics_v(vn) {
  cmd_load_logics(vars[vn]);
}
function cmd_load_logics(i) {
  if (!window["logic" + i]) {
    var url = Sarien.path + "/logic" + i + ".js";
    Sarien.loadResource(url);
  }
  if (cmd_isset(flag_new_room) && AGI.current_room > 0)
    IO.currentRoomLogics[i] = 1;
}
function cmd_set_string(n, s) {
  strings[n] = s;
}
function cmd_graphics() {
  AGI.screen = s_graphics_screen;
  document.getElementById("canvas").className = "";
  if (!Text.messageShown)
    Text.clear();
}
function cmd_text_screen() {
  Text.hideMessage();
  AGI.screen = s_text_screen;
  document.getElementById("canvas").className = "text-screen";
}
function cmd_display(row, col, msg) {
  msg = Text.parseMessage(msg);
  Text.add(col, row, msg, Text.foregroundColor, Text.backgroundColor);
}
function cmd_display_v(vrow, vcol, vmsg) {
  var row = vars[vrow];
  var col = vars[vcol];
  var i = vars[vmsg];
  var msg = MESSAGES[AGI.current_logic][i];
  cmd_display(row, col, msg);
}
function cmd_print(msg) {
  msg = Text.parseMessage(msg);
  Text.displayMessage(msg);
}
function cmd_print_at(msg) {
  cmd_print(msg);
}
function cmd_print_at_v(n) {
  var i = vars[n];
  var msg = MESSAGES[AGI.current_room][i];
  cmd_print(msg);
}
function cmd_print_v(n) {
  var i = vars[n];
  var msgs = MESSAGES[AGI.current_room];
  if (msgs)
  {
    var msg = MESSAGES[AGI.current_room][i];
    cmd_print(msg);
  }
}
function cmd_get_string(n, msg, x, y, len) {
  strings[n] = Text.getInput(msg);
}
function cmd_get_num(msg, n) {
  vars[n] = Text.getInput(msg);
}
function cmd_set_string(sn, msg) {
  strings[sn] = msg;
}
function cmd_parse(s1) {
  IO.parseCommandLine(strings[s1]);
}
function cmd_set_game_id(id) {
  AGI.game_id = id;
}
function cmd_set_key(keyCode, scanCode, controller) {
  if (keyCode == 0)
    IO.keyMap[scanCode] = controller;
}
function cmd_compare_strings(s1, s2) {
  return strings[s1] == strings[s2];
}
// returns true if obj n is in room m.
// implementation always returns true except when the object was retrieved
function cmd_obj_in_room(n, m) {
  if (isNaN(n))
    n = Utils.inventoryNameToIndex(n);
  return (n >= 0)? !items[n] : false;
}
function cmd_set_text_attribute(fg, bg) {
  Text.foregroundColor = fg;
  Text.backgroundColor = bg;
}
function cmd_clear_text_rect(y1, x1, y2, x2, c) {
  for (var y = y1; y <= y2; y++)
    for (var x = x1; x <= x2; x++)
    Text.clearPos(x, y);
}
// if an avatar-view is encountered, add it to the "choose avatar" list
function cmd_load_view(n) {
  if (avatarNames[n])
    IO.avatars[n] = 1;
};
function cmd_load_view_v(n) {
  cmd_load_view(vars[n]);
};
function cmd_show_obj(n) {
  Text.showInventoryItem(n);
}
function cmd_show_obj_v(n) {
  Text.showInventoryItem(vars[n]);
}
function cmd_status_line_on() {
  IO.showCommandLine();
}
function cmd_status_line_off() {
  IO.hideCommandLine();
}
// quit takes you to the homepage
function cmd_quit() {
  document.location.href = "/";
}
function cmd_save_game() {
  State.save();
}
function cmd_restore_game() {
  State.restore();
}
function cmd_restart_game() {
  document.location.href = document.location.href.replace(/#.*/gi, "");
}
function cmd_echo_line() {
  IO.input = IO.lastInput;
  IO.showCommandLine();
}
// Stores the room number of object n in variable m.
// In this implementation, returns 255 if you have it, otherwise returns the current room no
function cmd_get_room_v(n, m) {
  vars[m] = cmd_has(vars[n]) ? 255 : vars[var_room_no];
}
// unimplemented commands
function cmd_set_cursor_char() {
}
function cmd_discard_pic() {
}
function cmd_discard_view() {
}
function cmd_discard_view_v() {
}
function cmd_shake_screen() {
}
function cmd_script_size() {
}
function cmd_stop_sound() {
}
function cmd_close_window() {
}
function cmd_set_scan_start() {
}
function cmd_trace_info() {
}
function cmd_configure_screen() {
}
function cmd_cancel_line() {
}
function cmd_enable_item() {
}
function cmd_disable_item() {
}
function cmd_status() {
}
function cmd_object_touched_prio(i, prio) {
}
function cmd_load_pic() {
};
function cmd_load_sound() {
};
function cmd_set_menu(menu) {
}
function cmd_set_menu_item(menu_item, c) {
}
function cmd_submit_menu() {
}
function cmd_disable_item(c) {
}
function cmd_open_dialogue() {
}
function cmd_close_dialogue() {
}
function cmd_reset_scan_start() {
}
function cmd_menu_input() {
}
function version() {
}
function overlay_pic() {
}