import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: "loose", // Enable support for ESM modules
  },
};

export default nextConfig;
