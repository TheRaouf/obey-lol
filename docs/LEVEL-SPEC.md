# Level specification

_Generated from the level definitions by `tools/gen-docs.js` — do not edit by hand._

Star rule for every level (only **par** differs): ★★★ = actions ≤ par and no hints; ★★ = actions ≤ par + 4 and at most 1 hint; ★ = any finish. The best result per level is kept.
Counted actions: taps, completed drops and press-and-holds on puzzle objects. Decorative/secret objects, the narrator, waiting and hints are not actions (hints cap stars instead).
Restart (button) = fresh attempt: state, timers, actions and hints reset. A trap (soft fail) resets the room but keeps the attempt's action/hint counts.

## 1. The Red Button

| Field | Value |
|---|---|
| Stable ID | `red-button` |
| Objective | Finish the level. Bossworth will tell you how. Allegedly. |
| Intro dialogue | Welcome, player! I'm Bossworth, your Narrator. To finish this level, press the big red button. |
| Player actions | tap |
| Interactive objects | `red`, `blue`, `plant` (free), `note` (free) |
| Success path (automated) | tap `red`, tap `blue` |
| Plausible wrong actions | Pressing the red button again does nothing useful. |
| Par (3★) | 2 |
| Hints | 1) Bossworth isn't always telling the truth. 2) Pressing the red button changes what is in the room. 3) Press the red button, then press the button he warns you about. |
| Completion text | Level 1 complete. Don't let it go to your head. |
| Secrets | `plant-whisperer` — Level 1: tap the potted plant. (path: tap `plant`)<br>`deja-vu` — Replay Level 1 after completing it and tap the folded note. (path: tap `note`) |
| Ending consequences | None. |

## 2. The Wrong Door

| Field | Value |
|---|---|
| Stable ID | `wrong-door` |
| Objective | Leave the room. |
| Intro dialogue | See that big shiny EXIT door? That's the exit. Obviously. Walk right through it. |
| Player actions | tap |
| Interactive objects | `corner` (free), `exit`, `mat`, `key`, `closet`, `inv` (info) |
| Success path (automated) | tap `mat`, tap `key`, tap `closet` |
| Plausible wrong actions | Opening the EXIT door reveals a brick wall. The small door is locked until you have the key. |
| Par (3★) | 3 |
| Hints | 1) Doors labelled by Bossworth may not be honest about what they are. 2) The doormat looks suspiciously lumpy. 3) Lift the mat, take the key, then try the small door. |
| Completion text | Fine. The "not an exit" was an exit. Words mean nothing anymore. |
| Secrets | `empty-corner` — Level 2: inspect the empty top-right corner. (path: tap `corner`) |
| Ending consequences | None. |

## 3. Hands Off

| Field | Value |
|---|---|
| Stable ID | `hands-off` |
| Objective | Survive the countdown. |
| Intro dialogue | QUICK! Press the button before the timer hits zero! PRESS IT! NOW! |
| Player actions | tap, wait |
| Interactive objects | `sign` (info), `timer` (info), `button` |
| Success path (automated) | wait 10500 ms |
| Plausible wrong actions | Pressing the button fails the test of restraint and restarts the countdown. |
| Par (3★) | 0 |
| Hints | 1) Not every instruction is a request. Look at the sign. 2) What happens if you do nothing at all? 3) Don't touch the button. Just wait for the timer to reach zero. |
| Completion text | Doing nothing: officially a strategy. |
| Secrets | `personal-space` — Level 3: poke Bossworth while he counts down. (path: tap `narrator`) |
| Ending consequences | None. |

## 4. The Missing Button

| Field | Value |
|---|---|
| Stable ID | `missing-button` |
| Objective | Open the door. |
| Intro dialogue | Press the button to open the door. …Wait. Where's the button? SOMEONE STOLE MY BUTTON. |
| Player actions | tap |
| Interactive objects | `lamp`, `painting`, `code` (free), `door` |
| Success path (automated) | tap `lamp`, tap `painting`, tap `door` |
| Plausible wrong actions | The painting does nothing with the lights on. The door stays locked until the button is pressed. |
| Par (3★) | 3 |
| Hints | 1) Look around the whole room, not just at the door. 2) Some things only show up in the dark. 3) Turn off the lamp, press the painting, then open the door. |
| Completion text | The button was art all along. |
| Secrets | `glow-code` — Level 4: turn the lamp off and tap the glowing numbers. (path: tap `lamp`, tap `code`) |
| Ending consequences | None. (The glowing code matters later.) |

## 5. Reverse Psychology

