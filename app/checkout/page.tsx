import CheckoutCard from "@/components/checkout/CheckoutCard";
import PageWrapper from "@/components/PageWrapper";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <PageWrapper className="justify-center py-6" notContainer>
      <Suspense>
        <CheckoutCard />
      </Suspense>
    </PageWrapper>
  );
}
