# Feature roadmap — 200 ranked improvements

Built from a review of critic and player feedback on comparable games (narrator/meta games and
trick-puzzle games — sources at the end), the 1.x/2.0 QA findings, and a request to optimise for
iPad. Items are ranked by **player value × fit with the game ÷ effort**. Ties go to fixes for
problems reviewers complained about (ads, unfair "gotcha" logic, lost progress, no hints/undo,
fiddly touch input) over brand-new content.

- **Status:** `2.1` = being built now (the top 50) · `P1` next · `P2` later · `P3` someday / needs a decision
- **Effort:** S (hours) · M (a day or two) · L (several days)
- **Why** names the review or game that inspired the item.

## Top 50 — building now (version 2.1)

### iPad and touch

| # | Feature | Why | Effort | Status |
|---|---|---|---|---|
| 1 | iPad layout pass: every iPad size in portrait and landscape; the stage fits the screen without scrolling in landscape | iPad request; TouchArcade on fiddly phone layouts | M | 2.1 |
| 2 | Split View and Slide Over windows (narrow and short windows) lay out cleanly | iPad request | S | 2.1 |
| 3 | No iOS long-press menu, text selection or magnifier on game controls (hold puzzles) | iPad request; Tricky Test "buttons that don't respond" | S | 2.1 |
| 4 | No double-tap zoom or tap delay on game controls | iPad request | S | 2.1 |
| 5 | Reliable sound and voice start on iPhone/iPad (audio resumed inside the touch, speech primed) | iPad request | S | 2.1 |
| 6 | Safe areas and dynamic viewport height (home indicator, Stage Manager windows, Safari toolbars) | iPad request | S | 2.1 |
| 7 | Add to Home Screen: app manifest, Apple touch icon, full-screen standalone mode | iPad request; Brain Out "works offline" praise | S | 2.1 |
| 8 | Works offline after the first visit (service worker with versioned cache and "update ready" notice) | Brain Out offline praise | M | 2.1 |
| 9 | Keyboard shortcuts for Magic Keyboard / desktop (H hint, R restart, G guide, M map, N next) with a `?` help panel | iPad request; Unpacking keyboard criticism | S | 2.1 |
| 10 | Trackpad/mouse hover states, and 44-point minimum touch targets on touch screens | Apple HIG; Unpacking "no outline on hover" | S | 2.1 |
| 11 | Haptic feedback toggle (vibration where the device supports it) | Brain Out separate vibration toggle | S | 2.1 |
| 12 | Rotating or resizing mid-level keeps the attempt, focus and held item | iPad request | S | 2.1 |

### Hints and fairness

| # | Feature | Why | Effort | Status |
|---|---|---|---|---|
| 13 | Bossworth reacts when you go quiet (escalating lines after 15 s, 40 s and 90 s idle) | Stanley Parable narrator reacting to idling | S | 2.1 |
| 14 | "Want a nudge?" offer after 2 traps or 3 harmless wrong moves | Professor Layton wrong-answer nudge; Baba "stuck" | S | 2.1 |
| 15 | "Point me" hint: the last hint tier also highlights the first thing to use | Nintendo Life on Baba Is You ("next move glows") | S | 2.1 |
| 16 | "The trick" recap on the completion card: one line on why the lie worked | Game Informer: seeing an answer ≠ understanding it; Tricky Test "dishonest" puzzles | S | 2.1 |
| 17 | Skip a level ("Let it be"): up to 3 open skips, skipped levels stay marked and can be solved later | A Little to the Left "Let It Be"; Baba non-linear progress; Impossible Quiz useless skips | M | 2.1 |
| 18 | Easy-mode "warmer" sparkle when a move is part of the solution | A Little to the Left snap feedback | S | 2.1 |
| 19 | More reaction variety: no repeated poke/trap/nope lines back-to-back, bigger pools | Pony Island "repetitious asides"; Stanley replay complaints | S | 2.1 |
| 20 | Replay-aware intros: different opening lines when you replay a finished level | Superliminal "little reason to replay" | S | 2.1 |

### Narrator and humour

