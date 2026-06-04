import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../examplePayloads";
import { connectionInput, webhookId } from "../../inputs";

export const testWebhookSubscription = action({
  display: {
    label: "Test Webhook Subscription",
    description: "Send a test ping to a webhook subscription.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/webhook_subscriptions/${id}/ping`, {});
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: webhookId,
  },
  examplePayload: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
});
