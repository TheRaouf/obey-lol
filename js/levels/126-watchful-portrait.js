/* Level 126 — The Watchful Portrait (Museum Midway)
 * "The secret switch is under the rug. Ignore the portrait: paintings can't look at things."
 * The duke's eyes look at one object at a time: vase → clock → bookshelf. Tapping the object he's
 * looking at clicks a hidden mechanism and his gaze moves on. The third click opens the hidden gallery.
 * Rug: a mousetrap (trap). Any other object: nothing happens (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PATH = ['vase', 'clock', 'shelf'];
  var LOOK = { vase: 'down-left', clock: 'right', shelf: 'down-right', lamp: 'left' };
  var WHERE = { vase: 'down and to the left, at the vase', clock: 'to the right, at the clock', shelf: 'down and to the right, at the bookshelf' };

  OBEY.registerLevel({
    id: 'watchful-portrait',
    num: 126,
    title: 'Watchful Portrait',
    objective: 'Find the way into the hidden gallery.',
    intro: 'The hidden gallery has a secret switch. It\'s under the rug. Definitely the rug. And ignore the portrait. Paintings can\'t look at things. They\'re flat.',
    introMood: 'suspicious',
    actions: ['tap', 'observe', 'sequence'],
    par: 3,
    hints: [
      'Look closely at where the duke in the portrait is looking.',
      'Tap whatever his eyes point at. Then look at him again.',
      'Follow his gaze: the vase, then the clock, then the bookshelf.'
    ],
    wrong: ['The rug hides a mousetrap (trap).', 'Tapping something the portrait isn\'t looking at does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Followed the eyes. The eyes approve.',
    trick: 'The portrait\'s eyes kept pointing at the next switch, so following his gaze beat Bossworth\'s rug.',

    init: function () { return { step: 0, clicked: {} }; },

    view: function (s) {
      var target = PATH[Math.min(s.step, 2)];
      var look = s.step >= 3 ? 'down' : LOOK[target];
      return [
        O('portrait', 38, 4, 24, 30, { art: 'e-portrait', artOpts: { look: look }, label: 'Portrait of a stern duke. His eyes look ' + (s.step >= 3 ? 'pleased with you' : WHERE[target]) }),
        O('plaque', 28, 36, 44, 8.5, { kind: 'static', text: 'Duke Ogleton (stares a lot)', label: '', cls: 'tag-card' }),
        O('lamp', 4, 6, 12, 36, { art: 'lamp', artOpts: { on: true }, label: 'Standing lamp' }),
        O('clock', 76, 8, 20, 20, { art: 'clock', artOpts: { hour: s.clicked.clock ? 6 : 12 }, label: s.clicked.clock ? 'Clock (it clicked: the hand jumped to 6)' : 'Wall clock' }),
        O('vase', 4, 56, 18, 26, { art: 'e-vase', artOpts: { color: s.clicked.vase ? '#2bc46f' : '#9b5de5' }, label: s.clicked.vase ? 'Vase (it clicked and turned)' : 'Vase on a plinth' }),
        O('shelf', 72, 46, 24, 32, { art: 'e-bookshelf', artOpts: { pulled: !!s.clicked.shelf }, label: 'Bookshelf' }),
        O('rug', 28, 84, 40, 12, { art: 'rug', label: 'Rug ("the switch is under here")' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'rug') {
        api.fail('SNAP! A mousetrap. Under the rug. Who would put a mousetrap under a rug? (Me.) Back to the gallery entrance.');
        return true;
      }
      if (a.target === 'portrait') {
        api.say('It\'s a painting. Of a duke. Staring. At nothing. Stop looking where he\'s looking.', 'suspicious');
        return true;
      }
      if (['vase', 'clock', 'shelf', 'lamp'].indexOf(a.target) < 0) return false;
      if (a.target === PATH[s.step]) {
        s.clicked[a.target] = true;
        s.step++;
        if (s.step >= 3) {
          api.complete({ line: 'The bookshelf swings open. The hidden gallery! …The duke tipped you off? DUKE OGLETON. You were supposed to be FLAT.', mood: 'defeated' });
        } else {
          api.say(s.step === 1 ? '*click* …That vase just clicked. Coincidence. Vases click. Now: the RUG.' : '*click* The clock jumped. Clocks do that. Stop following the duke!', 'panicked');
        }
        return true;
      }
      api.nope(a.target);
      api.say(s.clicked[a.target] ? 'Already clicked. It has nothing more to say.' : 'Nothing happens. Because there\'s nothing to find. Except under the rug.', 'pleased');
      return true;
    },

    solution: [{ tap: 'vase' }, { tap: 'clock' }, { tap: 'shelf' }],
    checks: [
      { name: 'the rug', steps: [{ tap: 'rug' }], expect: 'fail' },
      { name: 'the lamp', steps: [{ tap: 'lamp' }], expect: 'nope' },
      { name: 'skip ahead to the bookshelf', steps: [{ tap: 'vase' }, { tap: 'shelf' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
