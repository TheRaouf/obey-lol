/* Level 67 — Souper Microwave
 * "Pop the tin straight in, spoon and all — the sparkles are free seasoning." The microwave says NO METAL.
 * Prep chain: pour the tin into the mug, put the metal spoon in the cutlery drawer, mug into the
 * microwave, START. Wrong: microwaving the tin, the spoon, or a mug with the spoon in it (trap); START
 * with nothing inside, or heating an empty mug (nope); loading two things at once (nope).
 * Tapping the microwave takes out whatever is inside (free).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'souper-microwave',
    num: 67,
    title: 'Souper Microwave',
    objective: 'Heat the soup without setting off sparks.',
    intro: 'Lunch! Pop the tin of soup straight in the microwave — spoon and all. The sparkles are free seasoning. Every top chef says so. I am every top chef.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'read', 'sequence'],
    par: 4,
    hints: [
      'Read the sticker on the microwave. What are the tin and the spoon made of?',
      'Get the soup out of the tin and into the mug, and get the spoon out of the mug.',
      'Drag the tin onto the mug, the spoon into the cutlery drawer, the mug into the microwave, then press START.'
    ],
    wrong: ['Metal in the microwave — the tin, the spoon, or a mug with the spoon in it — makes sparks (trap).', 'START with nothing inside, or with an empty mug, does nothing useful (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Hot soup, no fireworks, one disappointed narrator.',
    trick: 'The NO METAL sticker beat Bossworth\'s "sparkles": pour the soup into the mug and lose the spoon first.',

    init: function () { return { inside: null, soup: false, tinEmpty: false, spoon: 'mug' }; },

    view: function (s) {
      var desc = { tin: 'the tin of soup', mug: 'the mug' + (s.soup ? ' of soup' : '') + (s.spoon === 'mug' ? ' (spoon still in it)' : ''), spoon: 'the metal spoon' }[s.inside] || 'nothing';
      return [
        O('micro', 4, 6, 52, 34, { art: 'b-microwave', zone: true, free: true, label: 'Microwave, containing ' + desc + (s.inside ? ' (tap to take it out)' : '') }),
        O('sticker', 4, 42, 52, 9, { kind: 'static', text: '⚠ NO METAL. EVER. Not even a little.', label: 'Sticker on the microwave: no metal, ever', cls: 'tag-card' }),
        O('start', 60, 6, 36, 12, { text: 'START', label: 'Start the microwave', cls: 'btn-card accent' }),
        O('inside', 60, 21, 36, 19, { kind: 'static', text: 'Inside: ' + desc, label: '', cls: 'speech-card' }),
        O('tin', 6, 60, 20, 28, { art: 'b-tin', artOpts: { empty: s.tinEmpty }, drag: true, hidden: s.inside === 'tin', label: s.tinEmpty ? 'Empty metal tin (drag it)' : 'Metal tin of tomato soup (drag it)' }),
        O('spoon', 43, 58, 10, 20, { art: 'b-spoon', artOpts: { down: true }, drag: true, hidden: s.spoon !== 'mug' || s.inside === 'mug', label: 'Metal spoon standing in the mug (drag it)' }),
        O('mug', 32, 78, 30, 20, { art: 'b-soupmug', artOpts: { soup: s.soup }, drag: true, zone: true, hidden: s.inside === 'mug', label: 'Microwave-safe mug' + (s.soup ? ' full of soup' : ', empty') + (s.spoon === 'mug' ? ', with a metal spoon in it' : '') + ' (drag it)' }),
        O('drawer', 68, 62, 28, 16, { art: 'drawer', artOpts: { n: '' }, zone: true, free: true, label: 'Cutlery drawer' + (s.spoon === 'drawer' ? ' (spoon inside)' : '') }),
        O('drawertag', 68, 80, 28, 9, { kind: 'static', text: 'Cutlery', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        var what = a.target;
        if (a.zone === 'micro') {
          if (s.inside) { api.nope(); api.say('One thing at a time. The microwave is small. Like your trust in me.', 'annoyed'); return true; }
          if (what === 'spoon' && s.spoon !== 'mug') return true;
          s.inside = what;
          if (what === 'spoon') s.spoon = 'micro';
          api.say(what === 'tin' ? 'Yes! The whole tin! Sparkle time!' : (what === 'mug' ? (s.spoon === 'mug' ? 'Spoon included! Lovely. A little lightning never hurt soup.' : 'In it goes. No spoon? No sparkles? Where\'s your sense of FUN?') : 'Just the spoon? Avant-garde. I like it.'), 'pleased');
          return true;
        }
        if (what === 'tin' && a.zone === 'mug') {
          if (s.tinEmpty) { api.nope(); api.say('The tin is empty. You can\'t pour air. Well, you can, but it\'s not lunch.', 'neutral'); return true; }
          s.tinEmpty = true; s.soup = true;
          api.say('You POURED it? Into a MUG? Like some kind of… sensible person?', 'annoyed');
          return true;
        }
        if (what === 'spoon' && a.zone === 'drawer') { s.spoon = 'drawer'; api.say('The spoon goes in the drawer. The spoon was going to be the best part!', 'annoyed'); return true; }
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'micro') {
        if (!s.inside) { api.say('An empty microwave. Fill it with the tin! The whole tin!', 'pleased'); return true; }
        if (s.inside === 'spoon') s.spoon = 'mug';
        s.inside = null;
        api.say('Taken back out. Second thoughts? Have FIRST thoughts. Mine.', 'neutral');
        return true;
      }
      if (a.target === 'start') {
        if (!s.inside) { api.nope(); api.say('Microwaving nothing. Ding. Hot nothing. Delicious.', 'laughing'); return true; }
        if (s.inside === 'tin' || s.inside === 'spoon' || (s.inside === 'mug' && s.spoon === 'mug')) {
          api.fail('BZZT-CRACKLE-ZAP! Lightning in the microwave! Bossworth applauds until the lights go out. Fuse replaced, lunch reset.');
          return true;
        }
        if (!s.soup) { api.nope(); api.say('A warm, empty mug. Lunch of champions. Champions of nothing.', 'laughing'); return true; }
        api.defy('sparkles');
        api.complete({ line: 'Ding! Steaming soup. No sparks at all. You\'ve made lunch boring and I\'ll never forgive you. Pass the bread.', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ drop: ['tin', 'mug'] }, { drop: ['spoon', 'drawer'] }, { drop: ['mug', 'micro'] }, { tap: 'start' }],
    checks: [
      { name: 'tin in the microwave', steps: [{ drop: ['tin', 'micro'] }, { tap: 'start' }], expect: 'fail' },
      { name: 'spoon left in the mug', steps: [{ drop: ['tin', 'mug'] }, { drop: ['mug', 'micro'] }, { tap: 'start' }], expect: 'fail' },
      { name: 'start empty', steps: [{ tap: 'start' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
