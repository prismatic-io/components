import { action } from "@prismatic-io/spectral";
import type { Space, WebHooks, WebhookProps } from "contentful-management";
import { createClient } from "../../client";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { updateWebhookInputs } from "../../inputs";

export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Updates an existing webhook.",
  },
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
  inputs: updateWebhookInputs,
  examplePayload: { data: updateWebhookExamplePayload },
});
