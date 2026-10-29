import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { deleteInstancedWebhooksExamplePayload } from "../../examplePayloads";
import { deleteInstancedWebhooksInputs } from "../../inputs";
import type { Webhook } from "../../types";

export const deleteInstancedWebhooks = action({
  display: {
    label: "Delete Instanced Webhooks",
    description: "Deletes all webhooks that point to a flow in this instance.",
  },
  perform: async (_context, { connectionInput }) => {
    const client = createShipStationClient(connectionInput);

    const { data: webhooks } = await client.get("/webhooks");

    const currentInstanceWebhooks = webhooks.filter((webhook: Webhook) =>
      webhook.target_url.includes("currentInstance"),
    );

    const promises: Promise<unknown>[] = [];
    for (const webhook of currentInstanceWebhooks) {
      promises.push(client.delete(`/webhooks/${webhook.id}`));
    }

    await Promise.all(promises);

    return { data: "Webhooks deleted successfully." };
  },
  inputs: deleteInstancedWebhooksInputs,
  examplePayload: deleteInstancedWebhooksExamplePayload,
});
