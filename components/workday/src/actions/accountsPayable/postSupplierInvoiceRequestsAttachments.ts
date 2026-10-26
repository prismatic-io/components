import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { DEFAULT_ATTACHMENT_FILE_NAME, SERVICES } from "../../constants";
import { postSupplierInvoiceRequestsAttachmentsExamplePayload } from "../../examplePayloads";
import { postSupplierInvoiceRequestsAttachmentsInputs } from "../../inputs";
import { createMultipartBody, getIdObject } from "../../util";
import { postSupplierInvoiceRequestsAttachmentsOutputSchema } from "../../outputSchemas";
export const postSupplierInvoiceRequestsAttachments = action({
  display: {
    label: "Create Supplier Invoice Request Attachment",
    description: "Creates attachments for the specified supplier invoice.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      supplierInvoiceRequestId,
      file,
      attachmentDetails = {},
      contentTypeId,
      supplierInvoiceRequestAttachmentId,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const fileName =
      attachmentDetails.fileName ??
      (file.suggestedExtension
        ? `${DEFAULT_ATTACHMENT_FILE_NAME}.${file.suggestedExtension}`
        : DEFAULT_ATTACHMENT_FILE_NAME);
    const { body, headers } = createMultipartBody(
      {
        fileName,
        fileLength: attachmentDetails.fileLength ?? file.data.length,
        contentType: getIdObject(contentTypeId),
        descriptor:
          attachmentDetails.supplierInvoiceRequestAttachmentDescriptor,
        id: supplierInvoiceRequestAttachmentId,
      },
      { payload: file, fileName },
    );
    const { data } = await client.post(
      `${SERVICES.accountsPayable}/supplierInvoiceRequests/${supplierInvoiceRequestId}/attachments`,
      body,
      { headers },
    );
    return {
      data,
    };
  },
  examplePerform: async () =>
    postSupplierInvoiceRequestsAttachmentsExamplePayload,
  inputs: postSupplierInvoiceRequestsAttachmentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postSupplierInvoiceRequestsAttachmentsOutputSchema,
  }),
  examplePayload: postSupplierInvoiceRequestsAttachmentsExamplePayload,
});
