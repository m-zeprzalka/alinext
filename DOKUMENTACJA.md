# AliMatrix - Dokumentacja Projektu

## Informacje ogólne

AliMatrix to nowoczesna aplikacja webowa zbudowana przy użyciu Next.js, która pomaga użytkownikom przeprowadzić analizę i kalkulację alimentów. Aplikacja wykorzystuje wielostopniowy formularz do zbierania danych od użytkowników i na ich podstawie generuje rekomendacje i analizy.

### Technologie

- **Framework**: Next.js 15.3.2
- **UI**: React 19.0.0, Tailwind CSS 4, shadcn/ui (komponenty bazujące na Radix UI)
- **Walidacja formularzy**: React Hook Form, Zod
- **Typowanie**: TypeScript 5
- **Styling**: Tailwind CSS, clsx, tailwind-merge

## Struktura projektu

Projekt posiada klarowną strukturę katalogów:

- **src/app/** - Zawiera główne komponenty stron aplikacji
  - **formularz/** - Wielostopniowy formularz (kroki 1-12)
- **src/components/** - Komponenty wielokrotnego użytku
  - **form/** - Komponenty formularza (FormLayout, FormNavigation, itp.)
  - **ui/** - Komponenty UI (przyciski, inputy, itp.)
- **src/context/** - Konteksty React (FormContext)
- **src/lib/** - Pomocnicze funkcje i narzędzia

## Architektura aplikacji

### Formularz wielostopniowy

Aplikacja jest oparta na wzorcu formularza wielostopniowego, który prowadzi użytkownika przez proces zbierania danych. Implementacja obejmuje:

1. **FormContext** - Kontekst Reacta zarządzający stanem formularza
2. **FormNavigation** - Komponent do nawigacji między krokami (przyciski "Wstecz" i "Dalej")
3. **FormLayout** - Spójny układ dla wszystkich kroków formularza

### Zarządzanie stanem

Stan formularza jest zarządzany przez `FormContext`, który:

- Przechowuje dane wprowadzone przez użytkownika
- Śledzi aktualny krok formularza
- Dostarcza metody walidacji
- Generuje odpowiednie URL-e dla kroków

### Walidacja danych

Aplikacja zawiera rozbudowany system walidacji danych:

- Walidacja pól formularza w czasie rzeczywistym
- Walidacja na poziomie kroku (blokada przycisku "Dalej" jeśli dane są niepoprawne)
- Dedykowane komunikaty błędów

## Bezpieczeństwo aplikacji

Aplikacja uwzględnia podstawowe aspekty bezpieczeństwa:

- **Sanityzacja danych wejściowych** - Poprzez walidację formularzy
- **Ochrona danych osobowych** - Informowanie użytkownika o przetwarzaniu danych
- **Zgody użytkownika** - Zbieranie odpowiednich zgód na przetwarzanie danych

### Obszary do rozwoju w zakresie bezpieczeństwa:

1. **Szyfrowanie danych wrażliwych** - Warto zaimplementować szyfrowanie danych przechowywanych w bazie
2. **Audyt bezpieczeństwa** - Przeprowadzenie profesjonalnego audytu bezpieczeństwa
3. **CSP (Content Security Policy)** - Wdrożenie polityki bezpieczeństwa treści
4. **Rate limiting** - Ograniczenie liczby żądań z jednego IP

## Jakość kodu

Aplikacja wykorzystuje współczesne praktyki programistyczne:

- **Komponenty funkcyjne** - Wykorzystanie nowoczesnego API Reacta
- **Hooki** - Rozszerzalne użycie useState, useEffect, useCallback, useMemo
- **TypeScript** - Typowanie zmiennych, props i stanu
- **Code splitting** - Podział kodu na mniejsze, łatwiejsze w zarządzaniu części

### Komponenty wielokrotnego użytku

Aplikacja wykorzystuje komponenty wielokrotnego użytku z biblioteki shadcn/ui, które są:

- Dostępne (accessibility)
- Stylowane przez Tailwind CSS
- Łatwe do dostosowania

## Przyszły rozwój

Obszary do rozwinięcia w przyszłych wersjach:

1. **Internacjonalizacja (i18n)** - Dodanie wsparcia dla wielu języków
2. **Tryb ciemny** - Implementacja ciemnego motywu
3. **Eksport danych** - Możliwość eksportu raportu do PDF
4. **API REST** - Rozwój API dla zewnętrznych integracji
5. **Testy automatyczne** - Dodanie testów jednostkowych i integracyjnych
6. **Zaawansowana analityka** - Wdrożenie narzędzi do analizy zachowań użytkowników
7. **Poprawa UX/UI** - Dalsze udoskonalenia interfejsu

## Podsumowanie

AliMatrix to nowoczesna, dobrze zaprojektowana aplikacja, która efektywnie wykorzystuje współczesne technologie webowe. Kod jest czysty, modularny i dobrze zorganizowany, co ułatwia przyszły rozwój i utrzymanie.

Aplikacja jest na dobrej drodze, aby stać się solidnym narzędziem do wsparcia użytkowników w kwestiach związanych z alimentami, zapewniając jednocześnie przyjazne doświadczenie użytkownika i dbając o bezpieczeństwo danych.