| Field | Value |
|---|---|
| Stable ID | `reverse-psychology` |
| Objective | Pull the one switch that is the exit. |
| Intro dialogue | I'm feeling HONEST today: exactly ONE of my three statements is true. And don't even THINK about switch B. |
| Player actions | tap, logic |
| Interactive objects | `st1` (free), `st2` (free), `st3` (free), `swA`, `swB`, `swC` |
| Success path (automated) | tap `swB` |
| Plausible wrong actions | Switch A and switch C are traps (soft fail). |
| Par (3★) | 1 |
| Hints | 1) Statements ① and ③ contradict each other, so exactly one of them is true. 2) That means the one true statement is ① or ③ — so statement ② must be false. 3) If "B is NOT the exit" is false, then B is the exit. |
| Completion text | Logic: my one weakness. My other weakness is you. |
| Secrets | `countdown` — Level 5: tap statements 3, 2, 1 in that order. (path: tap `st3`, tap `st2`, tap `st1`) |
| Ending consequences | None. |

## 6. The Waiting Room

| Field | Value |
|---|---|
| Stable ID | `waiting-room` |
| Objective | Get served. Your ticket is #17. |
| Intro dialogue | Welcome to the Waiting Room! Your ticket is #17. Ring the bell to be served. Ring it LOTS — ringing makes the queue go faster! |
| Player actions | tap, wait |
| Interactive objects | `display` (info), `ticket` (info), `medal` (info), `magazine` (free), `bell` |
| Success path (automated) | wait 8000 ms, tap `bell` |
| Plausible wrong actions | Ringing the bell before #17 is called moves the queue back one number. |
| Par (3★) | 1 |
| Hints | 1) Watch the NOW SERVING display. 2) Ringing early actually slows the queue down. 3) Wait until NOW SERVING shows #17, then ring the bell once. |
| Completion text | Patience: unlocked. |
| Secrets | `extremely-patient` — Level 6: after #17 is called, wait 30 more seconds before ringing. (path: wait 38500 ms) |
| Ending consequences | None. |

## 7. The Fake Tutorial

| Field | Value |
|---|---|
| Stable ID | `fake-tutorial` |
| Objective | Complete the tutorial. Or… finish the level some other way. |
| Intro dialogue | Welcome to the official Tutorial! It will teach you everything. Just keep pressing NEXT. Forever. |
| Player actions | tap, read |
| Interactive objects | `exit`, `box` (info), `next`, `close`, `honest` (free), `honestnote` (info) |
| Success path (automated) | tap `close`, tap `exit` |
| Alternative `viaNext` | tap `next`, tap `next`, tap `close`, tap `exit` |
| Plausible wrong actions | NEXT cycles through tips forever. |
| Par (3★) | 2 |
| Hints | 1) Tutorials can be closed… can't they? 2) The tip box has more than one button on it. 3) Close the tip box with × and use what is behind it. |
| Completion text | Tutorial skipped. Lesson learned anyway. |
| Secrets | `tutorial-dropout` — Level 7: finish without ever pressing NEXT. (path: tap `close`, tap `exit`) |
| Ending consequences | None. |

## 8. Object Permanence

| Field | Value |
|---|---|
| Stable ID | `object-permanence` |
| Objective | Unlock the exit. |
| Intro dialogue | Leave that crate EXACTLY where it is. There is nothing behind it. Also, that key is purely decorative. |
| Player actions | drag, tap |
| Interactive objects | `key` (drag), `bin` (drop zone) (free), `floor` (drop zone), `door` (drop zone), `crate` (drag) |
| Success path (automated) | drag `crate` → `floor`, drag `key` → `door` |
| Plausible wrong actions | The key returns to the shelf if dropped anywhere but an uncovered door. |
| Par (3★) | 2 |
| Hints | 1) That crate is hiding something. 2) Drag the crate away (or tap it, then tap an empty spot), then deal with the key. 3) Move the crate off the door, then drag the key onto the door. |
| Completion text | Things exist even when you can't see them. Terrifying. |
| Secrets | `tidy-up` — Level 8: drag the crate into the bin. (path: drag `crate` → `bin`) |
| Ending consequences | None. |

## 9. The Suspicious Gift

