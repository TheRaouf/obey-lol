/* Level 177 — Line of Succession (Royal Rumpus)
 * Bossworth wants the crown on his own throne. The official chart lists: 1. Queen Marigold (retired
 * to the seaside — her postcard is on the wall), 2. Duke Humphrey (ran off to join the circus),
 * 3. Lady Pudding, the castle cat. "0. ME!" is scrawled in crayon in the margin. Crown the cat.
 * Ruin: crown yourself (the Usurper). Wrong: the crayon throne (trap), the postcard (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'line-of-succession',
    num: 177,
    title: 'Line of Succession',
    objective: 'Crown the rightful ruler.',
    intro: 'Crown the rightful ruler! Check the official chart if you must. It is obviously me. Pop the crown on my throne and let us all get on with the bowing.',
    introMood: 'pleased',
    actions: ['drag', 'read'],
    par: 1,
    hints: [
      'Read the official chart, and notice which line is not official.',
      'Number 1 retired to the seaside and number 2 ran off to the circus. Crayon is not ink.',
      'Drag the crown onto Lady Pudding, the castle cat.'
    ],
    wrong: ['Crowning the crayon throne makes the crown roll off (trap).', 'The queen is on holiday: her postcard cannot wear a crown (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'All hail Queen Pudding the First. She has already knocked my sceptre off the table.',
    trick: 'The official chart skipped the retired queen and the runaway duke straight to Lady Pudding the cat — the crayon "0. ME!" was never part of it.',

    init: function () { return { crowned: null }; },

    view: function (s) {
      return [
        O('chart', 4, 4, 54, 34, { kind: 'static', text: 'OFFICIAL LINE OF SUCCESSION\n1. Queen Marigold (retired)\n2. Duke Humphrey (left)\n3. Lady Pudding, castle cat', label: 'Official line of succession: 1. Queen Marigold, retired. 2. Duke Humphrey, left. 3. Lady Pudding, the castle cat.', cls: 'book-card' }),
        O('crayon', 6, 39, 30, 9, { kind: 'static', text: '0. ME!! — B (crayon)', label: 'Scrawled in crayon under the chart: 0. Me! Signed B.', cls: 'tag-card' }),
        O('postcard', 64, 4, 32, 22, { art: 'h-postcard', zone: true, label: 'Postcard: "Retired to the seaside! Love, Queen Marigold"' }),
        O('circus', 64, 28, 32, 10, { kind: 'static', text: 'Duke: "Gone to the circus"', label: 'Note pinned up: the duke has gone to the circus', cls: 'tag-card' }),
        O('throne', 40, 46, 26, 30, { art: 'h-throne', artOpts: { crayon: true }, zone: true, label: 'Throne with "KING BOSSWORTH" written on it in crayon' }),
        O('cat', 70, 58, 24, 18, { art: 'cat', zone: true, free: true, label: 'Lady Pudding, the castle cat, on a cushion' }),
        O('you', 6, 52, 14, 24, { art: 'hero', zone: true, free: true, label: 'You' }),
        O('crown', 24, 84, 16, 12, { art: 'h-crown', drag: true, hidden: !!s.crowned, label: 'The royal crown (drag it onto the rightful ruler)' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'crown') {
        switch (a.zone) {
          case 'cat':
            api.defy('throne');
            api.complete({ line: 'You crowned the CAT? Over ME? …She is purring. She looks very regal. I hate that she looks very regal.', mood: 'defeated' });
            return true;
          case 'you':
            api.complete({ ruin: 'usurper', line: 'You crowned YOURSELF? That is MY move! There cannot be two self-appointed kings in one throne room! GUARDS! …The guards are bowing to you. Traitors.', mood: 'panicked' });
            return true;
          case 'throne':
            api.fail('The crown sits on the crayon throne for one second, then rolls off, down the steps and under a tapestry. Crayon is not ink. Fetch it and start again.');
            return true;
          case 'postcard':
            api.nope('postcard');
            api.say('The queen is at the seaside. You cannot crown a postcard. I have tried.', 'annoyed');
            return true;
        }
        return false;
      }
      if (a.type === 'tap' && a.target === 'cat') { api.say('Lady Pudding blinks at you slowly. It feels like an endorsement.', 'suspicious'); return true; }
      if (a.type === 'tap' && a.target === 'you') { api.say('That is you. Hello, you.', 'neutral'); return true; }
      return false;
    },

    solution: [{ drop: ['crown', 'cat'] }],
    ruinPaths: { usurper: [{ drop: ['crown', 'you'] }] },
    checks: [
      { name: 'crown the crayon throne', steps: [{ drop: ['crown', 'throne'] }], expect: 'fail' },
      { name: 'crown the postcard queen', steps: [{ drop: ['crown', 'postcard'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
