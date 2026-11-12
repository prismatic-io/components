import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteEnvelopeDocumentOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { deleteEnvelopeDocumentInputs } from "../../inputs";
import { deleteEnvelopeDocumentExamplePayload } from "../../examplePayloads";

export const deleteEnvelopeDocument = action({
  display: {
    label: "Delete Envelope Document",
    description:
      "Deletes one or more documents from an existing envelope that has not yet been completed.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, envelopeId, documentIds }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/envelopes/${envelopeId}/documents`, {
      data: {
        documents: documentIds,
      },
    });
    return { data };
  },
  examplePerform: async () => deleteEnvelopeDocumentExamplePayload,
  inputs: deleteEnvelopeDocumentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteEnvelopeDocumentOutputSchema,
  }),
  examplePayload: deleteEnvelopeDocumentExamplePayload,
});
