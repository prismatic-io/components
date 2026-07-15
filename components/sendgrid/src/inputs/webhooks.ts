import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, cleanValueListInput } from "../util";
import { connectionInput } from "./shared";
const webhookUrl = input({
  label: "Webhook URL",
  placeholder: "Enter a webhook URL",
  example: "https://example.com/webhook",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The URL where SendGrid will send event data.",
});
const webhookFriendlyName = input({
  label: "Friendly Name",
  placeholder: "Enter a friendly name",
  example: "My Event Webhook",
  type: "string",
  required: false,
  clean: cleanStringInput,
  comments: "A friendly name to help differentiate between multiple webhooks.",
});
const webhookEnabled = input({
  label: "Enabled",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, enables the Event Webhook.",
  clean: util.types.toBool,
});
const webhookId = input({
  label: "Webhook ID",
  placeholder: "Enter a webhook ID",
  example: "77d4a5da-7015-11ed-a1eb-0242ac120002",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the Event Webhook configuration.",
  dataSource: "selectWebhook",
});
const signatureVerificationEnabled = input({
  label: "Enable Signature Verification",
  type: "boolean",
  required: true,
  default: "true",
  comments: "When true, enables signature verification for webhook requests.",
  clean: util.types.toBool,
});
const testWebhookUrl = input({
  label: "Test URL",
  placeholder: "Enter a test URL",
  example: "https://example.com/test-webhook",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The URL where the test event will be sent.",
});
const events = input({
  label: "Events",
  collection: "valuelist",
  type: "string",
  required: true,
  model: [
    { label: "Delivered", value: "delivered" },
    { label: "Bounce", value: "bounce" },
    { label: "Deferred", value: "deferred" },
    { label: "Processed", value: "processed" },
    { label: "Dropped", value: "dropped" },
    { label: "Open", value: "open" },
    { label: "Click", value: "click" },
    { label: "Spam Report", value: "spamReport" },
    { label: "Unsubscribe", value: "unsubscribe" },
    { label: "Group Unsubscribe", value: "groupUnsubscribe" },
    { label: "Group Resubscribe", value: "groupResubscribe" },
  ],
  comments:
    "The email event types to subscribe to. Selected events trigger webhook notifications when they occur.",
  example: "delivered",
  default: ["delivered"],
  clean: cleanValueListInput,
});
export const createWebhookInputs = {
  sendGridConnection: connectionInput,
  url: webhookUrl,
  friendlyName: webhookFriendlyName,
  enabled: webhookEnabled,
  events,
};
export const updateWebhookInputs = {
  sendGridConnection: connectionInput,
  webhookId,
  url: webhookUrl,
  friendlyName: webhookFriendlyName,
  enabled: webhookEnabled,
  events,
};
export const getWebhookInputs = {
  sendGridConnection: connectionInput,
  webhookId,
};
export const listWebhooksInputs = {
  sendGridConnection: connectionInput,
};
export const deleteWebhookInputs = {
  sendGridConnection: connectionInput,
  webhookId,
};
export const testWebhookInputs = {
  sendGridConnection: connectionInput,
  url: testWebhookUrl,
};
export const toggleSignatureVerificationInputs = {
  sendGridConnection: connectionInput,
  webhookId,
  enabled: signatureVerificationEnabled,
};
export const eventWebhookInputs = {
  sendGridConnection: connectionInput,
  friendlyName: webhookFriendlyName,
  events,
};
