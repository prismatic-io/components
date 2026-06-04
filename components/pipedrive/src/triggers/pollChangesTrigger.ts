import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads/triggers";
import type { PollingState } from "../types";
import { connectionInput, pollResourceType, showNewRecords, showUpdatedRecords } from "../inputs";
import { fetchRecentsSince, formatPipedriveTimestamp, partitionByTimestamp } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected Pipedrive resource type on a configured schedule.",
  },
  inputs: {
    connection: connectionInput,
    resourceType: pollResourceType,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (context, payload, params) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const sinceDate = lastState?.lastPolledAt ? new Date(lastState.lastPolledAt) : now;
    const sinceTimestamp = formatPipedriveTimestamp(sinceDate);

    const client = createClient(params.connection, context.debug.enabled);
    const records = await fetchRecentsSince(client, sinceTimestamp, params.resourceType);

    const config = POLL_RESOURCE_CONFIG[params.resourceType] ?? {
      createdAtField: null,
      updatedAtField: null,
    };
    const { created, updated } = partitionByTimestamp(records, sinceDate, config);

    context.polling.setState({ lastPolledAt: now.toISOString() } as Record<string, unknown>);

    const result = {
      created: params.showNewRecords ? created : [],
      updated: params.showUpdatedRecords ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${params.resourceType}: ${records.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges: result.created.length === 0 && result.updated.length === 0,
    };
  },
  examplePayload: pollChangesTriggerExamplePayload,
});
