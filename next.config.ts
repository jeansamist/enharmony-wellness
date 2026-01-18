import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "tapback.co" },
      { hostname: "72.61.104.221" },
      { hostname: "localhost" },
      { hostname: "images.unsplash.com" },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
