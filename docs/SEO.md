# SEO — wizytówka Piotr Kulbacki

Status: wdrożone (canonical, hreflang, robots, sitemap, wspólny OG image, opcjonalny `fb:app_id`).

Analityka (poza SEO tech, ale często weryfikowana razem z GSC): `docs/Analytics.md`.

---

## Pliki

| Rola                        | Ścieżka                                   |
| --------------------------- | ----------------------------------------- |
| Helpery URL + lista tras    | `src/lib/seo.ts`                          |
| Metadata layout (title, OG) | `src/app/[locale]/layout.tsx`             |
| Metadata stron              | `buildPageMetadata()` w każdej `page.tsx` |
| OG / Twitter image (logo)   | `public/og.png` (kanoniczny URL share)    |
| Generator karty OG          | `src/app/[locale]/opengraph-image.tsx`    |
| Alias Twitter               | `src/app/[locale]/twitter-image.tsx`      |
| `robots.txt`                | `src/app/robots.ts` → `/robots.txt`       |
| `sitemap.xml`               | `src/app/sitemap.ts` → `/sitemap.xml`     |
| Middleware (crawlerzy OG)   | `src/proxy.ts`                            |
| Logo w OG                   | `docs/Brand_Logo.md` → `lockupHorizontal` |
| JSON-LD (org + person)      | `src/components/seo/JsonLd.tsx`           |

---

## Canonical + hreflang

Każda strona: `alternates.canonical` + `languages` dla `pl` / `en` / `de` / `es` / `uk` oraz `x-default` → **EN** (`routing.defaultLocale`).

Ścieżki bez locale: `""`, `/about`, `/projects`, `/path`, `/contact`, `/contact/brief`, `/privacy`, `/impressum`, `/projects/<slug>`.

---

## Open Graph / Twitter

- **Jedna grafika** dla wszystkich publicznych URL: `https://piotrkulbacki.com/og.png` (1200×630, PNG, <100 KB). WhatsApp wymaga rozszerzenia `.png` / `.jpg` — dynamiczny `/{locale}/opengraph-image` bez rozszerzenia nie wystarcza.
- `brandShareImage()` w `seo.ts` wstawia jawne `og:image` / `twitter:images` — bez tego podstrony nadpisywały `openGraph` i Facebook brał losowy obraz ze strony (np. portret na `/about`).
- `src/proxy.ts`: crawlerzy share (WhatsApp, `facebookexternalhit`, …) dostają **rewrite** na locale (bez 307 na `/`) i **bez** cookie `NEXT_LOCALE`.
- Opcjonalnie: `NEXT_PUBLIC_FACEBOOK_APP_ID` → meta `fb:app_id` (Sharing Debugger). App może zostać w Development; Live nie jest wymagane do share preview.
- Po zmianie OG: Facebook Sharing Debugger → **Scrape Again**. Potem wklej w WhatsApp **nową** wiadomość (stary czat może trzymać cache). Po deployu generatora odśwież `public/og.png`.

Test: Debugger FB / LinkedIn Post Inspector / View Source (`og:title`, `og:image` → `/og.png`).

---

## robots.txt

- `Allow: /`
- `Disallow: /api/`
- `Host` + `Sitemap: https://piotrkulbacki.com/sitemap.xml`

---

## sitemap.xml

Źródło tras: `getIndexableRoutes()` w `seo.ts`.

| Grupa        | Ścieżki (bez locale)                                                                              | Priorytet (orientacyjnie) |
| ------------ | ------------------------------------------------------------------------------------------------- | ------------------------- |
| Home         | `""`                                                                                              | 1.0                       |
| Główne       | `/about`, `/projects`, `/path`, `/contact`, `/contact/brief`                                      | 0.6–0.9                   |
| Case studies | `/projects/ai-document`, `lyamo`, `wc26-predictor`, `ak-gebaeudeservice`, `movieweb`, `sportclub` | 0.7                       |
| Prawne       | `/privacy`, `/impressum`                                                                          | 0.3                       |

**Łącznie:** (8 stron nawigacji/prawnych/brief + 6 case studies) × 5 locale = **70 URL**.  
Każdy `<url>` ma `xhtml:link` hreflang (jak metadata stron).

Impressum i privacy **są** indeksowane (niższy priorytet).

GSC: po deployu wyślij ponownie `https://piotrkulbacki.com/sitemap.xml` — `docs/DEPLOY.md`.

---

## Favicon w Google Search

Mała ikona PK obok URL w SERP pochodzi z `<link rel="icon">` na stronie głównej hosta — **nie** z `Organization.logo`.

Wymogi Google (Search Central): kwadrat, min. 8×8 (zalecane **> 48×48**), crawlable dla Googlebot + Googlebot-Image, **stabilny URL**. Recrawl: od kilku dni do kilku tygodni. Po deployu: GSC → URL Inspection na `https://piotrkulbacki.com/en` (i `/pl`) → Request indexing.

Pierwsza ikona w HTML: `/brand/google-120.png` (ten sam plik co `Organization.logo`). Dalej 192 / 96 / 48 / 32 PNG i ICO — downscale z `05-icon-filled-master.png`, bez SVG (stary SVG wyglądał w zakładce jak „R”). Nie używać file-based `src/app/favicon.ico` (hash w query psuje stabilność).

---

## JSON-LD

`JsonLd` na każdej stronie (`[locale]/layout.tsx`):

- `Organization` — `logo` → `https://piotrkulbacki.com/brand/google-120.png` (min. 112×112; Knowledge Panel / marka)
- `Person` — `image` → portret; `worksFor` → Organization
- `WebSite` — `publisher` / `author`

Test: [Rich Results Test](https://search.google.com/test/rich-results) na stronie głównej locale.

---

## Produkty w portfolio (live)

| Slug                 | Live URL                                       | Uwagi                                               |
| -------------------- | ---------------------------------------------- | --------------------------------------------------- |
| `ai-document`        | `https://aidocument.eu/`                       | Flagowiec; screeny w `public/projects/ai-document/` |
| `lyamo`              | `https://lyamo.eu/`                            | Flagowiec; screeny OK w `public/projects/lyamo/`    |
| `wc26-predictor`     | `https://wc26-predictor-zapraszam.vercel.app/` | Typer MŚ 2026; screeny OK                           |
| `ak-gebaeudeservice` | `https://www.akgebaeudeservice.com/`           | Screeny OK                                          |

`siteConfig.product.url` = `https://lyamo.eu`.
