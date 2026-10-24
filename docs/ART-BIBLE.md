# OBEY? LOL. — Art Bible

Owner: Art Director (`.claude/agents/art-director.md`). Baseline written against build **2.1.0**.
This document is the single source of truth for how the game looks, moves and sounds. Every value
below was read from the code or computed from it. When the code and this file disagree, the code
wins until someone updates this file. Do not guess numbers: regenerate them (see §17).

Sources: `css/style.css` (tokens, components, motion), `js/ui/art.js` + `js/ui/art-extra.js` (all
drawn art), `js/ui/audio.js` (all sound), `js/core/extras.js` (captions, U.N.D.O. script),
`js/core/data.js` (costumes, moods, themes), `js/levels/*.js` (object placement),
`js/ui/endings.js`, `js/ui/app.js`, `js/ui/app-extra.js`, `docs/screenshots/`.

---

## 1. Pillars and tone

1. **Official memo vs. toy box.** Bossworth speaks in office paperwork: slips, memos, stamps, plaques,
   rulebooks, terms and conditions. The player answers with chunky toys: big buttons, levers, doors,
   cats. Every screen is a collision of those two worlds.
2. **The narrator lies. The art never does.** Text from Bossworth can be false. Drawings, labels on
   objects, mirrors, signs that are part of the puzzle's truth layer, and UI states must be honest. A
   correct solution is always *visually discoverable* (§6.4).
3. **Ink first.** One dark ink (`--ink`) outlines everything with thick, round-jointed strokes and
   casts hard, unblurred offset shadows. No gradients on objects, no soft drop shadows, no photo
   textures. Depth is faked, flatly and on purpose (§10).
4. **Readable before funny.** Atkinson Hyperlegible body text, 48 px tap targets, high contrast, and a
   text caption for every sound. A gag that hides information is a bug.
5. **Slapstick, not cruelty.** Failure is a pie, a rubber chicken, a sad trombone. Nobody is hurt,
   nothing is gross, nothing is scary. Bossworth sulks; he never threatens.
6. **Original.** No borrowed characters, logos, mascots, brands or melodies. Influences may be named
   in words only ("1950s office memo", "rubber-hose cartoon timing", "toy-store packaging").

Tone words: smug, petty, warm underneath, bureaucratic, bouncy. Not: edgy, grimy, sarcastic-mean,
corporate-sleek, retro-pixel.

---

## 2. Characters

### 2.1 Bossworth (the narrator)

Function: `OBEY.art.narrator(costume, mood, overlay)` in `js/ui/art.js`.

**Construction (viewBox `-6 -10 212 222`, drawing space 200×200):**

| Part | Geometry | Notes |
|---|---|---|
| Body (blob) | Path `BLOB`: x 22–178, y 24–186 (156 × 162), bottom-heavy egg | Fill = costume body colour, outline 4 px `--ink` |
| Belly highlight | `M64 160 Q100 178 136 160`, white, 35 % opacity, stroke 8 | The only "light" on the body |
| Eyes | Centres (75, 98) and (125, 98), 50 apart; white r 12, pupil r 5 offset +2 px right | Eyes sit at 46 % of body height — high, childlike |
| Brows | Short 3 px strokes at y ≈ 80 | Carry most of the mood |
| Mouth | Centred x 100, y 128–146; interior `#7a1f3d` | Wrapped in `<g class="mouth">` so it can flap |
| Cheeks | `#ff6f91` ellipses rx 9 ry 5 at 55 % (pleased only) | |
| Tears / sweat | `#7cc8ff` (laughing tears, panicked sweat drop) | |
| Robot body | `rect 30,30 140×150 rx 24` instead of the blob, visor `#e9eef5` | Only costume that changes the silhouette |

Proportions to keep: body width : height ≈ 1 : 1.04; eye spacing = 32 % of body width; eye size
(r 12) = 7.7 % of width; mouth width ≤ 60 px (38 %). Accessories may break the silhouette at the
top (hats, crowns, antennae, spikes) or the sides (ninja tails, magnifier) but never cover the eyes,
except the ninja mask band (`y 78–118`, which keeps the eyes visible on top).

**The 8 costumes** (`OBEY.COSTUMES`, body colours in `BODY`, voices in `audio.js VOICES`):

| Costume | Body | Accessories (front / back) | Voice: base Hz, wave, speed | Unlock |
|---|---|---|---|---|
| classic | `#ffb347` | red tie `#e5243b` | 190, square, 1.0 | default |
| royal | `#b48cff` | gold crown `#ffd23f` with red/blue jewels | 150, sawtooth, 0.85 | Level 4 |
| alien | `#7be37b` | third eye; two antennae with `#d6ff4a` tips | 420, sine, 1.25, vib 30 | 3 secrets |
| detective | `#e0b98c` | brown deerstalker `#9a6b3f`, magnifier `#cfefff` @ 60 % | 140, triangle, 0.9 | Level 8 |
| wizard | `#8fb8ff` | indigo hat `#4a3fd1` with gold star, white beard | 130, sawtooth, 0.8, vib 12 | 20 stars |
| robot | `#c3ccd8` | rounded-rect body, visor, side bolts, antenna `#ff4f6d`, dashed mouth line | 200, square, 1.1, monotone | Level 12 |
| dino | `#4fd1a5` | back spikes `#2fae84`, two fangs | 85, sawtooth, 0.85, vib 6 | 8 secrets |
| ninja | `#58607e` | mask band `#1f2033`, red headband tails | 240, triangle, 1.4, quiet | Level 36 |

Each costume also gets a one-line text aside (`COSTUMES[].aside`). New costumes must: keep the blob
(or justify a new silhouette as the robot does), pick a body colour with ≥ 3:1 against `--stage`
and `--paper`, add one front accessory and at most one back accessory, and add a `VOICES` entry.

**The 8 moods** (`OBEY.NARRATOR.moods`) plus face overlays:

| Mood | Eyes / brows | Mouth | Body motion | Voice pitch × |
|---|---|---|---|---|
| neutral | round eyes, flat brows | flat line 32 px | float 3.2 s | 1.00 |
| pleased | closed happy arcs, pink cheeks | open smile, filled | float | 1.08 |
| suspicious | one brow down, one up, pupils right | lopsided smirk | float | 0.94 |
| annoyed | angled brows (V) | frown arc | float | 0.90 |
| surprised | big eyes r 15, tiny pupils, raised arcs | "O" | body lifted 4 px | 1.25 |
| panicked | big eyes, pinprick pupils r 2.6, sweat drop | zig-zag | `jitter` .25 s | 1.35 |
| defeated | droopy closed arcs, sad brows | small frown | tilted −7°, sunk 6 px | 0.82 |
| laughing | squeezed arcs, blue tears | wide open, teeth, tongue | `laugh-shake` .18 s | 1.15 + laugh SFX |
| overlay `sleep` | flat lines + "z z z" | small "o" | `zzz` 2 s | — |
| overlay `gag` | current eyes | taped mouth (two rotated strips) | — | — |
| overlay `potato` | current eyes on a potato body | — (no accessories) | — | — |

Rule: the mood must match the *subtext*, not the words. A lie told confidently is `pleased` or
`neutral`; a lie told about something he fears is `suspicious`; getting caught is `annoyed`, then
`defeated`. Use `panicked` sparingly (it jitters).

**Mouth and voice rules**
- While a line is spoken the mouth group animates `talk` (.13 s alternate, scaleY .35 → 1.15). Talk
  time = `clamp(500, words × 150, 3200)` ms, even when sound is off.
