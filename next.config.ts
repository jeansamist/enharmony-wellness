import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "tapback.co" }],
    unoptimized: false,
  },
};

export default nextConfig;
