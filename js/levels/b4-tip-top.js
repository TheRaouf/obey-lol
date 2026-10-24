/* Bonus 4 — Tip Top (Sabotage Studio)
 * Put the tree on its stand, pointy end UP. The tree starts lying on its side; "Rotate" turns it.
 * Obey: rotate once (pointy end up), place it.  Ruin: rotate twice (pointy end down) and place it.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DIRS = ['side', 'up', 'down'];
  var WORD = { side: 'lying on its side', up: 'pointy end up', down: 'pointy end down' };

  OBEY.registerLevel({
    id: 'tip-top',
    num: 104,
    title: 'Tip Top',
    objective: 'Put the tree on the stand, pointy end up.',
    intro: 'Last test. Put the tree on the stand. Pointy end UP. Even you can\'t ruin a tree. …Can you?',
    introMood: 'pleased',
    actions: ['tap', 'drag'],
    par: 2,
    hints: [
      'The tree is lying down. Trees don\'t nap.',
      'The Rotate button turns the tree.',
      'Rotate once so the pointy end is up, then drag the tree onto the stand.'
    ],
    wrong: ['A tree lying on its side won\'t stand (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'A tree, standing. The Sabotage Studio is closed for the season.',

    init: function () { return { dir: 'side', placed: false }; },

    view: function (s) {
      return [
        O('tree', 10, 24, 34, 40, { art: 'tree', artOpts: { dir: s.dir }, drag: true, label: 'Tree, ' + WORD[s.dir] + ' (drag it onto the stand)' }),
        O('stand', 56, 62, 34, 22, { art: 'treestand', zone: true, label: 'Tree stand' }),
        O('rotate', 10, 72, 34, 12, { text: 'Rotate ↻', label: 'Rotate the tree', cls: 'btn-card' }),
        O('label', 52, 10, 42, 12, { kind: 'static', text: 'POINTY END UP', label: 'Sign: pointy end up', cls: 'sign-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'rotate') {
        s.dir = DIRS[(DIRS.indexOf(s.dir) + 1) % DIRS.length];
        if (s.dir === 'down') api.say('Why is it upside down? WHY would you need that?', 'suspicious');
        return true;
      }
      if (a.type === 'drop' && a.target === 'tree') {
        if (a.zone !== 'stand') return false;
        if (s.dir === 'side') { api.nope('tree'); api.say('It\'s lying down. Trees don\'t nap. Stand it UP.', 'annoyed'); return true; }
        if (s.dir === 'up') { api.complete({ line: 'Pointy end up. Textbook. Boring, but textbook. I approve. Barely.', mood: 'pleased' }); return true; }
        api.complete({ ruin: 'tip-top', line: 'It\'s balancing on its TIP. That\'s physically impossible. And… honestly beautiful. I hate it.', mood: 'panicked' });
        return true;
      }
      return false;
    },

    solution: [{ tap: 'rotate' }, { drop: ['tree', 'stand'] }],
    ruinPaths: { 'tip-top': [{ tap: 'rotate' }, { tap: 'rotate' }, { drop: ['tree', 'stand'] }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
