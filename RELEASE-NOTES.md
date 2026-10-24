# OBEY? LOL. — Release notes

## Version 1.0.0

The first complete release.

**What it is:** a single-player puzzle adventure where the narrator, Bossworth, tells you what to
do — and you decide whether he deserves it. Runs entirely offline in a browser; open `index.html`.

**Highlights**
- 16 levels, each with its own trick: a fake tutorial, a silent level, a broken room with swapped
  controls, a rulebook you can rewrite, a double bluff you can only beat by trusting him once.
- 3 endings: repair the Instruction Machine (Hero), overload it (Chaos), or find all 15 secrets
  and write the last instruction yourself (Secret Master).
- 15 secrets, 8 costumes, 4 themes, 11 achievements, stars on every level.
- Works with mouse, touch and keyboard. Reduced motion and large text are built in.

**Compatibility:** verified in Chromium (desktop and mobile emulation). Firefox and Safari are
expected to work but were not tested in this release — see `TEST-REPORT.md`.

**Saves:** stored in the browser. Opening from `file://` and from a local server keeps separate saves.

**Quality:** 284 static checks, 121 unit tests and 42 Chromium browser tests pass, including a
full playthrough, all secrets, all endings and five screen sizes. An independent QA review found
9 defects (none blocking); all are fixed and covered by regression tests.

**Known issues:** none reproducible. Firefox, Safari, real phones and screen readers are not yet
verified — see `TEST-REPORT.md`.
