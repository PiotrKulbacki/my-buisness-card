# Otwarte sprawy

## 1. Aktualny stan projektu

- Strona wizytówka Next.js 16 (App Router, next-intl, 5 locale: pl/en/de/es/uk), hosting Vercel, domena `piotrkulbacki.com`.
- Postęp i historia zmian: `PROJECT_CHECKLIST.md`; SEO i JSON-LD: `docs/SEO.md`; wdrożenie: `docs/DEPLOY.md`.
- JSON-LD tylko na stronie głównej (`src/components/seo/JsonLd.tsx`), jeden `@graph`: Person + ProfilePage + WebSite. Dane w `siteConfig.identity` i `siteConfig.brands` (`src/config/site.ts`).
- Zweryfikowany na produkcji 2026-11-26: Rich Results Test - Profile page ważny, bez ostrzeżeń; validator.schema.org - 0 błędów, 0 ostrzeżeń.

## 2. Decyzje właściciela

- `Person.@id` = `https://cavunio.com/#piotr-kulbacki` - wspólny z cavunio.com, dokiero.com, lyamo.eu; nie zmieniać.
- Jednoosobowa działalność bez nazwy firmy: brak węzła `Organization` w JSON-LD (2026-11-26).
- `sameAs` = wszystkie profile widoczne na stronie (`siteConfig.social`), nie tylko FB/IG.
- Instagram: `https://www.instagram.com/piotr.kulbacki/` (zmieniona nazwa; stara `piotr_kulbacki` nieaktualna).
- Bez numeru telefonu na stronie i w JSON-LD (2026-10-19).

## 3. Akcje dla właściciela

- Sprawdzić, czy cavunio.com, dokiero.com i lyamo.eu mają w `sameAs` Instagram z kropką (`piotr.kulbacki`).

## 4. Zadanie w toku

Brak.

## 5. Inne otwarte sprawy

Brak.
