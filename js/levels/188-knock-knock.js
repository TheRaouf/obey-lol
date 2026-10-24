/* Level 188 — Knock Knock (Dragon Doze)
 * An enchanted door with a face says "Knock knock." Bossworth: "Knock on it until it gives up."
 * Knocking only annoys it — knock-knock is its line. Play along: "Who's there?" → "Ajar." →
 * "Ajar who?" → the door swings ajar. Then walk through.
 * Wrong: knocking (nope), off-script replies (nope); kicking the door (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var STEPS = [
    { door: 'Knock knock.', opts: [['knock', 'KNOCK on it'], ['who', 'Who\'s there?'], ['open', 'Just open up!']], right: 'who' },
    { door: 'Ajar.', opts: [['jar', 'A jar of what?'], ['ajarwho', 'Ajar who?'], ['knock', 'KNOCK again']], right: 'ajarwho' },
    { door: 'Ajar! Like me. Now. Off you go!', opts: [], right: null }
  ];

  OBEY.registerLevel({
    id: 'knock-knock',
    num: 188,
    title: 'Knock Knock',
    objective: 'Get through the enchanted door.',
    intro: 'A talking door. Ugh. It thinks it is hilarious. Do not encourage it. Just knock until it gives up. Knock, knock, KNOCK!',
    introMood: 'annoyed',
    actions: ['tap', 'sequence', 'choice'],
    par: 3,
    hints: [
      'Read what the door just said. Whose line is "Knock knock" normally?',
      'It is telling you a knock-knock joke. Play your part.',
      'Answer "Who\'s there?", then "Ajar who?", then walk through the door.'
    ],
    wrong: ['Knocking only annoys the door — that is its line (nope).', 'Off-script replies make it start the joke again (nope).', 'Kicking the door gets you bounced back (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'The door is still giggling. You played along with a door. I would never. (I would. I love that joke.)',
    trick: 'The door was telling a knock-knock joke, so the way through was to say your lines — and its punchline left it ajar.',

    init: function () { return { step: 0 }; },

    view: function (s) {
      var st = STEPS[s.step], open = s.step >= 2;
      var out = [
        O('speech', 4, 6, 58, 16, { kind: 'static', text: 'Door: "' + st.door + '"', label: 'The door says: ' + st.door, cls: 'speech-card' }),
        O('door', 58, 32, 34, 44, { art: 'h-talkdoor', artOpts: { mood: open ? 'open' : 'talk' }, label: open ? 'The enchanted door, standing ajar' : 'An enchanted wooden door with a face' }),
        O('kick', 74, 84, 22, 12, { text: 'Kick it', label: 'Kick the door', cls: 'btn-card', hidden: open })
      ];
      st.opts.forEach(function (o, i) {
        out.push(O(o[0], 4, 30 + i * 15, 48, 12, { text: o[1], label: 'Say: ' + o[1], cls: 'btn-card option' + (o[0] === 'knock' ? ' accent' : '') }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var st = STEPS[s.step];
      if (a.target === 'kick') {
        api.fail('You kick the door. It says "OW. Rude." and springs back so hard you bounce to the far end of the corridor.');
        return true;
      }
      if (a.target === 'door') {
        if (s.step >= 2) {
          api.complete({ line: 'Through the door, mid-giggle. A knock-knock joke. My castle doors tell knock-knock jokes now. I blame the wizard.', mood: 'defeated' });
          return true;
        }
        api.nope('door');
        api.say(s.step === 0 ? 'The door raises a wooden eyebrow. It is waiting for something.' : 'The door is still mid-joke. Do not interrupt a door mid-joke.', 'pleased');
        return true;
      }
      var opt = st.opts.filter(function (o) { return o[0] === a.target; })[0];
      if (!opt) return false;
      if (a.target === st.right) {
        s.step++;
        api.defy('knock');
        api.say(s.step === 1 ? 'You said "Who\'s there?" Do NOT play along. It will only get worse.' : 'Oh no. It is ajar. That was the joke. I hate how well that worked.', 'annoyed');
        return true;
      }
      api.nope(a.target);
      if (a.target === 'knock') api.say('Door: "Hey! KNOCK KNOCK is MY line." It folds its little hinges. Try again.', 'pleased');
      else api.say('Door: "That is not how the joke goes." It sighs and starts over.', 'pleased');
      s.step = 0;
      return true;
    },

    solution: [{ tap: 'who' }, { tap: 'ajarwho' }, { tap: 'door' }],
    checks: [
      { name: 'knock like Bossworth says', steps: [{ tap: 'knock' }], expect: 'nope' },
      { name: 'off-script punchline', steps: [{ tap: 'who' }, { tap: 'jar' }], expect: 'nope' },
      { name: 'kick the door', steps: [{ tap: 'kick' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
