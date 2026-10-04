import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // a stray package-lock.json in the user's home dir otherwise confuses root detection
  turbopack: { root: __dirname },
  // the TradingView indicator page became the GTS Terminal page
  async redirects() {
    return [{ source: "/indicator", destination: "/terminal", permanent: true }];
  },
};

export default nextConfig;
