"use client";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Konfiguracja Firebase
 * Wartości pobierane są ze zmiennych środowiskowych
 * Wymagane dla połączenia z projektem Firebase
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Inicjalizacja aplikacji Firebase
 */
const app = initializeApp(firebaseConfig);

/**
 * Inicjalizacja usług Firebase potrzebnych w aplikacji
 */
const auth = getAuth(app); // Usługa uwierzytelniania
const db = getFirestore(app); // Usługa bazy danych Firestore
const googleProvider = new GoogleAuthProvider(); // Provider logowania Google

export { app, auth, db, googleProvider };
