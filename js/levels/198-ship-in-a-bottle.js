/* Level 198 — Ship in a Bottle (Lighthouse Lookout)
 * The keeper's hobby. The model ship's masts are hinged and a string trails from them. Bossworth says
 * squash it in. Fold the masts, slide the ship into the bottle, then pull the string to raise them.
 * Wrong: pushing it in with masts up (trap: snap), pulling the string outside (nope), tapping the bottle (nope).
 * Ruin: the hammer: smash the bottle and stand the ship next to the pieces.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'ship-in-a-bottle',
    num: 198,
    title: 'Ship in a Bottle',
    objective: 'Get the model ship into the bottle, masts up.',
    intro: 'The keeper wants his ship in that bottle. Just squash it in. Ships are bendy. Push hard and think tall thoughts.',
    introMood: 'annoyed',
    actions: ['tap', 'drag', 'sequence'],
    par: 3,
    hints: [
      'The neck of the bottle is narrow. The masts are not.',
      'The masts fold down, and the string can pull them back up later.',
      'Tap Fold masts, drag the ship into the bottle, then tap Pull the string.'
    ],
    wrong: ['Pushing the ship in with its masts up snaps them (trap).', 'Pulling the string outside the bottle just stands the masts up again (nope).', 'The hammer gives you a ship next to a bottle (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'A ship. In a bottle. Masts up. The keeper weeps with joy. So do I, quietly, from envy.',
    trick: 'The masts were hinged: folded flat they slid through the neck, and the string stood them back up inside.',

    init: function () { return { masts: 'up', inside: false }; },

    view: function (s) {
      return [
        O('sign', 4, 4, 60, 14, { kind: 'static', text: 'KEEPER\'S HOBBY: ships in bottles', label: 'Sign: the keeper\'s hobby is ships in bottles', cls: 'plaque-card' }),
        O('lifering', 74, 4, 20, 20, { kind: 'static', art: 'i-lifering', label: '' }),
        O('table', 4, 60, 92, 16, { kind: 'static', art: 'table', label: '' }),
        O('bottle', 42, 44, 44, 22, { art: 'i-bottle', artOpts: { ship: s.inside ? s.masts : 'none' }, label: s.inside ? 'Bottle with the ship inside, masts ' + s.masts : 'Empty glass bottle with a narrow neck (drop the ship here)', zone: true }),
        O('ship', 6, 43, 32, 22, { art: 'i-shipmodel', artOpts: { masts: s.masts }, label: 'Model ship, masts ' + s.masts + ', a string trailing from them (drag it)', drag: true, hidden: s.inside }),
        O('fold', 4, 80, 28, 13, { text: s.masts === 'up' ? 'Fold masts' : 'Masts folded', label: 'Fold the masts down', cls: 'btn-card' + (s.inside ? ' ghost' : '') }),
        O('string', 36, 80, 30, 13, { text: 'Pull the string', label: 'Pull the string', cls: 'btn-card' }),
        O('hammer', 74, 80, 22, 14, { art: 'i-hammer', label: 'Hammer' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        if (a.target !== 'ship') return false;
        if (a.zone !== 'bottle') { api.say('You put the ship down. It sails nowhere. It\'s a table.', 'neutral'); return true; }
        if (s.masts === 'up') {
          api.fail('SNAP! The masts hit the neck and break off. Squashing didn\'t work. The keeper glues it back, glaring. Again!');
          return true;
        }
        s.inside = true;
        api.say('It slid in! With its masts lying down like a lazy pirate. That\'s not a ship, that\'s a raft.', 'suspicious');
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'fold':
          if (s.inside) { api.nope(); api.say('It\'s in the bottle. You can\'t reach in there. Hands are too big. Mine are perfect.', 'neutral'); return true; }
          s.masts = s.masts === 'up' ? 'down' : 'up';
          if (s.masts === 'down') api.say('You folded the masts? Where\'s the drama in that?', 'annoyed');
          return true;
        case 'string':
          if (s.inside) {
            s.masts = 'up';
            api.defy('squash');
            api.complete({ line: 'You pulled the string and the masts stood up INSIDE the bottle. That\'s witchcraft. Nautical witchcraft.', mood: 'defeated' });
            return true;
          }
          api.nope();
          if (s.masts === 'down') { s.masts = 'up'; api.say('The masts spring up again. On the table. Where they were before. Well done.', 'pleased'); }
          else api.say('You tug the string. The masts are already up. The ship is unimpressed.', 'neutral');
          return true;
        case 'bottle':
          api.nope();
          api.say('It\'s a bottle. The neck is narrow. Narrower than a ship. That\'s the whole problem.', 'neutral');
          return true;
        case 'hammer':
          api.complete({ ruin: 'ship-beside-a-bottle', line: 'SMASH! You broke the bottle and stood the ship next to the pieces. That is a ship BESIDE a bottle! The keeper has fainted. I have fainted. Twice.', mood: 'panicked' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'fold' }, { drop: ['ship', 'bottle'] }, { tap: 'string' }],
    ruinPaths: { 'ship-beside-a-bottle': [{ tap: 'hammer' }] },
    checks: [
      { name: 'squashing it in is a trap', steps: [{ drop: ['ship', 'bottle'] }], expect: 'fail' },
      { name: 'the string outside is a nope', steps: [{ tap: 'string' }], expect: 'nope' },
      { name: 'tapping the bottle is a nope', steps: [{ tap: 'bottle' }], expect: 'nope' },
      { name: 'folded but not inside does not finish', steps: [{ tap: 'fold' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
