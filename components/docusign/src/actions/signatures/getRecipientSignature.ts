import { action, outputSchema } from "@prismatic-io/spectral";
import { getRecipientSignatureOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getRecipientSignatureInputs } from "../../inputs";
import { getRecipientSignatureExamplePayload } from "../../examplePayloads";

export const getRecipientSignature = action({
  display: {
    label: "Get Recipient Signature",
    description:
      "Retrieves signature information for a signer or sign-in-person recipient.",
  },
  performSafety: "safe",
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
  inputs: getRecipientSignatureInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getRecipientSignatureOutputSchema,
  }),
  examplePayload: getRecipientSignatureExamplePayload,
});
