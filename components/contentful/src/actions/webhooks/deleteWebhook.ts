import { action, outputSchema } from "@prismatic-io/spectral";
import type { Space, WebHooks } from "contentful-management";
import { createClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookOutputSchema } from "../../outputSchemas";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes an existing webhook.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId, webhookId }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    const webhook: WebHooks = await space.getWebhook(webhookId);
    await webhook.delete();
    return {
      data: {},
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteWebhookExamplePayload,
  inputs: deleteWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookOutputSchema,
  }),
  examplePayload: deleteWebhookExamplePayload,
});
