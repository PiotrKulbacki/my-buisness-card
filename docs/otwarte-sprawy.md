# Otwarte sprawy

## 1. Aktualny stan projektu

- Strona wizytówka Next.js 16 (App Router, next-intl, 5 locale: pl/en/de/es/uk), hosting Vercel, domena `piotrkulbacki.com`.
- Postęp i historia zmian: `PROJECT_CHECKLIST.md`; SEO i JSON-LD: `docs/SEO.md`; wdrożenie: `docs/DEPLOY.md`.
- JSON-LD tylko na stronie głównej (`src/components/seo/JsonLd.tsx`), jeden `@graph`: Person + ProfilePage + WebSite. Dane w `siteConfig.identity` i `siteConfig.brands` (`src/config/site.ts`).
- Wspólny standard SEO i encji czterech stron: `~/Developer/ebook-shop/docs/seo-encje.md`. Wersja 2 w PR ebook-shop #107 (gałąź `docs/seo-standard-v2`); do scalenia czytać ją z tej gałęzi (`git -C ~/Developer/ebook-shop show origin/docs/seo-standard-v2:docs/seo-encje.md`). Agent tego repo może go edytować (zasady w nagłówku standardu).
- Plan wdrożenia w tym repo: `docs/SEO-encje-wdrozenie.md`.
- Wizytówka Google (Support IT): stały adres `https://maps.google.com/?cid=6497189699195385071`; stan w standardzie, sekcja 13.3. Panel właściciela (`business.google.com`) nie otwiera się w Claude in Chrome; widok publiczny Map działa.

## 2. Decyzje właściciela

- Standard `seo-encje.md` (sekcja 13.1, decyzje 1–10) obowiązuje; nie pytać o nie ponownie.
- Fakty techniczne tylko ze sprawdzonych źródeł; niepewne oznaczać „(wniosek)” lub „WYMAGA WERYFIKACJI”. Formaty zapisu ze standardu, sekcja 1.1 (strona główna z ukośnikiem, podstrony bez).
- Kontekst zawodowy: przede wszystkim strony internetowe, aplikacje, SaaS, automatyzacje; dalej ebooki (Cavunio) i Support IT. „Inżynier oprogramowania” wynikało z kursu i zostaje zastąpione.
- Adres domowy nie jest publiczny w wizytówce.
- `Person.@id` zmienia się na `https://piotrkulbacki.com/#person` w tych samych dniach co na cavunio.com, dokiero.com i lyamo.eu.
- Jednoosobowa działalność bez nazwy firmy: brak węzła `Organization`; nazwa w wizytówce i `#it-support`: „Piotr Kulbacki”.
- `sameAs` = wszystkie profile widoczne na stronie (`siteConfig.social`), kolejność jak `SELLER_PROFILES` w repo sklepu.
- Instagram `https://www.instagram.com/piotr.kulbacki/`, TikTok `https://www.tiktok.com/@piotr_kulbacki_youtube`.
- Bez numeru telefonu na stronie i w JSON-LD (2026-10-19) - do ponownej decyzji przy Support IT (wizytówka pokazuje numer publicznie).

## 3. Akcje dla właściciela

- Zaakceptować opis osoby, wersja 2 (standard, sekcja 6) lub podać poprawki.
- Scalić PR ebook-shop #107 (standard v2).
- Odpowiedzieć na punkty 3–6 z `docs/SEO-encje-wdrozenie.md`, sekcja 3 (telefon, zrzut panelu wizytówki, lista usług, języki bio).
- Wizytówka: zebrać opinie od prawdziwych klientów (planowane ≥ 4), bez zachęt.

## 4. Zadanie w toku: standard SEO i encji (gałąź `seo/entity-standard`, draft PR #9)

Etapy:

1. Przegląd repo i produkcji względem standardu - **zrobione**.
2. Odczyt wizytówki - **zrobione** (widok publiczny, 2026-11-26 wieczorem; dane z panelu od użytkownika).
3. Standard v2 w repo sklepu (formaty, zasada weryfikacji, opis v2, 13.3) - **zrobione, PR ebook-shop #107**.
4. Etap 1 kodu (dom osoby, kroki 1–8 w planie) - **nie rozpoczęty**; następny krok po akceptacji opisu v2.
5. Etap 2 kodu (Support IT) - po liście usług i decyzji o telefonie.

## 5. Inne otwarte sprawy

- Impressum (`/impressum`) pokazuje adres Bendastr. 11, 12051 Berlin (wymóg § 5 DDG: adres do doręczeń). Jeśli to adres domowy, którego użytkownik nie chce publikować, czy wystarczy adres z usługi biurowej: **WYMAGA WERYFIKACJI** (prawnik lub izba IHK); poza zakresem obecnego zadania, decyzja użytkownika.
