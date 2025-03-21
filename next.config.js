/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
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
};

module.exports = nextConfig;
