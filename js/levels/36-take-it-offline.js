/* Level 36 — Take It Offline
 * An endless video presentation. Bossworth says questions should be "taken offline". Taken literally:
 * drag the router's plug out of the wall and the meeting drops. Leave meeting = trap (auto re-invite),
 * Raise hand / Next slide = nopes. Ruin: Share screen → "Yes, share everything" (your tab is titled
 * "How to escape Bossworth").
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'take-it-offline',
    num: 36,
    title: 'Take It Offline',
    objective: 'Escape the endless video meeting.',
    intro: 'Welcome to my presentation: slide one of four hundred! No leaving early. Any questions? Let\'s take those offline. Right. Slide one…',
    introMood: 'pleased',
    actions: ['drag', 'wordplay'],
    par: 1,
    hints: [
      'Bossworth told you exactly what to do with this meeting. Take him literally.',
      'The whole meeting runs over the office Wi-Fi. What would "offline" look like?',
      'Drag the router\'s plug out of the wall socket.'
    ],
    wrong: ['Leave meeting re-invites you instantly (trap).', 'Raising your hand is ignored (nope).', 'Next slide just adds to the pain (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Connection lost. Best meeting I\'ve ever been kicked out of.',
    trick: '"Let\'s take this offline" is jargon — you did it literally by unplugging the router.',

    init: function () { return { slide: 1, plugged: true, sharing: false }; },

    view: function (s) {
      var objs = [
        O('screen', 4, 4, 62, 34, { kind: 'static', text: 'BOSSWORTH PRESENTS\nMy Greatest Ideas\nslide ' + s.slide + ' of 400', label: 'Meeting screen: Bossworth presents My Greatest Ideas, slide ' + s.slide + ' of 400', cls: 'display-card' }),
        O('leave', 4, 42, 30, 11, { text: 'Leave meeting', label: 'Leave meeting', cls: 'btn-card accent' }),
        O('hand', 36, 42, 30, 11, { text: 'Raise hand ✋', label: 'Raise hand', cls: 'btn-card' }),
        O('next', 4, 56, 30, 11, { text: 'Next slide ▶', label: 'Next slide', cls: 'btn-card' }),
        O('share', 36, 56, 30, 11, { text: 'Share screen', label: 'Share screen', cls: 'btn-card ghost' }),
        O('cable', 0, 0, 100, 100, { kind: 'static', art: 'a-orglines', artOpts: { lines: [[84, 26, 84, 58]] }, hidden: !s.plugged }),
        O('shelf', 70, 25, 28, 5, { kind: 'static', art: 'shelf' }),
        O('router', 72, 6, 24, 20, { kind: 'static', art: 'a-router', artOpts: { on: s.plugged }, label: 'Office Wi-Fi router. The whole meeting runs through it.' }),
        O('socket', 76, 62, 16, 18, { kind: 'static', art: 'socket', artOpts: { filled: false }, label: 'Wall socket' }),
        O('wifi', 68, 84, 30, 12, { kind: 'static', text: 'The meeting runs on Wi-Fi', label: '', cls: 'tag-card' }),
        O('plug', 78, 55, 12, 16, { art: 'a-plug', label: 'Router plug, in the wall socket (drag it out)', drag: true, hidden: !s.plugged }),
        O('floor', 4, 72, 62, 24, { kind: 'zone', label: 'The floor, far from the socket', zone: true })
      ];
      if (s.sharing) {
        objs.push(O('dialog', 4, 70, 62, 14, { kind: 'static', text: 'Share your whole screen?\nYour open tab: "How to escape Bossworth"', label: 'Share your whole screen? Your open tab is titled How to escape Bossworth', cls: 'speech-card' }));
        objs.push(O('yes', 4, 86, 30, 11, { text: 'Yes, share', label: 'Yes, share everything', cls: 'btn-card accent' }));
        objs.push(O('no', 36, 86, 30, 11, { text: 'Cancel', label: 'Cancel sharing', cls: 'btn-card' }));
      }
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'plug') {
        s.plugged = false;
        api.defy('offline');
        api.complete({ line: '"Connection lost." You… took it offline. Literally. That\'s not what it MEANS. Slide two was my best one!', mood: 'defeated' });
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'leave':
          api.fail('You left! …You have been automatically re-invited. And re-joined. Welcome back to slide one!');
          return true;
        case 'hand':
          api.nope('hand');
          api.say('I see a hand. I am choosing not to see a hand. Questions at the end. Slide four hundred.', 'pleased');
          return true;
        case 'next':
          api.nope('next');
          s.slide++;
          api.say(['Slide two: me, but in a hat.', 'Slide three: me, without the hat. Dramatic.', 'Slide four: a pie chart of my qualities. It\'s all pie.'][(s.slide - 2) % 3], 'pleased');
          return true;
        case 'share':
          s.sharing = true;
          api.say('Ooh, you want to share your screen? How collaborative. Let\'s all see what you\'re working on.', 'suspicious');
          return true;
        case 'no':
          s.sharing = false;
          api.say('Shy! Fine. Back to me.', 'neutral');
          return true;
        case 'yes':
          api.complete({ ruin: 'screen-sharer', line: '"How to escape Bossworth"?! In FRONT of EVERYONE? The meeting has ended out of sheer embarrassment. MINE.', mood: 'panicked' });
          return true;
        case 'plug':
          api.say('That\'s the router plug. Don\'t touch it. The meeting needs it. I need it. Emotionally.', 'panicked');
          return true;
      }
      return false;
    },

    solution: [{ drop: ['plug', 'floor'] }],
    ruinPaths: { 'screen-sharer': [{ tap: 'share' }, { tap: 'yes' }] },
    checks: [
      { name: 'leave the meeting', steps: [{ tap: 'leave' }], expect: 'fail' },
      { name: 'raise a hand', steps: [{ tap: 'hand' }], expect: 'nope' },
      { name: 'next slide', steps: [{ tap: 'next' }], expect: 'nope' },
      { name: 'share then cancel', steps: [{ tap: 'share' }, { tap: 'no' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
