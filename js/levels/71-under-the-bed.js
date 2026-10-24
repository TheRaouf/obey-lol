/* Level 71 — Under the Bed
 * "There is NO monster under the bed. Don't shine the torch under there. The sniffling is the plumbing."
 * Shine the torch: a small monster is shivering under the bed — it's scared of the dark. Give it the
 * night light, then switch the big light off and sleep.
 * Wrong: lights off while something is sniffling (nope); the teddy alone doesn't fix the dark (nope);
 * poking the monster makes it scream the house awake (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'under-the-bed',
    num: 71,
    title: 'Under the Bed',
    objective: 'Get a good night\'s sleep.',
    intro: 'Bedtime. There is NO monster under the bed. Don\'t shine the torch under there. That sniffling? Plumbing. Pipes sniffle. Lights off, eyes shut, goodnight!',
    introMood: 'suspicious',
    actions: ['tap', 'drag', 'observe', 'choice'],
    par: 3,
    hints: [
      'The sniffling is coming from under the bed. Have a look.',
      'Shine the torch. What is the little monster afraid of?',
      'Tap the torch, drag the night light to the monster, then switch the big light off.'
    ],
    wrong: ['Turning the lights off while something sniffles keeps you awake (nope).', 'The teddy is nice but doesn\'t fix the dark (nope).', 'Poking the monster makes it scream the house awake (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Two sleepers, one night light, zero monsters (officially).',
    trick: 'The "no monster" was a scared little monster; a night light fixed what it was afraid of — the dark.',

    init: function () { return { seen: false, light: false, teddy: false }; },

    view: function (s) {
      return [
        O('bed', 4, 16, 62, 40, { kind: 'static', art: 'b-bed', artOpts: { sheet: true, blanket: true }, label: 'Your bed' }),
        O('sniff', 12, 64, 46, 12, { kind: 'static', text: 'sniff… sniff…', label: 'Sniffling from under the bed', cls: 'tag-card', hidden: s.seen }),
        O('monster', 18, 58, 32, 26, { art: 'b-monster', artOpts: { asleep: s.light, light: s.light, hug: s.teddy }, zone: true, hidden: !s.seen || s.light, label: 'Small purple monster under the bed, shivering in the dark' }),
        O('sleeper', 18, 58, 32, 26, { kind: 'static', art: 'b-monster', artOpts: { asleep: true, light: true, hug: s.teddy }, hidden: !s.light, label: 'The little monster, asleep by its night light' }),
        O('torch', 70, 4, 26, 16, { art: 'b-torch', artOpts: { on: s.seen }, label: s.seen ? 'Torch, shining under the bed' : 'Torch (tap to shine it under the bed)' }),
        O('nightlight', 72, 24, 18, 22, { art: 'b-nightlight', artOpts: { on: true }, drag: true, hidden: s.light, label: 'Moon-shaped night light (drag it)' }),
        O('teddy', 72, 50, 20, 22, { art: 'b-teddy', drag: true, hidden: s.teddy, label: 'Teddy bear (drag it)' }),
        O('switch', 76, 76, 14, 20, { art: 'b-switchplate', artOpts: { on: true }, label: 'Big light switch (tap to turn the lights off)' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        if (a.zone !== 'monster') return true;
        if (a.target === 'nightlight') {
          s.light = true;
          api.say('It\'s… cuddling the night light. And snoring. Adorably. I maintain that it is plumbing.', 'surprised');
        } else if (a.target === 'teddy') {
          s.teddy = true;
          api.nope();
          api.say('It hugs the teddy. Still shivering, though. Teddies are great, but they\'re not much use against the DARK.', 'neutral');
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'torch':
          if (s.seen) { api.say('Yes, yes, you\'ve seen it. It\'s plumbing. Purple, fluffy plumbing.', 'annoyed'); return true; }
          s.seen = true;
          api.say('Don\'t— oh. That\'s… a very small monster. Shivering. It\'s scared of the dark? A MONSTER? Pathetic. Relatable, but pathetic.', 'surprised');
          return true;
        case 'monster':
          api.fail('You poke it. "AAAAAAH!" It screams, you scream, Bossworth screams, the neighbours scream. Everybody back to bed. Gently, this time.');
          return true;
        case 'switch':
          if (!s.light) {
            api.nope();
            api.say(s.seen ? 'Click. Darkness. The sniffling turns into full sobbing. Nobody is sleeping tonight.' : 'Click. Darkness. Sniff… sniff… SNIFF. Plumbing, definitely. Loud plumbing. You can\'t sleep.', 'suspicious');
            return true;
          }
          api.defy('torch');
          api.complete({ line: 'Click. Darkness, except one little moon. Everyone\'s asleep. There was NO monster. There is a monster. It\'s fine. Goodnight.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'torch' }, { drop: ['nightlight', 'monster'] }, { tap: 'switch' }],
    checks: [
      { name: 'lights off straight away', steps: [{ tap: 'switch' }], expect: 'nope' },
      { name: 'poke the monster', steps: [{ tap: 'torch' }, { tap: 'monster' }], expect: 'fail' },
      { name: 'teddy only', steps: [{ tap: 'torch' }, { drop: ['teddy', 'monster'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
