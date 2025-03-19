\"use client";

import React from "react";
import { useTodos, FilterType } from "@/contexts/TodoContext";

/**
 * Komponent filtrowania zadań
 * Pozwala na filtrowanie zadań według statusu: wszystkie, aktywne, ukończone
 */
export default function TodoFilter() {
  const { filterBy, setFilterBy } = useTodos();

  const handleFilterChange = (newFilter: FilterType) => {
    setFilterBy(newFilter);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => handleFilterChange("all")}
          className={`px-4 py-2 text-sm font-medium rounded-l-md ${
            filterBy === "all"
              ? "bg-primary-600 text-white dark:bg-primary-700"
              : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          } border border-gray-300 dark:border-gray-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500`}
        >
          Wszystkie
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange("active")}
          className={`px-4 py-2 text-sm font-medium ${
            filterBy === "active"
              ? "bg-primary-600 text-white dark:bg-primary-700"
              : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          } border-t border-b border-gray-300 dark:border-gray-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500`}
        >
          Aktywne
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange("completed")}
          className={`px-4 py-2 text-sm font-medium rounded-r-md ${
            filterBy === "completed"
              ? "bg-primary-600 text-white dark:bg-primary-700"
              : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          } border border-gray-300 dark:border-gray-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500`}
        >
          Ukończone
        </button>
      </div>
    </div>
  );
}