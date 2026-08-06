# Piotr Kulbacki — Personal Brand Website

Wizytówka / portfolio: Next.js (App Router) + TypeScript + Tailwind + next-intl + Vercel.

## Struktura

| Ścieżka | Opis |
|---------|------|
| `src/` | Aplikacja Next.js |
| `public/` | Assety publiczne (`portrait.png`, `avatar.png`, …) |
| `messages/` | Tłumaczenia (pl, en, de, es, uk) |
| `docs/` | Dokumentacja projektu + źródłowe zdjęcia w `docs/assets/` |
| `PROJECT_CHECKLIST.md` | Żywa checklista postępów |

## Start lokalny

```bash
cp .env.example .env.local
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Import repo [PiotrKulbacki/my-buisness-card](https://github.com/PiotrKulbacki/my-buisness-card)
2. **Root Directory:** zostaw puste / `.` (aplikacja jest w rootcie)
3. Env vars — patrz [`docs/DEPLOY.md`](docs/DEPLOY.md)

## Następny krok

Vercel preview → domena → Resend → Search Console.  
Szczegóły: [`PROJECT_CHECKLIST.md`](PROJECT_CHECKLIST.md).
