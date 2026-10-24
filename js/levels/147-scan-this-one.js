/* Level 147 — Scan This One (Scanner Scramble)
 * The reduced cake from the bakery has two barcodes: the big original one (£4) and the small yellow
 * sticker's (£1). The sticker says to scan it. Scan the yellow one and pay with your £1.50.
 * The big barcode: trap (£4, can't pay). Peeling the sticker off: trap. Paying with nothing scanned: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'scan-this-one',
    num: 147,
    title: 'Scan This One',
    objective: 'Pay for the reduced cake with your £1.50.',
    intro: 'Scan the BIG barcode. Big barcodes are the proper ones. And peel off that ugly yellow sticker first. It\'s ruining the look of my cake.',
    introMood: 'suspicious',
    actions: ['tap', 'read'],
    par: 2,
    hints: [
      'The cake has two barcodes. Read what the yellow sticker says.',
      'A reduced sticker carries its own barcode with the new price.',
      'Scan the yellow sticker\'s barcode, then pay.'
    ],
    wrong: ['The big barcode rings up the old £4 price (trap).', 'Peeling off the sticker loses the reduction (trap).', 'Paying before scanning anything (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One pound of cake, properly scanned.',
    trick: 'A reduced sticker brings its own barcode, so scanning the little yellow one, as it asked, rang up £1 instead of the original £4.',

    init: function () { return { scanned: false }; },

    view: function (s) {
      return [
        O('sticker', 48, 4, 48, 15, { kind: 'static', text: 'Yellow sticker: REDUCED £1. Scan me!', label: 'The yellow sticker reads: reduced to one pound, scan this barcode', cls: 'ticket-card' }),
        O('machine', 4, 24, 40, 52, { kind: 'static', art: 'f-selfcheck', label: 'Self-checkout machine' }),
        O('screen', 11, 29, 26, 13.5, { kind: 'static', text: s.scanned ? 'Cake £1.00' : 'Scan an item', label: 'Screen: ' + (s.scanned ? 'cake, one pound' : 'scan an item'), cls: 'display-card' + (s.scanned ? ' ready' : '') }),
        O('box', 48, 28, 48, 32.7, { kind: 'static', art: 'f-cakebox', label: 'Boxed cake with two barcodes on the front' }),
        O('stand', 46, 60, 52, 10.4, { kind: 'static', art: 'table', label: '' }),
        O('big', 51, 45, 22, 12, { art: 'f-barcode', label: 'Big white barcode, the original price, four pounds' }),
        O('yellow', 75, 45, 19, 12, { art: 'f-barcode', artOpts: { yellow: true }, label: 'Small yellow reduced sticker barcode, one pound', hidden: false }),
        O('peel', 4, 84, 28, 12, { text: 'Peel sticker', label: 'Peel the yellow sticker off', cls: 'btn-card accent' }),
        O('purse', 34, 84, 28, 12, { kind: 'static', text: 'Purse: £1.50', label: 'Your purse holds one pound fifty', cls: 'tag-card' }),
        O('pay', 64, 84, 32, 12, { text: 'PAY', label: 'Pay', cls: 'btn-card big' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'big':
          api.fail('BEEP. "Cake: £4.00." Your purse has £1.50. The machine waits. The queue waits. Bossworth hums. An assistant voids it and sends you back.');
          return true;
        case 'yellow':
          s.scanned = true;
          api.say('Beep. One pound. Hmm. The little ugly barcode is… cheaper. I still don\'t like its face.', 'annoyed');
          return true;
        case 'peel':
          api.fail('You peel off the sticker. Underneath: the big barcode, £4.00, and nothing else. The bakery lady takes the cake back to re-sticker it. Tomorrow.');
          return true;
        case 'pay':
          if (s.scanned) {
            api.complete({ line: 'One pound, paid. Fifty pence change. The small barcode wins. I take back what I said about its face. Mostly.', mood: 'defeated' });
          } else {
            api.nope('pay');
            api.say('Pay for what? You haven\'t scanned anything. The machine is not psychic. Unlike me.', 'pleased');
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'yellow' }, { tap: 'pay' }],
    checks: [
      { name: 'the big barcode', steps: [{ tap: 'big' }], expect: 'fail' },
      { name: 'peeling the sticker', steps: [{ tap: 'peel' }], expect: 'fail' },
      { name: 'paying first', steps: [{ tap: 'pay' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
