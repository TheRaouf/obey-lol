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
    { id: 'ninja', name: 'Ninja', unlock: { type: 'level', value: 136 }, aside: '*appears silently*' }
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
    { id: 'hero', name: 'The Honest Machine', short: 'Hero ending', condition: 'Finish Level 136 by repairing the Instruction Machine.' },
    { id: 'chaos', name: 'Total Meltdown', short: 'Chaos ending', condition: 'Finish Level 136 by overloading the Instruction Machine.' },
    { id: 'secret', name: 'The Last Word', short: 'Secret Master ending', condition: 'Discover all 15 secrets, then finish Level 136 with the golden quill.' }
  ];
  OBEY.ENDING_IDS = OBEY.ENDINGS.map(function (e) { return e.id; });

  /* ----------------------------------------------------------- achievements */
  // Checks are pure functions of the save object (see progress.js helpers passed in as P).
  OBEY.ACHIEVEMENTS = [
    { id: 'first-steps', name: 'First Steps', desc: 'Complete Level 1.', progress: function (s, P) { return [P.isCompleted(s, 1) ? 1 : 0, 1]; } },
    { id: 'professional-disobeyer', name: 'Professional Disobeyer', desc: 'Defy a direct instruction 10 times (counted when a level is completed).', progress: function (s) { return [Math.min(s.stats.defiance, 10), 10]; } },
    { id: 'perfect-performance', name: 'Perfect Performance', desc: 'Earn 3 stars on all ' + OBEY.LEVEL_COUNT + ' levels.', progress: function (s) { var n = 0; for (var k in s.bestStars) if (s.bestStars[k] === 3) n++; return [n, OBEY.LEVEL_COUNT]; } },
    { id: 'secret-agent', name: 'Secret Agent', desc: 'Discover your first secret.', progress: function (s) { return [Math.min(s.secrets.length, 1), 1]; } },
    { id: 'collector', name: 'Collector', desc: 'Discover 8 secrets.', progress: function (s) { return [Math.min(s.secrets.length, 8), 8]; } },
    { id: 'secret-master', name: 'Secret Master', desc: 'Discover all 15 secrets.', progress: function (s) { return [s.secrets.length, 15]; } },
    { id: 'costume-party', name: 'Costume Party', desc: 'Dress Bossworth in all 8 costumes.', progress: function (s) { return [s.costumes.worn.length, 8]; } },
    { id: 'full-campaign', name: 'Full Campaign', desc: 'Complete all ' + OBEY.LEVEL_COUNT + ' levels.', progress: function (s) { return [s.completed.length, OBEY.LEVEL_COUNT]; } },
    { id: 'chaos-enthusiast', name: 'Chaos Enthusiast', desc: 'Reach the Chaos ending.', progress: function (s) { return [s.endings.seen.indexOf('chaos') >= 0 ? 1 : 0, 1]; } },
    { id: 'heroic-finish', name: 'Heroic Finish', desc: 'Reach the Hero ending.', progress: function (s) { return [s.endings.seen.indexOf('hero') >= 0 ? 1 : 0, 1]; } },
    { id: 'ghostwriter', name: 'Ghostwriter', desc: 'Reach the Secret Master ending.', progress: function (s) { return [s.endings.seen.indexOf('secret') >= 0 ? 1 : 0, 1]; } }
  ];
  OBEY.ACHIEVEMENT_IDS = OBEY.ACHIEVEMENTS.map(function (a) { return a.id; });

  /* --------------------------------------------------------------- chapters */
  // Nine chapters of four levels; each has a trophy cup whose metal depends on difficulty.
  OBEY.CHAPTERS = [
    { id: 'button-bay', name: 'Button Bay', levels: [1, 2, 3, 4] },
    { id: 'mind-maze', name: 'Mind Maze', levels: [5, 6, 7, 8] },
    { id: 'trick-tower', name: 'Trick Tower', levels: [9, 10, 11, 12] },
    { id: 'glitch-gardens', name: 'Glitch Gardens', levels: [13, 14, 15, 16] },
    { id: 'paper-plains', name: 'Paper Plains', levels: [17, 18, 19, 20] },
    { id: 'clockwork-canyon', name: 'Clockwork Canyon', levels: [21, 22, 23, 24] },
    { id: 'mirror-marsh', name: 'Mirror Marsh', levels: [25, 26, 27, 28] },
    { id: 'static-summit', name: 'Static Summit', levels: [29, 30, 31, 32] },
    { id: 'stapler-steppes', name: 'Stapler Steppes', levels: [33,  34,  35,  36] },
    { id: 'filing-fjord', name: 'Filing Fjord', levels: [37,  38,  39,  40] },
    { id: 'printer-peaks', name: 'Printer Peaks', levels: [41,  42,  43,  44] },
    { id: 'canteen-cliffs', name: 'Canteen Cliffs', levels: [45,  46,  47,  48] },
    { id: 'boardroom-bluffs', name: 'Boardroom Bluffs', levels: [49,  50,  51,  52] },
    { id: 'kitchen-kerfuffle', name: 'Kitchen Kerfuffle', levels: [53,  54,  55,  56] },
    { id: 'laundry-lagoon', name: 'Laundry Lagoon', levels: [57,  58,  59,  60] },
    { id: 'hallway-hijinks', name: 'Hallway Hijinks', levels: [61,  62,  63,  64] },
    { id: 'soapy-shallows', name: 'Soapy Shallows', levels: [65,  66,  67,  68] },
    { id: 'bedtime-bedlam', name: 'Bedtime Bedlam', levels: [69,  70,  71,  72] },
    { id: 'brolly-beach', name: 'Brolly Beach', levels: [73,  74,  75,  76] },
    { id: 'compass-crossing', name: 'Compass Crossing', levels: [77,  78,  79,  80] },
    { id: 'timetable-terminal', name: 'Timetable Terminal', levels: [81,  82,  83,  84] },
    { id: 'campfire-creek', name: 'Campfire Creek', levels: [85,  86,  87,  88] },
    { id: 'postcard-paradise', name: 'Postcard Paradise', levels: [89,  90,  91,  92] },
    { id: 'beaker-basin', name: 'Beaker Basin', levels: [93,  94,  95,  96] },
    { id: 'circuit-cove', name: 'Circuit Cove', levels: [97,  98,  99,  100] },
    { id: 'pixel-plateau', name: 'Pixel Plateau', levels: [101,  102,  103,  104] },
    { id: 'rocket-ridge', name: 'Rocket Ridge', levels: [105,  106,  107,  108] },
    { id: 'orbit-outpost', name: 'Orbit Outpost', levels: [109,  110,  111,  112] },
    { id: 'magic-matinee', name: 'Magic Matinee', levels: [113,  114,  115,  116] },
    { id: 'curtain-call', name: 'Curtain Call', levels: [117,  118,  119,  120] },
    { id: 'buzzer-bonanza', name: 'Buzzer Bonanza', levels: [121,  122,  123,  124] },
    { id: 'museum-midway', name: 'Museum Midway', levels: [125,  126,  127,  128] },
    { id: 'pixel-palace', name: 'Pixel Palace', levels: [129,  130,  131,  132] },
    { id: 'final-factory', name: 'Final Factory', levels: [133, 134, 135, 136] }
  ];
  OBEY.chapterOf = function (n) { return OBEY.CHAPTERS.filter(function (c) { return c.levels.indexOf(n) >= 0; })[0]; };

  /* ------------------------------------------------------------- difficulty */
  OBEY.DIFFICULTIES = [
    { id: 'easy', name: 'Easy', rank: 1, blurb: 'Hints never cost stars, "Show me how" is always there, and Bossworth helps out if you get stuck.' },
    { id: 'medium', name: 'Medium', rank: 2, blurb: 'The intended game. Hints cost stars; "Show me how" unlocks after a trap or two hints.' },
    { id: 'hard', name: 'Hard', rank: 3, blurb: 'One hint per level, stricter stars, traps cost extra, and a few rooms fight back.' }
  ];
  OBEY.DIFFICULTY_IDS = ['easy', 'medium', 'hard'];
  OBEY.difficultyRank = function (id) { return Math.max(0, OBEY.DIFFICULTY_IDS.indexOf(id) + 1); };

  /* --------------------------------------------------------------- trophies */
  // Tier ranks: 1 bronze, 2 silver, 3 gold, 4 platinum. Chapter cups upgrade with difficulty.
  OBEY.TROPHY_TIERS = ['', 'Bronze', 'Silver', 'Gold', 'Platinum'];
  OBEY.TROPHIES = OBEY.CHAPTERS.map(function (c) {
    return { id: 'cup-' + c.id, name: c.name + ' Cup', kind: 'chapter', chapter: c.id,
      desc: 'Finish all four ' + c.name + ' levels. Bronze on Easy, Silver on Medium, Gold on Hard (the lowest difficulty used counts).' };
  }).concat([
    { id: 'clean-sweep', name: 'Clean Sweep', kind: 'special', tier: 2, desc: 'Finish 10 different levels without using a hint.' },
    { id: 'flawless', name: 'Flawless', kind: 'special', tier: 2, desc: 'Finish 10 different levels without falling for a single trap.' },
    { id: 'hard-boiled', name: 'Hard Boiled', kind: 'special', tier: 3, desc: 'Finish 12 different levels on Hard.' },
    { id: 'good-sport', name: 'Good Sport', kind: 'special', tier: 1, desc: 'Fall for 25 traps in total. Bossworth thanks you for your service.' },
    { id: 'platinum-bossworth', name: 'Platinum Bossworth', kind: 'special', tier: 4, desc: 'Win a Gold cup in every chapter.' }
  ]);
  OBEY.TROPHY_IDS = OBEY.TROPHIES.map(function (t) { return t.id; });

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
    moods: ['neutral', 'pleased', 'suspicious', 'annoyed', 'surprised', 'panicked', 'defeated', 'laughing'],
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
