"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as authSignOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// Interfejs dla kontekstu uwierzytelniania
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

// Utworzenie kontekstu
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider dla kontekstu uwierzytelniania
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obserwuj zmiany statusu uwierzytelniania
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Logowanie przez email i hasło
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(
        error.code === "auth/invalid-credential"
          ? "Niepoprawny email lub hasło."
          : "Wystąpił błąd podczas logowania. Spróbuj ponownie."
      );
      throw error;
    }
  };

  // Logowanie przez Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setError("Wystąpił błąd podczas logowania przez Google.");
      throw error;
    }
  };

  // Tworzenie konta
  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Ten adres email jest już używany.");
      } else {
        setError("Wystąpił błąd podczas tworzenia konta.");
      }
      throw error;
    }
  };

  // Resetowanie hasła
  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("Nie znaleziono użytkownika o podanym adresie email.");
      } else {
        setError("Wystąpił błąd podczas resetowania hasła.");
      }
      throw error;
    }
  };

  // Wylogowanie
  const signOut = async () => {
    try {
      await authSignOut(auth);
    } catch (error) {
      setError("Wystąpił błąd podczas wylogowywania.");
      throw error;
    }
  };

  // Czyszczenie błędów
  const clearError = () => {
    setError(null);
  };

  // Wartość kontekstu
  const value = {
    user,
    loading,
    error,
    signInWithEmail,
    signInWithGoogle,
    signUp,
    signOut,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook dla używania kontekstu uwierzytelniania
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth musi być używane wewnątrz AuthProvider");
  }
  return context;
};
