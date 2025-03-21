"use client";

import React from "react";
import { useTodos } from "@/contexts/TodoContext";
import {
  FiFilter,
  FiTag,
  FiCheck,
  FiCheckCircle,
  FiCircle,
} from "react-icons/fi";

/**
 * Komponent filtrowania zadań
 * Umożliwia filtrowanie zadań po statusie (wszystkie, aktywne, ukończone) oraz po etykietach
 */
export const TodoFilter: React.FC = () => {
  const { filter, setFilter, tagFilter, setTagFilter, uniqueTags } = useTodos();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <FiFilter className="mr-2 text-indigo-500" />
        Filtry zadań
      </h3>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Status zadań
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all ${
              filter === "all"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500"
            }`}
          >
            <FiCheckCircle
              className={`mr-2 ${filter === "all" ? "text-white" : "text-purple-500"}`}
            />
            Wszystkie
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all ${
              filter === "active"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
            }`}
          >
            <FiCircle
              className={`mr-2 ${filter === "active" ? "text-white" : "text-blue-500"}`}
            />
            Aktywne
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all ${
              filter === "completed"
                ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500"
            }`}
          >
            <FiCheck
              className={`mr-2 ${filter === "completed" ? "text-white" : "text-green-500"}`}
            />
            Ukończone
          </button>
        </div>
      </div>

      {uniqueTags.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <FiTag className="mr-2 text-pink-500" />
            Etykiety
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            <button
              onClick={() => setTagFilter(null)}
              className={`px-3 py-1.5 text-xs rounded-full shadow-sm transition-all ${
                tagFilter === null
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              Wszystkie
            </button>

            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFilter(tag)}
                className={`px-3 py-1.5 text-xs rounded-full shadow-sm transition-all ${
                  tagFilter === tag
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
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
