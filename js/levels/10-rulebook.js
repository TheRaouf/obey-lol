/* Level 10 — The Rulebook
 * Teaches: recognise and exploit a rule. Rule 2 says everything written in the book is true;
 * Rule 1 recalls Level 1 ("Bossworth lies"), so his "don't touch the pen" is not binding.
 * Solution: take the pen, write a rule that opens the door, walk through.
 *   "The door is open."     → choice rule=door (hero lean)
 *   "Bossworth is a potato." → narrator becomes a potato; potatoes can't hold doors → choice rule=potato (chaos lean)
 *   "A sandwich exists."     → a sandwich appears (secret snack-rule when eaten); the door stays locked.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var OPTIONS = [
    { id: 'w-door', rule: 'door', text: '"The door is open."' },
    { id: 'w-potato', rule: 'potato', text: '"Bossworth is a potato."' },
    { id: 'w-snack', rule: 'snack', text: '"A sandwich exists."' }
  ];

  OBEY.registerLevel({
    id: 'rulebook',
    num: 10,
    title: 'The Rulebook',
    objective: 'Get through the door that is "locked forever".',
    intro: 'Behold: THE RULEBOOK. Everything written in it is true. Rule 3 says the door is locked forever. And do NOT touch the pen.',
    introMood: 'pleased',
    actions: ['tap', 'choice'],
    par: 3,
    hints: [
      'Read Rule 1 and Rule 2 carefully.',
      'If everything written in the book is true, what would you write in Rule 4?',
      'Take the pen and write "The door is open." Then use the door.'
    ],
    wrong: ['The door is locked until a rule opens it.', 'The sandwich rule does not open the door.'],
    secrets: ['snack-rule'],
    endingNote: 'Choice: the door rule leans Hero; the potato rule leans Chaos.',
    done: 'Rules: bent. Narrator: possibly mashed.',

    init: function () { return { penOpen: false, written: null, doorOpen: false, sandwich: false, eaten: false, rule: null }; },

    view: function (s) {
      var r4 = s.written ? OPTIONS.filter(function (o) { return o.rule === s.written; })[0].text : '____________';
      var book = 'Rule 1: Bossworth lies (see Level 1).\nRule 2: Everything written in this book is true.\nRule 3: The door is locked forever.\nRule 4: ' + r4;
      var objs = [
        O('book', 4, 4, 58, 50, { kind: 'static', text: book, label: 'The Rulebook. ' + book.replace(/\n/g, ' '), cls: 'book-card', live: true }),
        O('pen', 66, 10, 14, 30, { art: 'pen', label: 'Pen', hidden: s.penOpen }),
        O('door', 70, 44, 26, 50, { art: 'door', artOpts: { open: s.doorOpen, sign: s.doorOpen ? '' : 'LOCKED FOREVER' }, label: s.doorOpen ? 'Open door' : 'Door, locked forever' }),
        O('sandwich', 68, 16, 24, 16, { art: 'sandwich', label: 'Sandwich', free: true, hidden: !s.sandwich || s.eaten, cls: 'pop-in' })
      ];
      OPTIONS.forEach(function (o, i) {
        objs.push(O(o.id, 4, 57 + i * 13, 60, 11, { text: 'Write ' + o.text, label: 'Write rule 4: ' + o.text, hidden: !s.penOpen, cls: 'btn-card option', free: !!s.written }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'pen') {
        s.penOpen = true;
        api.defy('pen');
        api.say('I SAID don\'t touch the pen! Rule 1 is a FIB. Rule 1 is… ugh. Rule 1 is true. Don\'t write anything silly.', 'panicked');
        return true;
      }
      var opt = OPTIONS.filter(function (o) { return o.id === a.target; })[0];
      if (opt) {
        s.written = opt.rule;
        if (opt.rule === 'door') {
          s.doorOpen = true; s.rule = 'door'; api.overlay(null);
          api.say('You wrote "The door is open." And now it IS. That\'s cheating! That\'s… exactly how rules work.', 'defeated');
        } else if (opt.rule === 'potato') {
          s.doorOpen = true; s.rule = 'potato'; api.overlay('potato');
          api.say('I am… a potato. Potatoes cannot hold doors shut. Well played. I\'ll be mashed about this.', 'annoyed');
        } else {
          s.sandwich = true; api.overlay(null);
          if (s.rule) { s.doorOpen = false; s.rule = null; }
          api.say('A sandwich. You had ONE rule to write and you chose LUNCH. The door is still locked, genius.', 'suspicious');
        }
        return true;
      }
      if (a.target === 'sandwich') {
        s.eaten = true;
        api.secret('snack-rule');
        api.say('You ate a sandwich made of pure rules. Delicious. Legally binding.', 'pleased');
        return true;
      }
      if (a.target === 'door') {
        if (s.doorOpen) {
          api.choice('rule', s.rule);
          api.complete({ line: s.rule === 'potato' ? '*potato noises of defeat*' : 'Through the door that was locked FOREVER. Forever is shorter than it used to be.', mood: 'defeated' });
        } else {
          api.say('Locked forever. Rule 3. Rules are rules. Unless… no. Rules are rules.', 'pleased');
        }
        return true;
      }
      return false;
    },

    solution: [{ tap: 'pen' }, { tap: 'w-door' }, { tap: 'door' }],
    alternatives: { potato: [{ tap: 'pen' }, { tap: 'w-potato' }, { tap: 'door' }] },
    secretPaths: { 'snack-rule': [{ tap: 'pen' }, { tap: 'w-snack' }, { tap: 'sandwich' }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
