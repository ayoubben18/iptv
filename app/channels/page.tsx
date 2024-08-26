import ChannelsList from "@/components/channels/ChannelsList";
import SearchInputs from "@/components/channels/SearchInputs";
import PageWrapper from "@/components/PageWrapper";
import React, { Suspense } from "react";

const page = () => {
  return (
    <PageWrapper className="my-0 gap-10 sm:my-10">
      <Suspense>
        <SearchInputs />
        <ChannelsList />
      </Suspense>
    </PageWrapper>
  );
};

export default page;
