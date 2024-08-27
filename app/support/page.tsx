import PageWrapper from "@/components/PageWrapper";
import EmailForm from "@/components/support/EmailForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Support",
  description: "Support page for RONOTV",
};

const page = () => {
  return (
    <PageWrapper className="justify-center">
      <EmailForm />
    </PageWrapper>
  );
};

export default page;
