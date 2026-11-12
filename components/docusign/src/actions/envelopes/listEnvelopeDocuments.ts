import { action, outputSchema } from "@prismatic-io/spectral";
import { listEnvelopeDocumentsOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { listEnvelopeDocumentsInputs } from "../../inputs";
import { listEnvelopeDocumentsExamplePayload } from "../../examplePayloads";

export const listEnvelopeDocuments = action({
  display: {
    label: "List Envelope Documents",
    description:
      "Retrieves a list of documents associated with the specified envelope.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      envelopeId,
      documentsByUserid,
      includeMetadata,
      includeTabs,
      recipientId,
      sharedUserId,
    },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/envelopes/${envelopeId}/documents`, {
      params: {
        documents_by_userid: documentsByUserid,
        include_metadata: includeMetadata,
        include_tabs: includeTabs,
        recipient_id: recipientId || undefined,
        shared_user_id: sharedUserId || undefined,
      },
    });
    return { data };
  },
  examplePerform: async () => listEnvelopeDocumentsExamplePayload,
  inputs: listEnvelopeDocumentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEnvelopeDocumentsOutputSchema,
  }),
  examplePayload: listEnvelopeDocumentsExamplePayload,
});
