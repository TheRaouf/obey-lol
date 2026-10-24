/* Level 96 — Static Cling
 * The paper-thin keycard is on a high shelf. Bossworth says static electricity is a myth.
 * Press and hold the balloon to rub it on your woolly jumper (it charges), then drag the charged
 * balloon to the keycard: it sticks and comes down. Swipe it at the door.
 * Wrong: the wobbly stool (trap), the door without a card (nope), an uncharged balloon (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var RUB_MS = 1500;

  OBEY.registerLevel({
    id: 'static-cling',
    num: 96,
    title: 'Static Cling',
    objective: 'Get the keycard down and open the lab door.',
    intro: 'Your keycard is on the top shelf. Out of reach. Forget the balloon: static electricity is a myth invented by jumpers to get attention.',
    introMood: 'pleased',
    actions: ['hold', 'drag', 'tap'],
    par: 3,
    hints: [
      'Rub a balloon on wool and it picks up a charge. Charged balloons attract light things.',
      'Press and hold the balloon to rub it on your woolly jumper, then bring it to the keycard.',
      'Hold the balloon for two seconds, drag it onto the keycard, then tap the door.'
    ],
    wrong: ['Climbing the wobbly stool sends you to the floor (trap).', 'The door will not open without the keycard (nope).', 'An uncharged balloon just bonks the keycard (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Hair: standing up. Keycard: down. Myth: busted.',
    trick: 'Rubbing a balloon on wool charges it with static, and a charged balloon can lift something as light as a paper keycard.',

    init: function () { return { charged: false, card: false, rubbing: false }; },

    view: function (s) {
      return [
        O('door', 4, 16, 28, 66, { art: 'door', artOpts: { sign: 'SWIPE CARD' }, label: 'Lab door with a card reader' + (s.card ? ' (you have the keycard)' : '') }),
        O('shelf', 56, 24, 40, 8, { kind: 'static', art: 'shelf', label: 'High shelf' }),
        O('keycard', 64, 9, 24, 16, { art: 'd-keycard', label: 'Paper-thin keycard on the top shelf', zone: true, hidden: s.card }),
        O('hero', 38, 64, 14, 16, { kind: 'static', art: 'hero', label: 'You, in a very woolly jumper', cls: s.charged ? 'shimmer' : '' }),
        O('held', 37, 54, 16, 11, { kind: 'static', art: 'd-keycard', artOpts: { tilt: 8 }, label: 'You are holding the keycard', hidden: !s.card, cls: 'pop-in' }),
        O('balloon', 56, 42, 18, 28, { art: 'd-balloon', artOpts: { charged: s.charged }, label: s.charged ? 'Balloon, crackling with static (drag it)' : 'Balloon (press and hold to rub it on your jumper)', hold: !s.charged, drag: s.charged, hidden: s.card, cls: s.rubbing ? 'charging' : '' }),
        O('stool', 78, 56, 18, 24, { art: 'd-stool', label: 'Wobbly stool' }),
        O('tag', 36, 86, 60, 10, { kind: 'static', text: 'Jumper: 100% wool. Keycard: paper-thin.', label: 'Your jumper is 100% wool. The keycard is paper-thin.', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'holdstart:balloon':
          s.rubbing = true;
          api.say('Are you rubbing a balloon on your jumper? In MY lab? How childish. How… crackly.', 'suspicious');
          return true;
        case 'holdend:balloon':
          s.rubbing = false;
          if (s.charged) return true;
          if (a.ms >= RUB_MS) {
            s.charged = true;
            api.say('Your hair is standing up. The balloon is crackling. This proves nothing!', 'panicked');
          } else api.say('A quick rub. Barely a fizzle. Static needs commitment.', 'pleased');
          return true;
        case 'tap:balloon':
          api.say('It\'s a balloon. You press and HOLD it to rub it. Not that you should.', 'neutral');
          return true;
        case 'drop:balloon':
          if (a.zone === 'keycard' && !s.charged) {
            api.nope();
            api.say('Bonk. An uncharged balloon is just a sad rubber cloud. Told you: myth.', 'pleased');
          } else if (a.zone === 'keycard') {
            s.card = true;
            api.defy('static');
            api.say('The keycard just… leapt onto the balloon. It\'s a coincidence. A very statically charged coincidence.', 'surprised');
          } else api.say('The balloon drifts back to you. It likes you. Static does that.', 'neutral');
          return true;
        case 'tap:keycard':
          api.nope();
          api.say('Way out of reach. Have you tried being taller?', 'pleased');
          return true;
        case 'drop:keycard':
          return false;
        case 'tap:stool':
          api.fail('You climb the wobbly stool. It wobbles. You do not. WHUMP. Floor. Back to the start, champ.', 'laughing');
          return true;
        case 'tap:door':
          if (!s.card) { api.nope(); api.say('Beep-boop. "No card, no entry." The door agrees with me for once.', 'pleased'); }
          else api.complete({ line: 'Beep. Green light. You opened my door with a BALLOON. I\'m writing to the Physics people.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ hold: ['balloon', 2000] }, { drop: ['balloon', 'keycard'] }, { tap: 'door' }],
    checks: [
      { name: 'wobbly stool is a trap', steps: [{ tap: 'stool' }], expect: 'fail' },
      { name: 'door without the card is a nope', steps: [{ tap: 'door' }], expect: 'nope' },
      { name: 'keycard out of reach is a nope', steps: [{ tap: 'keycard' }], expect: 'nope' },
      { name: 'short rub does not charge', steps: [{ hold: ['balloon', 500] }, { drop: ['balloon', 'keycard'] }, { tap: 'door' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
