/* Level 68 — Cabinet Code
 * The bathroom cabinet has a 3-digit lock. Bossworth: "It's 1-2-3. Nobody would guess 1-2-3."
 * The sticky note on the mirror: "Code: ducks, then toothbrushes, then towels." Count them in the room:
 * 4 ducks (three on the bath edge, one on the windowsill), 2 toothbrushes, 3 towels → 4-2-3.
 * Wrong: 1-2-3 sets off the cabinet's anti-Bossworth alarm (trap); any other wrong code clears (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CODE = '423';
  var KEYS = [1, 2, 3, 4, 5, 6];

  OBEY.registerLevel({
    id: 'cabinet-code',
    num: 68,
    title: 'Cabinet Code',
    objective: 'Open the bathroom cabinet.',
    intro: 'The cabinet code is 1-2-3. Nobody would ever guess 1-2-3. Genius. Do NOT read the sticky note on the mirror. It\'s private. It\'s a love letter. To me. From me.',
    introMood: 'pleased',
    actions: ['tap', 'count', 'read'],
    par: 3,
    hints: [
      'Read the sticky note on the mirror. The code is hiding in the room.',
      'Count the rubber ducks (don\'t miss the windowsill), then the toothbrushes, then the towels.',
      'Four ducks, two toothbrushes, three towels: press 4, 2, 3.'
    ],
    wrong: ['Entering 1-2-3 sets off the alarm (trap).', 'Any other wrong code just clears (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Cabinet open. Inside: plasters, cotton buds and a framed photo of Bossworth.',
    trick: 'The note turned the room into the code: count ducks, toothbrushes and towels instead of trusting 1-2-3.',

    init: function () { return { entry: '', open: false }; },

    view: function (s) {
      var shown = (s.entry + '___').slice(0, 3).split('').join(' ');
      var objs = [
        O('cabinet', 4, 4, 40, 38, { kind: 'static', art: 'b-cabinet', artOpts: { open: s.open }, label: s.open ? 'Bathroom cabinet, open' : 'Bathroom cabinet with a 3-digit lock' }),
        O('display', 4, 44, 40, 10, { kind: 'static', text: 'CODE: ' + shown, label: 'Code entered: ' + (s.entry || 'nothing yet'), cls: 'display-card' })
      ];
      KEYS.forEach(function (k, i) {
        objs.push(O('k' + k, 4 + (i % 3) * 14, 57 + Math.floor(i / 3) * 14, 12, 12, { text: String(k), label: 'Keypad ' + k, cls: 'btn-card key' }));
      });
      objs.push(O('note', 50, 4, 46, 20, { kind: 'static', text: 'Cabinet code:\nducks, then toothbrushes, then towels.', label: 'Sticky note on the mirror: cabinet code is ducks, then toothbrushes, then towels', cls: 'ticket-card' }));
      [50, 63, 76].forEach(function (x, i) {
        objs.push(O('duck' + i, x, 28, 12, 11, { art: 'b-duck', free: true, label: 'Rubber duck on the bath edge' }));
      });
      objs.push(O('bath', 48, 38, 48, 6, { kind: 'static', art: 'shelf', label: 'Bath-edge shelf' }));
      objs.push(O('cup', 50, 50, 20, 28, { kind: 'static', art: 'b-toothcup', artOpts: { n: 2 }, label: 'Cup with 2 toothbrushes' }));
      ['#ff77b4', '#7fb2ff', '#ffd23f'].forEach(function (c, i) {
        objs.push(O('towel' + i, 73 + i * 8, 50, 7, 28, { kind: 'static', art: 'b-towel', artOpts: { color: c }, label: i === 0 ? 'Towel rail with 3 towels' : '' }));
      });
            objs.push(O('sill', 47, 94, 18, 5, { kind: 'static', art: 'shelf', label: 'Windowsill' }));
      objs.push(O('duck3', 50, 83, 12, 11, { art: 'b-duck', free: true, label: 'Rubber duck on the windowsill' }));
      objs.push(O('floor', 68, 84, 28, 12, { kind: 'static', text: 'Squeak responsibly.', label: '', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (/^duck\d$/.test(a.target)) { api.say('SQUEAK. Stop counting my ducks. They\'re not for counting. They\'re for… squeaking.', 'suspicious'); return true; }
      var m = /^k(\d)$/.exec(a.target);
      if (!m) return false;
      s.entry += m[1];
      if (s.entry.length < 3) return true;
      var e = s.entry;
      s.entry = '';
      if (e === CODE) {
        s.open = true;
        api.defy('code');
        api.complete({ line: 'Four-two-three? How did you… you READ my love letter! It was private! It was about ducks!', mood: 'defeated' });
      } else if (e === '123') {
        api.fail('1-2-3? WEE-OO! The cabinet\'s anti-Bossworth alarm blares: "INTRUDER USING OBVIOUS CODE." Bossworth pretends not to know you. Reset!');
      } else {
        api.nope();
        api.say(e + '? Nope. Bzzt. Try 1-2-3. Trust me. Please trust me.', 'pleased');
      }
      return true;
    },

    solution: [{ tap: 'k4' }, { tap: 'k2' }, { tap: 'k3' }],
    checks: [
      { name: 'Bossworth\'s code', steps: [{ tap: 'k1' }, { tap: 'k2' }, { tap: 'k3' }], expect: 'fail' },
      { name: 'miss the windowsill duck', steps: [{ tap: 'k3' }, { tap: 'k2' }, { tap: 'k3' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
