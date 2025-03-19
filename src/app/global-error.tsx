\"use client";

import React, { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Wystąpił globalny błąd aplikacji:", error);
  }, [error]);

  return (
    <html lang="pl">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full">
          <ErrorMessage
            title="Wystąpił krytyczny błąd aplikacji"
            message={error.message || "Przepraszamy, wystąpił nieoczekiwany błąd."}
            onRetry={reset}
          />
        </div>
      </body>
    </html>
  );
}
