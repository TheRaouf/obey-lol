/* OBEY? LOL. — static game data: the single source of truth for secrets,
 * costumes, themes, achievements, endings and shared narrator lines. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;

  /* ---------------------------------------------------------------- secrets */
  // `level` is where it lives; `how` is the documented trigger (used by docs/tests, never shown in-game).
  OBEY.SECRETS = [
    { id: 'plant-whisperer', level: 1, name: 'Plant Whisperer', desc: 'The office plant has been listening the whole time.', hint: 'Not everything in Level 1 is furniture.', how: 'Level 1: tap the potted plant.' },
    { id: 'deja-vu', level: 1, name: 'Déjà Vu', desc: 'A note from your past self. Your handwriting is terrible.', hint: 'Some notes only appear the second time around.', how: 'Replay Level 1 after completing it and tap the folded note.' },
    { id: 'empty-corner', level: 2, name: 'Corner Office', desc: 'An empty corner, a sticky note, and a narrator who was definitely here.', hint: 'Level 2 has a corner nobody looks at.', how: 'Level 2: inspect the empty top-right corner.' },
    { id: 'personal-space', level: 3, name: 'Personal Space', desc: '"Hands off" applies to narrators too, apparently.', hint: 'Hands off… everything?', how: 'Level 3: poke Bossworth while he counts down.' },
    { id: 'glow-code', level: 4, name: 'Glow in the Dark', desc: 'Three glowing numbers: 4 · 2 · 7. Worth remembering.', hint: 'Darkness reveals what light hides.', how: 'Level 4: turn the lamp off and tap the glowing numbers.' },
    { id: 'countdown', level: 5, name: 'Countdown', desc: 'Three, two, one… liftoff of pure pedantry.', hint: 'Read the statements… backwards.', how: 'Level 5: tap statements 3, 2, 1 in that order.' },
    { id: 'extremely-patient', level: 6, name: 'Extremely Patient', desc: 'The receptionist knitted you a medal while you waited.', hint: 'Your number is called. Are you in a hurry?', how: 'Level 6: after #17 is called, wait 30 more seconds before ringing.' },
    { id: 'tutorial-dropout', level: 7, name: 'Tutorial Dropout', desc: 'Finished a tutorial without pressing NEXT even once.', hint: 'Who needs a NEXT button?', how: 'Level 7: finish without ever pressing NEXT.' },
    { id: 'tidy-up', level: 8, name: 'Tidy Up', desc: 'You recycled the narrator\'s "nothing". Very eco.', hint: 'Every room needs a little tidying.', how: 'Level 8: drag the crate into the bin.' },
    { id: 'shaken', level: 9, name: 'Shake It', desc: 'It ticks. It is a cuckoo clock. Probably.', hint: 'Gifts are for shaking.', how: 'Level 9: press and hold the gift for 2 seconds.' },
    { id: 'snack-rule', level: 10, name: 'Rule of Snacks', desc: 'You used absolute rule-writing power to make lunch.', hint: 'The rulebook can make anything true. Anything.', how: 'Level 10: write the sandwich rule, then eat the sandwich.' },
    { id: 'silent-partner', level: 11, name: 'Silent Partner', desc: 'A very small, very quiet roommate.', hint: 'Someone small is keeping very quiet in Level 11.', how: 'Level 11: tap the mouse hole.' },
    { id: 'polly', level: 12, name: 'Polly Wants the Truth', desc: 'Bossworth\'s middle name is Kevin. The parrot told you.', hint: 'Parrots work for snacks.', how: 'Level 12: drag the cracker onto the parrot.' },
    { id: 'long-memory', level: 13, name: 'Long-Distance Memory', desc: 'A code from a dark room opened a panel in a broken one.', hint: 'A code from the dark might open a wall panel.', how: 'Level 13: open the wall panel and enter 4-2-7.' },
    { id: 'fine-print', level: 14, name: 'Read the Fine Print', desc: '"Warnings void where ignored." Legally airtight.', hint: 'Warnings always have fine print.', how: 'Level 14: tap the fine print on the warning sign.' }
  ];
  OBEY.SECRET_IDS = OBEY.SECRETS.map(function (s) { return s.id; });
  OBEY.getSecret = function (id) { return OBEY.SECRETS.find(function (s) { return s.id === id; }) || null; };

  /* --------------------------------------------------------------- unlocks */
  // Unlock rules: {type:'default'} | {type:'level', value:n} | {type:'secrets', value:n} | {type:'stars', value:n}
  OBEY.COSTUMES = [
    { id: 'classic', name: 'Classic', unlock: { type: 'default' }, aside: '' },
    { id: 'royal', name: 'Royal', unlock: { type: 'level', value: 4 }, aside: '*adjusts crown* By royal decree:' },
    { id: 'alien', name: 'Alien', unlock: { type: 'secrets', value: 3 }, aside: 'GREETINGS, EARTH PLAYER.' },
    { id: 'detective', name: 'Detective', unlock: { type: 'level', value: 8 }, aside: '*squints through magnifier* Elementary:' },
    { id: 'wizard', name: 'Wizard', unlock: { type: 'stars', value: 20 }, aside: '*waves wand dramatically*' },
    { id: 'robot', name: 'Robot', unlock: { type: 'level', value: 12 }, aside: 'BEEP. INSTRUCTION LOADED:' },
    { id: 'dino', name: 'Dino', unlock: { type: 'secrets', value: 8 }, aside: 'RAWR. (That means "listen".)' },
    { id: 'ninja', name: 'Ninja', unlock: { type: 'level', value: 16 }, aside: '*appears silently*' }
  ];

  OBEY.THEMES = [
    { id: 'classic', name: 'Classic', unlock: { type: 'default' }, blurb: 'Cream, cherry and confidence.' },
    { id: 'candy', name: 'Candy', unlock: { type: 'level', value: 5 }, blurb: 'Bubblegum pink with a sugar rush.' },
    { id: 'ocean', name: 'Ocean', unlock: { type: 'level', value: 10 }, blurb: 'Cool blues. Calm. Suspiciously calm.' },
    { id: 'sunset', name: 'Sunset', unlock: { type: 'stars', value: 30 }, blurb: 'A dramatic dusk for dramatic decisions.' }
  ];

  OBEY.describeUnlock = function (rule) {
    switch (rule.type) {
      case 'default': return 'Available from the start';
      case 'level': return 'Complete Level ' + rule.value;
      case 'secrets': return 'Find ' + rule.value + ' secrets';
      case 'stars': return 'Earn ' + rule.value + ' stars';
      default: return 'Unknown';
    }
  };

  /* ---------------------------------------------------------------- endings */
  OBEY.ENDINGS = [
    { id: 'hero', name: 'The Honest Machine', short: 'Hero ending', condition: 'Finish Level 16 by repairing the Instruction Machine.' },
    { id: 'chaos', name: 'Total Meltdown', short: 'Chaos ending', condition: 'Finish Level 16 by overloading the Instruction Machine.' },
    { id: 'secret', name: 'The Last Word', short: 'Secret Master ending', condition: 'Discover all 15 secrets, then finish Level 16 with the golden quill.' }
  ];
  OBEY.ENDING_IDS = OBEY.ENDINGS.map(function (e) { return e.id; });

  /* ----------------------------------------------------------- achievements */
  // Checks are pure functions of the save object (see progress.js helpers passed in as P).
  OBEY.ACHIEVEMENTS = [
    { id: 'first-steps', name: 'First Steps', desc: 'Complete Level 1.', progress: function (s, P) { return [P.isCompleted(s, 1) ? 1 : 0, 1]; } },
    { id: 'professional-disobeyer', name: 'Professional Disobeyer', desc: 'Defy a direct instruction 10 times (counted when a level is completed).', progress: function (s) { return [Math.min(s.stats.defiance, 10), 10]; } },
    { id: 'perfect-performance', name: 'Perfect Performance', desc: 'Earn 3 stars on all 16 levels.', progress: function (s) { var n = 0; for (var k in s.bestStars) if (s.bestStars[k] === 3) n++; return [n, 16]; } },
    { id: 'secret-agent', name: 'Secret Agent', desc: 'Discover your first secret.', progress: function (s) { return [Math.min(s.secrets.length, 1), 1]; } },
    { id: 'collector', name: 'Collector', desc: 'Discover 8 secrets.', progress: function (s) { return [Math.min(s.secrets.length, 8), 8]; } },
    { id: 'secret-master', name: 'Secret Master', desc: 'Discover all 15 secrets.', progress: function (s) { return [s.secrets.length, 15]; } },
    { id: 'costume-party', name: 'Costume Party', desc: 'Dress Bossworth in all 8 costumes.', progress: function (s) { return [s.costumes.worn.length, 8]; } },
    { id: 'full-campaign', name: 'Full Campaign', desc: 'Complete all 16 levels.', progress: function (s) { return [s.completed.length, 16]; } },
    { id: 'chaos-enthusiast', name: 'Chaos Enthusiast', desc: 'Reach the Chaos ending.', progress: function (s) { return [s.endings.seen.indexOf('chaos') >= 0 ? 1 : 0, 1]; } },
    { id: 'heroic-finish', name: 'Heroic Finish', desc: 'Reach the Hero ending.', progress: function (s) { return [s.endings.seen.indexOf('hero') >= 0 ? 1 : 0, 1]; } },
    { id: 'ghostwriter', name: 'Ghostwriter', desc: 'Reach the Secret Master ending.', progress: function (s) { return [s.endings.seen.indexOf('secret') >= 0 ? 1 : 0, 1]; } }
  ];
  OBEY.ACHIEVEMENT_IDS = OBEY.ACHIEVEMENTS.map(function (a) { return a.id; });

  /* ---------------------------------------------------------------- choices */
  // Campaign choices and which way they lean. Used for narrator dialogue in Levels 15–16 and the endings.
  OBEY.CHOICES = {
    gift: { prank: 'chaos', 'return': 'hero' },
    rule: { door: 'hero', potato: 'chaos' },
    sign: { fix: 'hero', graffiti: 'chaos' },
    trust: { yes: 'hero', why: 'chaos' }
  };

  /* --------------------------------------------------------------- narrator */
  OBEY.NARRATOR = {
    name: 'Bossworth',
    moods: ['neutral', 'pleased', 'suspicious', 'annoyed', 'surprised', 'panicked', 'defeated'],
    // Shown in rotation when the narrator is poked and the level has nothing special to say.
    pokes: [
      ['Please do not poke the narrator. I bruise like a peach.', 'annoyed'],
      ['Yes? Can I help you? With anything other than the puzzle?', 'suspicious'],
      ['Poking me will not make me more honest. Probably.', 'pleased'],
      ['That tickles. Stop. No, really.', 'surprised'],
      ['I am a professional. Professionals do not giggle. *giggles*', 'pleased'],
      ['You know the puzzle is over THERE, right?', 'annoyed']
    ],
    failLines: ['Oops! Let\'s pretend that didn\'t happen.', 'Back to the start. I\'ll allow it.']
  };
})(typeof window !== 'undefined' ? window : globalThis);
