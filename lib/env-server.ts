import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const ServerEnv = createEnv({
  server: {
    PAYPAL_CLIENT_ID: z.string().min(1),
    PAYPAL_CLIENT_SECRET: z.string().min(1),
    PAYPAL_API_URL: z.string().url(),
    SMTP_SERVER_HOST: z.string(),
    SMTP_SERVER_USERNAME: z.string().email(),
    SMTP_SERVER_PASSWORD: z.string().min(1),
    SITE_MAIL_RECIEVER: z.string().email(),
    BETTER_STACK_TOKEN: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  // },
  // For Next.js >= 13.4.4, you can just reference process.env:
  experimental__runtimeEnv: process.env,
});
