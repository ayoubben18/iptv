import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import { paypalClient } from "@/utils/paypal";

export const revalidate = 0;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { price, plan } = body;
  try {
    logger.info("Create order request", { price, plan });
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

    logger.info("Create order response", { response });

    return NextResponse.json({ orderID: response.result.id }, { status: 201 });
  } catch (error: any) {
    logger.error("Error creating order:", { error });
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
