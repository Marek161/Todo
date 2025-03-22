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

    // Dodajemy babel-loader, aby obsłużyć pliki, które mogą powodować błąd webpacka
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["next/babel"], // Korzystaj z domyślnych presetów Next.js
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
