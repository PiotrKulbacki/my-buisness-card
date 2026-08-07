# Personal Brand Website — Checklista realizacji

**Marka:** Piotr Kulbacki · **Produkt:** Lyamo  
**Stack:** Next.js (App Router) + TypeScript + Tailwind + Motion + next-intl · **Hosting:** Vercel  
**Repo:** [PiotrKulbacki/my-buisness-card](https://github.com/PiotrKulbacki/my-buisness-card)  
**Lokalnie:** katalog `my-business-card` (root = aplikacja)

**Legenda:** `[ ]` do zrobienia · `[x]` ukończone · `[~]` częściowo

---

## Faza 0 — Fundamenty biznesowe i ops

- [x] Struktura projektu (root = Next.js, docs w `docs/`)
- [x] Git `main` + GitHub push (pełny kod aplikacji)
- [x] README + `docs/DEPLOY.md`
- [ ] Projekt na Vercel (**Root Directory = puste / `.`**)
- [ ] Zakup domeny
- [ ] Resend + API key
- [ ] Decyzja analytics (Vercel Analytics już w kodzie)

**Następny krok:** deploy preview na Vercel (Root Directory = `.`), potem env (`RESEND_*`, `CONTACT_*`, `NEXT_PUBLIC_SITE_URL`) i smoke test formularza na preview.

---

## Faza 1 — Design system i brand

- [x] Dark-only, lewy sidebar, avatar + soft-blend portret
- [x] Design tokens, Syne + Geist, reduced-motion, favicon
- [ ] Finalne logo (opcjonalnie)
- [ ] Decyzja fontów po preview

---

## Faza 2 — Scaffold

- [x] Next.js + Tailwind + next-intl (5 locale) + `proxy.ts`
- [x] Routing: `/`, `/about`, `/projects`, `/path` (CV), `/contact`, `/privacy`

---

## Faza 3 — Treści

- [x] i18n, projekty, email, LinkedIn, GitHub
- [x] `public/portrait.png`, `public/avatar.png` (+ źródła w `docs/assets/`)
- [x] Stack tech (Supabase, Stripe, Vercel, …)
- [x] Pełne CV online (`/path`) — treść z PDF + aktualny stack; docs: `docs/CV_Online.md`
- [x] Certyfikaty w `public/certificates/` + podgląd modalny (PDF/obrazy); PII na dyplomie zredagowane
- [ ] PDF Git/GitHub (Udemy) — odłożony (brak pliku); wpis na liście bez podglądu
- [x] Screenshoty case study: MovieWeb + Sport Club PowerPlay (`public/projects/{movieweb,sportclub}/`; reguły: `docs/Projects_Section.md`)
- [ ] Finalne copy landing/about; screenshoty pozostałych projektów
- [ ] Realne URL FB / IG / YT

---

## Faza 4 — Strony i UX

- [x] Landing, Kim jestem, Projekty, CV/Doświadczenie (`/path`), Kontakt + motion P0
- [x] Mobile: dolny tab bar (jak w appce) zamiast hamburgera z headera
- [x] Mobile top bar: avatar + imię | przełącznik języka (skróty PL/EN/… + ikona globusa)
- [x] Desktop: ikona globusa przy LanguageSwitcher (sidebar bez zmian układu)
- [x] Landing mobile: hero wypełnia viewport (stopka do scrolla); skalowanie portretu
- [x] Avatar lightbox (klik → powiększony podgląd, Escape / tło / Zamknij)
- [x] CV: nav mobile **CV** / desktop **Doświadczenie**; PhoneReveal; ikony social; certyfikaty modal
- [x] Tailwind v4: tokeny `@theme` (`border-line`, `bg-bg/95`…); `button { font }` w `@layer base`

---

## Faza 5 — Formularz / prawne / SEO

- [x] Contact API, privacy, robots, sitemap, metadata, JSON-LD
- [ ] Imprint (DE/AT) jeśli potrzeba

---

## Faza 6 — QA / GSC

- [x] Lokalne lint/typecheck/build
- [ ] Lighthouse + GSC + formularz E2E na preview/prod

---

## Faza 7 — Launch

- [ ] Vercel preview → produkcja
- [ ] DNS + env prod
- [ ] Smoke + LinkedIn

---

## Faza 8 — Backlog (po zgodzie)

- [ ] Canvas, Lyamo teaser, `/now`, OG, ⌘K, CMS…

---

## Historia

| Data       | Zmiana                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| 2026-08-05 | MVP dark UI + sidebar                                                                                     |
| 2026-08-06 | GitHub + naprawa embedded `website/`                                                                      |
| 2026-08-06 | Spłaszczenie: app w rootcie, docs w `docs/`, katalog lokalny `my-business-card`                           |
| 2026-08-06 | Toast (Sonner) + loader na submit; i18n hardkodów; rate limit `/api/contact`; `.cursorrules`; CI workflow |
| 2026-08-06 | Mobile nav: bottom tabs + top bar (avatar/język); globe w LanguageSwitcher; landing fill-screen           |
| 2026-08-07 | Avatar lightbox (mobile + desktop)                                                                        |
| 2026-08-07 | CV online `/path`: pełna treść, certyfikaty + modal, redakcja PESEL na dyplomie, Tailwind v4 cleanup      |
