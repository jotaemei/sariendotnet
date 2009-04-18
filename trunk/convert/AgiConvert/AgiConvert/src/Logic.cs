using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Text.RegularExpressions;

namespace AGI
{
  public class Logic
  {
    public static ArrayList words = new ArrayList();
    
    private string[] Vars = {
      "room_no", 
      "prev_room_no", 
      "ego_edge_code", 
      "score", 
      "object_touching_edge", 
      "object_edge_code", 
      "ego_dir", 
      "max_score", 
      "free_memory", 
      "unknown_word_no", 
      "cycle_delay", 
      "clock_seconds", 
      "clock_minutes", 
      "clock_hours", 
      "clock_days", 
      "joystick_sensitivity", 
      "ego_view_no", 
      "error_code", 
      "error_information", 
      "key_pressed", 
      "computer_type", 
      "window_close_time", 
      "sound_channels", 
      "sound_volume", 
      "max_input_len", 
      "selected_inventory_item", 
      "video_mode"
    };

    private string[] Flags = {
      "ego_on_water", 
      "ego_hidden", 
      "input_received", 
      "ego_touching_signal_line", 
      "input_parsed", 
      "new_room", 
      "game_restarted", 
      "script_buffer_blocked", 
      "joystick_sensitivity_set", 
      "sound_on", 
      "trace_enabled", 
      "noise_enabled", 
      "game_restored", 
      "inventory_select_enabled", 
      "menu_enabled", 
      "windows_remain", 
      "auto_restart"
    };

    private string[] Commands = 
    {
      "addn",
      "accept_input",
      "assignn",
      "assignv",
      "add_to_pic",
      "add_to_pic_v",
      "animate_obj",
      "addv",
      "block",
      "close_dialogue",
      "call_v",
      "clear_text_rect",
      "controller",
      "cancel_line",
      "center_posn",
      "call",
      "current_view",
      "current_cel",
      "current_loop",
      "clear_lines",
      "cycle_time",
      "close_window",
      "compare_strings",
      "configure_screen",
      "divv",
      "display_v",
      "discard_view_v",
      "draw",
      "display",
      "discard_view",
      "disable_item",
      "decrement",
      "discard_pic",
      "disable_item",
      "drop",
      "draw_pic",
      "divn",
      "distance",
      "erase",
      "end_of_loop",
      "equalv",
      "equaln",
      "echo_line",
      "enable_item",
      "fix_loop",
      "force_update",
      "follow_ego",
      "get_priority",
      "get_num",
      "get_string",
      "get_room_v",
      "get_posn",
      "get",
      "get_dir",
      "graphics",
      "greatern",
      "greaterv",
      "have_key",
      "has",
      "issetv",
      "ignore_objs",
      "isset",
      "ignore_horizon",
      "ignore_blocks",
      "increment",
      "load_view",
      "lessv",
      "load_logics_v",
      "last_cel",
      "load_logics",
      "lessn",
      "lindirectn",
      "lindirectv",
      "load_view_v",
      "load_pic",
      "load_sound",
      "menu_input",
      "move_obj",
      "move_obj_v",
      "muln",
      "mulv",
      "normal_motion",
      "normal_cycle",
      "new_room_v",
      "object_on_land",
      "observe_objs",
      "open_dialogue",
      "observe_horizon",
      "obj_in_box",
      "object_on_anything",
      "observe_blocks",
      "object_on_water",
      "object_touched_prio",
      "obj_in_room",
      "print",
      "print_at_v",
      "print_v",
      "position_v",
      "position",
      "prevent_input",
      "player_control",
      "program_control",
      "parse",
      "print_at",
      "posn",
      "quit",
      "reset",
      "release_priority",
      "release_loop",
      "rindirect",
      "random",
      "reset_scan_start",
      "restore_game",
      "reposition",
      "reposition_to",
      "reverse_loop",
      "reposition_to_v",
      "reverse_cycle",
      "restart_game",
      "right_posn",
      "reset_v",
      "start_cycling",
      "stop_cycling",
      "set_v",
      "set_string",
      "set_horizon",
      "set",
      "stop_motion",
      "start_motion",
      "set_game_id",
      "set_key",
      "step_size",
      "set_priority_v",
      "set_cursor_char",
      "set_priority",
      "set_cel_v",
      "set_cel",
      "status_line_on",
      "status_line_off",
      "shake_screen",
      "script_size",
      "stop_sound",
      "set_text_attribute",
      "sound",
      "set_scan_start",
      "show_pic",
      "set_loop_v",
      "set_loop",
      "said",
      "set_view_v",
      "show_obj",
      "show_obj_v",
      "set_view",
      "submit_menu",
      "step_time",
      "set_menu_item",
      "status",
      "save_game",
      "set_dir",
      "stop_update",
      "set_menu",
      "set_string",
      "subv",
      "subn",
      "start_update",
      "set_new_room",
      "toggle_v",
      "trace_info",
      "text_screen",
      "toggle",
      "unblock",
      "unanimate_all",
      "wander"
    };

