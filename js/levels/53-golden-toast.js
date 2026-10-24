/* Level 53 — Golden Toast
 * Bossworth says toast is done when the smoke alarm sings. The toaster's browning gauge says otherwise.
 * Press and hold the lever; the gauge climbs PALE → GOLDEN → BURNT while you hold. Let go on GOLDEN.
 * Wrong: letting go on PALE (nope); letting go on BURNT sets off the smoke alarm (trap).
 * Ruin: keep holding until the toast catches fire (charcoal-chef).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PALE = 2000, GOLD = 4500, FIRE = 8000;

  function shade(ms) { return ms < PALE ? 1 : (ms < GOLD ? 2 : 3); }
  var NAMES = ['BREAD', 'PALE', 'GOLDEN', 'BURNT'];

  OBEY.registerLevel({
    id: 'golden-toast',
    num: 53,
    title: 'Golden Toast',
    objective: 'Make one slice of golden toast.',
    intro: 'Toast is easy. Hold the lever down until the smoke alarm sings. That\'s the "done" bell. Professional chefs call the black bits "seasoning".',
    introMood: 'pleased',
    actions: ['hold', 'observe'],
    par: 1,
    hints: [
      'The toaster has its own opinion about doneness. Watch its gauge.',
      'Press and hold the lever. The gauge moves from PALE to GOLDEN to BURNT while you hold.',
      'Hold the lever and let go while the gauge says GOLDEN (about three seconds).'
    ],
    wrong: ['Letting go while the gauge says PALE gives warm bread (nope).', 'Holding until BURNT sets off the smoke alarm (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Golden. Crunchy. Not on fire. Disappointingly competent.',
    trick: 'The smoke alarm is not a timer — the toaster\'s gauge was, so you let go on GOLDEN instead of waiting for the beep.',

    init: function () { return { holding: false, ms: 0, tick: null, t0: 0, plate: 0 }; },

    view: function (s) {
      var sh = s.holding ? shade(s.ms) : s.plate;
      var gauge = NAMES.map(function (n, i) { return i === 0 ? null : (i === sh && (s.holding || s.plate) ? '[' + n + ']' : n); }).filter(Boolean).join(' · ');
      return [
        O('alarm', 34, 2, 32, 12, { kind: 'static', art: 'b-smoke', artOpts: { beeping: s.holding && s.ms >= GOLD }, label: 'Smoke alarm on the ceiling' }),
        O('gauge', 8, 17, 84, 12, { kind: 'static', text: gauge, label: 'Toaster gauge: ' + (s.holding ? NAMES[shade(s.ms)] : (s.plate ? NAMES[s.plate] : 'waiting')), cls: 'display-card' + (s.holding && shade(s.ms) === 2 ? ' ready' : '') }),
        O('toaster', 22, 32, 56, 50, { art: 'b-toaster', artOpts: { down: s.holding, shade: s.holding ? shade(s.ms) : s.plate }, hold: true, label: 'Toaster lever (press and hold to toast)' + (s.holding ? ', toasting: ' + NAMES[shade(s.ms)] : '') }),
        O('jam', 82, 62, 14, 20, { art: 'mug', label: 'A mug of tea, waiting for its toast', free: true }),
        O('tip', 6, 86, 88, 9, { kind: 'static', text: 'Golden = when the gauge says so. Not when the ceiling screams.', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.target === 'jam' && a.type === 'tap') { api.say('The tea is not involved. Tea is never involved. Tea simply watches.', 'suspicious'); return true; }
      if (a.target !== 'toaster') return false;
      if (a.type === 'tap') { api.say('You have to press and HOLD the lever. Toast respects commitment.', 'neutral'); return true; }
      if (a.type === 'holdstart') {
        s.holding = true; s.ms = 0; s.t0 = api.now(); s.plate = 0;
        s.tick = api.every(250, function () {
          s.ms = api.now() - s.t0;
          if (s.ms >= FIRE) {
            api.cancel(s.tick);
            api.complete({ ruin: 'charcoal-chef', line: 'FLAMES! Actual flames! The toast is a briquette, the alarm has lost its voice and my eyebrows are a rumour now. WHY DID YOU KEEP HOLDING?!', mood: 'panicked' });
          } else if (s.ms >= GOLD) api.say('BEEEEP! Ah, the done bell! Perfect! Keep going, it gets more done!', 'pleased');
          else if (s.ms >= PALE) api.say('Golden? Pfft. Golden is for medals. Hold on for the beep!', 'annoyed');
        });
        return true;
      }
      if (a.type === 'holdend') {
        if (!s.holding) return true;
        api.cancel(s.tick); s.holding = false;
        var ms = a.ms;
        if (ms < PALE) {
          s.plate = 1;
          api.nope();
          api.say('That\'s not toast, that\'s bread with a sunburn. Pop it back in.', 'laughing');
        } else if (ms < GOLD) {
          s.plate = 2;
          api.defy('golden');
          api.complete({ line: 'Golden?! You let go BEFORE the alarm? Where\'s the drama? Where\'s the beeping? …It is very nice toast.', mood: 'defeated' });
        } else {
          api.fail('BEEP BEEP BEEP! The smoke alarm sings, the toast is a roof tile, and the neighbours are waving tea towels. Fresh slice!');
        }
        return true;
      }
      return false;
    },

    solution: [{ hold: ['toaster', 3000] }],
    checks: [
      { name: 'let go too early', steps: [{ hold: ['toaster', 800] }], expect: 'nope' },
      { name: 'wait for the smoke alarm', steps: [{ hold: ['toaster', 5500] }], expect: 'fail' },
      { name: 'tap the lever', steps: [{ tap: 'toaster' }], expect: 'playing' }
    ],
    ruinPaths: { 'charcoal-chef': [{ hold: ['toaster', 8500] }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
