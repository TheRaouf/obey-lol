/* Level 200 — Keeper's Ferry (Lighthouse Lookout)
 * River-crossing logic. Row the keeper's seal, fish and tin of worms from the quay to the lighthouse
 * island. The boat holds you plus one. Left alone together, the seal eats the fish and the fish eats
 * the worms. Bossworth: take the seal first. Answer: fish over, back, seal over, fish back, worms over,
 * back, fish over (or worms instead of seal second).
 * Wrong: leaving the seal with the fish, or the fish with the worms (trap). Boarding a second passenger (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ITEMS = [
    { id: 'seal', name: 'the seal', art: 'i-seal' },
    { id: 'fish', name: 'the fish', art: 'fish' },
    { id: 'worms', name: 'the tin of worms', art: 'i-worms' }
  ];
  function eats(bank) {
    if (bank.seal && bank.fish) return 'The seal eats the fish. Gulp.';
    if (bank.fish && bank.worms) return 'The fish eats the worms. Slurp.';
    return null;
  }

  OBEY.registerLevel({
    id: 'keepers-ferry',
    num: 200,
    title: 'Keeper\'s Ferry',
    objective: 'Row the seal, fish and worms to the island, all uneaten.',
    intro: 'Ferry the seal, the fish and the worms over to the lighthouse. Take the seal first. He\'s the heaviest, so get the hard bit done!',
    introMood: 'neutral',
    actions: ['tap', 'logic', 'sequence'],
    par: 12,
    hints: [
      'Only one of the three is both hungry and food. Who is in the middle of the menu?',
      'Take the fish first. Later you may have to bring something back.',
      'Fish over, row back, seal over, bring the fish back, worms over, row back, fish over.'
    ],
    wrong: ['Leaving the seal with the fish, or the fish with the worms, gets someone eaten (trap).', 'The boat only fits you and one passenger (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Everyone on the island, nobody eaten. The seal is sulking. Seals always sulk.',
    trick: 'The fish was both hungry and food, so it went first and came back once, and nothing was ever left alone with its dinner.',

    init: function () { return { side: 'L', at: { seal: 'L', fish: 'L', worms: 'L' } }; },

    view: function (s) {
      var boatX = s.side === 'L' ? 28 : 52;
      var out = [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-sea', cls: 'backdrop' }),
        O('rule', 4, 3, 92, 17, { kind: 'static', text: 'Left alone: SEAL eats FISH, FISH eats WORMS. Boat: you + 1.', label: 'Rules: left alone together, the seal eats the fish and the fish eats the worms. The boat holds you and one passenger.', cls: 'sign-card' }),
        O('bankL', 0, 24, 26, 52, { kind: 'static', art: 'i-island', label: 'The quay' }),
        O('bankR', 74, 24, 26, 52, { kind: 'static', art: 'i-island', label: 'The lighthouse island' }),
        O('tagL', 2, 78, 22, 9, { kind: 'static', text: 'QUAY', label: '', cls: 'tag-card' }),
        O('tagR', 76, 78, 22, 9, { kind: 'static', text: 'ISLAND', label: '', cls: 'tag-card' }),
        O('boat', boatX, 60, 20, 11, { kind: 'static', art: 'i-rowboat', label: 'Rowing boat, at the ' + (s.side === 'L' ? 'quay' : 'island') }),
        O('keeper', boatX + 1, 48, 8, 13, { kind: 'static', art: 'hero', label: 'You, the keeper, in the boat' })
      ];
      ITEMS.forEach(function (it, i) {
        var where = s.at[it.id];
        var x = where === 'L' ? 2 : (where === 'R' ? 76 : boatX + 9), y = where === 'B' ? 46 : 26 + i * 16, w = where === 'B' ? 12 : 22;
        out.push(O(it.id, x, y, w, 14, { art: it.art, label: it.name.charAt(0).toUpperCase() + it.name.slice(1) + (where === 'B' ? ', in the boat' : (where === 'L' ? ', on the quay' : ', on the island')) }));
      });
      out.push(O('row', 30, 80, 40, 13, { text: 'Row across', label: 'Row across to the ' + (s.side === 'L' ? 'island' : 'quay'), cls: 'btn-card big' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var it = ITEMS.filter(function (x) { return x.id === a.target; })[0];
      var passenger = Object.keys(s.at).filter(function (k) { return s.at[k] === 'B'; })[0];
      if (it) {
        var where = s.at[it.id];
        if (where === 'B') { s.at[it.id] = s.side; return true; }
        if (where !== s.side) { api.nope(); api.say('That one\'s on the other side. The boat is over here. Boats don\'t stretch.', 'neutral'); return true; }
        if (passenger) { api.nope(); api.say('The boat fits you and ONE passenger. It\'s a rowing boat, not a cruise ship.', 'annoyed'); return true; }
        s.at[it.id] = 'B';
        if (it.id === 'seal') api.say('The seal! Excellent choice. Mine, I mean.', 'pleased');
        return true;
      }
      if (a.target !== 'row') return false;
      var left = {};
      Object.keys(s.at).forEach(function (k) { if (s.at[k] === s.side) left[k] = true; });
      var eaten = eats(left);
      if (eaten) { api.fail(eaten + ' You rowed off and left them alone together. Everyone back on the quay, minus one snack.'); return true; }
      s.side = s.side === 'L' ? 'R' : 'L';
      if (passenger) s.at[passenger] = s.side;
      if (s.at.seal === 'R' && s.at.fish === 'R' && s.at.worms === 'R') {
        api.defy('seal-first');
        api.complete({ line: 'All three on the island, all three uneaten. You took the fish first. And back. And forth. I got seasick just watching.', mood: 'defeated' });
      }
      return true;
    },

    solution: [{ tap: 'fish' }, { tap: 'row' }, { tap: 'row' }, { tap: 'seal' }, { tap: 'row' }, { tap: 'fish' }, { tap: 'row' }, { tap: 'worms' }, { tap: 'row' }, { tap: 'row' }, { tap: 'fish' }, { tap: 'row' }],
    alternatives: { 'worms-second': [{ tap: 'fish' }, { tap: 'row' }, { tap: 'row' }, { tap: 'worms' }, { tap: 'row' }, { tap: 'fish' }, { tap: 'row' }, { tap: 'seal' }, { tap: 'row' }, { tap: 'row' }, { tap: 'fish' }, { tap: 'row' }] },
    checks: [
      { name: 'seal first leaves fish with worms (trap)', steps: [{ tap: 'seal' }, { tap: 'row' }], expect: 'fail' },
      { name: 'rowing empty at the start is a trap', steps: [{ tap: 'row' }], expect: 'fail' },
      { name: 'a second passenger is a nope', steps: [{ tap: 'fish' }, { tap: 'seal' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
