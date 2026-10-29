import { action, outputSchema, util } from "@prismatic-io/spectral";
import { WEBHOOK_TOPICS_MAP } from "../../constants";
import {
  createWebhookExamplePayload,
  createWebhookPayload,
} from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookOutputSchema } from "../../outputSchemas";
import { createWebhookGql } from "../graphql/webhooks/createWebhookGql";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a webhook for the specified topic.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { postUrl, shopifyConnection, webhookFormat, webhookTopic },
  ) => {
    const { data } = await createWebhookGql.perform(context, {
      shopifyConnection,
      webhookTopic: WEBHOOK_TOPICS_MAP[util.types.toString(webhookTopic)],
      callbackWebhookUrl: util.types.toString(postUrl),
      webhookFormat: webhookFormat.toUpperCase(),
    });

    return {
      data,
    };
  },
  inputs: createWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  examplePerform: async () => ({
    data: createWebhookExamplePayload,
  }),
  examplePayload: createWebhookPayload,
});
