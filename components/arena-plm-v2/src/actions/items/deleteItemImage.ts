import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteItemImageExamplePayload } from "../../examplePayloads";
import { deleteItemImageInputs } from "../../inputs";
import { deleteItemImageOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteItemImage = action({
  display: {
    label: "Delete Item Image",
    description: "Remove the thumbnail image from an item.",
  },
  inputs: deleteItemImageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteItemImageOutputSchema,
  }),
  examplePayload: deleteItemImageExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      await client.delete(
        `/items/${util.types.toString(params.itemGuid)}/image`,
      );
      return {
        data: { success: true, message: "Image deleted successfully" },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Item Image");
    }
  },
});
