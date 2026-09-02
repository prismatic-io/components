import type { TriggerPayload, TriggerResult } from "@prismatic-io/spectral";
import type { PollingTriggerPerformFunction } from "@prismatic-io/spectral/dist/types/PollingTriggerDefinition";
import { getHubspotClient } from "../client";
import {
  BATCHED_WINDOW_LIMIT,
  MAX_SEARCH_RESULTS,
  POLL_REQUEST_TIMEOUT_MS,
} from "../constants";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingTriggerObject,
  PollChangesParams,
  PollingCursor,
  SearchRecordsPollingState,
} from "../types";
import { resolvePollingRecordChanges } from "../util";
import {
  advanceCursor,
  cycleFloor,
  fetchPollingWindow,
  getPollingChanges,
  resolveCreatedProperty,
  resolveCursorSafely,
  resolveEndpoint,
  resolveLastModifiedProperty,
  windowFloor,
} from "../util/polling";
export const performPollChanges = async (
  context: Parameters<PollingTriggerPerformFunction<never, never>>[0],
  payload: {
    paginationState?: unknown;
    [key: string]: unknown;
  },
  params: PollChangesParams,
  {
    onlyCustomObjects,
  }: {
    onlyCustomObjects: boolean;
  },
): Promise<TriggerResult<boolean, TriggerPayload>> => {
  const now = new Date().toISOString();
  const state = context.polling.getState() as SearchRecordsPollingState;
  const isContinuation = Boolean(payload.paginationState ?? state.cursor);
  const cursor = resolveCursorSafely({
    incoming: payload.paginationState as PollingCursor | undefined,
    state,
    lookBackDate: params.lookBackDate ?? "",
    now,
    logger: context.logger,
  });
  const endpoint = resolveEndpoint(
    params.searchEndpoint,
    params.objectType,
    onlyCustomObjects,
  );
  const dateProp = cursor.isBackfill
    ? resolveCreatedProperty(params.searchEndpoint, onlyCustomObjects)
    : resolveLastModifiedProperty(params.searchEndpoint, onlyCustomObjects);
  if (context.debug.enabled) {
    context.logger.debug(`Polling cursor: ${JSON.stringify(cursor)}`);
    context.logger.debug(`Polling endpoint ${endpoint} sorted by ${dateProp}`);
  }
  const client = getHubspotClient({
    hubspotConnection: params.hubspotConnection,
    timeout: POLL_REQUEST_TIMEOUT_MS,
    debugRequest: context.debug.enabled,
    headers: { "Content-Type": "application/json" },
  });
  const windowLimit = context.batch?.enabled
    ? BATCHED_WINDOW_LIMIT
    : MAX_SEARCH_RESULTS;
  const window = await fetchPollingWindow(
    client,
    {
      endpoint,
      searchProperties: params.searchProperties,
      dateProp,
      cursor,
      windowLimit,
    },
    context.logger,
  );
  let emit: PollingTriggerObject[];
  let nextCursor: PollingCursor | null;
  try {
    ({ emit, nextCursor } = advanceCursor(window, cursor));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    context.logger.error(
      `Polling cursor could not advance; discarding it and resuming from ${cursor.watermark} on the next poll: ${message}`,
    );
    context.polling.setState({
      lastPolledAt: cursor.watermark,
    } satisfies SearchRecordsPollingState);
    throw error;
  }
  const { changes, changesObject } = getPollingChanges(
    params.showNewRecords,
    params.showUpdatedRecords,
    emit,
    windowFloor(cursor),
    cycleFloor(cursor),
    { snapshot: cursor.isBackfill },
  );
  context.polling.setState({
    lastPolledAt: nextCursor
      ? (state.lastPolledAt ?? cursor.watermark)
      : cursor.windowEnd,
    ...(nextCursor ? { cursor: nextCursor } : {}),
  } satisfies SearchRecordsPollingState);
  return {
    payload: {
      ...payload,
      paginationState: nextCursor ?? undefined,
      body: { data: changesObject },
    },
    polledNoChanges: !isContinuation && changes === 0 && nextCursor === null,
  } as unknown as TriggerResult<boolean, TriggerPayload>;
};
export const pollChangesBatchConfig = {
  batchSize: 50,
  concurrentBatchLimit: 1,
};
export const pollChangesResolver = {
  resolveItems: (
    _context: unknown,
    {
      payload,
    }: {
      payload: {
        body: {
          data: unknown;
        };
      };
    },
  ): PollingRecordChange[] =>
    resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  getNextPaginationState: (
    _context: unknown,
    {
      payload,
    }: {
      payload: {
        paginationState?: unknown;
      };
    },
  ): PollingCursor | null =>
    (payload.paginationState as PollingCursor | undefined) ?? null,
};
