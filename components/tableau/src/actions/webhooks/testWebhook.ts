import { action } from "@prismatic-io/spectral";
import { testWebhookExamplePayload } from "../../examplePayloads";
import { testWebhookInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const testWebhook = action({
  display: {
    label: "Test Webhook",
    description:
      "Test the specified webhook by sending an empty payload to its configured destination URL and returning the server response.",
  },
  examplePayload: testWebhookExamplePayload,
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
    const { data } = await client.get(`/webhooks/${webhookId}/test`);
    return {
      data,
    };
  },
  inputs: testWebhookInputs,
});
