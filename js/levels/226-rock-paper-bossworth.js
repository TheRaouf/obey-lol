/* Level 226 — Rock Paper Bossworth (Checkmate Chalet)
 * Bossworth's last five throws: ROCK, PAPER, SCISSORS, ROCK, PAPER. He cycles, so next is SCISSORS,
 * whatever he "pinky promises" (ROCK). Throw ROCK to win.
 * Wrong: PAPER, which beats his promised rock (trap: his scissors cut it); SCISSORS (nope: a tie).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'rock-paper-bossworth',
    num: 226,
    title: 'Rock Paper Bossworth',
    objective: 'Win one round of rock, paper, scissors.',
    intro: 'Rock, paper, scissors! I am completely random. Wildly unpredictable. And next I\'ll throw ROCK. Pinky promise. So paper wins. Probably.',
    introMood: 'suspicious',
    actions: ['tap', 'logic', 'observe'],
    par: 1,
    hints: [
      'Ignore the promise. Look at his last five throws in order.',
      'Rock, paper, scissors, rock, paper… he goes round in the same circle every time. What comes next?',
      'He\'ll throw scissors. Rock beats scissors: throw ROCK.'
    ],
    wrong: ['Paper loses to the scissors he really throws (trap).', 'Scissors against scissors is a tie (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Rock blunts scissors. And promises.',
    trick: 'His "random" throws went rock, paper, scissors on repeat, so the next one was scissors whatever he promised.',

    init: function () { return {}; },

    view: function () {
      var HIST = ['rock', 'paper', 'scissors', 'rock', 'paper'];
      var out = [O('title', 4, 3, 92, 8, { kind: 'static', text: 'Bossworth\'s last five throws:', label: '', cls: 'tag-card' })];
      HIST.forEach(function (h, i) {
        out.push(O('h' + i, 4 + i * 15.5, 12, 14, 14, { kind: 'static', art: 'j-hand', artOpts: { shape: h }, label: 'Throw ' + (i + 1) + ': ' + h }));
      });
      out.push(O('h5', 81.5, 12, 14.5, 14, { kind: 'static', text: '?', label: 'Throw 6: unknown', cls: 'tag-card' }));
      out.push(O('words', 4, 28, 92, 8, { kind: 'static', text: 'rock, paper, scissors, rock, paper, ?', label: '', cls: 'tag-card' }));
      out.push(O('promise', 4, 40, 52, 16, { kind: 'static', text: '"Next: ROCK. Pinky promise."', label: 'Bossworth promises: next, rock.', cls: 'speech-card' }));
      out.push(O('beats', 4, 59, 52, 13, { kind: 'static', text: 'Rock beats scissors. Scissors beat paper. Paper beats rock.', label: 'Rock beats scissors. Scissors beat paper. Paper beats rock.', cls: 'tag-card' }));
      out.push(O('boss', 60, 40, 34, 34, { kind: 'static', art: 'j-boss', label: 'Bossworth, hand hidden behind his back' }));
      out.push(O('rock', 4, 79, 30, 16, { text: 'ROCK', label: 'Throw rock', cls: 'btn-card big' }));
      out.push(O('paper', 35, 79, 30, 16, { text: 'PAPER', label: 'Throw paper', cls: 'btn-card accent big' }));
      out.push(O('scissors', 66, 79, 30, 16, { text: 'SCISSORS', label: 'Throw scissors', cls: 'btn-card big' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'paper':
          api.fail('Paper! And I throw… SCISSORS! Snip snip! Did I say rock? I meant to say "not rock". Again!', 'laughing');
          return true;
        case 'scissors':
          api.nope('scissors');
          api.say('Scissors… and scissors. A tie! How did you… lucky guess. Go again. I\'m throwing rock. Truly.', 'suspicious');
          return true;
        case 'rock':
          api.defy('rock');
          api.complete({ line: 'Rock?! But I threw SCISSORS! Nobody could predict that! Except anyone who could count to three. Twice.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'rock' }],
    checks: [
      { name: 'beat the promise', steps: [{ tap: 'paper' }], expect: 'fail' },
      { name: 'scissors tie', steps: [{ tap: 'scissors' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
