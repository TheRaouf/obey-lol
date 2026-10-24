# Art review 2.4.1: open art items after 2.4

Scope: the open SHOULD/POLISH items of `docs/ART-REVIEW-2.4.md`, bible §18 (known follow-ups after
2.3) and the partial E98 of `docs/ART-REVIEW-2.3.md`. Three art groups and two level groups work in
parallel; each group appends its own section below.

| Group | Files |
|---|---|
| Art 1 | `js/ui/art.js`, `art-extra.js`, `screens.js`, `css/style.css`, `art-pack-a.js` … `art-pack-e.js` |
| Art 2 | `art-pack-f.js`, `art-pack-g.js`, `art-pack-h.js` |
| Art 3 | `art-pack-i.js`, `art-pack-j.js` |
| Levels | `js/levels/*.js` |

## Canonical drawings for cross-pack duplicates (2.4 SHOULD 7, 2.3 E98)

Rule (bible §15): one drawing per object. A duplicate key stays registered (so no level file changes)
and its function becomes a one-line redirect:

```js
add('f-coin', function () { return A.object('coin', { v: '£1' }); });
```

`A.object(key, opts)` is `OBEY.art.object`. The canonical drawings below are all owned by art group 1
(base `art.js`, `art-extra.js`, packs A–E), so groups 2 and 3 only write the redirect and do not have
to wait for each other. Every option named below exists in the canonical drawing. Where a level box
was sized for the old drawing, the canonical keeps the old viewBox in that mode, so positions do not
change.

### Redirect (same object)

| Object | Canonical key (file) | Redirect, exactly | Owner of the redirect |
|---|---|---|---|
| coin | `coin` (new, `art-extra.js`; the `i-coin` drawing: `v` numeral, `cap` bottle cap, 100×100) | `f-coin` → `A.object('coin', { v: '£1' })`; `i-coin` → `A.object('coin', o)` | Art 2 (f), Art 3 (i) |
| hammer | `hammer` (new, `art-extra.js`) | `h-hammer` → `A.object('hammer', { hook: true })` (200×200, hangs from a drawn wall hook: fixes 2.4 SHOULD 4 for L189); `i-hammer` → `A.object('hammer', { lying: true })` (160×120, lies flat) | Art 2 (h), Art 3 (i) |
| oven | `b-oven` | `f-oven` → `A.object('b-oven', { on: true, croissants: o.full !== false })` | Art 2 |
| jar | `b-jar` (`d-jar` already redirects) | `h-jar` → `A.object('b-jar', { fill: o.color \|\| '#ff6f91', lid: '#fffdf6', label: true })` | Art 2 |
| tin | `b-tin` | `f-tin` → `A.object('b-tin', { word: o.word \|\| 'BEANS', color: o.color })` (word mode keeps the 120×140 f-tin viewBox, so the L135 stack does not move; the word is drawn larger: 2.4 SHOULD 8) | Art 2 |
| chair | `a-chair` (`e-chair` already redirects) | `j-chair` → `A.object('a-chair', { legs: true })` (four legs, 150×200 viewBox = the j-chair 0.75 aspect) | Art 3 |
| plug (mains) | `a-plug` | `f-plug` → `A.object('a-plug', { lying: true })` (140×80 viewBox, prongs left, cable right, as f-plug) | Art 2 |
| framed photo | `a-photo` | `b-frame` → `A.object('a-photo', { subject: 'person', tall: true })` (120×140) | Art 1 (done) |
| Bossworth portrait | `a-portrait` (draws the real narrator) | `h-bossportrait` → `A.object('a-portrait', { costume: 'royal', bg: '#7fb2ff', frame: '#f5b400', scorched: o.scorched })` (the king is Bossworth in the royal costume, on-model) | Art 2 |
| rubber duck | `b-duck` | `d-duck` → `b-duck` | Art 1 (done) |
| sofa | `b-sofa` | `d-sofa` → `b-sofa`, bottom-anchored | Art 1 (done) |
| torch | `b-torch` | `c-torch` → `b-torch` with the yellow lens | Art 1 (done) |

### Kept separate on purpose

