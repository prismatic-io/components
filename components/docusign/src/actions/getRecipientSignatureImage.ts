import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, envelopeId, recipientId, includeChrome } from "../inputs";

export const getRecipientSignatureImage = action({
  display: {
    label: "Get Recipient Signature Image",
    description: "Retrieves the specified user signature image.",
  },
  perform: async (
    context,
    { connection, envelopeId, recipientId, includeChrome },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/envelopes/${envelopeId}/recipients/${recipientId}/signature_image`,
      { params: { include_chrome: includeChrome } },
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
    includeChrome,
  },
});
