import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { deleteEngagementPayload } from "../examplePayloads";
import { connectionInput, engagementId, engagementObject, timeout } from "../inputs";

export const deleteEngagement = action({
  display: {
    label: "Delete Engagement",
    description: "Deletes an engagement by its ID.",
  },
  perform: async (context, { timeout, hubspotConnection, engagementObject, engagementId }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const { data } = await client.delete(`/crm/v3/objects/${engagementObject}/${engagementId}`);

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    engagementObject,
    engagementId,
    timeout,
  },
  examplePayload: deleteEngagementPayload,
});
