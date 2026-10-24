/* Level 16 — Opposite Day
 * Answer three questions with the opposite of the truth.
 * Q1 "Is the sky green?" (truth: no → YES)  Q2 "Do you want to finish this level?" (truth: yes → NO)
 * Q3 "Is today Opposite Day?" (truth: yes → NO). Any wrong answer is a trap that restarts the quiz.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var QS = [
    { q: 'Is the sky green?', a: 'yes' },
    { q: 'Do you want to finish this level?', a: 'no' },
    { q: 'Is today Opposite Day?', a: 'no' }
  ];

  OBEY.registerLevel({
    id: 'opposite-day',
    num: 16,
    title: 'Opposite Day',
    objective: 'Answer all three questions the Opposite Day way.',
    intro: 'Happy Opposite Day! Every answer means its opposite. Answer my three questions… truthfully. Wait. Opposite of that.',
    introMood: 'pleased',
    actions: ['tap', 'logic'],
    par: 3,
    hints: [
      'Work out the true answer first, then flip it.',
      'The sky isn\'t green, so on Opposite Day you answer YES.',
      'Answer YES, then NO, then NO.'
    ],
    wrong: ['Any truthful answer is a trap and restarts the questions.'],
    secrets: [],
    endingNote: 'None.',
    done: 'You said the opposite of everything. Bossworth feels seen.',

    init: function () { return { q: 0 }; },

    view: function (s) {
      var cur = QS[Math.min(s.q, QS.length - 1)];
      return [
        O('calendar', 14, 2, 72, 13, { kind: 'static', text: 'TODAY: OPPOSITE DAY', label: 'Calendar: today is Opposite Day', cls: 'sign-card' }),
        O('question', 6, 18, 88, 22, { kind: 'static', text: 'Question ' + (s.q + 1) + ' of 3:\n' + cur.q, label: 'Question ' + (s.q + 1) + ' of 3: ' + cur.q, cls: 'plaque-card' }),
        O('yes', 8, 48, 38, 18, { text: 'YES', label: 'Answer YES', cls: 'btn-card big' }),
        O('no', 54, 48, 38, 18, { text: 'NO', label: 'Answer NO', cls: 'btn-card big' }),
        O('score', 30, 74, 40, 10, { kind: 'static', text: ['○ ○ ○', '● ○ ○', '● ● ○', '● ● ●'][s.q], label: s.q + ' of 3 answered', cls: 'panel-lights' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap' || (a.target !== 'yes' && a.target !== 'no')) return false;
      if (a.target === QS[s.q].a) {
        s.q++;
        if (s.q === QS.length) {
          api.complete({ line: 'Wrong, wrong and wrong! Which means… right. I hate Opposite Day. (I love it.)', mood: 'defeated' });
        } else {
          api.say(['Correct! I mean… INCORRECT! I mean… next question.', 'Hmm. Opposite-correct. One more.'][s.q - 1], 'suspicious');
        }
      } else {
        api.fail('HA! You told the TRUTH on Opposite Day! That\'s the biggest lie of all. Back to question one.');
      }
      return true;
    },

    solution: [{ tap: 'yes' }, { tap: 'no' }, { tap: 'no' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
