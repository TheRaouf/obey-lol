/* Level 186 — Bedtime Story (Dragon Doze)
 * A cranky, sleepless dragon lies across the only door. Its care card says: can't nap? read it a
 * story — but exciting stories keep it awake. Bossworth pushes "SWORD FIGHT!" and forbids his own
 * memoir ("far too thrilling"). The memoir — volume 1 of 40 — is the most boring book in the kingdom.
 * Wrong: the dragon-slaying book (trap); the exciting or too-short books (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BOOKS = [
    { id: 'sword', text: 'SWORD FIGHT! (thrilling)', label: 'Book: Sword Fight! Thrilling!', cls: 'btn-card option accent' },
    { id: 'slay', text: 'How to Slay Dragons', label: 'Book: How to Slay Dragons', cls: 'btn-card option' },
    { id: 'sheep', text: 'Fluffy Sheep (2 pages)', label: 'Book: Fluffy Sheep, two pages long', cls: 'btn-card option' },
    { id: 'memoir', text: 'MY LIFE by King B. (vol 1 of 40)', label: 'Book: My Life, by King Bossworth, volume 1 of 40', cls: 'btn-card option' }
  ];

  OBEY.registerLevel({
    id: 'bedtime-story',
    num: 186,
    title: 'Bedtime Story',
    objective: 'Get the dragon off the doorway.',
    intro: 'This dragon will not budge. Read it something EXCITING — Sword Fight! — and it will leap up and leave. Do NOT touch my autobiography. Far too thrilling for a dragon.',
    introMood: 'annoyed',
    actions: ['tap', 'read', 'choice'],
    par: 2,
    hints: [
      'Read the dragon\'s care card. Does it want excitement, or a nap?',
      'Exciting stories keep it awake. You need the most boring book on the shelf — and a long one.',
      'Read it Bossworth\'s autobiography, then go through the door once it is asleep.'
    ],
    wrong: ['Reading "How to Slay Dragons" to a dragon offends it (trap).', 'The sword fight book gets it excited; the sheep book is too short (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Asleep by page three of my life story. Page THREE. That is where I discover hats.',
    trick: 'The care card said exciting stories keep the dragon awake, so the most boring book in the kingdom — Bossworth\'s 40-volume memoir — sent it to sleep.',

    init: function () { return { asleep: false }; },

    view: function (s) {
      var out = [
        O('card', 4, 4, 52, 24, { kind: 'static', text: 'DRAGON CARE CARD\nCan\'t nap? Read it a story.\nExciting stories keep it awake!', label: 'Dragon care card: can\'t nap? Read it a story. Exciting stories keep it awake!', cls: 'book-card' }),
        O('door', 78, 44, 19, 32, { kind: s.asleep ? undefined : 'static', art: 'door', artOpts: { sign: 'EXIT', open: s.asleep }, label: s.asleep ? 'The doorway, finally clear' : 'The exit door, blocked by the dragon' }),
        O('dragon', s.asleep ? 4 : 48, s.asleep ? 36 : 28, s.asleep ? 40 : 48, s.asleep ? 40 : 48, { kind: 'static', art: 'h-dragon', artOpts: { mood: s.asleep ? 'asleep' : 'grumpy', face: 'left' }, label: s.asleep ? 'The dragon, curled up asleep away from the door' : 'A grumpy, sleepless dragon lying across the doorway' }),
        O('shelf', 4, 32, 40, 10, { kind: 'static', text: 'Story shelf ↓', label: '', cls: 'tag-card', hidden: s.asleep })
      ];
      BOOKS.forEach(function (b, i) {
        out.push(O(b.id, 4 + (i % 2) * 47, 77 + Math.floor(i / 2) * 11, 45, 10, { text: b.text, label: 'Read: ' + b.label, cls: b.cls, hidden: s.asleep }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'sword':
          api.nope('sword');
          api.say('"…and CLANG went the swords!" The dragon bounces with excitement. Wide awake. Still on the doorway. Brilliant story though.', 'pleased');
          return true;
        case 'sheep':
          api.nope('sheep');
          api.say('"Sheep. More sheep. The end." The dragon yawns… then demands more. It is two pages long.', 'neutral');
          return true;
        case 'slay':
          api.fail('You read "How to Slay Dragons" TO A DRAGON. It snorts a very offended cloud of smoke that blows you back down the corridor.');
          return true;
        case 'memoir':
          s.asleep = true;
          api.defy('memoir');
          api.say('"Chapter One: I was born magnificent…" By page three the dragon is snoring and rolls away from the door. Rude. Accurate, but rude.', 'annoyed');
          return true;
        case 'door':
          if (!s.asleep) return false;
          api.complete({ line: 'You tiptoe out while my life story echoes off the walls. Thirty-nine volumes to go. Come back any time.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'memoir' }, { tap: 'door' }],
    checks: [
      { name: 'read How to Slay Dragons', steps: [{ tap: 'slay' }], expect: 'fail' },
      { name: 'read the exciting book Bossworth wants', steps: [{ tap: 'sword' }], expect: 'nope' },
      { name: 'read the short sheep book', steps: [{ tap: 'sheep' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
