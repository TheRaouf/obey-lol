/* Level 15 — The Last Instruction
 * Prepares the finale. Bossworth's dialogue reacts to the player's earlier choices
 * (gift / rulebook / sign) — it never blocks completion.
 * Solution: collect the three gears (one in plain sight, one under the rug, one from Bossworth's hat),
 * then answer his question:  "I'll follow it" → choice trust=yes (hero lean)  "Why?" → choice trust=why (chaos lean).
 * No secret lives here (all 15 must be findable before the finale).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  function karmaFrom(choices) {
    var k = 0;
    Object.keys(choices || {}).forEach(function (key) {
      var lean = OBEY.CHOICES[key] && OBEY.CHOICES[key][choices[key]];
      if (lean === 'hero') k++; else if (lean === 'chaos') k--;
    });
    return k;
  }

  function memoryLine(choices) {
    var bits = [];
    if (choices.gift === 'prank') bits.push('you bonked me with my own gift');
    if (choices.gift === 'return') bits.push('you mailed my gift back, politely');
    if (choices.rule === 'potato') bits.push('you turned me into a potato');
    if (choices.rule === 'door') bits.push('you rewrote my rules');
    if (choices.sign === 'graffiti') bits.push('you gave my sign a moustache');
    if (choices.sign === 'fix') bits.push('you straightened my sign');
    return bits.length ? 'I remember everything: ' + bits.join(', ') + '.' : 'I can\'t figure you out yet. That\'s unsettling.';
  }

  OBEY.registerLevel({
    id: 'last-instruction',
    num: 15,
    title: 'The Last Instruction',
    objective: 'Follow Bossworth\'s last instruction… or at least listen to it.',
    intro: function (ctx) {
      var k = karmaFrom(ctx.choices);
      var mood = k > 0 ? 'You\'ve been… nice to me. Mostly. That makes this harder.' : (k < 0 ? 'You\'ve been an absolute menace. I respect it. I fear it.' : 'Hm.');
      return memoryLine(ctx.choices) + ' ' + mood + ' My last instruction: collect the three gears of my Instruction Machine. Totally harmless.';
    },
    introMood: 'suspicious',
    actions: ['tap', 'search', 'choice'],
    par: 4,
    hints: [
      'Three gears: one obvious, one hidden, and one… worn by someone.',
      'Look under the rug, and check Bossworth himself.',
      'Collect all three gears, then answer his question.'
    ],
    wrong: ['Answering is impossible until all gears are collected.'],
    secrets: [],
    endingNote: 'Choice: trusting him leans Hero; asking why leans Chaos. Dialogue reflects earlier choices.',
    done: 'The machine is assembled. One level left.',

    init: function () { return { a: false, rug: false, b: false, c: false }; },

    view: function (s, ctx) {
      var n = (s.a ? 1 : 0) + (s.b ? 1 : 0) + (s.c ? 1 : 0);
      var all = n === 3;
      return [
        O('machine', 52, 4, 44, 40, { kind: 'static', art: 'machine', artOpts: { gears: n }, label: 'Instruction Machine with ' + n + ' of 3 gears', live: true }),
        O('gearA', 10, 10, 18, 18, { art: 'gear', label: 'Gear on the floor', hidden: s.a }),
        O('rug', 8, 66, 44, 16, { art: 'rug', artOpts: { lifted: s.rug }, label: s.rug ? 'Rug, flipped back' : 'Lumpy rug', disabled: s.rug }),
        O('gearB', 22, 62, 16, 16, { art: 'gear', label: 'Gear that was under the rug', hidden: !s.rug || s.b, cls: 'pop-in' }),
        O('q', 4, 34, 46, 26, { kind: 'static', text: karmaFrom(ctx.choices) >= 0 ? 'Bossworth: "Will you follow my final instruction? Just this once?"' : 'Bossworth: "Will you follow my final instruction? For once in your chaotic life?"', label: 'Bossworth asks: will you follow my final instruction?', cls: 'speech-card', hidden: !all }),
        O('yes', 54, 52, 42, 14, { text: 'I\'ll follow it', label: 'Answer: I will follow your final instruction', cls: 'btn-card option', hidden: !all }),
        O('why', 54, 70, 42, 14, { text: 'Why do you need it?', label: 'Answer: why do you need the machine?', cls: 'btn-card option warn', hidden: !all })
      ];
    },

    on: function (a, s, api, ctx) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'gearA': s.a = true; api.say('One gear. Easy. The other two are definitely not under anything or on anyone.', 'pleased'); break;
        case 'rug': s.rug = true; api.say('Under the rug?! Who looks under rugs? Detectives, that\'s who. And you.', 'surprised'); break;
        case 'gearB': s.b = true; api.say('Two gears. The third is… safe. Very safe. Nowhere near my hat.', 'suspicious'); break;
        case 'narrator':
          if (!s.c) { s.c = true; api.say('Hey! That gear was holding my hat on! …Fine. Take it. Hatless, I am vulnerable.', 'annoyed'); }
          else api.say('No more gears on me. Check my pockets? I don\'t HAVE pockets.', 'annoyed');
          break;
        case 'yes':
          api.choice('trust', 'yes');
          api.complete({ line: 'You\'ll follow it? Really? Then… my last instruction is: come see the machine. And decide for yourself. I can\'t believe I said that.', mood: 'surprised' });
          return true;
        case 'why':
          api.choice('trust', 'why');
          api.complete({ line: 'Why? WHY?! Because without it, nobody listens to me! …Come see it. Then you\'ll understand. Or break it. Probably break it.', mood: 'panicked' });
          return true;
        default: return false;
      }
      if (s.a && s.b && s.c) api.say('All three gears! The machine hums. Now… a question. Answer honestly. One of us should.', 'neutral');
      return true;
    },

    solution: [{ tap: 'gearA' }, { tap: 'rug' }, { tap: 'gearB' }, { tap: 'narrator' }, { tap: 'yes' }],
    alternatives: { why: [{ tap: 'gearA' }, { tap: 'rug' }, { tap: 'gearB' }, { tap: 'narrator' }, { tap: 'why' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
