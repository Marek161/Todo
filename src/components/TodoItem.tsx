"use client";

import React, { useState } from "react";
import { Todo } from "@/contexts/TodoContext";
import { useTodos } from "@/contexts/TodoContext";
import { FiTrash2, FiEdit, FiCheck, FiX, FiTag } from "react-icons/fi";

/**
 * Interfejs właściwości komponentu TodoItem
 */
interface TodoItemProps {
  todo: Todo;
}

/**
 * Komponent pojedynczego zadania
 * Pozwala na wyświetlanie, edycję, oznaczanie jako ukończone i usuwanie zadań
 */
export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false); // Stan określający czy zadanie jest edytowane
  const [editedText, setEditedText] = useState(todo.text); // Stan przechowujący edytowany tytuł
  const [editedTags, setEditedTags] = useState<string[]>(todo.tags || []); // Stan przechowujący edytowane etykiety
  const [tagsInput, setTagsInput] = useState(todo.tags?.join(", ") || ""); // Stan przechowujący surowy tekst etykiet

  /**
   * Przełącza status ukończenia zadania
   */
  const handleToggleComplete = () => {
    console.log("TodoItem - przełączanie statusu ukończenia zadania:", todo.id);
    toggleTodo(todo.id);
  };

  /**
   * Włącza tryb edycji i inicjalizuje stany edycji
   */
  const handleEditClick = () => {
    console.log("TodoItem - włączenie trybu edycji dla zadania:", todo.id);
    setIsEditing(true);
    setEditedText(todo.text);
    setTagsInput(todo.tags?.join(", ") || "");
  };

  /**
   * Anuluje edycję zadania i przywraca poprzednie wartości
   */
  const handleCancelEdit = () => {
    console.log("TodoItem - anulowanie edycji zadania:", todo.id);
    setIsEditing(false);
  };

  /**
   * Zapisuje zmiany w zadaniu i wychodzi z trybu edycji
   */
  const handleSaveEdit = async () => {
    console.log("TodoItem - próba zapisania zmian w zadaniu:", todo.id);

    if (editedText.trim() === "") {
      console.log("TodoItem - błąd: pusta treść zadania");
      return;
    }

    try {
      console.log("TodoItem - aktualizacja zadania z danymi:", {
        id: todo.id,
        text: editedText,
        tags: editedTags,
      });
      await updateTodo(todo.id, editedText, editedTags);
      console.log("TodoItem - zadanie zaktualizowane pomyślnie");
      setIsEditing(false);
    } catch (err) {
      console.error("TodoItem - błąd podczas aktualizacji zadania:", err);
    }
  };

  /**
   * Obsługuje usuwanie zadania po potwierdzeniu przez użytkownika
   */
  const handleDelete = () => {
    console.log("TodoItem - usuwanie zadania:", todo.id);
    if (window.confirm("Czy na pewno chcesz usunąć to zadanie?")) {
      deleteTodo(todo.id);
    }
  };

  /**
   * Przetwarza zmiany w polu etykiet
   * Konwertuje tekst wejściowy na tablicę etykiet
   */
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagsInput(value);
    // Przetwarzanie tagów z inputa na tablicę
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    setEditedTags(tagsArray);
  };

  /**
   * Renderuje etykiety zadania jako wizualne znaczniki
   * Zwraca null, jeśli zadanie nie ma etykiet
   */
  const renderTags = () => {
    if (!todo.tags || todo.tags.length === 0) return null;

    return (
      <div className="flex flex-wrap mt-1">
        {todo.tags.map((tag, index) => (
          <span
            key={index}
            className="mr-1 mb-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
          >
            <FiTag className="inline mr-1" size={12} />
            {tag}
          </span>
        ))}
      </div>
    );
  };

  // Renderowanie formularza edycji, jeśli zadanie jest edytowane
  if (isEditing) {
    return (
      <div className="p-4 border rounded-lg mb-3 shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        {/* Pole edycji tytułu */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tytuł
          </label>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        {/* Pole edycji etykiet */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Etykiety (rozdzielone przecinkami)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={handleTagsChange}
            placeholder="np. praca, dom, ważne"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        {/* Przyciski akcji edycji */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancelEdit}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiX className="inline mr-1" /> Anuluj
          </button>
          <button
            onClick={handleSaveEdit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FiCheck className="inline mr-1" /> Zapisz
          </button>
        </div>
      </div>
    );
  }

  // Renderowanie normalnego widoku zadania (nie w trybie edycji)
  return (
    <div
      className={`p-4 border rounded-lg mb-3 shadow-sm ${
        todo.completed
          ? "bg-gray-50 dark:bg-gray-900"
          : "bg-white dark:bg-gray-800"
      } border-gray-200 dark:border-gray-700 transition-colors`}
    >
      <div className="flex items-start">
        {/* Checkbox ukończenia zadania */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        {/* Treść zadania */}
        <div className="ml-3 flex-1">
          <h3
            className={`text-lg font-medium ${
              todo.completed
                ? "text-gray-500 dark:text-gray-400 line-through"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {todo.text}
          </h3>
          {/* Wyświetlanie etykiet */}
          {renderTags()}
        </div>
        {/* Przyciski akcji */}
        <div className="ml-2 flex space-x-1">
          <button
            onClick={handleEditClick}
            className="p-1 text-gray-400 hover:text-blue-500 rounded"
            aria-label="Edytuj zadanie"
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-500 rounded"
            aria-label="Usuń zadanie"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
