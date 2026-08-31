import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID.",
  },
  inputs: deleteWebhookInputs,
  performSafety: "notAllowed",
  perform: async (context, { boxConnection, webhookId }) => {
    const client = createAuthorizedClient({ boxConnection });
    await client.webhooks.deleteWebhookById(util.types.toString(webhookId));
    return { data: null };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteWebhookExamplePayload.data,
  }),
  examplePayload: deleteWebhookExamplePayload,
});
