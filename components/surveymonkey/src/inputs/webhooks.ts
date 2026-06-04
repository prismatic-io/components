import { input, util } from "@prismatic-io/spectral";
import type { WebhookEventType } from "../types";
import { toArrayOfStrings, toOptionalString } from "../util";
import { WEBHOOK_EVENT_TYPES } from "../constants";
import { connectionInput, fetchAll, page, perPage } from "./common";





export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the webhook.",
  example: "1234567890",
  placeholder: "Enter webhook ID",
  clean: util.types.toString,
});

export const webhookName = input({
  label: "Webhook Name",
  type: "string",
  required: true,
  comments: "The name of the webhook.",
  example: "Response Completed Hook",
  placeholder: "Enter webhook name",
  clean: util.types.toString,
});

export const webhookEventType = input({
  label: "Event Type",
  type: "string",
  required: true,
  model: WEBHOOK_EVENT_TYPES.map((event) => ({
    label: event.label,
    value: event.key as WebhookEventType,
  })),
  comments: "The event type to subscribe to.",
  placeholder: "Select event type",
  clean: util.types.toString,
});

export const webhookObjectType = input({
  label: "Object Type",
  type: "string",
  required: false,
  model: [
    { label: "Survey", value: "survey" },
    { label: "Collector", value: "collector" },
  ],
  comments: "Filter events by object type.",
  placeholder: "Select object type",
  clean: toOptionalString,
});

export const webhookObjectIds = input({
  label: "Object IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "List of survey or collector IDs to filter events. Leave empty for all.",
  placeholder: "Enter object IDs",
  example: "1234567890",
  clean: toArrayOfStrings,
});

export const webhookSubscriptionUrl = input({
  label: "Subscription URL",
  type: "string",
  required: true,
  comments:
    "URL to receive webhook callbacks. Must be unique and handle HEAD requests.",
  example: "https://example.com/webhook",
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});





export const listWebhooksInputs = {
  connection: connectionInput,
  fetchAll,
  page,
  perPage,
};

export const getWebhookInputs = {
  connection: connectionInput,
  webhookId,
};

export const createWebhookInputs = {
  connection: connectionInput,
  name: webhookName,
  subscriptionUrl: webhookSubscriptionUrl,
  eventType: webhookEventType,
  objectType: webhookObjectType,
  objectIds: webhookObjectIds,
};

export const updateWebhookInputs = {
  connection: connectionInput,
  webhookId,
  name: { ...webhookName, required: false, clean: toOptionalString },
  subscriptionUrl: {
    ...webhookSubscriptionUrl,
    required: false,
    clean: toOptionalString,
  },
  eventType: { ...webhookEventType, required: false, clean: toOptionalString },
  objectType: webhookObjectType,
  objectIds: webhookObjectIds,
};

export const deleteWebhookInputs = {
  connection: connectionInput,
  webhookId,
};





export const eventsWebhookInputs = {
  connection: connectionInput,
  eventType: webhookEventType,
  objectType: webhookObjectType,
  objectIds: webhookObjectIds,
};
