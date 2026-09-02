import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { deleteEngagementExamplePayload } from "../../examplePayloads";
import { deleteEngagementInputs } from "../../inputs";
export const deleteEngagement = action({
  display: {
    label: "Delete Engagement",
    description: "Deletes an engagement by its ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { timeout, hubspotConnection, engagementObject, engagementId },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.delete(
      `/crm/v3/objects/${engagementObject}/${engagementId}`,
    );
    return {
      data,
    };
  },
  inputs: deleteEngagementInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteEngagementExamplePayload.data,
  }),
  examplePayload: deleteEngagementExamplePayload,
});
