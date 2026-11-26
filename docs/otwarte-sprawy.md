# Otwarte sprawy

## 1. Aktualny stan projektu

- Strona wizytówka Next.js 16 (App Router, next-intl, 5 locale: pl/en/de/es/uk), hosting Vercel, domena `piotrkulbacki.com`.
- Postęp i historia zmian: `PROJECT_CHECKLIST.md`; SEO i JSON-LD: `docs/SEO.md`; wdrożenie: `docs/DEPLOY.md`.
- JSON-LD tylko na stronie głównej (`src/components/seo/JsonLd.tsx`), jeden `@graph`: Person + ProfilePage + WebSite. Dane w `siteConfig.identity` i `siteConfig.brands` (`src/config/site.ts`).
- Wspólny standard SEO i encji czterech stron: `~/Developer/ebook-shop/docs/seo-encje.md` (tylko do odczytu; zmiany zgłaszać użytkownikowi). Plan wdrożenia w tym repo: `docs/SEO-encje-wdrozenie.md`.

## 2. Decyzje właściciela

- Standard `seo-encje.md` sekcja 13.1 obowiązuje (opis osoby, `knowsLanguage` pl/de/en, Support IT z wizytówką, nazwa firmy „Piotr Kulbacki”). Nie pytać o to ponownie.
- `Person.@id` zmienia się na `https://piotrkulbacki.com/#person` w tych samych dniach co na cavunio.com, dokiero.com i lyamo.eu (standard, sekcja 12).
- Fakty techniczne tylko ze sprawdzonych źródeł; niepewne oznaczać „(wniosek)” lub „WYMAGA WERYFIKACJI”. Formaty zapisu (URL, daty, języki) wspólne dla czterech stron.
- Jednoosobowa działalność bez nazwy firmy: brak węzła `Organization` w JSON-LD (2026-11-26).
- `sameAs` = wszystkie profile widoczne na stronie (`siteConfig.social`), kolejność jak `SELLER_PROFILES` w repo sklepu.
- Instagram `https://www.instagram.com/piotr.kulbacki/`, TikTok `https://www.tiktok.com/@piotr_kulbacki_youtube`.
- Bez numeru telefonu na stronie i w JSON-LD (2026-10-19).

## 3. Akcje dla właściciela

- Odpowiedzieć na decyzje D1–D5 i podać dane A1–A3 z `docs/SEO-encje-wdrozenie.md`, sekcja 6.
- Wizytówka Google: poprawki z `docs/SEO-encje-wdrozenie.md`, sekcja 7 (kategoria główna, strona WWW → podstrona Support IT po wdrożeniu, godziny, opis, usługi).
- Przekazać agentowi sklepu propozycje P1–P6 zmian standardu (`docs/SEO-encje-wdrozenie.md`, sekcja 8).

## 4. Zadanie w toku: standard SEO i encji (gałąź `seo/entity-standard`)

Etapy:

1. Przegląd repo i produkcji względem standardu - **zrobione** (2026-11-26).
2. Odczyt wizytówki Google - **zrobione częściowo** (widok publiczny; panel właściciela niedostępny dla rozszerzenia, dane A1 od użytkownika).
3. Opis osoby w 5 językach - **przygotowany, czeka na akceptację (D1)**.
4. Plan w `docs/SEO-encje-wdrozenie.md` - **zrobione, czeka na akceptację**.
5. Kod: kroki 1–9 z sekcji 5 planu - **nie rozpoczęte**; następny krok po odpowiedziach D1–D5 i A1–A3.

## 5. Inne otwarte sprawy

Brak.
