# Art review 2.3: full game, 100 enhancements

Reviewer: Art Director (`.claude/agents/art-director.md`), judged against `docs/ART-BIBLE.md`.
Build: branch `v2.3`, cut from the released 2.2.0. This is the **review half** only. No code was
changed. Each item below says what to change, so the next step can apply it in six parallel batches.

## Method

- **Rendered every level.** All 136 campaign levels and the 4 bonus levels (1001–1004) at 1180×900
  (stage 640 px) and at 390×844 (stage 366 px, touch). Each was shot 2.3 s after navigation, with a
  completed save so replay-only props and jigsaw pieces show. All 140 stages were looked at on contact
  sheets of 6.
- **Probed the DOM** for every stage object. The probe recorded the rendered ink outline (max ink
  `stroke-width` × px per viewBox unit), SVG text size, card font size, button size and overlaps, and
  the position against the 74 % floor line.
- **Scanned the source.** A palette scan of `art-pack-a…e.js` found off-bible hexes, highlights over
  .6, and hard-coded ink.
- **Shot every screen** (menu, map, settings, daily, stats, sabotage, trophies, achievements,
  costumes, themes, secrets, credits) at 1180×900, 820×1180 (iPad portrait, touch) and 390×844
  (phone, touch).
- **Shot every overlay:** level complete, gag, wrong card, toasts, confirm dialog, chapter card, fake
  game over, the U.N.D.O. chat, the tutorial, and all three endings step by step to the final card.
- **Themes:** Candy, Ocean, Sunset and high contrast for menu, map, achievements and 11 sample levels.
  Reduced motion for the complete card, gag, chapter card and the U.N.D.O. chat.
- **Audio** reviewed from source: `js/ui/audio.js`, `OBEY.extras.CAPTIONS`, and every
  `OBEY.audio.play` call site.
- **Artefacts** are in the session scratchpad under `art23/`. The scripts are `capture.js`,
  `screens.js`, `endings.js`, `strokes.js`, `analyze.js` and `sheet.py`. The shots are in `desk/`,
  `phone/`, `scr-*/`, `th-*/`, `sth-*/` and `end-desk/`, with contact sheets in `sheets/` and the text
  reports in `desk-report.txt` and `phone-report.txt`.

Clean results:
- No page errors.
- No horizontal scroll.
- No gradients or filters in any pack.
- No static card casts a press shadow (2.1 M1 holds).
- Reduced motion keeps every stamp, gag prop and chapter card visible.
- Every trap still has a visible tell.

## Verdict

**The identity holds, but the game has outgrown its rules.** Ink, paper, stamps and Bossworth read
as one game from Level 1 to the endings. The problems are about scale: 140 rooms, 34 chapters and a
dozen screens built fast on a style written for 36 levels. Five themes stand out:

1. **Rooms float.** About 45 of the 100 new levels stand furniture and machines mid-wall above an
   empty floor band: printers, fridges, beds, sofas, freezers, tanks, a tap 30 % above its bath. The
   74 % floor line (bible §3.1) is the single most broken rule. It also makes rooms look unfinished.
2. **Outline weight and small text drift with size.**
   - Rendered outlines run from 1.32 px to 8.03 px at desktop. Pack C's median is 2.9 px; 16–24
     objects per pack fall under 2.5 px.
   - On a phone, 510 of 688 stage text objects render at 11.9 px, against the bible's 12 px floor.
   - 32 SVG labels render under 9 px on a phone, against the "nothing below 9 px, ever" rule.
   - A size-aware outline normaliser and a 12 px stage-text floor fix most of this in two files.
3. **Most 2.1/2.2 SHOULD and POLISH items never landed.** These are still open:
   - Sunset loses every hard shadow (2.1 S1).
   - The L20 scale is still broken; the L21 clock hands still hide "12"; the L11 footprint numerals
     are 6.9 px on a phone.
   - Unearned stars are still at 1.9:1.
   - The yellow colour-button glyph is still white-on-yellow (1.61:1; seen again in L110 "Y").
   - Pack palette drift is unchanged: 85 off-bible hexes.
4. **Meta screens and chapters lack identity.**
   - All 34 chapters look alike on the map: four repeating tint washes, and one of them is a grey
     that reads as "locked".
   - 36 trophy cups are identical, each with the same 30-word blurb.
   - Endings never show the Instruction Machine they are about.
   - 36 % of chapters share the same 9 music loops; the bonus pack reuses chapter 9's.
5. **Bossworth is stuck on one face.** He opens 102 of 140 levels `pleased`. He never blinks, and his
   costumes are static. Audio has gaps that show:
   - The hold hum stops after 0.5 s of a 2 s hold.
   - The zap gag flashes at about 8 Hz, against the bible's 3 Hz limit.
   - Reward sounds stack.
   - Captions sit on top of the title bar.

Counts: **P1 14 · P2 46 · P3 40**. By group: **A 39 · B 18 · C 7 · D 10 · E 12 · F 14**. Test risk: none 59 · low 31 · med 10.

Legend: **P1** = breaks a bible rule or fairness/accessibility; **P2** = clearly better, visible to
most players; **P3** = polish. **Effort** S < 1 h, M = half a day, L = a day or more. **Test risk**:
none / low / med. "med" means it moves interactive objects, changes object ids, or changes text that
tests match or overflow checks measure. **Group** = the apply batch (ownership table at the end).

---

## 1. Brand and UI chrome

**E1. Browser theme colour is off-palette.**
`index.html` l.9 `<meta name="theme-color" content="#ff4f6d">` and `manifest.webmanifest`
`"theme_color": "#ff4f6d"` (2.1 P8). Change both to `#d61e35` (Classic `--accent`).
P3 · S · risk none · **A**

**E2. Menu slips have a ragged icon column, and two items share an icon.**
`js/ui/screens.js` (menu markup). "New game", "Narrator costumes", "Themes" and "Credits" have no
icon, so their labels start 30 px left of the others (seen at all three viewports). "Achievements"
and "Trophy room" both use `star`.
- Add icons with `OBEY.art.addIcon` in `art-extra.js`, 24-unit viewBox, `currentColor`, stroke 2.2,
  round caps:
  - `plus` (new game)
  - `bowtie` (costumes)
  - `palette` (themes)
  - `scroll` (credits)
  - `cup` (trophy room: bowl, two handles, stem and base)
- Use them in the menu.
- Labels are unchanged.

P2 · S · risk low · **B**

**E3. Menu slips overlap on iPad portrait.**
`css/style.css` `.slip:nth-child(odd|even)` rotate ±.5–.6°. At 820×1180 the slips are 790 px wide,
so the tilt lifts each edge about 8 px and neighbours visibly cross ("Continue" over "New game").
Add:
```css
@media (min-width: 600px) and (max-width: 900px) {
  .slip:nth-child(odd) { transform: rotate(-.25deg); }
  .slip:nth-child(even) { transform: rotate(.2deg); }
}
```
(Also see E92 for the iPad menu layout.)
P2 · S · risk none · **A**

