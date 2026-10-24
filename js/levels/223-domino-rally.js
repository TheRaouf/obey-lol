/* Level 223 — Domino Rally (Gutter Gulch)
 * A line of dominoes, each a bit bigger than the last, ends at a giant that can ring the bell.
 * Bossworth: "Push the GIANT! And leave my spare alone." The giant is far too heavy to push (nope),
 * and there's a gap where one domino is missing, so pushing the small one stops at the gap (nope).
 * Solution: drag the spare domino into the gap, then push the smallest domino.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'domino-rally',
    num: 223,
    title: 'Domino Rally',
    objective: 'Ring the bell with the dominoes.',
    intro: 'Domino rally! Push the GIANT one, it\'s the most powerful. Small ones are pointless. And leave my spare domino alone, it\'s for emergencies.',
    introMood: 'annoyed',
    actions: ['drag', 'tap', 'observe'],
    par: 2,
    hints: [
      'Look along the whole line. Is anything missing?',
      'Each domino only knocks over the next one, so the line can\'t have a gap. The spare is just the right size.',
      'Drag the spare into the gap, then push the smallest domino.'
    ],
    wrong: ['The giant domino is far too heavy to push by hand (nope).', 'Pushing the small domino stops at the gap (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Click-clack-clack-clack-BONG. The smallest push, the biggest noise.',
    trick: 'Small dominoes topple bigger ones, so once the spare filled the gap, the tiniest push travelled all the way to the giant and the bell.',

    init: function () { return { filled: false, fallen: false }; },

    view: function (s) {
      var f = s.fallen;
      return [
        O('sign', 4, 3, 70, 22, { kind: 'static', text: 'DOMINO RALLY: ring the bell! Each domino knocks over the next.', label: 'Domino rally: ring the bell. Each domino knocks over the next one.', cls: 'sign-card' }),
        O('bell', 88, 64, 10, 10, { kind: 'static', art: 'bell', label: 'Bell at the end of the line' }),
        O('d1', 6, 58, 10, 16, { art: 'j-domino', artOpts: { top: 1, bottom: 1, fallen: f }, label: 'Smallest domino (push it)' }),
        O('d2', 17, 56, 9, 18, { kind: 'static', art: 'j-domino', artOpts: { top: 1, bottom: 2, fallen: f }, label: 'Domino 2' }),
        O('gap', 28, 52, 11, 22, { art: s.filled ? 'j-domino' : null, artOpts: { top: 3, bottom: 4, fallen: f }, label: s.filled ? 'The spare domino, standing in the gap' : 'Gap in the line, where domino 3 should be', zone: true, cls: s.filled ? '' : 'zone-ghost' }),
        O('d4', 41, 48, 13, 26, { kind: 'static', art: 'j-domino', artOpts: { top: 4, bottom: 5, fallen: f }, label: 'Domino 4' }),
        O('d5', 55, 40, 16, 34, { kind: 'static', art: 'j-domino', artOpts: { top: 5, bottom: 6, fallen: f }, label: 'Domino 5' }),
        O('giant', 68, 28, 20, 46, { art: 'j-domino', artOpts: { top: 6, bottom: 6, fallen: f }, label: 'The giant domino (very heavy)' }),
        O('spare', 6, 84, 24, 12, { art: 'j-domino', artOpts: { flat: true }, label: 'Spare domino lying on the floor (drag it)', drag: true, hidden: s.filled }),
        O('note', 36, 84, 60, 11, { kind: 'static', text: s.filled ? 'The line is complete.' : 'Spare domino: Bossworth\'s. "Emergencies only."', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'spare') {
        if (a.zone === 'gap') {
          s.filled = true;
          api.defy('spare');
          api.say('My SPARE! In the GAP! This is not an emergency! …Is it? It might be a small emergency.', 'panicked');
        } else {
          api.say('The spare clatters back onto the floor. It wants a purpose. It\'s not getting one. It\'s a spare.', 'pleased');
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'giant':
          api.nope('giant');
          api.say('You push the giant. The giant does not notice. It weighs about as much as a small car. Push HARDER!', 'pleased');
          return true;
        case 'd1':
          if (!s.filled) {
            api.nope('d1');
            api.say('Click, clack… and nothing. Domino 2 falls into the gap and lies there. I stand them back up. Told you small ones were pointless.', 'pleased');
          } else {
            s.fallen = true;
            api.complete({ line: 'Click… clack… CLACK… CLONK… *BONG*. The tiny one knocked over the GIANT? With my SPARE in the middle? This is the emergency I was saving it for.', mood: 'defeated' });
          }
          return true;
        case 'gap':
          api.say(s.filled ? 'The spare stands in the gap. It looks very pleased with itself.' : 'An empty gap. Exactly one domino wide. Pure coincidence.', 'suspicious');
          return true;
      }
      return false;
    },

    solution: [{ drop: ['spare', 'gap'] }, { tap: 'd1' }],
    checks: [
      { name: 'push the giant', steps: [{ tap: 'giant' }], expect: 'nope' },
      { name: 'push with a gap', steps: [{ tap: 'd1' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
