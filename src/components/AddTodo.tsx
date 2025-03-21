"use client";

import React, { useState } from "react";
import { useTodos } from "@/contexts/TodoContext";
import { FiPlus, FiTag, FiX, FiLoader } from "react-icons/fi";

/**
 * Komponent dodawania nowego zadania
 * Pozwala użytkownikowi dodać nowe zadanie z opcjonalnymi etykietami
 */
export const AddTodo: React.FC = () => {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Obsługuje dodanie etykiety
   */
  const handleAddTag = () => {
    if (!tagInput.trim()) return;

    // Usuwamy spacje i konwertujemy na małe litery dla spójności
    const formattedTag = tagInput.trim().toLowerCase();

    // Sprawdzamy, czy etykieta już istnieje
    if (tags.includes(formattedTag)) {
      setError("Ta etykieta już istnieje");
      return;
    }

    // Sprawdzamy maksymalną długość etykiety
    if (formattedTag.length > 20) {
      setError("Etykieta nie może być dłuższa niż 20 znaków");
      return;
    }

    // Dodajemy nową etykietę
    setTags([...tags, formattedTag]);
    setTagInput("");
    setError(null);
  };

  /**
   * Obsługuje naciśnięcie Enter w polu etykiety
   */
  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  /**
   * Obsługuje usunięcie etykiety
   */
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  /**
   * Obsługuje dodanie nowego zadania
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Proszę podać tytuł zadania");
      return;
    }

    try {
      setIsSubmitting(true);

      // Utworzenie nowego zadania
      const newTodo = {
        text: title.trim(),
        tags: [...tags],
      };

      // Zachowujemy dane formularza
      const oldTitle = title;
      const oldTags = [...tags];

      // Natychmiastowy reset formularza dla lepszego UX
      setTitle("");
      setTags([]);
      setError(null);

      // Dodajemy zadanie asynchronicznie, bez czekania na zakończenie operacji
      addTodo(newTodo)
        .catch(() => {
          // W przypadku błędu przywracamy poprzednie wartości
          setTitle(oldTitle);
          setTags(oldTags);
          setError("Nie udało się dodać zadania. Spróbuj ponownie.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });

      // Krótki timer dla pokazania animacji ładowania (UX feedback)
      setTimeout(() => {
        setIsSubmitting(false);
      }, 300);
    } catch (err) {
      setError("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="todoTitle"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Nowe zadanie
        </label>
        <input
          type="text"
          id="todoTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Co chcesz zrobić?"
          className="input w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="todoTags"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          <div className="flex items-center gap-1">
            <FiTag className="inline" size={16} />
            <span>Etykiety</span>
          </div>
        </label>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1.5 inline-flex items-center justify-center text-blue-800 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-300"
                disabled={isSubmitting}
              >
                <FiX size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="todoTags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            placeholder="Dodaj etykietę i naciśnij Enter"
            className="input flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <FiPlus size={18} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <FiLoader className="animate-spin mr-2" />
            Dodawanie...
          </>
        ) : (
          <>
            <FiPlus className="mr-2" />
            Dodaj zadanie
          </>
        )}
      </button>
    </form>
  );
};
