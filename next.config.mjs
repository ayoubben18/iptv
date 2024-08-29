import { withLogtail } from "@logtail/next";

/** @type {import('next').NextConfig} */
const nextConfig = withLogtail({
  images: {
    remotePatterns: [
      { hostname: "rwxfqslhsyxt7n8g.public.blob.vercel-storage.com" },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/services",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/channels-list/live/index.html",
        destination: "/channels",
        permanent: true,
      },
      {
        source: "/channels-list/live/40.html",
        destination: "/channels?search=bein+sport",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/#pricing",
        permanent: true,
      },
    ];
  },
  // experimental: {
  //   serverComponentsExternalPackages: ["pino", "pino-pretty"],
  // },
});

export default nextConfig;
