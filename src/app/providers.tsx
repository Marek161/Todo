"use client";

import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import { TodoProvider } from "../contexts/TodoContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TodoProvider>{children}</TodoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
