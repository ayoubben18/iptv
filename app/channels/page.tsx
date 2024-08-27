import ChannelsList from "@/components/channels/ChannelsList";
import SearchInputs from "@/components/channels/SearchInputs";
import PageWrapper from "@/components/PageWrapper";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Channels",
  description: "Channels Search Page",
};

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
