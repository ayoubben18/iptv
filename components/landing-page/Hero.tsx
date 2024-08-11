"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { CircleCheck } from "lucide-react";
import SectionWrapper from "../shared/SectionWrapper";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = () => {
  const router = useRouter();
  return (
    <SectionWrapper className="lg:flex-row">
      <div className="flex flex-col gap-6 text-start">
        <h1 className="text-5xl font-black">
          Endless Entertainment, All on IPTV
        </h1>
        <p className="mt-4 text-2xl font-medium">
          Switch to IPTV for uninterrupted, high-quality streaming of your
          favorite channels and shows.
        </p>
        <p className="text-2xl font-extralight">Our unprecedented features</p>
        <div className="mt-6 flex gap-4">
          <Button className="flex items-center gap-2">
            <CircleCheck className="h-4 w-4" />
            <SmoothScrollLink href={`#pricing`}>
              Discover our library
            </SmoothScrollLink>
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => router.push(`/checkout`)}
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

export const SmoothScrollLink = ({
  href,
  children,
}: {
  href: string;
  children: string;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default Hero;
