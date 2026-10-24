/* Level 116 — Cut the Right Wire
 * Bossworth's confetti cannon is "about to go off". He says: cut the red wire, it's always the
 * red wire, and don't read the manual. Turn the manual to page 2: with exactly one red and more
 * than one blue wire, cut the LAST blue wire (wire 4). Any other wire fires the cannon (trap).
 * The countdown is a kitchen timer: reaching zero does nothing, so there is no time pressure.
 * Poking the cannon is a nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var WIRES = [
    { color: 'red', hex: '#e5243b' },
    { color: 'blue', hex: '#3e7bff' },
    { color: 'yellow', hex: '#ffc31f' },
    { color: 'blue', hex: '#3e7bff' }
  ];
  var RIGHT = 3;
  var PAGES = [
    'CONFETTI CANNON\nOWNER\'S MANUAL\n\nPage 1 of 2\n(Tap to turn the page.)',
    'WIRES (page 2)\n1. No yellow wire? Cut the first wire.\n2. Exactly one red AND more than one blue? Cut the LAST blue.\n3. Otherwise, cut the red.'
  ];

  OBEY.registerLevel({
    id: 'cut-the-right-wire',
    num: 116,
    title: 'Cut the Right Wire',
    objective: 'Disarm the confetti cannon.',
    intro: 'My confetti cannon is about to go off! Cut the red wire. It\'s ALWAYS the red wire. Every film agrees. And don\'t read the manual. Manuals are for quitters.',
    introMood: 'panicked',
    actions: ['tap', 'reading', 'logic'],
    par: 2,
    hints: [
      'There is no rush: look closely at what the countdown is attached to. Then read the manual.',
      'Turn to page 2 and check the rules in order against the four wires.',
      'There is a yellow wire, one red and two blues, so rule 2 applies: cut wire 4, the last blue.'
    ],
    wrong: ['Cutting the red wire (or any wrong wire) fires the confetti (trap).', 'Poking the cannon does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Disarmed. The confetti lives to celebrate another day.',
    trick: 'The manual\'s rules, checked in order, pointed to the last blue wire; the countdown was only a kitchen timer, so there was time to read.',

    init: function () { return { page: 0, left: 10, cut: -1 }; },

    onStart: function (s, api) {
      api.every(1000, function () {
        if (s.left <= 0) return;
        s.left--;
        if (s.left === 0) api.say('Zero! Brace! …Nothing? Oh. That\'s my kitchen timer. I set it for my boiled egg. Carry on.', 'surprised');
      });
    },

    view: function (s) {
      var objs = [
        O('cannon', 4, 4, 40, 32, { art: 'd-cannon', label: 'Confetti cannon, wired to the panel' }),
        O('timer', 48, 4, 48, 13, { kind: 'static', text: 'Kitchen timer 00:' + (s.left < 10 ? '0' : '') + s.left, label: 'Kitchen timer: ' + s.left + ' seconds', cls: 'display-card' }),
        O('manual', 48, 20, 48, 52, { text: PAGES[s.page], label: s.page ? 'Manual page 2: ' + PAGES[1].replace(/\n/g, ' ') : 'Manual page 1, tap to turn the page', cls: 'book-card' }),
        O('order', 4, 88, 40, 9, { kind: 'static', text: 'Wire 1 → wire 4', label: 'Wires are numbered 1 to 4 from left to right', cls: 'tag-card' })
      ];
      WIRES.forEach(function (w, i) {
        objs.push(O('wire' + (i + 1), 5 + i * 10, 40, 9, 46, { art: 'd-wire', artOpts: { color: w.hex, cut: s.cut === i }, label: 'Wire ' + (i + 1) + ', ' + w.color + (s.cut === i ? ', cut' : '') }));
      });
      objs.push(O('panic', 48, 76, 48, 20, { kind: 'static', text: 'Snip carefully. Snip once.', label: 'Snip carefully. Snip once.', cls: 'sign-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'manual') {
        s.page = 1 - s.page;
        if (s.page) { api.defy('manual'); api.say('You\'re READING it? In a crisis? …What does it say? Not that I care.', 'annoyed'); }
        return true;
      }
      if (a.target === 'cannon') {
        api.nope();
        api.say('Don\'t poke it! It\'s full of confetti and feelings.', 'panicked');
        return true;
      }
      var m = /^wire([1-4])$/.exec(a.target);
      if (!m) return false;
      var i = Number(m[1]) - 1;
      if (i === RIGHT) {
        s.cut = i;
        api.complete({ line: 'Snip. Silence. The LAST BLUE wire? Every film I\'ve ever seen has lied to me. I need to sit down. Next to the confetti.', mood: 'defeated' });
      } else {
        api.fail(i === 0
          ? 'You cut the red wire. FOOMP! Confetti. Everywhere. In my hair. In my tea. Films are NOT documentaries. Reloading the cannon…'
          : 'Snip… FOOMP! Wrong wire. The lab is now a party nobody asked for. Reloading the cannon…', 'laughing');
      }
      return true;
    },

    solution: [{ tap: 'manual' }, { tap: 'wire4' }],
    alternatives: { 'lucky-snip': [{ tap: 'wire4' }], 'after-the-egg': [{ wait: 12000 }, { tap: 'manual' }, { tap: 'wire4' }] },
    checks: [
      { name: 'the red wire is a trap', steps: [{ tap: 'wire1' }], expect: 'fail' },
      { name: 'the first blue wire is a trap', steps: [{ tap: 'manual' }, { tap: 'wire2' }], expect: 'fail' },
      { name: 'poking the cannon is a nope', steps: [{ tap: 'cannon' }], expect: 'nope' },
      { name: 'the timer running out is harmless', steps: [{ wait: 15000 }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
