/* Level 193 — Sonar Silence (Periscope Pier)
 * Murky water, zero visibility. Ping left, ahead and right: a solid thing sends back a PONG after a
 * moment; open water sends back nothing. Bossworth says to steer for the loudest echo. The honest
 * card says a PONG means something solid. Open water is on the right.
 * Wrong: steering at a PONG (trap: bonk), the periscope (nope: murk).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DIRS = ['left', 'ahead', 'right'];
  var SOLID = { left: true, ahead: true, right: false };
  var PONG_MS = 1200, QUIET_MS = 2600;
  var NAME = { left: 'Left', ahead: 'Ahead', right: 'Right' };

  OBEY.registerLevel({
    id: 'sonar-silence',
    num: 193,
    title: 'Sonar Silence',
    objective: 'Steer the submarine out of the murk.',
    intro: 'Captain Bossworth here, of the very small submarine. Can\'t see a thing. Ping the sonar and steer for the LOUDEST echo. Loud means friendly!',
    introMood: 'pleased',
    actions: ['tap', 'wait', 'observe'],
    par: 4,
    hints: [
      'An echo has to bounce off something.',
      'The card says a PONG means something solid is there. What would open water send back?',
      'Ping all three ways. Steer towards the one that sends back no echo at all (right).'
    ],
    wrong: ['Steering towards a PONG drives you into a rock (trap).', 'The periscope only shows murk (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Out of the murk. By listening to nothing. Very zen. Very annoying.',
    trick: 'An echo needs something solid to bounce off, so the direction that stayed silent was the open water.',

    init: function () { return { echo: { left: null, ahead: null, right: null } }; },

    view: function (s) {
      var e = {};
      DIRS.forEach(function (d) { e[d] = s.echo[d] === 'pong' ? 'pong' : (s.echo[d] === 'none' ? 'none' : undefined); });
      function read(d) { var v = s.echo[d]; return v === 'pong' ? 'PONG!' : (v === 'none' ? 'no echo' : (v === 'wait' ? 'listening…' : '—')); }
      var out = [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-deep', cls: 'backdrop' }),
        O('card', 4, 4, 28, 30, { kind: 'static', text: 'SONAR GUIDE\nPONG = something solid is there', label: 'Sonar guide: a PONG means something solid is there', cls: 'honest-card' }),
        O('scope', 36, 4, 36, 36, { kind: 'static', art: 'i-sonar', artOpts: { echo: e }, label: 'Sonar screen' }),
        O('periscope', 80, 0, 14, 38, { art: 'i-periscope', label: 'Periscope' }),
        O('log', 4, 44, 92, 12, { kind: 'static', text: 'Left: ' + read('left') + '   Ahead: ' + read('ahead') + '   Right: ' + read('right'), label: 'Echo log. Left: ' + read('left') + '. Ahead: ' + read('ahead') + '. Right: ' + read('right') + '.', cls: 'display-card' })
      ];
      DIRS.forEach(function (d, i) {
        out.push(O('ping-' + d, 4 + i * 32, 60, 28, 12, { text: 'Ping ' + d, label: 'Ping the sonar ' + d, cls: 'btn-card' }));
        out.push(O('go-' + d, 4 + i * 32, 80, 28, 13, { text: d === 'ahead' ? 'Full ahead' : 'Steer ' + d, label: d === 'ahead' ? 'Full speed ahead' : 'Steer ' + d, cls: 'btn-card big' + (d === 'ahead' ? ' accent' : '') }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^(ping|go)-(left|ahead|right)$/.exec(a.target);
      if (a.target === 'periscope') {
        api.nope();
        api.say('Up periscope! …Murk. Lovely murk. Down periscope.', 'neutral');
        return true;
      }
      if (!m) return false;
      var d = m[2];
      if (m[1] === 'ping') {
        if (s.echo[d] === 'wait') return true;
        s.echo[d] = 'wait';
        api.say('PING! …Listening…', 'neutral');
        api.after(SOLID[d] ? PONG_MS : QUIET_MS, function () {
          s.echo[d] = SOLID[d] ? 'pong' : 'none';
          if (SOLID[d]) api.say('PONG! A big, loud, friendly echo from the ' + d + '! Go that way!', 'pleased');
          else api.say('Nothing came back from the ' + d + '. Rude. Unfriendly. Ignore it.', 'annoyed');
        });
        return true;
      }
      if (SOLID[d]) {
        api.fail('BONK! The "friendly" echo was a rock. Echoes come from solid things. The submarine is now slightly shorter.');
        return true;
      }
      api.defy('loudest');
      api.complete({ line: 'Open water! Through the gap and into the harbour. I was going to say that. Eventually.', mood: 'defeated' });
      return true;
    },

    solution: [{ tap: 'ping-left' }, { tap: 'ping-ahead' }, { tap: 'ping-right' }, { wait: 3000 }, { tap: 'go-right' }],
    checks: [
      { name: 'steering ahead hits a rock', steps: [{ tap: 'ping-ahead' }, { wait: 1500 }, { tap: 'go-ahead' }], expect: 'fail' },
      { name: 'steering left hits a rock', steps: [{ tap: 'go-left' }], expect: 'fail' },
      { name: 'the periscope is a nope', steps: [{ tap: 'periscope' }], expect: 'nope' },
      { name: 'pinging alone does not finish', steps: [{ tap: 'ping-right' }, { wait: 3000 }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
