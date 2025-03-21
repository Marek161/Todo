"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { TodoFilter } from "@/components/TodoFilter";
import { Navbar } from "@/components/Navbar";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Przekierowanie do strony logowania, jeśli użytkownik nie jest zalogowany
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  // Ekran ładowania podczas sprawdzania uwierzytelnienia
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Ładowanie...</p>
        </div>
      </div>
    );
  }

  // Nie renderuj zawartości, jeśli użytkownik nie jest zalogowany
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Lista zadań
        </h1>

        <AddTodo />

        <div className="mb-6">
          <TodoFilter />
        </div>

        <TodoList />
      </main>
    </div>
  );
}
