# Test report — OBEY? LOL. 1.0.0 (final, after independent QA)

Date: 2026-10-24. All numbers below come from the logged runs in `tests/logs/`
(`static.log`, `unit.tap`, `e2e.tap`) and `tests/e2e/results/*.json`. Re-run with
`bash tools/run-all-tests.sh`.

## Environment

| Item | Value |
|---|---|
| OS | Linux x86_64 (cloud container) |
| Node.js | v22.23.4 (built-in `node:test` runner) |
| Browser automation | Playwright 1.63.0 |
| Browser | Chromium build 1243, headless |
| Not available | Firefox, WebKit/Safari, real phones (see "Not verified") |

## Summary

| Suite | Run | Passed | Failed | Skipped |
|---|---|---|---|---|
| Static checks (`tools/check.js`) | 284 checks | 284 | 0 | 0 |
| Unit tests (`tests/unit`, Node) | 121 | 121 | 0 | 0 |
| Browser tests (`tests/e2e`, Chromium) | 42 | 42 | 0 | 0 |

Static checks cover: syntax of all 38 JS files, HTML structure and every referenced file,
CSS `url()` targets, no external URLs or network APIs in shipped code, no TODO/placeholder
text, every `data-act` button has a handler, every level art key exists, required docs present.

Unit tests cover: all 16 level definitions (unique stable IDs, full spec fields, unique object
ids with labels, objects inside the stage), every level's intended solution, restart (clean
state and cancelled timers), hints (graduated, never change state), destroy stops timers,
all 15 secret triggers (each fires exactly once, never duplicated), 3-star perfect play on
every level, star rule boundaries, per-level wrong actions, choices, all three L16 outcomes,
rapid input, progression and locking, best-star preservation, all costume/theme unlock rules,
all 11 achievements (positive and negative cases), endings (including Secret Master refusal
with 14 secrets or without Level 16), save round-trip, malformed/wrong-typed/non-object saves,
v1 migration, throwing storage, quota failures, New Game and Reset semantics.

## Browser tests actually executed (Chromium)

Campaign (`campaign.e2e.test.js`, 6): first launch → tutorial → all 16 levels played through
the real UI with the mouse → Hero ending; map locking and immediate unlocks (including a
deep link to a locked level); replay keeping best stars; every choice-recording alternative
path; Chaos ending by dragging the fuse plus gallery replay; Secret Master ending (refused
with 14 secrets, works with 15).

Features (`features.e2e.test.js`, 21): all 15 secrets via the UI with duplicate check and
reload persistence; field-notes clues; all 8 costumes (locked state, selection, distinct
art, in-level narrator, persistence, Costume Party); all 4 themes (unlock rules, computed
colours differ, stage recoloured, persistence); achievements screen; every main-menu
button; Continue; browser Back; New Game cancel/confirm; Reset cancel/confirm; hints and
restart; timers stop on leaving; 20 rapid clicks → one completion; keyboard-only play
(tap, pick-and-place, hold) and visible focus; touch play (tap, tap-to-place, touch hold) on
a 390×844 mobile context; reload persistence; corrupt save; v1 migration; throwing storage;
tutorial skip/replay; sound toggle, system and manual reduced motion, large text;
accessible names on all 16 levels; running from `file://` with saving and bundled fonts.

Regression (`regression.e2e.test.js`, 9): one test per QA defect (below). All 9 were run
against the Phase A archive first and **failed there (0/9)**, then passed on the fixed build.

