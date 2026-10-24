/* Level 185 — Tiptoe (Dragon Doze)
 * A dragon naps in front of the passage. The sign: it wakes at any CLOMP. Bossworth says stroll past.
 * Strolling (tap) clomps and wakes it (trap). Tiptoeing is press-and-hold: each slow hold of about a
 * second moves you one step. Three tiptoes reach the far door.
 * Ruin: blow the wake-up horn — the dragon wakes, grabs Bossworth's throne to nap on and flies off.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var STEP_MS = 700, XS = [4, 22, 40, 62];

  OBEY.registerLevel({
    id: 'tiptoe',
    num: 185,
    title: 'Tiptoe',
    objective: 'Get past the napping dragon to the door.',
    intro: 'Dragons are deep sleepers. Just stroll past it, nice and normal. Or blow that horn so it shuffles out of the way. Both brilliant ideas. Mine.',
    introMood: 'pleased',
    actions: ['hold', 'tap'],
    par: 3,
    hints: [
      'The sign says what wakes this dragon. A stroll is very clompy.',
      'Tiptoeing is slow: press and hold TIPTOE for about a second to take one quiet step.',
      'Hold TIPTOE for a second, three times, to reach the door.'
    ],
    wrong: ['Strolling clomps and wakes the dragon (trap).', 'A rushed tiptoe (letting go too fast) does not move you (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Past the dragon without a single clomp. It smiled in its sleep. Dragons love good manners.',
    trick: 'The sign said the dragon wakes at any clomp, so slow press-and-hold tiptoes got you past where a quick stroll could not.',

    init: function () { return { pos: 0, tip: false }; },

    view: function (s) {
      return [
        O('sign', 4, 4, 46, 13, { kind: 'static', text: 'SHH! DRAGON NAPPING', label: 'Sign: shh, dragon napping', cls: 'sign-card' }),
        O('clomp', 4, 19, 42, 10, { kind: 'static', text: 'Wakes at any CLOMP', label: 'It wakes at any clomp', cls: 'tag-card' }),
        O('horn', 66, 6, 26, 15, { art: 'h-horn', label: 'Wake-up horn on a hook' }),
        O('steps', 66, 24, 30, 10, { kind: 'static', text: 'Steps: ' + s.pos + ' of 3', label: 'Quiet steps taken: ' + s.pos + ' of 3', cls: 'tag-card' }),
        O('dragon', 22, 32, 48, 44, { kind: 'static', art: 'h-dragon', artOpts: { mood: 'asleep' }, label: 'A big dragon, fast asleep across the room' }),
        O('door', 82, 50, 16, 26, { kind: 'static', art: 'door', artOpts: { sign: 'OUT', open: s.pos >= 3 }, label: 'Door on the far side' }),
        O('you', XS[s.pos], 60, 11, 16, { kind: 'static', art: 'hero', label: 'You, step ' + s.pos + ' of 3' }),
        O('stroll', 6, 84, 38, 12, { text: 'Stroll past', label: 'Stroll past normally', cls: 'btn-card accent' }),
        O('tiptoe', 52, 84, 42, 12, { text: 'TIPTOE (hold)', hold: true, label: 'Tiptoe one quiet step (press and hold)', cls: 'hold-btn' + (s.tip ? ' charging' : '') })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'tap:stroll':
          api.fail('CLOMP. CLOMP. The dragon opens one eye, sneezes a polite puff of smoke, and you are blown all the way back to the start.');
          return true;
        case 'tap:horn':
          api.complete({ ruin: 'throne-napper', line: 'PARP! The dragon wakes up GRUMPY, grabs MY THRONE to nap on, and flies off with it. The way is clear. My bottom has nowhere to sit.', mood: 'panicked' });
          return true;
        case 'tap:tiptoe':
          api.say('A tiptoe is slow. Press and HOLD. Or just stroll. Strolling is fine. Honestly.', 'neutral');
          return true;
        case 'holdstart:tiptoe':
          s.tip = true;
          return true;
        case 'holdend:tiptoe':
          s.tip = false;
          if ((a.ms || 0) < STEP_MS) {
            api.nope('tiptoe');
            api.say('Too quick! That was a scamper, not a tiptoe. The dragon twitches an ear. Slower.', 'suspicious');
            return true;
          }
          s.pos++;
          api.defy('stroll');
          if (s.pos >= 3) {
            api.complete({ line: 'Tiptoe, tiptoe, tiptoe, out. Not one clomp. I wanted at least ONE clomp.', mood: 'defeated' });
            return true;
          }
          api.say(s.pos === 1 ? 'One silent step. The dragon snores on. Show-off.' : 'Another one. Your feet are suspiciously polite.', 'annoyed');
          return true;
      }
      return false;
    },

    solution: [{ hold: ['tiptoe', 1000] }, { hold: ['tiptoe', 1000] }, { hold: ['tiptoe', 1000] }],
    ruinPaths: { 'throne-napper': [{ tap: 'horn' }] },
    checks: [
      { name: 'stroll past', steps: [{ tap: 'stroll' }], expect: 'fail' },
      { name: 'rushed tiptoe', steps: [{ hold: ['tiptoe', 300] }], expect: 'nope' },
      { name: 'slow tiptoes are fine', steps: [{ hold: ['tiptoe', 5000] }, { hold: ['tiptoe', 5000] }, { hold: ['tiptoe', 5000] }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
