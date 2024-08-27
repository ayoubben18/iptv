import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/blogs",
        "/support",
        "/checkout",
        "/free-trial",
        "/channels",
      ],
      disallow: [],
    },
    sitemap: "https://www.ronotv.com/sitemap.xml",
  };
}
