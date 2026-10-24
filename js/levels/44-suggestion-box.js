/* Level 44 — Suggestion Box
 * "Post your suggestion in the box — I read every one personally." The box is wired straight into a
 * shredder (trap). The noticeboard is ignored (nope). The handbook says a suggestion handed to the boss in
 * person must be read aloud: drag the slip onto Bossworth himself.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'suggestion-box',
    num: 44,
    title: 'Suggestion Box',
    objective: 'Get your suggestion read.',
    intro: 'Got a suggestion? Pop it in the suggestion box! I read every single one. Personally. With great interest. Mm-hm. Very carefully.',
    introMood: 'pleased',
    actions: ['drag', 'observe', 'read'],
    par: 1,
    hints: [
      'Look at where the suggestion box actually goes.',
      'The handbook says how to make sure a suggestion gets read.',
      'Drag the suggestion onto Bossworth himself.'
    ],
    wrong: ['The suggestion box feeds a shredder (trap).', 'Nobody reads the noticeboard (nope).'],
    secrets: [],
    endingNote: 'None.',
    narratorZone: true,
    done: 'Suggestion read aloud and accepted. Under protest. Loud protest.',
    trick: 'The box was a shredder, so you handed the suggestion to Bossworth in person, where the handbook made him read it.',

    init: function () { return {}; },

    view: function () {
      return [
        O('box', 36, 4, 28, 42, { art: 'a-suggestbox', label: 'Suggestion box marked IDEAS. Its cable runs straight into a shredder underneath.', zone: true }),
        O('caption', 28, 48, 36, 9, { kind: 'static', text: 'Read daily!*', label: 'Caption: read daily', cls: 'tag-card' }),
        O('fine', 28, 58, 36, 6, { kind: 'static', text: '*by the shredder', label: 'Fine print: by the shredder', cls: 'fine-print' }),
        O('board', 68, 4, 28, 22, { art: 'a-noticeboard', label: 'Staff noticeboard', zone: true }),
        O('handbook', 67, 28, 31, 48, { kind: 'static', text: 'HANDBOOK p.3\nSuggestions handed to the boss in person must be read aloud.', label: 'Staff handbook page 3: a suggestion handed to the boss in person must be read aloud', cls: 'book-card' }),
        O('slip', 6, 68, 30, 24, { text: 'SUGGESTION:\nLet the player go home.', label: 'Your suggestion slip: let the player go home (drag it)', cls: 'ticket-card', drag: true }),
        O('plant', 4, 6, 12, 26, { art: 'plant', label: 'Office plant', free: true })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'slip') {
        if (a.zone === 'box') {
          api.fail('Zzzrrrt! Read it! Loved it! Very good suggestion! …What did it say? Doesn\'t matter. Here\'s a fresh slip. Write it again.');
          return true;
        }
        if (a.zone === 'board') {
          api.nope('slip');
          api.say('Pinned to the noticeboard. Next to a lost cat poster from 2011. Nobody reads the noticeboard. Not even the cat.', 'pleased');
          return true;
        }
        if (a.zone === 'narrator') {
          api.defy('hand');
          api.complete({ line: 'You handed it to me. In person. So I have to read it aloud: "Let the player go home." …Handbook page three. I wrote page three. Suggestion accepted.', mood: 'defeated' });
          return true;
        }
        return false;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'slip') { api.say('Lovely suggestion. Pop it in the box. The box. The nice box with the… humming.', 'pleased'); return true; }
      if (a.target === 'box') { api.say('Listen to it hum! That\'s the sound of me reading.', 'pleased'); return true; }
      if (a.target === 'board') { api.say('The noticeboard. Where notices go to be ignored.', 'neutral'); return true; }
      if (a.target === 'plant') { api.say('The plant suggests more sunlight. Request denied.', 'neutral'); return true; }
      return false;
    },

    solution: [{ drop: ['slip', 'narrator'] }],
    checks: [
      { name: 'post it in the box', steps: [{ drop: ['slip', 'box'] }], expect: 'fail' },
      { name: 'pin it to the noticeboard', steps: [{ drop: ['slip', 'board'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
