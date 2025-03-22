"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  FiMail,
  FiLock,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiUserPlus,
  FiRefreshCw,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { ErrorMessage } from "./ErrorMessage";

interface AuthFormProps {
  onSuccess: () => void;
  type: "login" | "register";
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess, type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  const {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    resetPassword,
    handleAuthError, // Upewnij się, że handleAuthError jest dostępna w kontekście
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      (type === "register" && password !== confirmPassword)
    ) {
      setError(
        "Proszę wypełnić wszystkie pola i upewnić się, że hasła są zgodne"
      );
      return;
    }
    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (type === "login") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password); // Użyj 'signUpWithEmail'
      }
      onSuccess();
    } catch (err) {
      setError(handleAuthError(err)); // Obsługuje błąd
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      onSuccess();
    } catch (err) {
      setError(handleAuthError(err)); // Obsługuje błąd
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetEmail) {
      setResetError("Podaj adres email");
      return;
    }

    try {
      setResetError(null);
      setResetLoading(true);
      await resetPassword(resetEmail); // Resetowanie hasła
      setResetEmailSent(true);
    } catch (err) {
      setResetError(handleAuthError(err)); // Obsługuje błąd
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {showForgotPassword ? (
        <div>
          <button
            onClick={() => {
              setShowForgotPassword(false);
              setResetEmailSent(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            &larr; Wróć do logowania
          </button>
          {!resetEmailSent ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {resetError && <ErrorMessage message={resetError} />}
              <div>
                <label htmlFor="reset-email" className="block text-sm">
                  Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="twoj@email.com"
                  required
                  className="input"
                />
              </div>
              <button type="submit" disabled={resetLoading} className="btn">
                {resetLoading ? (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  "Zresetuj hasło"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <h3 className="text-lg">Link wysłany!</h3>
              <p>
                Sprawdź swoją skrzynkę pocztową. Wysłaliśmy link do resetowania
                hasła na adres {resetEmail}.
              </p>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <ErrorMessage message={error} />}
          <div>
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.com"
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">
              Hasło
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          {type === "register" && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm">
                Potwierdź hasło
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  required
                  className="input"
                />
              </div>
            </div>
          )}
          <button type="submit" disabled={loading} className="btn">
            {loading ? (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : type === "login" ? (
              "Zaloguj się"
            ) : (
              "Zarejestruj się"
            )}
          </button>
          <div className="text-center text-sm text-gray-500">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="hover:text-gray-700"
            >
              Zapomniałeś hasła?
            </button>
          </div>
        </form>
      )}
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="text-gray-500">lub</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="mt-4 text-center">
        <button onClick={handleGoogleSignIn} className="btn btn-google">
          <FcGoogle className="mr-2" />
          Zaloguj się przez Google
        </button>
      </div>
    </div>
  );
};
