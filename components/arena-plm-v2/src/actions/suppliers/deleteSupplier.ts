import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteSupplierExamplePayload } from "../../examplePayloads";
import { deleteSupplierInputs } from "../../inputs";
import { deleteSupplierOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteSupplier = action({
  display: {
    label: "Delete Supplier",
    description:
      "Delete a supplier from Arena PLM system. This action cannot be undone.",
  },
  inputs: deleteSupplierInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSupplierOutputSchema,
  }),
  examplePayload: deleteSupplierExamplePayload,
  perform: async (context, { connection, supplierGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting supplier", {
        supplierGuid,
      });
      await client.delete(`/suppliers/${supplierGuid}`);
      context.logger.info(`Successfully deleted supplier: ${supplierGuid}`);
      return {
        data: {
          success: true,
          message: "Supplier deleted successfully",
          supplierGuid,
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Supplier");
    }
  },
});
