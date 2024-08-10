"use server";

import { authenticatedAction } from "@/authenticatedActions";
import { z } from "zod";
import { insertSubscription } from "../data/subscriptions-data";
import { planPrices, SubscriptionPlan } from "@/types/tableTypes";

const subscriptionSchema = z.object({
  plan: z.nativeEnum(SubscriptionPlan),
  price: z.number().positive().multipleOf(0.01),
  email: z.string().email(),
  full_name: z.string(),
  country_code: z.string(),
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
  .action(
    async ({
      ctx: { userId },
      parsedInput: { plan, price, email, country_code, full_name },
    }) => {
      const sub = await insertSubscription({
        plan,
        user_id: userId,
        price,
        email,
        country_code,
        full_name,
      });

      return sub;
    },
  );

export { insertSubscriptionService };
