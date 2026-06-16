# Showrades

A free, open-source, mobile-first web app for family charades. No downloads, no accounts, no ads — open one link and start playing.

Designed for mixed-age game nights: players aged 7 and under use **Picture Mode** (emoji prompts, no reading required), while players aged 8 and up use **Word Mode** (text prompts). Both modes share the same game loop and scoring so nobody gets left out.

Live at: **https://jazzser.github.io/showrades/**

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript |
| Styling | Tailwind CSS v4, custom design tokens in `app/globals.css` |
| Fonts | Fredoka + Nunito via `next/font` |
| State | React Context + `localStorage` persistence |
| Backend | Supabase (client-only, browser SDK — no SSR) |
| Hosting | Static export to GitHub Pages |

---

## Local development

**Prerequisites:** Node.js 20+, npm

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # static export to ./out/
npm run lint    # ESLint
```

### Environment variables

Supabase is client-only. Create a `.env.local` file at the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The game runs without these — Supabase is not yet wired into gameplay.

---

## Build and deploy

The app is a fully static export (`output: "export"` in `next.config.ts`). `npm run build` writes the static site to `./out/`.

**GitHub Pages deployment is automatic** via `.github/workflows/deploy.yml`. Any push to `main` triggers a build and deploys `./out/` to GitHub Pages. No manual steps needed.

To deploy manually from a local build:

```bash
npm run build
# then upload ./out/ to any static host
```

The `basePath` is set to `/showrades` in production, matching the GitHub Pages repo path.

---

## Adding words and categories

All game content lives in `lib/data/words.ts`. Words are grouped by category in the `WORDS` object. Each entry is a tuple of `[word, emoji]`.

**To add words to an existing category**, append to that category's array:

```ts
animals: [
  ["Elephant", "🐘"],
  // add new entries here
  ["Flamingo", "🦩"],
],
```

**To add a new category**, you need to do three things:

1. Add the key to `CategoryKey` in `lib/game/types.ts`:

```ts
export type CategoryKey = "animals" | "food" | "fruits" | "jobs" | "veggies" | "sports" | "yourcategory";
```

2. Add the word list to `WORDS` in `lib/data/words.ts`:

```ts
yourcategory: [
  ["Word One", "🔤"],
  ["Word Two", "🔠"],
],
```

3. Register the category metadata (display name, emoji, color) in `lib/data/categories.ts`.

**Current categories:** animals, food, fruits, jobs, veggies, sports (98 word cards total).

---

## Project docs

Detailed vision, backlog, and decisions are in `docs/`:

- `docs/1. Vision & Goals.md` — project vision and design direction
- `docs/2. Backlog & Status.md` — build status, decisions log, prioritized backlog

---

## License

MIT
