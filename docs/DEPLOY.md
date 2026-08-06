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

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` (lub URL Vercel) |
| `RESEND_API_KEY` | z Resend |
| `CONTACT_TO_EMAIL` | `it.piotr.kulbacki@gmail.com` |
| `CONTACT_FROM_EMAIL` | zweryfikowany sender w Resend |

5. Deploy → otwórz `*.vercel.app` → smoke test `/pl` + sidebar + zdjęcia

## 3. Domain

1. Kup domenę (np. `piotrkulbacki.com`)
2. Vercel → Project → Domains → add
3. DNS (A/CNAME) wg instrukcji Vercel
4. SSL

## 4. Google Search Console

1. Property = URL produkcji
2. Weryfikacja DNS TXT lub HTML
3. Submit `https://your-domain.com/sitemap.xml`

## 5. Post-launch smoke

- [ ] `/pl`, `/en`, language switcher
- [ ] Projects filter + Lyamo detail
- [ ] Contact form (z Resend)
- [ ] Lighthouse
- [ ] LinkedIn announcement
