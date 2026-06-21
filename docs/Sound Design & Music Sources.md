# Sound Design & Music Sources — Showrades

**Version:** 1.0
**Status:** 🟡 Curated recommendations — not yet implemented in-app

> Brief: Showrades is **playful, energetic, inclusive, minimal** (Brand Guide §01). Sound should feel like a friendly board-game night — bouncy, warm, a little goofy — never harsh, never "gamer" electronica, and never copyrighted/licensed-music-style (no recognizable songs, no DMCA risk). Everything below is **CC0 (public domain) or free-for-commercial-use with no attribution required**, so Showrades can stay zero-friction and open-source.

---

## 1. Sound Design Brief (per game moment)

| Moment | Mood | Reference |
|---|---|---|
| App load / Home | Warm, inviting, looping background bed | soft marimba/ukulele loop |
| Timer running | Subtle ticking, builds tension at ≤10s | soft clock tick → faster tick |
| Time's up | Playful "buzzer" — not jarring | cartoon honk/whistle |
| Correct guess | Bright pop/chime — matches "Pop In" animation | marimba/bell pop |
| Skip / wrong | Gentle wobble — matches "Wiggle" animation | soft slide-whistle down |
| Card flip / new word | Quick swoosh/flip | paper flip or card swoosh |
| Round end / score reveal | Short fanfare, upbeat | kazoo/horn flourish |
| Winner screen | Celebration fanfare + confetti pop | full bouncy fanfare, ~3-5s |
| Button taps (UI) | Tiny, soft click/pop | minimal UI click |

---

## 2. Recommended Sources (CC0 / free, no attribution required)

### 🥇 Mixkit (Audio) — https://mixkit.co/free-sound-effects/ & /free-stock-music/
Free for commercial use, **no attribution required**. Best fit for UI SFX (clicks, pops, swooshes, whooshes, dings) and short upbeat loops.
- "Game Show Suspense", "Bonus Earned", "Arcade Mechanical Bling" → correct/score moments
- "Game Level Completed", "Winning a coin" → round/winner
- "Click" / "Quick win" → UI taps & card flips

### 🥈 Pixabay Audio — https://pixabay.com/sound-effects/ & /music/
Pixabay Content License — free for commercial use, no attribution required. Huge library; search terms:
- `"cartoon pop"`, `"correct answer ding"`, `"wrong buzzer"`, `"whoosh card"`, `"clock ticking"`, `"kids ukulele loop"`, `"playful marimba"`, `"victory fanfare kids"`

### 🥉 Kevin MacLeod / Incompetech — https://incompetech.com/music/royalty-free/
CC BY 3.0 (attribution required, but license is explicit/clear and very permissive — credit "Kevin MacLeod (incompetech.com)" in an in-app Credits screen). Great for background loops:
- "Bouncy", "Carefree", "Wallpaper", "Pixelland" — playful, family-friendly loops

### Freesound.org — https://freesound.org/
Filter search by **CC0** license only (top-left license filter). Great for one-off SFX:
- search `"correct chime CC0"`, `"buzzer CC0"`, `"pop CC0"`, `"whoosh CC0"`

### OpenGameArt.org — https://opengameart.org/art-search-advanced?field_art_type_tid%5B%5D=13
Filter by **CC0**. Good source for full "game jingle" sets (win/lose/level-up) already grouped together.

---

## 3. Licensing Rule of Thumb for Showrades

1. **Prefer CC0** (Freesound, OpenGameArt, Pixabay) — zero attribution, zero risk, matches "no ads, zero friction, open-source" ethos.
2. **Mixkit / Pixabay license** files (no attribution) are fine to bundle directly into `public/sounds/`.
3. If using **CC BY** (Incompetech), add a `CREDITS.md` / in-app "Credits" link — required by license, low effort.
4. **Avoid:** anything "royalty-free for a fee," YouTube Audio Library tracks with "no attribution but not for redistribution as raw files" restrictions, and any AI-generated music platforms with unclear commercial terms.

---

## 4. Suggested File Structure (when implemented)

```
public/sounds/
  ui/
    click.mp3
    card-flip.mp3
  game/
    correct.mp3
    wrong.mp3
    timer-tick.mp3
    time-up.mp3
    round-end.mp3
    winner.mp3
  music/
    background-loop.mp3   (loopable, low volume, optional toggle)
```

Pair with a global **mute/volume toggle** in settings (Section 5 "Direction" of Vision doc emphasizes zero-friction — sound should default ON but be one tap to silence for nap-time/quiet play).

---

*This is a sourcing/curation reference for the team — actual audio files should be downloaded individually from the sources above (respecting each site's download/license flow) and added to `public/sounds/` in a follow-up implementation task.*
