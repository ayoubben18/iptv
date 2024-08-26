import BlogsList from "@/components/blogs/BlogsList";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

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
