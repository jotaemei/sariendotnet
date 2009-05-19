/// <reference path="agent.js" />
/// <reference path="view.js" />
/// <reference path="agi.js" />
/// <reference path="canvas.js" />
/// <reference path="commands.js" />
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

// helper method to always properly return a view from the objects list
function getObject(n)
{
  var obj = objects[n];
  if (!obj)
  {
    obj = new View();
    objects[n] = obj;
    objects[n].index = n;
  }
  if (n > AGI.highestObjIndex)
    AGI.highestObjIndex = n;
  return obj;
};

// helper method to get the ego: object 0
function getEgo()
{
  return getObject(0);
};

// View class
function View()
{
  this.createRootElement();
};

// For auto-loop-change, this table returns the loop for each direction, -1 meaning no loopchange.
// There are two tables, one for objects with 2 or 3 loops, one for objects with 4 or more loops.
View.loop_table_2 = [4, 4, 0, 0, 0, 4, 1, 1, 1];
View.loop_table_4 = [4, 3, 0, 0, 0, 2, 1, 1, 1];


View.prototype =
{
  index: -1,
  room: -1,
  id: 0,
  x: 0,
  y: 0,
  loop: 0,
  cel: 0,
  priority: 0,
  step_time: 1,
  step_time_count: 1,
  step_size: 1,
  cycle_time: 1, // cycle interval to update
  cycle_time_count: 1,
  didnt_move_count: 0,
  observe_horizon: true,
  observe_blocks: true,
  observe_objects: true,
  direction: 0,
  ANIMATED: false, // animate_obj
  DRAWN: false,
  UPDATE: true, // update every cycle
  FIX_LOOP: false, // no automatic loop change
  CYCLING: true, // automatic cel change
  FIXED_PRIORITY: false, // no automatic priority change
  UPDATE_POS: false, // moved
  DIDNT_MOVE: false,
  ON_LAND: false,
  ON_WATER: false,
  parm1: 0, // used in follow
  parm3: 0, // used in follow

  motion_type: 0,
  cycle_type: 0,

  flag_to_set: -1,

  destX: 0,
  destY: 0,
  loopHeight: 0,

  rootElement: null,
  imageElement: null,

  description: function() {
    return VIEWS[this.id][0];
  },

  loopCount: function() {
    return VIEWS[this.id].length - 1;
  },

  celCount: function() {
    var cels = VIEWS[this.id][this.loop + 1];
    return cels ? cels.length : 0;
  },

  width: function() {
    return Math.round(this.rootElement.offsetWidth / (2 * AGI.zoom));
  },

  height: function() {
    var height = Math.round(this.rootElement.offsetHeight / AGI.zoom);
    this.loopHeight = Math.max(this.loopHeight, height);
    return height;
  },

  load: function(id) {
    if (this.index != Ego) {
      // prevent illegal loop/cel values
      cmd_set_loop(this.index, this.loop);
    }
    this.id = id;
    var imagePath = Sarien.path + "/view" + Utils.PadLeft(this.id, '0', 3) + ".png";
    this.imageElement.setAttribute("src", imagePath);
    this.update();
  },

  position: function(x, y) {
    this.x = x;
    this.rootElement.style.left = AGI.zoom * x * 2 + "px";

    this.y = y;
    this.rootElement.style.top = AGI.zoom * y + "px";

    // auto set priority if this view is set to do so
    if (!this.FIXED_PRIORITY) {
      // -1 to fix pq1 dooley desk bug
      this.setZindex(this.y - 1);
    }
  },

  setPriority: function(prio) {
    this.priority = prio;
    var z = prio == 0 ? 1 : (prio - 1) * 12;
    this.setZindex(z);
  },

  setZindex: function(z) {
    this.rootElement.style.zIndex = z;
  },

  setDestination: function(x, y) {
    this.destX = x;
    this.destY = y;
    this.motion_type = mt_move_obj;
    this.direction = this.getDirection(this.x, this.y, this.destX, this.destY, this.step_size);
    if (this.isEgo())
      vars[var_ego_dir] = this.direction;
  },

  // stops going to a destination
  stop: function() {
    this.destX = this.x;
    this.destY = this.y;
    this.CYCLING = false;
    this.direction = stopped;
    vars[var_ego_dir] = 0;
  },

  show: function() {
    document.getElementById("canvas").appendChild(this.rootElement);
    this.rootElement.style.visibility = "visible";
  },

  hide: function() {
    if (this.isVisible())
      this.rootElement.style.visibility = "hidden";
  },

  remove: function() {
    if (this.rootElement && this.rootElement.parentNode)
      this.rootElement.parentNode.removeChild(this.rootElement);
  },

  isVisible: function() {
    return this.rootElement.parentNode && this.rootElement.style.visibility != "hidden";
  },

  update: function() {
    this.DIDNT_MOVE = this.x == this.oldX && this.y == this.oldY;
    if (!this.DIDNT_MOVE) {
      this.position(this.x, this.y);
    }
    var frameClass = ["o", this.index, " view V", this.id, " V", this.id, this.loop, this.cel].join("");
    if (this.oldClassName != frameClass)
      this.rootElement.className = frameClass;

    this.oldX = this.x;
    this.oldY = this.y;
    this.oldClassName = frameClass;
  },

  createRootElement: function() {
    var div = document.createElement("div");
    var img = document.createElement("img");
    div.appendChild(img);
    this.rootElement = div;
    this.imageElement = img;
  },

  checkMotion: function() {
    switch (this.motion_type) {
      case mt_wander:
        this.motionWander();
        break;
      case mt_follow_ego:
        this.motionFollowEgo();
        break;
      case mt_move_obj:
        this.motionMoveObj();
        break;
    }
    if (AGI.block && this.observe_blocks && this.direction)
      this.changePos();
  },

  motionWander: function() {
    if (!this.direction || this.DIDNT_MOVE)
      this.direction = Utils.Random(1, 8);
    if (this.isEgo())
      vars[var_ego_dir] = this.direction;
  },

  motionFollowEgo: function() {
    this.step_size = Math.min(this.step_size, 1);
    var ego_x, ego_y;
    var obj_x, obj_y;
    var dir;

    var ego = getEgo();

    ego_x = Math.round(ego.x + ego.width() / 2);
    ego_y = ego.y;

    obj_x = Math.round(this.x + this.width() / 2);
    obj_y = this.y;

    // Get direction to reach ego
    dir = this.getDirection(obj_x, obj_y, ego_x, ego_y, this.parm1);

    // Already at ego coordinates
    if (dir == 0) {
      this.direction = 0;
      this.motion_type = mt_normal_motion;
      cmd_set(this.flag_to_set);
      this.flag_to_set = -1;
      return;
    }

    if (this.parm3 == 255) {
      this.parm3 = 0;
    }
    else if (this.DIDNT_MOVE) {
      this.direction = Utils.Random(1, 8);
      var d = (Math.abs(ego_y - obj_y) + Math.abs(ego_x - obj_x)) / 2 + 1;
      if (d <= this.step_size) {
        this.parm3 = this.step_size;
        return;
      }

      do {
        this.parm3 = Utils.Random(0, d);
      }
      while (this.parm3 < this.step_size);
      return;
    }

    if (this.parm3 != 0) {
      this.parm3 -= this.step_size
      if (this.parm3 < 0)
        this.parm3 = 0;
    }
    else {
      this.direction = dir;
    }
  },

  motionMoveObj: function() {
    this.direction = this.getDirection(this.x, this.y, this.destX, this.destY, this.step_size);
    if (this.isEgo())
      vars[var_ego_dir] = this.direction;

    if (this.direction == 0)
      this.inDestination();
  },

  changePos: function() {
    var b, x, y;
    var dx = [0, 0, 1, 1, 1, 0, -1, -1, -1];
    var dy = [0, -1, -1, 0, 1, 1, 1, 0, -1];

    var x = this.x;
    var y = this.y;
    var b = this.checkBlock(x, y);

    x += this.step_size * dx[this.direction];
    y += this.step_size * dy[this.direction];

    if (this.checkBlock(x, y) != b) {
      this.direction = 0;
      if (this.isEgo())
        vars[var_ego_dir] = 0;
    }
  },

  isEgo: function() {
    return this.index == 0;
  },

  /**
  * Get direction from motion coordinates
  * This function gets the motion direction from the current and previous
  * object coordinates and the step size.
  * @param  x0  Original x coordinate of the object
  * @param  y0  Original y coordinate of the object
  * @param  x   x coordinate of the object
  * @param  y   y coordinate of the object
  * @param  s   step size
  */
  getDirection: function(x0, y0, x, y, s) {
    var dir_table = [8, 1, 2, 7, 0, 3, 6, 5, 4];
    return dir_table[this.checkStep(x - x0, s) + 3 * this.checkStep(y - y0, s)];
  },

  checkStep: function(delta, step) {
    return (-step >= delta) ? 0 : (step <= delta) ? 2 : 1;
  },

  inDestination: function() {
    if (this.flag_to_set > -1) {
      if (this.parm3 > 0) {
        this.step_size = this.parm3;
        this.parm3 = 0;
      }
      cmd_set(this.flag_to_set);
      this.flag_to_set = -1;
    }

    if (this.motion_type != mt_wander)
      this.motion_type = mt_normal_motion;

    if (this.isEgo())
      AGI.control = c_player_control;
  },

  checkBlock: function(x, y) {
    if (x <= AGI.block.x1 || x >= AGI.block.x2)
      return false;

    if (y <= AGI.block.y1 || y >= AGI.block.y2)
      return false;

    return true;
  },

  updateViewTableEntry: function() {
    var loop = 4;
    if (!this.FIX_LOOP) {
      switch (this.loopCount()) {
        case 2:
        case 3:
          loop = View.loop_table_2[this.direction];
          break;
        case 4:
          loop = View.loop_table_4[this.direction];
          break;
      }
    }

    if (loop != 4 && loop != this.loop) {
      if (this.step_time_count == 1)
        this.loop = loop;
    }

    if (!this.CYCLING)
      return;

    if (this.cycle_time_count == 0)
      return;

    if (--this.cycle_time_count == 0) {
      this.updateCel();
      this.cycle_time_count = this.cycle_time;
    }
  },

  updateCel: function() {
    var cel = this.cel;
    var lastCel = this.celCount() - 1;

    switch (this.cycle_type) {
      case ct_normal_cycle:
        if (++cel > lastCel)
          cel = 0;
        break;
      case ct_end_of_loop:
        if (cel < lastCel) {
          if (++cel != lastCel)
            break;
        }
        if (this.flag_to_set > -1) {
          cmd_set(this.flag_to_set);
          this.flag_to_set = -1;
        }
        this.CYCLING = false;
        this.direction = 0;
        this.cycle_type = ct_normal_cycle;
        break;
      case ct_reverse_loop:
        if (cel) {
          if (--cel)
            break;
        }
        if (this.flag_to_set > -1) {
          cmd_set(this.flag_to_set);
          this.flag_to_set = -1;
        }
        this.CYCLING = false;
        this.direction = 0;
        this.cycle_type = ct_normal_cycle;
        break;
      case ct_reverse_cycle:
        if (cel == 0)
          cel = lastCel;
        else
          cel--;
        break;
    }
    this.cel = cel;
  },
  updatePosition: function() {
    var x, y, old_x, old_y, border;

    if (this.step_time_count != 0) {
      if (--this.step_time_count != 0)
        return;
    }

    this.step_time_count = this.step_time;

    x = old_x = this.x;
    y = old_y = this.y;

    /* If object has moved, update its position */
    if (true || this.UPDATE_POS) {
      var dx = [0, 0, 1, 1, 1, 0, -1, -1, -1];
      var dy = [0, -1, -1, 0, 1, 1, 1, 0, -1];
      x += this.step_size * dx[this.direction];
      y += this.step_size * dy[this.direction];
    }

    /* Now check if it touched the borders */
    border = 0;

    /* Check left/right borders */
    // todo: kq4 + mouse code?
    if (x < 0) {
      x = 0;
      border = 4;
    }
    else if (x + this.width() > AGI.screen_width) {
      x = AGI.screen_width - this.width();
      border = 2;
    }

    /* Check top/bottom borders. */
    if (y - this.height() + 1 < 0) {
      y = this.height() - 1;
      border = 1;
    }
    else if (y > AGI.screen_height - 1) {
      y = AGI.screen_height - 1;
      border = 3;
    }
    else if (this.observe_horizon && y <= AGI.horizon) {
      y = AGI.horizon + 2;
      border = 1;
    }

    /* Test new position. rollback if test fails */
    this.x = x;
    this.y = y;

    if (!this.xyok()) {
      this.y = old_y;
      if (!this.xyok()) {
        this.x = old_x;
        this.y = y;
        if (!this.xyok()) {
          this.y = old_y;
          border = 0;
          this.inDestination();
        }
      }
    }

    // make sure direction is set to 0 when not moved (count to allow walking between rooms)
    if (this.x == old_x && this.y == old_y) {
      if (this.didnt_move_count)
        this.direction = 0;
      else
        this.didnt_move_count++;
    }
    else
      this.didnt_move_count = 0;

    if (border != 0) {
      if (this.isEgo()) {
        vars[var_ego_edge_code] = border;
      }
      else {
        vars[var_object_touching_edge] = this.index;
        vars[var_object_edge_code] = border;
      }
      if (this.motion_type == mt_move_obj) {
        this.inDestination();
      }
    }

    this.UPDATE_POS = false;
  },
  // returns true if this.x and this.y are ok
  xyok: function() {
    return (!this.checkCollision() && this.checkPriority() && this.checkPosition());
  },
  // fixPosition is unused for now, it causes endless loops in certain rooms
  fixPosition: function() {
    var count, dir, size;

    /* test horizon */
    if (this.observe_horizon && this.y <= AGI.horizon) {
      this.y = AGI.horizon + 1;
    }
    dir = 0;
    count = size = 1;

    //while (!this.checkPriority() || !this.checkPosition() || this.checkCollision()) {
    while (!this.checkPosition()) {
      switch (dir) {
        case 0:     /* west */
          this.x--;
          if (--count) continue;
          dir = 1;
          break;
        case 1:     /* south */
          this.y++;
          if (--count) continue;
          dir = 2;
          size++;
          break;
        case 2:     /* east */
          this.x++;
          if (--count) continue;
          dir = 3;
          break;
        case 3:     /* north */
          this.y--;
          if (--count) continue;
          dir = 0;
          size++;
          break;
      }
      count = size;
    }
  },
  // checks if this object collides with other objects currently visible
  checkCollision: function() {
    if (!this.observe_objects)
      return false;

    function checkCollisionWithObject(obj1, obj2) {
      if (!obj2)
        return false;

      if (!obj2.ANIMATED || !obj2.isVisible() || !obj2.observe_objects)
        return false;

      // Same object, check next
      if (obj1.index == obj2.index)
        return false;

      // No horizontal overlap, check next
      if (obj1.x + obj1.width() < obj2.x || obj1.x > obj2.x + obj2.width())
        return false;

      if (obj1.y == obj2.y)
        return true;

      return false;
    }

    // check dynamic objects
    for (var i = 0; i <= AGI.highestObjIndex; i++) {
      var obj = objects[i];
      if (!obj || obj.index >= 100)
        continue;
      if (checkCollisionWithObject(this, obj))
        return true;
    }
    return false;
  },
  checkPosition: function() {
    if (this.x < 0 ||
      this.x + this.width() > AGI.screen_width ||
      this.y - this.height() + 1 < 0 ||
      this.y >= AGI.screen_height ||
      (this.observe_horizon && this.y <= AGI.horizon)) {
      return 0;
    }

    return 1;
  },
  checkPriority: function() {
    var i, trigger, water, pass, pri, w;

    if (!this.FIXED_PRIORITY) {
      /* Priority bands */
      this.priority = AGI.priorityTable[this.y];
    }

    trigger = 0;
    water = 0;
    pass = 1;

    if (this.priority != 15) {

      for (i = 0, w = this.width(); i < w; i++) {
        pri = AGI.getPriority(this.x + i, this.y) - 1;

        /* unconditional black. no go at all! */
        if (pri == 0) {
          pass = 0;
          break;
        }

        /* water surface */
        if (pri == 3) {
          water = 1;
          continue;
        }

        /* conditional blue */
        if (pri == 1) {
          if (!this.observe_blocks)
            continue;

          pass = 0;
          break;
        }

        /* trigger */
        if (pri == 2)
          trigger = 1;
      }

      if (pass) {
        if (!water && this.ON_WATER)
          pass = 0;
        if (water && this.ON_LAND)
          pass = 0;
      }
    }

    if (this.isEgo()) {
      flags[flag_ego_touching_signal_line] = trigger ? true : false;
      flags[flag_ego_on_water] = water ? true : false;
    }

    return pass;
  }
};