**E4. Captions cover the title bar.**
`.captions` is fixed top-centre (`css/style.css` l.767). At 1180×900 "[victory jingle] [stamp thud]"
sits on the Hint/Show-me-how chips. On a phone it covers the DISOBEYED stamp. Captions are
subtitles, so put them at the bottom:
```css
.captions { top: auto; bottom: max(12px, env(safe-area-inset-bottom)); }
```
Do this together with E5, which moves the toasts to the top.
P1 · S · risk low · **A**

**E5. Toasts cover the stage's control row.**
`.toasts` is bottom-centre. At 1180×900 three toasts cover the lower 25 % of the stage, where the
bible puts controls (§3.1 three-zone read). On a phone they cover about 180 px of the stage. Change
to:
```css
.toasts { top: max(12px, env(safe-area-inset-top)); bottom: auto; }
@media (min-width: 901px) {
  .toasts { left: auto; right: max(16px, env(safe-area-inset-right));
            transform: none; width: min(380px, calc(100vw - 32px)); }
}
@keyframes toast-in { from { transform: translateY(-12px); opacity: 0; } to { transform: none; opacity: 1; } }
```
Toasts are still `.toast` with the same text, so tests that wait on them are unaffected.
P1 · S · risk low · **A**

**E6. Screen titles are flat type on the dots.**
`.topbar .screen-title` and `.lvl-name` are flat type while everything else is a stamped slip. Give
them a small version of the logo treatment. Sunset keeps its light text through `--on-bg`:
```css
.topbar .screen-title, .lvl-name {
  -webkit-text-stroke: 0; text-shadow: 2px 2px 0 color-mix(in srgb, var(--ink) 35%, transparent);
}
```
P3 · S · risk none · **A**

**E7. Bonus 1's play icon wraps onto its own line.**
Sabotage file, Bonus 1 "Red Means Blue". The 2.1 D17 rule `.slip { flex-wrap: wrap }` lets the ▶
icon sit on its own line above the label (1180×900). Add:
```css
.bonus-list .slip { flex-wrap: nowrap; }
.bonus-list .slip span { min-width: 0; }
```
P2 · S · risk none · **A**

**E8. The hint count disappears on phones.**
`js/ui/app.js` level bar `#hint-btn`. On a phone the label is hidden (≤ 520 px), so "Hint (3)"
becomes a bare bulb (2.1 P7). Emit the count outside the hidden span:
```html
<b class="count-badge" aria-hidden="true">3</b>
```
Keep the span text for screen readers, and update it wherever the label is refreshed. Styled in E86.
P2 · S · risk low · **E**

**E9. The stat chips wrap raggedly.**
`.stat-row` (menu, map side) wraps 2 + 1 with uneven widths on a phone. Under `@media
(max-width: 520px)`:
```css
.stat-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.stat-row li { flex-direction: column; align-items: flex-start; gap: 0; }
```
P3 · S · risk none · **A**

## 2. Bossworth and characters

**E10. Bossworth opens 102 of 140 levels `pleased`.**
Measured on first view: pleased 102, suspicious 11, panicked 11, neutral 11, annoyed 4, surprised 1.
Bible §2.1 says mood follows the subtext. Re-cast `introMood` in `js/levels/*.js` toward at most
50 % `pleased`:
- **Office memos and rule cards → `neutral`:** 33, 37, 39, 40, 43, 44, 50, 51, 52.
- **Levels where he fears the tell → `suspicious`:** 62, 72, 75, 80, 97, 100, 115, 123.
- **Countdown, alarm and timer rooms → `panicked`:** 70, 88, 107, 111.
- **Official announcements → `neutral`:** 81, 83, 101, 129, 130.

Do not change `complete`/`say` moods that tests assert (e.g. `tests/unit/levels.test.js` l.410
expects `laughing`).
P2 · M · risk low · **F**

**E11. Add a hook so Bossworth can blink.**
`js/ui/art.js` `eyes()`/`narrator()`. Wrap the open-eye shapes in `<g class="eyes">`. Moods with
closed eyes (pleased, laughing, defeated, the sleep overlay) get `<g class="eyes eyes-closed">`.
The `.mouth` group is unchanged. The animation is E12.
P2 · S · risk none · **B**

**E12. Bossworth never blinks.**
```css
.narrator-svg .eyes:not(.eyes-closed) { transform-box: fill-box; transform-origin: center; animation: blink 5.2s infinite; }
@keyframes blink { 0%, 95%, 100% { transform: none; } 97% { transform: scaleY(.1); } }
.reduce-motion .narrator-svg .eyes { animation: none !important; }
```
Use `animation-delay: -1.7s` on `.narrator-mini` so the menu and level portraits do not blink in sync.
P2 · S · risk none · **A**

**E13. Add class hooks on costume accessories.**
`js/ui/art.js` `accessoryBack`/`accessoryFront`. Add classes:
- `acc-star` (wizard star path)
- `acc-bulb` (robot antenna circle)
- `acc-antenna` (alien antennae group)
- `acc-tails` (ninja headband tails)
- `acc-crown-jewel` (royal centre jewel)

No geometry changes. The animation is E14.
P3 · S · risk none · **B**

**E14. Costumes are static.**
Give each a 1-property idle loop, all under 4 px or 10 % (bible §7.1):
- `.acc-star`: opacity .6 → 1, 2.4 s.
- `.acc-bulb`: fill flash to `#ffd23f`, 1.2 s, under 3 Hz.
- `.acc-antenna`: rotate ±4° about (100, 34), 2.8 s.
- `.acc-tails`: rotate ±5° about (168, 96), 1.6 s.
- `.acc-crown-jewel`: opacity .7 → 1, 3 s.

All are off under `.reduce-motion`.
P3 · S · risk none · **A**

**E15. The phone narrator is too small to read moods.**
At ≤ 520 px `.narrator-btn { width: 74px }` (2.1 P6). Brows and pupils are 2–3 px at that size.
Change to `84px`. The bubble shrinks by 10 px; the stage is unaffected.
P2 · S · risk low · **A**

**E16. U.N.D.O. is unreadable at chat size.**
`js/ui/art-extra.js` `undoBot()` renders at 30 px in `.undo-head`, so the eye dots are about 2 px.
Add an `o.small` path that:
- drops the shutter detail;
- enlarges the label window to 60 % of the body;
- draws eyes as r 7 dots and the smirk tick at stroke 6.

Use it for `.undo-bot`.
P3 · S · risk none · **B**

**E17. The intern ("hero") is drawn at five different scales.**
L13 6 % tall, L45 floats mid-wall, L48 hovers, L102 floats next to a monitor, L106 is taller than
the airlock doors, L127 is shorter than a top hat. Standard: 14–16 % of stage height, feet on the
74–90 % floor band.

Leave alone:
- L13 and L28: they are platform/terrain rooms.
- The `hero-sprite` x positions.
- Anything the logic reads.

Change the `y`/`h` of the static hero only in 45, 48, 96, 102, 106 and 127.
P2 · S · risk med · **F**

**E18. L69's shadow figure reads ominous.**
`b-shadow` in `js/ui/art-pack-b.js` is a flat `#58607e` silhouette with no outline (2.2 P2). It
breaks pillar 5, "nothing scary". Redraw as a coat-stand silhouette: round knob head, hat brim,
hook arms. Fill `#8a86a8`, `SW3` ink outline, no spikes. Keep its box and id.
P2 · S · risk none · **C**

