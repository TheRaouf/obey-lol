/* Level 49 — Revolving Door
 * Seen from above: each push turns the door a quarter. Your section starts facing the lobby; after two
 * pushes it faces OUTSIDE. Bossworth says never stop pushing — stop, and step out. Stepping out into glass
 * or the lobby is a nope. Ruin (spin-cycle): push twelve times.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var FACING = ['the LOBBY', 'a glass wall', 'OUTSIDE', 'a glass wall'];

  OBEY.registerLevel({
    id: 'revolving-door',
    num: 49,
    title: 'Revolving Door',
    objective: 'Get out through the revolving door.',
    intro: 'Revolving door! Push, push, push! Keep pushing until you\'re outside! Faster! Never stop! Momentum is leadership!',
    introMood: 'pleased',
    actions: ['tap', 'observe', 'count'],
    par: 3,
    hints: [
      'Pushing moves you around. It does not, by itself, let you out.',
      'Watch which way your section faces. Each push is a quarter turn.',
      'Push twice, then step out.'
    ],
    wrong: ['Stepping out into the glass is a bonk (nope).', 'Stepping out into the lobby gets you nowhere (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Outside. Two pushes and a step. Momentum is overrated.',
    trick: 'The door only lets you out if you stop pushing when your section faces OUTSIDE.',
    ruinPaths: { 'spin-cycle': [{ tap: 'push' }, { tap: 'push' }, { tap: 'push' }, { tap: 'push' }, { tap: 'push' }, { tap: 'push' }, { tap: 'push' }, { tap: 'push' }, { tap: 'push' }, { tap: 'push' }, { tap: 'push' }, { tap: 'push' }] },

    init: function () { return { turn: 0 }; },

    view: function (s) {
      var f = FACING[s.turn % 4];
      return [
        O('outside', 18, 2, 30, 10, { kind: 'static', text: 'OUTSIDE ☀', label: 'Outside is at the top', cls: 'tag-card' }),
        O('door', 4, 14, 58, 58, { kind: 'static', art: 'a-revolving', artOpts: { turn: s.turn }, label: 'Revolving door seen from above. Your section faces ' + f + '.' }),
        O('lobby', 18, 74, 30, 10, { kind: 'static', text: 'LOBBY', label: 'The lobby is at the bottom', cls: 'tag-card' }),
        O('status', 66, 14, 30, 24, { kind: 'static', text: 'Your section faces:\n' + f, label: 'Your section faces ' + f, cls: 'display-card' + (s.turn % 4 === 2 ? ' ready' : '') }),
        O('push', 66, 42, 30, 13, { text: 'PUSH ↻', label: 'Push the door a quarter turn', cls: 'btn-card big' }),
        O('step', 66, 59, 30, 13, { text: 'Step out', label: 'Step out of your section', cls: 'btn-card accent' }),
        O('sign', 4, 88, 92, 9, { kind: 'static', text: 'Please do not spin for fun. — Management', label: 'Sign: please do not spin for fun', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'push') {
        s.turn++;
        if (s.turn >= 12) {
          api.complete({ ruin: 'spin-cycle', line: 'Twelve pushes! Three full laps! You fly out sideways into the fountain. Dizzy. Wet. Technically outside. I\'m going to be sick in my top hat.', mood: 'panicked' });
          return true;
        }
        var f = s.turn % 4;
        api.say(f === 2 ? 'Faster! Keep going! Don\'t look at the daylight, it\'s a distraction!' : (f === 0 ? 'Back in the lobby! Again! Push harder, you\'ll get there eventually!' : 'Push! PUSH! Momentum!'), 'pleased');
        return true;
      }
      if (a.target === 'step') {
        var g = s.turn % 4;
        if (g === 2) {
          api.defy('stop');
          api.complete({ line: 'You… stopped. And stepped out. Into the sunshine. Without momentum. Leadership has never been so disappointed.', mood: 'defeated' });
          return true;
        }
        api.nope('step');
        api.say(g === 0 ? 'You step out into the lobby. Where you started. Bold strategy. Keep pushing!' : 'BONK. That\'s glass. Very clean glass. You can see the outside through your own face-print.', 'laughing');
        return true;
      }
      return false;
    },

    solution: [{ tap: 'push' }, { tap: 'push' }, { tap: 'step' }],
    checks: [
      { name: 'step into the glass', steps: [{ tap: 'push' }, { tap: 'step' }], expect: 'nope' },
      { name: 'step back into the lobby', steps: [{ tap: 'step' }], expect: 'nope' },
      { name: 'keep pushing past the exit', steps: [{ tap: 'push' }, { tap: 'push' }, { tap: 'push' }, { tap: 'push' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
