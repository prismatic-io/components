import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, webhookUuid } from "../../inputs";
import { getWebhookSubscriptionExamplePayload } from "../../examplePayloads";

export const getWebhookSubscription = action({
  display: {
    label: "Get Webhook Subscription",
    description: "Get a specified Webhook Subscription.",
  },
  perform: async (context, { connection, webhookUuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get(`/webhook_subscriptions/${webhookUuid}`);
    return { data };
  },
  inputs: {
    connection,
    webhookUuid,
  },
  examplePayload: getWebhookSubscriptionExamplePayload,
});
