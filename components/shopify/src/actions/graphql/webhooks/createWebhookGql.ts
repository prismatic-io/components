import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createWebhookGqlExamplePayload } from "../../../examplePayloads";
import { createWebhookInputs as inputs } from "../../../inputsGql";
import { createWebhookGqlOutputSchema } from "../../../outputSchemas";
import type { WebhookSubscriptionFormat } from "../../../types";
import { createWebhook, webhookMapper } from "../../../util";

export const createWebhookGql = action({
  display: {
    label: "Create Webhook",
    description: "Creates a webhook for the specified topic.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, webhookTopic, callbackWebhookUrl, webhookFormat },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const { webhookSubscriptionCreate } = await createWebhook(client, {
      topic: webhookTopic,
      webhookSubscription: {
        callbackUrl: callbackWebhookUrl,
        format: webhookFormat as WebhookSubscriptionFormat,
      },
    });

    return {
      data: {
        webhook: webhookMapper(webhookSubscriptionCreate.webhookSubscription),
      },
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookGqlOutputSchema,
  }),
  examplePerform: async () => createWebhookGqlExamplePayload.restMap,
  examplePayload: createWebhookGqlExamplePayload.restMap,
});
