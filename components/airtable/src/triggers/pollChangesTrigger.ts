import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import {
  BATCHED_MAX_PAGES,
  MAX_POLL_PAGES,
  fetchAirtableRecordsSince,
  partitionRecordsByTimestamp,
} from "../helpers/triggers/polling";
import { pollChangesInputs } from "../inputs";
import type {
  AirtableChangesObject,
  AirtablePollingCursor,
  AirtableRecordChange,
  PollingState,
} from "../types";
import { resolvePollingRecordChanges } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records in a specified Airtable table. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): AirtableRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as AirtableChangesObject),
    getNextPaginationState: (
      _context,
      { payload },
    ): AirtablePollingCursor | null =>
      (payload.paginationState as AirtablePollingCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) => {
    const incoming = payload.paginationState as
      | AirtablePollingCursor
      | undefined;
    const now = incoming?.drainStartedAt ?? new Date().toISOString();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const seedSince = params.lookBackDate
      ? new Date(params.lookBackDate).toISOString()
      : now;
    const lastPolledAt = state.lastPolledAt ?? seedSince;
    const isBackfill =
      state.backfillActive === true ||
      (!state.lastPolledAt && Boolean(params.lookBackDate));
    const maxPages =
      context.batch?.enabled === true ? BATCHED_MAX_PAGES : MAX_POLL_PAGES;
    const { records, offset } = await fetchAirtableRecordsSince(
      params.airtableConnection,
      params.baseId,
      params.tableName,
      lastPolledAt,
      context.debug.enabled,
      maxPages,
      params.pollView,
      params.additionalFilter,
      incoming?.offset,
    );
    const endOfStream = !offset;
    const result: AirtableChangesObject = partitionRecordsByTimestamp(
      records,
      lastPolledAt,
      {
        isBackfill,
        showNewRecords: params.showNewRecords !== false,
        showUpdatedRecords: params.showUpdatedRecords !== false,
      },
    );
    const nextCursor: AirtablePollingCursor | null = endOfStream
      ? null
      : { offset: offset as string, drainStartedAt: now };
    let advancedCursor = lastPolledAt;
    if (!endOfStream && context.batch?.enabled !== true) {
      const latestCreated = records
        .map((r) => r.createdTime)
        .filter((t): t is string => typeof t === "string")
        .sort()
        .pop();
      advancedCursor = latestCreated ?? lastPolledAt;
      context.logger.warn(
        `Polling truncated at the page cap for table ${params.tableName}. ` +
          `Advancing cursor to ${advancedCursor}; next poll resumes from there.`,
      );
    }
    context.polling.setState({
      lastPolledAt: endOfStream ? now : advancedCursor,
      ...(isBackfill && !endOfStream ? { backfillActive: true } : {}),
    } satisfies PollingState);
    return {
      payload: {
        ...payload,
        paginationState: nextCursor ?? undefined,
        body: { data: result },
      },
      polledNoChanges:
        (result.created?.length ?? 0) === 0 &&
        (result.updated?.length ?? 0) === 0 &&
        nextCursor === null &&
        !incoming,
    };
  },
});
