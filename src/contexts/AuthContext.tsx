"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
  UserCredential,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  handleAuthError: (error: unknown) => string;
  signUpWithEmail: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth musi być używany wewnątrz AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Monitorowanie stanu uwierzytelnienia
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      console.log(
        "AuthContext - zmiana stanu uwierzytelnienia:",
        user ? `zalogowany (${user.email})` : "niezalogowany"
      );
    });

    return () => unsubscribe();
  }, []);

  /**
   * Logowanie za pomocą emaila i hasła
   */
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Błąd logowania:", error);
      setError(handleAuthError(error));
      throw error;
    }
  };

  /**
   * Rejestracja za pomocą emaila i hasła
   */
  const signUp = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      console.error("Błąd rejestracji:", error);
      setError(handleAuthError(error));
      throw error;
    }
  };

  /**
   * Wylogowanie
   */
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Błąd wylogowania:", error);
      setError(handleAuthError(error));
      throw error;
    }
  };

  /**
   * Logowanie za pomocą Google
   */
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Błąd logowania przez Google:", error);
      setError(handleAuthError(error));
      throw error;
    }
  };

  /**
   * Resetowanie hasła
   */
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Błąd resetowania hasła:", error);
      setError(handleAuthError(error));
      throw error;
    }
  };

  // Obsługa błędów uwierzytelniania
  const handleAuthError = (error: unknown): string => {
    const firebaseError = error as AuthError;
    const errorCode = firebaseError.code;

    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Ten adres email jest już używany przez inne konto.";
      case "auth/invalid-email":
        return "Nieprawidłowy adres email.";
      case "auth/user-disabled":
        return "To konto zostało wyłączone.";
      case "auth/user-not-found":
        return "Nie znaleziono użytkownika z tym adresem email.";
      case "auth/wrong-password":
        return "Niepoprawne hasło.";
      case "auth/weak-password":
        return "Hasło jest za słabe. Użyj silniejszego hasła.";
      case "auth/popup-closed-by-user":
        return "Logowanie zostało przerwane. Spróbuj ponownie.";
      case "auth/cancelled-popup-request":
        return "Logowanie zostało przerwane. Spróbuj ponownie.";
      case "auth/popup-blocked":
        return "Okno logowania zostało zablokowane. Włącz wyskakujące okienka dla tej strony.";
      default:
        return "Wystąpił błąd podczas uwierzytelniania. Spróbuj ponownie później.";
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword,
    handleAuthError,
    signUpWithEmail: signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
