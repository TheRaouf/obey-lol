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
  /** A level is playable once reached in order, or if it was already finished (e.g. migrated saves). */
  P.canPlay = function (s, n) {
    if (OBEY.isBonus(n)) return P.bonusUnlocked(s);
    return Number.isInteger(n) && n >= 1 && n <= L && (n <= s.highestUnlocked || P.isCompleted(s, n));
  };
  /** The Sabotage Studio bonus pack opens after Level 12. */
  P.BONUS_UNLOCK_LEVEL = 12;
  P.bonusUnlocked = function (s) { return P.isCompleted(s, P.BONUS_UNLOCK_LEVEL); };
  P.isSkipped = function (s, n) { return (s.skipped || []).indexOf(n) >= 0; };
  P.MAX_SKIPS = 3;
  /** Can level n be skipped right now? Returns null if yes, otherwise the reason. */
  P.skipBlocker = function (s, n) {
    if (OBEY.isBonus(n)) return 'Bonus levels can\'t be skipped.';
    if (n >= L) return 'The final level can\'t be skipped.';
    if (P.isCompleted(s, n)) return 'You already finished this level.';
    if (P.isSkipped(s, n)) return 'This level is already skipped.';
    if (!P.canPlay(s, n)) return 'This level is locked.';
    if ((s.skipped || []).length >= P.MAX_SKIPS) return 'You can have at most ' + P.MAX_SKIPS + ' skipped levels at once. Finish one of them to free a skip.';
    return null;
  };
  /** "Let it be": marks a level as skipped, which unlocks the next one. */
  P.skipLevel = function (s, n) {
    if (P.skipBlocker(s, n)) return null;
    s.skipped.push(n);
    s.skipped.sort(function (a, b) { return a - b; });
    P.recomputeUnlock(s);
    return [{ type: 'skip', n: n }];
  };
  /** Unlocks the level after the unbroken run of finished or skipped levels (never skips ahead on replays). */
  P.recomputeUnlock = function (s) {
    var run = 0;
    while (P.isCompleted(s, run + 1) || P.isSkipped(s, run + 1)) run++;
    s.highestUnlocked = Math.max(s.highestUnlocked, Math.min(L, run + 1));
  };
  P.hasProgress = function (s) { return s.completed.length > 0 || s.secrets.length > 0; };

  /** The level "Continue" should open: the first unlocked, uncompleted level, or null if all done. */
  P.nextLevel = function (s) {
    for (var n = 1; n <= s.highestUnlocked; n++) if (!P.isCompleted(s, n) && !P.isSkipped(s, n)) return n;
    for (n = 1; n <= s.highestUnlocked; n++) if (!P.isCompleted(s, n)) return n; // only skipped ones left
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
    OBEY.TROPHIES.forEach(function (t) {
      var tier = P.trophyTier(s, t);
      var had = s.trophies[t.id] || 0;
      if (tier > had) {
        s.trophies[t.id] = tier;
        ev.push({ type: 'trophy', id: t.id, tier: tier, upgraded: had > 0 });
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

  /** Chapter cup metal: the lowest difficulty used across its four levels (0 = not earned). */
  P.chapterTier = function (s, chapterId) {
    var c = OBEY.CHAPTERS.filter(function (x) { return x.id === chapterId; })[0];
    if (!c) return 0;
    var tier = 3;
    for (var i = 0; i < c.levels.length; i++) {
      var n = c.levels[i];
      if (!P.isCompleted(s, n)) return 0;
      tier = Math.min(tier, OBEY.difficultyRank(s.bestDifficulty[n] || 'medium'));
    }
    return tier;
  };

  /** Current tier a trophy qualifies for (0 = not earned). */
  P.trophyTier = function (s, t) {
    if (t.kind === 'chapter') return P.chapterTier(s, t.chapter);
    var hardCount = 0;
    for (var k in s.bestDifficulty) if (s.bestDifficulty[k] === 'hard') hardCount++;
    switch (t.id) {
      case 'clean-sweep': return s.stats.noHint.length >= 10 ? t.tier : 0;
      case 'flawless': return s.stats.flawless.length >= 10 ? t.tier : 0;
      case 'hard-boiled': return hardCount >= 12 ? t.tier : 0;
      case 'good-sport': return s.stats.fails >= 25 ? t.tier : 0;
      case 'platinum-bossworth':
        return OBEY.CHAPTERS.every(function (c) { return P.chapterTier(s, c.id) === 3; }) ? t.tier : 0;
      case 'jigsaw': return (s.jigsaw || []).length >= 9 ? t.tier : 0;
      default: return 0;
    }
  };

  /** Progress toward a trophy as [current, target] for display. */
  P.trophyProgress = function (s, t) {
    if (t.kind === 'chapter') {
      var c = OBEY.CHAPTERS.filter(function (x) { return x.id === t.chapter; })[0];
      return [c.levels.filter(function (n) { return P.isCompleted(s, n); }).length, 4];
    }
    var hardCount = 0;
    for (var k in s.bestDifficulty) if (s.bestDifficulty[k] === 'hard') hardCount++;
    switch (t.id) {
      case 'clean-sweep': return [Math.min(s.stats.noHint.length, 10), 10];
      case 'flawless': return [Math.min(s.stats.flawless.length, 10), 10];
      case 'hard-boiled': return [Math.min(hardCount, 12), 12];
      case 'good-sport': return [Math.min(s.stats.fails, 25), 25];
      case 'platinum-bossworth': return [OBEY.CHAPTERS.filter(function (c) { return P.chapterTier(s, c.id) === 3; }).length, 9];
      case 'jigsaw': return [(s.jigsaw || []).length, 9];
      default: return [0, 1];
    }
  };

  P.setDifficulty = function (s, id) {
    if (OBEY.DIFFICULTY_IDS.indexOf(id) < 0) return false;
    s.difficulty = id;
    return true;
  };

  /**
   * Records a finished level. result = { stars, choices, defies, hints }.
   * Returns events, or null if the level is not playable (locked).
   */
  P.completeLevel = function (s, n, result) {
    if (!P.canPlay(s, n)) return null;
    result = result || {};
    if (OBEY.isBonus(n)) return P.completeBonus(s, n, result);
    var stars = U.clamp(Math.floor(Number(result.stars) || 1), 1, 3);
    var firstTime = !P.isCompleted(s, n);
    var prev = s.bestStars[n] || 0;
    if (firstTime) { s.completed.push(n); s.completed.sort(function (a, b) { return a - b; }); }
    s.bestStars[n] = Math.max(prev, stars);
    s.totalStars = P.totalStars(s);
    var wasSkipped = P.isSkipped(s, n);
    if (wasSkipped) s.skipped = s.skipped.filter(function (x) { return x !== n; });
    // Unlock the level after the unbroken run of finished (or skipped) levels.
    P.recomputeUnlock(s);
    if (U.isObj(result.choices)) {
      Object.keys(result.choices).forEach(function (k) {
        var v = result.choices[k];
        if (OBEY.CHOICES[k] && OBEY.CHOICES[k][v]) s.choices[k] = v;
      });
    }
    s.stats.defiance += Math.max(0, Math.floor(Number(result.defies) || 0));
    s.stats.hintsUsed += Math.max(0, Math.floor(Number(result.hints) || 0));
    s.stats.levelsFinished += 1;
    s.stats.fails += Math.max(0, Math.floor(Number(result.fails) || 0));
    var diff = OBEY.DIFFICULTY_IDS.indexOf(result.difficulty) >= 0 ? result.difficulty : (s.difficulty || 'medium');
    if (OBEY.difficultyRank(diff) > OBEY.difficultyRank(s.bestDifficulty[n])) s.bestDifficulty[n] = diff;
    if (!result.guided) {
      if (!result.hints && s.stats.noHint.indexOf(n) < 0) s.stats.noHint.push(n);
      if (!result.fails && s.stats.flawless.indexOf(n) < 0) s.stats.flawless.push(n);
    }
    var ev = [{ type: 'level', n: n, stars: stars, best: s.bestStars[n], improved: stars > prev && !firstTime, firstTime: firstTime, wasSkipped: wasSkipped }];
    ev = ev.concat(P.recordExtras(s, n, result));
    return ev.concat(P.evaluate(s));
  };

  /** Personal bests, ruins and time-of-day flags shared by campaign and bonus levels. */
  P.recordExtras = function (s, n, result) {
    var ev = [];
    var acts = Math.max(0, Math.floor(Number(result.actions)));
    if (Number.isFinite(acts) && !result.guided) {
      var pa = s.bestActions[n];
      if (pa === undefined || acts < pa) { s.bestActions[n] = acts; if (pa !== undefined) ev.push({ type: 'best', what: 'actions', n: n, value: acts }); }
    }
    var ms = Math.floor(Number(result.timeMs));
    if (Number.isFinite(ms) && ms > 0 && !result.guided) {
      var pt = s.bestTime[n];
      if (pt === undefined || ms < pt) { s.bestTime[n] = ms; if (pt !== undefined) ev.push({ type: 'best', what: 'time', n: n, value: ms }); }
    }
    if (result.ruin && OBEY.extras && OBEY.extras.RUIN_IDS.indexOf(result.ruin) >= 0 && s.ruins.indexOf(result.ruin) < 0) {
      s.ruins.push(result.ruin);
      ev.push({ type: 'ruin', id: result.ruin, count: s.ruins.length });
    }
    var hour = Number.isFinite(result.hour) ? result.hour : null;
    if (hour !== null && hour >= 0 && hour < 5) s.counters.nightOwl = true;
    return ev;
  };

  P.completeBonus = function (s, n, result) {
    var stars = U.clamp(Math.floor(Number(result.stars) || 1), 1, 3);
    var firstTime = s.bonus.completed.indexOf(n) < 0;
    var prev = s.bonus.bestStars[n] || 0;
    if (firstTime) { s.bonus.completed.push(n); s.bonus.completed.sort(function (a, b) { return a - b; }); }
    s.bonus.bestStars[n] = Math.max(prev, stars);
    s.stats.defiance += Math.max(0, Math.floor(Number(result.defies) || 0));
    s.stats.hintsUsed += Math.max(0, Math.floor(Number(result.hints) || 0));
    s.stats.fails += Math.max(0, Math.floor(Number(result.fails) || 0));
    var ev = [{ type: 'level', n: n, stars: stars, best: s.bonus.bestStars[n], improved: stars > prev && !firstTime, firstTime: firstTime, bonus: true }];
    return ev.concat(P.recordExtras(s, n, result)).concat(P.evaluate(s));
  };

  /** Records a hidden jigsaw piece exactly once. */
  P.discoverJigsaw = function (s, id) {
    if (!OBEY.extras || OBEY.extras.JIGSAW_IDS.indexOf(id) < 0 || s.jigsaw.indexOf(id) >= 0) return [];
    s.jigsaw.push(id);
    return [{ type: 'jigsaw', id: id, count: s.jigsaw.length }].concat(P.evaluate(s));
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

  /** Records an ending after the final level was completed. Returns events or null if not allowed. */
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
   * Keeps achievements, trophies, unlocked/selected cosmetics, ending history, tutorial flag and settings.
   */
  P.newGame = function (s, difficulty) {
    var fresh = OBEY.save.defaults();
    fresh.difficulty = OBEY.DIFFICULTY_IDS.indexOf(difficulty) >= 0 ? difficulty : s.difficulty;
    fresh.trophies = U.clone(s.trophies);
    fresh.costumes = U.clone(s.costumes);
    fresh.themes = U.clone(s.themes);
    fresh.achievements = U.clone(s.achievements);
    fresh.endings = U.clone(s.endings);
    fresh.tutorialDone = s.tutorialDone;
    fresh.settings = U.clone(s.settings);
    fresh.stats.hintsUsed = s.stats.hintsUsed;
    // Collections and personal records survive a New Game; the campaign itself starts over.
    ['intern', 'profileName', 'ruins', 'jigsaw', 'daily', 'counters', 'bonus', 'seenVersion'].forEach(function (k) { fresh[k] = U.clone(s[k]); });
    return fresh;
  };

  /** Reset everything except settings. */
  P.resetAll = function (s) {
    var fresh = OBEY.save.defaults();
    fresh.settings = U.clone(s.settings);
    fresh.profileName = s.profileName;
    fresh.intern = s.intern;
    fresh.seenVersion = s.seenVersion;
    return fresh;
  };

  OBEY.progress = P;
})(typeof window !== 'undefined' ? window : globalThis);
