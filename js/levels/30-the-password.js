/* Level 30 — The Password
 * "The password is NOT 'password'." Taken literally, the password is: NOT password.
 * Build the phrase from word tiles and press ENTER. Any other phrase is a trap (alarm).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TILES = ['please', 'NOT', 'password', 'open', 'sesame'];
  var ANSWER = 'NOT password';

  OBEY.registerLevel({
    id: 'the-password',
    num: 30,
    title: 'The Password',
    objective: 'Say the password.',
    intro: 'The door needs a password. The password is NOT "password". Obviously. That would be silly.',
    introMood: 'pleased',
    actions: ['tap', 'wordplay'],
    par: 3,
    hints: [
      'Take Bossworth\'s sentence very, very literally.',
      'He said the password is: NOT password.',
      'Tap NOT, then password, then ENTER.'
    ],
    wrong: ['Any other phrase sets off the alarm (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Literally correct. The best kind of correct.',

    init: function () { return { entry: [] }; },

    view: function (s) {
      var objs = [
        O('door', 66, 2, 30, 46, { kind: 'static', art: 'door', artOpts: { sign: 'PASSWORD?' }, label: 'Door asking for a password' }),
        O('display', 4, 6, 58, 16, { kind: 'static', text: s.entry.length ? s.entry.join(' ') : '(type the password)', label: 'Password entry: ' + (s.entry.join(' ') || 'empty'), cls: 'display-card' }),
        O('clear', 4, 26, 26, 11, { text: 'Clear', label: 'Clear the entry', cls: 'btn-card ghost', free: true }),
        O('enter', 34, 26, 28, 11, { text: 'ENTER', label: 'Enter the password', cls: 'btn-card big' })
      ];
      TILES.forEach(function (t, i) {
        objs.push(O('t-' + t, 4 + (i % 3) * 32, 56 + Math.floor(i / 3) * 18, 28, 14, { text: t, label: 'Word tile: ' + t, cls: 'btn-card big' }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (/^t-/.test(a.target)) {
        if (s.entry.length >= 4) { api.nope(); return true; }
        s.entry.push(a.target.slice(2));
        return true;
      }
      if (a.target === 'clear') { s.entry = []; return true; }
      if (a.target === 'enter') {
        var said = s.entry.join(' ');
        if (said === ANSWER) {
          api.complete({ line: '"NOT password." …That IS what I said. You took me literally. Nobody takes me literally!', mood: 'defeated' });
        } else if (!said) {
          api.nope();
          api.say('You entered nothing. The door is unmoved. Like me.', 'pleased');
        } else {
          api.fail(said === 'password'
            ? 'WEE-OO WEE-OO! I said it was NOT "password"! The alarm agrees. Try again.'
            : '"' + said + '"? WEE-OO WEE-OO! Wrong password. The door is now playing an alarm solo.');
        }
        return true;
      }
      return false;
    },

    solution: [{ tap: 't-NOT' }, { tap: 't-password' }, { tap: 'enter' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
