import { pollingTrigger } from "@prismatic-io/spectral";
import { getDomoClient } from "../client";
import { pollChangesTriggerInputs } from "../inputs";
import { RESOURCE_CONFIG } from "../constants";
import type { PollingState } from "../types";
import {
  buildPollingResult,
  fetchAllRecords,
  filterByNewIds,
  filterByTimestamp,
  getLastPolled,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected Domo resource type on a configured schedule.",
  },
  inputs: pollChangesTriggerInputs,
  perform: async (
    context,
    payload,
    { connection, resourceType, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as PollingState;
    const config = RESOURCE_CONFIG[resourceType];

    if (!config) {
      throw new Error(`Unsupported resource type: ${resourceType}`);
    }

    const client = await getDomoClient(connection, context.debug.enabled);
    const records = await fetchAllRecords(client, config);

    const hasTimestamps = config.createdAtField !== null;
    const lastPolled = getLastPolled(lastState, now);

    let result: { created: typeof records; updated: typeof records };

    if (hasTimestamps && lastPolled) {
      const filtered = filterByTimestamp(
        records,
        lastPolled,
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

    const newState: PollingState = { lastPolled: now };
    if (!hasTimestamps) {
      newState.knownIds = records.map((r) => r.id);
    }

    context.polling.setState(newState as unknown as Record<string, unknown>);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${records.length} total, ${result.created.length} new, ${result.updated.length} updated`,
      );
    }

    return buildPollingResult(payload, result);
  },
});
