"use client";

import React, { useState } from "react";
import { FiPlus, FiTag, FiX, FiLoader } from "react-icons/fi";
import { useTodos } from "@/contexts/TodoContext";

/**
 * Komponent formularza dodawania nowego zadania
 */
const TodoForm: React.FC = () => {
  const { addTodo } = useTodos();
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("TodoForm - formularz wysłany - rozpoczęcie dodawania zadania");

    if (!text.trim()) {
      setError("Treść zadania nie może być pusta");
      console.log("TodoForm - błąd: pusta treść zadania");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      console.log("TodoForm - próba dodania zadania z danymi:", { text, tags });

      // Dodajemy nowe zadanie - upewnij się, że przekazujemy obiekt zgodny z interfejsem NewTodo
      await addTodo({
        text: text.trim(),
        tags: tags.length > 0 ? [...tags] : [],
      });
      console.log("TodoForm - zadanie dodane pomyślnie");

      // Resetujemy formularz po pomyślnym dodaniu
      setText("");
      setTags([]);
      setCurrentTag("");
    } catch (err) {
      console.error("TodoForm - błąd przy dodawaniu zadania:", err);
      setError("Nie udało się dodać zadania. Spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
      console.log("TodoForm - zakończono proces dodawania zadania");
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="task"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Nowe zadanie
        </label>
        <input
          type="text"
          id="task"
          placeholder="Co chcesz zrobić?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input"
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="tags"
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
              {tag}
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
        <input
          type="text"
          id="tags"
          placeholder="Dodaj etykietę i naciśnij Enter"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleAddTag}
          className="input"
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="btn-primary flex items-center justify-center"
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

export default TodoForm;
