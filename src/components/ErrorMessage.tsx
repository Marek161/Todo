"use client";

import React from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Wystąpił błąd",
  message,
  onRetry,
}) => {
  return (
    <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <FiAlertTriangle
            className="h-5 w-5 text-red-400 dark:text-red-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            {title}
          </h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-md bg-red-50 dark:bg-red-900/30 px-2 py-1.5 text-sm font-medium text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/40 focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  <FiRefreshCw className="h-4 w-4 mr-1 inline-block" />
                  Spróbuj ponownie
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
