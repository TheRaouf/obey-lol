/* Level 101 — Pop-Up Panic
 * Three pop-ups stand between you and the door. Bossworth: "always click the BIG button".
 * Each big button is the wrong answer once you actually read the words:
 *   1) Install 400 toolbars? → Not now.
 *   2) Are you sure you DON'T want to NOT skip? → Yes (= skip).
 *   3) To continue press Cancel → Cancel.
 * The decorative X is a nope. Ruin: "Accept ALL cookies" on the banner.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DIALOGS = [
    { title: 'Update available!', body: 'Install the Bossworth Toolbar?\nIt adds 400 helpful toolbars to your screen.',
      left: { text: 'INSTALL', big: true, ok: false }, right: { text: 'Not now', ok: true },
      fail: 'You clicked INSTALL. Your screen is now 97% toolbar. One of them is a toolbar for toolbars. Starting over.' },
    { title: 'Just checking…', body: 'Are you sure you DON\'T want to NOT skip the update?',
      left: { text: 'Yes', ok: true }, right: { text: 'NO', big: true, ok: false },
      fail: '"No" means you DO want to not skip it. So: installing! 400 toolbars incoming. Double negatives are a trap. Like me.' },
    { title: 'Almost there', body: 'To CONTINUE, press Cancel.\nTo cancel, press Continue.',
      left: { text: 'Cancel', ok: true }, right: { text: 'CONTINUE', big: true, ok: false },
      fail: 'You pressed Continue, which cancels. Everything cancelled. Including the cancelling. Back to pop-up one!' }
  ];

  OBEY.registerLevel({
    id: 'pop-up-panic',
    num: 101,
    title: 'Pop-Up Panic',
    objective: 'Get past the pop-ups to unlock the door.',
    intro: 'Pop-ups! Just click the BIG button on every one. Big buttons are always right. That\'s basic user experience design. I read half a book about it.',
    introMood: 'pleased',
    actions: ['tap', 'reading', 'logic'],
    par: 3,
    hints: [
      'Ignore which button is bigger. Read what each pop-up actually says.',
      'Watch out for double negatives, and for buttons that do the opposite of their names.',
      'Press: Not now, then Yes, then Cancel.'
    ],
    wrong: ['Each big button does something terrible (trap).', 'The X in the corner is decorative (nope).', 'Accepting ALL cookies is a ruin.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Three pop-ups, zero toolbars. A modern miracle.',
    trick: 'The big buttons were bait: reading each pop-up (including the double negative) showed the small button was right every time.',

    init: function () { return { step: 0 }; },

    view: function (s) {
      var d = DIALOGS[Math.min(s.step, 2)];
      var btn = function (id, b, x) {
        return O(id, x, 54, 38, 13, { text: b.text, label: 'Pop-up button: ' + b.text, cls: 'btn-card' + (b.big ? ' accent big' : ' ghost') });
      };
      return [
        O('title', 8, 6, 72, 10, { kind: 'static', text: d.title + '  (' + (s.step + 1) + ' of 3)', label: 'Pop-up ' + (s.step + 1) + ' of 3: ' + d.title, cls: 'panel-card' }),
        O('x', 82, 6, 10, 10, { text: '×', label: 'Close pop-up (X)', cls: 'btn-card small' }),
        O('body', 8, 18, 84, 32, { kind: 'static', text: d.body, label: d.body, cls: 'speech-card' }),
        btn('left', d.left, 8),
        btn('right', d.right, 54),
        O('banner', 4, 74, 58, 22, { kind: 'static', text: 'We use cookies to improve your lab experience.', label: 'Cookie banner: we use cookies to improve your lab experience.', cls: 'tag-card' }),
        O('cookies', 66, 76, 30, 18, { text: 'Accept ALL', label: 'Accept ALL cookies', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var d = DIALOGS[s.step];
      switch (a.target) {
        case 'x':
          api.nope();
          api.say('The X is decorative. Like my diploma.', 'pleased');
          return true;
        case 'cookies':
          api.complete({ ruin: 'cookie-avalanche', line: 'You accepted ALL the cookies. ALL of them. The lab is knee-deep in biscuits and the door burst open from crumb pressure. This is not a victory. It is a bakery.', mood: 'panicked' });
          return true;
        case 'left':
        case 'right':
          if (!d[a.target].ok) { api.fail(d.fail); return true; }
          api.defy('big-button');
          s.step++;
          if (s.step === 3) {
            api.complete({ line: 'All three pop-ups dismissed. With the SMALL buttons. My half a book did not cover this.', mood: 'defeated' });
          } else api.say(s.step === 1 ? 'The small button? Bold. Next pop-up! This one is VERY clear.' : 'Fine, but THIS one is simple. Click the obvious one!', 'suspicious');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'right' }, { tap: 'left' }, { tap: 'left' }],
    ruinPaths: { 'cookie-avalanche': [{ tap: 'cookies' }] },
    checks: [
      { name: 'INSTALL is a trap', steps: [{ tap: 'left' }], expect: 'fail' },
      { name: 'the double negative NO is a trap', steps: [{ tap: 'right' }, { tap: 'right' }], expect: 'fail' },
      { name: 'CONTINUE is a trap', steps: [{ tap: 'right' }, { tap: 'left' }, { tap: 'right' }], expect: 'fail' },
      { name: 'the X is a nope', steps: [{ tap: 'x' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
