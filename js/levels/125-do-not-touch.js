/* Level 125 — Do Not Touch (Museum Midway)
 * Bossworth's museum: "Touch NOTHING. The only exit is the gift shop, which opens in 400 years."
 * Plaques: the vase and the dinosaur egg say DO NOT TOUCH; exhibit 3, "The Greeter", is interactive:
 * "Please shake his hand." Shake it and the doorman statue unlocks the gift shop. Then leave.
 * Vase / egg: alarm (trap). Gift shop door before that: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'do-not-touch',
    num: 125,
    title: 'Do Not Touch',
    objective: 'Get out of the museum.',
    intro: 'Welcome to my museum! Touch NOTHING. Every exhibit is priceless and alarmed. The only exit is the gift shop, which opens in four hundred years. Enjoy.',
    introMood: 'pleased',
    actions: ['tap', 'read'],
    par: 2,
    hints: [
      'Read every plaque. Not all of them say the same thing.',
      'Exhibit 3 is interactive. It asks you to do something.',
      'Shake hands with The Greeter, then go through the gift shop door.'
    ],
    wrong: ['Touching the vase sets off the alarm (trap).', 'Touching the dinosaur egg hatches it (trap).', 'The gift shop door is shut until something opens it (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Exited through the gift shop. Bought nothing. Bossworth is devastated.',
    trick: 'The plaques told the truth: two exhibits were hands-off, but The Greeter was an interactive piece that wanted a handshake.',

    init: function () { return { shook: false }; },

    view: function (s) {
      return [
        O('rope', 0, 46, 100, 8, { kind: 'static', art: 'e-velvet', label: '' }),
        O('vase', 6, 12, 24, 30, { art: 'e-vase', artOpts: { color: '#3ec1ff' }, label: 'Exhibit 1: ancient vase' }),
        O('egg', 38, 12, 22, 30, { art: 'e-egg', label: 'Exhibit 2: dinosaur egg' }),
        O('statue', 66, 6, 30, 38, { art: 'e-statue', artOpts: { nodding: s.shook }, label: s.shook ? 'Exhibit 3: The Greeter, nodding at the gift shop' : 'Exhibit 3: The Greeter, a statue holding out his hand' }),
        O('p1', 2, 55, 30, 20, { kind: 'static', text: 'No. 1: Old vase\nDO NOT TOUCH', label: 'Plaque 1: old vase. Do not touch.', cls: 'tag-card' }),
        O('p2', 35, 55, 30, 20, { kind: 'static', text: 'No. 2: Dino egg\nDO NOT TOUCH', label: 'Plaque 2: dinosaur egg. Do not touch.', cls: 'tag-card' }),
        O('p3', 68, 55, 30, 20, { kind: 'static', text: 'No. 3: The Greeter\nInteractive!\nShake his hand.', label: 'Plaque 3: The Greeter. Interactive! Please shake his hand.', cls: 'tag-card' }),
        O('shopSign', 4, 76, 58, 18, { kind: 'static', text: s.shook ? 'GIFT SHOP: now open (The Greeter insisted)' : 'GIFT SHOP & EXIT\nOpens in 400 years', label: s.shook ? 'Gift shop sign: now open' : 'Gift shop and exit: opens in 400 years', cls: 'sign-card' }),
        O('shop', 70, 75, 26, 23, { art: 'door', artOpts: { sign: 'SHOP', open: s.shook }, label: s.shook ? 'Gift shop door (open)' : 'Gift shop door (shut)' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'vase':
          api.fail('WEE-OO! You touched the vase! Lasers, sirens, a very small net. The museum resets. DO. NOT. TOUCH.');
          return true;
        case 'egg':
          api.fail('*crack* …The egg hatches. A baby dinosaur chases you round the museum twice. Everyone back to the entrance.');
          return true;
        case 'statue':
          if (s.shook) { api.say('The Greeter has already greeted you. He\'s a statue, not a hugger.', 'annoyed'); return true; }
          s.shook = true;
          api.defy('touch');
          api.say('You TOUCHED an exhibit?! …It says "interactive"? Who let the plaques be honest? He\'s pointing at the gift shop. He\'s the DOORMAN?', 'panicked');
          return true;
        case 'shop':
          if (!s.shook) {
            api.nope('shop');
            api.say('Shut. Four hundred years, I said. Bring a sandwich.', 'pleased');
          } else {
            api.complete({ line: 'Out through the gift shop and you didn\'t even buy a pencil. Four hundred years of planning, wasted on a handshake.', mood: 'defeated' });
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'statue' }, { tap: 'shop' }],
    checks: [
      { name: 'touch the vase', steps: [{ tap: 'vase' }], expect: 'fail' },
      { name: 'touch the dinosaur egg', steps: [{ tap: 'egg' }], expect: 'fail' },
      { name: 'try the gift shop first', steps: [{ tap: 'shop' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
