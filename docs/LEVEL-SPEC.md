# Level specification

_Generated from the level definitions by `tools/gen-docs.js` — do not edit by hand._

Star rules (only **par** differs per level). Easy: ★★★ actions ≤ par + 2, ★★ ≤ par + 8, hints free. Medium: ★★★ actions ≤ par and no hints, ★★ ≤ par + 4 and at most 1 hint. Hard (1 hint per level, traps cost +2 actions): ★★★ actions ≤ par with no hint and no trap, ★★ ≤ par + 2 with no hint. Any finish earns ★; a "Show me how" run earns ★. The best result per level is kept.
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
| Ruins (deliberately terrible finishes) | `button-masher` Button Masher — tap `red` 8× in one attempt |
| The trick (shown after solving) | He told you to press red. The real trick was pressing the one he begged you not to. |
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
| Ruins (deliberately terrible finishes) | `through-the-wall` Through the Wall — tap `exit` 5× in one attempt |
| The trick (shown after solving) | The labels lied: EXIT was a wall, the closet was the exit. |
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
| Ruins (deliberately terrible finishes) | `countdown-crasher` Countdown Crasher — 4 traps in one attempt |
| The trick (shown after solving) | "Press it!" was a test of restraint — the sign was the real instruction. |
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
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The missing button only exists in the dark. Turning off the light was the move. |
| Jigsaw piece | `jig-1` at 90%, 90% — replays only |
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
| Ruins (deliberately terrible finishes) | `switch-saboteur` Switch Saboteur — 4 traps in one attempt |
| The trick (shown after solving) | All three statements were reverse psychology. Only switch B was honest. |
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
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Waiting your turn was the whole puzzle. Ringing early sent you backwards. |
| Jigsaw piece | `jig-2` at 90%, 90% — replays only |
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
| Ruins (deliberately terrible finishes) | `next-addict` Next Addict — tap `next` 15× in one attempt |
| The trick (shown after solving) | NEXT never ends. Closing the tutorial is how tutorials end. |
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
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The key needed an uncovered door. Moving the crate first made it real. |
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
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The tag said "return to sender". Posting it back beat opening it. |
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
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The rulebook makes anything true — so you wrote a rule that opens the door. |
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
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | No narrator, so the footprints were the instructions. |
| Jigsaw piece | `jig-3` at 90%, 2% — replays only |
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
| Ruins (deliberately terrible finishes) | `pie-connoisseur` Pie Connoisseur — 4 traps in one attempt |
| The trick (shown after solving) | Both doors were bluffs. The lever was never mentioned, so it was honest. |
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
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The arrows were swapped. Walking "away" walked you home. |
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
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The warning was a dare. Power, patience, then fix it. |
| Jigsaw piece | `jig-4` at 90%, 2% — replays only |
| Ending consequences | Choice: straightening the sign leans Hero; doodling on it leans Chaos. |

## 15. The Volume Knob

| Field | Value |
|---|---|
| Stable ID | `volume-knob` |
| Objective | Get out of the sound booth. |
| Intro dialogue | Can you hear me? Turn the volume UP. All the way. My instructions deserve to be LOUD. |
| Player actions | tap, listen |
| Interactive objects | `speaker` (info), `volume` (info), `down`, `up`, `whisper` (info), `door` |
| Success path (automated) | tap `down`, tap `down`, tap `down`, tap `door`, tap `door` |
| Plausible wrong actions | Volume above 5 blows the speaker (trap). Knocking before you hear the whisper does nothing. |
| Par (3★) | 5 |
| Hints | 1) Sometimes the best instruction is the one you can barely hear. 2) Turn the volume all the way down and read what appears. 3) Press Quieter three times, then knock on the door twice. |
| Completion text | Silence: golden. Bossworth: muted. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `speaker-blower` Speaker Blower — 4 traps in one attempt |
| The trick (shown after solving) | Louder broke things. Quiet let you hear the whisper. |
| Ending consequences | None. |

## 16. Opposite Day

| Field | Value |
|---|---|
| Stable ID | `opposite-day` |
| Objective | Answer all three questions the Opposite Day way. |
| Intro dialogue | Happy Opposite Day! Every answer means its opposite. Answer my three questions… truthfully. Wait. Opposite of that. |
| Player actions | tap, logic |
| Interactive objects | `calendar` (info), `question` (info), `yes`, `no`, `score` (info) |
| Success path (automated) | tap `yes`, tap `no`, tap `no` |
| Plausible wrong actions | Any truthful answer is a trap and restarts the questions. |
| Par (3★) | 3 |
| Hints | 1) Work out the true answer first, then flip it. 2) The sky isn't green, so on Opposite Day you answer YES. 3) Answer YES, then NO, then NO. |
| Completion text | You said the opposite of everything. Bossworth feels seen. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `honest-abe` Honest to a Fault — 4 traps in one attempt |
| The trick (shown after solving) | On Opposite Day the honest answer is the opposite one. |
| Ending consequences | None. |

## 17. The Lost Sock

| Field | Value |
|---|---|
| Stable ID | `lost-sock` |
| Objective | Find Bossworth's lucky sock and put it in the laundry basket. |
| Intro dialogue | I lost my lucky sock. It is DEFINITELY in drawer 3. And do not disturb the cat. The cat is not involved. |
| Player actions | tap, search, drag |
| Interactive objects | `d1`, `d2`, `d3`, `basket` (drop zone) (free), `bed` (info), `sock` (drag), `cat`, Bossworth (drop zone) |
| Success path (automated) | tap `cat`, drag `sock` → `basket` |
| Plausible wrong actions | Drawers contain only gags. The sock must go in the basket, not anywhere else. |
| Par (3★) | 2 |
| Hints | 1) Bossworth was very keen that you leave the cat alone. 2) Look under the cat. 3) Tap the cat, then drag the sock into the laundry basket. |
| Completion text | The sock is found. The cat is unimpressed. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `drawer-diver` Drawer Diver — 8 harmless wrong moves in one attempt |
| The trick (shown after solving) | The cat was sitting on the sock. Wake the cat, not the drawers. |
| Ending consequences | None. |

## 18. Bossworth Says

| Field | Value |
|---|---|
| Stable ID | `bossworth-says` |
| Objective | Follow the command list correctly. |
| Intro dialogue | Let's play a game! Do everything on my list, in order. Everything. Every single thing. Go! |
| Player actions | tap, read, sequence |
| Interactive objects | `list` (info), `progress` (info), `drum`, `bell`, `horn` |
| Success path (automated) | tap `drum`, tap `horn`, tap `drum` |
| Plausible wrong actions | Tapping the bell, tapping the horn twice, or anything out of order is a trap. |
| Par (3★) | 3 |
| Hints | 1) This is a very old playground game. 2) Only commands that begin with "Bossworth says" count. Commands 2 and 4 are traps. 3) Tap the drum, then the horn, then the drum. |
| Completion text | You only obeyed when Bossworth said so. He is weirdly proud. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Only orders that start with "Bossworth says" count. |
| Ending consequences | None. |

## 19. The Shy Button

| Field | Value |
|---|---|
| Stable ID | `shy-button` |
| Objective | Press the shy button. |
| Intro dialogue | Press the button! Quick! Chase it! Faster! Never stop chasing! This is what life is! |
| Player actions | tap, wait, restraint |
| Interactive objects | `shy`, `peek` (info), `eyes` |
| Success path (automated) | tap `eyes`, wait 2700 ms, tap `shy` |
| Plausible wrong actions | Tapping the button while it can see you makes it run away. |
| Par (3★) | 2 |
| Hints | 1) Chasing never works on shy things. 2) Shy things come out when nobody is looking. 3) Tap "Cover your eyes", wait a few seconds, then press the sleeping button. |
| Completion text | Patience beat panic. Bossworth is taking notes. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The shy button only works when nobody is watching. Close the eyes. |
| Jigsaw piece | `jig-5` at 90%, 90% — replays only |
| Ending consequences | None. |

## 20. Weight of Words

| Field | Value |
|---|---|
| Stable ID | `weight-of-words` |
| Objective | Balance the scale. |
| Intro dialogue | Balance the scale! Put MASSIVE on it. Heavy needs something massive. It is the obvious choice. Obviously. |
| Player actions | drag, count, logic |
| Interactive objects | `rule` (info), `scale` (info), `pan` (drop zone), `w-A` (drag), `w-TINY` (drag), `w-MASSIVE` (drag), `w-NOTHING` (drag) |
| Success path (automated) | drag `w-TINY` → `pan`, drag `w-A` → `pan` |
| Plausible wrong actions | Going over 5 kg tips the scale (trap). |
| Par (3★) | 2 |
| Hints | 1) Read the sign: weight depends on the letters, not the meaning. 2) HEAVY weighs 5. MASSIVE and NOTHING weigh 7 each. You need exactly 5 on the right. 3) Drag TINY (4) and A (1) onto the right pan. |
| Completion text | Balanced. Words have weight. Bossworth's have more. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | "TINY" and "A" are light words. MASSIVE and NOTHING weigh what they say. |
| Ending consequences | None. |

## 21. Nap Time

| Field | Value |
|---|---|
| Stable ID | `nap-time` |
| Objective | Get through the door Bossworth is guarding. |
| Intro dialogue | Set the clock to any time you like. ANY time. Except three o'clock. Three o'clock is… private. |
| Player actions | tap, read |
| Interactive objects | `clock` (info), `back`, `fwd`, `poster` (info), `door` |
| Success path (automated) | tap `fwd`, tap `fwd`, tap `fwd`, tap `door` |
| Plausible wrong actions | The door will not open while Bossworth is awake and watching. |
| Par (3★) | 4 |
| Hints | 1) Read the poster on the wall. 2) What happens to a guard at nap time? 3) Press "Hour forward" three times to reach 3:00, then open the door. |
| Completion text | You waited for the guard to nap. Classic heist. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | You couldn't sneak past an awake Bossworth, so you moved the clock to nap time. |
| Ending consequences | None. |

## 22. Wet Paint

| Field | Value |
|---|---|
| Stable ID | `wet-paint` |
| Objective | Leave without ruining the paint job. |
| Intro dialogue | Fresh paint on the exit! Don't touch it. Don't fan it. Don't do ANYTHING for about a hundred years. |
| Player actions | hold, wait, tap |
| Interactive objects | `sign` (info), `door`, `fan` (hold) |
| Success path (automated) | hold `fan` 2200 ms, tap `door` |
| Alternative `patient` | wait 30500 ms, tap `door` |
| Plausible wrong actions | Touching the door while the paint is wet is a trap. Letting go of the fan too early does nothing. |
| Par (3★) | 2 |
| Hints | 1) Paint dries. Some things make it dry faster. 2) The fan can be pressed and held. 3) Hold the fan for two seconds (or wait 30 seconds), then open the door. |
| Completion text | Dry paint, clean hands, smug player. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Wet paint was real. Drying it first beat touching it. |
| Jigsaw piece | `jig-6` at 3%, 90% — replays only |
| Ending consequences | None. |

## 23. Zero Gravity

| Field | Value |
|---|---|
| Stable ID | `zero-gravity` |
| Objective | Unlock the door. |
| Intro dialogue | Welcome to zero gravity! Everything floats! Whatever you do, do NOT touch the gravity lever. I just got everything floating so nicely. |
| Player actions | tap, experiment |
| Interactive objects | `key`, `lever`, `inv` (info), `door` |
| Success path (automated) | tap `lever`, tap `key`, tap `door` |
| Plausible wrong actions | Grabbing the key while it floats makes it drift away. The door is locked without the key. |
| Par (3★) | 3 |
| Hints | 1) Floating things are hard to catch. 2) What would happen if gravity came back? 3) Pull the gravity lever, pick up the key from the floor, then open the door. |
| Completion text | Gravity: restored. Dignity: Bossworth's, not so much. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `key-chaser` Key Chaser — tap `key` 6× in one attempt |
| The trick (shown after solving) | Gravity was the "forbidden" lever — and the only way to catch the key. |
| Ending consequences | None. |

## 24. The Copycat

| Field | Value |
|---|---|
| Stable ID | `copycat` |
| Objective | Turn both lamps on. |
| Intro dialogue | Turn both lamps on. Easy! My cat Mimic will help. Mimic LOVES to help. Do not feed Mimic. Mimic is on a diet. |
| Player actions | tap, drag, observe |
| Interactive objects | `goal` (info), `lampL`, `lampR`, `cat` (drop zone) (free), `fish` (drag) |
| Success path (automated) | drag `fish` → `cat`, tap `lampR` |
| Plausible wrong actions | While Mimic is copying, every switch also flips the other lamp. |
| Par (3★) | 2 |
| Hints | 1) Watch what Mimic does every time you touch a lamp. 2) A busy cat can't copy anybody. 3) Drag the fish to Mimic, then switch on the right lamp. |
| Completion text | Two lamps, one fed cat, zero copying. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The copycat copied every switch. Distract it, then flip one. |
| Ending consequences | None. |

## 25. Mirror, Mirror

| Field | Value |
|---|---|
| Stable ID | `mirror-mirror` |
| Objective | Press the right shape. |
| Intro dialogue | Read the sign. Press what it says. Ignore the mirror. Mirrors are liars. Everything backwards is a lie. Including this sentence read backwards. |
| Player actions | read, tap |
| Interactive objects | `sign` (info), `mirror` (info), `mtext` (info), `green`, `purple`, `orange` |
| Success path (automated) | tap `purple` |
| Plausible wrong actions | The green circle and orange triangle are traps. |
| Par (3★) | 1 |
| Hints | 1) The mirror has writing on it. Try reading it backwards. 2) The mirror says the sign is lying. 3) Press the purple square. |
| Completion text | The mirror told the truth. Bossworth needs a new mirror. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The mirror told the truth. Backwards writing beat the sign. |
| Jigsaw piece | `jig-7` at 20%, 40% — replays only |
| Ending consequences | None. |

## 26. Two of a Kind

| Field | Value |
|---|---|
| Stable ID | `two-of-a-kind` |
| Objective | Pick the real exit. You may ask one question. |
| Intro dialogue | Meet my twin, Kevin. One of us ALWAYS lies and one ALWAYS tells the truth. You get ONE question. I won't say which of us is which. (It's Kevin. Kevin lies. Probably.) |
| Player actions | choice, logic, tap |
| Interactive objects | `kevin` (info), `leftdoor`, `rightdoor`, `answer` (info), `q-boss`, `q-kevin`, `q-meta` |
| Success path (automated) | tap `q-meta`, tap `rightdoor` |
| Plausible wrong actions | The left door is a trap. |
| Par (3★) | 2 |
| Hints | 1) A direct question only tells you what one twin says — not whether he's honest. 2) Ask one twin what the OTHER twin would say. Either way, that answer is a lie. 3) Ask Kevin what Bossworth would say (LEFT), then take the other door: RIGHT. |
| Completion text | Logic beat the twins. Kevin sends his regards (they are lies). |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Asking the meta question made the twins point to the same door. |
| Ending consequences | None. |

## 27. The Drip

| Field | Value |
|---|---|
| Stable ID | `the-drip` |
| Objective | Stop the leak before the room floods. |
| Intro dialogue | There's a tiny leak. Ignore it. Leaks fix themselves. And do NOT touch that bucket. It is for my hat collection. |
| Player actions | drag, hold, timing |
| Interactive objects | `pipe` (info), `valve` (hold), `under` (drop zone), `bucket` (drag), `meter` (info) |
| Success path (automated) | drag `bucket` → `under`, hold `valve` 2200 ms |
| Plausible wrong actions | Letting the room flood is a trap. The valve can't be reached until the drip is caught. |
| Par (3★) | 2 |
| Hints | 1) The water level is rising. Catch the drip first. 2) The bucket can go under the drip. Then the valve is reachable. 3) Drag the bucket under the drip, then press and hold the valve for two seconds. |
| Completion text | Leak fixed. The hat collection will have to wait. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Catch the drip first, then the valve is reachable. |
| Ending consequences | None. |

## 28. Swamp Stones

| Field | Value |
|---|---|
| Stable ID | `swamp-stones` |
| Objective | Cross the swamp to the far bank. |
| Intro dialogue | Hop across on the bubbly stones! They're jacuzzis. Very relaxing. The flat dry ones are… boring. |
| Player actions | tap, observe, sequence |
| Interactive objects | `bankL` (info), `bankR` (info), `s1t`, `s1b`, `s2t`, `s2b`, `s3t`, `s3b`, `s4t`, `s4b`, `hero` (info) |
| Success path (automated) | tap `s1b`, tap `s2t`, tap `s3t`, tap `s4b` |
| Plausible wrong actions | Bubbly stones sink (trap). You can only hop to the next column. |
| Par (3★) | 4 |
| Hints | 1) Bubbles in a swamp usually mean something is sinking. 2) Step only on stones without bubbles, one column at a time. 3) Tap: bottom stone, top stone, top stone, bottom stone. |
| Completion text | Dry feet. Damp narrator. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bubbles mean sinking stones. Hop on the calm ones only. |
| Ending consequences | None. |

## 29. Channel Surfing

| Field | Value |
|---|---|
| Stable ID | `channel-surfing` |
| Objective | Find the way out. |
| Intro dialogue | Don't touch the TV. Channel 5 is my favourite. It's static. Very soothing. Very… nothing-to-see-here. |
| Player actions | tap, explore |
| Interactive objects | `tv` (info), `screen` (info), `remote` (info), `chdown`, `chup`, `hatch` |
| Success path (automated) | tap `chup`, tap `chup`, tap `hatch` |
| Plausible wrong actions | The battery hatch is stuck until you know about it. |
| Par (3★) | 3 |
| Hints | 1) There might be more on TV than static. 2) Flip through the channels and read each one. 3) Press CH+ twice to reach channel 7, then open the battery hatch. |
| Completion text | You found the secret channel. Bossworth is cancelling it. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The remote's battery hatch was the real control. |
| Jigsaw piece | `jig-8` at 2%, 90% — replays only |
| Ending consequences | None. |

## 30. The Password

| Field | Value |
|---|---|
| Stable ID | `the-password` |
| Objective | Say the password. |
| Intro dialogue | The door needs a password. The password is NOT "password". Obviously. That would be silly. |
| Player actions | tap, wordplay |
| Interactive objects | `door` (info), `display` (info), `clear` (free), `enter`, `t-please`, `t-NOT`, `t-password`, `t-open`, `t-sesame` |
| Success path (automated) | tap `t-NOT`, tap `t-password`, tap `enter` |
| Plausible wrong actions | Any other phrase sets off the alarm (trap). |
| Par (3★) | 3 |
| Hints | 1) Take Bossworth's sentence very, very literally. 2) He said the password is: NOT password. 3) Tap NOT, then password, then ENTER. |
| Completion text | Literally correct. The best kind of correct. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `alarm-enthusiast` Alarm Enthusiast — 4 traps in one attempt |
| The trick (shown after solving) | The password was literally "NOT PASSWORD". |
| Ending consequences | None. |

## 31. Pick a Card

| Field | Value |
|---|---|
| Stable ID | `pick-a-card` |
| Objective | Pick a card. |
| Intro dialogue | Pick a card! Any card! Except the joker. NEVER the joker. Watch closely… actually, don't watch. Look away. Shuffling! |
| Player actions | observe, wait, tap |
| Interactive objects | `cardJ`, `cardB`, `cardC`, `log` (info), `status` (info) |
| Success path (automated) | wait 5200 ms, tap `cardJ` |
| Plausible wrong actions | Any card that isn't the joker is a trap. Cards can't be picked while shuffling. |
| Par (3★) | 1 |
| Hints | 1) Bossworth really doesn't want you to find the joker. Why? 2) Follow the joker through the swaps — the log lists them all. 3) The joker ends up in the middle. Pick the middle card. |
| Completion text | You followed the joker. The joker had the exit key all along. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Wait for the shuffle to finish — the joker never lies about being a joker. |
| Ending consequences | None. |

## 32. Lights Out

| Field | Value |
|---|---|
| Stable ID | `lights-out` |
| Objective | Open the exit. |
| Intro dialogue | Turn ALL the lights ON. All of them. Brightness is happiness. Don't read the sign on the door. |
| Player actions | tap, logic, read |
| Interactive objects | `sign` (info), `door` (info), `rule` (info), `b1`, `b2`, `b3`, `b4`, `b5` |
| Success path (automated) | tap `b1`, tap `b5` |
| Plausible wrong actions | Turning every bulb on is a trap (sunglasses meltdown). |
| Par (3★) | 2 |
| Hints | 1) Read the sign on the door. 2) Each bulb flips itself and its neighbours. You want them all OFF. 3) Press bulb 1, then bulb 5. |
| Completion text | Darkness achieved. Bossworth is afraid of the dark (he says he isn't). |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | All lights on is a trap. Two bulbs were enough. |
| Ending consequences | None. |

## 33. Rubber Stamp

| Field | Value |
|---|---|
| Stable ID | `rubber-stamp` |
| Objective | Process the form so you can leave. |
| Intro dialogue | Paperwork! Stamp this form APPROVED and you're free to go. I filled it in for you. Don't read it. It's very boring. Riveting, actually. But boring. |
| Player actions | drag, read |
| Interactive objects | `form` (drop zone), `approved` (drag), `denied` (drag), `tray` (drop zone), `door` |
| Success path (automated) | drag `denied` → `form` |
| Plausible wrong actions | Stamping APPROVED keeps you here forever (trap). The door stays locked until the form is processed (nope). Stamping the in-tray achieves nothing (nope). |
| Par (3★) | 1 |
| Hints | 1) Before you approve something, it helps to know what it is. 2) Read the form. Do you actually want what it asks for? 3) Drag the DENIED stamp onto the form. |
| Completion text | Request denied. You're free. I hate forms now. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The form was an application to stay forever, so the helpful stamp was DENIED. |
| Ending consequences | None. |

## 34. Stock Take

| Field | Value |
|---|---|
| Stable ID | `stock-take` |
| Objective | Fill in the stapler audit honestly. |
| Intro dialogue | Audit day! We own exactly twelve staplers. I bought them myself. Tick 12 and let's go home. Counting is for accountants and toddlers. |
| Player actions | tap, count |
| Interactive objects | `st1` (info), `punch` (info), `cabinet` (info), `st2` (info), `chair` (info), `st3` (info), `st4` (info), `jelly` (info), `st6` (info), `st7` (info), `form` (info), `n5`, `n6`, `n7`, `n8`, `n12` |
| Success path (automated) | tap `n7` |
| Plausible wrong actions | Ticking 12 fails the audit (trap). Any other wrong number makes the auditor squint (nope). |
| Par (3★) | 1 |
| Hints | 1) The auditor will count what is actually in the room. 2) Look everywhere: shelf, cabinet, chair, desk, floor — and inside things. A hole punch is not a stapler. 3) There are seven staplers. Tick 7. |
| Completion text | Seven staplers. Five missing. I'm launching an inquiry. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bossworth's number was wishful thinking; the room only ever had seven staplers. |
| Ending consequences | None. |

## 35. Please Hold

| Field | Value |
|---|---|
| Stable ID | `please-hold` |
| Objective | Get the frozen door keypad working. |
| Intro dialogue | The door keypad froze. Don't bother calling IT, nobody ever answers. Just jab the buttons harder. Technology respects confidence. |
| Player actions | hold, tap, sequence |
| Interactive objects | `keypad`, `door`, `phone` (hold), `ittag` (info), `switch`, `plant` (free) |
| Success path (automated) | hold `phone` 3000 ms, tap `switch`, tap `switch`, tap `door` |
| Plausible wrong actions | Jabbing the frozen keypad does nothing (nope). Tapping the phone hangs up straight away (nope). The door is locked while the keypad is frozen (nope). |
| Par (3★) | 4 |
| Hints | 1) IT do answer. Eventually. You just have to stay on the line. 2) Press and HOLD the desk phone until someone picks up, then do what they say. 3) Hold the phone, then flip the power switch off, then on, then open the door. |
| Completion text | Off and on again. The oldest spell in the book. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Staying on hold got real advice, and turning it off and on again fixed the "unfixable" keypad. |
| Ending consequences | None. |

## 36. Take It Offline

| Field | Value |
|---|---|
| Stable ID | `take-it-offline` |
| Objective | Escape the endless video meeting. |
| Intro dialogue | Welcome to my presentation: slide one of four hundred! No leaving early. Any questions? Let's take those offline. Right. Slide one… |
| Player actions | drag, wordplay |
| Interactive objects | `screen` (info), `leave`, `hand`, `next`, `share`, `router` (info), `socket` (info), `plug` (drag), `floor` (drop zone) |
| Success path (automated) | drag `plug` → `floor` |
| Plausible wrong actions | Leave meeting re-invites you instantly (trap). Raising your hand is ignored (nope). Next slide just adds to the pain (nope). |
| Par (3★) | 1 |
| Hints | 1) Bossworth told you exactly what to do with this meeting. Take him literally. 2) The whole meeting runs over the office Wi-Fi. What would "offline" look like? 3) Drag the router's plug out of the wall socket. |
| Completion text | Connection lost. Best meeting I've ever been kicked out of. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `screen-sharer` Screen Sharer — path: tap `share`, tap `yes` |
| The trick (shown after solving) | "Let's take this offline" is jargon — you did it literally by unplugging the router. |
| Ending consequences | None. |

## 37. Alphabetical Order

| Field | Value |
|---|---|
| Stable ID | `alphabetical-order` |
| Objective | File the folders in alphabetical order. |
| Intro dialogue | File these alphabetically. Mine goes first, obviously. B for Bossworth. B for Brilliant. B for Before everybody else. |
| Player actions | tap, sequence, read |
| Interactive objects | `rule` (info), `cabinet` (info), `f-coffee`, `f-accounts`, `f-very`, `f-leave`, `f-budget`, `filed` (info) |
| Success path (automated) | tap `f-accounts`, tap `f-budget`, tap `f-coffee`, tap `f-leave`, tap `f-very` |
| Plausible wrong actions | Filing Bossworth's folder first breaks the rule (nope). Any folder out of alphabetical order is refused (nope). |
| Par (3★) | 5 |
| Hints | 1) The house rule says which word on the tab counts. 2) Read Bossworth's tab properly. What is its FIRST word? 3) Tap: Accounts, Budget, Coffee Fund, Leave Requests, then VERY Important. |
| Completion text | Filed. Alphabetically. Mine is LAST. I'm renaming it "AAAA Bossworth". |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bossworth's tab started with "VERY", so by the house rule it was filed last, not first. |
| Ending consequences | None. |

## 38. The Thirteenth Floor

| Field | Value |
|---|---|
| Stable ID | `thirteenth-floor` |
| Objective | Take the lift to Bossworth's office. |
| Intro dialogue | Come up to my office on the 13th floor. Press 13. What do you mean there isn't a 13? Every building has a 13. Look harder. |
| Player actions | tap, logic, read |
| Interactive objects | `dir` (info), `lift` (info), `plate` (info), `alarm`, `b14`, `b15`, `b16`, `b10`, `b11`, `b12`, `b7`, `b8`, `b9`, `b4`, `b5`, `b6`, `b1`, `b2`, `b3` |
| Success path (automated) | tap `b14` |
| Plausible wrong actions | The ALARM button gets you stuck (trap). Other floors are not Bossworth's office (nope). |
| Par (3★) | 1 |
| Hints | 1) The building has a 13th floor. The buttons just don't say so. 2) The plate says the numbers skip 13. So what is the button for the 13th floor called? 3) Press 14. |
| Completion text | Ding. Thirteenth floor, labelled fourteen. Superstition is just branding. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `scenic-route` The Scenic Route — path: tap `b12`, tap `b15`, tap `b16`, tap `b1`, tap `b2` |
| The trick (shown after solving) | The buttons skip 13, so the 13th floor was the button marked 14. |
| Ending consequences | None. |

## 39. Whiteboard Wipe

| Field | Value |
|---|---|
| Stable ID | `whiteboard-wipe` |
| Objective | Enter the door code from the whiteboard. |
| Intro dialogue | The door code's on the whiteboard. Don't bother memorising it. I have a photographic memory. Well. Photo-ish. Photo-adjacent. |
| Player actions | memory, tap, wait |
| Interactive objects | `code` (info), `photo`, `bucket` (info), `entry` (info), `door` (info), `tri`, `circ`, `sq`, `clear` (free) |
| Success path (automated) | wait 4500 ms, tap `tri`, tap `circ`, tap `sq`, tap `tri` |
| Alternative `photo` | wait 4500 ms, tap `photo`, wait 3000 ms, tap `tri`, tap `circ`, tap `sq`, tap `tri` |
| Plausible wrong actions | Entering Bossworth's remembered code sets off the alarm (trap). Any other wrong code is rejected (nope). |
| Par (3★) | 4 |
| Hints | 1) Memorise the board before the cleaner gets to it. Bossworth's memory is decorative. 2) Forgot it? The cleaner's "before" photo shows the board again. 3) The code is triangle, circle, square, triangle. |
| Completion text | Code accepted. My photographic memory is being sent for repairs. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bossworth's "photographic memory" swapped two shapes — your own memory (or the photo) was the real record. |
| Ending consequences | None. |

## 40. The Org Chart

| Field | Value |
|---|---|
| Stable ID | `org-chart` |
| Objective | Hand your report to your actual manager. |
| Intro dialogue | Hand your report to your manager. That's me. I manage everybody. Check the org chart if you must, but it'll just say me. In big letters. |
| Player actions | drag, observe |
| Interactive objects | `ceo` (drop zone), `boss` (drop zone), `pat` (drop zone), `doris` (drop zone), `kev` (drop zone), `mo` (drop zone), `you` (info), `report` (drag), `legend` (info) |
| Success path (automated) | drag `report` → `pat` |
| Plausible wrong actions | Going straight to the CEO is a skip-level disaster (trap). Bossworth is not your manager (nope). Doris is only above you on the page (nope). |
| Par (3★) | 1 |
| Hints | 1) An org chart is a map. Start from YOU and follow your line upwards. 2) Lines cross. The person directly above you is not necessarily your manager. 3) Your line leads to Pat. Drag the report onto Pat. |
| Completion text | Pat says thanks. Pat! I didn't even know we HAD a Pat. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Your line crossed the chart to Pat — Bossworth only manages the post room. |
| Ending consequences | None. |

## 41. Copy That

| Field | Value |
|---|---|
| Stable ID | `copy-that` |
| Objective | Read the door PIN on the tiny sticky note. |
| Intro dialogue | The door PIN is on that sticky note. Tiny writing, isn't it? Shred it, it's rubbish. I'll remember the PIN. It was… a number. Definitely a number. |
| Player actions | drag, tap, read |
| Interactive objects | `note` (drag), `shredder` (drop zone), `copier` (drop zone), `copy100`, `copy400`, `print` (info), `display` (info), `door` (info), `k1`, `k2`, `k3`, `k4`, `k5`, `k6`, `k7`, `k8`, `k9` |
| Success path (automated) | drag `note` → `copier`, tap `copy400`, tap `k4`, tap `k1`, tap `k9` |
| Plausible wrong actions | Shredding the note destroys the PIN (trap). Copying at 100% just makes another tiny note (nope). A wrong PIN is rejected (nope). |
| Par (3★) | 5 |
| Hints | 1) The note is not rubbish. It is just very, very small. 2) Photocopiers can make things bigger. Put the note on the glass. 3) Drag the note onto the copier, press Copy 400%, then type 4 1 9. |
| Completion text | Enlarged and entered. I'm photocopying my salary next. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `paper-mountain` Paper Mountain — path: tap `copy100`, tap `copy100`, tap `copy100`, tap `copy100`, tap `copy100`, tap `copy100` |
| The trick (shown after solving) | The note wasn't junk, just tiny — the copier's 400% made the PIN readable. |
| Ending consequences | None. |

## 42. Paper Jam

| Field | Value |
|---|---|
| Stable ID | `paper-jam` |
| Objective | Print your exit pass. |
| Intro dialogue | Printer's jammed again. The jam is ALWAYS in the top lid. Open the top lid and have a good rummage. Wear something black. |
| Player actions | tap, drag, sequence, read |
| Interactive objects | `printer` (info), `lid`, `tray`, `paper` (drag), `display` (info), `print`, `bin` (drop zone) |
| Success path (automated) | tap `tray`, drag `paper` → `bin`, tap `tray`, tap `print` |
| Plausible wrong actions | Opening the top lid covers you in toner (trap). Printing while jammed does nothing (nope). Printing with the tray open does nothing (nope). |
| Par (3★) | 4 |
| Hints | 1) The printer knows where its own jam is. It says so. 2) The display says Tray 2. Open it and deal with what is inside. 3) Open tray 2, drag the crumpled sheet into recycling, close the tray, press PRINT. |
| Completion text | Exit pass printed. The printer and I are no longer on speaking terms. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The printer's display named the real jam (Tray 2); Bossworth's "top lid" was a toner trap. |
| Ending consequences | None. |

## 43. Print Queue

| Field | Value |
|---|---|
| Stable ID | `print-queue` |
| Objective | Get your exit pass printed. |
| Intro dialogue | Your exit pass is in the print queue. Behind my portrait. Four hundred pages, full colour, life size. Wait your turn. Patiently. Forever. |
| Player actions | tap, choice, read |
| Interactive objects | `queue` (info), `printer`, `cancel`, `bump`, `print`, `mfd` (info), `doris` (info), `plant` (free) |
| Success path (automated) | tap `printer`, tap `print` |
| Plausible wrong actions | Cancelling Bossworth's job makes him resend it twice as big (trap). Only admins can reorder the queue (nope). Printing to the busy printer just joins the queue (nope). |
| Par (3★) | 2 |
| Hints | 1) Watch the queue for a while. Is your turn ever going to come? 2) You can't beat this queue. Is there another printer? 3) Switch the printer to Basement, then press Print. |
| Completion text | Printed in the basement. I'm installing a portrait down there too. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The queue was rigged to never reach you, so you skipped it by printing on the forgotten basement printer. |
| Ending consequences | None. |

## 44. Suggestion Box

