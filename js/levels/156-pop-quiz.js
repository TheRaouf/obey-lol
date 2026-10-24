/* Level 156 — Pop Quiz (Chalkboard Chasm)
 * "Start at question 1 and do them ALL, fast, no reading ahead." The paper's first line says read every
 * question first, and question 5 says: ignore questions 2 to 4, just hand in your paper.
 * Solution: do Q1 (your name), hand in. Wrong: doing Q2–Q4 then handing in (trap); handing in without a
 * name (nope). Ruin: fold the quiz into a paper plane.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DO = {
    q1: { btn: 'Q1: name', said: 'You write your name. Neatly. Now question 2, chop chop!' },
    q2: { btn: 'Q2: sum', said: 'You work out 17 × 23 in the margin. It takes a while. Keep going!' },
    q3: { btn: 'Q3: planets', said: 'You list every planet. And a few moons, to be safe. Onwards!' },
    q4: { btn: 'Q4: quack', said: 'You stand up and quack. The whole class turns round. Magnificent. Next!' }
  };

  OBEY.registerLevel({
    id: 'pop-quiz',
    num: 156,
    title: 'Pop Quiz',
    objective: 'Finish the quiz and hand it in.',
    intro: 'SPEED quiz! Start at question 1 and do every single one, in order, FAST. No reading ahead. Reading ahead is basically cheating. GO GO GO!',
    introMood: 'panicked',
    actions: ['tap', 'read'],
    par: 2,
    hints: [
      'The first line of the paper is an instruction too.',
      'Read all the way to question 5 before you do anything.',
      'Do question 1 (your name), skip 2 to 4, and hand it in.'
    ],
    wrong: ['Doing questions 2 to 4 before handing in is a trap.', 'Handing in without your name is a nope.', 'Folding the quiz into a plane is a ruin.'],
    secrets: [],
    endingNote: 'None.',
    done: 'One name, zero quacks, full marks.',
    trick: 'Reading every question first showed that question 5 cancelled 2 to 4, so the whole quiz was just your name.',

    init: function () { return { done: {} }; },

    view: function (s) {
      var out = [
        O('paper', 4, 4, 62, 62, { kind: 'static', text: 'POP QUIZ\nRead ALL the questions before you start.\n1. Write your name.\n2. What is 17 × 23?\n3. Name every planet.\n4. Stand up and quack.\n5. Ignore questions 2 to 4. Just hand in your paper.', label: 'Quiz paper. Read all the questions before you start. 1, write your name. 2, what is 17 times 23. 3, name every planet. 4, stand up and quack. 5, ignore questions 2 to 4, just hand in your paper.', cls: 'book-card' })
      ];
      ['q1', 'q2', 'q3', 'q4'].forEach(function (k, i) {
        var d = !!s.done[k];
        out.push(O(k, 70, 4 + i * 12.5, 26, 10.5, { text: DO[k].btn + (d ? ' ✓' : ''), label: 'Do question ' + (i + 1) + (d ? ' (done)' : ''), cls: 'btn-card' + (d ? ' ghost' : '') }));
      });
      out.push(O('handin', 70, 54, 26, 12, { text: 'Hand in', label: 'Hand in your paper', cls: 'btn-card big' }));
      out.push(O('plane', 4, 70, 30, 10, { text: 'Fold a plane', label: 'Fold the quiz into a paper plane', cls: 'btn-card' }));
      out.push(O('desk', 34, 74, 40, 22, { kind: 'static', art: 'g-desk' }));
      out.push(O('kid', 78, 64, 14, 30, { kind: 'static', art: 'g-kid', artOpts: { color: '#5fd98a', hair: '#9a6b3f' }, label: '' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (DO[a.target]) {
        if (s.done[a.target]) { api.say('Already done. Faster! The next one!', 'panicked'); return true; }
        s.done[a.target] = true;
        api.say(DO[a.target].said, 'pleased');
        return true;
      }
      if (a.target === 'handin') {
        var extra = ['q2', 'q3', 'q4'].filter(function (k) { return s.done[k]; });
        if (!s.done.q1) {
          api.nope('handin');
          api.say('No name? Then whose quiz is it? Mine? I don\'t take quizzes. I GIVE them.', 'suspicious');
        } else if (extra.length) {
          api.fail(extra.indexOf('q4') >= 0
            ? 'You quacked. Question 5 said ignore questions 2 to 4. Everyone who read it is now laughing at the duck. New paper!'
            : 'You did question ' + extra[0].slice(1) + '. Question 5 said ignore 2 to 4. Read to the end, then start. New paper!');
        } else {
          api.complete({ line: 'Name, hand in, done? In four seconds? You READ AHEAD. That is… exactly what the first line said. I wrote this quiz. Did I read it?', mood: 'defeated' });
        }
        return true;
      }
      if (a.target === 'plane') {
        api.complete({ ruin: 'quiz-plane', line: 'You folded my quiz into a PLANE. It sailed out of the window and into the head teacher\'s coffee. Ten out of ten for distance. ZERO for everything else!', mood: 'panicked' });
        return true;
      }
      return false;
    },

    solution: [{ tap: 'q1' }, { tap: 'handin' }],
    ruinPaths: { 'quiz-plane': [{ tap: 'plane' }] },
    checks: [
      { name: 'do every question', steps: [{ tap: 'q1' }, { tap: 'q2' }, { tap: 'q3' }, { tap: 'q4' }, { tap: 'handin' }], expect: 'fail' },
      { name: 'no name', steps: [{ tap: 'handin' }], expect: 'nope' },
      { name: 'plane is a ruin', steps: [{ tap: 'plane' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
