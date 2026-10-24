/* Level 64 — Thirsty Plants
 * "Water ALL the plants. Lots." Only two are thirsty: the fern and the peace lily droop over dry, cracked
 * soil. The cactus was watered yesterday, the basil today (dark wet soil), and one plant is plastic.
 * Drag the watering can onto the two droopy plants.
 * Wrong: drowning the cactus or the basil (trap); watering the plastic plant (nope).
 * Ruin: water Bossworth (bossworth-bloom).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PLANTS = [
    { id: 'fern', kind: 'fern', soil: 'dry', thirsty: true, x: 4, y: 4, tag: 'Fern', desc: 'Fern, drooping, soil dry and cracked' },
    { id: 'cactus', kind: 'cactus', soil: 'dry', x: 36, y: 4, tag: 'Cactus · watered yesterday', desc: 'Cactus, label says watered yesterday, water monthly' },
    { id: 'basil', kind: 'basil', soil: 'wet', x: 68, y: 4, tag: 'Basil · watered today', desc: 'Basil, perky, soil dark and wet' },
    { id: 'lily', kind: 'lily', soil: 'dry', thirsty: true, x: 4, y: 48, tag: 'Peace lily', desc: 'Peace lily, drooping, soil dry and cracked' },
    { id: 'plastic', kind: 'plastic', soil: 'wet', x: 36, y: 48, tag: 'Bargain plant', desc: 'Plastic plant with a £2.99 price sticker' }
  ];

  OBEY.registerLevel({
    id: 'thirsty-plants',
    num: 64,
    title: 'Thirsty Plants',
    objective: 'Water the plants that actually need it.',
    intro: 'Water ALL the plants. Lots. Plants are basically fish with leaves. Even the spiky one. ESPECIALLY the spiky one. It looks thirsty. Spiky means thirsty.',
    introMood: 'pleased',
    actions: ['drag', 'observe', 'choice'],
    par: 2,
    hints: [
      'Not every plant wants water. Look at the leaves, the soil and the labels.',
      'Thirsty plants droop over dry, cracked soil. One plant has a price sticker for a reason.',
      'Drag the watering can onto the fern and the peace lily. Leave the rest alone.'
    ],
    wrong: ['Watering the cactus or the basil drowns it (trap).', 'Watering the plastic plant just makes a puddle (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Two perky plants, one smug cactus, one plastic plant pretending it was involved.',
    trick: 'Only the droopy plants over dry soil were thirsty; "water all of them" would have drowned the rest.',
    narratorZone: true,

    init: function () { return { watered: {} }; },

    view: function (s) {
      var objs = [];
      PLANTS.forEach(function (p) {
        var w = !!s.watered[p.id];
        objs.push(O(p.id, p.x, p.y, 28, 30, { art: 'b-houseplant', artOpts: { kind: p.kind, soil: w ? 'wet' : p.soil, droopy: p.thirsty && !w, watered: w }, zone: true, free: true, label: w ? p.tag + ', freshly watered and perking up' : p.desc }));
        objs.push(O(p.id + 'tag', p.x, p.y + 31, 28, 12, { kind: 'static', text: p.tag, label: '', cls: 'tag-card' }));
      });
      objs.push(O('can', 68, 50, 28, 26, { art: 'b-can', drag: true, label: 'Watering can (drag it onto a plant)' }));
      objs.push(O('cantag', 68, 79, 28, 9, { kind: 'static', text: 'Watering can', label: '', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap') {
        var t = PLANTS.filter(function (p) { return p.id === a.target; })[0];
        if (!t) return false;
        api.say(t.id === 'cactus' ? 'The spiky one. So thirsty. Look at it. Gasping.' : (t.id === 'plastic' ? 'A very low-maintenance plant. Water it anyway. Lots.' : 'A plant. Needs water. They all need water. All of them.'), 'pleased');
        return true;
      }
      if (a.type !== 'drop' || a.target !== 'can') return false;
      if (a.zone === 'narrator') {
        api.complete({ ruin: 'bossworth-bloom', line: 'SPLOOSH! You watered ME? I\'m drenched. I\'m… is that a LEAF? I\'m SPROUTING. There\'s a daisy on my head. This is the worst day of my blooming life!', mood: 'panicked' });
        return true;
      }
      var p = PLANTS.filter(function (x) { return x.id === a.zone; })[0];
      if (!p) return true;
      if (s.watered[p.id]) { api.nope(); api.say('Already watered. It\'s fine. It\'s hydrated. It\'s had a lovely time.', 'neutral'); return true; }
      if (p.id === 'cactus') { api.fail('Glug glug. The cactus, watered yesterday, now has wet feet and a terrible attitude. It sulks into mush. New plants arrive (somehow).'); return true; }
      if (p.id === 'basil') { api.fail('Glug glug. The basil was watered this morning; now it\'s pesto soup. The roots file a complaint. New plants!'); return true; }
      if (p.id === 'plastic') { api.nope(); api.say('You watered the plastic plant. It looks exactly the same. There is now a puddle. Well done, both of you.', 'laughing'); return true; }
      s.watered[p.id] = true;
      if (s.watered.fern && s.watered.lily) {
        api.defy('all');
        api.complete({ line: 'Only TWO? The others are… fine? Thriving, even? I was going to drown them with love. You\'ve robbed them of my love.', mood: 'defeated' });
      } else api.say('That one perked right up. Now do the cactus! The cactus is THIRSTY!', 'pleased');
      return true;
    },

    solution: [{ drop: ['can', 'fern'] }, { drop: ['can', 'lily'] }],
    checks: [
      { name: 'water the cactus', steps: [{ drop: ['can', 'cactus'] }], expect: 'fail' },
      { name: 'water the basil', steps: [{ drop: ['can', 'basil'] }], expect: 'fail' },
      { name: 'water the plastic plant', steps: [{ drop: ['can', 'plastic'] }], expect: 'nope' }
    ],
    ruinPaths: { 'bossworth-bloom': [{ drop: ['can', 'narrator'] }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
