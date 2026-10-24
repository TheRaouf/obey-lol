/* Level 150 — Trolley Line (Carpark Capers)
 * The lamp-post sign: trolley wheels lock past the yellow line. Bossworth parked beyond it.
 * Bring the car to the trolley (Bossworth reverses it inside the line), then push the trolley over.
 * Pushing first: trap (wheels lock). Carrying four bags: a slower alternative. Asking twice: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BAGS = 4;

  OBEY.registerLevel({
    id: 'trolley-line',
    num: 150,
    title: 'Trolley Line',
    objective: 'Get the shopping into Bossworth\'s car.',
    intro: 'Push the trolley to my car. All the way. That sign on the lamp post is about OTHER trolleys. I\'m not moving the car. I\'ve just got it perfectly wonky.',
    introMood: 'annoyed',
    actions: ['tap', 'read'],
    par: 2,
    hints: [
      'Read the sign on the lamp post, then look where the car is.',
      'The trolley can\'t cross the line. Something else can.',
      'Bring the car inside the line first, then push the trolley to it.'
    ],
    wrong: ['Pushing the trolley over the yellow line locks its wheels (trap).', 'Asking for the car to be moved twice (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Shopping in the boot, trolley inside the line.',
    trick: 'Trolley wheels lock at the yellow line, but cars don\'t, so you brought the car to the trolley instead of the trolley to the car.',

    init: function () { return { near: false, carried: 0 }; },

    view: function (s) {
      var left = BAGS - s.carried;
      return [
        O('sign', 18, 20, 40, 15, { kind: 'static', text: 'Trolley wheels lock past the yellow line', label: 'Sign on the lamp post: trolley wheels lock past the yellow line', cls: 'sign-card' }),
        O('post', 58, 22, 14, 52.5, { kind: 'static', art: 'f-lamppost', label: '' }),
        O('line', 60, 74, 9, 13, { kind: 'static', art: 'f-floorline', label: 'Yellow line painted across the car park', cls: 'backdrop' }),
        O('trolley', 6, 63, 26, 21, { kind: 'static', art: 'f-trolley', artOpts: { bags: left > 0 }, label: 'Trolley with ' + left + ' bags of shopping, on your side of the yellow line' }),
        O('car', s.near ? 32 : 70, 67, 28, 16.3, { kind: 'static', art: 'f-car', artOpts: { color: '#3a86ff' }, label: 'Bossworth\'s blue car, ' + (s.near ? 'now parked inside the yellow line' : 'parked beyond the yellow line') }),
        O('push', 4, 88, 30, 10, { text: 'Push trolley', label: 'Push the trolley to the car', cls: 'btn-card accent' }),
        O('carry', 36, 88, 28, 10, { text: 'Carry a bag', label: 'Carry one bag to the car (' + left + ' left)', cls: 'btn-card', disabled: left === 0 }),
        O('bring', 66, 88, 30, 10, { text: 'Bring the car', label: 'Ask Bossworth to bring the car inside the line', cls: 'btn-card big' }),
        O('left', 4, 4, 28, 10, { kind: 'static', text: 'Bags: ' + left, label: left + ' bags still in the trolley', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'push':
          if (s.near) {
            api.complete({ line: 'Trolley meets car. Shopping meets boot. I had to MOVE my car. My perfectly wonky car. It\'s merely slightly wonky now.', mood: 'defeated' });
          } else {
            api.fail('CLUNK. The front wheels lock on the yellow line. The trolley stops; the bags don\'t. Oranges roll under a van. Everyone back to the start.');
          }
          return true;
        case 'bring':
          if (s.near) {
            api.nope('bring');
            api.say('It\'s already here. Any closer and it\'ll be IN the trolley.', 'annoyed');
          } else {
            s.near = true;
            api.say('Fine! FINE. Reversing. Beep. Beep. Beep. There. Inside your precious line. Happy?', 'annoyed');
          }
          return true;
        case 'carry':
          s.carried++;
          if (s.carried >= BAGS) {
            api.complete({ line: 'Four trips. Four bags. You carried them all like a pack mule while I watched. Honestly, it was relaxing. For me.', mood: 'pleased' });
          } else {
            api.say('Trip ' + s.carried + ' of ' + BAGS + '. Your arms look longer already.', 'pleased');
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'bring' }, { tap: 'push' }],
    alternatives: { 'pack-mule': [{ tap: 'carry' }, { tap: 'carry' }, { tap: 'carry' }, { tap: 'carry' }] },
    checks: [
      { name: 'Bossworth\'s push', steps: [{ tap: 'push' }], expect: 'fail' },
      { name: 'asking twice', steps: [{ tap: 'bring' }, { tap: 'bring' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
