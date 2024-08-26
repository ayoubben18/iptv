import BlogWrapper from "@/components/blogs/id/BlogWrapper";
import PageWrapper from "@/components/PageWrapper";
import { getBlog } from "@/db/data/blogs-data";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const blog = await getBlog(params.id);
  if (!blog) return notFound();
  return (
    <PageWrapper className="my-0 sm:my-20">
      <BlogWrapper content={blog.content} id={params.id} />
    </PageWrapper>
  );
};

export default page;
