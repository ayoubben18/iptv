import Faq from "@/components/landing-page/Faq";
import Hero from "@/components/landing-page/Hero";
import Offer from "@/components/landing-page/Offer";
import { Features } from "@/components/landing-page/Features";
import Pricing from "@/components/landing-page/Pricing";
import PageWrapper from "@/components/PageWrapper";
import Movies from "@/components/landing-page/Movies";
import Insights from "@/components/landing-page/Insights";

export default function Home() {
  return (
    <PageWrapper className="gap-10 pt-20 sm:gap-20">
      <Hero />
      <Insights />
      <Movies />
      <Features />
      <Pricing />
      <Faq />
    </PageWrapper>
  );
}
