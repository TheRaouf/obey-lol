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
| Interactive objects | `window` (info), `paper` (info), `date` (info), `brolly`, `shades`, `door`, `inv` (info) |
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
| Interactive objects | `sign` (info), `gull` (drop zone) (free), `parasol` (info), `shade` (drop zone) (free), `bin` (drop zone) (free), `chips` (drag) |
| Success path (automated) | drag `chips` → `shade`, tap `chips` |
| Plausible wrong actions | Eating in the open gets your chips snatched (trap). Throwing the chips in the bin is a waste (nope). |
| Par (3★) | 2 |
| Hints | 1) Read the warning sign about what gulls steal. 2) Gulls only snatch what they can see. Somewhere on this beach is very shady. 3) Drag the chips under the parasol, then tap them to eat. |
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
| Interactive objects | `recipe` (info), `fire` (drop zone), `flask` (drop zone), `mix` (info), `jarH` (drag), `jarO` (drag), `jarNa` (drag), `jarC` (drag) |
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

## 133. Terms and Conditions

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

## 134. The Rehearsal

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

## 135. The Last Instruction

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

## 136. The Final Decision

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