| Field | Value |
|---|---|
| Stable ID | `suggestion-box` |
| Objective | Get your suggestion read. |
| Intro dialogue | Got a suggestion? Pop it in the suggestion box! I read every single one. Personally. With great interest. Mm-hm. Very carefully. |
| Player actions | drag, observe, read |
| Interactive objects | `box` (drop zone), `caption` (info), `fine` (info), `board` (drop zone), `handbook` (info), `slip` (drag), `plant` (free), Bossworth (drop zone) |
| Success path (automated) | drag `slip` → `narrator` |
| Plausible wrong actions | The suggestion box feeds a shredder (trap). Nobody reads the noticeboard (nope). |
| Par (3★) | 1 |
| Hints | 1) Look at where the suggestion box actually goes. 2) The handbook says how to make sure a suggestion gets read. 3) Drag the suggestion onto Bossworth himself. |
| Completion text | Suggestion read aloud and accepted. Under protest. Loud protest. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The box was a shredder, so you handed the suggestion to Bossworth in person, where the handbook made him read it. |
| Ending consequences | None. |

## 45. Fire Drill

| Field | Value |
|---|---|
| Stable ID | `fire-drill` |
| Objective | Evacuate properly. |
| Intro dialogue | FIRE DRILL! Grab your coffee, hop in the lift, and save my portrait — it's irreplaceable. Go go go! Calmly! GO! |
| Player actions | drag, tap, read, sequence |
| Interactive objects | `poster` (info), `bell` (info), `portrait`, `ext` (hold), `lift`, `stairs`, `hero` (info), `mug` (drag), `desk` (drop zone), `mugdown` (info), `inv` (info) |
| Success path (automated) | drag `mug` → `desk`, tap `stairs` |
| Plausible wrong actions | Taking the lift in a fire drill gets you stuck (trap). The stairs won't take you while you're carrying coffee (nope). Grabbing the portrait breaks rule 1 (nope). |
| Par (3★) | 2 |
| Hints | 1) In a drill, the poster outranks the boss. 2) The poster has three rules. You are breaking at least one just by standing there. 3) Drag your coffee onto the desk, then take the stairs. |
| Completion text | Evacuated by the book. The book was a poster. The poster wins again. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `foam-party` Foam Party — path: hold `ext` 2500 ms |
| The trick (shown after solving) | The fire-drill poster beat Bossworth: belongings down, no lift, stairs. |
| Ending consequences | None. |

## 46. Coffee Run

| Field | Value |
|---|---|
| Stable ID | `coffee-run` |
| Objective | Make Bossworth's coffee without a disaster. |
| Intro dialogue | Make me a coffee. Hold the button and fill my mug to the very brim. The BRIM. I like my coffee like my ego: overflowing. |
| Player actions | hold, tap, read |
| Interactive objects | `machine` (info), `cup` (info), `brew` (hold), `meter` (info), `serve`, `notice` (info), `plant` (free) |
| Success path (automated) | hold `brew` 3000 ms, tap `serve` |
| Alternative `topUp` | hold `brew` 1500 ms, hold `brew` 1500 ms, tap `serve` |
| Plausible wrong actions | Filling to the brim overflows onto the laptop (trap). Serving a half-empty mug is refused (nope). |
| Par (3★) | 2 |
| Hints | 1) The mug and Facilities both disagree with Bossworth about "the brim". 2) Hold BREW and watch the fill level. Let go around the MAX line — short holds can top it up. 3) Hold BREW for about three seconds (roughly 75%), let go, then press Serve. |
| Completion text | Filled to the line. Not the brim. My ego remains un-overflowed. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | "To the brim" meant an overflow; the MAX line on the mug was the real instruction. |
| Ending consequences | None. |

## 47. Vending Machine

| Field | Value |
|---|---|
| Stable ID | `vending-machine` |
| Objective | Get the stuck keycard out of the vending machine. |
| Intro dialogue | Your exit keycard is stuck in the vending machine. Classic. Shake it! Rock it! Give it a big hug and a wobble! Machines love that. |
| Player actions | tap, logic, observe |
| Interactive objects | `machine` (info), `tray`, `sticker` (info), `shake`, `door` (info), `bA1`, `bA2`, `bA3`, `bB1`, `bB2`, `bB3` |
| Success path (automated) | tap `bA2`, tap `tray` |
| Plausible wrong actions | Shaking the machine ends badly (trap). B2 is already "sold" (nope). Other snacks just drop past the keycard (nope). |
| Par (3★) | 2 |
| Hints | 1) Gravity is on your side. Violence is not. 2) The sticker says snacks drop straight down. What is directly above the keycard? 3) Buy A2, then collect from the tray. |
| Completion text | Keycard rescued by a falling biscuit. Physics: 1, Bossworth: 0. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Snacks fall straight down, so buying the one above the keycard knocked it loose. |
| Ending consequences | None. |

## 48. Motion Sensor

| Field | Value |
|---|---|
| Stable ID | `motion-sensor` |
| Objective | Get out of the office after hours. |
| Intro dialogue | After hours the doors LOCK if the sensor thinks the office is empty. So keep moving! Wave! Swivel! Stay where it can see you! |
| Player actions | drag, wait, read |
| Interactive objects | `door`, `notice` (info), `status` (info), `cone` (info), `sensor` (info), `desk` (info), `under` (drop zone), `plant` (drop zone), `hero` (drag), `wave` |
| Success path (automated) | drag `hero` → `under`, wait 3500 ms, tap `door` |
| Plausible wrong actions | Waving at the sensor only proves you're there (nope). Hiding behind the plant fails: it's see-through (nope). The door stays locked while the sensor sees you (nope). |
| Par (3★) | 2 |
| Hints | 1) Read what Security says the sensor actually does. 2) The doors open for an EMPTY office. Get out of the sensor's shaded zone. 3) Drag yourself under the desk, wait a few seconds, then open the door. |
| Completion text | The office thought it was empty, so it let you out. Rude office. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The doors unlocked for an empty office, so hiding from the sensor was the key. |
| Ending consequences | None. |

## 49. Revolving Door

| Field | Value |
|---|---|
| Stable ID | `revolving-door` |
| Objective | Get out through the revolving door. |
| Intro dialogue | Revolving door! Push, push, push! Keep pushing until you're outside! Faster! Never stop! Momentum is leadership! |
| Player actions | tap, observe, count |
| Interactive objects | `outside` (info), `door` (info), `lobby` (info), `status` (info), `push`, `step`, `sign` (info) |
| Success path (automated) | tap `push`, tap `push`, tap `step` |
| Plausible wrong actions | Stepping out into the glass is a bonk (nope). Stepping out into the lobby gets you nowhere (nope). |
| Par (3★) | 3 |
| Hints | 1) Pushing moves you around. It does not, by itself, let you out. 2) Watch which way your section faces. Each push is a quarter turn. 3) Push twice, then step out. |
| Completion text | Outside. Two pushes and a step. Momentum is overrated. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `spin-cycle` Spin Cycle — path: tap `push`, tap `push`, tap `push`, tap `push`, tap `push`, tap `push`, tap `push`, tap `push`, tap `push`, tap `push`, tap `push`, tap `push` |
| The trick (shown after solving) | The door only lets you out if you stop pushing when your section faces OUTSIDE. |
| Ending consequences | None. |

## 50. Sticky Situation

| Field | Value |
|---|---|
| Stable ID | `sticky-situation` |
| Objective | Log in to Bossworth's computer. |
| Intro dialogue | My password is unguessable. It is NOT my pet's name. And it is NOT written on a sticky note. Don't look at the sticky note. Especially not under it. |
| Player actions | tap, read, logic |
| Interactive objects | `monitor` (info), `note`, `hint` (info), `photo1` (info), `mug1` (info), `photo2` (info), `mug2` (info), `p0`, `p1`, `p2`, `p3` |
| Success path (automated) | tap `note`, tap `p0` |
| Plausible wrong actions | Doris's pet or mug year locks the account (trap). "password123" is someone else's problem (nope). |
| Par (3★) | 2 |
| Hints | 1) He told you exactly where not to look. 2) Lift the sticky note, then work out which pet and which mug belong to Bossworth. 3) Lift the note, then choose SirBubbles1998. |
| Completion text | Logged in. I'm changing it to something unguessable. Sir Bubbles 1999. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The note under the note gave the formula; the desk photos and mugs filled it in — the ones with Bossworth's name. |
| Ending consequences | None. |

## 51. Calendar Clash

| Field | Value |
|---|---|
| Stable ID | `calendar-clash` |
| Objective | Book a meeting when you and Bossworth are both free. |
| Intro dialogue | Book us a one-to-one. Monday morning! I'm free. Well, it says "nap", but naps don't count. Book Monday morning. Be bold. |
| Player actions | tap, logic, read |
| Interactive objects | `head` (info), `c-Mon-AM`, `c-Tue-AM`, `c-Wed-AM`, `c-Thu-AM`, `c-Mon-PM`, `c-Tue-PM`, `c-Wed-PM`, `c-Thu-PM`, `memo` (info), `plant` (free) |
| Success path (automated) | tap `c-Wed-PM` |
| Plausible wrong actions | Booking over Bossworth's nap ends badly (trap). Slots where either of you is busy are refused (nope). "free (golf)" is not free (nope). |
| Par (3★) | 1 |
| Hints | 1) A slot works only if BOTH lines say free — and mean it. 2) Read every word. "free (golf)" is golf with a disguise. 3) Book Wednesday PM. |
| Completion text | Wednesday afternoon it is. I'll bring my calendar. And my golf clubs. Just in case. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Only Wednesday afternoon was truly free for both — Monday was a nap and Thursday's "free" was golf. |
| Ending consequences | None. |

## 52. Clocking Out

| Field | Value |
|---|---|
| Stable ID | `clocking-out` |
| Objective | Clock out and go home. |
| Intro dialogue | Last job of the day: clock out and go home. The machine's already set to OUT. Just pop your card in. Easy. Nothing weird about it at all. |
| Player actions | drag, tap, sequence, read |
| Interactive objects | `card` (drag), `clock` (drop zone), `mode`, `rule` (info), `door`, `plant` (free) |
| Success path (automated) | tap `mode`, drag `card` → `clock`, tap `mode`, drag `card` → `clock` |
| Plausible wrong actions | Stamping OUT without an IN gets you marked as a ghost (trap). Stamping IN twice is refused (nope). The door won't open until you clock out (nope). |
| Par (3★) | 4 |
| Hints | 1) Check your time card. What is missing from it? 2) Payroll won't let you leave a place you never arrived at. 3) Switch to IN, drag the card in, switch to OUT, drag the card in again. |
| Completion text | In at nine, out at five. A full day's work in four actions. I'm reporting you for efficiency. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | You can't clock out without clocking in — the OUT setting was a shortcut to a payroll trap. |
| Ending consequences | None. |

## 53. The Chirp

| Field | Value |
|---|---|
| Stable ID | `the-chirp` |
| Objective | Stop the 3 a.m. chirping — safely. |
| Intro dialogue | Hear that CHIRP? It's the budgie. Classic budgie. Throw the towel over its cage and we can all sleep. And do NOT fiddle with the smoke alarm. It's sensitive. |
| Player actions | wait, observe, drag |
| Interactive objects | `sticker` (info), `alarm` (drop zone), `chirp` (info), `cage` (drop zone) (free), `under` (drop zone), `stoolPlaced` (info), `stool` (drag), `battery` (drag), `towel` (drag), `broom` |
| Success path (automated) | drag `stool` → `under`, drag `battery` → `alarm` |
| Plausible wrong actions | Covering the sleeping budgie changes nothing (nope). You can't reach the ceiling without the step stool (nope). Pulling the old battery out leaves the house unprotected (trap). |
| Par (3★) | 2 |
| Hints | 1) Watch closely when the next CHIRP happens. What lights up? What is the budgie doing? 2) The smoke alarm chirps when its battery is low. It's on the ceiling, so you need something to stand on. 3) Drag the step stool under the smoke alarm, then drag the fresh battery onto the alarm. |
| Completion text | Silence. Safe, battery-powered silence. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `alarm-whacker` Alarm Whacker — path: tap `broom`, tap `broom`, tap `broom` |
| The trick (shown after solving) | The chirp flashed the smoke alarm's light, not the budgie: a fresh battery stopped it without switching the alarm off. |
| Ending consequences | None. |

## 54. Low and Slow

| Field | Value |
|---|---|
| Stable ID | `low-and-slow` |
| Objective | Bake Grandma's sponge cake properly. |
| Intro dialogue | Grandma's sponge! I've read the recipe: bake at 20 degrees for 180 minutes. Low and slow. I read it myself. Out loud. With feeling. |
| Player actions | tap, read |
| Interactive objects | `recipe` (info), `oven` (info), `tempd` (info), `tdown`, `tup`, `timed` (info), `mdown`, `mup`, `start` |
| Success path (automated) | tap `tup`, tap `tup`, tap `mup`, tap `start` |
| Plausible wrong actions | START with the timer at zero does nothing (nope). Baking at any other settings — including Bossworth's — ruins the cake (trap). |
| Par (3★) | 4 |
| Hints | 1) Bossworth read the recipe out loud. The recipe card is right there. Compare them. 2) He swapped the numbers: the card says the oven goes to 180° and the timer to 20 minutes. 3) Press TEMP + twice (180°), TIMER + once (20 min), then START. |
| Completion text | A sponge so fluffy it applied for cloud status. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bossworth swapped the recipe's numbers; the card on the counter had the real ones. |
| Ending consequences | None. |

## 55. The Fridge Light

| Field | Value |
|---|---|
| Stable ID | `fridge-light` |
| Objective | Find out whether the fridge light goes off when the door is shut. |
| Intro dialogue | The fridge light stays ON when the door is shut. Always. Every time I open it — on. Ten thousand times. That's science. Case closed. Don't investigate. |
| Player actions | tap, drag, wait, choice |
| Interactive objects | `fridge` (drop zone), `seal` (info), `caption` (info), `phone` (drag), `v-off`, `v-on` |
| Success path (automated) | tap `fridge`, drag `phone` → `fridge`, tap `fridge`, wait 3500 ms, tap `fridge`, tap `v-off` |
| Plausible wrong actions | The phone can't go into a shut fridge (nope). Opening the door before the click spoils the photo (nope). Ruling "stays ON" against the evidence is a trap. |
| Par (3★) | 5 |
| Hints | 1) Every time anyone looks, the door is open. You need a witness that can stay inside. 2) The phone has a camera on a 3-second self-timer. Phones fit in fridges. 3) Open the fridge, drag the phone in, shut the door, wait for the click, open it again, then rule "Light goes OFF". |
| Completion text | The light goes off. Bossworth's whole worldview went off with it. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Nobody can watch a shut fridge, so you sent in a phone on a self-timer and let the photo testify. |
| Ending consequences | None. |

## 56. Sugar or Salt

| Field | Value |
|---|---|
| Stable ID | `sugar-or-salt` |
| Objective | Put the sugar in the shortbread. |
| Intro dialogue | Shortbread! One cup of sugar, from the jar labelled SUGAR. Obviously. I definitely did NOT swap any labels last week with my new label maker. That would be a prank. |
| Player actions | observe, drag, experiment |
| Interactive objects | `recipe` (info), `maker` (info), `jarA` (drag) (drop zone), `jarB` (drag) (drop zone), `jarC` (drag) (drop zone), `spoon` (drag), `bowl` (drop zone) (free), `ants` (info), `climb` (info), `hole` (info) |
| Success path (automated) | drag `jarB` → `bowl` |
| Alternative `taste` | drag `spoon` → `jarA`, drag `jarB` → `bowl` |
| Plausible wrong actions | The jar labelled SUGAR is salt (trap). Bath salts in the shortbread (trap). Only one taste test is allowed (nope). |
| Par (3★) | 1 |
| Hints | 1) Bossworth protested a bit too much about those labels. Who else in the kitchen knows sugar when they see it? 2) Follow the line of ants from the hole in the skirting board. Ants go where the sugar is. 3) Drag the jar the ants are marching to — the one labelled SALT — into the mixing bowl. |
| Completion text | Sweet shortbread, and a small army of satisfied ants. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bossworth had swapped the labels; the ant trail led straight to the real sugar. |
| Ending consequences | None. |

## 57. Whites Wash

| Field | Value |
|---|---|
| Stable ID | `whites-wash` |
| Objective | Wash the white sheets. Keep them white. |
| Intro dialogue | Whites wash! The machine's all loaded — I checked inside personally. Just press START. Oh, and pop my lucky wool jumper in too. It LOVES a hot wash. |
| Player actions | tap, observe, drag |
| Interactive objects | `prog` (info), `start`, `washer` (drop zone), `sock` (drag), `basket` (drop zone) (free), `care` (info), `jumper` (drag) |
| Success path (automated) | tap `washer`, tap `start` |
| Alternative `tidy` | tap `washer`, drag `sock` → `basket`, tap `start` |
| Plausible wrong actions | Washing with the red sock inside turns everything pink (trap). Putting the red sock back in is refused (nope). |
| Par (3★) | 2 |
| Hints | 1) Look closely through the round window of the washing machine. 2) There is something red in with the whites. Open the door. 3) Tap the machine to open it (the red sock falls out), then press START. Leave the jumper alone. |
| Completion text | Whiter than Bossworth's excuses. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `shrunken-jumper` Shrunken Jumper — path: drag `jumper` → `washer`, tap `washer`, tap `start` |
| The trick (shown after solving) | Bossworth "checked" the load, but the porthole showed a red sock — opening the door first saved the whites. |
| Ending consequences | None. |

## 58. The Fitted Sheet

| Field | Value |
|---|---|
| Stable ID | `fitted-sheet` |
| Objective | Deal with the fitted sheet. |
| Intro dialogue | Fold this fitted sheet into a perfect square. It's easy. I've done it thousands of times. With my eyes closed. In a dream. Once. |
| Player actions | tap, drag, choice |
| Interactive objects | `poster` (info), `sheet` (drag), `fold`, `bedtag` (info), `bed` (drop zone) (free), `drawer` (drop zone) (free) |
| Success path (automated) | drag `sheet` → `bed` |
| Alternative `shove` | drag `sheet` → `drawer` |
| Plausible wrong actions | Folding only makes a bigger ball (nope). The third fold attempt swallows you whole (trap). |
| Par (3★) | 1 |
| Hints | 1) Nobody in history has folded one of these. Ask what a fitted sheet is FOR. 2) Look at the bed. Its mattress is bare. 3) Drag the sheet onto the bed. (The linen drawer works too, if you're honest about your folding.) |
| Completion text | Fitted. Not folded. Fitted. As nature intended. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Nobody can fold a fitted sheet — but it fits a bed perfectly, so you skipped the folding. |
| Ending consequences | None. |

## 59. Odd Sock Out

| Field | Value |
|---|---|
| Stable ID | `odd-sock-out` |
| Objective | Put the one sock without a twin into the odd-socks box. |
| Intro dialogue | Seven socks, three pairs, one loner. The loner is OBVIOUSLY a polka-dot one. Polka dots never have friends. Into the box with it! Chop chop! |
| Player actions | drag, observe, count |
| Interactive objects | `rule` (info), `s1` (drag), `s2` (drag), `s3` (drag), `s4` (drag), `s5` (drag), `s6` (drag), `s7` (drag), `box` (drop zone) (free), Bossworth (drop zone) |
| Success path (automated) | drag `s4` → `box` |
| Plausible wrong actions | Boxing a sock that has a twin leaves its partner lonely (trap). Handing Bossworth a sock is refused (nope). |
| Par (3★) | 1 |
| Hints | 1) Match every sock to its twin by colour AND pattern. Count the stripes. 2) The two polka-dot socks are a pair. Look hard at the blue socks. 3) The blue sock with three stripes has no twin. Drag it into the box. |
| Completion text | Three happy pairs and one sock with a bright future in puppetry. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Both polka-dot socks matched; counting stripes showed the lone blue three-striper. |
| Ending consequences | None. |

## 60. Dust Bunny

| Field | Value |
|---|---|
| Stable ID | `dust-bunny` |
| Objective | Vacuum up the dust. Only the dust. |
| Intro dialogue | See that big grey dust bunny under the sofa? Hold the vacuum button and hoover it up. Ignore the twitching. Dust twitches. Science. |
| Player actions | drag, hold, observe |
| Interactive objects | `carrot` (drag), `poster` (info), `hutch` (drop zone) (free), `sofa` (info), `bunny` (drop zone) (free), `dust` (info), `vacuum` (hold) |
| Success path (automated) | drag `carrot` → `hutch`, hold `vacuum` 1800 ms |
| Plausible wrong actions | Vacuuming while the bunny is under the sofa is a trap. Giving the carrot to the bunny where it sits doesn't move it (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the poster on the wall, then look very closely at the "dust bunny". 2) That's Mr Flopsy, and his hutch is empty. Rabbits follow carrots. 3) Drag the carrot into the hutch, then press and hold the vacuum to clean the real dust. |
| Completion text | One rabbit rehomed, one floor de-fluffed, one narrator corrected. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The "dust bunny" was a real bunny; a carrot sent it home before you vacuumed. |
| Ending consequences | None. |

## 61. Secret Knock

| Field | Value |
|---|---|
| Stable ID | `secret-knock` |
| Objective | Get back into the house. |
| Intro dialogue | Locked out! Luckily our secret knock is three quick knocks. Knock knock knock. I invented it, so I'd know. Don't read the note. The note is jealous of me. |
| Player actions | tap, hold, read, sequence |
| Interactive objects | `bell`, `legend` (info), `door` (hold), `note` (info), `prog` (info) |
| Success path (automated) | hold `door` 800 ms, tap `door`, tap `door`, hold `door` 800 ms |
| Plausible wrong actions | A knock that breaks the pattern clears your attempt (nope). Ringing the doorbell wakes the baby next door (trap). |
| Par (3★) | 4 |
| Hints | 1) Read the note taped beside the door. It has both long and short knocks. 2) A tap on the door is a short knock. Pressing and holding is a long knock. 3) Hold the door, tap it, tap it, then hold it again: LONG, short, short, LONG. |
| Completion text | Knock, knock. Who's there? You. Inside. Finally. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bossworth's "three quick knocks" was wrong; the note's long-short-short-long rhythm needed holds as well as taps. |
| Ending consequences | None. |

## 62. Topsy Thermostat

| Field | Value |
|---|---|
| Stable ID | `topsy-thermostat` |
| Objective | Warm the house to a comfy 21°. |
| Intro dialogue | It says 81 degrees in here! A SAUNA! Press the top arrow to cool it down until it says 21. I installed that thermostat myself. Perfectly. Screens don't lie. |
| Player actions | tap, read, observe |
| Interactive objects | `goal` (info), `top`, `stat`, `bottom`, `therm` (info) |
| Success path (automated) | tap `bottom`, tap `bottom`, tap `bottom` |
| Alternative `flip` | tap `stat`, tap `top`, tap `top`, tap `top` |
| Plausible wrong actions | The top button turns the heat DOWN; reaching 15° freezes the pipes (trap). Overheating to 27° turns the hall into a sauna (trap). |
| Par (3★) | 3 |
| Hints | 1) Read the small print on the thermostat. Which way up is it? 2) It's upside down: the screen really says 18, and the top button really turns the heat down. Check the wall thermometer. 3) Press the bottom button three times (or tap the thermostat to turn it the right way up, then press ▲ three times). |
| Completion text | A toasty 21°. The thermostat is still upside down. So is Bossworth's confidence. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The thermostat was mounted upside down: "81" was 18 and the arrows were swapped, so you read it the right way up. |
| Ending consequences | None. |

## 63. Feeding Time

| Field | Value |
|---|---|
| Stable ID | `feeding-time` |
| Objective | Put the right dinner in each named bowl. |
| Intro dialogue | Feeding time! Biscuit is obviously the cat — Biscuit is a cat name — so fish goes in Biscuit's bowl. And Pickle loves a bone. I'm great with pets. They adore me. From a distance. |
| Player actions | drag, logic, read |
| Interactive objects | `cat` (info), `dog` (info), `tortoise` (info), `notes` (info), `bBiscuit` (drop zone) (free), `bNoodle` (drop zone) (free), `bPickle` (drop zone) (free), `fish` (drag), `bone` (drag), `lettuce` (drag), Bossworth (drop zone) |
| Success path (automated) | drag `lettuce` → `bPickle`, drag `bone` → `bBiscuit`, drag `fish` → `bNoodle` |
| Plausible wrong actions | A wrong dinner in a bowl causes a pet riot (trap). A second dinner in a full bowl is refused (nope). Bossworth won't eat pet food (nope). |
| Par (3★) | 3 |
| Hints | 1) The bowls only have names. Use the pet-sitting notes to work out which pet is which. 2) Pickle is the slowest pet, so Pickle is the tortoise. Biscuit isn't the cat, so Biscuit is the dog. 3) Bone in Biscuit's bowl, fish in Noodle's bowl, lettuce in Pickle's bowl. |
| Completion text | Three full pets, zero bitten narrators. A personal best. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Names don't tell you species; the notes did — Pickle is the slow tortoise, so Biscuit (not the cat) is the dog. |
| Ending consequences | None. |

## 64. Thirsty Plants

| Field | Value |
|---|---|
| Stable ID | `thirsty-plants` |
| Objective | Water the plants that actually need it. |
| Intro dialogue | Water ALL the plants. Lots. Plants are basically fish with leaves. Even the spiky one. ESPECIALLY the spiky one. It looks thirsty. Spiky means thirsty. |
| Player actions | drag, observe, choice |
| Interactive objects | `fern` (drop zone) (free), `cactus` (drop zone) (free), `basil` (drop zone) (free), `lily` (drop zone) (free), `plastic` (drop zone) (free), `can` (drag), Bossworth (drop zone) |
| Success path (automated) | drag `can` → `fern`, drag `can` → `lily` |
| Plausible wrong actions | Watering the cactus or the basil drowns it (trap). Watering the plastic plant just makes a puddle (nope). |
| Par (3★) | 2 |
| Hints | 1) Not every plant wants water. Look at the leaves, the soil and the labels. 2) Thirsty plants droop over dry, cracked soil. One plant has a price sticker for a reason. 3) Drag the watering can onto the fern and the peace lily. Leave the rest alone. |
| Completion text | Two perky plants, one smug cactus, one plastic plant pretending it was involved. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `bossworth-bloom` Bossworth in Bloom — path: drag `can` → `narrator` |
| The trick (shown after solving) | Only the droopy plants over dry soil were thirsty; "water all of them" would have drowned the rest. |
| Ending consequences | None. |

## 65. Bath Time

| Field | Value |
|---|---|
| Stable ID | `bath-time` |
| Objective | Fill the bath to the red line, then launch the duck. |
| Intro dialogue | Run me a bath. Skip the plug — plugs are for people who don't believe in their bath. Turn the tap and the water just… stays. Mostly. Spiritually. |
| Player actions | drag, tap, wait |
| Interactive objects | `taps`, `duck`, `tub` (drop zone) (free), `plug` (drag), `meter` (info) |
| Success path (automated) | drag `plug` → `tub`, tap `taps`, wait 4500 ms, tap `duck` |
| Plausible wrong actions | Running the tap without the plug just drains away (nope). Launching the duck before the bath is full gets you a sad, dry duck (nope). |
| Par (3★) | 3 |
| Hints | 1) Look at the bottom of the bath. Where does the water go? 2) The drain is open. The plug on its chain fits it. 3) Drag the plug into the bath, turn on the tap, wait for the water to reach the red line, then tap the duck. |
| Completion text | A bath at exactly the line. The duck has never been happier. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bossworth said to skip the plug, but an open drain never fills — plug first, then patience. |
| Ending consequences | None. |

## 66. Washing Up

| Field | Value |
|---|---|
| Stable ID | `washing-up` |
| Objective | Wash all four things without ruining the water. |
| Intro dialogue | Washing up! Start with the gravy pan. Get the worst over with! The water will be fine. Water is very forgiving. Unlike me. |
| Player actions | tap, read, observe, sequence |
| Interactive objects | `rule` (info), `pan`, `glass`, `plate`, `mug`, `sink` (drop zone) (free), `soap` (drag), `soaptag` (info) |
| Success path (automated) | tap `glass`, tap `mug`, tap `plate`, tap `pan` |
| Plausible wrong actions | Washing something dirtier before something cleaner turns the water to gravy (trap). Re-washing a clean item is pointless (nope). |
| Par (3★) | 4 |
| Hints | 1) Read the kitchen rule above the dishes. 2) Cleanest first: count the dirty marks on each item. 3) Tap the glass, then the mug, then the plate, then the gravy pan. |
| Completion text | Four sparkling things and water you could almost drink. Please don't. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `bubble-avalanche` Bubble Avalanche — path: drag `soap` → `sink` |
| The trick (shown after solving) | The kitchen rule beat Bossworth's "worst first": cleanest first keeps the water clean to the end. |
| Ending consequences | None. |

## 67. Souper Microwave

| Field | Value |
|---|---|
| Stable ID | `souper-microwave` |
| Objective | Heat the soup without setting off sparks. |
| Intro dialogue | Lunch! Pop the tin of soup straight in the microwave — spoon and all. The sparkles are free seasoning. Every top chef says so. I am every top chef. |
| Player actions | drag, tap, read, sequence |
| Interactive objects | `micro` (drop zone) (free), `sticker` (info), `start`, `tin` (drag), `spoon` (drag), `mug` (drag) (drop zone), `drawer` (drop zone) (free) |
| Success path (automated) | drag `tin` → `mug`, drag `spoon` → `drawer`, drag `mug` → `micro`, tap `start` |
| Plausible wrong actions | Metal in the microwave — the tin, the spoon, or a mug with the spoon in it — makes sparks (trap). START with nothing inside, or with an empty mug, does nothing useful (nope). |
| Par (3★) | 4 |
| Hints | 1) Read the sticker on the microwave. What are the tin and the spoon made of? 2) Get the soup out of the tin and into the mug, and get the spoon out of the mug. 3) Drag the tin onto the mug, the spoon into the cutlery drawer, the mug into the microwave, then press START. |
| Completion text | Hot soup, no fireworks, one disappointed narrator. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The NO METAL sticker beat Bossworth's "sparkles": pour the soup into the mug and lose the spoon first. |
| Ending consequences | None. |

## 68. Spider Eviction

| Field | Value |
|---|---|
| Stable ID | `spider-eviction` |
| Objective | Get the spider out of the bath. |
| Intro dialogue | A SPIDER! In the BATH! Turn the taps on full and wash it down the plughole! Or squash it! Do something DRAMATIC! I'll be over here. Standing on a chair. Inside my own head. |
| Player actions | drag, sequence, choice |
| Interactive objects | `rule` (info), `taps`, `tub` (info), `spider` (drop zone), `glass` (drag), `card` (drag), `window` (drop zone) (free), Bossworth (drop zone) |
| Success path (automated) | drag `glass` → `spider`, drag `card` → `spider`, drag `spider` → `window` |
| Plausible wrong actions | Running the taps is a trap (the spider climbs out, onto Bossworth). Swatting at it misses (nope). The postcard alone doesn't trap anything (nope). |
| Par (3★) | 3 |
| Hints | 1) Read the owners' house rule. What could you carry a spider in? 2) A glass can go over the spider, and the postcard can slide underneath to make a lid. 3) Drag the glass onto the spider, then the postcard onto the glass, then carry it to the open window. |
| Completion text | One spider relocated to the garden, alive and mildly offended. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Glass, then card, then window: you relocated the spider instead of doing anything "dramatic". |
| Ending consequences | None. |

## 69. Shadow on the Wall

| Field | Value |
|---|---|
| Stable ID | `shadow-on-the-wall` |
| Objective | Get to sleep without anybody calling the police. |
| Intro dialogue | Don't panic, but there's a GIANT HORNED BURGLAR on the bedroom wall! Call the police! Hide! I'd hide, but I'm the narrator. Narrators can't hide. We're too important. |
| Player actions | observe, drag, experiment |
| Interactive objects | `window` (info), `lamp`, `stand` (info), `hat` (drag), `coat` (drag), `shadow` (info), `wardrobe` (drop zone) (free), `police`, `sleep` |
| Success path (automated) | drag `hat` → `wardrobe`, drag `coat` → `wardrobe`, tap `sleep` |
| Plausible wrong actions | Calling the police is a trap (very embarrassing). Switching off the night lamp makes everything scarier (nope). Trying to sleep with the "burglar" still there doesn't work (nope). |
| Par (3★) | 3 |
| Hints | 1) A shape on a wall next to a lamp is usually a shadow. What is standing between the lamp and the wall? 2) The "horns" match the hat's brim, and the "body" matches the long coat on the stand. 3) Drag the hat and the coat into the wardrobe, then go to sleep. |
| Completion text | The burglar was a hat. The hat has been dealt with. Sleep tight. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The "burglar" was the coat stand's shadow; tidying the hat and coat away shrank it to a pole. |
| Ending consequences | None. |

## 70. Snooze Button

| Field | Value |
|---|---|
| Stable ID | `snooze-button` |
| Objective | Sleep as long as possible and still catch the 7:30 bus. |
| Intro dialogue | BRRRING! Hit snooze! Each snooze is one tiny minute. Snooze forever! The bus waits for nobody, but it'll make an exception for me. I'm charming. |
| Player actions | tap, count, logic |
| Interactive objects | `alarm` (info), `sign` (info), `snooze`, `up` |
| Success path (automated) | tap `snooze`, tap `snooze`, tap `up` |
| Plausible wrong actions | Getting up before 7:18 wastes good sleep (nope). Snoozing past 7:18 means missing the bus (trap). |
| Par (3★) | 3 |
| Hints | 1) Read the sign by the bed: a snooze is not one minute. 2) You need 12 minutes to get ready before the 7:30 bus, so you must be up by 7:18. Each snooze adds 9 minutes. 3) Press SNOOZE twice (7:18), then GET UP. |
| Completion text | Up at 7:18, out at 7:30, bus caught by a whisker. Maximum snooze, zero lateness. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A snooze is nine minutes, not one: two snoozes plus twelve minutes of getting ready lands exactly on the 7:30 bus. |
| Ending consequences | None. |

## 71. Under the Bed

