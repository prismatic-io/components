import { input, util } from "@prismatic-io/spectral";
import { connectionInput, events, webhookFriendlyName } from "./common";
const webhookUrl = input({
  label: "Webhook URL",
  placeholder: "Enter a webhook URL",
  example: "https://example.com/webhook",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The URL where SendGrid will send event data.",
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
export const createWebhookInputs = {
  sendGridConnection: connectionInput,
  url: webhookUrl,
  events,
  friendlyName: webhookFriendlyName,
  enabled: webhookEnabled,
};
export const updateWebhookInputs = {
  sendGridConnection: connectionInput,
  webhookId,
  url: webhookUrl,
  events,
  friendlyName: webhookFriendlyName,
  enabled: webhookEnabled,
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
