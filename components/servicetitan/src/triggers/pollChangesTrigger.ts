import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { MAX_BATCHED_RECORDS, POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  ServiceTitanRecord,
} from "../types";
import {
  advanceCursor,
  fetchAllRecords,
  filterByTimestamp,
  recordTimestamp,
  resolvePollingRecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a selected ServiceTitan resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  examplePayload: pollChangesTriggerExamplePayload,
  perform: async (
    context,
    payload,
    {
      connection,
      resourceType,
      showNewRecords,
      showUpdatedRecords,
      lookBackDate,
    },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const isBackfill =
      pollState?.backfillActive === true ||
      (!pollState?.lastPolledAt && Boolean(lookBackDate));
    const lastPolledAt = pollState?.lastPolledAt ?? (lookBackDate || now);
    const config = POLL_RESOURCE_CONFIG[resourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${resourceType}`);
    }
    const client = createClient(
      connection,
      config.urlType,
      context.debug.enabled,
    );
    const isBatching = context.batch?.enabled === true;
    const result = await fetchAllRecords<ServiceTitanRecord>(
      client,
      config.endpoint,
      {
        modifiedOnOrAfter: lastPolledAt,
        ...(config.sortField ? { sort: `+${config.sortField}` } : {}),
      },
      isBatching && config.sortField ? MAX_BATCHED_RECORDS : undefined,
    );
    const { created, updated } = filterByTimestamp(
      result.data,
      lastPolledAt,
      config.createdAtField,
      config.updatedAtField,
      pollState?.lastSeenIds,
    );
    const filteredCreated = isBackfill || showNewRecords ? created : [];
    const filteredUpdated = isBackfill || showUpdatedRecords ? updated : [];
    const totalChanges = filteredCreated.length + filteredUpdated.length;
    const watermark = advanceCursor(
      [...created, ...updated],
      lastPolledAt,
      config.updatedAtField,
      config.createdAtField,
    );
    const carriedIds =
      watermark === lastPolledAt ? (pollState?.lastSeenIds ?? []) : [];
    const lastSeenIds = [
      ...new Set([
        ...carriedIds,
        ...[...filteredCreated, ...filteredUpdated]
          .filter(
            (record) =>
              recordTimestamp(
                record,
                config.updatedAtField,
                config.createdAtField,
              ) === watermark,
          )
          .map((record) => record.id),
      ]),
    ];
    context.polling.setState({
      lastPolledAt: watermark,
      lastSeenIds,
      ...(isBackfill && result.hasMore ? { backfillActive: true } : {}),
    });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${result.data.length} total, ${filteredCreated.length} new, ${filteredUpdated.length} updated`,
      );
    }
    return {
      payload: {
        ...payload,
        body: {
          data: { created: filteredCreated, updated: filteredUpdated },
        },
      },
      polledNoChanges: totalChanges === 0,
    };
  },
});
