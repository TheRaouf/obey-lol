/* Level 5 — Reverse Psychology
 * Teaches: reason about contradictory instructions instead of blindly flipping them.
 * Puzzle: "Exactly ONE of my statements is true." ① A is the exit. ② B is not the exit. ③ A is not the exit.
 * ① and ③ contradict, so exactly one of them is true → ② must be false → B is the exit (unique answer).
 * Bossworth also says "don't even think about B" — so pure obedience fails, but so does picking at random.
 * Wrong: switches A or C → soft fail. Secret: countdown (tap statements ③ ② ① in that order).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var STATEMENTS = ['① Switch A is the exit.', '② Switch B is NOT the exit.', '③ Switch A is NOT the exit.'];

  OBEY.registerLevel({
    id: 'reverse-psychology',
    num: 5,
    title: 'Reverse Psychology',
    objective: 'Pull the one switch that is the exit.',
    intro: 'I\'m feeling HONEST today: exactly ONE of my three statements is true. And don\'t even THINK about switch B.',
    introMood: 'suspicious',
    actions: ['tap', 'logic'],
    par: 1,
    hints: [
      'Statements ① and ③ contradict each other, so exactly one of them is true.',
      'That means the one true statement is ① or ③ — so statement ② must be false.',
      'If "B is NOT the exit" is false, then B is the exit.'
    ],
    wrong: ['Switch A and switch C are traps (soft fail).'],
    secrets: ['countdown'],
    endingNote: 'None.',
    done: 'Logic: my one weakness. My other weakness is you.',

    init: function () { return { seq: [] }; },

    view: function () {
      var objs = STATEMENTS.map(function (t, i) {
        return O('st' + (i + 1), 8, 4 + i * 15, 84, 13, { text: t, label: 'Statement ' + (i + 1) + ': ' + t.slice(2), free: true, cls: 'plaque-card' });
      });
      ['A', 'B', 'C'].forEach(function (letter, i) {
        objs.push(O('sw' + letter, 8 + i * 30, 56, 24, 36, { art: 'switch', artOpts: { letter: letter }, label: 'Switch ' + letter }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^st([123])$/.exec(a.target);
      if (m) {
        s.seq.push(Number(m[1]));
        if (s.seq.length > 3) s.seq.shift();
        if (s.seq.join() === '3,2,1') {
          api.secret('countdown');
          api.say('Three, two, one… you read my statements BACKWARDS? That\'s not how reading works! …It\'s a little bit how countdowns work.', 'surprised');
        } else {
          api.say(['Yes, that is a statement. Very readable.', 'Reading carefully? Suspicious.', 'One of these is true. Good luck guessing which. (Don\'t guess.)'][s.seq.length % 3], 'suspicious');
        }
        return true;
      }
      if (a.target === 'swB') {
        api.defy('switch-b');
        api.complete({ line: 'You thought about switch B. After I SPECIFICALLY said not to. With LOGIC.', mood: 'defeated' });
        return true;
      }
      if (a.target === 'swA' || a.target === 'swC') {
        api.fail('Wrong switch! Confetti cannon of shame. Remember: ① and ③ can\'t BOTH be true…', 'laughing');
        return true;
      }
      return false;
    },

    solution: [{ tap: 'swB' }],
    secretPaths: { countdown: [{ tap: 'st3' }, { tap: 'st2' }, { tap: 'st1' }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
