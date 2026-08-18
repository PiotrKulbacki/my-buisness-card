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

Ikony tylko z `public/` (stabilne URL). **Nie** kłaść `favicon.ico` / `icon.png` / `apple-icon.png` w `src/app/` — Next.js dokleja wtedy hash (`?favicon.…`), a Google wymaga stałego adresu.

| Plik                          | Rozmiar / rola                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `public/brand/google-120.png` | Kanoniczny znak PK (120×120) — pierwsza ikona w `<head>` + `Organization.logo` |
| `public/favicon-192.png`      | 192×192, ten sam znak (downscale z `05-icon-filled-master.png`)                |
| `public/favicon-96.png`       | 96×96                                                                          |
| `public/favicon-48.png`       | 48×48                                                                          |
| `public/favicon-32.png`       | 32×32 (zakładka przeglądarki)                                                  |
| `public/favicon.ico`          | Klasyczny `.ico` (16 / 32 / 48)                                                |
| `public/apple-touch-icon.png` | Apple touch 180×180                                                            |

Bez SVG — poprzedni `favicon.svg` był uproszczoną literą (w zakładce wyglądało jak „R”), nie monogramem PK.

Metadata ikon: `generateMetadata` w `src/app/[locale]/layout.tsx` (kolejność: google-120 → 192 → 96 → 48 → 32 → ICO).

---

## Mastery (pełne plansze / źródła)

W `public/brand/` zostają też mastery (`01-mark-only.png`, `02-…`, `03-…`, `04-icon-outline-master.png`, `05-icon-filled-master.png`, `06-lockup-side.png`, avatary social, `google-120.png`). Do UI strony używaj wyłącznie plików `ui-*`.

---

## Mapa w layoutcie

| Miejsce                        | Asset                                                                                                                                               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desktop sidebar (pod avatarem) | `lockupSide`                                                                                                                                        |
| Mobile top bar                 | `lockupHorizontal`                                                                                                                                  |
| Maile Brevo (nagłówek)         | `lockupHorizontal` z `https://piotrkulbacki.com/brand/…`                                                                                            |
| Open Graph / Twitter card      | `lockupHorizontal` w `opengraph-image.tsx`; wymuszane na **wszystkich** URL przez `brandShareImage()` w `src/lib/seo.ts` (szczegóły: `docs/SEO.md`) |
| Footer (przy ©)                | `mark` (wys. `h-4`)                                                                                                                                 |
| Zakładka przeglądarki / SERP   | `google-120.png` + PNG 192/96/48/32 + ICO (ten sam znak PK, bez SVG)                                                                                |
| JSON-LD Organization.logo      | `google-120.png`                                                                                                                                    |
| JSON-LD Person.image           | `portrait.png`                                                                                                                                      |

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
