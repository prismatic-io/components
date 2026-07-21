import { input, util } from "@prismatic-io/spectral";
import tableauEvents from "../tableauEvents.json";
import {
  apiVersion,
  connectionInput,
  pagination,
  timeout,
  webhookId,
} from "./common";
const webhookName = input({
  label: "Webhook Name",
  type: "string",
  required: true,
  comments: "A descriptive label to identify the webhook in Tableau.",
  example: "My Webhook",
  placeholder: "Enter webhook name",
  clean: util.types.toString,
});
export const events = input({
  label: "API Event Name",
  type: "string",
  required: true,
  comments: "The name of the Tableau event that triggers the webhook.",
  clean: util.types.toString,
  model: tableauEvents.map((event) => {
    return { label: event.apiEventName, value: event.apiEventName };
  }),
});
const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments:
    "The destination URL for the webhook. The destination URL must use HTTPS and have a valid certificate.",
  example: "https://example.com/webhook",
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});
const webhookEnabled = input({
  label: "Webhook Enabled",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, the newly created webhook is enabled. When false, the webhook is disabled.",
  clean: util.types.toBool,
});
const webhookDisableReason = input({
  label: "Webhook Disable Reason",
  type: "string",
  required: false,
  comments: "The reason a webhook is disabled.",
  example: "Endpoint no longer reachable",
  placeholder: "Enter disable reason",
  clean: util.types.toString,
});
export const listWebhooksInputs = {
  timeout,
  pagination,
  tableauConnection: connectionInput,
  apiVersion,
};
export const getWebhookInputs = {
  tableauConnection: connectionInput,
  webhookId,
  timeout,
  apiVersion,
};
export const deleteWebhookInputs = {
  tableauConnection: connectionInput,
  webhookId,
  timeout,
  apiVersion,
};
export const testWebhookInputs = {
  tableauConnection: connectionInput,
  webhookId,
  timeout,
  apiVersion,
};
export const createWebhookInputs = {
  tableauConnection: connectionInput,
  webhookName: {
    ...webhookName,
    required: false,
  },
  events: {
    ...events,
    required: false,
  },
  webhookUrl: {
    ...webhookUrl,
    required: false,
  },
  webhookEnabled,
  timeout,
  apiVersion,
};
export const updateWebhookInputs = {
  tableauConnection: connectionInput,
  webhookId,
  webhookName: {
    ...webhookName,
    required: false,
  },
  events: {
    ...events,
    required: false,
  },
  webhookUrl: {
    ...webhookUrl,
    required: false,
  },
  webhookEnabled,
  webhookDisableReason,
  timeout,
  apiVersion,
};
