import { action, input, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { createWebhookPayload } from "../../examplePayloads";
import { connectionInput, webhookEventsInput } from "../../inputs";
import { fetchWebhooks } from "./utils";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description:
      "Create a webhook in Zendesk to receive notifications of changes to users, organizations, or tickets.",
  },
  inputs: {
    zendeskConnection: connectionInput,
    callbackUrl: input({
      label: "Callback URL",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The URL to send data to",
    }),
    name: input({
      label: "Webhook Name",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "A unique name to assign this webhook",
    }),
    events: webhookEventsInput,
    allowDuplicates: input({
      label: "Allow Duplicates?",
      type: "boolean",
      required: true,
      default: "false",
      clean: util.types.toBool,
    }),
  },
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
  examplePayload: {
    data: createWebhookPayload,
  },
});
