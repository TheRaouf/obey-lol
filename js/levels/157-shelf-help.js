/* Level 157 — Shelf Help (Bookworm Bog)
 * Shelve four books by call number, smallest first. Bossworth: "3 is smaller than 12, so 520.3 goes
 * before 520.12." Decimals compare digit by digit (the tip card: 520.3 is the same as 520.30), so the
 * order is 520.12, 520.25, 520.3, 520.7.
 * Wrong: a full shelf in the wrong order (trap). Placed books can be taken back for free.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BOOKS = ['520.3', '520.7', '520.12', '520.25']; // as they sit on the trolley (Bossworth's order)
  var RIGHT = ['520.12', '520.25', '520.3', '520.7'];
  function bid(n) { return 'b' + n.replace('.', '-'); }

  OBEY.registerLevel({
    id: 'shelf-help',
    num: 157,
    title: 'Shelf Help',
    objective: 'Put the books on the shelf in number order, smallest first.',
    intro: 'Shelve these by number, smallest first. Easy: 3 is smaller than 12, so 520.3 goes before 520.12. I\'m practically a librarian. I own a cardigan.',
    introMood: 'pleased',
    actions: ['tap', 'sequence'],
    par: 4,
    hints: [
      'The numbers after the dot are not whole numbers. Read the tip card.',
      '520.3 is 520.30, which is bigger than 520.25 and 520.12.',
      'Shelve 520.12, then 520.25, then 520.3, then 520.7.'
    ],
    wrong: ['Filling the shelf in the wrong order is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Point one two, point two five, point three, point seven. Dewey would be proud.',
    trick: 'After the dot you compare digit by digit: 520.3 is 520.30, so it comes after 520.12 and 520.25.',

    init: function () { return { shelf: [] }; },

    view: function (s) {
      var out = [
        O('rule', 4, 3, 44, 11, { kind: 'static', text: 'Smallest number first', label: 'Library sign: smallest number first', cls: 'sign-card' }),
        O('tip', 52, 3, 44, 11, { kind: 'static', text: 'Tip: 520.3 is the same as 520.30', label: 'Tip card: 520.3 is the same as 520.30', cls: 'tag-card' }),
        O('shelf', 4, 34, 92, 18, { kind: 'static', art: 'shelf' }),
        O('trolleyTag', 30, 84, 40, 6, { kind: 'static', text: 'Returns trolley', label: '', cls: 'tag-card' }),
        O('trolley', 4, 74, 92, 18, { kind: 'static', art: 'table' })
      ];
      for (var i = 0; i < 4; i++) {
        var b = s.shelf[i];
        out.push(O('slot' + i, 9 + i * 22, 19, 18, 18, { text: b || '', label: b ? 'Shelf space ' + (i + 1) + ': ' + b + ' (tap to take it back)' : 'Shelf space ' + (i + 1) + ': empty', cls: 'btn-card big' + (b ? '' : ' ghost'), free: true, disabled: !b }));
      }
      BOOKS.forEach(function (n, i) {
        out.push(O(bid(n), 9 + i * 22, 56, 18, 20, { text: n, label: 'Book ' + n + ' (tap to shelve it next)', cls: 'btn-card big', hidden: s.shelf.indexOf(n) >= 0 }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^slot(\d)$/.exec(a.target);
      if (m) {
        var i = Number(m[1]);
        if (s.shelf[i]) { s.shelf.splice(i, 1); api.say('Taking one back? Good. Second thoughts are the first sign of a librarian.', 'neutral'); }
        return true;
      }
      var n = BOOKS.filter(function (x) { return bid(x) === a.target; })[0];
      if (!n) return false;
      if (s.shelf.indexOf(n) >= 0) return true;
      s.shelf.push(n);
      if (s.shelf.length < 4) {
        if (s.shelf.length === 1 && n === '520.12') api.say('Point twelve FIRST? Twelve is a big number! Bigger than three! …Isn\'t it?', 'suspicious');
        return true;
      }
      if (s.shelf.join() === RIGHT.join()) {
        api.defy('order');
        api.complete({ line: 'Point one two, point two five, point three, point seven. The librarian is nodding. At YOU. I\'m taking off the cardigan.', mood: 'defeated' });
      } else {
        api.fail('The librarian walks past, gasps, and reshelves the lot. "Point three is point THREE ZERO, dear." Back on the trolley they go.');
      }
      return true;
    },

    solution: [{ tap: 'b520-12' }, { tap: 'b520-25' }, { tap: 'b520-3' }, { tap: 'b520-7' }],
    checks: [
      { name: 'Bossworth\'s order', steps: [{ tap: 'b520-3' }, { tap: 'b520-7' }, { tap: 'b520-12' }, { tap: 'b520-25' }], expect: 'fail' },
      { name: 'take a book back', steps: [{ tap: 'b520-3' }, { tap: 'slot0' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