| Field | Value |
|---|---|
| Stable ID | `suspicious-gift` |
| Objective | Deal with the gift. |
| Intro dialogue | A GIFT! For you! Open it! Pull the bow! Nothing bad will happen! Probably! |
| Player actions | tap, hold, drag, choice |
| Interactive objects | `gift` (drag) (hold), `bow`, `tag`, `mailbox` (drop zone) (free), Bossworth (drop zone) |
| Success path (automated) | tap `tag`, drag `gift` → `mailbox` |
| Alternative `prank` | tap `tag`, drag `gift` → `narrator` |
| Plausible wrong actions | Pulling the bow opens the gift: boxing glove, soft fail. |
| Par (3★) | 2 |
| Hints | 1) Read before you open. 2) The tag says who the gift is really for. 3) Drag the gift to Bossworth — or into the mailbox. Don't open it yourself. |
| Completion text | Gift handled. Nobody got bonked who didn't deserve it. |
| Secrets | `shaken` — Level 9: press and hold the gift for 2 seconds. (path: hold `gift` 2200 ms) |
| Ending consequences | Choice: giving it to Bossworth leans Chaos; returning it by mail leans Hero. |

## 10. The Rulebook

| Field | Value |
|---|---|
| Stable ID | `rulebook` |
| Objective | Get through the door that is "locked forever". |
| Intro dialogue | Behold: THE RULEBOOK. Everything written in it is true. Rule 3 says the door is locked forever. And do NOT touch the pen. |
| Player actions | tap, choice |
| Interactive objects | `book` (info), `pen`, `door`, `sandwich` (free), `w-door`, `w-potato`, `w-snack` |
| Success path (automated) | tap `pen`, tap `w-door`, tap `door` |
| Alternative `potato` | tap `pen`, tap `w-potato`, tap `door` |
| Plausible wrong actions | The door is locked until a rule opens it. The sandwich rule does not open the door. |
| Par (3★) | 3 |
| Hints | 1) Read Rule 1 and Rule 2 carefully. 2) If everything written in the book is true, what would you write in Rule 4? 3) Take the pen and write "The door is open." Then use the door. |
| Completion text | Rules: bent. Narrator: possibly mashed. |
| Secrets | `snack-rule` — Level 10: write the sandwich rule, then eat the sandwich. (path: tap `pen`, tap `w-snack`, tap `sandwich`) |
| Ending consequences | Choice: the door rule leans Hero; the potato rule leans Chaos. |

## 11. The Silent Level

| Field | Value |
|---|---|
| Stable ID | `silent-level` |
| Objective | … |
| Intro dialogue | _(silent level — no dialogue)_ |
| Player actions | tap, observe, sequence |
| Interactive objects | `door`, `mousehole` (free), `fp0` (info), `fp1` (info), `fp2` (info), `fp3` (info), `btn-red`, `btn-yellow`, `btn-blue`, `progress` (info) |
| Success path (automated) | tap `btn-blue`, tap `btn-red`, tap `btn-yellow`, tap `btn-red`, tap `door` |
| Plausible wrong actions | Pressing a button out of order flashes ✗ and clears the entry. |
| Par (3★) | 5 |
| Hints | 1) Follow the footsteps. 2) Each footprint matches one panel button by colour and shape. 3) Press ■ blue, ▲ red, ● yellow, ▲ red — then the door. |
| Completion text | Solved in silence. Bossworth is speechless (literally). |
| Secrets | `silent-partner` — Level 11: tap the mouse hole. (path: tap `mousehole`) |
| Ending consequences | None. |

## 12. The Double Bluff

| Field | Value |
|---|---|
| Stable ID | `double-bluff` |
| Objective | Find the real way out. |
| Intro dialogue | Two doors. The left one? Trap. The right one? Also, honestly, a trap. The LEVER opens the exit. I am telling the truth. Pull it. |
| Player actions | tap, drag, trust |
| Interactive objects | `left`, `right`, `lever`, `parrot` (drop zone) (free), `cracker` (drag) (free) |
| Success path (automated) | tap `lever` |
| Plausible wrong actions | The left door drops you through a trapdoor (soft fail). The right door delivers a pie to the face (soft fail). |
| Par (3★) | 1 |
| Hints | 1) Bossworth can tell the truth when he expects you to disobey. 2) Ask the parrot — it only repeats true things. 3) Pull the lever. Really. |
| Completion text | The deepest bluff is the truth. |
| Secrets | `polly` — Level 12: drag the cracker onto the parrot. (path: drag `cracker` → `parrot`) |
| Ending consequences | None. |

## 13. The Broken Room

