"use client";

import React from "react";
import Link from "next/link";
import { FiMoon, FiSun, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * Komponent nawigacyjny aplikacji
 * Zawiera logo, przełącznik motywu oraz przyciski uwierzytelniania
 */
export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Obsługa trybu ciemnego za pomocą preferencji systemu i localStorage
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 dark:text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Todo App
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Przełącz motyw"
          >
            {isDarkMode ? (
              <FiSun className="text-yellow-400" size={20} />
            ) : (
              <FiMoon className="text-gray-700" size={20} />
            )}
          </button>

          {user && (
            <>
              <div className="flex items-center text-sm">
                <FiUser className="mr-1" />
                <span className="hidden md:inline">{user.email}</span>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                aria-label="Wyloguj się"
              >
                <FiLogOut size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
