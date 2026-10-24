/* Level 219 — Own Goal (Whistle Woods)
 * Bossworth set the scoreboard to BOSS 2 : 1 YOU. The goal log shows both of his goals went into his
 * own net, and the sign says an own goal counts for the OTHER team. Real score: BOSS 0 : 3 YOU.
 * Solution: BOSS − twice, YOU + twice, Confirm.
 * Wrong: confirming his 2 : 1 (trap); any other wrong score (nope); going below zero (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'own-goal',
    num: 219,
    title: 'Own Goal',
    objective: 'Put the true score on the board.',
    intro: 'I scored TWO goals today! Both mine, both beauties. I\'ve already set the board: 2–1 to me. Just press Confirm. The log is boring, don\'t read it.',
    introMood: 'pleased',
    actions: ['tap', 'read', 'count'],
    par: 5,
    hints: [
      'Read where each goal in the log actually went.',
      'Both of Bossworth\'s goals went into his own net, and an own goal counts for the other team.',
      'Press BOSS − twice and YOU + twice to make it BOSS 0 : 3 YOU, then Confirm.'
    ],
    wrong: ['Confirming Bossworth\'s 2 : 1 is a trap.', 'Any other wrong score is sent back (nope).', 'Scores can\'t go below zero (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Three-nil. Bossworth\'s two "beauties" now officially belong to you.',
    trick: 'Both of Bossworth\'s goals were into his own net, and own goals count for the other side, so the true score was 3–0 to you.',

    init: function () { return { b: 2, y: 1 }; },

    view: function (s) {
      return [
        O('log', 4, 3, 56, 34, { kind: 'static', text: 'GOAL LOG\n12\' Bossworth: into his OWN net\n40\' Bossworth: own net again\n77\' You: header', label: 'Goal log. 12 minutes: Bossworth, into his own net. 40 minutes: Bossworth, own net again. 77 minutes: you, header.', cls: 'book-card' }),
        O('signhead', 63, 3, 33, 11, { kind: 'static', text: 'OWN GOALS', label: 'Own goals rule sign', cls: 'sign-card' }),
        O('sign', 62, 15.5, 34, 23, { kind: 'static', text: 'An own goal counts for the OTHER team.', label: 'Sign: an own goal counts for the other team.', cls: 'honest-card' }),
        O('board', 14, 41, 72, 15, { kind: 'static', text: 'BOSS ' + s.b + ' : ' + s.y + ' YOU', label: 'Scoreboard: Bossworth ' + s.b + ', you ' + s.y, cls: 'display-card' }),
        O('b-minus', 4, 60, 20, 12, { text: 'BOSS −', label: 'Bossworth\'s score minus one', cls: 'btn-card' }),
        O('b-plus', 26, 60, 20, 12, { text: 'BOSS +', label: 'Bossworth\'s score plus one', cls: 'btn-card' }),
        O('y-minus', 54, 60, 20, 12, { text: 'YOU −', label: 'Your score minus one', cls: 'btn-card' }),
        O('y-plus', 76, 60, 20, 12, { text: 'YOU +', label: 'Your score plus one', cls: 'btn-card' }),
        O('confirm', 24, 80, 52, 14, { text: 'Confirm score', label: 'Confirm the score on the board', cls: 'btn-card big' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var k = { 'b-minus': ['b', -1], 'b-plus': ['b', 1], 'y-minus': ['y', -1], 'y-plus': ['y', 1] }[a.target];
      if (k) {
        if (s[k[0]] + k[1] < 0) {
          api.nope(a.target);
          api.say('Minus goals? Even I can\'t score fewer than none. And I\'ve tried.', 'annoyed');
          return true;
        }
        if (s[k[0]] + k[1] > 9) { api.nope(a.target); api.say('Nine goals is plenty for anyone. Except me.', 'neutral'); return true; }
        s[k[0]] += k[1];
        if (k[0] === 'b' && k[1] < 0) api.say('You\'re taking goals OFF me? Those were beauties! Into a net! Which net is irrelevant!', 'annoyed');
        else if (k[0] === 'y' && k[1] > 0) { api.defy('own-goals'); api.say('Giving YOURSELF goals now? Shameless. Accurate, possibly, but shameless.', 'suspicious'); }
        return true;
      }
      if (a.target !== 'confirm') return false;
      if (s.b === 0 && s.y === 3) {
        api.complete({ line: 'Nil–three. Both my goals were… for you. I was playing for the wrong team all along. Nobody tell the team. Either team.', mood: 'defeated' });
      } else if (s.b === 2 && s.y === 1) {
        api.fail('Confirmed! 2–1 to me! …The league secretary reads the log and the sign, and crosses it all out. The board resets. Count properly!', 'laughing');
      } else {
        api.nope('confirm');
        api.say(s.b + '–' + s.y + '? That doesn\'t match the log. Not that I\'d know. I never read the log.', 'suspicious');
      }
      return true;
    },

    solution: [{ tap: 'b-minus' }, { tap: 'b-minus' }, { tap: 'y-plus' }, { tap: 'y-plus' }, { tap: 'confirm' }],
    checks: [
      { name: 'confirm his score', steps: [{ tap: 'confirm' }], expect: 'fail' },
      { name: 'ignore the own goals', steps: [{ tap: 'b-minus' }, { tap: 'b-minus' }, { tap: 'confirm' }], expect: 'nope' },
      { name: 'below zero', steps: [{ tap: 'b-minus' }, { tap: 'b-minus' }, { tap: 'b-minus' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
