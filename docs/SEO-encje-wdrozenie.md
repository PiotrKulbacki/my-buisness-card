# Wdrożenie standardu SEO i encji na piotrkulbacki.com

_Stan na 2026-11-26. Standard: `~/Developer/ebook-shop/docs/seo-encje.md` (tylko do odczytu; zmiany w nim wprowadza agent repo sklepu na prośbę użytkownika). Zakres tego repo: sekcja 12 (wiersz piotrkulbacki.com), 5.1, 6, 7, 8 i 13.3. Ten plik opisuje stan, plan i otwarte decyzje; po wdrożeniu stałe zasady trafiają do `docs/SEO.md`._

## 0. Zasada pracy: najpierw sprawdzić, potem wpisać

- Każdy fakt o Google, Bing, schema.org, IndexNow lub robotach AI pochodzi z dokumentacji źródłowej (link w sekcji 8). Czego źródło nie mówi wprost, oznaczamy **(wniosek)** albo **WYMAGA WERYFIKACJI** i nie przedstawiamy jako pewnika.
- Każda dana o użytkowniku (adres, obszar obsługi, telefon, usługi, godziny) pochodzi od użytkownika albo z jego wizytówki lub Impressum, słowo w słowo. Agent niczego nie dopisuje „na oko”.
- Formaty zapisu (sekcja 3) są wspólne dla czterech stron. Agent nie wybiera własnego formatu, tylko stosuje ten z sekcji 3 albo pyta.

## 1. Stan repo a standard

