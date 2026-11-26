# Otwarte sprawy

## 1. Aktualny stan projektu

- Strona wizytówka Next.js 16 (App Router, next-intl, 5 locale: pl/en/de/es/uk), hosting Vercel, domena `piotrkulbacki.com`.
- Postęp i historia zmian: `PROJECT_CHECKLIST.md`; SEO, JSON-LD i IndexNow: `docs/SEO.md`; wdrożenie: `docs/DEPLOY.md`.
- Wspólny standard SEO i encji czterech stron: `~/Developer/ebook-shop/docs/seo-encje.md` (wersja 2, scalona w `main` sklepu). Agent tego repo może go edytować (zasady w nagłówku standardu).
- Plan wdrożenia, lista usług i opis wizytówki: `docs/SEO-encje-wdrozenie.md`.
- Na gałęzi `seo/entity-home` (PR #11, niescalony, CI zielone): dom osoby według standardu (`Person` `#person`, `ProfilePage` per wersja językowa, opis osoby w hero, „Kim jestem” i meta), podstrona `/{locale}/services` z `LocalBusiness` `#business` i telefonem, sitemap z ręcznym `lastmod`, IndexNow (`scripts/indexnow.mjs`). Na produkcji wciąż stary stan (`Person` `https://cavunio.com/#piotr-kulbacki`).
- Opis osoby, `jobTitle` i `knowsAbout`: jedno źródło `messages/*.json` → `person`; usługi: `messages/*.json` → `services` (DE to źródło nazw z wizytówki).
- Wizytówka Google: stały adres `https://maps.google.com/?cid=6497189699195385071`; stan w standardzie, sekcja 13.3. Panel właściciela (`business.google.com`) nie otwiera się w Claude in Chrome; widok publiczny Map działa.
- Skille w repo: `dev-quality` i `writing` włączone w `.claude/settings.json` (zgoda właściciela 2026-11-26).

## 2. Decyzje właściciela

- Standard `seo-encje.md` (sekcja 13.1, decyzje 1–12) obowiązuje; nie pytać o nie ponownie.
- Opis osoby, wersja 2 (standard, sekcja 6), zatwierdzony w 5 językach (2026-11-26). „Inżynier oprogramowania” (z kursu) zastąpione przez `jobTitle` z sekcji 6.3.
- Fakty techniczne tylko ze sprawdzonych źródeł; niepewne oznaczać „(wniosek)” lub „WYMAGA WERYFIKACJI”. Formaty zapisu ze standardu, sekcja 1.1 (strona główna z ukośnikiem, podstrony bez).
- Wizytówka: kategorie Serwis komputerowy (główna), Projektowanie stron WWW, Producent oprogramowania; obszar Berlin i Brandenburgia; telefon zostaje; adres domowy ukryty.
- Adres w Impressum (Bendastr. 11) to adres domowy i siedziba działalności; zostaje w Impressum (§ 5 DDG); w danych strukturalnych bez ulicy.
- `Person.@id` zmienia się na `https://piotrkulbacki.com/#person` w tych samych dniach co na cavunio.com, dokiero.com i lyamo.eu.
- Jednoosobowa działalność bez nazwy firmy: brak węzła `Organization`; firma lokalna w JSON-LD to `LocalBusiness` `#business` o nazwie „Piotr Kulbacki”.
- `sameAs` = wszystkie profile widoczne na stronie (`siteConfig.social`), kolejność jak `SELLER_PROFILES` w repo sklepu.
- Instagram `https://www.instagram.com/piotr.kulbacki/`, TikTok `https://www.tiktok.com/@piotr_kulbacki_youtube`.
- Telefon (2026-11-26): `+49 1573 5166871` tylko na podstronie Usługi i w `#business`; reszta strony bez telefonu (decyzja z 2026-10-19 poza tym wyjątkiem obowiązuje).

## 3. Akcje dla właściciela

- Sprawdzić PR #11 (https://github.com/PiotrKulbacki/my-buisness-card/pull/11; podgląd Vercel: `/pl`, `/pl/about`, `/de/services`) i scalić go dopiero w etapie 3 (te same dni co cavunio.com, dokiero.com, lyamo.eu).
- Wkleić opis wizytówki z `docs/SEO-encje-wdrozenie.md`, sekcja 4.
- Wizytówka: opinie od prawdziwych klientów (planowane ≥ 4), bez zachęt.
- Po wdrożeniu na produkcję: strona WWW wizytówki → `https://piotrkulbacki.com/de/services`.

## 4. Zadanie w toku: standard SEO i encji (gałąź `seo/entity-home`, PR #11)

Etapy (szczegóły w `docs/SEO-encje-wdrozenie.md`, sekcja 2):

1. Przegląd, odczyt wizytówki, standard v2, opis zatwierdzony, dane firmy - **zrobione** (2026-11-26).
2. Etap 1 kodu: dom osoby (kroki 1–7) - **zrobione** (2026-11-26); lint, typecheck, build, format i graf lokalnie OK.
3. Etap 2 kodu: podstrona `/{locale}/services` i `#business` - **zrobione** (2026-11-26), w tym samym PR.
4. Etap 3 - **następny krok**, czeka na gotowość pozostałych trzech stron:
   - tuż przed scaleniem: ustawić datę `ENTITY_UPDATE` w `src/lib/seo.ts` na dzień wdrożenia (sitemap `lastmod`, `ProfilePage.dateModified`);
   - scalenie PR (właściciel), potem kontrola ze standardu, sekcja 11: Rich Results Test (`/pl`, `/de/services`; czy Google akceptuje adres bez ulicy), Schema Markup Validator, curl z UA robotów AI;
   - `node scripts/indexnow.mjs`; GSC: ponowne wysłanie sitemapy;
   - bio na profilach (standard 6.1 / 6.2, link `https://piotrkulbacki.com/`).

## 5. Inne otwarte sprawy

- Grafiki z napisem „Software Engineer”: karta OG (`src/app/[locale]/opengraph-image.tsx` i statyczny `public/og.png`, alt z `siteConfig.role`) oraz lockup logo w sidebarze (`public/brand/ui-lockup-side.png`). Niespójne z nowym `jobTitle`; zmiana wymaga nowych grafik. Do decyzji właściciela.
- CV (`src/content/cv.ts`): podsumowanie i stanowisko „Full Stack Software Engineer” / „Inżynier oprogramowania - działalność gospodarcza”. To historia zawodowa, nie `jobTitle`; zostawione bez zmian. Do decyzji, czy dopasować do opisu osoby.
- `docs/SEO.md`, sekcja robots.txt, nie wymienia `Disallow: /*/reply` (jest w `src/app/robots.ts`). Drobna nieścisłość dokumentacji.
