import { action, outputSchema } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../../client";
import { queryInsightsSavedReportsInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { queryInsightsSavedReportsExamplePayload } from "../../examplePayloads";
import { queryInsightsSavedReportsOutputSchema } from "../../outputSchemas";
export const queryInsightsSavedReports = action({
  display: {
    label: "Query Insights Saved Reports",
    description: "Get data from Insights reports.",
  },
  inputs: queryInsightsSavedReportsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: queryInsightsSavedReportsOutputSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connection, regionAndDomain, bookmark_id, project_id, workspace_id },
  ) => {
    const client = createMixpanelClient(
      regionAndDomain,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const { data } = await client.get("/insights", {
      params: {
        bookmark_id,
        project_id,
        workspace_id,
      },
    });
    return {
      data,
    };
  },
  examplePayload: queryInsightsSavedReportsExamplePayload,
});
