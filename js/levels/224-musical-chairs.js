/* Level 224 — Musical Chairs (Gutter Gulch)
 * One chair, you versus Bossworth. Sit when the music stops; sit while it plays and you're out (trap).
 * Bossworth shouts "STOP!" twice while the track is still playing. The boombox display counts the
 * track down honestly; at 0:00 it really stops, and Bossworth keeps dancing with his eyes shut.
 * Solution: wait for the display to read 0:00, then sit. Waiting longer is fine.
 * Wrong: sitting while the music plays (trap); touching the boombox (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TRACK = 9;

  OBEY.registerLevel({
    id: 'musical-chairs',
    num: 224,
    title: 'Musical Chairs',
    objective: 'Get the last chair when the music stops.',
    intro: 'Musical chairs! One chair, two players. Sit when the music stops. I\'ll shout when it stops. I have excellent ears. Trust the ears.',
    introMood: 'surprised',
    actions: ['wait', 'tap', 'observe'],
    par: 1,
    hints: [
      'Don\'t listen to Bossworth. Watch the boombox display.',
      'The display counts the song down. The music only stops at 0:00.',
      'Wait until the display shows 0:00 and SILENCE, then sit on the chair.'
    ],
    wrong: ['Sitting while the music still plays puts you out (trap).', 'Only the DJ may touch the boombox (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One chair, one winner, one referee still dancing.',
    trick: 'Bossworth\'s "STOP!" was a bluff; the boombox display showed when the music really stopped.',

    init: function () { return { left: TRACK }; },

    onStart: function (s, api) {
      api.every(1000, function () {
        if (s.left <= 0) return;
        s.left--;
        var played = TRACK - s.left;
        if (played === 2) api.say('STOP! It stopped! The music STOPPED! Sit down, quick!', 'surprised');
        else if (played === 3) api.say('…oh, it\'s still going. My ears are very… artistic.', 'suspicious');
        else if (played === 5) api.say('And… STOP! Definitely stopped this time! SIT SIT SIT!', 'panicked');
        else if (played === 6) api.say('Hmm. Long song. Lovely song. Dance, dance.', 'pleased');
        else if (s.left === 0) api.say('La la la… *eyes shut, still dancing* …la la… nobody sit… la…', 'pleased');
      });
    },

    view: function (s) {
      var playing = s.left > 0;
      return [
        O('rules', 4, 3, 92, 15, { kind: 'static', text: 'MUSICAL CHAIRS: sit when the music STOPS. Sit while it plays: OUT.', label: 'Musical chairs: sit when the music stops. Sit while it plays and you are out.', cls: 'book-card' }),
        O('display', 4, 28, 36, 13, { kind: 'static', text: playing ? '♪ PLAYING 0:0' + s.left : '0:00 SILENCE', label: playing ? 'Boombox display: playing, ' + s.left + ' seconds left' : 'Boombox display: zero seconds, silence', cls: playing ? 'display-card' : 'display-card ready' }),
        O('table', 4, 64, 36, 10, { kind: 'static', art: 'table' }),
        O('box', 8, 45, 28, 19, { art: 'j-boombox', artOpts: { playing: playing }, label: playing ? 'Boombox, playing music' : 'Boombox, silent' }),
        O('chair', 46, 38, 27, 36, { art: 'j-chair', label: 'The last chair (sit on it)' }),
        O('boss', 76, 52, 22, 22, { kind: 'static', art: 'j-boss', label: playing ? 'Bossworth, dancing' : 'Bossworth, still dancing with his eyes shut' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'box') {
        api.nope('box');
        api.say('Hands off the boombox! Only the DJ touches the music. I\'m the DJ. And the referee. And the best dancer.', 'annoyed');
        return true;
      }
      if (a.target !== 'chair') return false;
      if (s.left > 0) {
        api.fail('You sat down… and the music is still playing. OUT! Rules are rules. Even when I shouted. Especially when I shouted. Again!', 'laughing');
      } else {
        api.defy('wait');
        api.complete({ line: '*opens eyes* The music stopped? When? You\'re SITTING? In MY chair? …It was never my chair. It was the game\'s chair. I hate this game.', mood: 'defeated' });
      }
      return true;
    },

    solution: [{ wait: 9500 }, { tap: 'chair' }],
    alternatives: { 'very-patient': [{ wait: 30000 }, { tap: 'chair' }] },
    checks: [
      { name: 'sit at his first STOP', steps: [{ wait: 2500 }, { tap: 'chair' }], expect: 'fail' },
      { name: 'touch the boombox', steps: [{ tap: 'box' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
