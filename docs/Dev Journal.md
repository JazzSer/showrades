# Dev Journal

Chronological notes on bugs that weren't obvious from the symptom alone — root cause, why it was confusing, and how it was fixed.

## 2026-06-21 — Picture-mode photos not rendering on `staging`

**Symptom:** On `staging` (deployed to GitHub Pages), picture-mode cards always showed the emoji, never the Pexels/gstatic photo. The same code, tested locally on the `integration` branch, rendered photos fine. This looked like an environment difference (GitHub Pages vs local, production vs dev, service worker caching, `next.config.ts` image/remote-pattern config, etc.).

**Investigation:** `next.config.ts` is byte-identical between `integration` and `staging` — same `output: "export"`, `images.unoptimized: true`, same `@ducanh2912/next-pwa` `runtimeCaching` rules (including the `NetworkFirst` Pexels cache entry with a 5s timeout). No env/config divergence at all. The actual diff was in `app/game/page.tsx`:

- `integration` (working): renders the photo with a plain `<img src={card.image} className="w-full max-h-[...] object-cover ..." />`.
- `staging` (broken): renders it with `next/image`'s `<Image src={card.image} fill className="object-cover" />`, wrapped in a `<div className="w-full max-h-[...] relative overflow-hidden">`.

**Root cause:** `next/image` with the `fill` prop renders the `<img>` as `position: absolute; inset: 0`, which takes it out of normal flow. The wrapping `<div>` had `max-h-[...]` (a height *cap*, not a fixed height) and no other in-flow content to give it height — so the div collapsed to `height: 0`, and the absolutely-positioned image filled a 0×0 box. It rendered, but at zero size, so it was invisible. This is a pure CSS layout bug from swapping `<img>` for `<Image fill>` without giving the container an explicit height/aspect-ratio; it has nothing to do with GitHub Pages, the service worker, or any build-time config. It would have been just as broken running `staging` locally — the "integration works, staging doesn't" symptom was about which commit had which markup, not which environment ran it.

**Workaround shipped first (commit `9b3a948`):** removed the per-category image maps entirely and made picture mode always fall back to emoji. Simple, but loses the photos feature.

**Proper fix (branch `fix/picture-mode-images`):** restore the image data and switch back to a plain `<img>` tag (matching what `integration` already proved works), instead of `next/image` `fill`. `images.unoptimized: true` makes `next/image` provide no optimization benefit here anyway, so there's no downside to using a plain `<img>`.

**Lesson:** when swapping `<img>` for `next/image fill`, the parent must have an explicit height or `aspect-ratio` — `max-height` alone is not enough, since `fill` children don't participate in layout flow.
