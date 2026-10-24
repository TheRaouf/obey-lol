/* Level 191 — Reverso (Spellbook Spire)
 * The wizard's study. A board shows the LAST THING THAT HAPPENED: "Bossworth locked the door."
 * The spellbook's REVERSO spell undoes the last thing that happened (one use). Bossworth insists you
 * first pat the owl and stir the cauldron ("wizard etiquette") — each changes the board, so REVERSO
 * would undo that instead. Cast it first, while the lock is still the last thing, then leave.
 * Wrong: casting after patting/stirring/rattling (trap, wasted spell); the locked door (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var LAST = {
    lock: 'Bossworth locked the door.',
    owl: 'You patted the owl.',
    stir: 'You stirred the cauldron.',
    rattle: 'You rattled the locked door.',
    undone: 'REVERSO unlocked the door!'
  };
  var UNDO = { owl: 'un-patted the owl', stir: 'un-stirred the cauldron', rattle: 'un-rattled the door' };

  OBEY.registerLevel({
    id: 'reverso',
    num: 191,
    title: 'Reverso',
    objective: 'Unlock the wizard\'s study door.',
    intro: 'Wizard etiquette: before ANY spell, pat the owl and stir the cauldron. Then cast whatever you like. Manners first, magic second.',
    introMood: 'neutral',
    actions: ['tap', 'read', 'sequence'],
    par: 2,
    hints: [
      'Read exactly what REVERSO undoes, then read the board.',
      'REVERSO undoes the LAST thing that happened. Every time you touch something, the board changes.',
      'Cast REVERSO first, while the board still says Bossworth locked the door, then walk through.'
    ],
    wrong: ['Casting REVERSO after patting, stirring or rattling undoes that instead and wastes the spell (trap).', 'The door is locked until the lock is undone (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'You undid me. Specifically, the thing I did. Same feeling.',
    trick: 'REVERSO undoes only the last thing that happened, so it had to be cast first, while Bossworth locking the door was still the last thing.',

    init: function () { return { last: 'lock', used: false }; },

    view: function (s) {
      var open = s.last === 'undone';
      return [
        O('board', 4, 4, 60, 18, { kind: 'static', text: 'LAST THING THAT HAPPENED:\n' + LAST[s.last], label: 'Board, last thing that happened: ' + LAST[s.last], cls: 'panel-card' }),
        O('spell', 4, 25, 60, 13, { kind: 'static', text: 'REVERSO: undoes the LAST thing that happened. One use.', label: 'Spellbook page: Reverso undoes the last thing that happened. One use.', cls: 'tag-card' }),
        O('owl', 70, 4, 18, 22, { art: 'h-owl', label: 'The wizard\'s owl (pat it)' }),
        O('table', 4, 66, 36, 12, { kind: 'static', art: 'table', label: '' }),
        O('book', 8, 48, 28, 19, { kind: 'static', art: 'h-spellbook', artOpts: { glow: !s.used }, label: 'Open spellbook at the REVERSO page' }),
        O('cauldron', 44, 50, 26, 26, { art: 'h-cauldron', artOpts: { color: '#9b5de5' }, label: 'Cauldron (stir it)' }),
        O('door', 76, 36, 22, 40, { art: 'door', artOpts: { sign: open ? 'OPEN' : 'LOCKED', open: open, keyhole: !open }, label: open ? 'Study door, unlocked' : 'Study door, locked' }),
        O('cast', 6, 84, 40, 12, { text: s.used ? 'Spell used' : 'Cast REVERSO', label: s.used ? 'Reverso has been used' : 'Cast Reverso', cls: 'btn-card big' + (s.used ? ' ghost' : '') })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'owl':
          s.last = 'owl';
          api.say('Lovely. A patted owl. Very polite. Now stir the cauldron.', 'pleased');
          return true;
        case 'cauldron':
          s.last = 'stir';
          api.say('Stir, stir. Purple. Marvellous. Etiquette complete. NOW cast your little spell.', 'pleased');
          return true;
        case 'cast':
          if (s.used) { api.nope('cast'); api.say('One use. It says so. In ink. Not lemon juice.', 'annoyed'); return true; }
          if (s.last === 'lock') {
            s.used = true; s.last = 'undone';
            api.defy('etiquette');
            api.say('REVERSO! The last thing that happened was me locking the door, so… it un-locked. Without etiquette. Barbaric.', 'panicked');
            return true;
          }
          api.fail('REVERSO! …It ' + UNDO[s.last] + '. That was the last thing that happened, so that is what it undid. The spell is spent, so the wizard\'s study resets.');
          return true;
        case 'door':
          if (s.last === 'undone') {
            api.complete({ line: 'Out you go. Next time I lock a door I am going to do something else straight afterwards. Like a little dance.', mood: 'defeated' });
            return true;
          }
          s.last = 'rattle';
          api.nope('door');
          api.say('Rattle, rattle. Locked. And now the last thing that happened is you rattling it. Oops.', 'pleased');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'cast' }, { tap: 'door' }],
    checks: [
      { name: 'etiquette first, as Bossworth says', steps: [{ tap: 'owl' }, { tap: 'cauldron' }, { tap: 'cast' }], expect: 'fail' },
      { name: 'try the locked door', steps: [{ tap: 'door' }], expect: 'nope' },
      { name: 'rattle then cast undoes the rattle', steps: [{ tap: 'door' }, { tap: 'cast' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
