import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { TodoProvider } from "@/contexts/TodoContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Aplikacja do zarządzania zadaniami",
};

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
