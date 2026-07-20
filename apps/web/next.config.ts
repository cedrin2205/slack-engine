import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@slack-engine/database"],
  allowedDevOrigins: ["169.254.159.123"],
};

export default nextConfig;