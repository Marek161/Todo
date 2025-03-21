"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { LoginForm, RegisterForm } from "@/components/AuthForms";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const router = useRouter();

  const handleAuthSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Animowane elementy tła */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-b from-blue-500/30 to-purple-600/30 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gradient-to-t from-purple-500/30 to-pink-600/30 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-[30vw] h-[30vw] bg-gradient-to-tr from-indigo-500/30 to-blue-600/30 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />

      <main className="max-w-lg mx-auto px-4 py-12 relative z-10">
        <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {activeTab === "login" ? "Zaloguj się" : "Rejestracja"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {activeTab === "login"
                ? "Zaloguj się do swojego konta, aby korzystać z aplikacji"
                : "Utwórz nowe konto, aby rozpocząć korzystanie z aplikacji"}
            </p>
          </div>

          <div className="flex mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 text-center font-medium transition-all ${
                activeTab === "login"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Logowanie
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 text-center font-medium transition-all ${
                activeTab === "register"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Rejestracja
            </button>
          </div>

          {activeTab === "login" ? (
            <LoginForm onSuccess={handleAuthSuccess} />
          ) : (
            <RegisterForm onSuccess={handleAuthSuccess} />
          )}
        </div>
      </main>
    </div>
  );
}
