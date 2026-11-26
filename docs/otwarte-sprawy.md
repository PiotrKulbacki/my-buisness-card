# Otwarte sprawy

## 1. Aktualny stan projektu

- Strona wizytówka Next.js 16 (App Router, next-intl, 5 locale: pl/en/de/es/uk), hosting Vercel, domena `piotrkulbacki.com`.
- Postęp i historia zmian: `PROJECT_CHECKLIST.md`; SEO i JSON-LD: `docs/SEO.md`; wdrożenie: `docs/DEPLOY.md`.
- JSON-LD tylko na stronie głównej (`src/components/seo/JsonLd.tsx`), jeden `@graph`: Person + ProfilePage + WebSite. Dane w `siteConfig.identity` i `siteConfig.brands` (`src/config/site.ts`).
- Wspólny standard SEO i encji czterech stron: `~/Developer/ebook-shop/docs/seo-encje.md`, wersja 2 w PR ebook-shop #107. Dopóki nie jest scalony: `git -C ~/Developer/ebook-shop fetch && git -C ~/Developer/ebook-shop show origin/docs/seo-standard-v2:docs/seo-encje.md`. Agent tego repo może go edytować (zasady w nagłówku standardu).
- Plan wdrożenia, lista usług i opis wizytówki: `docs/SEO-encje-wdrozenie.md`.
- Wizytówka Google: stały adres `https://maps.google.com/?cid=6497189699195385071`; stan w standardzie, sekcja 13.3. Panel właściciela (`business.google.com`) nie otwiera się w Claude in Chrome; widok publiczny Map działa.

## 2. Decyzje właściciela

- Standard `seo-encje.md` (sekcja 13.1, decyzje 1–12) obowiązuje; nie pytać o nie ponownie.
- Opis osoby, wersja 2 (standard, sekcja 6), zatwierdzony w 5 językach (2026-11-26). Kontekst: strony internetowe, aplikacje, SaaS, automatyzacje; dalej ebooki (Cavunio) i Support IT. „Inżynier oprogramowania” (z kursu) zostaje zastąpione.
- Fakty techniczne tylko ze sprawdzonych źródeł; niepewne oznaczać „(wniosek)” lub „WYMAGA WERYFIKACJI”. Formaty zapisu ze standardu, sekcja 1.1 (strona główna z ukośnikiem, podstrony bez).
- Wizytówka: kategorie Serwis komputerowy (główna), Projektowanie stron WWW, Producent oprogramowania; obszar Berlin i Brandenburgia; telefon zostaje; adres domowy ukryty.
- Adres w Impressum (Bendastr. 11) to adres domowy i siedziba działalności; zostaje w Impressum (§ 5 DDG); w danych strukturalnych bez ulicy.
- `Person.@id` zmienia się na `https://piotrkulbacki.com/#person` w tych samych dniach co na cavunio.com, dokiero.com i lyamo.eu.
- Jednoosobowa działalność bez nazwy firmy: brak węzła `Organization`; firma lokalna w JSON-LD to `LocalBusiness` `#business` o nazwie „Piotr Kulbacki”.
- `sameAs` = wszystkie profile widoczne na stronie (`siteConfig.social`), kolejność jak `SELLER_PROFILES` w repo sklepu.
- Instagram `https://www.instagram.com/piotr.kulbacki/`, TikTok `https://www.tiktok.com/@piotr_kulbacki_youtube`.
- Bez numeru telefonu na stronie (2026-10-19); wyjątek do potwierdzenia na starcie etapu 2: numer z wizytówki tylko na podstronie Usługi (rekomendacja, spójne NAP).

## 3. Akcje dla właściciela

- Scalić PR ebook-shop #107 (standard v2).
- Wkleić opis wizytówki z `docs/SEO-encje-wdrozenie.md`, sekcja 4.
- Wizytówka: opinie od prawdziwych klientów (planowane ≥ 4), bez zachęt.
- Po wdrożeniu etapu 2: strona WWW wizytówki → `https://piotrkulbacki.com/de/services`.

## 4. Zadanie w toku: standard SEO i encji (nowa gałąź od `main`: `seo/entity-home`, nowy PR)

Etapy (szczegóły w `docs/SEO-encje-wdrozenie.md`, sekcja 2):

1. Przegląd, odczyt wizytówki, standard v2, opis zatwierdzony, dane firmy - **zrobione** (2026-11-26).
2. Etap 1 kodu: dom osoby (kroki 1–7) - **następny krok**, wszystkie dane są.
3. Etap 2 kodu: podstrona `/{locale}/services` i `#business` - po etapie 1; na starcie potwierdzić telefon na podstronie.
4. Etap 3: scalenie PR z kodem razem z pozostałymi stronami, IndexNow, bio na profilach.

## 5. Inne otwarte sprawy

Brak.
