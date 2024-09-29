import BlogWrapper from "@/components/blogs/id/BlogWrapper";
import PageWrapper from "@/components/PageWrapper";
import { getBlog, getBlogs } from "@/db/data/blogs-data";
import { getBlogCreationTime } from "@/lib/parsers";
import { notFound } from "next/navigation";
import { setStaticParamsLocale } from "next-international/server";

export const generateMetadata = async ({
  params,
}: {
  params: { title: string; locale: string };
}) => {
  try {
    const blog = await getBlog(params.title);
    if (!blog) throw new Error("No blog found");
    const { title, description, image } = getBlogCreationTime(blog.content);
    return {
      title,
      description,
      openGraph: {
        images: [image],
      },
    };
  } catch (error) {
    return notFound();
  }
};

export const generateStaticParams = async () => {
  try {
    const blogs = await getBlogs();
    if (!blogs) throw new Error("No blogs found");
    return blogs.map((blog) => ({
      title: blog.title,
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
  const blog = await getBlog(params.title);

  if (!blog) return notFound();
  return (
    <PageWrapper className="my-0 sm:my-20">
      <BlogWrapper content={blog.content} />
    </PageWrapper>
  );
};

export default page;
