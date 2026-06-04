import type { PollingState } from "../types";

export const getLastPolled = (
  state: PollingState,
  now: string,
): string | undefined => state?.lastPolled ?? now;
