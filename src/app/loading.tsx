export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          <div className="mt-6 w-full space-y-4">
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
