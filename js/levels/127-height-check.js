/* Level 127 — Height Check (Museum Midway)
 * Theme-park ride: "You must be this tall." Bossworth: too short, go home, no crates, no stilts.
 * Fine print on the rules: height is measured to the top of your hat. Put the very tall hat on, then board.
 * Crate: nope (banned, attendant shakes head). Stilts: trap (wobble into the candyfloss).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'height-check',
    num: 127,
    title: 'Height Check',
    objective: 'Get on the Loop-de-Loop.',
    intro: 'Too short for the Loop-de-Loop! Go home. No standing on crates, no stilts, no cheating. The rules are VERY clear. I wrote them. In big letters.',
    introMood: 'suspicious',
    actions: ['drag', 'read'],
    par: 2,
    narratorZone: false,
    hints: [
      'Big letters aren\'t the only letters. Check the small print.',
      'Height is measured to the top of your hat.',
      'Drag the tall hat onto yourself, then go through the ride gate.'
    ],
    wrong: ['Standing on the crate is banned (nope).', 'The stilts end in the candyfloss stand (trap).', 'The gate won\'t let you on while you\'re too short (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Tall enough, technically. Technically is the best kind of tall.',
    trick: 'The small print measured height to the top of your hat, and nothing in the big letters banned hats.',

    init: function () { return { hat: false }; },

    view: function (s) {
      var out = [
        O('rules', 2, 1, 42, 31, { kind: 'static', text: 'LOOP-DE-LOOP RULES\n1. Be this tall →\n2. No crates. No stilts.', label: 'Ride rules: be as tall as the line. No crates, no stilts.', cls: 'book-card' }),
        O('fine', 2, 32, 42, 13, { kind: 'static', text: 'Reg. 4b: height is measured to the top of your hat.', label: 'Small print: height is measured to the top of your hat.', cls: 'fine-print' }),
        O('sign', 44, 18, 10, 62, { kind: 'static', art: 'e-heightsign', label: 'Height sign: you must be this tall (the red line)' }),
        O('you', 56, 59, 14, 17, { art: 'hero', label: s.hat ? 'You, wearing a very tall hat: taller than the line' : 'You (shorter than the red line)', zone: true, free: true }),
        O('gate', 76, 30, 20, 46, { art: 'door', artOpts: { sign: 'RIDE' }, label: 'Ride gate' }),
        O('crate', 4, 69, 16, 16, { art: 'crate', label: 'Wooden crate (drag it)', drag: true }),
        O('stilts', 4, 46, 14, 22, { art: 'e-stilts', label: 'Stilts (drag them)', drag: true })
      ];
      if (s.hat) out.push(O('hatOn', 56.5, 29, 13, 31, { kind: 'static', art: 'e-tallhat', label: '' }));
      else out.push(O('hat', 24, 44, 12, 30, { art: 'e-tallhat', label: 'Very tall top hat (drag it)', drag: true }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        if (a.zone !== 'you') { api.say('You put it down somewhere pointless. Like my hopes for this level.', 'neutral'); return true; }
        if (a.target === 'hat') {
          s.hat = true;
          api.defy('hat');
          api.say('A hat? That\'s… The line says… "to the top of your hat"? WHO WROTE REG. 4b? …I wrote reg. 4b.', 'panicked');
        } else if (a.target === 'crate') {
          api.nope('crate');
          api.say('The attendant points at rule 2. No crates. Rules are rules. I love rules.', 'pleased');
        } else if (a.target === 'stilts') {
          api.fail('You wobble on the stilts, wobble some more, and topple into the candyfloss stand. Very sticky. Start again.');
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'gate') {
        if (s.hat) api.complete({ line: 'The attendant measures to the top of the hat and waves you on. Rules are rules. I HATE rules.', mood: 'defeated' });
        else { api.nope('gate'); api.say('Too short! The attendant can see the line. I can see the line. Everyone can see the line.', 'laughing'); }
        return true;
      }
      if (a.target === 'you') { api.say(s.hat ? 'Very tall. Suspiciously tall. Hat-based tall.' : 'You. Short. Shorter than the line. Sorry. (Not sorry.)', 'pleased'); return true; }
      if (a.target === 'hat' || a.target === 'crate' || a.target === 'stilts') { api.say('Drag it. Onto you. Not that it\'ll help.', 'neutral'); return true; }
      return false;
    },

    solution: [{ drop: ['hat', 'you'] }, { tap: 'gate' }],
    checks: [
      { name: 'stand on the crate', steps: [{ drop: ['crate', 'you'] }], expect: 'nope' },
      { name: 'the stilts', steps: [{ drop: ['stilts', 'you'] }], expect: 'fail' },
      { name: 'try the gate while short', steps: [{ tap: 'gate' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
