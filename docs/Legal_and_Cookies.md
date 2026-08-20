# Aspekty prawne i cookies

Status: wdrożone na wizytówce (Einzelunternehmen / Kleinunternehmer, Berlin).  
Nie jest to porada prawna — przy zmianie formy działalności, modelu sprzedaży albo narzędzi (GA, Meta Pixel itd.) zaktualizuj teksty i banner. Przed publikacją istotnych zmian w AGB / Widerruf warto dać teksty do weryfikacji prawnikowi DE.

Szczegóły techniczne analityki / Consent Mode: **`docs/Analytics.md`**.

---

## Stopka

Linki: **Impressum** · **Privacy / Datenschutz** · **AGB** · **Widerruf** · **Cookies** (ostatni otwiera baner, nie osobną stronę).

- **Desktop (`md+`):** logo + © po lewej, linki prawne po prawej (`flex-wrap`); wysokość pasa `min-h-(--site-footer-h)` (flush z LanguageSwitcher, gdy linki mieszczą się w jednym rzędzie).
- **Mobile:** dwie linie, wyśrodkowane — (1) logo + ©, (2) linki (zawijane); wysokość `auto` + `py-3`.

Komponent: `src/components/layout/Footer.tsx`.  
Link „Cookies” / DE **Cookie-Einstellungen** otwiera ponownie baner zgody (`openCookieSettings`) — ponowna decyzja o analityce.

Osobna strona `/cookies` **nie** jest potrzebna: inventarz i zasady są w `/privacy#cookies`, a baner ma równorzędne „Tylko niezbędne” / „Akceptuję wszystkie”.

URL-e są wspólne dla wszystkich locale (`/privacy`, nie `/datenschutz`) — tak każe istniejąca architektura next-intl.

---

## Impressum (`/[locale]/impressum`)

Podstawa: **§ 5 DDG** (Digitale-Dienste-Gesetz).

| Pole            | Źródło / wartość                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Imię i nazwisko | `siteConfig.name`                                                                                 |
| Forma           | Einzelunternehmen                                                                                 |
| Przedmiot       | strony, webdesign, cyfrowe obecności, indywidualne usługi i oprogramowanie (i18n)                 |
| Adres           | `siteConfig.legal` — Bendastr. 11, 12051 Berlin                                                   |
| E-mail          | `siteConfig.email`                                                                                |
| Telefon         | `siteConfig.legal.phoneDisplay`                                                                   |
| USt-IdNr.       | **Brak** — Kleinunternehmer (§ 19 UStG); Steuernummer **nie** publikujemy                         |
| Handelsregister | brak wpisu — numeru nie podajemy                                                                  |
| Streitbeilegung | brak udziału w Verbraucherschlichtung (VSBG); **bez** linku do zamkniętej platformy ODR UE (2025) |

Dane adresowe, telefon i organ DPA: `src/config/site.ts` → `legal`.

---

## Polityka prywatności (`/[locale]/privacy`)

Jedyna strona prywatności (DE: tytuł **Datenschutzerklärung**). Nie dublować pod drugim URL.

Sekcje (i18n, 5 locale): administrator (adres, e-mail, telefon), mapa przetwarzania, hosting (Vercel), Turnstile, formularz, brief, Brevo, analityka (Consent Mode v2), odbiorcy, transfer poza EOG, retencja, cookies (`#cookies`), prawa, organ nadzorczy Berlin (`legal.dpa`).

**Aktywnie używane na tej witrynie:** Vercel (hosting + Analytics po zgodzie), Cloudflare Turnstile, Brevo, GA4 + Consent Mode v2, własny banner cookies, formularz kontaktowy, brief (`sessionStorage` szkicu), first-party cookies `NEXT_LOCALE` / `pk_cookie_consent`.

**Nie opisujemy:** Supabase (jest w stacku CV, nie w runtime wizytówki), Meta Pixel, Google Ads, zewnętrzny CMP.

---

## AGB (`/[locale]/agb`) i Widerruf (`/[locale]/widerruf`)

Model współpracy na stronie: **kontakt → analiza → indywidualny zakres → oferta → akceptacja → start**. Formularz / brief **nie** zawierają umowy.

- **AGB** — warunki współpracy B2B i B2C (zakres, oferty, obowiązki, IP po zapłacie, odpowiedzialność w granicach prawa, odesłanie do Widerruf dla konsumentów).
- **Widerruf** — pouczenie + wzór formularza dla **konsumentów** przy umowie na odległość. Bieg 14 dni od **zawarcia umowy**, nie od wysłania formularza.

Brak automatycznego flow w aplikacji na „start usługi przed 14 dniami” — to proces mailowy na trwałym nośniku, opisany w treści Widerruf i w ofercie, nie jako checkbox w formularzu.

---

## Formularze

Kontakt i brief: nota, że wysłanie **nie** jest umową / zakupem, plus link do polityki prywatności. Brief dodatkowo: dane służą do kontaktu i indywidualnej oferty.

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

Konfiguracja: `src/config/cookies.ts`, `src/lib/cookie-consent.ts`, `src/lib/google-consent.ts`.

---

## Sitemap

Ścieżki prawne są w `getIndexableRoutes()` (`src/lib/seo.ts`) i trafiają do `/sitemap.xml` (priorytet `0.3`, `yearly`): `/privacy`, `/impressum`, `/agb`, `/widerruf` × 5 locale.

Pełny opis SEO: `docs/SEO.md`.
