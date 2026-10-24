/* Level 73 — Brolly Good
 * Bossworth trusts a newspaper forecast (last Tuesday's). The window shows pouring rain.
 * Solution: take the umbrella, go out. Wrong: going out without it (trap); opening it indoors (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'brolly-good',
    num: 73,
    title: 'Brolly Good',
    objective: 'Go for a stroll on the promenade without getting soaked.',
    intro: 'Welcome to sunny Brollington-on-Sea! The paper says GLORIOUS sunshine. Pop on the sunglasses, leave that silly umbrella, and out you go!',
    introMood: 'pleased',
    actions: ['tap', 'observe'],
    par: 2,
    hints: [
      'Newspapers can be old. Windows are always live.',
      'Look out of the window before you choose what to take.',
      'Take the umbrella, then open the promenade door.'
    ],
    wrong: ['Going out without the umbrella gets you soaked (trap).', 'Opening the umbrella indoors is bad luck (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Dry as a biscuit. Bossworth is cancelling his newspaper.',
    trick: 'The forecast was last Tuesday\'s. The window showed the weather right now.',

    init: function () { return { brolly: false, shades: false }; },

    view: function (s) {
      var carry = [];
      if (s.brolly) carry.push('umbrella');
      if (s.shades) carry.push('sunglasses');
      return [
        O('window', 6, 6, 38, 38, { kind: 'static', art: 'c-window', artOpts: { rain: true }, label: 'Window: dark clouds and pouring rain outside' }),
        O('paper', 50, 6, 46, 18, { kind: 'static', text: 'Tourist Times: "SUNSHINE ALL DAY!"', label: 'Newspaper headline: sunshine all day', cls: 'sign-card' }),
        O('date', 56, 26, 36, 8, { kind: 'static', text: 'Edition: last Tuesday', label: 'Newspaper date: last Tuesday', cls: 'tag-card' }),
        O('brolly', 8, 50, 16, 30, { art: 'c-umbrella', artOpts: { open: false }, label: s.brolly ? 'Your umbrella (carried, closed)' : 'Closed umbrella in a stand', cls: s.brolly ? 'subtle' : '' }),
        O('shades', 28, 62, 20, 12, { art: 'c-sunglasses', label: s.shades ? 'Sunglasses (wearing them)' : 'Sunglasses', cls: s.shades ? 'subtle' : '' }),
        O('door', 62, 38, 30, 48, { art: 'door', artOpts: { sign: 'PROMENADE' }, label: 'Door to the promenade' }),
        O('inv', 4, 88, 52, 8, { kind: 'static', text: carry.length ? 'Carrying: ' + carry.join(' + ') : 'Carrying: nothing', label: 'Inventory: ' + (carry.join(', ') || 'nothing'), cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'brolly':
          if (!s.brolly) {
            s.brolly = true;
            api.defy('brolly');
            api.say('The umbrella? On a day like this? You\'ll look like a mushroom. A dry mushroom, but still.', 'annoyed');
          } else {
            api.nope('brolly');
            api.say('You opened an umbrella INDOORS! A portrait of my aunt just fell off the wall. Seven years of drizzle! Close it!', 'panicked');
          }
          return true;
        case 'shades':
          s.shades = !s.shades;
          api.say(s.shades ? 'Stylish! Very continental. You can barely see a thing, which is the point.' : 'Taking them off? But the paper SAID sunshine.', 'pleased');
          return true;
        case 'door':
          if (!s.brolly) {
            api.fail('SPLOOSH. Sideways rain, horizontal seagulls, a soggy you. Back inside to drip on my carpet.');
          } else {
            api.complete({ line: 'You popped it open on the doorstep and strolled off bone dry. The newspaper was… last Tuesday\'s? Who delivers LAST TUESDAY?', mood: 'defeated' });
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'brolly' }, { tap: 'door' }],
    checks: [
      { name: 'no umbrella', steps: [{ tap: 'door' }], expect: 'fail' },
      { name: 'sunglasses only', steps: [{ tap: 'shades' }, { tap: 'door' }], expect: 'fail' },
      { name: 'open it indoors', steps: [{ tap: 'brolly' }, { tap: 'brolly' }], expect: 'nope' },
      { name: 'both items', steps: [{ tap: 'shades' }, { tap: 'brolly' }, { tap: 'door' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
