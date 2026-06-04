import type { DebugLoggerProps } from "../types";

export const debugLogger = ({ debug, logger, output }: DebugLoggerProps) => {
  if (!debug) {
    return;
  }

  logger.debug({ output });
};
