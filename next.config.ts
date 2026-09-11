import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.hirophone.com",
        pathname: "/cdn/shop/files/**",
      },
      {
        protocol: "https",
        hostname: "hirophone.com",
        pathname: "/cdn/shop/files/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
