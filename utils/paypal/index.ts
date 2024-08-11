import { ServerEnv } from "@/lib/env-server";
import paypal from "@paypal/checkout-server-sdk";

const envirenement = new paypal.core.SandboxEnvironment(
  ServerEnv.PAYPAL_CLIENT_ID,
  ServerEnv.PAYPAL_CLIENT_SECRET,
);

const paypalClient = new paypal.core.PayPalHttpClient(envirenement);

export { paypalClient };
