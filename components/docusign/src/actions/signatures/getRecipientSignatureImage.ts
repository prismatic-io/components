import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../../client";
import { getRecipientSignatureImageInputs } from "../../inputs";

export const getRecipientSignatureImage = action({
  display: {
    label: "Get Recipient Signature Image",
    description: "Retrieves the specified user signature image.",
  },
  performSafety: "safe",
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
  inputs: getRecipientSignatureImageInputs,
});
