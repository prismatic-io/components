import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealsSummaryInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getDealsSummaryExamplePayload } from "../../examplePayloads";
import { getDealsSummaryOutputSchema } from "../../outputSchemas";
export const getDealsSummary = action({
  display: {
    label: "Get Deals Summary",
    description: "Gets a summary of deals.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { connection, status, filterId, userId, stageId },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/deals/summary", {
      params: {
        status,
        filter_id: filterId,
        user_id: userId,
        stage_id: stageId,
      },
    });
    return { data };
  },
  inputs: getDealsSummaryInputs,
  examplePayload: getDealsSummaryExamplePayload,
  examplePerform: async () => getDealsSummaryExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealsSummaryOutputSchema,
  }),
});