    private string id;
    private string fileName;
    private Stack stack = new Stack();

    static Logic()
    {
    }

    public Logic(string fileName, string id)
    {
      this.id = id;
      this.fileName = fileName;
    }

    public string Js
    {
      get
      {
        string js = File.ReadAllText(fileName);

        // change . notation to _
        js = Regex.Replace(js, @"([\w+_])\.([\w+_])", "$1_$2");

        // code tidier
        js = Regex.Replace(js, @"&&\s*\n\s*", "&& ");
        js = Regex.Replace(js, @"\|\|\s*\n\s*", "|| ");

        // fix multiple line strings
        js = Regex.Replace(js, @"""\s*\n\s*""", "");

        // remove warnings
        js = Regex.Replace(js, @"//WARNING.*\n", "");

        // strip out the messages block and put it in a message variable for usage later
        string messages = Regex.Replace(js, @"^.*//\s*Messages(.*)$", "$1", RegexOptions.Singleline);
        js = Regex.Replace(js, @"(^.*)//\s*Messages.*$", "$1", RegexOptions.Singleline);

        // let the return get out of the entire method call and reset the jumptoLine[id] to 0 (not -1)
        js = Regex.Replace(js, @"return\(\)", "return");

        // change labels into cases
        js = Regex.Replace(js, @"Label(\d+):", "case $1:");

        // change /= errors, turn them into cmd_divn
        js = Regex.Replace(js, @"v(\d+) \/= (\d+)", "cmd_divn($1, $2)");
        js = Regex.Replace(js, @"v(\d+) \*= (\d+)", "cmd_muln($1, $2)");
        js = Regex.Replace(js, @"v(\d+) \*= v(\d+)", "cmd_mulv($1, $2)");

        // redirect goto's to their case number
        js = Regex.Replace(js, @"goto\(Label(\d+)\)", "jumpTo($1);\nbreak");

        js = "window.logic" + id + " = function()\n{\n  while(1) {\n    switch (jumptoLine)\n  {\n    case 0:\n" + js + "}}}";

        js = removeNestedLabels(js);

        // add break_all_logics code
        js = Regex.Replace(js, @"(call.*)$", "$1\nif (AGI.break_all_logics) return;", RegexOptions.Multiline);
        js = Regex.Replace(js, @"(load_logics.*)$", "$1\nif (AGI.break_all_logics) return;", RegexOptions.Multiline);
        js = Regex.Replace(js, @"(new_room\(.*)$", "$1\nif (AGI.break_all_logics) return;", RegexOptions.Multiline);

        // new_room exists as method and flagname
        js = Regex.Replace(js, @"new_room\(", "cmd_new_room(");

        if (!AgiConvert.OptimizeJs)
        {
          // use known var names
          for (int i = 0; i < Vars.Length; i++)
          {
            string name = Vars[i];
            js = Regex.Replace(js, @"v" + i + @"\b", name);
          }

          // use known flag names
          for (int i = 0; i < Flags.Length; i++)
          {
            string name = Flags[i];
            js = Regex.Replace(js, @"\bf" + i + @"\b", name);
          }
        }

        // prefix vars, vlags and commands
        foreach (string s in Vars)
          js = Regex.Replace(js, @"\b" + s + @"([^\(])?\b", "var_" + s + "$1");
        foreach (string s in Flags)
          js = Regex.Replace(js, @"\b" + s + @"\b", "flag_" + s);
        foreach (string s in Commands)
          js = Regex.Replace(js, @"\b" + s + @"\(", "cmd_" + s + "(");


        if (AgiConvert.OptimizeJs)
        {
          // make sure NO varnames are used
          for (int i = 0; i < Vars.Length; i++)
          {
            string name = Vars[i];
            js = Regex.Replace(js, @"var_" + name, "" + i);
          }
          // make sure NO flagnames are used
          for (int i = 0; i < Flags.Length; i++)
          {
            string name = Flags[i];
            js = Regex.Replace(js, @"flag_" + name, "" + i);
          }
          // remove v, f or o prefixing -> v123 = 123, but not if it's used in a string such as "you win %v123"
          js = Regex.Replace(js, @"([^%])[vfo](\d+)", "$1$2"); 

          // remove Ego
          js = Regex.Replace(js, @"\bEgo\b", "0");

          // optionally replace said words with indexed words
          js = Regex.Replace(js, @"said\([^\)]+?\)", new MatchEvaluator(saidEvaluator), RegexOptions.Multiline);
        }
        
        string[] msgLines = new string[0];
        
        // place messages below in a variable
        if (messages.Contains("#message"))
        {
          //messages = Regex.Replace(messages, @"^#message\s*(\d*)\s*("".*"").*", "$2,", RegexOptions.Multiline);
          Regex.Replace(messages, @"^#message\s*(\d*)\s*("".*"").*", new MatchEvaluator(messagesEvaluator), RegexOptions.Multiline);

          messages = "MESSAGES[" + id + "]=[\n";
          
          // fill msgLines with proper messages
          msgLines = new string[messageCount+1];
          for (int i = 0; i <= messageCount; i++)
          {
            string msg = "\"\"";
            if (!String.IsNullOrEmpty(messageArray[i]))
              msg = messageArray[i];
            msgLines[i] = msg;
            messages += msg + ",\n";
          }          

          messages = messages.TrimEnd(',', '\n') + "];";
          js += messages;
        }
        
        if (AgiConvert.OptimizeJs)
        {
          // replaces (back) cmd_print("bla") to cmd_print(n) where n is the index in the MESSAGES array
          for (int i=0; i<msgLines.Length; i++)
          {
            string msg = msgLines[i].TrimEnd(',');
            js = js.Replace("cmd_print(" + msg + ")", "cmd_print(" + i + ")");
          }
        }        
        return js;
      }
    }

