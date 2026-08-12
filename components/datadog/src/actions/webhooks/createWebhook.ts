import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { webhookExample } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookOutputSchema } from "../../outputSchemas";
import type { WebhooksIntegration } from "../../types";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description:
      "Create a new webhook integration endpoint in Datadog. The webhook can then be referenced in monitor notifications as @webhook-NAME.",
  },
  inputs: createWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    {
      webhookName,
      webhookUrl,
      webhookCustomHeaders,
      webhookEncodeAs,
      webhookPayload,
    },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...webhookExample.data,
      name: webhookName,
      url: webhookUrl,
      custom_headers: webhookCustomHeaders ?? null,
      encode_as: webhookEncodeAs ?? "json",
      payload: webhookPayload ?? null,
    },
  }),
  examplePayload: webhookExample,
});