| # | Feature | Why | Effort | Status |
|---|---|---|---|---|
| 21 | Callbacks: Bossworth brings up your history (traps, defiance, pokes, skips) | Ultra Deluxe callbacks praised on Steam | S | 2.1 |
| 22 | "Let me finish!" reaction when you act while he is still talking (once per level) | Stanley Parable narrator annoyed at rushing | S | 2.1 |
| 23 | Joke settings: a "Bossworth honesty" slider and a "Cheerful façade" switch that only make him comment | Pony Island joke option toggles | S | 2.1 |
| 24 | Joke achievements: Go Outside, It's Tuesday, Poke Champion, Settings Enthusiast, Credits Reader, Night Owl | Stanley Parable joke achievements | S | 2.1 |
| 25 | Bossworth comments on the menus (map, achievements, trophy room, settings) | Ultra Deluxe mocking its own achievements | S | 2.1 |
| 26 | Bossworth's review of you: a report card on the stats page and after each ending | Ultra Deluxe mock reviews | S | 2.1 |
| 27 | "Bossworth's file on you": stats page (play time, traps, pokes, hints, defiance, favourite costume, streak) | Wordle stats screen | S | 2.1 |
| 28 | Chapter title cards when a new chapter starts, and a fanfare when it is finished | Monument Valley polish; Portal pacing | S | 2.1 |

### Retention and sharing

| # | Feature | Why | Effort | Status |
|---|---|---|---|---|
| 29 | Daily Dare: one date-picked level per day with a dare (par, no hints), the same for everyone, offline | Wordle; A Little to the Left Daily Tidy | M | 2.1 |
| 30 | Daily streak with one grace day, plus 3/7/30-day badges | Wordle streaks (and anger at lost streaks); Daily Tidy badges | S | 2.1 |
| 31 | Spoiler-free share card (emoji result) for levels, the Daily Dare and endings — copy or share sheet | Wordle share grid | S | 2.1 |
| 32 | Personal bests per level: fewest actions and fastest time | Human Resource Machine optional goals | S | 2.1 |
| 33 | Optional speedrun timer with best times and a total campaign time | Brain Test timed events | S | 2.1 |
| 34 | "Secrets here" marker on map levels that still hide undiscovered secrets | Unpacking pulsing unfinished rooms; PDTA endings tracker | S | 2.1 |
| 35 | "Replay on a harder difficulty" button on the completion card | Cut the Rope three-star replay loop | S | 2.1 |
| 36 | Next-goal suggestions on the menu ("2 secrets to the Dino costume") | Cut the Rope stars unlock packs; HRM unclear goals | S | 2.1 |

### Saves and trust

| # | Feature | Why | Effort | Status |
|---|---|---|---|---|
| 37 | Save export / import code (copy and paste between browsers or devices) | No cloud save complaints (There Is No Game, Wordle streak loss, Brain Test lost points) | S | 2.1 |
| 38 | Up to 3 player profiles (family iPads), each with its own name and progress | Cut the Rope "no multiple save profiles" | M | 2.1 |
| 39 | Reset and New Game offer "copy my save code first" | Cut the Rope delete-everything complaint | S | 2.1 |
| 40 | Ask the browser to keep storage persistent (protects saves from Safari clearing site data) | iPad request; lost-progress complaints | S | 2.1 |
| 41 | "What's new" panel shown once after an update | Ultra Deluxe "felt like 1.1" — make changes visible | S | 2.1 |

### Accessibility

| # | Feature | Why | Effort | Status |
|---|---|---|---|---|
| 42 | High-contrast mode (colour-blind-safe accents, thicker outlines) | Wordle high-contrast mode; Unpacking | S | 2.1 |
| 43 | Extra-large text size | Unpacking larger HUD | S | 2.1 |
| 44 | Plain font option (system font instead of the bubbly display font) | Unpacking font criticism | S | 2.1 |
| 45 | Hold assist: tap once to start holding, tap again to let go | Unpacking input flexibility | S | 2.1 |
| 46 | Sound captions: every sound effect also shown as text ([sad trombone]) | Unpacking visual cues for every sound | S | 2.1 |
| 47 | Arrow-key navigation on the adventure map | Unpacking keyboard criticism | S | 2.1 |
| 48 | Left-handed layout: narrator and tools swap sides | Where's My Water left-side scroll bar complaint | S | 2.1 |

### Audio

| # | Feature | Why | Effort | Status |
|---|---|---|---|---|
| 49 | Separate volume sliders for effects and voice | Brain Out separate toggles | S | 2.1 |
| 50 | Optional chapter music (gentle generative tune per chapter, own volume, off by default) | A Little to the Left evolving soundtrack; Baba repetitive-music criticism | M | 2.1 |

