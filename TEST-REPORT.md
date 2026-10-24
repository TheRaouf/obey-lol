# Test report — OBEY? LOL. 2.2.0

Date: 2026-10-24. Counts come from logged runs: `tests/logs/unit-22.tap`, `tests/logs/e2e-22.tap`
(Node v22.23.4, Playwright Chromium). CI results are added below once the release commit's run finishes.

## Summary

| Suite | Where | Run | Passed | Failed |
|---|---|---|---|---|
| Static checks (`tools/check.js`) | local | 1,972 checks | 1,972 | 0 |
| Unit tests (`tests/unit`, 4 files) | local | 764 | 764 | 0 |
| Browser tests, Chromium (9 files) | local | 120 | 120 | 0 |
| Level lab (`tools/level-lab.js`) on the 100 new levels | local | per batch | 0 problems | — |

## What 2.2 adds to the coverage

- **Every new level (33–132), in Node:** each declared wrong move behaves as documented (trap / nope /
  still playing), the intended solution earns 3★ on Easy, Medium and Hard, every ruin path finishes with
  its registered ruin, restart gives a clean state, hints are graduated, leaving cancels all timers.
- **Every scripted tap is possible in the real UI** (new test + level-lab rule): in the UI, tapping a
  draggable object picks it up instead of sending a tap. This caught Level 76 (fixed: separate EAT button).
- **Save schema v5** (`v22.test.js`): 2.1 saves renumber Final Factory 33–36 → 133–136 and bonus 101–104
  → 1001–1004 in every field; a finished 2.1 player continues at Level 33; v5 saves are not renumbered again;
  1.x saves still migrate (now to 135/136).
- **Browser:** the campaign test now plays all 136 levels through the real UI from a fresh save to the Hero
  ending; the iPad suite checks all 140 levels at 10 iPad sizes; the responsive suite checks all 136 levels
  at 5 viewports for text spilling out of cards.

## Defects found while integrating (all fixed)

| # | Defect | Fix |
|---|---|---|
| 1 | L76 could not be finished in the UI (eating = tapping the draggable chips) | Separate EAT button; chips stop being draggable once hidden |
| 2 | L65 and L120 kept timer handles in level state, so Restart did not give an identical state | Timers no longer stored in state (L120 uses a generation counter) |
| 3 | Text spilled out of cards (or fell under the 10 px minimum) in 38 new levels at 320 px, 10 at 768 px and 1 (L116) at desktop sizes | Stage now shrinks card text to fit (floor 10 px, 9 px fine print); 21 cards enlarged or reworded at 320 px |
| 4 | Lab screenshot page loaded art packs before `art.js` (page error) | Lab load order fixed |

## Art director review (2.2)

