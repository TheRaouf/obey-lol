/* Level 111 — Dots and Dashes
 * The rover sends a Morse message; Mission Control wants the decoded word as a reply.
 * Bossworth calls it static and wants you to reply BOOM (his catchphrase).
 * The Morse key on the wall decodes "— — / — — — / — — — / — •" as MOON.
 * Any other reply is a trap; tapping the dish just beeps (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var REPLIES = ['BOOM', 'NOON', 'MOON', 'SOON'];
  var ANSWER = 'MOON';
  var SIGNAL = '— —  /  — — —  /  — — —  /  — •';

  OBEY.registerLevel({
    id: 'dots-and-dashes',
    num: 111,
    title: 'Dots and Dashes',
    objective: 'Reply to Mission Control with the decoded message.',
    intro: 'That\'s just static from the rover. Beep-boop, meaningless. Reply BOOM. It\'s my catchphrase, and Mission Control loves a catchphrase.',
    introMood: 'pleased',
    actions: ['tap', 'decode', 'reading'],
    par: 1,
    hints: [
      'Those beeps are dots and dashes. There is a key on the wall.',
      'Decode one letter at a time: each group between the slashes is one letter.',
      'Dash-dash is M, dash-dash-dash is O, dash-dot is N. Reply MOON.'
    ],
    wrong: ['Replying with any other word confuses Mission Control (trap).', 'Tapping the dish only plays the beeps again (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Message received: MOON. Bossworth\'s catchphrase: unreceived.',
    trick: 'The "static" was Morse code, and the key on the wall turns its four groups into M-O-O-N.',

    init: function () { return {}; },

    view: function () {
      var objs = [
        O('dish', 4, 4, 26, 26, { art: 'd-dish', artOpts: { lit: true }, label: 'Radio dish receiving beeps' }),
        O('signal', 34, 6, 62, 20, { kind: 'static', text: SIGNAL, label: 'Received: dash dash, slash, dash dash dash, slash, dash dash dash, slash, dash dot', cls: 'display-card' }),
        O('key', 4, 34, 44, 50, { kind: 'static', text: 'MORSE KEY\nB   — • • •\nM   — —\nN   — •\nO   — — —\nS   • • •', label: 'Morse key: B is dash dot dot dot. M is dash dash. N is dash dot. O is dash dash dash. S is dot dot dot.', cls: 'book-card' }),
        O('mc', 4, 88, 92, 10, { kind: 'static', text: 'Mission Control: reply with the decoded word.', label: 'Mission Control: reply with the decoded word.', cls: 'tag-card' })
      ];
      REPLIES.forEach(function (w, i) {
        objs.push(O('r-' + w, 54, 34 + i * 13, 42, 11, { text: 'Reply: ' + w, label: 'Reply ' + w, cls: 'btn-card' + (w === 'BOOM' ? ' accent' : '') }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'dish') {
        api.nope();
        api.say('Beep beep. Beeeep beeeep. Static! Clearly. Just… very rhythmic static.', 'suspicious');
        return true;
      }
      var m = /^r-(\w+)$/.exec(a.target);
      if (!m) return false;
      if (m[1] === ANSWER) {
        api.defy('boom');
        api.complete({ line: '"MOON." Mission Control says "Message received." The rover was talking. To you. Not me. Nobody tells me anything.', mood: 'defeated' });
      } else if (m[1] === 'BOOM') {
        api.fail('"BOOM"? Mission Control has evacuated the building. Twice. Let\'s pretend that didn\'t happen.');
      } else {
        api.fail('"' + m[1] + '"? Mission Control replies: "…What?" Decode it again, slowly.');
      }
      return true;
    },

    solution: [{ tap: 'r-MOON' }],
    checks: [
      { name: 'BOOM is a trap', steps: [{ tap: 'r-BOOM' }], expect: 'fail' },
      { name: 'NOON is a trap', steps: [{ tap: 'r-NOON' }], expect: 'fail' },
      { name: 'the dish is a nope', steps: [{ tap: 'dish' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
