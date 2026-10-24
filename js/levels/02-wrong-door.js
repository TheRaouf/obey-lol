/* Level 2 — The Wrong Door
 * Teaches: question the narrator's assumptions about the "obvious" exit.
 * Solution: lift the doormat, take the key, open the small door marked NOT AN EXIT.
 * Wrong: the EXIT door is bricked up; the small door is locked without the key.
 * Secret: empty-corner (inspect the empty top-right corner).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'wrong-door',
    num: 2,
    title: 'The Wrong Door',
    objective: 'Leave the room.',
    intro: 'See that big shiny EXIT door? That\'s the exit. Obviously. Walk right through it.',
    introMood: 'pleased',
    actions: ['tap'],
    par: 3,
    hints: [
      'Doors labelled by Bossworth may not be honest about what they are.',
      'The doormat looks suspiciously lumpy.',
      'Lift the mat, take the key, then try the small door.'
    ],
    wrong: ['Opening the EXIT door reveals a brick wall.', 'The small door is locked until you have the key.'],
    secrets: ['empty-corner'],
    endingNote: 'None.',
    done: 'Fine. The "not an exit" was an exit. Words mean nothing anymore.',

    init: function () { return { exitOpened: false, matLifted: false, hasKey: false }; },

    view: function (s) {
      return [
        O('corner', 80, 0, 20, 16, { art: 'cobweb', label: 'Suspiciously empty corner', free: true, cls: 'subtle' }),
        O('exit', 8, 16, 38, 66, { art: 'door', artOpts: { sign: 'EXIT', bricked: s.exitOpened, big: true }, label: s.exitOpened ? 'EXIT door, bricked up' : 'Big door marked EXIT' }),
        O('mat', 10, 84, 34, 10, { art: 'mat', artOpts: { lifted: s.matLifted }, label: s.matLifted ? 'Doormat, flipped over' : 'Doormat reading WELCOME', disabled: s.matLifted }),
        O('key', 22, 86, 10, 8, { art: 'key', label: 'Small brass key', hidden: !s.matLifted || s.hasKey, cls: 'pop-in' }),
        O('closet', 62, 36, 26, 46, { art: 'door', artOpts: { sign: 'NOT AN EXIT', small: true, keyhole: true }, label: 'Small door marked NOT AN EXIT' + (s.hasKey ? ' (you have a key)' : '') }),
        O('inv', 62, 86, 26, 9, { kind: 'static', text: s.hasKey ? 'You carry: a brass key' : 'Pockets: empty', label: s.hasKey ? 'Inventory: brass key' : 'Inventory: empty', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'exit':
          if (!s.exitOpened) {
            s.exitOpened = true;
            api.say('Huh. Bricks. Who put bricks there? Definitely not me. Try it again, I\'m sure it\'s fine now.', 'surprised');
          } else {
            api.nope();
            api.say('Still bricks. Persistence is not a personality.', 'annoyed');
          }
          return true;
        case 'mat':
          s.matLifted = true;
          api.say('Don\'t look under the mat! There is nothing under the mat. Especially not a key.', 'panicked');
          return true;
        case 'key':
          s.hasKey = true;
          api.defy('key');
          api.say('Put that back! That is my emergency key for my emergency door!', 'annoyed');
          return true;
        case 'closet':
          if (!s.hasKey) {
            api.nope();
            api.say('Locked. Also it says NOT AN EXIT. Can you not read?', 'pleased');
          } else {
            api.complete({ line: 'You used a key on the NOT-AN-EXIT. It was an exit. I need to update my signs.', mood: 'defeated' });
          }
          return true;
        case 'corner':
          api.secret('empty-corner');
          api.say('You inspect the empty corner. A tiny sticky note says: "Bossworth was here." …It\'s a very nice corner.', 'suspicious');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'mat' }, { tap: 'key' }, { tap: 'closet' }],
    secretPaths: { 'empty-corner': [{ tap: 'corner' }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