`docs/ART-REVIEW-2.2.md`: 10 MUST (all applied — e.g. the L97 answer paperclip had no outline, the L112
wires relied on colour alone, L111's AIM label was ~2:1 contrast, L125 sign text was 7.6 px), 13 SHOULD
and 8 POLISH, scheduled for the 2.3 art release.

## Not verified

- A physical iPad / iPhone; Firefox; audio by ear (tests check which sounds are requested).
- The 100 new levels were play-tested by scripts and screenshots, not by people. Difficulty and how funny
  they are have not been tested with players.

---

# Test report — OBEY? LOL. 2.1.0 (previous release)

Date: 2026-10-24. Numbers below come from logged runs (`tests/logs/`) and the GitHub Actions run
for the release commit. Re-run locally with `bash tools/run-all-tests.sh`; CI runs on every push
(`.github/workflows/tests.yml`).

## Summary

| Suite | Where | Run | Passed | Failed |
|---|---|---|---|---|
| Static checks (`tools/check.js`) | local | 681 checks | 681 | 0 |
| Unit tests (`tests/unit`) | local + CI | 255 | 255 | 0 |
| Browser tests, Chromium (all 9 e2e files) | local | 120 | 120 | 0 |
| Browser tests, Chromium | GitHub Actions | full suite | job passed | 0 |
| Browser tests, **WebKit (Safari's engine)**: iPad, campaign, 2.0 and 2.1 suites | GitHub Actions | 4 files | job passed | 0 |

Browser test files (120 tests): campaign 6, features 21, regression (QA1) 9, responsive 6, v2 11,
regression2 (QA2) 10, **v21 22**, **ipad 20**, **regression3 (QA3) 15**. Every browser test also fails on
page errors, console errors, failed requests or any external network request.

## What 2.1 adds to the coverage

- **v21 (22):** ruins via the UI and the Sabotage file; Skip; jigsaw (replays only); Sabotage Studio bonus
  levels (proper and ruined); Daily Dare and streak; U.N.D.O. chat and tips; narrator asides (replay,
  "let me finish", idle, nudge); fake game over; chapter card and chapter review; completion extras (trick,
  personal best, share text, "Replay on Hard"); save codes; 3 profiles; high contrast, extra-large text,
  plain font, left-handed layout; hold assist (pointer and keyboard); captions and vibration; music;
  keyboard shortcuts and map arrows; "Point me" and Easy sparkle; what's-new panel, next goal, stats,
  joke achievements; endings review and share; the installable app (manifest, service worker, offline
  reload — Chromium only).
- **ipad (20):** 10 iPad sizes in portrait and landscape (9.7", 10.9", 11", 12.9", mini) — every one of the
  40 levels must show its whole stage without scrolling; 6 Split View / Slide Over widths; touch play
  (tap, tap-to-place, a real finger hold via touch events in Chromium); rotating mid-level; hardware
  keyboard; Safari touch hygiene (touch-action, user-select, the long-press callout rule, home-screen meta).
- **Unit (+36 over 2.0):** bonus levels on every difficulty, all 16 ruins (generic triggers checked against
  the real level code: they fire exactly at their count), skips, save v4 validation/migration, profiles,
  Daily Dare, streak/grace/badges, save codes, jigsaw, personal bests, next goal, composure, reviews,
  U.N.D.O. script, trick recaps for all 40 levels, new achievements, share texts, the pausable clock.

## Independent QA (third review)

A separate reviewer audited 2.1 in Chromium and reported **19 defects (1 × P1, 6 × P2, 12 × P3)**, each
reproduced with a script. All are fixed; `regression3.e2e.test.js` and the "QA3" unit tests cover them,
and the reviewer's own reproduction scripts were re-run against the fixed build.

| ID | Sev | Defect | Fix |
|---|---|---|---|
| D1 | P1 | With storage blocked, switching profiles erased progress | In-memory fallback shared per storage, so every profile survives |
| D2 | P2 | Skip on a timed level reported "skipped" although the level finished behind the dialog | Levels now **pause while any dialog is open** (pausable clock); Skip re-checks the level |
| D3 | P2 | Easy "warmer" sparkle fired on wrong moves | Sparkle only on the next step of the intended solution |
| D4 | P2 | Hold assist made the L9 "shaken" secret impossible from the keyboard | Assist leaves drag-and-hold objects to the normal hold; correct description |
| D5 | P2 | Stage below the fold in Split View / short windows (694×768, 584×820, 1180×500, 844×390) | New layouts for narrow-tall, square-ish and short windows; tested at 5 sizes |
| D6 | P2 | Settings sliders collapsed to a few px at 320 px / extra-large text | Label above a full-width track |
| D7 | P2 | Daily Dare differed between players and changed during the day | One shared level per day; a fixed practice dare if it's still locked |
| D8 | P3 | Bonus 2 could be ruined during "Show me how" | No ruins in guided runs (engine) |
| D9 | P3 | "Back to Level 104" after a bonus level | "Back to Bonus 4" |
| D10 | P3 | "You did this PROPERLY before" after only ruining | Tracks proper finishes |
| D11 | P3 | Ruins set personal bests; New Game wiped bests | Ruins/guided runs never set bests; bests survive New Game |
| D12 | P3 | Music didn't change chapter on "Next level" | Restarts with the new chapter's tune |
| D13 | P3 | U.N.D.O. tip after the level finished | Tips only while playing |
| D14 | P3 | "Point me" highlighted a finished step; nothing on Hard | Highlights the next unfinished step; works on the last hint of any difficulty |
| D15 | P3 | A dialog opened from a dialog un-inerted the page; Escape closed both | Counted inert state; only the top dialog reacts to keys |
| D16 | P3 | No warning when a profile's save was corrupt | Warning toast; damaged copy kept |
| D17 | P3 | Menu scrolled sideways at 320 px with extra-large text | Menu badges wrap |
| D18 | P3 | Contrast: U.N.D.O. header in high contrast, quip label, composure label, review stars, "RUINED" stamp | Recoloured to ≥ 4.5:1 |
| D19 | P3 | Speedrun total time missing | Sum of best times on the stats page and map (timer on) |

Also from the reviewer's unverified observations: speech is now primed on the first gesture (iOS),
audio keeps priming until the context really runs, a switched profile no longer inherits the previous
player's Daily Dare or "last level", bonus replays get replay lines, and hand-edited saves are capped at
3 skips.

## Art director review (baseline)

The new art director agent wrote `docs/ART-BIBLE.md` and reviewed 2.1 (`docs/ART-REVIEW-2.1.md`:
5 must-fix, 12 should-fix, 11 polish). The 5 must-fix items shipped in 2.1: static information cards no
longer cast button shadows; `--accent` and `--good` tokens recoloured to ≥ 4.5:1 in every theme; Level 3's
"PRESS ME" label readable (ink on green); the chapter card stays visible with reduced motion. The rest
is scheduled for the art release (2.3).

## CI

GitHub Actions runs Chromium (static, unit, all browser tests) and WebKit (ipad, campaign, v2, v21) on
every push. Run 40101606654 (commit 654f7f6, same code as the release): **chromium passed, webkit passed**.

One earlier run on the identical game code (40101406230, commit 5e0a099) failed one Chromium browser
test while WebKit passed; the next run passed both jobs. That job's log could not be retrieved (GitHub
returned a server error), so the failing test is unknown. It is recorded here as an unexplained,
non-reproducing CI failure, not as a pass. CI shows job results only; per-test counts above are local.

## Not verified

- **A physical iPad / iPhone.** Layouts, touch and keyboard were verified with emulation (Chromium
  locally, WebKit in CI). Not verified on a device: the long-press callout (iOS-only CSS), real Safari
  audio/speech start, Add to Home Screen, VoiceOver.
- **Firefox.**
- Audio was never listened to; tests check which sounds and voice lines are requested.
- The offline/service-worker test runs only in Chromium.
- Timed puzzles use Playwright's fake clock.
