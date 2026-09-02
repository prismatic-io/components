import { action, outputSchema } from "@prismatic-io/spectral";
import { batchResponseSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createBatchEngagementExamplePayload } from "../../examplePayloads";
import { createBatchEngagementInputs } from "../../inputs";
export const createBatchEngagement = action({
  display: {
    label: "Create Batch Engagement",
    description: "Creates a batch of selected engagements.",
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
      `/crm/v3/objects/${engagementObject}/batch/create`,
      payload,
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createBatchEngagementExamplePayload.data,
  }),
  inputs: createBatchEngagementInputs,
  examplePayload: createBatchEngagementExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: batchResponseSchema,
  }),
});
