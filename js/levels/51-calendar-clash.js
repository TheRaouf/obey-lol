/* Level 51 — Calendar Clash
 * Book a one-to-one when BOTH of you are free. Bossworth insists on Monday AM — his nap (trap). Thursday PM
 * says "free (golf)" for him: not free (nope). Only Wednesday PM is genuinely free for both.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu'];
  var CELLS = {
    'Mon-AM': ['nap', 'free'], 'Mon-PM': ['free', 'dentist'],
    'Tue-AM': ['golf', 'free'], 'Tue-PM': ['free', 'training'],
    'Wed-AM': ['mirror time', 'free'], 'Wed-PM': ['free', 'free'],
    'Thu-AM': ['free', 'fire drill'], 'Thu-PM': ['free (golf)', 'free']
  };

  OBEY.registerLevel({
    id: 'calendar-clash',
    num: 51,
    title: 'Calendar Clash',
    objective: 'Book a meeting when you and Bossworth are both free.',
    intro: 'Book us a one-to-one. Monday morning! I\'m free. Well, it says "nap", but naps don\'t count. Book Monday morning. Be bold.',
    introMood: 'neutral',
    actions: ['tap', 'logic', 'read'],
    par: 1,
    hints: [
      'A slot works only if BOTH lines say free — and mean it.',
      'Read every word. "free (golf)" is golf with a disguise.',
      'Book Wednesday PM.'
    ],
    wrong: ['Booking over Bossworth\'s nap ends badly (trap).', 'Slots where either of you is busy are refused (nope).', '"free (golf)" is not free (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Wednesday afternoon it is. I\'ll bring my calendar. And my golf clubs. Just in case.',
    trick: 'Only Wednesday afternoon was truly free for both — Monday was a nap and Thursday\'s "free" was golf.',

    init: function () { return {}; },

    view: function () {
      var objs = [
        O('head', 4, 3, 92, 10, { kind: 'static', text: 'B = Bossworth · You = you. One slot. Both must be free.', label: 'Key: B is Bossworth, You is you. Book one slot where both are free.', cls: 'tag-card' })
      ];
      DAYS.forEach(function (d, i) {
        objs.push(O('h-' + d, 16 + i * 21, 16, 19, 8, { kind: 'static', text: d, label: '', cls: 'tag-card' }));
      });
      ['AM', 'PM'].forEach(function (p, r) {
        objs.push(O('r-' + p, 2, 27 + r * 26, 12, 23, { kind: 'static', text: p, label: '', cls: 'tag-card' }));
        DAYS.forEach(function (d, i) {
          var c = CELLS[d + '-' + p];
          objs.push(O('c-' + d + '-' + p, 16 + i * 21, 27 + r * 26, 19, 23, { text: 'B: ' + c[0] + '\nYou: ' + c[1], label: d + ' ' + p + ': Bossworth ' + c[0] + ', you ' + c[1], cls: 'btn-card' }));
        });
      });
      objs.push(O('memo', 4, 82, 66, 13, { kind: 'static', text: 'Bossworth says: "Monday AM! Trust me!"', label: 'Bossworth\'s sticky note: Monday AM, trust me', cls: 'ticket-card' }));
      objs.push(O('plant', 80, 78, 12, 20, { art: 'plant', label: 'Office plant', free: true }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'plant') { api.say('The plant is free all week. Nobody books the plant.', 'neutral'); return true; }
      var m = /^c-(\w+)-(AM|PM)$/.exec(a.target);
      if (!m) return false;
      var key = m[1] + '-' + m[2], c = CELLS[key];
      if (key === 'Wed-PM') {
        api.defy('calendar');
        api.complete({ line: 'Wednesday, 2pm. Booked. Both free. No nap, no golf, no mirror. Just… a meeting. With you. I\'m oddly nervous.', mood: 'surprised' });
        return true;
      }
      if (key === 'Mon-AM') {
        api.fail('You booked over my NAP. I attend in pyjamas, grumpy, and cancel everything for a month. Start again.');
        return true;
      }
      api.nope(a.target);
      if (c[0] === 'free (golf)') api.say('"Free (golf)". Golf is a state of mind. That mind is busy. Swing and a miss.', 'pleased');
      else if (c[1] !== 'free') api.say('You have ' + c[1] + ' then. You\'d have to cancel it. Actually, do. No? Fine.', 'annoyed');
      else api.say(m[1] + ' ' + m[2] + '? That\'s my ' + c[0] + '. Sacred. Untouchable.', 'annoyed');
      return true;
    },

    solution: [{ tap: 'c-Wed-PM' }],
    checks: [
      { name: 'book over the nap', steps: [{ tap: 'c-Mon-AM' }], expect: 'fail' },
      { name: 'book his "free" golf', steps: [{ tap: 'c-Thu-PM' }], expect: 'nope' },
      { name: 'book over your dentist', steps: [{ tap: 'c-Mon-PM' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
