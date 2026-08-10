# Piotr Kulbacki — Personal Brand Website

Wizytówka / portfolio: Next.js (App Router) + TypeScript + Tailwind + next-intl + Vercel.  
Produkcja: [piotrkulbacki.com](https://piotrkulbacki.com)

## Struktura

| Ścieżka                     | Opis                                                                          |
| --------------------------- | ----------------------------------------------------------------------------- |
| `src/`                      | Aplikacja Next.js                                                             |
| `public/`                   | Assety publiczne (`portrait.png`, `avatar.png`, `brand/`, `certificates/`, …) |
| `messages/`                 | Tłumaczenia (pl, en, de, es, uk)                                              |
| `docs/`                     | Dokumentacja projektu + źródłowe zdjęcia w `docs/assets/`                     |
| `docs/Brand_Logo.md`        | Logo PK: warianty, favicon, mapa w layoutcie                                  |
| `docs/CV_Online.md`         | Spec i stan sekcji CV (`/path`)                                               |
| `docs/Legal_and_Cookies.md` | Impressum, privacy, cookies, układ stopki                                     |
| `docs/Analytics.md`         | Vercel Analytics, GA4, Google Consent Mode v2                                 |
| `docs/Projects_Section.md`  | Reguły case study / galerii projektów                                         |
| `docs/SEO.md`               | Canonical, hreflang, robots, sitemap, wspólny OG image                        |
| `docs/DEPLOY.md`            | Env Vercel, GSC, GA, smoke launch                                             |
| `PROJECT_CHECKLIST.md`      | Żywa checklista postępów                                                      |

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

| Breakpoint | Układ                                                                       |
| ---------- | --------------------------------------------------------------------------- |
| Desktop    | Lewy sidebar: avatar (lightbox), logo lockup, nav, LanguageSwitcher + globe |
| Mobile     | Top: avatar (lightbox) + logo \| język (skróty + globe); dół: tab bar       |

Landing na mobile: hero wypełnia pierwszy viewport; poniżej do scrolla głównie stopka.

Sekcja **CV / Doświadczenie** (`/path`): pełne CV online — [`docs/CV_Online.md`](docs/CV_Online.md).

**Projekty (live):** AI Document → [aidocument.eu](https://aidocument.eu/), Lyamo → [lyamo.eu](https://lyamo.eu/), AK Gebäudeservice. Reguły case study: [`docs/Projects_Section.md`](docs/Projects_Section.md).

Prawne: `/impressum`, `/privacy`, baner cookies — [`docs/Legal_and_Cookies.md`](docs/Legal_and_Cookies.md).  
Analityka (Vercel + opcjonalne GA4, Consent Mode v2): [`docs/Analytics.md`](docs/Analytics.md).

SEO (robots, sitemap 60 URL, OG z logo): [`docs/SEO.md`](docs/SEO.md).

## Następny krok

1. **Google Search Console** — weryfikacja + submit `sitemap.xml`
2. (Opcjonalnie) **GA4** — `NEXT_PUBLIC_GA_MEASUREMENT_ID` na Vercel + smoke Consent Mode
3. Case study: screenshoty AI Document
4. Lighthouse + LinkedIn

Szczegóły: [`PROJECT_CHECKLIST.md`](PROJECT_CHECKLIST.md).
