# SEO — wizytówka Piotr Kulbacki

Status: wdrożone (canonical, hreflang, robots, sitemap, wspólny OG image, opcjonalny `fb:app_id`).

Analityka (poza SEO tech, ale często weryfikowana razem z GSC): `docs/Analytics.md`.

---

## Pliki

| Rola                        | Ścieżka                                      |
| --------------------------- | -------------------------------------------- |
| Helpery URL + lista tras    | `src/lib/seo.ts`                             |
| Metadata layout (title, OG) | `src/app/[locale]/layout.tsx`                |
| Metadata stron              | `buildPageMetadata()` w każdej `page.tsx`    |
| OG / Twitter image          | `public/og.jpg` (kanoniczny URL share)       |
| Generator karty OG          | `src/app/[locale]/opengraph-image.tsx`       |
| Alias Twitter               | `src/app/[locale]/twitter-image.tsx`         |
| `robots.txt`                | `src/app/robots.ts` → `/robots.txt`          |
| `sitemap.xml`               | `src/app/sitemap.ts` → `/sitemap.xml`        |
| Middleware (crawlerzy OG)   | `src/proxy.ts`                               |
| Logo w OG                   | `docs/Brand_Logo.md` → `lockupHorizontal`    |
| JSON-LD (osoba, firma)      | `src/components/seo/JsonLd.tsx`              |
| IndexNow (klucz, skrypt)    | `public/<klucz>.txt`, `scripts/indexnow.mjs` |

---

## Canonical + hreflang

Każda strona: `alternates.canonical` + `languages` dla `pl` / `en` / `de` / `es` / `uk` oraz `x-default` → **EN** (`routing.defaultLocale`).

Ścieżki bez locale: `""`, `/about`, `/services`, `/projects`, `/path`, `/contact`, `/contact/brief`, `/privacy`, `/impressum`, `/agb`, `/widerruf`, `/projects/<slug>`.

---

## Open Graph / Twitter

- **Jedna grafika** dla wszystkich publicznych URL: `https://piotrkulbacki.com/og.jpg` (1200×630, JPEG ok. 110 KB: logo, stanowisko i portret z prawej). PNG ze zdjęciem ma ok. 575 KB, a WhatsApp pomija ciężkie podglądy (ok. 300 KB). WhatsApp wymaga rozszerzenia `.png` / `.jpg` — dynamiczny `/{locale}/opengraph-image` bez rozszerzenia nie wystarcza.
- `brandShareImage()` w `seo.ts` wstawia jawne `og:image` / `twitter:images` — bez tego podstrony nadpisywały `openGraph` i Facebook brał losowy obraz ze strony (np. portret na `/about`).
- `src/proxy.ts`: crawlerzy share (WhatsApp, `facebookexternalhit`, …) dostają **rewrite** na locale (bez 307 na `/`) i **bez** cookie `NEXT_LOCALE`.
- Opcjonalnie: `NEXT_PUBLIC_FACEBOOK_APP_ID` → meta `fb:app_id` (Sharing Debugger). App może zostać w Development; Live nie jest wymagane do share preview.
- Po zmianie OG: Facebook Sharing Debugger → **Scrape Again**. Potem wklej w WhatsApp **nową** wiadomość (stary czat może trzymać cache). Po zmianie generatora odśwież `public/og.jpg`: `next build`, `next start`, pobierz `/en/opengraph-image` i zapisz jako JPEG (`sips -s format jpeg -s formatOptions 82 og.png --out public/og.jpg`).

Test: Debugger FB / LinkedIn Post Inspector / View Source (`og:title`, `og:image` → `/og.jpg`).

---

## robots.txt

- `Allow: /`
- `Disallow: /api/`, `/*/reply` (strona odpowiedzi z szablonu, link z tokenem HMAC z maila)
- `Host` + `Sitemap: https://piotrkulbacki.com/sitemap.xml`

---

## sitemap.xml

Źródło tras i dat: `getIndexableRoutes()` w `seo.ts`. Każda trasa ma ręcznie ustawione `lastModified` (ISO 8601 z czasem) = data ostatniej istotnej zmiany treści, danych strukturalnych lub linków. Bez `changefreq` i `priority` (Google i Bing je ignorują; standard, sekcja 8.2). **Przy istotnej zmianie strony zaktualizuj jej datę w `seo.ts`**; nie ustawiać czasu generowania mapy.

| Grupa        | Ścieżki (bez locale)                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| Główne       | `""`, `/about`, `/services`, `/projects`, `/path`, `/contact`, `/contact/brief`                          |
| Case studies | `/projects/cavunio`, `lyamo`, `dokiero`, `wc26-predictor`, `ak-gebaeudeservice`, `movieweb`, `sportclub` |
| Prawne       | `/privacy`, `/impressum`, `/agb`, `/widerruf`                                                            |

**Łącznie:** (11 stron + 7 case studies) × 5 locale = **90 URL**.  
Każdy `<url>` ma `xhtml:link` hreflang (jak metadata stron).

Strony prawne **są** indeksowane. Nie blokować ich w robots.

GSC: po deployu wyślij ponownie `https://piotrkulbacki.com/sitemap.xml` — `docs/DEPLOY.md`.

---

## IndexNow