## 3. Level art

### Core levels 1–32 and base art (`art.js`)

**E19. L1: the big button floats on the wall.**
`js/levels/01-red-button.js` `O('red', 30, 28, 40, 40, …)`. The plinth ends at 68 %, above the
74 % floor (2.1 P2, still open). Change to `O('red', 30, 38, 40, 40, …)`. `blue` (72, 74) is
unchanged.
P2 · S · risk med · **F**

**E20. L20: the scale is drawn wrong.**
`js/ui/art.js` `scale`. Only the beam tilts; the pans are lopsided grey triangles floating off the
beam ends (2.1 S2, still open; rendered outline 7.4 px). Redraw the pans hanging from the rotated
beam ends with the 2.1 S2 code: arm 104; pan = two `SW3` hangers plus a `#c3ccd8` bowl
`Q`-curve; `.toFixed(1)` coordinates.
P1 · M · risk low · **B**

**E21. L20: the "HEAVY (5)" tag covers the left pan.**
`js/levels/20-weight-of-words.js`. Move `left` → `(6, 44, 30, 9)` and `panlist` → `(62, 44, 30, 9)`
so the labels sit under their pans. Both are static.
P2 · S · risk low · **F**

**E22. L21: the clock hands hide "12", and the hour is the puzzle.**
`art.js` `clock` (2.1 S11, still open). Change:
- minute hand → `M100 100 L100 46`
- hour hand → `M100 100 L100 62`
- numerals → radius 72, `font-size="17"`

The same art serves L52 and L126.
P1 · S · risk none · **B**

**E23. L11: the footprint numerals are unreadable.**
`art.js` `footprint`. The order numerals are 6.9 px on a phone (2.1 S3). Draw the numeral inside the
shape:
```js
'<text x="50" y="' + (o.shape === '▲' ? 66 : 62) + '" text-anchor="middle" font-size="30" fill="#fff" stroke="' + INK + '" stroke-width="5" paint-order="stroke">' + o.n + '</text>'
```
Remove the under-shape numeral.
P1 · S · risk none · **B**

**E24. L11: the footprints stand on the wall.**
`js/levels/11-silent-level.js`, footprints `fp0–fp3` sit at y 58–64 %. Use `y = 80 - (i % 2) * 4`,
`w = h = 13`. They are static, and the tell (order by position) is unchanged.
P2 · S · risk low · **F**

**E25. Door signs shrink to 6–8 px.**
`art.js` `door` sign text uses a fixed 22/8 font. At 390×844:

| Level | Sign | Size |
|---|---|---|
| L10 | LOCKED FOREVER | 6.2 px |
| L13 | EXIT (small door) | 6.8 px |
| L30 | PASSWORD? | 8.3 px |
| L33 | EXIT | 8.6 px |
| L73 | PROMENADE | 8.6 px |
| L96 | SWIPE CARD | 8.4 px |
| L97 | BULB LOCK | 6.6 px |
| L100 | KEY CHUTE | 6.6 px |
| L116 | OUT | 6.3 px |
| L125 | SHOP | 6.2 px |

Also, on `small` doors the text touches the plate top (2.2 S5). Change:
- `font-size = Math.min(22, Math.round(150 / len))`.
- Signs over 9 characters with a space wrap to two `<tspan>` lines; the plate grows to 34 units.
- `small` doors: text baseline +3 units.
- Plate width stays 76.

P1 · M · risk none · **B**

**E26. The WELCOME mat fails contrast.**
`art.js` `mat` text `#6b5a3b` on `#c9a86a` is 2.95:1, and L2 `mat` is interactive (2.1 S10). Use
`fill="#4a3c22"` (4.74:1).
P2 · S · risk none · **B**

**E27. The magazine reads "TOP 10" at 5–8 px.**
`art.js` `magazine` renders it at 8.4 / 5.3 / 6.7 px on a phone (L6, L23, L85). Drop the small
words. Draw a 34-unit "10" in a white `SW3` disc on the cover.
P3 · S · risk none · **B**

**E28. Light bulbs rely on fill colour alone.**
`art.js` `bulb` (L32, L98). "On" is yellow with a pale halo at about 1.1:1 against the stage. L32
has a counter; L98 adds up lit values, so the state matters. Give lit bulbs a shape channel: five
`SW3` ink rays, 10 units long, around the glass (§5.3 rule 1).
P2 · S · risk none · **B**

**E29. L136: "INTAKE" renders at 7.2 px on a phone.**
`art.js` `machine`. The machine is the drop zone (2.1 P5, still open). Use a 64×26 plate with
`font-size="15"`, or drop the word and draw a funnel glyph.
P3 · S · risk none · **B**

### Pack A — office (`art-pack-a.js`)

**E30. `a-desk`: the translucent grey modesty panel looks unfinished.**
L35, L45, L48 (2.2 S12, still open). Use an opaque `#c3ccd8` with an `SW3` outline.
P2 · S · risk none · **C**

**E31. L46 cup "MAX" and L45 lift indicator "3" are too small.**
- L46 `a-cup` "MAX" is 5.7 px on a phone. Put "MAX" on a 22-unit white tab beside the red dashed
  line (the line remains the tell).
- L45 `a-lift` indicator "3" is 8.6 px. Use a 26-unit numeral.

P2 · S · risk none · **C**

### Pack B — home (`art-pack-b.js`)

**E32. L63: the tortoise legs have no outline.**
The legs are pale green strokes (2.2 P1). Add `SW3` ink outlines and fill `#5fd98a`.
P3 · S · risk none · **C**

**E33. Pack B labels render at 6.5–8.6 px on a phone.**
- **L62 thermometer** scale numerals 8.6 px: keep 10/20/30 only, at 22 units.
- **L64 "£2.99"** tag 6.6 px: draw the tag at 40 % of the pot width with 28-unit "£3" (the wording
  in the level card says "Bargain").
- **L65/L68 taps "H"** 6.5–7.9 px: use a 24-unit red disc with a white H.

P2 · S · risk none · **C**

### Packs A + B shared

**E34. Highlights exceed the 60 % cap (§3.3, §8).**
- Pack A: 1 × .7, 3 × .8, 2 × .85.
- Pack B: 2 × .7, .72, .75, 3 × .8, 3 × .85, 2 × .9.

Set every white highlight to .45–.55.
P3 · S · risk none · **C**

**E35. Palette drift in packs A and B (2.2 S1).**

| Pack | Hexes | Map to |
|---|---|---|
| A | `#7a4a24` | `#9a6b3f` |
| A | `#b58900` | `#f5b400` |
| B (woods) | `#8a5a2b`, `#7d5a2b`, `#6b3e1a`, `#4b2a1a`, `#a0603a`, `#d9a066` | nearest bible wood (`#9a6b3f` / `#a0784d` / `#c98b4a`) |
| B (blues) | `#e9f6ff`, `#cfe9ff`, `#9fdcff`, `#7fd3ff` | `#cfefff` / `#7fb2ff` |
| B | `#00d68f` | `#2bc46f` |
| B | `#7d3fc6` | `#9b5de5` |

