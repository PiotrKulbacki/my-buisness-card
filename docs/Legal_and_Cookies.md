# Aspekty prawne i cookies

Status: wdrożone na wizytówce (Einzelunternehmen / Kleinunternehmer, Berlin).  
Nie jest to porada prawna — przy zmianie formy działalności lub narzędzi (GA, Meta Pixel itd.) zaktualizuj teksty i banner.

Szczegóły techniczne analityki / Consent Mode: **`docs/Analytics.md`**.

---

## Stopka

Linki: **Impressum** · **Polityka prywatności** · **Cookies**

- **Desktop (`md+`):** jeden rząd — logo + © po lewej, linki po prawej; wysokość pasa `h-(--site-footer-h)` (flush z LanguageSwitcher w sidebarze).
- **Mobile:** dwie linie, wyśrodkowane w poziomie — (1) logo + ©, (2) trzy linki; wysokość `auto` + `py-3`.

Komponent: `src/components/layout/Footer.tsx`.  
Link „Cookies” otwiera ponownie baner zgody (`openCookieSettings`) — ponowna decyzja o analityce.

**Regulamin / AGB:** nie wymagany przy samej wizytówce + formularzu kontaktowym (bez sklepu / automatycznego zawierania umów) — nie wdrażamy.

---

## Impressum (`/[locale]/impressum`)

Podstawa: **§ 5 DDG** (Digitale-Dienste-Gesetz).

| Pole            | Źródło / wartość                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------- |
| Imię i nazwisko | `siteConfig.name`                                                                                  |
| Forma           | Einzelunternehmen                                                                                  |
| Adres           | `siteConfig.legal` — Bendastr. 11, 12051 Berlin                                                    |
| E-mail          | `siteConfig.email`                                                                                 |
| Telefon         | `siteConfig.legal.phoneDisplay`                                                                    |
| USt-IdNr.       | **Brak** — Kleinunternehmer (§ 19 UStG), numer nie został nadany; Steuernummer **nie** publikujemy |

Dane adresowe i telefon: `src/config/site.ts` → `legal`.

---

## Polityka prywatności (`/[locale]/privacy`)

Sekcje (i18n, 5 locale): administrator, hosting (Vercel), formularz kontaktowy, brief projektu, analityka (Vercel + GA4 + Consent Mode v2), cookies (`#cookies`), prawa, organ nadzorczy (Berlin).

- Formularz kontaktowy: imię, e-mail, opcjonalny telefon, treść — odpowiedź na zapytanie.
- Brief projektu (`/contact/brief`): te same dane kontaktowe plus odpowiedzi o projekcie; szkic tylko w `sessionStorage` do wysłania.
- Ochrona: honeypot + rate limit + **Cloudflare Turnstile**.
- Wysyłka e-mail: **Brevo** (Sendinblue GmbH) — mail do inboxu + auto-reply do nadawcy; env `BREVO_*`, `CONTACT_TO_EMAIL`.
- Inventarz w `#cookies`: `NEXT_LOCALE`, `pk_cookie_consent`, oraz (po zgodzie) cookies GA (`_ga` / `_ga_*`).

---

## Cookies i analityka

| Cookie / sygnał     | Kategoria                | Rola                                                      | Max-Age / uwagi    |
| ------------------- | ------------------------ | --------------------------------------------------------- | ------------------ |
| `NEXT_LOCALE`       | niezbędne                | język (next-intl)                                         | 12 mies.           |
| `pk_cookie_consent` | niezbędne                | decyzja o analityce (JSON: version, analytics, updatedAt) | 12 mies.           |
| `_ga` / `_ga_*`     | analityczne (po zgodzie) | Google Analytics 4 — tylko po „Akceptuję wszystkie”       | wg polityki Google |

- Brak cookies **reklamowych** / Meta Pixel / Google Ads na tej witrynie.
- Baner: „Tylko niezbędne” / „Akceptuję wszystkie” — `src/components/cookies/CookieConsent.tsx` (bez zewnętrznego CMP).
- **Vercel Analytics** — po `consent.analytics` (`CookieAndAnalytics`).
- **GA4** — `@next/third-parties/google`, tylko production + `NEXT_PUBLIC_GA_MEASUREMENT_ID`, montaż dopiero po zgodzie (`GoogleAnalyticsLoader`).
- **Consent Mode v2:** domyślnie `analytics_storage` + `ad_*` = `denied`; po Accept → `analytics_storage=granted`, ads pozostają `denied`. Reject / odwołanie → GA nie startuje.
- Snapshot zgody: `getConsentSnapshot` (stabilna referencja dla `useSyncExternalStore`).

Konfiguracja: `src/config/cookies.ts`, `src/lib/cookie-consent.ts`, `src/lib/google-consent.ts`.

---

## Sitemap

Ścieżki prawne są w `getIndexableRoutes()` (`src/lib/seo.ts`) i trafiają do `/sitemap.xml` (priorytet `0.3`, `yearly`): `/privacy`, `/impressum` × 5 locale.

Pełny opis SEO: `docs/SEO.md`.
