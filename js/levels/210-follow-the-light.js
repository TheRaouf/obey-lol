/* Level 210 — Follow the Light (Shipwreck Shoals)
 * The deep. Three lights. The pilot's note: our hatch beacon blinks and never moves.
 * A glows steadily and bobs about (an anglerfish's lure). B blinks and stays put (the beacon).
 * C blinks but drifts (a jellyfish). Bossworth wants the friendly light coming over: A.
 * Wrong: A (trap: gulp), C (nope: it drifts away).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TICK = 600, BOB = [0, 7, 14, 7], DRIFT = [0, 6, 12, 6];

  function lights(t) {
    return {
      A: { x: 8, y: 30 + BOB[t % 4], on: true },
      B: { x: 42, y: 40, on: t % 4 < 2 },
      C: { x: 66 + DRIFT[t % 4], y: 34, on: t % 3 === 0 }
    };
  }

  OBEY.registerLevel({
    id: 'follow-the-light',
    num: 210,
    title: 'Follow the Light',
    objective: 'Swim to the hatch beacon.',
    intro: 'Pitch black down here. But look, a friendly light is swimming over to say hello! That big one, light A. Follow it! Lights are always friendly.',
    introMood: 'surprised',
    actions: ['wait', 'observe', 'tap'],
    par: 1,
    hints: [
      'Read the pilot\'s note, then watch each light for a few seconds.',
      'The beacon has to do two things: blink, and stay perfectly still.',
      'A never blinks and bobs about. C blinks but drifts. Swim to B.'
    ],
    wrong: ['Light A is an anglerfish\'s lure (trap).', 'Light C is a drifting jellyfish (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'The hatch beacon, right where it always is. Boring. Reliable. Like a good narrator.',
    trick: 'A beacon is bolted down, so the only light that both blinked and never moved was the hatch; the bobbing one was a lure.',

    init: function () { return { t: 0 }; },

    onStart: function (s, api) { api.every(TICK, function () { s.t++; }); },

    view: function (s) {
      var L = lights(s.t);
      var out = [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-deep', cls: 'backdrop' }),
        O('note', 4, 3, 60, 18, { kind: 'static', text: 'PILOT\'S NOTE: our hatch beacon BLINKS and NEVER MOVES.', label: 'Pilot\'s note: our hatch beacon blinks and never moves.', cls: 'honest-card' })
      ];
      ['A', 'B', 'C'].forEach(function (k) {
        var l = L[k];
        var desc = { A: 'glowing steadily, bobbing up and down', B: l.on ? 'on, staying still' : 'off, staying still', C: (l.on ? 'on' : 'off') + ', drifting sideways' }[k];
        out.push(O('light' + k, l.x, l.y, 18, 18, { kind: 'static', art: 'i-glow', artOpts: { on: l.on }, label: 'Light ' + k + ': ' + desc }));
        out.push(O('tag' + k, l.x + 4, l.y + 19, 10, 8, { kind: 'static', text: k, label: '', cls: 'tag-card' }));
      });
      out.push(O('sub', 40, 68, 20, 13, { kind: 'static', art: 'i-sub', label: 'Your submarine' }));
      out.push(O('goA', 4, 82, 29, 13, { text: 'Swim to A', label: 'Swim to light A', cls: 'btn-card big accent' }));
      out.push(O('goB', 35.5, 82, 29, 13, { text: 'Swim to B', label: 'Swim to light B', cls: 'btn-card big' }));
      out.push(O('goC', 67, 82, 29, 13, { text: 'Swim to C', label: 'Swim to light C', cls: 'btn-card big' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'goA':
          api.fail('You follow the friendly light… right up to a very large mouth. The light was on a stalk. The stalk was on an anglerfish. PTOO. It spat you back out. Too yellow.');
          return true;
        case 'goC':
          api.nope();
          api.say('You chase light C. It\'s a glowing jellyfish, and it drifts away, blinking rudely.', 'annoyed');
          return true;
        case 'goB':
          api.defy('friendly');
          api.complete({ line: 'Light B: blinking, bolted down, and sitting right on our hatch. The friendly one had teeth. I was testing your teeth awareness.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ wait: 3000 }, { tap: 'goB' }],
    checks: [
      { name: 'the friendly light is a trap', steps: [{ tap: 'goA' }], expect: 'fail' },
      { name: 'the jellyfish is a nope', steps: [{ wait: 1200 }, { tap: 'goC' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
