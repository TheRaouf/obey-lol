/* Level 133 — Trolley Trouble (Aisle Antics)
 * Four trolleys are pushed into each other in the bay. Bossworth wants the shiny one at the front,
 * against the wall. Nested trolleys only come off the BACK of the line: the coin goes in the last one.
 * Front trolley: trap (the whole row comes with you). Middle trolleys: nope (wedged).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var NAMES = ['the shiny trolley at the front of the line, against the wall', 'the second trolley, wedged into the shiny one', 'the third trolley, wedged in the middle', 'the last trolley in the line, nearest you'];

  OBEY.registerLevel({
    id: 'trolley-trouble',
    num: 133,
    title: 'Trolley Trouble',
    objective: 'Get a trolley for the big weekly shop.',
    intro: 'The big weekly shop! I need the SHINY trolley, the one right at the front by the wall. Pop the coin in and pull. It\'ll slide out like butter.',
    introMood: 'pleased',
    actions: ['drag', 'observe'],
    par: 1,
    hints: [
      'Look at how the trolleys are stacked. Which ones are free to move?',
      'Each trolley is pushed inside the one in front of it. Only one end of the line is open.',
      'Drag the coin onto the last trolley in the line, the one nearest you.'
    ],
    wrong: ['The shiny front trolley drags the whole line out with it (trap).', 'A trolley in the middle is wedged in from both sides (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One trolley, no tangle. The shopping can begin.',
    trick: 'Nested trolleys only come off the back of the line, so the coin had to go in the last one, not the shiny one by the wall.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('sign', 4, 4, 44, 10, { kind: 'static', text: 'TROLLEY BAY', label: 'Sign: trolley bay', cls: 'sign-card' }),
        O('open', 60, 4, 36, 10, { kind: 'static', text: 'Coin in, trolley out', label: 'Sign: put a coin in a trolley to take it', cls: 'tag-card' }),
        O('row', 4, 48, 92, 37.3, { kind: 'static', art: 'f-trolleyrow', label: 'Four trolleys pushed into each other in a line. The shiny one at the front is pressed against the wall; each one behind is pushed inside the one in front; the last one, nearest you, sticks out free.' }),
        O('coin', 30, 87, 11, 11, { art: 'f-coin', label: 'Your one-pound coin (drag it onto a trolley)', drag: true }),
        O('you', 44, 87.5, 30, 10, { kind: 'static', text: 'Your coin', label: '', cls: 'tag-card' })
      ];
      for (var i = 0; i < 4; i++) {
        var x = 4 + (12 + 62 * i) * 0.23, w = i < 3 ? 62 * 0.23 : 96 - x;
        out.push(O('t' + (i + 1), x, 50, w, 34, { kind: 'zone', zone: true, label: 'Trolley ' + (i + 1) + ': ' + NAMES[i] }));
      }
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'drop' || a.target !== 'coin') return false;
      switch (a.zone) {
        case 't1':
          api.fail('CLANK. The shiny trolley comes out… with the other three still inside it. You are now pushing a trolley train across the car park.');
          return true;
        case 't2': case 't3':
          api.nope('coin');
          api.say('Wedged solid. It has a trolley inside it AND a trolley around it. It\'s a trolley sandwich.', 'annoyed');
          return true;
        case 't4':
          api.defy('back');
          api.complete({ line: 'The last one? The scruffy one with the wonky wheel? …It came out first try. The shiny one is still sulking by the wall. So am I.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ drop: ['coin', 't4'] }],
    checks: [
      { name: 'the shiny front trolley', steps: [{ drop: ['coin', 't1'] }], expect: 'fail' },
      { name: 'a wedged middle trolley', steps: [{ drop: ['coin', 't2'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
