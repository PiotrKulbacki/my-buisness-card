# Piotr Kulbacki — Personal Brand Website

Modern multilingual personal brand site (portfolio + services + Lyamo product spotlight).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- next-intl (pl / en / de / es / uk)
- Motion (Framer Motion)
- Resend contact API
- Vercel Analytics + hosting

## Getting started

```bash
cd website
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — locale proxy redirects to a detected language (fallback `en`).

## Scripts

| Command                | Description             |
| ---------------------- | ----------------------- |
| `npm run dev`          | Local development       |
| `npm run build`        | Production build        |
| `npm run start`        | Start production server |
| `npm run lint`         | ESLint                  |
| `npm run typecheck`    | TypeScript check        |
| `npm run format`       | Prettier write          |
| `npm run format:check` | Prettier check          |

## Deploy (Vercel)

1. Push this `website/` repo (or monorepo root with Root Directory = `website`) to GitHub.
2. Import project in Vercel.
3. Set env vars from `.env.example`.
4. Attach custom domain DNS to Vercel.
5. Verify in Google Search Console using the production URL.

## Content

- Copy / UI strings: `messages/*.json`
- Projects: `src/content/projects.ts`
- CV: `src/content/cv.ts`
- Contact / social: `src/config/site.ts`

## Checklist

Project-wide checklist lives in the parent folder: [`../PROJECT_CHECKLIST.md`](../PROJECT_CHECKLIST.md).
