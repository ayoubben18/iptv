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

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  // experimental: {
  //   serverComponentsExternalPackages: ["pino", "pino-pretty"],
  // },
});

export default nextConfig;
