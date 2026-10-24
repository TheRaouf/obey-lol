/* Level 153 — Hands Up (Chalkboard Chasm)
 * Bossworth, substitute teacher: "First to SHOUT the answer wins. It's 8." The class rule poster says
 * hands up, no shouting out. Raise your hand, wait to be picked, then answer 7 (3 + 4).
 * Wrong: any answer with your hand down is shouting out (nope); answering before you are picked (nope);
 * 8 or 34 once picked (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PICK_MS = 2500;
  var ANSWERS = ['7', '8', '34'];

  OBEY.registerLevel({
    id: 'hands-up',
    num: 153,
    title: 'Hands Up',
    objective: 'Answer the question on the board.',
    intro: 'Quick-fire maths! First to SHOUT the answer wins. Hands up is for slowcoaches. And the answer is 8, by the way. Shout EIGHT!',
    introMood: 'pleased',
    actions: ['tap', 'wait'],
    par: 2,
    hints: [
      'Read the class rule poster. It outranks a substitute.',
      'Tap yourself to put your hand up, then wait to be picked.',
      'Hand up, wait until Bossworth picks you, then answer 7.'
    ],
    wrong: ['Answering with your hand down is shouting out (nope).', 'Answering before you are picked is a nope.', 'Answering 8 or 34 when picked is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Hand up, mouth shut, seven. Textbook.',
    trick: 'The class rule beat the substitute: hand up, wait to be picked, and 3 + 4 is still 7.',

    init: function () { return { hand: false, picked: false, timer: null }; },

    view: function (s) {
      var out = [
        O('board', 6, 5, 56, 20, { kind: 'static', text: '3 + 4 = ?', label: 'Board: 3 plus 4 equals what?', cls: 'display-card' }),
        O('tray', 6, 25, 56, 3, { kind: 'static', art: 'g-chalktray' }),
        // 2.4.1: two display words on the sign; the rule itself is body text (bible §6, ≤ 6 display words).
        O('rule', 66, 4, 30, 9, { kind: 'static', text: 'CLASS RULE', label: 'Class rule: hands up, no shouting out', cls: 'sign-card' }),
        O('ruleText', 66, 14.5, 30, 13, { kind: 'static', text: 'Hands up.\nNo shouting out.', label: '', cls: 'honest-card' }),
        O('kidL', 8, 46, 14, 26, { kind: 'static', art: 'g-kid', artOpts: { color: '#ff77b4', hair: '#9a6b3f', seated: true }, label: '' }),
        O('deskL', 2, 60, 26, 15, { kind: 'static', art: 'g-desk' }),
        O('you', 42, 43, 16, 30, { art: 'g-kid', artOpts: { color: '#ffd23f', seated: true, hand: s.hand ? 'up' : '' }, label: s.hand ? 'You, hand raised (tap to lower it)' : 'You at your desk (tap to raise your hand)' }),
        O('deskY', 36, 60, 28, 15, { kind: 'static', art: 'g-desk' }),
        O('youTag', 43, 64, 14, 5, { kind: 'static', text: 'YOU', label: '', cls: 'tag-card' }),
        O('kidR', 78, 46, 14, 26, { kind: 'static', art: 'g-kid', artOpts: { color: '#7fb2ff', seated: true }, label: '' }),
        O('deskR', 72, 60, 26, 15, { kind: 'static', art: 'g-desk' }),
        O('status', 30, 76, 40, 6, { kind: 'static', text: s.picked ? 'Picked: you!' : (s.hand ? 'Hand up: waiting…' : 'Hand: down'), label: '', cls: 'tag-card' })
      ];
      ANSWERS.forEach(function (n, i) {
        out.push(O('a' + n, 8 + i * 30, 84, 24, 12, { text: n, label: 'Answer ' + n, cls: 'btn-card big' }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'you') {
        if (!s.hand) {
          s.hand = true;
          api.defy('hand');
          api.say('A hand? In the AIR? How old-fashioned. I shall ignore it for a bit, as is tradition.', 'suspicious');
          s.timer = api.after(PICK_MS, function () {
            s.timer = null; s.picked = true;
            api.say('Oh, FINE. Yes, you. The one with the hand. What is the answer?', 'annoyed');
          });
        } else {
          s.hand = false; s.picked = false;
          if (s.timer) { api.cancel(s.timer); s.timer = null; }
          api.say('Hand down. Excellent. Now SHOUT.', 'pleased');
        }
        return true;
      }
      var m = /^a(\d+)$/.exec(a.target);
      if (!m) return false;
      if (!s.hand) {
        api.nope(a.target);
        api.say('You shouted "' + m[1] + '!" The whole class stares at the rule poster. Then at you. No marks for shouting.', 'pleased');
        return true;
      }
      if (!s.picked) {
        api.nope(a.target);
        api.say('Hand up AND talking? Wait to be picked. I haven\'t finished ignoring you.', 'annoyed');
        return true;
      }
      if (m[1] === '7') api.complete({ line: 'Seven. Correct. With your hand up. Like a pupil from a brochure. I said eight to test you. (I didn\'t.)', mood: 'defeated' });
      else if (m[1] === '8') api.fail('"Eight!" The class giggles. Someone counts on their fingers, loudly. 3 + 4 is not 8. Who told you 8?!');
      else api.fail('"Thirty-four"? You wrote the 3 and the 4 next to each other. That is not adding. That is parking.');
      return true;
    },

    solution: [{ tap: 'you' }, { wait: 2600 }, { tap: 'a7' }],
    checks: [
      { name: 'shout out the answer', steps: [{ tap: 'a7' }], expect: 'nope' },
      { name: 'answer before being picked', steps: [{ tap: 'you' }, { tap: 'a7' }], expect: 'nope' },
      { name: 'Bossworth\'s eight', steps: [{ tap: 'you' }, { wait: 2600 }, { tap: 'a8' }], expect: 'fail' },
      { name: 'parking the digits', steps: [{ tap: 'you' }, { wait: 2600 }, { tap: 'a34' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
