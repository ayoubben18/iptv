import React from "react";
import { plans } from "@/stores/usePlanStore";
import {
  FileText,
  Play,
  Tv,
  Laptop,
  DollarSign,
  LucideIcon,
} from "lucide-react";

type Props = {
  planName: string;
};

const subscriptionPlans = [
  {
    name: "monthly",
    features: [
      { icon: FileText, text: "+15.000 Channel" },
      { icon: Play, text: "Whatsapp & Email Support 24/7" },
      { icon: Tv, text: "HD/4K/8K IPTV streaming" },
      { icon: Laptop, text: "1 CONNECTION" },
    ],
  },
  {
    name: "quarterly",
    features: [
      { icon: FileText, text: "+15.000 Channel" },
      { icon: Play, text: "Whatsapp & Email Support 24/7" },
      { icon: Tv, text: "HD/4K/8K IPTV streaming" },
      { icon: Laptop, text: "1 CONNECTION" },
      { icon: DollarSign, text: "Save 11.98 dollars" },
    ],
  },
  {
    name: "semi-annual",

    features: [
      { icon: FileText, text: "+15.000 Channel" },
      { icon: Play, text: "Whatsapp & Email Support 24/7" },
      { icon: Tv, text: "HD/4K/8K IPTV streaming" },
      { icon: Laptop, text: "1 CONNECTION" },
      { icon: DollarSign, text: "Save 31.95 dollars" },
    ],
  },
  {
    name: "annual",
    features: [
      { icon: FileText, text: "+15.000 Channel" },
      { icon: Play, text: "Whatsapp & Email Support 24/7" },
      { icon: Tv, text: "HD/4K/8K IPTV streaming" },
      { icon: Laptop, text: "1 CONNECTION" },
      { icon: DollarSign, text: "Save 83.89 dollars" },
    ],
  },
];

// extract the features and put them in a key values pair according to the plan name
const planFeatures = subscriptionPlans.reduce(
  (acc, plan) => {
    acc[plan.name] = plan.features;
    return acc;
  },
  {} as Record<string, { icon: LucideIcon; text: string }[]>,
);

const Benefites = ({ planName }: Props) => {
  const plan = plans.find((p) => p.name === planName);
  if (!plan) {
    return null;
  }
  console.log(planFeatures[plan.name]);

  return (
    <div className="flex flex-col items-start gap-2">
      {planFeatures[plan.name].map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <feature.icon
            size={16}
            color="gray
          "
          />
          {feature.text}
        </li>
      ))}
    </div>
  );
};

export default Benefites;
