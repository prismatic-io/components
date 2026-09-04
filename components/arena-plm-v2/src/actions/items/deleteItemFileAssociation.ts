import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteItemFileAssociationExamplePayload } from "../../examplePayloads";
import { deleteItemFileAssociationInputs } from "../../inputs";
import { deleteItemFileAssociationOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteItemFileAssociation = action({
  display: {
    label: "Delete Item File Association",
    description: "Delete an item file association from Arena PLM system.",
  },
  inputs: deleteItemFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteItemFileAssociationOutputSchema,
  }),
  examplePayload: deleteItemFileAssociationExamplePayload,
  perform: async (
    context,
    { connection, itemGuid, itemFileAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting item file association", {
        itemGuid,
        itemFileAssociationGuid,
      });
      await client.delete(
        `/items/${itemGuid}/files/${itemFileAssociationGuid}`,
      );
      context.logger.info("Item file association deleted successfully", {
        itemGuid,
        itemFileAssociationGuid,
      });
      return {
        data: {
          success: true,
          message: "Item file association deleted successfully",
          itemGuid,
          itemFileAssociationGuid,
        },
      };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        `Delete Item File Association (${itemGuid}/${itemFileAssociationGuid})`,
      );
    }
  },
});
