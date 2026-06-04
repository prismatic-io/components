import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateWebhookInputs } from "../../inputs";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import type { Webhook } from "../../types";






export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Update an existing webhook's settings.",
  },
  inputs: updateWebhookInputs,
  perform: async (
    context,
    {
      connection,
      webhookId,
      name,
      eventType,
      objectType,
      objectIds,
      subscriptionUrl,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body: Record<string, unknown> = {
      name,
      event_type: eventType,
      object_type: objectType,
      ...(objectIds && objectIds.length > 0 && { object_ids: objectIds }),
      subscription_url: subscriptionUrl,
    };

    const { data } = await client.patch<Webhook>(
      `/webhooks/${webhookId}`,
      body,
    );

    return { data };
  },
  examplePayload: updateWebhookExamplePayload,
});
