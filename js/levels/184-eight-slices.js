/* Level 184 — Eight Slices (Feast Fiasco)
 * Eight guests, one tall two-layer cake, and a blunt knife good for exactly three straight cuts.
 * Bossworth insists on cutting from above "like a normal king" (three cuts from above = 6 slices).
 * Two cuts from above (4 wedges) plus one cut from the side through the jam layer doubles them to 8.
 * Wrong: three cuts from above leaves 6 slices for 8 guests (trap); a second sideways cut (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var MAX = 3;

  function pieces(s) { return (s.v === 0 ? 1 : s.v * 2) * (s.h ? 2 : 1); }

  OBEY.registerLevel({
    id: 'eight-slices',
    num: 184,
    title: 'Eight Slices',
    objective: 'Cut the cake into 8 pieces with 3 straight cuts.',
    intro: 'Eight guests, one cake, three cuts — the knife is blunt. Cut from above, like a normal king. Straight down, three times. Sides are for peasants.',
    introMood: 'surprised',
    actions: ['tap', 'logic'],
    par: 3,
    hints: [
      'Look at the cake from the side as well as from above. It is tall, with a jam layer in the middle.',
      'Two cuts from above make 4 wedges. One cut from the side, through the jam layer, would split every wedge in two.',
      'Cut from above twice, then cut from the side once.'
    ],
    wrong: ['Three cuts from above only make 6 slices (trap).', 'The cake can only be split through the jam layer once (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Eight slices, three cuts, one smug player. I had my slice from the side. Like a peasant. It was delicious.',
    trick: 'Two cuts from above make four wedges, and one cut from the side through the jam layer splits all four at once: eight slices from three cuts.',

    init: function () { return { v: 0, h: false }; },

    view: function (s) {
      var used = s.v + (s.h ? 1 : 0);
      return [
        O('sign', 4, 4, 54, 13, { kind: 'static', text: '8 GUESTS. KNIFE: 3 CUTS LEFT', label: 'Sign: 8 guests. The blunt knife has 3 cuts left.', cls: 'sign-card' }),
        O('count', 64, 4, 32, 13, { kind: 'static', text: 'Cuts: ' + used + ' of 3\nSlices: ' + pieces(s), label: 'Cuts used: ' + used + ' of 3. Slices so far: ' + pieces(s), cls: 'tag-card' }),
        O('above', 4, 24, 24, 10, { kind: 'static', text: 'From above', label: '', cls: 'tag-card' }),
        O('side', 4, 56, 24, 10, { kind: 'static', text: 'From the side', label: '', cls: 'tag-card' }),
        O('cake', 30, 20, 50, 50, { kind: 'static', art: 'h-cakecuts', artOpts: { v: s.v, h: s.h }, label: 'The cake: seen from above with ' + s.v + ' cut' + (s.v === 1 ? '' : 's') + ' across it; seen from the side, two layers with jam in the middle' + (s.h ? ', sliced through the jam' : '') }),
        O('jam', 76, 56, 20, 10, { kind: 'static', text: '← jam layer', label: '', cls: 'tag-card' }),
        O('table', 26, 70, 58, 8, { kind: 'static', art: 'table', label: '' }),
        O('cutv', 6, 84, 40, 12, { text: 'Cut from above', label: 'Make a straight cut from above, through the middle', cls: 'btn-card accent' }),
        O('cuth', 54, 84, 40, 12, { text: 'Cut from the side', label: 'Make a straight cut from the side, through the jam layer', cls: 'btn-card big' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target !== 'cutv' && a.target !== 'cuth') return false;
      if (a.target === 'cuth') {
        if (s.h) { api.nope('cuth'); api.say('It is already split through the jam. Cutting the same line twice just makes jam soup.', 'annoyed'); return true; }
        s.h = true;
        api.defy('side');
        api.say('From the SIDE? That is not how kings cut cake. …Every slice just became two slices. Stop that.', 'panicked');
      } else {
        s.v++;
        api.say(s.v === 1 ? 'Straight down the middle. Royal. Two halves.' : 'Another one from above. Glorious.', 'pleased');
      }
      if (s.v + (s.h ? 1 : 0) >= MAX) {
        if (pieces(s) === 8) {
          api.complete({ line: 'Eight slices. Three cuts. You went SIDEWAYS. Through the jam. And everybody gets cake. I am furious and full.', mood: 'defeated' });
        } else {
          api.fail('Three cuts, ' + pieces(s) + ' slices, eight guests. Two guests get crumbs and start a crumb war. The bakers make a new cake. Again!');
        }
      }
      return true;
    },

    solution: [{ tap: 'cutv' }, { tap: 'cutv' }, { tap: 'cuth' }],
    alternatives: { 'side-first': [{ tap: 'cuth' }, { tap: 'cutv' }, { tap: 'cutv' }] },
    checks: [
      { name: 'three cuts from above', steps: [{ tap: 'cutv' }, { tap: 'cutv' }, { tap: 'cutv' }], expect: 'fail' },
      { name: 'side cut twice', steps: [{ tap: 'cuth' }, { tap: 'cuth' }], expect: 'nope' },
      { name: 'one above + side leaves a cut', steps: [{ tap: 'cutv' }, { tap: 'cuth' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
