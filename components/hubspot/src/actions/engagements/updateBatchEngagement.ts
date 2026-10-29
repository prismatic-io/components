import { action, outputSchema } from "@prismatic-io/spectral";
import { batchResponseSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { updateBatchEngagementExamplePayload } from "../../examplePayloads";
import { updateBatchEngagementInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";

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
      hubspotPaths.objects(engagementObject, "/batch/update"),
      payload,
    );

    return {
      data,
    };
  },
  inputs: updateBatchEngagementInputs,
  examplePerform: async () => ({
    data: updateBatchEngagementExamplePayload.data,
  }),
  examplePayload: updateBatchEngagementExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: batchResponseSchema,
  }),
});
