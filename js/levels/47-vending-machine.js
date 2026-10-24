/* Level 47 — Vending Machine
 * Your exit keycard hangs stuck on spiral B2. Bossworth says shake the machine (trap). Snacks drop straight
 * down, so buy A2 — the snack directly above — and it knocks the keycard into the tray. Collect it.
 * B2 is "sold" (nope); other snacks just drop (nope); the tray is empty until then (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SNACKS = { A1: 'a cheese twist', A3: 'a sad granola bar', B1: 'a bag of crisps', B3: 'a pink wafer' };

  OBEY.registerLevel({
    id: 'vending-machine',
    num: 47,
    title: 'Vending Machine',
    objective: 'Get the stuck keycard out of the vending machine.',
    intro: 'Your exit keycard is stuck in the vending machine. Classic. Shake it! Rock it! Give it a big hug and a wobble! Machines love that.',
    introMood: 'pleased',
    actions: ['tap', 'logic', 'observe'],
    par: 2,
    hints: [
      'Gravity is on your side. Violence is not.',
      'The sticker says snacks drop straight down. What is directly above the keycard?',
      'Buy A2, then collect from the tray.'
    ],
    wrong: ['Shaking the machine ends badly (trap).', 'B2 is already "sold" (nope).', 'Other snacks just drop past the keycard (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Keycard rescued by a falling biscuit. Physics: 1, Bossworth: 0.',
    trick: 'Snacks fall straight down, so buying the one above the keycard knocked it loose.',

    init: function () { return { dropped: false, taken: false }; },

    view: function (s) {
      var objs = [
        O('machine', 4, 4, 46, 60, { kind: 'static', art: 'a-vending', artOpts: { dropped: s.dropped, taken: s.taken }, label: s.dropped ? 'Vending machine. A2 and the keycard have fallen into the tray.' : 'Vending machine. Your keycard hangs stuck on spiral B2; directly above it, in A2, is a snack.' }),
        O('tray', 10, 67, 34, 11, { text: s.dropped ? 'Collect from tray' : 'Tray (empty)', label: s.dropped ? 'Collect from the tray: a biscuit and your keycard' : 'Collection tray, empty', cls: 'btn-card' + (s.dropped ? ' accent' : ' ghost') }),
        O('sticker', 54, 32, 42, 12, { kind: 'static', text: 'Snacks drop straight down.', label: 'Sticker: snacks drop straight down', cls: 'tag-card' }),
        O('shake', 54, 48, 42, 12, { text: 'Shake the machine', label: 'Shake the machine', cls: 'btn-card accent' }),
        O('door', 74, 64, 22, 34, { kind: 'static', art: 'door', artOpts: { sign: 'STAFF', small: true }, label: 'Staff door (needs your keycard)' })
      ];
      ['A', 'B'].forEach(function (r, ri) {
        [1, 2, 3].forEach(function (c, ci) {
          var id = r + c;
          objs.push(O('b' + id, 54 + ci * 14.5, 6 + ri * 12.5, 12.5, 10.5, { text: id, label: 'Buy ' + id + (id === 'B2' ? ' (where the keycard is stuck)' : ''), cls: 'btn-card key' }));
        });
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'shake') {
        api.fail('You shake it. It wobbles. It wobbles back. A "DO NOT SHAKE" sign falls off and bonks you. Start again, gently.');
        return true;
      }
      if (a.target === 'tray') {
        if (!s.dropped) { api.nope('tray'); api.say('Just crumbs and a coin from 1997. Mine, probably.', 'neutral'); return true; }
        s.taken = true;
        api.defy('gravity');
        api.complete({ line: 'Keycard AND a biscuit. You fixed it with a biscuit. I was going to fix it with a hug. My way had more feelings.', mood: 'defeated' });
        return true;
      }
      var m = /^b([AB][123])$/.exec(a.target);
      if (!m) return false;
      var id = m[1];
      if (s.dropped) { api.nope(a.target); api.say('Collect your keycard first. Then snack. Priorities.', 'neutral'); return true; }
      if (id === 'A2') {
        s.dropped = true;
        api.say('Clunk… the biscuit falls, hits your keycard, and down they BOTH go. Into the tray. That was… physics? I don\'t trust it.', 'surprised');
        return true;
      }
      api.nope(a.target);
      if (id === 'B2') api.say('B2: SOLD. It already "sold" you the keycard. It just didn\'t let go of it. Like me with grudges.', 'pleased');
      else api.say('Out drops ' + SNACKS[id] + '. Not above the keycard, so it falls straight past. I\'ll be eating that.', 'pleased');
      return true;
    },

    solution: [{ tap: 'bA2' }, { tap: 'tray' }],
    checks: [
      { name: 'shake the machine', steps: [{ tap: 'shake' }], expect: 'fail' },
      { name: 'buy B2 again', steps: [{ tap: 'bB2' }], expect: 'nope' },
      { name: 'buy the wrong snack', steps: [{ tap: 'bB1' }], expect: 'nope' },
      { name: 'empty tray', steps: [{ tap: 'tray' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
