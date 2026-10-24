# Test report — OBEY? LOL. 2.1.0

Date: 2026-10-24. Numbers below come from logged runs (`tests/logs/`) and the GitHub Actions run
for the release commit. Re-run locally with `bash tools/run-all-tests.sh`; CI runs on every push
(`.github/workflows/tests.yml`).

## Summary

| Suite | Where | Run | Passed | Failed |
|---|---|---|---|---|
| Static checks (`tools/check.js`) | local | 681 checks | 681 | 0 |
| Unit tests (`tests/unit`) | local + CI | 255 | 255 | 0 |
| Browser tests, Chromium (all 9 e2e files) | local | 120 | 120 | 0 |
| Browser tests, Chromium | GitHub Actions | see "CI" below | | |
| Browser tests, **WebKit (Safari's engine)**: iPad, campaign, 2.0 and 2.1 suites | GitHub Actions | see "CI" below | | |

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
every push. Results for the release commit are recorded in `RELEASE-NOTES.md` once the run finishes.

## Not verified

- **A physical iPad / iPhone.** Layouts, touch and keyboard were verified with emulation (Chromium
  locally, WebKit in CI). Not verified on a device: the long-press callout (iOS-only CSS), real Safari
  audio/speech start, Add to Home Screen, VoiceOver.
- **Firefox.**
- Audio was never listened to; tests check which sounds and voice lines are requested.
- The offline/service-worker test runs only in Chromium.
- Timed puzzles use Playwright's fake clock.
