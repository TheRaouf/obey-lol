/* Level 225 — Chess Clock (Checkmate Chalet)
 * Bossworth has nine queens; you have one pawn. "Take all the time you need!" — your clock is the one
 * running. His clock shows 0:06. Make any move and press your clock: his time runs while he gloats,
 * and his flag falls. (Your clock running out only resets it: nope.)
 * Solution: Move a pawn, press your clock, wait.
 * Wrong: Resign (trap); pressing the clock before moving / moving twice (nope).
 * Ruin: board-flipper — flip the board.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var MINE = 120, HIS = 6;
  function clock(t) { return Math.floor(t / 60) + ':' + (t % 60 < 10 ? '0' : '') + (t % 60); }
  var GLOAT = ['Hmm. Which queen? Decisions, decisions.', 'Did I ever tell you about my first chess trophy? It was enormous.', 'Shh. Genius at work. Queen to… no. Queen to…', 'Wait, why is my clock ticking?'];

  OBEY.registerLevel({
    id: 'chess-clock',
    num: 225,
    title: 'Chess Clock',
    objective: 'Win the chess game.',
    intro: 'Rained off! Indoor games. Chess: I have nine queens, you have one pawn. Take ALL the time you need. Think for hours! The clock is just decoration.',
    introMood: 'pleased',
    actions: ['tap', 'wait', 'read'],
    par: 2,
    hints: [
      'Read the clock rules. Whose clock is running, and how much time does Bossworth have?',
      'Pressing your clock after a move starts HIS clock. He only has six seconds.',
      'Move the pawn, press your clock, then let Bossworth talk until his time runs out.'
    ],
    wrong: ['Resigning hands him the game (trap).', 'The clock needs a move first, and you only get one move per turn (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Won on time. Nine queens, zero seconds.',
    trick: 'A chess clock only runs for the player whose turn it is, so one quick move put Bossworth\'s six seconds on the clock while he talked.',

    init: function () { return { mine: MINE, his: HIS, moved: false, turn: 'you', g: 0 }; },

    onStart: function (s, api) {
      api.every(1000, function () {
        if (s.turn === 'you') {
          s.mine--;
          if (s.mine <= 0) {
            s.mine = MINE;
            api.nope(null);
            api.say('Your flag fell! I win on time! …No, I\'ll be generous. Have two more minutes. I\'m enjoying this too much.', 'laughing');
          }
          return;
        }
        s.his--;
        if (s.his <= 0) {
          s.his = 0;
          api.complete({ line: 'My flag FELL? I was still THINKING. Nine queens, and I lost on time to a pawn. That clock is not decoration. That clock is a traitor.', mood: 'defeated' });
          return;
        }
        api.say(GLOAT[s.g++ % GLOAT.length], s.his <= 2 ? 'surprised' : 'pleased');
      });
    },

    view: function (s) {
      return [
        O('rules', 4, 3, 92, 15, { kind: 'static', text: 'CHESS CLOCK: move, then press your clock. A clock at 0:00 loses on time.', label: 'Chess clock rules: move, then press your clock. A clock at zero loses on time.', cls: 'book-card' }),
        O('t-you', 56, 20, 19, 14, { kind: 'static', text: 'YOU\n' + clock(s.mine), label: 'Your clock: ' + clock(s.mine) + (s.turn === 'you' ? ', running' : ', stopped'), cls: s.turn === 'you' ? 'display-card ready' : 'display-card' }),
        O('t-his', 77, 20, 19, 14, { kind: 'static', text: 'BOSS\n' + clock(s.his), label: 'Bossworth\'s clock: ' + clock(s.his) + (s.turn === 'boss' ? ', running' : ', stopped'), cls: s.turn === 'boss' ? 'display-card ready' : 'display-card' }),
        O('board', 8, 30, 46, 31, { kind: 'static', art: 'j-chessboard', label: 'Chessboard: nine black queens against one white pawn' }),
        O('cclock', 59, 40, 34, 19, { kind: 'static', art: 'j-chessclock', artOpts: { turn: s.turn }, label: 'Chess clock' }),
        O('table', 4, 56, 92, 18, { kind: 'static', art: 'table' }),
        O('move', 4, 77, 44, 10, { text: s.moved ? 'Pawn moved ✓' : 'Move your pawn', label: s.moved ? 'Your pawn has moved' : 'Move your pawn one square', cls: 'btn-card' }),
        O('press', 52, 77, 44, 10, { text: 'Press your clock', label: 'Press your side of the chess clock', cls: 'btn-card big' }),
        O('resign', 4, 89, 44, 9, { text: 'Resign', label: 'Resign the game', cls: 'btn-card' }),
        O('flip', 52, 89, 44, 9, { text: 'Flip the board', label: 'Flip the whole chessboard over', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'move':
          if (s.turn !== 'you' || s.moved) {
            api.nope('move');
            api.say(s.turn !== 'you' ? 'It\'s MY turn. I\'m thinking. Loudly.' : 'One move per turn. Even for pawns. ESPECIALLY for pawns.', 'annoyed');
          } else {
            s.moved = true;
            api.say('The pawn shuffles forward one square. Adorable. Now take your time. Hours, if you like.', 'pleased');
          }
          return true;
        case 'press':
          if (s.turn !== 'you') { api.nope('press'); api.say('My clock is already running. Wait. Why is my clock running?', 'surprised'); return true; }
          if (!s.moved) { api.nope('press'); api.say('Move first, then press. Those are the rules. I read the first line of them.', 'neutral'); return true; }
          s.turn = 'boss';
          api.defy('clock');
          api.say('*click* My turn! Let me savour this. Let me tell you about each of my queens in turn…', 'pleased');
          return true;
        case 'resign':
          api.fail('You resign? Accepted! Victory to the nine queens! …Let\'s play again so I can win again. Pieces back!', 'laughing');
          return true;
        case 'flip':
          api.complete({ ruin: 'board-flipper', line: 'You FLIPPED THE BOARD! Queens everywhere! One is in my tea! There\'s no winner, there\'s just carnage. Chess is CANCELLED.', mood: 'panicked' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'move' }, { tap: 'press' }, { wait: 6500 }],
    checks: [
      { name: 'resign', steps: [{ tap: 'resign' }], expect: 'fail' },
      { name: 'clock before moving', steps: [{ tap: 'press' }], expect: 'nope' },
      { name: 'move twice', steps: [{ tap: 'move' }, { tap: 'move' }], expect: 'nope' },
      { name: 'think for ages', steps: [{ wait: 125000 }], expect: 'nope' }
    ],
    ruinPaths: { 'board-flipper': [{ tap: 'flip' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
