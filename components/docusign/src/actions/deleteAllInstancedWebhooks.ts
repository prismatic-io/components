import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection } from "../inputs";
import { deleteAllInstancedWebhooks as deleteAllInstancedWebhooksFn } from "../utils";

export const deleteAllInstancedWebhooks = action({
  display: {
    label: "Delete All Instanced Webhooks",
    description: "Delete all webhooks that point to a flow in this instance.",
  },
  perform: async (context, { connection }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const flowEndpoint = context.webhookUrls[context.flow.name];
    const data = await deleteAllInstancedWebhooksFn(client, flowEndpoint);
    return { data };
  },
  inputs: {
    connection,
  },
});