Record `#9b5de5` in bible §3.3 (it is already a CSS shape colour).
P3 · M · risk none · **C**

### Pack C — outdoors (`art-pack-c.js`)

**E36. Palette drift in pack C: 25 off-bible hexes.**
- `#7a5230` × 13 → `#9a6b3f`
- `#fff6e0` × 10 → `#fff8dd`
- `#bcd3e8` × 6 → `#c3ccd8`
- `#1f7a4a` / `#2f7a4a` → `#2fae84`
- `#c41e30` → `#e5243b`

Keep sand `#f3d998` and record it in §3.3 as a terrain colour.
P3 · M · risk none · **D**

**E37. L78 compass "N" and L92 stamp "POST" are 7.1 px on a phone.**
- `c-compass` "N": 28 units, ink.
- `c-stamp`: drop "POST"; keep the sun motif and add perforated `SW3` edge scallops so it still
  reads as a stamp.

P2 · S · risk none · **D**

**E38. L79 footprints have no ink outline; L90 trails are pale.**
- L79 `fp` footprints: add `SW3` outlines.
- L90: the "big boots" trail is `#8a93ad` dashes on the near-white stage (about 2.5:1), and the
  trail *is* the clue. Put 9-unit `INK` underlays beneath each dashed trail, as done for the L111
  orrery in 2.2.

P2 · S · risk none · **D**

**E39. L75: hut numbers are tiny on a phone.**
Nine huts at 366 px are about 40 px wide each, so the number discs are about 9 px. Enlarge the
`c-beachhut` number disc to 46 units with 34-unit text; faded numbers keep the 14/12 dash. Record
"9 in a row is the puzzle" as an exception in bible §11.
P2 · S · risk none · **D**

### Pack D — science (`art-pack-d.js`)

**E40. Pack D breaks the screen rule and duplicates the router.**
- `d-microwave` (L104) has a yellow screen, against "screens are `#1c1640`" (2.2 S10). Use
  `#1c1640` with phosphor `#7dffb2` digits.
- `d-router` (L104) is white while `a-router` (L36) is dark. Make `d-router` return
  `A.object('a-router', o)`.

P3 · S · risk none · **D**

**E41. Hard-coded ink and a near-duplicate blue.**
- `art-pack-d.js` l.237 stripes `stroke="#1c1640"` → `INK`.
- `art-pack-c.js` l.199 `stroke="#000"` at 25 % → `INK` with `stroke-opacity=".25"` (2.2 S11).
- `#3e7bff` × 8 in pack D → `#3a86ff`.

P2 · S · risk none · **D**

**E42. Pack D highlights and the L110 glow ring.**
- Highlights: 4 × .6, 5 × .7, .75, 6 × .8, .85 → .45–.55.
- L110 satellite glow ring: a solid 55 % `#ffd23f` stroke (2.2 P3, seen in all themes). Replace it
  with the listed `.shimmer` glow (§8.5), or delete it.

P3 · S · risk none · **D**

### Pack E — show and meta (`art-pack-e.js`)

**E43. Palette drift in pack E: 24 off-bible hexes.**
- `#3a3a48` × 8 → `#2d2850`
- `#c9a227` × 6 → `#f5b400`
- `#e8e6e0` × 5 → `#fff8dd`
- `#ff4d4d` → `#e5243b`
- `#14102a` → `#1c1640`

P3 · M · risk none · **D**

**E44. L128 "B" and L132 "z" are 5–8 px on a phone.**
- L128 `e-gondola`: Bossworth's car "B" is 8.3 px (2.2 S13). Write "BOSS" at 30 units and add a
  small red tie mark under the window.
- L132 `av-gerald`: "z" is 5.9 px. Replace it with closed-eye arcs and a 40-unit "z z" in ink.

P3 · S · risk none · **D**

### Room layout across packs (`js/levels/*.js`, positions and sizes only)

**E45. Office rooms float (pack A).**
Put bases on the 74–96 % floor band, or seat objects on the existing `table`/`shelf` art:
- L41: copier (y 11–27 %) onto a `table` at the floor; shredder to the floor.
- L42/L43: printers onto a `table`.
- L44: suggestion box and shredder to the floor.
- L45: the whole room is lifted, with desk, lift and STAIRS door bases at about 41 %. Drop all to
  the floor line.
- L33: stamps onto the desk.
- L39: bucket to the floor.

P2 · M · risk med · **F**

**E46. Home rooms float (pack B).**
- L55: fridge base 67 % → floor.
- L56: jars onto a `shelf`.
- L57: washer base 58 % → floor.
- L58: bed and L71 bed → floor.
- L60: sofa → floor.
- L65/L68: taps sit 30 % above the bath. Attach the tap to the bath rim (y ≈ bath top − 8).
- L66: dishes onto a `table` counter.
- L53: birdcage onto a `table`.
- L71: switch up to 45 % (wall height); torch onto the bed.
- L50: mugs onto a `shelf`.

P2 · M · risk med · **F**

**E47. Outdoor rooms float (pack C).**
- L73: brolly and shades float (2.2 S3). Stand them in a `c-`/`bin` stand at the floor.
- L78: dig spots float on a plain wall in a top-down puzzle. Add the existing `c-meadow` backdrop at
  0–100 % so the room reads as a field seen from above.
- L85: cool box → floor.
- L91: gnomes stand in the sky (2.2 S3). Move them to the meadow, and move the meadow band to 74 %.
- L92: postbox → floor.

P2 · M · risk med · **F**

**E48. Science rooms float (pack D).**
- L93: freezer → floor.
- L94: flask and burner onto a `table` bench.
- L95: cylinder onto the bench.
- L96: keycard onto the shelf (2.2 S3).
- L105: tanks and pump → floor.
- L106: the airlock doors are drawn smaller than the intern. Enlarge them to 30 % tall, with bases
  on the floor.

P2 · M · risk med · **F**

**E49. Show and meta rooms float (pack E), plus two core rooms.**
- L115: boxes onto a `table`.
- L116: tray and red button → floor or a plinth.
- L126: vase and bookcase → floor.
- L132: red button onto a plinth.
- L9: the bow floats 40 px above the gift. Seat it on the lid; the puzzle is "pull the bow".
- L17: the three drawers float with no carcass. Add a static `shelf`/cabinet backdrop behind them.

P2 · M · risk med · **F**

**E50. The finale is under-dressed.**
- L135: an empty room; the rug floats at 70 % and a lone gear sits mid-wall.
- L136: the Instruction Machine, the game's final boss object, is only 27 % wide.

Change: L136 `machine` ≥ 42 % wide and centred (bible "one hero object ≥ 35 %"); L135 rug to
88–96 %; add two static `gear` and `pipe` props on the wall band so the factory reads as a factory.
P2 · M · risk med · **F**

**E51. Three layering and size problems in the show pack.**
- L121: the "HOST ONLY" tag covers half the yellow buzzer (2.2 P5). Move it under the buzzer.
- L119: the curtains are overlapped by the "Choose your act" card. Give the curtains `z: 0` and
  inset the cards 4 % from the curtains.
- L113/L114: the wands are 2–3 % objects that are drag targets. Enlarge to 10 × 10.

