/* Level 122 — The Prompter (Curtain Call)
 * Bossworth stars in his own play and keeps forgetting his lines. You are the prompter.
 * He insists his lines are heroic; the script on the desk says otherwise. Feed him the real lines.
 * Flattering line at cue 1: nope. Flattering line at cue 2: trap (the audience boos).
 * Ruin: feed him the stage direction "Exit, pursued by a bear".
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CUES = [
    { cue: 'GHOST: "Who goes there?"\nSIR B: "…er… LINE!"', options: [['hero', 'A hero! Tall, wise and correct.'], ['damp', 'Only a small, damp knight.'], ['bear', '[Exit, pursued by a bear]']], right: 'damp' },
    { cue: 'GHOST: "Are you brave?"\nSIR B: "…um… LINE! LINE!"', options: [['never', 'I have never been wrong.'], ['bear', '[Exit, pursued by a bear]'], ['wrong', 'I have been wrong about everything.']], right: 'wrong' }
  ];

  OBEY.registerLevel({
    id: 'the-prompter',
    num: 122,
    title: 'The Prompter',
    objective: 'Prompt Bossworth through his play.',
    intro: 'Tonight: my one-man play! You\'re the prompter. When I forget a line, feed it to me. My lines are all heroic, obviously. No need to read the script.',
    introMood: 'pleased',
    actions: ['tap', 'read'],
    par: 2,
    hints: [
      'A prompter reads the script. Bossworth hasn\'t.',
      'Find each forgotten line in the script on the desk. They are not flattering.',
      'Prompt "Only a small, damp knight.", then "I have been wrong about everything."'
    ],
    wrong: ['A heroic line that isn\'t in the script gets a nope at the first cue.', 'A heroic line at the second cue makes the audience boo (trap).', 'The stage direction about a bear sends Bossworth running (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'A standing ovation, mostly for the prompter.',
    trick: 'The script on the desk held the real lines, so you prompted what was written rather than what Bossworth wished he\'d written.',

    init: function () { return { step: 0 }; },

    view: function (s) {
      var c = CUES[Math.min(s.step, 1)];
      var out = [
        O('script', 4, 4, 52, 48, { kind: 'static', text: 'SCRIPT: "The Knight Who Was Right"\nGHOST: Who goes there?\nSIR B: Only a small, damp knight.\nGHOST: Are you brave?\nSIR B: I have been wrong about everything.\n(Curtain.)', label: 'Script. Ghost: Who goes there? Sir B: Only a small, damp knight. Ghost: Are you brave? Sir B: I have been wrong about everything. Curtain.', cls: 'book-card' }),
        O('curtain', 86, 0, 14, 52, { kind: 'static', art: 'e-curtain', artOpts: { flip: true } }),
        O('ghost', 64, 4, 20, 24, { kind: 'static', art: 'e-ghost', label: 'An actor in a ghost sheet' }),
        O('cue', 58, 30, 38, 20, { kind: 'static', text: c.cue, label: 'On stage now: ' + c.cue, cls: 'speech-card' }),
        O('desk', 4, 54, 92, 7, { kind: 'static', text: 'Prompter\'s box: whisper a line', label: '', cls: 'tag-card' })
      ];
      c.options.forEach(function (o, i) {
        out.push(O(o[0], 4, 63 + i * 12, 92, 10.5, { text: o[1], label: 'Prompt: ' + o[1], cls: 'btn-card option' }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var c = CUES[s.step];
      if (!c || !c.options.some(function (o) { return o[0] === a.target; })) return false;
      if (a.target === 'bear') {
        api.complete({ ruin: 'pursued-by-a-bear', line: 'Why is there a BEAR? Who hired a BEAR? It\'s in the script?! AAAH! I\'m exiting! I\'m exiting! Curtain! CURTAIN!', mood: 'panicked' });
        return true;
      }
      if (a.target === c.right) {
        s.step++;
        api.defy('script-' + s.step);
        if (s.step >= CUES.length) {
          api.complete({ line: '"I have been wrong about everything." …They\'re CLAPPING? For THAT? Who wrote this play? …I wrote this play.', mood: 'defeated' });
        } else {
          api.say('"Only a small… damp… knight." That\'s… what it says? I wrote that? I must have been damp at the time.', 'annoyed');
        }
        return true;
      }
      if (s.step === 0) {
        api.nope(a.target);
        api.say('Yes! "A hero! Tall, wise and…" the ghost is checking the script. The ghost says that\'s not the line. Rude ghost.', 'suspicious');
      } else {
        api.fail('"I have never been wrong!" The audience boos. They\'ve read the programme. From the top, everyone!');
      }
      return true;
    },

    solution: [{ tap: 'damp' }, { tap: 'wrong' }],
    ruinPaths: { 'pursued-by-a-bear': [{ tap: 'damp' }, { tap: 'bear' }] },
    checks: [
      { name: 'heroic line at cue 1', steps: [{ tap: 'hero' }], expect: 'nope' },
      { name: 'heroic line at cue 2', steps: [{ tap: 'damp' }, { tap: 'never' }], expect: 'fail' },
      { name: 'bear straight away is a ruin', steps: [{ tap: 'bear' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
