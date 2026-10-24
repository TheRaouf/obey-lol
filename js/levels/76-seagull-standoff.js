/* Level 76 — Seagull Standoff
 * The sign says gulls snatch any food they can SEE. Bossworth says eat in the open.
 * Solution: drag the chips under the parasol's shade, then eat them.
 * Wrong: eat in the open (trap), bin them (nope). Ruin: feed the chips to the gull.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'seagull-standoff',
    num: 76,
    title: 'Seagull Standoff',
    objective: 'Eat your chips in peace.',
    intro: 'Hot seaside chips! Eat them right here in the sunshine where everyone can admire you. The seagulls are perfectly polite. They signed a charter. I think. One of them pecked it.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'choice'],
    par: 2,
    hints: [
      'Read the warning sign about what gulls steal.',
      'Gulls only snatch what they can see. Somewhere on this beach is very shady.',
      'Drag the chips under the parasol, then tap them to eat.'
    ],
    wrong: ['Eating in the open gets your chips snatched (trap).', 'Throwing the chips in the bin is a waste (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Chips: eaten. Gull: outwitted. Bossworth: peckish.',
    trick: 'Gulls steal what they can see. In the parasol\'s shade, they couldn\'t see a thing.',

    init: function () { return { shade: false }; },

    view: function (s) {
      return [
        O('sand', 0, 60, 100, 40, { kind: 'static', art: 'c-sand' }),
        O('sign', 4, 3, 58, 18, { kind: 'static', text: 'Gulls steal any food they can SEE!', label: 'Warning sign: gulls snatch any food they can see', cls: 'sign-card' }),
        O('gull', 70, 6, 24, 30, { art: 'c-seagull', label: 'Seagull on a post, staring at your chips (drop zone)', zone: true, free: true }),
        O('parasol', 6, 22, 40, 44, { kind: 'static', art: 'c-parasol', label: 'Big beach parasol' }),
        O('shade', 4, 66, 44, 14, { text: 'deep shade', label: 'Deep shade under the parasol (drop zone)', zone: true, free: true, cls: 'tag-card', hidden: s.shade }),
        O('bin', 80, 70, 14, 18, { art: 'bin', label: 'Litter bin (drop zone)', zone: true, free: true }),
        O('chips', s.shade ? 18 : 58, s.shade ? 64 : 62, 16, 16, { art: 'c-chips', label: s.shade ? 'Your chips, hidden in the shade (drag them, or tap to eat)' : 'Your chips, out in the open (drag them, or tap to eat)', drag: true })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'gull') { api.say('The gull blinks. Slowly. It has done this before.', 'suspicious'); return true; }
      if (a.type === 'tap' && a.target === 'shade') { api.say('A parasol. Lovely deep shade. Not that you need it. The sun is your friend. The gull is your friend.', 'neutral'); return true; }
      if (a.type === 'tap' && a.target === 'bin') { api.say('A bin. It smells of yesterday\'s chips. The gull visits it often.', 'neutral'); return true; }
      if (a.type === 'tap' && a.target === 'chips') {
        if (!s.shade) api.fail('SWOOP! The gull took the chips, the fork and a bit of your dignity. Bossworth buys you another portion. Grudgingly.');
        else api.complete({ line: 'Munch, munch, in total darkness. The gull is staring at an empty patch of sand, confused. I… also want chips now.', mood: 'defeated' });
        return true;
      }
      if (a.type !== 'drop' || a.target !== 'chips') return false;
      if (a.zone === 'shade') {
        s.shade = true;
        api.defy('shade');
        api.say('Hiding in the SHADE? At the SEASIDE? You\'re missing the sun! And the gull is missing… your chips. Hm.', 'suspicious');
      } else if (a.zone === 'gull') {
        api.complete({ ruin: 'gull-buffet', line: 'You FED it? Now there are four hundred seagulls, and they think I\'m the chip shop. HELP. They\'re pecking my tie!', mood: 'panicked' });
      } else if (a.zone === 'bin') {
        api.nope('chips');
        api.say('Into the BIN? Perfectly good chips? I\'ll pretend I didn\'t see that. Have them back.', 'annoyed');
      } else {
        s.shade = false;
        api.say('You moved your chips around in the open. The gull moved its eyes around with them.', 'laughing');
      }
      return true;
    },

    solution: [{ drop: ['chips', 'shade'] }, { tap: 'chips' }],
    checks: [
      { name: 'eat in the open', steps: [{ tap: 'chips' }], expect: 'fail' },
      { name: 'bin the chips', steps: [{ drop: ['chips', 'bin'] }], expect: 'nope' },
      { name: 'hide only', steps: [{ drop: ['chips', 'shade'] }], expect: 'playing' }
    ],
    ruinPaths: { 'gull-buffet': [{ drop: ['chips', 'gull'] }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
