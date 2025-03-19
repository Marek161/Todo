"use client";

import { useEffect, useState } from "react";

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${isOnline ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
    >
      <span
        className={`w-2 h-2 rounded-full mr-1.5 ${isOnline ? "bg-green-500" : "bg-red-500"}`}
      ></span>
      {isOnline ? "Online" : "Offline"}
    </div>
  );
}
