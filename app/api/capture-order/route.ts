import { insertSubscriptionService } from "@/db/service/subscription-service";
import { ServerEnv } from "@/lib/env-server";
import logger from "@/lib/logger";
import { getPayPalAccessToken } from "@/utils/paypal/lib";
import { NextResponse } from "next/server";
import { SubscriptionPlan, planPrices } from "@/types/tableTypes";

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json();

    const accessToken = await getPayPalAccessToken();
    const paypalApiUrl = ServerEnv.PAYPAL_API_URL;

    const response = await fetch(
      `${paypalApiUrl}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const captureData = (await response.json()) as Root;
    const mockedObject = {
      email: captureData.payment_source.paypal.email_address,
      country_code: captureData.payment_source.paypal.address.country_code,
      full_name: captureData.purchase_units[0].shipping.name.full_name,
      price: Number.parseFloat(
        captureData.purchase_units[0].payments.captures[0].amount.value,
      ),
    };
    await insertSubscriptionService({
      email: mockedObject.email,
      country_code: mockedObject.country_code,
      full_name: mockedObject.full_name,
      price: mockedObject.price,
      plan:
        mockedObject.price === planPrices[SubscriptionPlan.Monthly]
          ? SubscriptionPlan.Monthly
          : mockedObject.price === planPrices[SubscriptionPlan.Quarterly]
            ? SubscriptionPlan.Quarterly
            : mockedObject.price === planPrices[SubscriptionPlan.SemiAnnual]
              ? SubscriptionPlan.SemiAnnual
              : SubscriptionPlan.Annual,
    });
    logger.info({ mockedObject }, "Update the database");
    return NextResponse.json(captureData);
  } catch (error) {
    logger.error({ error }, "Error capturing PayPal order");
    return NextResponse.json(
      { error: "Failed to capture order" },
      { status: 500 },
    );
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