| Keys | Why they stay separate |
|---|---|
| `j-coin` vs `coin` | Two-sided toss coin; the heads face vs tails swirl is the L217 tell. Same gold and rim as `coin`. |
| `h-rock` vs `i-rock` | `h-rock` is a draggable boulder (highlight, lift); `i-rock` is inert seabed terrain with an empty label. Interactive and inert must not look alike (§16). |
| `h-oven` vs `b-oven` | A castle stone bread oven with an arched door (L182), a different object. |
| `e-jar` vs `b-jar` | A close-up whose countable jellybeans and frog are the L124 tell. |
| `i-tin` vs `b-tin` | An open sardine tin seen from above (L204), a different object. |
| `b-sink` vs `g-sink` | Kitchen sink in a worktop (L66 washing-up) vs a pedestal washbasin (L165). |
| `b-soap`, `g-soap`, `c-soap` | Washing-up liquid bottle (L66), wall soap pump (L165), bar of soap (L85): three objects. |
| `e-podium` vs `j-podium` | Quiz-show lectern vs winners' 1-2-3 steps. |
| `b-fridge` vs `f-fridge` | Home fridge with door states vs open shop chiller; the raised back row is the L134 tell. |
| `b-plug` vs `a-plug` | Bath plug on a chain, not a mains plug. |
| `a-desk` vs `g-desk` | Office desk with drawers vs school desk on a frame. |
| `e-photo` vs `a-photo` | Photo-finish print; the numbered runners are the L123 tell. |
| `e-portrait` vs `a-portrait` | Not Bossworth; the eyes that follow are the L126 tell. |
| `a-tray`, `e-tray`, `f-tray` | Office in-tray, waiter's oval tray, bakery tray of croissants. |
| `c-magnet` vs `d-magnet` | Horseshoe magnet vs bar magnet whose S/N letters are the L100 tell. |
| `c-balloon` vs `d-balloon` | Hot-air balloon vs party balloon. |
| `a-stamp` vs `c-stamp` | Rubber stamp vs postage stamp. |
| `b-stool` vs `d-stool` | `d-stool` has the broken leg, the tell. |

Checked and left for 2.5 (similar but not the same drawing problem): spoons (`b-spoon` metal,
`d-spoon` wooden, `j-spoon` race spoon), `shelf` vs `h-shelf` (different aspect), `crate` vs
`j-crate` (portrait "NOTHING" crate vs landscape stamped crate), `bin` vs `h-bin`, `basket` vs
`h-basket`, the three postcards and three windows (each carries different information).

## Group 2 (art packs F, G, H)

Files: `js/ui/art-pack-f.js`, `js/ui/art-pack-g.js`, `js/ui/art-pack-h.js`. Every art key is kept.
Type sizes are measured in the browser at 390×844 (366 px stage) as font-size × screen CTM.

| Item | Status | Change |
|---|---|---|
| POLISH 3 | done | `f-shopper` face `#ffd9b0` → `#ffe066` (the `h-guard` face colour). F–H have no off-bible hex now. No "figure skin" entry is needed in §3.3. |
| POLISH 4 | done | `g-band`: the 16-unit ink stroke with an 8-unit red stroke on top is now an even-odd red ring (outer 44×28, inner 33×17) with the house `SW` outline and one .5 highlight. It goes through the outline normaliser now. |
| POLISH 5 | done | `h-dragon` asleep: the Bagel `<text>` "z" at .75 is now two Z paths (18 and 11 units, `SW`, full ink). They are drawn after the face flip, so a left-facing dragon (L186) never shows a mirrored z. Note: the narrator's `sleep` overlay in `art.js` is still `<text>`, so the bible should name this dragon as the path reference. |
| SHOULD 8 | partial | `f-cereal` (L136): window 76×52, letter 34 → 42 units, **11.2 → 13.8 px**. `f-lunchbox` (L145): "B" 36 → 48 units, **10.2 → 13.6 px**. Also `f-nozzle` (L151, U/D; not in the list): disc r 16 → 19, letter 22 → 28 units, **11.5 → 14.7 px**. `f-tin` now redirects to `b-tin` (SHOULD 7). At the time of writing `b-tin` sets BEANS at 28 units = **11.7 px** on L135, still under 12; SOUP passes. **Group 1:** `b-tin` word mode needs fs ≥ 29 for 5 letters. Use `Math.min(30, Math.floor(150 / len))` (BEANS 30 = 12.6 px; the `textLength` clamp keeps it on the plate). The `f-tin` fallback in pack F already does this, on a 108-unit plate. |
| SHOULD 4 | done in art; L151 and L178 need level changes | `h-horn` (L185): a wood wall plate, a peg and a cord. `f-fob` (L149): the ring hangs on a peg on a wood plate. `h-decree` (L178 `oldletter` and `decree`): hangs by a cord from a nail. Each is on by default; `hook: false` / `hung: false` turns it off. `h-hammer` (L189) redirects to `hammer` `{ hook: true }`. New opt-in options: `h-seal` `cased: true` (a glass case on a bracketed wall shelf; the seal is drawn at .74, so the K is 15.6 px at 366) and `f-pump` `holsters: true` (two grey cups on the pump's right side at viewBox y 80–106 and 160–186; the hose moves below them). |
| SHOULD 7 | done | These now redirect in the `e-chair` style (`if (A.hasObject(k)) return A.object(k, …)`, with the old drawing as fallback): `f-coin` → `coin {v:'£1'}`; `f-tin` → `b-tin {word, color}`; `f-oven` → `b-oven {on:true, croissants: o.full !== false}`; `f-plug` → `a-plug {lying:true}`; `h-hammer` → `hammer {hook: o.hook !== false}`; `h-jar` → `b-jar {fill: o.color, lid:'#fffdf6', label:true}`; `h-bossportrait` → `a-portrait {costume:'royal', bg:'#7fb2ff', frame:'#f5b400', scorched}`. These stay separate as the table says: `h-rock`, `h-oven`, `g-sink`, `g-soap`, `f-fridge`. |
| POLISH 6, 9 | n/a | Packs I and J only. |

Level changes needed (level agents):
- **L178** `oldseal`: add `cased: true` to `artOpts` (`{ letter: 'K', mirror: true, cased: true }`), so
  the drawing matches its label, "in a glass case", and stands on a shelf instead of floating.
- **L151** (holster the nozzles, SHOULD 4): give `pump` `artOpts: { holsters: true }`, then hang the
  nozzles on the pump's right side in the cups: `nU` → x 21, y 32.5 and `nD` → x 21, y 47.5 (w 16,
  h 20.4 unchanged; they no longer overlap each other). A preview with these values was checked at
  1180×900. The `U: Unleaded` / `D: Diesel` tags can stay where they are, or move left to x ≈ 40 to
  sit beside their nozzles.