| Field | Value |
|---|---|
| Stable ID | `under-the-bed` |
| Objective | Get a good night's sleep. |
| Intro dialogue | Bedtime. There is NO monster under the bed. Don't shine the torch under there. That sniffling? Plumbing. Pipes sniffle. Lights off, eyes shut, goodnight! |
| Player actions | tap, drag, observe, choice |
| Interactive objects | `bed` (info), `sniff` (info), `monster` (drop zone), `sleeper` (info), `torch`, `nightlight` (drag), `teddy` (drag), `switch` |
| Success path (automated) | tap `torch`, drag `nightlight` → `monster`, tap `switch` |
| Plausible wrong actions | Turning the lights off while something sniffles keeps you awake (nope). The teddy is nice but doesn't fix the dark (nope). Poking the monster makes it scream the house awake (trap). |
| Par (3★) | 3 |
| Hints | 1) The sniffling is coming from under the bed. Have a look. 2) Shine the torch. What is the little monster afraid of? 3) Tap the torch, drag the night light to the monster, then switch the big light off. |
| Completion text | Two sleepers, one night light, zero monsters (officially). |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The "no monster" was a scared little monster; a night light fixed what it was afraid of — the dark. |
| Ending consequences | None. |

## 72. Home Sweet Home

| Field | Value |
|---|---|
| Stable ID | `home-sweet-home` |
| Objective | Put the house back the way it was, then greet the owners. |
| Intro dialogue | The owners are home any minute! Quick — sweep everything under the rug. Rugs are floor-blankets for secrets. Nobody ever looks under a rug. NOBODY. |
| Player actions | drag, observe, tap, choice |
| Interactive objects | `shelf` (info), `note` (info), `slotPot` (drop zone), `slotMug` (drop zone), `slotFrame` (drop zone), `plant` (drag), `mug` (drag), `frame` (drag), `rug` (drop zone) (free), `door` |
| Success path (automated) | drag `plant` → `slotPot`, drag `mug` → `slotMug`, drag `frame` → `slotFrame`, tap `door` |
| Plausible wrong actions | An item on the wrong outline doesn't fit (nope). Opening the door before the shelf is restored is a trap. |
| Par (3★) | 4 |
| Hints | 1) Read the owners' note, then look closely at the dusty shelf. 2) The dust has clean shapes where each thing used to stand: a flowerpot, a mug with a handle, a tall frame. 3) Drag the plant, the mug and the frame onto their matching clean shapes on the shelf, then open the front door. |
| Completion text | The owners walk in, look around and say "Huh. Nothing's different." Highest possible praise for a house-sitter. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `rug-mountain` Rug Mountain — path: drag `plant` → `rug`, drag `mug` → `rug`, drag `frame` → `rug` |
| The trick (shown after solving) | The clean shapes in the dust showed exactly where everything belonged; the rug was only ever a hiding place. |
| Ending consequences | None. |

## 73. Brolly Good

| Field | Value |
|---|---|
| Stable ID | `brolly-good` |
| Objective | Go for a stroll on the promenade without getting soaked. |
| Intro dialogue | Welcome to sunny Brollington-on-Sea! The paper says GLORIOUS sunshine. Pop on the sunglasses, leave that silly umbrella, and out you go! |
| Player actions | tap, observe |
| Interactive objects | `window` (info), `paper` (info), `date` (info), `stand` (info), `brolly`, `shades`, `door`, `inv` (info) |
| Success path (automated) | tap `brolly`, tap `door` |
| Plausible wrong actions | Going out without the umbrella gets you soaked (trap). Opening the umbrella indoors is bad luck (nope). |
| Par (3★) | 2 |
| Hints | 1) Newspapers can be old. Windows are always live. 2) Look out of the window before you choose what to take. 3) Take the umbrella, then open the promenade door. |
| Completion text | Dry as a biscuit. Bossworth is cancelling his newspaper. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The forecast was last Tuesday's. The window showed the weather right now. |
| Ending consequences | None. |

## 74. Sandcastle Shore

| Field | Value |
|---|---|
| Stable ID | `sandcastle-shore` |
| Objective | Build a sandcastle that survives the tide. |
| Intro dialogue | Prime beachfront property! Build your sandcastle right at the water's edge, where the sand is lovely and wet. The tide never comes in this far. I checked. Once. |
| Player actions | drag, observe, wait |
| Interactive objects | `sea` (info), `tidesign` (info), `seaweed` (info), `wetzone` (drop zone), `dryzone` (drop zone), `pool` (drop zone) (free), `bucket` (drag) |
| Success path (automated) | drag `bucket` → `dryzone`, wait 3200 ms |
| Plausible wrong actions | A castle on the wet sand is washed away by the tide (trap). The rock pool belongs to a crab (nope). |
| Par (3★) | 1 |
| Hints | 1) The beach keeps a record of how far the sea came last time. 2) That wiggly line of seaweed and shells is where the high tide stopped. 3) Drag the bucket to the dry sand above the seaweed line, then wait. |
| Completion text | One castle, fully dry, legally unimpressed by the sea. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The seaweed line showed where high tide reaches. Building above it kept the castle safe. |
| Ending consequences | None. |

## 75. Beach Hut Seven

| Field | Value |
|---|---|
| Stable ID | `beach-hut-seven` |
| Objective | Find beach hut number 7 and open it. |
| Intro dialogue | Your hut is number SEVEN! The numbers faded in a storm, but huts are always counted from the LEFT. Everybody knows that. Count seven from the left and in you pop. |
| Player actions | tap, count |
| Interactive objects | `key` (info), `council` (info), `hut1`, `hut2`, `hut3`, `hut4`, `hut5`, `hut6`, `hut7`, `hut8`, `hut9` |
| Success path (automated) | tap `hut3` |
| Plausible wrong actions | Hut "seven from the left" is hut 3, full of inflatable flamingos (trap). Any other wrong hut just has strangers in it (nope). |
| Par (3★) | 1 |
| Hints | 1) A couple of huts still have their numbers. Check which end number 1 is at. 2) Hut 1 is on the far RIGHT, so the numbers count from the right. 3) Count seven huts from the right: it is the third hut from the left. |
| Completion text | Hut 7: one deckchair, one windbreak, zero strangers. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The surviving numbers showed hut 1 on the right, so seven was counted from the right. |
| Ending consequences | None. |

## 76. Seagull Standoff

| Field | Value |
|---|---|
| Stable ID | `seagull-standoff` |
| Objective | Eat your chips in peace. |
| Intro dialogue | Hot seaside chips! Eat them right here in the sunshine where everyone can admire you. The seagulls are perfectly polite. They signed a charter. I think. One of them pecked it. |
| Player actions | drag, tap, choice |
| Interactive objects | `sign` (info), `gull` (drop zone) (free), `parasol` (info), `shade` (drop zone) (free), `bin` (drop zone) (free), `chips` (drag), `eat` |
| Success path (automated) | drag `chips` → `shade`, tap `eat` |
| Plausible wrong actions | Eating in the open gets your chips snatched (trap). Throwing the chips in the bin is a waste (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the warning sign about what gulls steal. 2) Gulls only snatch what they can see. Somewhere on this beach is very shady. 3) Drag the chips into the deep shade under the parasol, then press EAT. |
| Completion text | Chips: eaten. Gull: outwitted. Bossworth: peckish. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `gull-buffet` Gull Buffet — path: drag `chips` → `gull` |
| The trick (shown after solving) | Gulls steal what they can see. In the parasol's shade, they couldn't see a thing. |
| Ending consequences | None. |

## 77. The Green Man

| Field | Value |
|---|---|
| Stable ID | `green-man` |
| Objective | Cross the road safely. |
| Intro dialogue | Crossing time! Watch the BIG traffic light. The moment it turns green, march straight across. Green means go. That's the law. Or a law. It's definitely law-shaped. |
| Player actions | wait, observe, tap |
| Interactive objects | `walk` (info), `plaque` (info), `press` (free), `cars` (info), `road` (info), `traffic` (info), `hero` (info), `cross` |
| Success path (automated) | wait 6000 ms, tap `cross` |
| Plausible wrong actions | Crossing while the cars have a green light gets you honked back to the kerb (trap). Crossing on amber is no better (trap). |
| Par (3★) | 1 |
| Hints | 1) There are two sets of lights here. Who is each one talking to? 2) The big light faces the cars. The little man on your side is your signal. 3) Wait until the little man turns green (the cars' light is red), then cross. |
| Completion text | Safely across. A pigeon gave you a nod of respect. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The big green light was for the cars. The little green man was yours. |
| Ending consequences | None. |

## 78. Magnetic North

| Field | Value |
|---|---|
| Stable ID | `magnetic-north` |
| Objective | Dig up the picnic buried NORTH of the old oak. |
| Intro dialogue | Treasure hunt! The picnic is buried north of the oak. My trusty compass never lies. And keep your mitts off my lucky horseshoe. It's very attached to things. Emotionally. |
| Player actions | drag, tap, logic |
| Interactive objects | `oak` (info), `digN`, `digE`, `digS`, `digW`, `compass` (info), `magnet` (drag), `map` (info), `pack` (drop zone) (free) |
| Success path (automated) | drag `magnet` → `pack`, tap `digW` |
| Plausible wrong actions | Digging where the magnet-bent needle points disturbs a very cross mole (trap). Digging "up" because up looks like north finds nothing (nope). |
| Par (3★) | 2 |
| Hints | 1) Look at what the compass needle is pointing at. 2) That "lucky horseshoe" is a magnet, and it is dragging the needle towards itself. 3) Drag the magnet into the backpack, then dig on the side the needle now points to (the left). |
| Completion text | Picnic found. The mole has been offered a sandwich as compensation. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The horseshoe was a magnet bending the needle. Move it away and the compass tells the truth. |
| Ending consequences | None. |

## 79. The Spun Signpost

| Field | Value |
|---|---|
| Stable ID | `spun-signpost` |
| Objective | Find the path to the beach. |
| Intro dialogue | Lost? Never! Signposts know everything. Just follow the arm that says BEACH. Some rascals were spinning signs round here last week, but this one looks honest. It has an honest face. |
| Player actions | tap, logic |
| Interactive objects | `post` (info), `pathN`, `pathW`, `pathE`, `fp` (info), `pathS`, `town` (info), `came` (info), `spin` |
| Success path (automated) | tap `spin`, tap `spin`, tap `pathE` |
| Alternative `reasoned` | tap `pathE` |
| Plausible wrong actions | Following the BEACH arm as it stands leads into the bog (trap). The castle path and the path back to town are not the beach (nope). |
| Par (3★) | 3 |
| Hints | 1) You know for certain where one of these paths goes: the one you walked in on. 2) Your footprints come from TOWN, below. Turn the sign until TOWN points back down that path. 3) Turn the sign twice, then take the path on the right. |
| Completion text | Sand between your toes. Bossworth has bog between his. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `spin-doctor` Spin Doctor — path: tap `spin`, tap `spin`, tap `spin`, tap `spin`, tap `spin`, tap `spin`, tap `spin`, tap `spin` |
| The trick (shown after solving) | You knew where you came from, so pointing TOWN back down your path fixed every other arm. |
| Ending consequences | None. |

## 80. Picture Perfect

| Field | Value |
|---|---|
| Stable ID | `picture-perfect` |
| Objective | Take exactly the same photo as the postcard. |
| Intro dialogue | Photo stop! Recreate this famous postcard EXACTLY. Professional tip: aim at the palm tree. Postcards are ALL about palm trees. And keep it wide, so there's room for me to photobomb. |
| Player actions | tap, compare |
| Interactive objects | `card` (info), `cam` (info), `left`, `right`, `zin`, `zout`, `snap` |
| Success path (automated) | tap `right`, tap `right`, tap `right`, tap `zin`, tap `snap` |
| Plausible wrong actions | Snapping Bossworth's wide palm-tree shot doesn't match the postcard (nope). Any other framing that doesn't match is a holiday snap nobody wants (nope). |
| Par (3★) | 5 |
| Hints | 1) Ignore the palm-tree advice. Compare your camera with the postcard itself. 2) On the postcard the lighthouse is in the middle and close up, with a boat on its right. 3) Pan right three times, zoom in once, then press SNAP. |
| Completion text | A perfect copy. The postcard company would like a word about copyright. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Matching meant framing it like the card: lighthouse centred and zoomed in, not a wide palm-tree shot. |
| Ending consequences | None. |

## 81. Departure Board

| Field | Value |
|---|---|
| Stable ID | `departure-board` |
| Objective | Get to the gate for the next flight to Sunnyvale that actually flies today. |
| Intro dialogue | Flight to Sunnyvale? It's the top one. Gate 1. Top means best, everyone knows that. And ignore those little stars and squiggles on the board, they're just decoration. Airports love sparkle. |
| Player actions | tap, read, logic |
| Interactive objects | `head` (info), `row0` (info), `row1` (info), `row2` (info), `row3` (info), `row4` (info), `foot` (info), `cal` (info), `g1`, `g2`, `g3`, `g4`, `g5` |
| Success path (automated) | tap `g5` |
| Plausible wrong actions | Gate 3 is Sundays only: you wait five days (trap). Gate 4 goes to Grimsbay (trap). Gate 1 has departed and Gate 2 is cancelled (nope). |
| Par (3★) | 1 |
| Hints | 1) Read every column of every Sunnyvale row, including the little star. 2) One has gone, one is cancelled, and the starred one only flies on Sundays. Check what day it is. 3) It is Tuesday, so go to Gate 5. |
| Completion text | Boarded. Window seat. The tiny star has been avenged. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The fine details mattered: departed, cancelled, and a star meaning Sundays only — on a Tuesday. |
| Ending consequences | None. |

## 82. Baggage Claim

| Field | Value |
|---|---|
| Stable ID | `baggage-claim` |
| Objective | Collect YOUR suitcase from the carousel. |
| Intro dialogue | Your bag is the black one. Grab the first black bag you see! All black suitcases are basically the same. That's why everybody buys them. Quick, before someone else gets it! |
| Player actions | tap, compare |
| Interactive objects | `tag` (info), `sign` (info), `belt` (info), `bagA`, `bagB`, `bagC`, `bagD`, `bagE` |
| Success path (automated) | tap `bagD` |
| Plausible wrong actions | Grabbing a black bag that doesn't match the tag gets you a stranger's pants (nope). Taking the pink suitcase upsets its owner, Bossworth (trap). |
| Par (3★) | 1 |
| Hints | 1) Your claim tag describes your bag in more detail than "black". 2) You need all three: black case, yellow ribbon AND a gold star sticker. 3) Tap the black suitcase that has both a yellow ribbon and a star (it keeps moving round, any time is fine). |
| Completion text | Reunited with your bag. It seems pleased to see you. Bags can't smile, but still. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | All the bags were black. Only one matched every detail on your claim tag. |
| Ending consequences | None. |

## 83. Listen Carefully

| Field | Value |
|---|---|
| Stable ID | `listen-carefully` |
| Objective | Catch the train to Seaside. |
| Intro dialogue | Seaside train, PLATFORM 2! Run! Don't wait for the announcement, announcers just ramble on about nothing. I already know everything. Platform 2! GO GO GO! |
| Player actions | wait, read, tap |
| Interactive objects | `speaker` (info), `pa` (info), `train` (info), `p1`, `p2`, `p3`, `p4`, `p5` |
| Success path (automated) | wait 6200 ms, tap `p5` |
| Plausible wrong actions | Platform 2 takes you through the train wash (trap). Platforms 1, 3 and 4 go elsewhere (nope). |
| Par (3★) | 1 |
| Hints | 1) Bossworth stopped listening after the first sentence. Don't copy him. 2) Let the announcement play right to the end before you move. 3) Wait for the last line, then go to Platform 5. |
| Completion text | Seaside, here you come. Bossworth is still on Platform 2, getting rinsed. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The announcement changed its mind halfway through. Only listening to the end got you Platform 5. |
| Ending consequences | None. |

## 84. Suitcase Squash

| Field | Value |
|---|---|
| Stable ID | `suitcase-squash` |
| Objective | Get the suitcase closed. |
| Intro dialogue | Won't close? Unpack and refold every item properly. All twelve. Corners crisp! And NEVER sit on a suitcase. Sitting on luggage is for amateurs, toddlers and people who catch trains. |
| Player actions | hold, tap, choice |
| Interactive objects | `tip` (info), `hotel` (info), `case` (hold), `sitter` (info), `fold`, `bin` |
| Success path (automated) | hold `case` 2200 ms |
| Alternative `obedient` | tap `fold`, tap `fold`, tap `fold`, tap `fold`, tap `fold`, tap `fold`, tap `fold`, tap `fold`, tap `fold`, tap `fold`, tap `fold`, tap `fold` |
| Plausible wrong actions | Hopping off before the zip closes undoes it (nope). Tapping the case just pokes it (nope). |
| Par (3★) | 1 |
| Hints | 1) Someone left a travel tip on the wall. It is shorter than twelve folds. 2) Press and hold the suitcase to sit on it. 3) Hold the suitcase for about two seconds until the zip closes (or fold all twelve items, if you love folding). |
| Completion text | Zipped. Slightly rounder than before, but zipped. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `travel-light` Travel Light — path: tap `bin` |
| The trick (shown after solving) | Twelve neat folds or one good sit: the travel tip knew the shortcut. |
| Ending consequences | None. |

## 85. Bear Aware

| Field | Value |
|---|---|
| Stable ID | `bear-aware` |
| Objective | Get a good night's sleep in the tent. |
| Intro dialogue | Bedtime! Lock the FOOD in the bear box, and only food. Bears hate toothpaste. They're very anti-dental. Leave your minty bits and lavender soap out, so the tent smells nice. |
| Player actions | drag, tap, sort |
| Interactive objects | `sign` (info), `bear` (info), `box` (drop zone) (free), `tent`, `sandwich` (drag), `paste` (drag), `soap` (drag), `torch` (drag), `book` (drag) |
| Success path (automated) | drag `sandwich` → `box`, drag `paste` → `box`, drag `soap` → `box`, tap `tent` |
| Plausible wrong actions | Going to sleep with anything smelly left out brings a bear (trap). The torch and the book don't smell, so the box refuses them (nope). |
| Par (3★) | 4 |
| Hints | 1) Read the ranger's sign: it isn't only about food. 2) Anything with a smell attracts bears. Toothpaste and scented soap definitely smell. 3) Put the sandwich, toothpaste and soap in the bear box, then tap the tent. |
| Completion text | Eight hours of sleep. The bear had to make do with a pine cone. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bears follow their noses, not the menu. Everything smelly went in the box. |
| Ending consequences | None. |

## 86. Still Waters

| Field | Value |
|---|---|
| Stable ID | `still-waters` |
| Objective | Catch a fish. |
| Intro dialogue | Fishing! Fish LOVE noise. Keep the radio blaring, ring my dinner bell, and I'll chat to them nonstop. They'll come flocking. Schooling. Whatever fish do. HELLO, FISH! |
| Player actions | tap, drag, wait |
| Interactive objects | `sign` (info), `noise` (info), `pond` (info), `float` (info), `bell`, `quiet` (drag), `reel`, `radio`, Bossworth (drop zone) |
| Success path (automated) | tap `radio`, drag `quiet` → `narrator`, wait 3500 ms, tap `reel` |
| Plausible wrong actions | Reeling in before a bite catches nothing (nope). Ringing the bell scares every fish away (nope). |
| Par (3★) | 3 |
| Hints | 1) Read the anglers' sign, then check the noise meter. 2) Two things are making noise: the radio and Bossworth. Both need to stop. 3) Switch the radio off, drag the QUIET PLEASE sign onto Bossworth, wait for the float to dip, then reel in. |
| Completion text | One fish, admired in total silence and gently released. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `dinner-bell` Dinner Bell — path: tap `bell`, tap `bell`, tap `bell`, tap `bell`, tap `bell` |
| The trick (shown after solving) | Fish bite in silence. You switched off the radio and the loudest thing in the park: Bossworth. |
| Ending consequences | None. |

## 87. Up the Creek

| Field | Value |
|---|---|
| Stable ID | `up-the-creek` |
| Objective | Paddle the canoe up to the jetty. |
| Intro dialogue | Paddle on the LEFT. Only ever the left. Left is my good side and the canoe can tell. Right-side paddling is for amateurs and ducks. Off you go, straight up to the jetty! |
| Player actions | tap, sequence, observe |
| Interactive objects | `river` (info), `jetty` (info), `canoe` (info), `heading` (info), `left`, `swim`, `right` |
| Success path (automated) | tap `left`, tap `right`, tap `left`, tap `right` |
| Alternative `rightFirst` | tap `right`, tap `left`, tap `right`, tap `left` |
| Plausible wrong actions | Two strokes on the same side spin the canoe in a circle (nope). Jumping out to swim meets the very judgemental ducks (trap). |
| Par (3★) | 4 |
| Hints | 1) Watch the heading sign after each stroke. 2) A stroke on the left turns the canoe right. You need something to straighten it out. 3) Alternate: left, right, left, right. |
| Completion text | Moored at the jetty. The ducks give you a slow clap. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | One side only turns a canoe in circles. Alternating sides went straight. |
| Ending consequences | None. |

## 88. Campfire Curfew

| Field | Value |
|---|---|
| Stable ID | `campfire-curfew` |
| Objective | Put the campfire out properly before bed. |
| Intro dialogue | Lights out, campers! Just blow on the fire like a birthday candle. One big puff! And ignore the ranger's sign. Rangers love long words like "extinguish". Show-offs. |
| Player actions | drag, tap, hold, sequence |
| Interactive objects | `sign` (info), `tent` (info), `fire` (drop zone) (free), `blow`, `bucket` (drag), `stick`, `feel` (hold) |
| Success path (automated) | drag `bucket` → `fire`, tap `stick`, hold `feel` 1700 ms |
| Plausible wrong actions | Blowing on a fire makes it bigger (trap). Feeling for heat before drowning it burns your hand (trap). Stirring live flames just pokes the fire (nope). Skipping the stir leaves hot embers underneath (nope). |
| Par (3★) | 3 |
| Hints | 1) The ranger's sign has three steps, in order. 2) Drown it with the bucket first, then stir, then feel for heat. 3) Drag the bucket onto the fire, tap the stick, then press and hold "Feel for heat". |
| Completion text | Cold, wet, stirred and checked. A passing ranger gives you a sticker. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The ranger's three steps beat one big puff: drown, stir, then feel. |
| Ending consequences | None. |

## 89. Riding the Wind

| Field | Value |
|---|---|
| Stable ID | `riding-the-wind` |
| Objective | Float the balloon over to Postcard Hill (on the right). |
| Intro dialogue | Hot-air ballooning! The rule is simple: go as HIGH as you possibly can. Higher is faster, and faster is… righter. Burn, burn, BURN, then ride the wind. I'm a natural. |
| Player actions | tap, observe, logic |
| Interactive objects | `flag3` (info), `flag2` (info), `flag1` (info), `flag0` (info), `balloon` (info), `hill` (info), `up`, `down`, `go` |
| Success path (automated) | tap `up`, tap `up`, tap `go` |
| Plausible wrong actions | Riding the HIGH wind blows you out to sea (trap). The LOW wind drifts you back to the car park (nope). There is no wind on the ground (nope). |
| Par (3★) | 3 |
| Hints | 1) Balloons can't steer. They go wherever the wind at their height is blowing. 2) Check the flags on the mast: which height blows towards the hill? 3) Use the burner twice to reach MID, then ride the wind. |
| Completion text | Touchdown on Postcard Hill. A cow signs your guestbook. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Balloons can't steer, they pick a wind. The middle layer was the only one blowing towards the hill. |
| Ending consequences | None. |

## 90. Tracks in the Snow

| Field | Value |
|---|---|
| Stable ID | `tracks-in-the-snow` |
| Objective | Follow a trail of footprints to the ski lodge. |
| Intro dialogue | Lost in the snow? Follow the BIG boot prints. They're mine, from this morning. I walked straight to the cosy lodge and had cocoa. I think. My socks were oddly wet afterwards. |
| Player actions | tap, trace |
| Interactive objects | `lodge` (info), `snowman` (info), `kennel` (info), `ice` (info), `icetag` (info), `tracks` (info), `big`, `paw`, `small` |
| Success path (automated) | tap `small` |
| Plausible wrong actions | The big boot prints lead onto the thin ice (trap). The paw prints lead to a dog kennel (nope). |
| Par (3★) | 1 |
| Hints | 1) The trails cross over each other. Trace each one from start to finish with your eye. 2) The big boot prints end somewhere icy. Which trail actually reaches the lodge? 3) Follow the small boot prints: they start on the right and end at the lodge on the left. |
| Completion text | Cocoa at the lodge. Bossworth's socks are drying by the fire. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The trails crossed to confuse you. Tracing them showed only the small boots reached the lodge. |
| Ending consequences | None. |

## 91. The Lonely Gate

| Field | Value |
|---|---|
| Stable ID | `the-lonely-gate` |
| Objective | Get into the Gnome Garden. |
| Intro dialogue | Welcome to the famous Gnome Garden! Sadly the gate is locked and the key is in my other trousers. In Belgium. So you'll have to climb over. Carefully. With STYLE. |
| Player actions | tap, observe |
| Interactive objects | `gnomeL` (info), `sign` (info), `gnomeC` (info), `gnomeR` (info), `field` (info), `gate`, `grassL`, `grassR`, `climb` |
| Success path (automated) | tap `grassR` |
| Alternative `leftSide` | tap `grassL` |
| Plausible wrong actions | Climbing over snags your trousers on the spikes (trap). Rattling the locked gate does nothing (nope). |
| Par (3★) | 1 |
| Hints | 1) Look at what is on either side of the gate. 2) There is no fence. The gate is just standing in a field. 3) Tap the grass beside the gate to walk round it. |
| Completion text | In! The gnomes applaud. Slowly. They are made of concrete. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A gate with no fence is just a suggestion. You walked round it. |
| Ending consequences | None. |

## 92. Wish You Were Here

| Field | Value |
|---|---|
| Stable ID | `wish-you-were-here` |
| Objective | Post the postcard to Gran. |
| Intro dialogue | Last stop: the postcard! Stamps are optional nowadays, and it goes in the LOCAL slot. Everything's local if you think hard enough. And whatever you do, do NOT stick a stamp on ME. |
| Player actions | drag, read, choice |
| Interactive objects | `sign` (info), `box` (info), `local` (drop zone) (free), `abroad` (drop zone) (free), `card` (drag) (drop zone), `stamp` (drag), Bossworth (drop zone) |
| Success path (automated) | drag `stamp` → `card`, drag `card` → `abroad` |
| Plausible wrong actions | Posting without a stamp gets it returned (nope). The LOCAL slot sends Gran's postcard to Bossworth's own doormat (trap). |
| Par (3★) | 2 |
| Hints | 1) Read the address on the postcard, and the postbox sign. 2) Norway is not local, and post without a stamp comes straight back. 3) Drag the stamp onto the postcard, then drag the postcard into the ABROAD slot. |
| Completion text | Posted. Gran will get it in a week and stick it on her fridge forever. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `return-to-sender` Return to Sender — path: drag `stamp` → `narrator` |
| The trick (shown after solving) | The address said NORWAY, so it needed a stamp and the ABROAD slot — not "optional" and "local". |
| Ending consequences | None. |

## 93. Absolutely Zero

| Field | Value |
|---|---|
| Stable ID | `absolutely-zero` |
| Objective | Keep the ice cream frozen. |
| Intro dialogue | The ice cream is melting! Set the freezer to ZERO. Zero is the coldest number, so it's the coldest setting. That's just maths. And science. Mostly maths. |
| Player actions | tap, reading |
| Interactive objects | `freezer`, `dial` (info), `sheet` (info), `unit` (info), `set0`, `set255`, `set300`, `set373` |
| Success path (automated) | tap `set255` |
| Plausible wrong actions | 373 K boils the ice cream (trap). 300 K is the current, melting setting (nope). Opening the freezer door just lets the cold out (nope). 0 K is absolute zero: a ruin. |
| Par (3★) | 1 |
| Hints | 1) Look at the unit on the freezer dial. It isn't Celsius. 2) The cheat sheet says water freezes at 273 K. Ice cream wants a bit below that — but not the end of physics. 3) Set the freezer to 255 K. |
| Completion text | Frozen, not fossilised. The ice cream thanks you. I do not. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `absolute-zero` Absolute Zero — path: tap `set0` |
| The trick (shown after solving) | The dial was in Kelvin, where zero is absolute zero; anything a bit under 273 K freezes ice cream without stopping the universe. |
| Ending consequences | None. |

## 94. Fire Formula

| Field | Value |
|---|---|
| Stable ID | `fire-formula` |
| Objective | Put out the bin fire. |
| Intro dialogue | Small fire in the lab. Totally under control. Throw the OXYGEN on it. Oxygen is basically fresh air, and fresh air calms everybody down. |
| Player actions | drag, recipe |
| Interactive objects | `bench` (info), `recipe` (info), `fire` (drop zone), `flask` (drop zone), `mix` (info), `jarH` (drag), `jarO` (drag), `jarNa` (drag), `jarC` (drag) |
| Success path (automated) | drag `jarH` → `flask`, drag `jarH` → `flask`, drag `jarO` → `flask`, drag `flask` → `fire` |
| Plausible wrong actions | Oxygen or hydrogen thrown on the fire makes it worse (trap). Sodium or carbon in the flask fizzles and the flask is tipped out (nope). Too much of an element spoils the mix (nope). |
| Par (3★) | 4 |
| Hints | 1) Fire needs oxygen to burn. What puts fires out? 2) The recipe card tells you how to make water from the jars. 3) Drag Hydrogen, Hydrogen and Oxygen into the flask, then drag the water onto the fire. |
| Completion text | Fire out. Lab damp. Narrator damper. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Oxygen feeds fires; the recipe card showed how to build water from two hydrogens and one oxygen instead. |
| Ending consequences | None. |

## 95. Liquid Layers

| Field | Value |
|---|---|
| Stable ID | `liquid-layers` |
| Objective | Build a neat four-layer density tower. |
| Intro dialogue | Make a pretty density tower! Pour the olive oil first. It's the fanciest, so it gets the bottom. The bottom is the VIP section. |
| Player actions | drag, ordering |
| Interactive objects | `poster` (info), `column` (drop zone), `stack` (info), `b-oil` (drag), `b-water` (drag), `b-honey` (drag), `b-soap` (drag) |
| Success path (automated) | drag `b-honey` → `column`, drag `b-soap` → `column`, drag `b-water` → `column`, drag `b-oil` → `column` |
| Plausible wrong actions | Pouring a lighter liquid before a heavier one mixes everything (trap). Dropping a bottle anywhere but the column does nothing (nope). |
| Par (3★) | 4 |
| Hints | 1) Heavy liquids sink, light ones float. Fancy has nothing to do with it. 2) Each bottle shows its density in g/ml. The biggest number belongs at the bottom. 3) Pour honey, then dish soap, then water, then olive oil. |
| Completion text | Four perfect stripes. Science has never looked so much like a pudding. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Denser liquids sink, so the tower only stays neat if you pour from the biggest density number to the smallest. |
| Ending consequences | None. |

## 96. Static Cling

| Field | Value |
|---|---|
| Stable ID | `static-cling` |
| Objective | Get the keycard down and open the lab door. |
| Intro dialogue | Your keycard is on the top shelf. Out of reach. Forget the balloon: static electricity is a myth invented by jumpers to get attention. |
| Player actions | hold, drag, tap |
| Interactive objects | `door`, `shelf` (info), `keycard` (drop zone), `hero` (info), `held` (info), `balloon` (hold), `stool`, `tag` (info) |
| Success path (automated) | hold `balloon` 2000 ms, drag `balloon` → `keycard`, tap `door` |
| Plausible wrong actions | Climbing the wobbly stool sends you to the floor (trap). The door will not open without the keycard (nope). An uncharged balloon just bonks the keycard (nope). |
| Par (3★) | 3 |
| Hints | 1) Rub a balloon on wool and it picks up a charge. Charged balloons attract light things. 2) Press and hold the balloon to rub it on your woolly jumper, then bring it to the keycard. 3) Hold the balloon for two seconds, drag it onto the keycard, then tap the door. |
| Completion text | Hair: standing up. Keycard: down. Myth: busted. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Rubbing a balloon on wool charges it with static, and a charged balloon can lift something as light as a paper keycard. |
| Ending consequences | None. |

## 97. Bridge the Gap

| Field | Value |
|---|---|
| Stable ID | `bridge-the-gap` |
| Objective | Light the bulb to open the door. |
| Intro dialogue | To open the door, close the circuit. Bridge the gap with the rubber duck. Ducks are famously excellent conductors. Of choirs. Same thing. |
| Player actions | drag, tap, classify |
| Interactive objects | `battery` (info), `wire` (info), `gap` (drop zone), `bulb` (info), `switch`, `chart` (info), `door`, `duck` (drag), `spoon` (drag), `clip` (drag), `tea` (drag) |
| Success path (automated) | drag `clip` → `gap`, tap `switch` |
| Plausible wrong actions | Rubber duck or wooden spoon in the gap: nothing flows (nope). Pouring tea into the circuit blows the fuse (trap). Flipping the switch with a gap does nothing (nope). |
| Par (3★) | 2 |
| Hints | 1) Electricity only travels through some materials. The chart says which. 2) Rubber and wood are insulators. You need something metal. 3) Drag the paperclip into the gap, then flip the switch. |
| Completion text | Bright bulb, open door, unemployed duck. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Only conductors carry current, and of everything on the bench only the metal paperclip conducts. |
| Ending consequences | None. |

## 98. Bits and Bulbs

| Field | Value |
|---|---|
| Stable ID | `bits-and-bulbs` |
| Objective | Enter the door code on the bulb lock. |
| Intro dialogue | The door code is TEN. So switch on TEN bulbs. There are only four? Then switch on all four and shout "TEN" confidently. That's how I passed physics. |
| Player actions | tap, counting, logic |
| Interactive objects | `plaque` (info), `code` (info), `total` (info), `b8`, `b4`, `b2`, `b1`, `enter` |
| Success path (automated) | tap `b8`, tap `b2`, tap `enter` |
| Plausible wrong actions | Entering any total other than 10 sets off the lock (trap). Pressing ENTER with every bulb off does nothing (nope). |
| Par (3★) | 3 |
| Hints | 1) Each bulb has a number above it. The lock adds them up. 2) Which of 8, 4, 2 and 1 add up to exactly 10? 3) Light the 8 bulb and the 2 bulb, then press ENTER. |
| Completion text | One-zero-one-zero. Ten, in a language only bulbs and nerds speak. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | It was a binary lock: lit bulbs add their values, and 8 + 2 makes 10 with only two bulbs. |
| Ending consequences | None. |

## 99. Off and On Again

