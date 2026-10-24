/* Level 202 — Weigh Anchor (Mackerel Market)
 * A trawler skipper shouts three orders in sailor talk. Bossworth "translates" each one literally
 * (weigh it on the scales, go faster, swap the deck). The glossary on the harbour wall has the real
 * meanings: weigh anchor = pull it up, make fast = tie it tight, swab = mop.
 * Wrong: Bossworth's literal translation (trap), the other wrong option (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ROUNDS = [
    { order: 'WEIGH ANCHOR!', opts: ['Weigh it', 'Pull it up', 'Drop it'], right: 1, boss: 0,
      say: 'Weigh anchor! Easy: carry it to the fish scales and tell him how heavy it is. Sailors love numbers.',
      trap: 'You try to put a 200 kg anchor on a fish scale. The scale is now a pancake. The skipper is now purple.',
      meh: 'You drop the anchor. It was already down. Now it is MORE down.' },
    { order: 'MAKE FAST!', opts: ['Tie it tight', 'Go faster', 'Skip lunch'], right: 0, boss: 1,
      say: 'Make fast! He wants speed! Push the boat! Run along the quay! Faster!',
      trap: 'You push the trawler as fast as you can. It drifts off without its rope. The skipper swims after it.',
      meh: 'You announce you are fasting. Nobody asked. The rope is still untied.' },
    { order: 'SWAB THE DECK!', opts: ['Paint it', 'Swap decks', 'Mop it'], right: 2, boss: 1,
      say: 'Swab the deck: he\'s mispronounced "swap". Swap this deck with another deck. Any deck. Go!',
      trap: 'You try to swap the deck with the deck of the boat next door. Both skippers chase you round the market.',
      meh: 'You paint the deck. It is now wet AND pink. The skipper wanted it clean.' }
  ];

  OBEY.registerLevel({
    id: 'weigh-anchor',
    num: 202,
    title: 'Weigh Anchor',
    objective: 'Carry out the skipper\'s three orders.',
    intro: 'The skipper speaks sailor. I\'m fluent! I\'ll translate, you obey. First order: WEIGH ANCHOR. Carry it to the fish scales and weigh it!',
    introMood: 'neutral',
    actions: ['tap', 'read'],
    par: 3,
    hints: [
      'There is a glossary on the harbour wall. Bossworth hasn\'t read it.',
      'Sailor talk doesn\'t mean what it sounds like. Look each order up.',
      'Pull it up, then Tie it tight, then Mop it.'
    ],
    wrong: ['Bossworth\'s literal translation of each order goes badly (trap).', 'The other wrong option does nothing useful (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Anchor up, rope tight, deck mopped. The skipper says I\'m a "landlubber". I\'m taking it as a title.',
    trick: 'Sailor talk isn\'t literal: the glossary said "weigh anchor" means pull it up, "make fast" means tie it, and "swab" means mop.',

    init: function () { return { round: 0 }; },

    view: function (s) {
      var r = ROUNDS[Math.min(s.round, 2)];
      var out = [
        O('glossary', 4, 3, 50, 34, { kind: 'static', text: 'SAILOR TALK\nWeigh anchor: pull it up\nMake fast: tie it tight\nSwab: mop', label: 'Sailor talk glossary: weigh anchor means pull the anchor up. Make fast means tie it tight. Swab means mop.', cls: 'honest-card' }),
        O('surface', 0, 47, 100, 10, { kind: 'static', art: 'i-surface', label: '' }),
        O('sea', 0, 55, 100, 45, { kind: 'static', art: 'i-sea', artOpts: { nobed: true } }),
        O('trawler', 2, 38, 52, 34, { kind: 'static', art: 'i-trawler', label: 'The skipper\'s trawler' }),
        O('anchor', 20, 67, 9, 12, { kind: 'static', art: 'i-anchor', label: 'The anchor, down in the water', hidden: s.round > 0 }),
        O('order', 58, 3, 38, 14, { kind: 'static', text: r.order, label: 'The skipper shouts: ' + r.order, cls: 'speech-card' }),
        O('count', 58, 20, 38, 9, { kind: 'static', text: 'Order ' + (Math.min(s.round, 2) + 1) + ' of 3', label: '', cls: 'tag-card' })
      ];
      r.opts.forEach(function (t, i) {
        out.push(O('opt' + i, 4 + i * 31, 80, 29, 14, { text: t, label: 'Do this: ' + t, cls: 'btn-card big' + (i === r.boss ? ' accent' : '') }));
      });
      return out;
    },

    on: function (a, s, api) {
      var m = a.type === 'tap' && /^opt([0-2])$/.exec(a.target);
      if (!m) return false;
      var r = ROUNDS[s.round], i = Number(m[1]);
      if (i === r.boss) { api.fail(r.trap + ' Check the glossary!'); return true; }
      if (i !== r.right) { api.nope(); api.say(r.meh, 'annoyed'); return true; }
      api.defy('translate-' + s.round);
      s.round++;
      if (s.round === 3) api.complete({ line: 'Every order done right. You read the glossary. I wrote that glossary! …Somebody wrote it. I was nearby.', mood: 'defeated' });
      else api.say(ROUNDS[s.round].say, s.round === 1 ? 'suspicious' : 'pleased');
      return true;
    },

    solution: [{ tap: 'opt1' }, { tap: 'opt0' }, { tap: 'opt2' }],
    checks: [
      { name: 'weighing the anchor is a trap', steps: [{ tap: 'opt0' }], expect: 'fail' },
      { name: 'dropping the anchor is a nope', steps: [{ tap: 'opt2' }], expect: 'nope' },
      { name: 'going faster is a trap', steps: [{ tap: 'opt1' }, { tap: 'opt1' }], expect: 'fail' },
      { name: 'swapping decks is a trap', steps: [{ tap: 'opt1' }, { tap: 'opt0' }, { tap: 'opt1' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
