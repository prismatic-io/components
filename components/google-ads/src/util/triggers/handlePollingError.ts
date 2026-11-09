import type { PollingContext } from "@prismatic-io/spectral";
import { MAX_CONSECUTIVE_POLLING_ERRORS } from "../../constants";
import type { BasePollingState } from "../../types";
import { describeGoogleAdsError } from "../errors";

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

  if (consecutiveErrors >= MAX_CONSECUTIVE_POLLING_ERRORS) {
    context.logger.error(
      `${serviceName} polling failed ${consecutiveErrors} times consecutively. ` +
        `Error: ${describeGoogleAdsError(error)}`,
    );
  }

  throw error;
};
