import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent bundling of heavy binary packages into serverless functions
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
};

export default nextConfig;
