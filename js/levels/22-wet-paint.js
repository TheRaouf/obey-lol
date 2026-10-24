/* Level 22 — Wet Paint
 * The exit door is freshly painted. Touching it wet is a trap. Either wait 30 seconds for it to dry,
 * or press and hold the fan for 2 seconds to dry it instantly — then open the door.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var FAN_MS = 2000, DRY_MS = 30000;

  OBEY.registerLevel({
    id: 'wet-paint',
    num: 22,
    title: 'Wet Paint',
    objective: 'Leave without ruining the paint job.',
    intro: 'Fresh paint on the exit! Don\'t touch it. Don\'t fan it. Don\'t do ANYTHING for about a hundred years.',
    introMood: 'suspicious',
    actions: ['hold', 'wait', 'tap'],
    par: 2,
    hints: [
      'Paint dries. Some things make it dry faster.',
      'The fan can be pressed and held.',
      'Hold the fan for two seconds (or wait 30 seconds), then open the door.'
    ],
    wrong: ['Touching the door while the paint is wet is a trap.', 'Letting go of the fan too early does nothing.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Dry paint, clean hands, smug player.',

    init: function () { return { wet: true, fanning: false, timer: null }; },

    onStart: function (s, api) {
      api.after(DRY_MS, function () {
        if (!s.wet) return;
        s.wet = false;
        api.say('It dried. On its own. In thirty seconds. That paint was very confident.', 'annoyed');
      });
    },

    view: function (s) {
      return [
        O('sign', 50, 6, 46, 12, { kind: 'static', text: s.wet ? 'WET PAINT' : 'Paint: dry', label: s.wet ? 'Sign: wet paint' : 'Sign: the paint is dry', cls: 'sign-card' }),
        O('door', 54, 22, 34, 66, { art: 'door', artOpts: { sign: 'EXIT', wet: s.wet }, label: s.wet ? 'Exit door, paint still wet' : 'Exit door, paint dry' }),
        O('fan', 6, 40, 34, 48, { art: 'fan', artOpts: { spinning: s.fanning }, label: 'Electric fan (press and hold)', hold: true, cls: s.fanning ? 'charging' : '' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'holdstart:fan':
          if (!s.wet) return true;
          s.fanning = true;
          api.say('Are you FANNING my paint? Stop that! Stop… that\'s actually quite effective. STOP.', 'panicked');
          s.timer = api.after(FAN_MS, function () {
            s.timer = null; s.fanning = false; s.wet = false;
            api.defy('fan');
            api.say('Bone dry. You fanned it. Nobody fans paint! That should be illegal. (It isn\'t.)', 'annoyed');
          });
          return true;
        case 'holdend:fan':
          s.fanning = false;
          if (s.timer) { api.cancel(s.timer); s.timer = null; api.say('Still tacky. Hold the fan longer if you insist on being clever.', 'suspicious'); }
          return true;
        case 'tap:fan':
          api.say('It\'s a fan. You have to press and HOLD it. Not that you should.', 'neutral');
          return true;
        case 'tap:door':
          if (s.wet) api.fail('SPLODGE! Handprints all over the fresh paint. Bossworth repaints it in a huff. Wait for it to dry!');
          else api.complete({ line: 'Out you go, not a smudge on you. I\'m going to paint a much bigger door next time.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ hold: ['fan', 2200] }, { tap: 'door' }],
    alternatives: { patient: [{ wait: 30500 }, { tap: 'door' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
