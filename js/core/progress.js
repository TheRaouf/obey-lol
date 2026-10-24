/* OBEY? LOL. — campaign progression rules. Pure functions that mutate a save object
 * and return a list of events describing what changed (for UI feedback).
 * All rewards are idempotent: repeating an action can never award something twice. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var U = OBEY.util;
  var L = OBEY.LEVEL_COUNT;

  var P = {};

  P.isCompleted = function (s, n) { return s.completed.indexOf(n) >= 0; };
  P.totalStars = function (s) { return OBEY.save.sumStars(s.bestStars); };
  P.canPlay = function (s, n) { return Number.isInteger(n) && n >= 1 && n <= L && n <= s.highestUnlocked; };
  P.hasProgress = function (s) { return s.completed.length > 0 || s.secrets.length > 0; };

  /** The level "Continue" should open: the first unlocked, uncompleted level, or null if all done. */
  P.nextLevel = function (s) {
    for (var n = 1; n <= s.highestUnlocked; n++) if (!P.isCompleted(s, n)) return n;
    return null;
  };

  P.unlockMet = function (s, rule) {
    switch (rule.type) {
      case 'default': return true;
      case 'level': return P.isCompleted(s, rule.value);
      case 'secrets': return s.secrets.length >= rule.value;
      case 'stars': return P.totalStars(s) >= rule.value;
      default: return false;
    }
  };

  P.achievementMet = function (s, a) {
    var pr = a.progress(s, P);
    return pr[0] >= pr[1];
  };

  /** Grants every cosmetic unlock / achievement whose condition is now satisfied. */
  P.evaluate = function (s) {
    var ev = [];
    OBEY.COSTUMES.forEach(function (c) {
      if (s.costumes.unlocked.indexOf(c.id) < 0 && P.unlockMet(s, c.unlock)) {
        s.costumes.unlocked.push(c.id);
        ev.push({ type: 'costume', id: c.id });
      }
    });
    OBEY.THEMES.forEach(function (t) {
      if (s.themes.unlocked.indexOf(t.id) < 0 && P.unlockMet(s, t.unlock)) {
        s.themes.unlocked.push(t.id);
        ev.push({ type: 'theme', id: t.id });
      }
    });
    OBEY.ACHIEVEMENTS.forEach(function (a) {
      if (!s.achievements[a.id] && P.achievementMet(s, a)) {
        s.achievements[a.id] = Date.now();
        ev.push({ type: 'achievement', id: a.id });
      }
    });
    return ev;
  };

  /**
   * Records a finished level. result = { stars, choices, defies, hints }.
   * Returns events, or null if the level is not playable (locked).
   */
  P.completeLevel = function (s, n, result) {
    if (!P.canPlay(s, n)) return null;
    result = result || {};
    var stars = U.clamp(Math.floor(Number(result.stars) || 1), 1, 3);
    var firstTime = !P.isCompleted(s, n);
    var prev = s.bestStars[n] || 0;
    if (firstTime) { s.completed.push(n); s.completed.sort(function (a, b) { return a - b; }); }
    s.bestStars[n] = Math.max(prev, stars);
    s.totalStars = P.totalStars(s);
    if (n < L) s.highestUnlocked = Math.max(s.highestUnlocked, n + 1);
    if (U.isObj(result.choices)) {
      Object.keys(result.choices).forEach(function (k) {
        var v = result.choices[k];
        if (OBEY.CHOICES[k] && OBEY.CHOICES[k][v]) s.choices[k] = v;
      });
    }
    s.stats.defiance += Math.max(0, Math.floor(Number(result.defies) || 0));
    s.stats.hintsUsed += Math.max(0, Math.floor(Number(result.hints) || 0));
    s.stats.levelsFinished += 1;
    var ev = [{ type: 'level', n: n, stars: stars, best: s.bestStars[n], improved: stars > prev && !firstTime, firstTime: firstTime }];
    return ev.concat(P.evaluate(s));
  };

  /** Records a secret exactly once. Unknown ids are ignored. */
  P.discoverSecret = function (s, id) {
    if (OBEY.SECRET_IDS.indexOf(id) < 0) return [];
    if (s.secrets.indexOf(id) >= 0) return [];
    s.secrets.push(id);
    return [{ type: 'secret', id: id, count: s.secrets.length }].concat(P.evaluate(s));
  };

  P.endingAllowed = function (s, id) {
    if (OBEY.ENDING_IDS.indexOf(id) < 0) return false;
    if (!P.isCompleted(s, L)) return false;
    if (id === 'secret' && s.secrets.length < OBEY.SECRETS.length) return false;
    return true;
  };

  /** Records an ending after Level 16 was completed. Returns events or null if not allowed. */
  P.recordEnding = function (s, id) {
    if (!P.endingAllowed(s, id)) return null;
    var first = s.endings.seen.indexOf(id) < 0;
    if (first) s.endings.seen.push(id);
    s.endings.history.push({ id: id, at: Date.now() });
    if (s.endings.history.length > 50) s.endings.history = s.endings.history.slice(-50);
    return [{ type: 'ending', id: id, firstTime: first }].concat(P.evaluate(s));
  };

  P.selectCostume = function (s, id) {
    if (s.costumes.unlocked.indexOf(id) < 0) return null;
    s.costumes.selected = id;
    if (s.costumes.worn.indexOf(id) < 0) s.costumes.worn.push(id);
    return P.evaluate(s);
  };

  P.selectTheme = function (s, id) {
    if (s.themes.unlocked.indexOf(id) < 0) return null;
    s.themes.selected = id;
    return [];
  };

  /** Hero-vs-chaos lean of the player's recorded choices: positive = hero. */
  P.karma = function (s) {
    var k = 0;
    Object.keys(s.choices).forEach(function (key) {
      var lean = OBEY.CHOICES[key] && OBEY.CHOICES[key][s.choices[key]];
      if (lean === 'hero') k++; else if (lean === 'chaos') k--;
    });
    return k;
  };

  /**
   * New Game: restarts the campaign (levels, stars, secrets, choices, campaign stats).
   * Keeps achievements, unlocked/selected cosmetics, ending history, tutorial flag and settings.
   */
  P.newGame = function (s) {
    var fresh = OBEY.save.defaults();
    fresh.costumes = U.clone(s.costumes);
    fresh.themes = U.clone(s.themes);
    fresh.achievements = U.clone(s.achievements);
    fresh.endings = U.clone(s.endings);
    fresh.tutorialDone = s.tutorialDone;
    fresh.settings = U.clone(s.settings);
    fresh.stats.hintsUsed = s.stats.hintsUsed;
    return fresh;
  };

  /** Reset everything except settings. */
  P.resetAll = function (s) {
    var fresh = OBEY.save.defaults();
    fresh.settings = U.clone(s.settings);
    return fresh;
  };

  OBEY.progress = P;
})(typeof window !== 'undefined' ? window : globalThis);
