/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  // Configure for GitHub Pages deployment
  basePath: process.env.NODE_ENV === "production" ? "/TODO" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/TODO/" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;