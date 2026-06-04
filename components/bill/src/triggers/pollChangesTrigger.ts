import { pollingTrigger } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { pollChangesInputs } from "../inputs/polling";
import { RESOURCE_CONFIG } from "../constants";
import type { PollingState } from "../types";
import { fetchAllRecords, filterByTimestamp } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected Bill.com resource type on a configured schedule.",
  },
  inputs: pollChangesInputs,
  async perform(context, payload, params) {
    const config = RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const lastPolledAt = state?.lastPolledAt ?? now;

    
    
    if (!params.showNewRecords && !params.showUpdatedRecords) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created: [], updated: [] } } },
        polledNoChanges: true,
      };
    }

    const { client, loginData } = await getClient(
      params.connection,
      context.debug.enabled,
    );

    
    
    
    
    
    
    
    
    
    const allRecords = await fetchAllRecords(
      client,
      loginData,
      config.endpoint,
      [{ field: "updatedTime", op: ">", value: lastPolledAt }],
    );

    const { created, updated } = filterByTimestamp(
      allRecords,
      lastPolledAt,
      "createdTime",
      "updatedTime",
      params.showNewRecords,
      params.showUpdatedRecords,
    );

    const totalMatched = created.length + updated.length;

    context.logger.debug(
      `Polled ${allRecords.length} ${params.pollResourceType} records, ${created.length} created and ${updated.length} updated since last poll.`,
    );

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: {
        ...payload,
        body: {
          data: { created, updated },
        },
      },
      polledNoChanges: totalMatched === 0,
    };
  },
});
