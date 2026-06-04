import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { toggleSignatureVerificationInputs } from "../../inputs";
import { toggleSignatureVerificationExamplePayload } from "../../examplePayloads";
import { toggleSignatureVerificationHelper } from "../../helpers";

export const toggleSignatureVerification = action({
  display: {
    label: "Toggle Signature Verification",
    description:
      "Enable or disable signature verification for an Event Webhook.",
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
  examplePayload: toggleSignatureVerificationExamplePayload,
});
