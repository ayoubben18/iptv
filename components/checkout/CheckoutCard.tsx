"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOffers } from "@/db/data/redis-data";
import { checkoutService } from "@/db/service/subscription-service";
import { basicFeatures } from "@/lib/constants";
import { ConnectionsEnum, SubscriptionPlan } from "@/types/tableTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreditCard, DollarSign, Link } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { ClientEnv } from "@/lib/env-client";

export default function Component() {
  const { data: offers, isLoading } = useQuery({
    queryKey: ["offers"],
    queryFn: () => getOffers(),
  });
  const [activeTab, setActiveTab] = useState("1");

  const [connections, setConnections] = useQueryState<ConnectionsEnum>(
    "connections",
    {
      defaultValue: ConnectionsEnum.One,
      parse: (value) => value as ConnectionsEnum,
    },
  );
  const { push } = useRouter();
  const [plan, setPlan] = useQueryState<SubscriptionPlan>("plan", {
    defaultValue: SubscriptionPlan.Monthly,
    parse: (value) => value as SubscriptionPlan,
  });

  const [addons, setAddons] = useState({
    adultContent: false,
    vod: false,
    quickDelivery: false,
  });
  const [offer, features, selectedPlan, arrayItems] = useMemo(() => {
    const offer = offers?.find((offer) => offer.id === connections);
    const features = offer?.plans.find((p) => p.name === plan)?.features || [];
    const selectedPlan = offer?.plans.find((p) => p.name === plan);
    const arrayItems = Array.from(
      { length: parseInt(connections) },
      (_, index) => (index + 1).toString(),
    );

    return [offer, features, selectedPlan, arrayItems];
  }, [plan, connections, offers]);

  const { control, watch } = useForm({
    defaultValues: {
      devices: arrayItems.map(() => ({ device_type: "", mac_address: "" })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "devices",
  });

  useEffect(() => {
    if (arrayItems.length > fields.length) {
      const missingFields = arrayItems.length - fields.length;
      for (let i = 0; i < missingFields; i++) {
        append({ device_type: "", mac_address: "" });
      }
    } else {
      const missingFields = fields.length - arrayItems.length;
      for (let i = 0; i < missingFields; i++) {
        remove(fields.length - 1);
      }
      setActiveTab(arrayItems[0]);
    }
  }, [arrayItems, fields, append, remove]);

  const devices = watch("devices");

  const handleAddonChange = (addon: keyof typeof addons) => {
    setAddons((prev) => ({ ...prev, [addon]: !prev[addon] }));
  };
  const { mutateAsync: checkout, isPending } = useMutation({
    mutationFn: async (data) =>
      checkoutService({
        connections: connections,
        plan: plan,
        adult_content: addons.adultContent,
        vod: addons.vod,
        quick_delivery: addons.quickDelivery,
        price: parseFloat(selectedPlan?.price || "0"),
        devices: devices,
      }),
    onSuccess: (data) => {
      const id = data?.data?.id;
      push(`${ClientEnv.NEXT_PUBLIC_REDIRECTION_SITE}/checkout?id=${id}`);
    },
  });

  const handleCheckout = async () => {
    toast.promise(checkout, {
      loading: "Checking out...",
      success: "Checkout successful!",
      error: "Checkout failed!",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="lg:w-1/3">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 lg:flex-row">
      <div className="flex-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="connections">Connections</Label>
                <Select
                  value={connections}
                  onValueChange={(value) =>
                    setConnections(value as ConnectionsEnum)
                  }
                >
                  <SelectTrigger id="connections">
                    <SelectValue placeholder="Select connections" />
                  </SelectTrigger>
                  <SelectContent>
                    {offers?.map((offer) => (
                      <SelectItem value={offer.id} key={offer.id}>
                        {offer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="plan">Plan</Label>
                <Select
                  value={plan}
                  onValueChange={(value) => setPlan(value as SubscriptionPlan)}
                >
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {offer?.plans.map((plan) => (
                      <SelectItem value={plan.name} key={plan.name}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                ...(offer ? [{ icon: Link, text: offer.name }] : []),
                ...basicFeatures,
                ...(features.length > 0
                  ? [
                      {
                        icon: DollarSign,
                        text: features[0],
                      },
                    ]
                  : []),
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  {feature.icon && <feature.icon size={16} />}
                  {feature.text}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CONFIGURE</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs
              defaultValue={arrayItems[0]}
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList
                className={`grid w-full grid-cols-${arrayItems.length}`}
              >
                {arrayItems.map((connection, index) => (
                  <TabsTrigger key={index} value={connection}>
                    device {connection}
                  </TabsTrigger>
                ))}
              </TabsList>
              {fields.map((field, index) => (
                <TabsContent key={field.id} value={(index + 1).toString()}>
                  <div>
                    <Label htmlFor={`mac-address-${index}`}>Mac Address</Label>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Put Your Mac Address Only If You Use Mag Device (Please
                      Note That It Should Be Starts With 00:1A)
                    </p>
                    <Controller
                      name={`devices.${index}.mac_address`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          id={`mac-address-${index}`}
                          placeholder="00:1A:79:XX:XX:XX"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`device-type-${index}`}>
                      Any Additional Info ?
                    </Label>
                    <Controller
                      name={`devices.${index}.device_type`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id={`device-type-${index}`}>
                            <SelectValue placeholder="Select device type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mag">MAG Device</SelectItem>
                            <SelectItem value="android">
                              Android Device
                            </SelectItem>
                            <SelectItem value="ios">iOS Device</SelectItem>
                            <SelectItem value="smart_tv">Smart TV</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div>
              <Label>Addons</Label>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(addons).map(([key, value]) => (
                  <div
                    key={key}
                    className={`rounded-lg border p-4 ${value ? "bg-primary/20" : ""}`}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={() =>
                          handleAddonChange(key as keyof typeof addons)
                        }
                      />
                      <label
                        htmlFor={key}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {key === "adultContent" && "Adult Content"}
                        {key === "vod" && "VOD ( Series & Movies )"}
                        {key === "quickDelivery" && "Quick Delivery"}
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {key === "quickDelivery" ? "1.99$" : "FREE"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="lg:w-1/3">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{selectedPlan?.price}$</span>
          </div>
          <div className="flex justify-between">
            <span>Setup Fees</span>
            <span>{addons.quickDelivery ? "1.99$" : "0$"}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total Due Today</span>
            <span>
              {(
                parseFloat(selectedPlan?.price || "0") +
                (addons.quickDelivery ? 1.99 : 0)
              ).toFixed(2)}
              $
            </span>
          </div>
          <Button
            className="w-full"
            onClick={handleCheckout}
            disabled={isPending}
          >
            <CreditCard className="mr-2 h-4 w-4" /> CHECKOUT
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
