import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteChangeMarkupFileExamplePayload } from "../../examplePayloads";
import { deleteChangeMarkupFileInputs } from "../../inputs";
import { deleteChangeMarkupFileOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteChangeMarkupFile = action({
  display: {
    label: "Delete Change Markup File",
    description: "Remove a markup file association from a change.",
  },
  inputs: deleteChangeMarkupFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteChangeMarkupFileOutputSchema,
  }),
  examplePayload: deleteChangeMarkupFileExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/changes/${util.types.toString(params.changeGuid)}/markupfiles/${util.types.toString(params.changeFileAssociationGuid)}`,
      );
      return {
        data: { success: true, message: "Markup file deleted successfully" },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Change Markup File");
    }
  },
});
