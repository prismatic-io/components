import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { deleteWebhookSubscriptionInputs } from "../../inputs";
import { deleteWebhookSubscriptionPayload } from "../../examplePayloads";

export const deleteWebhookSubscription = action({
  display: {
    label: "Delete Webhook Subscription",
    description: "Delete a webhook subscription to stop receiving events",
  },
  perform: async (context, { connection, webhookId }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    await client.delete(`/webhooks/${webhookId}`);

    const data = {
      message: "Webhook subscription deleted successfully",
      webhookId,
    };

    return { data };
  },
  inputs: deleteWebhookSubscriptionInputs,
  examplePayload: deleteWebhookSubscriptionPayload,
});
