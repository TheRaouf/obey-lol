/* Level 24 — The Copycat
 * Goal: both lamps on. Mimic the cat copies every switch you flip, flipping the OTHER lamp too,
 * so the lamps can never both be on. Distract Mimic with the fish, then turn on the right lamp.
 * Wrong: flipping lamps while Mimic is copying (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'copycat',
    num: 24,
    title: 'The Copycat',
    objective: 'Turn both lamps on.',
    intro: 'Turn both lamps on. Easy! My cat Mimic will help. Mimic LOVES to help. Do not feed Mimic. Mimic is on a diet.',
    introMood: 'pleased',
    actions: ['tap', 'drag', 'observe'],
    par: 2,
    hints: [
      'Watch what Mimic does every time you touch a lamp.',
      'A busy cat can\'t copy anybody.',
      'Drag the fish to Mimic, then switch on the right lamp.'
    ],
    wrong: ['While Mimic is copying, every switch also flips the other lamp.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Two lamps, one fed cat, zero copying.',

    init: function () { return { L: true, R: false, eating: false }; },

    view: function (s) {
      return [
        O('goal', 26, 2, 48, 9, { kind: 'static', text: 'Goal: both lamps ON', label: 'Goal: both lamps on', cls: 'tag-card' }),
        O('lampL', 4, 14, 22, 62, { art: 'lamp', artOpts: { on: s.L }, label: 'Left lamp (' + (s.L ? 'on' : 'off') + ')' }),
        O('lampR', 74, 14, 22, 62, { art: 'lamp', artOpts: { on: s.R }, label: 'Right lamp (' + (s.R ? 'on' : 'off') + ')' }),
        O('cat', 36, 48, 28, 28, { art: 'cat', artOpts: { eating: s.eating }, label: s.eating ? 'Mimic the cat, busy eating' : 'Mimic the cat, watching your every move', zone: true, free: true }),
        O('fish', 42, 84, 16, 10, { art: 'fish', label: 'Fish', drag: true, hidden: s.eating })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && (a.target === 'lampL' || a.target === 'lampR')) {
        var side = a.target === 'lampL' ? 'L' : 'R';
        var other = side === 'L' ? 'R' : 'L';
        s[side] = !s[side];
        if (!s.eating) {
          s[other] = !s[other];
          api.nope(a.target);
          api.say('Mimic copied you and flipped the other lamp! Helpful! So helpful! Ha!', 'laughing');
        } else if (s.L && s.R) {
          api.complete({ line: 'Both lamps on. Because you BRIBED my cat. Mimic, I am so disappointed. Mimic does not care.', mood: 'defeated' });
        } else {
          api.say('Mimic is too busy eating to copy anything.', 'annoyed');
        }
        return true;
      }
      if (a.type === 'drop' && a.target === 'fish') {
        if (a.zone === 'cat') {
          s.eating = true;
          api.defy('fish');
          api.say('You fed Mimic! Mimic is on a DIET! …Mimic is very, very busy now.', 'panicked');
        } else {
          api.nope('fish');
          api.say('The fish flops back to the floor. Mimic\'s eyes follow it.', 'suspicious');
        }
        return true;
      }
      if (a.type === 'tap' && a.target === 'cat') { api.say(s.eating ? 'Nom nom nom.' : 'Mimic stares at you. Mimic stares at the fish. Mimic stares at you.', 'neutral'); return true; }
      return false;
    },

    solution: [{ drop: ['fish', 'cat'] }, { tap: 'lampR' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
