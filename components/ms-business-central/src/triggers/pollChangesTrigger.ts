import { pollingTrigger } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs/polling";
import type { BusinessCentralRecord, PollingState } from "../interfaces";
import { fetchAllPagedSince } from "../utils";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records of a Microsoft Dynamics 365 Business Central entity on a configured schedule.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    
    
    
    
    
    const modifiedFilter = `lastModifiedDateTime gt ${lastPolledAt}`;
    const $filter = params.additionalFilter
      ? `(${params.additionalFilter}) and (${modifiedFilter})`
      : modifiedFilter;

    const client = getMsBusinessCentralClient(params.connection, context, context.debug.enabled);
    const { records, truncated } = await fetchAllPagedSince(
      client,
      `/companies(${params.companyId})/${config.endpoint}`,
      { $filter },
    );

    
    
    
    
    const created: BusinessCentralRecord[] = [];
    const updated: BusinessCentralRecord[] = params.showUpdatedRecords !== false ? records : [];

    
    
    
    
    let nextCursor = now;
    if (truncated) {
      const latestFetched = records
        .map((r) => r.lastModifiedDateTime)
        .filter((d): d is string => typeof d === "string")
        .sort()
        .pop();
      nextCursor = latestFetched ?? lastPolledAt;
      context.logger.warn(
        `Polling truncated at the page cap for ${params.pollResourceType} on company ${params.companyId}. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${params.pollResourceType} on company ${params.companyId}: ${records.length} fetched, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
