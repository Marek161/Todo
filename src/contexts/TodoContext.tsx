"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  collection,
  query,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from "uuid";

/**
 * Interfejs reprezentujący pojedyncze zadanie
 */
export interface Todo {
  id: string; // Unikalny identyfikator zadania
  text: string; // Tytuł zadania
  completed: boolean; // Flaga oznaczająca czy zadanie jest ukończone
  createdAt: any; // Timestamp utworzenia zadania
  tags: string[]; // Lista etykiet przypisanych do zadania
  userId: string; // Identyfikator użytkownika, do którego należy zadanie
}

/**
 * Interfejs reprezentujący nowe zadanie tworzone przez użytkownika
 */
export interface NewTodo {
  text: string; // Tytuł nowego zadania
  tags: string[]; // Lista etykiet dla nowego zadania
}

/**
 * Typ definiujący możliwe filtry dla zadań
 */
export type FilterStatus = "all" | "active" | "completed";

/**
 * Interfejs definiujący kontekst zarządzania zadaniami
 */
export interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  filter: string;
  setFilter: (filter: string) => void;
  tagFilter: string | null;
  setTagFilter: (tag: string | null) => void;
  addTodo: (newTodo: NewTodo) => Promise<string>;
  toggleTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, text: string, tags: string[]) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  uniqueTags: string[];
}

// Utworzenie kontekstu
const TodoContext = createContext<TodoContextType | undefined>(undefined);

/**
 * Hook do wykorzystania kontekstu zadań w komponentach
 * Zapewnia dostęp do funkcji zarządzania zadaniami
 */
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos musi być używany wewnątrz TodoProvider");
  }
  return context;
};

/**
 * Komponent zapewniający kontekst zadań dla aplikacji
 * Zarządza stanem zadań, ich filtrowaniem i operacjami CRUD
 */
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const { user } = useAuth();

  /**
   * Efekt odpowiedzialny za pobieranie zadań użytkownika z Firebase
   * Uruchamiany przy zmianie użytkownika
   */
  useEffect(() => {
    const fetchTodos = async () => {
      if (!user) {
        setTodos([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const q = query(
          collection(db, "todos"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            const todoList: Todo[] = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              todoList.push({
                id: doc.id,
                text: data.text,
                completed: data.completed,
                createdAt: data.createdAt,
                tags: data.tags || [],
                userId: data.userId,
              });
            });
            setTodos(todoList);
            setError(null);
            setLoading(false);
          },
          (error) => {
            setError("Nie udało się pobrać zadań. Spróbuj ponownie później.");
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        setError("Wystąpił błąd podczas łączenia z bazą danych.");
        setLoading(false);
      }
    };

    fetchTodos();
  }, [user]);

  /**
   * Funkcja dodająca nowe zadanie do bazy danych i stanu aplikacji
   * @param newTodo - dane nowego zadania
   */
  const addTodo = async (newTodo: NewTodo) => {
    if (!user) {
      throw new Error("Musisz być zalogowany, aby dodać zadanie");
    }

    try {
      // Generowanie tymczasowego ID dla optimistic update
      const tempId = uuidv4();

      // Tworzymy tymczasowy obiekt zadania dla optymistycznej aktualizacji UI
      const tempTodo: Todo = {
        id: tempId,
        text: newTodo.text,
        completed: false,
        createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
        tags: newTodo.tags || [],
        userId: user.uid,
      };

      // Optymistyczna aktualizacja UI
      setTodos((prevTodos) => [tempTodo, ...prevTodos]);

      // Faktyczne dodanie zadania do Firestore (w tle)
      try {
        const docRef = await addDoc(collection(db, "todos"), {
          text: newTodo.text,
          completed: false,
          createdAt: serverTimestamp(),
          tags: newTodo.tags || [],
          userId: user.uid,
        });

        // Aktualizacja listy zadań zastępując tymczasowe ID rzeczywistym ID
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === tempId ? { ...todo, id: docRef.id } : todo
          )
        );

        // Zwracamy ID dodanego zadania
        return docRef.id;
      } catch (error) {
        // Cofnięcie optymistycznej aktualizacji w przypadku błędu
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== tempId));
        throw error;
      }
    } catch (error) {
      setError("Nie udało się dodać zadania. Spróbuj ponownie.");
      throw error;
    }
  };

  /**
   * Funkcja zmieniająca status ukończenia zadania
   * @param id - identyfikator zadania
   */
  const toggleTodo = async (id: string) => {
    if (!user) return;

    try {
      const todoToToggle = todos.find((todo) => todo.id === id);
      if (!todoToToggle) return;

      // Optymistyczna aktualizacja UI
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      // Aktualizacja w bazie danych
      await updateDoc(doc(db, "todos", id), {
        completed: !todoToToggle.completed,
      });
    } catch (error) {
      setError("Nie udało się zmienić stanu zadania. Spróbuj ponownie.");

      // Cofnięcie optymistycznej aktualizacji w przypadku błędu
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  /**
   * Funkcja aktualizująca dane zadania
   * @param id - identyfikator zadania do aktualizacji
   * @param text - nowy tytuł zadania
   * @param tags - nowa lista etykiet przypisanych do zadania
   */
  const updateTodo = async (id: string, text: string, tags: string[]) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, "todos", id), {
        text,
        tags,
      });
    } catch (error) {
      setError("Nie udało się zaktualizować zadania. Spróbuj ponownie.");
    }
  };

  /**
   * Funkcja usuwająca zadanie
   * @param id - identyfikator zadania do usunięcia
   */
  const deleteTodo = async (id: string) => {
    if (!user) return;

    let todoToDelete: Todo | undefined;

    try {
      // Optymistyczna aktualizacja UI
      todoToDelete = todos.find((todo) => todo.id === id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

      // Usuwanie z bazy danych
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      setError("Nie udało się usunąć zadania. Spróbuj ponownie.");

      // Cofnięcie optymistycznej aktualizacji w przypadku błędu
      if (todoToDelete) {
        setTodos((prevTodos) => [...prevTodos, todoToDelete as Todo]);
      }
    }
  };

  // Obliczenie unikatowych tagów z wszystkich zadań
  const uniqueTags = Array.from(
    new Set(todos.flatMap((todo) => todo.tags))
  ).filter(Boolean);

  // Filtrowanie zadań
  const filteredTodos = todos.filter((todo) => {
    // Filtrowanie po stanie (wszystkie/aktywne/ukończone)
    const statusFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);

    // Filtrowanie po tagu
    const hasTag = !tagFilter || todo.tags.includes(tagFilter);

    return statusFilter && hasTag;
  });

  // Obiekt wartości kontekstu
  const value = {
    todos: filteredTodos,
    loading,
    error,
    filter,
    setFilter,
    tagFilter,
    setTagFilter,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    uniqueTags,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
