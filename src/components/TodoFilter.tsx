"use client";

import React from "react";
import { useTodos } from "@/contexts/TodoContext";
import { FiList, FiCheck, FiClock, FiTag, FiFilter } from "react-icons/fi";

/**
 * Komponent filtrowania zadań
 * Umożliwia filtrowanie zadań po statusie (wszystkie, aktywne, ukończone) oraz po etykietach
 */
export const TodoFilter: React.FC = () => {
  const { todos, filter, setFilter, tagFilter, setTagFilter, uniqueTags } =
    useTodos();

  /**
   * Obsługuje zmianę filtra i aktualizuje stan w kontekście
   */
  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  // Funkcja do generowania kolorów dla etykiet na podstawie ich nazwy
  const getTagColor = (tag: string) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="mb-4">
        <div className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
          <FiFilter className="mr-2" />
          <h3 className="font-medium">Filtruj według statusu</h3>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => handleFilterChange("all")}
            className={`w-full px-4 py-2 rounded-md text-left transition flex items-center ${
              filter === "all"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            <FiList className="mr-2" />
            Wszystkie
          </button>
          <button
            onClick={() => handleFilterChange("active")}
            className={`w-full px-4 py-2 rounded-md text-left transition flex items-center ${
              filter === "active"
                ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            <FiClock className="mr-2" />
            Aktywne
          </button>
          <button
            onClick={() => handleFilterChange("completed")}
            className={`w-full px-4 py-2 rounded-md text-left transition flex items-center ${
              filter === "completed"
                ? "bg-gradient-to-r from-green-500 to-teal-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            <FiCheck className="mr-2" />
            Ukończone
          </button>
        </div>
      </div>

      {uniqueTags.length > 0 && (
        <div>
          <div className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
            <FiTag className="mr-2" />
            <h3 className="font-medium">Filtruj według etykiety</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                className={`px-2 py-1 rounded-md text-sm transition flex items-center ${
                  tagFilter === tag
                    ? "bg-opacity-100 text-white"
                    : "bg-opacity-10 hover:bg-opacity-20"
                }`}
                style={{
                  backgroundColor:
                    tagFilter === tag ? getTagColor(tag) : "transparent",
                  color: tagFilter === tag ? "white" : getTagColor(tag),
                  border: `1px solid ${getTagColor(tag)}`,
                }}
              >
                {tag}
              </button>
            ))}
            {tagFilter && (
              <button
                onClick={() => setTagFilter(null)}
                className="px-2 py-1 rounded-md text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-300"
              >
                Wyczyść filtr
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoFilter;
