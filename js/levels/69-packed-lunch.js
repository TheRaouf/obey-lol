/* Level 69 — Packed Lunch
 * A memory level. Read the owners' lunch note, fold it away (house rule: no peeking while packing),
 * then pack from memory while Bossworth "helpfully" recites a very different list (cookies, mostly).
 * Note: sandwich, apple, carrot, cheese — NO cookies. Pack those four, then close the lid.
 * Wrong: packing anything not on the note (trap, the note pops open again); closing the lid with
 * something missing (nope); packing before folding the note (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var LIST = ['sandwich', 'apple', 'carrot', 'cheese'];
  var ITEMS = [
    { id: 'cookie', art: 'b-cookie', name: 'cookie' }, { id: 'apple', art: 'b-apple', name: 'apple' }, { id: 'banana', art: 'b-banana', name: 'banana' },
    { id: 'cheese', art: 'b-cheese', name: 'cheese' }, { id: 'sandwich', art: 'sandwich', name: 'sandwich' }, { id: 'carrot', art: 'b-carrot', name: 'carrot sticks' }
  ];
  var POS = [[6, 58], [38, 58], [70, 58], [6, 79], [38, 79], [70, 79]];

  OBEY.registerLevel({
    id: 'packed-lunch',
    num: 69,
    title: 'Packed Lunch',
    objective: 'Pack the lunchbox exactly as the note says.',
    intro: 'Pack little Pip\'s lunch from the note. Read it, then fold it away — notes are for amateurs. I\'ll remember the list for you. My memory is flawless. FLAWLESS.',
    introMood: 'pleased',
    actions: ['read', 'memory', 'drag', 'tap'],
    par: 6,
    hints: [
      'Read the note carefully before you fold it. Bossworth\'s version afterwards is… creative.',
      'Four things are on the note, and one thing is banned.',
      'Sandwich, apple, carrot sticks and cheese — no cookies, no banana. Then close the lid.'
    ],
    wrong: ['Packing something that wasn\'t on the note is a trap (the note pops open again).', 'Closing the lid with something missing is refused (nope).', 'Packing before folding the note away is refused (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'A perfectly packed lunch. Not a single cookie. A small tragedy, nutritionally sound.',
    trick: 'You remembered the real note instead of Bossworth\'s cookie-heavy "recap".',

    init: function () { return { folded: false, packed: [] }; },

    view: function (s) {
      var objs = [
        O('note', 4, 4, 44, 40, { kind: 'static', text: s.folded ? '(note folded away)' : 'LUNCH LIST\n• sandwich\n• apple\n• carrot sticks\n• cheese\nNO COOKIES!', label: s.folded ? 'The lunch note, folded away' : 'Lunch note: sandwich, apple, carrot sticks, cheese. No cookies.', cls: s.folded ? 'tag-card' : 'ticket-card' }),
        O('fold', 4, 46, 44, 10, { text: 'Fold the note away', label: 'Fold the note away and start packing', cls: 'btn-card', hidden: s.folded }),
        O('box', 54, 4, 42, 32, { art: 'b-lunchbox', artOpts: { count: s.packed.length }, zone: true, free: true, label: 'Lunchbox, holding ' + (s.packed.length ? s.packed.join(', ') : 'nothing yet') }),
        O('close', 54, 40, 42, 12, { text: 'Close the lid', label: 'Close the lunchbox lid', cls: 'btn-card accent' })
      ];
      ITEMS.forEach(function (it, i) {
        objs.push(O(it.id, POS[i][0], POS[i][1], 24, 18, { art: it.art, drag: true, hidden: s.packed.indexOf(it.name) >= 0, label: it.name.charAt(0).toUpperCase() + it.name.slice(1) + ' (drag it to the lunchbox)' }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'fold') {
        s.folded = true;
        api.say('Right. From memory: cookies, a banana, more cookies and… a cookie. I remember it vividly. Like a dream. A cookie dream.', 'pleased');
        return true;
      }
      if (a.type === 'tap' && a.target === 'box') { api.say('A lunchbox. It yearns for cookies. You can hear it yearning.', 'neutral'); return true; }
      if (a.type === 'tap' && a.target === 'close') {
        var missing = LIST.filter(function (n) { return s.packed.indexOf(n === 'carrot' ? 'carrot sticks' : n) < 0; });
        if (missing.length) { api.nope(); api.say('Close it already? It\'s got ' + (s.packed.length ? s.packed.length + ' thing' + (s.packed.length === 1 ? '' : 's') : 'nothing') + ' in it. A growing kid needs more. Cookies, mainly.', 'suspicious'); return true; }
        api.defy('cookies');
        api.complete({ line: 'Sandwich, apple, carrots, cheese. Exactly the note. You remembered the NOTE, not ME? I was right here! Saying cookie!', mood: 'defeated' });
        return true;
      }
      if (a.type !== 'drop') return false;
      var it = ITEMS.filter(function (x) { return x.id === a.target; })[0];
      if (!it || a.zone !== 'box') return true;
      if (!s.folded) { api.nope(); api.say('House rule: fold the note away first. No peeking while packing. It builds character. And memory. Mostly character.', 'neutral'); return true; }
      if (LIST.indexOf(it.id) < 0) {
        api.fail(it.id === 'cookie' ? 'A cookie! The note flaps open by itself: "NO COOKIES!" it shrieks. Everything comes out. Re-read and try again.' : 'A banana? The note flaps open in protest: that was never on the list. Everything comes out. Re-read and try again.');
        return true;
      }
      s.packed.push(it.name);
      api.say(['That\'s not a cookie. Odd choice. Bold.', 'Another non-cookie. Are you feeling well?', 'You\'re ignoring my flawless memory. It hurts.', 'Done? No cookies at ALL? Close it then, monster.'][s.packed.length - 1], 'annoyed');
      return true;
    },

    solution: [{ tap: 'fold' }, { drop: ['sandwich', 'box'] }, { drop: ['apple', 'box'] }, { drop: ['carrot', 'box'] }, { drop: ['cheese', 'box'] }, { tap: 'close' }],
    checks: [
      { name: 'pack a cookie', steps: [{ tap: 'fold' }, { drop: ['cookie', 'box'] }], expect: 'fail' },
      { name: 'pack before folding', steps: [{ drop: ['apple', 'box'] }], expect: 'nope' },
      { name: 'close too soon', steps: [{ tap: 'fold' }, { drop: ['apple', 'box'] }, { tap: 'close' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
