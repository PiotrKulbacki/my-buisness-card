# Piotr Kulbacki — Personal Brand Website

Wizytówka / portfolio: Next.js (App Router) + TypeScript + Tailwind + next-intl + Vercel.

## Struktura

| Ścieżka                | Opis                                                                |
| ---------------------- | ------------------------------------------------------------------- |
| `src/`                 | Aplikacja Next.js                                                   |
| `public/`              | Assety publiczne (`portrait.png`, `avatar.png`, `certificates/`, …) |
| `messages/`            | Tłumaczenia (pl, en, de, es, uk)                                    |
| `docs/`                | Dokumentacja projektu + źródłowe zdjęcia w `docs/assets/`           |
| `docs/CV_Online.md`    | Spec i stan sekcji CV (`/path`)                                     |
| `PROJECT_CHECKLIST.md` | Żywa checklista postępów                                            |

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

## Nawigacja (stan obecny)

| Breakpoint | Układ                                                                 |
| ---------- | --------------------------------------------------------------------- |
| Desktop    | Lewy sidebar: avatar (lightbox), brand, nav, LanguageSwitcher + globe |
| Mobile     | Top: avatar (lightbox) + imię \| język (skróty + globe); dół: tab bar |

Landing na mobile: hero wypełnia pierwszy viewport; poniżej do scrolla głównie stopka.

Sekcja **CV / Doświadczenie** (`/path`): pełne CV online (skills, doświadczenie, edukacja, certyfikaty z modalem, PhoneReveal). Opis: [`docs/CV_Online.md`](docs/CV_Online.md).

## Następny krok

1. **Vercel preview** — import repo, Root Directory = `.`, env z [`docs/DEPLOY.md`](docs/DEPLOY.md)
2. Smoke: locale, formularz kontaktowy, mobile tabs, avatar lightbox
3. Domena + Resend prod + Search Console

Szczegóły: [`PROJECT_CHECKLIST.md`](PROJECT_CHECKLIST.md).
