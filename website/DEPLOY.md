# Deploy & launch runbook

## 1. GitHub

```bash
cd website
# if needed: create repo on GitHub, then
git remote add origin git@github.com:YOUR_USER/piotr-kulbacki-website.git
git branch -M main
git push -u origin main
```

## 2. Vercel

1. New Project → import repo
2. Framework: Next.js (auto)
3. Root directory: `.` (if repo = `website/`) or `website` (if monorepo)
4. Env vars:

| Name                   | Value                     |
| ---------------------- | ------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |
| `RESEND_API_KEY`       | from Resend               |
| `CONTACT_TO_EMAIL`     | your inbox                |
| `CONTACT_FROM_EMAIL`   | verified sender in Resend |

5. Deploy → open preview URL → smoke test locales + contact form

## 3. Domain

1. Buy domain (e.g. `piotrkulbacki.com`)
2. Vercel → Project → Domains → add
3. Point DNS (A/CNAME) as Vercel instructs
4. Wait for SSL

## 4. Google Search Console

1. Add property = production URL
2. Verify via DNS TXT or HTML meta
3. Submit `https://your-domain.com/sitemap.xml`

## 5. Post-launch smoke

- [ ] `/en`, `/pl`, language switcher
- [ ] Projects filter + Lyamo detail
- [ ] Contact form real email
- [ ] Lighthouse mobile/desktop
- [ ] LinkedIn announcement
