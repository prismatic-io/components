import { action } from "@prismatic-io/spectral";
import type {
  Collection,
  Space,
  WebHooks,
  WebhookProps,
} from "contentful-management";
import { createClient } from "../../client";
import { deleteInstancedWebhooksInputs } from "../../inputs";
export const deleteInstancedWebhooks = action({
  display: {
    label: "Delete Instanced Webhooks",
    description:
      "Deletes all webhooks that point to a flow in the current instance.",
  },
  perform: async (context, { connection, spaceId }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);

    
    const data: Collection<WebHooks, WebhookProps> = await space.getWebhooks();
    const items = data.items;

    const endpoint = context.webhookUrls[context.flow.name];
    const webhooks = items.filter((webhook) => webhook.url === endpoint);

    for (const webhook of webhooks) {
      await webhook.delete();
    }

    return {
      data: {
        webhooksDeleted: webhooks.length,
      },
    };
  },
  inputs: deleteInstancedWebhooksInputs,
});
