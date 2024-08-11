"use client";
import React from "react";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SmoothScrollLink } from "../landing-page/Hero";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

const links = [
  {
    name: "Pricing",
    link: "#pricing",
  },
  {
    name: "Order",
    link: "/checkout",
  },
  {
    name: "Support",
    link: "/support",
  },
];

const NavBar = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex h-20 items-center justify-between">
        <Link href={`/`} className="text-3xl font-black">
          IPTV
        </Link>
        <div className="hidden items-center md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                className="flex items-center gap-2 text-xl text-black dark:text-white"
              >
                Library
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Link href={`/profile`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/settings`}>Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-center gap-2 text-xl"
                    >
                      Library
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>
                      <Link href={`/profile`} className="w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/settings`} className="w-full">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
