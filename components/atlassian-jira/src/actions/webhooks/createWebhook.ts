import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookOutputSchema } from "../../outputSchemas";
import { isBasicAuth } from "../../util";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a webhook to send data from Jira to an instance URL.",
  },
  inputs: createWebhookInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const useBasicAuth = isBasicAuth(params.jiraConnection);
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
      useBasicAuth,
    );

    const toSend = useBasicAuth
      ? { ...params.webhookDetails, url: params.webhookUrl }
      : { url: params.webhookUrl, webhooks: params.webhookDetails };

    const { data } = await client.post("/webhook", toSend);
    return { data };
  },
  examplePerform: async () => createWebhookExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  examplePayload: createWebhookExamplePayload,
});
