import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow testing the dev server from phones and other devices on the local network.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-1587038787166-becd08a156f7",
      },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
