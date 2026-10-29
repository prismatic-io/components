import { action } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { deleteInstancedWebhooksExamplePayload } from "../../examplePayloads";
import { deleteInstancedWebhooksInputs } from "../../inputs";
import type { WebhookResponse, WebhooksListResponse } from "../../types";

export const deleteInstancedWebhooks = action({
  display: {
    label: "Delete Instanced Webhooks",
    description:
      "Delete all Jamf Pro webhooks that point to a flow in this instance.",
  },
  inputs: deleteInstancedWebhooksInputs,
  perform: async (context, { connection }) => {
    const client = await createClassicClient(connection, context.debug.enabled);
    const { data } = await client.get<WebhooksListResponse>("/webhooks");

    const webhooks = await Promise.all(
      data.webhooks.map(({ id }) =>
        client
          .get<WebhookResponse>(`/webhooks/id/${id}`)
          .then((response) => response.data.webhook),
      ),
    );

    const instanceUrls = Object.values(context.webhookUrls);
    const toDelete = webhooks.filter((webhook) =>
      instanceUrls.includes(webhook.url),
    );

    for (const webhook of toDelete) {
      context.logger.info(`Deleting webhook ${webhook.id}...`);
      await client.delete(`/webhooks/id/${webhook.id}`);
    }

    return { data: { webhooksDeleted: toDelete.length } };
  },
  examplePayload: deleteInstancedWebhooksExamplePayload,
});
