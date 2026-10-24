/* Level 165 — Clean Hands (Lunchbox Lane)
 * Bossworth: a quick splash and in you go; soap is for show-offs. The hand-washing poster: soap, then
 * scrub until the sand timer runs out (5 s), then lunch. Tap the soap, press and HOLD Scrub for five
 * seconds (a read-out counts), then go through the LUNCH door.
 * Wrong: going in unwashed or half-washed (trap); stopping the scrub early or scrubbing without soap (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var NEED = 5;

  OBEY.registerLevel({
    id: 'clean-hands',
    num: 165,
    title: 'Clean Hands',
    objective: 'Wash your hands properly, then go to lunch.',
    intro: 'Lunch! A quick splash under the tap and in you go. Soap is for show-offs, and scrubbing is for floors. Chop chop, it\'s fish fingers.',
    introMood: 'annoyed',
    actions: ['tap', 'hold'],
    par: 3,
    hints: [
      'The poster by the sink has three steps. Bossworth skipped two.',
      'Soap first. Then the scrub has to last until the timer reaches 5.',
      'Tap the soap, hold Scrub for five seconds, then open the LUNCH door.'
    ],
    wrong: ['Going to lunch without washing properly is a trap.', 'Letting go of Scrub before 5 seconds is a nope.', 'Scrubbing without soap is a nope.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Soap, scrub, five whole seconds. Squeaky clean.',
    trick: 'The poster beat the "quick splash": soap first, then a scrub that lasts the full five seconds.',

    init: function () { return { soap: false, clean: false, secs: 0, tick: null }; },

    view: function (s) {
      var hands = s.clean ? 'clean' : s.soap ? 'soapy' : 'grubby';
      return [
        O('poster', 4, 3, 46, 30, { kind: 'static', text: 'HAND WASHING\n1. Soap\n2. Scrub until the timer says 5\n3. Then lunch!', label: 'Hand washing poster: 1, soap. 2, scrub until the timer says 5. 3, then lunch.', cls: 'honest-card' }),
        O('timer', 54, 4, 22, 16, { kind: 'static', text: 'Timer\n' + Math.min(s.secs, NEED) + ' s', label: 'Scrub timer: ' + Math.min(s.secs, NEED) + ' seconds', cls: 'display-card' + (s.secs >= NEED ? ' ready' : '') }),
        O('door', 74, 50, 24, 44, { art: 'door', artOpts: { sign: 'LUNCH' }, label: 'Door to the lunch hall' }),
        O('sink', 30, 52, 44, 44, { kind: 'static', art: 'g-sink', artOpts: { running: !!s.tick, soapy: s.soap && !s.clean }, label: 'Sink with a tap' }),
        O('soap', 33, 58, 10, 15, { art: 'g-soap', label: s.soap ? 'Soap pump (your hands are soapy)' : 'Soap pump' }),
        O('hands', 4, 66, 24, 9, { kind: 'static', text: 'Hands: ' + hands, label: 'Your hands are ' + hands, cls: 'tag-card' }),
        O('scrub', 4, 78, 24, 18, { text: s.tick ? 'Scrubbing…' : (s.clean ? 'Clean!' : 'Hold to scrub'), label: 'Scrub your hands under the tap (press and hold)', hold: true, cls: 'hold-btn' + (s.clean ? ' done' : '') })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'tap:soap':
          if (s.soap) { api.say('Even MORE soap? You\'ll float to lunch.', 'annoyed'); return true; }
          s.soap = true;
          api.defy('soap');
          api.say('Soap. Show-off. Fine, but no scrubbing. Scrubbing is for floors.', 'annoyed');
          return true;
        case 'holdstart:scrub':
          if (s.tick) return true;
          s.secs = 0;
          s.tick = api.every(1000, function () {
            s.secs++;
            if (s.secs >= NEED && s.soap && !s.clean) { s.clean = true; api.say('Five whole seconds of scrubbing. The sand timer is out. I\'m bored on your behalf.', 'annoyed'); }
          });
          api.say('Scrubbing? With your actual hands? How long are you going to DO that?', 'suspicious');
          return true;
        case 'holdend:scrub':
          if (s.tick) { api.cancel(s.tick); s.tick = null; }
          if (s.clean) return true;
          api.nope('scrub');
          if (!s.soap) api.say('Just water. That\'s a rinse, not a wash. The poster says soap first. Not that I read posters.', 'pleased');
          else { api.say('Stopped at ' + s.secs + '. The timer wanted 5. Still a bit grubby. Good enough! (It isn\'t.)', 'pleased'); s.secs = 0; }
          return true;
        case 'tap:scrub':
          api.say('Scrubbing is a press-and-HOLD job. Not that I\'m encouraging it.', 'neutral');
          return true;
        case 'tap:door':
          if (s.clean) api.complete({ line: 'The dinner lady inspects your hands, nods, and gives you EXTRA fish fingers. She has never given ME extra fish fingers.', mood: 'defeated' });
          else api.fail('The dinner lady blocks the door: "Hands." She looks at them. "Back to the sink, love. Soap. And a proper scrub."');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'soap' }, { hold: ['scrub', 5200] }, { tap: 'door' }],
    checks: [
      { name: 'quick splash', steps: [{ tap: 'door' }], expect: 'fail' },
      { name: 'scrub stopped early', steps: [{ tap: 'soap' }, { hold: ['scrub', 2100] }], expect: 'nope' },
      { name: 'no soap', steps: [{ hold: ['scrub', 6000] }], expect: 'nope' },
      { name: 'soap but no scrub', steps: [{ tap: 'soap' }, { tap: 'door' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
