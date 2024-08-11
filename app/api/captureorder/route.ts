import { insertSubscriptionService } from "@/db/service/subscription-service";
import logger from "@/lib/logger";
import { planPrices, SubscriptionPlan } from "@/types/tableTypes";
import { paypalClient } from "@/utils/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { HttpResponse } from "paypal__paypalhttp";

export const revalidate = 0;

export async function POST(request: Request) {
  const body = await request.json();
  const { orderID } = body;
  try {
    logger.info({ orderID }, "Capture order request");
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    // @ts-ignore
    request.requestBody({});
    const response = (await paypalClient.execute(
      request,
    )) as HttpResponse<Root>;

    if (response.statusCode !== 201 || !response.result) {
      throw new Error("Failed to capture order");
    }

    const mockedObject = {
      order_id: response.result.id,
      email: response.result.payment_source.paypal.email_address,
      country_code: response.result.payment_source.paypal.address.country_code,
      full_name: response.result.purchase_units[0].shipping.name.full_name,
      price: Number.parseFloat(
        response.result.purchase_units[0].payments.captures[0].amount.value,
      ),
    };
    const subs = await insertSubscriptionService({
      ...mockedObject,
      plan:
        mockedObject.price === planPrices[SubscriptionPlan.Monthly]
          ? SubscriptionPlan.Monthly
          : mockedObject.price === planPrices[SubscriptionPlan.Quarterly]
            ? SubscriptionPlan.Quarterly
            : mockedObject.price === planPrices[SubscriptionPlan.SemiAnnual]
              ? SubscriptionPlan.SemiAnnual
              : SubscriptionPlan.Annual,
    });
    revalidatePath("/profile");
    logger.info({ order: subs?.data }, "Capture order response");
    return NextResponse.json({ orderID: response.result.id });
  } catch (error: any) {
    logger.error({ error }, "Error capturing order:");
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export interface Root {
  id: string;
  status: string;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  payer: Payer;
  links: Link2[];
}

export interface PaymentSource {
  paypal: Paypal;
}

export interface Paypal {
  email_address: string;
  account_id: string;
  account_status: string;
  name: Name;
  address: Address;
}

export interface Name {
  given_name: string;
  surname: string;
}

export interface Address {
  country_code: string;
}

export interface PurchaseUnit {
  reference_id: string;
  shipping: Shipping;
  payments: Payments;
}

export interface Shipping {
  name: Name2;
  address: Address2;
}

export interface Name2 {
  full_name: string;
}

export interface Address2 {
  address_line_1: string;
  admin_area_2: string;
  postal_code: string;
  country_code: string;
}

export interface Payments {
  captures: Capture[];
}

export interface Capture {
  id: string;
  status: string;
  amount: Amount;
  final_capture: boolean;
  seller_protection: SellerProtection;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  links: Link[];
  create_time: string;
  update_time: string;
}

export interface Amount {
  currency_code: string;
  value: string;
}

export interface SellerProtection {
  status: string;
  dispute_categories: string[];
}

export interface SellerReceivableBreakdown {
  gross_amount: GrossAmount;
  paypal_fee: PaypalFee;
  net_amount: NetAmount;
}

export interface GrossAmount {
  currency_code: string;
  value: string;
}

export interface PaypalFee {
  currency_code: string;
  value: string;
}

export interface NetAmount {
  currency_code: string;
  value: string;
}

export interface Link {
  href: string;
  rel: string;
  method: string;
}

export interface Payer {
  name: Name3;
  email_address: string;
  payer_id: string;
  address: Address3;
}

export interface Name3 {
  given_name: string;
  surname: string;
}

export interface Address3 {
  country_code: string;
}

export interface Link2 {
  href: string;
  rel: string;
  method: string;
}
