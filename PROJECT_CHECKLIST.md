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

**Następny krok:** deploy preview na Vercel.

---

## Faza 1 — Design system i brand

- [x] Dark-only, lewy sidebar, avatar + soft-blend portret
- [x] Design tokens, Syne + Geist, reduced-motion, favicon
- [ ] Finalne logo (opcjonalnie)
- [ ] Decyzja fontów po preview

---

## Faza 2 — Scaffold

- [x] Next.js + Tailwind + next-intl (5 locale) + `proxy.ts`
- [x] Routing: `/`, `/about`, `/projects`, `/path`, `/contact`, `/privacy`

---

## Faza 3 — Treści

- [x] i18n, projekty, Ścieżka/CV, email, LinkedIn, GitHub
- [x] `public/portrait.png`, `public/avatar.png` (+ źródła w `docs/assets/`)
- [x] Stack tech (Supabase, Stripe, Vercel, …)
- [ ] Finalne copy, screenshoty projektów, pełne CV
- [ ] Realne URL FB / IG / YT

---

## Faza 4 — Strony i UX

- [x] Landing, Kim jestem, Projekty, Ścieżka, Kontakt + motion P0

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

| Data | Zmiana |
|------|--------|
| 2026-08-05 | MVP dark UI + sidebar |
| 2026-08-06 | GitHub + naprawa embedded `website/` |
| 2026-08-06 | Spłaszczenie: app w rootcie, docs w `docs/`, katalog lokalny `my-business-card` |
