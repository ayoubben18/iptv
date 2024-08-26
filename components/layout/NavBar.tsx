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
import { SmoothScrollLink } from "../landing-page/Hero";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const links = [
  {
    name: "Pricing",
    link: "/#pricing",
  },
  {
    name: "Free Trial",
    link: "/free-trial",
  },
  {
    name: "Setup Guide",
    link: "/blogs",
  },
  {
    name: "Channels List",
    link: "/channels",
  },
  {
    name: "Support",
    link: "/support",
  },
];

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4">
      <div className="flex h-20 items-center justify-between">
        <Link href={`/`} className="text-3xl font-black">
          RONOTV
        </Link>
        <div className="hidden items-center md:flex">
          {links.map((link, index) => (
            <Button
              key={index}
              variant={"link"}
              className="text-xl text-black dark:text-white"
            >
              {link.link === "#pricing" ? (
                <SmoothScrollLink href={link.link}>
                  {link.name}
                </SmoothScrollLink>
              ) : (
                <Link href={link.link}>{link.name}</Link>
              )}
            </Button>
          ))}
          <Button onClick={() => router.push("/#pricing")}>ORDER NOW</Button>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-white dark:bg-gray-800">
            <div className="mx-auto w-full max-w-sm">
              <div className="flex flex-col items-center space-y-4 py-6">
                {links.map((link, index) => (
                  <Button
                    key={index}
                    variant={"ghost"}
                    className="w-full text-xl"
                  >
                    {link.link === "#pricing" ? (
                      <SmoothScrollLink href={link.link}>
                        {link.name}
                      </SmoothScrollLink>
                    ) : (
                      <Link href={link.link} className="w-full">
                        {link.name}
                      </Link>
                    )}
                  </Button>
                ))}
                <Button onClick={() => router.push("/#pricing")}>
                  ORDER NOW
                </Button>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default NavBar;
