import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { WEBHOOKS_CONFIGURATION_PATH } from "../../constants";
import { getWebhookExamplePayload } from "../../examplePayloads";
import { getWebhookInputs } from "../../inputs";
import { getWebhookOutputSchema } from "../../outputSchemas";
import type { WebhooksIntegration } from "../../types";
export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description:
      "Retrieve the configuration of a specific Datadog webhook integration by name.",
  },
  inputs: getWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWebhookOutputSchema,
  }),
  performSafety: "safe",
  perform: async (_context, { connection, webhookName }) => {
    const client = createClient(connection);
    const response = await client.get<WebhooksIntegration>(
      `${WEBHOOKS_CONFIGURATION_PATH}/${encodeURIComponent(webhookName)}`,
    );
    return { data: response.data };
  },
  examplePayload: getWebhookExamplePayload,
});
