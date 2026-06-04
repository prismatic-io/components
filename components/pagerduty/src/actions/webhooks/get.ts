import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getWebhookExamplePayload } from "../../examplePayloads";
import { connectionInput, webhookId } from "../../inputs";

export const getWebhookSubscription = action({
  display: {
    label: "Get Webhook Subscription",
    description: "Retrieve a webhook subscription by ID.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      ENDPOINTS.WEBHOOK_SUBSCRIPTIONS_BY_ID(id),
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: webhookId,
  },
  examplePayload: getWebhookExamplePayload,
});
