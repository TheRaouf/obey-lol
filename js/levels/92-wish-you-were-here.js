/* Level 92 — Wish You Were Here
 * Post the postcard to Gran in Norway. Bossworth: stamps are optional, use the LOCAL slot,
 * and never put a stamp on him. The postcard's address says NORWAY; unstamped mail comes back.
 * Solution: drag the stamp onto the postcard, then the postcard into ABROAD.
 * Wrong: no stamp (nope), LOCAL slot (trap). Ruin: stick the stamp on Bossworth — he gets posted.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'wish-you-were-here',
    num: 92,
    title: 'Wish You Were Here',
    objective: 'Post the postcard to Gran.',
    intro: 'Last stop: the postcard! Stamps are optional nowadays, and it goes in the LOCAL slot. Everything\'s local if you think hard enough. And whatever you do, do NOT stick a stamp on ME.',
    introMood: 'pleased',
    actions: ['drag', 'read', 'choice'],
    par: 2,
    hints: [
      'Read the address on the postcard, and the postbox sign.',
      'Norway is not local, and post without a stamp comes straight back.',
      'Drag the stamp onto the postcard, then drag the postcard into the ABROAD slot.'
    ],
    wrong: ['Posting without a stamp gets it returned (nope).', 'The LOCAL slot sends Gran\'s postcard to Bossworth\'s own doormat (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Posted. Gran will get it in a week and stick it on her fridge forever.',
    trick: 'The address said NORWAY, so it needed a stamp and the ABROAD slot — not "optional" and "local".',
    narratorZone: true,

    init: function () { return { stamped: false }; },

    view: function (s) {
      return [
        O('sign', 4, 4, 56, 15, { kind: 'static', text: 'LOCAL = this town only\nABROAD = everywhere else', label: 'Postbox sign: local means this town only, abroad means everywhere else', cls: 'plaque-card' }),
        O('box', 64, 40, 32, 56, { kind: 'static', art: 'c-postbox', label: 'Red postbox with two slots' }),
        O('local', 63, 50, 34, 10, { text: 'LOCAL', label: 'LOCAL slot (drop zone)', zone: true, free: true, cls: 'tag-card' }),
        O('abroad', 63, 64, 34, 10, { text: 'ABROAD', label: 'ABROAD slot (drop zone)', zone: true, free: true, cls: 'tag-card' }),
        O('card', 4, 34, 40, 26, { art: 'c-postcard', artOpts: { stamped: s.stamped }, label: 'Postcard to Gran Olga, Fjordvik, NORWAY, ' + (s.stamped ? 'stamped' : 'no stamp yet') + ' (drag it to a slot, or drop a stamp on it)', drag: true, zone: !s.stamped }),
        O('stamp', 20, 70, 14, 14, { art: 'c-stamp', label: 'A postage stamp (drag it)', drag: true, hidden: s.stamped })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'drop') return false;
      if (a.target === 'stamp') {
        if (a.zone === 'card') {
          s.stamped = true;
          api.defy('stamp');
          api.say('A stamp? On a POSTCARD? How… traditional. Well, at least it\'s not on me.', 'suspicious');
        } else if (a.zone === 'narrator') {
          api.complete({ ruin: 'return-to-sender', line: 'You STAMPED me?! The postie is here… no… NO… I\'m being posted to NORWAY! Tell Gran I\'m the postcard! Wish you were HEEEERE…', mood: 'panicked' });
        } else api.say('The stamp flutters down. It\'s waiting for something to stick to. Not me, I hope.', 'neutral');
        return true;
      }
      if (a.target !== 'card') return false;
      if (a.zone !== 'local' && a.zone !== 'abroad') {
        api.say(a.zone === 'narrator' ? 'For ME? "Wish you were here." I AM here. That\'s the problem. Post it to Gran.' : 'You wave the postcard about. Gran won\'t receive waving.', 'neutral');
        return true;
      }
      if (!s.stamped) {
        api.nope('card');
        api.say('Clunk… and it slides straight back out with a note: "No stamp, no trip." Optional, I said. The postbox disagrees.', 'annoyed');
        return true;
      }
      if (a.zone === 'local') {
        api.fail('LOCAL! It\'s delivered to… my own doormat. I read it aloud, badly, and post it back to you. Norway is not local!');
      } else {
        api.complete({ line: 'ABROAD, stamped, off to Norway. You read the ADDRESS? Who reads addresses? Postmen, apparently. And you. And Gran, soon.', mood: 'defeated' });
      }
      return true;
    },

    solution: [{ drop: ['stamp', 'card'] }, { drop: ['card', 'abroad'] }],
    checks: [
      { name: 'no stamp (as told)', steps: [{ drop: ['card', 'abroad'] }], expect: 'nope' },
      { name: 'stamped but local', steps: [{ drop: ['stamp', 'card'] }, { drop: ['card', 'local'] }], expect: 'fail' },
      { name: 'unstamped local', steps: [{ drop: ['card', 'local'] }], expect: 'nope' }
    ],
    ruinPaths: { 'return-to-sender': [{ drop: ['stamp', 'narrator'] }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
