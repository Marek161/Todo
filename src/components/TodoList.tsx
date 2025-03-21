"use client";

import React from "react";
import { TodoItem } from "./TodoItem";
import { useTodos } from "@/contexts/TodoContext";
import { FiLoader } from "react-icons/fi";

/**
 * Komponent wyświetlający listę zadań
 * Obsługuje filtrowanie zadań, wyświetlanie komunikatów o braku zadań oraz stanów ładowania
 */
export const TodoList: React.FC = () => {
  const { todos, loading, error, filter } = useTodos();

  // Wyświetlanie informacji o ładowaniu
  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <FiLoader className="animate-spin text-blue-500 mr-2" size={24} />
        <span>Ładowanie zadań...</span>
      </div>
    );
  }

  // Wyświetlanie błędu, jeśli wystąpił
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
        <p>{error}</p>
      </div>
    );
  }

  // Wyświetlanie komunikatu, gdy brak zadań pasujących do filtra
  if (todos.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        <p>
          {filter !== "all"
            ? "Brak zadań spełniających kryteria filtrowania."
            : "Brak zadań. Dodaj nowe zadanie powyżej."}
        </p>
      </div>
    );
  }

  // Renderowanie listy zadań
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Zadania
        </h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      <div className="p-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        Łącznie: {todos.length}{" "}
        {todos.length === 1
          ? "zadanie"
          : todos.length % 10 >= 2 &&
              todos.length % 10 <= 4 &&
              (todos.length % 100 < 10 || todos.length % 100 > 20)
            ? "zadania"
            : "zadań"}
      </div>
    </div>
  );
};

export default TodoList;
