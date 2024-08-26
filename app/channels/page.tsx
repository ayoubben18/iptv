import CountriesSelect from "@/components/channels/CountriesSelect";
import PageWrapper from "@/components/PageWrapper";
import React from "react";

const page = () => {
  return (
    <PageWrapper className="justify-center">
      <CountriesSelect />
    </PageWrapper>
  );
};

export default page;
