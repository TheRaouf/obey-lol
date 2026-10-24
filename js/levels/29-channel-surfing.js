/* Level 29 — Channel Surfing
 * "Don't touch the TV, channel 5 (static) is my favourite." Channel 7 is a secret broadcast:
 * the exit is behind the remote's battery hatch. Solution: CH+ twice (5 → 7), open the hatch.
 * Wrong: opening the hatch before seeing channel 7 (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SHOWS = {
    1: 'Cooking with Bossworth: today, soup. Tomorrow: more soup.',
    2: 'Weather: 100% chance of instructions.',
    3: '~ static ~',
    4: 'Bossworth\'s Workout (he is lying down).',
    5: '~ static ~ (Bossworth\'s favourite)',
    6: 'News: Narrator still right about everything.',
    7: 'SECRET CHANNEL: the exit is behind the remote\'s battery hatch.',
    8: 'Advert: buy one door, get zero exits.',
    9: '~ static ~'
  };

  OBEY.registerLevel({
    id: 'channel-surfing',
    num: 29,
    title: 'Channel Surfing',
    objective: 'Find the way out.',
    intro: 'Don\'t touch the TV. Channel 5 is my favourite. It\'s static. Very soothing. Very… nothing-to-see-here.',
    introMood: 'suspicious',
    actions: ['tap', 'explore'],
    par: 3,
    hints: [
      'There might be more on TV than static.',
      'Flip through the channels and read each one.',
      'Press CH+ twice to reach channel 7, then open the battery hatch.'
    ],
    wrong: ['The battery hatch is stuck until you know about it.'],
    secrets: [],
    endingNote: 'None.',
    done: 'You found the secret channel. Bossworth is cancelling it.',

    init: function () { return { ch: 5, seen7: false }; },

    view: function (s) {
      var stat = /static/.test(SHOWS[s.ch]);
      return [
        O('tv', 8, 4, 84, 46, { kind: 'static', art: 'tv', artOpts: { staticky: stat }, label: 'TV' }),
        O('screen', 18, 12, 64, 28, { kind: 'static', text: 'CH ' + s.ch + '\n' + SHOWS[s.ch], label: 'TV channel ' + s.ch + ': ' + SHOWS[s.ch], cls: 'tv-text' + (stat ? ' static' : '') }),
        O('remote', 30, 54, 40, 42, { kind: 'static', art: 'remote', label: 'Remote control' }),
        O('chdown', 34, 60, 15, 12, { text: 'CH−', label: 'Channel down', cls: 'btn-card' }),
        O('chup', 51, 60, 15, 12, { text: 'CH+', label: 'Channel up', cls: 'btn-card' }),
        O('hatch', 36, 78, 28, 12, { text: 'battery hatch', label: 'Battery hatch on the remote', cls: 'btn-card ghost' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'chup' || a.target === 'chdown') {
        s.ch = a.target === 'chup' ? (s.ch % 9) + 1 : ((s.ch + 7) % 9) + 1;
        if (s.ch === 7) { s.seen7 = true; api.defy('ch7'); api.say('NOT CHANNEL SEVEN. Change it! Change it back! Nothing on seven is true! (Everything on seven is true.)', 'panicked'); }
        else api.say(s.ch === 5 ? 'Ahh. Static. Bliss.' : 'Stop flipping! You\'ll wear out the buttons. And my secrets.', 'annoyed');
        return true;
      }
      if (a.target === 'hatch') {
        if (!s.seen7) { api.nope(); api.say('It\'s a battery hatch. It\'s stuck. Nothing behind it. Why would you even look there?', 'pleased'); }
        else api.complete({ line: 'Behind the batteries, a tiny door. A TINY DOOR. You fit through it somehow. Television is magic.', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ tap: 'chup' }, { tap: 'chup' }, { tap: 'hatch' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
