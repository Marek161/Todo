"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FiLogIn, FiBookOpen, FiTag, FiCloud } from "react-icons/fi";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Animowane elementy tła */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-blue-400/30 to-purple-500/30 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-indigo-400/30 to-pink-500/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-tr from-green-400/30 to-blue-500/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

        {/* Dodatkowe animowane divy */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-bl from-pink-400/30 to-yellow-500/30 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-tl from-purple-400/30 to-cyan-500/30 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-3000"></div>

        {/* Poruszające się divy */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full opacity-70 animate-float"></div>
        <div className="absolute top-1/2 right-24 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full opacity-70 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full opacity-70 animate-float animation-delay-2000"></div>
      </div>

      {/* Navbar z logo, przełącznikiem motywu i przyciskiem logowania */}
      <Navbar />

      {/* Główna treść strony */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mt-8 mb-12 relative">
          {/* Animowany nagłówek z gradientem */}
          <h1 className="text-5xl font-extrabold sm:text-6xl sm:tracking-tight mb-4 animate-fade-in">
            <span className="block bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 text-transparent bg-clip-text animate-gradient">
              Zarządzaj swoimi zadaniami
            </span>
            <span className="block bg-gradient-to-r from-indigo-600 via-pink-500 to-blue-600 text-transparent bg-clip-text animate-gradient animation-delay-1000">
              w jednym miejscu
            </span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600 dark:text-gray-300 animate-fade-in animation-delay-500">
            Prosta, intuicyjna aplikacja do zarządzania zadaniami z etykietami,
            filtrowaniem i synchronizacją w chmurze.
          </p>

          {/* Przycisk logowania */}
          <div className="mt-12 mb-16 flex justify-center animate-fade-in animation-delay-1500">
            {user ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center px-6 py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/30 dark:hover:shadow-green-600/20 transform hover:scale-105 transition-all duration-300 hover:animate-pulse"
              >
                Przejdź do panelu
              </button>
            ) : (
              <button
                onClick={() => router.push("/auth")}
                className="flex items-center px-6 py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-600/40 transform hover:scale-105 transition-all duration-300 hover:animate-pulse"
              >
                <FiLogIn className="mr-2" />
                Zaloguj się
              </button>
            )}
          </div>
        </div>

        {/* Sekcja z trzema animowanymi divami */}
        <div className="grid md:grid-cols-3 gap-8 mt-10 px-4 md:px-0">
          <div className="relative snake-border snake-border-purple overflow-hidden">
            <div className="snake-border snake-border-purple-glow"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 h-full rounded-lg shadow-xl z-10">
              <div className="flex items-center text-purple-600 dark:text-purple-400 mb-3">
                <FiBookOpen size={22} className="mr-2" />
                <h3 className="text-xl font-bold">Zarządzanie Zadaniami</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Łatwo organizuj swoje zadania, ustalaj priorytety i terminy
                wykonania. Śledź postępy i oznaczaj ukończone zadania.
              </p>
            </div>
          </div>

          <div className="relative snake-border snake-border-blue overflow-hidden">
            <div className="snake-border snake-border-blue-glow"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 h-full rounded-lg shadow-xl z-10">
              <div className="flex items-center text-blue-600 dark:text-blue-400 mb-3">
                <FiTag size={22} className="mr-2" />
                <h3 className="text-xl font-bold">System Etykiet</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Używaj kolorowych etykiet do kategoryzowania zadań. Twórz własne
                etykiety dopasowane do Twoich potrzeb.
              </p>
            </div>
          </div>

          <div className="relative snake-border snake-border-red overflow-hidden">
            <div className="snake-border snake-border-red-glow"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 h-full rounded-lg shadow-xl z-10">
              <div className="flex items-center text-red-600 dark:text-red-400 mb-3">
                <FiCloud size={22} className="mr-2" />
                <h3 className="text-xl font-bold">Synchronizacja w Chmurze</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Dostęp do swoich zadań z dowolnego urządzenia. Twoje dane są
                bezpiecznie przechowywane i synchronizowane w chmurze.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
