/* Level 84 — Suitcase Squash
 * The suitcase won't close. Bossworth demands you refold all twelve items and NEVER sit on luggage.
 * The travel tip sticker says otherwise: sit on it. Hold the suitcase for 2 s and the zip closes.
 * Obey path (alternative): fold all 12 items. Wrong: let go too soon (nope); plain tap (nope).
 * Ruin: throw everything away — travel light, arrive with nothing.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SIT_MS = 2000, ITEMS = 12;

  OBEY.registerLevel({
    id: 'suitcase-squash',
    num: 84,
    title: 'Suitcase Squash',
    objective: 'Get the suitcase closed.',
    intro: 'Won\'t close? Unpack and refold every item properly. All twelve. Corners crisp! And NEVER sit on a suitcase. Sitting on luggage is for amateurs, toddlers and people who catch trains.',
    introMood: 'neutral',
    actions: ['hold', 'tap', 'choice'],
    par: 1,
    hints: [
      'Someone left a travel tip on the wall. It is shorter than twelve folds.',
      'Press and hold the suitcase to sit on it.',
      'Hold the suitcase for about two seconds until the zip closes (or fold all twelve items, if you love folding).'
    ],
    wrong: ['Hopping off before the zip closes undoes it (nope).', 'Tapping the case just pokes it (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Zipped. Slightly rounder than before, but zipped.',
    trick: 'Twelve neat folds or one good sit: the travel tip knew the shortcut.',

    init: function () { return { left: ITEMS, sitting: false, timer: null, closed: false }; },

    view: function (s) {
      return [
        O('tip', 4, 4, 56, 15, { kind: 'static', text: 'TRAVEL TIP: too full? SIT ON IT!', label: 'Sticker on the wall: travel tip, too full? Sit on it!', cls: 'sign-card' }),
        O('hotel', 66, 4, 30, 15, { kind: 'static', text: 'Check-out: NOW', label: 'Hotel sign: check-out now', cls: 'tag-card' }),
        O('case', 20, 24, 60, 46, { art: 'c-openbag', artOpts: { fill: s.left, closed: s.closed }, label: 'Overstuffed suitcase, ' + s.left + ' items bulging out (press and hold to sit on it)', hold: true, cls: s.sitting ? 'charging' : '' }),
        O('sitter', 42, 16, 14, 18, { kind: 'static', art: 'hero', label: 'You, sitting on the suitcase', hidden: !s.sitting }),
        O('fold', 4, 80, 44, 13, { text: 'Fold one item (' + s.left + ' left)', label: 'Neatly fold one item, ' + s.left + ' left', cls: 'btn-card' }),
        O('bin', 54, 80, 42, 13, { text: 'Throw it all away', label: 'Throw everything in the suitcase away', cls: 'btn-card ghost' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'holdstart:case':
          s.sitting = true;
          api.say('Are you SITTING on it? Get off! Get… it\'s creaking. Is that the zip or my nerves?', 'panicked');
          s.timer = api.after(SIT_MS, function () {
            s.timer = null; s.closed = true; s.sitting = false;
            api.defy('sit');
            api.complete({ line: 'ZZZIP. Closed in two seconds flat, by BOTTOM POWER. Twelve beautiful folds, wasted. I\'d prepared a whole folding speech.', mood: 'defeated' });
          });
          return true;
        case 'holdend:case':
          s.sitting = false;
          if (s.timer) {
            api.cancel(s.timer); s.timer = null;
            api.nope('case');
            api.say('You hopped off and the zip sprang open again. Ha! Luggage respects commitment.', 'laughing');
          }
          return true;
        case 'tap:case':
          api.nope('case');
          api.say('You poke the suitcase. A sock pokes back. Something heavier than a poke is required. Not that I\'m suggesting it.', 'suspicious');
          return true;
        case 'tap:fold':
          s.left--;
          if (s.left <= 0) {
            s.closed = true;
            api.complete({ line: 'All twelve folded. Crisp. Square. Beautiful. The zip glides shut. THIS is how luggage should be treated. I\'m welling up.', mood: 'pleased' });
          } else {
            api.say(['Lovely. Eleven to go.', 'Hospital corners on a T-shirt. Inspired.', 'Keep going. Folding builds character.', 'Is that a sock or a very small jumper? Fold it anyway.'][s.left % 4], 'pleased');
          }
          return true;
        case 'tap:bin':
          api.complete({ ruin: 'travel-light', line: 'You threw EVERYTHING away?! The case closes beautifully, because it\'s EMPTY. You\'ll arrive with nothing but a zip. This is a holiday, not a magic trick!', mood: 'panicked' });
          return true;
      }
      return false;
    },

    solution: [{ hold: ['case', 2200] }],
    alternatives: { obedient: [{ tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }] },
    checks: [
      { name: 'hop off too soon', steps: [{ hold: ['case', 700] }], expect: 'nope' },
      { name: 'just poke it', steps: [{ tap: 'case' }], expect: 'nope' },
      { name: 'a few folds is not enough', steps: [{ tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }], expect: 'playing' }
    ],
    ruinPaths: { 'travel-light': [{ tap: 'bin' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
