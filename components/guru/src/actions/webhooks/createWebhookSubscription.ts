import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { createWebhookSubscriptionPayload } from "../../examplePayloads";
import { createWebhookSubscriptionInputs } from "../../inputs";
import type { GuruWebhookSubscription } from "../../types";
import { arrayToCommaString } from "../../util";
import { getStatusValue } from "../../util/webhooks";
export const createWebhookSubscription = action({
  display: {
    label: "Create Webhook Subscription",
    description:
      "Create a new webhook subscription to receive real-time Guru events",
  },
  perform: async (
    context,
    { connection, targetUrl, webhookEventTypes, webhookActive, deliveryMode },
  ) => {
    const client = getGuruClient(connection, context.debug.enabled);
    const requestBody = {
      deliveryMode,
      targetUrl,
      status: getStatusValue(webhookActive),
      filter: arrayToCommaString(webhookEventTypes),
    };
    const { data } = await client.post<GuruWebhookSubscription>(
      "/webhooks",
      requestBody,
    );
    return { data };
  },
  inputs: createWebhookSubscriptionInputs,
  examplePayload: createWebhookSubscriptionPayload,
});
