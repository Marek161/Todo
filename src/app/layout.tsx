import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { TodoProvider } from "@/contexts/TodoContext";
import type { Metadata } from "next";

/**
 * Metadane aplikacji używane przez Next.js dla SEO i wyświetlania w przeglądarce
 */
export const metadata: Metadata = {
  title: "Todo App",
  description: "Aplikacja do zarządzania zadaniami",
};

/**
 * Główny układ aplikacji
 * Opakowuje całą aplikację w providery kontekstów uwierzytelniania i zadań
 *
 * @param {Object} props - Właściwości komponentu
 * @param {React.ReactNode} props.children - Komponenty potomne (treść stron)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <AuthProvider>
          <TodoProvider>{children}</TodoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
