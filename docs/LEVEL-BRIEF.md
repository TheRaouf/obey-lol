# Brief: writing new levels for OBEY? LOL. 2.2

You are adding **20 original levels** (5 chapters of 4) to a comedy puzzle game. Read this whole brief,
then `docs/LEVEL-SPEC.md` (every existing level — do not repeat their tricks), then several existing
level files (`js/levels/02-wrong-door.js`, `12-double-bluff.js`, `22-wet-paint.js`, `28-swamp-stones.js`,
`30-the-password.js`, `b3-tower-toppler.js`) and `js/core/engine.js` (the runtime API).

## The game in one paragraph
Bossworth, a pompous cartoon narrator, gives the player an instruction in every level. Sometimes it is
a lie, sometimes a half-truth, sometimes annoyingly true. The player must **obey, disobey, or find a
third option**. Levels are single-screen rooms on a square stage, solved in under a minute. The humour
is dry, cheeky and family-friendly; Bossworth is vain, dramatic and loses arguments to objects.

## What every level must have (the lab enforces this)
- File `js/levels/NN-kebab-name.js` (two digits for 33–99, three for 100+), registering with
  `OBEY.registerLevel({...})` and the exact `num` you were assigned.
- `id` (kebab-case, unique), `num`, `title` (2–4 words), `objective` (short goal line), `intro`
  (Bossworth's opening, ≤ 220 chars, containing the lie or the twist), `introMood`, `actions`,
  `par` (minimum counted actions of the intended solution), `hints` (exactly 3, graduated: nudge →
  clearer → near-answer), `wrong` (sentences describing wrong moves), `secrets: []`, `endingNote: 'None.'`,
  `done` (Bossworth's line after solving), `trick` (one sentence explaining why the trick worked — shown
  after solving), `init`, `view`, `on`, `solution`, `checks`, optional `alternatives`, optional `onStart`,
  optional `ruinPaths`.
- `checks`: an array of `{ name, steps, expect }` with `expect` one of `'fail'` (a trap: `api.fail(text)`
  resets the room with a gag), `'nope'` (harmless wrong move: `api.nope(id)` + `api.say(...)`),
  `'complete'` or `'playing'`. Declare **at least two** wrong moves; at least one must be a trap or nope.
- **Fairness:** the narrator may lie, the room may not. The correct move must be discoverable from
  what is on screen (a label, a sign, a reflection, a pattern, an object's state). No pixel hunting,
  no reflex timing, no "guess what I'm thinking". Waiting puzzles may not punish the player for waiting
  longer than needed.
- Distinct puzzles: across your 20 levels use a mix of tap, drag (`drag: true` objects dropped on
  `zone: true` objects), press-and-hold (`hold: true`, act on `holdend` with `a.ms`), waiting
  (`api.after`/`api.every` timers), sequences, small logic, memory, counting, reading carefully,
  and choices. No two of your levels may share the same core trick, and none may copy an existing level's.
- About one level per chapter should have a **ruin**: a deliberately terrible alternative finish that
  Bossworth hates, triggered inside your level with
  `api.complete({ ruin: 'ruin-id', line: '…meltdown line…', mood: 'panicked' })`, listed in `ruinPaths`.
  Ruin ids must be unique and kebab-case. The normal `solution` must not be a ruin.
- Stage objects: `O(id, x, y, w, h, { ... })` with percentages of a square stage (0–100). Keep
  interactive objects at least ~9% on their short side (they must be tappable on a phone), inside the
  stage, and not overlapping each other. Every interactive object needs `label` (or `text`) — it is
  read by screen readers. Static scenery uses `kind: 'static'` (give it a `label` if it carries
  information, otherwise none).
- Counted actions are taps, completed drops and holds on non-`free` objects. Mark decoration you allow
  players to poke as `free: true`.

## Art you can use
Existing object art keys (`art: 'key'`): bigbutton smallbutton plant note cobweb door mat key darkness
rug lamp painting switch bell medal chairs magazine crate bin shelf table gift bow tag mailbox pen sandwich
footprint mousehole lever parrot cracker tile gap hero warnsign light gate battery socket gear machine
wrench fuse quill speaker drawer basket catbed sock cat drum horn shybutton scale clock fan mug water pipe
drip valve bucket swamp bank stone tv remote card bulb catflap fish mirror twin trophy phone peg tree
treestand jigsaw. Read `js/ui/art.js` for their `artOpts`.

Text-object classes (`cls:`): btn-card (with `accent`, `small`, `big`, `ghost`, `option`, `key`),
sign-card, timer-card (`urgent`), display-card (`ready`), ticket-card, plaque-card, tutorial-card,
book-card, honest-card, panel-card (`ok`), tag-card, speech-card, color-btn (`red`, `yellow`, `blue`),
panel-lights (`ok`, `wrong`), shape-btn (`green`, `purple`, `orange`), hold-btn (`charging`, `done`),
obey-btn, glow-text, fine-print, mirror-text, tv-text, floaty, shimmer, subtle.

New art: put it in **your own** file `js/ui/art-pack-<letter>.js` using
`OBEY.art.addObject('name', function (o) { return OBEY.art.svg('0 0 200 200', '…svg…'); })`.
House style: chunky cartoon shapes, outlines `stroke="var(--ink)" stroke-width="4"` on a 200-unit
viewBox (`OBEY.art.SW` / `OBEY.art.SW3` give you the stroke attributes), flat fills, one highlight, no
gradients, no text inside art unless it is part of the joke. Original designs only — no logos, brands
or recognisable characters. Prefix your art keys with your letter (e.g. `a-printer`) to avoid clashes.
Do **not** edit css/style.css or any shared file.

## Tools
- `node tools/level-lab.js js/levels/NN-*.js … --art js/ui/art-pack-<letter>.js` validates and plays
  your levels (spec, 3★ on Easy/Medium/Hard, alternatives, ruins, checks, bounds, art keys).
- Add `--shots /tmp/claude-0/-home-claude/976b1c69-e378-5c2f-a392-4d4899b7af8e/scratchpad/levels-<letter>`
  to render screenshots, then **look at every screenshot** (Read the PNG) and fix overlaps, clipped
  text or unreadable layouts. Text must fit its card at the rendered size.
- Iterate until the lab reports 0 problems for all 20 levels.

## Deliverables
1. 20 level files with your assigned numbers.
2. `js/ui/art-pack-<letter>.js` if you made new art (only `OBEY.art.addObject` calls).
3. `docs/batches/batch-<letter>.json`:
   `{ "chapters": [{ "name": "Alliterative Name", "levels": [n, n+1, n+2, n+3] }, …5],
      "ruins": [{ "id": "…", "level": n, "name": "Title Case Name", "clue": "U.N.D.O.'s one-line tip" }],
      "art": ["a-printer", …] }`
   Chapter names: two alliterative words like the existing ones (Button Bay, Mind Maze, Trick Tower,
   Glitch Gardens, Paper Plains, Clockwork Canyon, Mirror Marsh, Static Summit, Final Factory). Must be unique.
4. Edit nothing else. Do not touch index.html, css, core files, tests or other batches' files.
