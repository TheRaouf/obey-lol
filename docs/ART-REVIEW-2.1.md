# Art review — build 2.1.0

Reviewer: Art Director. Judged against `docs/ART-BIBLE.md` (baseline written at the same time).
No code was changed by this review; every item names the file, the object id and the exact change.
Line numbers refer to the files as read at review time; other work is landing in parallel, so
search for the quoted selector or function if a line has moved.

## Scope and method

- **Rendered:** all 36 campaign levels (first-play state), bonus levels 101–104, main menu, adventure
  map, achievements, the level-complete card (Level 1), a trap with its gag and "How to do it right"
  card (Level 25, green circle), the U.N.D.O. chat with a leaked chat (Level 13), a chapter card
  (Level 5), and the three endings (first scene, quill choice, final card).
- **Viewports:** 1365×900 (desktop), 1024×768 (iPad landscape, touch), 390×844 (phone, touch,
  mobile). Themes Classic, Candy, Ocean, Sunset and high contrast at 1365×900 (Level 9, map, menu).
- **Tooling:** Playwright/Chromium against `tools/serve.js` with `?test=1` and `OBEY_TEST.seed`.
  177 screenshots plus per-object geometry (box, font size, overflow, off-stage, rendered outline
  width) and a contrast/colour-blindness script over the CSS tokens. Scripts and PNGs are in the
  session scratchpad (`art/capture.js`, `art/strokes.js`, `art/contrast.py`, `art/shots/`).
- **Clean results:** no page errors; no horizontal scroll at any viewport; no stage object or text
  leaves the stage; every stage button has a ≥ 44 px hit area (visual sizes down to 29 px are
  extended by the `button.obj::after` rule); the stage fits above the fold at 1024×768 (538 px) and
  1365×900 (640 px). Bossworth's eight moods, the costume system and the gag catalogue are on-model
  everywhere. The tells in Levels 2, 8, 11, 25, 28 and 32 are fair and visible.

Severity: **Must fix** = breaks identity, legibility, fairness or accessibility. **Should fix** =
clearly wrong, but the game is still fair and readable. **Polish** = quality.

---

## In-flight changes seen while reviewing

`css/style.css` gained a "2.1 QA fixes" block during this review (another engineer, uncommitted).
Relevant to art: `.bubble .speaker` is now `color-mix(in srgb, var(--accent) 82%, var(--ink))`
(≈ 5.9:1 on Classic paper), `.review-card .review-stars` is now ink, `.screen-quip .speaker` is ink
on a paper chip, `.undo-head .small` is `#c8f5dc`, and `.ruin-mini` is ink on `#ffe3e6`. Items below
note where that already covers part of a finding. Re-run the scripts after that work lands.

## Must fix

### M1. Static information cards look exactly like buttons (fairness / affordance)
- **Where:** `css/style.css` line 324–326 (shared rule gives `box-shadow: var(--shadow-sm)` to all
  text-card classes). Affects 19 levels; static (non-interactive) objects that carry the button
  shadow: L3 `sign`, `timer`; L6 `display`, `ticket`; L7 `box`; L10 `book`; L11 `progress`;
  L16 `calendar`, `question`, `score`; L18 `list`, `progress`; L21 `poster`; L22 `sign`; L25 `sign`;
  L26 `answer`; L30 `display`; L31 `log`; L32 `sign`; L33 `contract`; L34 `question`, `score`;
  B101 `sign`; B104 `label`.
- **What's wrong:** the bible's affordance rule is "shadow = pressable". Today a plaque that cannot be
  pressed (B101 `sign` "PRESS") is pixel-identical in style to the button next to it (B101 `red-word`
  "RED") — and in B101 noticing that "RED" is a button *is* the puzzle. Same in L25 (`sign` vs. the
  shape buttons) and L32 (`sign` vs. the bulbs' read-out).
- **Change:** append at the end of `css/style.css`:
  ```css
  /* Inert information is flat; only pressable things cast a shadow. */
  .obj.obj-static { box-shadow: none; }
  ```
  (Same specificity as the card rules, so it must come after them.) Keep borders and colours.

### M2. Accent tokens fail text contrast in three themes
- **Where:** `css/style.css` theme blocks (lines 17, 37, 43).
- **What's wrong:** white on `--accent` (primary buttons such as "Next level", "Show me how",
  "I AGREE", the current map node numeral) is **3.88:1 in Ocean** and **4.11:1 in Sunset** (needs
  4.5 — these labels are 17 px bold). `--accent` as small text on paper (`.speaker` "Bossworth" at
  ~14.5 px, `.guide-note`, `.wrong-title` on `#fff0f0`) is 4.44 / 4.08 in Classic, 3.79 / 3.50 in
  Ocean, 3.77 / 3.72 in Sunset.
