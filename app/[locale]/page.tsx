import Faq from "@/components/landing-page/Faq";
import { Features } from "@/components/landing-page/Features";
import Hero from "@/components/landing-page/Hero";
import Insights from "@/components/landing-page/Insights";
import { MoviesSlider } from "@/components/landing-page/MoviesSlider";
import Pricing from "@/components/landing-page/Pricing";
import PageWrapper from "@/components/PageWrapper";
import { getI18n } from "@/locales/server";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const t = await getI18n();
  return (
    <PageWrapper className="gap-10 pt-5 md:pt-10 2xl:gap-16 2xl:pt-20">
      <Hero />
      <Suspense>
        <Insights />
      </Suspense>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-center text-4xl font-bold">
            {t("insightsMoviesSliderTitle")}
          </h1>
          <p className="mb-8 text-center">
            {t("insightsMoviesSliderDescription")}
          </p>
        </div>
        <MoviesSlider />
      </div>
      <Suspense>
        <Features />
      </Suspense>
      <Suspense>
        <Pricing />
      </Suspense>
      <Suspense>
        <Faq />
      </Suspense>
    </PageWrapper>
  );
}
