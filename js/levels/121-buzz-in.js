/* Level 121 — Buzz In (Buzzer Bonanza)
 * Game show. Question: "Which answer has exactly as many letters as the number it names?"
 * Bossworth (host) says the answer is THREE. Only FOUR has four letters. Buzz first, then answer.
 * Answering before buzzing: nope. Wrong answer after buzzing: trap.
 * Ruin: press the gold HOST ONLY buzzer and take over the show.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ANSWERS = [
    { id: 'aThree', text: 'A: THREE' },
    { id: 'aFour', text: 'B: FOUR' },
    { id: 'aSeven', text: 'C: SEVEN' },
    { id: 'aEleven', text: 'D: ELEVEN' }
  ];

  OBEY.registerLevel({
    id: 'buzz-in',
    num: 121,
    title: 'Buzz In',
    objective: 'Win the round.',
    intro: 'Welcome to "Who Wants To Be Correct?"! Buzz in and answer THREE. I\'ve seen the answer card. Trust your host. And the gold buzzer is the HOST buzzer. Paws off.',
    introMood: 'pleased',
    actions: ['tap', 'logic', 'sequence'],
    par: 2,
    hints: [
      'Count the letters in each answer. Game shows want you to buzz before answering.',
      'THREE has five letters. SEVEN has five. ELEVEN has six.',
      'Press your buzzer, then answer B: FOUR.'
    ],
    wrong: ['Answering without buzzing in first is a nope.', 'Any answer but FOUR drops you through the confetti trapdoor (trap).', 'The gold HOST buzzer hands you Bossworth\'s job (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Four letters, four points, one sulking host.',
    trick: 'FOUR is the only number word with as many letters as its value, whatever the host claimed to have read on his card.',

    init: function () { return { buzzed: false }; },

    view: function (s) {
      var out = [
        O('screen', 4, 4, 92, 18, { kind: 'static', text: 'QUESTION: Which answer has exactly as many letters as the number it names?', label: 'Question: which answer has exactly as many letters as the number it names?', cls: 'display-card' })
      ];
      ANSWERS.forEach(function (a, i) {
        out.push(O(a.id, 4 + (i % 2) * 48, 26 + Math.floor(i / 2) * 14, 44, 11, { text: a.text, label: 'Answer ' + a.text, cls: 'btn-card big' }));
      });
      out.push(O('podium', 6, 66, 30, 30, { kind: 'static', art: 'e-podium', artOpts: { color: '#3ec1ff' }, label: '' }));
      out.push(O('buzzer', 10, 54, 22, 18, { art: 'e-buzzer', artOpts: { color: '#e5243b', lit: s.buzzed }, label: s.buzzed ? 'Your buzzer (buzzed in!)' : 'Your contestant buzzer' }));
      out.push(O('status', 37, 61, 26, 13, { kind: 'static', text: s.buzzed ? 'You buzzed in!' : 'Nobody has buzzed', label: '', cls: 'tag-card' }));
      out.push(O('hostPodium', 64, 66, 30, 30, { kind: 'static', art: 'e-podium', artOpts: { color: '#ffd23f' }, label: '' }));
      out.push(O('host', 68, 54, 22, 18, { art: 'e-buzzer', artOpts: { color: '#ffd23f' }, label: 'Gold HOST ONLY buzzer' }));
      out.push(O('hostTag', 64, 88, 30, 8, { kind: 'static', text: 'HOST ONLY', label: '', cls: 'tag-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'buzzer') {
        if (s.buzzed) { api.say('You\'ve buzzed. We heard. The whole studio heard. Answer!', 'annoyed'); return true; }
        s.buzzed = true;
        api.say('BZZZT! Contestant one! Your answer is… THREE? Say THREE. Say it.', 'pleased');
        return true;
      }
      if (a.target === 'host') {
        api.complete({ ruin: 'hostile-takeover', line: 'You pressed the HOST buzzer! The lights swing to YOU. The audience is chanting your name. I\'m… a contestant now? Who wants to be correct? NOT ME, APPARENTLY.', mood: 'panicked' });
        return true;
      }
      var ans = ANSWERS.filter(function (x) { return x.id === a.target; })[0];
      if (!ans) return false;
      if (!s.buzzed) {
        api.nope(a.target);
        api.say('Buzz in first! There are RULES. I\'m the host. I make the rules. Rule one: buzz.', 'annoyed');
        return true;
      }
      if (a.target === 'aFour') {
        api.complete({ line: 'F-O-U-R. Four letters. …Correct. The answer card said THREE. I may have been holding it upside down. For years.', mood: 'defeated' });
      } else {
        api.fail(ans.text.slice(3) + '? WRONG! Down the confetti trapdoor you go! Back to the green room, contestant.');
      }
      return true;
    },

    solution: [{ tap: 'buzzer' }, { tap: 'aFour' }],
    ruinPaths: { 'hostile-takeover': [{ tap: 'host' }] },
    checks: [
      { name: 'answer before buzzing', steps: [{ tap: 'aFour' }], expect: 'nope' },
      { name: 'Bossworth\'s answer: THREE', steps: [{ tap: 'buzzer' }, { tap: 'aThree' }], expect: 'fail' },
      { name: 'ELEVEN', steps: [{ tap: 'buzzer' }, { tap: 'aEleven' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
