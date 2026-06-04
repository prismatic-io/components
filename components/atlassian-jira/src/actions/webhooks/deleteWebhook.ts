import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { connectionInput, webhookIdInput } from "../../inputs";
import { isBasicAuth } from "../../util";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID.",
  },
  inputs: {
    jiraConnection: connectionInput,
    webhookId: webhookIdInput,
  },
  perform: async (context, params) => {
    const useBasicAuth = isBasicAuth(params.jiraConnection);
    const client = await createV3Client(params.jiraConnection, context.debug.enabled, useBasicAuth);

    if (useBasicAuth) {
      const { data } = await client.delete(`/webhook/${params.webhookId}`);
      return { data };
    }

    const { data } = await client.delete("/webhook", {
      data: {
        webhookIds: [params.webhookId],
      },
    });
    return { data };
  },
  examplePayload: { data: null },
});
