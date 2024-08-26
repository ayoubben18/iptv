import PageWrapper from "@/components/PageWrapper";
import EmailForm from "@/components/support/EmailForm";
import React from "react";

const page = () => {
  return (
    <PageWrapper className="justify-center">
      <EmailForm />
    </PageWrapper>
  );
};

export default page;
