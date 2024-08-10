import logger from "@/lib/logger";
import { getPayPalAccessToken } from "@/utils/paypal/lib";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    logger.info({ body }, "Create PayPal order request");

    let parsedBody;
    try {
      parsedBody = body;
    } catch (parseError) {
      logger.error({ parseError }, "Error parsing JSON:");
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    const { items, amount } = parsedBody;

    if (!items || !amount) {
      logger.error({ items, amount }, "Missing required fields:");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const accessToken = await getPayPalAccessToken();
    const paypalApiUrl = process.env.PAYPAL_API_URL;

    // Calculate item_total
    const itemTotal = items
      .reduce((total: number, item: any) => {
        return (
          total + parseFloat(item.unit_amount.value) * parseInt(item.quantity)
        );
      }, 0)
      .toFixed(2);

    const paypalRequestBody = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: itemTotal,
              },
            },
          },
          items: items.map((item: any) => ({
            name: item.name,
            unit_amount: {
              currency_code: "USD",
              value: item.unit_amount.value,
            },
            quantity: item.quantity,
          })),
        },
      ],
    };

    logger.info({ itemTotal }, "itemTotal");

    const response = await fetch(`${paypalApiUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(paypalRequestBody),
    });

    const orderData = await response.json();
    if (!response.ok) {
      logger.error({ orderData }, "Error creating PayPal order");
      return NextResponse.json(
        { error: orderData },
        { status: response.status },
      );
    }

    logger.info({ orderData }, "PayPal order created");
    return NextResponse.json(orderData);
  } catch (error: any) {
    logger.error({ message: error.message }, "Error creating PayPal order");
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
