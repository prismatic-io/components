import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  Collection,
  Space,
  WebHooks,
  WebhookProps,
} from "contentful-management";
import { createClient } from "../../client";
import { deleteInstancedWebhooksExamplePayload } from "../../examplePayloads";
import { deleteInstancedWebhooksInputs } from "../../inputs";
import { deleteInstancedWebhooksOutputSchema } from "../../outputSchemas";
export const deleteInstancedWebhooks = action({
  display: {
    label: "Delete Instanced Webhooks",
    description:
      "Deletes all webhooks that point to a flow in the current instance.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteInstancedWebhooksExamplePayload,
  inputs: deleteInstancedWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInstancedWebhooksOutputSchema,
  }),
  examplePayload: deleteInstancedWebhooksExamplePayload,
});
