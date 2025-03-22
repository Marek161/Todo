"use client";

import React from "react";
import Link from "next/link";
import { FiMoon, FiSun, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Komponent nawigacyjny aplikacji
 * Zawiera logo, przełącznik motywu oraz przyciski uwierzytelniania
 */
export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  /**
   * Efekt inicjalizujący tryb ciemny na podstawie preferencji systemu i localStorage
   */
  React.useEffect(() => {
    // Sprawdź preferencje zapisane w localStorage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  /**
   * Przełącza motyw między jasnym a ciemnym
   * Aktualizuje klasę na elemencie html oraz zapisuje preferencję w localStorage
   */
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  /**
   * Obsługuje wylogowanie użytkownika
   */
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  return (
    <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-300%">
            Todo App
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Przełącz motyw"
          >
            {isDarkMode ? (
              <FiSun className="text-yellow-400" size={20} />
            ) : (
              <FiMoon className="text-indigo-600" size={20} />
            )}
          </button>

          {user ? (
            <>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <FiUser className="mr-1 text-indigo-500 dark:text-indigo-400" />
                <span className="hidden md:inline">{user.email}</span>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 transition-colors"
                aria-label="Wyloguj się"
              >
                <FiLogOut size={20} />
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FiLogIn className="mr-2" /> Zaloguj się
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