Bing, Yandex, Seznam, Naver, Yep i inni (Google nie uczestniczy). Klucz jest publiczny z definicji: `public/d450f943222b72c9f0463a9644ad5187.txt`, ten sam w `scripts/indexnow.mjs`. Po wdrożeniu produkcji, ręcznie:

```bash
node scripts/indexnow.mjs                                   # wszystkie adresy z sitemap.xml
node scripts/indexnow.mjs https://piotrkulbacki.com/de/services   # tylko wybrane
```

Odpowiedź 200 lub 202 = przyjęte.

---

## Favicon w Google Search

Mała ikona PK obok URL w SERP pochodzi z `<link rel="icon">` na stronie głównej hosta — **nie** z JSON-LD.

Wymogi Google (Search Central): kwadrat, min. 8×8 (zalecane **> 48×48**), crawlable dla Googlebot + Googlebot-Image, **stabilny URL**. Recrawl: od kilku dni do kilku tygodni. Po deployu: GSC → URL Inspection na `https://piotrkulbacki.com/en` (i `/pl`) → Request indexing.

Pierwsza ikona w HTML: `/brand/google-120.png`. Dalej 192 / 96 / 48 / 32 PNG i ICO — downscale z `05-icon-filled-master.png`, bez SVG (stary SVG wyglądał w zakładce jak „R”). Nie używać file-based `src/app/favicon.ico` (hash w query psuje stabilność).

---

## JSON-LD

Wspólny standard czterech stron: `~/Developer/ebook-shop/docs/seo-encje.md` (formaty 1.1, szablon 5.1, firma lokalna 13.3). Tu tylko to, jak jest wdrożony. Kod: `src/components/seo/JsonLd.tsx`; dane: `siteConfig.identity`, `siteConfig.brands`, `siteConfig.business` (`src/config/site.ts`); opis osoby, `jobTitle` i `knowsAbout`: `messages/*.json` → `person` (to samo źródło dla hero, „Kim jestem”, meta i JSON-LD).

**Strona główna** (`HomeJsonLd`, `/{locale}`), jeden `@graph`:

- `ProfilePage` - `@id` = URL wersji + `#profile` (np. `https://piotrkulbacki.com/pl#profile`), `inLanguage`, `dateCreated` (`identity.profileCreated`), `dateModified` = `lastModified` strony głównej z `getIndexableRoutes()`, `mainEntity` → osoba, `isPartOf` → `#website`
- `Person` - `@id` `https://piotrkulbacki.com/#person` (wspólne z cavunio.com, dokiero.com, lyamo.eu; **nie zmieniać**), `url` `https://piotrkulbacki.com/`, `description` / `jobTitle` / `knowsAbout` w języku wersji, `knowsLanguage` `pl, de, en`, `homeLocation` Berlin, `brand` → Cavunio (`OnlineStore`), Dokiero i Lyamo (`OnlineBusiness`), `sameAs` = `siteConfig.social`
- `WebSite` - `@id` `https://piotrkulbacki.com/#website`, `url` `https://piotrkulbacki.com/`, `inLanguage` = 5 języków, `publisher` → osoba
- krótkie odwołanie do `LocalBusiness` `#business` (hero linkuje do Usług)

**Usługi** (`ServicesJsonLd`, `/{locale}/services`): `LocalBusiness` `https://piotrkulbacki.com/#business`, `name` „Piotr Kulbacki” (jak wizytówka Google), adres bez ulicy (Berlin, DE), `telephone` `+49 1573 5166871`, `areaServed` Berlin + Brandenburg, `hasOfferCatalog` = 3 grupy usług widoczne na stronie (w języku wersji), `founder` → osoba, `sameAs` → stały adres wizytówki (`cid`). Bez ocen i godzin. `url` to zawsze `https://piotrkulbacki.com/de/services` (strona, na którą prowadzi wizytówka), w każdej wersji językowej, żeby jedno `@id` miało jeden `url` **(wniosek)**.

Telefon jest widoczny tylko na podstronie Usługi (decyzja właściciela 2026-11-26); reszta strony bez telefonu.

Bez węzła `Organization` (jednoosobowa działalność bez nazwy firmy). Treść skryptu: `<` → `\u003c`.

Test: [Rich Results Test](https://search.google.com/test/rich-results) (`/pl`, `/de/services`), [Schema Markup Validator](https://validator.schema.org/) dla całego grafu; szybki test zgodności czterech stron: standard, sekcja 11.

---

## Produkty w portfolio (live)

| Slug                 | Live URL                                       | Uwagi                                            |
| -------------------- | ---------------------------------------------- | ------------------------------------------------ |
| `cavunio`            | `https://cavunio.com/`                         | Własny sklep z ebookami; screeny OK              |
| `lyamo`              | `https://lyamo.eu/`                            | Flagowiec; screeny OK w `public/projects/lyamo/` |
| `dokiero`            | `https://dokiero.com/`                         | Flagowiec; screeny w `public/projects/dokiero/`  |
| `wc26-predictor`     | `https://wc26-predictor-zapraszam.vercel.app/` | Typer MŚ 2026; screeny OK                        |
| `ak-gebaeudeservice` | `https://www.akgebaeudeservice.com/`           | Screeny OK                                       |

Linki marek: `siteConfig.brands`.
