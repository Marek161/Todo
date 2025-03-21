"use client";

import React from "react";
import Link from "next/link";
import { FiMoon, FiSun, FiLogIn, FiLogOut } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Komponent nawigacyjny aplikacji
 * Zawiera logo, przełącznik motywu oraz przyciski uwierzytelniania
 */
const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <nav className="w-full py-4 px-4 md:px-6 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
        >
          Planner
        </Link>

        <div className="flex items-center space-x-4">
          {/* Przełącznik motywu jasny/ciemny */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={
              theme === "dark"
                ? "Przełącz na tryb jasny"
                : "Przełącz na tryb ciemny"
            }
          >
            {theme === "dark" ? (
              <FiSun className="w-5 h-5 text-yellow-400" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Przycisk logowania/wylogowania */}
          {user ? (
            <button
              onClick={signOut}
              className="flex items-center space-x-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Wyloguj</span>
            </button>
          ) : (
            <Link
              href="/auth"
              className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FiLogIn className="w-4 h-4" />
              <span>Zaloguj</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
