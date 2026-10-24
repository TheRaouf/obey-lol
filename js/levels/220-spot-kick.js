/* Level 220 — Spot Kick (Whistle Woods)
 * Bossworth is in goal (and refereeing). He honestly announces he'll dive to HIS left, then tells
 * you to shoot to YOUR right "where I won't be". He faces you, so his left is your right: his glove
 * marked L is on your right-hand side.
 * Solution: shoot to your LEFT.  Wrong: your right (trap: saved); the middle (nope: he blocks with a boot).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'spot-kick',
    num: 220,
    title: 'Spot Kick',
    objective: 'Score the penalty.',
    intro: 'Penalty! I\'m in goal AND refereeing. A gift: I will dive to MY left. Honestly. So shoot to YOUR right, where I definitely won\'t be.',
    introMood: 'suspicious',
    actions: ['tap', 'observe', 'logic'],
    par: 1,
    hints: [
      'He\'s telling the truth about his dive. Look at his gloves.',
      'He faces you. His glove marked L is on your right-hand side, so "my left" is your right.',
      'Shoot to your left.'
    ],
    wrong: ['Shooting to your right goes exactly where he dives (trap).', 'The middle is blocked by his trailing boot (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Top corner. The keeper went the right way. His right way.',
    trick: 'He really did dive to his left, but he was facing you, so his left was your right and your left was wide open.',

    init: function () { return { dive: null, tries: 0 }; },

    view: function (s) {
      return [
        O('grass', 0, 74, 100, 26, { kind: 'static', art: 'j-grass' }),
        O('quote', 4, 3, 92, 12, { kind: 'static', text: 'KEEPER: "I will dive to MY left."', label: 'The keeper says: I will dive to my left.', cls: 'speech-card' }),
        O('goal', 4, 22, 92, 52, { kind: 'static', art: 'j-goal', label: 'Goal' }),
        O('keeper', 34, 40, 32, 34, { kind: 'static', art: 'j-keeper', artOpts: { dive: s.dive }, label: 'Bossworth in goal, facing you. His glove marked R is on your left; his glove marked L is on your right.' }),
        O('ball', 45, 77, 10, 9, { kind: 'static', art: 'j-ball', label: 'Ball on the penalty spot' }),
        O('left', 4, 88, 30, 10, { text: '◀ Shoot left', label: 'Shoot to your left', cls: 'btn-card' }),
        O('mid', 35, 88, 30, 10, { text: 'Shoot middle', label: 'Shoot down the middle', cls: 'btn-card' }),
        O('right', 66, 88, 30, 10, { text: 'Shoot right ▶', label: 'Shoot to your right', cls: 'btn-card accent' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'right') {
        api.fail('He dives to his left… which is YOUR right… and catches it! "I TOLD you where I was going!" Again!', 'laughing');
        return true;
      }
      if (a.target === 'mid') {
        s.dive = 'right';
        api.nope('mid');
        api.say('Down the middle! I dive… and my trailing boot blocks it. Pure skill. Also luck. Mostly boot.', 'pleased');
        return true;
      }
      if (a.target === 'left') {
        s.dive = 'right';
        api.defy('left');
        api.complete({ line: 'I dived to MY left, exactly as promised, and the ball went… the other way. Did I say "my left"? Facing you? Oh. OH.', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ tap: 'left' }],
    checks: [
      { name: 'his advice', steps: [{ tap: 'right' }], expect: 'fail' },
      { name: 'down the middle', steps: [{ tap: 'mid' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
