import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import {
  connection,
  documentName,
  envelopeId,
  documentId,
  pdfBuffer,
} from "../inputs";

export const updateEnvelopeDocument = action({
  display: {
    label: "Update Envelope Document",
    description:
      "Adds or replaces a document in an existing draft or in-process envelope.",
  },
  perform: async (
    context,
    { connection, documentName, envelopeId, documentId, pdfBuffer },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const headers = {
      "Content-Disposition": `filename="${documentName}"`,
      "Content-Type": "application/pdf",
    };
    const { data } = await client.put(
      `/envelopes/${envelopeId}/documents/${documentId}`,
      pdfBuffer,
      { headers },
    );
    return { data };
  },
  inputs: {
    connection,
    documentName,
    envelopeId,
    documentId: {
      ...documentId,
      comments: "The unique ID of the document within the envelope.",
    },
    pdfBuffer,
  },
});
