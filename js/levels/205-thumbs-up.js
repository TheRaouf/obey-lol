/* Level 205 — Thumbs Up (Coral Caverns)
 * Reef dive. The slate lists diver hand signals: thumb up = GO UP, ring = I'm OK, flat hand = STOP.
 * 1) The buddy asks "OK?" with a ring. Bossworth: give a big thumbs up. Answer: the OK ring.
 * 2) The buddy holds up a flat hand (a jellyfish drifts between you). Bossworth: swim over for a high
 *    five. Answer: stay put; the jellyfish drifts past and the dive carries on.
 * Wrong: thumbs up (trap: dive over), swimming over (trap: sting), flat hand in round 1 (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var R = [
    { opts: ['Thumbs up', 'OK ring', 'Flat hand'], right: 1, boss: 0 },
    { opts: ['Stay put', 'Swim over', 'Thumbs up'], right: 0, boss: 1 }
  ];

  OBEY.registerLevel({
    id: 'thumbs-up',
    num: 205,
    title: 'Thumbs Up',
    objective: 'Answer your dive buddy so the reef dive carries on.',
    intro: 'Your dive buddy wants to know if you\'re all right. Give him a big THUMBS UP. Universal sign for "everything is great". Everyone knows that.',
    introMood: 'pleased',
    actions: ['tap', 'read', 'wait'],
    par: 2,
    hints: [
      'Divers have their own hand signals. Your slate lists them.',
      'Underwater, a thumb up means "let\'s go up". The ring means "I\'m OK". A flat hand means "stop".',
      'Answer with the OK ring. When he shows a flat hand, stay put.'
    ],
    wrong: ['A thumbs up ends the dive (trap).', 'Swimming over when he signals STOP meets a jellyfish (trap).', 'A flat hand back just confuses him (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Still diving, unstung, and fluent in hands. I mostly speak in jazz hands.',
    trick: 'Underwater a thumb up means "go up", so the slate\'s OK ring kept the dive going, and the flat hand meant stop, not hello.',

    init: function () { return { round: 0, waiting: false, jellyGone: false }; },

    view: function (s) {
      var r = R[Math.min(s.round, 1)];
      var signal = s.round === 0 ? 'ok' : (s.jellyGone ? 'ok' : 'stop');
      var out = [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-sea', cls: 'backdrop' }),
        O('slate', 4, 4, 42, 32, { kind: 'static', text: 'DIVE SIGNALS\nThumb up: GO UP\nRing: I\'m OK\nFlat hand: STOP', label: 'Dive slate. Thumb up means go up. Ring means I am OK. Flat hand means stop.', cls: 'honest-card' }),
        O('buddy', 56, 18, 38, 44, { kind: 'static', art: 'i-diver', artOpts: { signal: signal }, label: 'Your dive buddy, signalling ' + (signal === 'ok' ? 'a ring: OK?' : 'a flat hand: STOP') }),
        O('jelly', 40, 20, 14, 22, { kind: 'static', art: 'i-jelly', label: 'A jellyfish drifting between you', hidden: s.round === 0 || s.jellyGone }),
        O('coral1', 4, 50, 16, 26, { kind: 'static', art: 'i-coral', label: '' }),
        O('coral2', 22, 58, 10, 18, { kind: 'static', art: 'i-weed', label: '' }),
        O('ask', 4, 40, 42, 9, { kind: 'static', text: s.round === 0 ? 'Buddy asks: OK?' : 'Buddy signals!', label: '', cls: 'tag-card' })
      ];
      r.opts.forEach(function (t, i) {
        out.push(O('opt' + i, 4 + i * 31, 80, 29, 14, { text: t, label: 'Signal or do: ' + t, cls: 'btn-card big' + (i === r.boss ? ' accent' : ''), disabled: s.waiting }));
      });
      return out;
    },

    on: function (a, s, api) {
      var m = a.type === 'tap' && /^opt([0-2])$/.exec(a.target);
      if (!m || s.waiting) return false;
      var i = Number(m[1]), r = R[s.round], t = r.opts[i];
      if (t === 'Thumbs up') { api.fail('Thumbs up! Your buddy nods… and heads for the surface. Dive over. On the boat, he points at the slate: thumb up means GO UP.'); return true; }
      if (t === 'Swim over') { api.fail('You swim over for a high five and meet the jellyfish instead. ZAP. He was signalling STOP. Back to the boat for some vinegar.'); return true; }
      if (t === 'Flat hand') { api.nope(); api.say('You show him a flat hand. "Stop?" he signals back. Stop what? Nobody knows. Not even me.', 'annoyed'); return true; }
      if (s.round === 0) {
        s.round = 1;
        api.defy('thumbs');
        api.say('A RING? Fine. Oh look, now he\'s waving! Swim over and give him a high five!', 'pleased');
        return true;
      }
      s.waiting = true;
      api.say('Just floating there? He\'s WAVING. You\'re being very rude to a waving man.', 'annoyed');
      api.after(2500, function () {
        s.jellyGone = true;
        api.complete({ line: 'The jellyfish drifts past and your buddy gives you the OK. He wasn\'t waving. Noted. Never high-five a jellyfish.', mood: 'defeated' });
      });
      return true;
    },

    solution: [{ tap: 'opt1' }, { tap: 'opt0' }, { wait: 2600 }],
    checks: [
      { name: 'thumbs up is a trap', steps: [{ tap: 'opt0' }], expect: 'fail' },
      { name: 'flat hand is a nope', steps: [{ tap: 'opt2' }], expect: 'nope' },
      { name: 'swimming over is a trap', steps: [{ tap: 'opt1' }, { tap: 'opt1' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
