import { pollingTrigger } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesInputs } from "../inputs/polling";
import type { PollingState, Sage200Record } from "../types";
import { filterByTimestamp } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description: "Checks for new and updated records in Sage 200 on a configured schedule.",
  },
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
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

    const client = getClient(params.connection, context.debug.enabled, params.site, params.company);

    
    
    
    const { data } = await client.get<Sage200Record[]>(config.endpoint, {
      params: { $filter: `date_time_updated gt ${lastPolledAt}` },
    });
    const allRecords = Array.isArray(data) ? data : [];

    const { created, updated } = filterByTimestamp(
      allRecords,
      lastPolledAt,
      params.showNewRecords,
      params.showUpdatedRecords,
    );

    const totalMatched = created.length + updated.length;

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${allRecords.length} ${params.pollResourceType} records, ${totalMatched} matched since last poll (${created.length} created, ${updated.length} updated).`,
      );
    }

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
