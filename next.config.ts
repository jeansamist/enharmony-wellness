import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "tapback.co" },
      { hostname: "72.61.104.221" },
      { hostname: "localhost" },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