P2 · S · risk med · **F**

**E52. Information hidden in `.subtle` text.**
`.subtle` (ink at 55 %, 3.73:1) carries information in four levels (2.2 S6, still open):
- L115 "↓ peephole"
- L122 "+6 more strongmen" (a count clue)
- L124 "How many jellybeans?"
- L130 "Loading engine: Gerald"

Switch them to `tag-card`, or plain ink without `subtle`. Text is unchanged.
P1 · S · risk low · **F**

**E53. The accent colour means two things on the stage.**
Bible §3.6 says `--accent` is "the narrator's preferred, usually wrong" choice. 41 accent stage
buttons in 40 levels use it both for the trap (e.g. L41 "Copy 400%", L43 "Cancel his job") and for
neutral confirmations (L30 ENTER, L54 START, L98 ENTER, L103 VERIFY, L111 LAUNCH). Audit every
`cls: 'btn-card accent'`:
- Neutral submit/confirm buttons become `btn-card big`.
- Accent stays only where it marks Bossworth's pushed choice.

Do not change which button is correct.
P3 · M · risk low · **F**

## 4. Map and meta screens

**E54. All 34 chapters look alike on the map.**
`js/ui/screens.js` map regions alternate four tints with a text label. Give each pack family a
24-unit landmark icon (`addIcon`) before the region label:
- core: `button`
- office: `stapler`
- home: `sock`
- outdoors: `palm`
- science: `flask`
- space chapters 26–27: `rocket`
- show: `curtain`
- final: `gear`

Draw them at 22 px in ink at 70 % next to the label, and a 64 px faint (12 %) watermark in each
region's empty corner.
P2 · M · risk low · **B**

**E55. One map region tint reads as "locked".**
`--region-4` Classic `rgba(28,22,64,.12)` reads as a disabled grey band (e.g. Canteen Cliffs). Use
a hue tint per theme:
- Classic `rgba(62,193,255,.14)`
- Candy `rgba(143,233,255,.22)`
- Ocean `rgba(42,157,143,.14)`
- Sunset `rgba(255,193,69,.16)`

Also drop `.map-dot` circles (`opacity .08`, up to 30 px). They read as smudges. Use
`r ≤ 3` or remove them.
P2 · S · risk none · **A**

**E56. The map leaves 40 % of the desktop empty.**
`.map-world { max-width: 540px }` (2.1 P3). Change to `640px`.
P3 · S · risk low · **A**

**E57. 36 identical trophy cups, each with the same 30-word blurb.**
- `art.js` `trophy` gets `o.icon` (from E54) engraved in ink on the cup bowl.
- In `screens.js` trophies, shorten each card to name + tier + "4 / 4"; the rule text stays only in
  the intro panel.
- Card names are unchanged.

P2 · M · risk low · **B**

**E58. Achievement progress bars are red.**
`.ach .bar span` uses `--accent`, the "danger/lie" red, for progress. Use `background: var(--good)`
on `.ach .bar span`, `.trophy-card .bar span` and `.progress-block .bar span`; keep `--accent` for
the composure meter only.
P3 · S · risk none · **A**

**E59. Settings is one 1,150 px column on desktop.**
Use two columns:
```css
@media (min-width: 1000px) {
  .settings { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
}
```
Sound and voice go on the left; display, accessibility and data on the right.
P3 · S · risk low · **A**

**E60. The stats table wraps badly.**
In Bossworth's file, the stats table wraps "0:00.0 (44 levels)" over three lines and long `dt`s
collide. Use `.stat-table { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }` and
`.stat-table dd { white-space: nowrap; }`; the bracket note moves to `dt`.
P3 · S · risk none · **A**

**E61. Daily Dare hit days are colour-only.**
`.day.hit` marks a hit day with a green fill only (§5.3 rule 1). Add:
```css
.day.hit::after { content: '✓'; font-size: .8em; margin-left: 1px; }
```
P2 · S · risk none · **A**

**E62. Credits is a plain text panel.**
`js/ui/screens-extra.js` credits. Add a "cast" strip of all 8 costumes at 64 px: unlocked ones in
colour, locked as `.silhouette`, each captioned with its name. End with an `.end-stamp`
"THE END?". Text is unchanged.
P3 · M · risk low · **B**

**E63. No ending shows the Instruction Machine.**
`js/ui/endings.js`. Add the machine art (`OBEY.art.object('machine')`, 160 px) to the first scene
of each ending:
- **Hero:** the machine with a paper `note` card sliding out (`pop`).
- **Chaos:** the machine tilted 8°, with `gear`/`spring` debris reusing `.debris`.
- **Secret:** the machine asleep (screen dark) with the golden quill on top.

P2 · M · risk low · **B**

**E64. The three final cards are identical.**
Style each ending's card:
- `.ending-hero .end-stamp`: colour `var(--good)`.
- `.ending-chaos .ending-final`: rotate −1.5°, with a chipped stamp
  (`.ending-chaos .end-stamp { clip-path: polygon(0 0, 100% 6%, 96% 100%, 3% 92%); }`).
- `.ending-secret .ending-final`: 6 px double `#ffd23f` border.

P3 · S · risk none · **A**

**E65. The secret quill is muddy, and the hero sparks use an old colour.**
- `.ending-secret .quill-big { opacity: .5 }` reads khaki on purple (2.1 P4). Use `.85`.
- `.ending-hero .spark` colour `#12925f` is the pre-2.1 `--good`. Use `var(--good)`.

P3 · S · risk none · **A**

**E66. The chapter card is plain.**
`js/ui/app-extra.js` `App.chapterCard` is a plain paper card. Prepend the chapter's landmark icon
(E54) at 40 px in `--accent`, and set the kicker as a small rotated stamp. Run this after group B
lands, since it uses the E54 icons.
P3 · S · risk low · **E**

## 5. Motion and animation

**E67. The zap gag flashes at about 8 Hz.**
`.gag-zap` / `zap-flash` run `.12s steps(2) 8`, which toggles every 60 ms. That is 8 flashes a
second on a 40 % yellow wash: above the bible's 3/s limit (§7.1) and the WCAG 2.3.1 general flash
threshold. Change:
```css
.gag-zap > svg { animation: zap-flash .34s steps(2) 3; }
.gag-zap { animation: zap-bg .34s steps(2) 3; }
```
That is 2.9 Hz over 1.0 s. Also slow `.obj.tv-text.static` (`tv-static .2s steps(2) infinite`,
5 Hz) to `.6s`.
P1 · S · risk none · **A**

**E68. All three stars land at once.**
`.big-stars .icon` stars appear together, so a 3-star result has no payoff. Stagger them:
```css
.big-stars .icon { animation: star-pop .32s cubic-bezier(.2, 1.6, .4, 1) both; }
.big-stars .icon:nth-child(2) { animation-delay: .12s; }
.big-stars .icon:nth-child(3) { animation-delay: .24s; }
@keyframes star-pop { from { transform: scale(0) rotate(-30deg); } to { transform: none; } }
```
Unearned stars run the same animation. The sound is E80.
P2 · S · risk none · **A**