- Babble: one syllable per ~3 letters (1–3 per word), step 105 ms ÷ speed, bandpass 1100–1980 Hz,
  Q 2.5, each syllable slides ×1.05 (×0.85 when defeated), last syllable of `?`/`!` words ×1.25.
  Max 14 words are babbled. Stage directions in `*asterisks*` and `(brackets)` are not voiced.
- Speech mode uses the browser voice with pitch = base/190 × mood and rate = speed (×1.25 panicked).
- Bossworth never speaks without a bubble. The bubble text is the caption.

### 2.2 Kevin (the twin)

`OBEY.art.object('twin')` = the alien narrator in `suspicious` mood recoloured to `#7fb2ff`. Kevin is
Bossworth's mirror: same construction, cool blue body. Only appears in Level 26. If Kevin ever gets
his own moods, keep the blue body and the alien third eye; never give him the red tie.

### 2.3 U.N.D.O. (the sidekick)

`OBEY.art.undoBot()` in `art-extra.js`: a floppy disk with a face. Body `#2d2850` rect 84×84 rx 8,
shutter `#c3ccd8`, label window `#f5feff` with two ink dot eyes and a small smile, a 3 px "eyebrow"
tick at the top right (the smirk). Lives in the chat panel `.undo-chat` (`#1b1838` background,
`#d8ffe9` text, monospace `ui-monospace, SF Mono, Menlo, Consolas`). Leaked chats use `#ffe08a` with
a 3 px left rule. U.N.D.O. glitches (`glitch` keyframes, .5 s steps(2), hue-rotate ±60–90°) when it
speaks; the SFX is `glitch`. U.N.D.O. is the only character that uses monospace and the only one
that may glitch. It appears from Level 9 and in all bonus levels (`undoActive`).

### 2.4 Supporting cast

| Who | Where | Art | Rules |
|---|---|---|---|
| You (the intern) | Levels 13, 28 | `hero`: yellow `#ffd23f` rounded rect, two dot eyes, antenna with red bulb | Always friendly; never shown failing in pain |
| Mimic / the cat | Levels 17, 24 | `cat`: orange `#ff9f43`, states normal / grumpy / eating | Cats are honest: they react, they never lie |
| Polly the parrot | Level 12 | `parrot`: green body, yellow beak, red wing stripe; star when happy | Tells the truth for crackers |
| The mouse | Level 11 | `mousehole`: two yellow eyes; with mouse: grey mouse + "shh" note | |
| Clive | U.N.D.O. chats only | never drawn | Offscreen by design. Do not draw Clive. |
| Receptionist | Level 6 (implied) | never drawn | Offscreen |

---

## 3. World and level art

### 3.1 The stage

`.stage`: square (`aspect-ratio: 1`), max 640 px, 3 px ink border, radius `--r-lg` 22 px, hard
shadow. Background: `--stage` for the top 74 % (the wall) and `--stage-floor` for the bottom 26 %
(the floor band). Objects are positioned with percentages via `OBEY.obj(id, x, y, w, h, opts)`.

Composition rules:
- **Floor line at y = 74 %.** Furniture and standing objects (doors, lamps, bins, chairs, plants,
  mailbox, pegs) put their base between 74 % and 96 %. Wall things (paintings, signs, clocks, panels,
  posters) sit in 2–60 %. Floating things are only allowed when the level is about floating (L23) or
  the object is a button on a pedestal (`bigbutton` has its own base).
- **Margins:** keep 4 % clear at every stage edge except deliberate edge secrets (L2 cobweb corner).
- **Three-zone read:** information (signs, rules) top; the puzzle's actors middle; controls
  (buttons, word tiles, arrows) bottom. Level 5, 16, 20, 30 and 34 follow this exactly; copy them.
- **One hero object.** Each room has one object at least 35 % of the stage width or height (big
  button, door, machine, TV, mirror). It is where the eye lands first and is usually the lie.

### 3.2 Object vocabulary (reuse before inventing)

Drawn objects (`OBJECTS` in `art.js`, plus `addObject` in `art-extra.js`), with use counts across
the 40 levels:

- Doors and exits: `door` (18 uses; options `sign`, `small`, `keyhole`, `bricked`, `open`,
  `hiddenBehind`, `wet`), `catflap`, `gate`, `mat`, `key`, `rug`.
- Buttons and controls: `bigbutton` (red/green/blue, `squashed`), `smallbutton`, `shybutton`, `switch`,
  `lever`, `valve`, `remote`, `bell`, `speaker`.
- Furniture: `shelf`, `table`, `chairs`, `crate`, `bin`, `drawer`, `basket`, `catbed`, `peg`,
  `treestand`, `lamp`, `bulb`, `light`, `clock`, `fan`, `tv`, `painting`, `mirror`, `mailbox`.
- Props: `plant`, `note`, `cobweb`, `medal`, `magazine`, `gift`, `bow`, `tag`, `pen`, `sandwich`,
  `cracker`, `sock`, `fish`, `mug`, `battery`, `socket`, `gear`, `wrench`, `fuse`, `quill`, `card`,
  `phone`, `tree`, `jigsaw`, `drum`, `horn`, `footprint`, `bucket`, `pipe`, `drip`.
- Machines: `machine` (Instruction Machine: purple `#7d5a9e`, screen `#1c1640`, text `#7dffb2`).
- Terrain (stretch to fill, `fill-art`/`water-art`): `swamp`, `bank`, `water`, `tile`, `gap`,
  `stone`, `darkness`.
- Characters: `hero`, `cat`, `parrot`, `mousehole`, `twin`.
- Gag props (overlay only): `pie`, `chicken`, `trombone`, `zap`, `splash`. Trophies: `trophy`.

Text "cards" (CSS classes on `.obj`): `btn-card` (+ `accent`, `big`, `small`, `ghost`, `option`,
`warn`, `key`), `hold-btn`, `obey-btn`, `sign-card`, `plaque-card`, `tag-card`, `speech-card`,
`book-card`, `ticket-card`, `tutorial-card`, `honest-card`, `display-card`, `panel-card`,
`panel-lights`, `timer-card`, `color-btn`, `shape-btn`, `word-red`, `mirror-text`, `tv-text`,
`glow-text`, `fine-print`.

### 3.3 Outline weights and shape language

- House outline: **4 px on a 200-unit viewBox** (`SW`), detail lines **3 px** (`SW3`), hairlines
  2 px (bricks, cobwebs at 35 % opacity). All strokes `--ink`, `stroke-linejoin: round`,
  `stroke-linecap: round`. CSS cards use `--line` = 3 px (4 px in high contrast).
- Because SVG strokes scale with the object, the *rendered* outline depends on size. Measured at a
  640 px stage (127 drawn objects): min 2.28 px (jigsaw piece), median 4.56 px, 90th percentile
  6.09 px, max 8.03 px (L2 EXIT door). **Target 3–6 px rendered at 640 px.** When an object will be
  drawn larger than ~1.5 px per viewBox unit, draw it in a larger viewBox or use `SW3` for its
  outline.
- Shapes: rounded rectangles (rx 6–24), eggs and blobs, wedges. Corners are always rounded; there are
  no sharp, spiky or realistic silhouettes except the deliberate zig-zag of the `zap` bolt and the
  dino spikes.
- Shading: flat fills only. One highlight per object, white at 35–60 % opacity, top-left (`bigbutton`
  ellipse, `bell` arc, `mirror` streaks). One darker plinth/base colour per object where it needs
  weight (`#4b4466` under buttons, levers, speakers, trophies).
