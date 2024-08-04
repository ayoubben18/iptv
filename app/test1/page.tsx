import PageWrapper from "@/components/PageWrapper";
import React, { Suspense } from "react";

const page = () => {
  return (
    <PageWrapper>
      <StaticComponent />
      <SlowComponent />
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </PageWrapper>
  );
};

export default page;

const StaticComponent = () => {
  return <div>Hello world</div>;
};

const SlowComponent = () => {
  new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return <div>Slow component</div>;
};
