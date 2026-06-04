import { pollingTrigger } from "@prismatic-io/spectral";
import { createDuroClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs/polling";
import type { DuroRecord, PollingState } from "../types";
import { fetchAllSince } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated components or change orders in Duro on a configured schedule.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesExamplePayload,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    if (!POLL_RESOURCE_CONFIG[params.pollResourceType]) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    const client = createDuroClient(params.connection, context.debug.enabled);
    const { records, truncated } = await fetchAllSince(
      client,
      params.pollResourceType,
      lastPolledAt,
      {
        debug: context.debug.enabled,
        logger: context.logger,
      },
    );

    
    
    const lastPolledAtDate = new Date(lastPolledAt);
    const created: DuroRecord[] = [];
    const updated: DuroRecord[] = [];

    for (const record of records) {
      const createdDate =
        typeof record.created === "string" ? new Date(record.created) : null;
      const lastModifiedDate =
        typeof record.lastModified === "string"
          ? new Date(record.lastModified)
          : null;

      const isNew = createdDate !== null && createdDate > lastPolledAtDate;
      const isUpdated =
        !isNew &&
        lastModifiedDate !== null &&
        lastModifiedDate > lastPolledAtDate;

      if (isNew && params.showNewRecords) created.push(record);
      else if (isUpdated && params.showUpdatedRecords) updated.push(record);
    }

    const totalMatched = created.length + updated.length;

    
    
    
    
    context.polling.setState({ lastPolledAt: truncated ? lastPolledAt : now });
    if (truncated) {
      context.logger.warn(
        `Polling truncated at the page cap for ${params.pollResourceType}. Holding cursor at ${lastPolledAt}; the remaining records will be delivered on the next poll.`,
      );
    }

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${params.pollResourceType}: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
