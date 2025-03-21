"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FiLogIn, FiBookOpen, FiTag, FiCloud } from "react-icons/fi";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/auth");
      }
    }
  }, [user, loading, router]);

  // Prosty ekran ładowania
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">
          Ładowanie aplikacji...
        </p>
      </div>
    </div>
  );
}
