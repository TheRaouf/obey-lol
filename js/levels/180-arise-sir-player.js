/* Level 180 — Arise, Sir Player (Royal Rumpus)
 * A suit of armour performs knightings. Bossworth: "Kneel, and stay kneeling until I say rise. Which I
 * never will." The ceremony card says: kneel, the sword taps the right then the left shoulder, then
 * RISE. Press and hold to kneel until both taps land, let go, then use the KNIGHTS ONLY door.
 * Wrong: getting up before both taps (nope); the knights' door before being knighted (nope);
 * bowing to Bossworth instead (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TAP_MS = 1200;

  OBEY.registerLevel({
    id: 'arise-sir-player',
    num: 180,
    title: 'Arise, Sir Player',
    objective: 'Get through the KNIGHTS ONLY door.',
    intro: 'A knighting! Kneel on the cushion. And stay kneeling until I say "rise". I will never say "rise". Ha. You will kneel forever. Very loyal.',
    introMood: 'annoyed',
    actions: ['hold', 'tap', 'read'],
    par: 2,
    hints: [
      'The ceremony card says when a knighting ends. It is not when Bossworth says so.',
      'Press and hold yourself to kneel. Keep holding until the sword has tapped BOTH shoulders, then let go.',
      'Hold until the counter shows 2 of 2 taps, release to rise, then tap the KNIGHTS ONLY door.'
    ],
    wrong: ['Standing up before both shoulder taps cancels the ceremony (nope).', 'The knights\' door ignores non-knights (nope).', 'Bowing to Bossworth instead topples you over (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Arise, Sir Player! You rose without my permission. That is the most knightly thing I have ever seen.',
    trick: 'The ceremony card, not Bossworth, said when to rise: kneel through both shoulder taps, then stand up a knight.',

    init: function () { return { kneel: false, taps: 0, knighted: false, timers: [] }; },

    view: function (s) {
      var sword = s.taps === 1 ? 'right' : (s.taps >= 2 && s.kneel ? 'left' : 'up');
      return [
        O('card', 4, 4, 56, 30, { kind: 'static', text: 'KNIGHTING CEREMONY\n1. Kneel on the cushion.\n2. Sword taps RIGHT, then LEFT shoulder.\n3. Rise, Sir!', label: 'Knighting ceremony: 1, kneel on the cushion. 2, the sword taps the right shoulder, then the left. 3, rise, Sir!', cls: 'book-card' }),
        O('count', 64, 6, 32, 12, { kind: 'static', text: s.knighted ? 'KNIGHTED ✓' : 'Taps: ' + s.taps + ' of 2', label: s.knighted ? 'You are knighted' : 'Shoulder taps: ' + s.taps + ' of 2', cls: 'tag-card' }),
        O('armour', 36, 40, 30, 36, { kind: 'static', art: 'h-armour', artOpts: { sword: sword }, label: 'A suit of armour holding a knighting sword' }),
        O('you', 9, 56, 20, 20, { art: 'h-visitor', artOpts: { kneel: s.kneel, knighted: s.knighted, cushion: true }, hold: true, cls: s.kneel ? 'charging' : '', label: s.knighted ? 'You, Sir Player, standing proud' : (s.kneel ? 'You, kneeling on the cushion' : 'You, by the cushion (press and hold to kneel)') }),
        O('door', 74, 39, 22, 37, { art: 'door', artOpts: { sign: 'KNIGHTS', open: s.knighted && !s.kneel }, label: s.knighted && !s.kneel ? 'KNIGHTS ONLY door, swinging open for you' : 'Door marked KNIGHTS ONLY' }),
        O('bow', 40, 84, 30, 11, { text: 'Bow to Bossworth', label: 'Bow to Bossworth instead', cls: 'btn-card accent' })
      ];
    },

    on: function (a, s, api) {
      function clear() { s.timers.forEach(function (t) { api.cancel(t); }); s.timers = []; }
      if (a.target === 'you') {
        if (a.type === 'tap') { api.say('A quick bob is not a kneel. Press and HOLD. Not that you should. Kneel forever, I mean.', 'neutral'); return true; }
        if (a.type === 'holdstart') {
          if (s.knighted) { api.say('You are already a knight. Kneeling again is just showing off.', 'annoyed'); return true; }
          clear();
          s.kneel = true; s.taps = 0;
          api.say('Good. Kneel. Forever. The armour is lifting its sword…', 'pleased');
          s.timers.push(api.after(TAP_MS, function () { s.taps = 1; api.say('Tap! Right shoulder. Keep kneeling. For ever and ever.', 'pleased'); }));
          s.timers.push(api.after(TAP_MS * 2, function () { s.taps = 2; api.say('Tap! Left shoulder. That is the whole ceremony, technically. But I did not say rise.', 'suspicious'); }));
          return true;
        }
        if (a.type === 'holdend') {
          clear();
          s.kneel = false;
          if (s.taps >= 2) {
            s.knighted = true;
            api.defy('rise');
            api.say('You ROSE? I did not say rise! …The card says rise. The card is not in charge. (The card is in charge.)', 'annoyed');
          } else {
            s.taps = 0;
            api.nope('you');
            api.say('Up already? You cannot be knighted halfway. The armour lowers its sword in disappointment.', 'pleased');
          }
          return true;
        }
        return false;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'bow') {
        api.fail('You bow so low to Bossworth that you topple over, roll under a tapestry and miss the ceremony. Start again.');
        return true;
      }
      if (a.target === 'door') {
        if (!s.knighted) { api.nope('door'); api.say('KNIGHTS ONLY. You are a visitor with a nice face. Not the same.', 'pleased'); return true; }
        api.complete({ line: 'Sir Player strides through the knights\' door. I am going to need a much bigger rule about rising.', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ hold: ['you', 2600] }, { tap: 'door' }],
    checks: [
      { name: 'get up too early', steps: [{ hold: ['you', 800] }], expect: 'nope' },
      { name: 'knights door first', steps: [{ tap: 'door' }], expect: 'nope' },
      { name: 'bow to Bossworth', steps: [{ tap: 'bow' }], expect: 'fail' },
      { name: 'kneeling longer is fine', steps: [{ hold: ['you', 9000] }, { tap: 'door' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
