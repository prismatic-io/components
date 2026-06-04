import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { connectionInput, webhookDetails, webhookUrl } from "../../inputs";
import { isBasicAuth } from "../../util";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a webhook to send data from Jira to an instance URL.",
  },
  inputs: {
    jiraConnection: connectionInput,
    webhookUrl,
    webhookDetails,
  },
  perform: async (context, params) => {
    const useBasicAuth = isBasicAuth(params.jiraConnection);
    const client = await createV3Client(params.jiraConnection, context.debug.enabled, useBasicAuth);

    const toSend = useBasicAuth
      ? { ...params.webhookDetails, url: params.webhookUrl }
      : { url: params.webhookUrl, webhooks: params.webhookDetails };

    const { data } = await client.post("/webhook", toSend);
    return { data };
  },
  examplePayload: createWebhookExamplePayload,
});
