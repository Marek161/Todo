\"use client";

import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  title = "Wystąpił błąd",
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-6 border border-red-200 dark:border-red-800 text-center">
      <div className="flex justify-center mb-4">
        <FiAlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">
        {title}
      </h3>
      <p className="text-red-600 dark:text-red-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          Spróbuj ponownie
        </button>
      )}
    </div>
  );
}
