"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { TodoList } from "@/components/TodoList";
import { TodoFilter } from "@/components/TodoFilter";
import TodoForm from "@/components/TodoForm";
import { AddTodo } from "@/components/AddTodo";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 shadow-lg"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                <h2 className="text-xl font-semibold text-white">
                  Dodaj nowe zadanie
                </h2>
              </div>
              <div className="p-4">
                <AddTodo />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-500 to-pink-600 p-4">
                <h2 className="text-xl font-semibold text-white">
                  Twoje zadania
                </h2>
              </div>
              <div className="p-4">
                <TodoList />
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-500 to-teal-600 p-4">
                <h2 className="text-xl font-semibold text-white">Filtry</h2>
              </div>
              <div className="p-4">
                <TodoFilter />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
