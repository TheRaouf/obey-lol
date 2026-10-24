/* Level 187 — Riddle Me Nothing (Dragon Doze)
 * A riddling statue guards the lair corridor: "The rich want me. The poor have me. Eat me and you
 * starve. What am I?" The answer is NOTHING — and there is no NOTHING tile. Bossworth has already put
 * GOLD in the answer slot. Clear the slot and press ANSWER with nothing in it.
 * Wrong: answering GOLD, A CROWN or BREAD (trap); answering BOSSWORTH (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var WORDS = [
    { id: 'gold', text: 'GOLD' },
    { id: 'crown', text: 'A CROWN' },
    { id: 'bread', text: 'BREAD' },
    { id: 'boss', text: 'BOSSWORTH' }
  ];
  function word(id) { return WORDS.filter(function (w) { return w.id === id; })[0]; }

  OBEY.registerLevel({
    id: 'riddle-me-nothing',
    num: 187,
    title: 'Riddle Me Nothing',
    objective: 'Answer the statue\'s riddle.',
    intro: 'A riddling statue! Child\'s play. I have already filled in the answer for you: GOLD. Just press ANSWER and bask in my genius.',
    introMood: 'pleased',
    actions: ['tap', 'read', 'logic'],
    par: 2,
    hints: [
      'Test each word against all three lines of the riddle. Do the poor have gold? Would eating bread starve you?',
      'None of the tiles fits. The answer is "nothing", and there is a way to answer nothing.',
      'Tap the answer slot to empty it, then press ANSWER with nothing in it.'
    ],
    wrong: ['GOLD, A CROWN or BREAD are wrong answers and the floor tips you back (trap).', 'BOSSWORTH makes the statue laugh, but it is still wrong (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'You answered nothing and it was right. I have been answering nothing my whole life and nobody ever opened a door.',
    trick: 'The riddle\'s answer was "nothing", so the third option was to empty the slot and submit nothing at all.',

    init: function () { return { slot: 'gold' }; },

    view: function (s) {
      var out = [
        O('riddle', 4, 4, 54, 26, { kind: 'static', text: 'The rich want me.\nThe poor have me.\nEat me and you starve.\nWhat am I?', label: 'Riddle: The rich want me. The poor have me. Eat me and you starve. What am I?', cls: 'book-card' }),
        O('statue', 58, 36, 40, 40, { kind: 'static', art: 'h-statue', artOpts: { mood: 'stern' }, label: 'A stone statue with a riddling face' }),
        O('slot', 4, 34, 50, 12, { text: 'Answer: ' + (s.slot ? word(s.slot).text : '(nothing)'), label: s.slot ? 'Answer slot: ' + word(s.slot).text + ' (tap to empty it)' : 'Answer slot: empty', cls: 'display-card' }),
        O('ans', 4, 84, 44, 12, { text: 'ANSWER', label: 'Give your answer to the statue', cls: 'btn-card big' })
      ];
      WORDS.forEach(function (w, i) {
        out.push(O(w.id, 4 + (i % 2) * 26, 50 + Math.floor(i / 2) * 13, 24, 11, { text: w.text, label: 'Word tile: ' + w.text, cls: 'btn-card' + (s.slot === w.id ? ' ghost' : '') }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (word(a.target)) {
        s.slot = a.target;
        api.say(a.target === 'boss' ? 'Yes! Me! The answer to everything!' : 'You picked ' + word(a.target).text + '. Bold. Wrong, probably, unless it is GOLD.', a.target === 'boss' ? 'pleased' : 'suspicious');
        return true;
      }
      if (a.target === 'slot') {
        if (!s.slot) { api.say('The slot is already empty. Like a riddle with no answer. Which this is not. Probably.', 'neutral'); return true; }
        s.slot = null;
        api.defy('gold');
        api.say('You emptied it? I filled that in for you! Out of the goodness of my crown!', 'annoyed');
        return true;
      }
      if (a.target === 'ans') {
        if (!s.slot) {
          api.complete({ line: 'Statue: "NOTHING. Correct." It slides aside with a grind. You answered nothing and WON. I am going to be sick in my crown.', mood: 'defeated' });
          return true;
        }
        if (s.slot === 'boss') {
          api.nope('ans');
          api.say('The statue laughs so hard a chip falls off its nose. "Wrong," it wheezes. How DARE it.', 'annoyed');
          return true;
        }
        api.fail('Statue: "' + word(s.slot).text + '? WRONG." The floor tilts and you slide all the way back to the start of the corridor.');
        return true;
      }
      return false;
    },

    solution: [{ tap: 'slot' }, { tap: 'ans' }],
    checks: [
      { name: 'answer Bossworth\'s GOLD', steps: [{ tap: 'ans' }], expect: 'fail' },
      { name: 'answer BREAD', steps: [{ tap: 'bread' }, { tap: 'ans' }], expect: 'fail' },
      { name: 'answer BOSSWORTH', steps: [{ tap: 'boss' }, { tap: 'ans' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
