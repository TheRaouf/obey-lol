/* OBEY? LOL. — namespace and small shared helpers.
 * Classic (non-module) scripts are used on purpose so the game runs from file://
 * without a server. Every file attaches to the single global `OBEY` namespace.
 * Core files (js/core, js/levels) never touch the DOM, so they also load in Node tests. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY || (root.OBEY = {});

  OBEY.VERSION = '2.3.0';
  OBEY.LEVEL_COUNT = 136;
  /** Bonus levels (the Sabotage Studio pack) use numbers 1001..1000+BONUS_COUNT (Bonus 1 = 1001). */
  OBEY.BONUS_BASE = 1000;
  OBEY.BONUS_COUNT = 4;
  OBEY.isBonus = function (n) { return Number.isInteger(n) && n > OBEY.BONUS_BASE && n <= OBEY.BONUS_BASE + OBEY.BONUS_COUNT; };

  OBEY.util = {
    clamp: function (n, lo, hi) { return Math.max(lo, Math.min(hi, n)); },
    uniq: function (arr) { return Array.from(new Set(arr)); },
    clone: function (o) { return JSON.parse(JSON.stringify(o)); },
    isObj: function (o) { return o !== null && typeof o === 'object' && !Array.isArray(o); },
    escape: function (s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }
  };

  /** Ordered list of level definitions, index = num - 1. */
  OBEY.levels = OBEY.levels || [];

  var REQUIRED = ['id', 'num', 'title', 'objective', 'intro', 'par', 'hints', 'init', 'view', 'on', 'done'];

  OBEY.registerLevel = function (def) {
    REQUIRED.forEach(function (k) {
      if (def[k] === undefined) throw new Error('Level ' + (def.id || '?') + ' is missing "' + k + '"');
    });
    if (!((def.num >= 1 && def.num <= OBEY.LEVEL_COUNT) || OBEY.isBonus(def.num))) throw new Error('Bad level number ' + def.num);
    if (!Array.isArray(def.hints) || def.hints.length !== 3) throw new Error('Level ' + def.id + ' needs exactly 3 hints');
    if (OBEY.isBonus(def.num)) OBEY.bonusLevels[def.num - OBEY.BONUS_BASE - 1] = def;
    else OBEY.levels[def.num - 1] = def;
  };
  OBEY.bonusLevels = OBEY.bonusLevels || [];

  OBEY.getLevel = function (num) { return OBEY.isBonus(num) ? (OBEY.bonusLevels[num - OBEY.BONUS_BASE - 1] || null) : (OBEY.levels[num - 1] || null); };
  /** Display name: "Level 7" or "Bonus 2". */
  OBEY.levelLabel = function (num) { return OBEY.isBonus(num) ? 'Bonus ' + (num - OBEY.BONUS_BASE) : 'Level ' + num; };

  /** Builds a stage object. Positions/sizes are percentages of the square stage. */
  OBEY.obj = function (id, x, y, w, h, extra) {
    var o = { id: id, x: x, y: y, w: w, h: h };
    if (extra) for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  };
})(typeof window !== 'undefined' ? window : globalThis);