**E69. Reduced motion makes the hold bar look finished at once.**
`.reduce-motion .obj.hold-btn.charging::before { transform: scaleX(1) }` plus the 0.001 ms clamp
fills the bar the instant the hold starts. The player sees "done" while still needing 2 s. Use
discrete steps, which are not motion:
```css
.reduce-motion .obj.hold-btn.charging::before { transition: transform 2s steps(4, end) !important; }
```
P1 · S · risk low · **A**

**E70. Screens snap in with no transition.**
Add a 160 ms entrance:
```css
.screen:not([hidden]) { animation: screen-in .16s ease-out; }
@keyframes screen-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
```
It is clamped by `.reduce-motion`. Not on `#screen-level`, which has its own banner timing.
P3 · S · risk low · **A**

**E71. The U.N.D.O. log cuts off mid-line.**
`.undo-log` (max-height 12em) cuts the last line with no cue; the screenshots show
"…With a SMILE" sliced in half. Add `mask-image: linear-gradient(#000 80%, transparent)` to `.undo-log`.
Add `scroll-snap-type: y proximity` with `.undo-msg:last-child { scroll-snap-align: end }` so the
newest message stays in view.
P3 · S · risk none · **A**

## 6. Lighting and shading (2D)

**E72. Sunset and the dark endings lose every hard shadow.**
`--ink` on the Sunset `--bg` is 1.32:1, so the hard shadow disappears behind the logo, slips, chips,
the stage, panels and bubbles (seen on menu, map and levels). Same on `.ending-chaos` and
`.ending-secret` (2.1 S1, still open). Apply the 2.1 S1 block:
```css
:root { --shadow-hover: 4px 4px 0 var(--ink); --shadow-press: 1px 1px 0 var(--ink); }
[data-theme="sunset"] .app, .ending-chaos, .ending-secret {
  --shadow: 5px 5px 0 #ffc145; --shadow-sm: 3px 3px 0 #ffc145;
  --shadow-hover: 4px 4px 0 #ffc145; --shadow-press: 1px 1px 0 #ffc145; }
[data-theme="sunset"] :is(.stage, .panel, .bubble, .map-world, .complete-card, .modal, .ending-final) > * {
  --shadow: 5px 5px 0 var(--ink); --shadow-sm: 3px 3px 0 var(--ink);
  --shadow-hover: 4px 4px 0 var(--ink); --shadow-press: 1px 1px 0 var(--ink); }
[data-theme="sunset"] .logo-obey { text-shadow: 7px 7px 0 #ffc145; }
```
Replace the literal `4px 4px 0 var(--ink)` / `1px 1px 0 var(--ink)` in the hover/press rules
(l.113–114, 328–329, 588) with the variables.
P1 · M · risk none · **A**

**E73. Nothing tells a standing object from a floating one.**
Add a flat contact shadow:
- **`js/ui/stage.js`:** after rendering, add class `grounded` to every `has-art` object whose bottom
  edge is between 74 % and 99 % and whose svg is not a stretch/terrain art.
- **CSS:**
  ```css
  .obj > svg.art { position: relative; }
  .obj.grounded:not(.guide-target)::before {
    content: ''; position: absolute; left: 14%; right: 14%; bottom: -1%; height: 6%;
    border-radius: 50%; background: color-mix(in srgb, var(--ink) 14%, transparent); pointer-events: none; }
  ```

The shadow is flat with no blur, so it stays inside §8. The svg paints over it because it is
positioned and later in the DOM.
P2 · M · risk low · **A**

**E74. Lamp light cones are inconsistent.**
`art.js` `lamp`/`light` cones vary from 45–60 % `#fff6a8` and run past the base onto the floor and
rugs (L4, L24, L69, L126). Standardise on 50 %, and end the cone at the lamp's base line, which is
the floor contact.
P3 · S · risk none · **B**

**E75. Dragged objects cast a black shadow.**
`.obj.dragging` uses `filter: drop-shadow(6px 8px 0 rgba(0,0,0,.25))`, which is black, not ink. Use
`color-mix(in srgb, var(--ink) 30%, transparent)` so it recolours with the theme.
P3 · S · risk none · **A**

## 7. Audio and SFX

**E76. 34 chapters share 9 music loops, and the bonus reuses chapter 9's.**
`js/ui/audio.js` `SCALES`/`ROOTS` index by `chapter % 9`, so Filing Fjord plays Button Bay's loop.
`app-extra.js` `App.syncMusic` passes `8` for bonus levels, which is Stapler Steppes' index.
- Keep chapters 0–7 as they are.
- Map 8–12 office, 13–17 home, 18–22 outdoors, 23–27 science, 28–32 show and 33 final to six family
  timbres. Each family is a small object:

  | Family | Wave | Filter | Extra |
  |---|---|---|---|
  | Office | square | lowpass 1400 | 8th-note swing 0.58 |
  | Home | triangle | lowpass 1800 | — |
  | Outdoors | sine | — | a 2.6→3.2 kHz chirp every 16 steps, vol .015 |
  | Science | sawtooth | lowpass 900 | Q 4 |
  | Show | square | — | vib 5 Hz depth 4 |
  | Final | triangle | — | bass every 4 steps |

- Bonus gets its own index (`-1` → a whole-tone "studio" family).
- Keep no drums and arp vol ≤ .05.

P2 · M · risk none · **E**

**E77. Music does not duck under the voice.**
Bible §9.4 says music is never louder than the voice, but nothing ducks. In `speak()`: if
`music.on`, run `musicBus.gain.setTargetAtTime(vols.music * .45, now, .05)`, then restore with
`setTargetAtTime(vols.music, now + ms / 1000, .2)`.
P2 · S · risk none · **E**

**E78. The hold hum stops a quarter of the way through.**
`SFX.hold` is a 0.5 s rise, but holds take 2 s (`.hold-btn.charging` 2 s), so the hum stops early.
- `hold`: `tone(220, 0, 2.0, { type: 'triangle', vol: .03, slide: 660 })`. Keep the oscillator so
  `OBEY.audio.stopHold()` can cut it on early release (call from the existing holdend path in
  `app.js`).
- New `charged`: 659 + 988 Hz sine, 120 ms, vol .04. Play it on completion; caption `'charged ding'`.

P2 · S · risk low · **E**

**E79. The stamp thud lands before the stamp does.**
`app.js` l.709 plays `stamp` 250 ms after `success`, but the visual stamp (`stamp-card` .15 s
delay, .45 s overshoot) lands at about 520 ms. Change the timeout to `520`.
P3 · S · risk low · **E**

**E80. The stars have no sound.**
Add `star1–3` SFX: 1047 / 1319 / 1568 Hz triangle, 90 ms, vol .05, plus a 6 kHz highpass noise tick
of 40 ms at vol .02. `App.showComplete` plays one per earned star at 120 / 240 / 360 ms, in sync
with E68. Caption `star1–3`: `'star chime'`.
P3 · S · risk low · **E**

**E81. Reward sounds stack.**
On L1 completion the captions show "[stamp thud] [chapter fanfare]" over the victory jingle, and an
achievement toast can add a fourth sound. That breaks the §9.2 sum ≤ 0.35 rule. Add
`App.playReward(name)` in `app.js`: a queue that starts each of `success`, `stamp`, `chapter`,
`achievement`, `unlock`, `trophy` and `secret` at least 380 ms after the previous one starts. Route
the toast sounds (`app.js` l.71–93) through it.
P2 · M · risk low · **E**

