import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createEngagementExamplePayload } from "../../examplePayloads";
import { createEngagementInputs } from "../../inputs";
export const createEngagement = action({
  display: {
    label: "Create Engagement",
    description:
      "Create a communication, email, call, meeting, note, postal mail or task engagement in HubSpot CRM.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      timeout,
      hubspotConnection,
      engagementObject,
      associationsJson,
      properties,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: { "Content-Type": "application/json" },
    });
    const payload = { associations: associationsJson, properties };
    const { data } = await client.post(
      `/crm/v3/objects/${engagementObject}`,
      payload,
    );
    return {
      data,
    };
  },
  inputs: createEngagementInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createEngagementExamplePayload.data,
  }),
  examplePayload: createEngagementExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
