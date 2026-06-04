import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createWebhookInputs } from "../../inputs";
import { createWebhookExamplePayload } from "../../examplePayloads";
import type { Webhook, CreateWebhookInput } from "../../types";









export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description:
      "Create a new webhook subscription. The URL must be unique and handle HEAD requests.",
  },
  inputs: createWebhookInputs,
  perform: async (
    context,
    { connection, name, eventType, objectType, objectIds, subscriptionUrl },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    

    const body: CreateWebhookInput = {
      name,
      event_type: eventType as CreateWebhookInput["event_type"],
      subscription_url: subscriptionUrl,
      object_type: objectType as "survey" | "collector",
      ...(objectIds && objectIds.length > 0 && { object_ids: objectIds }),
    };

    const { data } = await client.post<Webhook>("/webhooks", body);

    return { data };
  },
  examplePayload: createWebhookExamplePayload,
});
