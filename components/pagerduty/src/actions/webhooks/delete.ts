import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../examplePayloads";
import { connectionInput, webhookId } from "../../inputs";

export const deleteWebhookSubscription = action({
  display: {
    label: "Delete Webhook Subscription",
    description: "Delete a webhook subscription by ID.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      ENDPOINTS.WEBHOOK_SUBSCRIPTIONS_BY_ID(id),
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: webhookId,
  },
  examplePayload: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
});
