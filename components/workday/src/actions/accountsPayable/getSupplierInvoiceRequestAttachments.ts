import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getSupplierInvoiceRequestAttachmentsExamplePayload } from "../../examplePayloads";
import { getSupplierInvoiceRequestAttachmentsInputs } from "../../inputs";

export const getSupplierInvoiceRequestAttachments = action({
  display: {
    label: "Get Supplier Invoice Request Attachments",
    description: "Retrieves all attachments associated with supplier invoices.",
  },
  perform: async (
    context,
    { connection, supplierInvoiceRequestId, limit, offset },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.accountsPayable}/supplierInvoiceRequests/${supplierInvoiceRequestId}/attachments`,
      { params: { limit, offset } },
    );
    return {
      data,
    };
  },
  inputs: getSupplierInvoiceRequestAttachmentsInputs,
  examplePayload: getSupplierInvoiceRequestAttachmentsExamplePayload,
});
