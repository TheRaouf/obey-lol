/* Level 189 — The Hourglass (Spellbook Spire)
 * The wizard's door is sealed until the hourglass runs out. The top bulb holds about 57 seconds of
 * sand; the bottom holds 3. Bossworth: "Don't touch it, you'll only reset it." Flipping it puts the
 * 3 seconds on top, so it runs out almost at once. Waiting the full minute also works.
 * Ruin: smash it with the hammer — sand everywhere, the door opens, Bossworth mourns his antique.
 * Wrong: the sealed door (nope); flipping again after it runs out re-seals it (nope-ish, shown).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TOTAL = 60;

  OBEY.registerLevel({
    id: 'the-hourglass',
    num: 189,
    title: 'The Hourglass',
    objective: 'Get through the wizard\'s sealed door.',
    intro: 'The wizard\'s door stays sealed until the hourglass runs out. About an hour. Do NOT touch the hourglass — you will only reset it. Sit. Wait. Suffer.',
    introMood: 'neutral',
    actions: ['tap', 'wait', 'logic'],
    par: 2,
    hints: [
      'Compare how much sand is in the top bulb with how much is in the bottom.',
      'Turning an hourglass over swaps the bulbs. The little bit at the bottom would end up on top.',
      'Flip the hourglass, wait three seconds for the top to empty, then open the door.'
    ],
    wrong: ['The door will not open while sand is still running (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Three seconds instead of an hour. Well, a minute. I may have exaggerated the hour.',
    trick: 'Flipping the hourglass swapped the bulbs, so the three seconds of sand at the bottom became the top and ran out almost at once.',

    init: function () { return { top: TOTAL - 3, bottom: 3, broken: false }; },

    onStart: function (s, api) {
      api.every(1000, function () {
        if (s.broken || s.top <= 0) return;
        s.top--; s.bottom++;
        if (s.top === 0) api.say('The last grain drops. The seal on the door fizzles out. Well. That was… quicker than an hour.', 'surprised');
      });
    },

    view: function (s) {
      var open = s.broken || s.top === 0;
      return [
        O('plaque', 4, 4, 52, 14, { kind: 'static', text: 'Door sealed until the sand runs out', label: 'Plaque: door sealed until the sand runs out', cls: 'plaque-card' }),
        O('sand', 4, 21, 46, 13, { kind: 'static', text: s.broken ? 'Sand: everywhere' : 'Top: ' + s.top + ' s · Bottom: ' + s.bottom + ' s', label: s.broken ? 'Sand is everywhere' : 'Top bulb: ' + s.top + ' seconds of sand. Bottom bulb: ' + s.bottom + ' seconds.', cls: 'tag-card' }),
        O('hammer', 64, 6, 16, 16, { art: 'h-hammer', label: 'The wizard\'s hammer on a hook' }),
        O('owlperch', 82, 17, 16, 6, { kind: 'static', art: 'shelf' }),
        O('owl', 84, 4, 12, 16, { kind: 'static', art: 'h-owl', artOpts: { asleep: true }, label: 'A sleeping owl on a perch' }),
        O('table', 18, 66, 42, 12, { kind: 'static', art: 'table', label: '' }),
        O('glass', 30, 44, 18, 26, { art: 'h-hourglass', artOpts: { top: s.top / TOTAL, bottom: s.bottom / TOTAL, broken: s.broken }, disabled: s.broken, label: s.broken ? 'The hourglass, smashed' : 'Hourglass: ' + s.top + ' seconds of sand on top, ' + s.bottom + ' at the bottom (tap to turn it over)' }),
        O('door', 72, 36, 24, 40, { art: 'door', artOpts: { sign: open ? 'OPEN' : 'SEALED', open: open }, label: open ? 'The wizard\'s door, unsealed' : 'The wizard\'s door, sealed' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'glass': {
          if (s.broken) return true;
          var t = s.top; s.top = s.bottom; s.bottom = t;
          api.defy('flip');
          if (s.top === 0) api.say('You flipped it, but the top is empty. Nothing is running. Riveting.', 'neutral');
          else if (s.top >= TOTAL - 5 && s.bottom === 0) api.say('You flipped it back! All ' + s.top + ' seconds are running again and the seal is BACK. Ha!', 'pleased');
          else if (s.top <= 5) api.say('You FLIPPED it? I said that resets it! …Only ' + s.top + ' seconds of sand on top now. That is not a reset. That is a shortcut.', 'panicked');
          else api.say('Flipped. ' + s.top + ' seconds on top now. Keep fiddling, I love watching you suffer.', 'pleased');
          return true;
        }
        case 'hammer':
          s.broken = true;
          api.complete({ ruin: 'sand-everywhere', line: 'SMASH. You broke the wizard\'s antique hourglass. Sand in my crown, sand in my shoes, sand in places kings do not discuss. The door is open. I am not okay.', mood: 'panicked' });
          return true;
        case 'door':
          if (s.top > 0 && !s.broken) {
            api.nope('door');
            api.say('Sealed. ' + s.top + ' seconds of sand to go. Or an hour. I am not good with sand.', 'pleased');
            return true;
          }
          api.complete({ line: 'Through the wizard\'s door. You beat an hourglass by turning it upside down. Which is how you use an hourglass. I knew that.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'glass' }, { wait: 3500 }, { tap: 'door' }],
    alternatives: { patient: [{ wait: 58000 }, { tap: 'door' }] },
    ruinPaths: { 'sand-everywhere': [{ tap: 'hammer' }] },
    checks: [
      { name: 'sealed door', steps: [{ tap: 'door' }], expect: 'nope' },
      { name: 'flip back after it runs out re-seals', steps: [{ tap: 'glass' }, { wait: 3500 }, { tap: 'glass' }, { tap: 'door' }], expect: 'nope' },
      { name: 'waiting longer is fine', steps: [{ tap: 'glass' }, { wait: 120000 }, { tap: 'door' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
