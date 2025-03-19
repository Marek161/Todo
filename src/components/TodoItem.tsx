\"use client";

import React, { useState } from "react";
import { Todo, useTodos } from "@/contexts/TodoContext";

interface TodoItemProps {
  todo: Todo;
}

/**
 * Komponent pojedynczego zadania
 * Obsługuje:
 * - Wyświetlanie szczegółów zadania
 * - Edycję zadania
 * - Oznaczanie jako ukończone
 * - Usuwanie zadania
 * - Zarządzanie etykietami
 */
export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleComplete, updateTodo, deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [tags, setTags] = useState<string[]>(todo.tags || []);

  /**
   * Przełącza status ukończenia zadania
   */
  const handleToggleComplete = () => {
    toggleComplete(todo.id);
  };

  /**
   * Przełącza tryb edycji zadania
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Anuluje edycję zadania
   */
  const handleCancelEdit = () => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setTags(todo.tags || []);
    setIsEditing(false);
  };

  /**
   * Zapisuje zmiany w zadaniu
   */
  const handleSaveEdit = () => {
    updateTodo(todo.id, {
      title,
      description,
      tags,
    });
    setIsEditing(false);
  };

  /**
   * Usuwa zadanie
   */
  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  /**
   * Dodaje nowy tag do zadania
   */
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      const newTag = e.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      e.currentTarget.value = "";
    }
  };

  /**
   * Usuwa tag z zadania
   */
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Tryb edycji zadania
  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 border border-gray-200 dark:border-gray-700">
        <div className="mb-3">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tytuł
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Opis
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            rows={3}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Etykiety (naciśnij Enter, aby dodać)
          </label>
          <input
            type="text"
            id="tags"
            onKeyDown={handleAddTag}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Dodaj etykietę..."
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-400 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-100 focus:outline-none"
                >
                  <span className="sr-only">Usuń etykietę</span>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleCancelEdit}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Anuluj
          </button>
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Zapisz
          </button>
        </div>
      </div>
    );
  }

  // Tryb wyświetlania zadania
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 border ${todo.completed ? 'border-green-200 dark:border-green-900' : 'border-gray-200 dark:border-gray-700'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 pt-0.5">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              className="h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <h3 className={`text-lg font-medium ${todo.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
                {todo.description}
              </p>
            )}
            {todo.tags && todo.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {todo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {todo.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            aria-label="Edytuj zadanie"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
            aria-label="Usuń zadanie"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}