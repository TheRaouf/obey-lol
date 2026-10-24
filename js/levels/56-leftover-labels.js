/* Level 56 — Leftover Labels
 * Three tubs: soup, chilli, and a soup-and-chilli mix. Bossworth labelled them, and the owners' note says
 * every one of his labels is wrong. One peek is allowed. Peeking at any tub lets you deduce the chilli:
 *   SOUP-label = chilli, CHILLI-label = mix, MIX-label = soup.
 * Wrong: a second peek (nope); microwaving anything that isn't the chilli (trap) — like the CHILLI tub.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TUBS = { tA: { label: 'SOUP', inside: 'chilli' }, tB: { label: 'CHILLI', inside: 'mix' }, tC: { label: 'MIX', inside: 'soup' } };
  var NAME = { chilli: 'chilli', soup: 'soup', mix: 'soup-and-chilli mix' };
  var X = { tA: 4, tB: 36, tC: 68 };

  OBEY.registerLevel({
    id: 'leftover-labels',
    num: 56,
    title: 'Leftover Labels',
    objective: 'Microwave the tub of pure chilli.',
    intro: 'Dinner is my famous chilli! It\'s in the tub labelled CHILLI. I labelled every tub myself, very carefully, with my eyes mostly open.',
    introMood: 'pleased',
    actions: ['tap', 'drag', 'logic'],
    par: 2,
    hints: [
      'Read the owners\' note. If every label is wrong, the CHILLI tub can\'t be chilli.',
      'Peek inside the tub labelled MIX: it can\'t be the mix, so it\'s pure soup or pure chilli. Then rule things out.',
      'The MIX tub holds soup, so the CHILLI tub must be the mix — the chilli is in the tub labelled SOUP. Drag it into the microwave.'
    ],
    wrong: ['A second peek is refused (nope).', 'Microwaving the soup or the mix is a trap — including the tub labelled CHILLI.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Chilli, found by pure logic and one nosy peek.',
    trick: 'Every label was wrong, so one peek was enough to deduce which tub held the chilli.',

    init: function () { return { peek: null }; },

    view: function (s) {
      var objs = [
        O('note', 4, 2, 92, 18, { kind: 'static', text: 'Owners\' note: Bossworth labelled the tubs, so EVERY label is wrong. One tub is soup, one is chilli, one is a soup-and-chilli mix. One peek only — the fridge gets cold.', label: 'Owners\' note: every label is wrong. One tub is soup, one chilli, one a soup-and-chilli mix. One peek only.', cls: 'honest-card' })
      ];
      Object.keys(TUBS).forEach(function (id) {
        var t = TUBS[id], open = s.peek === id, x = X[id];
        objs.push(O(id, x, 23, 28, 26, { art: 'b-tub', artOpts: { open: open, content: open ? t.inside : null }, drag: true, label: 'Tub labelled ' + t.label + (open ? ' (you peeked: it is ' + NAME[t.inside] + ')' : '') + ' — drag it to the microwave' }));
        objs.push(O('lbl' + id, x + 2, 50, 24, 8, { kind: 'static', text: open ? t.label + ' = ' + NAME[t.inside].replace('soup-and-chilli ', '') : t.label, label: '', cls: open ? 'tag-card' : 'plaque-card' }));
        objs.push(O('peek' + id, x + 2, 60, 24, 10, { text: 'Peek', label: 'Peek inside the tub labelled ' + t.label, cls: 'btn-card ghost', disabled: open }));
      });
      objs.push(O('micro', 28, 74, 44, 24, { art: 'b-microwave', zone: true, free: true, label: 'Microwave (drop a tub here)' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && /^peekt[ABC]$/.test(a.target)) {
        var id = a.target.slice(4);
        if (s.peek && s.peek !== id) { api.nope(); api.say('One peek! You\'re letting all the cold out. Cold is expensive. I would know, I bought it.', 'annoyed'); return true; }
        s.peek = id;
        api.say(TUBS[id].inside === 'chilli' ? 'Oh. That one\'s… chilli. Lucky. Labels are more of a vibe, really.' : 'That\'s ' + NAME[TUBS[id].inside] + '. Fascinating. Irrelevant. The CHILLI tub is still the chilli.', TUBS[id].inside === 'chilli' ? 'surprised' : 'suspicious');
        return true;
      }
      if (a.type === 'tap' && a.target === 'micro') { api.say('Drag a tub in. Preferably the one that says CHILLI. Because it\'s chilli. Says so.', 'pleased'); return true; }
      if (a.type === 'drop' && TUBS[a.target]) {
        if (a.zone !== 'micro') return true;
        var inside = TUBS[a.target].inside;
        if (inside === 'chilli') {
          api.defy('labels');
          api.complete({ line: 'You microwaved the SOUP tub and it\'s… chilli. Steaming, perfect chilli. My labels have betrayed me. Or I betrayed them. Either way: delicious.', mood: 'defeated' });
        } else {
          api.fail('PING! You heated the ' + NAME[inside] + '. Bossworth demanded chilli and is now sulking into a spoon. Tubs reset — think it through.');
        }
        return true;
      }
      return false;
    },

    solution: [{ tap: 'peektC' }, { drop: ['tA', 'micro'] }],
    alternatives: { peekB: [{ tap: 'peektB' }, { drop: ['tA', 'micro'] }], peekA: [{ tap: 'peektA' }, { drop: ['tA', 'micro'] }] },
    checks: [
      { name: 'trust the CHILLI label', steps: [{ drop: ['tB', 'micro'] }], expect: 'fail' },
      { name: 'second peek', steps: [{ tap: 'peektC' }, { tap: 'peektB' }], expect: 'nope' },
      { name: 'heat the soup', steps: [{ drop: ['tC', 'micro'] }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
