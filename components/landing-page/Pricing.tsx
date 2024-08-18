"use client";
import React from "react";
import SectionWrapper from "../shared/SectionWrapper";
import {
  FileText,
  Play,
  Tv,
  Laptop,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { usePlanStore, plans } from "@/stores/usePlanStore";
import { redirect, useRouter } from "next/navigation";

const subscriptionPlans = [
  {
    name: "Monthly Plan",
    description:
      "Experience our IPTV service on a month-to-month basis. Perfect for those who want to try out our service without a long-term commitment.",
    price: 11.99,
    interval: "month",
    features: [
      { icon: FileText, text: "+15.000 Channel" },
      { icon: Play, text: "Whatsapp & Email Support 24/7" },
      { icon: Tv, text: "HD/4K/8K IPTV streaming" },
      { icon: Laptop, text: "1 CONNECTION" },
    ],
    savings: null,
  },
  {
    name: "Quarterly Plan",
    description:
      "Save with our quarterly subscription plan. Enjoy all the benefits of our IPTV service for three months at a time.",
    price: 24.99,
    interval: "3 months",
    features: [
      { icon: FileText, text: "+15.000 Channel" },
      { icon: Play, text: "Whatsapp & Email Support 24/7" },
      { icon: Tv, text: "HD/4K/8K IPTV streaming" },
      { icon: Laptop, text: "1 CONNECTION" },
      { icon: DollarSign, text: "Save 11.98 dollars" },
    ],
    savings: 5,
  },
  {
    name: "Semi-Annual Plan",
    description:
      "Commit to six months of incredible entertainment and save even more. Ideal for regular viewers looking for a better deal.",
    price: 39.99,
    interval: "6 months",
    features: [
      { icon: FileText, text: "+15.000 Channel" },
      { icon: Play, text: "Whatsapp & Email Support 24/7" },
      { icon: Tv, text: "HD/4K/8K IPTV streaming" },
      { icon: Laptop, text: "1 CONNECTION" },
      { icon: DollarSign, text: "Save 31.95 dollars" },
    ],
    savings: 20,
  },
  {
    name: "Annual Plan",
    description:
      "Commit to six months of incredible entertainment and save even more. Ideal for regular viewers looking for a better deal.",
    price: 59.99,
    interval: "year",
    features: [
      { icon: FileText, text: "+15.000 Channel" },
      { icon: Play, text: "Whatsapp & Email Support 24/7" },
      { icon: Tv, text: "HD/4K/8K IPTV streaming" },
      { icon: Laptop, text: "1 CONNECTION" },
      { icon: DollarSign, text: "Save 83.89 dollars" },
    ],
    savings: 60,
  },
];

interface SubscriptionFeature {
  icon: LucideIcon;
  text: string;
}

interface SubscriptionPlan {
  name: string;
  description: string;
  price: number;
  interval: string;
  features: SubscriptionFeature[];
  savings: number | null;
}

const Pricing = () => {
  return (
    <SectionWrapper className="items-start gap-8">
      <h1 className="text-start text-4xl font-black" id="pricing">
        Our Pricing Plans
      </h1>
      <p className="max-w-4xl">
        Select the perfect plan for your needs and enjoy top-quality IPTV
        service at great value. From flexible monthly options to cost-saving
        annual plans, we have something for everyone. Start streaming your
        favorite content today!
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {subscriptionPlans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </SectionWrapper>
  );
};

const PricingCard = ({
  name,
  description,
  price,
  interval,
  features,
  savings,
}: SubscriptionPlan) => {
  const router = useRouter();
  const { selectPlan } = usePlanStore();
  const handleClick = () => {
    const plan = plans.find((p) => p.price === price.toString())!;
    selectPlan(plan);
    router.push(
      `https://shirts-store-roan.vercel.app/checkout?plan=${plan.name}`,
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <feature.icon size={16} />
            {feature.text}
          </li>
        ))}
        <h1 className="text-4xl font-black">$ {price}</h1>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleClick}>
          Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Pricing;
