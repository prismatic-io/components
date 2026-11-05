import type { PollingCursor, PollingState } from "../types";

export const resolvePollingCursor = (params: {
  incoming: PollingCursor | undefined;
  state: PollingState;
  lookBackDate: string;
  now: string;
}): PollingCursor => {
  const { incoming, state, lookBackDate, now } = params;

  if (incoming?.windowStart && incoming?.windowEnd) {
    return incoming;
  }

  if (state?.cursor?.windowStart && state?.cursor?.windowEnd) {
    return state.cursor;
  }

  if (state?.lastPolledAt) {
    return { windowStart: state.lastPolledAt, windowEnd: now, isBackfill: false };
  }

  if (lookBackDate) {
    return { windowStart: lookBackDate, windowEnd: now, isBackfill: true };
  }

  return { windowStart: now, windowEnd: now, isBackfill: false };
};

export const buildPollingWindowQuery = (cursor: PollingCursor): string =>
  `updated_at:>='${cursor.windowStart}' updated_at:<'${cursor.windowEnd}'`;
