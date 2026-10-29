import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, envelopeId, recipientId } from "../inputs";

export const getRecipientSignature = action({
  display: {
    label: "Get Recipient Signature",
    description:
      "Retrieves signature information for a signer or sign-in-person recipient.",
  },
  perform: async (context, { connection, envelopeId, recipientId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/envelopes/${envelopeId}/recipients/${recipientId}/signature`,
    );
    return { data };
  },
  inputs: {
    connection,
    envelopeId,
    recipientId: {
      ...recipientId,
      required: true,
      comments:
        "A local reference used to map recipients to other objects, such as specific document tabs. A recipientId must be either an integer or a GUID, and the recipientId must be unique within an envelope.",
    },
  },
});
