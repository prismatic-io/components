import { action } from "@prismatic-io/spectral";
import { connectionInput, webhookId } from "../../inputs";
import { createClient } from "../../client";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID",
  },
  inputs: {
    connectionInput,
    webhookId,
  },
  perform: async (context, { webhookId, connectionInput }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete("/webhook", {
      data: {
        webhookIds: [webhookId],
      },
    });
    return { data };
  },
  examplePayload: { data: null },
});