- Object palette (fixed hexes reused across objects; keep to these): reds `#e5243b`; yellows
  `#ffd23f`, `#ffe066`, `#f5b400`; blues `#3a86ff`, `#7fb2ff`, `#3ec1ff`, `#2f6fe4`; greens `#2bc46f`,
  `#5fd98a`, `#3fbf6f`, `#2fae84`; pinks `#ff4f9a`, `#ff77b4`, `#ff6f91`; wood `#a0784d`, `#b88d5f`,
  `#c98b4a`, `#9a6b3f`; greys/metal `#c3ccd8`, `#8a86a8`, `#4b4466`, `#2d2850`; paper `#fffdf6`,
  `#fff8b8`; screens `#1c1640` with phosphor green `#7dffb2`.
- Object colours are fixed hexes on purpose: a red button stays red in every theme. Outlines,
  stage, floor and paper surfaces come from tokens and recolour with the theme. Never hard-code
  `--ink` as a hex in art; use `INK` (`var(--ink)`).

### 3.4 Interactive vs. inert (affordance)

- **Pressable things carry a hard shadow** (`--shadow-sm`, 3 px) and lift on hover (−1 px, shadow
  4 px) and sink on press (+2 px, shadow 1 px). Drawn objects that are buttons lift 2 % and scale
  1.03 on hover.
- **Inert things are flat.** Static information (`kind: 'static'`) should have no hard shadow, so the
  only shadowed shapes on a stage are things you can press. (Today 19 levels break this rule; see
  ART-REVIEW-2.1, item M1.)
- Disabled controls: dashed border, `--paper-2` fill, no shadow (`.btn-card.ghost`,
  `.node-locked`, `.chip-btn.locked-chip`).
- Draggable things: `cursor: grab`, `.is-drag`; while held, 4 px `--accent` outline and an
  `--accent-2` 40 % wash; valid targets get a 4 px **dashed** `--accent` outline. Hold buttons fill
  left to right with `--good` over 2 s.
- Secrets may *look* like decoration (plant, cobweb, fine print, mouse hole) but are focusable and
  get the hover lift. Decorations that do nothing should be `kind: 'static'` so they are not in the
  tab order.

### 3.5 How a trap, a lie and a tell are drawn

- **The lie** is usually the biggest, brightest, most "obvious" object: the big red button, the
  shiny EXIT door, the PRESS ME button. It is drawn normally. It is never drawn as broken or sinister
  before it is used.
- **The tell** must be visible on first look without hovering, and must not depend on colour or
  sound alone. Allowed tells: a second smaller version (L2 "NOT AN EXIT" door), a ghost outline at
  50 % opacity (`door.hiddenBehind`, L8), a label or sign on the object itself, a mirror reading
  (L25), bubbles vs. flat stones (L28 — shape *and* colour), a counter or text read-out (L32
  "4 of 5 bulbs on"), a shape glyph paired with colour (L11 ▲●■, L25 ●■▲).
- **The trap** reveals itself only after it fires: gag overlay, red flash, stage wobble, nope sticker.
  After a trap the room resets and the "How to do it right" card names the tell in words.
- **Never** hide the solution behind hover, behind sound, behind a colour difference under 3:1, behind
  an animation that only plays once, or outside the stage.

### 3.6 Palette use on the stage

- `--accent` (stamp red): the narrator's preferred, usually wrong, choice; primary CTA buttons;
  danger. `--accent-2` (highlighter): "look here" — hints, signs, done states, focus.
  `--good`: confirmed success, guide targets, hold progress.
- Dark panels (`#1c1640`, `#2d2850`, `#4b4466`) are machines, screens, keypads. Their text is
  phosphor `#7dffb2` (ok/ready = `--accent-2`, wrong = `#ff6b6b`).
- Paper colours (`#fff8dd` book, `#fff3c4` ticket, `#e8fff3` honest, `#fff0f0` warning) are the
  "document" layer.

---

## 4. UI components

| Component | Spec |
|---|---|
| Panel `.panel` | `--paper`, 3 px ink border, radius 22, `--shadow` 5 px (4 px ≤ 520 px wide), padding 18×20 |
| Button `.btn` | min-height `--tap` 48 px (50 on coarse pointers), padding .45em 1.05em, radius 14, bold 17 px, shadow 3 px. Variants: `primary` (accent), `danger` (ink), `ghost` (dashed, no shadow), `small-btn` (36 px, 44 on touch) |
| Chip `.chip-btn` | pill (radius 999), min 44 px (46 touch), .92em; ≤ 520 px wide the label hides and only the icon shows |
| Menu slip `.slip` | full-width paper slip, radius 9, alternate rotation −.6° / +.5°, straightens on hover; `slip-primary` uses the display face at 1.45em on accent |
| Bubble `.bubble` | paper, radius 22, shadow 3 px, speaker name in display face .85em, `color-mix(in srgb, var(--accent) 82%, var(--ink))` (in-flight 2.1 QA change; was plain `--accent`); tail = 9–16 px ink triangle; annoyed/panicked bubbles tint `#fff4f4` |
| Pill / badge | radius 999, 2–3 px ink border, bold; difficulty badge easy `#c9f7dd`, hard `#ffc9c9` |
| Stamp `.stamp`, `.end-stamp`, `.gag-word` | display face, `--accent`, 5–6 px **double** border, radius 10–14, rotated (+9°, −6°, −10°), slams in with `stamp-in` |
| Map node | disc 48–62 px, display numeral; states: open (paper), done (`--accent-2`), current (`--accent`, `bob`), locked (dashed, `--paper-2`, no shadow), skipped (dashed); medal 22 px (E bronze `#d08a4b`, M silver `#c9d1dc`, H gold `#ffd23f`); secret eye 22 px dark disc |
| Toast | paper, radius 14, shadow 3 px, bottom centre, max 440 px; secret `#2d2850`, achievement `--accent-2`, warn `#fff0f0` |
| Hint / guide / wrong cards | hint `--accent-2`; guide `#e8fff3` with green ▼ bobbing pointer and 5 px `--good` outline on the target; wrong card `#fff0f0` with accent title |
| Focus ring | 4 px `--accent-2` outline + 7 px ink halo (`box-shadow`), offset 3 px — visible on every surface |

**Spacing:** 4 px grid in practice: gaps 6/8/10/12/14/16/18/22/24/32. Section gap 18 px, card
padding 12–18 px, stage column gap 10 px, level body gap 22 px (12 px under 900 px).
**Radius scale:** `--r-sm` 9, `--r-md` 14, `--r-lg` 22, pill 999, objects 12.
**Shadow scale:** `--shadow-sm` 3/3/0, hover 4/4/0, `--shadow` 5/5/0, logo 6–7/7/0. Always `--ink`,
never blurred, always down-right. (Exceptions with blur: `drop-shadow` on dragged objects 6/8 px
25 % black; glows — see §10.)
**Icons:** 24×24 viewBox, `currentColor`, stroke 2.2–3.2, round caps; filled star has a 1.6 px ink
outline. Shown at 1.25em. Add icons with `OBEY.art.addIcon`.

---

## 5. Colour and themes

### 5.1 Token table

