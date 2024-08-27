"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOffers } from "@/db/data/redis-data";
import { usePlanStore } from "@/stores/usePlanStore";
import { Plan } from "@/types/plan.types";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import SectionWrapper from "../shared/SectionWrapper";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { basicFeatures } from "@/lib/constants";

const Pricing = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["offers"],
    queryFn: () => getOffers(),
  });
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

      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Tabs defaultValue={data && data[0].name} className="w-full">
          <TabsList className={`grid w-full grid-cols-${data?.length}`}>
            {data &&
              data.map((offer, index) => (
                <TabsTrigger value={offer.name} key={index}>
                  {offer.name}
                </TabsTrigger>
              ))}
          </TabsList>
          {data &&
            data.map((offer, index) => (
              <TabsContent
                key={index}
                value={offer.name}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
              >
                {offer.plans.map((plan, planIndex) => (
                  <PricingCard
                    key={planIndex}
                    {...plan}
                    connection={offer.id}
                    offerName={offer.name}
                  />
                ))}
              </TabsContent>
            ))}
        </Tabs>
      )}
    </SectionWrapper>
  );
};

const PricingCard = ({
  features,
  id,
  placeholder,
  price,
  name,
  connection,
  offerName,
}: Plan & { connection: string; offerName: string }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/checkout?plan=${name}&connections=${connection}`);
  };
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{placeholder}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-start gap-2">
        <ul className="flex flex-col gap-2">
          {[
            ...(offerName ? [{ icon: Link, text: offerName }] : []),
            ...basicFeatures,
            ...(features.length > 0
              ? [{ icon: DollarSign, text: features[0] }]
              : []),
          ].map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              {feature.icon && <feature.icon size={16} />}
              {feature.text}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col items-center">
        <h1 className="mb-4 text-4xl font-black">$ {price}</h1>
        <Button className="w-full" onClick={handleClick}>
          Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Pricing;
