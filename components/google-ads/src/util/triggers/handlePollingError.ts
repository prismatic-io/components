import type { PollingContext } from "@prismatic-io/spectral";

interface BasePollingState {
  errorCount?: number;
  consecutiveErrors?: number;
  [key: string]: any;
}

export const handlePollingError = <T extends BasePollingState>(
  error: Error,
  pollState: T,
  context: PollingContext,
  serviceName: string,
): void => {
  const consecutiveErrors = (pollState.consecutiveErrors || 0) + 1;
  const errorCount = (pollState.errorCount || 0) + 1;

  context.polling.setState({
    ...pollState,
    errorCount,
    consecutiveErrors,
  });

  if (consecutiveErrors >= 3) {
    context.logger.error(
      `${serviceName} polling failed ${consecutiveErrors} times consecutively. ` +
        `Error: ${error.message}`,
    );
  }

  throw error;
};
