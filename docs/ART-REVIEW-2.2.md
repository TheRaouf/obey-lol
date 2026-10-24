# Art review 2.2: levels 33–132 and art packs A–E

Reviewer: Art Director (`.claude/agents/art-director.md`), against `docs/ART-BIBLE.md` (baseline 2.1.0).
Scope: the 100 new levels (33–132) and `js/ui/art-pack-a.js` … `art-pack-e.js`, built by five contributors.

Method:
- Every level was rendered at 1180×900 (stage 640 px) after a 2.5 s wait, so no chapter banners cover the stage. A second pass ran at 390×844 (stage 366 px). All 100 desktop screenshots were looked at, in pairs.
- A DOM probe measured each object's rendered outline (4 × px per viewBox unit), SVG text size, card overflow, button size and button overlap. A source scan counted off-bible hexes, gradients and highlight opacities.
- The coordinator's checker (`scratchpad/dbg/overflow.js`) checked card overflow at 320×700, 390×844, 768×1024, 1365×900 and 1920×1080.
- Screenshots are in the session scratchpad under `art22/` (`shots/` = before, `after/` = after the fixes, `phone/` = 390 px).

## Verdict

**Ships after the MUST fixes below, which are now applied.** The five packs read as one game. All five use `INK` outlines with `SW`/`SW3`, flat fills, no gradients, no filters and no blurred shadows. None of them hard-codes an ink outline. No static card has a press shadow. The narrator, cards and stage furniture are reused correctly.

The problems come from scale, not style:
- Small objects drawn in 200-unit viewBoxes end up with 1.3–1.8 px outlines.
- A few tells relied on colour alone or on pale yellow on the pale stage.
- Some text cards overflowed on small phones.
- One room (L117) had furniture floating at mismatched scales.

Pack A (office) is the closest to the bible. Packs C and E drift the most in palette. Pack D drifts the most in highlight strength.

## Per-pack consistency

Outline = rendered outline at a 640 px stage (bible target 3–6 px). "Off-bible hexes" = colours in neither the bible palette (§3.3) nor `art.js`/`art-extra.js`.

| Pack | Levels | Objects | Outline min / median / p90 / max | Off-bible hexes | Gradients / filters | Text baked into art | Highlight opacity used | Notes |
|---|---|---|---|---|---|---|---|---|
| A office | 33–52 | 32 | 1.52 / 3.55 / 5.83 / 7.35 | 2 (`#7a4a24`, `#b58900`) | 0 | 1 (stamp word) | .35–.8 (mostly .45–.5) | Most on-model. Staplers in L34 are under-weight. `a-desk` modesty panel is translucent grey (looks unfinished). |
| B home | 53–72 | 60 | 1.52 / 3.62 / 5.39 / 7.61 | 18 (e.g. `#c9c4d6`, `#e9f6ff`, `#8a5a2b`, `#7d3fc6`) | 0 | 6 | .55–.8 via `hi()` | Clean shape language. Wood browns drift from the four bible woods. |
| C outdoors | 73–92 | 61 | **1.32** / 2.90 / 10.65* / 25* | **25** (`#7a5230` ×13, `#fff6e0` ×10, `#bcd3e8` ×6 …) | 0 | 5 | .35–.7 | Terrain backdrops (sand, snow, meadow, pond) use `preserveAspectRatio="none"`, so the * values are stretch artefacts and look fine. Real issue: beach huts at 1.32 px (fixed). Many objects float above the floor line. |
| D science | 93–112 | 39 | 1.90 / 3.38 / 5.07 / 7.61 | 16 (`#3e7bff` ×8 near-duplicate of `#3a86ff`, `#e9e6f0` …) | 0 | 5 | **.6–.8** (10 of 14 above the .6 cap) | Strongest highlights in the game. Had the two worst fairness bugs (paperclip, AIM ring). |
| E show/meta | 113–132 | 37 | **1.27** / 3.04 / 4.56 / 7.61 | **24** (`#3a3a48` ×8, `#c9a227` ×6, `#e8e6e0` ×5 …) | 0 | 5 | .4–.7 | Thinnest median outline. Ferris-wheel and film-set props were far too thin (fixed). |