| Field | Value |
|---|---|
| Stable ID | `off-and-on-again` |
| Objective | Unfreeze the computer and open the door. |
| Intro dialogue | The door computer is frozen. Classic. Just click the frozen window harder. And faster. Computers respect aggression. Do NOT touch the power button. |
| Player actions | hold, tap, wait |
| Interactive objects | `window`, `app`, `status` (info), `power` (hold), `esc`, `note` (info) |
| Success path (automated) | hold `power` 2000 ms, tap `power`, wait 1600 ms, tap `app` |
| Plausible wrong actions | Clicking the frozen window does nothing (nope); six clicks is a ruin. Esc does not escape anything (nope). A quick tap on power is ignored while frozen (nope). |
| Par (3★) | 3 |
| Hints | 1) The sticky note on the desk has the oldest IT advice in the world. 2) A frozen computer ignores a quick tap on power. Press and hold it to force it off. 3) Hold the power button for two seconds, tap it again, wait for the desktop, then tap Open Door. |
| Completion text | Turned off, turned on, turned out to be right. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `screen-smasher` Screen Smasher — path: tap `window`, tap `window`, tap `window`, tap `window`, tap `window`, tap `window` |
| The trick (shown after solving) | A frozen computer needs a forced restart: hold power to switch it off, then press it again to boot. |
| Ending consequences | None. |

## 100. Like Poles

| Field | Value |
|---|---|
| Stable ID | `like-poles` |
| Objective | Push the key cart to the far end of the tube. |
| Intro dialogue | Opposites attract, likes repel. I basically invented that. So put the magnet in the dock with S facing the cart's N, and off it zooms. Trust the lab coat. |
| Player actions | tap, drag, physics |
| Interactive objects | `dock` (drop zone), `tube`, `cart` (info), `rule` (info), `magnet` (drag), `flip`, `face` (info), `door` (info) |
| Success path (automated) | tap `flip`, drag `magnet` → `dock` |
| Plausible wrong actions | Docking the magnet with S facing the cart pulls the cart back (trap). Tapping the glass tube does nothing (nope). |
| Par (3★) | 2 |
| Hints | 1) He said the rule correctly. Did he apply it correctly? 2) The cart shows N towards the dock. To PUSH it away, the dock needs the same pole facing it. 3) Tap Flip so the N end is on the right, then drag the magnet into the dock. |
| Completion text | Repelled with style. Unlike my guests. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bossworth quoted the law right but used it backwards: like poles repel, so the dock needed N facing the cart's N. |
| Ending consequences | None. |

## 101. Pop-Up Panic

| Field | Value |
|---|---|
| Stable ID | `pop-up-panic` |
| Objective | Get past the pop-ups to unlock the door. |
| Intro dialogue | Pop-ups! Just click the BIG button on every one. Big buttons are always right. That's basic user experience design. I read half a book about it. |
| Player actions | tap, reading, logic |
| Interactive objects | `title` (info), `x`, `body` (info), `left`, `right`, `banner` (info), `cookies` |
| Success path (automated) | tap `right`, tap `left`, tap `left` |
| Plausible wrong actions | Each big button does something terrible (trap). The X in the corner is decorative (nope). Accepting ALL cookies is a ruin. |
| Par (3★) | 3 |
| Hints | 1) Ignore which button is bigger. Read what each pop-up actually says. 2) Watch out for double negatives, and for buttons that do the opposite of their names. 3) Press: Not now, then Yes, then Cancel. |
| Completion text | Three pop-ups, zero toolbars. A modern miracle. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `cookie-avalanche` Cookie Avalanche — path: tap `cookies` |
| The trick (shown after solving) | The big buttons were bait: reading each pop-up (including the double negative) showed the small button was right every time. |
| Ending consequences | None. |

## 102. The Watched Loader

| Field | Value |
|---|---|
| Stable ID | `watched-loader` |
| Objective | Let the door software finish loading. |
| Intro dialogue | It's loading. Stare at the bar. Don't blink. Staring makes computers go faster. It's called "supervision". I supervise things constantly. |
| Player actions | tap, wait |
| Interactive objects | `monitor` (info), `bar`, `go`, `power`, `refresh`, `hero` (info), `print` (info) |
| Success path (automated) | tap `power`, wait 4200 ms, tap `power`, tap `go` |
| Alternative `patient-and-blind` | tap `power`, wait 20000 ms, tap `power`, tap `go` |
| Plausible wrong actions | Refresh starts the bar again (nope). Poking the bar counts as watching it (nope). |
| Par (3★) | 3 |
| Hints | 1) Read the small print under the monitor. What stops this loader? 2) It only loads while nobody is watching. Can you stop watching? 3) Switch the monitor off, wait about five seconds, switch it on, then press Continue. |
| Completion text | Loaded, unobserved. Like all my best work. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The loader only progressed while unobserved, so switching the monitor off let it finish. |
| Ending consequences | None. |

## 103. Prove You're Human

| Field | Value |
|---|---|
| Stable ID | `prove-youre-human` |
| Objective | Pass the captcha. |
| Intro dialogue | Captcha time! Prove you're human. Just tap the pointy tip of the rocket. One square. Nobody counts the fins. Fins are basically optional. |
| Player actions | tap, observe, counting |
| Interactive objects | `ask` (info), `c0`, `c1`, `c2`, `c3`, `c4`, `c5`, `c6`, `c7`, `c8`, `count` (info), `verify` |
| Success path (automated) | tap `c1`, tap `c4`, tap `c6`, tap `c7`, tap `c8`, tap `verify` |
| Plausible wrong actions | Verifying with any other selection fails the captcha (trap). Verifying with nothing selected does nothing (nope). |
| Par (3★) | 6 |
| Hints | 1) Read the captcha's own instruction, word for word. 2) ALL squares with PART of a rocket. Follow the rocket from nose to fins, including the bits that poke into neighbouring squares. 3) Select the nose, the body, the fins and both fin tips (five squares), then VERIFY. |
| Completion text | Verified human. Bossworth remains unverified. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The captcha asked for every square containing part of the rocket, and the fin tips poked into the bottom corner squares. |
| Ending consequences | None. |

## 104. Signal Seeker

| Field | Value |
|---|---|
| Stable ID | `signal-seeker` |
| Objective | Get a strong Wi-Fi signal and connect. |
| Intro dialogue | Connect to the Wi-Fi. The best signal in the lab is on top of the microwave. Microwaves are basically big routers with snacks. Science. |
| Player actions | drag, tap, explore |
| Interactive objects | `info` (info), `microwave` (drop zone), `router` (info), `connect`, `bars` (info), `spot-desk` (drop zone), `spot-sofa` (drop zone), `spot-shelf` (drop zone), `laptop` (drag) |
| Success path (automated) | drag `laptop` → `spot-shelf`, tap `connect` |
| Plausible wrong actions | Putting the laptop on the humming microwave jams it (trap). Connecting with a weak signal fails (nope). |
| Par (3★) | 2 |
| Hints | 1) Watch the bars on the laptop screen as you move it around. 2) The signal comes from the router, not the microwave. Microwaves jam Wi-Fi. 3) Drag the laptop to the shelf under the router, then press CONNECT. |
| Completion text | Four bars. Zero popcorn. Full marks. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Signal is strongest near the router, and a running microwave jams the same 2.4 GHz band Wi-Fi uses. |
| Ending consequences | None. |

## 105. Four Litres Exactly

| Field | Value |
|---|---|
| Stable ID | `four-litres-exactly` |
| Objective | Load exactly 4 litres of fuel into the rocket. |
| Intro dialogue | The rocket needs EXACTLY 4 litres. I only own a 5-litre and a 3-litre tank, so it's impossible. Just fill the 5 and pour in "four-ish". Ish is a unit. |
| Player actions | drag, logic |
| Interactive objects | `pump` (drop zone), `hose` (drag), `rocket` (drop zone), `need` (info), `t5` (drag) (drop zone), `t3` (drag) (drop zone), `drain` (drop zone), `how` (info) |
| Success path (automated) | drag `t5` → `pump`, drag `t5` → `t3`, drag `t3` → `drain`, drag `t5` → `t3`, drag `t5` → `pump`, drag `t5` → `t3`, drag `t5` → `rocket` |
| Alternative `small-tank-route` | drag `t3` → `pump`, drag `t3` → `t5`, drag `t3` → `pump`, drag `t3` → `t5`, drag `t5` → `drain`, drag `t3` → `t5`, drag `t3` → `pump`, drag `t3` → `t5`, drag `t5` → `rocket` |
| Plausible wrong actions | Loading any amount other than 4 litres makes the rocket sputter (trap). Draining an empty tank does nothing (nope). Hosing the pump straight into the rocket is a ruin. |
| Par (3★) | 7 |
| Hints | 1) Pouring one tank into the other stops when the receiving tank is full. Use that. 2) Fill the 5 and pour it into the 3: 2 litres stay behind. Keep that 2 in the 3-litre tank and top up again. 3) Fill 5, pour 5→3, drain 3, pour 5→3, fill 5, pour 5→3. The 5 now holds 4: drag it onto the rocket. |
| Completion text | Four litres on the dot. Ish has been abolished. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `overfueled` Overfueled — path: drag `hose` → `rocket` |
| The trick (shown after solving) | Pouring the 5 into the 3 measures out exact remainders, so a few careful pours leave exactly 4 litres in the big tank. |
| Ending consequences | None. |

## 106. Airlock Etiquette

| Field | Value |
|---|---|
| Stable ID | `airlock-etiquette` |
| Objective | Get out for your spacewalk. |
| Intro dialogue | Spacewalk time! Open BOTH airlock doors at once. Saves time. Air is overrated. I've never needed it. Well. Constantly. But it's overrated. |
| Player actions | tap, sequence, procedure |
| Interactive objects | `sign` (info), `innerDoor` (info), `outerDoor` (info), `hero` (info), `inner`, `step`, `outer` |
| Success path (automated) | tap `inner`, tap `step`, tap `inner`, tap `outer`, tap `step` |
| Plausible wrong actions | Opening a door while the other is open vents the ship (trap). Walking into a closed door just bonks you (nope). |
| Par (3★) | 5 |
| Hints | 1) The sign above the airlock has the only rule that matters. 2) Only one door may be open at a time. Use the chamber in the middle as a waiting room. 3) Open the inner door, step forward, close the inner door, open the outer door, step forward. |
| Completion text | One door at a time. Space is big, but manners are bigger. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | An airlock only works if one door is always shut, so you cycle through the middle chamber instead of opening both. |
| Ending consequences | None. |

## 107. Dots and Dashes

| Field | Value |
|---|---|
| Stable ID | `dots-and-dashes` |
| Objective | Reply to Mission Control with the decoded message. |
| Intro dialogue | That's just static from the rover. Beep-boop, meaningless. Reply BOOM. It's my catchphrase, and Mission Control loves a catchphrase. |
| Player actions | tap, decode, reading |
| Interactive objects | `dish`, `signal` (info), `key` (info), `mc` (info), `r-BOOM`, `r-NOON`, `r-MOON`, `r-SOON` |
| Success path (automated) | tap `r-MOON` |
| Plausible wrong actions | Replying with any other word confuses Mission Control (trap). Tapping the dish only plays the beeps again (nope). |
| Par (3★) | 1 |
| Hints | 1) Those beeps are dots and dashes. There is a key on the wall. 2) Decode one letter at a time: each group between the slashes is one letter. 3) Dash-dash is M, dash-dash-dash is O, dash-dot is N. Reply MOON. |
| Completion text | Message received: MOON. Bossworth's catchphrase: unreceived. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The "static" was Morse code, and the key on the wall turns its four groups into M-O-O-N. |
| Ending consequences | None. |

## 108. Signal Delay

| Field | Value |
|---|---|
| Stable ID | `signal-delay` |
| Objective | Drill the rock sample on Mars. |
| Intro dialogue | The rover isn't responding! Press FORWARD. Then again. And again! Mash it! Mashing is how scientists communicate with machines. |
| Player actions | tap, wait, planning |
| Interactive objects | `banner` (info), `sample` (info), `crater` (info), `rover` (info), `transit` (info), `fwd`, `drill` |
| Success path (automated) | tap `fwd`, tap `fwd`, tap `drill`, wait 3500 ms |
| Alternative `one-at-a-time` | tap `fwd`, wait 3500 ms, tap `fwd`, wait 3500 ms, tap `drill`, wait 3500 ms |
| Plausible wrong actions | Too many FORWARDs drive the rover into the crater (trap). Drilling before reaching the sample just drills dirt (nope). |
| Par (3★) | 3 |
| Hints | 1) Mars is far away. Read the banner: commands take a while to arrive. 2) Every press is queued in the "in transit" panel and will all happen. Count the squares to the sample. 3) Press FORWARD twice and DRILL once, then wait for them to arrive. |
| Completion text | Sample drilled, rover intact, patience rewarded. Gross. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Commands to Mars arrive late but all arrive, so mashing queues extra moves; you plan the whole route once and wait. |
| Ending consequences | None. |

## 109. Falling for It

| Field | Value |
|---|---|
| Stable ID | `falling-for-it` |
| Objective | Fill in the lab report correctly. |
| Intro dialogue | Heavy things fall faster. Everybody knows that. Answer "the bowling ball" and let's move on. No need to actually TEST anything. Testing is for people who are wrong. |
| Player actions | tap, experiment, choice |
| Interactive objects | `chamber`, `release`, `gauge` (info), `result` (info), `report` (info), `ans-ball`, `ans-feather`, `ans-same` |
| Success path (automated) | tap `release`, tap `ans-same` |
| Alternative `already-knew` | tap `ans-same` |
| Plausible wrong actions | Answering the bowling ball is a trap. Answering the feather is a trap. The sealed chamber cannot be opened (nope). |
| Par (3★) | 2 |
| Hints | 1) You have a working experiment right in front of you. Why guess? 2) Press RELEASE and watch both objects. Note what the chamber is full of (or empty of). 3) Release them, see them land together in the vacuum, then answer "Same time". |
| Completion text | Tested, observed, recorded. Galileo would be proud. Bossworth is not. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | With no air to slow the feather, gravity pulls everything down at the same rate, and the experiment showed it. |
| Ending consequences | None. |

## 110. Docking Lights

| Field | Value |
|---|---|
| Stable ID | `docking-lights` |
| Objective | Repeat the station's docking code. |
| Intro dialogue | Docking time! The station flashes a code, you copy it. Don't bother memorising it, I'll remember it for you. I have a memory like a steel trap. A rusty one. That I lost. |
| Player actions | wait, memory, tap |
| Interactive objects | `station` (info), `capsule` (info), `signal` (info), `entered` (info), `red`, `yellow`, `blue`, `replay` (free), `thrust` |
| Success path (automated) | wait 4300 ms, tap `blue`, tap `red`, tap `yellow`, tap `blue` |
| Plausible wrong actions | Entering the wrong code is a trap. Pressing colours while the code is still flashing is a nope. A little THRUST is a nope; ramming the station is a ruin. |
| Par (3★) | 4 |
| Hints | 1) Watch the beacon on the station yourself. Bossworth's memory is… decorative. 2) The code is four colours long. Replay shows it again for free. 3) Press blue, red, yellow, blue. |
| Completion text | Docked gently. The station sends a thank-you biscuit. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `hard-docking` Hard Docking — path: tap `thrust`, tap `thrust`, tap `thrust` |
| The trick (shown after solving) | Bossworth misremembered the code on purpose; the beacon itself showed blue, red, yellow, blue, and Replay let you check. |
| Ending consequences | None. |

## 111. Launch Window

| Field | Value |
|---|---|
| Stable ID | `launch-window` |
| Objective | Launch so the rocket meets Mars. |
| Intro dialogue | Launch window! Wait until Mars is sitting right in the AIM ring, THEN launch. Point, shoot, arrive. Astronomy is just darts with extra steps. |
| Player actions | tap, counting, planning |
| Interactive objects | `orrery` (info), `plan` (info), `day` (info), `next`, `launch`, `rocket`, `note` (info) |
| Success path (automated) | tap `next`, tap `next`, tap `launch` |
| Alternative `next-orbit` | tap `next`, tap `next`, tap `next`, tap `next`, tap `next`, tap `next`, tap `next`, tap `next`, tap `next`, tap `next`, tap `launch` |
| Plausible wrong actions | Launching while Mars is in the ring arrives two days late (trap). Launching at any other time misses Mars (trap). Tapping the rocket does nothing (nope). |
| Par (3★) | 3 |
| Hints | 1) The flight plan says the trip is not instant. Where will Mars be when you arrive? 2) Mars moves one dot per day and the flight takes two days. Launch when Mars is two dots before the ring. 3) Press Next day twice (Mars reaches the top dot), then LAUNCH. |
| Completion text | Rocket and Mars, arriving together. Romantic, in a gravitational way. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Planets keep moving during the flight, so you launch early, aiming where Mars will be in two days rather than where it is now. |
| Ending consequences | None. |

## 112. Cut the Right Wire

| Field | Value |
|---|---|
| Stable ID | `cut-the-right-wire` |
| Objective | Disarm the confetti cannon. |
| Intro dialogue | My confetti cannon is about to go off! Cut the red wire. It's ALWAYS the red wire. Every film agrees. And don't read the manual. Manuals are for quitters. |
| Player actions | tap, reading, logic |
| Interactive objects | `cannon`, `timer` (info), `manual`, `order` (info), `wire1`, `wire2`, `wire3`, `wire4`, `panic` (info) |
| Success path (automated) | tap `manual`, tap `wire4` |
| Alternative `lucky-snip` | tap `wire4` |
| Alternative `after-the-egg` | wait 12000 ms, tap `manual`, tap `wire4` |
| Plausible wrong actions | Cutting the red wire (or any wrong wire) fires the confetti (trap). Poking the cannon does nothing (nope). |
| Par (3★) | 2 |
| Hints | 1) There is no rush: look closely at what the countdown is attached to. Then read the manual. 2) Turn to page 2 and check the rules in order against the four wires. 3) There is a yellow wire, one red and two blues, so rule 2 applies: cut wire 4, the last blue. |
| Completion text | Disarmed. The confetti lives to celebrate another day. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The manual's rules, checked in order, pointed to the last blue wire; the countdown was only a kitchen timer, so there was time to read. |
| Ending consequences | None. |

## 113. Hat Trick

| Field | Value |
|---|---|
| Stable ID | `hat-trick` |
| Objective | Pull the rabbit out of the hat. |
| Intro dialogue | The Great Bossworth presents: a rabbit from a hat! Reach in and hold on. The secret is to hold for AGES. Longer is better. Much longer. Trust the hat. |
| Player actions | hold, read |
| Interactive objects | `readout` (info), `guide` (info), `hat` (hold), `wand` (free) |
| Success path (automated) | hold `hat` 4000 ms |
| Plausible wrong actions | Letting go too early pulls out a hanky or a dove (nope). Holding for ages reaches the badger (trap). Just tapping the hat does nothing: you have to reach in. |
| Par (3★) | 1 |
| Hints | 1) Watch the card above the hat while you hold it. 2) The hat has layers. Longer is not always better. 3) Press and hold the hat, and let go while the card says RABBIT. |
| Completion text | One rabbit, zero badgers. A clean act. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The readout showed exactly what your hand was touching, so you let go at the rabbit instead of holding "for ages" like Bossworth said. |
| Ending consequences | None. |

## 114. Wand Waving

| Field | Value |
|---|---|
| Stable ID | `wand-waving` |
| Objective | Get through the padlocked stage door. |
| Intro dialogue | Behold my magic wand! Wave it over the HAT to make a rabbit. Only the hat. It does nothing to doors. Or padlocks. Or me. ESPECIALLY not me. |
| Player actions | drag, read |
| Interactive objects | `door` (drop zone), `hat` (drop zone), `box` (info), `wand` (drag), Bossworth (drop zone) |
| Success path (automated) | drag `wand` → `door` |
| Plausible wrong actions | Waving the wand over the hat makes a rabbit, not an exit (nope). The door is padlocked: tapping it does nothing (nope). Waving the wand at Bossworth turns him into a rabbit (ruin). |
| Par (3★) | 1 |
| Hints | 1) Read the wand's box before you believe the magician. 2) The box lists everything the wand works on. Doors are on the list. 3) Drag the wand onto the padlocked door. |
| Completion text | Abraca-door-bra. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `bossworth-bunny` Bunny Bossworth — path: drag `wand` → `narrator` |
| The trick (shown after solving) | The wand box listed doors and padlocks among the things it works on, so the "hat only" rule was just Bossworth guarding his act. |
| Ending consequences | None. |

## 115. Mislabelled Boxes

| Field | Value |
|---|---|
| Stable ID | `mislabelled` |
| Objective | Get the key without letting a rabbit escape. |
| Intro dialogue | Three boxes, three labels, all written by me, so all perfectly accurate. The key is in the box marked KEY. Obviously. Open it and stop dawdling. |
| Player actions | tap, logic |
| Interactive objects | `note` (info), `peek` (free), `boxKey`, `boxRabbit`, `boxBoth` |
| Success path (automated) | tap `peek`, tap `boxRabbit` |
| Plausible wrong actions | The box marked KEY holds the key AND a rabbit, which escapes with it (trap). The box marked KEY + RABBIT holds only a rabbit (trap). |
| Par (3★) | 1 |
| Hints | 1) Read the stagehand's note. Then look through the only peephole. 2) Every label is wrong. The KEY + RABBIT box can't hold both — the peephole shows what it really holds. 3) The peephole shows only a rabbit, so the box marked KEY has both and the box marked RABBIT has just the key. Open RABBIT. |
| Completion text | Logic: the only magic that works every time. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Every label was wrong, so one peek into the KEY + RABBIT box (just a rabbit) pinned down all three: the key was alone in the box marked RABBIT. |
| Ending consequences | None. |

## 116. Look Into My Eyes

| Field | Value |
|---|---|
| Stable ID | `look-into-my-eyes` |
| Objective | Get out of the hypnotist's act. |
| Intro dialogue | Look into my watch… you are getting sleepy… When I snap my fingers you will press the big red button and stay in my show FOREVER. Ignore the tray. It's for biscuits. |
| Player actions | tap, choice |
| Interactive objects | `poster` (info), `watch`, `tray`, `door` (info), `red` |
| Success path (automated) | tap `tray`, tap `cmdDoor` |
| Plausible wrong actions | Staring at the watch hypnotises you (trap). Pressing the big red button traps you in the show (trap). Silly commands work, but do not open the door (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the hypnotist's poster: whoever stares at the watch obeys. 2) Something shiny could make the watch stare back at Bossworth. 3) Raise the silver tray to reflect the watch at him, then choose "Open the door". |
| Completion text | You hypnotised the hypnotist. Very meta. Very rude. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The poster said whoever looks at the watch obeys, so the "biscuit tray" turned the watch into Bossworth's problem. |
| Ending consequences | None. |

## 117. Continuity Error

| Field | Value |
|---|---|
| Stable ID | `continuity` |
| Objective | Shoot take two without a continuity error. |
| Intro dialogue | Take two! The lamp was OFF and the hat was on the CHAIR. I remember perfectly. Besides, nobody notices continuity. Nobody. Just shout ACTION. |
| Player actions | tap, drag, compare |
| Interactive objects | `photo` (info), `lamp`, `rack` (drop zone), `chair` (drop zone), `hat` (drag), `mug`, `camera` (info), `action` |
| Success path (automated) | tap `lamp`, drag `hat` → `rack`, tap `action` |
| Plausible wrong actions | Shouting ACTION while the set doesn't match the photo is a trap. Drinking from the prop mug is a nope. |
| Par (3★) | 3 |
| Hints | 1) Compare the set with the continuity photo from take one. 2) Two things don't match the photo: the lamp and the hat. 3) Switch the lamp on, drag the hat onto the coat rack, then shout ACTION. |
| Completion text | Seamless. The internet will find nothing. (It will find something.) |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The continuity photo, not Bossworth's memory, showed how take one looked: lamp on and hat on the rack. |
| Ending consequences | None. |

## 118. The Prompter

| Field | Value |
|---|---|
| Stable ID | `the-prompter` |
| Objective | Prompt Bossworth through his play. |
| Intro dialogue | Tonight: my one-man play! You're the prompter. When I forget a line, feed it to me. My lines are all heroic, obviously. No need to read the script. |
| Player actions | tap, read |
| Interactive objects | `script` (info), `ghost` (info), `cue` (info), `hero`, `damp`, `bear` |
| Success path (automated) | tap `damp`, tap `wrong` |
| Plausible wrong actions | A heroic line that isn't in the script gets a nope at the first cue. A heroic line at the second cue makes the audience boo (trap). The stage direction about a bear sends Bossworth running (ruin). |
| Par (3★) | 2 |
| Hints | 1) A prompter reads the script. Bossworth hasn't. 2) Find each forgotten line in the script on the desk. They are not flattering. 3) Prompt "Only a small, damp knight.", then "I have been wrong about everything." |
| Completion text | A standing ovation, mostly for the prompter. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `pursued-by-a-bear` Pursued by a Bear — path: tap `damp`, tap `bear` |
| The trick (shown after solving) | The script on the desk held the real lines, so you prompted what was written rather than what Bossworth wished he'd written. |
| Ending consequences | None. |

## 119. Talent Show

| Field | Value |
|---|---|
| Stable ID | `talent-show` |
| Objective | Get an act past the judges. |
| Intro dialogue | Talent show! Perform the OPERA. Forty-five glorious seconds. The rules board is less "rules", more gentle suggestions written by cowards. |
| Player actions | tap, read, choice |
| Interactive objects | `rules` (info), `judges` (info), `actOpera`, `actJuggle`, `actMime`, `actDance` |
| Success path (automated) | tap `actDance` |
| Plausible wrong actions | The opera is far too long: gonged (trap). Juggling is banned: gonged (trap). The mime has no hat (nope). |
| Par (3★) | 1 |
| Hints | 1) Check each act against all three rules on the board. 2) Too long, juggling, or hatless: each breaks a rule. Only one act breaks none. 3) Choose the tap dance in a top hat: 9 seconds, no juggling, has a hat. |
| Completion text | Three yeses and a slightly confused pigeon. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Only one act passed all three rules on the board; Bossworth's favourite failed the very first one. |
| Ending consequences | None. |

## 120. The Setlist

| Field | Value |
|---|---|
| Stable ID | `the-setlist` |
| Objective | Rehearse the songs in setlist order. |
| Intro dialogue | Band rehearsal! There's the setlist. Memorise it fast, I'm confiscating it. Then play the songs in order, starting with my guitar solo. Naturally. |
| Player actions | tap, memory, sequence |
| Interactive objects | `setlist` (info), `ask`, `progress` (info), `guitar`, `drum`, `horn`, `keys` |
| Success path (automated) | tap `drum`, tap `horn`, tap `keys` |
| Alternative `from-memory-after-asking` | wait 7000 ms, tap `ask`, tap `drum`, tap `horn`, wait 6000 ms, tap `keys` |
| Plausible wrong actions | The guitar is not on the setlist (nope). Playing a song out of order is a trap. |
| Par (3★) | 3 |
| Hints | 1) The setlist was on the board at the start. What came first? 2) The guitar was never on it. You can ask to see the list again. 3) Play the drums, then the trumpet, then the keyboard. |
| Completion text | Tight set. No guitar. Bossworth is "fine with it". |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | You played the order you saw on the setlist, not the guitar solo Bossworth invented after hiding it. |
| Ending consequences | None. |

## 121. Buzz In

| Field | Value |
|---|---|
| Stable ID | `buzz-in` |
| Objective | Win the round. |
| Intro dialogue | Welcome to "Who Wants To Be Correct?"! Buzz in and answer THREE. I've seen the answer card. Trust your host. And the gold buzzer is the HOST buzzer. Paws off. |
| Player actions | tap, logic, sequence |
| Interactive objects | `screen` (info), `aThree`, `aFour`, `aSeven`, `aEleven`, `buzzer`, `host` |
| Success path (automated) | tap `buzzer`, tap `aFour` |
| Plausible wrong actions | Answering without buzzing in first is a nope. Any answer but FOUR drops you through the confetti trapdoor (trap). The gold HOST buzzer hands you Bossworth's job (ruin). |
| Par (3★) | 2 |
| Hints | 1) Count the letters in each answer. Game shows want you to buzz before answering. 2) THREE has five letters. SEVEN has five. ELEVEN has six. 3) Press your buzzer, then answer B: FOUR. |
| Completion text | Four letters, four points, one sulking host. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `hostile-takeover` Hostile Takeover — path: tap `host` |
| The trick (shown after solving) | FOUR is the only number word with as many letters as its value, whatever the host claimed to have read on his card. |
| Ending consequences | None. |

## 122. Tug of War

| Field | Value |
|---|---|
| Stable ID | `tug-of-war` |
| Objective | Win the tug of war. |
| Intro dialogue | Sports day! Tug of war: you versus nine strongmen. PULL with all your might! And never, EVER let go. Letting go is for quitters. And geniuses. |
| Player actions | tap, choice |
| Interactive objects | `rules` (info), `score` (info), `line` (info), `you` (info), `strong0` (info), `mud` (info), `pull`, `letgo` |
| Success path (automated) | tap `letgo` |
| Alternative `one-pull-then-let-go` | tap `pull`, tap `letgo` |
| Plausible wrong actions | Pulling once only slides you towards the line (nope). Pulling again drags you over the centre line (trap). |
| Par (3★) | 1 |
| Hints | 1) You can't out-pull nine strongmen. Read the referee's board. 2) Look at what is right behind Team Bossworth. 3) Let go of the rope: they tumble backwards into their own mud. |
| Completion text | Nine strongmen, one mud bath, zero effort. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | With nine strongmen leaning back over a mud pit, the strongest move was to stop pulling. |
| Ending consequences | None. |

## 123. Photo Finish

| Field | Value |
|---|---|
| Stable ID | `photo-finish` |
| Objective | Give the gold medal to the winner. |
| Intro dialogue | What a race! I won. Obviously. By a mile. Hang the gold medal on bib number 1, that's me. Ignore the photo finish. It's blurry. And unflattering. |
| Player actions | drag, observe |
| Interactive objects | `photo` (info), `medal` (drag), `r1` (drop zone), `r7` (drop zone), `r12` (drop zone), Bossworth (drop zone) |
| Success path (automated) | drag `medal` → `r12` |
| Plausible wrong actions | Giving gold to bib 1 gets it confiscated by the stewards (trap). Bib 7 came second: that's silver (nope). |
| Par (3★) | 1 |
| Hints | 1) The photo finish shows who crossed the dashed line first. 2) Read the bib numbers in the photo: who is furthest past the line? 3) Drag the gold medal onto runner 12. |
| Completion text | The photo never lies. Unlike some narrators. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The photo finish showed bib 12 past the line first and bib 1 trailing last, whatever the narrator remembered. |
| Ending consequences | None. |

## 124. Jellybean Jar

| Field | Value |
|---|---|
| Stable ID | `jellybean-jar` |
| Objective | Guess exactly how many jellybeans are in the jar. |
| Intro dialogue | Guess the beans, win the prize! A hint from your generous host: it's about a THOUSAND. Big numbers win big prizes. Say 1000. Don't count. Counting is for accountants. |
| Player actions | tap, count |
| Interactive objects | `jar` (info), `label` (info), `g8`, `g9`, `g10`, `g1000` |
| Success path (automated) | tap `g9` |
| Plausible wrong actions | 1000 is wildly wrong (trap). 10 counts Reginald the frog (trap). 8 is close but short (nope). |
| Par (3★) | 1 |
| Hints | 1) Ignore the host. Count what is actually in the jar. 2) One of the shapes has eyes. Read the jar's label. 3) There are nine beans plus Reginald the frog. Answer 9. |
| Completion text | Nine beans. One frog. Zero thousand. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Counting beats guessing: nine beans, and the label said the frog with eyes doesn't count. |
| Ending consequences | None. |

## 125. Do Not Touch

| Field | Value |
|---|---|
| Stable ID | `do-not-touch` |
| Objective | Get out of the museum. |
| Intro dialogue | Welcome to my museum! Touch NOTHING. Every exhibit is priceless and alarmed. The only exit is the gift shop, which opens in four hundred years. Enjoy. |
| Player actions | tap, read |
| Interactive objects | `vase`, `egg`, `statue`, `p1` (info), `p2` (info), `p3` (info), `shopSign` (info), `shop` |
| Success path (automated) | tap `statue`, tap `shop` |
| Plausible wrong actions | Touching the vase sets off the alarm (trap). Touching the dinosaur egg hatches it (trap). The gift shop door is shut until something opens it (nope). |
| Par (3★) | 2 |
| Hints | 1) Read every plaque. Not all of them say the same thing. 2) Exhibit 3 is interactive. It asks you to do something. 3) Shake hands with The Greeter, then go through the gift shop door. |
| Completion text | Exited through the gift shop. Bought nothing. Bossworth is devastated. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The plaques told the truth: two exhibits were hands-off, but The Greeter was an interactive piece that wanted a handshake. |
| Ending consequences | None. |

## 126. Watchful Portrait

| Field | Value |
|---|---|
| Stable ID | `watchful-portrait` |
| Objective | Find the way into the hidden gallery. |
| Intro dialogue | The hidden gallery has a secret switch. It's under the rug. Definitely the rug. And ignore the portrait. Paintings can't look at things. They're flat. |
| Player actions | tap, observe, sequence |
| Interactive objects | `portrait`, `lamp`, `clock`, `vase`, `shelf`, `rug` |
| Success path (automated) | tap `vase`, tap `clock`, tap `shelf` |
| Plausible wrong actions | The rug hides a mousetrap (trap). Tapping something the portrait isn't looking at does nothing (nope). |
| Par (3★) | 3 |
| Hints | 1) Look closely at where the duke in the portrait is looking. 2) Tap whatever his eyes point at. Then look at him again. 3) Follow his gaze: the vase, then the clock, then the bookshelf. |
| Completion text | Followed the eyes. The eyes approve. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The portrait's eyes kept pointing at the next switch, so following his gaze beat Bossworth's rug. |
| Ending consequences | None. |

## 127. Height Check

