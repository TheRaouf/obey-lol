/* Level 54 — Low and Slow
 * Bossworth "reads" Grandma's recipe aloud and swaps the two numbers: 20 degrees for 180 minutes.
 * The recipe card on the counter says Oven 180°, Timer 20 min. Set those, then START.
 * Wrong: START with the timer at zero (nope); START with any other settings, including his (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'low-and-slow',
    num: 54,
    title: 'Low and Slow',
    objective: 'Bake Grandma\'s sponge cake properly.',
    intro: 'Grandma\'s sponge! I\'ve read the recipe: bake at 20 degrees for 180 minutes. Low and slow. I read it myself. Out loud. With feeling.',
    introMood: 'pleased',
    actions: ['tap', 'read'],
    par: 4,
    hints: [
      'Bossworth read the recipe out loud. The recipe card is right there. Compare them.',
      'He swapped the numbers: the card says the oven goes to 180° and the timer to 20 minutes.',
      'Press TEMP + twice (180°), TIMER + once (20 min), then START.'
    ],
    wrong: ['START with the timer at zero does nothing (nope).', 'Baking at any other settings — including Bossworth\'s — ruins the cake (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'A sponge so fluffy it applied for cloud status.',
    trick: 'Bossworth swapped the recipe\'s numbers; the card on the counter had the real ones.',

    init: function () { return { temp: 140, time: 0, baked: false }; },

    view: function (s) {
      return [
        O('recipe', 4, 3, 42, 44, { kind: 'static', text: 'GRANDMA\'S SPONGE\nOven: 180°\nTimer: 20 min\nP.S. Do NOT let Bossworth read this out loud.', label: 'Recipe card: oven 180 degrees, timer 20 minutes. P.S. Do not let Bossworth read this out loud.', cls: 'book-card' }),
        O('oven', 54, 3, 42, 44, { kind: 'static', art: 'b-oven', artOpts: { on: s.baked, cake: true }, label: 'Oven with a cake tin inside' }),
        O('tempd', 4, 52, 42, 11, { kind: 'static', text: 'OVEN ' + s.temp + '°', label: 'Oven temperature: ' + s.temp + ' degrees', cls: 'display-card' }),
        O('tdown', 4, 66, 20, 12, { text: 'TEMP −', label: 'Lower the oven temperature by 20 degrees', cls: 'btn-card' }),
        O('tup', 26, 66, 20, 12, { text: 'TEMP +', label: 'Raise the oven temperature by 20 degrees', cls: 'btn-card' }),
        O('timed', 54, 52, 42, 11, { kind: 'static', text: 'TIMER ' + s.time + ' min', label: 'Timer: ' + s.time + ' minutes', cls: 'display-card' }),
        O('mdown', 54, 66, 20, 12, { text: 'TIMER −', label: 'Take 20 minutes off the timer', cls: 'btn-card' }),
        O('mup', 76, 66, 20, 12, { text: 'TIMER +', label: 'Add 20 minutes to the timer', cls: 'btn-card' }),
        O('start', 30, 84, 40, 12, { text: 'START', label: 'Start baking', cls: 'btn-card big' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'tdown': if (s.temp > 20) s.temp -= 20; else { api.nope(); api.say('20 degrees is as low as it goes. That\'s basically a fridge with ambition.', 'pleased'); } return true;
        case 'tup': if (s.temp < 260) s.temp += 20; else { api.nope(); api.say('260 is the top. Beyond that is "volcano".', 'suspicious'); } return true;
        case 'mdown': if (s.time > 0) s.time -= 20; else { api.nope(); api.say('Negative minutes? Time travel is a different appliance.', 'neutral'); } return true;
        case 'mup': if (s.time < 200) s.time += 20; else { api.nope(); api.say('200 minutes is the maximum. The oven gets bored after that.', 'neutral'); } return true;
        case 'start':
          if (s.time === 0) { api.nope(); api.say('Timer\'s at zero. The cake stares at you, unbaked and judging.', 'laughing'); return true; }
          if (s.temp === 180 && s.time === 20) {
            s.baked = true;
            api.defy('recipe');
            api.complete({ line: 'Twenty minutes at 180?! That\'s the… that\'s what the card says. I may have read it upside down. And backwards. With feeling.', mood: 'defeated' });
            return true;
          }
          if (s.temp === 20 && s.time === 180) api.fail('Three hours at 20 degrees. The batter didn\'t bake. It evolved. It now has opinions. Fresh batter!');
          else if (s.temp < 180 || s.time < 20) api.fail('DING! Out comes a warm puddle of batter soup. Grandma would weep into her apron. Fresh batter!');
          else api.fail('DING! Out comes a smoking sponge-shaped brick. You could build a shed with it. Fresh batter!');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'tup' }, { tap: 'tup' }, { tap: 'mup' }, { tap: 'start' }],
    checks: [
      { name: 'start with no time', steps: [{ tap: 'start' }], expect: 'nope' },
      { name: 'Bossworth\'s settings', steps: [{ tap: 'tdown' }, { tap: 'tdown' }, { tap: 'tdown' }, { tap: 'tdown' }, { tap: 'tdown' }, { tap: 'tdown' },
        { tap: 'mup' }, { tap: 'mup' }, { tap: 'mup' }, { tap: 'mup' }, { tap: 'mup' }, { tap: 'mup' }, { tap: 'mup' }, { tap: 'mup' }, { tap: 'mup' }, { tap: 'start' }], expect: 'fail' },
      { name: 'too hot', steps: [{ tap: 'tup' }, { tap: 'tup' }, { tap: 'tup' }, { tap: 'mup' }, { tap: 'start' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
