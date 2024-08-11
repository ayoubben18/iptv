"use server";

import { authenticatedAction } from "@/authenticatedActions";
import { z } from "zod";
import {
  getSubscriptions,
  insertSubscription,
} from "../data/subscriptions-data";
import { planPrices, SubscriptionPlan } from "@/types/tableTypes";

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

export { insertSubscriptionService, getSubscriptionsService };