| Field | Value |
|---|---|
| Stable ID | `broken-room` |
| Objective | Walk to the door on the right. |
| Intro dialogue | Use the arrows to walk to the door. Everything works perfectly. Nothing is broken. Don't press DUCK — ducking is for cowards. |
| Player actions | tap, experiment |
| Interactive objects | `panel` (free), `tile2` (info), `door` (info), `hero` (info), `left`, `duck`, `right` |
| Success path (automated) | tap `left`, tap `duck`, tap `left` |
| Plausible wrong actions | ▶ walks you away from the door. Stepping into the gap returns you to the start tile. |
| Par (3★) | 3 |
| Hints | 1) The room is broken: try each button once and watch what really happens. 2) ◀ moves you right, and DUCK makes you jump over one tile. 3) Press ◀, then DUCK over the gap, then ◀ again. |
| Completion text | You adapted to a broken world. Bossworth is filing a repair ticket. |
| Secrets | `long-memory` — Level 13: open the wall panel and enter 4-2-7. (path: tap `panel`, tap `k4`, tap `k2`, tap `k7`) |
| Ending consequences | None. |

## 14. The Final Warning

| Field | Value |
|---|---|
| Stable ID | `final-warning` |
| Objective | Power the gate and get out. |
| Intro dialogue | FINAL WARNING. Do NOT plug in the battery. Do NOT hold the charge button. Do NOT wait for the green light. And do NOT touch my sign. |
| Player actions | drag, hold, wait, choice |
| Interactive objects | `sign` (info), `fine` (free), `light` (info), `gate` (info), `battery` (drag), `socket` (drop zone) (free), `charge` (hold), `opt-fix`, `opt-doodle` |
| Success path (automated) | drag `battery` → `socket`, hold `charge` 2200 ms, wait 3200 ms, tap `opt-fix` |
| Alternative `graffiti` | drag `battery` → `socket`, hold `charge` 2200 ms, wait 3200 ms, tap `opt-doodle` |
| Plausible wrong actions | CHARGE does nothing without the battery. Releasing CHARGE early resets the meter. |
| Par (3★) | 3 |
| Hints | 1) This level uses everything you've learned: dragging, holding and waiting. 2) Plug the battery into the socket, then press and hold CHARGE until the meter fills. 3) After charging, wait for the light to turn green, then decide what to do with the sign. |
| Completion text | Warnings: thoroughly ignored. Gate: open. |
| Secrets | `fine-print` — Level 14: tap the fine print on the warning sign. (path: tap `fine`) |
| Ending consequences | Choice: straightening the sign leans Hero; doodling on it leans Chaos. |

## 15. The Last Instruction

| Field | Value |
|---|---|
| Stable ID | `last-instruction` |
| Objective | Follow Bossworth's last instruction… or at least listen to it. |
| Intro dialogue | _Dynamic (reacts to earlier choices)_ e.g. "I can't figure you out yet. That's unsettling. Hm. My last instruction: collect the three gears of my Instruction Machine. Totally harmless." |
| Player actions | tap, search, choice |
| Interactive objects | `machine` (info), `gearA`, `rug`, `gearB`, `q` (info), `yes`, `why` |
| Success path (automated) | tap `gearA`, tap `rug`, tap `gearB`, tap `narrator`, tap `yes` |
| Alternative `why` | tap `gearA`, tap `rug`, tap `gearB`, tap `narrator`, tap `why` |
| Plausible wrong actions | Answering is impossible until all gears are collected. |
| Par (3★) | 4 |
| Hints | 1) Three gears: one obvious, one hidden, and one… worn by someone. 2) Look under the rug, and check Bossworth himself. 3) Collect all three gears, then answer his question. |
| Completion text | The machine is assembled. One level left. |
| Secrets | none |
| Ending consequences | Choice: trusting him leans Hero; asking why leans Chaos. Dialogue reflects earlier choices. |

## 16. The Final Decision

| Field | Value |
|---|---|
| Stable ID | `final-decision` |
| Objective | Decide what happens to the Instruction Machine. |
| Intro dialogue | _Dynamic (reacts to earlier choices)_ e.g. "This is it: the Instruction Machine. Press OBEY and I'll be in charge of every level, forever. Easy choice, really." |
| Player actions | tap, hold, drag, choice |
| Interactive objects | `machine` (drop zone) (free), `obey`, `wrench` (hold), `fuse` (drag), `quill` |
| Success path (automated) | hold `wrench` 2200 ms |
| Alternative `chaos` | drag `fuse` → `machine` |
| Alternative `secret` | tap `quill` _(requires all 15 secrets)_ |
| Plausible wrong actions | Pressing OBEY does not end the game — Bossworth has no idea what to do when obeyed. |
| Par (3★) | 2 |
| Hints | 1) There is more than one way to end this. 2) You can repair the machine or overload it — both finish the game. 3) Hold the wrench to repair, or drag the fuse into the machine. All 15 secrets reveal a third way. |
| Completion text | The end. Or is it? (It is. Mostly.) |
| Secrets | none |
| Ending consequences | Hero: repair (hold wrench). Chaos: overload (drag fuse). Secret Master: all 15 secrets + golden quill. |

