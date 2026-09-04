import type { ActionLogger } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  ARENA_MAX_PAGE_SIZE,
  ARENA_OUTBOUND_INTEGRATIONS_PATH,
} from "../constants";
import type {
  ArenaChangesObject,
  ArenaListResponse,
  ArenaRecord,
  ArenaRecordChange,
  PollingCursor,
  PollingState,
} from "../types";
export const arenaEventsPath = (integrationGuid: string): string =>
  `${ARENA_OUTBOUND_INTEGRATIONS_PATH}/${integrationGuid}/events`;
const assertValidDateString = (value: unknown, label: string): string => {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
    throw new Error(
      `Invalid polling ${label}: ${JSON.stringify(value)}. Expected an ISO 8601 date string.`,
    );
  }
  return value;
};
const assertValidOffset = (value: unknown): number => {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    throw new Error(
      `Invalid polling cursor.offset: ${JSON.stringify(value)}. Expected a non-negative integer.`,
    );
  }
  return value;
};
export interface ResolveCursorParams {
  incoming?: PollingCursor;
  state: PollingState;
  lookBackDate?: string;
  now: string;
}
export const resolveCursor = ({
  incoming,
  state,
  lookBackDate,
  now,
}: ResolveCursorParams): PollingCursor => {
  const resumed = incoming ?? state.cursor;
  if (resumed) {
    return {
      ...resumed,
      windowStart: assertValidDateString(
        resumed.windowStart,
        "cursor.windowStart",
      ),
      windowEnd: assertValidDateString(resumed.windowEnd, "cursor.windowEnd"),
      offset: assertValidOffset(resumed.offset),
    };
  }
  if (state.lastPolledAt) {
    return {
      windowStart: assertValidDateString(
        state.lastPolledAt,
        "state.lastPolledAt",
      ),
      windowEnd: now,
      offset: 0,
    } satisfies PollingCursor;
  }
  if (lookBackDate) {
    return {
      windowStart: lookBackDate,
      windowEnd: now,
      offset: 0,
    } satisfies PollingCursor;
  }
  return {
    windowStart: now,
    windowEnd: now,
    offset: 0,
  } satisfies PollingCursor;
};
export const resolveCursorSafely = (
  params: ResolveCursorParams & {
    logger: Pick<ActionLogger, "warn">;
  },
): PollingCursor => {
  const { incoming, state, lookBackDate, now, logger } = params;
  try {
    return resolveCursor({ incoming, state, lookBackDate, now });
  } catch (error) {
    if (incoming || !state.cursor) {
      throw error;
    }
    const message = error instanceof Error ? error.message : String(error);
    logger.warn(
      `Discarding corrupted persisted polling cursor and restarting from the last recorded position: ${message}`,
    );
    try {
      return resolveCursor({
        incoming,
        state: { ...state, cursor: undefined },
        lookBackDate,
        now,
      });
    } catch (retryError) {
      const retryMessage =
        retryError instanceof Error ? retryError.message : String(retryError);
      logger.warn(
        `The last recorded position is also corrupted; discarding it and restarting from the current time, or from the Look-back Date if one is configured: ${retryMessage}`,
      );
      return resolveCursor({
        incoming,
        state: { ...state, cursor: undefined, lastPolledAt: undefined },
        lookBackDate,
        now,
      });
    }
  }
};
export const windowIsEmpty = (cursor: PollingCursor): boolean =>
  Date.parse(cursor.windowStart) >= Date.parse(cursor.windowEnd);
export const fetchArenaEventsPage = async (
  client: HttpClient,
  integrationGuid: string,
  cursor: PollingCursor,
  itemsReconciled?: string,
): Promise<{
  records: ArenaRecord[];
  nextCursor: PollingCursor | null;
}> => {
  const { data } = await client.get<ArenaListResponse<ArenaRecord>>(
    arenaEventsPath(integrationGuid),
    {
      params: {
        creationDateTimeFrom: cursor.windowStart,
        creationDateTimeTo: cursor.windowEnd,
        itemsReconciled,
        offset: cursor.offset,
        limit: ARENA_MAX_PAGE_SIZE,
      },
    },
  );
  const records = data?.results ?? [];
  const nextCursor =
    records.length < ARENA_MAX_PAGE_SIZE
      ? null
      : { ...cursor, offset: cursor.offset + records.length };
  return { records, nextCursor };
};
export const resolvePollingRecordChanges = (
  data: ArenaChangesObject | undefined,
): ArenaRecordChange[] => {
  const changesObject = data ?? {};
  return (changesObject.createdRecords ?? []).map(
    (record): ArenaRecordChange => ({ changeType: "created", record }),
  );
};
