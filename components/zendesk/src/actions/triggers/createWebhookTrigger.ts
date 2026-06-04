import { action, input, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { createWebhookTriggerPayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";
import {
  defaultWebhookTriggerConditions,
  defaultWebhookTriggerMessageBody,
  fetchTriggers,
} from "./utils";

export const createWebhookTrigger = action({
  display: {
    label: "Create Webhook Trigger",
    description: "Create a Zendesk trigger that fires a webhook.",
  },
  inputs: {
    connection: connectionInput,
    title: input({
      label: "Trigger Name",
      type: "string",
      required: true,
      clean: util.types.toString,
    }),
    webhookId: input({
      label: "Webhook ID",
      type: "string",
      required: true,
      example: "01GK7R2DBS16XB76SPDEXAMPLE",
    }),
    messageBody: input({
      label: "Webhook Message Body",
      type: "code",
      comments:
        "The body to send to the webhook. See [Zendesk Support documentation](https://support.zendesk.com/hc/en-us/articles/4408886858138-Zendesk-Support-placeholders-reference) for placeholder references.",
      language: "json",
      required: true,
      default: JSON.stringify(defaultWebhookTriggerMessageBody, null, 2),
    }),
    conditions: input({
      label: "Trigger Conditions",
      type: "code",
      comments:
        "The conditions under which this trigger will fire. Leave the default to fire under any change.",
      language: "json",
      required: true,
      default: JSON.stringify(defaultWebhookTriggerConditions, null, 2),
      clean: (value) =>
        typeof value === "string" && util.types.isJSON(value)
          ? JSON.parse(value)
          : value,
    }),
    allowDuplicates: input({
      label: "Allow Duplicates?",
      comments: "Allow a duplicate trigger with the same title to be created?",
      type: "boolean",
      required: true,
      default: "false",
      clean: util.types.toBool,
    }),
  },
  perform: async ({ logger }, params) => {
    const client = rawHttpClient(params.connection);
    const triggers = await fetchTriggers(client);
    const match = triggers.filter((trigger) => trigger.title === params.title);
    if (match.length && !params.allowDuplicates) {
      logger.info(
        `A trigger with the title "${params.title}" already exists. Skipping creation.`,
      );
      return { data: { trigger: match[0] } };
    }
    const { data } = await client.post("/triggers", {
      trigger: {
        title: params.title,
        actions: [
          {
            field: "notification_webhook",
            value: [params.webhookId, params.messageBody],
          },
        ],
        conditions: params.conditions,
      },
    });
    return { data };
  },
  examplePayload: {
    data: createWebhookTriggerPayload,
  },
});
