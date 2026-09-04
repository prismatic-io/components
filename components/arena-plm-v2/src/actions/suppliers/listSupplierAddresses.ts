import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSupplierAddressesExamplePayload } from "../../examplePayloads";
import { listSupplierAddressesInputs } from "../../inputs";
import { listSupplierAddressesOutputSchema } from "../../outputSchemas";
import type { SupplierAddressCompactVoResultRep } from "../../types";
import { handleArenaError } from "../../util";
export const listSupplierAddresses = action({
  display: {
    label: "List Supplier Addresses",
    description: "Retrieve all addresses for a supplier from Arena PLM system.",
  },
  inputs: listSupplierAddressesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSupplierAddressesOutputSchema,
  }),
  examplePayload: listSupplierAddressesExamplePayload,
  perform: async (context, { connection, supplierGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const url = `/suppliers/${supplierGuid}/addresses`;
      context.logger.info("Getting supplier addresses", {
        supplierGuid,
        endpoint: url,
      });
      const { data } = await client.get<SupplierAddressCompactVoResultRep>(url);
      context.logger.info(
        `Successfully retrieved ${data.count || 0} addresses for supplier: ${supplierGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Supplier Addresses");
    }
  },
});
