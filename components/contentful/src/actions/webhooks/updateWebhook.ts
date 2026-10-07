import { action, outputSchema } from "@prismatic-io/spectral";
import type { Space, WebHooks, WebhookProps } from "contentful-management";
import { createClient } from "../../client";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { updateWebhookInputs } from "../../inputs";
import { updateWebhookOutputSchema } from "../../outputSchemas";
export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Updates an existing webhook.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId, name, webhookId }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    const webhook: WebHooks = await space.getWebhook(webhookId);
    webhook.name = name;
    const data: WebhookProps = (await webhook.update()).toPlainObject();
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateWebhookExamplePayload,
  inputs: updateWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateWebhookOutputSchema,
  }),
  examplePayload: updateWebhookExamplePayload,
});
