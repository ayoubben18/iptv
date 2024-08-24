import { log, Logger } from "@logtail/next";
import pino from "pino";
import pinoPretty from "pino-pretty";

let logger: pino.Logger | Logger;

if (process.env.NODE_ENV !== "development") {
  logger = pino(pinoPretty());
} else {
  logger = log;
}

export default logger;