Cross-pack duplicates that look different side by side (a player sees both): `a-router` (L36, dark) vs `d-router` (L104, white). `b-microwave` (L67, dark screen) vs `d-microwave` (L104, yellow screen; breaks the "screens are `#1c1640`" rule). There are also two each of desks, chairs, photos, portraits, jars, trays, magnets, balloons and stamps (`a-`/`c-`/`d-`/`e-`). See S10.

## Findings

### MUST (all applied in this branch)

1. **L97 `clip` (`d-clip`): the solution object was the least visible thing on the stage.** It was a grey (`#8a86a8`) and `#e9eef5` stroke with no ink outline, roughly 2.5:1 on the floor band. Every other item had an outline.
   Fix: an 18-unit `INK` underlay, a `#c3ccd8` body and a 60 % white highlight. File: `js/ui/art-pack-d.js`.
2. **L111 `orrery` (`d-orrery`): the tell was unreadable.** The "AIM" label was `#e5a800` on `--stage` (about 2:1). The AIM ring and flight line were bare `#ffd23f` (1.3:1) with no ink.
   Fix: the label is now `INK`, 20 units. The ring and dashed line sit on `INK` underlays (10 and 9 units). File: `js/ui/art-pack-d.js`.
3. **L112 `wire1–4` (`d-wire`): a colour-only code, against bible §5.3 rule 1.** The manual's rule refers to "the LAST blue". The wires had no number and no colour name, and "Wire 1 → wire 4" did not say which end was 1.
   Fix: `d-wire` takes `num` (a badge above the wire) and `letter` (a R/B/Y chip on the wire). The level passes `num: i + 1, letter: …`. Puzzle logic is unchanged. Files: `js/ui/art-pack-d.js`, `js/levels/112-cut-the-right-wire.js` (artOpts only).
4. **L128 `car0–5` (`e-gondola`): "your car" was told apart from Bossworth's mostly by yellow vs orange.** The occupant glyphs were about 8 px, and the outlines were 1.39 px.
   Fix: 8-unit outlines (3 px), a bigger window, and "YOU" / "B" written in the window. File: `js/ui/art-pack-e.js`.
5. **L75 `hut1–9` (`c-beachhut`): outlines on the room's only interactive objects were 1.32 px**, under half the house weight. They read as a different art style next to the cards.
   Fix: 10-unit outlines (3.3 px) and a 14/12 dash on the faded number disc. File: `js/ui/art-pack-c.js`.
6. **L117 film set: perspective and scale were broken.** The coat rack (drawn 14 % tall in a 40 % box) was shorter than the chair. The chair, rack, lamp and a featureless dark "table" slab all floated mid-wall above an empty floor. The draggable hat had 1.27 px outlines and overlapped the chair.
   Fix:
   - Every piece now stands on the 74–78 % floor line.
   - The table uses the vocabulary `table` art instead of a `keypad-bg` slab.
   - The rack is 20 % wide, drawn in a cropped `50 16 100 182` viewBox so it is 36 % tall.
   - The hat and chair have 8-unit outlines.
   - The hat sits on the rack's top hook or on the chair seat.
   Files: `js/levels/117-continuity.js` (positions/sizes only), `js/ui/art-pack-e.js` (`e-coatrack` viewBox, `e-bowler`/`e-chair` stroke).
7. **L125 `shop` door: the sign "GIFT SHOP" rendered at 7.6 px**, below the 9 px floor.
   Fix: the sign now reads "SHOP" (the yellow sign still says "GIFT SHOP & EXIT"), and the door box is 75/23. It now renders about 11 px. The `p1–p3` plaques are 2 % taller. File: `js/levels/125-do-not-touch.js`.
