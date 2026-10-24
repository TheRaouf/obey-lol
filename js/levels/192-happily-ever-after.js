/* Level 192 — Happily Ever After (Spellbook Spire)
 * The top of the wizard's tower. A plaque: "SPELL OF THE PRETEND KINGDOM — the castle, the crown and
 * the king last only while this candle burns." Bossworth begs you to guard it and light MORE candles.
 * Blow it out (press and hold the candle) and the whole fairy tale folds away, revealing the ordinary
 * EXIT door of Bossworth's usual room.
 * Wrong: lighting more candles (nope, the kingdom grows a turret); a quick puff (nope, it relights);
 * the throne-room door while the spell holds (trap, it leads back to the moat).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BLOW_MS = 1000;

  OBEY.registerLevel({
    id: 'happily-ever-after',
    num: 192,
    title: 'Happily Ever After',
    objective: 'Find the way out of the fairy tale.',
    intro: 'Guard that candle with your LIFE! In fact, light more candles — make my kingdom bigger! And whatever you do, do not read the plaque.',
    introMood: 'panicked',
    actions: ['hold', 'tap', 'read'],
    par: 2,
    hints: [
      'Read the plaque Bossworth told you not to read.',
      'The whole kingdom lasts only while that one candle burns. Candles go out if you blow on them — slowly and steadily.',
      'Press and hold the candle to blow it out, then use the EXIT door that appears.'
    ],
    wrong: ['Lighting more candles only makes the kingdom bigger (nope).', 'A quick puff just makes the flame flicker (nope).', 'The castle door leads back round to the moat (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'The end. I was a king for a whole chapter. It was the best chapter. Do not tell me otherwise.',
    trick: 'The plaque said the pretend kingdom lasted only while the candle burned, so blowing it out ended the fairy tale and revealed the real exit.',

    init: function () { return { lit: true, extra: 0, blowing: false }; },

    view: function (s) {
      if (!s.lit) {
        return [
          O('note', 4, 4, 60, 14, { kind: 'static', text: 'THE END (of the kingdom)', label: 'A note: the end, of the kingdom', cls: 'sign-card' }),
          O('crown', 10, 66, 22, 12, { kind: 'static', art: 'h-crown', artOpts: { paper: true }, label: 'A paper crown on the floor' }),
          O('table', 34, 66, 32, 12, { kind: 'static', art: 'table', label: '' }),
          O('candle', 44, 44, 12, 26, { kind: 'static', art: 'h-candle', artOpts: { lit: false }, label: 'The candle, blown out' }),
          O('exit', 74, 36, 24, 40, { art: 'door', artOpts: { sign: 'EXIT' }, label: 'An ordinary door marked EXIT' })
        ];
      }
      return [
        O('plaque', 4, 4, 58, 24, { kind: 'static', text: 'SPELL OF THE PRETEND KINGDOM\nThe castle, the crown and the king last only while this candle burns.', label: 'Plaque: spell of the pretend kingdom. The castle, the crown and the king last only while this candle burns.', cls: 'book-card' }),
        O('b1', 68, 4, 12, 24, { kind: 'static', art: 'h-banner', artOpts: { color: '#9b5de5' }, label: '' }),
        O('b2', 84, 4, 12, 24, { kind: 'static', art: 'h-banner', artOpts: { color: '#e5243b' }, label: '' }),
        O('count', 66, 30, 32, 10, { kind: 'static', text: 'Turrets: ' + (4 + s.extra), label: 'The kingdom has ' + (4 + s.extra) + ' turrets', cls: 'tag-card' }),
        O('table', 34, 66, 32, 12, { kind: 'static', art: 'table', label: '' }),
        O('candle', 44, 44, 12, 26, { art: 'h-candle', artOpts: { lit: true }, hold: true, cls: s.blowing ? 'charging' : '', label: 'The kingdom candle, burning (press and hold to blow on it)' }),
        O('castle', 74, 42, 24, 34, { art: 'door', artOpts: { sign: 'CASTLE' }, label: 'A door marked CASTLE' }),
        O('more', 4, 84, 44, 12, { text: 'Light MORE candles', label: 'Light more candles', cls: 'btn-card accent' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'tap:more':
          s.extra++;
          api.nope('more');
          api.say('Yes! Another candle! The kingdom sprouts a new turret! …And the stairs just got longer. Oh. That is a lot of stairs.', 'pleased');
          return true;
        case 'tap:castle':
          api.fail('You open the CASTLE door and walk… straight back out over the drawbridge, past the moat, to the very start. Fairy tales go round in circles.');
          return true;
        case 'tap:candle':
          api.say('Tapping a candle does nothing. Blowing on it is long and slow. NOT that you should. Guard it!', 'panicked');
          return true;
        case 'holdstart:candle':
          s.blowing = true;
          api.say('What are you doing? Why are you taking a deep breath? STOP BREATHING AT MY KINGDOM.', 'panicked');
          return true;
        case 'holdend:candle':
          s.blowing = false;
          if ((a.ms || 0) < BLOW_MS) {
            api.nope('candle');
            api.say('Phew. A little puff. It flickered and came back. Fairy tales are tougher than that.', 'pleased');
            return true;
          }
          s.lit = false;
          api.defy('candle');
          api.say('Fwoooo… The candle goes out. The banners fold up, the turrets pop like bubbles, my crown is… paper? It was always paper. There is a door marked EXIT.', 'defeated');
          return true;
        case 'tap:exit':
          if (s.lit) return false;
          api.complete({ line: 'And they all lived happily ever after. Except me. I lived moderately ever after, with a paper crown.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ hold: ['candle', 1500] }, { tap: 'exit' }],
    checks: [
      { name: 'light more candles', steps: [{ tap: 'more' }], expect: 'nope' },
      { name: 'quick puff', steps: [{ hold: ['candle', 300] }], expect: 'nope' },
      { name: 'castle door', steps: [{ tap: 'castle' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
