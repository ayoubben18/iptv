import { withLogtail } from "@logtail/next";

/** @type {import('next').NextConfig} */
const nextConfig = withLogtail({
  images: {
    remotePatterns: [
      { hostname: "rwxfqslhsyxt7n8g.public.blob.vercel-storage.com" },
    ],
  },
  // experimental: {
  //   serverComponentsExternalPackages: ["pino", "pino-pretty"],
  // },
});

export default nextConfig;
