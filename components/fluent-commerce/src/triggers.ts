import { pollingTrigger } from "@prismatic-io/spectral";
import { BATCHED_MAX_PAGES, MAX_POLL_PAGES } from "./constants";
import { pollChangesExamplePayload } from "./examplePayloads";
import { pollChangesInputs } from "./inputs";
import type {
  FluentCommerceChangesObject,
  FluentCommerceRecordChange,
  FluentOrder,
  PollingCursor,
  PollingState,
} from "./types";
import { fetchFluentOrdersSince, resolvePollingRecordChanges } from "./util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing orders from Fluent Commerce. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): FluentCommerceRecordChange[] =>
      resolvePollingRecordChanges(
        payload.body.data as FluentCommerceChangesObject,
      ),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const incoming = payload.paginationState as PollingCursor | undefined;
    const relayCursor = incoming?.after ?? state.after ?? null;
    const lastPolledAt = state.lastPolledAt ?? now;
    const seedSince = params.lookBackDate
      ? new Date(params.lookBackDate).toISOString()
      : now;
    const since = state.lastPolledAt ?? seedSince;
    const isBackfill =
      state.backfillActive === true ||
      (!state.lastPolledAt && Boolean(params.lookBackDate));
    const maxPages =
      context.batch?.enabled === true ? BATCHED_MAX_PAGES : MAX_POLL_PAGES;
    const { records, truncated, endCursor } = await fetchFluentOrdersSince(
      params.connection,
      since,
      params.retailerId,
      context.debug.enabled,
      relayCursor,
      maxPages,
    );
    const lastPolledAtDate = new Date(lastPolledAt);
    const created: FluentOrder[] = [];
    const updated: FluentOrder[] = [];
    for (const record of records) {
      const createValue = record.createdOn;
      const createdAtDate =
        typeof createValue === "string" ? new Date(createValue) : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && (isBackfill || params.showNewRecords !== false))
        created.push(record);
      else if (!isNew && (isBackfill || params.showUpdatedRecords !== false))
        updated.push(record);
    }
    const drained = !truncated;
    context.polling.setState({
      after: endCursor,
      lastPolledAt: drained ? now : since,
      ...(isBackfill && !drained ? { backfillActive: true } : {}),
    } satisfies PollingState);
    const nextCursor: PollingCursor | null =
      drained || !endCursor ? null : { after: endCursor };
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Fluent orders: ${records.length} fetched, ${created.length} created, ${updated.length} updated, ${drained ? "stream drained" : "more pending"}`,
      );
    }
    const totalMatched = created.length + updated.length;
    return {
      payload: {
        ...payload,
        paginationState: nextCursor ?? undefined,
        body: { data: { created, updated } },
      },
      polledNoChanges: totalMatched === 0 && nextCursor === null && !incoming,
    };
  },
});
export default { pollChangesTrigger };
