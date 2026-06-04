import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import {
  connectionInput,
  documentInfoRecordDocumentType,
  documentInfoRecordDocumentNumber,
  documentInfoRecordDocumentVersion,
  documentInfoRecordDocumentPart,
  logicalDocument,
  archiveDocumentId,
  linkedSapObjectKey,
  businessObjectTypeName,
} from "../inputs";

export const deleteAttachment = action({
  display: {
    label: "Delete Attachment",
    description:
      "Deletes the attachment associated with the business object using the document type, document number, document version, document part, logical document ID, archive document ID, business object type, and business object instance key.",
  },
  perform: async (
    _context,
    {
      connectionInput,
      documentInfoRecordDocumentType,
      documentInfoRecordDocumentNumber,
      documentInfoRecordDocumentVersion,
      documentInfoRecordDocumentPart,
      logicalDocument,
      archiveDocumentId,
      linkedSapObjectKey,
      businessObjectTypeName,
    },
  ) => {
    const headers = {
      Accept: "*/*",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.delete(
        `/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/AttachmentContentSet(DocumentInfoRecordDocType='${documentInfoRecordDocumentType}',DocumentInfoRecordDocNumber='${documentInfoRecordDocumentNumber}',DocumentInfoRecordDocVersion='${documentInfoRecordDocumentVersion}',DocumentInfoRecordDocPart='${documentInfoRecordDocumentPart}',LogicalDocument='${logicalDocument}',ArchiveDocumentID='${archiveDocumentId}',LinkedSAPObjectKey='${linkedSapObjectKey}',BusinessObjectTypeName='${businessObjectTypeName}')`,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connectionInput,
    documentInfoRecordDocumentType,
    documentInfoRecordDocumentNumber,
    documentInfoRecordDocumentVersion,
    documentInfoRecordDocumentPart,
    logicalDocument,
    archiveDocumentId,
    linkedSapObjectKey,
    businessObjectTypeName,
  },
});
