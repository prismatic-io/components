import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { createEngagementPayload } from "../examplePayloads";
import {
  associationsJson,
  connectionInput,
  engagementObject,
  properties,
  timeout,
} from "../inputs";

export const createEngagement = action({
  display: {
    label: "Create Engagement",
    description:
      "Create a communication, email, call, meeting, note, postal mail or task engagement in HubSpot CRM.",
  },
  perform: async (
    context,
    { timeout, hubspotConnection, engagementObject, associationsJson, properties },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: { "Content-Type": "application/json" },
    });

    const payload = { associations: associationsJson, properties };

    const { data } = await client.post(`/crm/v3/objects/${engagementObject}`, payload);

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    engagementObject,
    associationsJson,
    properties: {
      ...properties,
      comments:
        "A properties object, attributes depend on the engagement type. For possible properties for each engagement type refer to [HubSpot Engagements API](https://developers.hubspot.com/docs/api/crm/tasks).",
      example: JSON.stringify({
        hs_timestamp: "2019-10-30T03:30:17.883Z",
        hs_task_body: "Send Proposal",
        hubspot_owner_id: "64492917",
        hs_task_subject: "Follow-up for Brian Buyer",
        hs_task_status: "WAITING",
        hs_task_priority: "HIGH",
        hs_task_type: "CALL",
      }),
    },
    timeout,
  },
  examplePayload: createEngagementPayload,
});
