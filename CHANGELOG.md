# Changelog

All notable changes to this project. Versions follow semantic versioning.

## [2.4.0] — 2026-10-24

### Added
- 100 new levels (133–232) in 25 new chapters, between Postcard Paradise and the Final Factory:
  the supermarket (Aisle Antics → Carpark Capers), school (Chalkboard Chasm → Detention Dunes), a castle and fairy tale (Moat Mayhem → Spellbook Spire), under the sea
  (Periscope Pier → Shipwreck Shoals) and sports day (Hurdle Hollow → Podium Party). Each has a trick recap, three graduated hints and at least two
  declared wrong moves.
- 25 new ruins (66 total), 25 new chapter cups (65 trophies), 5 new art packs (f–j).
- Level lab `--fit`: checks every card's text at 320×700, 390×844 and 1180×900.

### Changed
- The Final Factory moved from Levels 133–136 to 233–236. Save schema v6 renumbers stored level numbers;
  players who had finished 2.3 continue at Level 133. The finale's level numbers are now derived from the
  level count (`OBEY.FINAL`, `OBEY.fromEnd(k)`), so future level packs only change the count and add a
  migration.



The art release: a full review by the game's art director (docs/ART-REVIEW-2.3.md) produced 100
enhancements (14 P1, 46 P2, 40 P3), applied in six groups.

### Changed — look
- Rooms stand on the floor: about 45 levels re-laid so furniture, machines and heroes sit on the floor band;
  objects that touch the floor get a contact shadow.
- One outline weight: a stage-side normaliser brings 95.6 % of outlines to 3–6 px on every screen size.
- Colours brought back to the art bible's palette across all five 2.2 art packs; highlights capped at 55 %.
- Broken art fixed: Level 20 scale, Level 21 clock, Level 11 footprint numerals, door signs that shrank to
  6–8 px, the Level 69 "burglar" shadow, Level 97's answer paperclip, Level 112's colour-only wires.
- Each chapter has an icon (map regions, trophies, chapter cards); the endings show the Instruction Machine;
  the credits gain a cast strip; Bossworth blinks and opens levels in a range of moods.
- Hard shadows return in Sunset and the dark endings; unearned stars are visible; yellow buttons use ink glyphs.

### Changed — sound
- Music families per art pack (office, home, outdoors, science, showbiz, final) and a "studio" loop for the
  bonus pack; music ducks under Bossworth's voice.
- Star chimes in time with the star animation; rewards queue 380 ms apart instead of stacking; the hold hum
  lasts the full 2 s and a "charged" ding confirms it; U.N.D.O. has its own bleeps; switches, costumes,
  themes, locked levels and poking Bossworth have their own sounds. Every new sound has a caption.

### Accessibility
- Stage text at least 12 px (cards shrink to fit, never below 11 px); 35 cards enlarged so nothing spills.
- The zap gag flashes under 3 Hz; captions moved to the bottom and toasts to the top so neither covers
  the controls; reduced motion respected by every new animation.

### Tools
- `npm run art:strokes`, `art:contrast`, `art:sheets` (tools/art/): outline, contrast and contact-sheet checks.



### Added
- 100 new levels (33–132) in 25 new chapters, between Static Summit and the Final Factory:
  the office (Stapler Steppes → Boardroom Bluffs), home (Kitchen Kerfuffle → Bedtime Bedlam), the
  outdoors (Brolly Beach → Postcard Paradise), the science lab (Beaker Basin → Orbit Outpost) and
  showbiz (Magic Matinee → Pixel Palace). Each has a trick recap, three graduated hints and at least two
  declared wrong moves (trap or harmless "nope").
- 25 new ruins, one per new chapter (41 total), each with a U.N.D.O. tip in the Sabotage file.
- 25 new chapter cups (40 trophies), 5 new art packs, and a level lab (`tools/level-lab.js`) that
  validates and plays a level on every difficulty before it ships.

### Changed
- The Final Factory moved from Levels 33–36 to 133–136; bonus levels are now numbered 1001–1004 and
  shown as Bonus 1–4. Save schema v5 renumbers every stored level number; 2.1 players continue at Level 33.
- Platinum Bossworth now means a Gold cup in every chapter (34).

### Fixed
- Offline app updates: the service worker now precaches with `cache: 'reload'`, so an update can't store the
  previous version's files from the browser's HTTP cache (found when the first 2.2 deploy still ran 2.1).
- On tablets, the stage shrinks to keep its bottom edge on screen when narrator text above it is long.
- Card text shrinks to fit its card on small screens.



Built from a review of 25 comparable games and their reviews (see FEATURE-ROADMAP.md, which ranks
200 improvements; the top 50 and the *Dude, Stop* feature set ship here) and optimised for iPad.

### Added
- **Ruin it:** 16 deliberately terrible ways to finish levels (12 campaign levels + 4 bonus), each with
  its own Bossworth meltdown, a "RUINED" stamp, a Sabotage file page and two achievements.
- **U.N.D.O.**, a glitchy sidekick program from Level 9: leaked chats (a running bet between Bossworth
  and his cousin Clive, paid off in the endings) and sabotage tips.
- **Sabotage Studio:** 4 bonus microgame levels after Level 12 (Red Means Blue, Ninety-Nine, The Tower,
  Tip Top), each with a proper and a ruined outcome.
- Narrator: idle reactions, replay and post-game lines, callbacks to your history, "let me finish!",
  phone calls, a composure meter, end-of-chapter performance reviews, Bossworth's review of you, a fake
  game over, "Intern #N", bonus dialogue for redoing a ruined level properly (and vice versa).
