/* Level 37 — Alphabetical Order
 * File five folders alphabetically by the FIRST word on the tab (house rule plaque). Bossworth insists his
 * folder goes first "B for Bossworth", but its tab reads "VERY Important: Bossworth" — it belongs last.
 * Order: Accounts, Budget, Coffee Fund, Leave Requests, VERY Important. Out-of-order taps are nopes.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var FOLDERS = [
    { id: 'f-coffee', tab: 'Coffee Fund', x: 4, y: 20, w: 28 },
    { id: 'f-accounts', tab: 'Accounts', x: 34, y: 20, w: 28 },
    { id: 'f-very', tab: 'VERY Important: Bossworth', x: 4, y: 38, w: 58 },
    { id: 'f-leave', tab: 'Leave Requests', x: 4, y: 56, w: 28 },
    { id: 'f-budget', tab: 'Budget', x: 34, y: 56, w: 28 }
  ];
  var ORDER = ['f-accounts', 'f-budget', 'f-coffee', 'f-leave', 'f-very'];
  function tabOf(id) { for (var i = 0; i < FOLDERS.length; i++) if (FOLDERS[i].id === id) return FOLDERS[i].tab; return id; }

  OBEY.registerLevel({
    id: 'alphabetical-order',
    num: 37,
    title: 'Alphabetical Order',
    objective: 'File the folders in alphabetical order.',
    intro: 'File these alphabetically. Mine goes first, obviously. B for Bossworth. B for Brilliant. B for Before everybody else.',
    introMood: 'neutral',
    actions: ['tap', 'sequence', 'read'],
    par: 5,
    hints: [
      'The house rule says which word on the tab counts.',
      'Read Bossworth\'s tab properly. What is its FIRST word?',
      'Tap: Accounts, Budget, Coffee Fund, Leave Requests, then VERY Important.'
    ],
    wrong: ['Filing Bossworth\'s folder first breaks the rule (nope).', 'Any folder out of alphabetical order is refused (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Filed. Alphabetically. Mine is LAST. I\'m renaming it "AAAA Bossworth".',
    trick: 'Bossworth\'s tab started with "VERY", so by the house rule it was filed last, not first.',

    init: function () { return { filed: 0 }; },

    view: function (s) {
      var objs = [
        O('rule', 4, 4, 92, 11, { kind: 'static', text: 'House rule: file by the FIRST word on the tab.', label: 'House rule: file by the first word on the tab', cls: 'plaque-card' }),
        O('cabinet', 70, 24, 26, 62, { kind: 'static', art: 'a-cabinet', artOpts: { n: s.filed }, label: 'Filing cabinet, ' + s.filed + ' of 5 folders filed' })
      ];
      FOLDERS.forEach(function (f) {
        var done = ORDER.indexOf(f.id) < s.filed;
        objs.push(O(f.id, f.x, f.y, f.w, 13, { text: f.tab, label: 'Folder tab: ' + f.tab, cls: 'btn-card option', hidden: done }));
      });
      var list = ORDER.slice(0, s.filed).map(tabOf);
      objs.push(O('filed', 4, 76, 58, 20, { kind: 'static', text: 'Filed so far:\n' + (list.length ? list.join(', ') : '(nothing yet)'), label: 'Filed so far: ' + (list.join(', ') || 'nothing'), cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap' || !/^f-/.test(a.target)) return false;
      if (a.target === ORDER[s.filed]) {
        s.filed++;
        if (s.filed === ORDER.length) {
          api.defy('last');
          api.complete({ line: 'All filed. And mine is… at the back. Under V. Behind the LEAVE REQUESTS. This is a hate crime against my ego.', mood: 'defeated' });
        } else if (s.filed === 1) api.say('Accounts? Before ME? Bold opening.', 'annoyed');
        else api.say(['', 'Budget. Also a B word, I notice. Suspicious.', 'Coffee Fund. Fine. I approve of coffee.', 'Leave Requests?! Ahead of me? Is this a hint?'][s.filed - 1] || 'Filed.', 'annoyed');
        return true;
      }
      api.nope(a.target);
      if (a.target === 'f-very') api.say('YES, mine first! …The cabinet refuses. Apparently "VERY" starts with V. Since when?', 'surprised');
      else api.say('"' + tabOf(a.target) + '" isn\'t next. Even I know the alphabet. Mostly the first two letters.', 'pleased');
      return true;
    },

    solution: [{ tap: 'f-accounts' }, { tap: 'f-budget' }, { tap: 'f-coffee' }, { tap: 'f-leave' }, { tap: 'f-very' }],
    checks: [
      { name: 'Bossworth first', steps: [{ tap: 'f-very' }], expect: 'nope' },
      { name: 'out of order', steps: [{ tap: 'f-accounts' }, { tap: 'f-coffee' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
