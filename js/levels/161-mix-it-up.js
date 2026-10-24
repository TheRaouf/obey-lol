/* Level 161 — Mix It Up (Paintpot Pass)
 * Paint the frog green. Bossworth: green is red plus blue. The colour-mixing poster: blue + yellow =
 * green (red + blue = purple). Drag blue and yellow onto the palette and press Mix.
 * Wrong: any other mix (trap); Mix with nothing on the palette (nope). Ruin: all four pots at once (mud).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var POTS = [
    { id: 'red', name: 'RED', color: '#e5243b', glyph: 'tri' },
    { id: 'yellow', name: 'YELLOW', color: '#ffd23f', glyph: 'circle' },
    { id: 'blue', name: 'BLUE', color: '#3a86ff', glyph: 'square' },
    { id: 'white', name: 'WHITE', color: '#fffdf6', glyph: 'diamond' }
  ];
  function pot(id) { return POTS.filter(function (p) { return p.id === id; })[0]; }

  OBEY.registerLevel({
    id: 'mix-it-up',
    num: 161,
    title: 'Mix It Up',
    objective: 'Mix green paint and paint the frog.',
    intro: 'Art class! Paint the frog green. Green is red plus blue; everybody knows that. Trust me, I once painted a fence. Most of it.',
    introMood: 'pleased',
    actions: ['drag', 'tap'],
    par: 3,
    hints: [
      'The poster on the wall knows more about paint than Bossworth.',
      'Red and blue make purple. Find the pair that makes green.',
      'Drag BLUE and YELLOW onto the palette, then press Mix.'
    ],
    wrong: ['Mixing anything but blue and yellow is a trap.', 'Mixing an empty palette is a nope.', 'Tipping in all four pots is a ruin.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Blue and yellow: one green frog, ribbiting with pride.',
    trick: 'The colour poster was right and Bossworth wasn\'t: blue and yellow make green, red and blue make purple.',

    init: function () { return { on: [] }; },

    view: function (s) {
      var dots = s.on.map(function (id) { return pot(id).color; });
      var out = [
        O('poster', 4, 3, 46, 32, { kind: 'static', text: 'COLOUR MIXING\nBlue + Yellow = Green\nRed + Yellow = Orange\nRed + Blue = Purple', label: 'Colour mixing poster: blue and yellow make green, red and yellow make orange, red and blue make purple', cls: 'honest-card' }),
        O('easel', 51, 12, 46, 64, { kind: 'static', art: 'g-easel', label: 'Easel with an unpainted frog' }),
        O('table', 2, 64, 48, 11, { kind: 'static', art: 'table' }),
        O('palette', 4, 43, 44, 26, { art: 'g-palette', artOpts: { dots: dots }, label: 'Mixing palette' + (s.on.length ? ' with ' + s.on.join(' and ') : ', empty') + ' (drop paint here; tap to wash it)', zone: true, free: true }),
        O('mix', 76, 78, 20, 19, { text: 'Mix!', label: 'Mix the paint on the palette', cls: 'btn-card big' })
      ];
      POTS.forEach(function (p, i) {
        var used = s.on.indexOf(p.id) >= 0;
        out.push(O('pot-' + p.id, 4 + i * 18, 78, 15, 13, { art: 'g-pot', artOpts: { color: p.color, glyph: p.glyph }, label: p.name.charAt(0) + p.name.slice(1).toLowerCase() + ' paint pot (drag it)', drag: true, hidden: used }));
        out.push(O('name-' + p.id, 3 + i * 18, 91.5, 17, 6, { kind: 'static', text: p.name, label: '', cls: 'tag-card', hidden: used }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        var p = /^pot-(\w+)$/.exec(a.target);
        if (!p) return false;
        if (a.zone === 'palette' && s.on.indexOf(p[1]) < 0) s.on.push(p[1]);
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'palette') {
        if (s.on.length) { s.on = []; api.say('Washed. Clean palette, clean slate, clean conscience. Red and blue next time.', 'neutral'); }
        return true;
      }
      if (a.target !== 'mix') return false;
      var on = s.on.slice().sort().join('+');
      if (!s.on.length) { api.nope('mix'); api.say('You stir an empty palette. Very expressive. Very beige. Add some paint.', 'suspicious'); return true; }
      if (s.on.length === 4) {
        api.complete({ ruin: 'mud-masterpiece', line: 'ALL FOUR? You made MUD. You painted the frog the colour of a puddle. The art teacher framed it and called it "Monday". I hate it. I HATE that it\'s in the corridor.', mood: 'panicked' });
        return true;
      }
      if (on === 'blue+yellow') {
        api.defy('green');
        api.complete({ line: 'Green! A green frog! From blue and YELLOW. Then what was the fence? …Never mind the fence.', mood: 'defeated' });
        return true;
      }
      var msg = {
        'blue+red': 'You mixed red and blue: a lovely PURPLE. The frog looks like a plum with opinions.',
        'red+yellow': 'Red and yellow: ORANGE. The frog is now a satsuma.',
        'blue': 'Just blue. The frog looks cold.', 'red': 'Just red. The frog looks cross.', 'yellow': 'Just yellow. The frog looks like custard.', 'white': 'Just white. The frog looks like a ghost of a frog.'
      }[on] || 'That mix comes out a murky ' + (s.on.indexOf('white') >= 0 ? 'pale sludge' : 'brown') + '. The frog croaks in protest.';
      api.fail(msg + ' Clean palette, try again. The poster knows.');
      return true;
    },

    solution: [{ drop: ['pot-blue', 'palette'] }, { drop: ['pot-yellow', 'palette'] }, { tap: 'mix' }],
    ruinPaths: { 'mud-masterpiece': [{ drop: ['pot-red', 'palette'] }, { drop: ['pot-yellow', 'palette'] }, { drop: ['pot-blue', 'palette'] }, { drop: ['pot-white', 'palette'] }, { tap: 'mix' }] },
    checks: [
      { name: 'Bossworth\'s red and blue', steps: [{ drop: ['pot-red', 'palette'] }, { drop: ['pot-blue', 'palette'] }, { tap: 'mix' }], expect: 'fail' },
      { name: 'empty palette', steps: [{ tap: 'mix' }], expect: 'nope' },
      { name: 'mud is a ruin', steps: [{ drop: ['pot-red', 'palette'] }, { drop: ['pot-yellow', 'palette'] }, { drop: ['pot-blue', 'palette'] }, { drop: ['pot-white', 'palette'] }, { tap: 'mix' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
