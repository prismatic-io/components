import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteItemExamplePayload } from "../../examplePayloads";
import { deleteItemInputs } from "../../inputs";
import { deleteItemOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteItem = action({
  display: {
    label: "Delete Item",
    description:
      "Delete an existing item from Arena PLM system with the specified GUID.",
  },
  inputs: deleteItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteItemOutputSchema,
  }),
  examplePayload: deleteItemExamplePayload,
  perform: async (context, { connection, itemGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting item from Arena", {
        itemGuid: itemGuid,
      });
      const { status } = await client.delete(`/items/${itemGuid}`);
      context.logger.info("Item deleted successfully", {
        itemGuid: itemGuid,
        statusCode: status,
      });
      return {
        data: {
          success: true,
          itemGuid: itemGuid,
          message: "Item deleted successfully",
          statusCode: status,
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Item");
    }
  },
});
