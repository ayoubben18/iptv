import { ServerEnv } from "@/lib/env-server";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

const configureEnvironment = function () {
  const clientId = ServerEnv.PAYPAL_CLIENT_ID!;
  const clientSecret = ServerEnv.PAYPAL_CLIENT_SECRET!;

  return process.env.NODE_ENV === "production"
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
};

const client = function () {
  return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());
};

export default client;
