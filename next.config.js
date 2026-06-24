/** @type {import('next').NextConfig} */
const nextConfig = {
  // Externalize Chromium binary package for serverless route handlers
  serverExternalPackages: ["@sparticuz/chromium"],
  // Also include in experimental config for compatibility
  experimental: {
    serverExternalPackages: ["@sparticuz/chromium"],
  },
  // Empty Turbopack config to silence the default warning
  turbopack: {},
};

module.exports = nextConfig;

