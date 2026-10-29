import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listSupplierInvoiceRequestsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { listSupplierInvoiceRequestsInputs } from "../../inputs";
import { listSupplierInvoiceRequestsOutputSchema } from "../../outputSchemas";

export const listSupplierInvoiceRequests = action({
  display: {
    label: "List Supplier Invoice Requests",
    description: "Retrieves all supplier invoice requests.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.accountsPayable}/supplierInvoiceRequests`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => listSupplierInvoiceRequestsExamplePayload,
  inputs: listSupplierInvoiceRequestsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSupplierInvoiceRequestsOutputSchema,
  }),
  examplePayload: listSupplierInvoiceRequestsExamplePayload,
});
