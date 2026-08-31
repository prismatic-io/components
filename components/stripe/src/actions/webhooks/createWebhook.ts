import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getWebhookExamplePayload as createWebhookExamplePayload } from "../../examplePayloads/webhooks";
import { createWebhookInputs } from "../../inputs";
import { webhookEndpointOutputSchema } from "../../outputSchemas";
import { createWebhookFn } from "../../util";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook endpoint.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { stripeConnection, timeout, webhookEvents, webhookUrl },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await createWebhookFn(client, webhookUrl, webhookEvents);
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { webhookUrl, webhookEvents },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createWebhookExamplePayload.data,
      url: webhookUrl,
      enabled_events: webhookEvents,
      secret: "whsec_XXXXXXXXXXXXXXXXXXXXXXXX",
    },
  }),
  inputs: createWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: webhookEndpointOutputSchema,
  }),
  examplePayload: createWebhookExamplePayload,
});
