import { getBlogs } from "@/db/data/blogs-data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ronotv.com";
  const blogs = await getBlogs();
  const blogsData = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: blog.created_at,
  }));
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    ...blogsData,
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: "never",
    },
    {
      url: `${baseUrl}/channels`,
      lastModified: new Date(),
      changeFrequency: "never",
    },
    {
      url: `${baseUrl}/free-trial`,
      lastModified: new Date(),
      changeFrequency: "never",
    },
  ];
}