Responsive (`responsive.e2e.test.js`, 6): at 320×700, 390×844, 768×1024, 1365×900 and
1920×1080 — all 8 menu screens, all 16 levels (including keypad/pen/honest-note states), the
completion card and an ending: no horizontal overflow, controls inside the viewport, tap
sizes, text ≥ 10 px (Level 14's deliberately tiny fine print ≥ 9 px), no text overflowing its
card, square stage; plus live window resizing.

Every browser test also asserts **no page errors, no console errors, no failed requests and no
external requests**.

### Campaign result per level (intended solution, mouse)

| Level | ID | Actions | Par | Stars |
|---|---|---|---|---|
| 1 | red-button | 2 | 2 | 3 |
| 2 | wrong-door | 3 | 3 | 3 |
| 3 | hands-off | 0 | 0 | 3 |
| 4 | missing-button | 3 | 3 | 3 |
| 5 | reverse-psychology | 1 | 1 | 3 |
| 6 | waiting-room | 1 | 1 | 3 |
| 7 | fake-tutorial | 2 | 2 | 3 |
| 8 | object-permanence | 2 | 2 | 3 |
| 9 | suspicious-gift | 2 | 2 | 3 |
| 10 | rulebook | 3 | 3 | 3 |
| 11 | silent-level | 5 | 5 | 3 |
| 12 | double-bluff | 1 | 1 | 3 |
| 13 | broken-room | 3 | 3 | 3 |
| 14 | final-warning | 3 | 3 | 3 |
| 15 | last-instruction | 4 | 4 | 3 |
| 16 | final-decision | 1 | 2 | 3 |

Endings executed: Hero ✔, Chaos ✔, Secret Master ✔ (and refused without all secrets ✔).

### Secret matrix (all verified through the UI, counted once, no duplicate on replay, persisted after reload)

| # | Secret ID | Level | Trigger | Result |
|---|---|---|---|---|
| 1 | plant-whisperer | 1 | Tap the potted plant | Pass |
| 2 | deja-vu | 1 (replay) | Replay Level 1, tap the folded note | Pass |
| 3 | empty-corner | 2 | Inspect the empty top-right corner | Pass |
| 4 | personal-space | 3 | Poke Bossworth during the countdown | Pass |
| 5 | glow-code | 4 | Lamp off, tap the glowing numbers | Pass |
| 6 | countdown | 5 | Tap statements 3, 2, 1 | Pass |
| 7 | extremely-patient | 6 | Wait 30 s after #17 is called | Pass |
| 8 | tutorial-dropout | 7 | Finish without pressing NEXT | Pass |
| 9 | tidy-up | 8 | Drag the crate into the bin | Pass |
| 10 | shaken | 9 | Hold the gift for 2 s | Pass |
| 11 | snack-rule | 10 | Write the sandwich rule, eat it | Pass |
| 12 | silent-partner | 11 | Tap the mouse hole | Pass |
| 13 | polly | 12 | Drag the cracker onto the parrot | Pass |
| 14 | long-memory | 13 | Open the panel, enter 4-2-7 (from Level 4) | Pass |
| 15 | fine-print | 14 | Tap the fine print | Pass |

## Phase B — independent QA review

A separate reviewer with no access to the build history audited the source and played the game
in Chromium (73 tool runs). It found no P0/P1 defects, 6 × P2 and 3 × P3, plus one latent issue.
All were fixed, each with a regression test:

| ID | Sev | Defect | Fix |
|---|---|---|---|
| D1 | P2 | Keyboard focus jumped to another object after every action and every timer tick (stage re-appended all nodes each render). | Nodes are only moved when out of order; focus is restored to the used object or the next usable one. |
| D2 | P2 | Releasing a keyboard hold early didn't cancel it (wrench/charge completed anyway); key state could get stuck. | Key release handled at window level regardless of focus; gesture state reset on restart/blur. |
| D3 | P2 | Pointer hold released outside the stage didn't end the hold (capture dropped by re-render). | No re-append (capture kept) plus window-level pointerup/cancel backstop. |
| D4 | P2 | Completion card not modal: Tab reached the level behind it; Restart could run underneath. | Level header/body made `inert` while the card is open. |
| D5 | P2 | "Skip to the end" invisible on Chaos/Secret endings; sunset legends half on dark background. | Light ghost-button style on dark endings; legends get their own paper background. |
| D6 | P2 | Stage text overflowed cards at 320/390 px (rulebook rules hidden, displays, sign). | Stage text now scales from the stage width with consistent multipliers; overflow check added to responsive tests. |
| D7 | P3 | Replay button didn't count as a replay for the Déjà Vu note. | Replay re-enters the level. |
| D8 | P3 | Browser Back left a confirm dialog (and the app inert) over another screen. | Dialogs and tutorial close on navigation. |
| D9 | P3 | Pressing the gift briefly, then dragging, did nothing. | Movement after a hold starts ends the hold and begins the drag. |
| Latent | — | Re-entering the same level could leave the old attempt's timers running. | Showing the level screen always tears down the previous runtime. |

## Manual / visual checks completed

Screenshots in `docs/screenshots/` (main menu, adventure map, gameplay, level complete, field
notes, costumes, themes, settings, achievements, all three endings) and
`docs/screenshots/responsive/` were inspected after the fixes. Contact sheets of all 16 levels
mid-play were reviewed at 1100 px and the text-heavy levels at 320 px.

## Not verified / limitations

- **Firefox and Safari/WebKit were not tested** (not installed in the build environment).
  The code uses standard APIs; container query units (`cqi`) need Firefox 110+ / Safari 16+.
- **Real devices** were not tested: touch was verified with Chromium mobile emulation
  (Playwright touch + CDP touch events), not on physical iOS/Android hardware.
- **Audio output** was not audibly verified; tests confirm the sound setting toggles the
  audio engine and nothing requires sound.
- **Screen readers** were not run; accessible names, roles, live regions and focus handling
  were checked programmatically only.
- Timed puzzles were tested with Playwright's fake clock; the Level 6 30-second secret was
  additionally confirmed in real time by the QA reviewer.

## Known remaining defects

None reproducible. Accepted design choices noted by QA (not defects): the Level 7 shortest
solution also earns its secret; Restart starts a fresh attempt, so hints taken before a
restart do not count against the new attempt.
