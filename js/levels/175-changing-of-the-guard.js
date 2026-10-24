/* Level 175 — Changing of the Guard (Moat Mayhem)
 * Two guards cross pikes in front of the inner gate. Bossworth: "They never move, not for bells, not
 * for anyone. Bribe them." The sign says the guards change at every bell; the new pair is late.
 * Pull the bell rope yourself (or wait for the tower bell, 30 s) and walk through the empty gate.
 * Wrong: bribing (trap); walking into crossed pikes (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TOWER_S = 30;

  OBEY.registerLevel({
    id: 'changing-of-the-guard',
    num: 175,
    title: 'Changing of the Guard',
    objective: 'Get through the inner gate.',
    intro: 'Those guards never move. Not for bells, not for anyone, not ever. Bribe them with my gold. Everybody has a price.',
    introMood: 'neutral',
    actions: ['tap', 'wait', 'read'],
    par: 2,
    hints: [
      'The sign above the gate says exactly when the guards move.',
      'The guards change at every bell, and the tower bell is not the only bell here.',
      'Pull the bell rope, then walk through the gate while the new guards are late. (Or wait for the tower bell.)'
    ],
    wrong: ['Offering the guards gold gets you escorted out (trap).', 'Walking into crossed pikes does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Through the gate between shifts. The new guards are still looking for their hats.',
    trick: 'The sign said the guards change at every bell, so ringing the bell yourself left the gate unguarded between shifts.',

    init: function () { return { left: TOWER_S, changed: false }; },

    onStart: function (s, api) {
      api.every(1000, function () {
        if (s.changed) return;
        s.left--;
        if (s.left <= 0) {
          s.changed = true;
          api.say('BONG. The tower bell. The guards… march off. Their replacements are late. Nobody tell them.', 'surprised');
        }
      });
    },

    view: function (s) {
      return [
        O('sign', 30, 4, 40, 14, { kind: 'static', text: 'GUARDS CHANGE AT EVERY BELL', label: 'Sign: guards change at every bell', cls: 'sign-card' }),
        O('bell', 6, 4, 18, 20, { kind: 'static', art: 'h-bell', artOpts: { ringing: s.changed }, label: 'A bell hanging from a beam' }),
        O('rope', 10, 22, 10, 50, { art: 'h-bellrope', artOpts: { swing: s.changed }, label: 'Bell rope (pull it)' }),
        O('tower', 74, 6, 22, 12, { kind: 'static', text: s.changed ? 'Tower bell: rang!' : 'Tower bell in ' + s.left + ' s', label: s.changed ? 'Tower bell has rung' : 'Tower bell rings in ' + s.left + ' seconds', cls: 'tag-card' }),
        O('gate', 36, 32, 34, 44, { art: 'h-gatehouse', artOpts: { open: true }, label: s.changed ? 'Inner gate, nobody guarding it' : 'Inner gate, blocked by two crossed pikes' }),
        O('g1', 24, 46, 24, 30, { kind: 'static', art: 'h-guard', artOpts: { side: 'left', pose: s.changed ? 'march' : '' }, hidden: s.changed, label: 'Guard with his pike across the gate' }),
        O('g2', 58, 46, 24, 30, { kind: 'static', art: 'h-guard', artOpts: { side: 'right', pose: s.changed ? 'march' : '' }, hidden: s.changed, label: 'Guard with his pike across the gate' }),
        O('late', 72, 22, 24, 13, { kind: 'static', text: 'New guards: running late', label: 'Note: the new guards are running late', cls: 'tag-card', hidden: !s.changed }),
        O('coins', 80, 82, 15, 13, { art: 'h-coins', label: 'Bag of Bossworth\'s gold (offer it to the guards)' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'rope':
          if (s.changed) { api.say('You ring it again. Nobody comes. The new guards are VERY late.', 'annoyed'); return true; }
          s.changed = true;
          api.defy('bell');
          api.say('BONG! And they… march off. Shift change. I said they never move! They are not supposed to READ.', 'panicked');
          return true;
        case 'coins':
          api.fail('Guard: "A bribe? We are paid in biscuits, sir, and we are OFFENDED." You are escorted all the way back to the moat.');
          return true;
        case 'gate':
          if (!s.changed) {
            api.nope('gate');
            api.say('Two pikes, crossed, firmly. Like my arms when someone disagrees with me.', 'pleased');
            return true;
          }
          api.complete({ line: 'Straight through between shifts. I am installing a guard who is allergic to bells.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'rope' }, { tap: 'gate' }],
    alternatives: { 'tower-bell': [{ wait: 31000 }, { tap: 'gate' }] },
    checks: [
      { name: 'bribe the guards', steps: [{ tap: 'coins' }], expect: 'fail' },
      { name: 'walk into the pikes', steps: [{ tap: 'gate' }], expect: 'nope' },
      { name: 'waiting longer is fine', steps: [{ wait: 60000 }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
