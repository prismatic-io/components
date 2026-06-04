import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { webhookExample } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import type { WebhooksIntegration } from "../../types";





export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description:
      "Create a new webhook integration endpoint in Datadog. The webhook can then be referenced in monitor notifications as @webhook-NAME.",
  },
  inputs: createWebhookInputs,
  perform: async (
    context,
    {
      connection,
      webhookName,
      webhookUrl,
      webhookCustomHeaders,
      webhookEncodeAs,
      webhookPayload,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const response = await client.post<WebhooksIntegration>(
      "/api/v1/integration/webhooks/configuration/webhooks",
      {
        name: webhookName,
        url: webhookUrl,
        custom_headers: webhookCustomHeaders,
        encode_as: webhookEncodeAs,
        payload: webhookPayload,
      },
    );

    return { data: response.data };
  },
  examplePayload: webhookExample,
});
