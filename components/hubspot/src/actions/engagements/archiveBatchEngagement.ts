import { action, outputSchema } from "@prismatic-io/spectral";
import { batchArchiveResponseSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { archiveBatchEngagementExamplePayload } from "../../examplePayloads";
import { archiveBatchEngagementInputs } from "../../inputs";
import { getArrayOfObjectsWithKey } from "../../util";
export const archiveBatchEngagement = action({
  display: {
    label: "Archive Batch Engagement",
    description: "Archives a batch of selected engagements by their IDs.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { timeout, hubspotConnection, engagementObject, engagementIds },
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
  inputs: archiveBatchEngagementInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: archiveBatchEngagementExamplePayload.data,
  }),
  examplePayload: archiveBatchEngagementExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: batchArchiveResponseSchema,
  }),
});
