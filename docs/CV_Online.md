# Dokumentacja sekcji CV (online)

**Strona:** Piotr Kulbacki — Personal Brand Website  
**Sekcja:** `/path` (nawigacja: mobile **CV**, desktop **Doświadczenie**)  
**Język dokumentacji:** PL  
**Treści na stronie:** pl, en, de, es, uk  
**Status:** wdrożone (2026-08-07) — pełne CV online z plikami certyfikatów

---

## Cel

Sekcja CV online ma przedstawiać Piotra Kulbackiego jako **Full Stack Software Engineera**, twórcę produktów własnych (SaaS / AI) oraz realizatora komercyjnych stron i aplikacji — w formie spójnej z marką osobistą, czytelniejszej niż klasyczne PDF CV.

Nie jest to kopia pliku PDF 1:1. PDF jest źródłem faktów (role, daty, certyfikaty, języki). Układ, copy i stack są dopasowane do aktualnego profilu produktowego.

---

## Stan wdrożenia (co zrobiliśmy)

| Obszar                                   | Status | Uwagi                                                                                       |
| ---------------------------------------- | ------ | ------------------------------------------------------------------------------------------- |
| Spec + content `cv.ts` + i18n (5 locale) | ✅     | Namespace `path.*`, `nav.path` / `nav.pathMobile`                                           |
| UI `/path` (`CvPage`)                    | ✅     | Summary, skills, soft skills, projekty-skrót, doświadczenie, edukacja, certyfikaty, języki  |
| Nawigacja CV / Doświadczenie             | ✅     | Mobile = CV, desktop = Doświadczenie (+ locale)                                             |
| Telefon click-to-reveal                  | ✅     | `PhoneReveal` (Base64, odkodowanie po kliknięciu)                                           |
| Social pod lokalizacją                   | ✅     | Ikony LinkedIn + GitHub (`SocialLinks`), bez tekstowych URL                                 |
| Certyfikaty — modal podglądu             | ✅     | `CertificatesList`: PDF iframe / obraz; fallback „otwórz w nowej karcie”                    |
| Pliki w `public/certificates/`           | ✅     | PDF + skany dyplomu; Git/GitHub (Udemy) — bez pliku na razie (świadomie odłożone)           |
| Redakcja PII na dyplomie                 | ✅     | PESEL, data/miejsce urodzenia, numery dyplomu/suplementów zamazane na PNG                   |
| Tailwind v4 klasy                        | ✅     | Tokeny `border-line`, `bg-bg/95`, `text-accent`…; `font: inherit` na button w `@layer base` |
| Eyebrow „CV” / „Wprowadzenie”            | ✅     | Usunięte z hero CV i About                                                                  |

---

## Zakres (co jest w CV, a co nie)

| W sekcji CV                               | Poza zakresem (osobna zakładka Projekty) |
| ----------------------------------------- | ---------------------------------------- |
| Podsumowanie zawodowe                     | Case study, galerie, długie opisy        |
| Stack pogrupowany + soft skills           | Pełne prezentacje projektów              |
| Krótkie wzmianki o projektach             | Screenshoty, filtry, szczegóły UX        |
| Doświadczenie (IT + poza IT)              |                                          |
| Edukacja (Masterschool + ZAL + Technikum) |                                          |
| Certyfikaty + lokalne pliki / podgląd     |                                          |
| Języki (poziomy jak w PDF)                |                                          |
| Kontakt (email, telefon z reveal, social) | Pobieranie PDF — **nie**                 |

URL trasy: **`/path`** (bez zmiany slugów).

---

## Nawigacja i naming

| Kontekst          | PL            | EN         | DE        | ES          | UK     |
| ----------------- | ------------- | ---------- | --------- | ----------- | ------ |
| Mobile (tab bar)  | CV            | CV         | CV        | CV          | CV     |
| Desktop (sidebar) | Doświadczenie | Experience | Erfahrung | Experiencia | Досвід |
| Tytuł H1 strony   | Doświadczenie | Experience | Erfahrung | Experiencia | Досвід |

Klucze i18n: `nav.path` (desktop), `nav.pathMobile` (mobile), namespace `path.*` dla treści strony.

---

## Struktura strony (wdrożona)

Kolejność sekcji:

1. **Hero** — H1, lead, email, telefon (reveal), Berlin · Remote, ikony LinkedIn/GitHub
2. **Podsumowanie zawodowe**
3. **Umiejętności techniczne** — grupy; nagłówki grup w kolorze `text-accent`
4. **Soft skills**
5. **Projekty (skrót)** — z badge kursu i linkiem Live
6. **Doświadczenie** — daty w jednej linii z firmą (prawo)
7. **Edukacja**
8. **Certyfikaty** — lista + „Zobacz certyfikat” (`text-[10px]`) → modal
9. **Języki**

Bez przycisku „Pobierz CV”. Bez eyebrow nad H1.

---

## Kontakt i telefon (anti-spam)

