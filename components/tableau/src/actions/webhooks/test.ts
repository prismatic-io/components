import { getTableuClient } from "../../auth";
import { action } from "@prismatic-io/spectral";
import { connectionInput, timeout, webhookId, apiVersion } from "../../inputs";
import { testWebhookExamplePayload } from "../../examplePayloads";

export const testWebhook = action({
  display: {
    label: "Test Webhook",
    description:
      "Tests the specified webhook. Sends an empty payload to the configured destination URL of the webhook and returns the response from the server.",
  },
  examplePayload: testWebhookExamplePayload,
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
    const { data } = await client.get(`/webhooks/${webhookId}/test`);

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
