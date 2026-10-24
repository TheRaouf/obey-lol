/* Level 34 — Stock Take
 * Bossworth insists the office owns twelve staplers. Count them: there are seven (one is set in jelly,
 * one is on the floor). The hole punch is not a stapler. Submitting 12 is a trap; other wrong counts are nopes.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CHOICES = [5, 6, 7, 8, 12];
  var ANSWER = 7;

  OBEY.registerLevel({
    id: 'stock-take',
    num: 34,
    title: 'Stock Take',
    objective: 'Fill in the stapler audit honestly.',
    intro: 'Audit day! We own exactly twelve staplers. I bought them myself. Tick 12 and let\'s go home. Counting is for accountants and toddlers.',
    introMood: 'neutral',
    actions: ['tap', 'count'],
    par: 1,
    hints: [
      'The auditor will count what is actually in the room.',
      'Look everywhere: shelf, cabinet, chair, desk, floor — and inside things. A hole punch is not a stapler.',
      'There are seven staplers. Tick 7.'
    ],
    wrong: ['Ticking 12 fails the audit (trap).', 'Any other wrong number makes the auditor squint (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Seven staplers. Five missing. I\'m launching an inquiry.',
    trick: 'Bossworth\'s number was wishful thinking; the room only ever had seven staplers.',

    init: function () { return {}; },

    view: function () {
      var S = function (id, x, y, w, h, where, color) {
        return O(id, x, y, w, h, { kind: 'static', art: 'a-stapler', artOpts: { color: color }, label: 'Stapler ' + where });
      };
      var objs = [
        O('shelf', 4, 20, 40, 6, { kind: 'static', art: 'shelf' }),
        S('st1', 8, 12, 14, 8, 'on the shelf', '#e5243b'),
        O('punch', 26, 12, 14, 8, { kind: 'static', art: 'a-holepunch', label: 'Hole punch on the shelf (not a stapler)' }),
        O('cabinet', 4, 34, 18, 30, { kind: 'static', art: 'a-cabinet', artOpts: { n: 0 }, label: 'Filing cabinet' }),
        S('st2', 6, 27, 14, 8, 'on top of the filing cabinet', '#3a86ff'),
        O('chair', 28, 36, 18, 26, { kind: 'static', art: 'a-chair', label: 'Swivel chair' }),
        S('st3', 30, 44, 14, 7, 'on the chair seat', '#ff9f43'),
        O('desk', 50, 40, 46, 8, { kind: 'static', art: 'table' }),
        S('st4', 52, 33, 12, 7, 'on the desk', '#2bc46f'),
        O('jelly', 66, 24, 12, 16, { kind: 'static', art: 'a-jelly', label: 'Stapler set inside a green jelly, on the desk' }),
        S('st6', 80, 33, 12, 7, 'on the desk, right side', '#9b5de5'),
        S('st7', 62, 56, 14, 8, 'on the floor under the desk', '#e5243b'),
        O('form', 4, 66, 92, 10, { kind: 'static', text: 'STAPLER AUDIT: how many staplers are in this room?', label: 'Audit form: how many staplers are in this room?', cls: 'tag-card' })
      ];
      CHOICES.forEach(function (n, i) {
        objs.push(O('n' + n, 4 + i * 19, 80, 16, 13, { text: String(n), label: 'Tick ' + n + ' staplers', cls: 'btn-card big' + (n === 12 ? ' accent' : '') }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^n(\d+)$/.exec(a.target);
      if (!m) return false;
      var n = Number(m[1]);
      if (n === ANSWER) {
        api.defy('count');
        api.complete({ line: 'Seven?! The auditor agrees. Seven. So where are my other five? WHO HAS MY STAPLERS?', mood: 'panicked' });
      } else if (n === 12) {
        api.fail('The auditor counts. And counts. And counts again. "Seven." You\'re written up for creative accounting. Recount!');
      } else {
        api.nope(a.target);
        api.say(n < ANSWER ? n + '? The auditor squints. Did you check inside the jelly? Nobody checks the jelly.' : n + '? The auditor squints. A hole punch is not a stapler, no matter how hard it tries.', 'suspicious');
      }
      return true;
    },

    solution: [{ tap: 'n7' }],
    checks: [
      { name: 'tick Bossworth\'s twelve', steps: [{ tap: 'n12' }], expect: 'fail' },
      { name: 'miss the jelly stapler', steps: [{ tap: 'n6' }], expect: 'nope' },
      { name: 'count the hole punch', steps: [{ tap: 'n8' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
