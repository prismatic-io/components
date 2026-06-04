import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { webhookExample } from "../../examplePayloads";
import { getWebhookInputs } from "../../inputs";
import type { WebhooksIntegration } from "../../types";





export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description:
      "Retrieve the configuration of a specific Datadog webhook integration by name.",
  },
  inputs: getWebhookInputs,
  perform: async (context, { connection, webhookName }) => {
    const client = createClient(connection, context.debug.enabled);
    const response = await client.get<WebhooksIntegration>(
      `/api/v1/integration/webhooks/configuration/webhooks/${encodeURIComponent(webhookName)}`,
    );

    return { data: response.data };
  },
  examplePayload: webhookExample,
});
