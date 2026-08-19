# Deploy & launch runbook

Aplikacja leży w **rootcie** repozytorium (nie ma podkatalogu `website/`).

## 1. GitHub

Repo: https://github.com/PiotrKulbacki/my-buisness-card

```bash
git add .
git commit -m "your message"
git push origin main
```

## 2. Vercel

1. New Project → import `my-buisness-card`
2. Framework: Next.js (auto)
3. **Root Directory:** zostaw puste (`.`) — **nie** ustawiaj `website`
4. Env vars (opcjonalnie na preview, wymagane na prod z formularzem):

| Name                             | Value                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | `https://piotrkulbacki.com`                                                                        |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | opcjonalnie — GA4 `G-…` (tylko **production** + po zgodzie; Consent Mode v2 — `docs/Analytics.md`) |
| `NEXT_PUBLIC_FACEBOOK_APP_ID`    | opcjonalnie — Meta App ID (`fb:app_id` w OG; `docs/SEO.md`)                                        |
| `BREVO_API_KEY`                  | z Brevo → SMTP & API → API keys                                                                    |
| `BREVO_FROM_EMAIL`               | `Piotr Kulbacki <kontakt@piotrkulbacki.com>` (domena verified)                                     |
| `CONTACT_TO_EMAIL`               | `it.piotr.kulbacki@gmail.com` (skrzynka, w której czytasz)                                         |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key                                                                      |
| `TURNSTILE_SECRET_KEY`           | Cloudflare Turnstile secret key                                                                    |
| `REPLY_FORM_SECRET`              | opcjonalnie — HMAC linku „Odpowiedz w szablonie”; bez tego używany jest `BREVO_API_KEY`            |

5. Domains: `piotrkulbacki.com` + redirect `www` → apex
6. Deploy → smoke test `/pl` + sidebar + zdjęcia + formularz

Lokalnie: skopiuj te same klucze do `.env` (wzór: `.env.example`), żeby Turnstile i Brevo działały poza mockiem.

### Brevo — weryfikacja domeny (raz)

1. Brevo → **Senders, Domains & Dedicated IPs** → dodaj `piotrkulbacki.com`
2. Wstaw rekordy DNS (DKIM / SPF) u rejestratora domeny
3. Poczekaj na status verified, potem ustawiaj `BREVO_FROM_EMAIL`
4. Opcjonalnie: forwarding `kontakt@piotrkulbacki.com` → Gmail (maile bezpośrednie na publiczny adres)

## 3. Domain

1. Vercel → Project → Domains → `piotrkulbacki.com` (+ www redirect)
2. DNS (A/CNAME) wg instrukcji Vercel
3. SSL

## 4. Google Search Console

1. Property = URL produkcji (`https://piotrkulbacki.com`)
2. Weryfikacja DNS TXT lub HTML
3. Submit `https://piotrkulbacki.com/sitemap.xml`
4. Sprawdź `https://piotrkulbacki.com/robots.txt` (Allow `/`, Disallow `/api/`, Sitemap)

Szczegóły sitemap / hreflang / OG: [`docs/SEO.md`](SEO.md).

## 5. Open Graph / share preview

1. Facebook Sharing Debugger → Scrape Again dla `/`, `/en`, `/pl`, `/pl/about`
2. `og:image` = `https://piotrkulbacki.com/og.png` (nie `/{locale}/opengraph-image`)
3. Wszystkie URL powinny mieć **tę samą** grafikę z logo (nie portret)
4. WhatsApp: wklej link z paska adresu w **nowej** wiadomości; stary czat może trzymać cache. Debugger FB nie odświeża cache WhatsApp automatycznie.

## 6. Google Analytics 4 (opcjonalnie)

1. Utwórz GA4 property + Web stream → Measurement ID `G-…`
2. Vercel env: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Production)
3. Redeploy
4. Smoke Consent Mode — checklista w [`docs/Analytics.md`](Analytics.md) (brak `gtag` przed zgodą; hit po Accept)

## 7. Post-launch smoke

- [ ] `/pl`, `/en`, language switcher
- [ ] Projects: AI Document (`aidocument.eu`), Lyamo (`lyamo.eu`), AK
- [ ] Contact form (Turnstile + Brevo: inbox + auto-reply)
- [ ] Logo w mailach z `https://piotrkulbacki.com/brand/…`
- [ ] OG preview (FB Debugger) + GSC sitemap
- [ ] GA4 + Consent Mode (jeśli ID ustawione): Accept → Realtime; Necessary only → brak GA
- [ ] Lighthouse
- [ ] LinkedIn announcement
