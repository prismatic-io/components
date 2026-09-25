import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookOutputSchema } from "../../outputSchemas";
import { fetchWebhooks } from "../../util";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description:
      "Create a webhook in Zendesk to receive notifications of changes to users, organizations, or tickets.",
  },
  inputs: createWebhookInputs,
  performSafety: "notAllowed",
  perform: async ({ logger }, params) => {
    const client = rawHttpClient(params.zendeskConnection);
    const existingWebhooks = await fetchWebhooks({
      client,
      showOnlyInstanceWebhooks: true,
      instanceWebhookUrls: [params.callbackUrl],
    });
    if (existingWebhooks.length && !params.allowDuplicates) {
      logger.info(
        `A webhook targeting ${params.callbackUrl} already exists. Skipping creation.`,
      );
      return { data: { webhook: existingWebhooks[0] } };
    }
    const { data } = await client.post("/webhooks", {
      webhook: {
        endpoint: params.callbackUrl,
        http_method: "POST",
        name: params.name,
        request_format: "json",
        status: "active",
        subscriptions: params.events,
      },
    });
    return { data };
  },
  examplePerform: async (_context, { callbackUrl, events, name }) => ({
    data: {
      ...createWebhookExamplePayload.data,
      webhook: {
        ...createWebhookExamplePayload.data.webhook,
        ...(name ? { name } : {}),
        ...(callbackUrl ? { endpoint: callbackUrl } : {}),
        ...(events?.length ? { subscriptions: events } : {}),
      },
    },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  examplePayload: createWebhookExamplePayload,
});
