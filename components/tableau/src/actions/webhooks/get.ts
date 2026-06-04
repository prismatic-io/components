import { getTableuClient } from "../../auth";
import { action } from "@prismatic-io/spectral";
import { connectionInput, timeout, webhookId, apiVersion } from "../../inputs";
import { getWebhookExamplePayload } from "../../examplePayloads";

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Returns information about the specified webhook.",
  },
  examplePayload: getWebhookExamplePayload,
  perform: async (
    context,
    { apiVersion, tableauConnection, timeout, webhookId },
  ) => {
    const client = await getTableuClient({
      tableauConnection,
      timeout,
      debug: context.debug.enabled,
      apiVersion,
    });
    const { data } = await client.get(`/webhooks/${webhookId}`);

    return {
      data,
    };
  },
  inputs: {
    tableauConnection: connectionInput,
    webhookId,
    timeout,
    apiVersion,
  },
});
