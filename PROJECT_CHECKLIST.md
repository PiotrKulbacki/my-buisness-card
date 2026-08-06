# Personal Brand Website — Checklista realizacji

**Marka:** Piotr Kulbacki · **Produkt:** Lyamo  
**Stack:** Next.js (App Router) + TypeScript + Tailwind + Motion + next-intl · **Hosting:** Vercel  
**Workflow:** zgłoś postęp (np. „zrobione: zakup domeny”) — checklista zostanie zaktualizowana.

**Legenda:** `[ ]` do zrobienia · `[x]` ukończone · `[~]` częściowo / wymaga Ciebie

---

## Faza 0 — Fundamenty biznesowe i ops

- [x] Utworzenie struktury projektu w workspace (`website/`)
- [x] Inicjalizacja repozytorium Git (lokalnie)
- [x] README + DEPLOY runbook
- [~] Utworzenie repo na GitHubie i push — **w trakcie (Twój krok)**
- [ ] Wybór i zakup domeny (propozycje: `piotrkulbacki.com` / `.dev` / `.pl`)
- [ ] Projekt na Vercel + podpięcie repo
- [ ] Konto Resend (lub Formspree) + API key w env
- [ ] Decyzja analytics: Vercel Analytics ± Plausible/Umami

**Notatki:** Kod MVP gotowy lokalnie. Najbliższy krok po utworzeniu repo: commit + push, potem Vercel preview.

---

## Faza 1 — Design system i brand

- [x] Kierunek wizualny: dark-only, precision editorial
- [x] Design tokens (CSS variables): kolory, typografia, spacing
- [x] Lewy sidebar (zamiast top header)
- [x] Avatar okrągły + soft-blend portret na landingu
- [x] Favicon / apple-touch (litera P)
- [x] `prefers-reduced-motion`
- [ ] Finalna decyzja fontów po podglądzie na produkcji (Syne + Geist)
- [ ] Finalne logo marki (obecnie bez monogramu w sidebarze — avatar + imię)

---

## Faza 2 — Scaffold aplikacji

- [x] Next.js App Router + TypeScript + ESLint
- [x] Tailwind CSS v4
- [x] next-intl: pl, en, de, es, uk + fallback `en`
- [x] Routing IA: `/` landing, `/about`, `/projects`, `/projects/[slug]`, `/path`, `/contact`, `/privacy`
- [x] Layout: lewy sidebar + język + stopka
- [x] Path aliases `@/*`
- [x] Centralny config (`src/config/site.ts`)
- [x] `middleware` → `proxy.ts` (Next.js 16)

---

## Faza 3 — Treści i dane

- [x] Słowniki i18n (pl/en/de/es/uk)
- [x] Projekty w typed JSON (Lyamo + przykładowe case studies)
- [x] Dane CV / Ścieżka w JSON
- [x] Config kontaktu: email `it.piotr.kulbacki@gmail.com`
- [x] Social: LinkedIn (`it-piotr-kulbacki`), GitHub (`PiotrKulbacki` repos)
- [x] Portret landing + avatar sidebar (pliki w `public/`)
- [x] Stack tech: TypeScript, Next.js, Expo, Node, PostgreSQL, Supabase, Stripe, REST APIs, Tailwind, i18n, AI, Git/GitHub, Vercel
- [ ] Podmiana placeholder copy na finalne teksty autorskie
- [ ] Realne screenshoty / assety projektów (zamiast gradientów)
- [ ] Uzupełnienie pełnego CV (daty, firmy, osiągnięcia)
- [ ] Realne URL Facebook / Instagram / YouTube (obecnie placeholdery)

---

## Faza 4 — Strony i UX

- [x] Landing: powitanie, rola, social, portret z blendem
- [x] Kim jestem: bio, co buduję, technologie
- [x] Projekty: lista + filtry (Wszystkie / Strony / Aplikacje) + detail
- [x] Ścieżka (CV)
- [x] Kontakt + formularz
- [x] Normalny kursor systemowy (bez custom cursor)
- [x] Hover na kartach projektów, page transitions, scroll reveals
- [ ] P1: text scramble / Lenis (opcjonalnie, po launchu)

---

## Faza 5 — Formularz, prawne, SEO tech

- [x] API `/api/contact` (Resend) + honeypot
- [x] Strona privacy + linki w stopce (prywatność / dane osobowe)
- [x] `robots.txt`, `sitemap.xml`, metadata, JSON-LD
- [ ] Ocena potrzeby `/imprint` (DE/AT)
- [ ] Finalny tekst polityki prywatności (jeśli wymagane prawnie)

---

## Faza 6 — Analityka, Search Console, QA

- [x] Vercel Analytics w layoutcie
- [x] Skrypty QA lokalne: lint, typecheck, build, format
- [ ] Google Search Console + weryfikacja domeny
- [ ] Lighthouse na URL preview/produkcja
- [ ] Smoke a11y + 5 locale + formularz E2E z Resend

---

## Faza 7 — Launch

- [ ] Commit + push na GitHub
- [ ] Deploy Vercel (preview, potem produkcja)
- [ ] DNS domeny → Vercel
- [ ] Env produkcyjne (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`)
- [ ] Smoke test produkcja
- [ ] Ogłoszenie (LinkedIn)

---

## Faza 8 — Backlog (tylko po osobnej zgodzie)

- [ ] Interactive project canvas / bento
- [ ] Live Lyamo teaser
- [ ] Strona `/now`
- [ ] Dynamiczne OG images
- [ ] Command palette ⌘K
- [ ] Efekty P2/P3
- [ ] CMS / blog

---

## Historia aktualizacji

| Data | Zmiana |
|------|--------|
| 2026-08-05 | Scaffold MVP + i18n + SEO + contact API |
| 2026-08-05 | Dark-only, landing, sidebar IA, proxy, email, social, zdjęcia |
| 2026-08-06 | Checklista zsynchronizowana ze stanem UI; GitHub ikona → [PiotrKulbacki repos](https://github.com/PiotrKulbacki?tab=repositories); Faza 0: repo GitHub w trakcie |
