import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { registerWebhookExamplePayload } from "../../examplePayloads/webhooks";
import { registerWebhookInputs } from "../../inputs";






export const registerWebhook = action({
  display: {
    label: "Register Webhook",
    description: "Register a new webhook endpoint.",
  },
  inputs: registerWebhookInputs,
  perform: async (
    context,
    { ssvConnection, accountId, customerId, name, url },
  ) => {
    const client = await createSsvClient(ssvConnection, context);

    const requestData = {
      customer_id: customerId,
      name,
      url,
    };

    const { data } = await client.post(
      `/v3/integration/${accountId}/webhook`,
      requestData,
    );

    return { data };
  },
  examplePayload: registerWebhookExamplePayload,
});
