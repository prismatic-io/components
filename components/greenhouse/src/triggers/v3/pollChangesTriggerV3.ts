import { pollingTrigger } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { DEFAULT_BATCH_SIZE } from "../../constants";
import { pollChangesTriggerV3ExamplePayload } from "../../examplePayloads/v3/triggers";
import { pollChangesV3Inputs } from "../../inputs/v3/triggers";
import type {
  V3Application,
  V3ApplicationChange,
  V3ApplicationChangesObject,
  V3PollingCursor,
  V3PollingState,
} from "../../types";
import { partitionApplicationsByTimestamp } from "../../util";
import {
  resolveV3ApplicationChanges,
  resolveV3PollStart,
  v3PollWindowBounds,
} from "../../util/polling";
import { fetchV3Window } from "../../util/v3";

export const pollChangesTriggerV3 = pollingTrigger({
  display: {
    label: "New and Updated Applications",
    description:
      "Retrieves existing and ongoing applications in Greenhouse. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesV3Inputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): V3ApplicationChange[] =>
      resolveV3ApplicationChanges(
        payload.body.data as V3ApplicationChangesObject,
      ),
    getNextPaginationState: (_context, { payload }): V3PollingCursor | null =>
      (payload.paginationState as V3PollingCursor | undefined) ?? null,
  },
  perform: async (
    context,
    payload,
    { connection, lookBackDate, showNewRecords, showUpdatedRecords },
  ) => {
    const state = (context.polling.getState() ?? {}) as V3PollingState;
    const incoming = payload.paginationState as V3PollingCursor | undefined;
    const start = resolveV3PollStart(
      incoming ?? state.cursor,
      state.lastPolledAt,
      lookBackDate,
      new Date(),
    );
    const { perPage, maxPages } = v3PollWindowBounds(
      context.batch?.enabled === true,
    );

    const client = createV3Client(connection, context.debug.enabled);
    const { records, after } = await fetchV3Window<V3Application>(
      client,
      "/applications",
      {
        after: start.after,
        params: { "last_activity_at[gte]": start.since },
        perPage,
        maxPages,
      },
    );

    const { created, updated } = partitionApplicationsByTimestamp(
      records,
      new Date(start.since),
    );
    const next: V3PollingCursor | null = after ? { ...start, after } : null;

    context.polling.setState({
      lastPolledAt: next ? state.lastPolledAt : start.drainStartedAt,
      ...(next ? { cursor: next } : {}),
    } satisfies V3PollingState);

    const result: V3ApplicationChangesObject = {
      created: start.backfill || showNewRecords ? created : [],
      updated: start.backfill || showUpdatedRecords ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled applications (v3): ${records.length} read → ${created.length} new, ${updated.length} updated, ${next ? "more pending" : "drained"}`,
      );
    }

    return {
      payload: {
        ...payload,
        paginationState: next ?? undefined,
        body: { data: result },
      },
      polledNoChanges:
        result.created.length === 0 &&
        result.updated.length === 0 &&
        next === null &&
        !incoming,
    };
  },
  examplePayload: pollChangesTriggerV3ExamplePayload,
});
