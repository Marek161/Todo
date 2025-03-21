"use client";

import React from "react";
import { ErrorMessage } from "@/components/ErrorMessage";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full">
        <ErrorMessage
          title="Wystąpił błąd"
          message={
            process.env.NODE_ENV === "development"
              ? error.message
              : "Przepraszamy, wystąpił nieoczekiwany błąd."
          }
          onRetry={reset}
        />
      </div>
    </div>
  );
}
