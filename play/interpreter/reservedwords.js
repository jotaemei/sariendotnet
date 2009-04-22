/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
/// <reference path="hacks.js" />
/// <reference path="io.js" />
/// <reference path="menu.js" />
/// <reference path="picture.js" />
/// <reference path="sarien.js" />
/// <reference path="sound.js" />
/// <reference path="test.js" />
/// <reference path="text.js" />
/// <reference path="utils.js" />
/// <reference path="view.js" />

// variables
var var_room_no = 0;
var var_prev_room_no = 1;
var var_ego_edge_code = 2;
var var_score = 3;
var var_object_touching_edge = 4;
var var_object_edge_code = 5;
var var_ego_dir = 6;
var var_max_score = 7;
var var_free_memory = 8;
var var_unknown_word_no = 9;
var var_cycle_delay = 10;
var var_clock_seconds = 11;
var var_clock_minutes = 12;
var var_clock_hours = 13;
var var_clock_days = 14;
var var_joystick_sensitivity = 15;
var var_ego_view_no = 16;
var var_error_code = 17;
var var_error_information = 18;
var var_key_pressed = 19;
var var_computer_type = 20;
var var_window_close_time = 21;
var var_sound_channels = 22;
var var_sound_volume = 23;
var var_max_input_len = 24;
var var_selected_inventory_item = 25;
var var_video_mode = 26;

// flags
var flag_ego_on_water = 0;
var flag_ego_hidden = 1;
var flag_input_received = 2;
var flag_ego_touching_signal_line = 3;
var flag_input_parsed = 4;
var flag_new_room = 5;
var flag_game_restarted = 6;
var flag_script_buffer_blocked = 7;
var flag_joystick_sensitivity_set = 8;
var flag_sound_on = 9;
var flag_trace_enabled = 10;
var flag_noise_enabled = 11;
var flag_game_restored = 12;
var flag_inventory_select_enabled = 13;
var flag_menu_enabled = 14;
var flag_windows_remain = 15;
var flag_auto_restart = 16;
var flag_auto_loop = 20;

// Edge Codes
var no_edge = 0;
var horizon_edge = 1;
var right_edge = 2;
var bottom_edge = 3;
var left_edge = 4;

// Object Direction
var stopped = 0;
var up = 1;
var upright = 2;
var right = 3;
var downright = 4;
var down = 5;
var downleft = 6;
var left = 7;
var upleft = 8;

// Video Modes
var CGA = 0;
var RGB = 1;
var Hercules = 2;
var EGA = 3;
var VGA = 4;

// Other Reserved Defines
var Ego = 0;
var input_prompt = 0;
var game_version_message = 0;
var game_about_message = 0;
var game_id = 0;
var num_invobjects = 0;

// motion types
var mt_normal_motion = 0;
var mt_wander = 1;
var mt_follow_ego = 2;
var mt_move_obj = 3;

// cycle types
var ct_normal_cycle = 0;
var ct_end_of_loop = 1;
var ct_reverse_loop = 2;
var ct_reverse_cycle = 3;

// control
var c_program_control = 0;
var c_player_control = 1;

// screens
var s_graphics_screen = 0;
var s_text_screen = 1;

// io command actions
var a_exit = "a_exit";
var a_back = "a_back";
var a_local_verbs = "a_local_verbs";
var a_global_verbs = "a_global_verbs";
var a_f_keys = "a_f_keys";
var a_locations = "a_locations";
var a_separator = "a_separator";
var a_avatars = "a_avatars";
var a_options = "a_options";
var a_disable_multiplayer = "a_disable_multiplayer";