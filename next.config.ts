import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El bundler de Turbopack en modo dev no resuelve bien los exports
  // condicionales de @vercel/blob; sacarlo del bundle del servidor (require()
  // directo en runtime) lo arregla, y de paso evita re-empaquetarlo en cada
  // función serverless.
  serverExternalPackages: ["@vercel/blob"],
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
