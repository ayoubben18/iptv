import { withLogtail } from "@logtail/next";

/** @type {import('next').NextConfig} */
const nextConfig = withLogtail({
  // experimental: {
  //   serverComponentsExternalPackages: ["pino", "pino-pretty"],
  // },
  output: "standalone",
});

export default nextConfig;
