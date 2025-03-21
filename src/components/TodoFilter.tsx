"use client";

import React from "react";
import { useTodos } from "@/contexts/TodoContext";
import { FiFilter, FiTag } from "react-icons/fi";

/**
 * Komponent filtrowania zadań
 * Umożliwia filtrowanie zadań po statusie (wszystkie, aktywne, ukończone) oraz po etykietach
 */
export const TodoFilter: React.FC = () => {
  const { filter, setFilter, tagFilter, setTagFilter, uniqueTags } = useTodos();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
        <FiFilter className="mr-2" />
        Filtry
      </h3>

      <div className="mb-4">
        <label
          htmlFor="statusFilter"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Status
        </label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">Wszystkie</option>
          <option value="active">Aktywne</option>
          <option value="completed">Ukończone</option>
        </select>
      </div>

      {uniqueTags.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
            <FiTag className="mr-1" />
            Etykiety
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={() => setTagFilter(null)}
              className={`px-3 py-1 text-xs rounded-full ${
                tagFilter === null
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Wszystkie
            </button>

            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFilter(tag)}
                className={`px-3 py-1 text-xs rounded-full ${
                  tagFilter === tag
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoFilter;
