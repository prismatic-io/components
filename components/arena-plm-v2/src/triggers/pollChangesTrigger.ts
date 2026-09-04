import { pollingTrigger } from "@prismatic-io/spectral";
import { createArenaClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  ArenaChangesObject,
  ArenaRecordChange,
  PollingCursor,
  PollingState,
} from "../types";
import {
  fetchArenaEventsPage,
  resolveCursorSafely,
  resolvePollingRecordChanges,
  windowIsEmpty,
} from "../util/polling";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Events",
    description:
      "Checks an Arena outbound integration for events created since the last recurrence, delivering them as a single result or, with batching enabled, as one execution per event. Arena events are immutable, so only newly created events are reported.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): ArenaRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as ArenaChangesObject),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const cursor = resolveCursorSafely({
      incoming: payload.paginationState as PollingCursor | undefined,
      state,
      lookBackDate: params.lookBackDate,
      now,
      logger: context.logger,
    });
    const client = await createArenaClient(context, params.connection);
    const { records: createdRecords, nextCursor } = windowIsEmpty(cursor)
      ? { records: [], nextCursor: null }
      : await fetchArenaEventsPage(
          client,
          params.integrationGuid,
          cursor,
          params.itemsReconciled === "any" ? undefined : params.itemsReconciled,
        );
    context.polling.setState({
      lastPolledAt: nextCursor ? state.lastPolledAt : cursor.windowEnd,
      ...(nextCursor ? { cursor: nextCursor } : {}),
    } satisfies PollingState);
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled integration ${params.integrationGuid} at offset ${cursor.offset}: ${createdRecords.length} events between ${cursor.windowStart} and ${cursor.windowEnd}; ${nextCursor ? "more pages remain" : "window exhausted"}`,
      );
    }
    return {
      payload: {
        ...payload,
        paginationState: nextCursor ?? undefined,
        body: { data: { createdRecords } },
      },
      polledNoChanges:
        createdRecords.length === 0 &&
        nextCursor === null &&
        !payload.paginationState,
    };
  },
});
