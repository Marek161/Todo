"use client";

import React from "react";
import { FiList, FiTag, FiCloud } from "react-icons/fi";

/**
 * Komponent wyświetlający karty z funkcjami aplikacji
 * Zawiera trzy karty z animowanymi obramowaniami w różnych kolorach
 */
export const FeatureCards = () => {
  const features = [
    {
      icon: (
        <FiList size={24} className="text-purple-500 dark:text-purple-400" />
      ),
      title: "Zarządzanie zadaniami",
      description: "Twórz, edytuj i organizuj zadania szybko i efektywnie.",
      gradient: "from-purple-500 via-indigo-500 to-blue-500",
      textGradient: "from-purple-600 to-indigo-600",
      delay: "animation-delay-500",
    },
    {
      icon: <FiTag size={24} className="text-blue-500 dark:text-blue-400" />,
      title: "System etykiet",
      description: "Kategoryzuj zadania za pomocą kolorowych etykiet.",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      textGradient: "from-blue-600 to-cyan-600",
      delay: "animation-delay-1000",
    },
    {
      icon: <FiCloud size={24} className="text-pink-500 dark:text-pink-400" />,
      title: "Synchronizacja",
      description: "Dostęp do zadań z dowolnego urządzenia i miejsca.",
      gradient: "from-pink-500 via-red-500 to-orange-500",
      textGradient: "from-pink-600 to-red-600",
      delay: "animation-delay-1500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`relative rounded-xl overflow-hidden group animate-fade-in ${feature.delay}`}
        >
          {/* Animowany gradient na obramowaniu */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} animate-gradient bg-300% rounded-xl opacity-70`}
          ></div>

          {/* Wewnętrzne tło */}
          <div className="absolute inset-0 bg-white dark:bg-gray-800 m-[2px] rounded-[calc(0.75rem-2px)]"></div>

          {/* Zawartość karty */}
          <div className="relative p-6 flex flex-col h-full z-10">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-3 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3
                className={`text-xl font-bold bg-gradient-to-r ${feature.textGradient} bg-clip-text text-transparent`}
              >
                {feature.title}
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {feature.description}
            </p>

            <div className="mt-auto transform transition-all duration-300 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
              <ul className="space-y-1 text-sm">
                {feature.title === "Zarządzanie zadaniami" && (
                  <>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      • Lista zadań
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      • Terminy wykonania
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      • Priorytety
                    </li>
                  </>
                )}
                {feature.title === "System etykiet" && (
                  <>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      • Niestandardowe etykiety
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      • Filtrowanie zadań
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      • Organizacja projektów
                    </li>
                  </>
                )}
                {feature.title === "Synchronizacja" && (
                  <>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      • Dostęp w chmurze
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      • Bezpieczne logowanie
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-400">
                      • Regularne kopie zapasowe
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
