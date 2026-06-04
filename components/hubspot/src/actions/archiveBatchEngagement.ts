import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { archiveBatchEngagementPayload } from "../examplePayloads";
import { connectionInput, engagementIds, engagementObject, timeout } from "../inputs";
import { getArrayOfObjectsWithKey } from "../util";

export const archiveBatchEngagement = action({
  display: {
    label: "Archive Batch Engagement",
    description: "Archives a batch of selected engagements by their IDs.",
  },
  perform: async (context, { timeout, hubspotConnection, engagementObject, engagementIds }) => {
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
      inputs: getArrayOfObjectsWithKey(engagementIds, "id"),
    };

    const { data } = await client.post(
      `/crm/v3/objects/${engagementObject}/batch/archive`,
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    engagementObject,
    engagementIds,
    timeout,
  },
  examplePayload: archiveBatchEngagementPayload,
});
