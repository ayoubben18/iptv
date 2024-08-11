import React from "react";
import SectionWrapper from "../shared/SectionWrapper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

const iptvFeatures = [
  {
    title: "Superior Quality Experience",
    description:
      "Enjoy your favorite shows and movies in stunning HD/4K/8K IPTV quality. Our IPTV service ensures a smooth, buffer-free viewing experience.",
    buttonContent: "Free Trial",
  },
  {
    title: "Extensive Content Library",
    description:
      "Access a vast library of live TV channels, on-demand movies, and exclusive series. From the latest blockbusters to timeless classics, there's always something to watch.",
    buttonContent: "Our Library",
  },
  {
    title: "Flexible & Affordable Plans",
    description:
      "Choose from a variety of subscription plans to suit your needs and budget. Whether you're a casual viewer or a binge-watcher, we have the perfect plan for you.",
    buttonContent: "Our Pricing",
  },
];

const Offer = () => {
  return (
    <SectionWrapper className="items-start gap-8">
      <h1 className="text-start text-4xl font-black">What We Offer ?</h1>
      <p className="max-w-4xl">
        Discover the first-of-its-kind IPTV service in Morocco, bringing you
        unparalleled streaming quality, an extensive content library, and
        flexible plans designed to cater to your viewing preferences. Experience
        television like never before!
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {iptvFeatures.map((feature, index) => (
          <OfferCard
            key={index}
            title={feature.title}
            description={feature.description}
            buttonContent={feature.buttonContent}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

const OfferCard = ({
  title,
  description,
  buttonContent,
}: {
  title: string;
  description: string;
  buttonContent: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="bottom-0">
        <Button>{buttonContent}</Button>
      </CardFooter>
    </Card>
  );
};

export default Offer;
