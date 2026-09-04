import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteSupplierPhoneNumberExamplePayload } from "../../examplePayloads";
import { deleteSupplierPhoneNumberInputs } from "../../inputs";
import { deleteSupplierPhoneNumberOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteSupplierPhoneNumber = action({
  display: {
    label: "Delete Supplier Phone Number",
    description:
      "Delete a phone number from a supplier in Arena PLM system. This action cannot be undone.",
  },
  inputs: deleteSupplierPhoneNumberInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSupplierPhoneNumberOutputSchema,
  }),
  examplePayload: deleteSupplierPhoneNumberExamplePayload,
  perform: async (context, { connection, supplierGuid, phoneNumberGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting supplier phone number", {
        supplierGuid,
        phoneNumberGuid,
      });
      await client.delete(
        `/suppliers/${supplierGuid}/phonenumbers/${phoneNumberGuid}`,
      );
      context.logger.info(
        `Successfully deleted phone number: ${phoneNumberGuid} from supplier: ${supplierGuid}`,
      );
      return {
        data: {
          success: true,
          message: "Supplier phone number deleted successfully",
          supplierGuid,
          phoneNumberGuid,
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Supplier Phone Number");
    }
  },
});