- **In flight:** the `.bubble .speaker` part is covered by the new `color-mix` rule; `.guide-note`,
  `.wrong-title`, `.cc-title` and every primary button are not.
- **Change:**
  - Classic `--accent: #e5243b` → `#d61e35` (white 5.13, paper 5.04, `#fff0f0` 4.63, stage 4.53).
  - Ocean `--accent: #e2502b` → `#c4401e` (white 5.12, paper 5.00, `#fff0f0` 4.63).
  - Sunset `--accent: #e8355f` → `#cf2850` (white 5.16, paper 4.72, `#fff0f0` 4.66).
  Art objects keep their fixed `#e5243b`; only the UI token moves. Update the token table in the
  bible (§5.1) when this lands.

### M3. `--good` text fails in Classic and Candy
- **Where:** `css/style.css` lines 20 and 31. Used by `.stamp-mini` ("found" on secret field notes),
  `.dare-result.ok`, white text on `.obj.hold-btn.done` (L14 "CHARGED"), `.day.hit` (Daily Dare).
- **What's wrong:** `--good` on paper 3.89 (Classic) / 4.16 (Candy); white on `--good` 3.96 / 4.35.
- **Change:** Classic `--good: #12925f` → `#0e8456` (paper 4.63, white 4.72). Candy `--good:
  #0f8a62` → `#0d8059` (paper 4.73, white 4.94).

### M4. Level 3 "PRESS ME" label is unreadable
- **Where:** `js/ui/art.js` `bigbutton` (line 139); level `js/levels/03-hands-off.js`, object
  `button` (green big button).
- **What's wrong:** white label on `#2bc46f` = **2.28:1** — fails even as large text. It is the
  single most important word on the stage (the temptation). Seen at all three viewports.
- **Change:** in `bigbutton`, pick the label colour per cap colour:
  ```js
  var labelFill = o.color === 'green' ? INK : '#fff';   // ink on #2bc46f = 7.45:1
  ... '<text x="100" y="99" text-anchor="middle" font-size="22" fill="' + labelFill + '">'
  ```
  (Blue stays white: 3.48 passes for this ~28 px label; red white 4.52.)

### M5. Reduced motion hides the chapter card completely
- **Where:** `css/style.css` `.chapter-card` (line 760, `animation: card-in 1.9s ease both`) and the
  global `.reduce-motion` clamp (line 467).
- **What's wrong:** with reduced motion the animation runs for 0.001 ms with `fill: both` and ends on
  its last keyframe, `opacity: 0`. The chapter name ("Chapter 2 — Mind Maze") is never shown to
  players who reduce motion. (The card is removed by `App.chapterCard` after 1900 ms anyway.)
- **Change:** add `.reduce-motion .chapter-card { animation: none !important; }`.

---

## Should fix

### S1. Sunset and the dark endings lose the ink shadows and outlines
- **Where:** `css/style.css` Sunset theme (line 41–46), `--shadow`/`--shadow-sm` (lines 52–53),
  hover/press shadows (lines 113–114, 328–329, 588), `.logo-obey` text-shadow (line 136),
  `.ending-chaos` / `.ending-secret` (lines 430–441). Screens: menu, map, every level in Sunset;
  chaos and secret endings in every theme.
- **What's wrong:** `--ink` on Sunset `--bg` is **1.32:1**, so the hard shadow — half of the house
  style — disappears behind every slip, chip, panel, bubble and the stage; the OBEY? logo loses its
  3D stamp. The same happens on the chaos stripes (`#1c1640`) and the secret-ending night sky.
- **Change:** give dark backgrounds a gold shadow outside the paper, ink shadow inside it:
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
  and replace the hard-coded `4px 4px 0 var(--ink)` / `1px 1px 0 var(--ink)` in the hover/press
  rules with `var(--shadow-hover)` / `var(--shadow-press)`. `#ffc145` on `#47205a` = 7.99:1.

### S2. Level 20 scale is drawn wrong and its label covers the left pan
- **Where:** `js/ui/art.js` `scale` (lines 356–363); `js/levels/20-weight-of-words.js` objects
  `scale`, `left`, `panlist`.
