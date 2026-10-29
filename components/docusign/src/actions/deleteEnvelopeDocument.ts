import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, envelopeId, documentIds } from "../inputs";
import { deleteEnvelopePayload } from "../examplePayloads";

export const deleteEnvelopeDocument = action({
  display: {
    label: "Delete Envelope Document",
    description:
      "Deletes one or more documents from an existing envelope that has not yet been completed.",
  },
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
  inputs: {
    connection,
    envelopeId,
    documentIds,
  },
  examplePayload: deleteEnvelopePayload,
});
