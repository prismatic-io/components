import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updatePipelineInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { updatePipelineExamplePayload } from "../../examplePayloads";
import { updatePipelineOutputSchema } from "../../outputSchemas";
export const updatePipeline = action({
  display: {
    label: "Update Pipeline",
    description: "Updates a pipeline.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, name, isDealProbabilityEnabled },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.patch(`/pipelines/${id}`, {
      name,
      is_deal_probability_enabled: isDealProbabilityEnabled,
    });
    return { data };
  },
  inputs: updatePipelineInputs,
  examplePayload: updatePipelineExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updatePipelineOutputSchema,
  }),
});