- **What's wrong:** only the beam rotates; the pans are lopsided triangles (apex not centred on the
  base) placed by a separate `dy`, so they float off the beam ends and read as two grey roofs. The
  `left` tag "HEAVY (5)" (10, 30, 30×9) sits on top of the left pan. Rendered outline 7.4 px (above
  the 6 px target). The tilt is the level's main feedback, so it must read instantly.
- **Change:** draw the pans hanging from the rotated beam ends:
  ```js
  scale: function (o) {
    var t = o.tilt || 0, a = t * 7 * Math.PI / 180, arm = 104;
    var lx = 150 - arm * Math.cos(a), ly = 30 - arm * Math.sin(a);
    var rx = 150 + arm * Math.cos(a), ry = 30 + arm * Math.sin(a);
    function pan(x, y) {
      return '<path d="M' + x + ' ' + y + ' L' + (x - 34) + ' ' + (y + 40) + ' M' + x + ' ' + y + ' L' + (x + 34) + ' ' + (y + 40) + '" fill="none" ' + SW3 + '/>' +
        '<path d="M' + (x - 44) + ' ' + (y + 40) + ' Q' + x + ' ' + (y + 66) + ' ' + (x + 44) + ' ' + (y + 40) + ' Z" fill="#c3ccd8" ' + SW3 + '/>';
    }
    return svg('0 0 300 150', '<path d="M150 30 L150 136 M110 140 L190 140" ' + SW3 + '/>' +
      '<path d="M' + lx + ' ' + ly + ' L' + rx + ' ' + ry + '" ' + SW3 + '/>' + pan(lx, ly) + pan(rx, ry) +
      '<circle cx="150" cy="30" r="8" fill="#ffd23f" ' + SW3 + '/>' +
      (t === 0 ? '<text x="150" y="118" text-anchor="middle" font-size="22" fill="' + INK + '">=</text>' : ''));
  }
  ```
  (Round the coordinates with `.toFixed(1)`.) In the level, move `left` to `O('left', 6, 44, 30, 9,
  …)` and `panlist` to `O('panlist', 62, 44, 30, 9, …)` so both labels sit *under* their pans.

### S3. Level 11 footprints: tiny numerals, and they stand on the wall
- **Where:** `js/ui/art.js` `footprint` (lines 245–249); `js/levels/11-silent-level.js` objects
  `fp0`–`fp3` (line 44).
- **What's wrong:** the order numerals are `font-size 16` in a 100-unit box under the shape:
  **≈ 12 px at desktop, ≈ 7 px at 390×844** — and "3" collides with the circle. The order is also
  carried by left-to-right position, so the level stays fair, but the numbers are unreadable on a
  phone. The footprints sit at y 58–64 %, above the floor band (74 %), so they read as wall stickers.
- **Change:** put the numeral inside the shape:
  `'<text x="50" y="' + (o.shape === '▲' ? 66 : 62) + '" text-anchor="middle" font-size="30" fill="#fff" stroke="' + INK + '" stroke-width="5" paint-order="stroke">' + o.n + '</text>'`
  and drop the old numeral; in the level use `y = 80 - (i % 2) * 4` and `w = h = 13`.

### S4. Stage text is below 12 px on phones; fine print is 9 px
- **Where:** `css/style.css` `.obj` font-size (line 300) and `.obj.fine-print` (line 360).
- **What's wrong:** at 390×844 the stage is 366 px, so `clamp(10.5px, 3.3cqi, 20px)` gives
  **11.88 px** for every plain card (measured on 38 objects in L2, L6, L7, L10, L13, L15, L18–L34,
  B101–B104: e.g. L26 `q-boss`, L33 `contract`, L20 `rule`). L14 `fine` renders at **9 px**.
- **Change:** `font-size: calc(var(--fx) * clamp(12px, 3.3cqi, 20px));` and
  `.obj.fine-print { font-size: max(11px, calc(.6 * clamp(12px, 3.3cqi, 20px))); }`. Re-run the
  overflow check at 390×844 and 320×700 afterwards (L26 question buttons and L33 contract are the
  tightest).

### S5. Unearned stars are nearly invisible
- **Where:** `css/style.css` `.node-stars .star-off` (line 187) and `.big-stars .star-off`
  (line 385).
