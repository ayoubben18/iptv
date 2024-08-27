import Faq from "@/components/landing-page/Faq";
import { Features } from "@/components/landing-page/Features";
import Hero from "@/components/landing-page/Hero";
import Insights from "@/components/landing-page/Insights";
import { MoviesSlider } from "@/components/landing-page/MoviesSlider";
import Pricing from "@/components/landing-page/Pricing";
import PageWrapper from "@/components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper className="gap-10 pt-20 sm:gap-20">
      <Hero />
      <Insights />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-center text-4xl font-bold">
            Explore the latest movies and TV shows
          </h1>
          <p className="mb-8 text-center">
            Experience the best of video on demand with our IPTV VOD library.
            Watch your favorite movies, TV shows, and documentaries, anytime,
            anywhere, from multiple platforms like prime, hbo, netflix, hulo,
            disney, sling tv, apple tv and more. With a vast collection of
            titles updated regularly, you'll never run out of things to watch.
            So sit back, relax, and enjoy the ultimate viewing experience with
            IPTV VOD.
          </p>
        </div>
        <MoviesSlider />
      </div>
      <Features />
      <Pricing />
      <Faq />
    </PageWrapper>
  );
}