- **L172** `band`/`pencils`, **L138** `last`, **L182** `cake`, **L175** `g1`/`g2` (POLISH 2): small
  floats, fixed by position only. No art change.

Notes for group 1 (their files):
- `b-tin`: see SHOULD 8 above.
- `b-oven {croissants}` (L138, where the croissants are the tell): the three croissants are `#f5b400`
  on the `#ffd23f` window at scale .36, smaller than the old `f-oven` .45. They read by outline
  only, about 22 px wide at 366. Use scale .44, or a `#ffe066` window behind them.
- `a-portrait {costume:'royal'}` (L182) draws a purple Bossworth, while the narrator next to it is
  orange in the classic costume. If royal is meant to be purple, record that in §2.1. If not, fix the
  costume tint.

Verification:
- `node tools/level-lab.js js/levels/133…192 --art js/ui/art-pack-a.js … -j.js --fit`: **60 levels,
  2849 checks, 0 problems; fit check 0 problems.**
- `tools/art/strokes.js --levels 133-192`: 291 objects, 95.9 % in 3–6 px, nothing outside 2.5–7 px.
- `npm test`: 1265 pass. `tools/check.js`: only `sw.js is out of date`.
- Before/after screenshots at 1180×900 were checked for L133, 135, 136, 138, 141, 144, 145, 149,
  151, 152, 172, 178, 181, 182, 185, 186, 189 and 190, and phone shots at 390×844 for L135, 136
  and 145.

## Group 3 (art packs I, J)

| Item | Status | Change |
|---|---|---|
| 2.4 S1 dark sea rooms | done in art; L193, L197 need a level option | `i-deep` draws a rock-grey `#8a86a8` seabed from 74 % down (gentle dune top edge, ink `.8` line; nothing drawn inside it). Ink on `#8a86a8` ≈ 4.9:1 (on `#2d2850` ≈ 1.2:1), so press shadows and card borders read again. New options: `bed` (top of the band in %) and `nobed`. Silt specks stay above the band. L209 (deck over it), L210, L211: control rows now sit on the band. |
| 2.4 S9 sea decor in the control row | done | `i-sea`: sand dashes removed (the bed is plain `#f3d998`); the four glints moved to (12,10), (58,10), (84,30), (26,34), positions measured in every `i-sea` room (L194–L208) to be clear of or fully under cards. |
| 2.4 S8 OSTRICH label | done | `j-crate` stamp plate 176 × 62, type 34 units (was 156 × 54, 28); words over 6 letters are held to 160 units with `textLength`. OSTRICH = 13.0 px at a 360 px stage. |
| 2.4 S4 hooks / floating props | done (own drawings) | `j-refcard` is drawn 16 units lower, so the leaning card's corner rests on the box floor (L218 bench). `i-hammer` now lies flat via the canonical `hammer`. |
| 2.4 S7 duplicates | done | `i-coin` → `A.object('coin', o)`; `i-hammer` → `A.object('hammer', { lying: true })`; `j-chair` → `A.object('a-chair', { legs: true })`. Each keeps its old drawing only as a fallback when the canonical pack is not loaded (the `e-chair` pattern). `j-coin`, `i-rock`, `i-tin`, `j-podium` kept separate as the table above says. L203 cap tell and L224 chair checked on screen. |
| 2.4 P4 bespoke ink strokes | done | `i-coral` and `i-weed` are colour fills with an `SW` outline, built by a local `tube()` helper (tapered tube along quadratic curves, round tip). Coral: four fingers and two twigs on an `#8a86a8` rock, one `.5` highlight. Pack I/J outlines now 2.57–6.96 px, nothing outside 2.5–7 px. |
| 2.4 P6 white water lines | done | `i-buoy` waves and `i-trawler` wake `.7` → `.55`; `i-blowhole` spray `.8` → `.55`. |
| 2.4 P9 L212 whale | done | `i-whalebelly`: wall = `var(--stage)` under `#ff77b4` at `.45` (soft pink in every theme); ribs solid `#ff6f91`, the tongue-band pink. |

