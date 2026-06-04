import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import {
  connection,
  envelopeId,
  documentId,
  certificate,
  documentsByUserid,
  encrypt,
  language,
  recipientId,
  sharedUserId,
  showChanges,
  watermark,
} from "../inputs";

export const getEnvelopeDocument = action({
  display: {
    label: "Get Envelope Document",
    description:
      "Retrieves a single document or all documents from an envelope.",
  },
  perform: async (
    context,
    {
      connection,
      envelopeId,
      documentId,
      certificate,
      documentsByUserid,
      encrypt,
      language,
      recipientId,
      sharedUserId,
      showChanges,
      watermark,
    },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/envelopes/${envelopeId}/documents/${documentId}`,
      {
        params: {
          certificate,
          documents_by_userid: documentsByUserid,
          encrypt,
          language: language || undefined,
          recipient_id: recipientId || undefined,
          shared_user_id: sharedUserId || undefined,
          show_changes: showChanges,
          watermark,
        },
      },
    );
    return { data };
  },
  inputs: {
    connection,
    envelopeId,
    documentId,
    certificate,
    documentsByUserid,
    encrypt,
    language,
    recipientId,
    sharedUserId,
    showChanges,
    watermark,
  },
});
