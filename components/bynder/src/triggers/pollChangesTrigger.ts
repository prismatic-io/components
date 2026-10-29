import { pollingTrigger } from "@prismatic-io/spectral";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_CONFIG } from "../constants";
import { connection } from "../inputs/common";
import {
  lookBackDate,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs/triggers";
import type {
  BynderChangesObject,
  BynderRecordChange,
  PollingState,
} from "../types/triggers";
import {
  collectRecordChanges,
  fetchRecordsForResource,
  resolveBynderRecordChanges,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records for a selected Bynder resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: {
    connection,
    resourceType: pollResourceType,
    showNewRecords,
    showUpdatedRecords,
    lookBackDate,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): BynderRecordChange[] =>
      resolveBynderRecordChanges(payload.body.data as BynderChangesObject),
  },
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
    const isInitialSync = !pollState?.lastPolledAt && Boolean(lookBackDate);
    const since = pollState?.lastPolledAt ?? (lookBackDate || now);

    const records = await fetchRecordsForResource(
      connection,
      resourceType,
      context.debug.enabled,
    );
    const { created, updated } = collectRecordChanges(
      records,
      since,
      POLL_RESOURCE_CONFIG[resourceType],
      { isInitialSync, showNewRecords, showUpdatedRecords },
    );

    context.polling.setState({
      lastPolledAt: now,
    } as unknown as Record<string, unknown>);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${records.length} total, ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: created.length + updated.length === 0,
    };
  },
});
