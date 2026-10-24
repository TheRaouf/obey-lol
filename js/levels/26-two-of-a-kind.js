/* Level 26 — Two of a Kind
 * Bossworth and his twin Kevin: one always lies, one always tells the truth (Bossworth lies; you
 * aren't told). Exit = RIGHT. Direct questions conflict and prove nothing; the classic question
 * "Kevin, what would Bossworth say is the exit?" gets "LEFT" → take the other door.
 * You may only ask one question. Wrong door = trap.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var QUESTIONS = [
    { id: 'q-boss', text: 'Ask Bossworth: which door is the exit?', who: 'Bossworth', answer: 'LEFT.' },
    { id: 'q-kevin', text: 'Ask Kevin: which door is the exit?', who: 'Kevin', answer: 'RIGHT.' },
    { id: 'q-meta', text: 'Ask Kevin: what would Bossworth say is the exit?', who: 'Kevin', answer: 'He would say LEFT.' }
  ];

  OBEY.registerLevel({
    id: 'two-of-a-kind',
    num: 26,
    title: 'Two of a Kind',
    objective: 'Pick the real exit. You may ask one question.',
    intro: 'Meet my twin, Kevin. One of us ALWAYS lies and one ALWAYS tells the truth. You get ONE question. I won\'t say which of us is which. (It\'s Kevin. Kevin lies. Probably.)',
    introMood: 'suspicious',
    actions: ['choice', 'logic', 'tap'],
    par: 2,
    hints: [
      'A direct question only tells you what one twin says — not whether he\'s honest.',
      'Ask one twin what the OTHER twin would say. Either way, that answer is a lie.',
      'Ask Kevin what Bossworth would say (LEFT), then take the other door: RIGHT.'
    ],
    wrong: ['The left door is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Logic beat the twins. Kevin sends his regards (they are lies).',

    init: function () { return { asked: null }; },

    view: function (s) {
      var objs = [
        O('kevin', 38, 2, 24, 26, { kind: 'static', art: 'twin', label: 'Kevin, Bossworth\'s twin' }),
        O('leftdoor', 4, 4, 28, 50, { art: 'door', artOpts: { sign: 'LEFT' }, label: 'Left door' }),
        O('rightdoor', 68, 4, 28, 50, { art: 'door', artOpts: { sign: 'RIGHT' }, label: 'Right door' }),
        O('answer', 36, 30, 28, 22, { kind: 'static', text: s.asked ? s.asked.who + ': "' + s.asked.answer + '"' : 'You may ask one question.', label: s.asked ? s.asked.who + ' answers: ' + s.asked.answer : 'You may ask one question', cls: 'speech-card' })
      ];
      QUESTIONS.forEach(function (q, i) {
        objs.push(O(q.id, 4, 58 + i * 13, 92, 11, { text: q.text, label: q.text, cls: 'btn-card option', disabled: !!s.asked }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var q = QUESTIONS.filter(function (x) { return x.id === a.target; })[0];
      if (q) {
        s.asked = q;
        api.say(q.id === 'q-meta' ? 'Oh no. That\'s the clever question. Who taught you the clever question?!' : (q.who === 'Kevin' ? 'Kevin has spoken. Is Kevin honest? Who knows! (I know.)' : 'I have answered. Truthfully. Or not. Good luck!'), q.id === 'q-meta' ? 'panicked' : 'pleased');
        return true;
      }
      if (a.target === 'rightdoor') { api.complete({ line: 'The right door! Kevin, you told them? KEVIN. …Kevin doesn\'t exist, by the way. I was doing both voices.', mood: 'defeated' }); return true; }
      if (a.target === 'leftdoor') { api.fail('A RUBBER CHICKEN falls from the ceiling. *honk*. The liar fooled you. One of us is laughing. (Me.)'); return true; }
      return false;
    },

    solution: [{ tap: 'q-meta' }, { tap: 'rightdoor' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
