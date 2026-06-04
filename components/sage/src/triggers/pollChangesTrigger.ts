import { pollingTrigger } from "@prismatic-io/spectral";
import { getSageClient } from "../client";
import { connection } from "../inputs";
import { pollResourceType, showNewRecords, showUpdatedRecords } from "../inputs";
import { POLL_RESOURCE_CONFIG } from "../constants";
import type { PollingState, SageRecord } from "../types";
import { fetchAllSince } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description: "Checks for new and updated records in Sage Accounting on a configured schedule.",
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
    const config = POLL_RESOURCE_CONFIG[resourceType];

    if (!config) {
      throw new Error(`Unsupported resource type: ${resourceType}`);
    }

    const client = getSageClient(connection, context.debug.enabled);
    const records = await fetchAllSince(client, config.endpoint, lastPolledAt);

    const lastPolledDate = new Date(lastPolledAt);
    const created: SageRecord[] = [];
    const updated: SageRecord[] = [];

    for (const record of records) {
      const createdAt = record.created_at as string;
      if (createdAt && new Date(createdAt) > lastPolledDate) {
        created.push(record);
      } else {
        updated.push(record);
      }
    }

    const filteredCreated = showNewRecords ? created : [];
    const filteredUpdated = showUpdatedRecords ? updated : [];
    const totalChanges = filteredCreated.length + filteredUpdated.length;

    context.polling.setState({ lastPolledAt: now } as unknown as Record<string, unknown>);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${records.length} total, ${filteredCreated.length} new, ${filteredUpdated.length} updated`,
      );
    }

    return {
      payload: {
        ...payload,
        body: { data: { created: filteredCreated, updated: filteredUpdated } },
      },
      polledNoChanges: totalChanges === 0,
    };
  },
});
