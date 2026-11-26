# Otwarte sprawy

## 1. Aktualny stan projektu

- Strona wizytówka Next.js 16 (App Router, next-intl, 5 locale: pl/en/de/es/uk), hosting Vercel, domena `piotrkulbacki.com`.
- Postęp i historia zmian: `PROJECT_CHECKLIST.md`; SEO, JSON-LD i IndexNow: `docs/SEO.md`; wdrożenie: `docs/DEPLOY.md`.
- Wspólny standard SEO i encji czterech stron: `~/Developer/ebook-shop/docs/seo-encje.md` (wersja 2, scalona w `main` sklepu). Agent tego repo może go edytować (zasady w nagłówku standardu).
- Plan wdrożenia, lista usług i opis wizytówki: `docs/SEO-encje-wdrozenie.md`.
- Na produkcji od 2026-11-26 (PR #11 i #12 scalone przez właściciela tego dnia): dom osoby według standardu (`Person` `#person`, `ProfilePage` per wersja językowa, opis osoby w hero, „Kim jestem” i meta), podstrona `/{locale}/services` z `LocalBusiness` `#business` i telefonem, sitemap z ręcznym `lastmod`, IndexNow (`scripts/indexnow.mjs`). Produkcja podaje już `Person` `https://piotrkulbacki.com/#person`.
- Opis osoby, `jobTitle` i `knowsAbout`: jedno źródło `messages/*.json` → `person`; usługi: `messages/*.json` → `services` (DE to źródło nazw z wizytówki).
- Logotypy (`public/brand/ui-lockup-*`, mastery `02`, `03`, `06`) i karta OG (`public/og.png`, generator `opengraph-image.tsx`) z nowym stanowiskiem „Web designer and app developer” zamiast „Software Engineer”. `siteConfig.role` czyta EN `jobTitle` z `messages/en.json`. Opis wariantów: `docs/Brand_Logo.md`.
- Wizytówka Google: stały adres `https://maps.google.com/?cid=6497189699195385071`; stan w standardzie, sekcja 13.3.
- Claude in Chrome działa (2026-11-27), po ustawieniu w rozszerzeniu dostępu „We wszystkich witrynach”. Wcześniejsze limity czasu wynikały z dostępu ograniczonego do `www.google.com`. W Chrome zalogowanych jest kilka kont Google; konto z GSC dla piotrkulbacki.com nie jest kontem domyślnym (`authuser=0`).
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

- Google Search Console: podać agentowi, na którym koncie Google jest usługa piotrkulbacki.com (albo samemu: Mapy witryn → ponownie wysłać `https://piotrkulbacki.com/sitemap.xml`; Sprawdzanie adresu URL → `https://piotrkulbacki.com/pl` → Poproś o zindeksowanie). To samo w Bing Webmaster Tools (URL Inspection).
- Wkleić opis wizytówki z `docs/SEO-encje-wdrozenie.md`, sekcja 4.
- Wizytówka: opinie od prawdziwych klientów (planowane ≥ 4), bez zachęt.
- Strona WWW wizytówki → `https://piotrkulbacki.com/de/services` (strona jest już na produkcji).

## 4. Zadanie w toku: standard SEO i encji (kod na produkcji, zostały kontrole po wdrożeniu)

Etapy (szczegóły w `docs/SEO-encje-wdrozenie.md`, sekcja 2):

1. Przegląd, odczyt wizytówki, standard v2, opis zatwierdzony, dane firmy - **zrobione** (2026-11-26).
2. Etap 1 kodu: dom osoby (kroki 1–7) - **zrobione** (2026-11-26); lint, typecheck, build, format i graf lokalnie OK.
3. Etap 2 kodu: podstrona `/{locale}/services` i `#business` - **zrobione** (2026-11-26), w tym samym PR.
4. Etap 3 - **w toku**. Scalenie PR #11 i #12 - **zrobione** (2026-11-26, `ENTITY_UPDATE` = 2026-11-26). Kontrola 2026-11-27:
   - **zrobione:** Rich Results Test `/pl` (6 poprawnych: LocalBusiness, 4× Organization, ProfilePage) i `/de/services` (LocalBusiness i Organization poprawne; adres bez ulicy przyjęty, brak `streetAddress`/`postalCode` tylko jako uwaga opcjonalna; brak też opcjonalnych `priceRange` i `image`); Schema Markup Validator `/pl`: 0 błędów, 0 ostrzeżeń; graf `@id` zgodny, brak `cavunio.com/#piotr-kulbacki`; curl z UA OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot, Googlebot, GPTBot, ClaudeBot: 200 (korzeń 307 → wersja językowa); IndexNow: 90 adresów, HTTP 202; Facebook Sharing Debugger: ponowne pobranie `/pl`, `/de`, `/en`, `/es`, `/uk`, `/de/services` (nowa karta OG);
   - **zostało:** GSC i Bing (sekcja 3, konto Google); bio na profilach (opis z sekcji 6 standardu, link `https://piotrkulbacki.com/`; Instagram i TikTok mają limity znaków, potrzebna krótsza wersja do zatwierdzenia); miesięczna kontrola zapytań (standard, sekcja 11, pkt 5).

## 5. Inne otwarte sprawy

- **Błąd od sierpnia:** roboty podglądów linków (Facebook, WhatsApp, LinkedIn, Twitter) dostają **404** dla `https://piotrkulbacki.com/` (zwykła przeglądarka dostaje 307 → `/en`). Przyczyna w `src/proxy.ts`: dla tych robotów kod zmienia `request.nextUrl.pathname` na `/en` i woła middleware next-intl, ale strona `/` nie istnieje (wniosek, niesprawdzone lokalnie). Skutek: link do strony głównej udostępniony bez wersji językowej pokazuje „404: This page could not be found” zamiast karty. Propozycja: dla tych robotów zwracać `NextResponse.rewrite` na `/{defaultLocale}{ścieżka}` (bez ciasteczka) i dodać test curl z UA `facebookexternalhit`. Po wdrożeniu: Sharing Debugger → ponownie pobrać `https://piotrkulbacki.com/`. Do decyzji właściciela.
- CV (`src/content/cv.ts`): podsumowanie i stanowisko „Full Stack Software Engineer” / „Inżynier oprogramowania - działalność gospodarcza”. To historia zawodowa, nie `jobTitle`; zostawione bez zmian. Do decyzji, czy dopasować do opisu osoby.
- `docs/SEO.md`, sekcja robots.txt, nie wymienia `Disallow: /*/reply` (jest w `src/app/robots.ts`). Drobna nieścisłość dokumentacji.
