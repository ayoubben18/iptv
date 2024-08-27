import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {
  BadgeDollarSign,
  CircleHelp,
  MailCheck,
  MonitorSmartphone,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    Icon: RefreshCcw,
    name: "Anti Freeze System",
    description:
      "Using Anti-Freeze Technology, You do not need to worry about the server stability.",
    href: "/",
    cta: "Learn more",
    background: (
      <Image
        priority
        fill
        objectFit="cover"
        alt="Feature 1"
        src="/show.jpeg"
        className="absolute h-full w-full object-cover opacity-20 transition-all duration-300 ease-out group-hover:scale-105"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: MailCheck,
    name: "24/7 Customer Support",
    description:
      "We do offer multiple support options live by whatsapp, By live chat button and through email.",
    href: "/support",
    cta: "Learn more",

    background: (
      <Image
        priority
        fill
        objectFit="cover"
        alt="Feature 1"
        src="/support.jpg"
        className="absolute h-full w-full object-cover opacity-20 transition-all duration-300 ease-out group-hover:scale-105"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: MonitorSmartphone,
    name: "Watch on Any Device",
    description:
      "Our IPTV streaming service works on all devices such as Smart TVs, Android, Amazon Fire Stick, KODI, MAG and anything else that supports M3U, Xtream Codes Api and portals.",
    href: "/channels",
    cta: "Learn more",
    background: (
      <Image
        priority
        fill
        objectFit="cover"
        alt="Feature 1"
        src="/watch.jpg"
        className="absolute h-full w-full object-cover opacity-20 transition-all duration-300 ease-out group-hover:scale-105"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: BadgeDollarSign,
    name: "No Automatic Payments",
    description:
      "you have complete control over your purchasing decisions. Say goodbye to long-term commitments and the hassle of recurring payments.",
    href: "/",
    cta: "Learn more",
    background: (
      <Image
        priority
        fill
        objectFit="cover"
        alt="Feature 1"
        src="/paypal.jpg"
        className="absolute h-full w-full object-cover opacity-20 transition-all duration-300 ease-out group-hover:scale-105"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: CircleHelp,
    name: "Electronic Program Guide ( EPG )",
    description:
      "Enjoy having all info about the next programs will be airing within the next hours on most channels. - not provided by most IPTV providers.",
    href: "/blogs",
    cta: "Learn more",
    background: (
      <Image
        priority
        fill
        objectFit="cover"
        alt="Feature 1"
        src="https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/1-akI7VA3GVDi6A0gQu3J8BOQVFqYaWw.webp"
        className="absolute h-full w-full object-cover opacity-20 transition-all duration-300 ease-out group-hover:scale-105"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export async function Features() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-5xl font-bold sm:text-6xl">Features</h1>
        <p className="max-w-4xl text-center text-lg">
          Discover the features that make our IPTV service the best choice for
          your entertainment needs. Our cutting-edge platform offers a seamless
          streaming experience, unparalleled content variety, and user-friendly
          interfaces.
        </p>
      </div>
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
