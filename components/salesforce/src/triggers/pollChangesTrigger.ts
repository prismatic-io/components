import { pollingTrigger, util } from "@prismatic-io/spectral";
import { pollChangesTriggerInputs } from "../inputs";
import {
  DEFAULT_MAX_RECORDS,
  DEFAULT_SF_VERSION,
  MAX_BATCHED_PAGE_SIZE,
} from "../constants";
import type {
  DeletedRecord,
  PollingCursor,
  PollingState,
  SalesforceChangesObject,
  SalesforceRecordChange,
} from "../types";
import {
  classifyFromCursor,
  coerceObjectValues,
  createdSinceCursor,
  fetchDeletedRecords,
  fetchPollingWindow,
  formatSOQLDateTime,
  getPollingChanges,
  resolveCursorSafely,
  resolvePollingFields,
  resolvePollingRecordChanges,
} from "../util";
import { createSalesforceClient } from "../client";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a specified Salesforce object type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50, concurrentBatchLimit: 1 },
  triggerResolver: {
    resolveItems: (_context, { payload }): SalesforceRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as SalesforceChangesObject),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) => {
    const sfVersion = params.version || DEFAULT_SF_VERSION;
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const isBatching = context.batch?.enabled === true;
    const requestedPageSize = params.maxRecordsToFetch || DEFAULT_MAX_RECORDS;
    const pageSize = isBatching
      ? Math.min(requestedPageSize, MAX_BATCHED_PAGE_SIZE)
      : requestedPageSize;
    const cursor = resolveCursorSafely({
      incoming: payload.paginationState as PollingCursor | undefined,
      state,
      lookBackDate: params.lookBackDate,
      now,
      logger: context.logger,
    });
    const sfClient = await createSalesforceClient(params.connection, sfVersion);
    const fields = await resolvePollingFields(
      sfClient,
      params.recordType,
      params.selectedFields,
      params.returnIdsOnly,
      context.logger,
    );
    const filters = cursor.isBackfill
      ? {}
      : {
          ...params.dynamicValues,
          ...coerceObjectValues(
            params.fieldValues,
            util.types.keyValPairListToObject(params.fieldValueTypes),
          ),
        };
    const windowIsEmpty =
      formatSOQLDateTime(cursor.watermark) >=
      formatSOQLDateTime(cursor.windowEnd);
    const { emit, nextCursor } = windowIsEmpty
      ? { emit: [], nextCursor: null }
      : await fetchPollingWindow(sfClient, {
          recordType: params.recordType,
          fields,
          filters,
          cursor,
          pageSize,
        });
    const isFirstRound = !payload.paginationState && !state.cursor;
    let deletedRecords: DeletedRecord[] = [];
    let lastDeletedAt = state.lastDeletedAt;
    if (params.showDeletedRecords && isFirstRound && !cursor.isBackfill) {
      const since = state.lastDeletedAt ?? state.lastPolledAt ?? now;
      if (since === now) {
        lastDeletedAt = now;
      } else {
        const result = await fetchDeletedRecords(
          sfClient,
          params.recordType,
          since,
          now,
          context.logger,
        );
        deletedRecords = result.deletedRecords;
        lastDeletedAt = result.coveredUntil;
      }
    } else if (!params.showDeletedRecords || !lastDeletedAt) {
      lastDeletedAt = now;
    }
    const { changes, changesObject } = getPollingChanges(
      params.showNewRecords,
      params.showUpdatedRecords,
      emit,
      classifyFromCursor(cursor),
      createdSinceCursor(cursor),
      deletedRecords,
      { snapshot: cursor.isBackfill },
    );
    const isPlatformDrivenRound = Boolean(payload.paginationState);
    context.polling.setState({
      lastPolledAt: nextCursor
        ? (state.lastPolledAt ?? cursor.watermark)
        : cursor.windowEnd,
      ...(nextCursor ? { cursor: nextCursor } : {}),
      lastDeletedAt,
    } satisfies PollingState);
    return {
      payload: {
        ...payload,
        paginationState: nextCursor ?? undefined,
        body: { data: changesObject },
      },
      polledNoChanges:
        changes === 0 && nextCursor === null && !isPlatformDrivenRound,
    };
  },
});
