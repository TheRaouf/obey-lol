# OBEY? LOL.

A funny, deceptive, offline puzzle adventure for the browser. Bossworth, your narrator, gives
instructions. Some are lies, some are half-truths, and some are — annoyingly — completely true.
Each of the 36 levels asks the same question in a new way: **obey, disobey, or find a third option?**

- 36 hand-made levels in 9 chapters, mixing tapping, dragging, holding, waiting, sequencing, logic, memory and choices
- Three difficulties: Easy, Medium and Hard
- Bossworth talks (expressive "babble" voice, or your device's real speech) and his mouth moves
- Slapstick gags when you fall for a trap, plus a "how to do it right" tip and a guided "Show me how" walkthrough
- 15 secrets, 8 narrator costumes, 4 themes, 11 achievements and a trophy room (9 chapter cups + 5 special trophies)
- 3 endings (Hero, Chaos and a Secret Master ending for completionists)
- Fully offline: no accounts, no network requests, no tracking. Progress saves in your browser.
- Keyboard, mouse and touch; reduced-motion and large-text options; sound is optional

## Launch

**Easiest:** open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari). Everything —
including saving — works from `file://`.

**Local server (optional):** if your browser restricts `file://` pages (for example some
locked-down corporate browsers or Safari with "Disable Local File Restrictions" off), run:

```bash
node tools/serve.js 8080      # then open http://127.0.0.1:8080/
# or: python3 -m http.server 8080
```

Node.js 18+ is only needed for the server and the tests, not to play.

## How to play

1. Read what Bossworth says in his speech bubble. Decide whether to believe him.
2. Interact with the room. Every level has a goal shown above the play area.
3. Stuck? **Hint** gives escalating clues. **Show me how** walks you through the solution step by
   step (a guided run earns 1 star). **Restart** starts a clean attempt.
4. Fall for a trap and Bossworth gets a pie, a rubber chicken or a sad trombone — and you get a
   "how to do it right" card.
5. Finish a level to earn 1–3 stars. Replays can only improve your best rating.
6. Find secrets hidden around the levels, then check **Secret field notes** for clues to the rest.
7. Collect chapter cups in the **Trophy room**: Bronze on Easy, Silver on Medium, Gold on Hard.

### Difficulty

| | Easy | Medium | Hard |
|---|---|---|---|
| Hints | 3, free | 3, cost stars | 1, caps at 1★ |
| "Show me how" | always | after 1 trap or 2 hints | after 3 traps |
| Traps | reset the room | reset the room | reset the room and cost 2 extra actions |
| Other | Bossworth's helper offers a hint after 25 s idle | — | Level 3 counts down 15 s, Level 6 resets the whole queue, Level 27 floods faster |

Pick a difficulty when you start a game; change it any time in Settings (or "Change" on the menu
and map). Each level remembers the hardest difficulty you beat it on; the map shows it as E/M/H.

### Controls

| Action | Mouse / touch | Keyboard |
|---|---|---|
| Use something | Click / tap | Tab to it, Enter or Space |
| Move something | Drag it onto a target, **or** tap it, then tap where it goes | Enter to pick up, Tab to the target, Enter to place (Esc cancels) |
| Press and hold | Hold the pointer / finger down | Hold Space or Enter |
| Poke the narrator | Click / tap Bossworth | Tab to Bossworth, Enter |

Nothing needs fast reflexes or precise gestures; waiting puzzles have no deadline after you
are allowed to act. Information is never conveyed by sound or colour alone.

### Stars

Every level has a **par** (the minimum number of meaningful actions).

- **Easy:** ★★★ at most par + 2 actions; ★★ at most par + 8; hints are free.
- **Medium:** ★★★ at most par actions and no hints; ★★ at most par + 4 actions and at most one hint.
- **Hard:** ★★★ at most par actions, no hint and no trap; ★★ at most par + 2 actions and no hint.
- Any finish earns ★; a "Show me how" run always earns ★.

Decorative objects, secrets, poking the narrator and waiting are free. The completion card
explains exactly how the rating was earned.

### Sound and voice

