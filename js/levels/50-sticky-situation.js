/* Level 50 — Sticky Situation
 * Log in to Bossworth's computer. Under the "DO NOT LIFT" sticky note: "pet's name + the year on my mug".
 * The desk holds two photos and two mugs — his and Doris's — so the answer is SirBubbles1998.
 * Doris's details (MrWhiskers…, …2015) are traps (account lock); password123 is a nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var OPTIONS = ['SirBubbles1998', 'MrWhiskers1998', 'SirBubbles2015', 'password123'];
  var ANSWER = 'SirBubbles1998';

  OBEY.registerLevel({
    id: 'sticky-situation',
    num: 50,
    title: 'Sticky Situation',
    objective: 'Log in to Bossworth\'s computer.',
    intro: 'My password is unguessable. It is NOT my pet\'s name. And it is NOT written on a sticky note. Don\'t look at the sticky note. Especially not under it.',
    introMood: 'pleased',
    actions: ['tap', 'read', 'logic'],
    par: 2,
    hints: [
      'He told you exactly where not to look.',
      'Lift the sticky note, then work out which pet and which mug belong to Bossworth.',
      'Lift the note, then choose SirBubbles1998.'
    ],
    wrong: ['Doris\'s pet or mug year locks the account (trap).', '"password123" is someone else\'s problem (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Logged in. I\'m changing it to something unguessable. Sir Bubbles 1999.',
    trick: 'The note under the note gave the formula; the desk photos and mugs filled it in — the ones with Bossworth\'s name.',

    init: function () { return { lifted: false }; },

    view: function (s) {
      var objs = [
        O('monitor', 4, 4, 58, 24, { kind: 'static', text: 'LOG IN: Bossworth\nPassword: ________', label: 'Computer login for Bossworth, asking for a password', cls: 'display-card' }),
        O('note', 4, 31, 58, 14, { text: 'DO NOT LIFT THIS NOTE', label: 'Sticky note: do not lift this note', cls: 'ticket-card', hidden: s.lifted }),
        O('hint', 4, 31, 58, 14, { kind: 'static', text: 'Password = my pet\'s name + the year on my mug', label: 'Hidden note: password is my pet\'s name plus the year on my mug', cls: 'ticket-card', hidden: !s.lifted }),
        O('photo1', 4, 50, 20, 18, { kind: 'static', art: 'a-photo', artOpts: { pet: 'fish' }, label: 'Photo of Bossworth and his goldfish, Sir Bubbles' }),
        O('mug1', 28, 52, 18, 16, { kind: 'static', art: 'a-bossmug', artOpts: { color: '#ffd23f' }, label: 'Bossworth\'s mug: Best Boss since 1998' }),
        O('photo2', 52, 50, 20, 18, { kind: 'static', art: 'a-photo', artOpts: { pet: 'cat' }, label: 'Photo of Doris and her cat, Mr Whiskers' }),
        O('mug2', 76, 52, 18, 16, { kind: 'static', art: 'a-bossmug', artOpts: { color: '#ff77b4' }, label: 'Doris\'s mug: Staff of the Month 2015' }),
        O('cap1', 2, 70, 23, 17, { kind: 'static', text: 'Bossworth & Sir Bubbles', label: '', cls: 'tag-card' }),
        O('cap2', 26, 70, 23, 17, { kind: 'static', text: 'BEST BOSS since 1998', label: '', cls: 'tag-card' }),
        O('cap3', 50, 70, 23, 17, { kind: 'static', text: 'Doris & Mr Whiskers', label: '', cls: 'tag-card' }),
        O('cap4', 74, 70, 24, 17, { kind: 'static', text: 'Doris: Staff of the Month 2015', label: '', cls: 'tag-card' })
      ];
      OPTIONS.forEach(function (p, i) {
        objs.push(O('p' + i, 66, 4 + i * 10.5, 31, 9.5, { text: p, label: 'Try password ' + p, cls: 'btn-card option' }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'note') {
        s.lifted = true;
        api.say('You LIFTED it. The one note I asked you not to lift. Do you lift every note? Is nothing sacred?', 'panicked');
        return true;
      }
      var m = /^p(\d)$/.exec(a.target);
      if (!m) return false;
      var pw = OPTIONS[Number(m[1])];
      if (pw === ANSWER) {
        api.defy('password');
        api.complete({ line: 'Access granted. Sir Bubbles, 1998. You used my FISH against me. He would be so proud of you. Traitor fish.', mood: 'defeated' });
      } else if (pw === 'password123') {
        api.nope(a.target);
        api.say('password123? Please. That\'s DORIS\'S password. …I didn\'t say that.', 'surprised');
      } else {
        api.fail('ACCOUNT LOCKED. That\'s Doris\'s ' + (pw.indexOf('Whiskers') >= 0 ? 'cat' : 'mug') + ', not mine! IT unlocks it with a sigh. And a new sticky note.');
      }
      return true;
    },

    solution: [{ tap: 'note' }, { tap: 'p0' }],
    checks: [
      { name: 'use Doris\'s cat', steps: [{ tap: 'note' }, { tap: 'p1' }], expect: 'fail' },
      { name: 'use Doris\'s mug year', steps: [{ tap: 'p2' }], expect: 'fail' },
      { name: 'try password123', steps: [{ tap: 'p3' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
