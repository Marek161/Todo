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
      borderClass: "snake-border-purple",
      glowClass: "snake-border-purple-glow",
      textGradient: "from-purple-600 to-indigo-600",
      delay: "animation-delay-500",
    },
    {
      icon: <FiTag size={24} className="text-blue-500 dark:text-blue-400" />,
      title: "System etykiet",
      description: "Kategoryzuj zadania za pomocą kolorowych etykiet.",
      borderClass: "snake-border-blue",
      glowClass: "snake-border-blue-glow",
      textGradient: "from-blue-600 to-cyan-600",
      delay: "animation-delay-1000",
    },
    {
      icon: <FiCloud size={24} className="text-pink-500 dark:text-pink-400" />,
      title: "Synchronizacja",
      description: "Dostęp do zadań z dowolnego urządzenia i miejsca.",
      borderClass: "snake-border-red",
      glowClass: "snake-border-red-glow",
      textGradient: "from-pink-600 to-red-600",
      delay: "animation-delay-1500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`relative snake-border ${feature.borderClass} animate-fade-in ${feature.delay}`}
        >
          {/* Efekt poświaty */}
          <div className={feature.glowClass}></div>

          {/* Zawartość karty */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 relative z-10">
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

            <div className="mt-auto">
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
