import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { connection } from "../inputs";
import {
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs/triggers";
import type { PollingState, ServiceTitanRecord } from "../types";
import { fetchAllRecords } from "../util";

const filterByTimestamp = (
  records: ServiceTitanRecord[],
  lastPolledAt: string,
  createdAtField: string,
  updatedAtField: string,
): { created: ServiceTitanRecord[]; updated: ServiceTitanRecord[] } => {
  const lastPolledDate = new Date(lastPolledAt);
  const created: ServiceTitanRecord[] = [];
  const updated: ServiceTitanRecord[] = [];

  for (const record of records) {
    const createdAt = record[createdAtField] as string;
    const updatedAt = record[updatedAtField] as string;

    if (createdAt && new Date(createdAt) > lastPolledDate) {
      created.push(record);
    } else if (updatedAt && new Date(updatedAt) > lastPolledDate) {
      updated.push(record);
    }
  }

  return { created, updated };
};

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected resource type on a configured schedule.",
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
