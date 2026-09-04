import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createSupplierPhoneNumberExamplePayload } from "../../examplePayloads";
import { createSupplierPhoneNumberInputs } from "../../inputs";
import { supplierPhoneNumberSchema } from "../../outputSchemas";
import type {
  SupplierPhoneNumberCreateVo,
  SupplierPhoneNumberVo,
} from "../../types";
import { handleArenaError } from "../../util";
export const createSupplierPhoneNumber = action({
  display: {
    label: "Create Supplier Phone Number",
    description: "Add a phone number to a supplier in Arena PLM system.",
  },
  inputs: createSupplierPhoneNumberInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierPhoneNumberSchema,
  }),
  examplePayload: createSupplierPhoneNumberExamplePayload,
  perform: async (
    context,
    { connection, supplierGuid, label, number, extension, comment },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const phoneNumberPayload: SupplierPhoneNumberCreateVo = {
        number,
      };
      if (label) {
        phoneNumberPayload.label = label;
      }
      if (extension) {
        phoneNumberPayload.extension = extension;
      }
      if (comment) {
        phoneNumberPayload.comment = comment;
      }
      context.logger.info("Adding phone number to supplier", {
        supplierGuid,
        hasExtension: !!extension,
        hasComment: !!comment,
      });
      const { data } = await client.post<SupplierPhoneNumberVo>(
        `/suppliers/${supplierGuid}/phonenumbers`,
        phoneNumberPayload,
      );
      context.logger.info(
        `Successfully added phone number to supplier: ${supplierGuid} - ${data.label || "No Label"} (${data.guid})`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Supplier Phone Number");
    }
  },
});
