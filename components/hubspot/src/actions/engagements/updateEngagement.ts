import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { updateEngagementExamplePayload } from "../../examplePayloads";
import { updateEngagementInputs } from "../../inputs";
export const updateEngagement = action({
  display: {
    label: "Update Engagement",
    description:
      "Update a communication, email, call, meeting, note, postal mail or task engagement in HubSpot CRM.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      timeout,
      hubspotConnection,
      engagementObject,
      properties,
      engagementId,
      idProperty,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: { "Content-Type": "application/json" },
    });
    const payload = { properties };
    const { data } = await client.patch(
      `/crm/v3/objects/${engagementObject}/${engagementId}`,
      payload,
      { params: { idProperty: idProperty } },
    );
    return {
      data,
    };
  },
  inputs: updateEngagementInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: updateEngagementExamplePayload.data,
  }),
  examplePayload: updateEngagementExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
