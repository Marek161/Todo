"use client";

import React from "react";
import { TodoItem } from "./TodoItem";
import { useTodos } from "@/contexts/TodoContext";
import { FiLoader, FiList, FiCheckCircle, FiCircle } from "react-icons/fi";

/**
 * Komponent wyświetlający listę zadań
 * Obsługuje filtrowanie zadań, wyświetlanie komunikatów o braku zadań oraz stanów ładowania
 */
export const TodoList: React.FC = () => {
  const { todos, loading, error, filter } = useTodos();

  // Wyświetlanie informacji o ładowaniu
  if (loading) {
    return (
      <div className="flex justify-center items-center p-6 text-gray-700 dark:text-gray-300">
        <FiLoader
          className="animate-spin text-indigo-600 dark:text-indigo-400 mr-2"
          size={24}
        />
        <span>Ładowanie zadań...</span>
      </div>
    );
  }

  // Wyświetlanie błędu, jeśli wystąpił
  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md mb-4">
        <p>{error}</p>
      </div>
    );
  }

  // Wyświetlanie komunikatu, gdy brak zadań pasujących do filtra
  if (todos.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          {filter === "completed" ? (
            <FiCheckCircle
              className="text-gray-400 dark:text-gray-500"
              size={32}
            />
          ) : filter === "active" ? (
            <FiCircle className="text-gray-400 dark:text-gray-500" size={32} />
          ) : (
            <FiList className="text-gray-400 dark:text-gray-500" size={32} />
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
          {filter !== "all"
            ? "Brak zadań spełniających kryteria filtrowania"
            : "Brak zadań do wyświetlenia"}
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm">
          {filter === "all"
            ? "Dodaj nowe zadanie, aby rozpocząć"
            : "Spróbuj zmienić filtry lub dodaj nowe zadanie"}
        </p>
      </div>
    );
  }

  // Renderowanie listy zadań
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
          <FiList className="mr-2 text-indigo-500" />
          Lista zadań
        </h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 py-1 px-3 rounded-full text-xs font-medium">
          {todos.length}{" "}
          {todos.length === 1
            ? "zadanie"
            : todos.length % 10 >= 2 &&
                todos.length % 10 <= 4 &&
                (todos.length % 100 < 10 || todos.length % 100 > 20)
              ? "zadania"
              : "zadań"}
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
