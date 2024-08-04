import Faq from "@/components/landing-page/Faq";
import Hero from "@/components/landing-page/Hero";
import Offer from "@/components/landing-page/Offer";
import Pricing from "@/components/landing-page/Pricing";
import PageWrapper from "@/components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper className="gap-4 pt-20">
      <Hero />
      <Offer />
      <Pricing />
      <Faq />
    </PageWrapper>
  );
}
