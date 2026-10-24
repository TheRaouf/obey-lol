/* Level 182 — Light the Oven (Feast Fiasco)
 * The royal bread oven is cold and the matches are soggy. A baby dragon in the kitchen sneezes fire
 * when peppered ("NO PEPPER!"). Bossworth forbids it. Open the oven door, turn the dragon to face the
 * oven, then pepper it: the sneeze lights the oven.
 * Wrong: pepper while it faces the cake (trap, charcoal cake); soggy matches (nope).
 * Ruin: pepper it at the CLOSED oven — the flame bounces up and singes Bossworth's portrait.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'light-the-oven',
    num: 182,
    title: 'Light the Oven',
    objective: 'Light the royal oven for the feast.',
    intro: 'The royal oven is stone cold and the matches are soggy. Whatever you do, do NOT pepper the baby dragon. It sneezes fire. Terrible habit. Disgusting.',
    introMood: 'suspicious',
    actions: ['tap', 'sequence'],
    par: 3,
    hints: [
      'The dragon\'s warning sign tells you exactly what a sneeze does.',
      'A fire-sneeze goes wherever the dragon is facing. Make sure it is facing an OPEN oven.',
      'Open the oven door, tap the dragon to turn it towards the oven, then use the pepper mill.'
    ],
    wrong: ['Peppering the dragon while it faces the cake burns the cake (trap).', 'The matches are soggy (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Oven lit by dragon sneeze. The bread will taste faintly of adventure.',
    trick: 'The "do not" was the answer: a peppered dragon sneezes fire, so aiming it into the open oven lit it where soggy matches could not.',

    init: function () { return { open: false, face: 'cake' }; },

    view: function (s) {
      return [
        O('warn', 4, 4, 46, 14, { kind: 'static', text: 'FIRE-SNEEZER: NO PEPPER!', label: 'Sign: fire-sneezer, no pepper!', cls: 'sign-card' }),
        O('portrait', 66, 4, 26, 28, { kind: 'static', art: 'h-bossportrait', label: 'Portrait of King Bossworth above the oven' }),
        O('ftag', 28, 38, 34, 10, { kind: 'static', text: 'Dragon faces: ' + (s.face === 'cake' ? 'the cake' : 'the oven'), label: 'The dragon is facing ' + (s.face === 'cake' ? 'the cake' : 'the oven'), cls: 'tag-card' }),
        O('table', 2, 68, 28, 10, { kind: 'static', art: 'table', label: '' }),
        O('cake', 6, 50, 20, 19, { kind: 'static', art: 'h-cake', label: 'The king\'s feast cake, on a table' }),
        O('dragon', 34, 50, 26, 26, { art: 'h-dragon', artOpts: { mood: 'awake', face: s.face === 'cake' ? 'left' : 'right' }, label: 'Baby dragon facing ' + (s.face === 'cake' ? 'the cake' : 'the oven') + ' (tap to turn it round)' }),
        O('oven', 62, 40, 36, 36, { art: 'h-oven', artOpts: { open: s.open }, label: s.open ? 'Bread oven, door open, cold inside' : 'Bread oven, door shut (tap to open)' }),
        O('pepper', 46, 80, 9, 18, { art: 'h-pepper', label: 'Pepper mill' }),
        O('matches', 6, 84, 18, 11, { art: 'h-matches', label: 'Box of matches, dripping wet' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'matches':
          api.nope('matches');
          api.say('Fizz. Pfft. Soggy. Someone used them to stir the soup. (It was me.)', 'pleased');
          return true;
        case 'oven':
          s.open = !s.open;
          api.say(s.open ? 'Oven open. Cold. Empty. Sad. Like my heart before I was king.' : 'Oven shut again.', 'neutral');
          return true;
        case 'dragon':
          s.face = s.face === 'cake' ? 'oven' : 'cake';
          api.say('The baby dragon shuffles round to face ' + (s.face === 'cake' ? 'the cake' : 'the oven') + '. Why are you aiming my dragon?', 'suspicious');
          return true;
        case 'pepper':
          api.defy('pepper');
          if (s.face === 'cake') {
            api.fail('Grind, grind… ACHOO! A jet of fire hits the feast cake. It is now a feast charcoal. The cooks bake a new one and you start again.');
            return true;
          }
          if (!s.open) {
            api.complete({ ruin: 'singed-portrait', line: 'ACHOO! The flame bounced off the SHUT oven door and straight up into my portrait. My painted eyebrows are gone. The oven is lit (down the chimney). I am not.', mood: 'panicked' });
            return true;
          }
          api.complete({ line: 'Grind… ACHOO! Fire straight into the open oven. It roars into life. I said NO pepper! …The bread smells amazing. I hate it.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'oven' }, { tap: 'dragon' }, { tap: 'pepper' }],
    ruinPaths: { 'singed-portrait': [{ tap: 'dragon' }, { tap: 'pepper' }] },
    checks: [
      { name: 'pepper it facing the cake', steps: [{ tap: 'pepper' }], expect: 'fail' },
      { name: 'try the soggy matches', steps: [{ tap: 'matches' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
