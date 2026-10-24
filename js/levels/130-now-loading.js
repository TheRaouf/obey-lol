/* Level 130 — Now Loading (Pixel Palace)
 * A fake loading screen stuck at 37%. The progress bar is powered by Gerald, a hamster on a wheel,
 * who is asleep. Rotating tips: one says Gerald runs on sunflower seeds and the bag is on the floor.
 * Drag the seeds to Gerald, wait for 100%, press START. Skip: trap. Poking Gerald: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TIPS = [
    'TIP: Tapping the hamster makes loading faster. (It does not.)',
    'TIP: Bossworth is the best narrator. (Paid tip.)',
    'TIP: Gerald runs on sunflower seeds. The bag is on the floor.',
    'TIP: If loading takes forever, that\'s a feature.'
  ];
  var TIP_MS = 3000, START = 37;

  OBEY.registerLevel({
    id: 'now-loading',
    num: 130,
    title: 'Now Loading',
    objective: 'Finish loading the next level.',
    intro: 'Hold on, the next level is loading. It takes as long as it takes. Do NOT wake Gerald. Gerald is the loading screen\'s engine. He\'s on his break. Forever.',
    introMood: 'neutral',
    actions: ['wait', 'read', 'drag', 'tap'],
    par: 2,
    hints: [
      'Read the loading tips as they change. One of them is honest.',
      'Gerald runs on sunflower seeds, and the bag is on the floor.',
      'Drag the seed bag onto Gerald\'s wheel, wait for 100%, then press START.'
    ],
    wrong: ['Pressing Skip restarts the loading screen (trap).', 'Poking Gerald just makes him roll over (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Loaded. Gerald would like a pay rise.',
    trick: 'The loading bar was hamster-powered, and the honest tip said exactly what fuels the hamster.',

    init: function () { return { tip: 0, pct: START, fed: false, ready: false }; },

    onStart: function (s, api) {
      api.every(TIP_MS, function () { s.tip = (s.tip + 1) % TIPS.length; });
    },

    view: function (s) {
      var out = [
        O('title', 4, 4, 92, 11, { kind: 'static', text: s.ready ? 'NEXT LEVEL: LOADED!' : 'NOW LOADING NEXT LEVEL…', label: '', cls: 'display-card' + (s.ready ? ' ready' : '') }),
        O('barBg', 4, 18, 78, 8, { kind: 'static', label: '', cls: 'keypad-bg' }),
        O('barFill', 4, 18, Math.max(4, Math.round(78 * s.pct / 100)), 8, { kind: 'static', label: '', cls: 'hold-btn done' }),
        O('pct', 84, 18, 12, 8, { kind: 'static', text: s.pct + '%', label: 'Loading: ' + s.pct + ' percent', cls: 'tag-card' }),
        O('gerald', 30, 30, 38, 38, { art: 'e-hamster', artOpts: { running: s.fed }, label: s.fed ? 'Gerald the hamster, sprinting in his wheel' : 'Gerald the hamster, asleep in his wheel (it powers the loading bar)', zone: true }),
        O('tagG', 28, 67.5, 42, 8.5, { kind: 'static', text: 'Loading engine: Gerald', label: '', cls: 'tag-card' }),
        O('tip', 4, 76, 62, 20, { kind: 'static', text: TIPS[s.tip], label: TIPS[s.tip], cls: 'speech-card' })
      ];
      if (!s.fed) out.push(O('seeds', 76, 32, 18, 22, { art: 'e-seeds', label: 'Bag of sunflower seeds (drag it)', drag: true }));
      if (s.ready) out.push(O('start', 70, 78, 26, 16, { text: 'START', label: 'Start the next level', cls: 'btn-card big' }));
      else out.push(O('skip', 70, 78, 26, 16, { text: 'Skip ▸▸', label: 'Skip loading', cls: 'btn-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'seeds') {
        if (a.zone !== 'gerald') { api.say('You put the seeds down. Gerald sniffs in his sleep. So close.', 'neutral'); return true; }
        s.fed = true;
        api.defy('gerald');
        api.say('You WOKE GERALD? With SEEDS? He\'s… he\'s sprinting. The bar is moving. This is a breach of Gerald\'s break.', 'panicked');
        var t = api.every(500, function () {
          s.pct = Math.min(100, s.pct + 21);
          if (s.pct >= 100) { api.cancel(t); s.ready = true; api.say('100%. Loaded. Gerald is doing a victory lap. Don\'t press START. Pressing START starts things.', 'annoyed'); }
        });
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'gerald':
          if (s.fed) { api.say('Gerald is busy. Gerald is, for once, working.', 'neutral'); return true; }
          api.nope('gerald');
          api.say('You poked Gerald. He rolls over. Snores louder. The bar stays at ' + s.pct + '%. Told you.', 'pleased');
          return true;
        case 'skip':
          api.fail('Skip! …Skipping straight back to the start of the loading screen. Loading screens can\'t be skipped. That\'s the law. My law.');
          return true;
        case 'seeds':
          api.say('Seeds. For… nobody. Put them down. Don\'t drag them anywhere near Gerald.', 'suspicious');
          return true;
        case 'start':
          api.complete({ line: 'Level loaded and STARTED. On a hamster\'s schedule, not mine. Gerald gets employee of the month. I get nothing.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ drop: ['seeds', 'gerald'] }, { wait: 2000 }, { tap: 'start' }],
    checks: [
      { name: 'skip the loading', steps: [{ tap: 'skip' }], expect: 'fail' },
      { name: 'poke Gerald', steps: [{ tap: 'gerald' }], expect: 'nope' },
      { name: 'just wait forever', steps: [{ wait: 30000 }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
