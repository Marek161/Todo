# Planner - Aplikacja do zarządzania zadaniami

![Planner Logo](./public/logo.png)

Planner to nowoczesna aplikacja do zarządzania zadaniami, która umożliwia użytkownikom organizowanie codziennych obowiązków w intuicyjnym interfejsie z synchronizacją w chmurze.

## Funkcje

- **Uwierzytelnianie użytkowników:** Logowanie przez e-mail/hasło i za pomocą konta Google
- **Zarządzanie zadaniami:** Dodawanie, edycja, oznaczanie jako ukończone i usuwanie zadań
- **Etykiety i filtry:** Przypisywanie etykiet do zadań i filtrowanie według etykiet lub statusu zadania
- **Filtrowanie zadań:** Możliwość wyświetlania wszystkich, aktywnych lub ukończonych zadań
- **Synchronizacja z chmurą:** Automatyczna synchronizacja zadań między urządzeniami
- **Tryb ciemny/jasny:** Możliwość przełączania między motywami kolorystycznymi
- **Responsywny design:** Aplikacja dostosowuje się do różnych rozmiarów ekranu
- **Offline functionality:** Możliwość korzystania z aplikacji bez dostępu do internetu

## Technologie

### Frontend

- **React 18** - biblioteka JavaScript do budowania interfejsu użytkownika
- **Next.js 14** - framework React wspierający rendering po stronie serwera
- **TypeScript** - statycznie typowany nadzbiór JavaScript
- **Tailwind CSS** - framework CSS do szybkiego budowania responsywnych interfejsów
- **React Icons** - biblioteka ikon do React

### Backend i Baza Danych

- **Firebase Authentication** - zarządzanie użytkownikami i procesem logowania
- **Firebase Firestore** - baza danych NoSQL w chmurze
- **Firebase Hosting** - hostowanie aplikacji

### Narzędzia Deweloperskie

- **ESLint** - statyczna analiza kodu
- **Prettier** - formatowanie kodu
- **npm/yarn** - zarządzanie pakietami
- **Git** - kontrola wersji

## Architektura aplikacji

Aplikacja Planner wykorzystuje architektury opartą na komponentach z użyciem kontekstów React do zarządzania stanem:

- **AuthContext:** Zarządza stanem uwierzytelnienia użytkownika (logowanie, wylogowanie, rejestracja)
- **TodoContext:** Zarządza zadaniami użytkownika oraz obsługuje filtrowanie według statusu i etykiet
- **ThemeContext:** Zarządza preferencjami dotyczącymi motywu kolorystycznego

## Struktura Projektu

```
Planner/
├── public/              # Statyczne pliki
├── src/                 # Kod źródłowy
│   ├── app/             # Komponenty stron
│   ├── components/      # Komponenty wielokrotnego użytku
│   ├── contexts/        # Konteksty React
│   └── utils/           # Narzędzia i konfiguracja
├── .eslintrc.json       # Konfiguracja ESLint
├── next.config.js       # Konfiguracja Next.js
├── package.json         # Zależności npm
├── tailwind.config.js   # Konfiguracja Tailwind CSS
└── tsconfig.json        # Konfiguracja TypeScript
```

## Licencja

[MIT](LICENSE)

## Autor

Imię Nazwisko - [Kontakt](wkrótce)

## Planowane Rozszerzenia

Aplikacja ma potencjał rozbudowy o następujące funkcjonalności:

1. **Kategorie zadań** - możliwość grupowania zadań w kategorie (np. praca, dom, hobby)
2. **Terminy i przypomnienia** - dodanie terminów wykonania zadań oraz systemu powiadomień
3. **Współdzielenie list zadań** - możliwość udostępniania list zadań innym użytkownikom
4. **Powtarzające się zadania** - tworzenie zadań cyklicznych (dziennych, tygodniowych, miesięcznych)
5. **Statystyki i raportowanie** - generowanie wykresów i statystyk wykonanych zadań
6. **Etykiety i tagi** - dodawanie etykiet do zadań dla lepszej organizacji
7. **Import/Export** - możliwość eksportowania i importowania zadań w formatach CSV, JSON
8. **PWA (Progressive Web App)** - konwersja do aplikacji PWA działającej offline
9. **Motywy użytkownika** - personalizowane motywy kolorystyczne
10. **API integracyjne** - integracja z kalendarzem, Slackiem, Trello i innymi platformami