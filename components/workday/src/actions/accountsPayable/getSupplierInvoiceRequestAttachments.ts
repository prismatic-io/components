import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getSupplierInvoiceRequestAttachmentsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getSupplierInvoiceRequestAttachmentsInputs } from "../../inputs";
import { getSupplierInvoiceRequestAttachmentsOutputSchema } from "../../outputSchemas";
export const getSupplierInvoiceRequestAttachments = action({
  display: {
    label: "Get Supplier Invoice Request Attachments",
    description:
      "Retrieves all attachments for the specified supplier invoice request.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, supplierInvoiceRequestId, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.accountsPayable}/supplierInvoiceRequests/${supplierInvoiceRequestId}/attachments`,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () =>
    getSupplierInvoiceRequestAttachmentsExamplePayload,
  inputs: getSupplierInvoiceRequestAttachmentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSupplierInvoiceRequestAttachmentsOutputSchema,
  }),
  examplePayload: getSupplierInvoiceRequestAttachmentsExamplePayload,
});
