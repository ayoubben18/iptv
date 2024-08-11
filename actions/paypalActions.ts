"use server";
import { authenticatedAction } from "@/authenticatedActions";
import logger from "@/lib/logger";
import { z } from "zod";
import paypal from "@paypal/checkout-server-sdk";
import { paypalClient } from "@/utils/paypal";

const createServerOrder = authenticatedAction
  .schema(
    z.object({
      plan: z.string(),
      price: z.string(),
    }),
  )
  .action(async ({ parsedInput: { plan, price } }) => {
    logger.info({ price, plan }, "Create order request");
    const paypalReq = new paypal.orders.OrdersCreateRequest();
    paypalReq.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price,
          },
        },
      ],
    });

    const response = await paypalClient.execute(paypalReq);
    const orderID = response.result.id as string;

    logger.info({ response }, "Create order response");
    return { orderID };
  });

const captureServerOrder = authenticatedAction
  .schema(
    z.object({
      orderID: z.string(),
    }),
  )
  .action(async ({ parsedInput: { orderID }, ctx: { userId } }) => {
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    // @ts-ignore
    request.requestBody({});
    const response = await paypalClient.execute(request);
    logger.info({ response }, "Capture order response");
    return { orderID: response.result.id };
  });

export { createServerOrder, captureServerOrder };
