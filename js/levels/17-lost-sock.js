/* Level 17 — The Lost Sock
 * Bossworth insists the sock is in drawer 3 and the cat is "not involved". The drawers hold gags;
 * the sock is under the cat. Solution: tap the cat (it moves), drag the sock into the laundry basket.
 * Wrong: drawers (nope gags), dropping the sock anywhere else.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ITEMS = ['a rubber duck', 'one single noodle', 'a note: "not here lol"'];

  OBEY.registerLevel({
    id: 'lost-sock',
    num: 17,
    title: 'The Lost Sock',
    objective: 'Find Bossworth\'s lucky sock and put it in the laundry basket.',
    intro: 'I lost my lucky sock. It is DEFINITELY in drawer 3. And do not disturb the cat. The cat is not involved.',
    introMood: 'neutral',
    actions: ['tap', 'search', 'drag'],
    par: 2,
    narratorZone: true,
    hints: [
      'Bossworth was very keen that you leave the cat alone.',
      'Look under the cat.',
      'Tap the cat, then drag the sock into the laundry basket.'
    ],
    wrong: ['Drawers contain only gags.', 'The sock must go in the basket, not anywhere else.'],
    secrets: [],
    endingNote: 'None.',
    done: 'The sock is found. The cat is unimpressed.',

    init: function () { return { open: [false, false, false], catMoved: false }; },

    view: function (s) {
      var objs = [
        O('chest', 4, 5, 40, 60, { kind: 'static', text: '', cls: 'tag-card', label: '' }),
        O('legs', 4, 63, 40, 12, { kind: 'static', art: 'table', artOpts: { tall: true } })
      ];
      for (var i = 0; i < 3; i++) {
        objs.push(O('d' + (i + 1), 6, 8 + i * 19, 36, 17, { art: 'drawer', artOpts: { n: i + 1, open: s.open[i] }, label: 'Drawer ' + (i + 1) + (s.open[i] ? ', contains ' + ITEMS[i] : '') }));
      }
      objs.push(O('basket', 6, 70, 32, 26, { art: 'basket', label: 'Laundry basket', zone: true, free: true }));
      objs.push(O('bed', 52, 70, 42, 22, { kind: 'static', art: 'catbed', label: 'Cat bed' }));
      objs.push(O('sock', 64, 72, 18, 16, { art: 'sock', label: 'Lucky striped sock', drag: true, hidden: !s.catMoved, cls: 'pop-in' }));
      objs.push(O('cat', s.catMoved ? 64 : 58, s.catMoved ? 10 : 58, 28, 26, { art: 'cat', artOpts: { grumpy: s.catMoved }, label: s.catMoved ? 'Grumpy cat on the shelf' : 'Sleeping cat in its bed', disabled: s.catMoved }));
      if (s.catMoved) objs.push(O('shelf', 58, 34, 38, 5, { kind: 'static', art: 'shelf' }));
      return objs;
    },

    on: function (a, s, api) {
      var m = a.type === 'tap' && /^d([123])$/.exec(a.target);
      if (m) {
        var i = Number(m[1]) - 1;
        s.open[i] = true;
        api.nope();
        api.say('Drawer ' + (i + 1) + ': ' + ITEMS[i] + '. ' + (i === 2 ? 'Hmm. Past me is a liar.' : 'Not a sock. Try drawer 3. Definitely drawer 3.'), 'suspicious');
        return true;
      }
      if (a.type === 'tap' && a.target === 'cat') {
        s.catMoved = true;
        api.defy('cat');
        api.say('You DISTURBED THE CAT. The cat is furious. And it was sleeping on… my sock?! The cat stole my sock!', 'surprised');
        return true;
      }
      if (a.type === 'drop' && a.target === 'sock') {
        if (a.zone === 'basket') {
          api.complete({ line: 'My lucky sock! In the wash! It will lose all its luck! …Fine. Thank you. Grudgingly.', mood: 'defeated' });
        } else {
          api.nope('sock');
          api.say(a.zone === 'narrator' ? 'EW. Do not hand me a cat-warm sock. Laundry basket!' : 'The sock flops back into the cat bed. It belongs in the laundry.', 'annoyed');
        }
        return true;
      }
      if (a.type === 'tap' && a.target === 'basket') { api.say('A laundry basket. Sock-shaped hole in my life.', 'neutral'); return true; }
      return false;
    },

    trick: 'The cat was sitting on the sock. Wake the cat, not the drawers.',
    solution: [{ tap: 'cat' }, { drop: ['sock', 'basket'] }],
    checks: [
      { name: 'drawer 3, as told', steps: [{ tap: 'd3' }], expect: 'nope' },
      { name: 'sock handed to Bossworth', steps: [{ tap: 'cat' }, { drop: ['sock', 'narrator'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
