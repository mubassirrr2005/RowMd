/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent bundling @sparticuz/chromium so its binary files stay accessible
  serverExternalPackages: ['@sparticuz/chromium'],
  // Empty Turbopack config to silence default warning
  turbopack: {},
};

module.exports = nextConfig;