    private string addCasesToCalls(string js)
    {
      string result = Regex.Replace(js, @"call.*", new MatchEvaluator(addCasesToCallsEvaluator));
      result = Regex.Replace(result, @"load_logics.*", new MatchEvaluator(addCasesToCallsEvaluator));
      return result;
    }

    private string addCasesToCallsEvaluator(Match m)
    {
      string s = m.Groups[0].Value;
      labelStack.Push(++labelNr);
      return "\ncase " + labelNr + ":\njumpTo(" + labelNr + ");\n" + s;
    }

    // all words used in said("bla") commands get through here
    private string saidEvaluator(Match m)
    {
      string s = m.Groups[0].Value; // s = said("...", "...")
      s = Regex.Replace(s, "\"[^\"]+?\"", new MatchEvaluator(wordEvaluator));
      return s;
    }

    private string[] messageArray = new string[500];
    private int messageCount = 0;
    
    private string messagesEvaluator(Match m)
    {
      string s1 = m.Groups[1].Value; // 42
      string s2 = m.Groups[2].Value; // "Hello"
      
      int idx = Convert.ToInt32(s1);
      messageCount = Math.Max(messageCount, idx);
      messageArray[idx] = s2;
      
      return "";
    }

    private string wordEvaluator(Match m)
    {
      string s = m.Groups[0].Value; // s = "bla"
      s = s.Trim('"');
      if (!words.Contains(s))
        words.Add(s);
      int i = words.IndexOf(s);
      return "" + i;
    }

    private string removeNestedLabels(string js)
    {
      string result = "";
      string[] lines = js.Split('\n');
      int i = 0;
      while (i < lines.Length)
      {
        string line = lines[i];
        if (Regex.Match(line, @"if\s*\(").Success)
        {
          string ifClause = "";
          Stack<char> bracketStack = new Stack<char>();
          bool gettingFirstBracket = true;
          while (gettingFirstBracket || bracketStack.Count > 0)
          {
            foreach (char c in line)
            {
              if (c == '{')
              {
                gettingFirstBracket = false;
                bracketStack.Push(c);
              }
              if (c == '}')
              {
                bracketStack.Pop();
              }
            }
            ifClause += line + "\n";

            line = lines[++i];
          }
          int openPos = ifClause.IndexOf('{');
          int closePos = ifClause.LastIndexOf('}');
          string innerClause = ifClause.Substring(openPos + 1, closePos - openPos - 1);

          // if the inner clause contains a label, invert the if statement
          if (Regex.Match(innerClause, @"case\s").Success)
          {
            string parsedClause = Regex.Replace(ifClause, @"(if\s*\([^{]+\{)|(\}\s*else\s*\{)|(\})", new MatchEvaluator(ifElseRewrite));
            result += parsedClause;
          }
          else
            result += ifClause;

          i--;
        }
        else
        {
          result += line + "\n";
        }
        i++;
      }

      return result;
    }

    private string ifElseRewrite(Match m)
    {
      string s = m.Groups[0].Value;
      bool isIf = s.StartsWith("if");
      bool isElse = s.Contains("else");
      bool isClose = s.Equals("}");

      if (isIf)
      {
        labelStack.Push(++labelNr);
        string invertedIf = Regex.Replace(s, @"if\s*(\([^{]+)\{", "if (!$1) {");
        invertedIf = Regex.Replace(invertedIf, @"\s+(\))", "$1");
        invertedIf += "\n  jumpTo(" + labelNr + ");\n  break;\n}";
        return invertedIf;
      }
      if (isElse) // WinAGI supports outputting without else statements, so this code will never run, but leave it anyway
      {
        int label = labelStack.Pop();
        labelStack.Push(++labelNr);
        return "jumpTo(" + labelNr + ");\ncase " + label + ":";
      }
      if (isClose)
      {
        int label = labelStack.Pop();
        return "case " + label + ":";
      }

      return "";
    }

    private int labelNr = 499;
    private Stack<int> labelStack = new Stack<int>();
  }
}