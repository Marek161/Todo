import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          404 - Strona nie znaleziona
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Przepraszamy, strona której szukasz nie istnieje lub została
          przeniesiona.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  );
}
