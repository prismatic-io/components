import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { getWebhookExamplePayload } from "../../examplePayloads";
import { getWebhookInputs } from "../../inputs";
import { getWebhookOutputSchema } from "../../outputSchemas";
export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieves an Event Webhook configuration by ID.",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWebhookOutputSchema,
  }),
  examplePayload: getWebhookExamplePayload,
});
