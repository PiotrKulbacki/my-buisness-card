# Brand logo — Piotr Kulbacki

**Strona:** personal brand / wizytówka online  
**Assety runtime:** `public/brand/`  
**Komponent:** `src/components/brand/BrandLogo.tsx`  
**Konfiguracja ścieżek:** `siteConfig.brand` w `src/config/site.ts`  
**Status:** wdrożone (2026-08-08)

---

## Cel

Identyfikacja wizualna marki osobistej (monogram **PK** + wordmark) spójna z dark UI i akcentem `#c8f542`. Logo zastępuje tekstowe imię/rolę w sidebarze i pojawia się w stopce oraz jako favicon.

---

## Warianty UI (przycięte, bez zbędnego czarnego paddingu)

| Plik                       | Wariant                                                                | Użycie                       |
| -------------------------- | ---------------------------------------------------------------------- | ---------------------------- |
| `ui-lockup-side.png`       | PK po lewej + Piotr / Kulbacki / Software Engineer (3 linie) po prawej | Desktop sidebar pod avatarem |
| `ui-lockup-stacked.png`    | PK nad tekstem (3 linie, wycentrowane)                                 | Master / zapas               |
| `ui-lockup-horizontal.png` | Monogram + „Piotr Kulbacki” w jednej linii                             | Mobile top bar obok avatara  |
| `ui-mark.png`              | Sam monogram PK                                                        | Stopka                       |

Komponent: `<BrandLogo variant="lockupSide" | "lockupStacked" | "lockupHorizontal" | "mark" />`.

---

## Favicon / ikony systemowe

| Plik                                                    | Rozmiar / rola              |
| ------------------------------------------------------- | --------------------------- |
| `src/app/icon.png`, `public/favicon-32.png`             | Favicon 32×32 (lime filled) |
| `public/favicon-48.png`                                 | 48×48                       |
| `src/app/favicon.ico`, `public/favicon.ico`             | Klasyczny `.ico`            |
| `src/app/apple-icon.png`, `public/apple-touch-icon.png` | Apple touch 180×180         |
| `public/favicon.svg`                                    | SVG fallback                |

Metadata ikon: `generateMetadata` w `src/app/[locale]/layout.tsx`.

---

## Mastery (pełne plansze / źródła)

W `public/brand/` zostają też mastery (`01-mark-only.png`, `02-…`, `03-…`, `04-icon-outline-master.png`, `05-icon-filled-master.png`, `06-lockup-side.png`, avatary social, `google-120.png`). Do UI strony używaj wyłącznie plików `ui-*`.

---

## Mapa w layoutcie

| Miejsce                        | Asset                                                    |
| ------------------------------ | -------------------------------------------------------- |
| Desktop sidebar (pod avatarem) | `lockupSide`                                             |
| Mobile top bar                 | `lockupHorizontal`                                       |
| Maile Brevo (nagłówek)         | `lockupHorizontal` z `https://piotrkulbacki.com/brand/…` |
| Footer (przy ©)                | `mark` (wys. `h-4`)                                      |
| Zakładka przeglądarki          | favicon / `icon.png`                                     |

Desktop sidebar: lockup side `max-w-40`. Stopka treści i pas LanguageSwitcher: wspólna wysokość `--site-footer-h` (3.25rem), oba flush do dołu viewportu (separatory w jednej linii). Desktop shell: `md:h-svh` — stopka zawsze na dole; Home / Kontakt bez scrollbara okna (`h-(--site-main-h)`).

**Stopka — układ:**

- Desktop: jeden rząd (logo + © | Impressum · Privacy · Cookies), `h-(--site-footer-h)`.
- Mobile: dwie linie wyśrodkowane (logo + ©; potem linki), wysokość auto + `py-3`.

Prawne / cookies: `docs/Legal_and_Cookies.md`.
Linki wokół logo: `href="/"` + `aria-label={siteConfig.name}`; obrazek z `decorative` (pusty `alt`), żeby uniknąć podwójnego odczytu nazwy.

---

## Uwagi

- „SOFTWARE ENGINEER” w lockupie side jest w kolorze accent `#c8f542` (czytelność na dark UI). Imię/nazwisko białe.
- Wordmark roli to element znaku (EN), nie osobny klucz i18n.
- To PNG (raster). Docelowo warto przerysować monogram do SVG pod idealną ostrość we wszystkich skalach.
- Nie mieszać z marką produktową **Lyamo**.
