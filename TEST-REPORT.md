# Test report — OBEY? LOL. 2.0.0 (final, after a second independent QA pass)

Date: 2026-10-24. Every number comes from the logged runs in `tests/logs/` (`static.log`,
`unit.tap`, `e2e.tap`) and `tests/e2e/results/*.json`. Re-run with `bash tools/run-all-tests.sh`.

## Environment

| Item | Value |
|---|---|
| OS | Linux x86_64 (cloud container) |
| Node.js | v22.23.4 (built-in `node:test`) |
| Browser automation | Playwright 1.63.0, Chromium build 1243 (headless) |
| Not available | Firefox, WebKit/Safari, physical phones, screen readers, speakers |

## Summary

| Suite | Run | Passed | Failed | Skipped |
|---|---|---|---|---|
| Static checks (`tools/check.js`) | 470 checks | 470 | 0 | 0 |
| Unit tests (`tests/unit`) | 219 | 219 | 0 | 0 |
| Browser tests (`tests/e2e`, Chromium) | 63 | 63 | 0 | 0 |

Every browser test also asserts no page errors, no console errors, no failed requests and no
external network requests.

## What the browser tests executed (63)

- **Campaign (6):** first launch → difficulty picker → tutorial → all **36 levels** played through
  the real UI with the mouse (3 stars on every level) → Hero ending; map locking and unlocks;
  replay keeps best stars; every choice path; Chaos ending by drag; Secret Master ending refused
  with 14 secrets and granted with 15.
- **Features (21):** all 15 secrets via the UI (once each, persisted); field-notes clues; 8 costumes;
  4 themes; achievements screen; every main-menu control incl. Trophy room; New Game (cancel,
  confirm, difficulty chosen); Reset; hints and restart; timers stop on leaving; rapid input;
  keyboard-only play (tap, pick-and-place, hold); touch play on a phone viewport; reload
  persistence; corrupt save; v1 migration; blocked storage; tutorial; sound, motion, text size;
  accessible names on all 36 levels; running from `file://`.
- **2.0 features (11):** difficulty picker, badge, settings change and map medal; Hard's single
  hint and stricter stars; trap gag + laughing narrator + gag sound + "how to do it right" card;
  "nope" sticker without a reset; "Show me how" unlock rules on Easy/Medium/Hard, step-by-step
  highlighting, waits, restart after a trap, 1-star guided result; Bossworth's voice (costume and
  mood passed to the voice, talking mouth starts and stops); real speech via a stubbed
  `speechSynthesis` (stage directions not read) and Silent mode; chapter cup won and upgraded
  through play; Easy helper hint after 25 idle seconds; sound events requested.
- **Regression 1.0 (9)** and **regression 2.0 (10):** one test per QA defect (below).
- **Responsive (6):** 320×700, 390×844, 768×1024, 1365×900, 1920×1080 — all 9 menu screens,
  all 36 levels (incl. keypad, pen, honest note and mid-level states), the trap card, the
  walkthrough panel, the difficulty picker, the completion card and an ending: no horizontal
  overflow, controls inside the viewport, tap sizes, readable text, no text overflowing its card,
  square stage; plus live resizing.

Unit tests (219) cover all 36 level definitions and solutions on **Easy, Medium and Hard (3 stars
each)**, every alternative path, every secret, hints and Hard's hint limit, trap penalty, guided
scoring, nope counting, Hard-mode room tweaks, documented wrong moves for all 20 new levels,
progression and unlock rules, all costume/theme/achievement/trophy rules, endings, save
validation, v1 → v3 and v2 → v3 migration, blocked and failing storage, New Game and Reset.

### Secrets (all 15 verified through the UI)

plant-whisperer, deja-vu, empty-corner, personal-space, glow-code, countdown, extremely-patient,
tutorial-dropout, tidy-up, shaken, snack-rule, silent-partner, polly, long-memory, fine-print —
each found once, never duplicated on replay, persisted after reload (`tests/e2e/results/secrets.json`).

