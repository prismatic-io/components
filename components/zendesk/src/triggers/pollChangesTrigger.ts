import { pollingTrigger } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import {
  INCREMENTAL_START_TIME_OFFSET_SECONDS,
  TRIGGER_BATCH_SIZE,
} from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import {
  connectionInput,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs";
import type {
  PollingCursor,
  PollingState,
  TicketChange,
  TicketChangesObject,
} from "../types";
import {
  fetchTicketsWindow,
  incrementalWindowBounds,
  partitionTicketsByTimestamp,
  resolveTicketChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Tickets",
    description:
      "Retrieves existing and ongoing tickets from Zendesk. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: {
    connection: connectionInput,
    lookBackDate,
    showNewRecords,
    showUpdatedRecords,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): TicketChange[] =>
      resolveTicketChanges(payload.body.data as TicketChangesObject),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (
    context,
    payload,
    { connection, lookBackDate, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const incoming = payload.paginationState as PollingCursor | undefined;
    const cursor = incoming?.afterCursor ?? state.afterCursor;
    const exportHorizon = new Date(
      now.getTime() - INCREMENTAL_START_TIME_OFFSET_SECONDS * 1000,
    );
    const seedSince = lookBackDate ? new Date(lookBackDate) : exportHorizon;
    const sinceDate = state.lastPolledAt
      ? new Date(state.lastPolledAt)
      : seedSince;
    const isBackfill =
      state.backfillActive === true ||
      (!state.lastPolledAt && Boolean(lookBackDate));
    const { pageSize, maxPages } = incrementalWindowBounds(
      context.batch?.enabled === true,
    );
    const client = rawHttpClient(connection, context.debug.enabled);
    const { tickets, afterCursor, endOfStream } = await fetchTicketsWindow(
      client,
      cursor,
      Math.floor(seedSince.getTime() / 1000),
      pageSize,
      maxPages,
    );
    const { created, updated } = partitionTicketsByTimestamp(
      tickets,
      sinceDate,
    );
    const result: TicketChangesObject = {
      created: isBackfill || showNewRecords ? created : [],
      updated: isBackfill || showUpdatedRecords ? updated : [],
    };
    const nextCursor: PollingCursor | null =
      endOfStream || !afterCursor ? null : { afterCursor };
    context.polling.setState({
      afterCursor,
      lastPolledAt: (endOfStream ? exportHorizon : sinceDate).toISOString(),
      ...(isBackfill && !endOfStream ? { backfillActive: true } : {}),
    } satisfies PollingState);
    const createdCount = result.created?.length ?? 0;
    const updatedCount = result.updated?.length ?? 0;
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled tickets: ${tickets.length} read over at most ${maxPages} page(s) → ${createdCount} new, ${updatedCount} updated, ${endOfStream ? "stream drained" : "more pending"}`,
      );
    }
    return {
      payload: {
        ...payload,
        paginationState: nextCursor ?? undefined,
        body: { data: result },
      },
      polledNoChanges:
        createdCount === 0 &&
        updatedCount === 0 &&
        nextCursor === null &&
        !incoming,
    };
  },
});
