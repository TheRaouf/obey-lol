/* Level 120 — The Setlist (Curtain Call)
 * Band rehearsal. The setlist is pinned up for six seconds, then Bossworth confiscates it and insists
 * the show opens with a guitar solo. Play the songs from memory: drums, trumpet, keyboard.
 * Guitar (not on the list): nope. Wrong order: trap (the setlist goes back up for another look).
 * "Ask for the setlist" shows it again for five seconds (it costs an action).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ORDER = ['drum', 'horn', 'keys'];
  var NAMES = { drum: 'Drum Thunder', horn: 'Trumpet Lullaby', keys: 'Keyboard Cat-astrophe' };
  var SHOW_MS = 6000, ASK_MS = 5000;

  function showList(s, api, ms) {
    s.visible = true;
    // A generation number instead of a timer handle keeps the state identical after a restart.
    var gen = ++s.shows;
    api.after(ms, function () {
      if (gen !== s.shows) return;
      s.visible = false;
      api.say('Setlist confiscated! For security. It opens with a GUITAR solo. Everybody knows that. Off you go.', 'pleased');
    });
  }

  OBEY.registerLevel({
    id: 'the-setlist',
    num: 120,
    title: 'The Setlist',
    objective: 'Rehearse the songs in setlist order.',
    intro: 'Band rehearsal! There\'s the setlist. Memorise it fast, I\'m confiscating it. Then play the songs in order, starting with my guitar solo. Naturally.',
    introMood: 'pleased',
    actions: ['tap', 'memory', 'sequence'],
    par: 3,
    hints: [
      'The setlist was on the board at the start. What came first?',
      'The guitar was never on it. You can ask to see the list again.',
      'Play the drums, then the trumpet, then the keyboard.'
    ],
    wrong: ['The guitar is not on the setlist (nope).', 'Playing a song out of order is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Tight set. No guitar. Bossworth is "fine with it".',
    trick: 'You played the order you saw on the setlist, not the guitar solo Bossworth invented after hiding it.',

    init: function () { return { visible: true, played: 0, shows: 0 }; },

    onStart: function (s, api) { showList(s, api, SHOW_MS); },

    view: function (s) {
      var list = s.visible
        ? 'TONIGHT\'S SETLIST\n1. ' + NAMES.drum + ' (drums)\n2. ' + NAMES.horn + ' (trumpet)\n3. ' + NAMES.keys + ' (keyboard)'
        : 'SETLIST\n(confiscated by Bossworth "for security reasons")';
      return [
        O('setlist', 4, 4, 58, 28, { kind: 'static', text: list, label: s.visible ? 'Setlist: 1 drums, 2 trumpet, 3 keyboard' : 'The setlist has been taken down', cls: 'book-card' }),
        O('ask', 66, 6, 30, 13, { text: 'Ask for the setlist', label: 'Ask to see the setlist again', cls: 'btn-card', disabled: s.visible }),
        O('progress', 66, 22, 30, 9, { kind: 'static', text: 'Songs played: ' + s.played + ' / 3', label: 'Songs played: ' + s.played + ' of 3', cls: 'tag-card' }),
        O('guitar', 4, 42, 22, 30, { art: 'e-guitar', label: 'Guitar' }),
        O('drum', 28, 44, 22, 28, { art: 'drum', label: 'Drums' }),
        O('horn', 52, 44, 20, 28, { art: 'horn', label: 'Trumpet' }),
        O('keys', 74, 42, 22, 30, { art: 'e-keys', label: 'Keyboard' }),
        O('amp', 4, 80, 92, 12, { kind: 'static', text: 'Rehearsal room: no audience, no mercy', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'ask') {
        showList(s, api, ASK_MS);
        api.say('Fine, one more look. Five seconds. I\'m counting. Out loud. In my head.', 'annoyed');
        return true;
      }
      if (a.target === 'guitar') {
        api.nope('guitar');
        api.say('The guitarist isn\'t here. That\'s a cardboard cutout of a guitar. Still! Opening song! Play it!', 'pleased');
        return true;
      }
      var i = ORDER.indexOf(a.target);
      if (i < 0) return false;
      if (i !== s.played) {
        api.fail('That\'s song ' + (i + 1) + ', not song ' + (s.played + 1) + '! The band crashes into a heap. From the top: setlist back up for a moment.');
        return true;
      }
      s.played++;
      if (s.played === 3) {
        api.complete({ line: 'Drums, trumpet, keyboard. Exactly the setlist. Not one guitar solo. I was going to SING over the guitar solo.', mood: 'defeated' });
      } else {
        api.say(s.played === 1 ? '"Drum Thunder." Loud. Correct, I suppose. The guitar is next. Definitely.' : '"Trumpet Lullaby." Lovely. Now the guitar? No? Fine.', 'annoyed');
      }
      return true;
    },

    solution: [{ tap: 'drum' }, { tap: 'horn' }, { tap: 'keys' }],
    alternatives: { 'from-memory-after-asking': [{ wait: 7000 }, { tap: 'ask' }, { tap: 'drum' }, { tap: 'horn' }, { wait: 6000 }, { tap: 'keys' }] },
    checks: [
      { name: 'Bossworth\'s guitar solo', steps: [{ wait: 7000 }, { tap: 'guitar' }], expect: 'nope' },
      { name: 'out of order', steps: [{ tap: 'horn' }], expect: 'fail' },
      { name: 'skip the trumpet', steps: [{ tap: 'drum' }, { tap: 'keys' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
