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
| OG / Twitter image (logo)   | `src/app/[locale]/opengraph-image.tsx`    |
| Alias Twitter               | `src/app/[locale]/twitter-image.tsx`      |
| `robots.txt`                | `src/app/robots.ts` → `/robots.txt`       |
| `sitemap.xml`               | `src/app/sitemap.ts` → `/sitemap.xml`     |
| Middleware (skip OG assets) | `src/proxy.ts`                            |
| Logo w OG                   | `docs/Brand_Logo.md` → `lockupHorizontal` |

---

## Canonical + hreflang

Każda strona: `alternates.canonical` + `languages` dla `pl` / `en` / `de` / `es` / `uk` oraz `x-default` → **EN** (`routing.defaultLocale`).

Ścieżki bez locale: `""`, `/about`, `/projects`, `/path`, `/contact`, `/privacy`, `/impressum`, `/projects/<slug>`.

---

## Open Graph / Twitter

- **Jedna grafika** dla wszystkich publicznych URL: brand lockup z maili (`ui-lockup-horizontal.png`) generowany w `opengraph-image.tsx`.
- `brandShareImage(locale)` w `seo.ts` wstawia jawne `og:image` / `twitter:images` — bez tego podstrony nadpisywały `openGraph` i Facebook brał losowy obraz ze strony (np. portret na `/about`).
- Opcjonalnie: `NEXT_PUBLIC_FACEBOOK_APP_ID` → meta `fb:app_id` (Sharing Debugger). App może zostać w Development; Live nie jest wymagane do share preview.
- Po zmianie OG: Facebook Sharing Debugger → **Scrape Again**. WhatsApp cache’uje agresywnie — preview może dojść z opóźnieniem.

Test: Debugger FB / LinkedIn Post Inspector / View Source (`og:title`, `og:image`).

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
| Główne       | `/about`, `/projects`, `/path`, `/contact`                                                        | 0.8–0.9                   |
| Case studies | `/projects/ai-document`, `lyamo`, `wc26-predictor`, `ak-gebaeudeservice`, `movieweb`, `sportclub` | 0.7                       |
| Prawne       | `/privacy`, `/impressum`                                                                          | 0.3                       |

**Łącznie:** (7 stron nawigacji/prawnych + 6 case studies) × 5 locale = **65 URL**.  
Każdy `<url>` ma `xhtml:link` hreflang (jak metadata stron).

Impressum i privacy **są** indeksowane (niższy priorytet).

GSC: po deployu wyślij ponownie `https://piotrkulbacki.com/sitemap.xml` — `docs/DEPLOY.md`.

---

## Produkty w portfolio (live)

| Slug                 | Live URL                                       | Uwagi                                            |
| -------------------- | ---------------------------------------------- | ------------------------------------------------ |
| `ai-document`        | `https://aidocument.eu/pl`                     | Zastąpił `brand-site-system`; screeny TODO       |
| `lyamo`              | `https://lyamo.eu/`                            | Flagowiec; screeny OK w `public/projects/lyamo/` |
| `wc26-predictor`     | `https://wc26-predictor-zapraszam.vercel.app/` | Typer MŚ 2026; screeny OK                        |
| `ak-gebaeudeservice` | `https://www.akgebaeudeservice.com/`           | Screeny OK                                       |

`siteConfig.product.url` = `https://lyamo.eu`.
