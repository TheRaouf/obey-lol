/* Level 203 — Short Changed (Mackerel Market)
 * The receipt: cod 6 coins, you paid 10, so you are owed 4. The fishmonger slides over four round
 * things: three coins marked 1 and a crimped bottle cap. Bossworth counts four things and says thanks.
 * Ask for 1 more. Wrong: Thanks (trap: you leave short), owed 4 more (nope: greedy).
 * Tapping the change just describes each piece (free).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CHANGE = [{ v: 1 }, { v: 1 }, { cap: true }, { v: 1 }];

  OBEY.registerLevel({
    id: 'short-changed',
    num: 203,
    title: 'Short Changed',
    objective: 'Make sure you get the right change.',
    intro: 'One, two, three, four! Four bits of change, and he owes you four. Perfect. Say thank you and let\'s go before the cod gets cold. Colder.',
    introMood: 'surprised',
    actions: ['count', 'read', 'tap'],
    par: 1,
    hints: [
      'Count the value, not the number of round things.',
      'Three of them are coins worth 1. One has a crinkly edge and no number.',
      'You are owed 4 and got 3 coins (plus a bottle cap): ask for 1 more.'
    ],
    wrong: ['Saying thanks leaves you a coin short (trap).', 'Asking for 4 more is just greedy (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Full change. And a bottle cap. Keep the cap, it\'s the start of a collection.',
    trick: 'Four round things isn\'t four coins: one was a bottle cap, so the change was only 3 and you were owed 1 more.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('receipt', 4, 4, 44, 28, { kind: 'static', text: 'RECEIPT\nCod: 6 coins\nYou paid: 10', label: 'Receipt: cod costs 6 coins, you paid 10', cls: 'ticket-card' }),
        O('sign', 54, 4, 42, 14, { kind: 'static', text: 'FRESH FISH', label: 'Sign: fresh fish', cls: 'plaque-card' }),
        O('table', 4, 60, 92, 16, { kind: 'static', art: 'table', label: '' }),
        O('cod', 72, 47, 24, 14, { kind: 'static', art: 'fish', label: 'Your cod, wrapped and waiting' }),
        O('tag', 4, 36, 62, 9, { kind: 'static', text: 'Your change:', label: '', cls: 'tag-card' })
      ];
      CHANGE.forEach(function (c, i) {
        out.push(O('c' + i, 6 + i * 16, 47, 14, 14, { art: 'i-coin', artOpts: c.cap ? { cap: true } : { v: c.v }, label: c.cap ? 'A crinkly-edged bottle cap' : 'A coin worth ' + c.v, free: true }));
      });
      out.push(O('thanks', 4, 80, 29, 14, { text: 'Thanks!', label: 'Say thanks and leave', cls: 'btn-card big accent' }));
      out.push(O('one', 35.5, 80, 29, 14, { text: 'I\'m owed 1 more', label: 'Say: I\'m owed 1 more coin', cls: 'btn-card' }));
      out.push(O('four', 67, 80, 29, 14, { text: 'I\'m owed 4 more', label: 'Say: I\'m owed 4 more coins', cls: 'btn-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^c([0-3])$/.exec(a.target);
      if (m) {
        var c = CHANGE[Number(m[1])];
        api.say(c.cap ? 'That\'s… a bottle cap. Round, shiny, worth nothing. Like a lot of my ideas.' : 'A coin. It says 1. Coins are honest like that.', c.cap ? 'surprised' : 'neutral');
        return true;
      }
      switch (a.target) {
        case 'thanks':
          api.fail('"Thanks!" You walk off with three coins and a bottle cap. The fishmonger waves. He is very happy. Count it properly!');
          return true;
        case 'four':
          api.nope();
          api.say('"Four MORE?" The fishmonger laughs so hard a crab falls off the counter. You got three of the four. Try maths.', 'annoyed');
          return true;
        case 'one':
          api.defy('thanks');
          api.complete({ line: 'One more coin, handed over with a sheepish grin. A bottle cap! I counted it as a coin. In my defence, it was shiny.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'one' }],
    checks: [
      { name: 'thanks is a trap', steps: [{ tap: 'thanks' }], expect: 'fail' },
      { name: 'four more is a nope', steps: [{ tap: 'four' }], expect: 'nope' },
      { name: 'inspecting the change does not finish', steps: [{ tap: 'c2' }, { tap: 'c0' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
