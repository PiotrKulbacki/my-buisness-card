# Otwarte sprawy

## 1. Aktualny stan projektu

- Strona wizytówka Next.js 16 (App Router, next-intl, 5 locale: pl/en/de/es/uk), hosting Vercel, domena `piotrkulbacki.com`.
- Postęp i historia zmian: `PROJECT_CHECKLIST.md`; SEO, JSON-LD i IndexNow: `docs/SEO.md`; wdrożenie: `docs/DEPLOY.md`.
- Wspólny standard SEO i encji czterech stron: `~/Developer/ebook-shop/docs/seo-encje.md` (wersja 2, scalona w `main` sklepu). Agent tego repo może go edytować (zasady w nagłówku standardu).
- Plan wdrożenia, lista usług i opis wizytówki: `docs/SEO-encje-wdrozenie.md`.
- Na produkcji od 2026-11-26 (PR #11 i #12 scalone przez właściciela tego dnia): dom osoby według standardu (`Person` `#person`, `ProfilePage` per wersja językowa, opis osoby w hero, „Kim jestem” i meta), podstrona `/{locale}/services` z `LocalBusiness` `#business` i telefonem, sitemap z ręcznym `lastmod`, IndexNow (`scripts/indexnow.mjs`). Produkcja podaje już `Person` `https://piotrkulbacki.com/#person`.
- `/llms.txt` (llmstxt.org, standard sekcja 8.5, wzorzec jak w Dokiero i Cavunio): `src/app/llms.txt/route.ts`, po angielsku, składany z `messages/en.json` (`person`, `services`), `siteConfig` (marki, profile, wizytówka) i `src/content/projects.ts`; bez telefonu (tylko odnośnik do Usług). Nowy projekt lub zmiana opisu trafia tam sama.
- Opis osoby, `jobTitle` i `knowsAbout`: jedno źródło `messages/*.json` → `person`; usługi: `messages/*.json` → `services` (DE to źródło nazw z wizytówki).
- Logotypy (`public/brand/ui-lockup-*`, mastery `02`, `03`, `06`) i karta OG (`public/og.jpg`, generator `opengraph-image.tsx`) z nowym stanowiskiem „Web designer and app developer” zamiast „Software Engineer”. `siteConfig.role` czyta EN `jobTitle` z `messages/en.json`. Opis wariantów: `docs/Brand_Logo.md`.
- Wizytówka Google: stały adres `https://maps.google.com/?cid=6497189699195385071`; stan w standardzie, sekcja 13.3.
- Claude in Chrome działa (2026-11-27), po ustawieniu w rozszerzeniu dostępu „We wszystkich witrynach”. Wcześniejsze limity czasu wynikały z dostępu ograniczonego do `www.google.com`. W Chrome zalogowanych jest kilka kont Google; GSC piotrkulbacki.com jest na koncie właściciela `it.piotr.kulbacki@…` (w Chrome `/u/4/`), nie na koncie domyślnym.
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
- `priceRange` w `#business` nie dodajemy (2026-11-27); uwaga Rich Results Test o jego braku jest opcjonalna.
- CV: stanowisko w podsumowaniu i w bieżącej działalności = `jobTitle` z `messages/*.json` (2026-11-27). Nazwa bootcampu „Software Engineering” zostaje (to nazwa kursu).
- Podstrona Usługi: poza główną nawigacją (mobilna ma 4 kolumny), link tylko z hero strony głównej (stopka bez linku, 2026-11-27); wejście z wizytówki Google.
- Telefon (2026-11-26): `+49 1573 5166871` tylko na podstronie Usługi i w `#business`; reszta strony bez telefonu (decyzja z 2026-10-19 poza tym wyjątkiem obowiązuje).

## 3. Akcje dla właściciela

- Wizytówka: opinie od prawdziwych klientów (planowane ≥ 4), bez zachęt.
- Strona WWW wizytówki → `https://piotrkulbacki.com/de/services` (strona jest już na produkcji).

## 4. Zadanie w toku: standard SEO i encji (kod na produkcji, zostały kontrole po wdrożeniu)

Etapy (szczegóły w `docs/SEO-encje-wdrozenie.md`, sekcja 2):

1. Przegląd, odczyt wizytówki, standard v2, opis zatwierdzony, dane firmy - **zrobione** (2026-11-26).
2. Etap 1 kodu: dom osoby (kroki 1–7) - **zrobione** (2026-11-26); lint, typecheck, build, format i graf lokalnie OK.
3. Etap 2 kodu: podstrona `/{locale}/services` i `#business` - **zrobione** (2026-11-26), w tym samym PR.
4. Etap 3 - **w toku**. Scalenie PR #11 i #12 - **zrobione** (2026-11-26, `ENTITY_UPDATE` = 2026-11-26). Kontrola 2026-11-27:
   - **zrobione:** Rich Results Test `/pl` (6 poprawnych: LocalBusiness, 4× Organization, ProfilePage) i `/de/services` (LocalBusiness i Organization poprawne; adres bez ulicy przyjęty, brak `streetAddress`/`postalCode` tylko jako uwaga opcjonalna; brak też opcjonalnych `priceRange` i `image`); Schema Markup Validator `/pl`: 0 błędów, 0 ostrzeżeń; graf `@id` zgodny, brak `cavunio.com/#piotr-kulbacki`; curl z UA OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot, Googlebot, GPTBot, ClaudeBot: 200 (korzeń 307 → wersja językowa); IndexNow: 90 adresów, HTTP 202; Facebook Sharing Debugger: ponowne pobranie `/pl`, `/de`, `/en`, `/es`, `/uk`, `/de/services` (nowa karta OG); GSC: mapa witryny przesłana ponownie (90 adresów), prośba o zindeksowanie `/pl` (był w indeksie) i `/de/services` (Google go jeszcze nie znał);
   - PR #15 (roboty podglądów dostawały 404 dla `/` i adresów bez wersji językowej) scalony 2026-11-27; produkcja: 200 dla Facebook, WhatsApp, LinkedIn, Twitter; Sharing Debugger dla `https://piotrkulbacki.com/`: 200, nowa karta OG;
   - Bing Webmaster Tools (2026-11-27): piotrkulbacki.com, cavunio.com, dokiero.com, lyamo.eu mają po jednej mapie witryny, stan „Sukces” (90, 21, 180, 5 adresów). Folder `bing/` w repo (nieśledzony zrzut) można usunąć;
   - bio na profilach wpisane przez właściciela (2026-11-27);
   - PR #16 (portret jako `image` w `#business`, `lastmod` `/services` = 2026-11-27) scalony 2026-11-27; Rich Results Test `/de/services`: LocalBusiness i Organization poprawne, `image` przyjęty, jedyna uwaga: brak opcjonalnego `priceRange`; IndexNow dla 5× `/{locale}/services`: HTTP 200;
   - PR „feat: share card with portrait” (2026-11-27, prośba właściciela): karta OG z portretem z prawej (jak hero strony głównej), plik `public/og.jpg` (JPEG ok. 110 KB zamiast PNG ok. 575 KB, limit WhatsApp), `og:image:type` `image/jpeg`. Scalony (PR #17); Sharing Debugger: ponowne pobranie `/`, `/pl`, `/de`, `/en`, `/es`, `/uk`, `/de/services`, wszędzie nowa karta `og.jpg`; LinkedIn Post Inspector `/`, `/pl`, `/de`: nowa karta;
   - opis wizytówki wklejony przez właściciela (2026-11-27);
   - PR #18 „fix: unify CV job title” (2026-11-27) scalony: stanowisko w CV jak `jobTitle`, `docs/SEO.md` z regułą `Disallow: /*/reply`;
   - PR #19 (2026-11-27, prośba właściciela): we wszystkich 5 językach `services.lead` (tekst podstrony i meta description) obszar Berlin i Brandenburgia dotyczy tylko wizyt u klienta (strony i oprogramowanie bez ograniczenia obszaru); link „Usługi” usunięty ze stopki;
   - **zostało:** opcjonalnie Bing Places (import z Google, decyzja właściciela); miesięczna kontrola zapytań (standard, sekcja 11, pkt 5); przy niej sprawdzić w GSC, czy `/{locale}/services` (zwłaszcza `/de/services`) są zaindeksowane i mają wyświetlenia. Jeśli nie, przywrócić link „Usługi” w stopce (`src/components/layout/Footer.tsx`, usunięty 2026-11-27).

## 5. Inne otwarte sprawy

- Brak.
