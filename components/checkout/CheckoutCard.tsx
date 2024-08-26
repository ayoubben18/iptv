"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientEnv } from "@/lib/env-client";
import { Textarea } from "../ui/textarea";

const checkoutSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  additional_info: z.string(),
  devices: z.array(
    z.object({
      device_type: z.string(),
      mac_address: z.string(),
    }),
  ),
});

export default function CheckoutCard() {
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

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof checkoutSchema>>({
    defaultValues: {
      devices: arrayItems.map(() => ({ device_type: "", mac_address: "" })),
      name: "",
      email: "",
      phone: "",
      additional_info: "",
    },
    resolver: zodResolver(checkoutSchema),
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

  const handleAddonChange = (addon: keyof typeof addons) => {
    setAddons((prev) => ({ ...prev, [addon]: !prev[addon] }));
  };
  const { mutateAsync: checkout, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof checkoutSchema>) =>
      checkoutService({
        connections: connections,
        plan: plan,
        adult_content: addons.adultContent,
        vod: addons.vod,
        quick_delivery: addons.quickDelivery,
        price: totalPrice,
        devices: data.devices,
        user_name: data.name,
        user_email: data.email,
        user_phone: data.phone,
        additional_info: data.additional_info,
      }),
    onSuccess: (data) => {
      push(`${ClientEnv.NEXT_PUBLIC_REDIRECTION_SITE}/checkout?id=${data}`);
    },
  });

  console.log(watch("additional_info"));

  const handleCheckout = async (data: z.infer<typeof checkoutSchema>) => {
    toast.promise(checkout(data), {
      loading: "Checking out...",
      success: "Checkout successful!",
      error: "Checkout failed!",
    });
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      Number(
        (
          parseFloat(selectedPlan?.price || "0") +
          (addons.quickDelivery ? 1.99 : 0)
        ).toFixed(2),
      ),
    );
  }, [selectedPlan, addons]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6 p-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="connections">Connections</Label>
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="plan">Plan</Label>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Configure</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <span>Setup Fees</span>
                <Skeleton className="h-4 w-16" />
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total Due Today</span>
                <Skeleton className="h-6 w-20" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled>
                Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 p-6 lg:flex-row">
      <div className="flex-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    id="name"
                    placeholder="Your full name"
                    className="max-w-lg"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="max-w-lg"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    placeholder="Your phone number"
                    className="max-w-lg"
                    {...field}
                  />
                )}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <TabsContent
                  key={field.id}
                  value={(index + 1).toString()}
                  className="flex flex-col gap-4"
                >
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
                    {errors.devices?.[index]?.mac_address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.devices?.[index]?.mac_address.message}
                      </p>
                    )}
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
              <Label htmlFor="additional_info">Additional Info</Label>
              <Controller
                name="additional_info"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="additional_info"
                    {...field}
                    placeholder="Any additional info"
                  />
                )}
              />
              {errors.additional_info && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.additional_info.message}
                </p>
              )}
            </div>
            <div>
              <Label>Addons</Label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <span>{totalPrice}$</span>
          </div>
          <Button
            className="w-full"
            onClick={handleSubmit(handleCheckout)}
            disabled={isPending}
          >
            <CreditCard className="mr-2 h-4 w-4" /> CHECKOUT
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