All sound is synthesised live with the Web Audio API — there are no audio files. Bossworth's
voice can be **Babble** (gibberish that follows his costume and mood), **Real speech** (your
browser's text-to-speech, when available) or **Silent**. Every line is always shown as text and no
puzzle needs sound.

## Saves

Progress is saved automatically to `localStorage` under the key `obeylol.save` (versioned
schema v3, see `js/core/save.js`). It stores levels, stars, the best difficulty per level,
secrets, costumes, themes, achievements, trophies, ending history, tutorial status, campaign
choices, difficulty and settings.

- Corrupt or hand-edited saves are repaired field by field; unreadable saves are replaced with a
  fresh one and the original text is kept under `obeylol.save.corrupt`.
- Older saves are migrated automatically. 1.x saves (16 levels) keep all progress: their finale
  (old Levels 15–16) becomes the new Levels 35–36 and you continue at Level 15, the first new level.
- If the browser blocks storage (private modes, strict settings), the game keeps progress in memory
  for the current tab and tells you so.
- `file://` and `http://127.0.0.1` are different origins, so they keep **separate** saves.

### Resetting progress

- **New game** (main menu): restarts the campaign — levels, stars, secrets and choices — after a
  confirmation, then asks for a difficulty. Achievements, trophies, costumes, themes, endings and
  settings are kept.
- **Settings → Reset all progress**: erases everything except settings, after a confirmation.

## Development

```bash
npm install              # installs Playwright (dev only) — or reuse a global install
npx playwright install chromium
npm run check            # static checks (syntax, references, offline-only, dead actions, docs)
npm test                 # unit tests (Node's built-in test runner, no browser)
npm run test:e2e         # browser tests with Playwright/Chromium (campaign, features, responsive)
npm run test:all
node tools/gen-docs.js   # regenerates docs/LEVEL-SPEC.md and docs/GAME-DATA.md from the code
```

Browser tests open the game with `?test=1`, which exposes a small read-only inspection hook
(`window.OBEY_TEST`) plus a `seed()` helper for setting up a save. Without `?test=1` nothing is
exposed. The tests drive the real UI (clicks, drags, holds, keyboard, touch) and use Playwright's
fake clock for waiting puzzles.

### Project structure

```
index.html              entry point (classic scripts, works from file://)
css/style.css           visual identity, 4 themes, responsive layout, reduced motion
js/core/ns.js           namespace, helpers, level registry
js/core/data.js         secrets, costumes, themes, achievements, endings, narrator lines
js/core/save.js         versioned save schema, validation, migration, storage adapter
js/core/progress.js     progression rules (unlocks, stars, secrets, achievements, endings)
js/core/engine.js       level runtime: actions, timers, narrator, hints, scoring, fake clock
js/levels/NN-*.js       one file per level (data + init/view/on), 36 files
js/ui/art.js            code-drawn narrator (8 costumes × 7 moods), objects, icons
js/ui/audio.js          Web Audio sound effects and Bossworth's voice (no files)
js/ui/stage.js          stage renderer + unified tap/drag/hold input (mouse, touch, keyboard)
js/ui/screens.js        menu, map, field notes, costumes, themes, achievements, trophy room, settings, credits
js/ui/endings.js        the three ending sequences
js/ui/app.js            routing, level screen, gags, "Show me how", difficulty, voice, persistence, toasts, dialogs, tutorial, test hook
assets/                 icon and bundled OFL fonts
tests/unit/             Node tests for core logic and all 36 levels
tests/e2e/              Playwright tests (+ results/*.json written by the runs)
tools/                  serve.js, check.js, gen-docs.js, package.sh
docs/                   generated level spec & data reference, QA notes, screenshots
```

Architecture notes:

- Core and level code never touch the DOM, so the exact same files run in Node tests.
- Levels are data plus three small functions; the shared runtime owns timers (cancelled on
  restart/leave), duplicate-completion protection, action counting, hints and scoring.
- Rendering reuses DOM nodes by object id (no full re-renders); the input layer turns pointer,
  touch and keyboard input into the same `tap` / `drop` / `holdstart` / `holdend` actions.
- Rewards are idempotent functions of the save (`progress.evaluate`), so nothing can be awarded twice.

### Making a release

1. Update `version` in `package.json` and `OBEY.VERSION` in `js/core/ns.js`.
2. Update `CHANGELOG.md` and `RELEASE-NOTES.md`; run `node tools/gen-docs.js`.
3. Run `npm run test:all` and update `TEST-REPORT.md` with the real results.
4. Run `npm run package` → `dist/OBEY-LOL-v<version>.zip` (the script tests the archive and a clean extraction).

## Known limitations

- Tested in Chromium (Playwright). Firefox and Safari were not available in the build environment;
  the code avoids engine-specific APIs, but those browsers are unverified. See `TEST-REPORT.md`.
- No background music (sound effects and voice only). "Real speech" depends on the voices your
  browser/OS provides; babble works everywhere.
- An in-progress level is not saved mid-attempt; levels are short and restart cleanly.

## License

Code, art and writing: MIT (see `LICENSE`). Fonts: SIL OFL 1.1 (see `ASSETS.md`).
