/* Level 218 — Whistle Blower (Whistle Woods)
 * You lead 3–0 but Bossworth, the self-appointed referee, keeps adding time. His whistle lies on the
 * bench. Rule 1: the referee is whoever holds the whistle. Rule 2: only the referee's whistle ends it.
 * Solution: take the whistle, then blow FULL TIME.
 * Wrong: kicking the ball (trap: he adds more time); blowing without the whistle, asking him (nope).
 * Ruin: referee-sent-off — holding the whistle, show Bossworth the red card.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'whistle-blower',
    num: 218,
    title: 'Whistle Blower',
    objective: 'End the match while you\'re winning.',
    intro: 'Three-nil to you?! Then we play on until it isn\'t. I\'m the referee, I decide. And don\'t touch my whistle: only the REFEREE may blow it.',
    introMood: 'annoyed',
    actions: ['tap', 'read'],
    par: 2,
    hints: [
      'Read the referee rules. Who is the referee, exactly?',
      'Bossworth left his whistle on the bench. Whoever holds it is the referee.',
      'Pick up the whistle, then blow FULL TIME.'
    ],
    wrong: ['Kicking the ball just gives him an excuse for more time (trap).', 'Blowing without a whistle is just saying "peep" (nope).', 'Asking Bossworth nicely gets you nowhere (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Full time. Three-nil. The ex-referee is "reviewing the footage".',
    trick: 'The rulebook made whoever held the whistle the referee, so picking it up let you blow full time yourself.',

    init: function () { return { has: false, goals: 3 }; },

    view: function (s) {
      return [
        O('grass', 0, 74, 100, 26, { kind: 'static', art: 'j-grass' }),
        O('score', 4, 3, 40, 13, { kind: 'static', text: 'YOU ' + s.goals + ' : 0 BOSS', label: 'Score: you ' + s.goals + ', Bossworth nil', cls: 'display-card' }),
        O('time', 4, 18, 40, 8, { kind: 'static', text: 'Time: 90:00 + LOTS', label: 'Time: ninety minutes plus lots', cls: 'tag-card' }),
        O('rules', 48, 3, 48, 30, { kind: 'static', text: 'REFEREE RULES\n1. The referee is whoever holds the whistle.\n2. Only the referee\'s whistle ends the match.', label: 'Referee rules. 1: the referee is whoever holds the whistle. 2: only the referee\'s whistle ends the match.', cls: 'book-card' }),
        O('goal', 4, 50, 48, 24, { kind: 'static', art: 'j-goal', label: 'Goal' }),
        O('ball', 38, 64, 10, 10, { art: 'j-ball', label: 'Football (kick it)' }),
        O('bench', 58, 64, 38, 10, { kind: 'static', art: 'table', label: 'Bench' }),
        O('whistle', 60, 52, 18, 12, { art: 'j-whistle', label: 'Bossworth\'s whistle, lying on the bench', hidden: s.has }),
        O('red', 82, 48, 12, 16, { art: 'j-refcard', label: 'Red card, on the bench' }),
        O('inv', 4, 77, 44, 9, { kind: 'static', text: s.has ? 'You hold: the whistle' : 'You hold: nothing', label: s.has ? 'You are holding the whistle' : 'You are holding nothing', cls: 'tag-card' }),
        O('blow', 52, 77, 44, 10, { text: 'Blow: FULL TIME', label: 'Blow the whistle for full time', cls: 'btn-card big' }),
        O('ask', 4, 89, 92, 9, { text: 'Ask Bossworth to end the match', label: 'Ask Bossworth to end the match', cls: 'btn-card small' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'ball':
          api.fail('GOAL! Four-nil. Right: that\'s twenty more minutes of stoppage time. And I\'m disallowing it. Back to three-nil and kick-off!', 'laughing');
          return true;
        case 'whistle':
          s.has = true;
          api.defy('whistle');
          api.say('PUT THAT DOWN. That is the referee\'s whistle! Which, according to Rule 1, makes you… no. No no no.', 'panicked');
          return true;
        case 'blow':
          if (!s.has) {
            api.nope('blow');
            api.say('You say "peep". Very convincing. Without a whistle you\'re just a person saying peep.', 'pleased');
          } else {
            api.complete({ line: 'PEEEEP! Full time?! You can\'t… Rule 1… Rule 2… I wrote those rules. Why did I write such GOOD rules?', mood: 'defeated' });
          }
          return true;
        case 'red':
          if (!s.has) {
            api.nope('red');
            api.say('Only the referee shows cards. And who is the referee? Me. Hands off.', 'annoyed');
          } else {
            api.complete({ ruin: 'referee-sent-off', line: 'A RED CARD? For ME? You sent off the REFEREE! I\'m walking. I\'m walking off. There\'s nobody left to referee. The match just… ends. In disgrace. Mine.', mood: 'panicked' });
          }
          return true;
        case 'ask':
          api.nope('ask');
          api.say('End it? While I\'m LOSING? Not until the final whistle. And I\'m not blowing it.', 'annoyed');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'whistle' }, { tap: 'blow' }],
    checks: [
      { name: 'kick the ball', steps: [{ tap: 'ball' }], expect: 'fail' },
      { name: 'blow with no whistle', steps: [{ tap: 'blow' }], expect: 'nope' },
      { name: 'ask nicely', steps: [{ tap: 'ask' }], expect: 'nope' },
      { name: 'red card without the whistle', steps: [{ tap: 'red' }], expect: 'nope' }
    ],
    ruinPaths: { 'referee-sent-off': [{ tap: 'whistle' }, { tap: 'red' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
