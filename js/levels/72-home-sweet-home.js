/* Level 72 — Home Sweet Home (chapter finale)
 * The owners are coming home. Bossworth: "Sweep everything under the rug!" The owners' note says leave
 * everything exactly where it was — and the dusty shelf shows clean outlines of where each thing lived:
 * a flowerpot shape, a mug shape with a handle, and a tall picture frame. Put each item back on its
 * outline, then open the front door to greet the owners.
 * Wrong: an item on the wrong outline (nope); opening the door before the shelf is restored (trap).
 * Ruin: hide all three things under the rug (rug-mountain). Tapping the rug lifts it and returns items.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ITEMS = [
    { id: 'plant', art: 'plant', slot: 'slotPot', name: 'potted plant', home: [9, 4, 14, 18], floor: [6, 54, 14, 26] },
    { id: 'mug', art: 'mug', slot: 'slotMug', name: 'mug', home: [28, 12, 12, 10], floor: [26, 70, 16, 13] },
    { id: 'frame', art: 'b-frame', slot: 'slotFrame', name: 'picture frame', home: [46, 6, 12, 16], floor: [46, 58, 16, 20] }
  ];
  var SLOTS = { slotPot: [8, 10, 16, 13, 'flowerpot-shaped clean patch'], slotMug: [27, 12, 14, 11, 'mug-shaped clean patch with a handle'], slotFrame: [45, 6, 14, 16, 'tall rectangular clean patch'] };

  OBEY.registerLevel({
    id: 'home-sweet-home',
    num: 72,
    title: 'Home Sweet Home',
    objective: 'Put the house back the way it was, then greet the owners.',
    intro: 'The owners are home any minute! Quick — sweep everything under the rug. Rugs are floor-blankets for secrets. Nobody ever looks under a rug. NOBODY.',
    introMood: 'panicked',
    actions: ['drag', 'observe', 'tap', 'choice'],
    par: 4,
    hints: [
      'Read the owners\' note, then look closely at the dusty shelf.',
      'The dust has clean shapes where each thing used to stand: a flowerpot, a mug with a handle, a tall frame.',
      'Drag the plant, the mug and the frame onto their matching clean shapes on the shelf, then open the front door.'
    ],
    wrong: ['An item on the wrong outline doesn\'t fit (nope).', 'Opening the door before the shelf is restored is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'The owners walk in, look around and say "Huh. Nothing\'s different." Highest possible praise for a house-sitter.',
    trick: 'The clean shapes in the dust showed exactly where everything belonged; the rug was only ever a hiding place.',

    init: function () { return { placed: {}, rug: [] }; },

    view: function (s) {
      var done = Object.keys(s.placed).length;
      var objs = [
        O('shelf', 4, 4, 60, 24, { kind: 'static', art: 'b-dustshelf', artOpts: { filled: { pot: s.placed.plant, mug: s.placed.mug, frame: s.placed.frame } }, label: 'Dusty shelf with clean outlines: a flowerpot shape, a mug shape and a tall frame shape' }),
        O('note', 66, 4, 30, 27, { kind: 'static', text: 'Back at 6! Please leave everything EXACTLY where it was. — The Owners', label: 'Owners\' note: please leave everything exactly where it was', cls: 'ticket-card' })
      ];
      Object.keys(SLOTS).forEach(function (k) {
        var r = SLOTS[k];
        var filled = ITEMS.some(function (it) { return it.slot === k && s.placed[it.id]; });
        objs.push(O(k, r[0], r[1], r[2], r[3], { kind: 'zone', zone: true, hidden: filled, label: 'Shelf: ' + r[4] }));
      });
      ITEMS.forEach(function (it) {
        var onShelf = !!s.placed[it.id], under = s.rug.indexOf(it.id) >= 0;
        if (onShelf) objs.push(O(it.id + 'Home', it.home[0], it.home[1], it.home[2], it.home[3], { kind: 'static', art: it.art, label: 'The ' + it.name + ', back on the shelf' }));
        objs.push(O(it.id, it.floor[0], it.floor[1], it.floor[2], it.floor[3], { art: it.art, drag: true, hidden: onShelf || under, label: 'The ' + it.name + ', knocked onto the floor (drag it)' }));
      });
      objs.push(O('rug', 4, 84, 60, 13, { art: 'b-rug', artOpts: { lumps: s.rug.length }, zone: true, free: true, label: 'Rug' + (s.rug.length ? ' with ' + s.rug.length + ' suspicious lump' + (s.rug.length === 1 ? '' : 's') + ' (tap to lift it)' : '') }));
      objs.push(O('door', 70, 32, 26, 52, { art: 'door', artOpts: { sign: 'FRONT' }, label: 'Front door — the owners are outside (tap to open)' }));
      objs.push(O('count', 68, 87, 30, 9, { kind: 'static', text: 'Back in place: ' + done + '/3', label: '', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        var it = ITEMS.filter(function (x) { return x.id === a.target; })[0];
        if (!it) return false;
        if (a.zone === 'rug') {
          s.rug.push(it.id);
          if (s.rug.length === ITEMS.length) {
            api.complete({ ruin: 'rug-mountain', line: 'The owners walk in and trip over a rug the size of a hill. A mug rolls out. Then a plant. Then a picture of THEM. They\'re looking at me. Why are they looking at ME?!', mood: 'panicked' });
          } else api.say('Yes! Under the rug! Invisible! Undetectable! It\'s only a slightly lumpy rug. Lumpy rugs are a design choice.', 'pleased');
          return true;
        }
        if (SLOTS[a.zone]) {
          if (a.zone !== it.slot) { api.nope(); api.say('That doesn\'t match the shape in the dust. Even I can see that. And I\'m busy panicking.', 'annoyed'); return true; }
          s.placed[it.id] = true;
          api.say(Object.keys(s.placed).length === ITEMS.length ? 'All back? Exactly where they were? …The rug feels unloved, but fine. Open the door, then. Smile. Lie.' : 'Back in its dust-shaped spot. Very… honest. I hate honest tidying.', 'annoyed');
          return true;
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'rug') {
        if (!s.rug.length) { api.say('A rug. Flat. Unlumped. A wasted opportunity.', 'neutral'); return true; }
        s.rug = [];
        api.say('You lifted the rug?! Everything rolled out! Put it back! Under! The! Rug!', 'panicked');
        return true;
      }
      if (a.target === 'door') {
        if (Object.keys(s.placed).length < ITEMS.length) {
          api.fail('The owners step in, see the mess, then see Bossworth holding a mug like a guilty sock puppet. Everyone pretends this didn\'t happen. Five minutes ago again…');
          return true;
        }
        api.defy('rug');
        api.complete({ line: '"Huh. Everything\'s exactly where we left it." EXACTLY! Just as I planned! …Which I didn\'t. You did. Don\'t tell them.', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ drop: ['plant', 'slotPot'] }, { drop: ['mug', 'slotMug'] }, { drop: ['frame', 'slotFrame'] }, { tap: 'door' }],
    checks: [
      { name: 'answer the door straight away', steps: [{ tap: 'door' }], expect: 'fail' },
      { name: 'mug on the flowerpot shape', steps: [{ drop: ['mug', 'slotPot'] }], expect: 'nope' },
      { name: 'one thing under the rug', steps: [{ drop: ['mug', 'rug'] }], expect: 'playing' }
    ],
    ruinPaths: { 'rug-mountain': [{ drop: ['plant', 'rug'] }, { drop: ['mug', 'rug'] }, { drop: ['frame', 'rug'] }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
