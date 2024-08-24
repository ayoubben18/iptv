"use server";

import { authenticatedAction } from "@/authenticatedActions";
import { planPrices, StatusEnum, SubscriptionPlan } from "@/types/tableTypes";
import { z } from "zod";
import { insertDevices } from "../data/devices-data";
import {
  getSubscriptions,
  insertSubscription,
} from "../data/subscriptions-data";
import logger from "@/lib/logger";

const subscriptionSchema = z.object({
  plan: z.nativeEnum(SubscriptionPlan),
  price: z.number().positive().multipleOf(0.01),
  email: z.string().email(),
  full_name: z.string(),
  country_code: z.string(),
  order_id: z.string(),
});

const refinedSubscriptionSchema = subscriptionSchema.refine(
  (data) => data.price === planPrices[data.plan],
  {
    message: "Price does not match the selected plan",
    path: ["price"],
  },
);

const insertSubscriptionService = authenticatedAction
  .schema(refinedSubscriptionSchema)
  .action(async ({ ctx: { userId }, parsedInput }) => {
    const sub = await insertSubscription({
      ...parsedInput,
      user_id: userId,
    });

    return sub;
  });

const getSubscriptionsService = authenticatedAction.action(
  async ({ ctx: { userId, email } }) => {
    const subs = await getSubscriptions(userId);
    return { subs, email };
  },
);

const checkoutService = authenticatedAction
  .schema(
    z.object({
      plan: z.nativeEnum(SubscriptionPlan),
      price: z.number().positive().multipleOf(0.01),
      connections: z.enum(["1", "2", "3", "4", "5"]),
      adult_content: z.boolean(),
      quick_delivery: z.boolean(),
      vod: z.boolean(),
      devices: z.array(
        z.object({
          mac_address: z.string(),
          device_type: z.string(),
        }),
      ),
    }),
  )
  .action(async ({ ctx: { userId }, parsedInput }) => {
    const sub = await insertSubscription({
      plan: parsedInput.plan,
      price: parsedInput.price,
      connections: parsedInput.connections,
      adult_content: parsedInput.adult_content,
      quick_delivery: parsedInput.quick_delivery,
      vod: parsedInput.vod,
      user_id: userId,
      status: StatusEnum.Draft,
    });
    const devices = parsedInput.devices.map((device) => ({
      ...device,
      subscription_id: sub.id,
    }));
    const devicesInserted = await insertDevices(devices);
    logger.info("Draft Subscription created", { sub, devicesInserted });
    return { id: sub.id };
  });

export { checkoutService, getSubscriptionsService, insertSubscriptionService };
