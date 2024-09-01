"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "../ui/drawer";
import { Button } from "../ui/button";

const footerMenuItems = [
  {
    title: "Company",
    items: [
      { name: "About Us", link: "#about" },
      { name: "Library", link: "/channels" },
      { name: "Pricing", link: "#pricing" },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        name: "Privacy Policy",
        content: {
          title: "Privacy Policy",
          description: [
            {
              title: "Property Claim",
              text: "The trademarks and logos of all the merchants displayed on the website are the property of their respective owners. RONOTV is not affiliated or associated with any of them.",
            },
            {
              title: "Safety Concern",
              text: "Please be assured that RONOTV only provides original apps and apk files without any cheat, modifications or virus. Your personal information will NOT be shared with any other third party without your explicit permission.",
            },
            {
              title: "Policy Change",
              text: "We may amend this Privacy Policy from time to time. Use of information we collect now is subject to the Privacy Policy in effect at the time such information is used. A user is bound by any changes to the Privacy Policy when he or she uses the Services after such changes have been first posted.",
            },
          ],
        },
      },
      {
        name: "Terms of Service",
        content: {
          title: "Terms of Service",
          description: [
            {
              title: "The Information We Collect",
              text: "We collect only information that is necessary to provide our services. And we do not collect any personal information.",
            },
            {
              title: "How We Use the Information",
              text: "We store the information to ensure the best user experience. And we do not use the information for any other purpose.",
            },
          ],
        },
      },
      {
        name: "Cookies Policy",
        content: {
          title: "Cookies Policy",
          description: [
            {
              title: "What are Cookies?",
              text: "Cookies are small text files stored on your device.",
            },
            {
              title: "What are we storing?",
              text: "In our case we are using the latest frameworks and technologies to ensure the best user experience. so we are not storing any.",
            },
          ],
        },
      },
    ],
  },
];

const Footer = () => {
  return (
    <div className="flex w-full flex-col gap-8 py-10">
      <Separator />
      <div className="container mx-auto">
        <div className="mt-7 flex items-center justify-between">
          <h1 className="text-2xl font-black">RONOTV</h1>
          <div className="flex gap-6">
            <Link href="tel:+212777737974" aria-label="Call us">
              <Phone className="h-6 w-6" />
            </Link>
            <Link href="mailto:order@ronotv.com" aria-label="Email us">
              <Mail className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

const Menu = () => {
  return (
    <div className="mt-4 grid grid-cols-2">
      {footerMenuItems.map((menu, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">{menu.title}</h1>
          <ul className="flex flex-col gap-2">
            {menu.items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-sm font-light">
                {menu.title === "Company" ? (
                  <Link href={(item as { link: string }).link}>
                    {item.name}
                  </Link>
                ) : (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 text-sm font-light text-white"
                      >
                        {item.name}
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="px-4">
                      <DrawerHeader>
                        <DrawerTitle className="text-3xl">
                          {
                            (item as { content: { title: string } }).content
                              .title
                          }
                        </DrawerTitle>
                      </DrawerHeader>
                      <DrawerDescription>
                        {(
                          item as {
                            content: {
                              description: Array<{
                                title: string;
                                text: string;
                              }>;
                            };
                          }
                        ).content.description.map((paragraph, index) => (
                          <div key={index} className="mb-4">
                            <h3 className="mb-2 text-lg font-semibold">
                              ● {paragraph.title}
                            </h3>
                            <p>{paragraph.text}</p>
                          </div>
                        ))}
                      </DrawerDescription>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Footer;