**E82. Babble ignores punctuation.**
`babble()` only lifts the last syllable on ?/!. Add pauses after a word ending in:
- `,;:` → `step * 1.2`
- `.` → `step * 2`
- `…` → `step * 3`

Lines then phrase like speech. Mouth timing (`talkTime`) is unchanged.
P3 · S · risk none · **E**

**E83. The laugh ignores the costume voice.**
`SFX.laugh` is fixed at 340 Hz, so the dino (85 Hz voice) laughs like the alien. Pass the voice
base: `laugh(base)` with start `clamp(160, 340 * base / 190, 520)` and the same falling steps.
`babble` already knows `v.base`.
P3 · S · risk none · **E**

**E84. U.N.D.O. has no voice.**
It is silent except when a leak glitches. Add `undo`: three square bleeps at 1400 / 1750 / 1180 Hz,
35 ms each, 45 ms apart, bandpass 2000 Q 3, vol .03. Play it on each U.N.D.O. message in
`app-extra.js`; keep `glitch` for leaks. Caption `'U.N.D.O. beeps'`.
P3 · S · risk low · **E**

**E85. Meta actions all play the same `ui` blip.**
Add five recipes, each with a caption (they are not pure tap feedback, so §9.5 applies):

| Name | Recipe | Used on | Caption |
|---|---|---|---|
| `toggle` | on: 660→990 Hz sine 60 ms; off: reverse; vol .04 | settings switches | 'switch click' |
| `wear` | highpass noise 2→6 kHz 180 ms vol .05 + 784 Hz triangle 120 ms | costume Wear | 'wardrobe swish' |
| `paint` | bandpass noise 800→3000 Hz 250 ms vol .06 | theme change | 'paint swish' |
| `locked` | 110 Hz square 70 ms, lowpass 500, vol .05 | locked map node | 'locked thunk' |
| `boing` | 300→600 Hz sine 90 ms then 600→250 Hz 160 ms, vib 12 Hz depth 20 | poking Bossworth | 'boing' |

P3 · M · risk low · **E**

## 8. Accessibility and contrast

**E86. Style the hint count badge from E8.**
```css
.chip-btn .count-badge {
  display: none; position: absolute; top: -6px; right: -6px; min-width: 18px; height: 18px;
  border-radius: 999px; background: var(--accent-2); color: var(--ink); border: 2px solid var(--ink);
  font-size: 11px; line-height: 14px; text-align: center; }
@media (max-width: 520px) { .chip-btn { position: relative; } .chip-btn .count-badge { display: block; } }
```
P2 · S · risk none · **A**

**E87. Stage text is under 12 px on phones.**
`.obj` uses `clamp(10.5px, 3.3cqi, 20px)`, which gives 11.9 px on a 366 px stage. 510 of 688 text
objects are affected (bible §11; 2.1 S4, still open). Fine print is 9 px (L14, L44, L102, L127,
L131). Change:
```css
.obj { font-size: calc(var(--fx) * clamp(12px, 3.3cqi, 20px)); }
.obj.fine-print { font-size: max(11px, calc(.6 * clamp(12px, 3.3cqi, 20px))); }
```
Raise the `js/ui/stage.js` `_fitText` floors from `10`/`9` to `11`/`11`. Then re-run the overflow
checker at 320×700 and 390×844; L26, L33, L63, L118 and L119 are the tightest. Expect some group F
card-size follow-ups.
P1 · S · risk med · **A**

**E88. Unearned stars are nearly invisible.**
Ink at 35 % / muted at 40 % gives 1.9–2.0:1 (1.11 on Sunset). The 1-star "Paper Jam" node looks
blank (2.1 S5). Use:
```css
.node-stars .star-off, .big-stars .star-off { color: var(--muted); opacity: 1; }
```
Make the star icon outline-only for `star-off`, so 1-star and 3-star differ by shape too.
P1 · S · risk none · **A**

**E89. Locked titles and `.subtle` objects fail contrast.**
- `.node-locked .node-title` (opacity .6) is 4.0–4.46 in Candy, Ocean and Sunset (2.1 S6). Use
  `.node-locked .node-title { opacity: 1; color: var(--muted); }`.
- `.obj.subtle`: `opacity: .75` (L2 corner).

P2 · S · risk none · **A**

**E90. Glyph contrast on coloured buttons.**
- `.obj.color-btn.yellow`: white glyph on `#ffc31f` is 1.61:1, seen in L11 and L110 "Y". Use
  `{ color: var(--ink); text-shadow: none; }` (10.6:1).
- `.obj.shape-btn` green and orange glyphs are 2.2–2.3:1 on paper (L25, L39). Use
  `{ -webkit-text-stroke: 3px var(--ink); paint-order: stroke fill; text-shadow: none; }` (2.1 S7).

P1 · S · risk none · **A**

**E91. Small fixed-colour labels fail, and the stars change colour by theme.**
- `.medal-easy` white on bronze is 2.83:1 → `color: var(--ink)` (2.1 S10).
- The Sunset page gradient's last stop `#c8506a` → `#a8455f`, in body and in
  `.theme-preview[data-theme="sunset"]` (2.1 S12; `--on-bg` 4.0 → 5.2).
- Stars take `--accent-2`, so they are **cyan** in Candy. Give `.node-stars` and `.big-stars` a fixed
  `#ffd23f` with the 1.6 px ink outline in every theme. Stars are an object, not a token.

P2 · S · risk none · **A**

## 9. Layout, iPad and phone

**E92. The iPad portrait menu is a left-aligned single column.**
At 820×1180 the logo and narrator hug the left half above 790 px-wide slips. In
`@media (min-width: 700px) and (max-width: 900px) and (orientation: portrait)`:
```css
.menu-layout > :first-child { justify-self: center; text-align: center; }
.logo { align-items: center; }
.menu-narrator { justify-content: center; }
.menu-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.menu-nav .slip-primary { grid-column: 1 / -1; }
```
P2 · S · risk low · **A**

**E93. Phone asides push the stage down.**
The narrator line plus the replay aside ("Replaying? I still remember…") plus the goal use about
260 px before the stage. At ≤ 520 px clamp `.aside:not(.aside-nudge):not(.aside-dare)` to one line:
```css
display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
```
Tapping expands it (`.aside:focus-within`, or `:hover` on touch). Nudges and dares stay full,
because they carry information.
P2 · S · risk low · **A**

**E94. The phone trophy room is one cup per row.**
36 cups stack vertically (very long scroll). Under ≤ 520 px:
```css
.trophy-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.trophy-art { width: 72px; height: 72px; }
```
P2 · S · risk none · **A**

**E95. The score rule wraps with an orphan.**
`.score-rule` and `.objective` wrap with one-word orphans ("finish." alone) at 1180 and on phones.
Add `text-wrap: balance;` to both.
P3 · S · risk none · **A**

