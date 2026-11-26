# Wdrożenie standardu SEO i encji na piotrkulbacki.com

_Stan na 2026-11-26. Standard: `~/Developer/ebook-shop/docs/seo-encje.md`, wersja 2 (PR ebook-shop #107; dopóki nie jest scalony, czytać z `origin/docs/seo-standard-v2`). Tam są zasady (w tym zasada 7: najpierw sprawdzić w źródłach), formaty zapisu (1.1), szablon JSON-LD strony głównej (5.1), zatwierdzony opis osoby (6) i ustalenia dla firmy lokalnej `#business` (13.3). Ten plik to plan prac w tym repo i dane firmy (lista usług, opis wizytówki); nie powtarza standardu._

## 1. Stan repo względem standardu (przegląd 2026-11-26)

| Obszar           | Dziś                                                                                                                         | Do zrobienia                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Person.@id`     | `https://cavunio.com/#piotr-kulbacki`                                                                                        | `https://piotrkulbacki.com/#person` (te same dni co pozostałe 3 strony)                  |
| `Person.brand`   | typ `Brand`, `url` bez ukośnika                                                                                              | `OnlineStore` / `OnlineBusiness`, `url` z ukośnikiem (1.1)                               |
| `Person` pola    | `jobTitle` „Software Engineer”; brak `description`, `knowsAbout`, `knowsLanguage`, `homeLocation`                            | według 5.1 i 6.3, w języku wersji; `url` `https://piotrkulbacki.com/`                    |
| `ProfilePage`    | jeden `@id` `#profile` dla 5 adresów, bez dat                                                                                | `@id` = URL wersji + `#profile`, `inLanguage`, `dateCreated`, `dateModified`, `isPartOf` |
| `WebSite`        | `inLanguage` = bieżący locale                                                                                                | 5 języków                                                                                |
| Widoczny opis    | hero/meta/„O mnie”: „Inżynier oprogramowania… Twórca Dokiero. Współpraca remote.”                                            | opis 6.1 i `jobTitle` 6.3 w 5 językach                                                   |
| `sitemap.xml`    | `lastmod` = czas generowania, `changefreq`, `priority`                                                                       | ręczne daty istotnych zmian per trasa; bez `changefreq`/`priority` (8.2)                 |
| IndexNow         | brak                                                                                                                         | klucz w `public/`, skrypt zgłoszeń                                                       |
| Firma lokalna    | brak podstrony i węzła                                                                                                       | etap 2: `/{locale}/services` + `#business` (13.3)                                        |
| Zgodne bez zmian | `robots.txt` (8.1), roboty AI dostają 200, `hreflang` 5 + `x-default`, `sameAs` w kolejności `SELLER_PROFILES`, ucieczka `<` | —                                                                                        |

## 2. Plan

### Etap 1: dom osoby (gałąź `seo/entity-standard`, draft PR #9)

1. `src/config/site.ts`: `identity.personId` → `#person`; `personUrl`/`websiteUrl` `https://piotrkulbacki.com/`; `brands` z `type` i `url` z ukośnikiem; `knowsLanguage`, `homeLocation`; stały adres wizytówki (`https://maps.google.com/?cid=6497189699195385071`).
2. `messages/*.json` (5 języków): opis 6.1 w hero (zamiast `landing.tagline`) i w „O mnie”; `landing.role` = `jobTitle` 6.3 (zastępuje „Inżynier oprogramowania”); meta `title`/`description` strony głównej zgodne z opisem; `knowsAbout` widoczne w „O mnie”.
3. `src/components/seo/JsonLd.tsx`: graf według 5.1 (`ProfilePage`, `Person`, `WebSite`), formaty 1.1.
4. `src/lib/seo.ts`, `src/app/sitemap.ts`: `lastModified` per trasa (ręczna data), bez `changefreq`/`priority`.
5. IndexNow: `public/<klucz>.txt` (32 znaki szesnastkowe), `scripts/indexnow.mjs` (POST `https://api.indexnow.org/indexnow`, `host`, `key`, `urlList`), uruchamiany ręcznie po wdrożeniu produkcji.
6. Dokumentacja: `docs/SEO.md` (nowe `@id`, odesłanie do standardu), `docs/otwarte-sprawy.md`.
7. Kontrola: `npm run lint`, `typecheck`, `build`, `format:check`; lokalnie graf (każde `@id` z typem z tabeli 3 standardu, brak `cavunio.com/#piotr-kulbacki`); po wdrożeniu Rich Results Test i Schema Markup Validator (`/pl`, `/en`), curl z UA robotów AI.

### Etap 2: podstrona Usługi i `#business` (ten sam PR)

1. Trasa `/{locale}/services` (angielska ścieżka we wszystkich językach, jak `/about`), w nawigacji nie (mobilna ma 4 kolumny); link z hero (obok marek) i ze stopki; trasa w `getIndexableRoutes()`.
2. Treść: trzy grupy usług z sekcji 3 (nazwy przetłumaczone na 5 języków; DE to źródło), obszar „Berlin i Brandenburgia”, kontakt (`/contact`, telefon według 13.3 pkt 4 standardu), link „Google Maps” do stałego adresu.
3. JSON-LD na podstronie: `LocalBusiness` `#business` według 13.3 standardu (adres częściowy, `areaServed`, `hasOfferCatalog`, `telephone`, `founder`, `sameAs`, bez ocen i godzin). Na stronie głównej krótkie odwołanie do `#business`.
4. Po wdrożeniu: użytkownik ustawia stronę WWW wizytówki na `https://piotrkulbacki.com/de/services`.

### Etap 3: po wdrożeniu (poza kodem)

1. Scalenie PR #9 dopiero, gdy cavunio.com, dokiero.com i lyamo.eu są gotowe ze zmianą `@id` osoby (standard, sekcja 12).
2. IndexNow: zgłoszenie zmienionych adresów skryptem.
3. Bio na profilach: opis 6.1 (LinkedIn, YouTube) lub 6.2 (Instagram, TikTok, Facebook, GitHub), link `https://piotrkulbacki.com/`.

## 3. Usługi w wizytówce (od użytkownika, 2026-11-26; jedno źródło)

**Serwis komputerowy** (kategoria główna): IT-Support vor Ort; IT-Fernwartung; Computer- und Laptop-Hilfe; PC- und Laptop-Einrichtung; Softwareinstallation; Windows-Support; macOS- und iOS-Support; Druckereinrichtung; WLAN- und Netzwerkeinrichtung; E-Mail-Einrichtung; Smartphone- und Tablet-Einrichtung; IT-Beratung; Technische Fehlerbehebung; Datensicherung.

**Projektowanie stron WWW** (dodatkowa): Webdesign; Website-Entwicklung; Website-Redesign; Online-Shop-Erstellung; Website-Wartung und Betreuung; Technische SEO-Optimierung; Domain- und Hosting-Einrichtung.

**Producent oprogramowania** (dodatkowa): Individuelle Softwareentwicklung; Webanwendungsentwicklung; Mobile App-Entwicklung; SaaS-Entwicklung; API-Integration; Prozessautomatisierung; Datenbankentwicklung.

Obszar obsługi: Berlin i Brandenburgia. Telefon w wizytówce: 01573 5166871. Godziny: brak.

## 4. Opis wizytówki (szkic do wklejenia w panelu, DE, 681 znaków)

Limit 750 znaków; bez linków, cen i promocji (wytyczne Google). Treść tylko z listy usług i zatwierdzonego opisu osoby.

> Piotr Kulbacki: IT-Support, Webdesign und Softwareentwicklung in Berlin und Brandenburg. IT-Support vor Ort und per Fernwartung: Einrichtung von PCs, Laptops, Druckern, WLAN, Netzwerken, E-Mail, Smartphones und Tablets, Windows-, macOS- und iOS-Support, Softwareinstallation, Fehlerbehebung, Datensicherung und IT-Beratung. Webdesign: neue Websites, Redesign, Online-Shops, Wartung und Betreuung, technische SEO-Optimierung sowie Domain- und Hosting-Einrichtung. Softwareentwicklung: individuelle Software, Webanwendungen, mobile Apps, SaaS, API-Integrationen, Prozessautomatisierung und Datenbanken. Eigene Produkte: Dokiero und Lyamo. Beratung auf Deutsch, Polnisch und Englisch.
