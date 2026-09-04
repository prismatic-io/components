import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateSupplierPhoneNumberExamplePayload } from "../../examplePayloads";
import { updateSupplierPhoneNumberInputs } from "../../inputs";
import { supplierPhoneNumberSchema } from "../../outputSchemas";
import type {
  SupplierPhoneNumberCreateVo,
  SupplierPhoneNumberVo,
} from "../../types";
import { handleArenaError } from "../../util";
export const updateSupplierPhoneNumber = action({
  display: {
    label: "Update Supplier Phone Number",
    description: "Update a phone number for a supplier in Arena PLM system.",
  },
  inputs: updateSupplierPhoneNumberInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierPhoneNumberSchema,
  }),
  examplePayload: updateSupplierPhoneNumberExamplePayload,
  perform: async (
    context,
    {
      connection,
      supplierGuid,
      phoneNumberGuid,
      label,
      number,
      extension,
      comment,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const phoneNumberPayload: SupplierPhoneNumberCreateVo = {};
      if (label !== undefined && label !== null) {
        phoneNumberPayload.label = label;
      }
      if (number !== undefined && number !== null) {
        phoneNumberPayload.number = number;
      }
      if (extension !== undefined && extension !== null) {
        phoneNumberPayload.extension = extension;
      }
      if (comment !== undefined && comment !== null) {
        phoneNumberPayload.comment = comment;
      }
      context.logger.info("Updating supplier phone number", {
        supplierGuid,
        phoneNumberGuid,
        hasExtension: !!extension,
        hasComment: !!comment,
      });
      const { data } = await client.put<SupplierPhoneNumberVo>(
        `/suppliers/${supplierGuid}/phonenumbers/${phoneNumberGuid}`,
        phoneNumberPayload,
      );
      context.logger.info(
        `Successfully updated phone number for supplier: ${supplierGuid} - ${data.label || "No Label"} (${data.guid})`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Supplier Phone Number");
    }
  },
});
