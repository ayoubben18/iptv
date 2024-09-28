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
import { useI18n } from "@/locales/client";

const Footer = () => {
  const t = useI18n();

  const footerMenuItems = [
    {
      title: t("company"),
      items: [
        { name: t("aboutUs"), link: "#about" },
        { name: t("library"), link: "/channels" },
        { name: t("pricing"), link: "#pricing" },
      ],
    },
    {
      title: t("legal"),
      items: [
        {
          name: t("privacyPolicy"),
          content: {
            title: t("privacyPolicy"),
            description: [
              {
                title: t("propertyClaim"),
                text: t("propertyClaimText"),
              },
              {
                title: t("safetyConcern"),
                text: t("safetyConcernText"),
              },
              {
                title: t("policyChange"),
                text: t("policyChangeText"),
              },
            ],
          },
        },
        {
          name: t("termsOfService"),
          content: {
            title: t("termsOfService"),
            description: [
              {
                title: t("informationWeCollect"),
                text: t("informationWeCollectText"),
              },
              {
                title: t("howWeUseInformation"),
                text: t("howWeUseInformationText"),
              },
            ],
          },
        },
        {
          name: t("cookiesPolicy"),
          content: {
            title: t("cookiesPolicy"),
            description: [
              {
                title: t("whatAreCookies"),
                text: t("whatAreCookiesText"),
              },
              {
                title: t("whatAreWeStoring"),
                text: t("whatAreWeStoringText"),
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <div className="flex w-full flex-col gap-8 py-10">
      <Separator />
      <div className="container mx-auto">
        <div className="mt-7 flex items-center justify-between">
          <h1 className="text-2xl font-black">RONOTV</h1>
          <div className="flex gap-6">
            <Link href="tel:+212777737974" aria-label={t("callUs")}>
              <Phone className="h-6 w-6" />
            </Link>
            <Link href="mailto:order@ronotv.com" aria-label={t("emailUs")}>
              <Mail className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <Menu footerMenuItems={footerMenuItems} />
      </div>
    </div>
  );
};

const Menu = ({
  footerMenuItems,
}: {
  footerMenuItems: Array<{
    title: string;
    items: Array<{
      name: string;
      link?: string;
      content?: {
        title: string;
        description: Array<{
          title: string;
          text: string;
        }>;
      };
    }>;
  }>;
}) => {
  const t = useI18n();

  return (
    <div className="mt-4 grid grid-cols-2">
      {footerMenuItems.map((menu, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">{menu.title}</h1>
          <ul className="flex flex-col gap-2">
            {menu.items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-sm font-light">
                {menu.title === t("company") ? (
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
                          <Button variant="outline">{t("close")}</Button>
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
