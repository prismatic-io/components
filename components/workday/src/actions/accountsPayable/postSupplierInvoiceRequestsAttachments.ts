import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postSupplierInvoiceRequestsAttachmentsExamplePayload } from "../../examplePayloads";
import { postSupplierInvoiceRequestsAttachmentsInputs } from "../../inputs";
import { getIdObject } from "../../util";
export const postSupplierInvoiceRequestsAttachments = action({
  display: {
    label: "Create Supplier Invoice Request Attachment",
    description: "Creates attachments for the specified supplier invoice.",
  },
  perform: async (
    context,
    {
      connection,
      supplierInvoiceRequestId,
      attachmentDetails,
      contentTypeId,
      supplierInvoiceRequestAttachmentId,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      fileLength: attachmentDetails.fileLength,
      contentType: getIdObject(contentTypeId),
      fileName: attachmentDetails.fileName,
      descriptor: attachmentDetails.supplierInvoiceRequestAttachmentDescriptor,
      id: supplierInvoiceRequestAttachmentId,
    };
    const { data } = await client.post(
      `${SERVICES.accountsPayable}/supplierInvoiceRequests/${supplierInvoiceRequestId}/attachments`,
      body,
    );
    return {
      data,
    };
  },
  inputs: postSupplierInvoiceRequestsAttachmentsInputs,
  examplePayload: postSupplierInvoiceRequestsAttachmentsExamplePayload,
});
