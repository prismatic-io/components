import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { getWebhookExamplePayload as updateWebhookExamplePayload } from "../../examplePayloads/webhooks";
import { updateWebhookInputs } from "../../inputs";
import { webhookEndpointOutputSchema } from "../../outputSchemas";
export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Update an existing webhook endpoint by ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { stripeConnection, timeout, webhookEvents, webhookId, webhookUrl },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await client.webhookEndpoints.update(webhookId, {
      url: webhookUrl,
      enabled_events: webhookEvents as
        | Stripe.WebhookEndpointUpdateParams.EnabledEvent[]
        | undefined,
    });
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { webhookEvents, webhookId, webhookUrl },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateWebhookExamplePayload.data,
      id: webhookId,
      url: webhookUrl ?? updateWebhookExamplePayload.data.url,
      enabled_events:
        webhookEvents ?? updateWebhookExamplePayload.data.enabled_events,
    },
  }),
  inputs: updateWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: webhookEndpointOutputSchema,
  }),
  examplePayload: updateWebhookExamplePayload,
});
