"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  FiMail,
  FiLock,
  FiLogIn,
  FiUserPlus,
  FiLoader,
  FiKey,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Navbar from "@/components/Navbar";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    signInWithEmail,
    signUp,
    signInWithGoogle,
    resetPassword,
    error,
    clearError,
  } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError("");
    setLoading(true);
    setResetSuccess(false);

    try {
      if (isResetMode) {
        await resetPassword(email);
        setResetSuccess(true);
      } else if (isLogin) {
        await signInWithEmail(email, password);
        router.push("/dashboard");
      } else {
        await signUp(email, password);
        router.push("/dashboard");
      }
    } catch (error) {
      // Błędy są obsługiwane w kontekście auth
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    setLocalError("");
    setLoading(true);
    setResetSuccess(false);

    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      // Błędy są obsługiwane w kontekście auth
    } finally {
      setLoading(false);
    }
  };

  const toggleResetMode = () => {
    setIsResetMode(!isResetMode);
    clearError();
    setLocalError("");
    setResetSuccess(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md relative overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"></div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600"></div>
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-purple-600 via-blue-600 to-indigo-600"></div>
            <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-indigo-600 via-blue-600 to-purple-600"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gradient-primary">
                {isResetMode
                  ? "Resetowanie hasła"
                  : isLogin
                    ? "Zaloguj się"
                    : "Utwórz konto"}
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {isResetMode
                  ? "Podaj swój adres email, na który wyślemy link do resetowania hasła"
                  : isLogin
                    ? "Zaloguj się, aby zarządzać swoimi zadaniami"
                    : "Utwórz konto, aby rozpocząć korzystanie z aplikacji"}
              </p>
            </div>

            {resetSuccess && (
              <div className="my-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md text-sm animate-fade-in">
                Link do resetowania hasła został wysłany na podany adres email.
                Sprawdź swoją skrzynkę.
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Adres email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-gray-900"
                      placeholder="twoj@email.com"
                    />
                  </div>
                </div>

                {!isResetMode && (
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Hasło
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={
                          isLogin ? "current-password" : "new-password"
                        }
                        required={!isResetMode}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-gray-900"
                        placeholder="********"
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? (
                          <FiEyeOff className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <FiEye className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {(error || localError) && (
                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                  {error || localError}
                </div>
              )}

              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <FiLoader className="animate-spin" />
                  ) : isResetMode ? (
                    <>
                      <FiKey className="mr-2" />
                      Wyślij link resetujący
                    </>
                  ) : isLogin ? (
                    <>
                      <FiLogIn className="mr-2" />
                      Zaloguj się
                    </>
                  ) : (
                    <>
                      <FiUserPlus className="mr-2" />
                      Utwórz konto
                    </>
                  )}
                </button>

                {!isResetMode && (
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <FiLoader className="animate-spin" />
                    ) : (
                      <>
                        <FcGoogle className="mr-2 text-lg" />
                        {isLogin
                          ? "Zaloguj się przez Google"
                          : "Zarejestruj się przez Google"}
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            <div className="text-center mt-4 flex flex-col space-y-2">
              <button
                onClick={toggleResetMode}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
              >
                {isResetMode ? "Powrót do logowania" : "Zapomniałeś hasła?"}
              </button>

              {!isResetMode && (
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                >
                  {isLogin
                    ? "Nie masz konta? Zarejestruj się"
                    : "Masz już konto? Zaloguj się"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