Level changes needed (level owners):
- **L193** `sea`: add `artOpts: { bed: 57 }`, so the Ping row (y 60–72) also sits on the seabed, not only
  the Steer row. Today the Ping buttons are still on `#2d2850`.
- **L197** `sky`: add `artOpts: { nobed: true }`. It uses `i-deep` as a night sky 62 % tall, so the
  default band shows as a grey strip at 46–56 % behind the sub and the lighthouse rock.

Bible follow-ups (for the bible owner): record the `i-deep` seabed (`#8a86a8`, 74 %, `bed`/`nobed`) next
to the dark-room shadow rule; the `i-sea` glint rule (decor only at y ≤ 34 of the backdrop, nothing in
the bed); the `tube()` construction for coral/weed; `i-whalebelly` as the one backdrop tinted over
`--stage`.

Verification:
- `tools/level-lab.js` L193–L232 with packs A–J, `--fit`: 1876 checks, 0 problems; fit 0 problems.
- `tools/art/strokes.js --levels 193-232`: 149 objects, 96.0 % in 3–6 px, nothing outside 2.5–7 px.
- `npm test`: 1265 pass. `tools/check.js`: only `sw.js is out of date`.
- Before/after sheets at 1180×900 for L193–L213, L218, L224; close-ups of L193 (390×844), L197,
  L205 coral, L212.

## Group 1 (base art, packs A–E, map screen)

Files: `js/ui/art.js`, `js/ui/art-extra.js`, `js/ui/art-pack-a.js` … `art-pack-d.js`,
`js/ui/screens.js`. `css/style.css` is unchanged (see SHOULD 1 below). Every art key is kept. Default drawings are unchanged except `water` (glare .8 → .55) and `b-torch`
(now always draws its lens: pale `#e9eef5` off, `#ffd23f` on or with `lens`).

