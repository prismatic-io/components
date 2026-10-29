import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE, POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads/triggers";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import { pollChangesTriggerInputs } from "../inputs";
import {
  fetchRecentsSince,
  formatPipedriveTimestamp,
  partitionByTimestamp,
  resolvePollingRecordChanges,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected Pipedrive resource type on a configured schedule.",
  },
  inputs: pollChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (
    context,
    payload,
    {
      connection,
      resourceType,
      lookBackDate,
      showNewRecords,
      showUpdatedRecords,
    },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const sinceDate = lastState?.lastPolledAt
      ? new Date(lastState.lastPolledAt)
      : lookBackDate
        ? new Date(lookBackDate)
        : now;
    const sinceTimestamp = formatPipedriveTimestamp(sinceDate);

    const client = createClient(connection, context.debug.enabled);
    const records = await fetchRecentsSince(
      client,
      sinceTimestamp,
      resourceType,
    );

    const config = POLL_RESOURCE_CONFIG[resourceType] ?? {
      createdAtField: null,
      updatedAtField: null,
    };
    const { created, updated } = partitionByTimestamp(
      records,
      sinceDate,
      config,
    );

    context.polling.setState({ lastPolledAt: now.toISOString() } as Record<
      string,
      unknown
    >);

    const isInitialSync = !lastState?.lastPolledAt && !!lookBackDate;

    const result = {
      created: isInitialSync || showNewRecords ? created : [],
      updated: isInitialSync || showUpdatedRecords ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${records.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
  examplePayload: pollChangesTriggerExamplePayload,
});
