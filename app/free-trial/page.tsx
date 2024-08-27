import ContactComp from "@/components/free-trial/ContactComp";
import PageWrapper from "@/components/PageWrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Free Trial",
  description: "The RONOTV Free Trial",
};

const page = () => {
  return (
    <PageWrapper className="justify-center">
      <ContactComp />
    </PageWrapper>
  );
};

export default page;
