import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { connection, pollResourceType, showNewRecords, showUpdatedRecords } from "../inputs";
import type { PollingState, RampRecord } from "../types";
import { fetchAllData } from "../util";

const filterByTimestamp = (
  records: RampRecord[],
  lastPolledAt: string,
  createdAtField: string | null,
  updatedAtField: string | null,
): { created: RampRecord[]; updated: RampRecord[] } => {
  const lastPolledDate = new Date(lastPolledAt);
  const created: RampRecord[] = [];
  const updated: RampRecord[] = [];

  for (const record of records) {
    const createdAt = createdAtField ? (record[createdAtField] as string) : null;
    const updatedAt = updatedAtField ? (record[updatedAtField] as string) : null;

    if (createdAt && new Date(createdAt) > lastPolledDate) {
      created.push(record);
    } else if (updatedAt && new Date(updatedAt) > lastPolledDate) {
      updated.push(record);
    }
  }

  return { created, updated };
};

const filterByNewIds = (records: RampRecord[], knownIds: string[]): RampRecord[] => {
  const knownSet = new Set(knownIds);
  return records.filter((r) => !knownSet.has(r.id));
};

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected Ramp resource type on a configured schedule.",
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
    const lastState = context.polling.getState() as PollingState;
    const config = POLL_RESOURCE_CONFIG[resourceType];

    if (!config) {
      throw new Error(`Unsupported resource type: ${resourceType}`);
    }

    const client = createClient(connection, context.debug.enabled);

    const { data: records } = await fetchAllData<RampRecord>(client, config.endpoint, {}, true);

    const hasTimestamps = config.createdAtField !== null;
    const lastPolledAt = lastState?.lastPolledAt ?? now;

    let result: { created: RampRecord[]; updated: RampRecord[] };

    if (hasTimestamps) {
      const filtered = filterByTimestamp(
        records,
        lastPolledAt,
        config.createdAtField,
        config.updatedAtField,
      );
      result = {
        created: showNewRecords ? filtered.created : [],
        updated: showUpdatedRecords ? filtered.updated : [],
      };
    } else {
      const knownIds = lastState?.knownIds ?? [];
      const newRecords = filterByNewIds(records, knownIds);
      result = {
        created: showNewRecords ? newRecords : [],
        updated: [],
      };
    }

    const newState: PollingState = { lastPolledAt: now };
    if (!hasTimestamps) {
      newState.knownIds = records.map((r) => r.id);
    }
    context.polling.setState(newState as unknown as Record<string, unknown>);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${records.length} total, ${result.created.length} new, ${result.updated.length} updated`,
      );
    }

    const totalChanges = result.created.length + result.updated.length;
    return {
      payload: {
        ...payload,
        body: { data: result },
      },
      polledNoChanges: totalChanges === 0,
    };
  },
});
