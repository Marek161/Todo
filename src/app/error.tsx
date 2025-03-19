"use client";

import React, { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Wystąpił błąd aplikacji:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full">
        <ErrorMessage
          title="Coś poszło nie tak!"
          message={error.message || "Wystąpił nieoczekiwany błąd w aplikacji."}
          onRetry={reset}
        />
      </div>
    </div>
  );
}
