/* Level 65 — Bath Time
 * "Skip the plug, just turn the tap and the water stays." The plug lies beside the bath on its chain and
 * the drain is open: without it the water swirls straight away. Plug in, tap on, wait for the water to
 * reach the red line (the overflow keeps it there — waiting longer is fine), then launch the duck.
 * Wrong: tap on without the plug (nope, it all drains); the duck before the bath is full (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var STEP = 400;

  OBEY.registerLevel({
    id: 'bath-time',
    num: 65,
    title: 'Bath Time',
    objective: 'Fill the bath to the red line, then launch the duck.',
    intro: 'Run me a bath. Skip the plug — plugs are for people who don\'t believe in their bath. Turn the tap and the water just… stays. Mostly. Spiritually.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'wait'],
    par: 3,
    hints: [
      'Look at the bottom of the bath. Where does the water go?',
      'The drain is open. The plug on its chain fits it.',
      'Drag the plug into the bath, turn on the tap, wait for the water to reach the red line, then tap the duck.'
    ],
    wrong: ['Running the tap without the plug just drains away (nope).', 'Launching the duck before the bath is full gets you a sad, dry duck (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'A bath at exactly the line. The duck has never been happier.',
    trick: 'Bossworth said to skip the plug, but an open drain never fills — plug first, then patience.',

    init: function () { return { plug: false, on: false, level: 0 }; },

    onStart: function (s, api) {
      api.every(STEP, function () {
        if (!s.on || !s.plug || s.level >= 1) return;
        s.level = Math.min(1, Math.round((s.level + 0.1) * 10) / 10);
        if (s.level >= 1) api.say('It\'s reached the line and the overflow is gurgling. A bath! An actual bath! I\'ll allow it.', 'surprised');
      });
    },

    view: function (s) {
      var pct = Math.round(s.level * 100);
      return [
        O('taps', 22, 12, 30, 22, { art: 'b-taps', artOpts: { on: s.on }, label: 'Hot tap, ' + (s.on ? 'running (tap to turn off)' : 'off (tap to turn on)') }),
        O('duck', 72, 8, 22, 18, { art: 'b-duck', label: 'Rubber duck (tap to launch it into the bath)' }),
        O('tub', 4, 34, 62, 42, { art: 'b-bathtub', artOpts: { level: s.level * 0.667, plug: s.plug }, zone: true, free: true, label: 'Bathtub, ' + (s.plug ? 'plug in' : 'drain open') + ', water ' + pct + '% of the way to the red line' }),
        O('plug', 72, 50, 22, 22, { art: 'b-plug', drag: true, hidden: s.plug, label: 'Bath plug on its chain (drag it into the bath)' }),
        O('line', 4, 76, 62, 10, { kind: 'static', text: 'Red dashed line = perfect bath. Overflow hole stops it there.', label: '', cls: 'tag-card' }),
        O('meter', 70, 76, 26, 10, { kind: 'static', text: 'Water: ' + pct + '%', label: 'Water level ' + pct + ' percent', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'plug') {
        if (a.zone !== 'tub') return true;
        s.plug = true;
        api.say(s.on ? 'The plug? You don\'t trust the bath. The water\'s rising now, but you don\'t TRUST it.' : 'You plugged it. Plugging is admitting defeat. Fine. Tap on, then.', 'annoyed');
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'tub') { api.say('A bath. Mine. Currently empty, through no fault of my own.', 'neutral'); return true; }
      if (a.target === 'taps') {
        s.on = !s.on;
        if (s.on && !s.plug) { api.nope(); api.say('Glug-glug-gloop. The water swirls straight down the drain. It\'s… building up spiritually.', 'suspicious'); }
        else if (s.on) api.say('Water\'s rising! Don\'t watch it. Watched baths never fill. That\'s a different saying, but still.', 'neutral');
        else api.say('Tap off. Brave.', 'neutral');
        return true;
      }
      if (a.target === 'duck') {
        if (s.level >= 1) {
          api.defy('plug');
          api.complete({ line: 'Splash! The duck bobs at precisely the line. It needed a plug. I hate that it needed a plug. Hand me my towel.', mood: 'defeated' });
        } else {
          api.nope();
          api.say(s.level > 0 ? 'The duck refuses. "Not deep enough," it squeaks. Wait for the line.' : 'The duck lands with a dry clonk. It looks at you. You look at the duck. Nobody wins.', 'laughing');
        }
        return true;
      }
      return false;
    },

    solution: [{ drop: ['plug', 'tub'] }, { tap: 'taps' }, { wait: 4500 }, { tap: 'duck' }],
    checks: [
      { name: 'tap without plug', steps: [{ tap: 'taps' }], expect: 'nope' },
      { name: 'duck too early', steps: [{ tap: 'duck' }], expect: 'nope' },
      { name: 'waiting longer is fine', steps: [{ drop: ['plug', 'tub'] }, { tap: 'taps' }, { wait: 30000 }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
