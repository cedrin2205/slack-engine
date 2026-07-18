import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@slack-engine/database"],
};

export default nextConfig;