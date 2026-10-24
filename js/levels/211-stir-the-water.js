/* Level 211 — Stir the Water (Shipwreck Shoals)
 * Black water. The biologist's note: glow plankton light up when the water is stirred. Bossworth: keep
 * absolutely still. Hold the propeller for 1.5 s: the plankton glow and settle on two shapes, a round
 * hatch and a toothy clam, and keep glowing. Tap the hatch.
 * Wrong: the clam (trap: chomp), headlights (nope: murk), letting go too early (just a flicker).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var STIR = 1500;

  OBEY.registerLevel({
    id: 'stir-the-water',
    num: 211,
    title: 'Stir the Water',
    objective: 'Find the wreck\'s hatch in the dark.',
    intro: 'Shh. Keep absolutely still. Don\'t touch the propeller, don\'t stir a single drop. Something down here hates a fuss, and it is me.',
    introMood: 'suspicious',
    actions: ['hold', 'read', 'tap'],
    par: 2,
    hints: [
      'The note on the dashboard says what makes the plankton glow.',
      'Stirring the water lights it up. Your propeller stirs water.',
      'Press and hold Spin propeller for a second and a half, then tap the round hatch, not the clam.'
    ],
    wrong: ['The toothy shape is a giant clam (trap).', 'Headlights only light up the murk (nope).', 'A quick spin only makes a flicker.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Into the wreck by plankton-light. Very atmospheric. I\'ll pretend I planned the lighting.',
    trick: 'The glow plankton only light up when stirred, so spinning the propeller (the one thing he banned) lit the hatch\'s outline.',

    init: function () { return { glow: false, stirring: false, timer: null }; },

    view: function (s) {
      return [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-deep', cls: 'backdrop' }),
        O('note', 4, 3, 56, 22, { kind: 'static', text: 'BIOLOGIST\'S NOTE: glow plankton light up when the water is stirred.', label: 'Biologist\'s note: glow plankton light up when the water is stirred.', cls: 'honest-card' }),
        O('sub', 66, 4, 30, 19, { kind: 'static', art: 'i-sub', artOpts: { bubbles: s.stirring }, label: 'Your submarine' }),
        O('dark', 4, 30, 92, 10, { kind: 'static', text: s.glow ? 'The plankton cling on and keep glowing.' : 'Pitch black. Nothing to see.', label: '', cls: 'tag-card' }),
        O('hatch', 8, 44, 38, 28, { art: 'i-plankton', artOpts: { shape: 'hatch', on: true }, label: 'Glowing outline: a round hatch', hidden: !s.glow }),
        O('clam', 54, 44, 40, 28, { art: 'i-plankton', artOpts: { shape: 'clam', on: true }, label: 'Glowing outline: a huge shape with teeth', hidden: !s.glow }),
        O('stir', 4, 80, 50, 14, { text: s.stirring ? 'Stirring…' : 'Spin propeller (hold)', label: 'Spin the propeller (press and hold)', cls: 'hold-btn' + (s.stirring ? ' charging' : ''), hold: true }),
        O('lights', 58, 80, 38, 14, { text: 'Headlights', label: 'Switch on the headlights', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'holdstart:stir':
          if (s.glow) return true;
          s.stirring = true;
          api.say('What are you doing? That\'s the PROPELLER. That\'s the loudest, stirriest thing we own!', 'panicked');
          s.timer = api.after(STIR, function () {
            s.timer = null; s.stirring = false; s.glow = true;
            api.defy('still');
            api.say('The water is… glowing. Two shapes. A round one and a… toothy one. Pick the toothy one, it\'s smiling!', 'surprised');
          });
          return true;
        case 'holdend:stir':
          s.stirring = false;
          if (s.timer) { api.cancel(s.timer); s.timer = null; api.say('A tiny green flicker. Then nothing. Good. Stay still. (Or stir longer, if you\'re a rebel.)', 'suspicious'); }
          return true;
        case 'tap:stir':
          api.say('The propeller needs a proper spin. Press and HOLD. Not that you should.', 'neutral');
          return true;
        case 'tap:lights':
          api.nope();
          api.say('Headlights on: a wall of glittering murk. Light bounces off the silt. Lights off. I liked the dark better.', 'neutral');
          return true;
        case 'tap:clam':
          api.fail('CHOMP! The toothy outline was a giant clam, and it was smiling because it was hungry. It spits the sub out. Too crunchy.');
          return true;
        case 'tap:hatch':
          api.complete({ line: 'The round hatch! Open, in, done. You stirred. I said don\'t stir. The plankton took your side.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ hold: ['stir', 1700] }, { tap: 'hatch' }],
    checks: [
      { name: 'the clam is a trap', steps: [{ hold: ['stir', 1700] }, { tap: 'clam' }], expect: 'fail' },
      { name: 'headlights are a nope', steps: [{ tap: 'lights' }], expect: 'nope' },
      { name: 'a short spin reveals nothing', steps: [{ hold: ['stir', 500] }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