- **What's wrong:** ink at 35 % / muted at 40 % gives **1.9–2.0:1** (1.11 on Sunset) — a 1-star
  result looks the same as a 3-star result at a glance on the map and the completion card.
- **Change:** `.node-stars .star-off { color: var(--muted); opacity: 1; }` and
  `.big-stars .star-off { color: var(--muted); opacity: 1; }` (outline-only star in `--muted` =
  7.1–7.9:1 on paper).

### S6. Locked map titles and the `.subtle` class fade below contrast
- **Where:** `css/style.css` `.node-locked .node-title` (line 192, opacity .6) and `.obj.subtle`
  (line 318, opacity .55; used only by L2 `corner`).
- **What's wrong:** locked titles are 4.46 (Candy), 4.00 (Ocean), 4.44 (Sunset) — below 4.5.
  `.subtle` stacks on the cobweb's own 35 % stroke opacity, so the secret corner is ~19 % ink.
- **Change:** `.node-locked .node-title { opacity: 1; color: var(--muted); }` (≥ 6.6:1);
  `.obj.subtle { opacity: .75; }`.

### S7. Coloured glyph buttons lack an edge
- **Where:** `css/style.css` `.obj.color-btn` (line 361) — L11 `btn-yellow`; `.obj.shape-btn`
  (lines 622–623) — L25 `green`, `orange`.
- **What's wrong:** white glyph on yellow `#ffc31f` = 1.61:1; green `#2bc46f` and orange `#ff8c1a`
  glyphs on paper = 2.24 / 2.29:1. The `text-shadow` only darkens the bottom edge.
- **Change:** `.obj.color-btn.yellow { color: var(--ink); text-shadow: none; }` (10.56:1) and
  `.obj.shape-btn { -webkit-text-stroke: 3px var(--ink); paint-order: stroke fill; text-shadow: none; }`.

### S8. Map node titles are cut off on phones
- **Where:** `css/style.css` `.node-title` at ≤ 520 px (line 498).
- **What's wrong:** at 390×844 titles truncate with an ellipsis: "The Missing B…", "Reverse
  Psych…", "The Waiting Ro…", "The Fake Tutor…", "Object Perman…", "The Suspicious…".
- **Change:** in the ≤ 520 px block: `.node-title { white-space: normal; overflow: visible;
  text-overflow: clip; max-width: 104px; text-align: center; line-height: 1.15; }`.

### S9. Level 25 mirror writing touches the frame on phones
- **Where:** `js/levels/25-mirror-mirror.js` object `mtext` (58, 14, 34, 28).
- **What's wrong:** at 390×844 "PRESS THE PURPLE" runs into the gold frame, so the one honest clue
  in the room is partly over the frame colour.
- **Change:** `O('mtext', 61, 16, 28, 24, …)` and add `--fx: .9` to `.obj.mirror-text`
  (`css/style.css` line 618).

### S10. Small fixed-colour labels
- **Where:** `css/style.css` `.medal-easy` (line 600), `.review-card .review-stars` (line 831);
  `js/ui/art.js` `mat` (line 174).
- **What's wrong:** map medal "E" white on bronze `#d08a4b` 2.83:1 (12 px text); Bossworth's review
  stars `#f5b400` on paper 1.81:1 (aria-label carries the value, but the stars are the visual);
  WELCOME mat `#6b5a3b` on `#c9a86a` 2.95:1 (L2 `mat` is an interactive object).
- **Change:** `.medal-easy { color: var(--ink); }` (5.99); mat text `fill="#4a3c22"` (4.74). The
  review stars are already switched to ink in the in-flight QA block — keep that (it beats the
  `#9a6b00` this review would otherwise suggest).

### S11. Level 21 clock: the hands hide "12"
- **Where:** `js/ui/art.js` `clock` (lines 364–371); L21 object `clock`.
- **What's wrong:** the minute hand runs to y 30 and the numerals sit on radius 70, so "12" (and
  "11"/"1" at desktop) is covered — and the hour is the puzzle.
- **Change:** minute hand `M100 100 L100 46`; hour hand `M100 100 L100 62`; numerals radius 72,
  font-size 17.

### S12. Sunset gradient bottom fails for small text
- **Where:** `css/style.css` line 82 (`… #c8506a 100%`).
- **What's wrong:** `--on-bg` `#fff3e8` on `#c8506a` = 4.0:1; long pages (achievements, map, Level
  footers "Stars on Medium…") land there.
