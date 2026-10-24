/* Level 146 — Security Tag (Scanner Scramble)
 * You've paid for a kettle, but the cashier forgot its security tag. The pad on the counter is the
 * tag remover: press and hold it for two seconds, then walk through the gates.
 * Walking out tagged: trap (alarm). Pulling the tag off by hand: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var HOLD_MS = 2000;

  OBEY.registerLevel({
    id: 'security-tag',
    num: 146,
    title: 'Security Tag',
    objective: 'Leave the shop with the kettle you paid for.',
    intro: 'We PAID. Walk straight out. Those gates are decorative, like my diploma. That grey lump on the box? Bonus handle. Very modern.',
    introMood: 'pleased',
    actions: ['hold', 'tap'],
    par: 2,
    hints: [
      'That grey lump on the box is a security tag, and the gates are there to notice it.',
      'The round pad on the counter is a tag remover. Read its label.',
      'Press and hold the tag remover for two seconds, then walk through the gates.'
    ],
    wrong: ['Walking through the gates with the tag on sets off the alarm (trap).', 'Security tags don\'t come off by hand (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Paid, untagged, and out without a single WEE-OO.',
    trick: 'A paid item still sets the gates off if it keeps its security tag, so the remover pad on the counter had to come before the exit.',

    init: function () { return { tagged: true, holding: false, t: null }; },

    view: function (s) {
      return [
        O('receipt', 4, 4, 48, 13, { kind: 'static', text: 'PAID: kettle £20 ✓', label: 'Receipt: kettle, twenty pounds, paid', cls: 'ticket-card' }),
        O('exitSign', 66, 4, 30, 11, { kind: 'static', text: 'EXIT', label: 'Exit sign', cls: 'sign-card' }),
        O('pad', 4, 21, 52, 11, { kind: 'static', text: 'Tag remover: hold 2 sec', label: 'Label: tag remover, hold for two seconds', cls: 'tag-card' }),
        O('counter', 4, 54, 56, 20.5, { kind: 'static', art: 'f-counter', label: '' }),
        O('kettle', 8, 36.5, 18, 18, { kind: 'static', art: 'f-boxed', artOpts: { tagged: s.tagged }, label: 'Boxed kettle' + (s.tagged ? ' with a grey security tag clipped to it' : ', tag removed') }),
        O('remover', 30, 42, 24, 15.4, { art: 'f-detacher', label: 'Tag remover pad (press and hold)', hold: true, cls: s.holding ? 'charging' : '' }),
        O('gates', 66, 45, 30, 30, { art: 'f-gates', label: 'Security gates at the exit (walk through)' }),
        O('pull', 4, 82, 40, 12, { text: 'Pull the tag off', label: 'Pull the security tag off by hand', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'holdstart:remover':
          if (!s.tagged) return true;
          s.holding = true;
          api.say('Why are you pressing the bonus handle onto the counter? Stop that. It\'s… clicking. Why is it clicking?', 'suspicious');
          s.t = api.after(HOLD_MS, function () {
            s.t = null; s.holding = false; s.tagged = false;
            api.defy('tag');
            api.say('CLICK. The bonus handle fell off. Fine. It was an ugly handle anyway.', 'annoyed');
          });
          return true;
        case 'holdend:remover':
          s.holding = false;
          if (s.t) { api.cancel(s.t); s.t = null; api.say('Not long enough. The tag is still there, holding on like a limpet.', 'pleased'); }
          return true;
        case 'tap:remover':
          api.say(s.tagged ? 'Tapping it does nothing. Not that it should. It\'s a press-and-hold sort of pad, apparently.' : 'The tag\'s already off.', 'neutral');
          return true;
        case 'tap:pull':
          api.nope('pull');
          api.say(s.tagged ? 'You tug. The tag holds on like a crab at a beach party. Those things need a special magnet.' : 'There\'s nothing left to pull. Except my leg.', 'pleased');
          return true;
        case 'tap:gates':
          if (s.tagged) {
            api.fail('WEE-OO WEE-OO WEE-OO! The gates go off. Everyone stares. Bossworth waves the receipt like a white flag. Back to the till.');
          } else {
            api.complete({ line: 'Out! Silent gates. No staring. It\'s almost as if the gates weren\'t decorative. Don\'t tell my diploma.', mood: 'defeated' });
          }
          return true;
      }
      return false;
    },

    solution: [{ hold: ['remover', 2200] }, { tap: 'gates' }],
    checks: [
      { name: 'Bossworth\'s walk-out', steps: [{ tap: 'gates' }], expect: 'fail' },
      { name: 'pulling it off', steps: [{ tap: 'pull' }], expect: 'nope' },
      { name: 'a quick press', steps: [{ hold: ['remover', 500] }, { tap: 'gates' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
