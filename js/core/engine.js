/* OBEY? LOL. — the reusable level runtime ("gameplay engine").
 *
 * A level definition is data plus three small functions:
 *   init(ctx)          -> fresh level state object
 *   view(state, ctx)   -> array of interactive/static objects to draw
 *   on(action, state, api, ctx) -> handles a player action; return true if handled
 * Optional: onStart(state, api, ctx) to schedule timers / dynamic intros.
 *
 * Actions: { type: 'tap'|'drop'|'holdstart'|'holdend', target, zone?, ms? }
 * The runtime owns timers (cancelled on restart/leave), the narrator line and mood,
 * action counting, hints, star scoring and duplicate-completion protection.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;

  /* ---------------------------------------------------------------- scoring */
  var SCORING = {
    /**
     * Deterministic star rule shared by every level; only `par` differs per level.
     * Easy: hints are free, 2 spare actions.  Medium: the 1.x rule.  Hard: no hints and no traps for 3★.
     * A run finished with "Show me how" always earns 1★.
     */
    stars: function (actions, hints, par, difficulty, fails, guided) {
      if (guided) return 1;
      fails = fails || 0;
      switch (difficulty) {
        case 'easy':
          if (actions <= par + 2) return 3;
          if (actions <= par + 8) return 2;
          return 1;
        case 'hard':
          if (actions <= par && hints === 0 && fails === 0) return 3;
          if (actions <= par + 2 && hints === 0) return 2;
          return 1;
        default:
          if (actions <= par && hints === 0) return 3;
          if (actions <= par + 4 && hints <= 1) return 2;
          return 1;
      }
    },
    describe: function (par, difficulty) {
      var a = function (n) { return n + (n === 1 ? ' action' : ' actions'); };
      if (difficulty === 'easy') return ['★★★ ' + a(par + 2) + ' or fewer (hints are free)', '★★ ' + a(par + 8) + ' or fewer', '★ any finish'];
      if (difficulty === 'hard') return ['★★★ ' + a(par) + ' or fewer, no hint, no trap', '★★ ' + a(par + 2) + ' or fewer, no hint', '★ any finish'];
      return ['★★★ ' + a(par) + ' or fewer, no hints', '★★ ' + a(par + 4) + ' or fewer, at most 1 hint', '★ any finish'];
    },
    /** How many hint tiers a difficulty allows. */
    hintLimit: function (difficulty) { return difficulty === 'hard' ? 1 : 3; },
    /** Actions added when the player falls for a trap. */
    failPenalty: function (difficulty) { return difficulty === 'hard' ? 2 : 0; }
  };
  OBEY.scoring = SCORING;

  var realClock = {
    now: function () { return Date.now(); },
    setTimeout: function (f, ms) { return root.setTimeout(f, ms); },
    clearTimeout: function (id) { root.clearTimeout(id); },
    setInterval: function (f, ms) { return root.setInterval(f, ms); },
    clearInterval: function (id) { root.clearInterval(id); }
  };
  OBEY.realClock = realClock;

  /**
   * A clock whose timers can be paused (used while a dialog covers a level, so countdowns,
   * floods and queues never advance behind it). Wraps another clock (real or fake).
   */
  OBEY.createPausableClock = function (base) {
    base = base || realClock;
    var timers = {}, seq = 1, paused = false, pausedAt = 0, offset = 0;
    function arm(t) {
      t.due = base.now() + t.left;
      t.baseId = base.setTimeout(function () {
        if (t.every) { t.left = t.every; arm(t); } else delete timers[t.id];
        t.fn();
      }, t.left);
    }
    function add(fn, ms, every) {
      var t = { id: seq++, fn: fn, left: Math.max(0, ms), every: every ? Math.max(1, ms) : 0 };
      timers[t.id] = t;
      if (!paused) arm(t);
      return t.id;
    }
    function remove(id) { var t = timers[id]; if (!t) return; if (t.baseId !== undefined) base.clearTimeout(t.baseId); delete timers[id]; }
    return {
      now: function () { return (paused ? pausedAt : base.now()) - offset; },
      setTimeout: function (f, ms) { return add(f, ms, false); },
      clearTimeout: remove,
      setInterval: function (f, ms) { return add(f, ms, true); },
      clearInterval: remove,
      pause: function () {
        if (paused) return;
        paused = true; pausedAt = base.now();
        Object.keys(timers).forEach(function (k) { var t = timers[k]; base.clearTimeout(t.baseId); t.baseId = undefined; t.left = Math.max(0, t.due - pausedAt); });
      },
      resume: function () {
        if (!paused) return;
        offset += base.now() - pausedAt;
        paused = false;
        Object.keys(timers).forEach(function (k) { arm(timers[k]); });
      },
      isPaused: function () { return paused; }
    };
  };

  /**
   * @param def   level definition
   * @param opts  { clock, ctx, hooks: { onChange, onSecret(id), onComplete(result) } }
   *   ctx = { replay, secrets: [ids], choices: {}, costume, allSecrets: bool, karma }
   */
  function LevelRuntime(def, opts) {
    opts = opts || {};
    this.def = def;
    this.clock = opts.clock || realClock;
    this.ctx = opts.ctx || {};
    this.ctx.secrets = (this.ctx.secrets || []).slice();
    this.ctx.choices = this.ctx.choices || {};
    this.hooks = opts.hooks || {};
    this.status = 'idle';
    this.timeouts = new Set();
    this.intervals = new Set();
    this.pokeIndex = 0;
    this.holds = {};
    this._resetStats();
    this.api = this._makeApi();
  }

  LevelRuntime.prototype._resetStats = function () {
    this.stats = { actions: 0, hints: 0, fails: 0 };
    this.nopes = 0;
    this.lastFail = null;
    this.hintIndex = 0;
    this.defies = 0;
    this.defyKeys = {};
    this.choices = {};
  };

  LevelRuntime.prototype._clearTimers = function () {
    var c = this.clock;
    this.timeouts.forEach(function (id) { c.clearTimeout(id); });
    this.intervals.forEach(function (id) { c.clearInterval(id); });
    this.timeouts.clear();
    this.intervals.clear();
    this.holds = {};
  };

  LevelRuntime.prototype._emit = function () {
    if (this.hooks.onChange) this.hooks.onChange(this);
  };

  LevelRuntime.prototype._makeApi = function () {
    var rt = this;
    return {
      say: function (text, mood) { rt.line = text; rt.mood = mood || 'neutral'; rt.lineId = (rt.lineId || 0) + 1; },
      mood: function (m) { rt.mood = m; },
      overlay: function (name) { rt.overlay = name || null; },
      now: function () { return rt.clock.now(); },
      after: function (ms, fn) {
        var id = rt.clock.setTimeout(function () {
          rt.timeouts.delete(id);
          if (rt.status !== 'playing') return;
          fn();
          rt._emit();
        }, ms);
        rt.timeouts.add(id);
        return id;
      },
      every: function (ms, fn) {
        var id = rt.clock.setInterval(function () {
          if (rt.status !== 'playing') return;
          fn();
          rt._emit();
        }, ms);
        rt.intervals.add(id);
        return id;
      },
      cancel: function (id) {
        if (rt.timeouts.has(id)) { rt.clock.clearTimeout(id); rt.timeouts.delete(id); }
        if (rt.intervals.has(id)) { rt.clock.clearInterval(id); rt.intervals.delete(id); }
      },
      /** Record that the player ignored/defied an instruction. `key` makes it count once per attempt. */
      defy: function (key) {
        key = key || 'default';
        if (rt.defyKeys[key]) return;
        rt.defyKeys[key] = true;
        rt.defies++;
      },
      choice: function (key, value) { rt.choices[key] = value; },
      secret: function (id) {
        var isNew = rt.ctx.secrets.indexOf(id) < 0;
        if (isNew) rt.ctx.secrets.push(id);
        if (rt.hooks.onSecret) rt.hooks.onSecret(id, isNew);
        return isNew;
      },
      hasSecret: function (id) { return rt.ctx.secrets.indexOf(id) >= 0; },
      /** A harmless wrong move: no reset, just a "nope" reaction in the UI. */
      nope: function (target) {
        rt.nopes++;
        rt.nopeTarget = target || rt.currentTarget || null;
      },
      difficulty: function () { return rt.ctx.difficulty || 'medium'; },
      /** Soft failure: explain, then reset the level state (stats are kept). */
      fail: function (text, mood) {
        if (rt.status !== 'playing') return;
        rt.stats.fails++;
        rt.stats.actions += SCORING.failPenalty(rt.ctx.difficulty);
        rt.lastFail = { text: text, count: rt.stats.fails, target: rt.currentTarget || null };
        rt._clearTimers();
        rt.state = rt.def.init(rt.ctx);
        rt.overlay = rt.def.overlay || null;
        rt.failedAt = rt.clock.now();
        rt.api.say(text, mood || 'laughing');
        if (rt.def.onStart) rt.def.onStart(rt.state, rt.api, rt.ctx, true);
      },
      complete: function (result) {
        if (rt.status !== 'playing') return;
        result = result || {};
        if (rt.guided && result.ruin) result = Object.assign({}, result, { ruin: null }); // no ruins while guided
        rt.status = 'complete';
        rt._clearTimers();
        if (result.line) rt.api.say(result.line, result.mood || 'defeated');
        var stars = SCORING.stars(rt.stats.actions, rt.stats.hints, rt.def.par, rt.ctx.difficulty, rt.stats.fails, rt.guided);
        rt.result = {
          level: rt.def.num,
          stars: stars,
          actions: rt.stats.actions,
          hints: rt.stats.hints,
          fails: rt.stats.fails,
          par: rt.def.par,
          defies: rt.defies,
          choices: Object.assign({}, rt.choices),
          ending: result.ending || null,
          ruin: result.ruin || null,
          difficulty: rt.ctx.difficulty || 'medium',
          guided: !!rt.guided,
          line: rt.line
        };
        if (rt.hooks.onComplete) rt.hooks.onComplete(rt.result, rt);
      }
    };
  };

  /** opts.guided: this attempt is played with "Show me how" (1★ max). */
  LevelRuntime.prototype.start = function (opts) {
    this.guided = !!(opts && opts.guided);
    this._clearTimers();
    this._resetStats();
    this.status = 'playing';
    this.result = null;
    this.state = this.def.init(this.ctx);
    this.overlay = this.def.overlay || null;
    var intro = typeof this.def.intro === 'function' ? this.def.intro(this.ctx) : this.def.intro;
    var aside = this.ctx.costumeAside && !this.def.silent ? this.ctx.costumeAside + ' ' : '';
    this.api.say(intro ? aside + intro : '…', this.def.introMood || 'neutral');
    if (this.def.onStart) this.def.onStart(this.state, this.api, this.ctx, false);
    this._emit();
    return this;
  };

  /** Restart = a completely fresh attempt (stats reset too). */
  LevelRuntime.prototype.restart = function (opts) { return this.start(opts); };

  LevelRuntime.prototype.destroy = function () {
    this._clearTimers();
    this.status = 'destroyed';
  };

  LevelRuntime.prototype.objects = function () {
    if (!this.state) return [];
    return this.def.view(this.state, this.ctx) || [];
  };

  LevelRuntime.prototype.findObject = function (id) {
    var list = this.objects();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  };

  /**
   * Process one player action. Returns true when the action was accepted.
   * Ignores input once the level is complete (prevents double completion / rewards).
   */
  LevelRuntime.prototype.dispatch = function (action) {
    if (this.status !== 'playing' || !action || !action.target) return false;
    var obj = action.target === 'narrator' ? { id: 'narrator', free: true } : this.findObject(action.target);
    if (!obj || obj.hidden || obj.disabled) return false;
    if (action.type === 'holdstart') {
      this.holds[action.target] = this.clock.now();
    }
    if (action.type === 'holdend') {
      var started = this.holds[action.target];
      if (started === undefined) return false; // unmatched release
      delete this.holds[action.target];
      if (action.ms === undefined) action.ms = this.clock.now() - started;
    }
    var counts = !obj.free && (action.type === 'tap' || action.type === 'drop' ||
      (action.type === 'holdstart' && !obj.freeHold));
    if (counts) this.stats.actions++;
    var handled = false;
    this.currentTarget = action.target;
    try {
      handled = this.def.on(action, this.state, this.api, this.ctx);
    } catch (e) {
      if (root.console) root.console.error('Level handler error', this.def.id, e);
    }
    this.currentTarget = null;
    if (!handled && action.target === 'narrator' && action.type === 'tap') this._defaultPoke();
    this._emit();
    return true;
  };

  LevelRuntime.prototype._defaultPoke = function () {
    var pool = OBEY.NARRATOR.pokes;
    var p = pool[this.pokeIndex % pool.length];
    this.pokeIndex++;
    this.api.say(p[0], p[1]);
  };

  LevelRuntime.prototype.hintLimit = function () { return Math.min(this.def.hints.length, SCORING.hintLimit(this.ctx.difficulty)); };

  /** Returns the next hint tier (1..limit). Never touches level state. */
  LevelRuntime.prototype.hint = function () {
    if (this.status !== 'playing') return null;
    var limit = this.hintLimit();
    var i = Math.min(this.hintIndex, limit - 1);
    if (this.hintIndex < limit) {
      this.hintIndex++;
      this.stats.hints = this.hintIndex;
    }
    this._emit();
    return { tier: i + 1, text: this.def.hints[i], total: limit };
  };

  OBEY.LevelRuntime = LevelRuntime;

  /** Deterministic fake clock for tests (also usable for headless simulation). */
  OBEY.createFakeClock = function () {
    var t = 0, seq = 1, tasks = [];
    function add(fn, ms, every) { var id = seq++; tasks.push({ id: id, at: t + ms, fn: fn, every: every ? ms : 0 }); return id; }
    function remove(id) { tasks = tasks.filter(function (x) { return x.id !== id; }); }
    return {
      now: function () { return t; },
      setTimeout: function (f, ms) { return add(f, ms, false); },
      clearTimeout: remove,
      setInterval: function (f, ms) { return add(f, ms, true); },
      clearInterval: remove,
      advance: function (ms) {
        var end = t + ms;
        for (;;) {
          var due = tasks.filter(function (x) { return x.at <= end; }).sort(function (a, b) { return a.at - b.at || a.id - b.id; })[0];
          if (!due) break;
          t = due.at;
          if (due.every) due.at += due.every; else remove(due.id);
          due.fn();
        }
        t = end;
      },
      pending: function () { return tasks.length; }
    };
  };
})(typeof window !== 'undefined' ? window : globalThis);
