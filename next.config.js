/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Wyłączenie optymalizacji obrazów - może pomóc z problem CORS
  images: {
    unoptimized: true,
    domains: ["firebasestorage.googleapis.com"],
  },

  // Dodatkowe opcje dla serwera deweloperskiego
  webpack: (config, { isServer, dev }) => {
    // Dostosowania dla trybu deweloperskiego
    if (dev) {
      // Wyłącz watchera dla plików node_modules, które mogą powodować problemy
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
      };
    }
    return config;
  },

  // Inne ustawienia, które mogą pomóc z uruchomieniem aplikacji
  experimental: {
    // Wyłącz aPPDir, jeśli powoduje problemy
    appDir: true,
  },
};

module.exports = nextConfig;
