import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { getWebhookSubscriptionInputs } from "../../inputs";
import type { GuruWebhookSubscription } from "../../types";
import { getWebhookSubscriptionPayload } from "../../examplePayloads";

export const getWebhookSubscription = action({
  display: {
    label: "Get Webhook Subscription",
    description: "Retrieve details of a specific webhook subscription",
  },
  perform: async (context, { connection, webhookId }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const { data } = await client.get<GuruWebhookSubscription>(
      `/webhooks/${webhookId}`,
    );

    return { data };
  },
  inputs: getWebhookSubscriptionInputs,
  examplePayload: getWebhookSubscriptionPayload,
});
