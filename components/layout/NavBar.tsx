"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import DarkModeSwitch from "../shared/DarkModeSwitch";
import { useI18n } from "@/locales/client";

const NavBar = () => {
  const t = useI18n();
  const links = [
    {
      name: t("navbar.pricing"),
      link: "/#pricing",
    },
    {
      name: t("navbar.freeTrial"),
      link: "/free-trial",
    },
    {
      name: t("navbar.setupGuide"),
      link: "/blogs",
    },
    {
      name: t("navbar.channelsList"),
      link: "/channels",
    },
    {
      name: t("navbar.support"),
      link: "/support",
    },
  ];
  const router = useRouter();
  return (
    <div className="container mx-auto px-4">
      <div className="flex h-20 items-center justify-between">
        <Link href={`/`}>
          <Image
            src="/logo.png"
            alt="RONOTV"
            priority
            width={180}
            height={180}
          />
        </Link>
        <div className="hidden items-center gap-2 lg:flex xl:gap-6">
          {links.map((link, index) => (
            <Button
              key={index}
              variant={"linkHover2"}
              className="text-base text-black dark:text-white"
              size={"sm"}
              onClick={() => router.push(link.link)}
            >
              {link.name}
            </Button>
          ))}
          <Button
            className="text-base text-black dark:text-white"
            onClick={() => router.push("/#pricing")}
            variant={"shine"}
            size={"sm"}
          >
            {t("navbar.orderNow")}
          </Button>
          <DarkModeSwitch />
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="mb-4 bg-white dark:bg-gray-800">
            <div className="mx-auto flex w-full max-w-sm flex-col items-center">
              <div className="flex flex-col items-center space-y-4 py-6">
                {links.map((link, index) => (
                  <Button
                    key={index}
                    variant={"ghost"}
                    className="w-full text-xl"
                    onClick={() => router.push(link.link)}
                  >
                    {link.name}
                  </Button>
                ))}
                <Button onClick={() => router.push("/#pricing")}>
                  ORDER NOW
                </Button>
              </div>
              <DarkModeSwitch />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default NavBar;
