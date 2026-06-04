import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { webhookExample } from "../../examplePayloads";
import { updateWebhookInputs } from "../../inputs";
import type { WebhooksIntegration } from "../../types";





export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description:
      "Update the configuration of an existing Datadog webhook integration.",
  },
  inputs: updateWebhookInputs,
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

    const response = await client.put<WebhooksIntegration>(
      `/api/v1/integration/webhooks/configuration/webhooks/${encodeURIComponent(webhookName)}`,
      {
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
