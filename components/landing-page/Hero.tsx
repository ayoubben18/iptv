"use client";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SectionWrapper from "../shared/SectionWrapper";
import { Button } from "../ui/button";

const Hero = () => {
  const router = useRouter();
  return (
    <SectionWrapper className="lg:flex-row">
      <div className="flex flex-col gap-6 text-start" id="about">
        <h1 className="text-5xl font-black">
          Endless Entertainment, All on IPTV
        </h1>
        <p className="mt-4 text-2xl font-medium">
          Switch to IPTV for uninterrupted, high-quality streaming of your
          favorite channels and shows.
        </p>
        <p className="text-2xl font-extralight">Our unprecedented features</p>
        <div className="mt-6 flex gap-4">
          <Button
            className="flex items-center gap-2"
            onClick={() => router.push(`#pricing`)}
          >
            <CircleCheck className="h-4 w-4" />
            Discover our library
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => router.push(`/free-trial`)}
            className="border-[1px] border-black"
          >
            Free Trial
          </Button>
        </div>
      </div>
      <Image
        src={`/tv.png`}
        width={600}
        height={600}
        priority
        alt="tv"
        style={{
          aspectRatio: "300/300",
          objectFit: "cover",
        }}
      />
    </SectionWrapper>
  );
};

export default Hero;
