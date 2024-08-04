import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const links = [
  {
    name: "Setup",
    link: "/setup",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Order",
    link: "/order",
  },
  {
    name: "Support",
    link: "/support",
  },
];

const NavBar = () => {
  return (
    <div className="container mx-auto flex h-20 items-center justify-between">
      <h1 className="text-3xl font-black">IPTV</h1>
      <div className="hidden sm:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              className="flex items-center gap-2 text-xl text-black"
            >
              Library
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {links.map((link, index) => (
          <Button key={index} variant={"link"} className="text-xl text-black">
            <Link href={link.link}>{link.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
