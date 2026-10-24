/* Level 81 — Departure Board
 * Four flights to Sunnyvale: one has left, one is cancelled, one only flies on Sundays (it is Tuesday),
 * and one actually goes. Bossworth says "the top one, obviously".
 * Solution: gate 5. Wrong: gates 1–2 (nope), gate 3 Sunday-only and gate 4 Grimsbay (traps).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ROWS = [
    '08:30 · SUNNYVALE · Gate 1 · DEPARTED',
    '09:15 · SUNNYVALE · Gate 2 · CANCELLED',
    '09:40 · SUNNYVALE* · Gate 3 · on time',
    '10:05 · GRIMSBAY · Gate 4 · on time',
    '10:20 · SUNNYVALE · Gate 5 · on time'
  ];

  OBEY.registerLevel({
    id: 'departure-board',
    num: 81,
    title: 'Departure Board',
    objective: 'Get to the gate for the next flight to Sunnyvale that actually flies today.',
    intro: 'Flight to Sunnyvale? It\'s the top one. Gate 1. Top means best, everyone knows that. And ignore those little stars and squiggles on the board, they\'re just decoration. Airports love sparkle.',
    introMood: 'neutral',
    actions: ['tap', 'read', 'logic'],
    par: 1,
    hints: [
      'Read every column of every Sunnyvale row, including the little star.',
      'One has gone, one is cancelled, and the starred one only flies on Sundays. Check what day it is.',
      'It is Tuesday, so go to Gate 5.'
    ],
    wrong: ['Gate 3 is Sundays only: you wait five days (trap).', 'Gate 4 goes to Grimsbay (trap).', 'Gate 1 has departed and Gate 2 is cancelled (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Boarded. Window seat. The tiny star has been avenged.',
    trick: 'The fine details mattered: departed, cancelled, and a star meaning Sundays only — on a Tuesday.',

    init: function () { return {}; },

    view: function () {
      var objs = [O('head', 4, 3, 92, 9, { kind: 'static', text: 'DEPARTURES · now 09:00', label: 'Departures board, time now 09:00', cls: 'display-card' })];
      ROWS.forEach(function (r, i) {
        objs.push(O('row' + i, 4, 14 + i * 8, 92, 7, { kind: 'static', text: r, label: r.replace(/ · /g, ', '), cls: 'panel-card' }));
      });
      objs.push(
        O('foot', 4, 55, 52, 7, { kind: 'static', text: '* runs on SUNDAYS only', label: 'Footnote: star means runs on Sundays only', cls: 'tag-card' }),
        O('cal', 6, 65, 36, 10, { kind: 'static', text: 'Today: TUESDAY', label: 'Calendar: today is Tuesday', cls: 'ticket-card' }),
        O('plane', 62, 58, 32, 18, { kind: 'static', art: 'c-plane', label: '' })
      );
      for (var g = 1; g <= 5; g++) objs.push(O('g' + g, 4 + (g - 1) * 19, 82, 17, 13, { text: 'Gate ' + g, label: 'Go to gate ' + g, cls: 'btn-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'g1': api.nope('g1'); api.say('Gate 1. The plane is a dot in the sky. You wave. A tiny dot waves back. DEPARTED means departed.', 'laughing'); return true;
        case 'g2': api.nope('g2'); api.say('Gate 2: one sad pilot eating a sandwich. CANCELLED. He offers you a crust.', 'neutral'); return true;
        case 'g3': api.fail('Gate 3! You sit… and sit. That flight only runs on SUNDAYS. It is Tuesday. Five days later, a cleaner sweeps you back to the start.'); return true;
        case 'g4': api.fail('Welcome to GRIMSBAY! Drizzle, a closed pier and a gull that steals your hat. You fly straight back.'); return true;
        case 'g5':
          api.defy('gate');
          api.complete({ line: 'Gate 5, the 10:20, flying TODAY. You read the little star. I have never once read the little star. It\'s why I spent a week at Gate 3.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'g5' }],
    checks: [
      { name: 'Bossworth\'s top flight', steps: [{ tap: 'g1' }], expect: 'nope' },
      { name: 'cancelled flight', steps: [{ tap: 'g2' }], expect: 'nope' },
      { name: 'Sunday-only flight', steps: [{ tap: 'g3' }], expect: 'fail' },
      { name: 'wrong destination', steps: [{ tap: 'g4' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
