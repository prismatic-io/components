import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerInputs } from "../inputs";
import type { PollingState, ServiceTitanRecord } from "../types";
import { fetchAllRecords, filterByTimestamp } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected resource type on a configured schedule.",
  },
  inputs: pollChangesTriggerInputs,
  perform: async (
    context,
    payload,
    { connection, resourceType, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
    const config = POLL_RESOURCE_CONFIG[resourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${resourceType}`);
    }
    const client = createClient(
      connection,
      config.urlType,
      context.debug.enabled,
    );
    const result = await fetchAllRecords<ServiceTitanRecord>(
      client,
      config.endpoint,
      { modifiedOnOrAfter: lastPolledAt },
    );
    const { created, updated } = filterByTimestamp(
      result.data,
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
