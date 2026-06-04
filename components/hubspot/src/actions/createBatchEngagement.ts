import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { createBatchEngagementPayload } from "../examplePayloads";
import { batchInputs, connectionInput, engagementObject, timeout } from "../inputs";

export const createBatchEngagement = action({
  display: {
    label: "Create Batch Engagement",
    description: "Creates a batch of selected engagements.",
  },
  perform: async (context, { timeout, hubspotConnection, engagementObject, batchInputs }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload = {
      inputs: batchInputs,
    };

    const { data } = await client.post(`/crm/v3/objects/${engagementObject}/batch/create`, payload);

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    engagementObject,
    batchInputs,
    timeout,
  },
  examplePayload: createBatchEngagementPayload,
});
