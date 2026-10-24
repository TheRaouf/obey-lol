# Art review 2.4: levels 133–232 and art packs F–J

Reviewer: Art Director (`.claude/agents/art-director.md`), judged against `docs/ART-BIBLE.md` (2.3 rules).
Build: branch `v2.4` (worktree `obey-lol-24`), after commit `cd51d19` (100 levels integrated). Scope: the
100 new campaign levels and their packs, built in parallel by five contributors:

| Pack | File | Chapter theme | Levels |
|---|---|---|---|
| F | `js/ui/art-pack-f.js` | supermarket | 133–152 |
| G | `js/ui/art-pack-g.js` | school | 153–172 |
| H | `js/ui/art-pack-h.js` | castle and fairy tale | 173–192 |
| I | `js/ui/art-pack-i.js` | under the sea | 193–212 |
| J | `js/ui/art-pack-j.js` | sports day | 213–232 |

The MUST items are applied (see "Applied in 2.4"). SHOULD and POLISH items are not applied, except
where the item says so.

## Method

- **Rendered every level at its start.** `node tools/level-lab.js <100 files> --art <packs a–j> --shots`
  at 1180×900 (634 px stage), after the chapter banner fades. All 100 stages were looked at on 2×2
  contact sheets.
- **Rendered every level mid-solution.** A Playwright script played the first half of each level's
  `solution` through `OBEY.app.runtime.dispatch` and shot the stage (79 levels with 2+ steps). All were
  looked at on 3×2 sheets.
