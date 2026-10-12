import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePipelineInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deletePipelineExamplePayload } from "../../examplePayloads";
import { deletePipelineOutputSchema } from "../../outputSchemas";
export const deletePipeline = action({
  display: {
    label: "Delete Pipeline",
    description: "Deletes a pipeline.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(`/pipelines/${id}`);
    return { data };
  },
  inputs: deletePipelineInputs,
  examplePayload: deletePipelineExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePipelineOutputSchema,
  }),
});
