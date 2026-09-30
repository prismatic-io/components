import { action } from "@prismatic-io/spectral";
import { deleteWebhookInputs } from "../../inputs";
import { createClient } from "../../client";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID.",
  },
  inputs: deleteWebhookInputs,
  performSafety: "notAllowed",
  perform: async (context, { webhookId, connectionInput }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete("/webhook", {
      data: {
        webhookIds: [webhookId],
      },
    });
    return { data };
  },
  examplePerform: async () => null,
  examplePayload: { data: null },
});
