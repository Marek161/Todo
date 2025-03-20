"use client";

import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3 max-w-4xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              Planner
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user && (
              <button
                onClick={handleLogout}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Wyloguj
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
