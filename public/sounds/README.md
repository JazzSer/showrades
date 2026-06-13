# Sound Placeholders

The `.wav` files in this directory tree are **silent placeholders** (correct duration/filename, no audio data) so that implementation code (audio manager, hooks, mute toggle, preloading) can be built and tested against the final file paths before real audio is sourced.

| File | Duration | Replace with |
|---|---|---|
| `ui/click.wav` | 0.1s | Soft UI click/pop |
| `ui/card-flip.wav` | 0.3s | Card swoosh/flip |
| `game/correct.wav` | 0.4s | Bright correct chime |
| `game/wrong.wav` | 0.4s | Gentle wrong/skip wobble |
| `game/timer-tick.wav` | 0.1s | Clock tick (loops, speeds up ≤10s) |
| `game/time-up.wav` | 0.6s | Playful buzzer |
| `game/round-end.wav` | 1.0s | Short upbeat fanfare |
| `game/winner.wav` | 2.0s | Celebration fanfare |
| `music/background-loop.wav` | 5.0s | Loopable background bed |

See `docs/Sound Design & Music Sources.md` for sourcing guidance (CC0/free, no attribution required) and the licensing rule of thumb. Replace each file in-place (keep the same filename/path) once real audio is sourced — no code changes needed.
