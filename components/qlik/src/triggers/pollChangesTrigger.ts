import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesInputs } from "../inputs";
import type { PollingState } from "../types";
import { fetchAllSince, filterByTimestamp } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in Qlik on a configured schedule.",
  },
  inputs: pollChangesInputs,
  async perform(context, payload, params) {
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    
    
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const lastPolledAt = state?.lastPolledAt ?? now;

    const client = createClient(params.connection, context.debug.enabled);
    const allRecords = await fetchAllSince(
      client,
      params.pollResourceType,
      lastPolledAt,
    );

    const { created, updated } = filterByTimestamp(
      allRecords,
      config,
      lastPolledAt,
    );

    const filteredCreated = params.showNewRecords ? created : [];
    const filteredUpdated = params.showUpdatedRecords ? updated : [];
    const totalMatched = filteredCreated.length + filteredUpdated.length;

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${allRecords.length} ${params.pollResourceType} records, ${totalMatched} matched (${created.length} new, ${updated.length} updated) since last poll.`,
      );
    }

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: {
        ...payload,
        body: {
          data: { created: filteredCreated, updated: filteredUpdated },
        },
      },
      polledNoChanges: totalMatched === 0,
    };
  },
});
