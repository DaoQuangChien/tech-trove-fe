import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "pub-d3234e2e186848bb8b0db5d5d1838760.r2.dev",
      },
    ],
  },
};

export default nextConfig;
