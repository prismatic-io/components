import { action } from "@prismatic-io/spectral";
import type { Space, WebHooks } from "contentful-management";
import { createClient } from "../../client";
import { deleteWebhookInputs } from "../../inputs";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes an existing webhook.",
  },
  perform: async (context, { connection, spaceId, webhookId }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    const webhook: WebHooks = await space.getWebhook(webhookId);
    await webhook.delete();

    return {
      data: {},
    };
  },
  inputs: deleteWebhookInputs,
  examplePayload: { data: {} },
});
