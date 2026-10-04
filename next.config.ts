import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // a stray package-lock.json in the user's home dir otherwise confuses root detection
  turbopack: { root: __dirname },
};

export default nextConfig;
