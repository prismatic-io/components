import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { getWebhookInputs } from "../../inputs";
import { getWebhookExamplePayload } from "../../examplePayloads";

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieve an Event Webhook configuration by ID.",
  },
  inputs: getWebhookInputs,
  perform: async (_context, { sendGridConnection, webhookId }) => {
    const client = createAuthorizedClient(sendGridConnection);

    const url = `/v3/user/webhooks/event/settings/${webhookId}`;

    const [_response, body] = await client.request({
      url,
      method: "GET",
    });

    return {
      data: body,
    };
  },
  examplePayload: getWebhookExamplePayload,
});
