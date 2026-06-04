import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listSupplierInvoiceRequestsExamplePayload } from "../../examplePayloads";
import { listSupplierInvoiceRequestsInputs } from "../../inputs";

export const listSupplierInvoiceRequests = action({
  display: {
    label: "List Supplier Invoice Requests",
    description: "Retrieves all supplier invoices.",
  },
  perform: async (context, { connection, params, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.accountsPayable}/supplierInvoiceRequests`,
      { params: { limit, offset, ...params } },
    );
    return {
      data,
    };
  },
  inputs: listSupplierInvoiceRequestsInputs,
  examplePayload: listSupplierInvoiceRequestsExamplePayload,
});