8. **L91 `gnomeC` (`c-gnome`): the "HI!" sign was 8.9 px.**
   Fix: a bigger sign plate and 24-unit text (about 15 px). File: `js/ui/art-pack-c.js`.
9. **Desktop text overflow:**
   - L73 `paper`: the last line touched the border. The card is now 21 % tall, and `date` moved to y 28.
   - L84 `tip`: same problem. `tip` and `hotel` are now 15 % tall.
   - L116 `poster`: "watch obeys." spilled over the bottom edge. The card is now 48×30. `cmdTitle` moved to y 34 so the two never meet.
10. **Phone text overflow at 320×700**, reported by the browser suite and fixed after the new `_fitText` (10 px floor). For each card the fix is a bigger card, wording with blank lines removed, or both. Meaning and clues are unchanged.

    | Level | Fix |
    |---|---|
    | L44 | `handbook` 48 tall |
    | L48 | `notice` 36 tall, "once" → "when"; `status` y 42.5 |
    | L50 | `cap1–4` 17 tall |
    | L52 | `rule` 32 tall |
    | L53 | `sticker` 17 tall |
    | L54 | `recipe`: blank lines removed |
    | L58 | `poster`: blank line removed, 34 tall |
    | L61 | `legend`: blank line removed |
    | L64 | plant tags 12 tall |
    | L72 | `note` 30×27 |
    | L118 | `script`: quote marks dropped, 49.5 tall |
    | L119 | `rules` 58×36; `pick` y 41 |
    | L120 | `setlist` 31 tall |
    | L122 | `rules` 56×26; `x3` 34×7.5 |
    | L123 | `caption` 8.5 tall |
    | L126 | `plaque` 8.5 tall |
    | L127 | `rules` 30 tall; `fine`, `stilts`, `crate` moved down |
    | L131 | `foot` 7.5 tall |

    The checker now prints `none` at all five viewports.

### SHOULD (left for the 2.3 art release)

1. **Palette drift.** 85 off-bible hexes across packs B–E. Consolidate near-duplicates onto bible colours: `#3e7bff`→`#3a86ff`, `#7a5230`/`#8a5a2b`/`#7d5a2b`→`#9a6b3f`, `#fff6e0`/`#fffbe6`→`#fff8dd`, `#c9a227`→`#f5b400`, `#3a3a48`→`#2d2850`. Add the few genuinely new ones to bible §3.3: sand `#f3d998`, meadow `#5fd98a` band, Mars `#e2552c`.
2. **Under-weight outlines (1.4–2.0 px) on small props.** Fix with an 8–10-unit outline or a cropped viewBox, as in M5 and M6.
   - L34: `st1–st7` staplers and `jelly`
   - L35: `plant`
   - L68: `glass` and `card`
   - L78: `digN/E/S/W`, `magnet` and `pack`
   - L82: `bagA–E`
   - L83: `speaker`
   - L90: `snowman`
   - L108: `rover` and `crater`
   - L113/L114: `wand`
   - L122: `strong0–2`
   - L127: `stilts`
   - L132: `av-*`
3. **Floating objects and the floor line (§3.1).**
   - L45: `hero` and `mug` hang mid-wall above the desk.
   - L71: the bed floats, the light `switch` sits at floor level, and the `torch` floats.
   - L73: `brolly` and `shades` float with no stand.
   - L91: the gnomes stand in the sky, and the `c-meadow` band ends at 77 %, not 74 %.
   - L96: the keycard hovers above the shelf.
4. **SVG text under 12 px at desktop**, which means about 6–7 px on a 366 px phone (bible §11 wants ≥ 12 px at 366):
   - L46 `cup` "MAX" (10.1 px; part of the tell — the red dashed line carries it too)
   - L64 "£2.99"
   - L68 "H"
   - L85 "TOP 10"
   - door signs "BULB LOCK" (L97), "KEY CHUTE" (L100), "OUT" (L116), "SHOP" (L125)
   - L126 clock numerals
   - L127 "NOTHING"
   - L132 "z"
