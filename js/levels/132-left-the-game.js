/* Level 132 — Left the Game (Pixel Palace)
 * A fake system message: "Bossworth has left the game." A "new" narrator, Totally_Not_Bossworth
 * (moustache, says "obviously"), wants to be made host and wants the big red button pressed.
 * Player list: Totally_Not_Bossworth (just joined), Kevin_99 (reputation: always lies),
 * Gerald (honest hamster, AFK). Poke Gerald awake, then make Gerald host: the host opens the exit.
 * Red button / host to T_N_B: traps. Host to Kevin or sleeping Gerald: nope. Ban T_N_B: ruin.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'left-the-game',
    num: 132,
    title: 'Left the Game',
    objective: 'Get someone trustworthy to open the exit.',
    intro: '[SYSTEM] Bossworth has left the game. …Ahem. Hello! I am a totally new narrator. Make me host and press the big red button. Obviously. — Totally_Not_Bossworth',
    introMood: 'suspicious',
    actions: ['tap', 'logic', 'choice'],
    par: 2,
    hints: [
      'Only the host can open the exit. Read each player\'s reputation.',
      'Kevin always lies. The new "narrator" has a familiar moustache. Gerald is honest, but asleep.',
      'Poke Gerald awake, then make Gerald host.'
    ],
    wrong: ['Pressing the big red button is a trap.', 'Making Totally_Not_Bossworth host puts him back in charge (trap).', 'Kevin as host just lies about opening the door (nope).', 'A sleeping Gerald can\'t be host (nope).', 'Banning Totally_Not_Bossworth bans the real narrator (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Host migrated. Narrator… pending.',
    trick: 'The player list gave everyone away: the liar was labelled, the moustache was familiar, and the only honest player just needed waking up.',

    init: function () { return { awake: false }; },

    view: function (s) {
      var out = [
        O('banner', 4, 3, 92, 9, { kind: 'static', text: 'SYSTEM: Bossworth has left the game.', label: 'System message: Bossworth has left the game', cls: 'display-card' }),
        O('chat', 4, 13, 61, 43, { kind: 'static', text: 'CHAT\nTotally_Not_Bossworth: hi stranger. make me host. obviously.\nKevin_99: Gerald is the impostor!\nGerald: ' + (s.awake ? 'oh hello! i can open the exit if i\'m host.' : 'zzzzzzzz'), label: 'Chat. Totally_Not_Bossworth: make me host, obviously. Kevin_99: Gerald is the impostor. Gerald: ' + (s.awake ? 'I can open the exit if I am host.' : 'snoring.'), cls: 'book-card' }),
        O('plinth', 66, 35, 32, 6, { kind: 'static', art: 'shelf' }),
        O('red', 68, 14, 28, 24, { art: 'bigbutton', label: 'Big red button (Totally_Not_Bossworth says press it)' }),
        O('redTag', 68, 39, 28, 13, { kind: 'static', text: 'T_N_B says:\n"press me!"', label: '', cls: 'tag-card' })
      ];
      var rows = [
        { id: 'tnb', name: 'Totally_Not_Bossworth', rep: 'just joined · moustache', av: { color: '#ffb347', moustache: true }, b1: ['tnbHost', 'Make host'], b2: ['tnbBan', 'Ban'] },
        { id: 'kevin', name: 'Kevin_99', rep: 'reputation: ALWAYS LIES', av: { color: '#9b5de5' }, b1: ['kevinHost', 'Make host'], b2: null },
        { id: 'gerald', name: 'Gerald', rep: s.awake ? 'honest hamster · awake' : 'honest · AFK (asleep)', av: { color: '#e0a96d', ears: true, asleep: !s.awake }, b1: ['geraldHost', 'Make host'], b2: s.awake ? null : ['geraldPoke', 'Poke'] }
      ];
      rows.forEach(function (r, i) {
        var y = 58 + i * 13.5;
        out.push(O('av-' + r.id, 4, y, 11, 12, { kind: 'static', art: 'e-avatar', artOpts: r.av, label: '' }));
        out.push(O('name-' + r.id, 16, y, 44, 13, { kind: 'static', text: r.name + '\n' + r.rep, label: 'Player ' + r.name + ', ' + r.rep, cls: 'tag-card' }));
        out.push(O(r.b1[0], 60, y + 1, 18, 10, { text: r.b1[1], label: r.b1[1] + ': ' + r.name, cls: 'btn-card' }));
        if (r.b2) out.push(O(r.b2[0], 80, y + 1, 16, 10, { text: r.b2[1], label: r.b2[1] + ': ' + r.name, cls: 'btn-card' + (r.b2[1] === 'Ban' ? ' accent' : '') }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'red':
          api.fail('You pressed it. Confetti cannon. Straight in the face. "Totally_Not_Bossworth" laughs in a VERY familiar voice. Lobby resets.');
          return true;
        case 'tnbHost':
          api.fail('Totally_Not_Bossworth is now host. The moustache falls off. "Bossworth has REJOINED the game." He resets the lobby. Obviously.');
          return true;
        case 'tnbBan':
          api.complete({ ruin: 'banned-for-life', line: 'BANNED?! From my OWN game?! I was only in disguise! Let me back in! I have the narration! I have the MOODS! …Hello? Is this thing on?', mood: 'panicked' });
          return true;
        case 'kevinHost':
          api.nope('kevinHost');
          api.say('Kevin_99 is host. "I have opened the exit," says Kevin. The exit is closed. Kevin always lies. Kevin is demoted.', 'pleased');
          return true;
        case 'geraldPoke':
          s.awake = true;
          api.say('Gerald wakes up. Gerald stretches. Gerald says hello. Gerald is… lovely. Ugh. Don\'t make Gerald host.', 'annoyed');
          return true;
        case 'geraldHost':
          if (!s.awake) {
            api.nope('geraldHost');
            api.say('You can\'t make a sleeping hamster host. Hosts must be awake. That\'s the one rule I agree with.', 'pleased');
          } else {
            api.defy('host');
            api.complete({ line: 'Gerald, host, opens the exit. Everyone cheers. "Bossworth has rejoined the game." …I was gone for ONE level and you replaced me with a HAMSTER.', mood: 'defeated' });
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'geraldPoke' }, { tap: 'geraldHost' }],
    ruinPaths: { 'banned-for-life': [{ tap: 'tnbBan' }] },
    checks: [
      { name: 'press the big red button', steps: [{ tap: 'red' }], expect: 'fail' },
      { name: 'make Totally_Not_Bossworth host', steps: [{ tap: 'tnbHost' }], expect: 'fail' },
      { name: 'make Kevin host', steps: [{ tap: 'kevinHost' }], expect: 'nope' },
      { name: 'make sleeping Gerald host', steps: [{ tap: 'geraldHost' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
