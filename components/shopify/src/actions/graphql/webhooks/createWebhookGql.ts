import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createWebhookSubscriptionExamplePayload } from "../../../examplePayloads";
import { createWebhookInputs as inputs } from "../../../inputsGql";
import { createWebhookGqlOutputSchema } from "../../../outputSchemas";
import { createWebhook } from "../../../util";
import { webhookMapper } from "../mappers/webhookMapper";
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
        format: webhookFormat,
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
  examplePerform: async () => createWebhookSubscriptionExamplePayload.restMap,
  examplePayload: createWebhookSubscriptionExamplePayload.restMap,
});
