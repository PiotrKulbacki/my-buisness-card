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

| Name                             | Value                                                          |
| -------------------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | `https://piotrkulbacki.com`                                    |
| `BREVO_API_KEY`                  | z Brevo → SMTP & API → API keys                                |
| `BREVO_FROM_EMAIL`               | `Piotr Kulbacki <kontakt@piotrkulbacki.com>` (domena verified) |
| `CONTACT_TO_EMAIL`               | `it.piotr.kulbacki@gmail.com` (skrzynka, w której czytasz)     |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key                                  |
| `TURNSTILE_SECRET_KEY`           | Cloudflare Turnstile secret key                                |

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

1. Property = URL produkcji
2. Weryfikacja DNS TXT lub HTML
3. Submit `https://piotrkulbacki.com/sitemap.xml`

## 5. Post-launch smoke

- [ ] `/pl`, `/en`, language switcher
- [ ] Projects filter + Lyamo detail
- [ ] Contact form (Turnstile + Brevo: inbox + auto-reply)
- [ ] Logo w mailach z `https://piotrkulbacki.com/brand/…`
- [ ] Lighthouse
- [ ] LinkedIn announcement
