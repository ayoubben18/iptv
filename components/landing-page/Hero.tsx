"use client";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Meteors from "../magicui/meteors";
import { useI18n } from "@/locales/client";

const Hero = () => {
  const router = useRouter();
  const t = useI18n();
  return (
    <div
      className="relative mx-auto flex max-w-5xl flex-col items-center justify-center py-9 md:py-16"
      id="about"
    >
      <div className="z-10 flex flex-col gap-6 text-center">
        <h1 className="text-5xl font-black md:text-7xl">
          {t("hereHeader")}{" "}
          <span className="bg-gradient-to-r from-purple-800 via-pink-500 to-red-500 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-blue-400 dark:via-purple-500 dark:to-pink-500">
            RONOTV
          </span>
        </h1>
        <p className="mt-4 text-2xl font-medium md:text-4xl">
          {t("heroDescription")}
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            className="flex items-center gap-2"
            variant={"gooeyLeft"}
            onClick={() => router.push(`#pricing`)}
          >
            <CircleCheck className="h-4 w-4" />
            {t("heroButton")}
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => router.push(`/free-trial`)}
            className="border-[1px] border-black"
          >
            {t("heroButtonFreeTrial")}
          </Button>
        </div>
      </div>
      <Meteors number={20} />
    </div>
  );
};

export default Hero;
