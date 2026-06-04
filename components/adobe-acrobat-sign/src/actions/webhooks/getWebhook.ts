import { action } from "@prismatic-io/spectral";
import { getWebhookInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { WebhookInfo } from "../../types";
import { getWebhookExamplePayload } from "../../examplePayloads";

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieves the details of a webhook.",
  },
  inputs: getWebhookInputs,
  perform: async (context, { connection, webhookId }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const { data } = await client.get<WebhookInfo>(`/webhooks/${webhookId}`);

    return {
      data,
    };
  },
  examplePayload: getWebhookExamplePayload,
});
