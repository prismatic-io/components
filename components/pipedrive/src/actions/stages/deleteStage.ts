import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteStageInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteStageExamplePayload } from "../../examplePayloads";
import { deleteStageOutputSchema } from "../../outputSchemas";
export const deleteStage = action({
  display: {
    label: "Delete Stage",
    description: "Deletes a stage.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(`/stages/${id}`);
    return { data };
  },
  inputs: deleteStageInputs,
  examplePayload: deleteStageExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteStageOutputSchema,
  }),
});
