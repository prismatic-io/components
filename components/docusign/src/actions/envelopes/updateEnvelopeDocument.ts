import { action, outputSchema } from "@prismatic-io/spectral";
import { updateEnvelopeDocumentOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { updateEnvelopeDocumentInputs } from "../../inputs";
import { updateEnvelopeDocumentExamplePayload } from "../../examplePayloads";

export const updateEnvelopeDocument = action({
  display: {
    label: "Update Envelope Document",
    description:
      "Adds or replaces a document in an existing draft or in-process envelope.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async () => updateEnvelopeDocumentExamplePayload,
  inputs: updateEnvelopeDocumentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateEnvelopeDocumentOutputSchema,
  }),
  examplePayload: updateEnvelopeDocumentExamplePayload,
});
