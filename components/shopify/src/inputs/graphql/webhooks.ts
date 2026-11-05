import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import { callbackUrl, getAlldata, pagination, shopifyConnection, webhookTopic } from "./common";

const callbackWebhookUrl = input({
  label: "Callback URL",
  type: "string",
  required: true,
  example: "https://example.com/webhook",
  placeholder: "Enter callback URL",
  comments: "Provide a string value for the URL the newly created webhook will post to.",
  clean: util.types.toString,
});

const webhookFormat = input({
  label: "Webhook Format",
  type: "string",
  required: true,
  model: [
    { label: "JSON", value: "JSON" },
    { label: "XML", value: "XML" },
  ],
  default: "JSON",
  comments: "Provide a string value for the format the webhook returns.",
  clean: util.types.toString,
});

const showOnlyInstanceWebhooks = input({
  label: "Show Only Instance Webhooks",
  comments: "Show only webhooks that point to this instance.",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});

const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the webhook.",
  example: "gid://shopify/WebhookSubscription/525699895",
  placeholder: "Enter webhook ID",
  clean: util.types.toString,
});

export const createWebhookInputs = {
  shopifyConnection,
  webhookTopic,
  callbackWebhookUrl,
  webhookFormat,
};

export const listWebhooksInputs = {
  shopifyConnection,
  getAlldata,
  showOnlyInstanceWebhooks,
  callbackUrl: input({
    ...callbackUrl,
    required: false,
    comments: "Filter webhooks by callback URL.",
    clean: cleanStringInput,
  }),
  pagination,
};

export const deleteWebhookInputs = {
  shopifyConnection,
  webhookId,
};

export const deleteInstanceWebhooksInputs = { shopifyConnection };
