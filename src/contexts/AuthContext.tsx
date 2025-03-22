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
  AuthError,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * Interfejs dla kontekstu uwierzytelniania
 * Definiuje wszystkie funkcje i dane dostępne poprzez kontekst uwierzytelniania
 */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
  handleAuthError: (error: any) => string;
}

/**
 * Utworzenie kontekstu uwierzytelniania z wartością domyślną undefined
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider dla kontekstu uwierzytelniania
 * Udostępnia funkcje i dane uwierzytelniania dla całej aplikacji
 *
 * @param {Object} props - Właściwości komponentu
 * @param {ReactNode} props.children - Komponenty potomne
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obserwuje zmiany statusu uwierzytelniania
   * Aktualizuje stan użytkownika i ładowania przy zmianach
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Czyszczenie subskrypcji przy demontażu komponentu
    return () => unsubscribe();
  }, []);

  /**
   * Logowanie przez email i hasło
   *
   * @param {string} email - Adres email użytkownika
   * @param {string} password - Hasło użytkownika
   * @returns {Promise<void>} - Promise rozwiązywane po pomyślnym logowaniu
   */
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(handleAuthError(error));
      throw error;
    }
  };

  /**
   * Logowanie przez Google
   * Wykorzystuje uwierzytelnianie przez Google jako zewnętrznego dostawcę
   *
   * @returns {Promise<void>} - Promise rozwiązywane po pomyślnym logowaniu
   */
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

  /**
   * Tworzenie nowego konta użytkownika
   *
   * @param {string} email - Adres email nowego użytkownika
   * @param {string} password - Hasło nowego użytkownika
   * @returns {Promise<void>} - Promise rozwiązywane po pomyślnym utworzeniu konta
   */
  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(handleAuthError(error));
      throw error;
    }
  };

  /**
   * Resetowanie hasła użytkownika
   * Wysyła email z linkiem do resetowania hasła
   *
   * @param {string} email - Adres email użytkownika
   * @returns {Promise<void>} - Promise rozwiązywane po wysłaniu emaila
   */
  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      setError(handleAuthError(error));
      throw error;
    }
  };

  /**
   * Wylogowanie użytkownika
   *
   * @returns {Promise<void>} - Promise rozwiązywane po pomyślnym wylogowaniu
   */
  const signOut = async () => {
    try {
      await authSignOut(auth);
    } catch (error: any) {
      setError("Wystąpił błąd podczas wylogowywania.");
      throw error;
    }
  };

  /**
   * Czyszczenie błędów uwierzytelniania
   * Resetuje stan błędu
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Funkcja pomocnicza do obsługi błędów uwierzytelniania
   * Konwertuje kody błędów Firebase na przyjazne użytkownikowi komunikaty
   *
   * @param {AuthError} error - Obiekt błędu z Firebase Auth
   * @returns {string} - Komunikat błędu do wyświetlenia użytkownikowi
   */
  const handleAuthError = (error: AuthError): string => {
    switch (error.code) {
      case "auth/invalid-credential":
        return "Niepoprawny email lub hasło.";
      case "auth/email-already-in-use":
        return "Ten adres email jest już używany.";
      case "auth/user-not-found":
        return "Nie znaleziono użytkownika o podanym adresie email.";
      case "auth/wrong-password":
        return "Niepoprawne hasło.";
      default:
        return "Wystąpił błąd uwierzytelniania. Spróbuj ponownie.";
    }
  };

  // Wartość kontekstu udostępniana komponentom
  const value = {
    user,
    loading,
    error,
    signInWithEmail,
    signInWithGoogle,
    signUpWithEmail,
    signOut,
    resetPassword,
    clearError,
    handleAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook dla używania kontekstu uwierzytelniania
 * Udostępnia funkcje i dane uwierzytelniania komponentom
 *
 * @returns {AuthContextType} - Kontekst uwierzytelniania
 * @throws {Error} - Błąd jeśli hook jest używany poza AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth musi być używane wewnątrz AuthProvider");
  }
  return context;
};
