import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteSupplierFileAssociationExamplePayload } from "../../examplePayloads";
import { deleteSupplierFileAssociationInputs } from "../../inputs";
import { deleteSupplierFileAssociationOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteSupplierFileAssociation = action({
  display: {
    label: "Delete Supplier File Association",
    description:
      "Delete a file association from a supplier in Arena PLM system. This action cannot be undone.",
  },
  inputs: deleteSupplierFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSupplierFileAssociationOutputSchema,
  }),
  examplePayload: deleteSupplierFileAssociationExamplePayload,
  perform: async (
    context,
    { connection, supplierGuid, supplierFileAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting supplier file association", {
        supplierGuid,
        supplierFileAssociationGuid,
      });
      await client.delete(
        `/suppliers/${supplierGuid}/files/${supplierFileAssociationGuid}`,
      );
      context.logger.info(
        `Successfully deleted file association: ${supplierFileAssociationGuid} from supplier: ${supplierGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Supplier file association deleted successfully",
          supplierGuid,
          supplierFileAssociationGuid,
        },
      };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Delete Supplier File Association",
      );
    }
  },
});
