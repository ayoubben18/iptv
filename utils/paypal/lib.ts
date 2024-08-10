import { ServerEnv } from "@/lib/env-server";

async function getPayPalAccessToken() {
  const clientId = ServerEnv.PAYPAL_CLIENT_ID;
  const clientSecret = ServerEnv.PAYPAL_CLIENT_SECRET;
  const paypalApiUrl = ServerEnv.PAYPAL_API_URL;

  const response = await fetch(`${paypalApiUrl}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
  });

  const data = await response.json();
  return data.access_token;
}
export { getPayPalAccessToken };