- Email — widoczny (`mailto:`).
- LinkedIn / GitHub — **ikony** pod lokalizacją (nie tekstowe linki).
- Telefon: domyślnie zamazany + CTA „Pokaż numer”; po kliknięciu pełny numer + `tel:`.
- Numer nie jest plain-textem w pierwszym HTML (Base64 + odkodowanie po interakcji).

**Ocena ochrony:** click-to-reveal utrudnia proste boty scrapujące HTML bez JS. **Nie chroni** przed headless browserami. Główna ochrona spamu formularza: rate limiting + honeypot.

Telefon (źródło PDF): `+49 1573 5166871`.

---

## Podsumowanie zawodowe (kierunek copy)

Wdrożone summary podkreśla:

- budowę kompletnych aplikacji webowych end-to-end,
- produkty własne SaaS / AI,
- realizacje komercyjne,
- jakość kodu (TDD, Zod, Vitest) i wdrożenia produkcyjne.

---

## Stack — grupy

Źródła: PDF + aktualna praktyka (Lyamo, AI Document, strony klientów, wizytówka).

### Frontend

Next.js, React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, React Native / Expo

### Backend & dane

Node.js, Supabase, PostgreSQL, Prisma, REST API, Authentication, RLS, Python, Flask, SQLite

### AI

OpenAI API, AI-powered apps, Prompt engineering, AI document processing

### Płatności

Stripe, Stripe Checkout, Stripe Webhooks

### Jakość & DX

TDD, Vitest, React Testing Library, Zod, React Hook Form, Git / GitHub

### Deployment & ops

Vercel, Docker, Domains & hosting

### Produkt & web

Responsive design, SEO, i18n, App architecture, SaaS product design, Performance

### Soft skills (z PDF)

Problem-solving, Collaboration & Teamwork, Communication, Quickly adapts to new technologies, Adaptability & Fast Learning, Self-Motivation & Initiative, Critical Thinking, Attention to Detail

_(Etykiety przetłumaczone w 5 locale; techniczne nazwy stacku po angielsku.)_

---

## Projekty w CV (tylko wzmianki)

Szczegóły → zakładka **Projekty**. Tu: nazwa, 1–2 zdania, opcjonalnie live URL, badge kursu.

1. **MovieWeb App** — badge: podczas kursu programowania
2. **Sport Club PowerPlay** — badge: podczas kursu programowania
3. **Lyamo** — `https://lyamo.eu/`
4. **AI Document** — `https://aidocument.eu/pl`
5. **AK Gebäudeservice** — `https://www.akgebaeudeservice.com/`
6. **WC26 Predictor** — `https://wc26-predictor-zapraszam.vercel.app/`

---

## Doświadczenie (kolejność: najnowsze najpierw)

### 1. Inżynier oprogramowania — działalność gospodarcza

**2025 — obecnie** · Własna działalność  
Rozwój jako Full Stack SE; produkty cyfrowe i realizacje dla klientów; aplikacje end-to-end.

> Lyamo **nie** jest osobną pozycją doświadczenia — produkt pojawia się w projektach-skrótach.

### 2. webeet.io — Web developer (staż)

**sie 2025 — wrz 2025** · Remote  
Moduły frontend (React, TypeScript), TDD, Vitest + RTL, Zod, refaktoryzacja testów.

### 3. Masterschool — Kurs programowania (Software Engineering Bootcamp)

**lip 2024 — wrz 2025** · 100% online (14 miesięcy)  
Bootcamp: Python, Java, Git, bazy, HTML/CSS, Agile, projekty.

### 4. Elpron GmbH — Technical Associate

**lip 2016 — lip 2024** · Berlin-Brandenburg  
Logistyka materiałów, instalacje, utrzymanie, mentoring, compliance.

### 5. ZAL Berlin Brandenburg — Electrical Assistant

**wrz 2015 — mar 2016** · Berlin  
Systemy sterowania, diagnostyka DC/AC.

### 6. Własna działalność — remonty mieszkań

**2012 — 2014**

### 7. LM Wind Power — produkcja

**2010 — 2012**

### 8. Remonty mieszkań

**2008 — 2010**

---

## Edukacja

1. **Masterschool — Software Engineering** · lip 2024 — wrz 2025 (+ blurb o sieci szkół)
2. **ZAL — Pomocnik elektryka** · wrz 2015 — mar 2016 (Umschulung)
3. **Technikum Łączności — Technik usług pocztowych i telekomunikacyjnych** · wrz 2004 — maj 2008  
   Detail: sieci, infrastruktura IT, struktura poczty, komunikacja i dokumentacja.

---

## Certyfikaty

