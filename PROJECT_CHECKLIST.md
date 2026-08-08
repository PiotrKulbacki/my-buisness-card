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
- [x] Projekt na Vercel (**Root Directory = puste / `.`**) + domena produkcyjna
- [x] Zakup domeny (`piotrkulbacki.com` na Vercel + redirect www)
- [x] Brevo + API key (kod: formularz + auto-reply; env na Vercel + weryfikacja domeny w Brevo)
- [x] Decyzja analytics (Vercel Analytics + opcjonalne GA4; oba dopiero po zgodzie w bannerze)
- [x] Cookies: `NEXT_LOCALE` + `pk_cookie_consent`, lekki banner; link w stopce (docs: `docs/Legal_and_Cookies.md`)

**Następny krok:** Google Search Console (sitemap); opcjonalnie GA4 Measurement ID + smoke Consent Mode (`docs/Analytics.md`); screenshoty Lyamo / AI Document.

---

## Faza 1 — Design system i brand

- [x] Dark-only, lewy sidebar, avatar + soft-blend portret
- [x] Design tokens, Syne + Geist, reduced-motion, favicon (logo PK)
- [x] Logo marki (PK): sidebar lockup, footer mark, favicon — `docs/Brand_Logo.md`
- [ ] Decyzja fontów po preview

---

## Faza 2 — Scaffold

- [x] Next.js + Tailwind + next-intl (5 locale) + `proxy.ts`
- [x] Routing: `/`, `/about`, `/projects`, `/path` (CV), `/contact`, `/privacy`, `/impressum`

---

## Faza 3 — Treści

- [x] i18n, projekty, email, LinkedIn, GitHub
- [x] `public/portrait.png`, `public/avatar.png` (+ źródła w `docs/assets/`)
- [x] Stack tech (Supabase, Stripe, Vercel, …)
- [x] Pełne CV online (`/path`) — treść z PDF + aktualny stack; docs: `docs/CV_Online.md`
- [x] Certyfikaty w `public/certificates/` + podgląd modalny (PDF/obrazy); PII na dyplomie zredagowane
- [ ] PDF Git/GitHub (Udemy) — odłożony (brak pliku); wpis na liście bez podglądu
- [x] Screenshoty case study: MovieWeb + Sport Club PowerPlay + AK (`public/projects/…`; reguły: `docs/Projects_Section.md`)
- [ ] Screenshoty / pełne case study: Lyamo (`lyamo.eu`), AI Document (`aidocument.eu/pl`)
- [ ] Finalne copy landing/about
- [ ] Realne URL FB / IG / YT

---

## Faza 4 — Strony i UX

- [x] Landing, Kim jestem, Projekty, CV/Doświadczenie (`/path`), Kontakt + motion P0
- [x] Mobile: dolny tab bar (jak w appce) zamiast hamburgera z headera
- [x] Mobile top bar: avatar + logo lockup | przełącznik języka (skróty PL/EN/… + ikona globusa)
- [x] Desktop: ikona globusa przy LanguageSwitcher (sidebar bez zmian układu)
- [x] Landing mobile: hero wypełnia viewport (stopka do scrolla); skalowanie portretu
- [x] Avatar lightbox (klik → powiększony podgląd, Escape / tło / Zamknij)
- [x] CV: nav mobile **CV** / desktop **Doświadczenie**; PhoneReveal; ikony social; certyfikaty modal
- [x] Tailwind v4: tokeny `@theme` (`border-line`, `bg-bg/95`…); `button { font }` w `@layer base`

---

## Faza 5 — Formularz / prawne / SEO

