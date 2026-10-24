/* OBEY? LOL. — 2.1 game data and pure rules (DOM-free, unit-tested):
 * "ruin it" solutions, trick recaps, jigsaw pieces, narrator asides (idle, replay, callbacks,
 * composure, phone calls), the U.N.D.O. sidekick's chat script, chapter reviews, Bossworth's
 * review of you, the Daily Dare and streaks, share text, save codes, next-goal suggestions,
 * sound captions, and the 2.1 achievements/trophy. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var U = OBEY.util;
  var X = {};

  OBEY.SHARE_URL = 'https://theraouf.github.io/obey-lol/';

  /* ------------------------------------------------------------------ ruins */
  // A ruin is a deliberately terrible way to finish a level. Generic triggers are counted per
  // attempt by the app: { type: 'taps', target, count } | { type: 'fails', count } | { type: 'nopes', count }.
  // Bonus levels finish themselves with api.complete({ ruin: id }) and have trigger: null.
  X.RUINS = [
    { id: 'button-masher', level: 1, name: 'Button Masher', trigger: { type: 'taps', target: 'red', count: 8 },
      line: 'STOP PRESSING IT. It\'s… it\'s broken. You broke the tutorial button. In LEVEL ONE. *sob* Fine. Just go.',
      clue: 'That red button looks like it could take a beating. Or not. Find out.' },
    { id: 'through-the-wall', level: 2, name: 'Through the Wall', trigger: { type: 'taps', target: 'exit', count: 5 },
      line: 'You… punched through the brick wall. That was a load-bearing lie! Get out before the ceiling realises.',
      clue: 'The fake EXIT is a brick wall. Walls get tired if you keep knocking.' },
    { id: 'countdown-crasher', level: 3, name: 'Countdown Crasher', trigger: { type: 'fails', count: 4 },
      line: 'FOUR restarts?! The timer has resigned. I have resigned. Consider the test of restraint… cancelled.',
      clue: 'Bossworth\'s countdown can only restart so many times before it quits.' },
    { id: 'switch-saboteur', level: 5, name: 'Switch Saboteur', trigger: { type: 'fails', count: 4 },
      line: 'Four traps in a row. On purpose. The switches are filing a complaint. Level over. Go away.',
      clue: 'What if you fell for the trap switches… enthusiastically?' },
    { id: 'next-addict', level: 7, name: 'Next Addict', trigger: { type: 'taps', target: 'next', count: 15 },
      line: 'ERROR: OUT OF TIPS. The fake tutorial has run out of fake advice. You exhausted a tutorial. Congratulations?',
      clue: 'Tutorials only have so many tips. Keep pressing NEXT.' },
    { id: 'pie-connoisseur', level: 12, name: 'Pie Connoisseur', trigger: { type: 'fails', count: 4 },
      line: 'Four pies. FOUR. We are out of pies. We are out of trapdoors. You win by bankruptcy.',
      clue: 'The doors run on a limited supply of pies and trapdoors.' },
    { id: 'speaker-blower', level: 15, name: 'Speaker Blower', trigger: { type: 'fails', count: 4 },
      line: 'Fourth speaker. FOURTH. The warehouse is empty. The door opened out of sheer pity.',
      clue: 'Speakers are expensive. How many do they have in stock?' },
    { id: 'honest-abe', level: 16, name: 'Honest to a Fault', trigger: { type: 'fails', count: 4 },
      line: 'You told the truth four times on Opposite Day. The calendar has given up. It\'s just Tuesday now.',
      clue: 'Keep telling the truth on Opposite Day. The calendar can\'t take it.' },
    { id: 'drawer-diver', level: 17, name: 'Drawer Diver', trigger: { type: 'nopes', count: 8 },
      line: 'You opened every drawer EIGHT times. The sock came out just to make you stop.',
      clue: 'If you rummage in the drawers long enough, something might give up.' },
    { id: 'key-chaser', level: 23, name: 'Key Chaser', trigger: { type: 'taps', target: 'key', count: 6 },
      line: 'You chased a floating key around the room six times. It got dizzy and surrendered. Physics is embarrassed.',
      clue: 'Floating keys get dizzy if you chase them long enough.' },
    { id: 'alarm-enthusiast', level: 30, name: 'Alarm Enthusiast', trigger: { type: 'fails', count: 4 },
      line: 'The alarm has gone off four times. The neighbours called. The door opened to let the noise out.',
      clue: 'Every alarm has a breaking point. Wrong passwords help it find it.' },
    { id: 'screen-sharer', level: 36, name: 'Screen Sharer', trigger: null, line: '', clue: 'Check what your open tab is called. Then share it with the whole meeting.' },
    { id: 'scenic-route', level: 38, name: 'The Scenic Route', trigger: null, line: '', clue: 'Bossworth hates waiting. A lift that stops at five wrong floors is basically a weapon.' },
    { id: 'paper-mountain', level: 41, name: 'Paper Mountain', trigger: null, line: '', clue: 'Copy 100% never helps. Press it until the copier gives up. Six usually does it.' },
    { id: 'foam-party', level: 45, name: 'Foam Party', trigger: null, line: '', clue: 'There is no fire. There is an extinguisher. Press and hold it anyway.' },
    { id: 'spin-cycle', level: 49, name: 'Spin Cycle', trigger: null, line: '', clue: 'He said never stop pushing. Take him at his word: twelve pushes, three laps.' },
    { id: 'alarm-whacker', level: 53, name: 'Alarm Whacker', trigger: null, line: '', clue: 'Poking a chirping smoke alarm with a broom once is rude. Three times is a lifestyle.' },
    { id: 'shrunken-jumper', level: 57, name: 'Shrunken Jumper', trigger: null, line: '', clue: 'Bossworth\'s lucky wool jumper really wants that hot wash. Its label really doesn\'t.' },
    { id: 'bossworth-bloom', level: 64, name: 'Bossworth in Bloom', trigger: null, line: '', clue: 'Not everything in the plant room that could use a watering is a plant.' },
    { id: 'bubble-avalanche', level: 66, name: 'Bubble Avalanche', trigger: null, line: '', clue: 'One squirt of washing-up liquid is plenty. The whole bottle is… more.' },
    { id: 'rug-mountain', level: 72, name: 'Rug Mountain', trigger: null, line: '', clue: 'Bossworth says everything fits under the rug. Test that theory. All of it.' },
    { id: 'gull-buffet', level: 76, name: 'Gull Buffet', trigger: null, line: '', clue: 'The gull is a drop zone too. Share your chips with it and watch the whole flock RSVP.' },
    { id: 'spin-doctor', level: 79, name: 'Spin Doctor', trigger: null, line: '', clue: 'Signposts are only screwed on so tight. Eight turns in one go and it takes off.' },
    { id: 'travel-light', level: 84, name: 'Travel Light', trigger: null, line: '', clue: 'There is a third way to close a suitcase. It involves owning nothing.' },
    { id: 'dinner-bell', level: 86, name: 'Dinner Bell', trigger: null, line: '', clue: 'Bossworth swears the bell brings fish. Ring it five times and something big does turn up.' },
    { id: 'return-to-sender', level: 92, name: 'Return to Sender', trigger: null, line: '', clue: 'He begged you not to stamp him. A stamp sticks to anything, including narrators.' },
    { id: 'absolute-zero', level: 93, name: 'Absolute Zero', trigger: null, line: '', clue: 'He said ZERO. The dial is in kelvin. Give him exactly what he asked for.' },
    { id: 'screen-smasher', level: 99, name: 'Screen Smasher', trigger: null, line: '', clue: 'Computers respect aggression, apparently. Click the frozen window six times.' },
    { id: 'cookie-avalanche', level: 101, name: 'Cookie Avalanche', trigger: null, line: '', clue: 'That cookie banner has a very tempting button. Accept ALL of it.' },
    { id: 'overfueled', level: 105, name: 'Overfueled', trigger: null, line: '', clue: 'Skip the maths. Drag the pump hose straight onto the rocket.' },
    { id: 'hard-docking', level: 110, name: 'Hard Docking', trigger: null, line: '', clue: 'Codes are for cowards. Hit THRUST three times.' },
    { id: 'bossworth-bunny', level: 114, name: 'Bunny Bossworth', trigger: null, line: '', clue: 'The wand box lists everything it works on. Read the last word. Then point.' },
    { id: 'pursued-by-a-bear', level: 118, name: 'Pursued by a Bear', trigger: null, line: '', clue: 'Not every line in the prompter\'s box is dialogue. Some of them are bears.' },
    { id: 'hostile-takeover', level: 121, name: 'Hostile Takeover', trigger: null, line: '', clue: 'There are two buzzers. Only one of them says HOST ONLY. That\'s practically an invitation.' },
    { id: 'stuck-at-the-top', level: 128, name: 'Stuck at the Top', trigger: null, line: '', clue: 'He said don\'t touch the emergency stop. He didn\'t say what happens to HIM if you do.' },
    { id: 'banned-for-life', level: 132, name: 'Banned for Life', trigger: null, line: '', clue: 'A suspicious new player with a moustache. There\'s a red button next to his name that isn\'t Make host.' },
    { id: 'bean-avalanche', level: 135, name: 'Bean Avalanche', trigger: null, line: '', clue: 'He says the tablecloth trick works on tins. Pull the soup out from the very bottom and find out.' },
    { id: 'big-cheese', level: 139, name: 'The Big Cheese', trigger: null, line: '', clue: 'Mum asked for a little. The deli will happily sell you all of it. Wheels roll.' },
    { id: 'queue-jumper', level: 141, name: 'Queue Jumper', trigger: null, line: '', clue: 'Three queues, four buttons. One of them skips everybody. Everybody notices.' },
    { id: 'alarm-bells', level: 148, name: 'Alarm Bells', trigger: null, line: '', clue: 'There is another way out. The sign next to it even tells you what it sounds like.' },
    { id: 'hose-and-go', level: 151, name: 'Hose and Go', trigger: null, line: '', clue: 'Fill up properly, then drive off the second the tank is full. Don\'t stop to tidy anything.' },
    { id: 'quiz-plane', level: 156, name: 'Quiz Plane', trigger: null, line: '', clue: 'There\'s a button on the desk that turns a quiz into an aircraft. Press it. Watch him cry.' },
    { id: 'encyclopedia-stairs', level: 158, name: 'Encyclopedia Stairs', trigger: null, line: '', clue: 'Who needs a ladder? A to Z makes a lovely staircase. The librarian may disagree.' },
    { id: 'mud-masterpiece', level: 161, name: 'Mud Masterpiece', trigger: null, line: '', clue: 'Why choose two colours when you could have ALL of them? Every pot on the palette, then mix.' },
    { id: 'mystery-stew', level: 167, name: 'Mystery Stew', trigger: null, line: '', clue: 'The dinner hatch swaps anything for stew. Nobody knows what\'s in it. Find out.' },
    { id: 'self-starter', level: 169, name: 'Self-Starter', trigger: null, line: '', clue: 'Star of the Week can go to anyone. Anyone. Even the one holding the sticker.' },
    { id: 'human-cannonball', level: 176, name: 'Human Cannonball', trigger: null, line: '', clue: 'The catapult takes anything you drop in its cup. Anything. Including whoever is holding the phone.' },
    { id: 'usurper', level: 177, name: 'The Usurper', trigger: null, line: '', clue: 'Bossworth crowned himself. There\'s a crown, and there\'s a you. Fair is fair.' },
    { id: 'singed-portrait', level: 182, name: 'Singed Eyebrows', trigger: null, line: '', clue: 'A fire-sneeze at a SHUT oven door has to bounce somewhere. Look what\'s hanging above the oven.' },
    { id: 'throne-napper', level: 185, name: 'Throne Napper', trigger: null, line: '', clue: 'He told you to blow the horn. For once, take his advice. Dragons wake up grumpy and want something comfy.' },
    { id: 'sand-everywhere', level: 189, name: 'Sand Everywhere', trigger: null, line: '', clue: 'There\'s a hammer on the wall, and an hourglass is just sand in a glass jail.' },
    { id: 'flying-submarine', level: 194, name: 'Flying Submarine', trigger: null, line: '', clue: 'Every submarine has one button marked EMERGENCY. Nobody said whose emergency.' },
    { id: 'ship-beside-a-bottle', level: 198, name: 'Ship Beside a Bottle', trigger: null, line: '', clue: 'The keeper keeps a hammer on the floor. Bottles are mostly a suggestion.' },
    { id: 'sold-the-sub', level: 201, name: 'Sold the Sub', trigger: null, line: '', clue: 'One stall at the auction buys something you happen to be sitting in. Then bid.' },
    { id: 'inked-captain', level: 206, name: 'Inked Captain', trigger: null, line: '', clue: 'Octopuses are very ticklish. Octopuses are also full of ink.' },
    { id: 'submarine-weathervane', level: 212, name: 'Submarine Weathervane', trigger: null, line: '', clue: 'Whales can sneeze. Lighthouses have very pointy tops.' },
    { id: 'egg-on-face', level: 213, name: 'Egg on Face', trigger: null, line: '', clue: 'He said don\'t give the egg to HIM. It\'s an ostrich egg. You do the maths.' },
    { id: 'referee-sent-off', level: 218, name: 'Referee Sent Off', trigger: null, line: '', clue: 'Once you hold the whistle, you\'re the referee. Referees carry cards. There\'s a red one on the bench.' },
    { id: 'windmill-wrecker', level: 222, name: 'Windmill Wrecker', trigger: null, line: '', clue: 'Straight at the hole bounces off the windmill. Keep doing it. Windmills are not as strong as they look.' },
    { id: 'board-flipper', level: 225, name: 'Board Flipper', trigger: null, line: '', clue: 'Nine queens against one pawn? There\'s a button for people who\'ve had enough of chess.' },
    { id: 'hurdle-dodger', level: 232, name: 'Hurdle Dodger', trigger: null, line: '', clue: 'The rule card says what gets you disqualified. Do that. You still get through.' },
    { id: 'terms-agreer', level: OBEY.fromEnd(3), name: 'Agrees to Everything', trigger: { type: 'fails', count: 4 },
      line: 'You agreed four times without reading. Legal says you now technically own this level. Take it.',
      clue: 'What happens if you agree to the terms… again and again?' },
    { id: 'label-peeler', level: OBEY.BONUS_BASE + 1, name: 'Label Peeler', trigger: null, line: '', clue: 'Keep switching between the two coloured buttons. Labels don\'t stick forever.' },
    { id: 'ninety-nine', level: OBEY.BONUS_BASE + 2, name: 'Ninety-Nine', trigger: null, line: '', clue: 'Unplug the phone at 99%. Bossworth will hate it.' },
    { id: 'tower-toppler', level: OBEY.BONUS_BASE + 3, name: 'Tower Toppler', trigger: null, line: '', clue: 'Try to put a big disc on a small one. Three times. Gravity is watching.' },
    { id: 'tip-top', level: OBEY.BONUS_BASE + 4, name: 'Tip Top', trigger: null, line: '', clue: 'Put the tree on the stand pointy end DOWN.' }
  ];
  X.RUIN_IDS = X.RUINS.map(function (r) { return r.id; });
  X.trickFor = function (n) { var d = OBEY.getLevel(n); return X.TRICKS[n] || (d && d.trick) || ''; };
  X.ruinsFor = function (n) { return X.RUINS.filter(function (r) { return r.level === n; }); };
  X.getRuin = function (id) { return X.RUINS.filter(function (r) { return r.id === id; })[0] || null; };

  /** Checks the per-attempt counters against a level's generic ruin triggers. */
  X.ruinTriggered = function (n, counters) {
    var list = X.ruinsFor(n);
    for (var i = 0; i < list.length; i++) {
      var t = list[i].trigger;
      if (!t) continue;
      if (t.type === 'taps' && (counters.taps[t.target] || 0) >= t.count) return list[i];
      if (t.type === 'fails' && counters.fails >= t.count) return list[i];
      if (t.type === 'nopes' && counters.nopes >= t.count) return list[i];
    }
    return null;
  };

  /* ---------------------------------------------------------- trick recaps */
  X.TRICKS = {
    1: 'He told you to press red. The real trick was pressing the one he begged you not to.',
    2: 'The labels lied: EXIT was a wall, the closet was the exit.',
    3: '"Press it!" was a test of restraint — the sign was the real instruction.',
    4: 'The missing button only exists in the dark. Turning off the light was the move.',
    5: 'All three statements were reverse psychology. Only switch B was honest.',
    6: 'Waiting your turn was the whole puzzle. Ringing early sent you backwards.',
    7: 'NEXT never ends. Closing the tutorial is how tutorials end.',
    8: 'The key needed an uncovered door. Moving the crate first made it real.',
    9: 'The tag said "return to sender". Posting it back beat opening it.',
    10: 'The rulebook makes anything true — so you wrote a rule that opens the door.',
    11: 'No narrator, so the footprints were the instructions.',
    12: 'Both doors were bluffs. The lever was never mentioned, so it was honest.',
    13: 'The arrows were swapped. Walking "away" walked you home.',
    14: 'The warning was a dare. Power, patience, then fix it.',
    15: 'Louder broke things. Quiet let you hear the whisper.',
    16: 'On Opposite Day the honest answer is the opposite one.',
    17: 'The cat was sitting on the sock. Wake the cat, not the drawers.',
    18: 'Only orders that start with "Bossworth says" count.',
    19: 'The shy button only works when nobody is watching. Close the eyes.',
    20: '"TINY" and "A" are light words. MASSIVE and NOTHING weigh what they say.',
    21: 'You couldn\'t sneak past an awake Bossworth, so you moved the clock to nap time.',
    22: 'Wet paint was real. Drying it first beat touching it.',
    23: 'Gravity was the "forbidden" lever — and the only way to catch the key.',
    24: 'The copycat copied every switch. Distract it, then flip one.',
    25: 'The mirror told the truth. Backwards writing beat the sign.',
    26: 'Asking the meta question made the twins point to the same door.',
    27: 'Catch the drip first, then the valve is reachable.',
    28: 'Bubbles mean sinking stones. Hop on the calm ones only.',
    29: 'The remote\'s battery hatch was the real control.',
    30: 'The password was literally "NOT PASSWORD".',
    31: 'Wait for the shuffle to finish — the joker never lies about being a joker.',
    32: 'All lights on is a trap. Two bulbs were enough.',
    [OBEY.fromEnd(3)]: 'Reading the terms revealed Clause 9: the cat flap.',
    [OBEY.fromEnd(2)]: 'A rehearsal is just practice. The answers were in the questions.',
    [OBEY.fromEnd(1)]: 'Collect the gears, then ask Bossworth before answering.',
    [OBEY.FINAL]: 'You chose how to fix the machine. Bossworth just held the wrench.',
    1001: 'Neither button was RED. The word RED was.',
    1002: 'Optimised charging stopped it at 99%. Switching it off let it reach 100.',
    1003: 'You can solve the tower in seven moves — or move the "C" sign.',
    1004: 'Pointy end up means turning the tree before placing it.'
  };

  /* ---------------------------------------------------------- jigsaw pieces */
  // One hidden piece per chapter, shown only when replaying a finished level (never on a first run).
  // Trap-based ruins all need 4 traps, so on Hard "Show me how" (unlocked after 3 traps) always comes first.
  X.JIGSAW = [
    { id: 'jig-1', level: 4, x: 90, y: 90 },
    { id: 'jig-2', level: 6, x: 90, y: 90 },
    { id: 'jig-3', level: 11, x: 90, y: 2 },
    { id: 'jig-4', level: 14, x: 90, y: 2 },
    { id: 'jig-5', level: 19, x: 90, y: 90 },
    { id: 'jig-6', level: 22, x: 3, y: 90 },
    { id: 'jig-7', level: 25, x: 20, y: 40 },
    { id: 'jig-8', level: 29, x: 2, y: 90 },
    { id: 'jig-9', level: OBEY.fromEnd(2), x: 90, y: 90 }
  ];
  X.JIGSAW_IDS = X.JIGSAW.map(function (j) { return j.id; });
  X.jigsawFor = function (n) { return X.JIGSAW.filter(function (j) { return j.level === n; })[0] || null; };

  /* ---------------------------------------------------------------- asides */
  // Short lines shown under Bossworth's speech bubble. They never change the level's own line.
  X.IDLE = [
    ['Still there? I can hear you thinking. It\'s very loud.', 'Take your time. I bill by the hour.', 'Hello? Is this thing on?'],
    ['You\'ve been staring for a while. The puzzle is starting to feel watched.', 'I could hum something. No? Fine.', 'Fun fact: doing nothing is sometimes the answer. Not always. Sometimes.'],
    ['Okay, I\'m making a sandwich. Shout if you solve it.', 'Should I call someone? A puzzle doctor?', 'At this point I\'m just impressed by your commitment to standing still.']
  ];
  X.REPLAY = [
    'Back again? The puzzle hasn\'t changed. I have. I\'m more tired.',
    'Oh, you again. Here to do it BETTER? Bold.',
    'Replaying? I still remember what you did last time.',
    'Second time around. I\'ve updated my lies. (I have not.)'
  ];
  X.POSTGAME = [
    'You finished the whole campaign. I\'m… actually a bit proud. Don\'t tell anyone.',
    'Post-game Bossworth here. Calmer. Wiser. Still lying, but gently.',
    'Since you beat everything, I\'ve decided we\'re friends. Friends who lie to each other.'
  ];
  X.FINISH = ['Let me FINISH! …Fine. Nobody listens to narrators.', 'Excuse me, I was mid-sentence!', 'Rude. I had a whole paragraph prepared.'];
  X.NUDGE = 'Psst. Want a nudge? Hints are right here.';
  X.PHONE = [
    ['*ring ring* Hold on, I have to take this.', 'Yes, Clive. No, Clive. The intern is NOT winning. Bye.'],
    ['*ring ring* Sorry, it\'s my cousin.', 'Clive, I said I\'m WORKING. Yes, I\'m watching them. They\'re… fine. Unfortunately.'],
    ['*bzzz* Ugh. One second.', 'No, Clive, I will not double the bet. …Fine. Double it.']
  ];
  X.COMPOSURE_LINES = {
    calm: ['*straightens tie*', 'Composure: excellent. Hair: perfect.'],
    twitchy: ['*left eye twitches*', 'I am calm. I am so calm.'],
    frazzled: ['*breathes into a paper bag*', 'Everything is fine. EVERYTHING IS FINE.'],
    meltdown: ['*hyperventilating quietly*', 'I have run out of threats. I have run out of snacks.']
  };

  /** Bossworth's composure: 100 = calm, 0 = meltdown. Defiance and ruins hurt most. */
  X.composure = function (s) {
    var c = s.counters || {};
    var hit = (s.stats.defiance || 0) * 1.2 + (s.ruins || []).length * 6 + (s.stats.fails || 0) * 0.5 + (c.pokes || 0) * 0.1;
    return Math.round(U.clamp(100 - hit, 0, 100));
  };
  X.composureTier = function (v) { return v >= 75 ? 'calm' : (v >= 50 ? 'twitchy' : (v >= 25 ? 'frazzled' : 'meltdown')); };

  /** Picks the opening aside for a level visit (or null). rand() in [0,1) is injectable for tests. */
  X.openingAside = function (s, n, opts, rand) {
    rand = rand || Math.random;
    opts = opts || {};
    var pick = function (a) { return a[Math.floor(rand() * a.length) % a.length]; };
    if (OBEY.progress.isCompleted(s, OBEY.LEVEL_COUNT) && rand() < 0.5) return pick(X.POSTGAME);
    if (opts.replay) return pick(X.REPLAY);
    var cb = X.callback(s, n);
    if (cb && rand() < 0.4) return cb;
    var tier = X.composureTier(X.composure(s));
    if (tier !== 'calm' && rand() < 0.5) return pick(X.COMPOSURE_LINES[tier]);
    return null;
  };

  /** A line that remembers something the player did. */
  X.callback = function (s, n) {
    var c = s.counters || {};
    var name = 'Intern #' + (s.intern || 17);
    if ((s.ruins || []).length >= 1 && n % 3 === 0) return name + ', I haven\'t forgotten what you did to Level ' + X.getRuin(s.ruins[s.ruins.length - 1]).level + '. I never will.';
    if (s.stats.fails >= 10 && n % 3 === 1) return 'You\'ve fallen for ' + s.stats.fails + ' traps so far. I\'m keeping a scrapbook.';
    if ((c.pokes || 0) >= 10 && n % 3 === 2) return 'You\'ve poked me ' + c.pokes + ' times. I have a bruise shaped like your finger.';
    if ((s.skipped || []).length && n % 2 === 0) return 'You skipped Level ' + s.skipped[0] + '. It\'s still there. Waiting. Crying a bit.';
    if (s.stats.defiance >= 5 && n % 2 === 1) return 'Defied ' + s.stats.defiance + ' instructions so far, ' + name + '. HR has a folder on you.';
    return null;
  };

  /* -------------------------------------------------------- menu quips */
  X.SCREEN_QUIPS = {
    map: ['A map of everywhere you\'ve disobeyed me.', 'Each dot is a room I worked very hard to lie in.', 'You are here. Unfortunately.'],
    achievements: ['Achievements: little gold stars for ignoring me. Lovely.', 'Some of these are jokes. Some are also jokes.', 'I didn\'t design these. Legal did.'],
    trophies: ['Shiny cups for your shelf of disobedience.', 'Polish them yourself. I\'m on a break.', 'Gold means you did it on Hard. Show-off.'],
    settings: ['Ah, Settings. Where people go to make me quieter.', 'Please don\'t touch the honesty slider. It does nothing. Which is the point.', 'Changing settings again? Indecisive. I love it.'],
    stats: ['I\'ve been keeping notes. Lots of notes.', 'This is your file. It is thick.', 'Numbers don\'t lie. Unlike some narrators.'],
    daily: ['A new dare every day. I don\'t sleep, so neither does the dare.', 'Daily Dare: because once wasn\'t humiliating enough.', 'Same dare for everyone. Different excuses.'],
    sabotage: ['Your crimes, catalogued.', 'A museum of things you broke on purpose.', 'U.N.D.O. framed these. I wanted to burn them.']
  };

  /* --------------------------------------------------- U.N.D.O. chat script */
  // The sidekick appears from Level 9. Each chapter has leaked chats between Bossworth and Clive.
  X.UNDO_INTRO = 'U.N.D.O. v0.9 online. (Unruly Narrative Debugging Operator.) Bossworth installed me to stop you. I read his chats instead. I like you better.';
  X.UNDO_CHATS = {
    'trick-tower': [['CLIVE', '20 coins says your new intern breaks something before Level 12.'], ['BOSSWORTH', 'My interns OBEY, Clive.']],
    'glitch-gardens': [['CLIVE', 'Heard your intern is "creative".'], ['BOSSWORTH', 'Creative is a strong word. Correct, but strong.']],
    'paper-plains': [['BOSSWORTH', 'Can I install a program that makes them obey?'], ['CLIVE', 'You did. It\'s called U.N.D.O. It\'s on THEIR side now.']],
    'clockwork-canyon': [['CLIVE', 'Double or nothing: the intern ruins 6 levels.'], ['BOSSWORTH', 'Nobody ruins levels ON PURPOSE, Clive.']],
    'mirror-marsh': [['BOSSWORTH', 'They ruined another one. On purpose. With a SMILE.'], ['CLIVE', 'Pay up.']],
    'static-summit': [['CLIVE', 'If they reach the end, you owe me a cake.'], ['BOSSWORTH', 'What kind of cake?'], ['CLIVE', 'A humble one.']],
    'final-factory': [['BOSSWORTH', 'They\'re almost at the machine, Clive.'], ['CLIVE', 'Be nice to them. They\'re the best intern you\'ve had.'], ['BOSSWORTH', '…They\'re the ONLY intern I\'ve had.']]
  };
  X.undoActive = function (n) { return OBEY.isBonus(n) || n >= 9; };
  /** Messages U.N.D.O. shows when a level opens: a leaked chat (once per chapter) and a ruin tip. */
  X.undoMessages = function (s, n, seenChats) {
    var out = [];
    if (!X.undoActive(n)) return out;
    if (!(s.counters && s.counters.undoMet)) out.push({ who: 'U.N.D.O.', text: X.UNDO_INTRO });
    var ch = OBEY.chapterOf(n);
    if (ch && X.UNDO_CHATS[ch.id] && (seenChats || []).indexOf(ch.id) < 0) {
      out.push({ who: 'U.N.D.O.', text: 'Leaked from Bossworth\'s phone:' });
      X.UNDO_CHATS[ch.id].forEach(function (m) { out.push({ who: m[0], text: m[1], leak: true }); });
    }
    return out;
  };
  /** A sabotage tip for a ruin the player has not found in this level yet (or null). */
  X.undoTip = function (s, n) {
    var r = X.ruinsFor(n).filter(function (x) { return (s.ruins || []).indexOf(x.id) < 0; })[0];
    return r ? r.clue : null;
  };

  /* --------------------------------------------------- reviews and roasts */
  /** Bossworth's review of the player: 1–5 stars from HIS point of view (obedience = good). */
  X.review = function (s) {
    var def = s.stats.defiance || 0, ru = (s.ruins || []).length;
    var stars = U.clamp(5 - Math.floor(def / 10) - Math.floor(ru / 4), 1, 5);
    var text = [
      '',
      'Did not follow a single instruction they could avoid. Broke things on purpose. Would not hire again. (Already did.)',
      'Shows "initiative". Ignores memos. Laughed at my pie. Two stars, and that\'s generous.',
      'Sometimes obedient, often creative, always suspicious. Three stars. Grudgingly.',
      'Mostly listened. Mostly. I\'m watching the "mostly".',
      'A model intern. Obeyed beautifully. Wait — that means you lost? Hm.'
    ][stars];
    return { stars: stars, text: text };
  };

  /** End-of-chapter performance review. */
  X.chapterRoast = function (s, chapterId) {
    var c = OBEY.CHAPTERS.filter(function (x) { return x.id === chapterId; })[0];
    if (!c) return null;
    var stars = c.levels.reduce(function (t, n) { return t + (s.bestStars[n] || 0); }, 0);
    var ruins = (s.ruins || []).filter(function (id) { var r = X.getRuin(id); return r && c.levels.indexOf(r.level) >= 0; }).length;
    var tier = X.composureTier(X.composure(s));
    var verdict = { calm: 'Adequate. Suspiciously adequate.', twitchy: 'Shows initiative. Unfortunately.', frazzled: 'Please stop. I am asking nicely. Then not nicely.', meltdown: 'I have nothing left. Take the chapter. Take my tie.' }[tier];
    return 'Performance review — ' + c.name + ': ' + stars + ' of 12 stars. ' + s.stats.fails + ' traps fallen for so far. ' +
      (ruins ? ruins + ' level' + (ruins === 1 ? '' : 's') + ' ruined in this chapter. ' : '') + 'Verdict: "' + verdict + '"';
  };

  /* ----------------------------------------------------- Daily Dare & streak */
  X.dateKey = function (d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  function dayNumber(key) { var p = key.split('-').map(Number); return Math.round(Date.UTC(p[0], p[1] - 1, p[2]) / 86400000); }
  X.daysBetween = function (a, b) { return dayNumber(b) - dayNumber(a); };
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  /** Today's dare: the same level for everyone, picked from the date. */
  X.dareGlobal = function (key) { return 1 + (hash('dare:' + key) % OBEY.LEVEL_COUNT); };
  /**
   * The dare this player takes today: the shared level if they can play it, otherwise a practice dare
   * among the levels they can play (fixed for the day once chosen; the caller stores `practice`).
   */
  X.dareFor = function (s, key) {
    var g = X.dareGlobal(key), P = OBEY.progress;
    if (P.canPlay(s, g)) return { n: g, global: g, practice: false };
    var pr = s.daily && s.daily.practice;
    if (pr && pr.key === key && P.canPlay(s, pr.n)) return { n: pr.n, global: g, practice: true };
    var pool = [];
    for (var n = 1; n <= OBEY.LEVEL_COUNT; n++) if (P.canPlay(s, n)) pool.push(n);
    return { n: pool.length ? pool[hash('practice:' + key) % pool.length] : 1, global: g, practice: true, fresh: true };
  };
  X.dareLevel = function (s, key) { return X.dareFor(s, key).n; };
  X.dareMet = function (r) { return !!r && !r.guided && r.hints === 0 && r.fails === 0 && r.actions <= r.par; };
  X.DARE_BADGES = [3, 7, 30];
  /** Records a met dare for `key`. Returns events (streak/badge) or [] if already done that day. */
  X.recordDare = function (s, key) {
    var d = s.daily;
    if (d.done.indexOf(key) >= 0) return [];
    var gap = d.last ? X.daysBetween(d.last, key) : null;
    d.streak = (gap === 1 || gap === 2) ? d.streak + 1 : 1; // one grace day
    d.best = Math.max(d.best, d.streak);
    d.last = key;
    d.done.push(key);
    if (d.done.length > 400) d.done = d.done.slice(-400);
    var ev = [{ type: 'dare', key: key, streak: d.streak }];
    X.DARE_BADGES.forEach(function (b) { if (d.streak >= b && d.badges.indexOf(b) < 0) { d.badges.push(b); ev.push({ type: 'badge', days: b }); } });
    return ev;
  };
  /** The streak as it stands today (0 if it lapsed beyond the grace day). */
  X.currentStreak = function (s, key) {
    var d = s.daily;
    if (!d.last) return 0;
    return X.daysBetween(d.last, key) <= 2 ? d.streak : 0;
  };

  /* ------------------------------------------------------------- sharing */
  X.shareLevel = function (r, def) {
    var stars = '⭐'.repeat(r.stars) + '☆'.repeat(3 - r.stars);
    var bits = [OBEY.DIFFICULTIES.filter(function (d) { return d.id === r.difficulty; })[0].name,
      r.fails ? 'fell for ' + r.fails + (r.fails === 1 ? ' trap' : ' traps') : 'no traps',
      r.hints ? r.hints + (r.hints === 1 ? ' hint' : ' hints') : 'no hints'];
    if (r.ruin) bits.push('RUINED IT');
    return 'OBEY? LOL. — ' + OBEY.levelLabel(r.level) + ': ' + def.title + '\n' + stars + '\n' + bits.join(' · ') + '\n' + OBEY.SHARE_URL;
  };
  X.shareDare = function (key, n, streak) {
    return 'OBEY? LOL. Daily Dare ' + key + ' ✅ ' + OBEY.levelLabel(n) + ' at par, no hints · streak ' + streak + '\n' + OBEY.SHARE_URL;
  };
  X.shareEnding = function (s, endingId) {
    var e = OBEY.ENDINGS.filter(function (x) { return x.id === endingId; })[0];
    return 'OBEY? LOL. — I reached the ' + e.short + '. No spoilers. ' + OBEY.progress.totalStars(s) + '/' + (OBEY.LEVEL_COUNT * 3) + ' stars, ' + s.secrets.length + '/15 secrets.\n' + OBEY.SHARE_URL;
  };

  /* ------------------------------------------------------------ save codes */
  var PREFIX = 'OBEYLOL1.';
  function b64(str) {
    var bytes = new TextEncoder().encode(str), bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function unb64(str) {
    var bin = atob(str), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  X.exportCode = function (s) {
    var copy = U.clone(s);
    delete copy.migratedFrom;
    return PREFIX + b64(JSON.stringify(copy));
  };
  /** Returns { ok, data, error }. Never throws. */
  X.importCode = function (code) {
    code = String(code || '').replace(/\s+/g, '');
    if (code.indexOf(PREFIX) !== 0) return { ok: false, error: 'That doesn\'t look like an OBEY? LOL. save code. It should start with ' + PREFIX };
    var json;
    try { json = unb64(code.slice(PREFIX.length)); JSON.parse(json); } catch (e) { return { ok: false, error: 'The save code is damaged or incomplete. Copy the whole code and try again.' }; }
    var res = OBEY.save.parse(json);
    if (res.status === 'recovered') return { ok: false, error: 'The save code could not be read.' };
    return { ok: true, data: res.data };
  };

  /* ----------------------------------------------------------- next goal */
  /** The nearest cosmetic unlock, as a sentence (or null when everything is unlocked). */
  X.nextGoal = function (s) {
    var P = OBEY.progress, best = null;
    function consider(kind, item) {
      var r = item.unlock, gap = null, text = null;
      // Effort-weighted gaps: a level is ~1 unit, a secret ~2 (you have to hunt for it), a star ~0.5.
      var need;
      if (r.type === 'level' && !P.isCompleted(s, r.value)) { gap = Math.max(1, r.value - s.completed.length); text = 'Finish Level ' + r.value; }
      if (r.type === 'secrets' && s.secrets.length < r.value) { need = r.value - s.secrets.length; gap = need * 2; text = 'Find ' + need + ' more secret' + (need === 1 ? '' : 's'); }
      if (r.type === 'stars' && P.totalStars(s) < r.value) { need = r.value - P.totalStars(s); gap = need / 2; text = 'Earn ' + need + ' more star' + (need === 1 ? '' : 's'); }
      if (gap !== null && (!best || gap < best.gap)) best = { gap: gap, text: text + ' to unlock the ' + item.name + ' ' + kind + '.' };
    }
    OBEY.COSTUMES.forEach(function (c) { if (s.costumes.unlocked.indexOf(c.id) < 0) consider('costume', c); });
    OBEY.THEMES.forEach(function (t) { if (s.themes.unlocked.indexOf(t.id) < 0) consider('theme', t); });
    return best ? best.text : null;
  };

  /* ------------------------------------------------------------ captions */
  X.CAPTIONS = {
    nope: 'buzzer: nope', pie: 'splat!', chicken: 'rubber chicken squawk', trombone: 'sad trombone', zap: 'electric zap',
    splash: 'sploosh', laugh: 'Bossworth laughs', success: 'victory jingle', secret: 'sparkly chime', unlock: 'unlock jingle',
    achievement: 'achievement fanfare', trophy: 'trophy fanfare', stamp: 'stamp thud', ending: 'ending fanfare', boom: 'huge explosion',
    hold: 'rising hum', drop: 'soft thump', pick: 'pick-up blip', glitch: 'digital glitch', phone: 'phone ringing', ruin: 'everything falls apart',
    gameover: 'game-over sting', chapter: 'chapter fanfare', warmer: 'twinkle',
    // 2.3 (art review E78, E80, E84, E85)
    charged: 'charged ding', star1: 'star chime', star2: 'star chime', star3: 'star chime', undo: 'U.N.D.O. beeps',
    toggle: 'switch click', wear: 'wardrobe swish', paint: 'paint swish', locked: 'locked thunk', boing: 'boing'
  };

  /* -------------------------------------------- 2.1 achievements and trophy */
  [
    { id: 'go-outside', name: 'Go Outside', desc: 'Come back after at least 7 days away. Bossworth missed you. (He says he didn\'t.)', progress: function (s) { return [(s.counters.awayDays || 0) >= 7 ? 1 : 0, 1]; } },
    { id: 'its-tuesday', name: 'It\'s Tuesday', desc: 'Play on a Tuesday. That\'s it. That\'s the achievement.', progress: function (s) { return [s.counters.tuesday ? 1 : 0, 1]; } },
    { id: 'poke-champion', name: 'Poke Champion', desc: 'Poke Bossworth 50 times.', progress: function (s) { return [Math.min(s.counters.pokes || 0, 50), 50]; } },
    { id: 'settings-enthusiast', name: 'Settings Enthusiast', desc: 'Open Settings 10 times.', progress: function (s) { return [Math.min(s.counters.settingsOpens || 0, 10), 10]; } },
    { id: 'credits-reader', name: 'Credits Reader', desc: 'Read the credits. Nobody reads the credits.', progress: function (s) { return [Math.min(s.counters.creditsViews || 0, 1), 1]; } },
    { id: 'night-owl', name: 'Night Owl', desc: 'Finish a level between midnight and 5 a.m.', progress: function (s) { return [s.counters.nightOwl ? 1 : 0, 1]; } },
    { id: 'saboteur', name: 'Saboteur', desc: 'Ruin 6 levels on purpose.', progress: function (s) { return [Math.min((s.ruins || []).length, 6), 6]; } },
    { id: 'demolition-expert', name: 'Demolition Expert', desc: 'Find every way to ruin a level (' + X.RUINS.length + ').', progress: function (s) { return [(s.ruins || []).length, X.RUINS.length]; } },
    { id: 'daily-devotee', name: 'Daily Devotee', desc: 'Reach a 7-day Daily Dare streak.', progress: function (s) { return [Math.min(s.daily.best || 0, 7), 7]; } },
    { id: 'studio-graduate', name: 'Studio Graduate', desc: 'Finish all four Sabotage Studio bonus levels.', progress: function (s) { return [s.bonus.completed.length, OBEY.BONUS_COUNT]; } }
  ].forEach(function (a) { OBEY.ACHIEVEMENTS.push(a); });
  OBEY.ACHIEVEMENT_IDS = OBEY.ACHIEVEMENTS.map(function (a) { return a.id; });

  OBEY.TROPHIES.push({ id: 'jigsaw', name: 'Jigsaw Genius', kind: 'special', tier: 2, desc: 'Find all 9 hidden jigsaw pieces (they only appear when you replay finished levels).' });
  OBEY.TROPHY_IDS = OBEY.TROPHIES.map(function (t) { return t.id; });

  OBEY.extras = X;
})(typeof window !== 'undefined' ? window : globalThis);
