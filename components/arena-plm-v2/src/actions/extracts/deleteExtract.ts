import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteExtractExamplePayload } from "../../examplePayloads";
import { deleteExtractInputs } from "../../inputs";
import { deleteExtractOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteExtract = action({
  display: {
    label: "Delete Extract",
    description: "Delete an extract definition.",
  },
  inputs: deleteExtractInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteExtractOutputSchema,
  }),
  examplePayload: deleteExtractExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(`/extracts/${params.extractGuid}`);
      return {
        data: { success: true, message: "Extract deleted successfully" },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Delete Extract");
    }
  },
});
