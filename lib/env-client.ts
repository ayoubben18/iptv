import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const ClientEnv = createEnv({
  client: {
    NEXT_PUBLIC_REDIRECTION_SITE: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_REDIRECTION_SITE: process.env.NEXT_PUBLIC_REDIRECTION_SITE,
  },
});
