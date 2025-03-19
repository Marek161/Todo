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
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Błąd logowania przez Google:", error);
      setError("Wystąpił błąd podczas logowania przez Google");
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Błąd wylogowania:", error);
      setError("Wystąpił błąd podczas wylogowania");
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Aktualizacja profilu użytkownika z displayName
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName,
        });
        // Odśwież obiekt użytkownika, aby zawierał zaktualizowane dane
        setUser({ ...userCredential.user });
      }
    } catch (error: any) {
      console.error("Błąd rejestracji:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("Ten adres email jest już używany");
      } else if (error.code === "auth/weak-password") {
        setError("Hasło jest zbyt słabe");
      } else {
        setError("Wystąpił błąd podczas rejestracji");
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Błąd logowania:", error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setError("Nieprawidłowy email lub hasło");
      } else {
        setError("Wystąpił błąd podczas logowania");
      }
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    signUp,
    signIn,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}