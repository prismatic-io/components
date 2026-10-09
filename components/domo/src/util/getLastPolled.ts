import type { PollingState } from "../types";
export const getLastPolled = (
  state: PollingState,
  now: string,
  lookBackDate?: string,
): string | undefined => state?.lastPolled ?? (lookBackDate || now);
