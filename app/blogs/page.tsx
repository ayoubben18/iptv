import BlogsList from "@/components/blogs/BlogsList";
import PageWrapper from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs page and setup guide",
};

const page = () => {
  return (
    <PageWrapper className="my-0 gap-4 sm:my-10">
      <Suspense
        fallback={
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                className="relative aspect-video rounded-md"
              />
            ))}
          </div>
        }
      >
        <BlogsList />
      </Suspense>
    </PageWrapper>
  );
};

export default page;