## Independent QA

Two separate reviewers, each without the build history, audited the game in Chromium.

**Review of 1.0** — 9 defects (6 × P2, 3 × P3) plus one latent issue: focus jumping after actions,
holds not releasing, non-modal completion card, unreadable buttons on dark endings, small-screen
text overflow, Replay not counting as a replay, Back leaving dialogs open, hold-then-drag, double
runtimes. All fixed; the 9 regression tests were run against the unfixed build first and failed
there (0/9), then passed.

**Review of 2.0** — 12 findings (4 × P1, 5 × P2, 3 × P3). All addressed:

| ID | Sev | Defect | Fix |
|---|---|---|---|
| D1 | P1 | "Show me how" got out of step after an unscripted move and could lead into a trap or strand the player | Any move outside the walkthrough that changes the room restarts the guided attempt with a note |
| D2 | P1 | A too-short hold advanced the walkthrough (wet paint still wet → trap) | Holds are measured on the level's own clock and must last the full step |
| D3 | P1 | Migrated save with old L15 (now 35) done: "all levels complete" while 36 locked | Unlocks follow the unbroken run of finished levels (same rule as save validation) |
| D4 | P1 | Replaying a migrated finale unlocked all 20 new levels | Same unlock rule: replays never skip ahead |
| D5 | P2 | Level 3 walkthrough ignored Hard's 15 s countdown | Levels can supply a difficulty-aware walkthrough path |
| D6 | P2 | Stopping the walkthrough left the run capped at 1★ and the guide locked | Stop starts a fresh, normally scored attempt; the guide stays available for that level |
| D7 | P2 | Difficulty picker lost keyboard focus; current choice only shown by colour | Focus restored; `aria-pressed` and "(current)" text |
| D8 | P2 | Trap card could appear below the fold and wasn't announced | `role="alert"`, scrolled into view |
| D9 | P2 | Walkthrough panel re-rendered (and re-announced) on every timer tick | Re-renders only when the step or note changes |
| D10 | P3 | "Nope" sticker wiped when the object's picture changed | Effects applied after rendering |
| D11 | P3 | L23 tag overflow at 320 px; stale README/spec star rules; Escape in New Game picker did nothing | Fixed; Escape keeps the current difficulty and continues |
| D12 | P3 | Migrated "Full Campaign" shows unlocked at 16/36 | Design choice (achievements are kept); unlocked achievements now show a full bar |

Each 2.0 fix has a regression test (`tests/e2e/regression2.e2e.test.js`, plus unit tests for
D3/D4/D5). Unlike the 1.0 round, these were written from the reviewer's reproduction steps and
run only against the fixed build (the pre-fix build was not preserved separately).

## Visual checks

Screenshots in `docs/screenshots/` (menu, map, gameplay, level complete, field notes, costumes,
themes, settings, achievements, trophy room, difficulty picker, wrong-answer gag, "Show me how",
all three endings) and `docs/screenshots/responsive/` were inspected; contact sheets of all 36
levels mid-play were reviewed at 1100 px and text-heavy levels at 320 px.

## Not verified / limitations

- **Firefox and Safari/WebKit** — not installed here. Uses standard APIs; container query units
  need Firefox 110+ / Safari 16+.
- **Physical phones** — touch verified only with Chromium mobile emulation.
- **Audio output** — sound and voice were not listened to; tests verify which sounds and voice
  lines are requested and that "Real speech" calls the speech API. Real speech quality depends on
  the voices installed on the device.
- **Screen readers** — accessible names, roles, live regions and focus were checked
  programmatically only.
- Timed puzzles were tested with Playwright's fake clock.

## Known remaining defects

None reproducible. Accepted design choices: the mouth animates even with the voice off (visual
only); migrated 1.x levels count as Medium (Silver cups); achievements earned in 1.x stay earned.
