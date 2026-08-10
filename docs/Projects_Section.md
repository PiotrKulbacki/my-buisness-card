# Sekcja Projekty — przewodnik dla agentów

Jak dodawać i utrzymywać projekty na stronie wizytówki. **Przed zmianami przeczytaj ten plik.**

## Pliki

| Rola                     | Ścieżka                                                           |
| ------------------------ | ----------------------------------------------------------------- |
| Dane projektów           | `src/content/projects.ts`                                         |
| Lista + filtry           | `src/components/projects/ProjectFilters.tsx`, `ProjectCard.tsx`   |
| Podstrona case study     | `src/app/[locale]/projects/[slug]/page.tsx` → `ProjectDetail.tsx` |
| Galeria + hover/mobile   | `src/components/projects/ProjectGallery.tsx`                      |
| Lightbox pełnego zdjęcia | `src/components/projects/ProjectImageLightbox.tsx`                |
| i18n UI                  | `messages/{pl,en,de,es,uk}.json` → namespace `projects`           |
| Screenshoty (runtime)    | `public/projects/<slug>/`                                         |
| Screenshoty (referencja) | `docs/assets/projects/<slug>/`                                    |

## Layout podstrony case study (`ProjectDetail`)

Kolejność (od góry):

1. **Wróć do projektów** + meta (`category · year`) + **tytuł** (+ badge kursu) + **summary** (1 zdanie).
2. **Cover** — jedno duże zdjęcie (`coverSrc`), klik → lightbox.
3. **Opis (`body`)** bezpośrednio pod coverem + sidebar tech/linki.
4. **Galeria** — dodatkowe screeny (bez powtórki covera).

Padding strony: kompaktowy u góry (`pt-4 md:pt-8`), żeby na desktopie cover mieścił się w pierwszym widoku razem z tytułem.

### Cover

- Plik zwykle `01-….png`; proporcje zbliżone do ~1050×674 (jak MovieWeb) lub 2× (~2100×1348).
- W UI: `max-w-3xl`, `max-h-[min(42dvh,26rem)]`, `object-contain`.
- **Native `<img>`** (nie `next/image`) — ostrość jak w lightboxie.
- **Nie duplikuj** tego samego pliku jako pierwszego kafelka galerii. Cover = tylko hero.

### Galeria

- `gallery[]` zaczyna się od kolejnych ekranów (`02-…`, `03-…`), **bez** `01` jeśli jest coverem.
- Kafelki: stały `aspect-4/3`; obraz **`object-contain`** na ciemnym tle (czytelny UI/tekst).
- **Native `<img>`** w kafelku i w lightboxie — bez `next/image`, bez CSS `scale` / 3D transform / Ken Burns na samym screenie (rozmazują litery). Motion wejścia może być na wrapperze figury, nie na bitmapie.
- Sibling dim + linia accent pod captionem — OK.
- Lightbox: pełny, nieprzycięty screen.

## Dodawanie nowego projektu (checklist)

1. **Assety:** `public/projects/<slug>/` + kopia w `docs/assets/projects/<slug>/`.
2. **Cover:** `coverSrc: "/projects/<slug>/01-….ext"` — ostry zrzut (desktop viewport, retina 2× jeśli możliwe). Przy animowanym logo odczekaj ~2 s przed zrzutem.
3. **Wpis w `projects.ts`:** `slug`, `category`, `year`, `tech[]`, opcjonalnie `liveUrl` / `repoUrl` / `courseProject` / `featured`.
4. **Teksty 5 locale:** `title`, `summary`, `body`, caption każdego kafelka — zawsze w języku widoku portfolio (`pl`/`en`/`de`/`es`/`uk`). Nawet jeśli strona klienta jest po niemiecku (lub innym języku), **nie kopiuj** etykiet UI klienta do innych locale (np. PL: „O nas”, nie „Über uns”; „Filozofia”, nie „Philosophie”). Nazwy własne marki / firmy mogą zostać.
5. **Galeria bez covera:** tylko dodatkowe widoki; małe modale można złożyć po 2 na jednym PNG.
6. **CV (opcjonalnie):** wzmianka w `src/content/cv.ts`.
7. **Checki:** `npx prettier --write .` → `npm run format:check` → `npm run lint` → `npm run typecheck` → `npm run build`.

## Jakość screenshotów

- Źródło min. ~1000 px szerokości (lepiej 2× viewport, np. 2880×1800 → downscale do ~2100).
- Unikaj zrzutów z telefonu / mocno skompresowanych podglądów (~400–500 px) — w kafelku i coverze wyglądają na „rozmazane”.
- Kompozyty (np. login|register): równa wysokość paneli, spójne tło, bez upscalingu małego źródła.

## Flagi treści

- `courseProject: true` → badge „Podczas kursu…”, zwykle bez `liveUrl` (`notLive`).
- `featured: true` → wyróżnienie (flagowiec: AI Document).
- Brak `liveUrl` → `projects.notLive`, nie pusty link.

## Aktualny katalog projektów (2026-08-09)

Kolejność na liście = kolejność w `projects[]`.

| Slug                 | Kategoria | Live                                           | Screeny                                |
| -------------------- | --------- | ---------------------------------------------- | -------------------------------------- |
| `ai-document`        | apps      | `https://aidocument.eu/`                       | OK w `public/projects/ai-document/`    |
| `lyamo`              | apps      | `https://lyamo.eu/`                            | OK w `public/projects/lyamo/`          |
| `wc26-predictor`     | websites  | `https://wc26-predictor-zapraszam.vercel.app/` | OK w `public/projects/wc26-predictor/` |
| `ak-gebaeudeservice` | websites  | `https://www.akgebaeudeservice.com/`           | OK                                     |
| `movieweb`           | apps      | — (kurs)                                       | OK                                     |
| `sportclub`          | apps      | — (kurs)                                       | OK                                     |

AI Document: cover `01-dashboard.png`, galeria `02`–`08` + `10`; PII (imię, e-mail, adres) — wyłącznie soft blur na tekście, bez czarnych/szarych prostokątów.

Sitemap case studies: `docs/SEO.md`.

## Konwencja nazw plików

```text
public/projects/<slug>/
  01-home.png          # cover only
  02-auth.png          # gallery…
  03-admin-dashboard.png
  …
```

Numeracja dwucyfrowa + krótka nazwa angielska. Ten sam układ w `docs/assets/projects/<slug>/`.

## Motion (nie zmieniaj bez zgody)

- **Wejście:** staggered opacity/y.
- **Desktop:** sibling dim, linia accent; **bez** parallax/scale na bitmapie screena UI.
- **Mobile:** focus przy scrollu na ramce; `prefers-reduced-motion`.
- Ken Burns (`.project-ken-burns`) — nie stosuj na coverze/galerii z czytelnym tekstem UI.

## Czego unikać

- Powtarzania covera w `gallery[]`.
- `next/image` + CSS `transform`/`scale`/`object-cover` na screenach z tekstem UI.
- Różnych wysokości kafelków (zawsze ramka `aspect-4/3`).
- Hardkodu PL/EN w komponentach.
- Trzymania jedynej kopii screenów poza repo.
