import CheckoutCard from "@/components/checkout/CheckoutCard";
import PageWrapper from "@/components/PageWrapper";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <PageWrapper className="justify-center p-6">
      <Suspense>
        <CheckoutCard />
      </Suspense>
    </PageWrapper>
  );
}
