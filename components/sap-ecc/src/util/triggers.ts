import type { ActionContext } from "@prismatic-io/spectral";
import type { PollingStateBase } from "../types";

type PollingContext = Pick<ActionContext, "logger"> & {
  polling: {
    getState: () => Record<string, unknown>;
    setState: (state: Record<string, unknown>) => void;
  };
};

export const handlePollingError = (
  error: Error,
  pollState: PollingStateBase,
  context: PollingContext,
  serviceName: string,
): never => {
  const consecutiveErrors = (pollState.consecutiveErrors || 0) + 1;
  const errorCount = (pollState.errorCount || 0) + 1;

  context.polling.setState({
    ...pollState,
    errorCount,
    consecutiveErrors,
  });

  if (consecutiveErrors >= 3) {
    context.logger.error(
      `${serviceName} polling failed ${consecutiveErrors} times consecutively. Error: ${error.message}`,
    );
  }

  throw error;
};
