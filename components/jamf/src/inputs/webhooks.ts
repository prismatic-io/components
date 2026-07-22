import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalBool, toOptionalString, webhookEventOptions } from "../util";
import { connection, resourceId } from "./common";
const optionalBoolean = (label: string, comments: string) =>
  input({
    label,
    type: "string",
    required: false,
    model: [
      { label: "True", value: "true" },
      { label: "False", value: "false" },
    ],
    comments,
    clean: toOptionalBool,
  });
const webhookName = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The display name used to identify the webhook in Jamf Pro.",
  clean: util.types.toString,
  placeholder: "Enter webhook name",
  example: "New Computer Notifier",
});
const webhookEvent = input({
  label: "Event",
  type: "string",
  required: true,
  model: webhookEventOptions,
  comments: "The Jamf Pro event that triggers this webhook.",
  clean: util.types.toString,
  placeholder: "Select an event",
  example: "ComputerAdded",
});
const webhookUrl = input({
  label: "URL",
  type: "string",
  required: true,
  comments: "The destination URL that Jamf Pro sends webhook events to.",
  clean: util.types.toString,
  placeholder: "https://example.com/webhook",
  example: "https://example.com/webhook",
});
const webhookContentType = input({
  label: "Content Type",
  type: "string",
  required: false,
  default: "application/json",
  model: [
    { label: "JSON", value: "application/json" },
    { label: "XML", value: "text/xml" },
  ],
  comments: "The payload format Jamf Pro delivers events in.",
  clean: util.types.toString,
  example: "application/json",
});
const webhookEnabled = input({
  label: "Enabled",
  type: "boolean",
  required: false,
  default: "true",
  comments: "Whether the webhook is active and delivering events.",
  clean: util.types.toBool,
});
const webhookAuthType = input({
  label: "Authentication Type",
  type: "string",
  required: false,
  default: "NONE",
  model: [
    { label: "None", value: "NONE" },
    { label: "Header", value: "HEADER" },
  ],
  comments:
    "How Jamf Pro authenticates to the destination URL. Header authentication sends a custom header with every event.",
  clean: util.types.toString,
});
const webhookAuthHeaderName = input({
  label: "Auth Header Name",
  type: "string",
  required: false,
  comments:
    "Name of the header Jamf Pro sends when Authentication Type is Header. Required when using Header authentication.",
  clean: toOptionalString,
  placeholder: "X-Jamf-Signature",
  example: "X-Jamf-Signature",
});
const webhookAuthHeaderValue = input({
  label: "Auth Header Value",
  type: "string",
  required: false,
  comments:
    "Value of the header Jamf Pro sends when Authentication Type is Header. Required when using Header authentication.",
  clean: toOptionalString,
  placeholder: "Enter the header value",
});
const webhookResourceId = {
  ...resourceId,
  label: "Webhook",
  comments: "The unique identifier of the webhook.",
  dataSource: "selectWebhook",
};
const createWebhookAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Content Type, Enabled, Authentication Type, Auth Header Name, and Auth Header Value.",
  inputs: {
    webhookContentType,
    webhookEnabled,
    webhookAuthType,
    webhookAuthHeaderName,
    webhookAuthHeaderValue,
  },
});
export const createWebhookInputs = {
  connection,
  webhookName,
  webhookEvent,
  webhookUrl,
  additionalFields: createWebhookAdditionalFields,
};
export const getWebhookInputs = { connection, resourceId: webhookResourceId };
export const listWebhooksInputs = { connection };
export const deleteInstancedWebhooksInputs = { connection };
export const deleteWebhookInputs = {
  connection,
  resourceId: webhookResourceId,
};
const updateWebhookName = {
  ...webhookName,
  required: false,
  clean: toOptionalString,
};
const updateWebhookEvent = {
  ...webhookEvent,
  required: false,
  clean: toOptionalString,
};
const updateWebhookUrl = {
  ...webhookUrl,
  required: false,
  clean: toOptionalString,
};
const updateWebhookContentType = {
  ...webhookContentType,
  default: undefined,
  clean: toOptionalString,
};
const updateWebhookEnabled = optionalBoolean(
  "Enabled",
  "Whether the webhook is active and delivering events.",
);
const updateWebhookAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Name, Event, URL, Content Type, and Enabled.",
  inputs: {
    webhookName: updateWebhookName,
    webhookEvent: updateWebhookEvent,
    webhookUrl: updateWebhookUrl,
    webhookContentType: updateWebhookContentType,
    webhookEnabled: updateWebhookEnabled,
  },
});
export const updateWebhookInputs = {
  connection,
  resourceId: webhookResourceId,
  additionalFields: updateWebhookAdditionalFields,
};