| Field | Value |
|---|---|
| Stable ID | `height-check` |
| Objective | Get on the Loop-de-Loop. |
| Intro dialogue | Too short for the Loop-de-Loop! Go home. No standing on crates, no stilts, no cheating. The rules are VERY clear. I wrote them. In big letters. |
| Player actions | drag, read |
| Interactive objects | `rules` (info), `fine` (info), `sign` (info), `you` (drop zone) (free), `gate`, `crate` (drag), `stilts` (drag), `hat` (drag) |
| Success path (automated) | drag `hat` → `you`, tap `gate` |
| Plausible wrong actions | Standing on the crate is banned (nope). The stilts end in the candyfloss stand (trap). The gate won't let you on while you're too short (nope). |
| Par (3★) | 2 |
| Hints | 1) Big letters aren't the only letters. Check the small print. 2) Height is measured to the top of your hat. 3) Drag the tall hat onto yourself, then go through the ride gate. |
| Completion text | Tall enough, technically. Technically is the best kind of tall. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The small print measured height to the top of your hat, and nothing in the big letters banned hats. |
| Ending consequences | None. |

## 128. Ferris Wheel

| Field | Value |
|---|---|
| Stable ID | `ferris-wheel` |
| Objective | Get off the Ferris wheel safely. |
| Intro dialogue | Lovely view! Hop off whenever you like. Now's good. Right now! The higher you hop, the better the view on the way down. Don't touch the emergency stop. |
| Player actions | wait, tap |
| Interactive objects | `platform` (info), `car0` (info), `car3` (info), `status` (info), `estop`, `stepoff` |
| Success path (automated) | wait 5000 ms, tap `stepoff` |
| Alternative `second-lap` | wait 18500 ms, tap `stepoff` |
| Plausible wrong actions | Stepping off anywhere but the platform is a trap. The emergency stop strands Bossworth at the top (ruin). |
| Par (3★) | 1 |
| Hints | 1) Watch your yellow car and the status board. 2) The doors only open at the platform at the bottom. 3) Wait until your car is at the platform and the board says DOORS OPEN, then step off. |
| Completion text | Feet on the ground. Narrator in the sky. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `stuck-at-the-top` Stuck at the Top — path: tap `estop` |
| The trick (shown after solving) | The wheel always brings your car back down to the platform, so waiting for the doors beat hopping off at the top. |
| Ending consequences | None. |

## 129. Fake Settings

| Field | Value |
|---|---|
| Stable ID | `fake-settings` |
| Objective | Find the way out through the settings. |
| Intro dialogue | Struggling? Here are my Settings. Switch Difficulty to EASY! Leave Brightness alone, it's moody on purpose. And "Exit door" does nothing. Purely cosmetic. |
| Player actions | tap, read, sequence |
| Interactive objects | `title` (info), `diff`, `bright`, `door`, `preview` (info), `reset`, `close` |
| Success path (automated) | tap `bright`, tap `bright`, tap `door`, tap `exit` |
| Plausible wrong actions | EASY mode is "coming soon" (nope). Reset to defaults undoes everything (trap). The Close button is only a drawing of one (nope). The Exit door setting is locked until Brightness is 100% (nope). |
| Par (3★) | 4 |
| Hints | 1) One setting is greyed out. Read why. 2) The Exit door setting needs Brightness at 100%. 3) Tap Brightness twice (to 100%), switch Exit door ON, then tap the door in the preview. |
| Completion text | Settings: adjusted. Narrator: annoyed. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The greyed-out row said exactly what it needed, so the "cosmetic" Exit door setting only had to wait for Brightness 100%. |
| Ending consequences | None. |

## 130. Now Loading

| Field | Value |
|---|---|
| Stable ID | `now-loading` |
| Objective | Finish loading the next level. |
| Intro dialogue | Hold on, the next level is loading. It takes as long as it takes. Do NOT wake Gerald. Gerald is the loading screen's engine. He's on his break. Forever. |
| Player actions | wait, read, drag, tap |
| Interactive objects | `pct` (info), `gerald` (drop zone), `tip` (info), `seeds` (drag), `skip` |
| Success path (automated) | drag `seeds` → `gerald`, wait 2000 ms, tap `start` |
| Plausible wrong actions | Pressing Skip restarts the loading screen (trap). Poking Gerald just makes him roll over (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the loading tips as they change. One of them is honest. 2) Gerald runs on sunflower seeds, and the bag is on the floor. 3) Drag the seed bag onto Gerald's wheel, wait for 100%, then press START. |
| Completion text | Loaded. Gerald would like a pay rise. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The loading bar was hamster-powered, and the honest tip said exactly what fuels the hamster. |
| Ending consequences | None. |

## 131. Roll Credits

| Field | Value |
|---|---|
| Stable ID | `roll-credits` |
| Objective | Leave through the locked stage door. |
| Intro dialogue | THE END! Roll credits! The game is over, go home. Oh, the stage door's locked and the crew took the key home with them. Every last one. Nothing to see here. |
| Player actions | tap, read, drag |
| Interactive objects | `end` (info), `cDir` (info), `cBoom`, `cBest`, `cKey`, `cFood`, `cStar` (info), `stageDoor` (drop zone) |
| Success path (automated) | tap `cKey`, drag `key` → `stageDoor` |
| Plausible wrong actions | The boom operator swings the boom mic into your head (trap). The best boy and the catering just wave (nope). The stage door stays locked without a key (nope). |
| Par (3★) | 2 |
| Hints | 1) Film crew jobs have funny names. Read them literally. 2) What would a KEY grip be holding? 3) Tap the Key Grip credit, then drag the key onto the stage door. |
| Completion text | Thanks for watching. Please exit through the plot hole. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The crew hadn't gone home: the credits listed a Key Grip, and a key grip, taken literally, grips a key. |
| Ending consequences | None. |

## 132. Left the Game

| Field | Value |
|---|---|
| Stable ID | `left-the-game` |
| Objective | Get someone trustworthy to open the exit. |
| Intro dialogue | [SYSTEM] Bossworth has left the game. …Ahem. Hello! I am a totally new narrator. Make me host and press the big red button. Obviously. — Totally_Not_Bossworth |
| Player actions | tap, logic, choice |
| Interactive objects | `banner` (info), `chat` (info), `red`, `name-tnb` (info), `tnbHost`, `tnbBan`, `name-kevin` (info), `kevinHost`, `name-gerald` (info), `geraldHost`, `geraldPoke` |
| Success path (automated) | tap `geraldPoke`, tap `geraldHost` |
| Plausible wrong actions | Pressing the big red button is a trap. Making Totally_Not_Bossworth host puts him back in charge (trap). Kevin as host just lies about opening the door (nope). A sleeping Gerald can't be host (nope). Banning Totally_Not_Bossworth bans the real narrator (ruin). |
| Par (3★) | 2 |
| Hints | 1) Only the host can open the exit. Read each player's reputation. 2) Kevin always lies. The new "narrator" has a familiar moustache. Gerald is honest, but asleep. 3) Poke Gerald awake, then make Gerald host. |
| Completion text | Host migrated. Narrator… pending. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `banned-for-life` Banned for Life — path: tap `tnbBan` |
| The trick (shown after solving) | The player list gave everyone away: the liar was labelled, the moustache was familiar, and the only honest player just needed waking up. |
| Ending consequences | None. |

## 133. Trolley Trouble

| Field | Value |
|---|---|
| Stable ID | `trolley-trouble` |
| Objective | Get a trolley for the big weekly shop. |
| Intro dialogue | The big weekly shop! I need the SHINY trolley, the one right at the front by the wall. Pop the coin in and pull. It'll slide out like butter. |
| Player actions | drag, observe |
| Interactive objects | `sign` (info), `open` (info), `row` (info), `coin` (drag), `t1` (drop zone), `t2` (drop zone), `t3` (drop zone), `t4` (drop zone) |
| Success path (automated) | drag `coin` → `t4` |
| Plausible wrong actions | The shiny front trolley drags the whole line out with it (trap). A trolley in the middle is wedged in from both sides (nope). |
| Par (3★) | 1 |
| Hints | 1) Look at how the trolleys are stacked. Which ones are free to move? 2) Each trolley is pushed inside the one in front of it. Only one end of the line is open. 3) Drag the coin onto the last trolley in the line, the one nearest you. |
| Completion text | One trolley, no tangle. The shopping can begin. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Nested trolleys only come off the back of the line, so the coin had to go in the last one, not the shiny one by the wall. |
| Ending consequences | None. |

## 134. Use By

| Field | Value |
|---|---|
| Stable ID | `use-by` |
| Objective | Put milk in the trolley that lasts until Sunday the 20th. |
| Intro dialogue | Milk for the week! Grab the one at the front. They're all the same. Milk is milk. Nobody has ever read a date on a carton. Dates are for calendars. |
| Player actions | drag, read |
| Interactive objects | `today` (info), `list` (info), `fridge` (info), `b0` (info), `f0` (drag), `b1` (info), `f1` (drag), `b2` (info), `f2` (drag), `aside` (drop zone) (free), `trolley` (drop zone) (free) |
| Success path (automated) | drag `f1` → `aside`, drag `b1` → `trolley` |
| Plausible wrong actions | A carton that goes off before the 20th spoils the week (trap). Moving the back cartons aside does nothing useful (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the dates on every carton, including the ones at the back. 2) Shops put the newest stock behind the old stock. You can't reach the back without moving the front. 3) Drag the middle front carton (15) aside, then drag the 20 behind it into the trolley. |
| Completion text | Milk until Sunday. Breakfast is safe. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Shops stack the newest stock at the back, so the carton dated the 20th was behind the old ones, not at the front where Bossworth grabbed. |
| Ending consequences | None. |

## 135. Tin Tower

| Field | Value |
|---|---|
| Stable ID | `tin-tower` |
| Objective | Get the tin of soup without toppling the display. |
| Intro dialogue | Soup! Bottom corner. Just whip it out really fast, like the tablecloth trick. The beans won't even notice. Beans are famously calm. |
| Player actions | tap, logic, sequence |
| Interactive objects | `offer` (info), `aside` (info), `b1`, `b2`, `b3`, `m1`, `m2`, `t` |
| Success path (automated) | tap `t`, tap `m1`, tap `b1` |
| Alternative `clear-the-lot` | tap `t`, tap `m2`, tap `m1`, tap `b3`, tap `b1` |
| Plausible wrong actions | Pulling out a bean tin that holds others up topples them (trap). Yanking the soup out from under the pile buries everything in beans (ruin). |
| Par (3★) | 3 |
| Hints | 1) A tin with other tins resting on it is holding them up. 2) Only take a tin when nothing is sitting on it. Start at the top. 3) Take the top tin, then the middle-left tin, then the soup. |
| Completion text | One soup, zero avalanches. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `bean-avalanche` Bean Avalanche — path: tap `b1` |
| The trick (shown after solving) | A tin holding others up can't be pulled out safely, so you unstacked from the top until nothing rested on the soup. |
| Ending consequences | None. |

## 136. Toy Inside

| Field | Value |
|---|---|
| Stable ID | `toy-inside` |
| Objective | Buy the cereal box with the free toy in it. |
| Intro dialogue | Free toy in one of these boxes! It's box A. I can feel it. I have a gift for toys. Don't weigh anything, scales are for vegetables and people with doubts. |
| Player actions | drag, tap, logic |
| Interactive objects | `sign` (info), `net` (info), `home` (drop zone), `scale` (info), `panL` (drop zone), `panR` (drop zone), `read` (info), `open`, `boxA` (drag), `buyA`, `boxB` (drag), `buyB`, `boxC` (drag), `buyC` |
| Success path (automated) | drag `boxA` → `panL`, drag `boxB` → `panR`, tap `buyC` |
| Alternative `a-against-c` | drag `boxA` → `panL`, drag `boxC` → `panR`, tap `buyC` |
| Plausible wrong actions | Buying a box without the toy (trap). Opening boxes in the aisle (trap). A pan that already holds a box (nope). |
| Par (3★) | 3 |
| Hints | 1) The boxes look the same, but a toy weighs something. 2) Put one box on each pan of the scale. The heavier side sinks. If they balance, think about the box you didn't weigh. 3) Weigh A against B: they balance, so the toy is in C. Buy box C. |
| Completion text | One box, one toy, one weighing. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A toy adds weight, so a single weighing on the balance found it: when two boxes balance, the toy is in the third. |
| Ending consequences | None. |

## 137. Bag It

| Field | Value |
|---|---|
| Stable ID | `bag-it` |
| Objective | Get six loose apples into a produce bag. |
| Intro dialogue | Apples. Bag. Easy. Except these bags NEVER open. Nobody has opened one since 1974. Just rip it with both hands like a hungry bear. |
| Player actions | tap, hold |
| Interactive objects | `sign` (info), `roll`, `sticker` (info), `blow`, `rip`, `apples` |
| Success path (automated) | tap `roll`, hold `bag` 2200 ms, tap `apples` |
| Plausible wrong actions | Ripping the bag open makes a hole and the apples escape (trap). Blowing into a stuck bag does nothing (nope). Apples bounce off a shut bag (nope). |
| Par (3★) | 3 |
| Hints | 1) Read the sticker on the bag roll. 2) Tear off a bag, then press and hold it to rub the top edge. 3) Tap the roll, hold the bag for two seconds until it opens, then tap the apples. |
| Completion text | Six apples, one bag, no bears. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The sticker on the roll had the knack: rubbing the top edge separates the sides, so holding the bag opened it without a single rip. |
| Ending consequences | None. |

## 138. Last Croissant

| Field | Value |
|---|---|
| Stable ID | `last-croissant` |
| Objective | Get Bossworth a croissant without a scuffle. |
| Intro dialogue | The LAST croissant! That lady is eyeing it. Grab it! Elbows out! Nobody is baking more. The baker went home in 1998. I checked. |
| Player actions | tap, observe |
| Interactive objects | `sign` (info), `bellTag` (info), `oven` (info), `lady` (info), `last`, `tray`, `hide`, `bell` |
| Success path (automated) | tap `bell`, tap `tray` |
| Plausible wrong actions | Grabbing the last croissant ends in an umbrella duel (trap). Hiding it behind the bread fools nobody (nope). |
| Par (3★) | 2 |
| Hints | 1) Is it really the last one? Look around the bakery. 2) Look through the oven window. Someone is definitely still baking. 3) Ring the bell for the baker, then take a croissant from the fresh tray. |
| Completion text | A warm croissant, and nobody got umbrella'd. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The oven window showed a whole tray baking, so ringing for the baker beat fighting over the "last" croissant. |
| Ending consequences | None. |

## 139. Cheese Wheel

| Field | Value |
|---|---|
| Stable ID | `cheese-wheel` |
| Objective | Ask the deli for exactly what Mum's list says. |
| Intro dialogue | Cheese! Mum wants "a little sliver". Ask for HALF the wheel. Half is basically a sliver. In cheese terms. Trust me, I'm practically a cheese. |
| Player actions | tap, maths, read |
| Interactive objects | `list` (info), `wheel` (info), `cheese` (info), `wedges` (info), `c8`, `c4`, `c2`, `all` |
| Success path (automated) | tap `c4` |
| Plausible wrong actions | Half the wheel is a whole kilo, double the list (trap). One eighth is only 250 g (nope). The whole wheel is a terrible idea (ruin). |
| Par (3★) | 1 |
| Hints | 1) Ignore Bossworth's idea of a sliver. Read the list and the deli sign. 2) The whole wheel is 2 kg, which is 2000 g. How many 500 g pieces fit in it? 3) Four pieces of 500 g make 2 kg, so ask for a quarter (1/4). |
| Completion text | Five hundred grams on the nose. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `big-cheese` The Big Cheese — path: tap `all` |
| The trick (shown after solving) | The wheel weighed 2 kg, so the 500 g on Mum's list was exactly a quarter, two of the eight wedges, and nowhere near Bossworth's "sliver" of half. |
| Ending consequences | None. |

## 140. Weigh It Up

| Field | Value |
|---|---|
| Stable ID | `weigh-it-up` |
| Objective | Print a price label for just the bananas. |
| Intro dialogue | Bananas on the scale, print the label, done. Don't touch ZERO. ZERO deletes bananas. That 0.30 is just the weight of the air. Air is heavy here. |
| Player actions | tap, sequence, observe |
| Interactive objects | `sign` (info), `price` (info), `scale` (info), `display` (info), `bananas`, `zero`, `print`, `label` (info) |
| Success path (automated) | tap `zero`, tap `bananas`, tap `print` |
| Plausible wrong actions | Printing with the scale still reading 0.30 charges for 300 g of nothing (trap). Zeroing with the bananas already on makes a 0.00 kg label (trap). Printing a label with nothing on the scale (nope). |
| Par (3★) | 3 |
| Hints | 1) Look at the scale's display before you put anything on it. 2) An empty scale should read 0.00. This one doesn't, and there's a button for that. 3) Press ZERO first, then put the bananas on, then print. |
| Completion text | One point two kilos of honest bananas. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | An empty scale showing 0.30 kg would have charged you for 300 grams of nothing, so you zeroed it before the bananas went on. |
| Ending consequences | None. |

## 141. Pick a Queue

| Field | Value |
|---|---|
| Stable ID | `pick-a-queue` |
| Objective | Join the queue that gets you through the till fastest. |
| Intro dialogue | Till 1! Only ONE person in it! Shortest queue wins. Or the express one, nobody actually counts. Quick, before someone else spots it! |
| Player actions | tap, count, read |
| Interactive objects | `s1` (info), `s2` (info), `s3` (info), `legend` (info), `express` (info), `you` (info), `n00` (info), `n10` (info), `n11` (info), `n12` (info), `n20` (info), `n21` (info), `coupons` (info), `join1`, `join2`, `join3`, `push` |
| Success path (automated) | tap `join3` |
| Plausible wrong actions | Till 1's one shopper has 86 items and a coupon book (trap). Till 2 is express, five items max, and you have twelve (nope). Pushing in is rude and ends in disgrace (ruin). |
| Par (3★) | 1 |
| Hints | 1) A queue is only as quick as the shopping in it. Look at the numbers above each shopper. 2) Add up the items in each queue, and check whether you're allowed in the express lane with 12 items. 3) Till 1 has 86 items; Till 2 is express only (5 max); Till 3 has 9 + 7 = 16. Join Till 3. |
| Completion text | Sixteen items ahead of you, and through in no time. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `queue-jumper` Queue Jumper — path: tap `push` |
| The trick (shown after solving) | Queues move at the speed of their shopping, not their people: one person with 86 items is slower than two with 16. |
| Ending consequences | None. |

## 142. The Divider

| Field | Value |
|---|---|
| Stable ID | `the-divider` |
| Objective | Pay for your own shopping with the £5 you have. |
| Intro dialogue | No need for the divider stick! We're a TEAM. Just pay for the lot and I'll pay you back. Next year. Ish. Probably. |
| Player actions | drag, tap, read |
| Interactive objects | `list` (info), `purse` (info), `belt` (info), `milk` (drop zone) (free), `bread` (drop zone) (free), `eggs` (drop zone) (free), `cake1` (drop zone) (free), `cake2` (drop zone) (free), `cake3` (drop zone) (free), `cake4` (drop zone) (free), `divider` (drag), `pay` |
| Success path (automated) | drag `divider` → `eggs`, tap `pay` |
| Plausible wrong actions | Paying with no divider buys all four cakes too (trap). A divider in the middle of your own shopping (nope). |
| Par (3★) | 2 |
| Hints | 1) Read your shopping list. Not everything on the belt is yours. 2) The yellow bar tells the cashier where one customer's shopping ends. 3) Drag the divider onto the eggs (it goes in just after them), then pay. |
| Completion text | Three items, £3.20, zero cakes. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The NEXT CUSTOMER bar tells the cashier where your shopping ends, so putting it after your eggs kept Bossworth's four cakes off your bill. |
| Ending consequences | None. |

## 143. Spend to Save

| Field | Value |
|---|---|
| Stable ID | `spend-to-save` |
| Objective | Pay LESS than £18.50 for your basket. |
| Intro dialogue | The coupon! Add my giant cake, it's basically FREE with the coupon. Or some gum, that'll tip you over. Whatever you do, don't buy more bananas. Bananas are a trap. |
| Player actions | tap, maths |
| Interactive objects | `screen` (info), `coupon` (info), `basket` (info), `gumArt` (info), `gum`, `bananasArt` (info), `bananas`, `cakeArt` (info), `cake`, `pay`, `aim` (info) |
| Success path (automated) | tap `bananas`, tap `pay` |
| Alternative `gum-and-bananas` | tap `gum`, tap `bananas`, tap `pay` |
| Plausible wrong actions | Gum leaves you short of £20, so you pay more (trap). The £6 cake makes the bill bigger even after the coupon (trap). Paying £18.50 as it is isn't paying less (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the coupon. How much do you need to spend before it works? 2) You're £1.50 short of £20. Which extra item gets you there for the least money? 3) Add the bananas (£18.50 + £1.50 = £20, minus £5 = £15), then pay. |
| Completion text | More shopping, smaller bill. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The coupon only worked from £20, so adding £1.50 of bananas took £5 off and made the whole bill cheaper than buying less. |
| Ending consequences | None. |

## 144. Two Bags

| Field | Value |
|---|---|
| Stable ID | `two-bags` |
| Objective | Pack all the shopping into the two bags without splitting one. |
| Intro dialogue | Potatoes and milk go together. Best friends. Bread and beans in the other one. That's just good manners. Bags are strong, the label is just being modest. |
| Player actions | drag, maths, logic |
| Interactive objects | `sign` (info), `max` (info), `potatoes` (drag), `beans` (drag), `milk` (drag), `bread` (drag), `bag1` (drop zone) (free), `tag1` (info), `bag2` (drop zone) (free), `tag2` (info), `third` |
| Success path (automated) | drag `potatoes` → `bag1`, drag `bread` → `bag1`, drag `beans` → `bag2`, drag `milk` → `bag2` |
| Plausible wrong actions | Putting more than 5 kg in a bag splits it (trap). There is no third bag (nope). |
| Par (3★) | 4 |
| Hints | 1) Read the bag label and the weight under each item. 2) Ten kilos in total and two 5 kg bags: each bag must hold exactly 5 kg. 3) Potatoes (4) with bread (1) in one bag; beans (3) with milk (2) in the other. |
| Completion text | Five kilos each. Two happy bags. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Ten kilos into two 5 kg bags only works as an exact split, so the 4 kg potatoes needed the 1 kg bread, not Bossworth's 2 kg milk. |
| Ending consequences | None. |

## 145. Unexpected Item

| Field | Value |
|---|---|
| Stable ID | `unexpected-item` |
| Objective | Get the self-checkout to let you pay. |
| Intro dialogue | Unexpected item? NOTHING in that bagging area is unexpected. Everything there is perfectly expected. By me. The machine is just grumpy. Give it a good shove. |
| Player actions | tap, compare |
| Interactive objects | `list` (info), `machine` (info), `screen` (info), `area` (info), `milk`, `bread`, `lunch`, `apples`, `help`, `shove`, `pay` |
| Success path (automated) | tap `lunch`, tap `pay` |
| Plausible wrong actions | Shoving the machine calls the security guard (trap). HELP: the assistant is on a break (nope). Lifting a scanned item off just makes the machine complain more (nope). |
| Par (3★) | 2 |
| Hints | 1) Compare the bagging area with the list of scanned items. 2) Something in the bagging area was never scanned. It has a big B on it. 3) Lift Bossworth's lunchbox off the bagging area, then pay. |
| Completion text | No unexpected items. Just an unexpected narrator. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The screen listed exactly what had been scanned, so the one thing in the bagging area that wasn't on it, Bossworth's lunchbox, was the unexpected item. |
| Ending consequences | None. |

## 146. Security Tag

| Field | Value |
|---|---|
| Stable ID | `security-tag` |
| Objective | Leave the shop with the kettle you paid for. |
| Intro dialogue | We PAID. Walk straight out. Those gates are decorative, like my diploma. That grey lump on the box? Bonus handle. Very modern. |
| Player actions | hold, tap |
| Interactive objects | `receipt` (info), `exitSign` (info), `pad` (info), `kettle` (info), `remover` (hold), `gates`, `pull` |
| Success path (automated) | hold `remover` 2200 ms, tap `gates` |
| Plausible wrong actions | Walking through the gates with the tag on sets off the alarm (trap). Security tags don't come off by hand (nope). |
| Par (3★) | 2 |
| Hints | 1) That grey lump on the box is a security tag, and the gates are there to notice it. 2) The round pad on the counter is a tag remover. Read its label. 3) Press and hold the tag remover for two seconds, then walk through the gates. |
| Completion text | Paid, untagged, and out without a single WEE-OO. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A paid item still sets the gates off if it keeps its security tag, so the remover pad on the counter had to come before the exit. |
| Ending consequences | None. |

## 147. Scan This One

| Field | Value |
|---|---|
| Stable ID | `scan-this-one` |
| Objective | Pay for the reduced cake with your £1.50. |
| Intro dialogue | Scan the BIG barcode. Big barcodes are the proper ones. And peel off that ugly yellow sticker first. It's ruining the look of my cake. |
| Player actions | tap, read |
| Interactive objects | `sticker` (info), `machine` (info), `screen` (info), `box` (info), `big`, `yellow`, `peel`, `purse` (info), `pay` |
| Success path (automated) | tap `yellow`, tap `pay` |
| Plausible wrong actions | The big barcode rings up the old £4 price (trap). Peeling off the sticker loses the reduction (trap). Paying before scanning anything (nope). |
| Par (3★) | 2 |
| Hints | 1) The cake has two barcodes. Read what the yellow sticker says. 2) A reduced sticker carries its own barcode with the new price. 3) Scan the yellow sticker's barcode, then pay. |
| Completion text | One pound of cake, properly scanned. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A reduced sticker brings its own barcode, so scanning the little yellow one, as it asked, rang up £1 instead of the original £4. |
| Ending consequences | None. |

## 148. Exit Doors

| Field | Value |
|---|---|
| Stable ID | `exit-doors` |
| Objective | Get out through the automatic doors. |
| Intro dialogue | The doors aren't opening? They're SHY. Do a little dance. Doors love a dance. Whatever you do, don't wave bread at them. That's just rude. |
| Player actions | drag, observe |
| Interactive objects | `sign` (info), `doors`, `beam` (drop zone), `hero` (info), `bag` (info), `alarm` (info), `fire`, `baguette` (drag), `knock`, `dance` |
| Success path (automated) | drag `baguette` → `beam`, tap `doors` |
| Plausible wrong actions | Knocking or dancing below the beam does nothing (nope). Walking into shut doors (nope). The fire exit sets off the alarm for the whole shop (ruin). |
| Par (3★) | 2 |
| Hints | 1) Look at where the sensor's dotted beam reaches, and where your head is. 2) The doors only notice things inside the beam. You're too short. Is anything in your shopping tall? 3) Drag the baguette into the sensor beam above the doors, then walk through. |
| Completion text | Out, thanks to a well-placed loaf. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `alarm-bells` Alarm Bells — path: tap `fire` |
| The trick (shown after solving) | The door sensor only saw things inside its beam, which ended above your head, so waving the long baguette into it opened the doors. |
| Ending consequences | None. |

## 149. Key Fob

| Field | Value |
|---|---|
| Stable ID | `key-fob` |
| Objective | Find Bossworth's car. |
| Intro dialogue | My car? It's the red one. Obviously. Just try the doors until one opens. Cars love being tried. That button on the key? Decorative. |
| Player actions | tap, observe |
| Interactive objects | `sign` (info), `fob`, `tryall`, `pSign` (info), `car1`, `car2`, `car3` |
| Success path (automated) | tap `fob`, tap `car3` |
| Plausible wrong actions | Opening a stranger's car sets off its alarm (trap). Trying every door is a very bad look (trap). Pressing the fob again changes nothing (nope). |
| Par (3★) | 2 |
| Hints | 1) All three cars are red, so "the red one" won't help. What else did Bossworth give you? 2) The key fob has an unlock button. Cars answer their own key. 3) Press the fob, see which car flashes its lights, then tap that car. |
| Completion text | Found it. The red one. (Bay 3.) |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | All the cars were red, but only one answered the key: pressing unlock made Bossworth's car flash its lights. |
| Ending consequences | None. |

## 150. Trolley Line

| Field | Value |
|---|---|
| Stable ID | `trolley-line` |
| Objective | Get the shopping into Bossworth's car. |
| Intro dialogue | Push the trolley to my car. All the way. That sign on the lamp post is about OTHER trolleys. I'm not moving the car. I've just got it perfectly wonky. |
| Player actions | tap, read |
| Interactive objects | `sign` (info), `line` (info), `trolley` (info), `car` (info), `push`, `carry`, `bring`, `left` (info) |
| Success path (automated) | tap `bring`, tap `push` |
| Alternative `pack-mule` | tap `carry`, tap `carry`, tap `carry`, tap `carry` |
| Plausible wrong actions | Pushing the trolley over the yellow line locks its wheels (trap). Asking for the car to be moved twice (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the sign on the lamp post, then look where the car is. 2) The trolley can't cross the line. Something else can. 3) Bring the car inside the line first, then push the trolley to it. |
| Completion text | Shopping in the boot, trolley inside the line. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Trolley wheels lock at the yellow line, but cars don't, so you brought the car to the trolley instead of the trolley to the car. |
| Ending consequences | None. |

## 151. Fuel Cap

| Field | Value |
|---|---|
| Stable ID | `fuel-cap` |
| Objective | Fill up Bossworth's car and drive home. |
| Intro dialogue | Fill her up! Green nozzle. Green means GO. Everyone knows that. And don't bother hanging it back up after, we're in a hurry. Pumps like to come along. |
| Player actions | tap, hold, read, sequence |
| Interactive objects | `sign` (info), `cap` (info), `pump` (info), `nU`, `nD`, `car` (info), `hand` (info), `trigger` (hold), `hang`, `drive` |
| Success path (automated) | tap `nD`, hold `trigger` 2200 ms, tap `hang`, tap `drive` |
| Plausible wrong actions | Unleaded petrol in a diesel car (trap). Squeezing the trigger with no nozzle in the car (nope). Driving off with the nozzle still in the car (ruin). |
| Par (3★) | 4 |
| Hints | 1) The car itself tells you what it drinks. Read the fuel cap. 2) Take the D nozzle, then press and hold the trigger until the tank is full. 3) Diesel nozzle, hold the trigger, hang the nozzle back up, then drive home. |
| Completion text | Full tank, right fuel, pump still attached to the ground. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `hose-and-go` Hose and Go — path: tap `nD`, hold `trigger` 2200 ms, tap `drive` |
| The trick (shown after solving) | Green doesn't mean go at a pump: the fuel cap said DIESEL ONLY, so the D nozzle was right, and it had to go back on its hook before driving off. |
| Ending consequences | None. |

## 152. Faulty Toaster

| Field | Value |
|---|---|
| Stable ID | `faulty-toaster` |
| Objective | Get some toast out of Bossworth's "broken" toaster. |
| Intro dialogue | This toaster is BROKEN. I pressed the lever forty times. Demand a refund! Don't touch the plug, it's fragile, and that switch is just for decoration. |
| Player actions | tap, sequence, observe |
| Interactive objects | `sign` (info), `policy` (info), `socket`, `toaster`, `plug`, `clerk` (info), `refund` |
| Success path (automated) | tap `plug`, tap `socket`, tap `toaster` |
| Alternative `switch-first` | tap `socket`, tap `plug`, tap `toaster` |
| Plausible wrong actions | Demanding a refund: the clerk plugs it in and it works (trap). Pressing the lever with no power (nope). |
| Par (3★) | 3 |
| Hints | 1) Before calling it broken, check that it has any power at all. 2) The plug is lying on the counter, and the socket's switch is off. 3) Plug it in, switch the socket on, then press the toaster's lever. |
| Completion text | Toast. From the broken toaster. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The toaster was never broken: it was unplugged and the socket was switched off, so power, not a refund, made the toast. |
| Ending consequences | None. |

## 153. Hands Up

| Field | Value |
|---|---|
| Stable ID | `hands-up` |
| Objective | Answer the question on the board. |
| Intro dialogue | Quick-fire maths! First to SHOUT the answer wins. Hands up is for slowcoaches. And the answer is 8, by the way. Shout EIGHT! |
| Player actions | tap, wait |
| Interactive objects | `board` (info), `rule` (info), `you`, `a7`, `a8`, `a34` |
| Success path (automated) | tap `you`, wait 2600 ms, tap `a7` |
| Plausible wrong actions | Answering with your hand down is shouting out (nope). Answering before you are picked is a nope. Answering 8 or 34 when picked is a trap. |
| Par (3★) | 2 |
| Hints | 1) Read the class rule poster. It outranks a substitute. 2) Tap yourself to put your hand up, then wait to be picked. 3) Hand up, wait until Bossworth picks you, then answer 7. |
| Completion text | Hand up, mouth shut, seven. Textbook. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The class rule beat the substitute: hand up, wait to be picked, and 3 + 4 is still 7. |
| Ending consequences | None. |

## 154. Every Good Boy

| Field | Value |
|---|---|
| Stable ID | `every-good-boy` |
| Objective | Play the three notes written on the board. |
| Intro dialogue | Music lesson! Play the tune on the board. Easy: the TOP line is E, E for Excellent, then G, B, D, F going down. Off you toot! |
| Player actions | tap, read, sequence |
| Interactive objects | `stave` (info), `poster` (info), `played` (info), `again` (free), `nE`, `nG`, `nB`, `nD`, `nF` |
| Success path (automated) | tap `nB`, tap `nE`, tap `nD` |
| Plausible wrong actions | Playing any other three notes is a trap. |
| Par (3★) | 3 |
| Hints | 1) The poster counts the lines from a different end than Bossworth. 2) From the bottom line up: E, G, B, D, F. Count each note's line from the bottom. 3) The notes are on lines 3, 1 and 4 from the bottom: play B, E, D. |
| Completion text | B, E, D. The tune was called "Bed". Bossworth would like one. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The stave's lines are E G B D F from the BOTTOM up, so the notes on lines 3, 1 and 4 were B, E, D, not Bossworth's top-down B, F, G. |
| Ending consequences | None. |

## 155. Broken Ruler

