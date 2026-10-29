import { pollingTrigger } from "@prismatic-io/spectral";
import { DEFAULT_BATCH_SIZE, MAX_POLL_PAGES } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  FluentOrder,
  FluentOrderChange,
  FluentOrderChangesObject,
  PollingCursor,
  PollingState,
} from "../types";
import { fetchFluentOrdersInWindow, resolveFluentOrderChanges } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing orders from Fluent Commerce. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): FluentOrderChange[] =>
      resolveFluentOrderChanges(payload.body.data as FluentOrderChangesObject),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = (context.polling.getState() ?? {}) as PollingState;
    const incoming = payload.paginationState as PollingCursor | undefined;
    const lastPolledAt = pollState.lastPolledAt || params.lookBackDate || now;
    const isBackfill =
      pollState.backfillActive === true ||
      (!pollState.lastPolledAt && Boolean(params.lookBackDate));
    const showNew = isBackfill || params.showNewRecords !== false;
    const showUpdated = isBackfill || params.showUpdatedRecords !== false;
    const windowTo = incoming?.windowTo ?? pollState.windowTo ?? now;
    const cursor = incoming?.after ?? pollState.after ?? null;

    const isBatching = context.batch?.enabled === true;
    const { records, truncated, after } = await fetchFluentOrdersInWindow(
      params.connection,
      { from: lastPolledAt, to: windowTo, after: cursor },
      params.retailerId,
      isBatching ? 1 : MAX_POLL_PAGES,
    );

    const lastPolledAtDate = new Date(lastPolledAt);
    const created: FluentOrder[] = [];
    const updated: FluentOrder[] = [];

    for (const record of records) {
      const createValue = record.createdOn;
      const createdAtDate =
        typeof createValue === "string" ? new Date(createValue) : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && showNew) created.push(record);
      else if (!isNew && showUpdated) updated.push(record);
    }

    if (truncated) {
      context.polling.setState({
        lastPolledAt,
        windowTo,
        after,
        ...(isBackfill ? { backfillActive: true } : {}),
      });
      if (!isBatching) {
        context.logger.warn(
          `Polling truncated at the page cap for Fluent orders. The next poll resumes the window ${lastPolledAt} to ${windowTo} from the stored cursor.`,
        );
      }
    } else {
      context.polling.setState({ lastPolledAt: windowTo });
    }

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Fluent orders: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    const nextCursor: PollingCursor | null =
      truncated && after ? { windowTo, after } : null;
    const totalMatched = created.length + updated.length;
    return {
      payload: {
        ...payload,
        paginationState: nextCursor ?? undefined,
        body: { data: { created, updated } },
      },
      polledNoChanges:
        totalMatched === 0 && !incoming && (nextCursor === null || !isBatching),
    };
  },
});
