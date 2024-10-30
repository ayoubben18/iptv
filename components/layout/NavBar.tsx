"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import DarkModeSwitch from "../shared/DarkModeSwitch";
import { useI18n, useChangeLocale, useCurrentLocale } from "@/locales/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

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
    {
      name: t("navbar.blogs"),
      link: "/articles",
    },
  ];
  const router = useRouter();
  return (
    <div className="mx-auto max-w-screen-2xl px-4">
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
        <div className="hidden items-center gap-0 text-sm xl:flex xl:gap-2 xl:text-base">
          {links.map((link, index) => (
            <Button
              key={index}
              variant={"linkHover2"}
              className="text-black dark:text-white"
              size={"sm"}
              onClick={() => router.push(link.link)}
            >
              {link.name}
            </Button>
          ))}
          <Button
            className="text-black dark:text-white"
            onClick={() => router.push("/#pricing")}
            variant={"shine"}
            size={"sm"}
          >
            {t("navbar.orderNow")}
          </Button>
          <div className="flex items-center gap-2">
            <DarkModeSwitch />
            <SwitchLanguage />
          </div>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className="xl:hidden">
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
              <SwitchLanguage />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

const languagesList = [
  {
    name: "English",
    code: "en",
  },
  {
    name: "French",
    code: "fr",
  },
  {
    name: "German",
    code: "de",
  },
  {
    name: "Russian",
    code: "ru",
  },
  {
    name: "Spanish",
    code: "es",
  },
] as const;

const SwitchLanguage = () => {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          className="flex items-center gap-2"
          variant={"secondary"}
        >
          {
            languagesList.find((language) => language.code === currentLocale)
              ?.name
          }
          {isOpen ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languagesList.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLocale(language.code)}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavBar;
