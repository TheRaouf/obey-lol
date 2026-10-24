/* OBEY? LOL. — versioned save schema, validation, migration and storage adapter.
 *
 * Schema v2 (current):
 * {
 *   version: 2,
 *   highestUnlocked: 1..16,
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
 *   stats: { defiance, hintsUsed, levelsFinished },
 *   settings: { sound: bool, motion: 'system'|'reduce'|'full', textSize: 'normal'|'large' }
 * }
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
  SAVE.SCHEMA = 2;

  SAVE.defaultSettings = function () {
    return { sound: true, motion: 'system', textSize: 'normal' };
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
      stats: { defiance: 0, hintsUsed: 0, levelsFinished: 0 },
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

  /** Converts an older schema object into the current schema shape (not yet validated). */
  SAVE.migrate = function (obj) {
    if (!U.isObj(obj)) return SAVE.defaults();
    var v = Number(obj.version) || 1;
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
      d.migratedFrom = 1;
      return d;
    }
    // v2 or a future version: keep fields we understand; validation drops the rest.
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
    // Unlocks must be consistent with completions: you can always play one past your furthest completion.
    out.highestUnlocked = Math.max(out.highestUnlocked, Math.min(L, maxDone + 1));

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

    var st = U.isObj(raw.stats) ? raw.stats : {};
    out.stats = {
      defiance: intIn(st.defiance, 0, 1e6, 0),
      hintsUsed: intIn(st.hintsUsed, 0, 1e6, 0),
      levelsFinished: intIn(st.levelsFinished, 0, 1e7, 0)
    };

    var se = U.isObj(raw.settings) ? raw.settings : {};
    out.settings = {
      sound: typeof se.sound === 'boolean' ? se.sound : true,
      motion: ['system', 'reduce', 'full'].indexOf(se.motion) >= 0 ? se.motion : 'system',
      textSize: ['normal', 'large'].indexOf(se.textSize) >= 0 ? se.textSize : 'normal'
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
  SAVE.createStore = function (storage) {
    var memory = {};
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
      persistent: persistent,
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
        var raw = store.read(SAVE.KEY);
        var res = SAVE.parse(raw);
        if (res.status === 'recovered') store.write(SAVE.BACKUP_KEY, String(raw));
        if (res.status === 'migrated') store.save(res.data);
        return res;
      },
      save: function (data) {
        data.totalStars = SAVE.sumStars(data.bestStars);
        data.version = SAVE.SCHEMA;
        var copy = U.clone(data);
        delete copy.migratedFrom;
        return store.write(SAVE.KEY, JSON.stringify(copy));
      }
    };
    return store;
  };

  OBEY.save = SAVE;
})(typeof window !== 'undefined' ? window : globalThis);
