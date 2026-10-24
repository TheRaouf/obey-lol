/* Level 9 — The Suspicious Gift
 * Several plausible interactions with different consequences:
 *   pull the bow (open)  → boxing-glove trap, soft fail
 *   read the tag         → reveals the gift is addressed to Bossworth
 *   hold/shake the gift  → secret "shaken" (ticks like a clock)
 *   drag gift → Bossworth   → completes; choice gift=prank (chaos lean)
 *   drag gift → mailbox     → completes; choice gift=return (hero lean)
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SHAKE_MS = 2000;

  OBEY.registerLevel({
    id: 'suspicious-gift',
    num: 9,
    title: 'The Suspicious Gift',
    objective: 'Deal with the gift.',
    intro: 'A GIFT! For you! Open it! Pull the bow! Nothing bad will happen! Probably!',
    introMood: 'pleased',
    actions: ['tap', 'hold', 'drag', 'choice'],
    par: 2,
    narratorZone: true,
    hints: [
      'Read before you open.',
      'The tag says who the gift is really for.',
      'Drag the gift to Bossworth — or into the mailbox. Don\'t open it yourself.'
    ],
    wrong: ['Pulling the bow opens the gift: boxing glove, soft fail.'],
    secrets: ['shaken'],
    endingNote: 'Choice: giving it to Bossworth leans Chaos; returning it by mail leans Hero.',
    done: 'Gift handled. Nobody got bonked who didn\'t deserve it.',

    init: function () { return { tagRead: false, shaking: false, shakeTimer: null }; },

    view: function (s) {
      return [
        O('table', 18, 70, 46, 8, { kind: 'static', art: 'table' }),
        O('gift', 24, 36, 34, 34, { art: 'gift', artOpts: { shaking: s.shaking }, label: 'Gift box (drag it somewhere, or press and hold to shake)', drag: true, hold: true, freeHold: true }),
        O('bow', 32, 26, 18, 12, { art: 'bow', label: 'Bow on the gift (pull to open)' }),
        O('tag', 56, 46, 14, 12, { art: 'tag', label: s.tagRead ? 'Gift tag: To Bossworth, from Bossworth' : 'Gift tag' }),
        O('mailbox', 74, 46, 22, 46, { art: 'mailbox', label: 'Mailbox (return to sender)', zone: true, free: true })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'tap:bow':
          api.fail('BONK! A boxing glove on a spring. Who could have predicted this? (Everyone. Everyone could.)', 'pleased');
          return true;
        case 'tap:tag':
          s.tagRead = true;
          api.say('The tag reads: "To: Bossworth. From: Bossworth. DO NOT GIVE TO PLAYER." …That\'s a different gift. Ignore it.', 'panicked');
          return true;
        case 'tap:mailbox':
          api.say('The mailbox. Where things go to become someone else\'s problem.', 'neutral');
          return true;
        case 'holdstart:gift':
          s.shaking = true;
          s.shakeTimer = api.after(SHAKE_MS, function () {
            s.shakeTimer = null;
            api.secret('shaken');
            api.say('*tick… tick… cuckoo!* It\'s a clock. A cuckoo clock. With a spring-loaded glove. Put it DOWN gently.', 'panicked');
          });
          api.say('Shake shake shake… careful!', 'surprised');
          return true;
        case 'holdend:gift':
          s.shaking = false;
          if (s.shakeTimer) { api.cancel(s.shakeTimer); s.shakeTimer = null; api.say('Hmm. Something rattles inside. Shake it longer if you dare.', 'suspicious'); }
          return true;
        case 'drop:gift':
          s.shaking = false;
          if (a.zone === 'narrator') {
            api.defy('gift');
            api.choice('gift', 'prank');
            api.complete({ line: 'Oh, for ME? How thoughtf— *BONK*. …I deserved that. I hate that I deserved that.', mood: 'defeated' });
          } else if (a.zone === 'mailbox') {
            api.defy('gift');
            api.choice('gift', 'return');
            api.complete({ line: 'Return to sender. Responsible. Boring. Correct. The worst kind of correct.', mood: 'annoyed' });
          } else {
            api.say('You set the gift down. It ticks ominously. Maybe it belongs to someone else?', 'suspicious');
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'tag' }, { drop: ['gift', 'mailbox'] }],
    alternatives: { prank: [{ tap: 'tag' }, { drop: ['gift', 'narrator'] }] },
    secretPaths: { shaken: [{ hold: ['gift', 2200] }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
