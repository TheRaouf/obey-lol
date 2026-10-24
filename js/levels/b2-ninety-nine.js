/* Bonus 2 — Ninety-Nine (Sabotage Studio)
 * Charge the phone to exactly 100% and unplug it. "Optimised charging" stops it at 99%, forever.
 * Obey: switch optimised charging off, wait for 100%, unplug.
 * Ruin: unplug at 99%.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TICK = 100;

  OBEY.registerLevel({
    id: 'ninety-nine',
    num: OBEY.BONUS_BASE + 2,
    title: 'Ninety-Nine',
    objective: 'Unplug the phone at exactly 100%.',
    intro: 'Charge the phone to exactly 100%, then unplug it. Never at 99%. NEVER 99. I can\'t explain why. It\'s personal.',
    introMood: 'suspicious',
    actions: ['wait', 'tap'],
    par: 2,
    hints: [
      'Watch the battery. Does it ever reach 100?',
      'Something in the phone\'s settings is holding it back.',
      'Switch optimised charging off, wait for 100%, then unplug.'
    ],
    wrong: ['Unplugging below 99% does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'A fully charged phone. Bossworth can finally sleep.',

    init: function () { return { pct: 60, optimised: true, plugged: true }; },

    onStart: function (s, api) {
      api.every(TICK, function () {
        var cap = s.optimised ? 99 : 100;
        if (s.plugged && s.pct < cap) s.pct++;
      });
    },

    view: function (s) {
      return [
        O('phone', 30, 6, 40, 58, { kind: 'static', art: 'phone', artOpts: { pct: s.pct, plugged: s.plugged }, label: 'Phone, battery ' + s.pct + '%' }),
        O('toggle', 6, 70, 54, 12, { text: 'Optimised charging: ' + (s.optimised ? 'ON' : 'OFF'), label: 'Optimised charging switch, ' + (s.optimised ? 'on' : 'off'), cls: 'btn-card option' }),
        O('unplug', 64, 70, 30, 12, { text: 'Unplug', label: 'Unplug the phone', cls: 'btn-card accent' }),
        O('pct', 6, 86, 88, 9, { kind: 'static', text: 'Battery: ' + s.pct + '%' + (s.pct === 99 && s.optimised ? ' (optimised: holding at 99%)' : ''), label: 'Battery ' + s.pct + '%', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'toggle') {
        s.optimised = !s.optimised;
        if (!s.optimised) { api.defy('optimised'); api.say('Optimised charging is for cowards. Fine. It\'s off.', 'annoyed'); } else api.say('Back on? Make up your mind.', 'suspicious');
        return true;
      }
      if (a.target === 'unplug') {
        if (s.pct >= 100) { s.plugged = false; api.complete({ line: 'One hundred percent. Exactly as instructed. I\'m… suspicious. But proud.', mood: 'pleased' }); return true; }
        if (s.pct === 99) { s.plugged = false; api.complete({ ruin: 'ninety-nine', line: 'NINETY-NINE?! You unplugged it at NINETY-NINE. That last one percent will haunt me forever.', mood: 'panicked' }); return true; }
        api.nope('unplug');
        api.say('It\'s only at ' + s.pct + '%! Patience. It\'s a virtue. Look it up.', 'annoyed');
        return true;
      }
      return false;
    },

    solution: [{ tap: 'toggle' }, { wait: 5000 }, { tap: 'unplug' }],
    ruinPaths: { 'ninety-nine': [{ wait: 5000 }, { tap: 'unplug' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