- [x] Contact API, privacy, robots, sitemap, metadata, JSON-LD
- [x] SEO: wspólny OG (logo) na wszystkich URL, hreflang w sitemap, `fb:app_id` (env) — `docs/SEO.md`
- [x] Impressum (§ 5 DDG) + rozbudowana polityka prywatności — `docs/Legal_and_Cookies.md`
- [x] Brevo zamiast Resend (formularz kontaktowy + auto-reply HTML)
- [x] Cloudflare Turnstile na formularzu kontaktowym
- [x] Cookies + zgoda na Vercel Analytics (banner; inventarz w `/privacy#cookies`)
- [x] Google Analytics 4 via `@next/third-parties/google` (prod + consent; `NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- [x] Google Consent Mode v2 (default denied → analytics_storage granted; bez CMP) — `docs/Analytics.md`
- [x] Stopka mobile: dwie linie wyśrodkowane (logo+© / Impressum·Privacy·Cookies); desktop bez zmian układu prawnego

---

## Faza 6 — QA / GSC

- [x] Lokalne lint/typecheck/build
- [ ] Google Search Console — weryfikacja + submit sitemap
- [ ] Lighthouse + formularz E2E na preview/prod
- [ ] Share preview: FB Debugger (wszystkie kluczowe URL z logo OG)

---

## Faza 7 — Launch

- [x] Domena + env prod (Brevo, Turnstile, `NEXT_PUBLIC_SITE_URL`, opcjonalnie FB App ID / GA Measurement ID)
- [ ] Smoke + LinkedIn

---

## Faza 8 — Backlog (po zgodzie)

- [ ] Canvas, Lyamo teaser, `/now`, ⌘K, CMS…
- [ ] Pełne case study Lyamo + AI Document (screeny, tech stack)

---

## Historia

| Data       | Zmiana                                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08-05 | MVP dark UI + sidebar                                                                                                                   |
| 2026-08-06 | GitHub + naprawa embedded `website/`                                                                                                    |
| 2026-08-06 | Spłaszczenie: app w rootcie, docs w `docs/`, katalog lokalny `my-business-card`                                                         |
| 2026-08-06 | Toast (Sonner) + loader na submit; i18n hardkodów; rate limit `/api/contact`; `.cursorrules`; CI workflow                               |
| 2026-08-06 | Mobile nav: bottom tabs + top bar (avatar/język); globe w LanguageSwitcher; landing fill-screen                                         |
| 2026-08-07 | Avatar lightbox (mobile + desktop)                                                                                                      |
| 2026-08-07 | CV online `/path`: pełna treść, certyfikaty + modal, redakcja PESEL na dyplomie, Tailwind v4 cleanup                                    |
| 2026-08-08 | Logo PK: favicon, lockup pod avatarem (sidebar + mobile), mark w stopce; `docs/Brand_Logo.md`                                           |
| 2026-08-08 | Sidebar: lockup side (PK + 3 linie tekstu obok); asset `ui-lockup-side.png`                                                             |
| 2026-08-08 | Mniejsze logo sidebar; stopka = wys. LanguageSwitcher (`--site-footer-h`); Kontakt bez scrollbara                                       |
| 2026-08-08 | Stopka/sidebar flush w jednej linii; Home/Kontakt bez scrollbara okna; wyśrodkowany język i tekst stopki                                |
| 2026-08-08 | Impressum (§ 5 DDG) + rozbudowana privacy (Brevo/Vercel Analytics); stopka: Impressum · Privacy                                         |
| 2026-08-08 | Cookies: NEXT_LOCALE + pk_cookie_consent, banner zgody, Analytics dopiero po Accept all                                                 |
| 2026-08-08 | Stopka mobile: 2 linie wyśrodkowane; docs `Legal_and_Cookies.md` + update Brand_Logo / checklist                                        |
| 2026-08-08 | Brevo zamiast Resend: HTML inbox + auto-reply; publiczny email `kontakt@piotrkulbacki.com`                                              |
| 2026-08-08 | Domena `piotrkulbacki.com` na Vercel; Turnstile; toast sukcesu skrócony; logo maila z domeny                                            |
| 2026-08-08 | SEO: OG logo na wszystkich URL, robots/sitemap+hreflang, `fb:app_id`; AI Document zamiast brand-site; Lyamo → `lyamo.eu`; `docs/SEO.md` |
| 2026-08-08 | GA4: `@next/third-parties/google` w root layout (prod + zgoda cookies); privacy i18n 5 locale                                           |
| 2026-08-08 | Google Consent Mode v2: default denied → analytics_storage granted po Accept; ads denied; bez CMP                                       |
| 2026-08-08 | Docs: `docs/Analytics.md`; update Legal / DEPLOY / README / SEO / checklist                                                             |
