import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { webhookEvents, webhookUrl, timeout, connectionInput, webhookId } from "../../inputs";
import { getWebhookExamplePayload as updateWebhookExamplePayload } from "../../examplePayloads/webhooks";

export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Update an existing webhook endpoint by ID.",
  },
  perform: async (context, { stripeConnection, timeout, webhookEvents, webhookId, webhookUrl }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await client.webhookEndpoints.update(webhookId, {
      url: webhookUrl,
      enabled_events: webhookEvents.map(
        (event) => util.types.toString(event) as Stripe.WebhookEndpointUpdateParams.EnabledEvent,
      ),
    });
    return {
      data,
    };
  },
  inputs: {
    webhookId: {
      ...webhookId,
      comments: "The ID of the webhook to update",
    },
    webhookUrl: {
      ...webhookUrl,
      comments: "The URL the webhook will send requests to",
      required: false,
    },
    webhookEvents: {
      ...webhookEvents,
      comments: "The events the webhook will listen for",
      required: false,
    },
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: updateWebhookExamplePayload,
});
