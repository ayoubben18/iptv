// import pino from "pino";
// import pretty from "pino-pretty";
// import { ServerEnv } from "./env-server";
// // import pretty from "pino-pretty";

// const transport = pino.transport({
//   targets: [
//     {
//       target: "pino-pretty",
//       options: { destination: process.stdout.fd },
//     },
//     {
//       target: "@logtail/pino",
//       options: { sourceToken: ServerEnv.BETTER_STACK_TOKEN },
//     },
//   ],
// });

// const logger = pino(
//   {
//     level: "info",
//   },
//   transport,
// );

import { log } from "@logtail/next";

const logger = log;

export default logger;
