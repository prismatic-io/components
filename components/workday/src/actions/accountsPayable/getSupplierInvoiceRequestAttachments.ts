import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getSupplierInvoiceRequestAttachmentsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getSupplierInvoiceRequestAttachmentsInputs } from "../../inputs";
export const getSupplierInvoiceRequestAttachments = action({
  display: {
    label: "Get Supplier Invoice Request Attachments",
    description: "Retrieves all attachments associated with supplier invoices.",
  },
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
  inputs: getSupplierInvoiceRequestAttachmentsInputs,
  examplePayload: getSupplierInvoiceRequestAttachmentsExamplePayload,
});
