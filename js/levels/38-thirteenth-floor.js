/* Level 38 — The Thirteenth Floor
 * Bossworth's office is "on the 13th floor" and he says press 13. The lift has no 13: buttons skip from
 * 12 to 14 for luck, so the 13th floor is the button marked 14. ALARM is a trap; other floors are nopes.
 * Ruin (scenic-route): visit five different wrong floors in one attempt.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ROWS = [[14, 15, 16], [10, 11, 12], [7, 8, 9], [4, 5, 6], [1, 2, 3]];
  var FLOORS = {
    12: 'Floor 12: Accounts. Someone waves a calculator at you.',
    15: 'Button 15: the 14th floor. Plants. So many plants. One of them is in charge.',
    16: 'Button 16: the roof. It\'s windy. Bossworth\'s toupee — I mean, hat — is not up here.',
    1: 'Ground floor. Back where you started. Riveting.'
  };

  OBEY.registerLevel({
    id: 'thirteenth-floor',
    num: 38,
    title: 'The Thirteenth Floor',
    objective: 'Take the lift to Bossworth\'s office.',
    intro: 'Come up to my office on the 13th floor. Press 13. What do you mean there isn\'t a 13? Every building has a 13. Look harder.',
    introMood: 'neutral',
    actions: ['tap', 'logic', 'read'],
    par: 1,
    hints: [
      'The building has a 13th floor. The buttons just don\'t say so.',
      'The plate says the numbers skip 13. So what is the button for the 13th floor called?',
      'Press 14.'
    ],
    wrong: ['The ALARM button gets you stuck (trap).', 'Other floors are not Bossworth\'s office (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Ding. Thirteenth floor, labelled fourteen. Superstition is just branding.',
    trick: 'The buttons skip 13, so the 13th floor was the button marked 14.',
    ruinPaths: { 'scenic-route': [{ tap: 'b12' }, { tap: 'b15' }, { tap: 'b16' }, { tap: 'b1' }, { tap: 'b2' }] },

    init: function () { return { at: 'G', visited: [] }; },

    view: function (s) {
      var objs = [
        O('dir', 4, 4, 46, 40, { kind: 'static', text: 'DIRECTORY\n12th floor: Accounts\n13th floor: Bossworth\n14th floor: Plants', label: 'Directory: 12th floor Accounts, 13th floor Bossworth, 14th floor Plants', cls: 'book-card' }),
        O('lift', 6, 48, 40, 48, { kind: 'static', art: 'a-elevator', artOpts: { floor: String(s.at) }, label: 'Lift doors, now at ' + s.at }),
        O('panel', 54, 4, 44, 82, { kind: 'static', label: '', cls: 'keypad-bg' }),
        O('plate', 57, 72, 38, 11, { kind: 'static', text: 'Numbers skip 13.\nFor luck!', label: 'Plate: numbers skip 13, for luck', cls: 'tag-card' }),
        O('alarm', 56, 88, 40, 10, { text: '🔔 ALARM', label: 'Alarm button', cls: 'btn-card accent' })
      ];
      ROWS.forEach(function (row, r) {
        row.forEach(function (n, c) {
          objs.push(O('b' + n, 57 + c * 13, 7 + r * 13, 12, 11, { text: String(n), label: 'Floor button ' + n, cls: 'btn-card key' }));
        });
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'alarm') {
        api.fail('BRRRRING! The lift stops between floors. Maintenance arrives in "four to six business hours". Start again.');
        return true;
      }
      var m = /^b(\d+)$/.exec(a.target);
      if (!m) return false;
      var n = Number(m[1]);
      if (n === 14) {
        s.at = 14;
        api.defy('fourteen');
        api.complete({ line: 'Ding! You pressed FOURTEEN and arrived on… my floor. The thirteenth. I\'ve been on fourteen this whole time? My business cards are WRONG.', mood: 'surprised' });
        return true;
      }
      s.at = n;
      if (s.visited.indexOf(n) < 0) s.visited.push(n);
      if (s.visited.length >= 5) {
        api.complete({ ruin: 'scenic-route', line: 'Five floors! You stopped at EVERY floor except mine! I took the stairs. All of them. I\'m sweating through my waistcoat.', mood: 'panicked' });
        return true;
      }
      api.nope(a.target);
      api.say(FLOORS[n] || ('Floor ' + n + ': a corridor, a fern, and a printer that hates you.'), 'annoyed');
      return true;
    },

    solution: [{ tap: 'b14' }],
    checks: [
      { name: 'press the alarm', steps: [{ tap: 'alarm' }], expect: 'fail' },
      { name: 'press 12', steps: [{ tap: 'b12' }], expect: 'nope' },
      { name: 'press 15 (the 14th floor)', steps: [{ tap: 'b15' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
