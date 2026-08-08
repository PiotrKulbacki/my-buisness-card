# Aspekty prawne i cookies

Status: wdrożone na wizytówce (Einzelunternehmen / Kleinunternehmer, Berlin).  
Nie jest to porada prawna — przy zmianie formy działalności lub narzędzi (GA, Meta Pixel itd.) zaktualizuj teksty i banner.

---

## Stopka

Linki: **Impressum** · **Polityka prywatności** · **Cookies**

- **Desktop (`md+`):** jeden rząd — logo + © po lewej, linki po prawej; wysokość pasa `h-(--site-footer-h)` (flush z LanguageSwitcher w sidebarze).
- **Mobile:** dwie linie, wyśrodkowane w poziomie — (1) logo + ©, (2) trzy linki; wysokość `auto` + `py-3`.

Komponent: `src/components/layout/Footer.tsx`.  
Link „Cookies” otwiera ponownie baner zgody (`openCookieSettings`).

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

Sekcje (i18n, 5 locale): administrator, hosting (Vercel), formularz kontaktowy, analityka, cookies (`#cookies`), prawa, organ nadzorczy (Berlin).

- Formularz: imię, e-mail, opcjonalny telefon, treść — odpowiedź na zapytanie.
- Wysyłka e-mail: planowane **Brevo** (Sendinblue GmbH); w kodzie API nadal Resend do wymiany — zob. checklista.
- Inventarz cookies w `#cookies`: `NEXT_LOCALE`, `pk_cookie_consent`.

---

## Cookies i analityka

| Cookie              | Kategoria | Rola                                                      | Max-Age  |
| ------------------- | --------- | --------------------------------------------------------- | -------- |
| `NEXT_LOCALE`       | niezbędne | język (next-intl)                                         | 12 mies. |
| `pk_cookie_consent` | niezbędne | decyzja o analityce (JSON: version, analytics, updatedAt) | 12 mies. |

- Brak cookies reklamowych / marketingowych.
- Baner: „Tylko niezbędne” / „Akceptuję wszystkie” — `src/components/cookies/CookieConsent.tsx`.
- **Vercel Analytics** ładuje się dopiero po zgodzie na analitykę (`CookieAndAnalytics`).
- Snapshot zgody jest cache’owany (`getConsentSnapshot`) — stabilna referencja dla `useSyncExternalStore`.

Konfiguracja: `src/config/cookies.ts`, logika: `src/lib/cookie-consent.ts`, locale cookie w `src/i18n/routing.ts`.

---

## Sitemap

Ścieżki prawne w `src/app/sitemap.ts`: `/privacy`, `/impressum`.
