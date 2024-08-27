import CheckoutCard from "@/components/checkout/CheckoutCard";
import PageWrapper from "@/components/PageWrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout page",
};

export default function CheckoutPage() {
  return (
    <PageWrapper className="justify-center py-6" notContainer>
      <Suspense>
        <CheckoutCard />
      </Suspense>
    </PageWrapper>
  );
}
