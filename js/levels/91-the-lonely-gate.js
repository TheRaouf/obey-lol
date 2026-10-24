/* Level 91 — The Lonely Gate
 * The Gnome Garden gate is locked and the key is "in Belgium". Bossworth says climb over.
 * But the gate stands alone in an open field: there is no fence. Just walk round it.
 * Solution: tap the open grass beside the gate. Wrong: climb (trap), rattle the locked gate (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'the-lonely-gate',
    num: 91,
    title: 'The Lonely Gate',
    objective: 'Get into the Gnome Garden.',
    intro: 'Welcome to the famous Gnome Garden! Sadly the gate is locked and the key is in my other trousers. In Belgium. So you\'ll have to climb over. Carefully. With STYLE.',
    introMood: 'neutral',
    actions: ['tap', 'observe'],
    par: 1,
    hints: [
      'Look at what is on either side of the gate.',
      'There is no fence. The gate is just standing in a field.',
      'Tap the grass beside the gate to walk round it.'
    ],
    wrong: ['Climbing over snags your trousers on the spikes (trap).', 'Rattling the locked gate does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'In! The gnomes applaud. Slowly. They are made of concrete.',
    trick: 'A gate with no fence is just a suggestion. You walked round it.',

    init: function () { return { rattles: 0 }; },

    view: function () {
      return [
        O('gnomeL', 6, 6, 12, 20, { kind: 'static', art: 'c-gnome', artOpts: { color: '#2bc46f' }, label: 'A gnome in the garden' }),
        O('sign', 22, 8, 40, 11, { kind: 'static', text: 'GNOME GARDEN · keep out', label: 'Sign: Gnome Garden, keep out', cls: 'plaque-card' }),
        O('gnomeC', 66, 2, 13, 24, { kind: 'static', art: 'c-gnome', artOpts: { sign: true }, label: 'A gnome holding a sign that says HI!' }),
        O('gnomeR', 84, 6, 12, 20, { kind: 'static', art: 'c-gnome', artOpts: { color: '#ff8c1a' }, label: 'A gnome in the garden' }),
        O('field', 0, 62, 100, 16, { kind: 'static', art: 'c-meadow', label: 'An open field. No fence anywhere.' }),
        O('gate', 30, 28, 40, 40, { art: 'c-lonegate', label: 'Locked garden gate, standing on its own with no fence either side' }),
        O('grassL', 4, 54, 22, 12, { art: 'c-grass', label: 'Open grass to the left of the gate' }),
        O('grassR', 74, 54, 22, 12, { art: 'c-grass', label: 'Open grass to the right of the gate' }),
        O('climb', 30, 82, 40, 13, { text: 'Climb over', label: 'Climb over the gate', cls: 'btn-card accent' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'climb':
          api.fail('Up, up, and… RRRIP. Your trousers snag on the top spike and you dangle there while the gnomes stare. Somebody lifts you down. Back to the start.');
          return true;
        case 'gate':
          s.rattles++;
          api.nope('gate');
          api.say(s.rattles > 2 ? 'Rattle, rattle. Still locked. The gnomes are starting to whisper about you.' : 'Locked tight. Told you. The key is in Belgium, having a lovely time.', 'pleased');
          return true;
        case 'grassL': case 'grassR':
          api.defy('gate');
          api.complete({ line: 'You… walked ROUND it. There\'s no fence. There was never a fence. I have been climbing that gate every day for six years.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'grassR' }],
    alternatives: { leftSide: [{ tap: 'grassL' }] },
    checks: [
      { name: 'climb over (as told)', steps: [{ tap: 'climb' }], expect: 'fail' },
      { name: 'rattle the gate', steps: [{ tap: 'gate' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
