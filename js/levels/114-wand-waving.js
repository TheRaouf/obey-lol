/* Level 114 — Wand Waving (Magic Matinee)
 * Bossworth says the wand only works on the hat, and "certainly not on doors, or on me".
 * The wand's box says it works on hats, doors, padlocks and (warning) narrators.
 * Solution: drag the wand onto the padlocked door. Hat: a rabbit appears (nope). Narrator: ruin.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'wand-waving',
    num: 114,
    title: 'Wand Waving',
    objective: 'Get through the padlocked stage door.',
    intro: 'Behold my magic wand! Wave it over the HAT to make a rabbit. Only the hat. It does nothing to doors. Or padlocks. Or me. ESPECIALLY not me.',
    introMood: 'pleased',
    actions: ['drag', 'read'],
    par: 1,
    narratorZone: true,
    hints: [
      'Read the wand\'s box before you believe the magician.',
      'The box lists everything the wand works on. Doors are on the list.',
      'Drag the wand onto the padlocked door.'
    ],
    wrong: ['Waving the wand over the hat makes a rabbit, not an exit (nope).', 'The door is padlocked: tapping it does nothing (nope).', 'Waving the wand at Bossworth turns him into a rabbit (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Abraca-door-bra.',
    trick: 'The wand box listed doors and padlocks among the things it works on, so the "hat only" rule was just Bossworth guarding his act.',

    init: function () { return { rabbits: 0 }; },

    view: function (s) {
      return [
        O('curtainL', 0, 0, 12, 74, { kind: 'static', art: 'e-curtain' }),
        O('door', 64, 18, 26, 58, { art: 'door', artOpts: { sign: 'STAGE', keyhole: true }, label: 'Stage door with a big padlock', zone: true }),
        O('lock', 68, 48, 14, 14, { kind: 'static', art: 'e-padlock', label: '' }),
        O('table', 14, 64, 36, 7, { kind: 'static', label: '', cls: 'keypad-bg' }),
        O('hat', 18, 36, 28, 28, { art: 'e-tophat', artOpts: { peek: s.rabbits ? 'rabbit' : '' }, label: s.rabbits ? 'Top hat with ' + s.rabbits + ' rabbit' + (s.rabbits > 1 ? 's' : '') + ' in it' : 'Magic top hat', zone: true }),
        O('box', 14, 2, 48, 32, { kind: 'static', text: 'OMNI-WAND, deluxe.\nWorks on: hats, doors, padlocks, and (warning!) narrators.', label: 'Wand box: works on hats, doors, padlocks, and narrators', cls: 'book-card' }),
        O('wand', 40, 78, 18, 18, { art: 'e-wand', label: 'Magic wand (drag it onto something)', drag: true })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'wand') {
        if (a.zone === 'door') {
          api.defy('door');
          api.complete({ line: 'The padlock turns into confetti. …The box SAID doors? Who reads the box? Magicians never read the box.', mood: 'defeated' });
        } else if (a.zone === 'hat') {
          s.rabbits++;
          api.nope('hat');
          api.say(s.rabbits > 1 ? 'Another rabbit. They\'re forming a union. The door is still locked.' : 'Ta-da! A rabbit! The rabbit looks at the door. The rabbit looks at you. Nothing happens.', 'pleased');
        } else if (a.zone === 'narrator') {
          api.complete({ ruin: 'bossworth-bunny', line: 'You pointed it at ME?! I\'m… fluffy. I have a little tail. The door is open but I am a BUNNY. Squeak. SQUEAK!', mood: 'panicked' });
        } else {
          api.say('You wave the wand at nothing. Nothing is unimpressed.', 'neutral');
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'door') {
        api.nope('door');
        api.say('Padlocked. Tight as my contract. And the wand does not do doors. Probably.', 'pleased');
        return true;
      }
      if (a.target === 'hat') {
        api.say('Don\'t poke the hat. WAVE THE WAND over the hat. That\'s how magic works.', 'neutral');
        return true;
      }
      if (a.target === 'wand') {
        api.say('You have to WAVE it. Drag it onto something. The hat. Only the hat.', 'neutral');
        return true;
      }
      return false;
    },

    solution: [{ drop: ['wand', 'door'] }],
    ruinPaths: { 'bossworth-bunny': [{ drop: ['wand', 'narrator'] }] },
    checks: [
      { name: 'wand over the hat', steps: [{ drop: ['wand', 'hat'] }], expect: 'nope' },
      { name: 'tap the padlocked door', steps: [{ tap: 'door' }], expect: 'nope' },
      { name: 'wand at Bossworth is a ruin', steps: [{ drop: ['wand', 'narrator'] }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
