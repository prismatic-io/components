import {
  V3_BATCHED_PER_PAGE,
  V3_BATCHED_POLL_MAX_PAGES,
  V3_MAX_PER_PAGE,
  V3_POLL_MAX_PAGES,
} from "../constants";
import type {
  V3ApplicationChange,
  V3ApplicationChangesObject,
  V3PollingCursor,
  V3PollWindowStart,
} from "../types";

export const resolveV3PollStart = (
  resume: V3PollingCursor | undefined,
  lastPolledAt: string | undefined,
  lookBackDate: string,
  now: Date,
): V3PollWindowStart => {
  if (resume) {
    return resume;
  }
  const drainStartedAt = now.toISOString();
  return {
    since: lastPolledAt || lookBackDate || drainStartedAt,
    drainStartedAt,
    backfill: !lastPolledAt && Boolean(lookBackDate),
  };
};

export const v3PollWindowBounds = (
  isBatching: boolean,
): { perPage: number; maxPages: number } =>
  isBatching
    ? {
        perPage: Math.min(V3_MAX_PER_PAGE, V3_BATCHED_PER_PAGE),
        maxPages: V3_BATCHED_POLL_MAX_PAGES,
      }
    : { perPage: V3_MAX_PER_PAGE, maxPages: V3_POLL_MAX_PAGES };

export const resolveV3ApplicationChanges = (
  data: V3ApplicationChangesObject | undefined,
): V3ApplicationChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): V3ApplicationChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): V3ApplicationChange => ({ changeType: "updated", record }),
    ),
  ];
};