5. **Base `door` art (`js/ui/art.js`, outside the packs):** with `small: true` the sign text touches or crosses the top of its plate (L48 "LOCKED", L52 "HOME"). Lower the text baseline by 3 units, or cap its font at 12.
6. **`.subtle` text (ink at 55 %, 3.73:1) carries information** in L115 "↓ peephole", L122 "+6 more strongmen" (a count clue), L124 "How many jellybeans?" and L130 "Loading engine: Gerald". Use `tag-card` or plain ink.
7. **Phone crowding at 390 px.** These rely on the 44 px `::after` hit extension and look cramped:
   - L41 keypad keys 32×36
   - L38 lift buttons 43×40
   - L47 vending keys 45×38
   - L131 credit rows 31 px tall
   - L132 "Make host"/"Ban" 58–65×36

   23 % of the new levels' buttons hit the auto-fit floor at 390 px, against 14 % in levels 1–32.
8. **Highlights above the 60 % cap (§3.3, §8).** Pack D has 6 at .8, one at .75 and 4 at .7. Pack C has 5 at .7, and packs A, B and E have one or two each. Normalise to .45–.6.
9. **L75: nine interactive huts in one row**, against the "≤ 6 in a row" rule (§11). It is the puzzle, so either split it into 2 rows of 4–5 or record an exception in the bible.
10. **Unify the cross-pack duplicates.** One desk, router, microwave, photo frame, portrait, jar, tray, chair, magnet, balloon and stamp each, all in one pack. The D microwave screen should be `#1c1640`, not yellow.
11. **Hard-coded colours on strokes.** `art-pack-d.js` ~l.235 uses `stroke="#1c1640"` for stripes. `art-pack-c.js` l.197 uses `stroke="#000"` at 25 %. Use `INK`, or a fill colour from the palette.
12. **`a-desk` (L35, L45, L48)**: the translucent grey modesty panel reads as unfinished. Make it opaque `#c3ccd8` with an `SW3` outline.
13. **L128**: the "B" in Bossworth's car is about 10 px. Consider "BOSS" at 30 units, or his tie as a second mark. The legend line should mention the window labels.

### POLISH

1. L63 tortoise legs: pale green strokes with no outline.
2. L69 shadow figure: a flat `#58607e` silhouette with no outline. It reads a little ominous. Give it a rounder coat-stand shape and a softer tone.
3. L110 satellite: the glow ring is a solid 55 % stroke. Use the listed glow (§8.5) or drop it.
4. L90: a snowflake dot peeks out behind the "Big boots" button.
5. L121: the "HOST ONLY" tag covers half of the yellow buzzer body. Move it under the buzzer.
6. L49 revolving-door arms in pale `#cfefff`: fine in Classic, check them in Ocean.
7. L117: the lamp is still a little small next to the 36 %-tall coat rack.
8. Pack C's beach and snow backdrops replace the wall/floor bands entirely. That is fine, but record "terrain rooms" as an allowed exception in §3.1.

Counts: **MUST 10** (applied; items 9 and 10 cover 3 and 21 levels), **SHOULD 13**, **POLISH 8**.

## Verification

- `node tools/level-lab.js` on every touched level (44 48 50 52 53 54 58 61 64 72 73 75 84 91 97 111 112 116 117 118 119 120 122 123 125 126 127 128 131), with all five packs: **29 level(s), 1306 checks, 0 problem(s).**
- Overflow checker at 5 viewports: `none`.
- `node --test tests/unit/*.test.js`: 764 pass, 0 fail.
- All touched levels were re-screenshot after the fixes and inspected.
- `node tools/check.js` reports one item, "sw.js is out of date". This comes from the build's file list, not the art. Regenerate it with `node tools/gen-sw.js` at release.
