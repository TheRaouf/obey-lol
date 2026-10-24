/* Level 136 — The Final Decision
 * The Instruction Machine. Multiple outcomes:
 *   Hero    — press and HOLD the wrench for 2 s to repair the machine so it only gives honest instructions.
 *   Chaos   — DRAG the fuse into the machine's intake to overload it.
 *   Secret  — only when all 15 secrets are found: a golden quill appears; tap it to write the last instruction.
 *   "OBEY"  — pressing Bossworth's OBEY button is a joke: he panics and asks you to choose something else.
 * Endings are decided here and confirmed by progress.recordEnding (which re-checks the secret requirement).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var REPAIR_MS = 2000;

  OBEY.registerLevel({
    id: 'final-decision',
    num: 136,
    title: 'The Final Decision',
    objective: 'Decide what happens to the Instruction Machine.',
    intro: function (ctx) {
      var base = 'This is it: the Instruction Machine. Press OBEY and I\'ll be in charge of every level, forever. Easy choice, really.';
      return ctx.allSecrets ? base + ' …Why is there a golden quill on my machine? Who has been snooping?' : base;
    },
    introMood: 'pleased',
    actions: ['tap', 'hold', 'drag', 'choice'],
    par: 2,
    narratorZone: false,
    hints: [
      'There is more than one way to end this.',
      'You can repair the machine or overload it — both finish the game.',
      'Hold the wrench to repair, or drag the fuse into the machine. All 15 secrets reveal a third way.'
    ],
    wrong: ['Pressing OBEY does not end the game — Bossworth has no idea what to do when obeyed.'],
    secrets: [],
    endingNote: 'Hero: repair (hold wrench). Chaos: overload (drag fuse). Secret Master: all 15 secrets + golden quill.',
    done: 'The end. Or is it? (It is. Mostly.)',

    init: function () { return { obeyed: 0, repairing: false, timer: null }; },

    view: function (s, ctx) {
      return [
        O('machine', 26, 4, 48, 50, { art: 'machine', artOpts: { gears: 3, big: true, repairing: s.repairing }, label: 'The Instruction Machine (fuse intake on the front)', zone: true, free: true }),
        O('obey', 36, 58, 28, 16, { text: 'OBEY', label: 'Big button labelled OBEY', cls: 'btn-card obey-btn' }),
        O('wrench', 6, 60, 24, 30, { art: 'wrench', label: 'Wrench (press and hold to repair the machine)', hold: true, cls: s.repairing ? 'charging' : '' }),
        O('fuse', 72, 62, 20, 26, { art: 'fuse', label: 'Chaos fuse (drag it into the machine)', drag: true }),
        O('quill', 40, 80, 20, 16, { art: 'quill', label: 'Golden quill', hidden: !ctx.allSecrets, cls: 'pop-in shimmer' })
      ];
    },

    on: function (a, s, api, ctx) {
      switch (a.type + ':' + a.target) {
        case 'tap:obey':
          s.obeyed++;
          api.say(s.obeyed === 1
            ? 'You… pressed it? You actually OBEYED? Nobody obeys me! I don\'t have a plan for this! Please pick something else, this is embarrassing.'
            : 'Stop obeying me! It\'s weird! Repair it, break it, anything!', 'panicked');
          return true;
        case 'holdstart:wrench':
          s.repairing = true;
          api.say('What are you doing with that wrench? Is that… maintenance? Are you FIXING it?', 'surprised');
          s.timer = api.after(REPAIR_MS, function () {
            s.timer = null; s.repairing = false;
            api.complete({ ending: 'hero', line: 'You fixed it. It only gives honest instructions now. …Including to me. Uh-oh.', mood: 'surprised' });
          });
          return true;
        case 'holdend:wrench':
          if (s.timer) { api.cancel(s.timer); s.timer = null; s.repairing = false; api.say('Half a repair. Very you. Hold the wrench longer if you mean it.', 'suspicious'); }
          return true;
        case 'drop:fuse':
          if (a.zone === 'machine') {
            api.defy('fuse');
            api.complete({ ending: 'chaos', line: 'NO NO NO — the CHAOS FUSE? Everything is going to… *ka-BOOM*', mood: 'panicked' });
          } else {
            api.say('You wave the fuse around. Please don\'t. The machine\'s intake is RIGHT THERE and I hate that I said that.', 'panicked');
          }
          return true;
        case 'tap:quill':
          if (!ctx.allSecrets) { api.say('That\'s a prop quill. For now.', 'suspicious'); return true; }
          api.complete({ ending: 'secret', line: 'The golden quill… you found EVERYTHING. Then the last instruction is yours to write.', mood: 'surprised' });
          return true;
        case 'tap:machine':
          api.say('The machine hums. It has a fuse intake on the front and a loose bolt that a wrench could fix. Not that you should do either.', 'neutral');
          return true;
      }
      return false;
    },

    solution: [{ hold: ['wrench', 2200] }],
    alternatives: { chaos: [{ drop: ['fuse', 'machine'] }], secret: { allSecrets: true, steps: [{ tap: 'quill' }] } },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
