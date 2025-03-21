"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { FeatureCards } from "@/components/FeatureCards";
import { FiLogIn, FiCheckCircle, FiClock, FiCheckSquare } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Uruchom animację po załadowaniu strony
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Hero section z animacjami */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-300%">
                Zarządzaj zadaniami z łatwością
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Intuicyjna aplikacja do zarządzania zadaniami, która pomaga Ci być
              zorganizowanym i produktywnym każdego dnia.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Link
              href={user ? "/dashboard" : "/auth"}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none shadow-lg transform transition-all duration-200 hover:scale-105 animate-pulse-slow"
            >
              <FiLogIn className="mr-2" />
              {user ? "Przejdź do panelu" : "Zaloguj się"}
            </Link>
          </div>
        </div>

        {/* Animowane ikony zalet */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCheckCircle className="text-green-500" size={24} />,
                title: "Łatwe zarządzanie",
                description: "Prosta i intuicyjna obsługa zadań",
                delay: "delay-100",
              },
              {
                icon: <FiClock className="text-blue-500" size={24} />,
                title: "Oszczędność czasu",
                description: "Szybkie dodawanie i zarządzanie zadaniami",
                delay: "delay-300",
              },
              {
                icon: <FiCheckSquare className="text-purple-500" size={24} />,
                title: "Organizacja",
                description: "Kategorie i filtry dla lepszej organizacji",
                delay: "delay-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform transition-all duration-700 ${item.delay} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-3 animate-float">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Animowane karty funkcji */}
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 delay-500 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Funkcje aplikacji
          </h2>
          <FeatureCards />
        </div>
      </main>
    </div>
  );
}
