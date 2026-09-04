import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSupplierPhoneNumbersExamplePayload } from "../../examplePayloads";
import { listSupplierPhoneNumbersInputs } from "../../inputs";
import { listSupplierPhoneNumbersOutputSchema } from "../../outputSchemas";
import type { SupplierPhoneNumberVoResultRep } from "../../types";
import { handleArenaError } from "../../util";
export const listSupplierPhoneNumbers = action({
  display: {
    label: "List Supplier Phone Numbers",
    description:
      "Retrieve all phone numbers for a supplier from Arena PLM system.",
  },
  inputs: listSupplierPhoneNumbersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSupplierPhoneNumbersOutputSchema,
  }),
  examplePayload: listSupplierPhoneNumbersExamplePayload,
  perform: async (context, { connection, supplierGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const url = `/suppliers/${supplierGuid}/phonenumbers`;
      context.logger.info("Getting supplier phone numbers", {
        supplierGuid,
        endpoint: url,
      });
      const { data } = await client.get<SupplierPhoneNumberVoResultRep>(url);
      context.logger.info(
        `Successfully retrieved ${data.count || 0} phone numbers for supplier: ${supplierGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Supplier Phone Numbers");
    }
  },
});
