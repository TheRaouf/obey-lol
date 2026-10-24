/* OBEY? LOL. — versioned save schema, validation, migration and storage adapter.
 *
 * Schema v7 (current, game 2.4.1) = v6 with music on by default (v6 saves have music switched on once).
 * Schema v6 (game 2.4) = v5 with 236 levels: the Final Factory moves again, 133–136 -> 233–236.
 * Schema v5 (game 2.2–2.3) = v4 with 136 levels: the old Levels 33–36 (Final Factory) become
 *   133–136 and the bonus levels 101–104 become 1001–1004, in every field that holds a level number.
 * Schema v4 (game 2.1) = v3 plus: intern, profileName, skipped, ruins, jigsaw, bestActions,
 *   bestTime, daily {last, streak, best, done, badges}, counters {...}, bonus {completed, bestStars},
 *   seenVersion, and more settings (haptics, contrast, font, holdAssist, captions, hand, volumes,
 *   music, timer and two joke settings). v3 saves gain the defaults.
 * Schema v3 (game 2.0 — 36 levels):
 * {
 *   version: 3,
 *   highestUnlocked: 1..36,                // furthest level reached by playing in order
 *   completed: [levelNum...],             // unique, sorted
 *   bestStars: { "1": 1..3, ... },         // only for completed levels
 *   totalStars: number,                    // derived, kept in sync on every write
 *   secrets: [secretId...],                // unique, valid ids only
 *   costumes: { unlocked: [id], selected: id, worn: [id] },
 *   themes:   { unlocked: [id], selected: id },
 *   achievements: { id: timestampMs },
 *   endings: { seen: [endingId], history: [{ id, at }] },
 *   tutorialDone: boolean,
 *   choices: { gift, rule, sign, trust },  // optional string values, see OBEY.CHOICES
 *   difficulty: 'easy'|'medium'|'hard',   // current difficulty
 *   bestDifficulty: { "1": 'easy'|'medium'|'hard' },  // hardest difficulty each level was finished on
 *   trophies: { trophyId: tierRank 1..4 },
 *   stats: { defiance, hintsUsed, levelsFinished, fails, noHint: [n], flawless: [n] },
 *   settings: { sound: bool, voice: 'babble'|'speech'|'off', motion: 'system'|'reduce'|'full', textSize: 'normal'|'large' }
 * }
 * Schema v2 (game 1.x — 16 levels) is migrated: its Levels 15–16 (the finale) become 35–36,
 * every finished level counts as finished on Medium, and new fields get defaults.
 * Schema v1 (legacy, pre-release prototype format) is migrated automatically:
 * { version: 1, level, stars: {n: stars}, secretsFound: [...], sound }
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var U = OBEY.util;

  var SAVE = {};
  SAVE.KEY = 'obeylol.save';
  SAVE.BACKUP_KEY = 'obeylol.save.corrupt';
  SAVE.SCHEMA = 7;
  /** Profile slots: slot 1 keeps the original key so older saves stay where they were. */
  SAVE.PROFILES = 3;
  SAVE.keyFor = function (slot) { return slot > 1 ? SAVE.KEY + '.p' + slot : SAVE.KEY; };
  SAVE.ACTIVE_KEY = 'obeylol.activeProfile';

  SAVE.defaultSettings = function () {
    return {
      sound: true, voice: 'babble', motion: 'system', textSize: 'normal',
      haptics: true, contrast: 'normal', font: 'fun', holdAssist: false, captions: false, hand: 'right',
      sfxVol: 80, voiceVol: 80, music: true, musicVol: 40, timer: false, honesty: 50, facade: true
    };
  };

  SAVE.defaultDaily = function () { return { last: '', streak: 0, best: 0, done: [], badges: [], practice: null }; };
  SAVE.defaultCounters = function () {
    return { pokes: 0, settingsOpens: 0, creditsViews: 0, awayDays: 0, lastSeen: 0, tuesday: false, nightOwl: false,
      playMs: 0, undoMet: false, chats: [], roasted: [], cards: [], fakeOver: false, phoneCalls: 0 };
  };

  SAVE.defaults = function () {
    return {
      version: SAVE.SCHEMA,
      highestUnlocked: 1,
      completed: [],
      bestStars: {},
      totalStars: 0,
      secrets: [],
      costumes: { unlocked: ['classic'], selected: 'classic', worn: ['classic'] },
      themes: { unlocked: ['classic'], selected: 'classic' },
      achievements: {},
      endings: { seen: [], history: [] },
      tutorialDone: false,
      choices: {},
      difficulty: 'medium',
      bestDifficulty: {},
      trophies: {},
      stats: { defiance: 0, hintsUsed: 0, levelsFinished: 0, fails: 0, noHint: [], flawless: [] },
      intern: 0,
      profileName: '',
      skipped: [],
      ruins: [],
      jigsaw: [],
      bestActions: {},
      bestTime: {},
      clean: [],
      daily: SAVE.defaultDaily(),
      counters: SAVE.defaultCounters(),
      bonus: { completed: [], bestStars: {} },
      seenVersion: '',
      settings: SAVE.defaultSettings()
    };
  };

  function intIn(v, lo, hi, dflt) {
    var n = Number(v);
    if (!Number.isFinite(n)) return dflt;
    n = Math.floor(n);
    return (n < lo || n > hi) ? dflt : n;
  }
  function idList(v, valid) {
    if (!Array.isArray(v)) return [];
    return U.uniq(v.filter(function (x) { return typeof x === 'string' && valid.indexOf(x) >= 0; }));
  }
  function ids(list) { return list.map(function (x) { return x.id; }); }

  /** v1/v2 (16-level campaign) level number -> v3 (36-level campaign) level number. */
  SAVE.renumberV2 = function (n) { n = Number(n); return n === 15 ? 35 : (n === 16 ? 36 : n); };

  /** v4 (2.1, 36 levels + bonus 101–104) level number -> v5 (2.2, 136 levels + bonus 1001–1004).
   *  The Final Factory (33–36) moves to 133–136 so the 100 new levels sit before the finale. */
  SAVE.renumberV4 = function (n) {
    n = Number(n);
    if (n >= 33 && n <= 36) return n + 100;
    if (n >= 101 && n <= 104) return n + 900;
    return n;
  };
  SAVE.migrateV4 = function (obj) { return renumberSave(obj, SAVE.renumberV4, 33, 5); };
  /** v5 (2.2–2.3, 136 levels) -> v6 (2.4, 236 levels): the Final Factory moves again, 133–136 -> 233–236. */
  SAVE.renumberV5 = function (n) { n = Number(n); return n >= 133 && n <= 136 ? n + 100 : n; };
  SAVE.migrateV5 = function (obj) { return renumberSave(obj, SAVE.renumberV5, 133, 6); };
  function renumberSave(obj, R, resumeAt, version) {
    var o = U.clone(obj);
    function list(a) { return Array.isArray(a) ? a.map(R) : a; }
    function keys(m) { if (!U.isObj(m)) return m; var out = {}; Object.keys(m).forEach(function (k) { out[R(k)] = m[k]; }); return out; }
    o.completed = list(o.completed);
    o.skipped = list(o.skipped);
    o.clean = list(o.clean);
    o.bestStars = keys(o.bestStars);
    o.bestDifficulty = keys(o.bestDifficulty);
    o.bestActions = keys(o.bestActions);
    o.bestTime = keys(o.bestTime);
    if (U.isObj(o.stats)) { o.stats.noHint = list(o.stats.noHint); o.stats.flawless = list(o.stats.flawless); }
    if (U.isObj(o.bonus)) { o.bonus.completed = list(o.bonus.completed); o.bonus.bestStars = keys(o.bonus.bestStars); }
    if (U.isObj(o.daily) && U.isObj(o.daily.practice)) o.daily.practice.n = R(o.daily.practice.n);
    // Anyone who had reached the old finale continues with the first new level.
    var h = Number(o.highestUnlocked) || 1;
    o.highestUnlocked = h >= resumeAt ? resumeAt : h;
    o.version = version;
    return o;
  }

  /** Converts an older schema object into the current schema shape (not yet validated). */
  SAVE.migrate = function (obj) {
    if (!U.isObj(obj)) return SAVE.defaults();
    var v = Number(obj.version) || 1;
    var from = v;
    if (v === 1) {
      var d = SAVE.defaults();
      var stars = U.isObj(obj.stars) ? obj.stars : {};
      var completed = Object.keys(stars).map(Number).filter(function (n) { return n >= 1 && n <= 16; });
      d.completed = completed;
      completed.forEach(function (n) { d.bestStars[n] = stars[n]; });
      d.highestUnlocked = obj.level;
      d.secrets = obj.secretsFound;
      if (typeof obj.sound === 'boolean') d.settings.sound = obj.sound;
      d.tutorialDone = completed.length > 0;
      obj = d; v = 2;
    }
    if (v === 2) {
      var o = U.clone(obj);
      var R = SAVE.renumberV2;
      var done = Array.isArray(o.completed) ? o.completed.map(R) : [];
      var stars2 = {};
      if (U.isObj(o.bestStars)) Object.keys(o.bestStars).forEach(function (k) { stars2[R(k)] = o.bestStars[k]; });
      o.completed = done;
      o.bestStars = stars2;
      o.bestDifficulty = {};
      done.forEach(function (n) { o.bestDifficulty[n] = 'medium'; });
      // Unlock exactly up to the first new level after the contiguous run of finished levels.
      var c = 0;
      while (done.indexOf(c + 1) >= 0) c++;
      o.highestUnlocked = Math.max(c + 1, Math.min(Number(o.highestUnlocked) || 1, 14));
      o.difficulty = 'medium';
      o.trophies = {};
      o.version = 3;
      obj = o; v = 3;
    }
    if (v === 3) { obj = U.clone(obj); obj.version = 4; v = 4; }
    if (v === 4) { obj = SAVE.migrateV4(obj); v = 5; }
    if (v === 5) { obj = SAVE.migrateV5(obj); v = 6; }
    // v6 -> v7 (2.4.1): music is on by default. Earlier saves stored the old default (off), so switch it
    // on once; players can still turn it off in Settings. Sound, voice and volumes keep the player's choice.
    if (v === 6) { obj = U.clone(obj); if (U.isObj(obj.settings)) obj.settings.music = true; obj.version = 7; v = 7; }
    if (from < SAVE.SCHEMA) obj.migratedFrom = from;
    return obj;
  };

  /** Returns a fully valid save object, repairing anything malformed. Never throws. */
  SAVE.validate = function (raw) {
    var d = SAVE.defaults();
    if (!U.isObj(raw)) return d;
    var out = d;
    var L = OBEY.LEVEL_COUNT;

    out.completed = Array.isArray(raw.completed)
      ? U.uniq(raw.completed.map(Number).filter(function (n) { return Number.isInteger(n) && n >= 1 && n <= L; })).sort(function (a, b) { return a - b; })
      : [];
    var maxDone = out.completed.length ? out.completed[out.completed.length - 1] : 0;
    out.highestUnlocked = intIn(raw.highestUnlocked, 1, L, 1);
    // Unlocks must be consistent with completions: you can always play the level after the
    // unbroken run of finished levels starting at Level 1.
    // Skipped levels (2.1) count as passed for unlocking, but never as completed.
    out.skipped = Array.isArray(raw.skipped)
      ? U.uniq(raw.skipped.map(Number).filter(function (n) { return Number.isInteger(n) && n >= 1 && n < L && out.completed.indexOf(n) < 0; })).sort(function (a, b) { return a - b; })
      : [];
    out.skipped = out.skipped.slice(0, 3); // at most 3 open skips, even in hand-edited saves
    var run = 0;
    while (out.completed.indexOf(run + 1) >= 0 || out.skipped.indexOf(run + 1) >= 0) run++;
    out.highestUnlocked = Math.max(out.highestUnlocked, Math.min(L, run + 1));
    void maxDone;

    out.bestStars = {};
    var bs = U.isObj(raw.bestStars) ? raw.bestStars : {};
    out.completed.forEach(function (n) {
      var v = Number(bs[n]);
      out.bestStars[n] = Number.isFinite(v) ? U.clamp(Math.floor(v), 1, 3) : 1;
    });
    out.totalStars = SAVE.sumStars(out.bestStars);

    out.secrets = idList(raw.secrets, OBEY.SECRET_IDS);

    var cos = U.isObj(raw.costumes) ? raw.costumes : {};
    var cIds = ids(OBEY.COSTUMES);
    out.costumes.unlocked = U.uniq(['classic'].concat(idList(cos.unlocked, cIds)));
    out.costumes.selected = (out.costumes.unlocked.indexOf(cos.selected) >= 0) ? cos.selected : 'classic';
    out.costumes.worn = U.uniq(['classic', out.costumes.selected].concat(idList(cos.worn, out.costumes.unlocked)));

    var th = U.isObj(raw.themes) ? raw.themes : {};
    var tIds = ids(OBEY.THEMES);
    out.themes.unlocked = U.uniq(['classic'].concat(idList(th.unlocked, tIds)));
    out.themes.selected = (out.themes.unlocked.indexOf(th.selected) >= 0) ? th.selected : 'classic';

    out.achievements = {};
    if (U.isObj(raw.achievements)) {
      OBEY.ACHIEVEMENT_IDS.forEach(function (id) {
        var t = Number(raw.achievements[id]);
        if (Number.isFinite(t) && t > 0) out.achievements[id] = t;
      });
    }

    var en = U.isObj(raw.endings) ? raw.endings : {};
    out.endings.seen = idList(en.seen, OBEY.ENDING_IDS);
    out.endings.history = Array.isArray(en.history)
      ? en.history.filter(function (h) { return U.isObj(h) && OBEY.ENDING_IDS.indexOf(h.id) >= 0; })
        .slice(-50).map(function (h) { return { id: h.id, at: Number(h.at) || 0 }; })
      : [];
    // Every history entry must also be in the gallery of seen endings.
    out.endings.history.forEach(function (h) { if (out.endings.seen.indexOf(h.id) < 0) out.endings.seen.push(h.id); });

    out.tutorialDone = raw.tutorialDone === true;

    out.choices = {};
    var ch = U.isObj(raw.choices) ? raw.choices : {};
    Object.keys(OBEY.CHOICES).forEach(function (k) {
      if (typeof ch[k] === 'string' && OBEY.CHOICES[k][ch[k]]) out.choices[k] = ch[k];
    });

    out.difficulty = OBEY.DIFFICULTY_IDS.indexOf(raw.difficulty) >= 0 ? raw.difficulty : 'medium';
    out.bestDifficulty = {};
    var bd = U.isObj(raw.bestDifficulty) ? raw.bestDifficulty : {};
    out.completed.forEach(function (n) { out.bestDifficulty[n] = OBEY.DIFFICULTY_IDS.indexOf(bd[n]) >= 0 ? bd[n] : 'medium'; });
    out.trophies = {};
    if (U.isObj(raw.trophies)) {
      OBEY.TROPHY_IDS.forEach(function (id) { var t = intIn(raw.trophies[id], 1, 4, 0); if (t) out.trophies[id] = t; });
    }

    var st = U.isObj(raw.stats) ? raw.stats : {};
    var lvList = function (v) { return Array.isArray(v) ? U.uniq(v.map(Number).filter(function (n) { return Number.isInteger(n) && n >= 1 && n <= L; })) : []; };
    out.stats = {
      defiance: intIn(st.defiance, 0, 1e6, 0),
      hintsUsed: intIn(st.hintsUsed, 0, 1e6, 0),
      levelsFinished: intIn(st.levelsFinished, 0, 1e7, 0),
      fails: intIn(st.fails, 0, 1e7, 0),
      noHint: lvList(st.noHint),
      flawless: lvList(st.flawless)
    };

    out.intern = intIn(raw.intern, 10, 99, 0);
    out.profileName = typeof raw.profileName === 'string' ? raw.profileName.replace(/[\u0000-\u001f]/g, '').trim().slice(0, 20) : '';
    var ruinIds = OBEY.extras ? OBEY.extras.RUIN_IDS : [];
    out.ruins = idList(raw.ruins, ruinIds);
    out.jigsaw = idList(raw.jigsaw, OBEY.extras ? OBEY.extras.JIGSAW_IDS : []);
    var numMap = function (v, lo, hi, keys) {
      var o = {};
      if (!U.isObj(v)) return o;
      keys.forEach(function (n) { var x = intIn(v[n], lo, hi, -1); if (x >= 0) o[n] = x; });
      return o;
    };
    var bonusNums = [];
    for (var b = 1; b <= OBEY.BONUS_COUNT; b++) bonusNums.push(OBEY.BONUS_BASE + b);
    var bon = U.isObj(raw.bonus) ? raw.bonus : {};
    out.bonus = { completed: Array.isArray(bon.completed) ? U.uniq(bon.completed.map(Number).filter(function (n) { return bonusNums.indexOf(n) >= 0; })).sort(function (a, c) { return a - c; }) : [], bestStars: {} };
    out.bonus.completed.forEach(function (n) { var v = Number(U.isObj(bon.bestStars) ? bon.bestStars[n] : NaN); out.bonus.bestStars[n] = Number.isFinite(v) ? U.clamp(Math.floor(v), 1, 3) : 1; });
    var doneNums = out.completed.concat(out.bonus.completed);
    // Levels finished at least once the proper way (not ruined, not guided).
    out.clean = Array.isArray(raw.clean) ? U.uniq(raw.clean.map(Number).filter(function (n) { return doneNums.indexOf(n) >= 0; })) : [];
    out.bestActions = numMap(raw.bestActions, 0, 100000, doneNums);
    out.bestTime = numMap(raw.bestTime, 0, 86400000, doneNums);
    var dy = U.isObj(raw.daily) ? raw.daily : {};
    var keyRe = { test: function (k) {
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(k);
      if (!m) return false;
      var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
      return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3];
    } };
    out.daily = {
      last: typeof dy.last === 'string' && keyRe.test(dy.last) ? dy.last : '',
      streak: intIn(dy.streak, 0, 100000, 0),
      best: intIn(dy.best, 0, 100000, 0),
      done: Array.isArray(dy.done) ? U.uniq(dy.done.filter(function (k) { return typeof k === 'string' && keyRe.test(k); })).slice(-400) : [],
      badges: Array.isArray(dy.badges) ? U.uniq(dy.badges.map(Number).filter(function (n) { return [3, 7, 30].indexOf(n) >= 0; })) : [],
      practice: U.isObj(dy.practice) && keyRe.test(dy.practice.key) && Number.isInteger(dy.practice.n) && dy.practice.n >= 1 && dy.practice.n <= OBEY.LEVEL_COUNT ? { key: dy.practice.key, n: dy.practice.n } : null
    };
    out.daily.best = Math.max(out.daily.best, out.daily.streak);
    var ct = U.isObj(raw.counters) ? raw.counters : {};
    var chIds = OBEY.CHAPTERS.map(function (c) { return c.id; });
    out.counters = {
      pokes: intIn(ct.pokes, 0, 1e7, 0),
      settingsOpens: intIn(ct.settingsOpens, 0, 1e7, 0),
      creditsViews: intIn(ct.creditsViews, 0, 1e7, 0),
      awayDays: intIn(ct.awayDays, 0, 1e5, 0),
      lastSeen: intIn(ct.lastSeen, 0, 9e15, 0),
      tuesday: ct.tuesday === true,
      nightOwl: ct.nightOwl === true,
      playMs: intIn(ct.playMs, 0, 9e15, 0),
      undoMet: ct.undoMet === true,
      chats: idList(ct.chats, chIds),
      roasted: idList(ct.roasted, chIds),
      cards: idList(ct.cards, chIds),
      fakeOver: ct.fakeOver === true,
      phoneCalls: intIn(ct.phoneCalls, 0, 1e7, 0)
    };
    out.seenVersion = typeof raw.seenVersion === 'string' && /^\d+\.\d+\.\d+$/.test(raw.seenVersion) ? raw.seenVersion : '';

    var se = U.isObj(raw.settings) ? raw.settings : {};
    var one = function (v, list, d) { return list.indexOf(v) >= 0 ? v : d; };
    var bool = function (v, d) { return typeof v === 'boolean' ? v : d; };
    out.settings = {
      sound: bool(se.sound, true),
      voice: one(se.voice, ['babble', 'speech', 'off'], 'babble'),
      motion: one(se.motion, ['system', 'reduce', 'full'], 'system'),
      textSize: one(se.textSize, ['normal', 'large', 'xl'], 'normal'),
      haptics: bool(se.haptics, true),
      contrast: one(se.contrast, ['normal', 'high'], 'normal'),
      font: one(se.font, ['fun', 'plain'], 'fun'),
      holdAssist: bool(se.holdAssist, false),
      captions: bool(se.captions, false),
      hand: one(se.hand, ['right', 'left'], 'right'),
      sfxVol: intIn(se.sfxVol, 0, 100, 80),
      voiceVol: intIn(se.voiceVol, 0, 100, 80),
      music: bool(se.music, true),
      musicVol: intIn(se.musicVol, 0, 100, 40),
      timer: bool(se.timer, false),
      honesty: intIn(se.honesty, 0, 100, 50),
      facade: bool(se.facade, true)
    };
    return out;
  };

  SAVE.sumStars = function (bestStars) {
    var t = 0;
    for (var k in bestStars) if (Object.prototype.hasOwnProperty.call(bestStars, k)) t += bestStars[k];
    return t;
  };

  /** Parse a stored string into {data, status} where status is 'new'|'ok'|'migrated'|'recovered'. */
  SAVE.parse = function (str) {
    if (str === null || str === undefined || str === '') return { data: SAVE.defaults(), status: 'new' };
    var obj;
    try { obj = JSON.parse(str); } catch (e) { return { data: SAVE.defaults(), status: 'recovered' }; }
    if (!U.isObj(obj)) return { data: SAVE.defaults(), status: 'recovered' };
    var migrated = SAVE.migrate(obj);
    var data = SAVE.validate(migrated);
    return { data: data, status: migrated.migratedFrom ? 'migrated' : 'ok' };
  };

  /**
   * Storage adapter. Uses the given Web Storage object if it actually works, otherwise an
   * in-memory map (progress then lasts only for this page session). Never throws.
   */
  // In-memory fallback is shared by every store, so switching profiles never loses progress
  // when the browser blocks storage.
  var MEMORY = typeof WeakMap === 'function' ? new WeakMap() : null;
  var NO_STORAGE_MEMORY = {};
  function memoryFor(storage) {
    if (!storage || !MEMORY || (typeof storage !== 'object' && typeof storage !== 'function')) return storage ? {} : NO_STORAGE_MEMORY;
    if (!MEMORY.has(storage)) MEMORY.set(storage, {});
    return MEMORY.get(storage);
  }
  SAVE.createStore = function (storage, key) {
    key = key || SAVE.KEY;
    var memory = memoryFor(storage);
    var persistent = false;
    if (storage) {
      try {
        var probe = '__obeylol_probe__';
        storage.setItem(probe, '1');
        persistent = storage.getItem(probe) === '1';
        storage.removeItem(probe);
      } catch (e) { persistent = false; }
    }
    var store = {
      key: key,
      persistent: persistent,
      /** Reads another key without changing this store (used for profile summaries). */
      peek: function (k) { var raw = store.read(k); return raw ? SAVE.parse(raw).data : null; },
      lastError: null,
      read: function (key) {
        if (persistent) {
          try { return storage.getItem(key); } catch (e) { store.lastError = String(e); return memory[key] !== undefined ? memory[key] : null; }
        }
        return memory[key] !== undefined ? memory[key] : null;
      },
      write: function (key, value) {
        memory[key] = value;
        if (!persistent) return false;
        try { storage.setItem(key, value); return true; } catch (e) { store.lastError = String(e); return false; }
      },
      remove: function (key) {
        delete memory[key];
        if (!persistent) return;
        try { storage.removeItem(key); } catch (e) { store.lastError = String(e); }
      },
      load: function () {
        var raw = store.read(key);
        var res = SAVE.parse(raw);
        if (res.status === 'recovered') store.write(key === SAVE.KEY ? SAVE.BACKUP_KEY : key + '.corrupt', String(raw));
        if (res.status === 'migrated') store.save(res.data);
        return res;
      },
      save: function (data) {
        data.totalStars = SAVE.sumStars(data.bestStars);
        data.version = SAVE.SCHEMA;
        var copy = U.clone(data);
        delete copy.migratedFrom;
        return store.write(key, JSON.stringify(copy));
      }
    };
    return store;
  };

  OBEY.save = SAVE;
})(typeof window !== 'undefined' ? window : globalThis);