| #   | Tytuł                                                 | Okres               | Plik(i) w `public/certificates/`                                                      |
| --- | ----------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| 1   | Web developer (staż)                                  | sie–wrz 2025        | `internship-webeet.pdf`                                                               |
| 2   | SE — tworzenie aplikacji webowych                     | lip 2024 – wrz 2025 | `software-engineering-web-development.pdf`                                            |
| 3   | Nauka React (Scrimba)                                 | cze 2025            | `learn-react.pdf`                                                                     |
| 4   | Intro to AI Engineering (Scrimba)                     | cze 2025            | `intro-to-ai-engineering.pdf`                                                         |
| 5   | Nauka HTML i CSS (Scrimba)                            | sie 2025            | `learn-html-and-css.pdf`                                                              |
| 6   | Introduction to Git and GitHub (Udemy)                | paź 2022            | bez pliku na razie (tylko wpis na liście)                                             |
| 7   | JavaScript od A do Z (Udemy)                          | wrz 2022            | `javascript-complete-en.pdf`                                                          |
| 8   | Front-end zaawansowany w 15 dni (Udemy)               | cze 2022            | `piotr-kulbacki-pl.pdf`                                                               |
| 9   | Web developer od podstaw w 15 dni (Udemy)             | cze 2022            | `piotr-kulbacki-en.pdf`                                                               |
| 10  | Umschulung — pomocnik elektryka (ZAL)                 | wrz 2015 – mar 2016 | `umschulung-1.pdf`, `umschulung-2.pdf`                                                |
| 11  | Dyplom technik usług pocztowych i telekomunikacyjnych | sie 2008            | `diploma-technik-uslug.png`, `diploma-supplement-pl.png`, `diploma-supplement-en.png` |

### Redakcja danych wrażliwych (dyplom)

Na skanach dyplomu i suplementów w `public/` zamazano:

- PESEL, data i miejsce urodzenia,
- numery dyplomu / suplementów (`T/60029574/08` itd.).

Oryginały bez redakcji **nie** trafiają do `public/` (tylko lokalne assety Cursor / prywatne archiwum).

---

## Języki

| Język     | Poziom |
| --------- | ------ |
| Polski    | Native |
| Niemiecki | C1     |
| Angielski | A2     |

Poziom angielskiego **bez zmiany** względem PDF.

---

## UX / UI

- Spójność z dark theme, Syne + Geist, tokenami `@theme`.
- Motion: `Reveal` + modal Framer Motion; `prefers-reduced-motion`.
- Daty doświadczenia w jednej linii z firmą (prawo).
- Nagłówki grup skilli: `text-accent`.
- Linki „Zobacz certyfikat”: `text-[10px]` (mniejsze niż metadata `text-xs`).
- i18n: zakaz hardkodu UI; treści w `src/content/cv.ts` + `messages/*.json`.

### Tailwind v4 (reguła projektu)

- Tokeny z `@theme`: `border-line`, `text-fg-muted`, `bg-bg`, `bg-bg/95` — **nie** `bg-[var(--bg)]`.
- Zmienne poza theme: `w-(--sidebar-w)`, `shadow-(--shadow)`, `md:pl-(--sidebar-w)`.
- `z-100` zamiast `z-[100]`.
- Reguły `button { font: inherit }` muszą być w `@layer base`, inaczej nadpisują utility `text-*`.

---

## SEO

- Title / description z namespace `path` (locale).
- Bez osobnego PDF download.
- Structured data ProfilePage: opcjonalnie później.

---

## Pliki implementacyjne

| Plik                                       | Rola                              |
| ------------------------------------------ | --------------------------------- |
| `src/content/cv.ts`                        | Dane CV                           |
| `src/app/[locale]/path/page.tsx`           | Strona sekcji                     |
| `src/components/path/CvPage.tsx`           | Layout treści                     |
| `src/components/path/PhoneReveal.tsx`      | Telefon reveal                    |
| `src/components/path/CertificatesList.tsx` | Lista + modal certyfikatów        |
| `src/components/layout/Sidebar.tsx`        | `path` / `pathMobile`             |
| `src/components/ui/SocialLinks.tsx`        | Ikony social                      |
| `messages/{pl,en,de,es,uk}.json`           | Copy UI                           |
| `public/certificates/*`                    | PDF i skany (zredagowane)         |
| `src/app/globals.css`                      | Tokeny + `@layer base` dla button |

---

## Poza zakresem / backlog CV

- PDF Git/GitHub (Udemy) — gdy będzie dostępny: dodać do `public/certificates/` + `fileUrls`.
- Rozbudowa zakładki Projekty (galerie, case studies).
- Zmiana URL z `/path`.
- Pobieranie PDF CV.
- Structured data ProfilePage.

---

## Kryteria akceptacji

- [x] Mobile: etykieta **CV**; desktop: **Doświadczenie** (i odpowiedniki locale)
- [x] Trasa `/path` działa we wszystkich 5 językach
- [x] Widoczne: summary, stack grupowany, soft skills, 6 projektów (+ badge kursu), doświadczenie (w tym DG + poza IT), edukacja (3 pozycje), certyfikaty z podglądem, języki
- [x] Telefon zamazany → „Pokaż numer”
- [x] Brak download PDF CV
- [x] Certyfikaty lokalne + modal; PII na dyplomie zredagowane
- [x] Klasy Tailwind v4 zgodne z IntelliSense (m.in. `bg-bg`, `z-100`)
- [x] `format:check`, `lint`, `typecheck`, `build` — zielone (2026-08-07); PDF Git/GitHub odłożony świadomie
