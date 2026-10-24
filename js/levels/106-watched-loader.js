/* Level 106 — The Watched Loader
 * A "Schrödinger Loader" only makes progress while nobody is watching. Bossworth says to stare.
 * Switch the monitor OFF, wait a few seconds (it loads 25% a second, unobserved), switch it back
 * ON, then press Continue. Waiting longer is harmless: it simply sits at 100%.
 * Wrong: Refresh resets the bar (nope), poking the bar counts as observing (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var START = 12, STEP = 25, TICK = 1000;

  OBEY.registerLevel({
    id: 'watched-loader',
    num: 106,
    title: 'The Watched Loader',
    objective: 'Let the door software finish loading.',
    intro: 'It\'s loading. Stare at the bar. Don\'t blink. Staring makes computers go faster. It\'s called "supervision". I supervise things constantly.',
    introMood: 'neutral',
    actions: ['tap', 'wait'],
    par: 3,
    hints: [
      'Read the small print under the monitor. What stops this loader?',
      'It only loads while nobody is watching. Can you stop watching?',
      'Switch the monitor off, wait about five seconds, switch it on, then press Continue.'
    ],
    wrong: ['Refresh starts the bar again (nope).', 'Poking the bar counts as watching it (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Loaded, unobserved. Like all my best work.',
    trick: 'The loader only progressed while unobserved, so switching the monitor off let it finish.',

    init: function () { return { pct: START, on: true }; },

    onStart: function (s, api) {
      api.every(TICK, function () {
        if (s.on || s.pct >= 100) return;
        s.pct = Math.min(100, s.pct + STEP);
      });
    },

    view: function (s) {
      var done = s.pct >= 100;
      return [
        O('monitor', 4, 4, 60, 56, { kind: 'static', art: 'd-monitor', artOpts: { mode: s.on ? 'desktop' : 'off' }, label: s.on ? 'Monitor, on' : 'Monitor, switched off' }),
        O('bar', 12, 14, 44, 13, { text: done ? 'Loaded 100%' : 'Loading… ' + s.pct + '%', label: 'Progress bar: ' + s.pct + ' percent', cls: 'display-card' + (done ? ' ready' : ''), hidden: !s.on }),
        O('go', 16, 32, 36, 12, { text: 'Continue', label: 'Continue to the door controls', cls: 'btn-card accent', hidden: !s.on || !done }),
        O('power', 68, 6, 28, 14, { text: s.on ? 'Monitor: ON' : 'Monitor: OFF', label: 'Monitor switch, currently ' + (s.on ? 'on' : 'off'), cls: 'btn-card' + (s.on ? '' : ' ghost') }),
        O('refresh', 68, 24, 28, 14, { text: 'Refresh', label: 'Refresh the loader', cls: 'btn-card' }),
        O('hero', 76, 42, 14, 20, { kind: 'static', art: 'hero', label: 'You, watching the screen' }),
        O('print', 4, 64, 92, 16, { kind: 'static', text: 'Schrödinger Loader v2: progress only happens while nobody is observing it.', label: 'Small print: Schrödinger Loader version 2, progress only happens while nobody is observing it.', cls: 'tag-card' }),
        O('stare', 4, 84, 92, 12, { kind: 'static', text: s.on ? 'You are staring at the screen.' : 'Nobody is looking. Something is happening…', label: '', cls: 'fine-print' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'power':
          s.on = !s.on;
          if (!s.on) { api.defy('stare'); api.say('You switched it OFF? How can it load if nobody\'s SUPERVISING it?', 'panicked'); }
          else api.say(s.pct >= 100 ? '100%?! While I wasn\'t looking? That\'s… that\'s rude.' : 'Look, it barely moved. Probably. I wasn\'t looking either.', 'surprised');
          return true;
        case 'refresh':
          s.pct = START;
          api.nope();
          api.say('Refreshed! Back to ' + START + '%. Fresh as a daisy. A slow daisy.', 'pleased');
          return true;
        case 'bar':
          api.nope();
          api.say('Poking it counts as observing. It froze in fright. Like me at parties.', 'pleased');
          return true;
        case 'go':
          if (s.pct < 100 || !s.on) return false;
          api.complete({ line: 'Loaded. Not because I supervised, but because I DIDN\'T. That\'s… that\'s my management style ruined.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'power' }, { wait: 4200 }, { tap: 'power' }, { tap: 'go' }],
    alternatives: { 'patient-and-blind': [{ tap: 'power' }, { wait: 20000 }, { tap: 'power' }, { tap: 'go' }] },
    checks: [
      { name: 'refresh is a nope', steps: [{ tap: 'refresh' }], expect: 'nope' },
      { name: 'poking the bar is a nope', steps: [{ tap: 'bar' }], expect: 'nope' },
      { name: 'staring achieves nothing', steps: [{ wait: 20000 }, { tap: 'go' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
