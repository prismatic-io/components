import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { REST_RESOURCE_CONFIG } from "../constants";
import { pollRecordsExamplePayload } from "../examplePayloads/triggers";
import { pollRecordsInputs } from "../inputs/triggers";
import type { PollingState } from "../types";
import { fetchRecordsSince } from "../util";
export const pollRecordsTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected Oracle HCM resource type on a configured schedule.",
  },
  allowsBranching: false,
  examplePayload: pollRecordsExamplePayload,
  inputs: pollRecordsInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
    const resourceConfig = REST_RESOURCE_CONFIG[params.resourceType];
    if (!resourceConfig) {
      throw new Error(`Unknown resource type: ${params.resourceType}`);
    }
    const client = createClient(params.connection, context.debug.enabled);
    const records = await fetchRecordsSince(
      client,
      resourceConfig.endpoint,
      lastPolledAt,
      params.pageSize,
    );
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled '${params.resourceType}': ${records.length} records updated since ${lastPolledAt}`,
      );
    }
    return {
      payload: {
        ...payload,
        body: { data: { records, resourceType: params.resourceType } },
      } as typeof payload,
      polledNoChanges: records.length === 0,
    };
  },
});
