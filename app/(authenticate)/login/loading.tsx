import PageWrapper from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <PageWrapper className="justify-center">
      <Skeleton className="h-72 w-full" />
    </PageWrapper>
  );
};

export default loading;
