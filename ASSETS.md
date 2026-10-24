# Asset attribution

| Asset | Source | License |
|---|---|---|
| Bossworth (narrator), 8 costumes, 8 moods + sleep/gag/potato overlays | Original, drawn in code (`js/ui/art.js`) | MIT (project) |
| All level objects, icons, map, logo, endings | Original, drawn in code (`js/ui/art.js`, `js/ui/art-extra.js`, `js/ui/art-pack-a…e.js`, `js/ui/screens.js`, `js/ui/endings.js`, `css/style.css`) | MIT (project) |
| `assets/icon.svg` | Original | MIT (project) |
| Sound effects and music | Synthesised at runtime with the Web Audio API (`js/ui/audio.js`); no audio files | MIT (project) |
| All writing, dialogue, puzzles | Original | MIT (project) |
| `assets/fonts/bagel-fat-one-latin.woff2` | Bagel Fat One © 2022 The Bagel Fat Project Authors, via the `@fontsource/bagel-fat-one` npm package (latin subset) | SIL Open Font License 1.1 (`assets/fonts/OFL-BagelFatOne.txt`) |
| `assets/fonts/atkinson-hyperlegible-400.woff2`, `-700.woff2` | Atkinson Hyperlegible © 2020 Braille Institute of America, via `@fontsource/atkinson-hyperlegible` (latin subset) | SIL Open Font License 1.1 (`assets/fonts/OFL-AtkinsonHyperlegible.txt`) |

No third-party code libraries ship with the game. Playwright is used only as a development
dependency for browser tests.

## Added in 2.3

All original and drawn or synthesised in code (MIT, project); no new files, fonts or bitmaps.

- **Icons** (`js/ui/art-extra.js`, 24-unit viewBox, `currentColor`, stroke 2.2): menu `plus`,
  `bowtie`, `palette`, `scroll`, `cup`; chapter landmarks `button`, `stapler`, `sock`, `palm`,
  `flask`, `rocket`, `curtain` (with the existing `gear`), mapped by `OBEY.art.chapterIcon`.
- **Art options** (`js/ui/art.js`): small U.N.D.O. head (`undoBot` default), `machine` `asleep`,
  `trophy` `icon` engraving, self-sizing `door` signs, bulb rays; a spring prop and the
  Instruction Machine scenes in `js/ui/endings.js`; the credits cast strip in `js/ui/screens.js`.
- **Sounds** (`js/ui/audio.js`): `charged`, `star1`–`star3`, `undo`, `toggle`, `wear`, `paint`,
  `locked`, `boing`, and seven music families (office, home, outdoors, science, show, final,
  studio). Captions in `js/core/extras.js`.
- **Dev tools** (not shipped to players): `tools/art/contrast.js`, `strokes.js`, `sheets.js`,
  `lib.js`; original, MIT.
