import Link from "next/link";
import { FaTasks } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="text-center">
          <FaTasks className="mx-auto h-12 w-12 text-primary-600 dark:text-primary-400" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
            Planner
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Zarządzaj swoimi zadaniami w jednym miejscu
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href="/auth"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Rozpocznij
          </Link>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Zaloguj się, aby synchronizować swoje zadania między urządzeniami
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
