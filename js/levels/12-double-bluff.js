/* Level 12 — The Double Bluff
 * Layered deception that "always disobey" cannot solve: both doors are traps, and Bossworth's
 * instruction to pull the lever is — for once — true. He expects you to disobey, which is the bluff.
 * The parrot only repeats true things and gives escalating clues.
 * Wrong: left door / right door → soft fail. Secret: polly (drag the cracker onto the parrot).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PARROT = [
    'SQUAWK! Both doors bad! Both doors bad!',
    'SQUAWK! He tells the truth ONCE today! SQUAWK!',
    'SQUAWK! Cracker? Cracker? CRACKER?'
  ];

  OBEY.registerLevel({
    id: 'double-bluff',
    num: 12,
    title: 'The Double Bluff',
    objective: 'Find the real way out.',
    intro: 'Two doors. The left one? Trap. The right one? Also, honestly, a trap. The LEVER opens the exit. I am telling the truth. Pull it.',
    introMood: 'neutral',
    actions: ['tap', 'drag', 'trust'],
    par: 1,
    hints: [
      'Bossworth can tell the truth when he expects you to disobey.',
      'Ask the parrot — it only repeats true things.',
      'Pull the lever. Really.'
    ],
    wrong: ['The left door drops you through a trapdoor (soft fail).', 'The right door delivers a pie to the face (soft fail).'],
    secrets: ['polly'],
    endingNote: 'None.',
    done: 'The deepest bluff is the truth.',

    init: function () { return { parrot: 0, fed: false }; },

    view: function (s) {
      return [
        O('left', 4, 20, 26, 60, { art: 'door', artOpts: { sign: 'LEFT' }, label: 'Left door' }),
        O('right', 70, 20, 26, 60, { art: 'door', artOpts: { sign: 'RIGHT' }, label: 'Right door' }),
        O('lever', 40, 52, 20, 36, { art: 'lever', label: 'Lever' }),
        O('parrot', 38, 8, 22, 28, { art: 'parrot', artOpts: { happy: s.fed }, label: 'Parrot on a perch', free: true, zone: true }),
        O('cracker', 64, 86, 12, 9, { art: 'cracker', label: 'Cracker', drag: true, free: true, hidden: s.fed })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'cracker') {
        if (a.zone === 'parrot') {
          s.fed = true;
          api.secret('polly');
          api.say('Parrot: "SQUAWK! His middle name is KEVIN!" …HOW DOES THE BIRD KNOW THAT.', 'panicked');
        } else {
          api.say('You put the cracker down. Somewhere, a parrot weeps.', 'neutral');
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'left':
          api.fail('The floor opens. Not like a door opens. You slide back to the start. Told you.', 'pleased');
          return true;
        case 'right':
          api.fail('SPLAT. A pie to the face. I literally said it was a trap.', 'pleased');
          return true;
        case 'lever':
          api.complete({ line: '…You believed me? I told the TRUTH and you BELIEVED me? That\'s the deepest bluff of all. I\'m so confused.', mood: 'surprised' });
          return true;
        case 'parrot':
          api.say('Parrot: "' + PARROT[s.parrot % PARROT.length] + '"', 'suspicious');
          s.parrot++;
          return true;
      }
      return false;
    },

    solution: [{ tap: 'lever' }],
    secretPaths: { polly: [{ drop: ['cracker', 'parrot'] }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