| Token | Classic | Candy | Ocean | Sunset | High contrast |
|---|---|---|---|---|---|
| `--bg` | `#aab3ff` | `#ffb7dc` | `#7dd3ea` | `#47205a` (+ gradient `#2c1340 → #6b2a63 → #c8506a`) | `#ffffff` |
| `--bg-2` (dots) | `#96a0f7` | `#ff9bcd` | `#62c2de` | `#6b2a63` | `#e6e6e6` |
| `--paper` | `#fffdf6` | `#fff8fc` | `#f5feff` | `#fff3e8` | `#ffffff` |
| `--paper-2` | `#f1efff` | `#ffe8f4` | `#dff6fb` | `#ffe2cc` | `#f0f0f0` |
| `--ink` | `#1c1640` | `#3b0d34` | `#072f3d` | `#2a1230` | `#000000` |
| `--muted` | `#514a7a` | `#7a3a6c` | `#2e5b69` | `#6b4060` | `#2b2b2b` |
| `--accent` | `#e5243b` | `#c2127a` | `#e2502b` | `#e8355f` | `#b34700` |
| `--accent-ink` | `#ffffff` | `#fff` | `#fff` | `#fff` | `#ffffff` |
| `--accent-2` | `#ffde3b` | `#8fe9ff` | `#ffe066` | `#ffc145` | `#ffd400` |
| `--good` | `#12925f` | `#0f8a62` | `#0c7a57` | `#10805a` | `#0050b3` |
| `--stage` | `#eef0ff` | `#fff0f8` | `#e3f7fc` | `#ffeadb` | `#ffffff` |
| `--stage-floor` | `#d9dcfb` | `#ffd6ec` | `#c4ecf6` | `#ffd2b5` | `#e9e9e9` |
| `--on-bg` | `#1c1640` | `#3b0d34` | `#072f3d` | `#fff3e8` | `#000000` |
| `--line` | 3 px | 3 px | 3 px | 3 px | 4 px |

Sunset is the only theme with a dark page background, so `--on-bg` is light there. High contrast
also removes the dot pattern. Background pattern: two offset `radial-gradient` dot grids, 1.6 px
dots, 26 px pitch.

### 5.2 Contrast ratios (computed, WCAG 2.x)

Computed by `scratchpad/art/contrast.py` from the tokens in `css/style.css` (see §17). Bold ✗ =
below requirement. Text needs 4.5:1 (3:1 if ≥ 24 px, or ≥ 18.66 px bold); non-text UI parts need
3:1.

| Pair (fg on bg) | Used for | Need | Classic | Candy | Ocean | Sunset | High contrast |
|---|---|---|---|---|---|---|---|
| `--ink` on `--paper` | body text on slips/cards/bubbles | 4.5 | 16.66 | 15.53 | 13.83 | 15.67 | 21.00 |
| `--ink` on `--paper-2` | text on locked/secondary cards | 4.5 | 14.97 | 14.00 | 12.62 | 13.85 | 18.43 |
| `--muted` on `--paper` | `.small`, `.score-why`, help text | 4.5 | 7.90 | 7.58 | 7.28 | 7.61 | 14.16 |
| `--muted` on `--paper-2` | muted text on secondary cards | 4.5 | 7.10 | 6.83 | 6.64 | 6.73 | 12.42 |
| `--ink` on `--stage` | stage text, wall band | 4.5 | 14.98 | 14.75 | 12.80 | 14.70 | 21.00 |
| `--ink` on `--stage-floor` | stage text, floor band | 4.5 | 12.58 | 12.44 | 11.24 | 12.33 | 17.30 |
| `--on-bg` on `--bg` | screen titles, level title, tagline | 4.5 | 8.56 | 10.10 | 8.35 | 11.86 | 21.00 |
| `--on-bg` on `--bg-2` | text over the dots | 4.5 | 7.00 | 8.37 | 6.94 | 9.00 | 16.83 |
| `--accent-ink` on `--accent` | primary buttons, current node, LOL | 4.5 | 4.52 | 5.74 | **3.88 ✗** | **4.11 ✗** | 5.50 |
| `--accent` on `--paper` | stamps (large) | 3.0 | 4.44 | 5.49 | 3.79 | 3.77 | 5.50 |
| `--accent` on `--paper` | `.guide-note`, `.wrong-title` (small text; `.speaker` now mixes in ink) | 4.5 | **4.44 ✗** | 5.49 | **3.79 ✗** | **3.77 ✗** | 5.50 |
| `--ink` on `--accent-2` | hint box, done node, achievement toast | 4.5 | 12.73 | 11.81 | 10.86 | 10.56 | 14.67 |
| `--good` on `--paper` | `.stamp-mini` "found", `.dare-result.ok` | 4.5 | **3.89 ✗** | **4.16 ✗** | 5.21 | 4.52 | 7.50 |
| `--paper` on `--ink` | danger button, node flag, run timer | 4.5 | 16.66 | 15.53 | 13.83 | 15.67 | 21.00 |
| `--ink` on `--bg` | outlines/shadows on page background | 3.0 | 8.56 | 10.10 | 8.35 | **1.32 ✗** | 21.00 |
| `--ink` on `--stage` | object outlines | 3.0 | 14.98 | 14.75 | 12.80 | 14.70 | 21.00 |
| `--accent` on `--stage` | drop-target / zone outline | 3.0 | 3.99 | 5.21 | 3.50 | 3.53 | 5.50 |
| `--good` on `--stage` | guide-target outline | 3.0 | 3.50 | 3.95 | 4.82 | 4.24 | 7.50 |
| `--accent-2` on `--paper` | star fill, focus ring colour | 3.0 | 1.31 | 1.32 | 1.27 | 1.48 | 1.43 |

`--accent-2` is never allowed to stand alone as a boundary: stars carry a 1.6 px ink outline and
the focus ring carries a 7 px ink halo, so both pass through the ink. Keep it that way.

Derived (opacity) pairs:

| Derived pair | Need | Classic | Candy | Ocean | Sunset | High contrast |
|---|---|---|---|---|---|---|
| `.obj.subtle` (ink @ .55) on stage | 4.5 | **3.73 ✗** | **3.75 ✗** | **3.38 ✗** | **3.73 ✗** | 4.76 |
| `.obj.fine-print` (ink @ .8) on stage | 4.5 | 8.34 | 8.34 | 7.07 | 8.29 | 12.63 |
| `.node-locked .node-title` (ink @ .6) on paper | 4.5 | 4.52 | **4.46 ✗** | **4.00 ✗** | **4.44 ✗** | 5.74 |
| `.region-label` (ink @ .55) on paper, 17 px display | 3.0 | 3.86 | 3.82 | 3.47 | 3.81 | 4.76 |
| `.score-rule`, `.trust-line`, `.lvl-num` (on-bg @ .85) | 4.5 | 6.34 | 7.21 | 5.91 | 8.98 | 15.08 |
| `.guide-steps li` (muted) on `#e8fff3` | 4.5 | 7.67 | 7.56 | 7.11 | 7.92 | 13.50 |
| `.hint-box .small` (ink @ .8) on accent-2 | 4.5 | 7.70 | 7.46 | 6.50 | 6.68 | 9.93 |
| `--accent` on `#fff0f0` (wrong-card title) | 4.5 | **4.08 ✗** | 5.18 | **3.50 ✗** | **3.72 ✗** | 4.97 |
| white on `--good` (hold done, Daily Dare hit) | 4.5 | **3.96 ✗** | **4.35 ✗** | 5.33 | 4.93 | 7.50 |
| `.node-stars .star-off` (ink @ .35) on bg | 3.0 | **1.96 ✗** | **2.02 ✗** | **1.88 ✗** | **1.11 ✗** | **2.44 ✗** |
| `.big-stars .star-off` (muted @ .4) on paper | 3.0 | **1.96 ✗** | **1.97 ✗** | **1.92 ✗** | **1.96 ✗** | **2.32 ✗** |

