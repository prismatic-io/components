import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { connectionInput, updateWebhookObject, webhookId } from "../../inputs";

export const updateWebhookSubscription = action({
  display: {
    label: "Update Webhook Subscription",
    description: "Update an existing webhook subscription.",
  },
  perform: async (context, { connection, id, webhookSubscription }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(
      ENDPOINTS.WEBHOOK_SUBSCRIPTIONS_BY_ID(id),
      {
        webhook_subscription: webhookSubscription,
      },
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: webhookId,
    webhookSubscription: updateWebhookObject,
  },
  examplePayload: updateWebhookExamplePayload,
});
