import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteWebhookExample } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";





export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description:
      "Delete a Datadog webhook integration by name. This action cannot be undone.",
  },
  inputs: deleteWebhookInputs,
  perform: async (context, { connection, webhookName }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(
      `/api/v1/integration/webhooks/configuration/webhooks/${encodeURIComponent(webhookName)}`,
    );

    return { data: null };
  },
  examplePayload: deleteWebhookExample,
});
