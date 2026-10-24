/* Level 234 — The Rehearsal
 * Before the finale Bossworth quizzes you on earlier levels (memory). Three questions, three
 * choices each. A wrong answer is a trap and restarts the quiz.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var QS = [
    { q: 'In "The Red Button", what did the big red button do?', opts: ['Opened the exit', 'Absolutely nothing', 'Launched confetti'], a: 1 },
    { q: 'In "The Missing Button", which numbers glowed in the dark?', opts: ['1 · 2 · 3', '7 · 7 · 7', '4 · 2 · 7'], a: 2 },
    { q: 'In "The Double Bluff", what was Bossworth honest about?', opts: ['The lever', 'The left door', 'The parrot\'s name'], a: 0 }
  ];

  OBEY.registerLevel({
    id: 'the-rehearsal',
    num: 234,
    title: 'The Rehearsal',
    objective: 'Pass Bossworth\'s pop quiz about your adventure.',
    intro: 'The finale is close. Let\'s rehearse! Three questions about our time together. I bet you weren\'t paying attention.',
    introMood: 'suspicious',
    actions: ['memory', 'choice'],
    par: 3,
    hints: [
      'Think back to Levels 1, 4 and 12.',
      'The red button was a dud; the glowing code was also used in the Broken Room.',
      'Answer: absolutely nothing, then 4 · 2 · 7, then the lever.'
    ],
    wrong: ['A wrong answer restarts the quiz (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Memory: excellent. Bossworth: slightly moved.',

    init: function () { return { q: 0 }; },

    view: function (s) {
      var cur = QS[Math.min(s.q, QS.length - 1)];
      var objs = [
        O('question', 4, 4, 92, 24, { kind: 'static', text: 'Question ' + (s.q + 1) + ' of 3\n' + cur.q, label: 'Question ' + (s.q + 1) + ' of 3: ' + cur.q, cls: 'plaque-card' })
      ];
      cur.opts.forEach(function (o, i) {
        objs.push(O('opt' + (i + 1), 8, 34 + i * 18, 84, 14, { text: o, label: 'Answer: ' + o, cls: 'btn-card option' }));
      });
      objs.push(O('score', 30, 88, 40, 9, { kind: 'static', text: ['○ ○ ○', '● ○ ○', '● ● ○', '● ● ●'][s.q], label: s.q + ' of 3 correct', cls: 'panel-lights' }));
      return objs;
    },

    on: function (a, s, api) {
      var m = a.type === 'tap' && /^opt([1-3])$/.exec(a.target);
      if (!m) return false;
      if (Number(m[1]) - 1 === QS[s.q].a) {
        s.q++;
        if (s.q === QS.length) api.complete({ line: 'Three for three. You remembered EVERYTHING. Which means you remember my lies. Uh-oh. To the finale!', mood: 'surprised' });
        else api.say(['Correct. The button did nothing. Like my apologies.', 'Correct. Spooky glowing numbers. Good memory.'][s.q - 1], 'suspicious');
      } else {
        api.fail('BZZZT! Wrong! Were you even paying attention?! I was BRILLIANT back there. From the top!');
      }
      return true;
    },

    solution: [{ tap: 'opt2' }, { tap: 'opt3' }, { tap: 'opt1' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
