import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { getI18n } from "@/locales/server";
import {
  BadgeDollarSign,
  CircleHelp,
  MailCheck,
  MonitorSmartphone,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";

export async function Features() {
  const t = await getI18n();
  const features = [
    {
      Icon: RefreshCcw,
      name: t("featuresAntiFreezeSystem"),
      description: t("featuresAntiFreezeSystemDescription"),
      href: "/",
      cta: "Learn more",
      background: (
        <Image
          priority
          width={150}
          height={150}
          alt="Feature 1"
          src="/show.jpeg"
          className="absolute h-full w-full object-cover opacity-20 transition-all duration-300 ease-out group-hover:scale-105"
        />
      ),
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: MailCheck,
      name: t("features247CustomerSupport"),
      description: t("features247CustomerSupportDescription"),
      href: "/support",
      cta: "Learn more",
      background: (
        <Image
          priority
          width={120}
          height={120}
          alt="Feature 1"
          src="/support.jpg"
          className="absolute h-full w-full object-cover opacity-20 transition-all duration-300 ease-out group-hover:scale-105"
        />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: MonitorSmartphone,
      name: t("featuresWatchOnAnyDevice"),
      description: t("featuresWatchOnAnyDeviceDescription"),
      href: "/channels",
      cta: "Learn more",
      background: (
        <Image
          priority
          width={150}
          height={150}
          alt="Feature 1"
          src="/watch.jpg"
          className="absolute h-full w-full object-cover opacity-20 transition-all duration-300 ease-out group-hover:scale-105"
        />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: BadgeDollarSign,
      name: t("featuresNoAutomaticPayments"),
      description: t("featuresNoAutomaticPaymentsDescription"),
      href: "/",
      cta: "Learn more",
      background: (
        <Image
          priority
          width={150}
          height={150}
          alt="Feature 1"
          src="/paypal.jpg"
          className="absolute h-full w-full object-cover opacity-20 transition-all duration-300 ease-out group-hover:scale-105"
        />
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: CircleHelp,
      name: t("featuresElectronicInvoice"),
      description: t("featuresElectronicInvoiceDescription"),
      href: "/blogs",
      cta: "Learn more",
      background: (
        <Image
          priority
          width={150}
          height={150}
          alt="Feature 1"
          src="https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/1-akI7VA3GVDi6A0gQu3J8BOQVFqYaWw.webp"
          className="absolute h-full w-full object-cover opacity-20 transition-all duration-300 ease-out group-hover:scale-105"
        />
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];
  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      id="features"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-5xl font-bold sm:text-6xl">{t("featuresTitle")}</h1>
        <p className="max-w-4xl text-center text-lg">
          {t("featuresDescription")}
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
