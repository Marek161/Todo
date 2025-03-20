\"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "./AuthContext";

/**
 * Interfejs reprezentujący pojedyncze zadanie
 */
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
  tags?: string[];
}

/**
 * Interfejs reprezentujący nowe zadanie do dodania
 */
interface NewTodo {
  title: string;
  description?: string;
  tags?: string[];
}

type FilterType = "all" | "active" | "completed";

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (newTodo: NewTodo) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  updateTodo: (id: string, data: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  filterBy: FilterType;
  setFilterBy: (filter: FilterType) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<FilterType>("all");
  const { user } = useAuth();

  // Pobierz zadania użytkownika z Firestore
  useEffect(() => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Utwórz zapytanie do kolekcji todos, filtrując po userId
      const todosQuery = query(
        collection(db, "todos"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      // Nasłuchuj na zmiany w kolekcji
      const unsubscribe = onSnapshot(
        todosQuery,
        (snapshot) => {
          const todosData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              description: data.description,
              completed: data.completed,
              createdAt: data.createdAt.toDate(),
              userId: data.userId,
              tags: data.tags || [],
            } as Todo;
          });

          setTodos(todosData);
          setLoading(false);
        },
        (err) => {
          console.error("Błąd podczas pobierania zadań:", err);
          setError("Wystąpił błąd podczas pobierania zadań");
          setLoading(false);
        }
      );

      // Zwróć funkcję czyszczącą, która zostanie wywołana przy odmontowaniu komponentu
      return () => unsubscribe();
    } catch (err) {
      console.error("Błąd podczas konfigurowania nasłuchiwania:", err);
      setError("Wystąpił błąd podczas konfigurowania nasłuchiwania");
      setLoading(false);
    }
  }, [user]);

  // Dodaj nowe zadanie
  const addTodo = async (newTodo: NewTodo) => {
    if (!user) return;

    try {
      await addDoc(collection(db, "todos"), {
        title: newTodo.title,
        description: newTodo.description || "",
        completed: false,
        createdAt: new Date(),
        userId: user.uid,
        tags: newTodo.tags || [],
      });
    } catch (err) {
      console.error("Błąd podczas dodawania zadania:", err);
      setError("Wystąpił błąd podczas dodawania zadania");
    }
  };

  // Przełącz status ukończenia zadania
  const toggleComplete = async (id: string) => {
    try {
      const todoRef = doc(db, "todos", id);
      const todoToUpdate = todos.find((todo) => todo.id === id);

      if (todoToUpdate) {
        await updateDoc(todoRef, {
          completed: !todoToUpdate.completed,
        });
      }
    } catch (err) {
      console.error("Błąd podczas aktualizacji statusu zadania:", err);
      setError("Wystąpił błąd podczas aktualizacji statusu zadania");
    }
  };

  // Aktualizuj zadanie
  const updateTodo = async (id: string, data: Partial<Todo>) => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, data);
    } catch (err) {
      console.error("Błąd podczas aktualizacji zadania:", err);
      setError("Wystąpił błąd podczas aktualizacji zadania");
    }
  };

  // Usuń zadanie
  const deleteTodo = async (id: string) => {
    try {
      const todoRef = doc(db, "todos", id);
      await deleteDoc(todoRef);
    } catch (err) {
      console.error("Błąd podczas usuwania zadania:", err);
      setError("Wystąpił błąd podczas usuwania zadania");
    }
  };

  // Filtrowane zadania
  const filteredTodos = todos.filter((todo) => {
    if (filterBy === "all") return true;
    if (filterBy === "active") return !todo.completed;
    if (filterBy === "completed") return todo.completed;
    return true;
  });

  const value = {
    todos: filteredTodos,
    loading,
    error,
    addTodo,
    toggleComplete,
    updateTodo,
    deleteTodo,
    filterBy,
    setFilterBy,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export type { Todo, NewTodo, FilterType };