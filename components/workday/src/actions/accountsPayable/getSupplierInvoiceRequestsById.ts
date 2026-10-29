import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getSupplierInvoiceRequestsByIdExamplePayload } from "../../examplePayloads";
import { getSupplierInvoiceRequestsByIdInputs } from "../../inputs";
import { getSupplierInvoiceRequestsByIdOutputSchema } from "../../outputSchemas";

export const getSupplierInvoiceRequestsById = action({
  display: {
    label: "Get Supplier Invoice Request by ID",
    description:
      "Retrieves the supplier invoice request with the specified ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, supplierInvoiceRequestId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.accountsPayable}/supplierInvoiceRequests/${supplierInvoiceRequestId}`,
    );
    return {
      data,
    };
  },
  inputs: getSupplierInvoiceRequestsByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSupplierInvoiceRequestsByIdOutputSchema,
  }),
  examplePayload: getSupplierInvoiceRequestsByIdExamplePayload,
});
