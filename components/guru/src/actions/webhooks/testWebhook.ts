import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { testWebhookInputs } from "../../inputs";
import { testWebhookPayload } from "../../examplePayloads";

export const testWebhook = action({
  display: {
    label: "Test Webhook",
    description:
      "Send a test event to a webhook subscription to verify it's working",
  },
  perform: async (context, { connection, webhookId, testData }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    await client.post(`/webhooks/${webhookId}/test`, testData);

    const data = {
      message: "Test webhook sent successfully",
      webhookId,
    };

    return { data };
  },
  inputs: testWebhookInputs,
  examplePayload: testWebhookPayload,
});
