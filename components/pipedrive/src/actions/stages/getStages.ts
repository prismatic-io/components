import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getStagesInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getStagesExamplePayload } from "../../examplePayloads";
import { getStagesOutputSchema } from "../../outputSchemas";
export const getStages = action({
  display: {
    label: "Get Stages",
    description: "Gets all stages.",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      connection,
      pipelineId,
      sortBy,
      sortDirection,
      pagination: { limit, cursor } = {},
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/stages", {
      params: {
        pipeline_id: pipelineId,
        sort_by: sortBy,
        sort_direction: sortDirection,
        limit,
        cursor,
      },
    });
    return { data };
  },
  inputs: getStagesInputs,
  examplePayload: getStagesExamplePayload,
  examplePerform: async () => getStagesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getStagesOutputSchema,
  }),
});
