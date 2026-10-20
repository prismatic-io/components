import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { updateWebhookSubscriptionPayload } from "../../examplePayloads";
import { updateWebhookSubscriptionInputs } from "../../inputs";
import type { GuruWebhookSubscription } from "../../types";
import { arrayToCommaString, getStatusValue } from "../../util";
export const updateWebhookSubscription = action({
  display: {
    label: "Update Webhook Subscription",
    description: "Update an existing webhook subscription settings",
  },
  perform: async (
    context,
    {
      connection,
      webhookId,
      targetUrl,
      webhookEventTypes,
      webhookActive,
      deliveryMode,
    },
  ) => {
    const client = getGuruClient(connection, context.debug.enabled);
    const requestBody = {
      deliveryMode,
      targetUrl,
      status: getStatusValue(webhookActive),
      filter: arrayToCommaString(webhookEventTypes),
    };
    const { data } = await client.put<GuruWebhookSubscription>(
      `/webhooks/${webhookId}`,
      requestBody,
    );
    return { data };
  },
  inputs: updateWebhookSubscriptionInputs,
  examplePayload: updateWebhookSubscriptionPayload,
});
