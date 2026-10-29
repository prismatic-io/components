import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { enableWebhookExamplePayload } from "../../examplePayloads";
import { connectionInput, webhookId } from "../../inputs";

export const enableWebhookSubscription = action({
  display: {
    label: "Enable Webhook Subscription",
    description: "Enable a disabled webhook subscription.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `${ENDPOINTS.WEBHOOK_SUBSCRIPTIONS_BY_ID(id)}/enable`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: webhookId,
  },
  examplePayload: enableWebhookExamplePayload,
});
