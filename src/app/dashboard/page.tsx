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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Panel zarządzania zadaniami
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Pierwszy gradientowy div - Dodawanie zadań */}
          <div className="relative snake-border snake-border-purple md:col-span-2">
            <div className="snake-border-purple-glow"></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 h-full relative z-10">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dodaj nowe zadanie
              </h2>
              <AddTodo />
            </div>
          </div>

          {/* Drugi gradientowy div - Filtrowanie zadań (po prawej) */}
          <div className="relative snake-border snake-border-blue">
            <div className="snake-border-blue-glow"></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 h-full relative z-10">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Filtrowanie zadań
              </h2>
              <TodoFilter />
            </div>
          </div>
        </div>

        {/* Lista zadań */}
        <div className="relative snake-border snake-border-purple">
          <div className="snake-border-purple-glow"></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 relative z-10">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Lista zadań
            </h2>
            <TodoList />
          </div>
        </div>
      </main>
    </div>
  );
}