- **Change:** last stop `#c8506a` → `#a8455f` (5.23:1). Same in `.theme-preview[data-theme="sunset"]`
  (line 228).

---

## Polish

### P1. Outline weights drift above the house range on big objects
`js/ui/art.js`. Measured rendered outline at a 640 px stage (target 3–6 px): L2 `exit` door 8.0 px,
L25 `mirror` 7.6, L20 `scale` 7.4, L22 `door` 7.2, L29 `remote` 7.1 / `tv` 6.9, L8 `crate` 6.8;
smallest L4/L6/L11 `jig-*` 2.3 px. Change: for `door`, `mirror`, `tv`, `remote`, `crate` use `SW3`
on the outer outline when the object is drawn wider than 30 % of the stage (pass `o.big` from the
level or check in the level file); give `jigsaw` `stroke-width="5"`.

### P2. Level 1 big button floats on the wall
`js/levels/01-red-button.js` object `red` (30, 28, 40, 40): its plinth ends at 68 %, above the floor
line (74 %). Change to `O('red', 30, 38, 40, 40, …)` so the base sits on the floor band (L3 `button`
already does: base at 86 %).

### P3. Map leaves half the desktop empty
`css/style.css` `.map-world { max-width: 540px }` (line 170). At 1365×900 the right 40 % of the map
column is empty. Change to `max-width: 640px`.

### P4. Secret ending quill is muddy
`css/style.css` `.ending-secret .quill-big` (line 440): yellow quill at 50 % over purple reads khaki.
Change `opacity: .5` → `.85`.

### P5. Level 36 "INTAKE" is unreadable
`js/ui/art.js` `machine` (line 307): `font-size="10"` in a 240-unit box (≈ 6 px on a phone). The
whole machine is the drop zone, so this is flavour, but it names the target. Change to a 64×26 plate
with `font-size="15"`.

### P6. Phone narrator is very small
`css/style.css` ≤ 520 px `.narrator-btn { width: 74px }` (line 489). Moods (brows, pupils) are hard
to read at 74 px. Change to `84px`.

### P7. Hint count disappears on phones
`css/style.css` line 491 hides chip labels ≤ 520 px, so "Hint (3)" becomes a bare bulb. Add a 18 px
`--accent-2` count badge to `#hint-btn` (ink text, 2 px ink border, top-right).

### P8. Off-palette browser theme colour
`index.html` line 9 and `manifest.webmanifest` `theme_color`: `#ff4f6d` is not a palette colour.
Change to `#e5243b` (or `#d61e35` once M2 lands).

### P9. Docs say "7 moods"
`ASSETS.md` and the header comment of `js/ui/art.js` say 7 moods; the game has 8 moods plus the
`sleep`, `gag` and `potato` overlays. Update both.

### P10. Bonus 104 sign wraps on phones
`js/levels/b4-tip-top.js` object `label` ("POINTY END UP", `sign-card`, `--fx` 1.6) breaks onto two
lines at 390×844 ("POINTY END / UP"). Add `.obj.sign-card { --fx: 1.35 }` under `@media (max-width:
520px)`; the object is already 42 % wide.

### P11. Composure bar colours are weak for colour-blind players
`css/style.css` lines 723–724: calm → meltdown ΔE 16.9 (protan) / 15.1 (deutan). The word ("calm",
"frazzled") is printed next to it, so this is fair; for polish, add a stripe pattern to `frazzled`
and `meltdown` (`background-image: repeating-linear-gradient(-45deg, transparent 0 6px,
rgba(0,0,0,.18) 6px 12px)`).

---

## Top 10 (in order)

1. **M1** Static cards look like buttons (19 levels; B101's puzzle depends on telling them apart).
2. **M2** Accent tokens: primary-button text 3.88 (Ocean) / 4.11 (Sunset); small accent text fails
   in Classic, Ocean, Sunset.
3. **M4** L3 "PRESS ME" white on green 2.28:1.
4. **M3** `--good` text 3.89 (Classic) / 4.16 (Candy).
5. **M5** Reduced motion hides the chapter card.
6. **S1** Sunset and dark endings lose the ink shadows (1.32:1).
7. **S2** L20 scale pans detached from the beam; label covers the left pan.
8. **S4** Stage text 11.9 px and fine print 9 px on phones.
9. **S3** L11 footprint numerals ≈ 7 px on phones; footprints on the wall.
10. **S5** Unearned stars at ~2:1 — star ratings unreadable at a glance.
