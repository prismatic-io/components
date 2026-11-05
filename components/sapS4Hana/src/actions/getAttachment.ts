import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import {
  connectionInput,
  documentInfoRecordDocumentType,
  documentInfoRecordDocumentNumber,
  documentInfoRecordDocumentVersion,
  documentInfoRecordDocumentPart,
  filter,
  inlinecount,
  attachOrderBy,
  attachSelect,
} from "../inputs";

export const getAttachment = action({
  display: {
    label: "Get Attachment",
    description: "Reads the attachments associated with a document info record.",
  },
  perform: async (
    _context,
    {
      connectionInput,
      documentInfoRecordDocumentType,
      documentInfoRecordDocumentNumber,
      documentInfoRecordDocumentVersion,
      documentInfoRecordDocumentPart,
      filter,
      inlinecount,
      attachOrderBy,
      attachSelect,
    },
  ) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "*/*",
    };
    const client = getSapClient(connectionInput, headers);
    const orderByValue = (attachOrderBy as { value?: string })?.value;
    const selectValue = (attachSelect as { value?: string })?.value;
    try {
      const { data } = await client.get(
        `/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/A_DocumentInfoRecordAttch(DocumentInfoRecordDocType='${documentInfoRecordDocumentType}',DocumentInfoRecordDocNumber='${documentInfoRecordDocumentNumber}',DocumentInfoRecordDocVersion='${documentInfoRecordDocumentVersion}',DocumentInfoRecordDocPart='${documentInfoRecordDocumentPart}')/DocumentInfoRecordToAttachmentNavigation?${
          filter.length ? `$filter=${filter}&` : ""
        }${inlinecount.length ? `$inlinecount=${inlinecount}&` : ""}${
          orderByValue ? `$orderby=${orderByValue}&` : ""
        }${selectValue ? `$select=${selectValue}&` : ""}`,
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
    filter,
    inlinecount,
    attachOrderBy,
    attachSelect,
  },
});
