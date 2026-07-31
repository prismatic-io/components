import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { toggleSignatureVerificationExamplePayload } from "../../examplePayloads";
import { toggleSignatureVerificationHelper } from "../../helpers";
import { toggleSignatureVerificationInputs } from "../../inputs";
import { toggleSignatureVerificationOutputSchema } from "../../outputSchemas";
export const toggleSignatureVerification = action({
  display: {
    label: "Toggle Signature Verification",
    description:
      "Enables or disables signature verification for an Event Webhook.",
  },
  inputs: toggleSignatureVerificationInputs,
  perform: async (_context, { sendGridConnection, webhookId, enabled }) => {
    const client = createAuthorizedClient(sendGridConnection);
    const data = await toggleSignatureVerificationHelper(client, {
      webhookId,
      enabled,
    });
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: toggleSignatureVerificationOutputSchema,
  }),
  examplePayload: toggleSignatureVerificationExamplePayload,
});
