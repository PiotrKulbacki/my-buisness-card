# Analityka — Vercel Analytics + Google Analytics 4

Status: wdrożone. **Bez zewnętrznego CMP** — własny baner cookies + Google Consent Mode v2.

---

## Pliki

| Rola                                   | Ścieżka                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| Baner + Vercel Analytics po zgodzie    | `src/components/cookies/CookieAndAnalytics.tsx`          |
| Baner UI                               | `src/components/cookies/CookieConsent.tsx`               |
| Link „Cookies” w stopce                | `src/components/cookies/CookieSettingsButton.tsx`        |
| Zapis zgody (`pk_cookie_consent`)      | `src/lib/cookie-consent.ts`, `src/config/cookies.ts`     |
| Consent Mode v2 helpers                | `src/lib/google-consent.ts`                              |
| Default `denied` (`beforeInteractive`) | `src/components/analytics/GoogleConsentModeDefaults.tsx` |
| GA4 loader (tylko po `analytics=true`) | `src/components/analytics/GoogleAnalyticsLoader.tsx`     |
| Root layout (prod + env)               | `src/app/layout.tsx`                                     |
| Copy prawne (5 locale)                 | `messages/*/privacy` + `messages/*/cookies`              |

Prawne / inventarz: `docs/Legal_and_Cookies.md`. Env: `docs/DEPLOY.md`, `.env.example`.

---

## Vercel Analytics

- Ładuje się w `CookieAndAnalytics` tylko gdy `consent.analytics === true`.
- First-party / zminimalizowany pomiar (bez własnych tracking cookies w sensie klasycznym).

---

## Google Analytics 4

- Pakiet: `@next/third-parties/google` → komponent `<GoogleAnalytics gaId={…} />` (bez ręcznych tagów `gtag` w HTML).
- Env: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (`G-…`).
- Włączane **tylko** gdy `NODE_ENV === "production"` **i** ustawione ID.
- Skrypt GA **nie** montuje się przed zgodą ani po „Tylko niezbędne”.

---

## Google Consent Mode v2

Domyślnie (zanim użytkownik wybierze, `beforeInteractive`):

| Sygnał               | Wartość  |
| -------------------- | -------- |
| `analytics_storage`  | `denied` |
| `ad_storage`         | `denied` |
| `ad_user_data`       | `denied` |
| `ad_personalization` | `denied` |

Dodatkowo: `ads_data_redaction: true`, `url_passthrough: true`, `wait_for_update: 500`.

Po **„Akceptuję wszystkie”**:

- `analytics_storage` → `granted`
- sygnały `ad_*` pozostają **`denied`** (brak reklam / Ads na wizytówce)
- dopiero wtedy montowane jest `<GoogleAnalytics />`

Po **„Tylko niezbędne”** lub odwołaniu zgody (Cookies w stopce → necessary):

- Consent Mode → wszystkie powyższe `denied`
- GA **nie** jest ładowane
- brak cookies analitycznych Google z naszej strony

Trwałość decyzji: cookie first-party `pk_cookie_consent` (12 mies., wersjonowane). Baner nie wraca przy każdej wizycie; ponowna zmiana: stopka → **Cookies**.

---

## Weryfikacja (produkcja)

1. Ustaw `NEXT_PUBLIC_GA_MEASUREMENT_ID` na Vercel → redeploy.
2. Incognito → Network: **brak** `googletagmanager.com/gtag/js` przed zgodą.
3. „Akceptuję wszystkie” → pojawia się `gtag/js`; Realtime w GA pokazuje hit.
4. Nowa sesja / clear → „Tylko niezbędne” → nadal brak GA.
5. Stopka → Cookies → zmiana decyzji aktualizuje Consent Mode i montaż/odmontowanie GA.

Dev (`next dev`): GA się **nie** ładuje (warunek production) — do testu Consent Mode użyj preview/prod.
