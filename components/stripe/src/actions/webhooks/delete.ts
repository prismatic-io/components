import { action } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { timeout, connectionInput, webhookId } from "../../inputs";
import { deleteWebhookExamplePayload } from "../../examplePayloads/webhooks";
import { deleteWebhookFn } from "../../util";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook endpoint by ID.",
  },
  perform: async (context, { stripeConnection, timeout, webhookId }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await deleteWebhookFn(client, webhookId);
    return {
      data,
    };
  },
  inputs: {
    webhookId: {
      ...webhookId,
      comments: "The ID of the webhook to delete",
    },
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: deleteWebhookExamplePayload,
});
