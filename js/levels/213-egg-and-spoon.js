/* Level 213 — Egg and Spoon (Hurdle Hollow)
 * The race egg is an ostrich egg (the crate is stamped OSTRICH). Bossworth pushes the "official"
 * teaspoon. The rule only says the egg must stay ON a spoon, and the soup ladle is a spoon.
 * Solution: drag the egg onto the ladle, then GO.
 * Wrong: teaspoon + GO (trap: splat); the fork (nope: egg drops through); GO with no egg (nope).
 * Ruin: egg-on-face — drop the egg on Bossworth.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var NAMES = { tea: 'the teaspoon', ladle: 'the soup ladle' };

  OBEY.registerLevel({
    id: 'egg-and-spoon',
    num: 213,
    title: 'Egg and Spoon',
    objective: 'Carry the egg over the finish line on a spoon.',
    intro: 'Sports day! I\'m the referee, obviously. Egg and spoon race: use the official teaspoon. Lovely and shiny. The egg is a perfectly normal size. Don\'t look at it.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'observe'],
    par: 2,
    narratorZone: true,
    hints: [
      'Have a good look at the size of that egg. And at where it came from.',
      'The rule only says the egg must stay on a spoon. It never says which spoon.',
      'Drag the egg onto the big soup ladle, then press GO.'
    ],
    wrong: ['An ostrich egg on a teaspoon falls off at the first step (trap).', 'The fork is not a spoon: the egg drops straight through (nope).', 'GO without the egg on a spoon does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One egg, one ladle, one very sulky referee.',
    trick: 'It was an ostrich egg, and the rule only said "a spoon", so the deep soup ladle was the spoon that could carry it.',

    init: function () { return { on: null }; },

    view: function (s) {
      return [
        O('grass', 0, 74, 100, 26, { kind: 'static', art: 'j-grass' }),
        O('rulesign', 4, 2, 28, 17, { kind: 'static', text: 'RACE RULE', label: 'Race rule sign', cls: 'sign-card' }),
        O('rules', 35, 3, 44, 15, { kind: 'static', text: 'The egg must stay on a spoon.', label: 'Race rule: the egg must stay on a spoon.', cls: 'honest-card' }),
        O('flag', 84, 26, 12, 50, { kind: 'static', art: 'j-flag', label: 'Finish line flag' }),
        O('table', 4, 62, 54, 14, { kind: 'static', art: 'table' }),
        O('tea', 5, 49, 16, 14, { art: 'j-spoon', artOpts: { kind: 'tea' }, label: s.on === 'tea' ? 'Teaspoon, with the egg wobbling on top' : 'Teaspoon (the official one)', zone: true }),
        O('ladle', 23, 47, 17, 16, { art: 'j-spoon', artOpts: { kind: 'ladle' }, label: s.on === 'ladle' ? 'Soup ladle, with the egg sitting snugly in it' : 'Soup ladle (a big, deep spoon)', zone: true }),
        O('fork', 42, 49, 15, 14, { art: 'j-spoon', artOpts: { kind: 'fork' }, label: 'Fork', zone: true }),
        O('crate', 60, 58, 22, 18, { kind: 'static', art: 'j-crate', artOpts: { stamp: 'OSTRICH' }, label: 'Egg crate stamped OSTRICH' }),
        O('egg', 62, 37, 18, 22, { art: 'j-egg', label: 'The race egg (enormous). Drag it onto a spoon.', drag: true, hidden: !!s.on }),
        O('held', s.on === 'tea' ? 4 : 22.5, s.on === 'tea' ? 40 : 37, 18, 22, { kind: 'static', art: 'j-egg', label: s.on ? 'The egg, sitting on ' + NAMES[s.on] : '', hidden: !s.on }),
        O('go', 4, 84, 46, 12, { text: 'GO!', label: 'Start the race', cls: 'btn-card big' }),
        O('carry', 54, 84, 42, 12, { kind: 'static', text: s.on ? 'Egg on: ' + (s.on === 'tea' ? 'teaspoon' : 'ladle') : 'Egg on: nothing yet', label: s.on ? 'The egg is on ' + NAMES[s.on] : 'The egg is not on a spoon yet', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'egg') {
        if (a.zone === 'narrator') {
          api.complete({ ruin: 'egg-on-face', line: 'You gave the egg to ME? It\'s an OSTRICH egg! *SPLOT* …I have yolk in my ears. The referee is now an omelette. Race abandoned!', mood: 'panicked' });
          return true;
        }
        if (a.zone === 'fork') {
          api.nope('fork');
          api.say('*clonk* Straight between the prongs. A fork is a spoon with all the useful bits missing.', 'pleased');
          return true;
        }
        if (a.zone === 'tea') {
          s.on = 'tea';
          api.say('Perfect! The official teaspoon. Tiny spoon, enormous egg. A classic combination. Press GO!', 'pleased');
          return true;
        }
        if (a.zone === 'ladle') {
          s.on = 'ladle';
          api.defy('ladle');
          api.say('The LADLE? That\'s for soup! …It is technically a spoon. A soup spoon. I hate technically.', 'annoyed');
          return true;
        }
        api.say('You put the egg down. It looks at you. Eggs can\'t look at you. This one manages.', 'suspicious');
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'go':
          if (!s.on) {
            api.nope('go');
            api.say('Running with no egg is just running. Put the egg on a spoon first.', 'annoyed');
          } else if (s.on === 'tea') {
            api.fail('Three steps, one wobble, SPLAT. An ostrich egg does not fit on a teaspoon. Who knew? (Everyone.) New egg!');
          } else {
            api.complete({ line: 'Over the line, egg still on the spoon. The ladle. The SOUP ladle. The rules didn\'t ban it. I\'m adding a rule. Rule two: no ladles.', mood: 'defeated' });
          }
          return true;
        case 'tea': case 'ladle': case 'fork':
          if (s.on === a.target) {
            s.on = null;
            api.say('You lift the egg back off. Second thoughts? I love second thoughts. Especially yours.', 'suspicious');
          } else {
            api.say(a.target === 'tea' ? 'The official teaspoon! Shiny. Regulation. Small. Very small.' : (a.target === 'ladle' ? 'That\'s a soup ladle. Nobody races with a ladle. Nobody.' : 'A fork. For eating the egg afterwards, presumably.'), 'neutral');
          }
          return true;
      }
      return false;
    },

    solution: [{ drop: ['egg', 'ladle'] }, { tap: 'go' }],
    checks: [
      { name: 'official teaspoon', steps: [{ drop: ['egg', 'tea'] }, { tap: 'go' }], expect: 'fail' },
      { name: 'the fork', steps: [{ drop: ['egg', 'fork'] }], expect: 'nope' },
      { name: 'go with no egg', steps: [{ tap: 'go' }], expect: 'nope' },
      { name: 'swap spoons', steps: [{ drop: ['egg', 'tea'] }, { tap: 'tea' }, { drop: ['egg', 'ladle'] }, { tap: 'go' }], expect: 'complete' }
    ],
    ruinPaths: { 'egg-on-face': [{ drop: ['egg', 'narrator'] }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
