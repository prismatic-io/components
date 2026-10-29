import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  DEFAULT_WEBHOOK_ENCODE_AS,
  WEBHOOKS_CONFIGURATION_PATH,
} from "../../constants";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { updateWebhookInputs } from "../../inputs";
import { updateWebhookOutputSchema } from "../../outputSchemas";
import type { WebhooksIntegration } from "../../types";

export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description:
      "Update the configuration of an existing Datadog webhook integration.",
  },
  inputs: updateWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateWebhookOutputSchema,
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

    const response = await client.put<WebhooksIntegration>(
      `${WEBHOOKS_CONFIGURATION_PATH}/${encodeURIComponent(webhookName)}`,
      {
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
      ...updateWebhookExamplePayload.data,
      name: webhookName,
      url: webhookUrl || updateWebhookExamplePayload.data.url,
      custom_headers: webhookCustomHeaders ?? null,
      encode_as: webhookEncodeAs ?? DEFAULT_WEBHOOK_ENCODE_AS,
      payload: webhookPayload ?? null,
    },
  }),
  examplePayload: updateWebhookExamplePayload,
});
