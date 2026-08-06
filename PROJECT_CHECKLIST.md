# Personal Brand Website — Checklista realizacji

**Marka:** Piotr Kulbacki · **Produkt:** Lyamo  
**Stack:** Next.js (App Router) + TypeScript + Tailwind + Motion + next-intl · **Hosting:** Vercel  
**Repo:** [PiotrKulbacki/my-buisness-card](https://github.com/PiotrKulbacki/my-buisness-card)  
**Workflow:** zgłoś postęp — checklista zostanie zaktualizowana.

**Legenda:** `[ ]` do zrobienia · `[x]` ukończone · `[~]` częściowo / wymaga Ciebie

---

## Faza 0 — Fundamenty biznesowe i ops

- [x] Utworzenie struktury projektu w workspace (`website/`)
- [x] Inicjalizacja repozytorium Git (`main`)
- [x] README + DEPLOY runbook
- [x] Repo GitHub: `https://github.com/PiotrKulbacki/my-buisness-card`
- [x] Push kodu aplikacji `website/` na GitHub (naprawione: wcześniej był tylko pointer do zagnieżdżonego `.git`)
- [ ] Projekt na Vercel + podpięcie repo (**Root Directory = `website`**)
- [ ] Wybór i zakup domeny
- [ ] Konto Resend + API key w env
- [ ] Decyzja analytics: Vercel Analytics ± Plausible/Umami

**Notatki:** Następny krok produkcyjny = Vercel preview.

---

## Faza 1 — Design system i brand

- [x] Dark-only UI, lewy sidebar, avatar + soft-blend portret
- [x] Design tokens, Syne + Geist, reduced-motion
- [x] Favicon / apple-touch
- [ ] Finalne logo marki (opcjonalnie)
- [ ] Finalna decyzja fontów po preview na Vercel

---

## Faza 2 — Scaffold aplikacji

- [x] Next.js App Router + TypeScript + Tailwind + next-intl (5 locale)
- [x] Routing: landing, about, projects, path, contact, privacy
- [x] `proxy.ts`, config `site.ts`, path aliases

---

## Faza 3 — Treści i dane

- [x] i18n, projekty JSON, CV/Ścieżka, email, LinkedIn, GitHub
- [x] Portret + avatar w `public/`
- [x] Stack tech (m.in. Supabase, Stripe, Vercel, Git/GitHub)
- [ ] Finalne copy autorskie
- [ ] Realne screenshoty projektów
- [ ] Pełne CV
- [ ] Realne URL Facebook / Instagram / YouTube

---

## Faza 4 — Strony i UX

- [x] Landing, Kim jestem, Projekty, Ścieżka, Kontakt
- [x] Motion P0 (bez custom cursora)
- [ ] P1 opcjonalnie po launchu

---

## Faza 5 — Formularz, prawne, SEO tech

- [x] Contact API + honeypot, privacy, robots, sitemap, metadata, JSON-LD
- [ ] Ocena `/imprint` (DE/AT)
- [ ] Finalny tekst prawny (jeśli potrzeba)

---

## Faza 6 — Analityka, Search Console, QA

- [x] Vercel Analytics w kodzie + lokalne QA scripts
- [ ] GSC, Lighthouse na preview/prod, formularz E2E z Resend

---

## Faza 7 — Launch

- [ ] Deploy Vercel (preview → produkcja)
- [ ] DNS domeny → Vercel
- [ ] Env prod (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`)
- [ ] Smoke test + ogłoszenie LinkedIn

---

## Faza 8 — Backlog (po zgodzie)

- [ ] Canvas projektów, Lyamo teaser, `/now`, OG images, ⌘K, CMS…

---

## Historia aktualizacji

| Data | Zmiana |
|------|--------|
| 2026-08-05 | Scaffold MVP + dark UI + sidebar + zdjęcia |
| 2026-08-06 | Checklista sync; GitHub social; repo `my-buisness-card` |
| 2026-08-06 | Naprawa: `website/` jako pełny kod (nie embedded git); następny krok = Vercel |