- **DOM probes** at 320×700, 390×844 and 1180×900:
  - text spill, measured with a `Range` over the card text, so a word wider than its card counts (the
    lab's `--fit` compares the `.obj-text` block, which never overflows sideways);
  - card font size under 12 px;
  - interactive objects under 44 px or outside the stage;
  - overlapping hit boxes of interactive objects;
  - the drawn box (`getBBox` × CTM) of every art object against the 74 % floor line and against the
    table under it;
  - the rendered size of every SVG `<text>` at the 366 px phone stage.
- **Calibration.** The same probes ran on levels 1–132, so the new levels are judged against the 2.3
  baseline and not against an ideal.
- **Strokes:** `tools/art/strokes.js`, run from a scratch copy that seeds all 236 levels. The repo copy
  seeds only 1–136, so it times out on 137+.
- **Contrast:** `npm run art:contrast` (all rows pass; no CSS changed).
- **Source scans:** palette hexes against the bible list, gradients and filters, `<text>` in art,
  highlight opacity, duplicate art names across packs, display-face word counts.
- Artefacts (scratchpad `art24/`): `base/`, `mid/`, `after/` shots, `sheets/`, `midsheets/`, `aftersheets/`,
  `audit*.txt`, `geo.txt`, `strokes.txt`, scripts `audit.js`, `mid.js`, `geo.js`, `arttext.js`, `sheet.py`.

Clean results:
- No gradients or filters in F–J.
- No page errors.
- No interactive object under 32 px on a phone. With the 44 px `::after` extension, every one passes.
- No overlapping interactive hit boxes, and nothing outside the stage.
- Every trap keeps a visible tell, and no colour code stands alone:
  - L136: box letters.
  - L141: number tags.
  - L149: ink rays plus "lights on!".
  - L161: ▲ ● ■ ◇ on the pots.
  - L195: can vs cone, plus numerals.
  - L210: A/B/C tags plus the labels.
  - L214: drawn puddles plus the text card.
  - L227: raised vs flat cells.
- Flash rates are within 3 Hz: L197 1.1 Hz, L210 0.8 Hz.

## Verdict

**Ships after the MUST fixes, which are applied. The five contributors stayed remarkably on-model.**
- **Colour:** of 142 per-pack distinct hexes across five packs, one is off-bible (`#ffd9b0`).
- **Outline:** the median outline is 4.56 px in every pack, the same as A–E.
- **Highlights:** all sit at .5–.55.
- **Shapes:** every pack uses the same rounded shape language.

The drift is in **composition and text**, not in drawing:
- **Floating props.** Props float 3–6 % above the table they should stand on. The castle pack's
  dungeon bars hang mid-wall.
- **Display signs.** The fitter grows the type until it touches the border, at the phone and desktop
  sizes. The 2.3 levels have none of these at 390 or 1180 px.
- **One unreadable button.** "EMERGENCY" ran over its card edge at every size.
- **One illegible numeral.** A tile numeral was 8.5 px, under the 9 px hard floor.

All of these are fixed. Three style trends should be steered before 2.5:
- **Long rule sentences in the display face.** Eleven signs have 7–15 words; 2.3 had 4.
- **Full-bleed dark sea rooms.** They swallow the ink press shadow, so buttons stop looking pressable.
- **The intern's size.** It now ranges from 13 % to 43 % of the stage height.

## Per-pack consistency

Measured at 1180×900 unless noted. "Spills" are cards whose text touched or crossed the border at
390×844 or 1180×900, before the fixes (2.3 baseline: 0). "Floats" are standing or resting things whose
drawn bottom sits ≥ 3 % above their support.

| | F supermarket | G school | H castle | I sea | J sports | A–E (2.3) |
|---|---|---|---|---|---|---|
| Art keys (all used) | 48 | 35 (32 used) | 48 | 44 | 34 | — |
| Hexes / off-bible | 28 / 1 (`#ffd9b0`) | 28 / 0 | 32 / 0 | 29 / 0 | 25 / 0 | 0 after 2.3 |
| Outline med (min–max) px | 4.56 (3.14–4.84) | 4.56 (3.42–13.19) | 4.56 (2.51–4.57) | 4.56 (3.19–15.22) | 4.56 (2.57–6.96) | 4.56 |
| Outlines outside 2.5–7 px | 0 | 2 (L155 table 7.23, L172 band 13.2) | 0 | 2 (L205 coral 15.2, weed 9.3) | 0 | 5 known |
| Highlight opacity | .55 | .5 | .5 | .5 (water lines .7–.8) | .5 | .45–.55 |
| Art text < 12 px @ 366 stage | tins, box letters, lunchbox B, nozzle U/D (10.2–11.7) | none | (base door signs 10.3–11.9) | buoy numerals 9.5 | tile numerals **8.5**, OSTRICH 10.7, shirt 9 | many, down to 5.4 |
| Text spills @390/1180 | 2 (L134, L150) | 2 (L157, L166 ×2) | 2 (L184, L185) | 2 (L194, L207) | 3 (L215, L221, L223) | 0 |
| Floats | L138, L142, L147 (2–3 %) | **L155 (5 %)**, L172 (3–4 %) | **L181 bars**, **L189, L190, L191, L192 (3–5 %)**, L175, wall props | L200 keeper (2 %) | **L225 (5 %)**, L218 card | fixed in 2.3 |
| Display text > 6 words | 1 | 1 | 0 | 2 (15 and 12 words) | 7 | 4 |
| Backdrops | wall + floor | wall + floor | wall + floor, L179 stone floor | full-bleed water, 5 dark rooms, pink whale | grass band at 74 %, 3 full-green rooms | wall + floor |
| Cast | shoppers (`#ffd9b0` face) | classmates (blob kids) | guards, dragon, owl | divers, octopus, crabs | Bossworth / Kevin / Mimic as props | — |
| Overall | on-model | on-model | on-model art, loosest composition | most distinctive, needs shadow fix | most text-heavy | — |

## Findings

### MUST (all applied)

**M1. L194 `emergency`: "EMERGENCY" ran over the card border at every size.**
- Cause: `btn-card small` gives 1.4× text and 0 padding, and the fitter cannot see a word that is
  wider than the card.
- Fix:
  - Class → `btn-card accent`.
  - The control row is re-split so the long word fits: `flood` 4/20, `blow` 26/20, `hatch` 48/20,
    `emergency` 70/26 (x/w %).
- Now 2 px clear at 320, 11 px at 390 and 23 px at 1180.

**M2. Display signs whose text touched or crossed the card edge at 390×844 and 1180×900.** The 2.3
levels have 0 of these; the new levels had 11. Fix: more card height so the 1.6× Bagel type wraps with
slack (positions/sizes only; text unchanged).

| Level | Card | Was (x, y, w, h) | Now |
|---|---|---|---|
| L134 | `today` | 4, 3, 44, 10 | 4, 2, 44, 14 |
| L150 | `sign` | 18, 20, 40, 15 | 16, 17, 44, 22 |
| L157 | `rule` | 4, 3, 44, 11 | 4, 3, 44, 14 |
| L166 | `menu` | 4, 3, 44, 15 | 4, 2, 44, 19 |
| L166 | `sign` | 52, 3, 44, 15 | 52, 2, 44, 22 |
| L184 | `sign` | 4, 4, 54, 13 | 4, 4, 54, 16 |
| L185 | `sign` | 4, 4, 46, 13 | 4, 3, 48, 15 |
| L185 | `clomp` (moved to clear the sign) | y 19 | y 20 |
| L207 | `gate` | 56, 3, 40, 12 | 54, 3, 42, 15 |
| L215 | `rules` | 4, 3, 92, 13 | 4, 3, 92, 15 |
| L221 | `rule` | 48, 48, 48, 18 | 47, 47, 49, 22 |
| L223 | `sign` | 4, 3, 64, 15 | 4, 3, 70, 22 |

**M3. Resting things floated 3–6 % above their table (bible §3.1, §16 "nothing floats").** Fix: move the
object down onto the drawn table top.

| Level | Object | Change |
|---|---|---|
| L155 | `measure` | y 28 → 33 |
| L189 | `glass` | y 40 → 44 |
| L190 | `candle` | y 41 → 44 |
| L190 | `note` | y 45 → 48 |
| L191 | `book` | y 48 → 51 |
| L192 | `candle` (both states) | y 40 → 44 |
| L225 | `board` | y 25 → 30 |
| L225 | `cclock` | y 37 → 40 |

**M4. L155 `desk` (base `table`): 7.23 px outline, which the normaliser could not fix.** The table was
90 % wide, so `--ow` sat at its 0.6 clamp. Fix: `desk` 2/96 → 7/86 (x/w), which matches the ruler and
gives a 6.54 px outline.

**M5. L181 `bar1…6`: dungeon bars hung mid-wall.** The drawn bars ran 34–62 % on a 74 % floor, and the
"eaten" crumbs floated with them. Fix: bar box `y 20 h 56` → `y 44 h 32`. The bars are drawn 46–74 % and
stand on the floor band; the crumbs land on the floor; the number tags (78 %) sit just below.

**M6. L214 `j-tile`: the puddle-tile numerals 3 and 6 and the "GO" were 8.5 px on a phone, under the
9 px hard floor (§6).**
- The puddle is now a blob that fills the tile (`#7fb2ff`, `SW3` edge, one `.5` highlight).
- The normal numeral disc sits in the puddle: r 26, 34-unit type.
- "GO" is 34 units.
- All tile numerals are now 12.0 px at 366 px, and the puddles read better too: a whole blue tile
  instead of a corner splash.
- File: `art-pack-j.js`.

**M7. L195 `i-buoy`: the buoy numerals were 9.5 px at 366 px (§11: numbers in art ≥ 12 px).** Fix: disc
r 22 → 26 and type 28 → 36 units; now 12.4 px. File: `art-pack-i.js`.

### SHOULD (not applied)

1. **Dark sea rooms hide the press shadow** (L193, L197, L209, L210, L211; `i-deep`/night backdrops
   `#2d2850`).
   - The problem:
     - Ink 3 px shadows on `#2d2850` are about 1.2:1, so pressable buttons look like the flat paper
       cards (§3.4).
     - The ink card border also vanishes.
   - Fix, either of:
     - core CSS: treat a dark backdrop like Sunset and use `#ffc145` shadows on `.obj.btn-card` inside a
       `.stage.dark-room` (set by the level or by the backdrop art);
     - pack I: give `i-deep` a 26 % seabed band (`#4b4466` or sand `#f3d998`) behind the control row.
       L209 already does this with its deck.
2. **Display face for long rule text (§6: ≤ 6 words).**
   - Signs: L150 (7 words), L153 (7), L195 (15), L200 (12), L213 (9), L215 (9), L219 (8), L221 (9),
     L223 (11), L230 (8), L231 (8).
   - L195 and L200 matter most: the puzzle reads its rule from them.
   - Fix: a ≤ 6-word display sign plus a body-text card (`honest-card`/`book-card`) for the sentence.
     Examples: L195 "HARBOUR RULE" + card "Coming in: red cans on your right, green cones on your
     left"; L223 "DOMINO RALLY" + card. Keep the full sentence in `label`.
3. **`btn-card small` used to mean "small text".** It means big text (1.4×, no padding) for tiny
   buttons. Affected: L216 `clear`, L218 `ask`, L225 `resign`/`flip`. Their labels shout next to normal
   buttons. Fix: drop `small`.
4. **Hand props floating mid-wall:**
   - L189 `hammer` (top right);
   - L185 `horn` (label says "on a hook", but no hook is drawn);
   - L149 `fob`;
   - L151 `nU`/`nD` (nozzles float 6 % right of the pump);
   - L178 `oldseal`/`oldletter`;
   - L218 `red` (the card hovers 5 % above the bench).

   Fix: draw a peg or hook (`peg` art or a 3-unit ink hook in the prop), holster the nozzles on the
   pump's side, and set props on the bench or table.
5. **Intern scale drifts.** The standard (§2.4) is 14–16 % of stage height. Measured:

   | Level | Intern height |
   |---|---|
   | L174 | 24 % |
   | L177 | 20 % |
   | L180 | 24 % |
   | L216 | 20 % |
   | L232 | 20 % |
   | L229 | 43 % |

   Fix: 15–16 % with feet at 74–75 %. L229's dress-up close-up is a fair exception; record it in the
   bible.
6. **L150 scale:** the trolley (`trolley`, 23 % wide) is nearly as wide as the car (26 %). Fix: trolley
   w ≈ 16 %, so it reads as a trolley next to a car. The same check applies to L149/L150 if cars change.
7. **Cross-pack duplicate drawings** (§15: return the canonical drawing).

   | Object | Packs |
   |---|---|
   | coin | F/I/J |
   | hammer | H/I |
   | rock | H/I |
   | oven | B/F/H |
   | jar | B/D/E/H |
   | tin | B/F/I |
   | sink, soap | B/G |
   | chair | A/E/J |
   | podium | E/J |
   | fridge | B/F |
   | plug | A/B/F |

   Fix: pick one per object, and have the others `return A.object('<canonical>', o)`. Check
   `artOpts` compatibility first.
8. **Small in-art labels that carry information** (10–12 px at a 366 px stage; §11 asks ≥ 12):
   - L135 tins SOUP/BEANS (10.9–11.7 px; the SOUP tin is the tell);
   - L136 box letters (11.2);
   - L213 crate OSTRICH (10.7);
   - L145 lunchbox "B" (10.2);
   - L148 FIRE EXIT door sign (9.0);
   - L185 OUT door sign (10.3).

   Fix: larger label type in `f-tin`/`f-cereal`/`j-crate`, or larger objects; use a one-word door sign
   ("ALARM") on L148.
9. **Sea-pack decor collides with the control row.** Water glints and sand dashes from the `i-*`
   backdrops peek out between and under cards (L194, L195, L196, L200, L205–L208). Fix: keep backdrop
   decor out of y ≥ 76 % and away from the card columns, or drop it under cards.
10. **Text that spills at the 320 px phone** (33 cards, 2–4 px; the 2.3 levels have 34, so this is the
    baseline). There are two tool gaps, owned by core and tools:
    - `Stage._fitText` and `level-lab --fit` measure the `.obj-text` block, which never overflows
      sideways, so neither sees a word wider than its card.
    - The fitter's 1 px tolerance ignores Bagel's tall ascent.

    Fix: measure with a `Range` (as this review did), and keep 2 px of slack.

### POLISH (not applied)

1. L134: the raised back row stands on nothing (the shelf line runs through the cartons), and carton
   `b2` pokes past the fridge liner. Draw a step under the back row, or move `b2` in 2 %.
2. Small floats (2–4 %):
   - L138 `last` croissant over the case;
   - L142 goods over the belt;
   - L147 `stand` legs stop 3 % above the floor;
   - L172 `pencils`/`band`;
   - L175 `g1`/`g2` guards;
   - L182 `cake`;
   - L204 `tin`;
   - L200 `keeper` above the boat.
3. `f-shopper` face `#ffd9b0` is the only off-bible hex in F–J. Use `#ffe066`, or add a "figure skin"
   entry to §3.3.
4. Bespoke ink strokes over 7 px: L172 `g-band` (13.2 px), L205 `i-coral` (15.2), `i-weed` (9.3). Make
   them colour fills with an `SW` outline, or thin them.
5. `h-dragon` asleep draws its "z" as a Bagel `<text>` at .75 opacity. Draw it as a path, like the
   narrator's `zzz` overlay.
6. White water lines at .7–.8 opacity (`i-buoy` waves, the `i-*` boat wake, the whale spout) exceed the
   .55 highlight cap and read as glare. Set them to .55.
7. L173: the moat is the base `water` rectangle with no ink edge, next to an outlined castle. Add an ink
   top edge or a bank.
8. L150: the "yellow line" is drawn as a vertical slab under the lamp post and reads as the post. Draw a
   flat stripe on the floor band instead.
9. L212: a full `#ff77b4` stage with pale ribs is the loudest room in the game. Consider a softer wall
   tint with the ribs in `#ff6f91`.

Counts: **MUST 7 (applied), SHOULD 10, POLISH 9.**

## Applied in 2.4

| Item | Files |
|---|---|
| M1 | `js/levels/194-blow-the-tanks.js` |
| M2 | `js/levels/134-use-by.js`, `150-trolley-line.js`, `157-shelf-help.js`, `166-dinner-money.js`, `184-eight-slices.js`, `185-tiptoe.js`, `207-tidy-tentacles.js`, `215-long-jump.js`, `221-gutter-ball.js`, `223-domino-rally.js` |
| M3 | `js/levels/155-broken-ruler.js`, `189-the-hourglass.js`, `190-invisible-ink.js`, `191-reverso.js`, `192-happily-ever-after.js`, `225-chess-clock.js` |
| M4 | `js/levels/155-broken-ruler.js` |
| M5 | `js/levels/181-breadstick-bars.js` |
| M6 | `js/ui/art-pack-j.js` (`j-tile`) |
| M7 | `js/ui/art-pack-i.js` (`i-buoy`) |

Only positions, sizes, one card class (L194) and two drawings changed. Puzzle logic, solutions, checks,
ids, numbering and interactivity are untouched.

Verification:
- **Level lab:** `node tools/level-lab.js <the 18 touched level files> 195 214 --art <packs a–j> --fit`
  gives **20 level(s), 948 checks, 0 problem(s); Fit check: 0 problem(s).**
- **Spill probe:** the touched levels have no spills at 390×844 or 1180×900.
- **Strokes:** `strokes.js` on the touched levels has nothing outside 2.5–7 px; L155 `desk` is now
  6.54 px.
- **Unit tests:** 1265 pass.
- **Not done:** `node tools/check.js` reports `sw.js is out of date`, because the service-worker hash
  covers file contents. Run `node tools/gen-sw.js` when integrating.
- **Screenshots** of every touched level (start and mid state) were checked after the change.

## Bible follow-ups (for the bible owner; not edited here)

- §3.2: add packs F–J (`f-*` supermarket, `g-*` school, `h-*` castle, `i-*` sea, `j-*` sports).
- §3.1 terrain rooms: add the sea's full-bleed water and dark rooms, and the sports grass band at 74 %.
  Pair this with the dark-room shadow rule (SHOULD 1).
- §6 / §4: document that `btn-card small` means *large* text for tiny buttons.
- §2.4: record the L229 dress-up close-up as an exception to the intern size.
- §17: `tools/art/lib.js` seeds levels 1–136 only; raise it to `OBEY.LEVEL_COUNT`, or strokes and sheets
  time out on 137+.
