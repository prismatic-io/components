import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getSupplierInvoiceRequestsByIdExamplePayload } from "../../examplePayloads";
import { getSupplierInvoiceRequestsByIdInputs } from "../../inputs";

export const getSupplierInvoiceRequestsById = action({
  display: {
    label: "Get Supplier Invoice Request by ID",
    description: "Retrieves the supplier invoice with the specified ID.",
  },
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
  examplePayload: getSupplierInvoiceRequestsByIdExamplePayload,
});
