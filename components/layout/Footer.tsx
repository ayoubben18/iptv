import React from "react";
import { Separator } from "../ui/separator";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";

const footerMenuItems = [
  {
    title: "Company",
    items: ["About Us", "Library", "Pricing"],
  },
  {
    title: "Legal",
    items: ["Privacy Policy", "Terms of Service", "Cookies Policy"],
  },
];

const Footer = () => {
  return (
    <div className="flex w-full flex-col gap-8 py-10">
      <Separator className="bg-black" />
      <div className="container mx-auto">
        <div className="mt-7 flex items-center justify-between">
          <h1 className="text-2xl font-black">IPTV</h1>
          <div className="flex gap-6">
            <Phone className="h-6 w-6" />
            <Mail className="h-6 w-6" />
            <Facebook className="h-6 w-6" />
            <Instagram className="h-6 w-6" />
          </div>
        </div>{" "}
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
            {menu.items.map((item, index) => (
              <li key={index} className="text-sm font-light">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Footer;
