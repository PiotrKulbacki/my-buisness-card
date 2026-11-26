# Wdrożenie standardu SEO i encji na piotrkulbacki.com

_Stan na 2026-11-26. Standard: `~/Developer/ebook-shop/docs/seo-encje.md`, wersja 2 (PR ebook-shop #107; do scalenia czytać go z gałęzi `docs/seo-standard-v2`). Tam są zasady (w tym zasada 7: najpierw sprawdzić w źródłach), formaty zapisu (1.1), opis osoby (6), stan wizytówki i ustalenia Support IT (13.3). Ten plik to plan i stan prac w tym repo; nie powtarza standardu._

## 1. Stan repo względem standardu (przegląd 2026-11-26)

| Obszar           | Dziś                                                                                                                         | Do zrobienia                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Person.@id`     | `https://cavunio.com/#piotr-kulbacki`                                                                                        | `https://piotrkulbacki.com/#person` (te same dni co pozostałe 3 strony)                  |
| `Person.brand`   | typ `Brand`, `url` bez ukośnika                                                                                              | `OnlineStore` / `OnlineBusiness`, `url` z ukośnikiem (1.1)                               |
| `Person` pola    | `jobTitle` „Software Engineer”; brak `description`, `knowsAbout`, `knowsLanguage`, `homeLocation`                            | według 5.1 i 6.3, w języku wersji; `url` `https://piotrkulbacki.com/`                    |
| `ProfilePage`    | jeden `@id` `#profile` dla 5 adresów, bez dat                                                                                | `@id` = URL wersji + `#profile`, `inLanguage`, `dateCreated`, `dateModified`, `isPartOf` |
| `WebSite`        | `inLanguage` = bieżący locale                                                                                                | 5 języków                                                                                |
| Widoczny opis    | hero/meta/„O mnie”: „Inżynier oprogramowania… Twórca Dokiero. Współpraca remote.”                                            | opis 6.1 i `jobTitle` 6.3 w 5 językach (Support IT widoczny na stronie głównej)          |
| `sitemap.xml`    | `lastmod` = czas generowania, `changefreq`, `priority`                                                                       | ręczne daty istotnych zmian per trasa; bez `changefreq`/`priority` (8.2)                 |
| IndexNow         | brak                                                                                                                         | klucz w `public/`, skrypt zgłoszeń                                                       |
| Support IT       | brak                                                                                                                         | etap 2 (podstrona + `#it-support`), patrz 13.3 standardu                                 |
| Zgodne bez zmian | `robots.txt` (8.1), roboty AI dostają 200, `hreflang` 5 + `x-default`, `sameAs` w kolejności `SELLER_PROFILES`, ucieczka `<` | —                                                                                        |

## 2. Plan

### Etap 1: dom osoby (kod, gałąź `seo/entity-standard`, PR #9)

Warunek startu: akceptacja opisu z sekcji 6 standardu (wersja 2).

1. `src/config/site.ts`: `identity.personId` → `#person`; `personUrl`/`websiteUrl` `https://piotrkulbacki.com/`; `brands` z `type` i `url` z ukośnikiem; `knowsLanguage`, `homeLocation`; stały adres wizytówki (`https://maps.google.com/?cid=6497189699195385071`); `role` zastąpione tłumaczeniem `jobTitle`.
2. `messages/*.json` (5 języków): opis 6.1 w hero (zamiast `landing.tagline`) i w „O mnie”; `landing.role` = `jobTitle` 6.3; meta `title`/`description` strony głównej zgodne z opisem; `knowsAbout` widoczne w „O mnie”.
3. `src/components/seo/JsonLd.tsx`: graf według 5.1 (`ProfilePage`, `Person`, `WebSite`), formaty 1.1.
4. `src/lib/seo.ts`, `src/app/sitemap.ts`: `lastModified` per trasa (ręczna data), bez `changefreq`/`priority`.
5. IndexNow: `public/<klucz>.txt` (32 znaki szesnastkowe), `scripts/indexnow.mjs` (POST `https://api.indexnow.org/indexnow`, `host`, `key`, `urlList`), uruchamiany ręcznie po wdrożeniu produkcji (rekomendacja; strona zmienia się rzadko).
6. Dokumentacja: `docs/SEO.md` (nowe `@id`, odesłanie do standardu), `docs/otwarte-sprawy.md`.
7. Kontrola: `npm run lint`, `typecheck`, `build`, `format:check`; lokalnie graf (każde `@id` z typem z tabeli 3, brak `cavunio.com/#piotr-kulbacki`); po wdrożeniu Rich Results Test i Schema Markup Validator (`/pl`, `/en`), curl z UA robotów AI.
8. Scalenie PR #9 dopiero, gdy cavunio.com, dokiero.com i lyamo.eu są gotowe ze zmianą `@id` (standard, sekcja 12).

### Etap 2: Support IT

Po liście usług od użytkownika. Podstrona `/{locale}/it-support` (angielska ścieżka we wszystkich językach, jak `/about`), `LocalBusiness` `#it-support` według 13.3 standardu, link z hero i stopki, odwołanie z grafu strony głównej, trasa w sitemapie, tekst opisu wizytówki (≤ 750 znaków), potem strona WWW wizytówki → `/de/it-support`.

## 3. Potrzebne od użytkownika

1. **Akceptacja opisu, wersja 2** (standard, sekcja 6.1–6.3: pełny, krótki, `jobTitle`, `knowsAbout`).
2. **Scalenie PR ebook-shop #107** (standard v2), żeby wszyscy agenci czytali tę samą wersję.
3. **Telefon na stronie:** wizytówka pokazuje 01573 5166871 publicznie, a strona ma decyzję „bez telefonu” (2026-10-19). Rekomendacja: numer tylko na podstronie Support IT i w `#it-support` (spójne dane NAP).
4. **Z panelu wizytówki** (zrzut ekranu): obszar obsługi, miejscowość ukrytego adresu, kategorie dodatkowe, usługi, opis. Panel nie otwiera się w Claude in Chrome.
5. **Lista usług Support IT** i czy wizyty są tylko po umówieniu (godziny w wizytówce usunięte: zgodne z Google przy wizytach po umówieniu).
6. **Bio na profilach** (po akceptacji opisu): w jakim języku każdy profil; limity Instagram/TikTok/Facebook do sprawdzenia w polu edycji (oficjalne strony pomocy ich nie podają).