## Requested: the *Dude, Stop* feature set (also building in 2.1)

*Dude, Stop* (Team HalfBeard, 2018) rewards deliberately failing puzzles while its narrator falls
apart. These are original equivalents of its features, not copies of its characters or jokes.

| # | Feature | Dude, Stop equivalent | Effort | Status |
|---|---|---|---|---|
| DS1 | "Ruin it" solutions: a second, deliberately terrible way to finish 12 levels, with a unique Bossworth meltdown | Failing puzzles on purpose | L | 2.1 |
| DS2 | Ruin collection page, "RUINED" stamps on the map, hidden achievements for ruins | Hidden achievements for bad solutions | M | 2.1 |
| DS3 | Composure meter: Bossworth's lines get more frantic as you defy and ruin | Narrator grows angrier until he snaps | M | 2.1 |
| DS4 | End-of-chapter performance review: Bossworth roasts your stats | "The Reason You Suck" speeches | S | 2.1 |
| DS5 | Post-game Bossworth: friendlier lines after the campaign is finished | Narrator more amicable on replay | S | 2.1 |
| DS6 | U.N.D.O., a glitchy sidekick program in a chat panel that leaks Bossworth's chats and gives "ruin" tips | D.U.C.K. program | M | 2.1 |
| DS7 | Glitch effects when U.N.D.O. takes over (motion-aware) | Visual glitches | S | 2.1 |
| DS8 | Running subplot: Bossworth's bet with his cousin Clive, revealed in leaked chats, paid off in the endings | The bet with Mark | S | 2.1 |
| DS9 | Nine hidden jigsaw pieces (one per chapter) that assemble a picture, with a collection trophy | Puzzle-piece collectibles | M | 2.1 |
| DS10 | Fake "GAME OVER" gag that turns out to be a joke | Early fake game-over | S | 2.1 |
| DS11 | Bossworth takes a phone call mid-level and ignores you | Narrator's phone call | S | 2.1 |
| DS12 | Bonus dialogue for replaying a ruined level properly, and vice versa | Replays unlock extra dialogue | S | 2.1 |
| DS13 | Bossworth calls you "Intern #N" (a number per profile) | "Tester #17" | S | 2.1 |
| DS14 | "Sabotage Studio" bonus pack: 4 new microgame levels (opposite-labelled buttons, phone to 99%, disc tower you can cheat, the upside-down tree) | Microgame puzzles | L | 2.1 |
| DS15 | GitHub Actions run of the browser tests in real WebKit (Safari's engine) and Chromium | (iPad testing; moved up from P1 #52) | M | 2.1 |

Sources: [itch.io page](https://team-halfbeard.itch.io/dude-stop) · [TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/VideoGame/DudeStop) ·
[Wikipedia](https://en.wikipedia.org/wiki/Dude,_Stop) · [Screen Rant review](https://screenrant.com/dude-stop-review/) ·
[WayTooManyGames review](https://waytoomany.games/2020/03/06/review-dude-stop-switch/)

## Pipeline — the other 150

### P1 — next

| # | Feature | Why | Effort | Status |
|---|---|---|---|---|
| 51 | Pause button and auto-pause for timed levels when the app goes to the background (iPad interruptions) | iPad request | M | P1 |
| 52 | Run the *whole* browser suite in WebKit (2.1 starts with a smoke subset — see DS15) | iPad request | M | P1 |
| 53 | Real iPad device pass (portrait/landscape, Split View, Apple Pencil, VoiceOver) | iPad request | S | P1 |
| 54 | Undo the last move on sequence and drag levels | Baba Is You undo praise | L | P1 |
| 55 | Bonus levels unlocked by secrets | Where's My Water hidden collectibles | L | P1 |
| 56 | "The interface is the puzzle" levels (logo, star counter, hint button as objects) | There Is No Game "genius" UI puzzles | L | P1 |
| 57 | "Rewrite the rules" level: rearrange the words of Bossworth's instruction | Pony Island hacking; Baba Is You | M | P1 |
| 58 | Rock-paper-scissors level where Bossworth cheats | Buddy Simulator minigames | M | P1 |
| 59 | Fake "Skip level" crisis level | Ultra Deluxe skip-button gag | M | P1 |
| 60 | Relaxed timers option for timed levels | Unpacking "no timers" | M | P1 |
| 61 | Arabic translation with right-to-left layout | Localisation (old roadmap) | L | P1 |
| 62 | String table for all UI text (prerequisite for translations) | Localisation | L | P1 |
| 63 | Dark theme following the device setting | Wordle dark theme | M | P1 |
| 64 | Confetti and star burst on 3 stars / new best (motion-aware) | Cut the Rope polish | S | P1 |
| 65 | Snap and wobble micro-feedback on correct drops | A Little to the Left | S | P1 |
| 66 | Mechanical click and rumble sounds on correct actions | Edge on Monument Valley | S | P1 |
| 67 | Visual cue separating usable objects from decoration | Monument Valley colour cues | M | P1 |
| 68 | Tap to skip a gag animation | Pacing | S | P1 |
| 69 | Chapter jump buttons and zoomed-out overview on the map | Baba non-linear map | S | P1 |
| 70 | GitHub Actions CI running static, unit and browser tests on every push | Release safety | M | P1 |
| 71 | Firefox automated test run | Cross-browser gap | S | P1 |
| 72 | Playtests with children on the fairness of each lie | Common Sense Media on "dishonest" puzzles | S | P1 |
| 73 | "Every lie has a visible tell" audit of all 36 levels | Tricky Test criticism; PDTA obscure solutions | M | P1 |
| 74 | Difficulty-curve review (no wall after Level 15) | Nintendo Life on Baba Is You | S | P1 |
| 75 | Social preview image for the shared link | Sharing | S | P1 |
| 76 | Auto-pause on tab switch, with a Bossworth "where did you go?" line | Stanley Parable reactivity | S | P1 |
| 77 | Hidden achievements whose descriptions appear once unlocked | Stanley Parable | S | P1 |
| 78 | Map filters: unfinished, under 3 stars, secrets left | Unpacking | S | P1 |
| 79 | Endings poster wall | Please, Don't Touch Anything endings board | S | P1 |
| 80 | Resume an interrupted attempt after a reload | Lost-progress complaints | M | P1 |

### P2 — later

| # | Feature | Why | Effort | Status |
|---|---|---|---|---|
| 81 | Hidden hint coins in the scenery, spent on hints (never bought) | Professor Layton hint coins | M | P2 |
| 82 | Kind narrator mode for young children (softer lines) | Red Button app reviews | L | P2 |
| 83 | Level editor using the level data format | Old roadmap | L | P2 |
| 84 | Chapter-themed evolving music (beyond 2.1's simple tunes) | A Little to the Left | M | P2 |
| 85 | Mischief cat that interrupts levels | A Little to the Left cat | M | P2 |
| 86 | Late-game decay: Bossworth's office falls apart toward the finale | Pony Island reskin; Buddy Simulator | M | P2 |
| 87 | New small scenery details on each replay | Inscryption | M | P2 |
| 88 | A talking object that gives counter-hints | Inscryption talking cards | M | P2 |
| 89 | Unlockables desk: babble jukebox, wallpapers, costume gallery | Doki Doki Literature Club Plus extras | M | P2 |
| 90 | Rush event: 10 levels in 10 minutes | Brain Test timed events | M | P2 |
| 91 | Lives challenge: 3 lives per chapter with checkpoints | The Impossible Quiz | M | P2 |
| 92 | Hard Remix mode: existing levels with new lies | Wordle hard mode | L | P2 |
| 93 | Daily Dare calendar view with monthly badges | A Little to the Left Daily Tidy | S | P2 |
| 94 | Optional "Bossworth idols" modifiers for bonus trophies | Bastion idols | M | P2 |
| 95 | Live commentary during drags and holds | Bastion real-time narration | M | P2 |
| 96 | More levels with several valid third options | A Little to the Left multiple solutions | L | P2 |
| 97 | Background sight gags with bonus lines in every level | Portal hidden jokes | M | P2 |
| 98 | More endings (e.g. an "obey everything" ending) | Stanley Parable | L | P2 |
| 99 | Track and reward a pure-obedience run | Stanley Parable | M | P2 |
| 100 | Short story beats between chapters (light touch) | Beginner's Guide (don't overdo it) | M | P2 |
| 101 | Pirate costume (unlock: 7-day Daily Dare streak) | Retention | S | P2 |
| 102 | Costumes for Gold cups | Cut the Rope rewards | S | P2 |
| 103 | Costume-specific lines in every level | Superliminal replay value | L | P2 |
| 104 | Screen transitions (fade; motion-aware) | Polish | S | P2 |
| 105 | Level intro card with the goal and star targets before play | Human Resource Machine | S | P2 |
| 106 | Chapter landmark art on the map | Polish | M | P2 |
| 107 | Bossworth idle animation (blinks, looks around) | Polish | S | P2 |
| 108 | More gags (anvil, banana peel, confetti cannon) | Variety | S | P2 |
| 109 | Narrator text speed / skip-line control | Pacing | S | P2 |
| 110 | Unique sound per object type | Edge on Monument Valley audio | M | P2 |
| 111 | Screen-reader verbosity setting (brief / detailed) | Accessibility | M | P2 |
| 112 | NVDA pass on Windows | Accessibility | S | P2 |
| 113 | iOS Switch Control pass | Accessibility | M | P2 |
| 114 | Reduce-flashing option separate from motion | Accessibility | S | P2 |
| 115 | Save to a file and load from a file | Lost progress | S | P2 |
| 116 | Automatic backup of the last 3 saves | Lost progress | S | P2 |
| 117 | itch.io page and build | Distribution | S | P2 |
| 118 | Android tablet test pass | Platform | S | P2 |
| 119 | Performance budget and Lighthouse checks | Quality | M | P2 |
| 120 | Visual regression screenshots in CI | Quality | M | P2 |
| 121 | "Copy diagnostics" button for bug reports (no network) | Support | S | P2 |
| 122 | Friendly error screen with "restart level" if something breaks | Brain Test crash complaints | S | P2 |
| 123 | Challenge-a-friend link that opens a specific level | Wordle sharing | S | P2 |
| 124 | Share trophy cards as images | Sharing | M | P2 |
| 125 | Share an ending card | Sharing | S | P2 |
| 126 | Trailer GIF in the README | Distribution | S | P2 |
| 127 | Zen mode: no stars, no timers | Unpacking | S | P2 |
| 128 | Local speedrun leaderboard per profile | Brain Test events | S | P2 |
| 129 | More poke lines and poke combos | Variety | S | P2 |
| 130 | Holiday and date lines (Ramadan, Eid, New Year, Halloween) | Charm | S | P2 |
| 131 | Time-of-day greetings | Charm | S | P2 |
| 132 | Reacts to window resizing / rotation | Stanley Parable reactivity | S | P2 |
| 133 | Reacts to sound being off ("I'm talking to myself") | Stanley Parable reactivity | S | P2 |
| 134 | Writing pass: keep lines short | Beginner's Guide "overbearing narration" | M | P2 |
| 135 | Chapter 10 "Bonus Basement" (4 new levels) | "More levels" requests (Kimola on Brain Test) | L | P2 |
| 136 | Two-finger hold puzzle for tablets | iPad request | M | P2 |
| 137 | A second level for the best mechanics | Superliminal "ideas dropped too soon" | L | P2 |
| 138 | Achievement categories and filters | Usability | S | P2 |
| 139 | Split `app.js` into smaller modules | Maintainability | M | P2 |
| 140 | Content-Security-Policy meta tag | Security hygiene | S | P2 |
| 141 | Schema validation for level files in the static checks | Quality | S | P2 |
| 142 | Hint button shows what each tier will give before you use it | Layton hint design | S | P2 |
| 143 | Optional colour for the "drop here" outline | Unpacking adjustable outline | S | P2 |
| 144 | Bossworth's "lull you in" opening: first levels deliberately honest | Doki Doki Literature Club | M | P2 |
| 145 | Narrator mood changes the room palette | Buddy Simulator | M | P2 |
| 146 | Secret achievement for finding every "nope" sticker variant | Collectible humour | S | P2 |
| 147 | "Challenge" badges for finishing a chapter without traps | HRM optional goals | S | P2 |
| 148 | Map shows best time and actions on hover/focus | HRM | S | P2 |
| 149 | Gentle reminder to take a break after long sessions | Wellbeing | S | P2 |
| 150 | Large-print "big buttons" layout for young children | Kids on iPad | M | P2 |

### P3 — someday or needs a decision

| # | Feature | Why | Effort | Status |
|---|---|---|---|---|
| 151 | More languages (French, Spanish) after the string table | Localisation | L | P3 |
| 152 | Share custom levels as a code | Level editor follow-up | L | P3 |
| 153 | Daily Dare remixes generated from level variations | Wordle freshness | L | P3 |
| 154 | Joke achievement for not opening the game for a year | Stanley Parable "Go Outside" | S | P3 |
| 155 | Comic recap of your campaign choices at the ending | Narrative payoff (Superliminal abrupt ending) | M | P3 |
| 156 | Mock reviews of the game from Bossworth's friends in the credits | Ultra Deluxe | S | P3 |
| 157 | New theme unlocked by Daily Dare badges | Retention | S | P3 |
| 158 | More voice variety per costume | Audio | M | P3 |
| 159 | Bossworth's eyes follow the pointer | Charm | S | P3 |
| 160 | Particle burst when a secret is found | Polish | S | P3 |
| 161 | Typewriter text option for the speech bubble | Style | S | P3 |
| 162 | Custom cursor art on desktop | Style | S | P3 |
| 163 | One-switch scanning mode | Accessibility | L | P3 |
| 164 | Mono audio option | Accessibility | S | P3 |
| 165 | Bundled dyslexia-friendly font | Accessibility | S | P3 |
| 166 | "Short lines" mode for narration | Accessibility | L | P3 |
| 167 | Focus mode that hides decorations | Accessibility | M | P3 |
| 168 | Remappable keyboard shortcuts | Accessibility | M | P3 |
| 169 | Move a save between devices via a link (privacy review needed) | Convenience | M | P3 |
| 170 | Optional cloud sync with an account (conflicts with no-network design) | Lost progress | L | P3 |
| 171 | Save integrity report | Support | S | P3 |
| 172 | iOS App Store wrapper | Distribution | L | P3 |
| 173 | Google Play wrapper | Distribution | L | P3 |
| 174 | Desktop app build | Distribution | L | P3 |
| 175 | In-game version history | Transparency | S | P3 |
| 176 | Printable completion certificate | Fun | S | P3 |
| 177 | Community level gallery (needs hosting) | Community | L | P3 |
| 178 | Press kit page | Distribution | S | P3 |
| 179 | Kids bundle preset: Easy + kind narrator + no timers | Families | M | P3 |
| 180 | Classroom guide for teaching critical reading of instructions | Common Sense Media angle | M | P3 |
| 181 | Two-player mode where one player writes Bossworth's lines | Old parked idea | L | P3 |
| 182 | Narrator commentary replay of your best runs | Old roadmap | L | P3 |
| 183 | Any% / 100% speedrun categories with splits | Speedrun community | M | P3 |
| 184 | Device-aware jokes ("nice iPad") | Reactivity | S | P3 |
| 185 | Low-battery joke where the Battery API exists | Reactivity | S | P3 |
| 186 | Secret dialogue after 100 pokes | Easter egg | S | P3 |
| 187 | Apple Pencil drawing puzzles | iPad | L | P3 |
| 188 | Tilt puzzle using device motion (needs permission) | iPad | M | P3 |
| 189 | Microphone "shout" puzzle (permission heavy) | Novelty | M | P3 |
| 190 | Seasonal level decorations | Charm | M | P3 |
| 191 | A 16th secret and a hidden "true" ending | Completionists | M | P3 |
| 192 | Remixed finale on Hard | Challenge | M | P3 |
| 193 | Final argument "boss fight" with Bossworth | Narrative | L | P3 |
| 194 | Trophy shelf with rotation | Polish | S | P3 |
| 195 | Statistics charts (stars per chapter) | Stats | S | P3 |
| 196 | Favourite levels | Convenience | S | P3 |
| 197 | Personal notes on a level | Convenience | S | P3 |
| 198 | Developer debug overlay (`?debug=1`) | Tooling | S | P3 |
| 199 | Automatic solvability check for player-made levels | Level editor follow-up | M | P3 |
| 200 | Gallery page of all object art | Tooling | S | P3 |

## Deliberately not planned

Ads, paid hints, lives you must buy back, hint currency for sale, online leaderboards and
tracking. Mobile trick-puzzle reviews are dominated by complaints about exactly these.

## Sources

Narrator / meta games: [Engadget — The Stanley Parable](https://www.engadget.com/2013-10-18-the-stanley-parable-review.html) ·
[GameSpot — "Go Outside" achievement](https://gamespot.com/articles/five-years-after-its-release-one-of-the-stanley-parables-achievements-can-finally-be-unlocked/1100-6462609/) ·
[Slant — Ultra Deluxe](https://www.slantmagazine.com/games/the-stanley-parable-ultra-deluxe-review/) ·
[Steam — Ultra Deluxe thread](https://steamcommunity.com/app/1703340/discussions/0/3275815819067829043) ·
[Nintendo Life — There Is No Game](https://www.nintendolife.com/reviews/switch-eshop/there_is_no_game_wrong_dimension) ·
[AppUnwrapper — There Is No Game iOS](https://www.appunwrapper.com/2020/12/19/there-is-no-game-wrong-dimension-ios-review/) ·
[GamesRadar — Portal](https://www.gamesradar.com/portal-review/2) ·
[Giant Bomb — Portal 2](https://giantbomb.com/reviews/portal-2-review) ·
[PC Gamer — Pony Island](https://www.pcgamer.com/uk/pony-island-review) ·
[TouchArcade — Please, Don't Touch Anything](https://toucharcade.com/2015/10/28/please-dont-touch-anything-review/) ·
[Sirus Gaming — PDTA](https://sirusgaming.com/please-dont-touch-anything-review/) ·
[Gaming Trend — Superliminal](https://gamingtrend.com/reviews/eye-of-the-beholder-superliminal-review/) ·
[Engadget — Thomas Was Alone](https://www.engadget.com/2013-05-01-thomas-was-alone-review.html) ·
[Shacknews — Bastion](https://www.shacknews.com/article/69326/bastion-review) ·
[PC Gamer — The Beginner's Guide](https://pcgamer.com/the-beginners-guide-review) ·
[Checkpoint — Inscryption](https://checkpointgaming.net/reviews/2021/10/inscryption-review-creepy-scary-brilliant/) ·
[Retroware — Buddy Simulator 1984](https://articles.retroware.com/2021/09/14/review-buddy-simulator-1984-a-mostly-spoiler-free-discussion/) ·
[Checkpoint — DDLC Plus](https://checkpointgaming.net/reviews/2021/07/doki-doki-literature-club-plus-review-dead-poets-society/)

Trick / casual puzzle games: [Common Sense Media — Tricky Test 2](https://www.commonsensemedia.org/app-reviews/tricky-test-2-genius-brain) ·
[App Store — Brain Test](https://apps.apple.com/app/1486214495) ·
[Kimola — Brain Test reviews](https://kimola.com/reports/brain-test-game-reviews-challenges-hate-ads-140909) ·
[Xataka — Brain Out](https://www.xatakandroid.com/aplicaciones-android/probamos-brain-out-puedes-pasarlo-juego-logica-que-triunfa-google-play) ·
[App Store — DOP 4](https://apps.apple.com/app/1600034464) ·
[Wikipedia — The Impossible Quiz](https://en.wikipedia.org/wiki/The_Impossible_Quiz) ·
[Nintendo Life — Baba Is You](https://www.nintendolife.com/reviews/switch-eshop/baba_is_you) ·
[Gamereactor — Baba Is You](https://www.gamereactor.eu/baba-is-you-review/) ·
[Pocket Gamer — Monument Valley](https://www.pocketgamer.com/monument-valley/review/) ·
[TouchArcade — Cut the Rope](https://toucharcade.com/2010/10/05/cut-the-rope-review-free-the-candy-feed-the-beast/) ·
[TouchArcade — Where's My Water?](https://toucharcade.com/2011/09/23/wheres-my-water-review-who-knew-alligators-love-bathing/) ·
[Game Informer — A Little to the Left](https://www.gameinformer.com/review/a-little-to-the-left/tidy-tranquility) ·
[CGM — A Little to the Left](https://www.cgmagonline.com/review/game/a-little-to-the-left-pc-review) ·
[Can I Play That — Unpacking](https://caniplaythat.com/2021/11/01/unpacking-accessibility-review-can-i-play-that-pc/) ·
[Smithsonian — Wordle](https://www.smithsonianmag.com/smart-news/heres-why-the-word-game-wordle-went-viral-180979439/) ·
[Wikipedia — Wordle](https://en.wikipedia.org/wiki/Wordle) ·
[Nintendo Life — Human Resource Machine](https://www.nintendolife.com/reviews/wiiu-eshop/human_resource_machine) ·
[Layton wiki — Hints](https://layton.fandom.com/wiki/Hints)
