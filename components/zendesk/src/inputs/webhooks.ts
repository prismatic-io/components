import { input, util } from "@prismatic-io/spectral";
import {
  defaultWebhookTriggerConditions,
  defaultWebhookTriggerMessageBody,
} from "../constants";
import { connectionInput, webhookEventsInput } from "./common";
export const callbackUrl = input({
  label: "Callback URL",
  type: "string",
  placeholder: "Enter the callback URL",
  required: true,
  comments: "The URL of the endpoint that receives the webhook payload.",
  clean: util.types.toString,
});
const webhookName = input({
  label: "Webhook Name",
  type: "string",
  placeholder: "Enter the webhook name",
  required: true,
  comments:
    "A unique name used to identify the webhook in the Zendesk admin UI.",
  clean: util.types.toString,
});
export const showOnlyInstanceWebhooks = input({
  label: "Show only instance webhooks",
  type: "boolean",
  default: "true",
  comments: "Show only webhooks that point to this instance",
  clean: util.types.toBool,
});
export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  placeholder: "Enter the webhook ID",
  required: true,
  comments: "The unique identifier for the webhook.",
  clean: util.types.toString,
});
export const allowDuplicates = input({
  label: "Allow Duplicates?",
  type: "boolean",
  required: true,
  default: "false",
  comments: "Allow a duplicate to be created when one already exists?",
  clean: util.types.toBool,
});
export const webhookTriggerTitle = input({
  label: "Trigger Name",
  type: "string",
  placeholder: "Enter the trigger name",
  required: true,
  comments: "The name shown for the trigger in the Zendesk admin UI.",
  clean: util.types.toString,
});
export const webhookTriggerMessageBody = input({
  label: "Webhook Message Body",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(defaultWebhookTriggerMessageBody, null, 2),
  comments:
    "The body to send to the webhook. See [Zendesk Support documentation](https://support.zendesk.com/hc/en-us/articles/4408886858138-Zendesk-Support-placeholders-reference) for placeholder references.",
  clean: util.types.toString,
});
export const webhookTriggerConditions = input({
  label: "Trigger Conditions",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(defaultWebhookTriggerConditions, null, 2),
  comments:
    "The conditions under which this trigger will fire. Leave the default to fire under any change.",
  clean: util.types.toObject,
});
export const createWebhookInputs = {
  zendeskConnection: connectionInput,
  callbackUrl,
  name: webhookName,
  events: webhookEventsInput,
  allowDuplicates: {
    ...allowDuplicates,
    comments:
      "When true, a webhook is created even if one with the same name already exists.",
  },
};
export const deleteInstanceWebhooksInputs = {
  zendeskConnection: connectionInput,
};
export const deleteWebhookInputs = {
  zendeskConnection: connectionInput,
  webhookId: {
    ...webhookId,
    comments: "The unique identifier for the webhook to delete.",
    example: "01GK59HW1XMB8WVZ43RPVAPXRM",
  },
};
export const listWebhooksInputs = {
  zendeskConnection: connectionInput,
  showOnlyInstanceWebhooks,
};
