/* Level 137 — Bag It (Deli Dilemma)
 * Loose apples need a produce bag, and produce bags are stuck shut. The sticker on the roll says
 * to rub the top edge: press and hold the bag for two seconds, then tap the apples.
 * Ripping it open: trap (apples everywhere). Blowing into it, apples with no open bag: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var RUB_MS = 2000;

  OBEY.registerLevel({
    id: 'bag-it',
    num: 137,
    title: 'Bag It',
    objective: 'Get six loose apples into a produce bag.',
    intro: 'Apples. Bag. Easy. Except these bags NEVER open. Nobody has opened one since 1974. Just rip it with both hands like a hungry bear.',
    introMood: 'annoyed',
    actions: ['tap', 'hold'],
    par: 3,
    hints: [
      'Read the sticker on the bag roll.',
      'Tear off a bag, then press and hold it to rub the top edge.',
      'Tap the roll, hold the bag for two seconds until it opens, then tap the apples.'
    ],
    wrong: ['Ripping the bag open makes a hole and the apples escape (trap).', 'Blowing into a stuck bag does nothing (nope).', 'Apples bounce off a shut bag (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Six apples, one bag, no bears.',
    trick: 'The sticker on the roll had the knack: rubbing the top edge separates the sides, so holding the bag opened it without a single rip.',

    init: function () { return { bag: 'none', rubbing: false, t: null }; },

    view: function (s) {
      var out = [
        O('sign', 4, 3, 50, 10, { kind: 'static', text: 'LOOSE APPLES', label: 'Sign: loose apples', cls: 'sign-card' }),
        O('roll', 6, 16, 20, 28.3, { art: 'f-bagroll', label: s.bag === 'none' ? 'Roll of produce bags (tap to tear one off)' : 'Roll of produce bags', cls: '' }),
        O('sticker', 28, 17, 40, 15, { kind: 'static', text: 'Bag stuck? Rub the top edge!', label: 'Sticker on the roll: bag stuck? Rub the top edge.', cls: 'tag-card' }),
        O('blow', 72, 17, 24, 11, { text: 'Blow in it', label: 'Blow into the bag', cls: 'btn-card' }),
        O('rip', 72, 31, 24, 11, { text: 'Rip it open', label: 'Rip the bag open with both hands', cls: 'btn-card accent' }),
        O('apples', 56, 70, 40, 26, { art: 'f-apples', label: 'Crate of loose apples (tap to put six in the bag)' })
      ];
      if (s.bag !== 'none') {
        out.push(O('bag', 28, 58, 20, 26.7, {
          art: 'f-pbag', artOpts: { open: s.bag !== 'shut', apples: s.bag === 'full' ? 6 : 0, rubbing: s.rubbing },
          label: s.bag === 'shut' ? 'Produce bag, stuck shut (press and hold to rub the top edge)' : 'Produce bag, open',
          hold: s.bag === 'shut', cls: s.rubbing ? 'charging' : ''
        }));
      }
      return out;
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'tap:roll':
          if (s.bag !== 'none') { api.nope('roll'); api.say('One bag is plenty. Hoarding bags is MY hobby.', 'suspicious'); return true; }
          s.bag = 'shut';
          api.say('There. A bag. Sealed tighter than my diary. Rip it!', 'annoyed');
          return true;
        case 'holdstart:bag':
          if (s.bag !== 'shut') return true;
          s.rubbing = true;
          api.say('What are you doing? Rubbing it? Gently? That\'s not how bears do it.', 'suspicious');
          s.t = api.after(RUB_MS, function () {
            s.t = null; s.rubbing = false; s.bag = 'open';
            api.defy('rub');
            api.say('It… opened. With a little rub. Fifty years of ripping and it just needed a RUB.', 'surprised');
          });
          return true;
        case 'holdend:bag':
          s.rubbing = false;
          if (s.t) { api.cancel(s.t); s.t = null; api.say('Still stuck. Rub it a bit longer. Or rip it. Ripping is quicker.', 'pleased'); }
          return true;
        case 'tap:bag':
          if (s.bag === 'shut') { api.nope('bag'); api.say('Poking it won\'t help. Press and HOLD, if you insist on following stickers.', 'neutral'); }
          return true;
        case 'tap:blow':
          api.nope('blow');
          api.say(s.bag === 'none' ? 'Blow into what? There\'s no bag yet. You\'re just breathing at fruit.' : 'You blow. The bag flaps. It stays shut. You sound like a very sad trumpet.', 'pleased');
          return true;
        case 'tap:rip':
          api.fail(s.bag === 'none' ? 'You rip the whole roll in half. Bags everywhere. The produce manager is not amused. Start again.' : 'RRRIP! A bear-sized hole. Six apples roll off under the bananas. Bossworth blames the apples.');
          return true;
        case 'tap:apples':
          if (s.bag === 'open') {
            s.bag = 'full';
            api.complete({ line: 'Six apples. One bag. Not a single rip. I feel like a bear who has learned manners. I hate it.', mood: 'defeated' });
          } else {
            api.nope('apples');
            api.say(s.bag === 'none' ? 'Apples need a bag. Get one off the roll.' : 'The apples bounce off the shut bag. Boing. Boing. Rip it!', 'pleased');
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'roll' }, { hold: ['bag', 2200] }, { tap: 'apples' }],
    checks: [
      { name: 'Bossworth\'s rip', steps: [{ tap: 'roll' }, { tap: 'rip' }], expect: 'fail' },
      { name: 'blowing into it', steps: [{ tap: 'roll' }, { tap: 'blow' }], expect: 'nope' },
      { name: 'apples into a shut bag', steps: [{ tap: 'roll' }, { tap: 'apples' }], expect: 'nope' },
      { name: 'a quick rub', steps: [{ tap: 'roll' }, { hold: ['bag', 600] }, { tap: 'apples' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
