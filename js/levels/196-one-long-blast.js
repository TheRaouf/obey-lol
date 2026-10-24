/* Level 196 — One Long Blast (Periscope Pier)
 * Leaving the berth. Bossworth wants three cheery short toots. The harbour's sound-signal board says
 * one LONG blast (4 s or more) means "leaving berth" and three short blasts mean "going backwards".
 * Hold the horn for 4 seconds: the level finishes the moment the blast is long enough.
 * Wrong: three short toots (trap: you reverse into the fish market), the ship's bell (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var LONG = 4000, SHORT = 1500;

  OBEY.registerLevel({
    id: 'one-long-blast',
    num: 196,
    title: 'One Long Blast',
    objective: 'Signal that you are leaving the berth.',
    intro: 'Time to leave port! Say goodbye with three cheery toots on the horn. Toot, toot, TOOT! Short and sweet, like me.',
    introMood: 'pleased',
    actions: ['hold', 'read'],
    par: 1,
    hints: [
      'Harbours have rules about horns. There is a board.',
      'Three short blasts means something else entirely. Leaving needs one long one.',
      'Press and hold the horn button for at least 4 seconds.'
    ],
    wrong: ['Three short toots tell the harbour you are reversing (trap).', 'A medium blast means nothing to anyone.', 'The ship\'s bell is for telling the time (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One long blast. The harbour waves. A seagull salutes. I hate that seagull.',
    trick: 'In harbour, three short blasts mean "I am going backwards"; the board said leaving the berth takes one long blast.',

    init: function () { return { toots: 0, ms: 0, blowing: false, tick: null, done: null }; },

    view: function (s) {
      var meter = s.blowing ? 'Blast: ' + (s.ms / 1000).toFixed(1) + ' s' : (s.toots ? 'Short toots: ' + s.toots : 'Horn: quiet');
      return [
        O('board', 4, 4, 54, 30, { kind: 'static', text: 'SOUND SIGNALS\n1 LONG blast (4 s+): leaving berth\n3 short: going backwards\n5 short: DANGER!', label: 'Sound signals board: one long blast of four seconds or more means leaving berth. Three short blasts mean going backwards. Five short blasts mean danger.', cls: 'honest-card' }),
        O('surface', 0, 40, 100, 12, { kind: 'static', art: 'i-surface', label: '' }),
        O('sea', 0, 50, 100, 50, { kind: 'static', art: 'i-sea', artOpts: { nobed: true } }),
        O('pier', 58, 40, 40, 34, { kind: 'static', art: 'i-pier', label: 'The pier' }),
        O('sub', 10, 34, 40, 26, { kind: 'static', art: 'i-sub', artOpts: { bubbles: s.blowing }, label: 'Your submarine, tied up at the berth' }),
        O('meter', 4, 64, 40, 10, { kind: 'static', text: meter, label: meter, cls: 'display-card' + (s.blowing && s.ms >= LONG ? ' ready' : '') }),
        O('bell', 62, 24, 18, 23, { art: 'i-shipbell', artOpts: { frame: true }, label: 'Ship\'s bell on the pier post' }),
        O('horn', 4, 78, 60, 16, { text: s.blowing ? 'HOOOOOONK…' : 'Hold to sound the horn', label: 'Ship\'s horn (press and hold)', cls: 'hold-btn' + (s.blowing ? ' charging' : ''), hold: true }),
        O('hornart', 70, 78, 24, 16, { kind: 'static', art: 'horn', label: '' })
      ];
    },

    on: function (a, s, api) {
      if (a.target === 'bell' && a.type === 'tap') {
        api.nope();
        api.say('DING. That\'s the ship\'s bell. It tells the time, not the harbour. It is now "ding" o\'clock.', 'neutral');
        return true;
      }
      if (a.target !== 'horn') return false;
      function shortToot() {
        s.toots++;
        if (s.toots >= 3) {
          api.fail('TOOT TOOT TOOT! Three short blasts: "I am going backwards." Everyone moves aside, so you reverse… straight into the fish market. Mackerel everywhere.');
        } else {
          api.say(['Toot! Lovely. Two more!', 'Toot toot! One more and we\'re off!'][s.toots - 1], 'pleased');
        }
      }
      if (a.type === 'tap') { shortToot(); return true; }
      if (a.type === 'holdstart') {
        s.blowing = true; s.ms = 0;
        api.say('That\'s not a toot! That\'s a HONK! Let go! LET GO!', 'panicked');
        s.tick = api.every(200, function () { s.ms += 200; });
        s.done = api.after(LONG, function () {
          api.defy('three-toots');
          api.complete({ line: 'One long blast. The harbour master waves us out. Apparently three toots means "reversing". I knew that. I was testing you.', mood: 'defeated' });
        });
        return true;
      }
      if (a.type === 'holdend') {
        if (s.tick) api.cancel(s.tick);
        if (s.done) api.cancel(s.done);
        s.tick = s.done = null; s.blowing = false; s.ms = 0;
        if (a.ms < SHORT) shortToot();
        else api.say('A medium blast. That means nothing in any harbour. Except "Bossworth is confused."', 'suspicious');
        return true;
      }
      return false;
    },

    solution: [{ hold: ['horn', 4200] }],
    checks: [
      { name: 'three short toots is a trap', steps: [{ hold: ['horn', 300] }, { hold: ['horn', 300] }, { hold: ['horn', 300] }], expect: 'fail' },
      { name: 'a medium blast does not finish', steps: [{ hold: ['horn', 2500] }], expect: 'playing' },
      { name: 'the ship\'s bell is a nope', steps: [{ tap: 'bell' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
