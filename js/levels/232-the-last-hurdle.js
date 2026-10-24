/* Level 232 — The Last Hurdle (Podium Party)
 * The last hurdle before the Final Factory is four metres tall. Bossworth: "JUMP it cleanly! Knock it
 * and you're out!" The rule card says knocking a hurdle over is allowed; going round it is not.
 * Solution: press and hold "Push it over" for two seconds, then walk on towards the Factory.
 * Wrong: jumping (trap); a short push (it wobbles back).
 * Ruin: hurdle-dodger — go round it. You get through, disqualified, and Bossworth melts down.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PUSH_MS = 2000;

  OBEY.registerLevel({
    id: 'the-last-hurdle',
    num: 232,
    title: 'The Last Hurdle',
    objective: 'Get past the last hurdle before the Factory.',
    intro: 'Sports day is over. I\'m wanted at the Factory! One last hurdle on the way. JUMP it, cleanly! Knock it and you\'re out. That\'s the rule. I think. I didn\'t read it.',
    introMood: 'panicked',
    actions: ['hold', 'read', 'choice'],
    par: 1,
    hints: [
      'Bossworth didn\'t read the rule card. You could.',
      'Knocking a hurdle over is allowed. It\'s far too tall to jump, and much too heavy to tip with a tap.',
      'Press and hold "Push it over" until it falls, then walk on.'
    ],
    wrong: ['Nobody can jump a four-metre hurdle (trap).', 'A short push only makes it wobble.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Hurdle flattened. Next stop: the Factory.',
    trick: 'The rules allow knocking a hurdle down, so the "last hurdle" only had to be pushed over, not jumped.',

    init: function () { return { fallen: false, pushing: false, timer: null }; },

    view: function (s) {
      return [
        O('grass', 0, 74, 100, 26, { kind: 'static', art: 'j-grass' }),
        O('rules', 4, 3, 56, 24, { kind: 'static', text: 'HURDLES RULE\nKnocking a hurdle over: allowed.\nGoing round it: disqualified.', label: 'Hurdles rule: knocking a hurdle over is allowed. Going round it means disqualification.', cls: 'book-card' }),
        O('factory', 64, 3, 32, 14, { kind: 'static', text: 'FINAL FACTORY ►', label: 'Sign: this way to the Final Factory', cls: 'sign-card' }),
        O('you', 7.5, 58.5, 11, 16, { kind: 'static', art: 'hero', label: 'You, at the start of the last straight' }),
        O('hurdle', 30, 30, 44, 44, { kind: 'static', art: 'j-hurdle', artOpts: { fallen: s.fallen }, label: s.fallen ? 'The last hurdle, lying flat on the track' : 'The last hurdle, four metres tall' }),
        O('size', 77, 50, 19, 10, { kind: 'static', text: '4 metres!', label: '', cls: 'tag-card' }),
        O('jump', 4, 79, 30, 16, { text: 'JUMP it!', label: 'Jump the hurdle', cls: 'btn-card accent big' }),
        O('push', 35, 79, 30, 16, { text: 'Push it over (hold)', label: 'Push the hurdle over (press and hold)', hold: true, cls: 'hold-btn' + (s.pushing ? ' charging' : '') }),
        O('round', 66, 79, 30, 16, { text: 'Go round it', label: 'Go round the hurdle', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'tap:jump':
          api.fail('You leap! You reach about knee height of a four-metre hurdle. *BOING*. Lovely technique. Terrible result. Back to the start!', 'laughing');
          return true;
        case 'tap:round':
          api.complete({ ruin: 'hurdle-dodger', line: 'You went ROUND it?! DISQUALIFIED! You\'re through, but DISQUALIFIED! I\'m writing it on the results board in red! In capitals! On my way to the Factory!', mood: 'panicked' });
          return true;
        case 'tap:push':
          api.say('A poke? It\'s four metres of hurdle. You\'ll need to press and HOLD. Not that knocking it is allowed. Is it?', 'suspicious');
          return true;
        case 'holdstart:push':
          s.pushing = true;
          api.say('Don\'t lean on it! Knocking it is… let me check… *reads card* …oh no.', 'panicked');
          s.timer = api.after(PUSH_MS, function () {
            s.timer = null; s.pushing = false; s.fallen = true;
            api.defy('push');
            api.complete({ line: '*CRASH* It\'s down, and the rule says that\'s fine. Fine! Off we go. The Factory awaits. Stay close, and do EXACTLY as I say. For once.', mood: 'defeated' });
          });
          return true;
        case 'holdend:push':
          s.pushing = false;
          if (s.timer) { api.cancel(s.timer); s.timer = null; api.say('It wobbles… and rocks back upright. Phew. I mean: shame.', 'pleased'); }
          return true;
      }
      return false;
    },

    solution: [{ hold: ['push', 2200] }],
    checks: [
      { name: 'jump it', steps: [{ tap: 'jump' }], expect: 'fail' },
      { name: 'short push', steps: [{ hold: ['push', 500] }], expect: 'playing' },
      { name: 'one more try', steps: [{ hold: ['push', 500] }, { tap: 'jump' }], expect: 'fail' }
    ],
    ruinPaths: { 'hurdle-dodger': [{ tap: 'round' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
