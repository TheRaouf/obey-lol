# Changelog

All notable changes to this project. Versions follow semantic versioning.

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
