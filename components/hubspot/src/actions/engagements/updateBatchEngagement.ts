import { action, outputSchema } from "@prismatic-io/spectral";
import { batchResponseSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { updateBatchEngagementExamplePayload } from "../../examplePayloads";
import { updateBatchEngagementInputs } from "../../inputs";
export const updateBatchEngagement = action({
  display: {
    label: "Update Batch Engagement",
    description: "Updates a batch of selected engagements.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { timeout, hubspotConnection, engagementObject, batchInputs },
  ) => {
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
    const { data } = await client.post(
      `/crm/v3/objects/${engagementObject}/batch/update`,
      payload,
    );
    return {
      data,
    };
  },
  inputs: updateBatchEngagementInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: updateBatchEngagementExamplePayload.data,
  }),
  examplePayload: updateBatchEngagementExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: batchResponseSchema,
  }),
});
