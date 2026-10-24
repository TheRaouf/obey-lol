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
| Ending consequences | None. |

## 33. Terms and Conditions

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
| Ending consequences | None. |

## 34. The Rehearsal

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
| Ending consequences | None. |

## 35. The Last Instruction

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

## 36. The Final Decision

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