| Obszar                | Dziś                                                                                 | Standard                                                                                    | Do zrobienia                                                             |
| --------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `Person.@id`          | `https://cavunio.com/#piotr-kulbacki`                                                | `https://piotrkulbacki.com/#person`                                                         | zmiana w `siteConfig.identity`, razem z pozostałymi stronami (sekcja 12) |
| `Person.brand`        | typ `Brand`                                                                          | `OnlineStore` (Cavunio), `OnlineBusiness` (Dokiero, Lyamo)                                  | typ w `siteConfig.brands`                                                |
| `Person` pola         | `name`, `url`, `image`, `email`, `jobTitle` „Software Engineer”, `sameAs`, `brand`   | + `description`, `jobTitle` z opisu, `knowsAbout`, `knowsLanguage` pl/de/en, `homeLocation` | dodać; wszystko widoczne na stronie (zasada 1.4)                         |
| `ProfilePage`         | `url` = strona locale, bez dat                                                       | + `dateCreated`, `dateModified`, `isPartOf` → `#website`                                    | dodać (patrz decyzja D3 o `@id`)                                         |
| `WebSite`             | `inLanguage` = bieżący locale                                                        | `inLanguage` = 5 języków                                                                    | zmienić                                                                  |
| Opis osoby (sekcja 6) | brak; hero/meta: „Inżynier oprogramowania… Twórca Dokiero. Współpraca remote.”       | ten sam opis w 5 językach, widoczny                                                         | hero, „O mnie”, meta description                                         |
| `robots.txt`          | `User-agent: *`, `Allow: /`, `Disallow: /api/`, `/*/reply`                           | jak 8.1                                                                                     | zgodne; roboty AI dostają 200 (sprawdzone curl)                          |
| `sitemap.xml`         | `lastmod` = czas wygenerowania (`new Date()`), `changefreq`, `priority`              | prawdziwy `lastmod`; Google i Bing ignorują `changefreq`/`priority`                         | stałe daty zmian per trasa; usunąć `changefreq`/`priority`               |
| `hreflang`            | 5 wersji + `x-default` → `/en`, pełne URL, w HTML i w sitemapie                      | jak 8.3                                                                                     | zgodne                                                                   |
| Profile i marki       | widoczne linki w hero (6 profili + 3 marki); `sameAs` w kolejności `SELLER_PROFILES` | jak 7                                                                                       | zgodne; na produkcji już nowy TikTok (PR #8)                             |
| Stopka                | tylko linki prawne                                                                   | standard nie wymaga stopki na stronie osoby                                                 | dodać link do Support IT (sekcja 5, krok 6)                              |
| IndexNow              | brak                                                                                 | klucz + zgłoszenia po wdrożeniu                                                             | dodać                                                                    |
| Support IT            | brak podstrony i węzła                                                               | podstrona w 5 językach, `#it-support`, pętla z wizytówką                                    | dodać                                                                    |
| Strona główna domeny  | `/` → 307 → `/en` (dla robotów też)                                                  | `WebSite` na stronie głównej domeny                                                         | zgodne: Google bierze nazwę strony z celu przekierowania (źródło 8.1)    |

## 2. Wizytówka Google (odczyt 2026-11-26, widok publiczny Map)

| Pole                   | Wartość                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------- |
| Nazwa                  | Piotr Kulbacki                                                                        |
| Kategoria główna       | Projektowanie stron WWW                                                               |
| Kategorie dodatkowe    | niewidoczne publicznie                                                                |
| Adres                  | ukryty (firma z obszarem obsługi); pinezka 52.45906, 13.0157992 (okolice Poczdamu)    |
| Obszar obsługi         | niewidoczny publicznie                                                                |
| Telefon                | brak                                                                                  |
| Strona WWW             | `https://piotrkulbacki.com/` (strona główna)                                          |
| Godziny                | pn–czw 08:00–16:00, pt 08:00–14:00, sob–nd zamknięte                                  |
| Opis, usługi           | niewidoczne publicznie                                                                |
| Zdjęcia                | 2 od właściciela (stanowisko pracy)                                                   |
| Opinie                 | brak                                                                                  |
| Stały adres (z `cid`)  | `https://maps.google.com/?cid=6497189699195385071` (sprawdzony: otwiera tę wizytówkę) |
| Place ID (format Maps) | `0x25e28570731bbab1:0x5a2aa79b9ade34ef`                                               |

Panel właściciela (`business.google.com`) nie dał się odczytać przez rozszerzenie (strona nie kończyła ładowania). Obszar obsługi, ukryty adres, kategorie dodatkowe, usługi i opis podaje użytkownik (sekcja 6, A1).

## 3. Wspólne formaty zapisu (propozycja dla wszystkich czterech stron)

Dziś strony zapisują to samo różnie: `url` encji bez ukośnika (`https://cavunio.com`), `WebSite.url` z ukośnikiem (`https://cavunio.com/`), a lyamo.eu bez. Propozycja jednej reguły (wymaga zgody użytkownika i wpisu do standardu, sekcja 7, P2):

| Co                                      | Format                                                                                                        | Przykład                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Adres strony głównej domeny             | zawsze z ukośnikiem na końcu (ścieżka korzenia to `/`; tak w przykładach Google dla `WebSite`)                | `https://piotrkulbacki.com/`              |
| Adres podstrony                         | bez ukośnika na końcu, dokładnie jak `canonical` strony                                                       | `https://piotrkulbacki.com/de/it-support` |
| `@id`                                   | korzeń domeny z ukośnikiem + `#nazwa`, małe litery, bez ścieżki (poza encjami jednej strony)                  | `https://piotrkulbacki.com/#person`       |
| `@id` encji jednej podstrony            | kanoniczny URL podstrony + `#nazwa`                                                                           | `https://cavunio.com/ebooks/<slug>#book`  |
| Protokół i host                         | `https://`, bez `www` (chyba że kanoniczny host ma `www`)                                                     | `https://lyamo.eu/`                       |
| Profile w `sameAs`                      | dokładnie adres z linku na stronie, kolejność `SELLER_PROFILES`                                               | jak w `src/lib/seller.ts` sklepu          |
| Kody języków (`inLanguage`, `hreflang`) | BCP 47, małe litery, ukraiński `uk`                                                                           | `["pl","de","en","es","uk"]`              |
| Daty                                    | ISO 8601 z czasem i strefą                                                                                    | `2026-11-26T12:00:00+01:00`               |
| Godziny otwarcia                        | `openingHoursSpecification`, `dayOfWeek` nazwy angielskie, `opens`/`closes` `hh:mm:ss` (Google LocalBusiness) | `"Monday"`, `"08:00:00"`                  |
| Telefon (jeśli kiedyś)                  | z kodem kraju i kierunkowym (Google LocalBusiness)                                                            | `+49 …`                                   |
| Kolejność węzłów w `@graph`             | jak w szablonie standardu dla danej strony                                                                    | 5.1: `ProfilePage`, `Person`, `WebSite`   |
| Ucieczka w JSON-LD                      | `<` → `<`                                                                                                     | —                                         |

## 4. Opis osoby w 5 językach (do akceptacji)

Oba zdania z sekcji 6. PL jest zatwierdzony; pozostałe to tłumaczenia.

- **PL:** Piotr Kulbacki: przedsiębiorca z Berlina, autor poradników o AI i mediach społecznościowych (Cavunio), twórca aplikacji Dokiero i Lyamo. Oferuje też wsparcie IT u klienta w Berlinie i okolicach.
- **DE:** Piotr Kulbacki: Unternehmer aus Berlin, Autor von Ratgebern zu KI und Social Media (Cavunio), Entwickler der Apps Dokiero und Lyamo. Er bietet außerdem IT-Support vor Ort beim Kunden in Berlin und Umgebung.
- **EN:** Piotr Kulbacki: Berlin-based entrepreneur, author of guides on AI and social media (Cavunio), creator of the Dokiero and Lyamo apps. He also offers on-site IT support in Berlin and the surrounding area.
- **ES:** Piotr Kulbacki: emprendedor afincado en Berlín, autor de guías sobre IA y redes sociales (Cavunio), creador de las aplicaciones Dokiero y Lyamo. También ofrece soporte informático presencial en Berlín y alrededores.
- **UK:** Piotr Kulbacki: підприємець із Берліна, автор посібників про ШІ та соціальні мережі (Cavunio), творець застосунків Dokiero і Lyamo. Також надає ІТ-підтримку з виїздом до клієнта в Берліні та околицях.

Wynikające z opisu (propozycja):

| Pole         | PL                                                                                  | DE                                                                    | EN                                                                      | ES                                                                                   | UK                                                                                  |
| ------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `jobTitle`   | Przedsiębiorca                                                                      | Unternehmer                                                           | Entrepreneur                                                            | Emprendedor                                                                          | Підприємець                                                                         |
| `knowsAbout` | sztuczna inteligencja; media społecznościowe; tworzenie oprogramowania; wsparcie IT | Künstliche Intelligenz; Social Media; Softwareentwicklung; IT-Support | Artificial intelligence; Social media; Software development; IT support | Inteligencia artificial; Redes sociales; Desarrollo de software; Soporte informático | Штучний інтелект; Соціальні мережі; Розробка програмного забезпечення; ІТ-підтримка |

`description`, `jobTitle` i `knowsAbout` w JSON-LD każdej wersji językowej są w języku tej wersji, bo muszą odpowiadać widocznej treści (zasada 1.4) **(wniosek: Google nie opisuje wielojęzycznych `ProfilePage`)**. `knowsLanguage` zawsze `["pl","de","en"]` (decyzja 13.1.2).

## 5. Plan kroków (kod)

Jedna gałąź `seo/entity-standard`, jeden PR. Kroki 1–6 to kod; zmiana `@id` osoby wchodzi na produkcję w tych samych dniach co na pozostałych trzech stronach (standard, sekcja 12).

1. **Konfiguracja encji** (`src/config/site.ts`): `identity.personId` → `https://piotrkulbacki.com/#person`; `brands` z `type` (`OnlineStore` / `OnlineBusiness`); `identity.itSupportId`; adresy według sekcji 3; `knowsLanguage`, `homeLocation`; stały adres wizytówki.
2. **Teksty** (`messages/*.json`, 5 języków): opis z sekcji 4 widoczny w hero i w „O mnie”; `landing.role` = `jobTitle`; meta `title`/`description` na stronie głównej zgodne z opisem; `knowsAbout` widoczne (np. lista w „O mnie”).
3. **JSON-LD strony głównej** (`src/components/seo/JsonLd.tsx`): graf według 5.1 i sekcji 3; `ProfilePage` z `dateCreated`, `dateModified`, `isPartOf`; `WebSite.inLanguage` = 5 języków; odwołanie do `#it-support`, bo strona główna będzie linkować do Support IT.
4. **Podstrona Support IT** `/{locale}/it-support` (konwencja repo: angielska ścieżka we wszystkich językach, jak `/about`, `/impressum`): usługi, obszar (Berlin i okolice), godziny i dane NAP dokładnie jak w wizytówce, widoczny link „Zobacz w Google Maps” (stały adres z `cid`), kontakt przez `/contact`. JSON-LD: `LocalBusiness` z `@id` `https://piotrkulbacki.com/#it-support`, `name` „Piotr Kulbacki”, `url` = kanoniczny URL podstrony, `founder` → `#person`, `areaServed`, `openingHoursSpecification`, `sameAs` → wizytówka, `address` (decyzja D4). Typ: zwykły `LocalBusiness`, bo schema.org nie ma podtypu dla usług IT, a `ProfessionalService` jest oznaczony jako przestarzały (źródło 8.1). Trasa trafia do `getIndexableRoutes()`.
5. **Sitemap** (`src/lib/seo.ts`, `src/app/sitemap.ts`): `lastModified` = ręczna data ostatniej istotnej zmiany każdej trasy (pole w `getIndexableRoutes()`), bez `changefreq` i `priority`.
6. **Linki do Support IT**: pigułka obok marek w hero i link w stopce (nawigacja mobilna ma 4 kolumny; nie zmieniamy jej).
7. **IndexNow**: plik klucza `public/<klucz>.txt` (klucz losowy, szesnastkowy, 32 znaki); skrypt `scripts/indexnow.mjs` zgłaszający zmienione adresy (`POST https://api.indexnow.org/indexnow`, JSON `host`, `key`, `urlList`) uruchamiany ręcznie po wdrożeniu produkcji (decyzja D5).
8. **Dokumentacja**: `docs/SEO.md` (nowe `@id`, formaty z sekcji 3, Support IT, IndexNow), `docs/otwarte-sprawy.md`.
9. **Kontrola** (standard, sekcja 11): lint, typecheck, build, format; lokalnie graf JSON-LD (każde `@id` z typem z tabeli 3 standardu, brak `cavunio.com/#piotr-kulbacki`); po wdrożeniu Rich Results Test i Schema Markup Validator dla `/pl`, `/en` i `/de/it-support`; curl z UA robotów AI → 200.

## 6. Potrzebne od użytkownika

**Decyzje:**

- **D1. Tłumaczenia opisu i `jobTitle`/`knowsAbout`** (sekcja 4): akceptacja lub poprawki.
- **D2. Format adresów** (sekcja 3): korzeń z ukośnikiem, podstrony bez. Dotyczy wszystkich czterech stron, więc wymaga wpisu do standardu (P2).
- **D3. `@id` strony profilu:** dziś pięć wersji językowych ma ten sam `@id` `#profile` przy różnych `url`, czyli jeden identyfikator opisuje pięć różnych adresów. Propozycja: `@id` = kanoniczny URL wersji + `#profile` (np. `https://piotrkulbacki.com/pl#profile`), tak jak ebooki (`<URL>#book`). Do `#profile` nie odwołuje się żadna inna strona. Wymaga zmiany tabeli 3 standardu (P3).
- **D4. Adres w `#it-support`:** Google wymaga `address` w `LocalBusiness`, a wizytówka ukrywa adres. Dokumentacja Google nie mówi, czy wystarczy adres częściowy (miejscowość, kod, kraj): **WYMAGA WERYFIKACJI**. Opcje: (a) tylko miejscowość/region/kraj zgodne z wizytówką; (b) pełny adres z Impressum (Bendastr. 11, 12051 Berlin, już publiczny na stronie). Pinezka wizytówki leży przy Poczdamie, nie w Neukölln: proszę podać, jaki adres jest w panelu wizytówki, żeby dane się nie wykluczały.
- **D5. IndexNow:** zgłoszenie ręczne skryptem po wdrożeniu (proste, bez sekretów w CI) czy automatyczne w GitHub Actions po wdrożeniu Vercel. Rekomendacja: ręcznie, bo strona zmienia się rzadko.

**Dane z panelu wizytówki** (zrzut ekranu lub wklejony tekst):

- **A1.** Obszar obsługi (lista miejscowości/regionów), ukryty adres, kategorie dodatkowe, lista usług, obecny opis.
- **A2.** Lista usług Support IT do podstrony (np. konfiguracja komputerów, sieci i Wi-Fi, drukarki, kopie zapasowe, Microsoft 365…) i czy wizyty są tylko po umówieniu.
- **A3.** Język adresu w wizytówce (strona WWW): która wersja podstrony, np. `/de/it-support` (klienci w Berlinie) czy `/pl/it-support`.

## 7. Wizytówka: co poprawić (działania użytkownika w panelu)

1. **Kategoria główna** to „Projektowanie stron WWW”. Wizytówka ma reprezentować Support IT (standard 9 i 13.3), więc kategoria główna powinna opisywać usługi IT: wybrać z listy w panelu najtrafniejszą (np. kategorię typu usługi komputerowe/wsparcie IT; dokładną nazwę widać tylko w panelu). „Projektowanie stron WWW” może zostać dodatkową, jeśli tę usługę też oferujesz lokalnie. Google: jak najmniej kategorii, jak najbardziej szczegółowe.
2. **Strona WWW** → podstrona Support IT (po wdrożeniu kroku 4), nie strona główna.
3. **Godziny:** Google: firmy działające tylko po umówieniu nie powinny podawać godzin. Jeśli wizyty są tylko po umówieniu, usunąć godziny; jeśli te godziny są prawdziwe, zostają i trafiają słowo w słowo na podstronę.
4. **Opis firmy:** bez linków, cen i promocji (wytyczne Google). Tekst przygotuję po A1/A2, zgodny z opisem z sekcji 4. Limit 750 znaków podaje standard; strona wytycznych go nie potwierdziła: **WYMAGA WERYFIKACJI** w panelu.
5. **Usługi** z krótkimi opisami (te same co na podstronie), **zdjęcia** prawdziwe (np. przy pracy u klienta, za zgodą), **opinie** tylko od prawdziwych klientów, bez zachęt.
6. **Nazwa** „Piotr Kulbacki” bez dopisków: zgodna z wytycznymi.

## 8. Propozycje zmian do `seo-encje.md` (do przekazania agentowi sklepu)

- **P1. Zasada weryfikacji** (do sekcji 1): każdy fakt techniczny ze źródła z sekcji 14; reszta oznaczona „(wniosek)” albo „WYMAGA WERYFIKACJI”; dane osoby tylko od użytkownika lub z jego wizytówki/Impressum.
- **P2. Wspólne formaty** (nowa sekcja): tabela z sekcji 3 tego pliku; szablony 5.1–5.3 poprawione tak, by `url` strony głównej miał ukośnik.
- **P3. `ProfilePage.@id` per wersja językowa** (tabela 3 i szablon 5.1): `<kanoniczny URL wersji>#profile`; `url` = kanoniczny URL wersji (nie `https://piotrkulbacki.com/`, bo korzeń przekierowuje na `/en`).
- **P4. Support IT** (tabela 3, 13.3): typ `LocalBusiness` bez podtypu (schema.org nie ma podtypu IT; `ProfessionalService` przestarzały). Dokumentacja Google LocalBusiness nie wymienia `areaServed`, `sameAs` ani `founder`: to właściwości schema.org **(wniosek)**. Adres częściowy przy firmie z obszarem obsługi: **WYMAGA WERYFIKACJI**.
- **P5. Sitemap** (8.2): Google też ignoruje `changefreq` i `priority`, a `lastmod` używa tylko wtedy, gdy jest „consistently and verifiably” prawdziwy.
- **P6. Nazwa strony przy przekierowaniu korzenia** (8.4): przy `/` → `/en` Google bierze nazwę z celu przekierowania, więc `WebSite` na stronie głównej każdej wersji językowej wystarcza.

### 8.1 Źródła sprawdzone przy tym planie (2026-11-26)

- Google, LocalBusiness: https://developers.google.com/search/docs/appearance/structured-data/local-business (wymagane `name`, `address`; najbardziej szczegółowy podtyp; `openingHoursSpecification` w `hh:mm:ss`; telefon z kodem kraju)
- Google Business Profile, wytyczne: https://support.google.com/business/answer/3038177 (nazwa bez dopisków; ukryty adres przy obszarze obsługi; jak najmniej kategorii; opis bez linków i cen; godziny nie dla „tylko po umówieniu”)
- schema.org: https://schema.org/LocalBusiness (podtypy), https://schema.org/ProfessionalService (oznaczony jako przestarzały)
- Google, nazwy stron: https://developers.google.com/search/docs/appearance/site-names (korzeń domeny; przy przekierowaniu nazwa z celu; brak nazw dla podkatalogów)
- Google, wersje językowe: https://developers.google.com/search/docs/specialty/international/localized-versions (pełne URL; każda wersja wskazuje siebie i pozostałe; `x-default`)
- Google, ProfilePage: https://developers.google.com/search/docs/appearance/structured-data/profile-page (`mainEntity` wymagane; `dateCreated`/`dateModified` zalecane; bez obrazów zastępczych)
- IndexNow: https://www.indexnow.org/documentation (klucz 8–128 znaków, plik `<klucz>.txt` w korzeniu, POST JSON do 10 000 adresów, kody 200/202/400/403/422/429)
- Google, sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (`lastmod` tylko prawdziwy; `changefreq`/`priority` ignorowane)
