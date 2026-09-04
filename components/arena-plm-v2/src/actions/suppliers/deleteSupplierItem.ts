import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteSupplierItemExamplePayload } from "../../examplePayloads";
import { deleteSupplierItemInputs } from "../../inputs";
import { deleteSupplierItemOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteSupplierItem = action({
  display: {
    label: "Delete Supplier Item",
    description:
      "Delete a specific supplier item from Arena PLM system using its GUID.",
  },
  inputs: deleteSupplierItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSupplierItemOutputSchema,
  }),
  examplePayload: deleteSupplierItemExamplePayload,
  perform: async (context, { connection, supplierItemGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting supplier item", {
        supplierItemGuid,
        endpoint: `/supplieritems/${supplierItemGuid}`,
      });
      const response = await client.delete(
        `/supplieritems/${supplierItemGuid}`,
      );
      context.logger.info("Successfully deleted supplier item", {
        supplierItemGuid,
        statusCode: response.status,
      });
      return {
        data: {
          success: true,
          message: `Supplier item with GUID ${supplierItemGuid} has been successfully deleted`,
          guid: supplierItemGuid,
        },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Delete Supplier Item");
    }
  },
});
