import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  DEFAULT_WEBHOOK_ENCODE_AS,
  WEBHOOKS_CONFIGURATION_PATH,
} from "../../constants";
import { createWebhookExamplePayload } from "../../examplePayloads";
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
    const client = createClient(connection);

    const response = await client.post<WebhooksIntegration>(
      WEBHOOKS_CONFIGURATION_PATH,
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
  ): Promise<{ data: unknown }> => ({
    data: {
      ...createWebhookExamplePayload.data,
      name: webhookName,
      url: webhookUrl,
      custom_headers: webhookCustomHeaders ?? null,
      encode_as: webhookEncodeAs ?? DEFAULT_WEBHOOK_ENCODE_AS,
      payload: webhookPayload ?? null,
    },
  }),
  examplePayload: createWebhookExamplePayload,
});
