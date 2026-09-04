import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteSupplierAddressExamplePayload } from "../../examplePayloads";
import { deleteSupplierAddressInputs } from "../../inputs";
import { deleteSupplierAddressOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteSupplierAddress = action({
  display: {
    label: "Delete Supplier Address",
    description:
      "Delete an address from a supplier in Arena PLM system. This action cannot be undone.",
  },
  inputs: deleteSupplierAddressInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSupplierAddressOutputSchema,
  }),
  examplePayload: deleteSupplierAddressExamplePayload,
  perform: async (context, { connection, supplierGuid, addressGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting supplier address", {
        supplierGuid,
        addressGuid,
      });
      await client.delete(
        `/suppliers/${supplierGuid}/addresses/${addressGuid}`,
      );
      context.logger.info(
        `Successfully deleted address: ${addressGuid} from supplier: ${supplierGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Supplier address deleted successfully",
          supplierGuid,
          addressGuid,
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Supplier Address");
    }
  },
});
