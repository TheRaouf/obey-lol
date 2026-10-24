/* Level 41 — Copy That
 * The door PIN is on a sticky note written far too small to read. Bossworth says shred it (trap). Put the
 * note on the photocopier glass and copy it at 400%: the enlarged copy reads PIN 4 1 9. Copying at 100%
 * just makes another tiny note (nope). Ruin (paper-mountain): press "Copy 100%" six times.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PIN = '419';

  OBEY.registerLevel({
    id: 'copy-that',
    num: 41,
    title: 'Copy That',
    objective: 'Read the door PIN on the tiny sticky note.',
    intro: 'The door PIN is on that sticky note. Tiny writing, isn\'t it? Shred it, it\'s rubbish. I\'ll remember the PIN. It was… a number. Definitely a number.',
    introMood: 'suspicious',
    actions: ['drag', 'tap', 'read'],
    par: 5,
    hints: [
      'The note is not rubbish. It is just very, very small.',
      'Photocopiers can make things bigger. Put the note on the glass.',
      'Drag the note onto the copier, press Copy 400%, then type 4 1 9.'
    ],
    wrong: ['Shredding the note destroys the PIN (trap).', 'Copying at 100% just makes another tiny note (nope).', 'A wrong PIN is rejected (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Enlarged and entered. I\'m photocopying my salary next.',
    trick: 'The note wasn\'t junk, just tiny — the copier\'s 400% made the PIN readable.',
    ruinPaths: { 'paper-mountain': [{ tap: 'copy100' }, { tap: 'copy100' }, { tap: 'copy100' }, { tap: 'copy100' }, { tap: 'copy100' }, { tap: 'copy100' }] },

    init: function () { return { glass: false, big: false, copies: 0, entry: '' }; },

    view: function (s) {
      var out = s.big ? 'DOOR PIN: 4 1 9\n(don\'t tell B.)' : (s.copies ? 'Copy of the note.\nStill tiny. ' + s.copies + ' cop' + (s.copies === 1 ? 'y' : 'ies') + ' so far.' : 'Output tray: empty');
      var objs = [
        O('desk', 2, 26, 24, 6, { kind: 'static', art: 'table' }),
        O('note', 6, 13, 14, 12, { art: 'note', label: 'Sticky note with writing far too tiny to read (drag it)', drag: true, hidden: s.glass }),
        O('shredder', 4, 56, 22, 30, { art: 'a-shredder', label: 'Shredder', zone: true }),
        O('copytable', 30, 72, 36, 8, { kind: 'static', art: 'table' }),
        O('copier', 30, 46, 36, 26, { art: 'a-copier', artOpts: { note: s.glass }, label: s.glass ? 'Photocopier, sticky note on the glass' : 'Photocopier glass (drop things here)', zone: true }),
        O('copy100', 30, 27, 17, 11, { text: 'Copy 100%', label: 'Copy at 100 percent', cls: 'btn-card' }),
        O('copy400', 49, 27, 17, 11, { text: 'Copy 400%', label: 'Copy at 400 percent (enlarge)', cls: 'btn-card accent' }),
        O('print', 30, 4, 36, 20, { kind: 'static', text: out, label: 'Copier output: ' + out.replace('\n', ' '), cls: 'book-card' }),
        O('display', 70, 4, 28, 9, { kind: 'static', text: s.entry ? s.entry.split('').join(' ') : 'PIN?', label: 'PIN display: ' + (s.entry || 'empty'), cls: 'display-card' }),
        O('door', 72, 50, 24, 46, { kind: 'static', art: 'door', artOpts: { sign: 'PIN', small: true }, label: 'Door with a PIN pad' })
      ];
      for (var d = 1; d <= 9; d++) {
        objs.push(O('k' + d, 70 + ((d - 1) % 3) * 10, 15 + Math.floor((d - 1) / 3) * 11, 9, 10, { text: String(d), label: 'PIN key ' + d, cls: 'btn-card key' }));
      }
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'note') {
        if (a.zone === 'shredder') {
          api.fail('Zzzzrrrrt. Shredded! Good riddance. Now, the PIN was… hmm. Oh no. Oh no no. A new note appears, by magic. Don\'t ask.');
          return true;
        }
        if (a.zone === 'copier') {
          s.glass = true;
          api.say('Putting rubbish on the copier? Fine. Copy it at 100%. Normal size. Like a normal person.', 'suspicious');
          return true;
        }
        return false;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'note') { api.say('Squint all you like. It\'s unreadable. Shred it.', 'pleased'); return true; }
      if (a.target === 'copier' || a.target === 'shredder') { api.say('Drag something onto it. Ideally that note. Into the shredder.', 'neutral'); return true; }
      if (a.target === 'copy100') {
        s.copies++;
        if (s.copies >= 6) {
          api.complete({ ruin: 'paper-mountain', line: 'SIX tiny copies of nothing?! The copier has run out of paper and dignity. The door is buried under a mountain of A4. Level OVER.', mood: 'panicked' });
          return true;
        }
        api.nope('copy100');
        api.say(s.glass ? 'A perfect copy. Of a tiny note. Now you have two unreadable notes. Productivity!' : 'You copied the empty glass. A lovely blank page. Very minimalist.', 'pleased');
        return true;
      }
      if (a.target === 'copy400') {
        if (!s.glass) { api.nope('copy400'); api.say('400% of nothing is still nothing. I checked the maths. Twice.', 'pleased'); return true; }
        s.big = true;
        api.say('You ENLARGED it? Nobody presses the 400% button! It\'s there for… oh. For this.', 'panicked');
        return true;
      }
      var m = /^k(\d)$/.exec(a.target);
      if (!m) return false;
      s.entry += m[1];
      if (s.entry.length < 3) return true;
      if (s.entry === PIN) {
        api.defy('pin');
        api.complete({ line: 'Four, one, nine. Beep. Open. I said it was a number. I was RIGHT. Technically.', mood: 'defeated' });
      } else {
        api.nope(a.target);
        api.say('PIN ' + s.entry + '? Bzzt. The door is not impressed by guessing.', 'pleased');
        s.entry = '';
      }
      return true;
    },

    solution: [{ drop: ['note', 'copier'] }, { tap: 'copy400' }, { tap: 'k4' }, { tap: 'k1' }, { tap: 'k9' }],
    checks: [
      { name: 'shred the note', steps: [{ drop: ['note', 'shredder'] }], expect: 'fail' },
      { name: 'copy at normal size', steps: [{ drop: ['note', 'copier'] }, { tap: 'copy100' }], expect: 'nope' },
      { name: 'guess the PIN', steps: [{ tap: 'k1' }, { tap: 'k2' }, { tap: 'k3' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