| Item | Status | Change |
|---|---|---|
| §18 `table` tall | done | `table` `{ tall: true }`: the top is drawn at the top of the box at the normal 200-unit scale (`xMidYMin meet`), with a `#9a6b3f` apron and two 12-unit wooden legs (`SW3`) that run past the viewBox and are clipped at the bottom of the box (`overflow:hidden` on that svg only). The legs therefore always reach the box bottom: **set the box from the table top down to the floor line (y + h ≈ 75)**. The default `table` drawing is unchanged. A tall table gets no contact shadow (`_ground` only takes `xMidYMid` art); its legs end on the floor line instead. |
| §18 L65 taps/bath gap | done in art; L65 **and L68** need new boxes | `b-bathtub` viewBox `0 0 300 200` → `14 54 272 146` (rim line 4.1 % down the drawn height, feet at 100 %). `b-taps` `0 0 200 160` → `30 6 140 96` (tap plate ends at 95.8 % of the drawn height, spout 85.7 % across; running water falls below the box, art overflow is visible). Boxes below. |
| §18 L73 umbrella stand | done in art; L73 needs the swap | New `c-umbrellastand` (100×150, the `bin` box): glazed `#3a86ff` pot, `#2f6fe4` rim and foot ring, `#1c1640` mouth, a `#fffdf6` wave band, one .5 highlight. `c-umbrella` gains `stand: true` (closed, stored tip-down with the hook up). |
| §18 map labels | done | `screens.js` `regionLabel()`: the label goes beside one of the chapter's own nodes (24 units above its centre, level with the disc), on the side with room. Rows are tried top-down, the side away from the node first. It must clear `NODE_R` = 44 units from the node centre (a 48 px disc plus badges on the 0.74-scale 320 px map). If the name plus "★ Tier" does not fit on one line, the tier goes on a second `tspan`. If the name alone does not fit anywhere, the font shrinks (floor 14 units); no chapter needs this today. The icon moves with the label; the watermark corner logic is unchanged. "10. Filing Fjord" now sits left of node 37. |
| 2.4 SHOULD 7 / 2.3 E98 | done | The canonical table is at the top of this file. New canonical keys: `coin` and `hammer` in `art-extra.js`. New options: `b-oven` `croissants`, `b-jar` `fill` / `label`, `b-tin` `word` / `color`, `a-chair` `legs`, `a-plug` `lying`, `a-photo` `tall` / `subject`, `a-portrait` `costume` / `crown` / `bg` / `frame` / `scorched`, `b-torch` `lens`. Redirects in group 1 files: `b-frame` → `a-photo`, `d-duck` → `b-duck`, `d-sofa` → `b-sofa` (bottom-anchored), `c-torch` → `b-torch {lens}`. |
| Group 2 requests | done | `b-tin` word size `Math.min(30, Math.floor(150 / len))`; the `textLength` clamp is now 88 units at a 0.62 em estimate (BEANS 30 units ≈ 12.8 px at L135, SOUP 30). `b-oven {croissants}`: scale .44 and a `#ffe066` window behind them. `a-portrait {costume:'royal'}`: **King Bossworth is orange.** He uses the classic body with the royal crown (the narrator's crown path), so he matches the narrator next to him. Purple stays the royal *costume*, not the portrait. |
| 2.4 POLISH 7 | done in art; L173 needs the option | `water` gains `edge: true`: a 3 px non-scaling ink outline. The glare line on every `water` is now at the .55 cap (was .8). |
| 2.4 SHOULD 1 | left to group 3 | Group 3's `i-deep` seabed band (`#8a86a8`, ink shadows ≈ 4.9:1) fixes it in art. A CSS `#ffc145` dark-room shadow was tried and removed: on that seabed it would drop to ≈ 1.9:1. |
| 2.4 SHOULD 3, 5, 6, 8 (L148 door sign) | level files | No art change needed. `doorSign` already sizes the plate to one short word ("ALARM"). |

### Level changes needed (level agents)

- **Tall tables:** `artOpts: { tall: true }` on the bench-height tables (L17 `legs`, L41 `desk`, L43
  `mfdtable`, L53 `stand`, L95 `bench`, L115 `table`, and any other table whose top is mid-wall).
  Then extend the box down to the floor: `h = 75 − y` (for example, L53 `stand` 4, 56, 30, 8 → 4, 56,
  30, 19). Width and top stay as they are.
- **L65:** `tub` → `O('tub', 4, 41, 62, 34, …)` and `taps` → `O('taps', 22, 22.4, 30, 20.6, …)`. Drawn
  result: the tub spans 41.4–74.7 % with its rim at 42.7 %, and the tap plate sits on the rim (42.1 %).
  The spout is over the tub at x ≈ 47.7 %, and the running water falls into the bath. List `taps`
  after `tub` so the tub's rim stroke does not cut the plate.
- **L68:** the old boxes now put the taps behind the tub, so this change is required.
  `tub` → `O('tub', 7, 51.5, 56, 30, …)` (the same drawing and place as before) and `taps` →
  `O('taps', 6, 41.5, 16, 11, …)`, listed after `tub`.
- **L73:** `stand` → `art: 'c-umbrellastand'`, box `8, 66, 16, 24`, listed **after** `brolly` (it is
  static, so it never takes taps, and its front hides the umbrella's tip). `brolly` → box
  `6, 48, 20, 26`, `artOpts: { open: false, stand: !s.brolly }`.
- **L173:** `moat` → `artOpts: { edge: true }`.

### Verification

- `node tools/level-lab.js` (39 levels using the changed art: 17, 33, 34, 36, 41, 43, 45, 50, 53–56,
  65–68, 72, 73, 85, 94–96, 100, 115–117, 124, 126, 133, 135, 138, 144, 152, 173, 182, 189, 198, 203,
  224; packs A–J; `--fit`): 1847 checks, 0 problems. The fit check reports 3 problems, all on L17 `chest`, a `tag-card` with
  `text: ' '` (a single space). That is a text card, not art, and not from these changes.
- Map, all 236 levels done and Gold cups (the longest labels), at 1180×900, 820×1180 and 390×844: no region label or
  icon touches a node disc, title or stars. At 320×700 no label covers a disc. Some two-line labels
  touch a neighbouring node's title or stars there; at that width the nodes already overlap each
  other.
- `tools/art/strokes.js` on L34–L135 samples: only the known `b-ants` exceptions are outside 2.5–7 px.
- `npm test`: 1265 pass. `tools/check.js`: only `sw.js is out of date`.
- Screens looked at: object sheets of every canonical and redirect; mock stages of L65, L68 and L73
  with the boxes above; in-game L65, L68, L135, L138, L182, L193, L72 and L173 at 1180×900.

### Bible follow-ups (for the bible owner)

- §3.1/§3.2: `table {tall}` and its box rule (y + h ≈ 75); `c-umbrellastand`; `coin` and `hammer`
  as base keys; the option list above; `water {edge}`.
- §2.1: King Bossworth (`a-portrait {costume:'royal'}`) is orange with the royal crown, not purple.
- §15: add the 2.4.1 redirects to the reuse list (`f-coin`, `i-coin`, `f-tin`, `f-oven`, `f-plug`,
  `h-hammer`, `i-hammer`, `h-jar`, `h-bossportrait`, `j-chair`, `b-frame`, `d-duck`, `d-sofa`,
  `c-torch`). Add the rule that a redirect whose canonical has a different aspect either keeps the old
  viewBox in an option mode or is bottom-anchored (`xMidYMax meet`).
- §18: the four art items are closed. A new item: at 320 px the map nodes overlap each other.

## L2 (levels 173–232)

Layout and text only. No puzzle logic, solution, check, level id, number, object id or interactivity
changed. New objects are static display signs (`rulesign`, `signhead`); every rule keeps its full
sentence in `label`, and the existing ids now hold the body-text card.

| Item | Status | Change |
|---|---|---|
| S2 long display signs | done | A short `sign-card` plus an `honest-card` with the sentence. L195 "HARBOUR RULE" + `rule` card; L200 "FERRY RULES" + `rule`; L213 "RACE RULE" + `rules`; L215 "LONG JUMP" + `rules`; L219 "OWN GOALS" + `sign`; L221 "HOUSE RULE" + `rule`; L223 "DOMINO RALLY" + `sign`; L231 "SPORTS DAY CUP" + `sign`. L230: no room for a second sign under the medal table, so `rule` is one full-width `honest-card` (4, 31, 92, 10.5). Body text shortened only where the sign now carries the lead-in (L213 "The egg must stay on a spoon.", L215 "Measure to the mark NEAREST the board.", L221 "All scores go on the official card.", L223 "Ring the bell! Each domino knocks over the next.", L231 "Engraved with the winner's name.", L195 "Coming in: RED cans on your RIGHT, GREEN cones on your LEFT."). |
| S3 `btn-card small` | done | `small` dropped: L216 `clear`, L218 `ask`, L225 `resign`, `flip`. |
| S4 floating props | done | L185 `horn` and L189 `hammer`: hooks now drawn by group 2, positions unchanged. L178 `oldseal` → `cased: true` (glass case on a shelf, group 2); `oldletter` hangs from its drawn nail. L218 `red` y 48 → 50.5 and `whistle` y 52 → 55: both rest on the bench top (drawn bottom 65.7 / 65.5 vs bench 65.8). |
| S5 intern scale | done | 15–16 % drawn, feet 74–75 %: L174 `you` (h-visitor) 6,48,28,28 → 11,57,18,18; L177 14×24 → 7.5,59,11,16; L180 → 9,56,20,20 (17 % including the cushion); L216 `you` box → 8.5,59,11,16; L232 → 7.5,58.5,11,16. |
| S8 L185 OUT sign | done | `door` 82,50,16,26 → 80,44,18,32 (sign type ×1.3, about 13.4 px at a 366 px stage). L213 crate: type enlarged in `j-crate` by group 3; object unchanged. |
| S1 / S9 follow-ups | done | L193 `sea` `artOpts: { bed: 57 }`; L197 `sky` `artOpts: { nobed: true }`. |
| P2 small floats | done | L175 `g1`/`g2` y 46 → 49 (feet 75.3); L182 `cake` y 50 → 53 (on the table top); L204 `tin` and `f1–f4` y 34 → 36.5 (on the table); L200 `keeper` y 48 → 50.5 and boat passengers y 46 → 49.5 (stand in the boat). |
| P7 L173 moat | done | `moat` `artOpts: { edge: true }` (group 1's ink edge). |
| Extra | done | L182 `warn` 4,4,46,14 → 4,3,46,16: the sign touched its edge at 390 px. |

Verification:
- `node tools/level-lab.js <24 touched files> 189 --art <packs a–j> --fit`: 25 levels, 1169 checks,
  0 problems; fit 0 problems.
- `npm test`: 1265 pass. `tools/check.js`: only `sw.js is out of date` (run `node tools/gen-sw.js`).
- Range spill probe (2 px slack): clean at 390×844, 820×1180 and 1180×900. At 320×700 the new short signs
  sit on the fitter's 1 px tolerance (−0.8 px vertical at the 19.2 px cap), and the rest are
  pre-existing 2.3-baseline cards (L174 `list`, L218 `rules`, L230 header row, L215 plaques at 11.6 px).
- Before/after stage shots of every touched level, plus mid states for L173, L200, L216 and L230.

Left open: L189 `owl` perch still hangs on the wall with no bracket (not in the review list). L230
`h3` "Bronze" is 0.5 px from its edge at 320 px (baseline).

## L1 (levels 1–172, 233–236)

Positions, sizes, stacking order, `artOpts` and three short visible strings only. No solution, id, num or
interactivity change, except the two `api.nope()` calls marked below.

| Item | Status | Change |
|---|---|---|
| S2 long display signs | done | L150 `sign` → "TROLLEY LINE" (44, 31, 36, 11) on the post + new static `rule` `honest-card` "Trolley wheels lock past the yellow line." (38, 44, 48, 11). L153 `rule` → "CLASS RULE" (66, 4, 30, 9) + new static `ruleText` `honest-card` "Hands up. / No shouting out." (66, 14.5, 30, 13). Full sentences stay in each sign's `label`; the body cards have `label: ''` (aria-hidden, no double reading). |
| S4 floating hand props | done | L149 `fob` hangs on the `f-fob` peg; y 3 → 5 so the peg clears the stage edge. L151: `pump` (2, 15.8, 36.2, 59.5) `holsters: true`, listed after the nozzles so the cups draw over the grips; `nU` (27.4, 26.4) and `nD` (27.4, 47.1), size 16 × 20.4 unchanged (14.6 px letters); tags `tU`/`tD` x 45; `hand` status tag (68, 49, 26, 9) above the car. The coordinator's positions (pump unchanged, nU y 32.5 / nD y 47.5) overlapped the two nozzle hit boxes by 5.4 %; the larger pump gives 20.7 % between cups, enough for both. |
| S6 / P8 L150 | done | `trolley` 26 × 21 → 16 × 13 at (10, 71), wheels still on 84 %. `line` → (54, 78, 22, 5): a flat yellow tile on the floor band, clear of the post. |
| S8 L148 / L135 / L136 / L145 | done / n.a. | L148 `fire` door sign "FIRE EXIT" → "ALARM" (22 units, 13.4 px at 366); the `alarm` tag now reads "Fire exit: alarm will sound". L135/L136/L145 are fixed in the art by group 2; no object had to grow. |
| P1 L134 | done | `XS` 12/40/68 → 16/40/64; back row y 33 → 25.5 (drawn bottom on the shelf line at 48.8 %); front row y 46 → 47 (on the bottom line). `b2` now ends at 81.7 %, inside the liner (83.4 %); `f0` no longer pokes past the left liner either. |
| P2 small floats | done | L138 `last` y 49.5 → 51.3, `tray` 49.5 → 51 (on the case top). L142 per-item `dy` (bread 2.2, eggs 2.5, cakes 1) so every item ends on the belt top; placed `bar` y 52 → 55. L147 `stand` → `table {tall}` (h 15, legs to 75). L172 `desk` (10, 69.5, 50, 27.5), aspect-exact, with `pencils` (11, 56.6, 18, 15.75), `band` (29.5, 63.8, 11.5, 9.7), `paper` (40, 47.5, 20, 25.5) on its top and `tip` (10, 78, 50, 13) on its front. |
| §18 tall tables | done | `artOpts: { tall: true }` with h = 75 − y: L17 `legs`, L41 `desk`, L43 `mfdtable`, L53 `stand`, L95 `bench`, L147 `stand`, and L94 `bench` (also short by 3 %; not on the list). L115 `table` keeps h 18.5 (legs to 80.5), because h 13 would make the box wider than 5:1 and shrink the table top. Not changed: L34 and L66 use `table` as a wall shelf above other objects; other tables already reach the floor. |
| §18 L65 / L68 | done | Group 1 extents: L65 `tub` (4, 41, 62, 34), `taps` (22, 22.4, 30, 20.6) after the tub; L68 `tub` (7, 51.5, 56, 30), `taps` (6, 41.5, 16, 11) after the tub. **Exception:** on L65, `taps` overlaps the tub's drop-only zone by 2 % (taps on top). The bath drawing has a 1.7 % empty top margin, so the plate can only sit on the rim if the boxes overlap; with h 18.6 the plate hovers 2 % above the rim. |
| §18 L73 | done | `stand` → `c-umbrellastand` (8, 66, 16, 24), after `brolly`; `brolly` (6, 48, 20, 26) `stand: !s.brolly`. |
| 2.3 E51 L119 | done | `curtainL`/`curtainR` moved to the front of the object list, so every card draws above them. |
| Lab notes L233–L236 | done, 1 left | `trick` copied from `X.TRICKS`. `checks`: L233 agree (fail), flap before Clause 9 ×2 (nope); L234 two wrong answers (fail); L235 answer before the gears (playing), search Bossworth twice (nope); L236 press OBEY (nope), let go of the wrench early, drop the fuse on the floor (playing). **Feedback added:** L235 and L236 had no trap or nope at all, so a second search of Bossworth (L235) and pressing OBEY (L236) now call `api.nope()`. Both are already documented in `wrong`; nothing else changed. **Left open:** L236 `alternatives.secret` is not a data mistake. It needs `allSecrets`, which `tests/unit/levels.test.js` passes in (`normalizePath`) but `tools/level-lab.js` does not, so the lab reports it. Fix it in the lab (tools owner), not in the level. |
| L17 lab notes | done | Added `trick` and `checks` (drawer 3: nope; sock to Bossworth: nope). `chest` text ' ' → '' (the fit check flagged the single space). |

Visible text changes: L148 door sign "FIRE EXIT" → "ALARM", and the tag "ALARM WILL SOUND" → "Fire exit: alarm
will sound". L150 sign → "TROLLEY LINE", plus a body card with the old sentence. L153 sign → "CLASS RULE", plus
a body card "Hands up. / No shouting out.". None of these strings is used in `tests/`.

Verification:
- `node tools/level-lab.js` on the 25 touched files with packs A–J and `--fit` gives **1158 checks, 1 problem
  (the L236 lab gap above); fit 0 problems**.
- `npm test`: 1265 pass. `tools/check.js`: only `sw.js is out of date`.
- Hit boxes: no interactive objects overlap and none is under 9 % in the touched levels, at the start and
  after the first solution step. Two exceptions: L65 (above), and L148 `doors`/`beam`, which is an original
  design (the beam zone sits inside the doors) and was not touched.
- Before/after stage shots at 1180×900 of every touched level, plus mid states for L65, L73, L138, L142,
  L150, L151 and L172.

## Remaining items (follow-up pass, bible §18)

The four art items still open after 2.4.1, done by the Art Director. No puzzle logic, object id,
interactivity or level file changed; every art key keeps its name.

| Item | Status | What changed |
|---|---|---|
| 1. 2.4 bug: chapters 33–57 showed the Final Factory `gear` and played `final` | done | `A.chapterIcon` (`art-extra.js`) and `musicFamily` (`audio.js`) map by pack: a `[first chapter id, value]` table, the last entry whose first chapter is ≤ k, and the finale found by id `'final-factory'` (else `CHAPTERS.length − 1`). New `OBEY.art.packOf(table, c, fin)`. New landmark icons `cart`, `pencil`, `tower`, `anchor`, `whistle` (24 units, `currentColor`, stroke 2.2). New music families `supermarket`, `school`, `castle`, `sea`, `sports` with optional `scale`, `tempo`, `dur`, `bassEvery/bassDur/bassVol`, `drone`, `chime`, `swell` (bible §9.4); arpeggio ≤ .05, colour events ≤ .02; `startMusic` restarts its clock when the step length changes. |
| 2. Sleep z's drawn as `<text>` | done | New `OBEY.art.sleepZ(zs, pulse)` in `art.js` (the `h-dragon` construction). Narrator `sleep` overlay (16 `SW`, 12 and 9 `SW3`, each with the `zzz` pulse inline, 300 ms apart), `shybutton {asleep}`, `e-hamster`, `e-avatar {asleep}` (it also had a "z z" `<text>`) and the `h-chesstile` guard. |
| 3. Duplicates left for 2.5 | done | Canonical + redirect (with the old drawing as fallback, `e-chair` style): `j-crate` → `crate {wide, stamp}`, `h-bin` → `bin {plain}`, `h-shelf` → `shelf {deep}`, `j-spoon {tea}` → `b-spoon {lying}`, `h-postcard` → `b-postcard {picture}`. Each option keeps the old viewBox, so boxes do not move. `b-spoon`'s handle is now a filled bar with an `SW3` outline (was a thick bespoke stroke). Kept separate, with reasons in bible §15: `d-spoon` (wood, L97 tell), `j-spoon` ladle and fork (L213 set), `h-basket` (countable rocks, L173), `c-postcard` (address and stamp slot, L92), `b-window` / `c-window` / `h-window` (each carries its level's information). |
| 4. `a-photo` `subject` unused | done | Implemented: `subject` = `person` / `fish` / `cat` in both formats, `pet` kept as the older name, default `person` when `tall` else `fish`. L50 and `b-frame` (L72) render exactly as before. |

Verification:
- `OBEY.art.chapterIcon(i)` / `OBEY.audio.musicFamily(i)` for every chapter: 0–7 button/core, 8–12
  stapler/office, 13–17 sock/home, 18–22 palm/outdoors, 23–25 flask/science, 26–27 rocket/science,
  28–32 curtain/show, 33–37 cart/supermarket, 38–42 pencil/school, 43–47 tower/castle, 48–52
  anchor/sea, 53–57 whistle/sports, 58 gear/final; −1 studio.
- Screenshots (1180×900 and 320×700): icon sheet at 56 px and 1.25 em; chapter cards for chapters
  34, 39, 44, 49, 54 and 59; the map regions from L133 to L233; the trophy room cups for every 2.4
  chapter; stages of L8, L19, L21 (narrator asleep), L50, L56, L67, L68, L72, L130, L132, L177, L179,
  L181, L190, L213. One fix made from the shots: `e-avatar` z's moved to a rising diagonal, because
  in a row between the ears they read as "OzzO" at 40 px (L132).
- `node tools/level-lab.js` on the 34 level files that use a changed key, packs A–J, `--fit`:
  1648 checks, fit 0 problems. The 9 problems are level metadata, not art: L8, L19 and L21 have no
  `trick` sentence and no wrong move in `checks` (they were not run in earlier passes).
- `node tools/art/strokes.js` on 27 of those levels: nothing outside 2.5–7 px except the known
  bespoke exceptions (L56 `b-ants`, L127 `e-stilts`).
- `npm test`: 1266 pass. `node tools/check.js`: only `sw.js is out of date`.

Still open after this pass (bible §18): `App.landmarkIcon`'s numeric fallback in `app-extra.js`
(dead while `art-extra.js` loads, but still says 33+ → `gear`); the `.zzz text` rule in
`css/style.css` now matches nothing and can go; L8/L19/L21 lab metadata; `j-spoon` ladle and fork
still use bespoke thick strokes; plus the items already listed there (map and text at 320 px,
`j-boss`, bespoke stroke exceptions).
