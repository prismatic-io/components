import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { createWebhookSubscriptionInputs } from "../../inputs";
import { getStatusValue } from "../../util/webhooks";
import { arrayToCommaString } from "../../util";
import type { GuruWebhookSubscription } from "../../types";
import { createWebhookSubscriptionPayload } from "../../examplePayloads";

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
