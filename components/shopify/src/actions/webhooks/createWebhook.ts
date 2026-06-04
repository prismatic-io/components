import { action, util } from "@prismatic-io/spectral";
import { WEBHOOK_TOPICS_MAP } from "../../constants";
import { createWebhookInputs } from "../../inputs";
import { createWebhookExamplePayload } from "../../payloadExamples";
import { createWebhookGql } from "../graphql/webhooks/createWebhook";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a webhook for the specified topic.",
  },
  perform: async (context, { postUrl, shopifyConnection, webhookFormat, webhookTopic }) => {
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
  examplePayload: { data: createWebhookExamplePayload },
});