- Help that stays fair: "Want a nudge?" after repeated mistakes, "Point me" highlight on the last hint,
  Easy-mode "warmer" sparkle, "The trick" recap after every level, and **Skip** (up to 3 open skips).
- **Daily Dare** with streaks (one grace day) and 3/7/30-day badges; spoiler-free share cards for
  levels, dares and endings; personal bests (actions and time); optional speedrun timer; "Replay on a
  harder difficulty"; next-goal suggestions; chapter title cards; 9 hidden jigsaw pieces (replays only).
- **iPad:** layouts for every iPad in both orientations, Split View and Slide Over; no long-press menu or
  double-tap zoom on controls; reliable audio start on iOS; safe areas; Add to Home Screen; works offline
  (service worker); keyboard shortcuts (H, R, G, M, N, ?, arrow keys on the map); hover only where hover
  exists; 44-pt touch targets.
- **Accessibility:** high contrast, extra-large text, plain font, left-handed layout, hold assist, sound
  captions, separate effects/voice/music volumes, optional chapter music, vibration toggle.
- Up to 3 player profiles per device; save codes to move progress; "copy my save code first" on reset.
- 10 new achievements (21 total), the Jigsaw Genius trophy (15 total), Bossworth's file on you (stats).
- GitHub Actions: Chromium (full suite) and WebKit (iPad, campaign, 2.x suites) on every push.

### Changed
- Save schema v4 (2.0 saves migrate automatically). "What's new" panel shown once to returning players.
- Gags never repeat the same generic gag twice in a row.

### Fixed (third independent QA pass before release)
- 19 defects (1 × P1, 6 × P2, 12 × P3), all with regression tests — see TEST-REPORT.md. Highlights:
  progress kept when switching profiles with storage blocked; levels pause behind dialogs; Easy sparkle
  and "Point me" follow the real solution; Split View / short-window layouts; one shared Daily Dare per
  day; no ruins during "Show me how"; bests only from fair runs and kept on New Game; contrast fixes.
- Art director must-fixes: no button shadows on static cards, accent/good colours ≥ 4.5:1 in every
  theme, readable Level 3 button, chapter card visible with reduced motion.

## [2.0.0] — 2026-10-24

### Added
- 20 new levels (15–34): The Volume Knob, Opposite Day, The Lost Sock, Bossworth Says, The Shy Button, Weight of Words, Nap Time, Wet Paint, Zero Gravity, The Copycat, Mirror Mirror, Two of a Kind, The Drip, Swamp Stones, Channel Surfing, The Password, Pick a Card, Lights Out, Terms and Conditions, The Rehearsal. The campaign is now 36 levels in 9 chapters; the finale is Levels 35–36.
- Difficulty: Easy, Medium and Hard with their own star rules, hint limits, "Show me how" rules and room tweaks.
- Bossworth talks: synthesised babble voice per costume and mood, optional real speech, animated mouth, new laughing and sleeping faces.
- Wrong-answer feedback: five slapstick gags with sounds, a "That was a trap! How to do it right" card, and "nope" reactions for harmless wrong moves.
- "Show me how": a step-by-step guided walkthrough with highlighted objects (guided runs earn 1 star).
- Trophy room: 9 chapter cups (Bronze/Silver/Gold by difficulty) and 5 special trophies.
- Richer synthesised sound effects (filters, noise, chords): pick/drop, hold, nope, gags, fanfare, trophy, laugh.
- Save schema v3 with automatic migration of 1.x saves.

### Changed
- Achievements "Perfect Performance" and "Full Campaign" now cover all 36 levels; the Ninja costume unlocks at Level 36.
- Map rebuilt for 36 levels and 9 chapters, shows the best difficulty per level and scrolls to your next level.

## [1.0.0] — 2026-10-24

### Fixed (independent QA pass before release)
- Keyboard focus no longer jumps away after actions or timer ticks (D1).
- Keyboard and pointer holds now end correctly when released early, after focus moves, or outside the stage (D2, D3).
- The level-complete card is now truly modal for keyboard users (D4).
- Readable "Skip to the end" button on dark endings; boxed settings legends in the Sunset theme (D5).
- Stage text fits its cards on 320–390 px screens (D6).
- "Replay" now counts as a replay for the Déjà Vu secret (D7).
- Browser Back closes open dialogs and the tutorial (D8).
- Pressing and then dragging the gift in Level 9 works (D9).
- Re-entering a level can no longer leave the previous attempt's timers running.

### Added
- Complete 16-level campaign with a reusable level runtime (tap, drag, hold, timers, soft fails, hints, star scoring).
- Bossworth the narrator: 7 moods, 8 costumes (Classic, Royal, Alien, Detective, Wizard, Robot, Dino, Ninja) with costume-specific level intros.
- 15 secrets with Secret Field Notes and clue system.
- 4 themes (Classic, Candy, Ocean, Sunset) that restyle the whole game.
- 11 achievements and 3 endings (Hero, Chaos, Secret Master) with an endings gallery and replay.
- Interactive adventure map with regions, progress route, locked/unlocked/current/completed states and best stars.
- First-play tutorial (skippable, replayable), graduated 3-tier hints, restart.
- Versioned save (schema v2) with validation, v1 migration, corrupt-save recovery and in-memory fallback.
- Settings: sound, motion (system/reduce/full), text size, replay tutorial, reset progress.
- Keyboard, mouse and touch support including keyboard/touch alternatives for dragging and holding.
- Static checks, unit tests, Playwright browser tests, packaging script, generated level spec.
