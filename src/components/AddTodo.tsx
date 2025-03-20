"use client";

import { useState } from "react";
import { useTodos } from "../contexts/TodoContext";
import AddTodoForm from "./AddTodoForm";

export default function AddTodo() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addTodo } = useTodos();

  const handleAddTodo = (title: string, description: string) => {
    addTodo({
      title,
      description,
    });
    setIsFormOpen(false);
  };

  return (
    <div className="mb-6">
      {isFormOpen ? (
        <AddTodoForm
          onSubmit={handleAddTodo}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : (
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full py-3 px-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 dark:hover:border-primary-500 transition-colors flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Dodaj nowe zadanie
        </button>
      )}
    </div>
  );
}
