import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postSupplierInvoiceRequestsAttachmentsExamplePayload } from "../../examplePayloads";
import { postSupplierInvoiceRequestsAttachmentsInputs } from "../../inputs";
import {
  createMultipartBody,
  getAttachmentFileName,
  getIdObject,
} from "../../util";
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
    const fileName = getAttachmentFileName(file, attachmentDetails.fileName);
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
