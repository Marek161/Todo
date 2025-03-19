import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Planner - Aplikacja do zarządzania zadaniami",
  description:
    "Nowoczesna aplikacja do zarządzania zadaniami z synchronizacją w chmurze",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
