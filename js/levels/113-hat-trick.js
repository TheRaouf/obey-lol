/* Level 113 — Hat Trick (Magic Matinee)
 * Press and hold the top hat to reach inside. A live readout says what your hand is touching:
 * nothing → hanky → dove → RABBIT → badger. Bossworth says "hold for AGES, longer is better".
 * Let go while the readout says RABBIT (3–6 s). Early: a hanky or a dove (nope). Late: the badger (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  // Depth stages by hold time (ms).
  var STAGES = [
    { at: 0, id: 'none', text: 'Your hand finds: nothing yet' },
    { at: 1000, id: 'hanky', text: 'Your hand finds: a hanky' },
    { at: 2000, id: 'dove', text: 'Your hand finds: a dove' },
    { at: 3000, id: 'rabbit', text: 'Your hand finds: a RABBIT!' },
    { at: 6000, id: 'badger', text: 'Your hand finds: a BADGER. Uh-oh.' }
  ];
  function stageAt(ms) { var s = STAGES[0]; STAGES.forEach(function (x) { if (ms >= x.at) s = x; }); return s; }

  OBEY.registerLevel({
    id: 'hat-trick',
    num: 113,
    title: 'Hat Trick',
    objective: 'Pull the rabbit out of the hat.',
    intro: 'The Great Bossworth presents: a rabbit from a hat! Reach in and hold on. The secret is to hold for AGES. Longer is better. Much longer. Trust the hat.',
    introMood: 'pleased',
    actions: ['hold', 'read'],
    par: 1,
    hints: [
      'Watch the card above the hat while you hold it.',
      'The hat has layers. Longer is not always better.',
      'Press and hold the hat, and let go while the card says RABBIT.'
    ],
    wrong: ['Letting go too early pulls out a hanky or a dove (nope).', 'Holding for ages reaches the badger (trap).', 'Just tapping the hat does nothing: you have to reach in.'],
    secrets: [],
    endingNote: 'None.',
    done: 'One rabbit, zero badgers. A clean act.',
    trick: 'The readout showed exactly what your hand was touching, so you let go at the rabbit instead of holding "for ages" like Bossworth said.',

    init: function () { return { holding: false, depth: 'none', got: null, tick: null, start: 0 }; },

    view: function (s) {
      var shown = s.holding ? s.depth : (s.got || 'none');
      var readout = s.holding ? stageAt(s.ms || 0).text : (s.got && s.got !== 'none' ? 'You pulled out: ' + s.got : 'Hand depth: outside the hat');
      return [
        O('curtainL', 0, 0, 16, 74, { kind: 'static', art: 'e-curtain' }),
        O('curtainR', 84, 0, 16, 74, { kind: 'static', art: 'e-curtain', artOpts: { flip: true } }),
        O('readout', 22, 6, 56, 12, { kind: 'static', text: readout, label: readout, cls: 'display-card' + (shown === 'rabbit' ? ' ready' : '') }),
        O('guide', 22, 20, 56, 9, { kind: 'static', text: 'Inside, top to bottom: hanky, dove, rabbit, badger.', label: 'Hat layers, top to bottom: hanky, dove, rabbit, badger', cls: 'tag-card' }),
        O('table', 26, 70, 48, 8, { kind: 'static', label: '', cls: 'keypad-bg' }),
        O('hat', 30, 32, 40, 40, { art: 'e-tophat', artOpts: { peek: shown === 'none' ? '' : shown }, label: 'Magic top hat (press and hold to reach inside)', hold: true }),
        O('wand', 78, 78, 18, 18, { art: 'e-wand', label: 'Spare wand (for another level)', free: true })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'holdstart:hat':
          s.holding = true; s.ms = 0; s.depth = 'none'; s.start = api.now();
          s.tick = api.every(200, function () {
            s.ms = api.now() - s.start;
            var st = stageAt(s.ms);
            if (st.id !== s.depth) {
              s.depth = st.id;
              if (st.id === 'rabbit') api.say('Deeper! Deeper! You\'re barely in! Keep holding!', 'panicked');
              if (st.id === 'badger') api.say('Ah. That\'s Bernard. He bites. Hold on… for… ever?', 'surprised');
            }
          });
          return true;
        case 'holdend:hat': {
          if (s.tick) { api.cancel(s.tick); s.tick = null; }
          s.holding = false;
          var st = stageAt(a.ms || 0);
          if (st.id === 'badger') {
            api.fail('You held on for AGES, as instructed. Bernard the badger did not enjoy it. Everyone back in the hat.');
          } else if (st.id === 'rabbit') {
            s.got = 'rabbit';
            api.complete({ line: 'A RABBIT! From a HAT! …You stopped before the badger. I said hold for ages. Nobody listens to the Great Bossworth.', mood: 'defeated' });
          } else {
            s.got = st.id;
            api.nope('hat');
            api.say(st.id === 'none' ? 'Empty-handed. Magic needs commitment. And arms.'
              : (st.id === 'hanky' ? 'A hanky. Very nice. The audience wanted a rabbit. Deeper!' : 'A dove! It flies off to file a complaint. Deeper, deeper!'), 'pleased');
          }
          return true;
        }
        case 'tap:hat':
          api.say('Reach IN. Press and hold. Like a magician. A long-holding magician.', 'neutral');
          return true;
        case 'tap:wand':
          api.say('That wand belongs to the next trick. Hands off the next trick.', 'annoyed');
          return true;
      }
      return false;
    },

    solution: [{ hold: ['hat', 4000] }],
    checks: [
      { name: 'held for ages: badger', steps: [{ hold: ['hat', 7000] }], expect: 'fail' },
      { name: 'let go too early: hanky', steps: [{ hold: ['hat', 1500] }], expect: 'nope' },
      { name: 'let go at the dove', steps: [{ hold: ['hat', 2500] }], expect: 'nope' },
      { name: 'just tapping', steps: [{ tap: 'hat' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
