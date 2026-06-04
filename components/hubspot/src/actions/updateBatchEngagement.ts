import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { updateBatchEngagementPayload } from "../examplePayloads";
import { batchInputs, connectionInput, engagementObject, timeout } from "../inputs";

export const updateBatchEngagement = action({
  display: {
    label: "Update Batch Engagement",
    description: "Updates a batch of selected engagements.",
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

    const { data } = await client.post(`/crm/v3/objects/${engagementObject}/batch/update`, payload);

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    engagementObject,
    batchInputs: {
      ...batchInputs,
      comments:
        "An array of engagement objects to update. Each engagement object must contain the required properties for the specified engagement type. See [HubSpot Engagements API](https://developers.hubspot.com/docs/api/crm/tasks) for more information.",
      example: JSON.stringify([
        {
          id: "string",
          properties: {
            hs_task_body: "Send Proposal",
            hs_timestamp: "2019-10-30T03:30:17.883Z",
            hs_task_status: "WAITING",
            hs_task_subject: "Follow-up for Brian Buyer",
            hs_task_priority: "HIGH",
            hubspot_owner_id: "64492917",
          },
        },
      ]),
    },
    timeout,
  },
  examplePayload: updateBatchEngagementPayload,
});
