import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteApplicationExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteApplicationInputs as inputs } from "../../inputs/application";
import { deleteApplicationOutputSchema } from "../../outputSchemas";

export const deleteApplication = action({
  display: {
    label: "Delete Application",
    description: "Deletes an application object.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, applicationObjectId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/applications/${applicationObjectId}`);
    return {
      data: {
        success: true,
        id: applicationObjectId,
        message: "Application deleted successfully",
      },
    };
  },
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteApplicationOutputSchema,
  }),
  examplePayload,
});