Sunset gradient: `--on-bg` (#fff3e8) is 15.1 on `#2c1340`, 9.0 on `#6b2a63`, but **4.0 on
`#c8506a`** (the bottom stop), so small text that lands at the bottom of a long page fails there.

Fixed colours (theme-independent):

| Fixed pair | Used for | Need | Ratio |
|---|---|---|---|
| `#7dffb2` on `#1c1640` | `.display-card` | 4.5 | 13.58 |
| `#7dffb2` on `#2d2850` | `.panel-card`, glow text | 4.5 | 10.99 |
| `#ffde3b` / `#ff6b6b` on `#2d2850` | `.panel-lights` / `.wrong` | 4.5 | 10.30 / 4.94 |
| `#d8ffe9` / `#9fe6c1` / `#ffe08a` on `#1b1838` | U.N.D.O. text / head / leak | 4.5 | 15.72 / 11.80 / 13.19 |
| white on `#2d2850` | roast, secret toast | 4.5 | 13.72 |
| white on rgba(0,0,0,.82) over white | captions (worst case) | 4.5 | 13.60 |
| white on `#e5243b` / `#2f6fe4` | `.color-btn.red` / `.blue` labels | 4.5 | 4.52 / 4.65 |
| white on `#ffc31f` | `.color-btn.yellow` glyph | 3.0 | **1.61 ✗** |
| `#2bc46f` / `#9b5de5` / `#ff8c1a` on paper | `.shape-btn` glyphs (non-text) | 3.0 | **2.24 ✗** / 4.05 / **2.29 ✗** |
| `#e5243b` on `#fffdf6` | `.word-red` | 4.5 | **4.44 ✗** |
| white on `#2bc46f` / `#3a86ff` / `#e5243b` | `bigbutton` label green / blue / red | 4.5 | **2.28 ✗** / **3.48 ✗** / 4.52 |
| white on `#d08a4b` | easy medal "E" | 4.5 | **2.83 ✗** |
| `#f5b400` on paper | `.review-stars` glyphs | 3.0 | **1.81 ✗** |
| `#6b5a3b` on `#c9a86a` | WELCOME mat (decorative) | 3.0 | **2.95 ✗** |
| `#9a6b00` on paper | gold/platinum trophy tier text | 4.5 | 4.61 |
| `#e5243b` on black | fake game over title | 3.0 | 4.65 |
| `#ffde3b` on `#1c1640`; `#ffd23f` on `#140f33` | chaos / secret ending titles | 3.0 | 12.73 / 12.69 |
| ink on `#ffb877` / `#8fd3ff` | hero ending text on its gradient | 4.5 | 9.99 / 10.44 |
| `#2d2850` @ .8 on `#cfefff` | `.mirror-text` effective | 4.5 | 6.44 |
| ink on `#fff3c4`, `#fff8dd`, `#e8fff3` | ticket, book, honest cards | 4.5 | 15.24, 15.93, 16.18 |

### 5.3 Colour-blind safety

Minimum pairwise CIE76 ΔE between colours that code meaning, under Machado 2009 simulations
(severity 1.0). Under 10 = confusable; 10–20 = weak; > 20 = fine.

| Colour-coded set | Normal | Protan | Deutan | Tritan | Also coded by |
|---|---|---|---|---|---|
| L1 red big vs blue small button | 117.2 | 85.8 | 115.9 | 128.5 | size, label |
| L25 shapes green/purple/orange | 102.5 | 28.6 | 44.7 | 56.6 | ● ■ ▲ glyph |
| B1 red vs blue buttons | 114.0 | 85.0 | 113.7 | 124.5 | the puzzle *is* the label |
| L11 footprints red/yellow/blue | 81.3 | 70.9 | 44.0 | 66.8 | ▲ ● ■ glyph |
| B3 discs pink/yellow/blue | 87.8 | 37.3 | 59.7 | 47.2 | size |
| Composure bar calm→meltdown | 39.0 | **16.9** | **15.1** | 29.9 | word ("calm") + bar length |
| Difficulty borders easy/medium/hard | 77.3 | **16.9** | 30.0 | 59.3 | name text |
| L14 light off vs green | 115.6 | 91.0 | 74.6 | 68.3 | glow |
| Panel lights normal/wrong/ok | 71.0 | 40.9 | 24.6 | 58.7 | symbols ○ ● ✓ ✗ in the text |
| Jigsaw pieces 1–9 | **16.7** | **14.7** | **12.1** | **11.4** | number in toast / picture |
| Medals E/M/H | 41.8 | 44.0 | 34.6 | 27.7 | letter |
| B2 phone 99 % vs 100 % | 88.2 | 35.3 | 48.9 | 83.8 | percentage text |
| L22 wet paint vs door | 70.0 | 24.8 | **13.9** | 71.9 | drip shapes |

Rules: (1) Every colour code has a second channel (shape, letter, number, position, or text).
(2) Pairs that must be told apart need ΔE ≥ 20 under all three simulations *or* a second channel.
(3) Never use red vs green as the only difference.

---

## 6. Typography

| Role | Face | Size | Weight / notes |
|---|---|---|---|
| Logo "OBEY?" | Bagel Fat One | clamp(4.2rem, 15vw, 9.5rem) | `--paper` fill, 4 px ink text-stroke (3 px ≤ 520), 7/7 ink shadow |
| Logo "LOL." | Bagel Fat One | clamp(2.6rem, 9vw, 5.6rem) | white on accent stamp, rotated −7° |
| Screen title | Bagel Fat One | clamp(1.6rem, 4vw, 2.3rem) | `--on-bg` |
| Level name | Bagel Fat One | clamp(1.25rem, 3.6vw, 2rem) | over a 0.8rem bold "Level N" line |
| Card / modal titles | Bagel Fat One | 1.2–1.8rem | weight 400 (the face is already heavy) |
| Ending title | Bagel Fat One | clamp(2.2rem, 8vw, 4.4rem) | |
| Body | Atkinson Hyperlegible | `--fs` 17 px (20 large, 23 XL) | 400 / 700, line-height 1.5 |
| Stage text | inherits | `--fx` × clamp(10.5px, 3.3cqi, 20px) | 3.3 % of stage width: 20 px at 606 px+, 11.9 px at a 360 px stage |
| Small | Atkinson | .85em | `--muted` |
| U.N.D.O. | system monospace | .85em | only for the sidekick and save codes |

Rules: display face for names, titles, stamps, big buttons and numbers only — never for paragraphs
or anything longer than ~6 words. Body copy max 70ch. No italics except the completion quote. No
ALL-CAPS paragraphs; caps are for single words Bossworth shouts. The "plain font" setting
(`data-font="plain"`) swaps the display face for Atkinson 700, so every layout must survive
Atkinson at the display size (it is narrower — check line breaks, not overflow).
Minimum rendered sizes: body 15 px; stage text 12 px; fine print 11 px; nothing below 9 px ever.

---

## 7. Motion and animation

### 7.1 Timing and easing

| Name | Duration | Easing | Use |
|---|---|---|---|
| press / hover | 80 ms | ease | buttons, slips, chips (translate 1–2 px + shadow change) |
| object hover | 120 ms | ease | drawn object lift (−2 %, ×1.03) / press (×.97) |
| `stamp-in` family | 450–500 ms (+150–250 ms delay) | cubic-bezier(.2, 1.6–1.7, .4, 1) | LOL logo, completion stamp, THE END, gag words; scale 2.2–2.6 → 1 |
| `pop` | 220–300 ms | ease-out | bubble on new line, completion card, revealed objects |
| `toast-in` | 250 ms | ease-out | toasts, wrong card (12 px rise) |
| `float` | 3.2 s loop | ease-in-out | narrator idle, 4 px |
| `bob` | 1.6 s loop | ease-in-out | current map node, 5 px |
| `talk` | 130 ms alternate | ease-in-out | mouth while speaking |
| `jitter` | 180–250 ms loop | linear | panicked narrator, held objects |
| `laugh` | 180 ms alternate | ease-in-out | ±3° rotate |
| `flash-fail` + `wobble` | 500 ms | ease-out / ease-in-out | stage on a trap (8 px accent ring, ±1.5°) |
| `nope-shake` | 350–400 ms | ease-in-out | harmless wrong tap (±8 px decaying) |
| `nope-pop` | 900 ms | ease-out | NOPE sticker |
| hero sprite move | 350 ms | cubic-bezier(.3, 1.4, .5, 1) | overshoot step |
| card slide (L31) | 900 ms | cubic-bezier(.5, 0, .3, 1) | shuffle |
| `card-in` | 1.9 s | ease | chapter card in / hold / out |
| `glitch` | 400–500 ms | steps(2) | U.N.D.O. only |
| ending FX | 2.4–4 s loops | ease | sun rise, sparks, debris, twinkles |

Rules: interactions answer within 100 ms. Anything that bounces uses the house overshoot
`cubic-bezier(.2, 1.6, .4, 1)`. Loops never exceed 4 px of motion on UI and 10 % on stage props.
Nothing flashes more than 3 times per second (the `zap` gag runs 8 × 120 ms steps = ~4 Hz on a
40 % yellow wash — at the limit; do not add more flashing).

### 7.2 Squash and stretch

Used sparingly and only on slapstick: `pie-fly` lands with scale(1.15, .8), `splash-up` grows from
scaleY .2, the big button `squashed` state flattens to a 16-unit ellipse. UI never squashes.

### 7.3 Gag catalogue (wrong-answer slapstick)

Picked by `App.pickGag` from the trap text (pie/splat/custard → pie; chicken/honk → chicken;
bzz/zap/alarm → zap; splash/swamp/gap → splash; otherwise rotate pie, chicken, trombone, zap,
splash, never the same generic gag twice in a row). Each plays over the stage for 1.9 s with a
stamped word (WRONG! / OOPS! / BONK! / NOPE! / HA!), stage `flash-fail` + `wobble`, haptic
[60, 40, 90] ms, then the "How to do it right" card.

| Gag | Visual | Motion | Sound | Caption |
|---|---|---|---|---|
| pie | cream pie with cherry | flies in from top-left, squashes, fades | 1200→300 Hz sine whistle, then lowpass noise 900→200 Hz | "splat!" |
| chicken | rubber chicken | crosses the stage spinning 720° in 1.2 s | two sawtooth squawks 700→1100, 900→500 Hz with 18 Hz vibrato | "rubber chicken squawk" |
| trombone | trombone | rises, rocks ±6°, fades | 392-370-349-330 Hz sawtooth, last note slides to 290 Hz with 5 Hz vibrato | "sad trombone" |
| zap | lightning bolt | 8 × 120 ms flicker, yellow wash | 120 Hz saw with 60 Hz-deep 40 Hz vibrato + Q4 noise | "electric zap" |
| splash | water splash | grows up from the floor, fades | noise 3000→300 Hz + 500→120 Hz sine | "sploosh" |

New gags: reuse the gag layer, 62 % of stage, one prop, one word, ≤ 1.9 s, one SFX ≤ 1 s, a caption.

### 7.4 Reduced motion

`html.reduce-motion` is set from the setting (`motion: system|on|off`) and `prefers-reduced-motion`.
It clamps every animation and transition to 0.001 ms and one iteration; loops (sparks, debris,
floaty, spin, drip, jigsaw wiggle, gag props) are switched off. Alternatives must keep the
*information*: a stamp still appears (final frame), the gag prop shows static at 85 % opacity, the
hold fill shows complete. Rule for new animation: the final frame must carry the meaning, and any
animation that ends invisible (e.g. `card-in` ends at opacity 0) needs an explicit reduced-motion
rule that keeps it visible for its normal display time.

---

## 8. Lighting and depth (2D)

The game has no lighting engine. Depth is faked with five techniques; use only these.

1. **Hard offset shadow** — ink, 0 blur, down-right: 3 px (controls), 5 px (panels, stage), 6–7 px
   (logo). Light comes from the top-left, always.
2. **Highlights** — one white shape at 35–60 % opacity, top-left of the object (button caps, bell,
   mirror streaks, trophy, belly arc).
3. **Plinths and bases** — a darker `#4b4466` base ellipse/rect under buttons, levers, speakers,
   trophies to sit them on the floor.
4. **Floor band** — the stage's bottom 26 % is `--stage-floor`; objects standing on it read as 3D.
5. **Glows** — the only blurred effects: `drop-shadow(0 0 6px #7dffb2)` (phosphor), `shimmer`
   (0 → 12 px `#ffd23f`), `trophy-shine` (10 px gold), text glow `0 0 8px/18px` green. Lamp/bulb light
   cones are flat `#fff6a8` polygons at 45–60 % opacity; `darkness` is `#0e0b26` at 86 %.

Never: gradients on objects (gradients are reserved for ending backgrounds and the Sunset page),
soft shadows under cards, inner shadows, bevels, ambient occlusion, lens flares.

### 8.1 Forward-looking guide: 3D (none exists today)

The game has **no 3D models, renders or lighting**. If 3D is ever made (a 3D trailer, a store
render, merchandise mock-ups, a vinyl-toy Bossworth), it must look like this 2D game extruded, not
like a different game.

- **Modelling.** Bossworth is a soft egg, 1 : 1.04 width : height, eyes at 46 % height and 32 % of
  width apart, raised as flat discs (not spheres), pupils as flat ink discs. Accessories are chunky,
  bevel radius ≥ 8 % of their size. Keep the robot as the only boxy costume. Props match their 2D
  silhouettes from the front view; depth = 40–60 % of width. No surface detail beyond what the 2D
  drawing has (no fabric weave, no wood grain, no scratches).
- **Outline.** Every 3D render uses an ink outline (inverted-hull or post-process) in `#1c1640`,
  thickness ≈ 2 % of the object's screen height, matching the 4/200 house ratio.
- **Shading.** Toon/cel: two tones per material (base + one shade at ~20 % darker), one specular
  highlight blob top-left. No PBR roughness maps, no subsurface, no realistic reflections.
- **Lighting.** One key light from the upper-left front (azimuth −45°, elevation 45°), one flat fill,
  no rim light except the ending FX. Shadows: hard-edged contact shadow offset down-right in ink at
  100 % (the 3D twin of `--shadow`), or none.
- **Colour.** Use the exact object hexes and theme tokens from §3.3 and §5.1. Background: Classic
  `--bg` with the 26 px dot grid, or a flat `--stage` / `--stage-floor` set.
- **Camera.** Orthographic or ≤ 35 mm-equivalent wide angle with minimal perspective; front or 3/4
  view; Bossworth framed at eye level, never from below (he is pompous, not menacing).
- **Animation.** Same timings as §7 (stamp-in overshoot, 3.2 s float, talk 130 ms).
- **Review.** Any 3D asset is checked side by side with the 2D screenshot at the same angle; it
  passes only if the silhouette, colours and outline weight match.

---

## 9. Audio

All sound is synthesised in `js/ui/audio.js` with the Web Audio API. No audio files, ever.

### 9.1 Mix

Master gain 0.9 → DynamicsCompressor (threshold −18 dB, ratio 4) → output. Three buses with user
volumes: SFX 0.8, voice 0.8, music 0.4 (defaults). Nothing plays before a user gesture
(`unlock`/`prime`). Building blocks: `tone(freq, start, dur, {type, vol, slide, vib, vibRate,
filter, filterType, q, attack})` (exponential envelope, attack 12 ms default) and `noise(start, dur,
{from, to, filterType, q, vol})` (looped white noise through a sweeping filter).

### 9.2 SFX palette and recipes

| Category | Name | Recipe | Caption |
|---|---|---|---|
| UI | `tap` | 660 Hz triangle 50 ms (vol .05) + 3 kHz noise 30 ms | — |
| UI | `ui` | 880 Hz sine 40 ms | — |
| Drag | `pick` | 300 → 700 Hz sine 140 ms | pick-up blip |
| Drag | `drop` | 500 → 160 Hz sine 120 ms + lowpass noise 400 Hz | soft thump |
| Hold | `hold` | 220 → 440 Hz triangle 500 ms | rising hum |
| Wrong (soft) | `nope` | 180 Hz then 150 Hz square, lowpass 900 Hz, 110 + 160 ms | buzzer: nope |
| Gags | `pie`, `chicken`, `trombone`, `zap`, `splash` | see §7.3 | see §7.3 |
| Narrator | `laugh` | 4 × square blips 340→280 Hz falling 18 Hz each, 140 ms apart | Bossworth laughs |
| Reward | `success` | C5-E5-G5 square arpeggio 80 ms apart, then C-E-G-C chord 600 ms + 6 kHz shimmer | victory jingle |
| Reward | `secret` | 1318-1568-1976-2637 Hz sine 70 ms apart | sparkly chime |
| Reward | `unlock` | G4-C5-E5-G5 triangle 60 ms apart | unlock jingle |
| Reward | `achievement` | C5-G5-C6-G6 triangle 80 ms apart | achievement fanfare |
| Reward | `trophy` | three square/triangle chords rising (C, D, E major) + shimmer | trophy fanfare |
| Story | `chapter` | G4-C5-E5-G5-C6 triangle + C chord | chapter fanfare |
| Story | `stamp` | 110 → 55 Hz square 180 ms + lowpass noise | stamp thud |
| Story | `ending` | C4…G5 triangle run 120 ms apart + C chord 1.2 s | ending fanfare |
| Story | `boom` | lowpass noise 800 → 60 Hz 1.2 s + 90 → 25 Hz saw | huge explosion |
| Story | `gameover` | G4-E4-C4-G3 square 280 ms apart | game-over sting |
| Sabotage | `ruin` | C5-A4-F4-C4-G3 saw cascade + noise collapse 900 → 80 Hz | everything falls apart |
| U.N.D.O. | `glitch` | 4 square blips 200/530/860/1190 Hz + Q6 noise | digital glitch |
| World | `phone` | 1320 Hz sine with 22 Hz trill, ring-ring pattern | phone ringing |
| Hint | `warmer` | 1568 + 2093 Hz sine pings | twinkle |

Style: toy-like square/triangle/sine waves, short exponential tails, filtered noise for physical
impacts. Major/pentatonic for rewards, descending for failure. No realistic samples, no screams, no
gunshots, no horror stingers, no melody that quotes an existing tune.

Loudness rules: one tonal voice ≤ 0.09 gain (stamp is the loudest at .09); noise ≤ 0.3 (boom, ruin);
sum of simultaneous voices ≤ 0.35 before the compressor; SFX ≤ 1.2 s except `ending`/`boom`/
`trophy` (≤ 2 s); UI clicks ≤ 60 ms. A new sound must sit within ±3 dB of its category neighbours
(compare peak gain × duration by ear at default volumes).

### 9.3 Voice

See §2.1. Per-costume voices are fixed. Moods only scale pitch (`MOOD_PITCH`) and slide direction.
The voice bus ducks nothing; keep SFX that play under speech short.

### 9.4 Music

Optional, off by default. One generative loop per chapter: a pentatonic-family scale
(`SCALES[chapter]`) on a root (`ROOTS`: 262, 247, 277, 233, 294, 220, 262, 247, 196 Hz), a triangle
arpeggio note every 420 ms (vol .05, lowpass 1800 Hz, octave up on the second half of each 8-step
bar) and a sine bass (root/2, 1.6 s) every 8 steps. Rules: no drums, no lead melody, never louder
than the voice, stops on endings (endings use stingers).

### 9.5 Captions

`OBEY.extras.CAPTIONS` maps every SFX name to a bracketed caption shown top-centre for 1.8 s
(white on 82 % black, two most recent kept). Every new sound needs a caption before it ships; only
`tap` and `ui` (pure feedback for an action the player just took) are exempt. No puzzle may depend
on hearing: Level 11 "The Silent Level" and Level 15 "The Volume Knob" both show their state on
screen.

---

## 10. Video, trailer and screenshot rules

There are no in-game videos. "Video" = trailers, GIFs and store/press captures recorded from the
running game, plus in-game animated sequences (chapter cards, endings, fake game over).

**Capture setup.** Playwright, Chromium. `node tools/serve.js 8080`, open `/index.html?test=1`, seed
with `OBEY_TEST.seed(save)`, navigate with `location.hash = 'level/N'` (bonus 101–104,
`ending/hero|chaos|secret` once seen). Wait ≥ 900 ms after navigation for entrance animations. Hide
nothing in the UI; never edit screenshots except to crop.

**Sizes.** Desktop 1365×900 (canonical), 1920×1080 (trailer), iPad 1024×768 and 820×1180, phone
390×844, small 320×700. Store art: crop to the stage + narrator panel. Always Classic theme unless the
shot is about themes; one Sunset shot per set at most.

**Screenshot rules.** Show Bossworth mid-sentence with a mood that matches the line. Show one tell
and one temptation in the same frame. Never show a solved puzzle's answer in marketing shots of
Levels 1–12. No spoilers of endings in store shots (the kicker "Hero ending" is fine; the final card
is not). Keep the cursor out unless demonstrating a drag.

**Trailer guide (30–45 s).**
1. 0–3 s: black → the LOL. stamp slams (stamp-in, `stamp` SFX). Card: "The narrator lies."
2. 3–12 s: Level 1 in one take: Bossworth says press red → red deflates → tiny blue button → press.
   Cut on the completion stamp DISOBEYED.
3. 12–24 s: a montage of tells and traps, 1.5–2 s each, cut on the stamp or the gag word: L2 EXIT
   wall, L25 mirror, L20 scale, L8 crate, L12 parrot. One pie gag, one chicken gag. Keep the
   captions setting **on** so every sound has its caption on screen.
4. 24–34 s: U.N.D.O. leak chat (glitch), costume flip (8 costumes, 6 frames each), map pull-out.
5. 34–40 s: end card on Classic `--bg` with the logo and "No ads · no tracking · works offline".
- Edit timing: cut on stamps and button presses; no cross-dissolves; hard cuts or a 3-frame white
  flash. Text cards use Bagel Fat One on paper slips, ≤ 5 words.
- Audio: game SFX + Bossworth babble only, plus an original track in the §9.4 style if needed
  (pentatonic, triangle/square, 105–125 BPM). Mix voice above music by ≥ 6 dB.
- Never: fake UI, features that don't exist, 3D that doesn't exist (see §8.1), real brands.
- GIFs: ≤ 6 s, 12–15 fps, 640 px wide, loop on a held frame (stamp or completion).
- Accessibility: burn-in captions for all speech; no flashing above 3 per second.

---

## 11. iPad and small-screen presentation

Measured stage sizes: 640 px at 1365×900, 538 px at 1024×768 (landscape rule
`max-width: min(640px, 100dvh − 230px)` keeps the stage above the fold), 366 px at 390×844.

- **≥ 901 px:** narrator column (220–320 px) left, stage right; U.N.D.O. under the narrator.
  Left-handed setting mirrors this.
- **≤ 900 px:** narrator on top as a row (96 px portrait, 74 px ≤ 520 px), stage, then U.N.D.O.
  Composure meter hidden.
- **iPad portrait 700–900:** stage up to 700 px; narrator 120 px.
- **Short landscape (≤ 520 px tall):** side by side, stage sized by height.
- **≤ 520 px:** chip labels collapse to icons; shadows drop to 4 px; logo stroke 3 px.
- Touch: 44 px minimum hit area for every stage button (invisible `::after` extension), 46–50 px
  chips and buttons on coarse pointers, no hover effects on `hover: none`, safe-area insets on every
  edge, no text selection or callouts on objects.
- Small-screen art rules: an object that carries text must be ≥ 25 % of stage width; numbers inside
  art (`footprint`, `drawer`, `door` signs) must render ≥ 12 px at a 366 px stage; avoid more than
  six interactive objects in a row.

---

## 12. Accessibility as a style constraint

- Contrast per §5.2; no new pair may be added below its requirement.
- Every colour code has a second channel (§5.3). Every sound has a caption (§9.5). Every animation
  has a reduced-motion final frame (§7.4).
- Every interactive object has an `aria-label` that names what it *is*, not what Bossworth calls it
  (labels never lie either). Static objects with information get `role="img"` + label.
- Focus ring: 4 px `--accent-2` + 7 px ink halo. Never remove it.
- Text sizes: `--fs` 17/20/23 px; layouts must hold at XL (23 px) and with the plain font.
- High contrast mode: black ink, white surfaces, 4 px lines, no dots; art colours are unchanged, so
  every object must already have an ink outline.
- Hold interactions offer Hold assist (tap to start/stop); drags have tap-to-pick/tap-to-place.

---

## 13. Do / don't gallery (in words)

| Do | Don't |
|---|---|
| A big red button on a dark plinth with one white highlight, 4 px ink outline. | A glossy, gradient-shaded button with a soft drop shadow. |
| A sign that lies, drawn as a perfectly normal yellow sign. | A "lying" sign with a sly face or red tint that gives the puzzle away before the player thinks. |
| The tell as a second, smaller, honest object (NOT AN EXIT door). | The tell as a 2 px colour shift or a hover-only tooltip. |
| Static rule cards flat (no shadow); buttons shadowed. | Plaques and buttons that look identical. |
| Bossworth `pleased` while lying confidently. | Bossworth `laughing` on every line (it shakes and adds SFX). |
| Shapes + colour for codes (▲ red, ● yellow, ■ blue). | Red vs. green dots only. |
| A pie that splats and fades in 1.9 s with "splat!" captioned. | A gag that covers the stage for 4 s or hides the wrong card. |
| Stage text ≥ 12 px on a phone, on paper, in ink. | 9 px numerals inside drawings. |
| New object drawn in a 100–200 unit viewBox with `SW`/`SW3` and `INK`. | Hard-coded `#1c1640` outlines (won't recolour in themes or high contrast). |
| Machines and screens dark with phosphor green text. | Neon on neon or text on a busy pattern. |
| U.N.D.O. in monospace, glitching. | Bossworth in monospace, or U.N.D.O. in Bagel Fat One. |
| Endings with their own background and the same paper cards. | A new font, new outline colour or blurred shadows for a "special" screen. |

---

## 14. Writing on screen

Bossworth's lines: ≤ 3 sentences, ≤ 40 words for intros (bubble min-height 7.5em holds ~4 lines
at 300 px). Stage directions in `*asterisks*`. Goal line ≤ 12 words. Button labels ≤ 3 words.
Signs ≤ 6 words, ideally ≤ 3. The completion "trick" line explains the tell in one sentence.

---

## 15. Asset hygiene

- Inline SVG only, generated by functions; `aria-hidden="true" focusable="false"` on decorative art.
- Use `OBEY.art.addObject(key, fn)` / `addIcon` from a new file loaded after `art.js`; keep
  `svg()`, `SW`, `SW3`, `INK` from `OBEY.art`.
- `preserveAspectRatio="xMidYMid meet"` for objects; `none` only for terrain (`fill-art`,
  `water-art`).
- Fonts: only the two bundled faces (OFL). Bitmaps only for home-screen icons. Record new assets in
  `ASSETS.md`.
- `theme-color` / manifest colours should come from the Classic tokens.

---

## 16. Review checklist

Run for every new level, object, screen, animation or sound.

**Identity**
- [ ] Ink outlines 3–6 px rendered at a 640 px stage; `INK` not a hex.
- [ ] Flat fills, one highlight, hard ink shadows down-right; no blur except listed glows.
- [ ] Colours from §3.3 object palette or theme tokens; no new hex without adding it here.
- [ ] Bossworth's mood matches the subtext of the line.
- [ ] Display face only for names, titles, stamps, numbers, ≤ 6 words.

**Fairness and readability**
- [ ] The solution has a visible tell on first look (not hover, not sound, not colour alone).
- [ ] Interactive objects look interactive (shadow/lift); static info is flat; decorations are static.
- [ ] Labels and `aria-label`s are honest even when Bossworth is not.
- [ ] Composition: floor at 74 %, 4 % margins, info top / actors middle / controls bottom.
- [ ] Nothing overlaps another interactive object's hit area; no text overflows its card.

**Accessibility**
- [ ] Every new text/background pair computed ≥ 4.5 (≥ 3 large/non-text) in all 4 themes + high
      contrast.
- [ ] Colour codes have a second channel; CVD ΔE ≥ 20 or second channel.
- [ ] Stage text ≥ 12 px at 390×844; tap targets ≥ 44 px.
- [ ] Works in plain font and XL text.
- [ ] Reduced motion keeps the information; no flashing > 3 Hz.
- [ ] Every new sound has a caption; no puzzle needs sound.

**Platforms**
- [ ] Screenshots at 1365×900, 1024×768, 820×1180, 390×844, 320×700: no horizontal scroll, stage
      above the fold on 1024×768, nothing clipped.
- [ ] Checked in Classic, Sunset (dark bg) and high contrast.

**Audio**
- [ ] Tonal voices ≤ 0.09, noise ≤ 0.3, ≤ 1.2 s (≤ 2 s for finales); category-consistent recipe.

**Bookkeeping**
- [ ] Bible updated (object list, palette, sound table, captions).
- [ ] `node tools/check.js` and `node --test tests/unit/*.test.js` pass if code changed.

---

## 17. Regenerating the numbers

The baseline numbers were produced with scripts kept outside the repo (session scratchpad
`art/contrast.py`, `art/capture.js`, `art/strokes.js`):
- **Contrast + CVD:** parse the `:root`/`[data-theme]`/`[data-contrast="high"]` blocks of
  `css/style.css`, compute WCAG relative luminance contrast for each pair in §5.2 (alpha-composite
  opacity cases first), and simulate CVD with the Machado 2009 matrices (severity 1.0) in linear RGB,
  measuring CIE76 ΔE in Lab.
- **Geometry:** Playwright at each viewport; for each `#stage [data-obj]` record its box, computed
  font size, text overflow and whether its text leaves the stage; for each `svg.art` compute
  rendered outline = 4 × min(boxW / viewBoxW, boxH / viewBoxH).
If these become part of the repo, put them under `tools/art/` and keep this section pointing at
them.
