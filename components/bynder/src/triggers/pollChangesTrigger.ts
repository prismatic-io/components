import { pollingTrigger } from "@prismatic-io/spectral";
import { connection } from "../inputs/common";
import { pollResourceType, showNewRecords, showUpdatedRecords } from "../inputs/triggers";
import { fetchRecordsForResource, filterByTimestamp } from "../util";
import { POLL_RESOURCE_CONFIG } from "../constants";
import type { BynderRecord, PollingState } from "../types/triggers";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected Bynder resource type on a configured schedule.",
  },
  inputs: {
    connection,
    resourceType: pollResourceType,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (
    context,
    payload,
    { connection, resourceType, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    const records = await fetchRecordsForResource(
      connection,
      resourceType,
      context.debug.enabled,
    );

    const config = POLL_RESOURCE_CONFIG[resourceType];
    const { created, updated } = filterByTimestamp(
      records,
      lastPolledAt,
      config.createdAtField,
      config.updatedAtField,
    );

    const filteredCreated = showNewRecords ? created : [];
    const filteredUpdated = showUpdatedRecords ? updated : [];
    const totalChanges = filteredCreated.length + filteredUpdated.length;

    context.polling.setState({
      lastPolledAt: now,
    } as unknown as Record<string, unknown>);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${records.length} total, ${filteredCreated.length} new, ${filteredUpdated.length} updated`,
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
