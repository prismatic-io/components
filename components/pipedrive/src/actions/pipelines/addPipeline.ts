import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addPipelineInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addPipelineExamplePayload } from "../../examplePayloads";
import { addPipelineOutputSchema } from "../../outputSchemas";
export const addPipeline = action({
  display: {
    label: "Add Pipeline",
    description: "Adds a new pipeline.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, name, isDealProbabilityEnabled }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.post("/pipelines", {
      name,
      is_deal_probability_enabled: isDealProbabilityEnabled,
    });
    return { data };
  },
  inputs: addPipelineInputs,
  examplePayload: addPipelineExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addPipelineOutputSchema,
  }),
});
