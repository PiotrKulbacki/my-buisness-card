# Personal Brand Website – Project Documentation (v2.1)

> Brief wstępny (kierunek produktu). **Aktualny stan i runbooki:** `PROJECT_CHECKLIST.md`, `docs/SEO.md`, `docs/DEPLOY.md`, `docs/Projects_Section.md`, `docs/Legal_and_Cookies.md`, `docs/Brand_Logo.md`, `docs/CV_Online.md`.

## Cel projektu

Celem jest stworzenie nowoczesnej, profesjonalnej strony internetowej będącej jednocześnie:

- wizytówką firmy,
- portfolio projektów,
- prezentacją produktów,
- ofertą usług,
- centralnym miejscem budowania marki osobistej.

Strona ma budować zaufanie, pokazywać jakość wykonywanej pracy i zachęcać do kontaktu.

Nie ma być zwykłym portfolio programisty ani kopią innych stron. Inspiracje służą jedynie do wypracowania własnego stylu.

---

# Założenia

Projekt powinien być:

- nowoczesny,
- szybki,
- responsywny,
- dobrze przygotowany pod SEO,
- łatwy do rozbudowy,
- wielojęzyczny,
- profesjonalny wizualnie.

Animacje i efekty mają podkreślać jakość wykonania, a nie odwracać uwagi od treści.

---

# Kierunek projektu

Najważniejszy jest czytelny przekaz.

Po krótkim czasie odwiedzający powinien wiedzieć:

- kim jestem,
- czym się zajmuję,
- jakie usługi oferuję,
- jakie produkty tworzę,
- jakie projekty wykonałem,
- jak się ze mną skontaktować.

---

# Główne sekcje

- Strona główna
- Projekty
- Kim jestem (`/about`)
- CV / Doświadczenie (`/path`) — pełne CV online (mobile: „CV”, desktop: „Doświadczenie”); szczegóły: `docs/CV_Online.md`
- Kontakt

Projekt powinien umożliwiać łatwe dodawanie kolejnych projektów i rozwój strony bez przebudowy całej aplikacji.

---

# Projekty

Wszystkie realizacje mają znajdować się w jednej sekcji „Projekty”.

Użytkownik powinien mieć możliwość filtrowania projektów według kategorii:

- Wszystkie
- Strony internetowe
- Aplikacje

Każdy projekt powinien prezentować najważniejsze informacje w zwięzłej formie: krótki opis, wykorzystane technologie, galerię oraz odnośniki.

---

# Wielojęzyczność

Projekt od początku powinien być przygotowany do obsługi wielu języków:

- Polski
- English
- Deutsch
- Español
- Українська

Przełączanie języka powinno odbywać się za pomocą listy rozwijanej (ikona globusa; na mobile skróty PL / EN / DE / ES / UK).

Przy pierwszej wizycie strona powinna automatycznie wykrywać język interfejsu użytkownika i wyświetlać odpowiednią wersję językową.

Jeżeli dany język nie będzie dostępny, domyślnym językiem powinien być język angielski.

---

# Nawigacja i layout

- **Desktop:** stały lewy sidebar (avatar, logo lockup PK z nazwiskiem, nawigacja, przełącznik języka).
- **Mobile:** górny pasek (avatar + logo lockup poziome, język) oraz dolny tab bar jak w aplikacji (bez hamburger menu).
- **Avatar:** klik otwiera powiększony podgląd (lightbox) na mobile i desktop.
- **Logo:** monogram PK + wordmark — szczegóły i mapa plików w `docs/Brand_Logo.md`. Favicon i apple-touch z tego samego systemu znaku.
- **Stopka:** monogram PK obok copyrightu; linki Impressum · Privacy · Cookies. Desktop: jeden rząd (`--site-footer-h`). Mobile: dwie linie, wyśrodkowane (logo+© / linki). Szczegóły: `docs/Legal_and_Cookies.md`, `docs/Brand_Logo.md`.
- **Landing (mobile):** pierwszy ekran wypełniony treścią hero; stopka dostępna po scrollu.
- **Stopka / język (desktop):** wspólna wysokość pasa `--site-footer-h` (stopka treści = LanguageSwitcher w sidebarze).

---

# Dane kontaktowe

Dane kontaktowe oraz inne często wykorzystywane informacje powinny być zarządzane centralnie (`src/config/site.ts`, w tym `legal` pod Impressum).

---

# Aspekty prawne

Wdrożone dla działalności w Niemczech (Einzelunternehmen / Kleinunternehmer):

- **Impressum** (`/impressum`) — § 5 DDG; adres, e-mail, telefon; bez USt-IdNr.
- **Polityka prywatności** (`/privacy`) — formularz, hosting, analityka po zgodzie, inventarz cookies.
- **Cookies** — `NEXT_LOCALE` + `pk_cookie_consent`; baner; Vercel Analytics tylko po „Akceptuję wszystkie”.
- **Regulamin / AGB** — nie wymagany przy samej wizytówce + formularzu.

Pełny opis: **`docs/Legal_and_Cookies.md`**.
---

# Inspiracje

Projekt ma posiadać własną tożsamość wizualną.

Inspiracje:

- https://salih-erkan.web.app/
- https://salih-erkan.web.app/portfolio
- https://salih-erkan.web.app/resume
- https://salih-erkan.web.app/contact

Powyższe strony stanowią wyłącznie inspirację pod względem sposobu prezentacji treści i doświadczenia użytkownika. Projekt nie powinien kopiować ich wyglądu ani rozwiązań 1:1.

---

# Zadanie dla Cursor AI

Na tym etapie **nie rozpoczynaj implementacji ani kodowania**.

Najpierw opracuj kompletny plan realizacji projektu.

Przygotuj szczegółową listę etapów wraz z zalecaną kolejnością prac.

Uwzględnij między innymi:

- analizę wymagań,
- architekturę projektu,
- projekt identyfikacji wizualnej,
- projekt logo,
- wybór i zakup domeny,
- wybór hostingu,
- utworzenie repozytorium GitHub,
- przygotowanie środowiska,
- strategię wielojęzyczności,
- SEO,
- konfigurację Google Search Console,
- weryfikację strony,
- konfigurację analityki,
- konfigurację cookies,
- przygotowanie pliku robots.txt,
- przygotowanie sitemap.xml,
- metadane i favicon,
- wymagania prawne,
- plan testów,
- plan wdrożenia,
- plan publikacji,
- plan dalszego rozwoju.

Dla każdego etapu opisz cel, kolejność, zależności, rekomendacje i potencjalne ryzyka.

Dopiero po zaakceptowaniu planu można rozpocząć implementację.
