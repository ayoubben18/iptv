import { log } from "@logtail/next";

const logtailLogger = log;

const logger = {
  info: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.info("INFO:", message, ...args);
    }
    logtailLogger.info(message, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.warn("WARN:", message, ...args);
    }
    logtailLogger.warn(message, ...args);
  },
  error: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.error("ERROR:", message, ...args);
    }
    logtailLogger.error(message, ...args);
  },
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.debug("DEBUG:", message, ...args);
    }
    logtailLogger.debug(message, ...args);
  },
};

export default logger;