| Field | Value |
|---|---|
| Stable ID | `broken-ruler` |
| Objective | Measure the pencil. |
| Intro dialogue | Maths! How long is the pencil? Easy: read the number at the pointy end. It's nine. Write nine and look clever. I always look clever. |
| Player actions | tap, measure |
| Interactive objects | `q` (info), `measure` (info), `a7`, `a9`, `a11` |
| Success path (automated) | tap `a7` |
| Plausible wrong actions | Answering 9 (the number at the tip) is a trap. Answering 11 is a trap. |
| Par (3★) | 1 |
| Hints | 1) Where does the pencil start? Look at the left end of the ruler. 2) This ruler snapped off: its first mark is 2, not 0. 3) The pencil runs from 2 to 9, so it is 9 − 2 = 7 cm. |
| Completion text | Seven centimetres, measured with half a ruler and a whole brain. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The ruler had snapped off at 2, so you measured from 2 to 9 and got 7, instead of reading the end number. |
| Ending consequences | None. |

## 156. Pop Quiz

| Field | Value |
|---|---|
| Stable ID | `pop-quiz` |
| Objective | Finish the quiz and hand it in. |
| Intro dialogue | SPEED quiz! Start at question 1 and do every single one, in order, FAST. No reading ahead. Reading ahead is basically cheating. GO GO GO! |
| Player actions | tap, read |
| Interactive objects | `paper` (info), `q1`, `q2`, `q3`, `q4`, `handin`, `plane` |
| Success path (automated) | tap `q1`, tap `handin` |
| Plausible wrong actions | Doing questions 2 to 4 before handing in is a trap. Handing in without your name is a nope. Folding the quiz into a plane is a ruin. |
| Par (3★) | 2 |
| Hints | 1) The first line of the paper is an instruction too. 2) Read all the way to question 5 before you do anything. 3) Do question 1 (your name), skip 2 to 4, and hand it in. |
| Completion text | One name, zero quacks, full marks. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `quiz-plane` Quiz Plane — path: tap `plane` |
| The trick (shown after solving) | Reading every question first showed that question 5 cancelled 2 to 4, so the whole quiz was just your name. |
| Ending consequences | None. |

## 157. Shelf Help

| Field | Value |
|---|---|
| Stable ID | `shelf-help` |
| Objective | Put the books on the shelf in number order, smallest first. |
| Intro dialogue | Shelve these by number, smallest first. Easy: 3 is smaller than 12, so 520.3 goes before 520.12. I'm practically a librarian. I own a cardigan. |
| Player actions | tap, sequence |
| Interactive objects | `rule` (info), `tip` (info), `slot0` (free), `slot1` (free), `slot2` (free), `slot3` (free), `b520-3`, `b520-7`, `b520-12`, `b520-25` |
| Success path (automated) | tap `b520-12`, tap `b520-25`, tap `b520-3`, tap `b520-7` |
| Plausible wrong actions | Filling the shelf in the wrong order is a trap. |
| Par (3★) | 4 |
| Hints | 1) The numbers after the dot are not whole numbers. Read the tip card. 2) 520.3 is 520.30, which is bigger than 520.25 and 520.12. 3) Shelve 520.12, then 520.25, then 520.3, then 520.7. |
| Completion text | Point one two, point two five, point three, point seven. Dewey would be proud. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | After the dot you compare digit by digit: 520.3 is 520.30, so it comes after 520.12 and 520.25. |
| Ending consequences | None. |

## 158. Top Shelf

| Field | Value |
|---|---|
| Stable ID | `top-shelf` |
| Objective | Fetch the atlas from the top shelf. |
| Intro dialogue | The atlas is on the top shelf. Roll the ladder over and climb! Wheel locks are for cowards. Wheee! Libraries are for SPEED. |
| Player actions | drag, tap, sequence |
| Interactive objects | `sign` (info), `case` (info), `atlas`, `brake`, `climb`, `spot` (drop zone), `ladder` (drag), `pile` (drag) |
| Success path (automated) | drag `ladder` → `spot`, tap `brake`, tap `climb` |
| Plausible wrong actions | Climbing a ladder with unlocked wheels is a trap. Reaching for the atlas from the floor is a nope. Standing on the encyclopedias is a ruin. |
| Par (3★) | 3 |
| Hints | 1) Read the sign above the bookcase before you climb anything. 2) Move the ladder first. Then the wheel lock, then climb. 3) Drag the ladder to the bookcase, tap the wheel lock, then tap Climb. |
| Completion text | Atlas fetched, ladder parked, wheels locked. The world is in your hands. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `encyclopedia-stairs` Encyclopedia Stairs — path: drag `pile` → `spot` |
| The trick (shown after solving) | The sign said lock the wheels before you climb, so the ladder had to be moved first and locked second. |
| Ending consequences | None. |

## 159. I Before E

| Field | Value |
|---|---|
| Stable ID | `i-before-e` |
| Objective | Fix the spelling test, then hand it in. |
| Intro dialogue | Spelling test! I've filled it in for you. It's ALWAYS i before e, so I wrote I-E every single time. Hand it in and we can all go to lunch. |
| Player actions | tap, read |
| Interactive objects | `poster` (info), `w1`, `w2`, `w3`, `w4`, `handin` |
| Success path (automated) | tap `w1`, tap `w3`, tap `handin` |
| Plausible wrong actions | Handing in a misspelt word is a trap. |
| Par (3★) | 3 |
| Hints | 1) The poster has more words on it than Bossworth quoted. 2) "Except after c": look at the letter just before each I-E. 3) Swap RECIEVE and CIELING to E-I, leave the other two, hand it in. |
| Completion text | Four out of four. The c's got their e's back. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The rule has a second half: i before e EXCEPT after c, so RECEIVE and CEILING take E-I. |
| Ending consequences | None. |

## 160. Table Trouble

| Field | Value |
|---|---|
| Stable ID | `table-trouble` |
| Objective | Find and fix the wrong answer in the times-table square. |
| Intro dialogue | I've done the times-table square for you. Every answer correct, obviously; I'm a maths genius. Hand it in. Don't check it. Checking is rude. |
| Player actions | tap, pattern |
| Interactive objects | `hc6` (info), `hc7` (info), `hc8` (info), `hc9` (info), `hr6` (info), `c66`, `c67`, `c68`, `c69`, `hr7` (info), `c76`, `c77`, `c78`, `c79`, `hr8` (info), `c86`, `c87`, `c88`, `c89`, `hr9` (info), `c96`, `c97`, `c98`, `c99`, `handin` |
| Success path (automated) | tap `c78` |
| Plausible wrong actions | Handing in the square as it is is a trap. Tapping a correct answer is a nope. |
| Par (3★) | 1 |
| Hints | 1) Each row should go up by the same step every time. 2) Look along the 7 row: 42, 49, … then a jump that is too small. 3) 7 × 8 is 56, not 54. Tap the 54 in the 7 row. |
| Completion text | Seven eights are fifty-six. Always have been. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The 7 row should climb by 7 each time, and 49 to 54 to 63 broke the pattern; the other 54, at 6 × 9, was right. |
| Ending consequences | None. |

## 161. Mix It Up

| Field | Value |
|---|---|
| Stable ID | `mix-it-up` |
| Objective | Mix green paint and paint the frog. |
| Intro dialogue | Art class! Paint the frog green. Green is red plus blue; everybody knows that. Trust me, I once painted a fence. Most of it. |
| Player actions | drag, tap |
| Interactive objects | `poster` (info), `easel` (info), `palette` (drop zone) (free), `mix`, `pot-red` (drag), `pot-yellow` (drag), `pot-blue` (drag), `pot-white` (drag) |
| Success path (automated) | drag `pot-blue` → `palette`, drag `pot-yellow` → `palette`, tap `mix` |
| Plausible wrong actions | Mixing anything but blue and yellow is a trap. Mixing an empty palette is a nope. Tipping in all four pots is a ruin. |
| Par (3★) | 3 |
| Hints | 1) The poster on the wall knows more about paint than Bossworth. 2) Red and blue make purple. Find the pair that makes green. 3) Drag BLUE and YELLOW onto the palette, then press Mix. |
| Completion text | Blue and yellow: one green frog, ribbiting with pride. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `mud-masterpiece` Mud Masterpiece — path: drag `pot-red` → `palette`, drag `pot-yellow` → `palette`, drag `pot-blue` → `palette`, drag `pot-white` → `palette`, tap `mix` |
| The trick (shown after solving) | The colour poster was right and Bossworth wasn't: blue and yellow make green, red and blue make purple. |
| Ending consequences | None. |

## 162. Fold and Snip

| Field | Value |
|---|---|
| Stable ID | `fold-and-snip` |
| Objective | Cut out exactly ONE heart for the card. |
| Intro dialogue | Cut a heart for the card. Draw the WHOLE heart in the middle and snip round it. Half a heart is half a job. I'm an artist. I know hearts. |
| Player actions | tap, spatial |
| Interactive objects | `sample` (info), `legend` (info), `paperA`, `paperB`, `paperC`, `card` (info) |
| Success path (automated) | tap `paperB` |
| Plausible wrong actions | Cutting the whole heart (A) gives two hearts (trap). Cutting against the open edge (C) gives two loose halves (trap). |
| Par (3★) | 1 |
| Hints | 1) The paper is folded: two layers. The example at the top shows what a fold does. 2) Whatever touches the folded edge stays joined when you open it. 3) Cut paper B: half a heart against the thick dashed fold. |
| Completion text | Snip, unfold, one perfect heart. Gran will cry. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The paper was folded, so half a heart against the fold opened into one whole heart; a whole heart cut two. |
| Ending consequences | None. |

## 163. Fair Test

| Field | Value |
|---|---|
| Stable ID | `fair-test` |
| Objective | Set up a fair test of ramp height, then run it. |
| Intro dialogue | Science fair! Judging in five minutes. I set up the ramps: one is different in EVERY way, which makes it extra scientific. Press Run and write down whatever happens. |
| Player actions | tap, logic |
| Interactive objects | `poster` (info), `q` (info), `tAh`, `tAcar`, `tAfloor`, `rampA` (info), `tBh`, `tBcar`, `tBfloor`, `rampB` (info), `run` |
| Success path (automated) | tap `tBcar`, tap `tBfloor`, tap `run` |
| Alternative `matchA` | tap `tAcar`, tap `tAfloor`, tap `run` |
| Plausible wrong actions | Running a test where more than height differs is a trap. Running two identical ramps is a nope. |
| Par (3★) | 3 |
| Hints | 1) Read the poster. How many things are different between the ramps? 2) The question is about height, so height is the only thing allowed to differ. 3) Make both cars the same and both floors the same (keep the heights different), then Run. |
| Completion text | One change, one answer. The judges gave it a rosette. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A fair test changes only the thing you are testing, so the cars and floors had to match while the heights stayed different. |
| Ending consequences | None. |

## 164. Bending Bean

| Field | Value |
|---|---|
| Stable ID | `bending-bean` |
| Objective | Make the bean plant reach the prize rosette. |
| Intro dialogue | Judging in two minutes! Make the bean reach the prize ribbon. Plants grow when you shout at them; tap it and yell GROW! Or tip the whole bottle of Super-Gro on it! |
| Player actions | drag, wait |
| Interactive objects | `poster` (info), `rosette` (info), `spotL` (drop zone), `spotR` (drop zone), `bean` (drop zone), `gro` (drag), `lamp` (drag) |
| Success path (automated) | drag `lamp` → `spotR`, wait 4600 ms |
| Plausible wrong actions | Shouting at the plant does nothing (nope). Pouring on the Super-Gro is a trap. |
| Par (3★) | 1 |
| Hints | 1) Which way is the bean leaning right now, and what is on that side? 2) The poster says plants grow towards the light. 3) Drag the lamp to the right-hand side, then wait a few seconds. |
| Completion text | The bean leaned, the bean reached, the bean won. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Plants grow towards the light, as the poster said, so moving the lamp beside the rosette steered the bean to it. |
| Ending consequences | None. |

## 165. Clean Hands

| Field | Value |
|---|---|
| Stable ID | `clean-hands` |
| Objective | Wash your hands properly, then go to lunch. |
| Intro dialogue | Lunch! A quick splash under the tap and in you go. Soap is for show-offs, and scrubbing is for floors. Chop chop, it's fish fingers. |
| Player actions | tap, hold |
| Interactive objects | `poster` (info), `timer` (info), `door`, `sink` (info), `soap`, `hands` (info), `scrub` (hold) |
| Success path (automated) | tap `soap`, hold `scrub` 5200 ms, tap `door` |
| Plausible wrong actions | Going to lunch without washing properly is a trap. Letting go of Scrub before 5 seconds is a nope. Scrubbing without soap is a nope. |
| Par (3★) | 3 |
| Hints | 1) The poster by the sink has three steps. Bossworth skipped two. 2) Soap first. Then the scrub has to last until the timer reaches 5. 3) Tap the soap, hold Scrub for five seconds, then open the LUNCH door. |
| Completion text | Soap, scrub, five whole seconds. Squeaky clean. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The poster beat the "quick splash": soap first, then a scrub that lasts the full five seconds. |
| Ending consequences | None. |

## 166. Dinner Money

| Field | Value |
|---|---|
| Stable ID | `dinner-money` |
| Objective | Pay for your lunch. |
| Intro dialogue | Lunch is 85p. Just give them the big £2 coin; they'll sort out the change. That's what change is FOR. Big coin, big smile, big lunch. |
| Player actions | drag, tap, count |
| Interactive objects | `menu` (info), `sign` (info), `paid` (info), `till` (info), `dish` (drop zone) (free), `pay`, `c200` (drag), `c50` (drag), `c20a` (drag), `c20b` (drag), `c10` (drag), `c5` (drag), `c2` (drag), `c1` (drag) |
| Success path (automated) | drag `c50` → `dish`, drag `c20a` → `dish`, drag `c10` → `dish`, drag `c5` → `dish`, tap `pay` |
| Plausible wrong actions | Paying more than 85p is a trap: the till gives no change. Paying less than 85p is a nope. |
| Par (3★) | 5 |
| Hints | 1) Read the sign on the till before you hand over anything. 2) No change is given, so the dish must hold exactly 85p. 3) Put 50p, 20p, 10p and 5p in the dish, then press Pay. |
| Completion text | Fifty, twenty, ten, five. Exactly 85p and not a penny lost. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The till gave no change, so you had to count out exactly 85p instead of handing over the £2 coin. |
| Ending consequences | None. |

## 167. Lunchbox Swap

| Field | Value |
|---|---|
| Stable ID | `lunchbox-swap` |
| Objective | Swap your way to the last chocolate pudding. |
| Intro dialogue | The last chocolate pudding! Pat has it. Shove your sandwich at Pat. Nobody says no to a cheese sandwich. NOBODY. |
| Player actions | drag, logic |
| Interactive objects | `say-pat` (info), `pat` (drop zone) (free), `say-kim` (info), `kim` (drop zone) (free), `say-lee` (info), `lee` (drop zone) (free), `youTag` (info), `lunch` (drag), `stew` (drop zone) (free) |
| Success path (automated) | drag `lunch` → `lee`, drag `lunch` → `kim`, drag `lunch` → `pat` |
| Plausible wrong actions | Offering someone a swap they don't want is a nope. Swapping at the Mystery Stew hatch is a ruin. |
| Par (3★) | 3 |
| Hints | 1) Read what each pupil wants. Pat doesn't want a sandwich. 2) Work backwards: Pat wants an apple. Who has an apple, and what do they want? 3) Sandwich to Lee, crisps to Kim, apple to Pat. |
| Completion text | Sandwich, crisps, apple, pudding. A trade empire in three moves. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `mystery-stew` Mystery Stew — path: drag `lunch` → `stew` |
| The trick (shown after solving) | Pat only wanted an apple, so you worked backwards along the swaps: sandwich for crisps, crisps for an apple, apple for the pudding. |
| Ending consequences | None. |

## 168. Ding Ding

| Field | Value |
|---|---|
| Stable ID | `ding-ding` |
| Objective | Get off the bus at the School stop. |
| Intro dialogue | All aboard the school bus! When you can SEE the school out of the window, press STOP. Then press it again. And again. Bus drivers LOVE that. |
| Player actions | tap, wait, timing |
| Interactive objects | `route` (info), `display` (info), `sticker` (info), `window` (info), `pole`, `doors` |
| Success path (automated) | wait 3100 ms, tap `pole`, wait 3000 ms, tap `doors` |
| Alternative `secondLap` | wait 15100 ms, tap `pole`, wait 3000 ms, tap `doors` |
| Plausible wrong actions | Pressing STOP at the wrong moment stops the bus at the wrong stop (trap). Pressing STOP twice is a nope. The doors don't open while the bus is moving (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the sticker on the pole: it says when to press. 2) Pressing STOP stops the bus at the NEXT stop, so press it one stop early. 3) Wait until the display says NEXT STOP: School, press STOP once, then tap the doors when they open. |
| Completion text | One ding, one stop, one pupil on time. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | STOP means stop at the NEXT stop, so pressing it while the display said "Next stop: School" got you off at school. |
| Ending consequences | None. |

## 169. Star of the Week

| Field | Value |
|---|---|
| Stable ID | `star-of-the-week` |
| Objective | Give the star to the pupil with the most merit marks. |
| Intro dialogue | Star of the Week! Most merit marks wins. Only count the STRAIGHT lines; the slanty ones are crossings-out. Ben wins. Stick it on Ben. |
| Player actions | drag, count |
| Interactive objects | `title` (info), `name-ava` (drop zone) (free), `tally-ava` (info), `name-ben` (drop zone) (free), `tally-ben` (info), `name-cal` (drop zone) (free), `tally-cal` (info), `star` (drag), `you` (drop zone) (free) |
| Success path (automated) | drag `star` → `name-ava` |
| Plausible wrong actions | Giving the star to Ben or Cal is a trap. Sticking it on yourself is a ruin. |
| Par (3★) | 1 |
| Hints | 1) Read the key at the top of the chart. 2) A slanty line through four marks makes a bundle of FIVE, not a crossing-out. 3) Ava has 5 + 5 + 1 = 11. Drag the star onto Ava. |
| Completion text | Eleven merits, one star, zero crossings-out. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `self-starter` Self-Starter — path: drag `star` → `you` |
| The trick (shown after solving) | The slanty line ties four marks into a bundle of five, so Ava's 11 beat Ben's 10 loose marks. |
| Ending consequences | None. |

## 170. Room XIV

| Field | Value |
|---|---|
| Stable ID | `room-xiv` |
| Objective | Find the head teacher's office: Room 14. |
| Intro dialogue | Off to the head teacher with you! Room 14. The doors use Roman numerals: X is 10, I is 1, V is 5. Add them up: X, I, V. Ten, one, five… sixteen! XVI it is. |
| Player actions | tap, read |
| Interactive objects | `notice` (info), `chart` (info), `xi`, `xvi`, `xiv`, `xix` |
| Success path (automated) | tap `xiv` |
| Plausible wrong actions | Door XVI is the caretaker's cupboard (trap). Doors XI and XIX are the wrong rooms (nope). |
| Par (3★) | 1 |
| Hints | 1) Read the whole numerals chart, especially the second line. 2) When a smaller numeral comes before a bigger one, it is taken away: IV is 4, not 6. 3) X + IV = 10 + 4 = 14. Knock on door XIV. |
| Completion text | Ten, then one-before-five. Room 14, found. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | In Roman numerals a smaller numeral before a bigger one is taken away, so XIV is 10 + 4 = 14 and XVI is 16. |
| Ending consequences | None. |

## 171. Balancing Act

| Field | Value |
|---|---|
| Stable ID | `balancing-act` |
| Objective | Hang both weights so the beam balances, then let go. |
| Intro dialogue | Balance the beam! My weight is on peg 4. Your peg 4 snapped off, so hang BOTH your weights on peg 3, right out near the end. Far is fair! |
| Player actions | drag, tap, logic |
| Interactive objects | `rule` (info), `beam` (info), `leftW` (info), `peg1` (drop zone), `peg2` (drop zone), `peg3` (drop zone), `w1` (drag), `w2` (drag), `letgo` |
| Success path (automated) | drag `w1` → `peg2`, drag `w2` → `peg2`, tap `letgo` |
| Alternative `oneAndThree` | drag `w1` → `peg1`, drag `w2` → `peg3`, tap `letgo` |
| Plausible wrong actions | Letting go when the sides don't add up the same is a trap. Letting go before both weights are hung is a nope. |
| Par (3★) | 3 |
| Hints | 1) Read the rule card: a weight counts as its peg number. 2) The left side counts 4. Your two weights must add up to 4 as well. 3) Hang both weights on peg 2 (or one on peg 1 and one on peg 3), then let go. |
| Completion text | Two on peg two. Perfectly level, like a good argument. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | On a balance a weight counts as far as its peg is from the middle, so two weights on peg 2 (or pegs 1 and 3) matched one weight on peg 4. |
| Ending consequences | None. |

## 172. Lines

