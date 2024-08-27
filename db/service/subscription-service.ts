"use server";

import logger from "@/lib/logger";
import { StatusEnum, SubscriptionPlan } from "@/types/tableTypes";
import { z } from "zod";
import { insertDevices } from "../data/devices-data";
import { insertSubscription } from "../data/subscriptions-data";

const checkoutSchema = z.object({
  plan: z.nativeEnum(SubscriptionPlan),
  price: z.number().positive().multipleOf(0.01),
  user_name: z.string(),
  user_email: z.string().email(),
  user_phone: z.string(),
  connections: z.enum(["1", "2", "3", "4", "5"]),
  adult_content: z.boolean(),
  quick_delivery: z.boolean(),
  vod: z.boolean(),
  additional_info: z.string().nullable(),
  devices: z.array(
    z.object({
      mac_address: z.string().length(17),
      device_type: z.string(),
    }),
  ),
});

const checkoutService = async (data: z.infer<typeof checkoutSchema>) => {
  const sub = await insertSubscription({
    plan: data.plan,
    price: data.price,
    connections: data.connections,
    adult_content: data.adult_content,
    quick_delivery: data.quick_delivery,
    vod: data.vod,
    user_email: data.user_email,
    user_name: data.user_name,
    user_phone: data.user_phone,
    additional_info: data.additional_info,
    status: StatusEnum.Draft,
  });
  const devices = data.devices.map((device) => ({
    ...device,
    subscription_id: sub.id,
  }));
  const devicesInserted = await insertDevices(devices);
  console.log(data);

  logger.info("Draft Subscription created");
  return sub.id;
};

export { checkoutService };
