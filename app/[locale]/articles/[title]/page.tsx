import BlogWrapper from "@/components/blogs/id/BlogWrapper";
import PageWrapper from "@/components/PageWrapper";
import { getBlog, getBlogs } from "@/db/data/blogs-data";
import { getBlogCreationTime } from "@/lib/parsers";
import { notFound } from "next/navigation";
import { setStaticParamsLocale } from "next-international/server";
import { getStaticParams } from "@/locales/server";
import { getArticle, getArticles } from "@/db/data/articles-data";
import { JSONContent } from "novel";

export const generateMetadata = async ({
  params,
}: {
  params: { title: string; locale: string };
}) => {
  try {
    const article = await getArticle(params.title);
    if (!article) throw new Error("No article found");
    const { title, description, image } = getBlogCreationTime(
      article.content as JSONContent,
    );
    return {
      title: article.seo_title,
      description: article.seo_description,
      openGraph: {
        images: [image],
      },
      keywords: article.seo_keywords,
    };
  } catch (error) {
    return notFound();
  }
};

export const generateStaticParams = async () => {
  try {
    const articles = await getArticles();
    if (!articles) throw new Error("No articles found");
    return articles.map((article) => ({
      title: article.title,
    }));
  } catch (error) {
    return notFound();
  }
};

const page = async ({
  params,
}: {
  params: { title: string; locale: string };
}) => {
  setStaticParamsLocale(params.locale);
  const article = await getArticle(params.title);
  if (!article) return notFound();
  return (
    <PageWrapper className="my-0 sm:my-20">
      <BlogWrapper content={article.content as JSONContent} type="articles" />
    </PageWrapper>
  );
};

export default page;
