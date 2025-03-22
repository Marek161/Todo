
# Aplikacja TODO 🗓️

Aplikacja do zarządzania zadaniami z możliwością dodawania, filtrowania i kategoryzowania zadań za pomocą etykiet.

### ➡️  [LINK DO STRONY]([https://marek161.github.io/jwnailstudio/](https://todo-9hy55tk72-marek161s-projects.vercel.app/))  ⬅️

![todo1](https://github.com/user-attachments/assets/94451dee-0bbe-4d81-8b43-5f8ce46262e2)
![todo2](https://github.com/user-attachments/assets/bb81775a-b0e4-43ad-88d6-d0e1c30ade1d)


## 🟣 Funkcjonalności

- Dodawanie i usuwanie zadań
- Oznaczanie zadań jako ukończone
- Filtrowanie zadań (wszystkie/aktywne/ukończone)
- Kategoryzowanie zadań za pomocą etykiet
- Filtrowanie zadań po etykietach
- Responsywny interfejs
- Uwierzytelnianie użytkowników
- Dane przechowywane w Firebase

## 🟣 Technologie

- Next.js 13 (App Router)
- React 18
- TypeScript
- Firebase (Auth, Firestore)
- Tailwind CSS
- React Icons

## 🟣 Struktura projektu

```
todo-app/
├── public/             # Statyczne zasoby
├── src/                # Źródła aplikacji
│   ├── app/            # Komponenty stron (App Router)
│   ├── components/     # Komponenty wielokrotnego użytku
│   ├── contexts/       # Konteksty React (auth, todos)
│   └── lib/            # Funkcje pomocnicze, konfiguracja Firebase
├── .env.local          # Zmienne środowiskowe (nie w repozytorium)
├── next.config.js      # Konfiguracja Next.js
├── package.json        # Zależności npm
└── vercel.json         # Konfiguracja Vercel
```

--
**Autor:** Marek161
