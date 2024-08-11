import pino from "pino";
import { ServerEnv } from "./env-server";
// import pretty from "pino-pretty";

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: { destination: process.stdout.fd },
    },
    {
      target: "@logtail/pino",
      options: { sourceToken: ServerEnv.BETTER_STACK_TOKEN },
    },
  ],
});

const logger = pino(
  {
    level: "info",
  },
  transport,
);

export default logger;
