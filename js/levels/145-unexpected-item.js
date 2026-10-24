/* Level 145 — Unexpected Item (Scanner Scramble)
 * The self-checkout screams "Unexpected item in bagging area". The screen lists what was scanned:
 * milk, bread, apples. The bagging area holds those plus Bossworth's lunchbox. Lift the lunchbox
 * off, then pay. Shoving the machine: trap. HELP (assistant on a break), lifting scanned items,
 * paying with the alert on: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ITEMS = [
    { id: 'milk', art: 'f-milk', label: 'Milk', scanned: true },
    { id: 'bread', art: 'f-bread', label: 'Bread', scanned: true },
    { id: 'lunch', art: 'f-lunchbox', label: 'Purple lunchbox with a big B on it', scanned: false },
    { id: 'apples', art: 'f-pbag', opts: { open: true, apples: 3 }, label: 'Bag of apples', scanned: true }
  ];

  OBEY.registerLevel({
    id: 'unexpected-item',
    num: 145,
    title: 'Unexpected Item',
    objective: 'Get the self-checkout to let you pay.',
    intro: 'Unexpected item? NOTHING in that bagging area is unexpected. Everything there is perfectly expected. By me. The machine is just grumpy. Give it a good shove.',
    introMood: 'annoyed',
    actions: ['tap', 'compare'],
    par: 2,
    hints: [
      'Compare the bagging area with the list of scanned items.',
      'Something in the bagging area was never scanned. It has a big B on it.',
      'Lift Bossworth\'s lunchbox off the bagging area, then pay.'
    ],
    wrong: ['Shoving the machine calls the security guard (trap).', 'HELP: the assistant is on a break (nope).', 'Lifting a scanned item off just makes the machine complain more (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'No unexpected items. Just an unexpected narrator.',
    trick: 'The screen listed exactly what had been scanned, so the one thing in the bagging area that wasn\'t on it, Bossworth\'s lunchbox, was the unexpected item.',

    init: function () { return { lunchOn: true }; },

    view: function (s) {
      var out = [
        O('list', 48, 4, 48, 18, { kind: 'static', text: 'Scanned: milk, bread, apples', label: 'Receipt so far: milk, bread, apples', cls: 'ticket-card' }),
        O('machine', 4, 24, 40, 52, { kind: 'static', art: 'f-selfcheck', label: 'Self-checkout machine' }),
        O('screen', 11, 29, 26, 13.5, { kind: 'static', text: s.lunchOn ? 'Unexpected item!' : 'Please pay', label: 'Screen: ' + (s.lunchOn ? 'unexpected item in bagging area' : 'please pay'), cls: 'display-card' + (s.lunchOn ? '' : ' ready') }),
        O('area', 48, 56, 48, 19.2, { kind: 'static', art: 'f-bagarea', label: 'Bagging area' }),
        O('areaTag', 48, 30, 48, 11, { kind: 'static', text: 'Bagging area', label: '', cls: 'tag-card' })
      ];
      ITEMS.forEach(function (it, i) {
        out.push(O(it.id, 50 + i * 11.5, 55.5, 11, 11.5, { art: it.art, artOpts: it.opts, label: it.label + ' in the bagging area' + (it.scanned ? ' (scanned)' : ' (not on the scanned list)') + ' — tap to lift it off', hidden: it.id === 'lunch' && !s.lunchOn }));
      });
      out.push(O('help', 4, 84, 22, 12, { text: 'HELP', label: 'Call for help', cls: 'btn-card' }));
      out.push(O('shove', 28, 84, 30, 12, { text: 'Give it a shove', label: 'Shove the machine', cls: 'btn-card accent' }));
      out.push(O('pay', 62, 84, 34, 12, { text: 'PAY', label: 'Pay', cls: 'btn-card big' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'lunch':
          s.lunchOn = false;
          api.say('Put my lunch back! It was keeping the bananas company. …The screen says "please pay". Traitor screen.', 'annoyed');
          return true;
        case 'milk': case 'bread': case 'apples':
          api.nope(a.target);
          api.say('"Please put the item back in the bagging area." Now it\'s missing something AND has something extra. You\'ve upset it more.', 'pleased');
          return true;
        case 'help':
          api.nope('help');
          api.say('The assistant\'s light flashes. The assistant is on a break. The assistant is always on a break.', 'pleased');
          return true;
        case 'shove':
          api.fail('You shove the self-checkout. It shouts "UNEXPECTED SHOVE IN CHECKOUT AREA". A security guard appears, sighs, and restarts the machine.');
          return true;
        case 'pay':
          if (s.lunchOn) {
            api.nope('pay');
            api.say('PAY is greyed out. Unexpected item. Unexpected item. It\'s like talking to my mother.', 'annoyed');
          } else {
            api.defy('lunch');
            api.complete({ line: 'Paid. The machine is happy. My lunchbox is on the floor. Apparently my lunch is "unexpected". My lunch is VERY expected. By me.', mood: 'defeated' });
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'lunch' }, { tap: 'pay' }],
    checks: [
      { name: 'Bossworth\'s shove', steps: [{ tap: 'shove' }], expect: 'fail' },
      { name: 'the help button', steps: [{ tap: 'help' }], expect: 'nope' },
      { name: 'lifting the milk', steps: [{ tap: 'milk' }], expect: 'nope' },
      { name: 'paying with the alert on', steps: [{ tap: 'pay' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
