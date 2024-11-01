import { getBlogs } from "../db/data/blogs-data";
import { getArticles } from "../db/data/articles-data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ronotv.com";
  const blogs = await getBlogs();
  const articles = await getArticles();
  const locales = ["en", "es", "de", "fr", "ru"];

  // Generate localized URLs for static pages
  const staticPages = [
    { path: "", priority: 1, changeFrequency: "never" },
    { path: "support", changeFrequency: "never" },
    { path: "channels", changeFrequency: "never" },
    { path: "free-trial", changeFrequency: "never" },
    { path: "articles", changeFrequency: "weekly" },
    { path: "blogs", changeFrequency: "weekly" },
  ];

  // Generate localized static page URLs
  const localizedStaticUrls = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page.path ? `/${page.path}` : ""}`,
      lastModified: new Date(),
      changeFrequency:
        page.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: page.priority || 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l,
            `${baseUrl}/${l}${page.path ? `/${page.path}` : ""}`,
          ]),
        ),
      },
    })),
  );

  // Generate localized blog URLs
  const localizedBlogUrls = blogs.flatMap((blog) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blogs/${blog.title}`,
      lastModified: new Date(blog.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/blogs/${blog.title}`]),
        ),
      },
    })),
  );

  // Generate localized article URLs
  const localizedArticleUrls = articles.flatMap((article) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/articles/${article.title}`,
      lastModified: new Date(article.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/articles/${article.title}`]),
        ),
      },
    })),
  );

  return [
    ...localizedStaticUrls,
    ...localizedBlogUrls,
    ...localizedArticleUrls,
  ];
}