| Field | Value |
|---|---|
| Stable ID | `lines` |
| Objective | Write your 20 lines, then leave detention. |
| Intro dialogue | Detention! Twenty lines. By hand. ONE at a time. No tricks. I invented every detention trick there is, and none of them work. I checked. |
| Player actions | drag, tap, count |
| Interactive objects | `slip` (info), `count` (info), `door`, `tip` (info), `paper` (info), `pencils` (drop zone), `band` (drag) |
| Success path (automated) | drag `band` → `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `door` |
| Alternative `byHand` | tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `pencils`, tap `door` |
| Plausible wrong actions | Trying to leave before 20 lines are written is a nope. |
| Par (3★) | 7 |
| Hints | 1) Someone left a tip scratched into the desk. 2) The rubber band can strap all four pencils together. 3) Drag the band onto the pencils, tap them five times, then open the door. |
| Completion text | Twenty lines in five strokes. Detention: outsmarted. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Four pencils strapped together write four lines per stroke, so twenty lines took five strokes instead of twenty. |
| Ending consequences | None. |

## 173. The Drawbridge

| Field | Value |
|---|---|
| Stable ID | `the-drawbridge` |
| Objective | Get across the moat into the castle. |
| Intro dialogue | Welcome to the castle of KING Bossworth. Yes, king. To lower the drawbridge, pile MORE rocks in that basket. Heavier is better. Trust your king. |
| Player actions | tap, drag, count |
| Interactive objects | `plaque` (info), `basket` (drop zone), `btag` (info), `wtag` (info), `gate` (info), `bridge`, `moat`, `pile` (drag), `you` (info) |
| Success path (automated) | tap `basket`, tap `basket`, tap `bridge` |
| Plausible wrong actions | Swimming the moat sends you back soggy (trap). Adding a rock to the basket only lifts the bridge higher (nope). The bridge cannot be crossed while it is up (nope). |
| Par (3★) | 3 |
| Hints | 1) Read the plaque: what is the basket actually doing to the bridge? 2) The basket keeps the bridge UP. A lighter basket lets the bridge come down. The bridge weighs 3 rocks. 3) Tap the basket twice to lift two rocks out (4 → 2), then walk across the bridge. |
| Completion text | You took rocks OUT. Of my basket. And it worked. Physics is a traitor. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A counterweight holds a drawbridge up, so taking rocks out of the basket until it weighed less than the bridge let it come down. |
| Ending consequences | None. |

## 174. Guest List

| Field | Value |
|---|---|
| Stable ID | `guest-list` |
| Objective | Get past the gate guard. |
| Intro dialogue | Only VIPs get in tonight. Pop on the crown — guards ALWAYS let a king in. I should know. I have been a king since Tuesday. |
| Player actions | drag, tap, read |
| Interactive objects | `list` (info), `gate` (info), `you` (drop zone) (free), `guard`, `cap` (drag), `chef` (drag), `crown` (drag), `wrench` (drag), `broom` (drag) |
| Success path (automated) | drag `cap` → `you`, drag `wrench` → `you`, tap `guard` |
| Plausible wrong actions | Presenting yourself in the crown gets you sent away (trap). Any outfit not on the list is turned back (nope). |
| Par (3★) | 3 |
| Hints | 1) Read the guest list. Who is the guard expecting, and what do they look like? 2) Kings are banned tonight. Only one guest on the list can be matched from the things on the floor. 3) Drag the blue cap and the wrench onto yourself (the Royal Plumber), then tap the guard. |
| Completion text | In as the plumber. Nobody suspects a plumber. I should have come as a plumber. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The guest list banned kings and only one guest — the Royal Plumber, blue cap and wrench — could be matched from the props on the floor. |
| Ending consequences | None. |

## 175. Changing of the Guard

| Field | Value |
|---|---|
| Stable ID | `changing-of-the-guard` |
| Objective | Get through the inner gate. |
| Intro dialogue | Those guards never move. Not for bells, not for anyone, not ever. Bribe them with my gold. Everybody has a price. |
| Player actions | tap, wait, read |
| Interactive objects | `sign` (info), `bell` (info), `rope`, `tower` (info), `gate`, `g1` (info), `g2` (info), `late` (info), `coins` |
| Success path (automated) | tap `rope`, tap `gate` |
| Alternative `tower-bell` | wait 31000 ms, tap `gate` |
| Plausible wrong actions | Offering the guards gold gets you escorted out (trap). Walking into crossed pikes does nothing (nope). |
| Par (3★) | 2 |
| Hints | 1) The sign above the gate says exactly when the guards move. 2) The guards change at every bell, and the tower bell is not the only bell here. 3) Pull the bell rope, then walk through the gate while the new guards are late. (Or wait for the tower bell.) |
| Completion text | Through the gate between shifts. The new guards are still looking for their hats. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The sign said the guards change at every bell, so ringing the bell yourself left the gate unguarded between shifts. |
| Ending consequences | None. |

## 176. Catapult Post

| Field | Value |
|---|---|
| Stable ID | `catapult-post` |
| Objective | Get the barred castle door opened. |
| Intro dialogue | The door is barred from inside. Simple: load the big rock into the catapult and knock that door flat. Siege-style. Very royal. |
| Player actions | drag, tap, read |
| Interactive objects | `window` (info), `psign` (info), `door`, `cata` (drop zone), `you` (drag), `letter` (drag), `rock` (drag), `launch` |
| Success path (automated) | drag `letter` → `cata`, tap `launch`, tap `door` |
| Plausible wrong actions | A rock bounces off the wall and back at you (trap). Launching nothing, or knocking on the barred door, does nothing (nope). |
| Par (3★) | 3 |
| Hints | 1) Someone up in the window could open the door. Read what they accept. 2) The porter takes letters only, and there happens to be a letter on the ground. 3) Drag the letter onto the catapult, press LAUNCH, then go through the door. |
| Completion text | Letter delivered by catapult. Royal Mail has never been faster or more alarming. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `human-cannonball` Human Cannonball — path: drag `you` → `cata`, tap `launch` |
| The trick (shown after solving) | The porter's sign said letters only, so a polite letter by catapult opened the door that a rock never would. |
| Ending consequences | None. |

## 177. Line of Succession

| Field | Value |
|---|---|
| Stable ID | `line-of-succession` |
| Objective | Crown the rightful ruler. |
| Intro dialogue | Crown the rightful ruler! Check the official chart if you must. It is obviously me. Pop the crown on my throne and let us all get on with the bowing. |
| Player actions | drag, read |
| Interactive objects | `chart` (info), `crayon` (info), `postcard` (drop zone), `circus` (info), `throne` (drop zone), `cat` (drop zone) (free), `you` (drop zone) (free), `crown` (drag) |
| Success path (automated) | drag `crown` → `cat` |
| Plausible wrong actions | Crowning the crayon throne makes the crown roll off (trap). The queen is on holiday: her postcard cannot wear a crown (nope). |
| Par (3★) | 1 |
| Hints | 1) Read the official chart, and notice which line is not official. 2) Number 1 retired to the seaside and number 2 ran off to the circus. Crayon is not ink. 3) Drag the crown onto Lady Pudding, the castle cat. |
| Completion text | All hail Queen Pudding the First. She has already knocked my sceptre off the table. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `usurper` The Usurper — path: drag `crown` → `you` |
| The trick (shown after solving) | The official chart skipped the retired queen and the runaway duke straight to Lady Pudding the cat — the crayon "0. ME!" was never part of it. |
| Ending consequences | None. |

## 178. Seal of Approval

| Field | Value |
|---|---|
| Stable ID | `seal-of-approval` |
| Objective | Seal the decree so the gate opens. |
| Intro dialogue | My decree needs my royal B seal. Use seal one — the B that reads properly. The other two are obviously backwards. Honestly, who carves a backwards seal? |
| Player actions | tap, read, logic |
| Interactive objects | `oldseal` (info), `oldletter` (info), `oldtag` (info), `decree` (info), `gate`, `s1`, `s2`, `s3` |
| Success path (automated) | tap `s2`, tap `gate` |
| Plausible wrong actions | Seal 1 prints a backwards B and the guard calls it a forgery (trap). Seal 3 prints a D (nope). The gate stays shut until the decree is sealed (nope). |
| Par (3★) | 2 |
| Hints | 1) Compare the old king's seal with the letter he sealed. Is the print the same way round as the carving? 2) A seal prints a mirror image of its face. A backwards carving makes a forwards print. 3) Press seal 2 (the backwards B) onto the decree, then go through the gate. |
| Completion text | Sealed with a perfect B. Using the "wrong" seal. My whole life is a mirror image. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A seal prints the mirror image of its face — the old king's backwards K made a proper K — so the backwards-carved B was the right one. |
| Ending consequences | None. |

## 179. Knight Moves

| Field | Value |
|---|---|
| Stable ID | `knight-moves` |
| Objective | Cross the chess hall to the door. |
| Intro dialogue | My royal chess hall! Just walk straight up the middle to the door, one square at a time, like a normal person. Ignore the plaque. Plaques are for peasants. |
| Player actions | tap, logic |
| Interactive objects | `plaque` (info), `ta1`, `tb1`, `tc1`, `td1`, `ta2`, `tb2`, `tc2`, `td2`, `ta3`, `tb3`, `tc3`, `td3`, `ta4`, `tb4`, `tc4`, `td4`, `hops` (info) |
| Success path (automated) | tap `td2`, tap `tb3`, tap `td4` |
| Plausible wrong actions | A normal step onto a neighbouring square is refused (nope). You cannot land on the snoozing guard (nope). |
| Par (3★) | 3 |
| Hints | 1) The plaque says how visitors are allowed to move in this hall. 2) A knight moves two squares in a straight line, then one to the side. The door is two knight-moves away from a square you can reach. 3) Hop to d2, then b3, then the door on d4. |
| Completion text | Three L-shaped hops and out. You moved like a knight. I moved like a king: not at all. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The hall only allowed knight moves — two squares then one to the side — so the door was three hops away, not one straight walk. |
| Ending consequences | None. |

## 180. Arise, Sir Player

| Field | Value |
|---|---|
| Stable ID | `arise-sir-player` |
| Objective | Get through the KNIGHTS ONLY door. |
| Intro dialogue | A knighting! Kneel on the cushion. And stay kneeling until I say "rise". I will never say "rise". Ha. You will kneel forever. Very loyal. |
| Player actions | hold, tap, read |
| Interactive objects | `card` (info), `count` (info), `armour` (info), `you` (hold), `door`, `bow` |
| Success path (automated) | hold `you` 2600 ms, tap `door` |
| Plausible wrong actions | Standing up before both shoulder taps cancels the ceremony (nope). The knights' door ignores non-knights (nope). Bowing to Bossworth instead topples you over (trap). |
| Par (3★) | 2 |
| Hints | 1) The ceremony card says when a knighting ends. It is not when Bossworth says so. 2) Press and hold yourself to kneel. Keep holding until the sword has tapped BOTH shoulders, then let go. 3) Hold until the counter shows 2 of 2 taps, release to rise, then tap the KNIGHTS ONLY door. |
| Completion text | Arise, Sir Player! You rose without my permission. That is the most knightly thing I have ever seen. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The ceremony card, not Bossworth, said when to rise: kneel through both shoulder taps, then stand up a knight. |
| Ending consequences | None. |

## 181. Breadstick Bars

| Field | Value |
|---|---|
| Stable ID | `breadstick-bars` |
| Objective | Escape the dungeon. |
| Intro dialogue | Welcome to my dungeon! Those bars are solid iron, every one of them. Sit tight until the guard comes back. Spring, I think. Possibly a later spring. |
| Player actions | tap, read, count |
| Interactive objects | `sign` (info), `jar1` (info), `jar2` (info), `jar3` (info), `bar1`, `bar2`, `bar3`, `bar4`, `bar5`, `bar6`, `squeeze`, `guard` (info), `bell` |
| Success path (automated) | tap `bar2`, tap `bar3`, tap `squeeze` |
| Plausible wrong actions | Biting an iron bar hurts (trap). Calling the guard does nothing — he is away until spring (nope). |
| Par (3★) | 3 |
| Hints | 1) Look closely at the bars. Are they really all the same? 2) Some bars are knobbly, seeded and leaving crumbs. This dungeon is a pantry. You need a gap two bars wide. 3) Eat bar 2 and bar 3 (the neighbouring breadsticks), then squeeze through the gap. |
| Completion text | You ate your way out of my dungeon. It was a pantry. I knew it was a pantry. Everyone knew. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The "dungeon" was the pantry: half the bars were giant breadsticks, and eating two side by side made a gap wide enough to leave. |
| Ending consequences | None. |

## 182. Light the Oven

| Field | Value |
|---|---|
| Stable ID | `light-the-oven` |
| Objective | Light the royal oven for the feast. |
| Intro dialogue | The royal oven is stone cold and the matches are soggy. Whatever you do, do NOT pepper the baby dragon. It sneezes fire. Terrible habit. Disgusting. |
| Player actions | tap, sequence |
| Interactive objects | `warn` (info), `portrait` (info), `ftag` (info), `cake` (info), `dragon`, `oven`, `pepper`, `matches` |
| Success path (automated) | tap `oven`, tap `dragon`, tap `pepper` |
| Plausible wrong actions | Peppering the dragon while it faces the cake burns the cake (trap). The matches are soggy (nope). |
| Par (3★) | 3 |
| Hints | 1) The dragon's warning sign tells you exactly what a sneeze does. 2) A fire-sneeze goes wherever the dragon is facing. Make sure it is facing an OPEN oven. 3) Open the oven door, tap the dragon to turn it towards the oven, then use the pepper mill. |
| Completion text | Oven lit by dragon sneeze. The bread will taste faintly of adventure. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `singed-portrait` Singed Eyebrows — path: tap `dragon`, tap `pepper` |
| The trick (shown after solving) | The "do not" was the answer: a peppered dragon sneezes fire, so aiming it into the open oven lit it where soggy matches could not. |
| Ending consequences | None. |

## 183. Pancake Stack

| Field | Value |
|---|---|
| Stable ID | `pancake-stack` |
| Objective | Stack the pancakes by the royal breakfast rule. |
| Intro dialogue | Royal pancakes go BIGGEST on top, so everyone can see how big they are. Forget the spatula — just rearrange them with your fingers. Quick, I am peckish. |
| Player actions | tap, logic, sequence |
| Interactive objects | `rule` (info), `tip` (info), `flips` (info), `p4`, `p1`, `p3`, `p2`, `fingers` |
| Success path (automated) | tap `p2`, tap `p3`, tap `p1` |
| Plausible wrong actions | Grabbing hot pancakes with your fingers is a trap. Flipping only the top pancake changes nothing (nope). |
| Par (3★) | 3 |
| Hints | 1) The breakfast rule card beats Bossworth: smallest on top. And the spatula flips a whole chunk of the stack at once. 2) Get the biggest pancake to the bottom first: flip it to the top, then flip the whole stack. Then do the same for the next size. 3) Slide the spatula under pancake 2, then under pancake 3, then under pancake 1. |
| Completion text | Smallest on top, biggest at the bottom. A tidy little tower. I ate it in one bite. It was perfect. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A spatula flips everything above it, so you flipped each biggest-left pancake to the top and then down into place: three flips sorted the stack. |
| Ending consequences | None. |

## 184. Eight Slices

| Field | Value |
|---|---|
| Stable ID | `eight-slices` |
| Objective | Cut the cake into 8 pieces with 3 straight cuts. |
| Intro dialogue | Eight guests, one cake, three cuts — the knife is blunt. Cut from above, like a normal king. Straight down, three times. Sides are for peasants. |
| Player actions | tap, logic |
| Interactive objects | `sign` (info), `count` (info), `cake` (info), `cutv`, `cuth` |
| Success path (automated) | tap `cutv`, tap `cutv`, tap `cuth` |
| Alternative `side-first` | tap `cuth`, tap `cutv`, tap `cutv` |
| Plausible wrong actions | Three cuts from above only make 6 slices (trap). The cake can only be split through the jam layer once (nope). |
| Par (3★) | 3 |
| Hints | 1) Look at the cake from the side as well as from above. It is tall, with a jam layer in the middle. 2) Two cuts from above make 4 wedges. One cut from the side, through the jam layer, would split every wedge in two. 3) Cut from above twice, then cut from the side once. |
| Completion text | Eight slices, three cuts, one smug player. I had my slice from the side. Like a peasant. It was delicious. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Two cuts from above make four wedges, and one cut from the side through the jam layer splits all four at once: eight slices from three cuts. |
| Ending consequences | None. |

## 185. Tiptoe

| Field | Value |
|---|---|
| Stable ID | `tiptoe` |
| Objective | Get past the napping dragon to the door. |
| Intro dialogue | Dragons are deep sleepers. Just stroll past it, nice and normal. Or blow that horn so it shuffles out of the way. Both brilliant ideas. Mine. |
| Player actions | hold, tap |
| Interactive objects | `sign` (info), `clomp` (info), `horn`, `steps` (info), `dragon` (info), `door` (info), `you` (info), `stroll`, `tiptoe` (hold) |
| Success path (automated) | hold `tiptoe` 1000 ms, hold `tiptoe` 1000 ms, hold `tiptoe` 1000 ms |
| Plausible wrong actions | Strolling clomps and wakes the dragon (trap). A rushed tiptoe (letting go too fast) does not move you (nope). |
| Par (3★) | 3 |
| Hints | 1) The sign says what wakes this dragon. A stroll is very clompy. 2) Tiptoeing is slow: press and hold TIPTOE for about a second to take one quiet step. 3) Hold TIPTOE for a second, three times, to reach the door. |
| Completion text | Past the dragon without a single clomp. It smiled in its sleep. Dragons love good manners. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `throne-napper` Throne Napper — path: tap `horn` |
| The trick (shown after solving) | The sign said the dragon wakes at any clomp, so slow press-and-hold tiptoes got you past where a quick stroll could not. |
| Ending consequences | None. |

## 186. Bedtime Story

| Field | Value |
|---|---|
| Stable ID | `bedtime-story` |
| Objective | Get the dragon off the doorway. |
| Intro dialogue | This dragon will not budge. Read it something EXCITING — Sword Fight! — and it will leap up and leave. Do NOT touch my autobiography. Far too thrilling for a dragon. |
| Player actions | tap, read, choice |
| Interactive objects | `card` (info), `door` (info), `dragon` (info), `sword`, `slay`, `sheep`, `memoir` |
| Success path (automated) | tap `memoir`, tap `door` |
| Plausible wrong actions | Reading "How to Slay Dragons" to a dragon offends it (trap). The sword fight book gets it excited; the sheep book is too short (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the dragon's care card. Does it want excitement, or a nap? 2) Exciting stories keep it awake. You need the most boring book on the shelf — and a long one. 3) Read it Bossworth's autobiography, then go through the door once it is asleep. |
| Completion text | Asleep by page three of my life story. Page THREE. That is where I discover hats. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The care card said exciting stories keep the dragon awake, so the most boring book in the kingdom — Bossworth's 40-volume memoir — sent it to sleep. |
| Ending consequences | None. |

## 187. Riddle Me Nothing

| Field | Value |
|---|---|
| Stable ID | `riddle-me-nothing` |
| Objective | Answer the statue's riddle. |
| Intro dialogue | A riddling statue! Child's play. I have already filled in the answer for you: GOLD. Just press ANSWER and bask in my genius. |
| Player actions | tap, read, logic |
| Interactive objects | `riddle` (info), `statue` (info), `slot`, `ans`, `gold`, `crown`, `bread`, `boss` |
| Success path (automated) | tap `slot`, tap `ans` |
| Plausible wrong actions | GOLD, A CROWN or BREAD are wrong answers and the floor tips you back (trap). BOSSWORTH makes the statue laugh, but it is still wrong (nope). |
| Par (3★) | 2 |
| Hints | 1) Test each word against all three lines of the riddle. Do the poor have gold? Would eating bread starve you? 2) None of the tiles fits. The answer is "nothing", and there is a way to answer nothing. 3) Tap the answer slot to empty it, then press ANSWER with nothing in it. |
| Completion text | You answered nothing and it was right. I have been answering nothing my whole life and nobody ever opened a door. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The riddle's answer was "nothing", so the third option was to empty the slot and submit nothing at all. |
| Ending consequences | None. |

## 188. Knock Knock

| Field | Value |
|---|---|
| Stable ID | `knock-knock` |
| Objective | Get through the enchanted door. |
| Intro dialogue | A talking door. Ugh. It thinks it is hilarious. Do not encourage it. Just knock until it gives up. Knock, knock, KNOCK! |
| Player actions | tap, sequence, choice |
| Interactive objects | `speech` (info), `door`, `kick`, `knock`, `who`, `open` |
| Success path (automated) | tap `who`, tap `ajarwho`, tap `door` |
| Plausible wrong actions | Knocking only annoys the door — that is its line (nope). Off-script replies make it start the joke again (nope). Kicking the door gets you bounced back (trap). |
| Par (3★) | 3 |
| Hints | 1) Read what the door just said. Whose line is "Knock knock" normally? 2) It is telling you a knock-knock joke. Play your part. 3) Answer "Who's there?", then "Ajar who?", then walk through the door. |
| Completion text | The door is still giggling. You played along with a door. I would never. (I would. I love that joke.) |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The door was telling a knock-knock joke, so the way through was to say your lines — and its punchline left it ajar. |
| Ending consequences | None. |

## 189. The Hourglass

| Field | Value |
|---|---|
| Stable ID | `the-hourglass` |
| Objective | Get through the wizard's sealed door. |
| Intro dialogue | The wizard's door stays sealed until the hourglass runs out. About an hour. Do NOT touch the hourglass — you will only reset it. Sit. Wait. Suffer. |
| Player actions | tap, wait, logic |
| Interactive objects | `plaque` (info), `sand` (info), `hammer`, `owl` (info), `glass`, `door` |
| Success path (automated) | tap `glass`, wait 3500 ms, tap `door` |
| Alternative `patient` | wait 58000 ms, tap `door` |
| Plausible wrong actions | The door will not open while sand is still running (nope). |
| Par (3★) | 2 |
| Hints | 1) Compare how much sand is in the top bulb with how much is in the bottom. 2) Turning an hourglass over swaps the bulbs. The little bit at the bottom would end up on top. 3) Flip the hourglass, wait three seconds for the top to empty, then open the door. |
| Completion text | Three seconds instead of an hour. Well, a minute. I may have exaggerated the hour. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `sand-everywhere` Sand Everywhere — path: tap `hammer` |
| The trick (shown after solving) | Flipping the hourglass swapped the bulbs, so the three seconds of sand at the bottom became the top and ran out almost at once. |
| Ending consequences | None. |

## 190. Invisible Ink

| Field | Value |
|---|---|
| Stable ID | `invisible-ink` |
| Objective | Find the wizard's spare key and unlock the door. |
| Intro dialogue | That note is blank. Bin it. The spare key is in the cauldron, obviously — wizards keep everything in the cauldron. Roll up your sleeve. |
| Player actions | drag, tap, read |
| Interactive objects | `ink` (info), `msg` (info), `owl` (info), `note` (drag), `pot` (info), `candle` (drop zone) (free), `cauldron`, `door`, `bin` (drop zone) (free), `lboot`, `rboot`, `pocket` (info) |
| Success path (automated) | drag `note` → `candle`, tap `lboot`, tap `door` |
| Plausible wrong actions | Reaching into the cauldron is a trap. The enchanted bin spits the note back out (nope). The right boot only holds an old sock (nope). |
| Par (3★) | 3 |
| Hints | 1) Look at what the wizard writes his notes with. 2) Lemon-juice writing is invisible until it is warmed. There is a lit candle on the desk. 3) Drag the note onto the candle, read it, take the key from the left boot, then open the door. |
| Completion text | Unlocked with a key from a boot, found with a note written in lemon. Wizards are disgusting. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The ink pot said lemon juice, and lemon-juice writing appears when it is warmed, so holding the "blank" note to the candle revealed where the key was. |
| Ending consequences | None. |

## 191. Reverso

| Field | Value |
|---|---|
| Stable ID | `reverso` |
| Objective | Unlock the wizard's study door. |
| Intro dialogue | Wizard etiquette: before ANY spell, pat the owl and stir the cauldron. Then cast whatever you like. Manners first, magic second. |
| Player actions | tap, read, sequence |
| Interactive objects | `board` (info), `spell` (info), `owl`, `book` (info), `cauldron`, `door`, `cast` |
| Success path (automated) | tap `cast`, tap `door` |
| Plausible wrong actions | Casting REVERSO after patting, stirring or rattling undoes that instead and wastes the spell (trap). The door is locked until the lock is undone (nope). |
| Par (3★) | 2 |
| Hints | 1) Read exactly what REVERSO undoes, then read the board. 2) REVERSO undoes the LAST thing that happened. Every time you touch something, the board changes. 3) Cast REVERSO first, while the board still says Bossworth locked the door, then walk through. |
| Completion text | You undid me. Specifically, the thing I did. Same feeling. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | REVERSO undoes only the last thing that happened, so it had to be cast first, while Bossworth locking the door was still the last thing. |
| Ending consequences | None. |

## 192. Happily Ever After

| Field | Value |
|---|---|
| Stable ID | `happily-ever-after` |
| Objective | Find the way out of the fairy tale. |
| Intro dialogue | Guard that candle with your LIFE! In fact, light more candles — make my kingdom bigger! And whatever you do, do not read the plaque. |
| Player actions | hold, tap, read |
| Interactive objects | `plaque` (info), `count` (info), `candle` (hold), `castle`, `more` |
| Success path (automated) | hold `candle` 1500 ms, tap `exit` |
| Plausible wrong actions | Lighting more candles only makes the kingdom bigger (nope). A quick puff just makes the flame flicker (nope). The castle door leads back round to the moat (trap). |
| Par (3★) | 2 |
| Hints | 1) Read the plaque Bossworth told you not to read. 2) The whole kingdom lasts only while that one candle burns. Candles go out if you blow on them — slowly and steadily. 3) Press and hold the candle to blow it out, then use the EXIT door that appears. |
| Completion text | The end. I was a king for a whole chapter. It was the best chapter. Do not tell me otherwise. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The plaque said the pretend kingdom lasted only while the candle burned, so blowing it out ended the fairy tale and revealed the real exit. |
| Ending consequences | None. |

## 193. Sonar Silence

| Field | Value |
|---|---|
| Stable ID | `sonar-silence` |
| Objective | Steer the submarine out of the murk. |
| Intro dialogue | Captain Bossworth here, of the very small submarine. Can't see a thing. Ping the sonar and steer for the LOUDEST echo. Loud means friendly! |
| Player actions | tap, wait, observe |
| Interactive objects | `card` (info), `scope` (info), `periscope`, `log` (info), `ping-left`, `go-left`, `ping-ahead`, `go-ahead`, `ping-right`, `go-right` |
| Success path (automated) | tap `ping-left`, tap `ping-ahead`, tap `ping-right`, wait 3000 ms, tap `go-right` |
| Plausible wrong actions | Steering towards a PONG drives you into a rock (trap). The periscope only shows murk (nope). |
| Par (3★) | 4 |
| Hints | 1) An echo has to bounce off something. 2) The card says a PONG means something solid is there. What would open water send back? 3) Ping all three ways. Steer towards the one that sends back no echo at all (right). |
| Completion text | Out of the murk. By listening to nothing. Very zen. Very annoying. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | An echo needs something solid to bounce off, so the direction that stayed silent was the open water. |
| Ending consequences | None. |

## 194. Blow the Tanks

| Field | Value |
|---|---|
| Stable ID | `blow-the-tanks` |
| Objective | Surface and open the hatch. |
| Intro dialogue | To go UP, we FLOOD the tanks. Water is heavy, so it pushes us up. Basic science. Then pop the hatch for some fresh air. |
| Player actions | tap, wait |
| Interactive objects | `surface` (info), `sub` (info), `legend` (info), `depth` (info), `tanks` (info), `flood`, `blow`, `hatch`, `emergency` |
| Success path (automated) | tap `blow`, wait 2200 ms, tap `hatch` |
| Alternative `sink-first` | tap `flood`, wait 1500 ms, tap `blow`, wait 3000 ms, tap `hatch` |
| Plausible wrong actions | Opening the hatch underwater floods the sub (trap). Flooding the tanks sinks you to the seabed (nope). The emergency blow launches the sub into the air (ruin). |
| Par (3★) | 2 |
| Hints | 1) Read the legend on the control panel, not the captain. 2) Air in the tanks makes the sub rise. Water makes it sink. 3) Tap BLOW, wait until the depth says 0 m, then open the hatch. |
| Completion text | Fresh air. Smells of fish. My favourite. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `flying-submarine` Flying Submarine — path: tap `emergency` |
| The trick (shown after solving) | Air is lighter than water, so blowing air into the tanks lifted the sub; flooding them only sank it. |
| Ending consequences | None. |

## 195. Red Right Returning

| Field | Value |
|---|---|
| Stable ID | `red-right-returning` |
| Objective | Sail up the channel into harbour. |
| Intro dialogue | Three buoys to pass. Red means DANGER, so keep the red ones on your LEFT, far from me. Green means GO, so keep green on your right. Obviously. |
| Player actions | tap, sequence, read |
| Interactive objects | `rule` (info), `buoy1` (info), `l1`, `r1`, `buoy2` (info), `l2`, `r2`, `buoy3` (info), `l3`, `r3`, `sub` (info) |
| Success path (automated) | tap `l1`, tap `r2`, tap `l3` |
| Plausible wrong actions | Passing a buoy on the wrong side runs you aground (trap). Buoys must be passed in order, nearest first (nope). |
| Par (3★) | 3 |
| Hints | 1) The harbour sign has its own opinion about red and green. 2) Coming in, red cans go on your RIGHT. To keep a buoy on your right, you pass on its left side. 3) Pass buoy 1 on the left (◀), buoy 2 on the right (▶), buoy 3 on the left (◀). |
| Completion text | Into harbour without scraping a single barnacle. Mine, I mean. I have barnacles. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The harbour rule was "red right returning": coming in, every red can belongs on your right, so you passed to the left of it. |
| Ending consequences | None. |

## 196. One Long Blast

| Field | Value |
|---|---|
| Stable ID | `one-long-blast` |
| Objective | Signal that you are leaving the berth. |
| Intro dialogue | Time to leave port! Say goodbye with three cheery toots on the horn. Toot, toot, TOOT! Short and sweet, like me. |
| Player actions | hold, read |
| Interactive objects | `board` (info), `pier` (info), `sub` (info), `meter` (info), `bell`, `horn` (hold) |
| Success path (automated) | hold `horn` 4200 ms |
| Plausible wrong actions | Three short toots tell the harbour you are reversing (trap). A medium blast means nothing to anyone. The ship's bell is for telling the time (nope). |
| Par (3★) | 1 |
| Hints | 1) Harbours have rules about horns. There is a board. 2) Three short blasts means something else entirely. Leaving needs one long one. 3) Press and hold the horn button for at least 4 seconds. |
| Completion text | One long blast. The harbour waves. A seagull salutes. I hate that seagull. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | In harbour, three short blasts mean "I am going backwards"; the board said leaving the berth takes one long blast. |
| Ending consequences | None. |

## 197. Flash Count

| Field | Value |
|---|---|
| Stable ID | `flash-count` |
| Objective | Tell the harbour which lighthouse you can see. |
| Intro dialogue | Ah, a lighthouse! That's Home Point, I'd know it anywhere. Radio the harbour and say "Home Point" so they can guide us in. |
| Player actions | wait, observe, count, tap |
| Interactive objects | `chart` (info), `light`, `sub` (info), `ask` (info), `gull`, `home`, `shark` |
| Success path (automated) | wait 9500 ms, tap `shark` |
| Plausible wrong actions | Saying Home Point sends you towards Shark Reef (trap). Saying Gull Rock is just as wrong (trap). The lighthouse is miles away; tapping it does nothing (nope). |
| Par (3★) | 1 |
| Hints | 1) Every lighthouse on the chart flashes a different number of times. 2) Watch one whole group of flashes before the dark gap, and count. 3) It flashes four times, then goes dark: that is Shark Reef. |
| Completion text | Shark Reef. Well spotted. I was squinting at a different lighthouse. In my head. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Lighthouses are told apart by their flash pattern; counting four flashes before the dark gap matched Shark Reef on the chart. |
| Ending consequences | None. |

## 198. Ship in a Bottle

| Field | Value |
|---|---|
| Stable ID | `ship-in-a-bottle` |
| Objective | Get the model ship into the bottle, masts up. |
| Intro dialogue | The keeper wants his ship in that bottle. Just squash it in. Ships are bendy. Push hard and think tall thoughts. |
| Player actions | tap, drag, sequence |
| Interactive objects | `sign` (info), `bottle` (drop zone), `ship` (drag), `fold`, `string`, `hammer` |
| Success path (automated) | tap `fold`, drag `ship` → `bottle`, tap `string` |
| Plausible wrong actions | Pushing the ship in with its masts up snaps them (trap). Pulling the string outside the bottle just stands the masts up again (nope). The hammer gives you a ship next to a bottle (ruin). |
| Par (3★) | 3 |
| Hints | 1) The neck of the bottle is narrow. The masts are not. 2) The masts fold down, and the string can pull them back up later. 3) Tap Fold masts, drag the ship into the bottle, then tap Pull the string. |
| Completion text | A ship. In a bottle. Masts up. The keeper weeps with joy. So do I, quietly, from envy. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `ship-beside-a-bottle` Ship Beside a Bottle — path: tap `hammer` |
| The trick (shown after solving) | The masts were hinged: folded flat they slid through the neck, and the string stood them back up inside. |
| Ending consequences | None. |

## 199. Lifebuoy Lob

| Field | Value |
|---|---|
| Stable ID | `lifebuoy-lob` |
| Objective | Get the lifebuoy to Bossworth. |
| Intro dialogue | *glub* I slipped off the lighthouse steps! Throw the ring RIGHT AT ME. Aim for my face! I am a superb catcher. *glub* |
| Player actions | drag, observe |
| Interactive objects | `tip` (info), `lh` (info), `current` (info), `jetty` (info), `up` (drop zone), `him` (drop zone), `down` (drop zone), `ring` (drag) |
| Success path (automated) | drag `ring` → `up` |
| Plausible wrong actions | Throwing it at his head bonks him (trap). Throwing it downstream lets it float away (nope). Poking him does not help (nope). |
| Par (3★) | 1 |
| Hints | 1) Look which way the water is moving. 2) Whatever you throw will drift with the current, to the right. 3) Drag the lifebuoy into the water just to the LEFT of Bossworth (upstream). |
| Completion text | Rescued. Damp. Dignified. Two out of three. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The current carries everything to the right, so a ring thrown upstream of him drifted straight into his arms. |
| Ending consequences | None. |

## 200. Keeper's Ferry

| Field | Value |
|---|---|
| Stable ID | `keepers-ferry` |
| Objective | Row the seal, fish and worms to the island, all uneaten. |
| Intro dialogue | Ferry the seal, the fish and the worms over to the lighthouse. Take the seal first. He's the heaviest, so get the hard bit done! |
| Player actions | tap, logic, sequence |
| Interactive objects | `rule` (info), `bankL` (info), `bankR` (info), `boat` (info), `keeper` (info), `seal`, `fish`, `worms`, `row` |
| Success path (automated) | tap `fish`, tap `row`, tap `row`, tap `seal`, tap `row`, tap `fish`, tap `row`, tap `worms`, tap `row`, tap `row`, tap `fish`, tap `row` |
| Alternative `worms-second` | tap `fish`, tap `row`, tap `row`, tap `worms`, tap `row`, tap `fish`, tap `row`, tap `seal`, tap `row`, tap `row`, tap `fish`, tap `row` |
| Plausible wrong actions | Leaving the seal with the fish, or the fish with the worms, gets someone eaten (trap). The boat only fits you and one passenger (nope). |
| Par (3★) | 12 |
| Hints | 1) Only one of the three is both hungry and food. Who is in the middle of the menu? 2) Take the fish first. Later you may have to bring something back. 3) Fish over, row back, seal over, bring the fish back, worms over, row back, fish over. |
| Completion text | Everyone on the island, nobody eaten. The seal is sulking. Seals always sulk. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The fish was both hungry and food, so it went first and came back once, and nothing was ever left alone with its dinner. |
| Ending consequences | None. |

## 201. Going Once

| Field | Value |
|---|---|
| Stable ID | `going-once` |
| Objective | Win the prize kipper at the auction. |
| Intro dialogue | The prize kipper! Only 90 coins! BID NOW, before someone else grabs it. Quick, quick, the crowd is ruthless! |
| Player actions | wait, read, tap |
| Interactive objects | `rules` (info), `price` (info), `purse` (info), `kipper` (info), `seal`, `subsign` (info), `sell`, `bid` |
| Success path (automated) | wait 8500 ms, tap `bid` |
| Alternative `very-patient` | wait 30000 ms, tap `bid` |
| Plausible wrong actions | Bidding more than you have leaves you unable to pay (trap). The sleeping seal is not bidding (nope). Selling the submarine to pay for a kipper (ruin). |
| Par (3★) | 1 |
| Hints | 1) Read how this auction works. Which way does the price go? 2) The price only goes down, and the only other bidder is fast asleep. Check your purse. 3) Wait until the price drops to 10 (you have 15), then bid. |
| Completion text | Ten coins for a prize kipper. I'd have paid ninety. That's why I'm not allowed a purse. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `sold-the-sub` Sold the Sub — path: tap `sell`, tap `bid` |
| The trick (shown after solving) | In a Dutch auction the price only falls, and nobody else was bidding, so waiting brought it down to a price you could pay. |
| Ending consequences | None. |

## 202. Weigh Anchor

| Field | Value |
|---|---|
| Stable ID | `weigh-anchor` |
| Objective | Carry out the skipper's three orders. |
| Intro dialogue | The skipper speaks sailor. I'm fluent! I'll translate, you obey. First order: WEIGH ANCHOR. Carry it to the fish scales and weigh it! |
| Player actions | tap, read |
| Interactive objects | `glossary` (info), `trawler` (info), `anchor` (info), `order` (info), `opt0`, `opt1`, `opt2` |
| Success path (automated) | tap `opt1`, tap `opt0`, tap `opt2` |
| Plausible wrong actions | Bossworth's literal translation of each order goes badly (trap). The other wrong option does nothing useful (nope). |
| Par (3★) | 3 |
| Hints | 1) There is a glossary on the harbour wall. Bossworth hasn't read it. 2) Sailor talk doesn't mean what it sounds like. Look each order up. 3) Pull it up, then Tie it tight, then Mop it. |
| Completion text | Anchor up, rope tight, deck mopped. The skipper says I'm a "landlubber". I'm taking it as a title. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Sailor talk isn't literal: the glossary said "weigh anchor" means pull it up, "make fast" means tie it, and "swab" means mop. |
| Ending consequences | None. |

## 203. Short Changed

| Field | Value |
|---|---|
| Stable ID | `short-changed` |
| Objective | Make sure you get the right change. |
| Intro dialogue | One, two, three, four! Four bits of change, and he owes you four. Perfect. Say thank you and let's go before the cod gets cold. Colder. |
| Player actions | count, read, tap |
| Interactive objects | `receipt` (info), `sign` (info), `cod` (info), `c0` (free), `c1` (free), `c2` (free), `c3` (free), `thanks`, `one`, `four` |
| Success path (automated) | tap `one` |
| Plausible wrong actions | Saying thanks leaves you a coin short (trap). Asking for 4 more is just greedy (nope). |
| Par (3★) | 1 |
| Hints | 1) Count the value, not the number of round things. 2) Three of them are coins worth 1. One has a crinkly edge and no number. 3) You are owed 4 and got 3 coins (plus a bottle cap): ask for 1 more. |
| Completion text | Full change. And a bottle cap. Keep the cap, it's the start of a collection. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Four round things isn't four coins: one was a bottle cap, so the change was only 3 and you were owed 1 more. |
| Ending consequences | None. |

## 204. Packed Like Sardines

| Field | Value |
|---|---|
| Stable ID | `packed-like-sardines` |
| Objective | Get the lid on the sardine tin. |
| Intro dialogue | Sardines go in all facing the same way, like a marching band. Very smart. Then close the lid, and if it sticks, squash harder! |
| Player actions | tap, observe, logic |
| Interactive objects | `sign` (info), `label` (info), `tin` (info), `f1`, `f2`, `f3`, `f4`, `squash`, `close` |
| Success path (automated) | tap `f2`, tap `f4`, tap `close` |
| Alternative `odd-ones` | tap `f1`, tap `f3`, tap `close` |
| Plausible wrong actions | Closing the lid with two heads side by side pops it off (trap). Squashing harder only bends the lid (nope). |
| Par (3★) | 3 |
| Hints | 1) The tin has a label. It's a picture of how they go in. 2) Fat heads side by side take up too much room. Heads and tails take turns on the label. 3) Flip sardines 2 and 4 so they go head, tail, head, tail. Then close the lid. |
| Completion text | Lid on, first try. Head, tail, head, tail. The sardines look smug about it. They've done this before. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A sardine's head is wider than its tail, so packing them head to tail, like the picture on the label, made them fit. |
| Ending consequences | None. |

## 205. Thumbs Up

| Field | Value |
|---|---|
| Stable ID | `thumbs-up` |
| Objective | Answer your dive buddy so the reef dive carries on. |
| Intro dialogue | Your dive buddy wants to know if you're all right. Give him a big THUMBS UP. Universal sign for "everything is great". Everyone knows that. |
| Player actions | tap, read, wait |
| Interactive objects | `slate` (info), `buddy` (info), `jelly` (info), `opt0`, `opt1`, `opt2` |
| Success path (automated) | tap `opt1`, tap `opt0`, wait 2600 ms |
| Plausible wrong actions | A thumbs up ends the dive (trap). Swimming over when he signals STOP meets a jellyfish (trap). A flat hand back just confuses him (nope). |
| Par (3★) | 2 |
| Hints | 1) Divers have their own hand signals. Your slate lists them. 2) Underwater, a thumb up means "let's go up". The ring means "I'm OK". A flat hand means "stop". 3) Answer with the OK ring. When he shows a flat hand, stay put. |
| Completion text | Still diving, unstung, and fluent in hands. I mostly speak in jazz hands. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Underwater a thumb up means "go up", so the slate's OK ring kept the dive going, and the flat hand meant stop, not hello. |
| Ending consequences | None. |

## 206. Shell Game

| Field | Value |
|---|---|
| Stable ID | `shell-game` |
| Objective | Find Octo's pearl. |
| Intro dialogue | Follow the pearl! I watched every move: it's under the MIDDLE shell. Definitely the middle. Pick it and win! Octopuses can't cheat. They don't have… hands. |
| Player actions | tap, observe |
| Interactive objects | `sign`, `octo` (info), `arm`, `shell0`, `shell1`, `shell2`, `tickle` |
| Success path (automated) | tap `arm` |
| Plausible wrong actions | Every shell is empty (trap: Octo wins). The sign is just a sign (nope). Tickling Octo inks the whole reef (ruin). |
| Par (3★) | 1 |
| Hints | 1) Count Octo's arms. Are they all on the table? 2) One arm is curled up beside him, holding something round and white. 3) Tap the curled-up tentacle instead of any shell. |
| Completion text | Caught red-tentacled. Octo hands over the pearl and pretends it was a magic trick. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `inked-captain` Inked Captain — path: tap `tickle` |
| The trick (shown after solving) | The pearl was never under a shell: Octo's eighth arm was curled round it, so the third option was to check the arm. |
| Ending consequences | None. |

## 207. Tidy Tentacles

| Field | Value |
|---|---|
| Stable ID | `tidy-tentacles` |
| Objective | Get the key into chest 2. |
| Intro dialogue | Simple job: put the key in chest 2, and the gate opens. Ignore the octopus. He's decorative. He just likes things… tidy. |
| Player actions | drag, logic, read |
| Interactive objects | `log` (info), `gate` (info), `octo` (info), `key` (drag), `chest1` (drop zone), `chest2` (drop zone), `chest3` (drop zone), `chest4` (drop zone) |
| Success path (automated) | drag `key` → `chest3` |
| Plausible wrong actions | Putting the key in chest 2 gets it tidied into chest 3 (trap). Chests 1 and 4 get it tidied to the other end (nope). |
| Par (3★) | 1 |
| Hints | 1) Octo moves anything you put down. His log shows where things end up. 2) Look at the numbers in the log: 1 went to 4, 2 to 3, 4 to 1. He swaps them end for end. 3) Drop the key in chest 3. Octo will tidy it into chest 2. |
| Completion text | Key in chest 2, gate open, octopus satisfied. Everything in its wrong place, which is its right place. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Octo's log showed he always swaps chests end for end, so the key had to go into chest 3 to be tidied into chest 2. |
| Ending consequences | None. |

## 208. Moving House

| Field | Value |
|---|---|
| Stable ID | `moving-house` |
| Objective | Get every hermit crab a shell that fits. |
| Intro dialogue | A lovely new shell! Give it to little Size 1, the poor thing has no home at all. Aww. Then everyone's happy. Probably. I didn't check. |
| Player actions | drag, logic, sequence |
| Interactive objects | `rule` (info), `shell` (drag), `crab1` (drop zone), `crab2` (drop zone), `crab3` (drop zone), `crab4` (drop zone) |
| Success path (automated) | drag `shell` → `crab4`, drag `shell` → `crab3`, drag `shell` → `crab2`, drag `shell` → `crab1` |
| Plausible wrong actions | A shell that is too big or too small won't be taken (nope). |
| Par (3★) | 4 |
| Hints | 1) A crab will only move into a shell that is exactly its size. 2) The new shell is size 4. Who is size 4? And what does that crab leave behind? 3) New shell to crab 4, then each freed shell to the next crab down: 3, 2, 1. |
| Completion text | Four crabs, four shells, zero squeezing. A whole street moved house in one afternoon. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Each crab only fits its own size, so the new shell went to the biggest crab and every freed shell moved one crab down the line. |
| Ending consequences | None. |

## 209. Five Bells

| Field | Value |
|---|---|
| Stable ID | `five-bells` |
| Objective | Ring the right time on the ship's bell. |
| Intro dialogue | The hold opens if you ring the time on the bell. The clock says half past two, so ring it two and a half times. Ding, ding, di—. Easy. |
| Player actions | tap, count, read |
| Interactive objects | `deck` (info), `plaque` (info), `table` (info), `clock` (info), `bell`, `count` (info), `done`, `reset` (free) |
| Success path (automated) | tap `bell`, tap `bell`, tap `bell`, tap `bell`, tap `bell`, tap `done` |
| Plausible wrong actions | Ringing any number but 5 keeps the hold shut (trap). Tapping Done before ringing at all (nope). |
| Par (3★) | 6 |
| Hints | 1) Ships don't ring the hour like a church does. Read the bell table. 2) One bell for every half hour since the watch began at 12:00. 3) 12:30 is 1, 1:00 is 2, 1:30 is 3, 2:00 is 4, 2:30 is 5. Ring 5 times, then tap Done. |
| Completion text | Five bells. The hold creaks open. A crab inside checks its watch and nods. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Ship's bells count half hours of the watch, not hours, so half past two was five bells. |
| Ending consequences | None. |

## 210. Follow the Light

| Field | Value |
|---|---|
| Stable ID | `follow-the-light` |
| Objective | Swim to the hatch beacon. |
| Intro dialogue | Pitch black down here. But look, a friendly light is swimming over to say hello! That big one, light A. Follow it! Lights are always friendly. |
| Player actions | wait, observe, tap |
| Interactive objects | `note` (info), `lightA` (info), `lightB` (info), `lightC` (info), `sub` (info), `goA`, `goB`, `goC` |
| Success path (automated) | wait 3000 ms, tap `goB` |
| Plausible wrong actions | Light A is an anglerfish's lure (trap). Light C is a drifting jellyfish (nope). |
| Par (3★) | 1 |
| Hints | 1) Read the pilot's note, then watch each light for a few seconds. 2) The beacon has to do two things: blink, and stay perfectly still. 3) A never blinks and bobs about. C blinks but drifts. Swim to B. |
| Completion text | The hatch beacon, right where it always is. Boring. Reliable. Like a good narrator. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A beacon is bolted down, so the only light that both blinked and never moved was the hatch; the bobbing one was a lure. |
| Ending consequences | None. |

## 211. Stir the Water

| Field | Value |
|---|---|
| Stable ID | `stir-the-water` |
| Objective | Find the wreck's hatch in the dark. |
| Intro dialogue | Shh. Keep absolutely still. Don't touch the propeller, don't stir a single drop. Something down here hates a fuss, and it is me. |
| Player actions | hold, read, tap |
| Interactive objects | `note` (info), `sub` (info), `hatch`, `clam`, `stir` (hold), `lights` |
| Success path (automated) | hold `stir` 1700 ms, tap `hatch` |
| Plausible wrong actions | The toothy shape is a giant clam (trap). Headlights only light up the murk (nope). A quick spin only makes a flicker. |
| Par (3★) | 2 |
| Hints | 1) The note on the dashboard says what makes the plankton glow. 2) Stirring the water lights it up. Your propeller stirs water. 3) Press and hold Spin propeller for a second and a half, then tap the round hatch, not the clam. |
| Completion text | Into the wreck by plankton-light. Very atmospheric. I'll pretend I planned the lighting. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The glow plankton only light up when stirred, so spinning the propeller (the one thing he banned) lit the hatch's outline. |
| Ending consequences | None. |

## 212. Thar She Blows

| Field | Value |
|---|---|
| Stable ID | `thar-she-blows` |
| Objective | Get the submarine out of the whale. |
| Intro dialogue | We have been eaten. By a whale. Embarrassing for a captain. Full ahead, out through the MOUTH, the way we came in. Mouths are exits. Ask any burp. |
| Player actions | tap, wait, observe |
| Interactive objects | `fact` (info), `status` (info), `blowhole` (info), `baleen` (info), `sub` (info), `mouth`, `blow`, `tickle` |
| Success path (automated) | tap `blow`, wait 8000 ms |
| Alternative `wait-first` | wait 9000 ms, tap `blow`, wait 8000 ms |
| Plausible wrong actions | The baleen in the mouth won't let the sub out (nope). Tickling the whale sneezes you onto the lighthouse (ruin). |
| Par (3★) | 1 |
| Hints | 1) Look at what's across the whale's mouth, then read the whale fact. 2) The baleen lets nothing big out. The blowhole opens when the whale reaches the surface. 3) Move under the blowhole and wait until the board says AT SURFACE. |
| Completion text | Out of a whale, on a spout of whale breath. I smell of fish. I've always smelled of fish. Now it's official. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `submarine-weathervane` Submarine Weathervane — path: tap `tickle` |
| The trick (shown after solving) | A whale's mouth is sealed by baleen, but it breathes out through its blowhole at the surface, so waiting under it got you blown out. |
| Ending consequences | None. |

## 213. Egg and Spoon

| Field | Value |
|---|---|
| Stable ID | `egg-and-spoon` |
| Objective | Carry the egg over the finish line on a spoon. |
| Intro dialogue | Sports day! I'm the referee, obviously. Egg and spoon race: use the official teaspoon. Lovely and shiny. The egg is a perfectly normal size. Don't look at it. |
| Player actions | drag, tap, observe |
| Interactive objects | `rules` (info), `flag` (info), `tea` (drop zone), `ladle` (drop zone), `fork` (drop zone), `crate` (info), `egg` (drag), `go`, `carry` (info), Bossworth (drop zone) |
| Success path (automated) | drag `egg` → `ladle`, tap `go` |
| Plausible wrong actions | An ostrich egg on a teaspoon falls off at the first step (trap). The fork is not a spoon: the egg drops straight through (nope). GO without the egg on a spoon does nothing (nope). |
| Par (3★) | 2 |
| Hints | 1) Have a good look at the size of that egg. And at where it came from. 2) The rule only says the egg must stay on a spoon. It never says which spoon. 3) Drag the egg onto the big soup ladle, then press GO. |
| Completion text | One egg, one ladle, one very sulky referee. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `egg-on-face` Egg on Face — path: drag `egg` → `narrator` |
| The trick (shown after solving) | It was an ostrich egg, and the rule only said "a spoon", so the deep soup ladle was the spoon that could carry it. |
| Ending consequences | None. |

## 214. Sack Race

| Field | Value |
|---|---|
| Stable ID | `sack-race` |
| Objective | Hop to the finish without falling over. |
| Intro dialogue | Sack race! BIG hops only. Small hops are for small people. And no climbing out of the sack: the referee is watching your feet. |
| Player actions | tap, count, sequence |
| Interactive objects | `rules` (info), `t0` (info), `t1` (info), `t2` (info), `t3` (info), `t4` (info), `t5` (info), `t6` (info), `t7` (info), `t8` (info), `you` (info), `small`, `big`, `run` |
| Success path (automated) | tap `small`, tap `big`, tap `big` |
| Alternative `four-hops` | tap `small`, tap `small`, tap `big`, tap `small` |
| Plausible wrong actions | Landing on tile 3 or 6 puts you in a puddle (trap). Climbing out of the sack is against the rules (nope). |
| Par (3★) | 3 |
| Hints | 1) Count where each hop lands before you jump. Puddles are on tiles 3 and 6. 2) A BIG hop from the start lands on tile 3. Start small. 3) Small hop (tile 2), BIG hop (tile 5), BIG hop (tile 8). |
| Completion text | Dry sack, dry feet, damp referee. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bossworth's "BIG hops only" landed on tile 3; mixing hop sizes was the only way to step over both puddles. |
| Ending consequences | None. |

## 215. Long Jump

| Field | Value |
|---|---|
| Stable ID | `long-jump` |
| Objective | Measure Bossworth's jump by the rules. |
| Intro dialogue | Long jump! I flew SIX AND A HALF metres. Plant the flag at my heels. Ignore the other marks. I sat down on purpose. For style. |
| Player actions | drag, read |
| Interactive objects | `rules` (info), `m1` (info), `m2` (info), `m3` (info), `m4` (info), `m5` (info), `m6` (info), `m7` (info), `pit` (info), `sand` (drop zone) (free), `hands` (drop zone), `seat` (drop zone), `heels` (drop zone), `peg` (drag), `you` (info), `boss` (info) |
| Success path (automated) | drag `peg` → `hands` |
| Plausible wrong actions | Measuring at the heels or the seat print gives Bossworth the win (trap). Empty sand is not a mark (nope). |
| Par (3★) | 1 |
| Hints | 1) Read the rule on the sign, then look at every mark Bossworth left in the sand. 2) He landed, then fell backwards. Which of his marks is nearest the board? 3) Drag the measuring flag onto the handprints at 4 metres. |
| Completion text | Four metres. Of which three were falling over. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A jump is measured to the mark nearest the board, and Bossworth fell back onto his hands at 4 metres. |
| Ending consequences | None. |

## 216. Relay Order

| Field | Value |
|---|---|
| Stable ID | `relay-order` |
| Objective | Put the relay team in the order the coach wrote. |
| Intro dialogue | Relay time! I run first, obviously: I'm the fastest thing in this field. After that, whoever. The coach left some notes. Coaches know nothing. |
| Player actions | tap, logic, sequence |
| Interactive objects | `notes` (info), `you`, `kevin`, `mimic`, `boss`, `clear` (free) |
| Success path (automated) | tap `kevin`, tap `mimic`, tap `boss`, tap `you` |
| Plausible wrong actions | Any order that breaks a coach's note drops the baton (trap). A runner who already has a leg can't take a second one (nope). |
| Par (3★) | 4 |
| Hints | 1) Only the coach's three notes matter. Start with the one that fixes a leg outright. 2) You are leg 4. Kevin and Mimic must be next to each other, Kevin first, and Bossworth can't be leg 1. 3) Tap Kevin, Mimic, Bossworth, then You. |
| Completion text | Baton passed four times, dropped zero times. Coach is thrilled. Bossworth isn't. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The notes left only one order: you last, Kevin then Mimic together, and Bossworth not first, so he ran third. |
| Ending consequences | None. |

## 217. Heads I Win

| Field | Value |
|---|---|
| Stable ID | `heads-i-win` |
| Objective | Win the coin toss for kick-off. |
| Intro dialogue | As referee I'll run the coin toss. Totally fair: heads I win, tails you lose. Call it! Heads or tails? Go on. Any time. |
| Player actions | tap, wordplay, choice |
| Interactive objects | `deal` (info), `plaque` (info), `ref` (info), `coin` (free), `o-heads`, `o-tails`, `o-look`, `o-deal` |
| Success path (automated) | tap `o-deal` |
| Plausible wrong actions | Calling heads or tails loses either way (trap). The coin itself is perfectly normal (nope). |
| Par (3★) | 1 |
| Hints | 1) Say his deal out loud slowly. What happens to you on heads? On tails? 2) The coin is fine. The deal is the trick, and the plaque says the caller says the deal. 3) Be the caller: say "Heads I win, tails you lose" yourself. |
| Completion text | Heads you won. Tails he lost. Same thing. Lovely. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | "Heads I win, tails you lose" wins for whoever says it, so you said it first. |
| Ending consequences | None. |

## 218. Whistle Blower

| Field | Value |
|---|---|
| Stable ID | `whistle-blower` |
| Objective | End the match while you're winning. |
| Intro dialogue | Three-nil to you?! Then we play on until it isn't. I'm the referee, I decide. And don't touch my whistle: only the REFEREE may blow it. |
| Player actions | tap, read |
| Interactive objects | `score` (info), `time` (info), `rules` (info), `goal` (info), `ball`, `bench` (info), `whistle`, `red`, `inv` (info), `blow`, `ask` |
| Success path (automated) | tap `whistle`, tap `blow` |
| Plausible wrong actions | Kicking the ball just gives him an excuse for more time (trap). Blowing without a whistle is just saying "peep" (nope). Asking Bossworth nicely gets you nowhere (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the referee rules. Who is the referee, exactly? 2) Bossworth left his whistle on the bench. Whoever holds it is the referee. 3) Pick up the whistle, then blow FULL TIME. |
| Completion text | Full time. Three-nil. The ex-referee is "reviewing the footage". |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `referee-sent-off` Referee Sent Off — path: tap `whistle`, tap `red` |
| The trick (shown after solving) | The rulebook made whoever held the whistle the referee, so picking it up let you blow full time yourself. |
| Ending consequences | None. |

## 219. Own Goal

| Field | Value |
|---|---|
| Stable ID | `own-goal` |
| Objective | Put the true score on the board. |
| Intro dialogue | I scored TWO goals today! Both mine, both beauties. I've already set the board: 2–1 to me. Just press Confirm. The log is boring, don't read it. |
| Player actions | tap, read, count |
| Interactive objects | `log` (info), `sign` (info), `board` (info), `b-minus`, `b-plus`, `y-minus`, `y-plus`, `confirm` |
| Success path (automated) | tap `b-minus`, tap `b-minus`, tap `y-plus`, tap `y-plus`, tap `confirm` |
| Plausible wrong actions | Confirming Bossworth's 2 : 1 is a trap. Any other wrong score is sent back (nope). Scores can't go below zero (nope). |
| Par (3★) | 5 |
| Hints | 1) Read where each goal in the log actually went. 2) Both of Bossworth's goals went into his own net, and an own goal counts for the other team. 3) Press BOSS − twice and YOU + twice to make it BOSS 0 : 3 YOU, then Confirm. |
| Completion text | Three-nil. Bossworth's two "beauties" now officially belong to you. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Both of Bossworth's goals were into his own net, and own goals count for the other side, so the true score was 3–0 to you. |
| Ending consequences | None. |

## 220. Spot Kick

| Field | Value |
|---|---|
| Stable ID | `spot-kick` |
| Objective | Score the penalty. |
| Intro dialogue | Penalty! I'm in goal AND refereeing. A gift: I will dive to MY left. Honestly. So shoot to YOUR right, where I definitely won't be. |
| Player actions | tap, observe, logic |
| Interactive objects | `quote` (info), `goal` (info), `keeper` (info), `ball` (info), `left`, `mid`, `right` |
| Success path (automated) | tap `left` |
| Plausible wrong actions | Shooting to your right goes exactly where he dives (trap). The middle is blocked by his trailing boot (nope). |
| Par (3★) | 1 |
| Hints | 1) He's telling the truth about his dive. Look at his gloves. 2) He faces you. His glove marked L is on your right-hand side, so "my left" is your right. 3) Shoot to your left. |
| Completion text | Top corner. The keeper went the right way. His right way. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | He really did dive to his left, but he was facing you, so his left was your right and your left was wide open. |
| Ending consequences | None. |

## 221. Gutter Ball

| Field | Value |
|---|---|
| Stable ID | `gutter-ball` |
| Objective | Beat Bossworth's score. |
| Intro dialogue | Bowling! I knocked down a measly ONE pin. Get a strike and you win, easy! Scores go on the official card, of course. Don't read the card. It's just a card. |
| Player actions | tap, read |
| Interactive objects | `lane` (info), `card` (info), `rule` (info), `mid`, `edge`, `gutter` |
| Success path (automated) | tap `gutter` |
| Plausible wrong actions | A strike scores 10, the highest, which loses on this card (trap). One pin only ties with Bossworth (nope). |
| Par (3★) | 1 |
| Hints | 1) Read the official scorecard. What kind of scorecard is it? 2) It's a mini golf card: the LOWEST score wins. Bossworth has 1. 3) Aim for the gutter: zero pins beats one. |
| Completion text | Zero pins. A perfect score. Technically. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The "official card" was a mini golf scorecard where the lowest score wins, so a gutter ball beat Bossworth's one pin. |
| Ending consequences | None. |

## 222. Bank Shot

| Field | Value |
|---|---|
| Stable ID | `bank-shot` |
| Objective | Get a hole in one. |
| Intro dialogue | Mini golf! The secret is simple: aim straight at the hole. Straight lines are the fastest. Ignore the windmill. Windmills are scenery. |
| Player actions | tap, observe, logic |
| Interactive objects | `course` (info), `up`, `diag`, `right` |
| Success path (automated) | tap `up` |
| Plausible wrong actions | Aiming at the hole hits the windmill and bounces back (nope). Aiming right rolls into the pond (trap). |
| Par (3★) | 1 |
| Hints | 1) Trace each aim with your finger before you putt. What is in the way? 2) The yellow bumper in the top-left corner turns a ball rolling up so that it rolls right. 3) Aim up: the bumper sends the ball along the top edge into the hole. |
| Completion text | Hole in one. Off a bumper. Golf is geometry with a flag. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `windmill-wrecker` Windmill Wrecker — path: tap `diag`, tap `diag`, tap `diag` |
| The trick (shown after solving) | The straight line was blocked, but the angled bumper turned an "upwards" putt into a line straight along the top to the hole. |
| Ending consequences | None. |

## 223. Domino Rally

| Field | Value |
|---|---|
| Stable ID | `domino-rally` |
| Objective | Ring the bell with the dominoes. |
| Intro dialogue | Domino rally! Push the GIANT one, it's the most powerful. Small ones are pointless. And leave my spare domino alone, it's for emergencies. |
| Player actions | drag, tap, observe |
| Interactive objects | `sign` (info), `bell` (info), `d1`, `d2` (info), `gap` (drop zone), `d4` (info), `d5` (info), `giant`, `spare` (drag) |
| Success path (automated) | drag `spare` → `gap`, tap `d1` |
| Plausible wrong actions | The giant domino is far too heavy to push by hand (nope). Pushing the small domino stops at the gap (nope). |
| Par (3★) | 2 |
| Hints | 1) Look along the whole line. Is anything missing? 2) Each domino only knocks over the next one, so the line can't have a gap. The spare is just the right size. 3) Drag the spare into the gap, then push the smallest domino. |
| Completion text | Click-clack-clack-clack-BONG. The smallest push, the biggest noise. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Small dominoes topple bigger ones, so once the spare filled the gap, the tiniest push travelled all the way to the giant and the bell. |
| Ending consequences | None. |

## 224. Musical Chairs

| Field | Value |
|---|---|
| Stable ID | `musical-chairs` |
| Objective | Get the last chair when the music stops. |
| Intro dialogue | Musical chairs! One chair, two players. Sit when the music stops. I'll shout when it stops. I have excellent ears. Trust the ears. |
| Player actions | wait, tap, observe |
| Interactive objects | `rules` (info), `display` (info), `box`, `chair`, `boss` (info) |
| Success path (automated) | wait 9500 ms, tap `chair` |
| Alternative `very-patient` | wait 30000 ms, tap `chair` |
| Plausible wrong actions | Sitting while the music still plays puts you out (trap). Only the DJ may touch the boombox (nope). |
| Par (3★) | 1 |
| Hints | 1) Don't listen to Bossworth. Watch the boombox display. 2) The display counts the song down. The music only stops at 0:00. 3) Wait until the display shows 0:00 and SILENCE, then sit on the chair. |
| Completion text | One chair, one winner, one referee still dancing. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Bossworth's "STOP!" was a bluff; the boombox display showed when the music really stopped. |
| Ending consequences | None. |

## 225. Chess Clock

| Field | Value |
|---|---|
| Stable ID | `chess-clock` |
| Objective | Win the chess game. |
| Intro dialogue | Rained off! Indoor games. Chess: I have nine queens, you have one pawn. Take ALL the time you need. Think for hours! The clock is just decoration. |
| Player actions | tap, wait, read |
| Interactive objects | `rules` (info), `t-you` (info), `t-his` (info), `board` (info), `cclock` (info), `move`, `press`, `resign`, `flip` |
| Success path (automated) | tap `move`, tap `press`, wait 6500 ms |
| Plausible wrong actions | Resigning hands him the game (trap). The clock needs a move first, and you only get one move per turn (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the clock rules. Whose clock is running, and how much time does Bossworth have? 2) Pressing your clock after a move starts HIS clock. He only has six seconds. 3) Move the pawn, press your clock, then let Bossworth talk until his time runs out. |
| Completion text | Won on time. Nine queens, zero seconds. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `board-flipper` Board Flipper — path: tap `flip` |
| The trick (shown after solving) | A chess clock only runs for the player whose turn it is, so one quick move put Bossworth's six seconds on the clock while he talked. |
| Ending consequences | None. |

## 226. Rock Paper Bossworth

| Field | Value |
|---|---|
| Stable ID | `rock-paper-bossworth` |
| Objective | Win one round of rock, paper, scissors. |
| Intro dialogue | Rock, paper, scissors! I am completely random. Wildly unpredictable. And next I'll throw ROCK. Pinky promise. So paper wins. Probably. |
| Player actions | tap, logic, observe |
| Interactive objects | `h0` (info), `h1` (info), `h2` (info), `h3` (info), `h4` (info), `h5` (info), `promise` (info), `beats` (info), `boss` (info), `rock`, `paper`, `scissors` |
| Success path (automated) | tap `rock` |
| Plausible wrong actions | Paper loses to the scissors he really throws (trap). Scissors against scissors is a tie (nope). |
| Par (3★) | 1 |
| Hints | 1) Ignore the promise. Look at his last five throws in order. 2) Rock, paper, scissors, rock, paper… he goes round in the same circle every time. What comes next? 3) He'll throw scissors. Rock beats scissors: throw ROCK. |
| Completion text | Rock blunts scissors. And promises. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | His "random" throws went rock, paper, scissors on repeat, so the next one was scissors whatever he promised. |
| Ending consequences | None. |

## 227. Broadside

| Field | Value |
|---|---|
| Stable ID | `broadside` |
| Objective | Sink Bossworth's last ship. |
| Intro dialogue | Sea battle! My last ship is hidden somewhere. It is definitely NOT in row 2. Fire at E5, the lovely corner. Trust me. I'm an admiral now. |
| Player actions | tap, logic |
| Interactive objects | `A1` (info), `B1` (info), `C1` (info), `D1` (info), `E1`, `A2` (info), `B2`, `C2`, `D2`, `E2` (info), `A3` (info), `B3` (info), `C3` (info), `D3`, `E3` (info), `A4`, `B4` (info), `C4`, `D4` (info), `E4` (info), `A5`, `B5` (info), `C5`, `D5` (info), `E5`, `rule` (info) |
| Success path (automated) | tap `B2`, tap `C2`, tap `D2` |
| Plausible wrong actions | A shot into empty sea is a miss (nope). The third miss uses up your spare shells (trap). |
| Par (3★) | 3 |
| Hints | 1) The ship is three squares in a straight line, and it can't sit on a square that was already a miss. 2) Check every row and column for three untouched squares in a row. There is only one place. 3) Fire at B2, C2 and D2. |
| Completion text | Three hits, one sinking, one admiral demoted. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The old misses left exactly one straight run of three open squares, so the ship had to be in row 2, whatever the admiral said. |
| Ending consequences | None. |

## 228. Snap!

| Field | Value |
|---|---|
| Stable ID | `snap` |
| Objective | Win the game of snap. |
| Intro dialogue | Snap! Turn the cards, and shout SNAP when two match. Same COLOUR, of course. Red on red, snap! Everyone knows that. Don't read the card. Cards are for playing. |
| Player actions | tap, read, sequence |
| Interactive objects | `rule` (info), `deck`, `top` (info), `snap` |
| Success path (automated) | tap `deck`, tap `deck`, tap `snap` |
| Alternative `second-chance` | tap `deck`, tap `deck`, tap `deck`, tap `deck`, tap `snap` |
| Plausible wrong actions | Snapping on a colour match is a false snap (trap). Snapping with only one card down does nothing (nope). Running out of cards without a snap loses (trap). |
| Par (3★) | 3 |
| Hints | 1) Read the rule card on the table. What has to match? 2) Snap needs the same NUMBER, not the same colour. 9 of diamonds on 4 of hearts is not a snap. 3) Turn two cards (9 of diamonds, then 9 of clubs), then press SNAP. |
| Completion text | Nine on nine. Snap. The referee is "checking the rules". |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Snap means the same number, so you ignored Bossworth's red-on-red and waited for the nines. |
| Ending consequences | None. |

## 229. Kit Check

| Field | Value |
|---|---|
| Stable ID | `kit-check` |
| Objective | Get changed for the final match. |
| Intro dialogue | Final match! Get changed, quick: follow my kit list EXACTLY. Boots first, obviously, they're the most important. Then hurry out. No dawdling! |
| Player actions | drag, logic |
| Interactive objects | `list` (info), `tag` (info), `lockers` (info), `you` (drop zone), `boots` (drag), `socks` (drag), `pads` (drag), `shirt` (drag), `run` |
| Success path (automated) | drag `pads` → `you`, drag `socks` → `you`, drag `boots` → `you`, drag `shirt` → `you` |
| Alternative `shirt-first` | drag `shirt` → `you`, drag `pads` → `you`, drag `socks` → `you`, drag `boots` → `you` |
| Plausible wrong actions | Boots before socks, or socks before shin pads, won't go on (nope). Running out before you're dressed is a trap. |
| Par (3★) | 4 |
| Hints | 1) Think about what goes on top of what. Can you pull socks on over boots? 2) The kit tag says shin pads go under socks. Boots go on last, over the socks. 3) Drag on the shin pads, then the socks, then the boots, and the shirt whenever you like. |
| Completion text | Fully kitted, in an order that works on actual legs. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Kit goes on in layers, so Bossworth's list had to be done backwards: pads under socks, socks under boots. |
| Ending consequences | None. |

## 230. Medal Table

| Field | Value |
|---|---|
| Stable ID | `medal-table` |
| Objective | Put the teams on the podium in the right order. |
| Intro dialogue | Medal ceremony! I won TWELVE medals. Twelve! Kevin got three, you got one. So: me on the top step, obviously. Count them! |
| Player actions | tap, read, logic |
| Interactive objects | `r-boss` (info), `r-kevin` (info), `r-you` (info), `rule` (info), `podium` (info), `you`, `kevin`, `boss` |
| Success path (automated) | tap `you`, tap `kevin` |
| Plausible wrong actions | Bossworth on the top step breaks the medal table rules (trap). Kevin first, or Bossworth second, is sent back (nope). |
| Par (3★) | 2 |
| Hints | 1) Read how the medal table is ranked. Is it the most medals? 2) Golds count first. Only one team has a gold. Silvers come before bronzes. 3) Tap Team You for first place, then Team Kevin for second. |
| Completion text | One gold beats twelve bronzes. Bossworth is "appealing to the committee". He is the committee. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Medal tables rank by golds first, so your one gold beat Kevin's silvers and Bossworth's twelve bronzes. |
| Ending consequences | None. |

## 231. Trophy Polish

| Field | Value |
|---|---|
| Stable ID | `trophy-polish` |
| Objective | Give the sports day cup to its winner. |
| Intro dialogue | The sports day cup! It's engraved BOSSWORTH. I read it myself. Just hand it over. And don't polish it: polish is for show-offs. |
| Player actions | hold, tap, read |
| Interactive objects | `sign` (info), `trophy` (info), `plaque` (info), `lift`, `give`, `cloth` (hold) |
| Success path (automated) | hold `cloth` 2200 ms, tap `lift` |
| Plausible wrong actions | Handing the cup to Bossworth is a trap. Lifting the cup before you can read the plaque is refused (nope). Letting go of the cloth too soon only half-cleans it. |
| Par (3★) | 2 |
| Hints | 1) Nobody can read that plaque. Including Bossworth. 2) The polishing cloth can be pressed and held. 3) Hold the cloth for two seconds to clean the plaque, read it, then lift the trophy. |
| Completion text | Polished, read, lifted. Shiny side out. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | The grime hid the engraving, and a polish showed the cup was never Bossworth's: it said WINNER: YOU. |
| Ending consequences | None. |

## 232. The Last Hurdle

| Field | Value |
|---|---|
| Stable ID | `the-last-hurdle` |
| Objective | Get past the last hurdle before the Factory. |
| Intro dialogue | Sports day is over. I'm wanted at the Factory! One last hurdle on the way. JUMP it, cleanly! Knock it and you're out. That's the rule. I think. I didn't read it. |
| Player actions | hold, read, choice |
| Interactive objects | `rules` (info), `factory` (info), `you` (info), `hurdle` (info), `jump`, `push` (hold), `round` |
| Success path (automated) | hold `push` 2200 ms |
| Plausible wrong actions | Nobody can jump a four-metre hurdle (trap). A short push only makes it wobble. |
| Par (3★) | 1 |
| Hints | 1) Bossworth didn't read the rule card. You could. 2) Knocking a hurdle over is allowed. It's far too tall to jump, and much too heavy to tip with a tap. 3) Press and hold "Push it over" until it falls, then walk on. |
| Completion text | Hurdle flattened. Next stop: the Factory. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `hurdle-dodger` Hurdle Dodger — path: tap `round` |
| The trick (shown after solving) | The rules allow knocking a hurdle down, so the "last hurdle" only had to be pushed over, not jumped. |
| Ending consequences | None. |

## 233. Terms and Conditions

| Field | Value |
|---|---|
| Stable ID | `terms-and-conditions` |
| Objective | Get out of the contract. |
| Intro dialogue | Before the finale, a little paperwork. Just click I AGREE. Nobody reads these. Nobody. Ever. |
| Player actions | read, tap |
| Interactive objects | `contract` (info), `more`, `agree`, `flap` |
| Success path (automated) | tap `more`, tap `more`, tap `flap` |
| Plausible wrong actions | Clicking I AGREE is a trap. The cat flap only works once you have read Clause 9. |
| Par (3★) | 3 |
| Hints | 1) Bossworth really doesn't want you to read it. 2) There are three pages. The last clause matters. 3) Press "Read more" twice, then use the cat flap. |
| Completion text | You read the fine print. Lawyers everywhere weep with joy. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `terms-agreer` Agrees to Everything — 4 traps in one attempt |
| The trick (shown after solving) | Reading the terms revealed Clause 9: the cat flap. |
| Ending consequences | None. |

## 234. The Rehearsal

| Field | Value |
|---|---|
| Stable ID | `the-rehearsal` |
| Objective | Pass Bossworth's pop quiz about your adventure. |
| Intro dialogue | The finale is close. Let's rehearse! Three questions about our time together. I bet you weren't paying attention. |
| Player actions | memory, choice |
| Interactive objects | `question` (info), `opt1`, `opt2`, `opt3`, `score` (info) |
| Success path (automated) | tap `opt2`, tap `opt3`, tap `opt1` |
| Plausible wrong actions | A wrong answer restarts the quiz (trap). |
| Par (3★) | 3 |
| Hints | 1) Think back to Levels 1, 4 and 12. 2) The red button was a dud; the glowing code was also used in the Broken Room. 3) Answer: absolutely nothing, then 4 · 2 · 7, then the lever. |
| Completion text | Memory: excellent. Bossworth: slightly moved. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | A rehearsal is just practice. The answers were in the questions. |
| Jigsaw piece | `jig-9` at 90%, 90% — replays only |
| Ending consequences | None. |

## 235. The Last Instruction

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
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | Collect the gears, then ask Bossworth before answering. |
| Ending consequences | Choice: trusting him leans Hero; asking why leans Chaos. Dialogue reflects earlier choices. |

## 236. The Final Decision

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
| Ruins (deliberately terrible finishes) | none |
| The trick (shown after solving) | You chose how to fix the machine. Bossworth just held the wrench. |
| Ending consequences | Hero: repair (hold wrench). Chaos: overload (drag fuse). Secret Master: all 15 secrets + golden quill. |

# Sabotage Studio (bonus pack, unlocked after Level 12)

## Bonus 1: Red Means Blue

| Field | Value |
|---|---|
| Stable ID | `red-means-blue` |
| Objective | Press RED. |
| Intro dialogue | Sabotage Studio, test one. Simple: press RED. Not blue. RED. You know what red is. I hope. |
| Player actions | tap |
| Interactive objects | `sign` (info), `red-word`, `btnA`, `btnB`, `note` (info) |
| Success path (automated) | tap `red-word` |
| Plausible wrong actions | The red button is labelled BLUE, the blue one is labelled RED: both get a "nope". |
| Par (3★) | 1 |
| Hints | 1) Each button argues about what colour it is. 2) Bossworth said "press RED" — and RED is right there in what he said. 3) Press the word RED in the instruction sign. |
| Completion text | Colours are a social construct. So are instructions. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `label-peeler` Label Peeler — path: tap `btnA`, tap `btnB`, tap `btnA`, tap `btnB`, tap `btnA`, tap `btnB` |
| The trick (shown after solving) | Neither button was RED. The word RED was. |
| Ending consequences | None. |

## Bonus 2: Ninety-Nine

| Field | Value |
|---|---|
| Stable ID | `ninety-nine` |
| Objective | Unplug the phone at exactly 100%. |
| Intro dialogue | Charge the phone to exactly 100%, then unplug it. Never at 99%. NEVER 99. I can't explain why. It's personal. |
| Player actions | wait, tap |
| Interactive objects | `phone` (info), `toggle`, `unplug`, `pct` (info) |
| Success path (automated) | tap `toggle`, wait 5000 ms, tap `unplug` |
| Plausible wrong actions | Unplugging below 99% does nothing (nope). |
| Par (3★) | 2 |
| Hints | 1) Watch the battery. Does it ever reach 100? 2) Something in the phone's settings is holding it back. 3) Switch optimised charging off, wait for 100%, then unplug. |
| Completion text | A fully charged phone. Bossworth can finally sleep. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `ninety-nine` Ninety-Nine — path: wait 5000 ms, tap `unplug` |
| The trick (shown after solving) | Optimised charging stopped it at 99%. Switching it off let it reach 100. |
| Ending consequences | None. |

## Bonus 3: The Tower

| Field | Value |
|---|---|
| Stable ID | `tower-toppler` |
| Objective | Get all three discs onto peg C. |
| Intro dialogue | Move the tower to peg C. One disc at a time. Never a big disc on a small one. The PROPER way. Seven moves. I'll be counting. |
| Player actions | tap, drag |
| Interactive objects | `pegA` (drop zone), `pegB` (drop zone), `pegC` (drop zone), `csign` (drag) |
| Success path (automated) | drag `csign` → `pegA` |
| Alternative `honest` | tap `pegA`, tap `pegC`, tap `pegA`, tap `pegB`, tap `pegC`, tap `pegB`, tap `pegA`, tap `pegC`, tap `pegB`, tap `pegA`, tap `pegB`, tap `pegC`, tap `pegA`, tap `pegC` |
| Plausible wrong actions | A bigger disc on a smaller one is refused (nope). |
| Par (3★) | 14 |
| Hints | 1) The puzzle says "peg C". It never says which peg is C. 2) The signs above the pegs can be moved. 3) Drag the C sign onto the peg that already holds the tower — or do the seven moves: A→C, A→B, C→B, A→C, B→A, B→C, A→C. |
| Completion text | The tower stands. Somewhere, a monk nods. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `tower-toppler` Tower Toppler — path: tap `pegA`, tap `pegB`, tap `pegA`, tap `pegB`, tap `pegA`, tap `pegC`, tap `pegA`, tap `pegC`, tap `pegA`, tap `pegC` |
| The trick (shown after solving) | You can solve the tower in seven moves — or move the "C" sign. |
| Ending consequences | None. |

## Bonus 4: Tip Top

| Field | Value |
|---|---|
| Stable ID | `tip-top` |
| Objective | Put the tree on the stand, pointy end up. |
| Intro dialogue | Last test. Put the tree on the stand. Pointy end UP. Even you can't ruin a tree. …Can you? |
| Player actions | tap, drag |
| Interactive objects | `tree` (drag), `stand` (drop zone), `rotate`, `label` (info) |
| Success path (automated) | tap `rotate`, drag `tree` → `stand` |
| Plausible wrong actions | A tree lying on its side won't stand (nope). |
| Par (3★) | 2 |
| Hints | 1) The tree is lying down. Trees don't nap. 2) The Rotate button turns the tree. 3) Rotate once so the pointy end is up, then drag the tree onto the stand. |
| Completion text | A tree, standing. The Sabotage Studio is closed for the season. |
| Secrets | none |
| Ruins (deliberately terrible finishes) | `tip-top` Tip Top — path: tap `rotate`, tap `rotate`, drag `tree` → `stand` |
| The trick (shown after solving) | Pointy end up means turning the tree before placing it. |
| Ending consequences | None. |