**E96. High contrast keeps the pastel map tints.**
In high contrast, map regions still show pink and grey washes (seen in screenshots). Set
`html[data-contrast="high"] { --region-1 … --region-4: transparent; }` and separate regions with
3 px ink dashed rules instead.
P3 · S · risk none · **A**

## 10. Consistency and tech-art

**E97. Outline weight drifts with object size across all 140 rooms.**
Rendered outlines run 1.32–8.03 px at 640 px. The p10 is 1.77 px in packs A and E and 1.9 px in C.
Under 2.5 px: 24 objects in C, 16 in E, 11 in core, 10 in A. Over 7 px: about 10 large doors,
mirrors and monitors. Fix it once in `js/ui/stage.js` instead of in 60 art calls:
- After render, for each non-stretch `svg.art`, compute `k = min(boxW / vbW, boxH / vbH)`.
- Set `style="--ow: s"`, with `s = clamp(.6, target / (4 * k), 1.8)` and
  `target = max(2.5, stageWidth * .0072)` px (4.6 px at 640, 2.6 px at 366).
- CSS:
  ```css
  .obj > svg.art [stroke="var(--ink)"][stroke-width="4"] { stroke-width: calc(4px * var(--ow, 1)); }
  .obj > svg.art [stroke="var(--ink)"][stroke-width="3"] { stroke-width: calc(3px * var(--ow, 1)); }
  ```
  CSS overrides SVG presentation attributes.
- Bespoke widths (8, 10, 18-unit fixes from 2.2) stay as drawn.
- Re-run `strokes.js`. The target is 3–6 px for 95 % of objects.

P1 · M · risk low · **A**

**E98. Cross-pack duplicates look different side by side.**
There are two each of desk, chair, photo frame, portrait, jar, tray, magnet, balloon and stamp
(2.2 S10). In packs C, D and E, make each duplicate return the canonical pack A/B drawing
(`A.object('a-desk', o)` etc.), keeping their own keys so no level file changes. Where the
canonical art lacks an option (e.g. colour), add it as a param in the C/D/E wrapper only.
P3 · L · risk low · **D**

**E99. Code comments have wrong counts.**
- `js/ui/art.js` header says "8 costumes × 7 moods". There are 8 moods plus the sleep, gag and
  potato overlays (2.1 P9). Fix the comment.
- `js/core/data.js` l.85 says "Nine chapters of four levels"; there are 34. Fix it as part of
  group F's data.js ownership.

P3 · S · risk none · **B** (data.js comment rides with F's E10 batch)

**E100. Art QA scripts live outside the repo.**
Bible §17 says to put them under `tools/art/` if kept. Add `tools/art/strokes.js` (the E97 probe),
`tools/art/contrast.js` (a port of the scratchpad `contrast.py` to Node, no dependencies) and
`tools/art/sheets.js`. The last builds contact sheets with Playwright: it composes stage PNGs into
an HTML grid and screenshots it, with no Python or PIL. Add npm scripts `art:strokes` and
`art:contrast`.
P3 · M · risk none · **A**

---

## Apply groups: file ownership

Each group edits only its own files, so the six batches can be applied in parallel branches.

| Group | Owns (only these files) | Items |
|---|---|---|
| **A** — CSS and stage behaviour | `css/style.css`, `js/ui/stage.js`, `index.html`, `manifest.webmanifest`, new `tools/art/*`, `package.json` scripts | E1, E3, E4, E5, E6, E7, E9, E12, E14, E15, E55, E56, E58, E59, E60, E61, E64, E65, E67, E68, E69, E70, E71, E72, E73, E75, E86, E87, E88, E89, E90, E91, E92, E93, E94, E95, E96, E97, E100 |
| **B** — base art and screen markup | `js/ui/art.js`, `js/ui/art-extra.js`, `js/ui/screens.js`, `js/ui/screens-extra.js`, `js/ui/endings.js` | E2, E11, E13, E16, E20, E22, E23, E25, E26, E27, E28, E29, E54, E57, E62, E63, E74, E99 |
| **C** — packs A and B | `js/ui/art-pack-a.js`, `js/ui/art-pack-b.js` | E18, E30, E31, E32, E33, E34, E35 |
| **D** — packs C, D and E | `js/ui/art-pack-c.js`, `js/ui/art-pack-d.js`, `js/ui/art-pack-e.js` | E36, E37, E38, E39, E40, E41, E42, E43, E44, E98 |
| **E** — audio and app glue | `js/ui/audio.js`, `js/core/extras.js` (captions), `js/ui/app.js`, `js/ui/app-extra.js` | E8, E66, E76, E77, E78, E79, E80, E81, E82, E83, E84, E85 |
| **F** — levels and data | `js/levels/*.js` (incl. `b1–b4`), `js/core/data.js` | E10, E17, E19, E21, E24, E45, E46, E47, E48, E49, E50, E51, E52, E53 (+ the data.js comment in E99) |

E99 is counted in B. Its one-line `data.js` comment fix is done by whoever applies F, since F owns that file.

### Ordering constraints

1. **Independent pairs.** Each of these pairs is two edits in two groups, and either half is safe
   alone (an unused class or hook does nothing):
   - E11 → E12 (blink)
   - E13 → E14 (costume idles)
   - E8 → E86 (hint badge)
   - E73 (CSS + stage.js are both in A)
2. **B before E66.** The chapter card uses the landmark icons from E54. If E lands first, E66 must
   guard with `ICONS[k] ? … : ''`.
3. **E87 before final F sign-off.** Raising the stage-text floor may make a few cards overflow at
   320×700. Run the overflow checker after A merges, and fix cards in F (card size only, text
   unchanged).
4. **E97 before judging C/D outline work.** E97 fixes most thin and thick outlines, so C/D should
   not hand-thicken strokes in the same release. E32 and E38 add *missing* outlines, which E97
   cannot create.
5. **E80 matches E68's timing.** The star SFX times (120 / 240 / 360 ms) match the CSS delays. If
   one changes, change both.
6. **Captions for new sounds (E78, E80, E84, E85)** go in `js/core/extras.js`, which group E owns.
   Keep the existing caption keys; `tests/unit/v21.test.js` l.453 checks them.
7. **After all six groups merge:** update `docs/ART-BIBLE.md`:
   - §3.1 terrain rooms and the L75 exception
   - §3.3 palette additions
   - §5.1 region tokens
   - §7 new animations
   - §8 contact shadow
   - §9.2 new SFX and music families

   Also update `ASSETS.md` (new icons). Then run `node tools/check.js`,
   `node --test tests/unit/*.test.js`, `node tools/level-lab.js` on every F-touched level, the
   browser suite, and `node tools/gen-sw.js`.

### Test-risk hotspots

- **med:** E17, E19, E45–E51 move interactive objects; check with `level-lab` and the campaign e2e.
  E87 changes measured text size.
- No item renames an object id, changes a level's solution, or changes text that tests match. E52
  changes classes only, and E10 changes intro moods only.

## Summary

- **Per priority:** P1 14 (E4, E5, E20, E22, E23, E25, E52, E67, E69, E72, E87, E88, E90, E97) ·
  P2 46 · P3 40.
- **Per group:** A 39 · B 18 · C 7 · D 10 · E 12 · F 14.
