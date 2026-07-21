import { action } from "@prismatic-io/spectral";
import { getWebhookExamplePayload } from "../../examplePayloads";
import { getWebhookInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieve information about the specified webhook.",
  },
  examplePayload: getWebhookExamplePayload,
  perform: async (
    context,
    { apiVersion, tableauConnection, timeout, webhookId },
  ) => {
    const client = await getTableauClient({
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
  inputs: getWebhookInputs,
});
