import type { PollingState } from "../types";
export const resolvePollWindow = (
  state: PollingState | undefined,
  lookBackDate: string | undefined,
  now: string,
): {
  lastPolledAt: string;
  isBackfill: boolean;
} => {
  if (state?.lastPolledAt) {
    return { lastPolledAt: state.lastPolledAt, isBackfill: false };
  }
  if (lookBackDate) {
    return {
      lastPolledAt: new Date(Date.parse(lookBackDate) - 1).toISOString(),
      isBackfill: true,
    };
  }
  return { lastPolledAt: now, isBackfill: false };
};
