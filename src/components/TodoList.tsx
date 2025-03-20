\"use client";

import React from "react";
import { useTodos } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";
import ErrorMessage from "./ErrorMessage";

/**
 * Komponent listy zadań
 * Obsługuje:
 * - Wyświetlanie listy zadań
 * - Stan ładowania
 * - Obsługę błędów
 * - Komunikat o braku zadań
 */
export default function TodoList() {
  const { todos, loading, error, filterBy } = useTodos();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Błąd podczas ładowania zadań"
        message={error}
      />
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          {filterBy === "all"
            ? "Nie masz jeszcze żadnych zadań. Dodaj swoje pierwsze zadanie!"
            : filterBy === "active"
            ? "Nie masz aktywnych zadań."
            : "Nie masz ukończonych zadań."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}