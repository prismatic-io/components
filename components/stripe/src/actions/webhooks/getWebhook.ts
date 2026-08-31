import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getWebhookInputs } from "../../inputs";
import { webhookEndpointOutputSchema } from "../../outputSchemas";
import { getWebhookExamplePayload } from "../../examplePayloads/webhooks";
export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieve a webhook endpoint by ID.",
  },
  performSafety: "safe",
  perform: async (context, { stripeConnection, timeout, webhookId }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await client.webhookEndpoints.retrieve(webhookId);
    return {
      data,
    };
  },
  inputs: getWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: webhookEndpointOutputSchema,
  }),
  examplePayload: getWebhookExamplePayload,
});
